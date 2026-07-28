import {
  FORGE_MCP_PROTOCOL_VERSION,
  type ForgeJsonRpcId,
  type ForgeJsonRpcResponse,
} from "./transport-contracts.js";
import {
  ForgeTransportSession,
  type ForgeTransportSessionOptions,
} from "./transport-session.js";

export interface ForgeStartedHarnessRequest {
  readonly id: ForgeJsonRpcId;
  readonly response: Promise<ForgeJsonRpcResponse | undefined>;
}

export class ForgeTransportHarness {
  readonly session: ForgeTransportSession;
  private nextRequestId = 1;

  constructor(options: ForgeTransportSessionOptions = {}) {
    this.session = new ForgeTransportSession(options);
  }

  async initialize(
    protocolVersion: string = FORGE_MCP_PROTOCOL_VERSION,
  ): Promise<ForgeJsonRpcResponse | undefined> {
    const response = await this.session.handleMessage({
      jsonrpc: "2.0",
      id: this.nextRequestId++,
      method: "initialize",
      params: {
        protocolVersion,
        capabilities: {},
        clientInfo: {
          name: "forge-direct-harness",
          version: "1",
        },
      },
    });

    if (response !== undefined && "result" in response) {
      await this.notify("notifications/initialized", {});
    }

    return response;
  }

  startRequest(method: string, params?: unknown): ForgeStartedHarnessRequest {
    const id = this.nextRequestId++;
    return {
      id,
      response: this.session.handleMessage({
        jsonrpc: "2.0",
        id,
        method,
        ...(params === undefined ? {} : { params }),
      }),
    };
  }

  request(
    method: string,
    params?: unknown,
  ): Promise<ForgeJsonRpcResponse | undefined> {
    return this.startRequest(method, params).response;
  }

  async notify(method: string, params?: unknown): Promise<void> {
    await this.session.handleMessage({
      jsonrpc: "2.0",
      method,
      ...(params === undefined ? {} : { params }),
    });
  }

  cancel(requestId: ForgeJsonRpcId, reason?: string): Promise<void> {
    return this.notify("notifications/cancelled", {
      requestId,
      ...(reason === undefined ? {} : { reason }),
    });
  }

  close(): Promise<void> {
    return this.session.close();
  }
}
