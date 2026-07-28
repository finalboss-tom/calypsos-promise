import { once } from "node:events";
import { Readable, Writable } from "node:stream";
import { StringDecoder } from "node:string_decoder";

import {
  FORGE_JSON_RPC_ERROR_CODES,
  FORGE_STDIO_MAX_MESSAGE_BYTES,
  FORGE_TRANSPORT_ERROR_IDS,
  type ForgeJsonRpcErrorResponse,
  type ForgeJsonRpcResponse,
} from "./transport-contracts.js";
import {
  ForgeTransportSession,
  type ForgeTransportSessionOptions,
} from "./transport-session.js";

export interface ForgeStdioServerOptions extends ForgeTransportSessionOptions {
  readonly maxMessageBytes?: number;
}

function transportFailure(
  code: number,
  forgeCode: string,
  message: string,
): ForgeJsonRpcErrorResponse {
  return {
    jsonrpc: "2.0",
    id: null,
    error: {
      code,
      message,
      data: {
        forgeCode,
      },
    },
  };
}

async function writeChunk(output: Writable, chunk: string): Promise<void> {
  if (output.write(chunk)) {
    return;
  }
  await once(output, "drain");
}

export class ForgeStdioServer {
  readonly session: ForgeTransportSession;
  readonly maxMessageBytes: number;

  private output?: Writable;
  private errorOutput?: Writable;
  private writeQueue: Promise<void> = Promise.resolve();
  private readonly pending = new Set<Promise<void>>();
  private serving = false;

  constructor(options: ForgeStdioServerOptions = {}) {
    this.session = new ForgeTransportSession({
      requestHandlers: options.requestHandlers,
    });
    this.maxMessageBytes =
      options.maxMessageBytes ?? FORGE_STDIO_MAX_MESSAGE_BYTES;
  }

  async serve(
    input: Readable = process.stdin,
    output: Writable = process.stdout,
    errorOutput: Writable = process.stderr,
  ): Promise<void> {
    if (this.serving) {
      throw new Error("Forge stdio server is already serving.");
    }

    this.serving = true;
    this.output = output;
    this.errorOutput = errorOutput;

    const decoder = new StringDecoder("utf8");
    let buffer = "";
    let discardingOversizedLine = false;

    const processText = (incoming: string): void => {
      let text = incoming;

      if (discardingOversizedLine) {
        const newlineIndex = text.indexOf("\n");
        if (newlineIndex === -1) {
          return;
        }
        text = text.slice(newlineIndex + 1);
        discardingOversizedLine = false;
      }

      buffer += text;
      let newlineIndex = buffer.indexOf("\n");
      while (newlineIndex !== -1) {
        const rawLine = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);
        const line = rawLine.endsWith("\r")
          ? rawLine.slice(0, rawLine.length - 1)
          : rawLine;

        if (Buffer.byteLength(line, "utf8") > this.maxMessageBytes) {
          this.scheduleResponse(
            transportFailure(
              FORGE_JSON_RPC_ERROR_CODES.invalidRequest,
              FORGE_TRANSPORT_ERROR_IDS.messageTooLarge,
              "The Forge stdio message exceeds the configured size limit.",
            ),
          );
        } else {
          this.scheduleLine(line);
        }
        newlineIndex = buffer.indexOf("\n");
      }

      if (Buffer.byteLength(buffer, "utf8") > this.maxMessageBytes) {
        this.scheduleResponse(
          transportFailure(
            FORGE_JSON_RPC_ERROR_CODES.invalidRequest,
            FORGE_TRANSPORT_ERROR_IDS.messageTooLarge,
            "The Forge stdio message exceeds the configured size limit.",
          ),
        );
        buffer = "";
        discardingOversizedLine = true;
      }
    };

    try {
      for await (const chunk of input) {
        const bytes = Buffer.isBuffer(chunk)
          ? chunk
          : Buffer.from(String(chunk));
        processText(decoder.write(bytes));
      }

      processText(decoder.end());
      if (!discardingOversizedLine && buffer.length > 0) {
        this.scheduleLine(buffer.endsWith("\r") ? buffer.slice(0, -1) : buffer);
      }

      await Promise.allSettled([...this.pending]);
      await this.writeQueue;
    } catch {
      this.reportError("forge.transport.stdio-read-failed");
    } finally {
      await this.close();
      this.serving = false;
    }
  }

  async close(): Promise<void> {
    await this.session.close();
  }

  private scheduleLine(line: string): void {
    const task = this.handleLine(line)
      .catch(() => {
        this.reportError("forge.transport.line-handler-failed");
      })
      .finally(() => {
        this.pending.delete(task);
      });
    this.pending.add(task);
  }

  private scheduleResponse(response: ForgeJsonRpcResponse): void {
    const task = this.writeResponse(response)
      .catch(() => {
        this.reportError("forge.transport.stdout-write-failed");
      })
      .finally(() => {
        this.pending.delete(task);
      });
    this.pending.add(task);
  }

  private async handleLine(line: string): Promise<void> {
    if (line.length === 0) {
      await this.writeResponse(
        transportFailure(
          FORGE_JSON_RPC_ERROR_CODES.parseError,
          FORGE_TRANSPORT_ERROR_IDS.parseError,
          "The Forge stdio message is empty or invalid JSON.",
        ),
      );
      return;
    }

    let message: unknown;
    try {
      message = JSON.parse(line);
    } catch {
      await this.writeResponse(
        transportFailure(
          FORGE_JSON_RPC_ERROR_CODES.parseError,
          FORGE_TRANSPORT_ERROR_IDS.parseError,
          "The Forge stdio message is empty or invalid JSON.",
        ),
      );
      return;
    }

    if (Array.isArray(message)) {
      await this.writeResponse(
        transportFailure(
          FORGE_JSON_RPC_ERROR_CODES.invalidRequest,
          FORGE_TRANSPORT_ERROR_IDS.invalidRequest,
          "Forge stdio does not accept JSON-RPC batch messages.",
        ),
      );
      return;
    }

    const response = await this.session.handleMessage(message);
    if (response !== undefined) {
      await this.writeResponse(response);
    }
  }

  private writeResponse(response: ForgeJsonRpcResponse): Promise<void> {
    const output = this.output;
    if (output === undefined) {
      return Promise.reject(new Error("Forge stdio output is unavailable."));
    }

    const line = `${JSON.stringify(response)}\n`;
    this.writeQueue = this.writeQueue.then(() => writeChunk(output, line));
    return this.writeQueue;
  }

  private reportError(code: string): void {
    this.errorOutput?.write(`${code}\n`);
  }
}
