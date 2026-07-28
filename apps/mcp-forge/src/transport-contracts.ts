import {
  FORGE_APPLICATION_ID,
  FORGE_CONTRACT_VERSION,
} from "./contracts.js";

export const FORGE_TRANSPORT_CONTRACT_REVISION = "1" as const;
export const FORGE_MCP_PROTOCOL_VERSION = "2025-11-25" as const;
export const FORGE_SUPPORTED_MCP_PROTOCOL_VERSIONS = [
  FORGE_MCP_PROTOCOL_VERSION,
] as const;
export const FORGE_STDIO_MAX_MESSAGE_BYTES = 65_536 as const;

export const FORGE_TRANSPORT_SESSION_STATES = [
  "created",
  "initialize-responded",
  "ready",
  "closing",
  "closed",
] as const;

export type ForgeTransportSessionState =
  (typeof FORGE_TRANSPORT_SESSION_STATES)[number];

export type ForgeJsonRpcId = string | number;

export interface ForgeJsonRpcRequest {
  readonly jsonrpc: "2.0";
  readonly id: ForgeJsonRpcId;
  readonly method: string;
  readonly params?: unknown;
}

export interface ForgeJsonRpcNotification {
  readonly jsonrpc: "2.0";
  readonly method: string;
  readonly params?: unknown;
}

export interface ForgeJsonRpcSuccessResponse {
  readonly jsonrpc: "2.0";
  readonly id: ForgeJsonRpcId;
  readonly result: unknown;
}

export interface ForgeJsonRpcErrorData {
  readonly forgeCode: string;
  readonly state?: ForgeTransportSessionState;
  readonly supportedProtocolVersions?: readonly string[];
}

export interface ForgeJsonRpcErrorResponse {
  readonly jsonrpc: "2.0";
  readonly id: ForgeJsonRpcId | null;
  readonly error: {
    readonly code: number;
    readonly message: string;
    readonly data: ForgeJsonRpcErrorData;
  };
}

export type ForgeJsonRpcResponse =
  | ForgeJsonRpcSuccessResponse
  | ForgeJsonRpcErrorResponse;

export interface ForgeInitializeParams {
  readonly protocolVersion: string;
  readonly capabilities: Readonly<Record<string, unknown>>;
  readonly clientInfo: {
    readonly name: string;
    readonly version: string;
  };
}

export interface ForgeInitializeResult {
  readonly protocolVersion: typeof FORGE_MCP_PROTOCOL_VERSION;
  readonly capabilities: {
    readonly tools: {
      readonly listChanged: false;
    };
  };
  readonly serverInfo: {
    readonly name: typeof FORGE_APPLICATION_ID;
    readonly version: typeof FORGE_CONTRACT_VERSION;
  };
  readonly instructions: string;
}

export interface ForgeCancellationParams {
  readonly requestId: ForgeJsonRpcId;
  readonly reason?: string;
}

export const FORGE_JSON_RPC_ERROR_CODES = {
  parseError: -32700,
  invalidRequest: -32600,
  methodNotFound: -32601,
  invalidParams: -32602,
  internalError: -32603,
  notInitialized: -32040,
  alreadyInitialized: -32041,
  connectionClosing: -32042,
} as const;

export const FORGE_TRANSPORT_ERROR_IDS = {
  parseError: "forge.transport.parse-error",
  invalidRequest: "forge.transport.invalid-request",
  methodNotFound: "forge.transport.method-not-found",
  invalidParams: "forge.transport.invalid-params",
  unsupportedProtocolVersion: "forge.transport.unsupported-protocol-version",
  notInitialized: "forge.transport.not-initialized",
  alreadyInitialized: "forge.transport.already-initialized",
  connectionClosing: "forge.transport.connection-closing",
  handlerFailed: "forge.transport.handler-failed",
  messageTooLarge: "forge.transport.message-too-large",
  noToolsEnabled: "forge.transport.no-tools-enabled",
} as const;

export const FORGE_TRANSPORT_INSTRUCTIONS = [
  "Forge is a local public-and-synthetic contributor tool boundary.",
  "No tools are enabled during Sprint 7.2.",
  "Transport success does not create canon, Chronicle truth, permission, gameplay completion, provider approval, or institutional authority.",
  "Forge does not provide shell, network, repository mutation, private-data, provider, connector, or consequential action authority.",
].join(" ");

export const FORGE_INITIALIZE_RESULT: ForgeInitializeResult = {
  protocolVersion: FORGE_MCP_PROTOCOL_VERSION,
  capabilities: {
    tools: {
      listChanged: false,
    },
  },
  serverInfo: {
    name: FORGE_APPLICATION_ID,
    version: FORGE_CONTRACT_VERSION,
  },
  instructions: FORGE_TRANSPORT_INSTRUCTIONS,
};

export const FORGE_TRANSPORT_BOUNDARY = {
  revision: FORGE_TRANSPORT_CONTRACT_REVISION,
  transport: "stdio",
  localOnly: true,
  utf8Only: true,
  newlineDelimited: true,
  stdoutProtocolOnly: true,
  stderrLoggingOnly: true,
  supportsBatchMessages: false,
  supportsServerInitiatedRequests: false,
  toolsExposed: false,
  repositoryReadsEnabled: false,
  networkEnabled: false,
  providerEnabled: false,
  credentialsEnabled: false,
  privateDataEnabled: false,
  repositoryMutationEnabled: false,
  shellEnabled: false,
  dynamicModuleLoadingEnabled: false,
  cancellationNotificationsSupported: true,
  eofShutdownSupported: true,
  signalShutdownSupported: true,
} as const;
