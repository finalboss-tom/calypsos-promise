import {
  FORGE_INITIALIZE_RESULT,
  FORGE_JSON_RPC_ERROR_CODES,
  FORGE_MCP_PROTOCOL_VERSION,
  FORGE_SUPPORTED_MCP_PROTOCOL_VERSIONS,
  FORGE_TRANSPORT_ERROR_IDS,
  type ForgeCancellationParams,
  type ForgeInitializeParams,
  type ForgeJsonRpcErrorResponse,
  type ForgeJsonRpcId,
  type ForgeJsonRpcNotification,
  type ForgeJsonRpcRequest,
  type ForgeJsonRpcResponse,
  type ForgeJsonRpcSuccessResponse,
  type ForgeTransportSessionState,
} from "./transport-contracts.js";

export interface ForgeRequestContext {
  readonly requestId: ForgeJsonRpcId;
  readonly method: string;
  readonly signal: AbortSignal;
  readonly sessionState: ForgeTransportSessionState;
}

export type ForgeRequestHandler = (
  params: unknown,
  context: ForgeRequestContext,
) => unknown | Promise<unknown>;

export interface ForgeTransportSessionOptions {
  readonly requestHandlers?: Readonly<Record<string, ForgeRequestHandler>>;
}

class ForgeProtocolFault extends Error {
  readonly code: number;
  readonly forgeCode: string;
  readonly supportedProtocolVersions?: readonly string[];

  constructor(
    code: number,
    forgeCode: string,
    message: string,
    supportedProtocolVersions?: readonly string[],
  ) {
    super(message);
    this.name = "ForgeProtocolFault";
    this.code = code;
    this.forgeCode = forgeCode;
    this.supportedProtocolVersions = supportedProtocolVersions;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isJsonRpcId(value: unknown): value is ForgeJsonRpcId {
  return (
    typeof value === "string" ||
    (typeof value === "number" && Number.isFinite(value))
  );
}

function hasOwn(value: object, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function success(
  id: ForgeJsonRpcId,
  result: unknown,
): ForgeJsonRpcSuccessResponse {
  return {
    jsonrpc: "2.0",
    id,
    result,
  };
}

function failure(
  id: ForgeJsonRpcId | null,
  code: number,
  forgeCode: string,
  message: string,
  state?: ForgeTransportSessionState,
  supportedProtocolVersions?: readonly string[],
): ForgeJsonRpcErrorResponse {
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message,
      data: {
        forgeCode,
        ...(state === undefined ? {} : { state }),
        ...(supportedProtocolVersions === undefined
          ? {}
          : { supportedProtocolVersions }),
      },
    },
  };
}

function parseInitializeParams(params: unknown): ForgeInitializeParams {
  if (!isRecord(params)) {
    throw new ForgeProtocolFault(
      FORGE_JSON_RPC_ERROR_CODES.invalidParams,
      FORGE_TRANSPORT_ERROR_IDS.invalidParams,
      "Initialize parameters must be an object.",
    );
  }

  const { protocolVersion, capabilities, clientInfo } = params;
  if (
    typeof protocolVersion !== "string" ||
    !isRecord(capabilities) ||
    !isRecord(clientInfo) ||
    typeof clientInfo.name !== "string" ||
    clientInfo.name.length === 0 ||
    typeof clientInfo.version !== "string" ||
    clientInfo.version.length === 0
  ) {
    throw new ForgeProtocolFault(
      FORGE_JSON_RPC_ERROR_CODES.invalidParams,
      FORGE_TRANSPORT_ERROR_IDS.invalidParams,
      "Initialize parameters are incomplete or invalid.",
    );
  }

  return {
    protocolVersion,
    capabilities,
    clientInfo: {
      name: clientInfo.name,
      version: clientInfo.version,
    },
  };
}

function parseCancellationParams(
  params: unknown,
): ForgeCancellationParams | undefined {
  if (!isRecord(params) || !isJsonRpcId(params.requestId)) {
    return undefined;
  }

  if (params.reason !== undefined && typeof params.reason !== "string") {
    return undefined;
  }

  return {
    requestId: params.requestId,
    ...(params.reason === undefined ? {} : { reason: params.reason }),
  };
}

export class ForgeTransportSession {
  private state: ForgeTransportSessionState = "created";
  private readonly requestHandlers: Readonly<
    Record<string, ForgeRequestHandler>
  >;
  private readonly activeRequests = new Map<ForgeJsonRpcId, AbortController>();

  constructor(options: ForgeTransportSessionOptions = {}) {
    this.requestHandlers = options.requestHandlers ?? {};
  }

  getState(): ForgeTransportSessionState {
    return this.state;
  }

  getActiveRequestCount(): number {
    return this.activeRequests.size;
  }

  async handleMessage(
    message: unknown,
  ): Promise<ForgeJsonRpcResponse | undefined> {
    if (!isRecord(message) || message.jsonrpc !== "2.0") {
      return failure(
        null,
        FORGE_JSON_RPC_ERROR_CODES.invalidRequest,
        FORGE_TRANSPORT_ERROR_IDS.invalidRequest,
        "The message is not a valid JSON-RPC 2.0 object.",
        this.state,
      );
    }

    if (typeof message.method !== "string" || message.method.length === 0) {
      return failure(
        isJsonRpcId(message.id) ? message.id : null,
        FORGE_JSON_RPC_ERROR_CODES.invalidRequest,
        FORGE_TRANSPORT_ERROR_IDS.invalidRequest,
        "The message method is missing or invalid.",
        this.state,
      );
    }

    if (!hasOwn(message, "id")) {
      await this.handleNotification({
        jsonrpc: "2.0",
        method: message.method,
        ...(message.params === undefined ? {} : { params: message.params }),
      });
      return undefined;
    }

    if (!isJsonRpcId(message.id)) {
      return failure(
        null,
        FORGE_JSON_RPC_ERROR_CODES.invalidRequest,
        FORGE_TRANSPORT_ERROR_IDS.invalidRequest,
        "The request identifier must be a finite number or string.",
        this.state,
      );
    }

    return this.handleRequest({
      jsonrpc: "2.0",
      id: message.id,
      method: message.method,
      ...(message.params === undefined ? {} : { params: message.params }),
    });
  }

  async close(): Promise<void> {
    if (this.state === "closed") {
      return;
    }

    this.state = "closing";
    for (const controller of this.activeRequests.values()) {
      controller.abort("Forge transport session closed.");
    }
    this.activeRequests.clear();
    this.state = "closed";
  }

  private async handleNotification(
    notification: ForgeJsonRpcNotification,
  ): Promise<void> {
    if (notification.method === "notifications/initialized") {
      if (this.state === "initialize-responded") {
        this.state = "ready";
      }
      return;
    }

    if (notification.method === "notifications/cancelled") {
      const cancellation = parseCancellationParams(notification.params);
      if (cancellation === undefined) {
        return;
      }

      const controller = this.activeRequests.get(cancellation.requestId);
      controller?.abort(
        cancellation.reason ?? "Client sent notifications/cancelled.",
      );
    }
  }

  private async handleRequest(
    request: ForgeJsonRpcRequest,
  ): Promise<ForgeJsonRpcResponse | undefined> {
    if (request.method === "initialize") {
      return this.handleInitialize(request);
    }

    if (this.state === "closing" || this.state === "closed") {
      return failure(
        request.id,
        FORGE_JSON_RPC_ERROR_CODES.connectionClosing,
        FORGE_TRANSPORT_ERROR_IDS.connectionClosing,
        "The Forge transport session is closing.",
        this.state,
      );
    }

    if (this.state !== "ready") {
      return failure(
        request.id,
        FORGE_JSON_RPC_ERROR_CODES.notInitialized,
        FORGE_TRANSPORT_ERROR_IDS.notInitialized,
        "The Forge transport session has not completed initialization.",
        this.state,
      );
    }

    if (this.activeRequests.has(request.id)) {
      return failure(
        request.id,
        FORGE_JSON_RPC_ERROR_CODES.invalidRequest,
        FORGE_TRANSPORT_ERROR_IDS.invalidRequest,
        "The request identifier is already active.",
        this.state,
      );
    }

    const controller = new AbortController();
    this.activeRequests.set(request.id, controller);

    try {
      const result = await this.executeRequest(request, controller.signal);
      if (controller.signal.aborted) {
        return undefined;
      }
      return success(request.id, result);
    } catch (error) {
      if (controller.signal.aborted) {
        return undefined;
      }

      if (error instanceof ForgeProtocolFault) {
        return failure(
          request.id,
          error.code,
          error.forgeCode,
          error.message,
          this.state,
          error.supportedProtocolVersions,
        );
      }

      return failure(
        request.id,
        FORGE_JSON_RPC_ERROR_CODES.internalError,
        FORGE_TRANSPORT_ERROR_IDS.handlerFailed,
        "The Forge request handler failed safely.",
        this.state,
      );
    } finally {
      this.activeRequests.delete(request.id);
    }
  }

  private handleInitialize(request: ForgeJsonRpcRequest): ForgeJsonRpcResponse {
    if (this.state !== "created") {
      return failure(
        request.id,
        FORGE_JSON_RPC_ERROR_CODES.alreadyInitialized,
        FORGE_TRANSPORT_ERROR_IDS.alreadyInitialized,
        "The Forge transport session was already initialized.",
        this.state,
      );
    }

    try {
      const params = parseInitializeParams(request.params);
      if (params.protocolVersion !== FORGE_MCP_PROTOCOL_VERSION) {
        throw new ForgeProtocolFault(
          FORGE_JSON_RPC_ERROR_CODES.invalidParams,
          FORGE_TRANSPORT_ERROR_IDS.unsupportedProtocolVersion,
          "The requested MCP protocol version is not supported.",
          FORGE_SUPPORTED_MCP_PROTOCOL_VERSIONS,
        );
      }

      this.state = "initialize-responded";
      return success(request.id, FORGE_INITIALIZE_RESULT);
    } catch (error) {
      if (error instanceof ForgeProtocolFault) {
        return failure(
          request.id,
          error.code,
          error.forgeCode,
          error.message,
          this.state,
          error.supportedProtocolVersions,
        );
      }
      return failure(
        request.id,
        FORGE_JSON_RPC_ERROR_CODES.internalError,
        FORGE_TRANSPORT_ERROR_IDS.handlerFailed,
        "Forge initialization failed safely.",
        this.state,
      );
    }
  }

  private async executeRequest(
    request: ForgeJsonRpcRequest,
    signal: AbortSignal,
  ): Promise<unknown> {
    if (request.method === "ping") {
      return {};
    }

    if (request.method === "tools/list") {
      return { tools: [] };
    }

    if (request.method === "tools/call") {
      throw new ForgeProtocolFault(
        FORGE_JSON_RPC_ERROR_CODES.invalidParams,
        FORGE_TRANSPORT_ERROR_IDS.noToolsEnabled,
        "No Forge tools are enabled during Sprint 7.2.",
      );
    }

    const handler = this.requestHandlers[request.method];
    if (handler === undefined) {
      throw new ForgeProtocolFault(
        FORGE_JSON_RPC_ERROR_CODES.methodNotFound,
        FORGE_TRANSPORT_ERROR_IDS.methodNotFound,
        "The requested method is not available.",
      );
    }

    return handler(request.params, {
      requestId: request.id,
      method: request.method,
      signal,
      sessionState: this.state,
    });
  }
}
