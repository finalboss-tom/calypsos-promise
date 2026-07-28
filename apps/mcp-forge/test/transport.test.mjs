import assert from "node:assert/strict";
import { PassThrough } from "node:stream";
import test from "node:test";

import {
  FORGE_APPLICATION_ID,
  FORGE_JSON_RPC_ERROR_CODES,
  FORGE_MCP_PROTOCOL_VERSION,
  FORGE_TRANSPORT_BOUNDARY,
  FORGE_TRANSPORT_ERROR_IDS,
  ForgeStdioServer,
  ForgeTransportHarness,
  ForgeTransportSession,
} from "../dist/index.js";

function initializeRequest(id = 1, protocolVersion = FORGE_MCP_PROTOCOL_VERSION) {
  return {
    jsonrpc: "2.0",
    id,
    method: "initialize",
    params: {
      protocolVersion,
      capabilities: {},
      clientInfo: {
        name: "forge-test-client",
        version: "1",
      },
    },
  };
}

async function initializeSession(session) {
  const response = await session.handleMessage(initializeRequest());
  assert.ok(response && "result" in response);
  await session.handleMessage({
    jsonrpc: "2.0",
    method: "notifications/initialized",
    params: {},
  });
  assert.equal(session.getState(), "ready");
  return response;
}

function collectUtf8(stream) {
  let value = "";
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    value += chunk;
  });
  return () => value;
}

test("the transport boundary remains local, stdio-only, and non-authoritative", () => {
  assert.equal(FORGE_TRANSPORT_BOUNDARY.transport, "stdio");
  assert.equal(FORGE_TRANSPORT_BOUNDARY.localOnly, true);
  assert.equal(FORGE_TRANSPORT_BOUNDARY.stdoutProtocolOnly, true);
  assert.equal(FORGE_TRANSPORT_BOUNDARY.stderrLoggingOnly, true);
  assert.equal(FORGE_TRANSPORT_BOUNDARY.toolsExposed, false);
  assert.equal(FORGE_TRANSPORT_BOUNDARY.repositoryReadsEnabled, false);
  assert.equal(FORGE_TRANSPORT_BOUNDARY.networkEnabled, false);
  assert.equal(FORGE_TRANSPORT_BOUNDARY.providerEnabled, false);
  assert.equal(FORGE_TRANSPORT_BOUNDARY.privateDataEnabled, false);
  assert.equal(FORGE_TRANSPORT_BOUNDARY.repositoryMutationEnabled, false);
  assert.equal(FORGE_TRANSPORT_BOUNDARY.shellEnabled, false);
});

test("initialize negotiates the finalized pinned protocol and exposes no enabled tools", async () => {
  const session = new ForgeTransportSession();
  const response = await initializeSession(session);

  assert.equal(response.result.protocolVersion, FORGE_MCP_PROTOCOL_VERSION);
  assert.equal(response.result.serverInfo.name, FORGE_APPLICATION_ID);
  assert.deepEqual(response.result.capabilities, {
    tools: { listChanged: false },
  });
  assert.match(response.result.instructions, /No tools are enabled/);
});

test("unsupported protocol versions fail closed without changing session state", async () => {
  const session = new ForgeTransportSession();
  const response = await session.handleMessage(
    initializeRequest(1, "2026-07-28"),
  );

  assert.ok(response && "error" in response);
  assert.equal(response.error.code, FORGE_JSON_RPC_ERROR_CODES.invalidParams);
  assert.equal(
    response.error.data.forgeCode,
    FORGE_TRANSPORT_ERROR_IDS.unsupportedProtocolVersion,
  );
  assert.deepEqual(response.error.data.supportedProtocolVersions, [
    FORGE_MCP_PROTOCOL_VERSION,
  ]);
  assert.equal(session.getState(), "created");
});

test("requests fail before initialized notification and duplicate initialize fails", async () => {
  const session = new ForgeTransportSession();

  const beforeInitialize = await session.handleMessage({
    jsonrpc: "2.0",
    id: 1,
    method: "ping",
  });
  assert.ok(beforeInitialize && "error" in beforeInitialize);
  assert.equal(
    beforeInitialize.error.data.forgeCode,
    FORGE_TRANSPORT_ERROR_IDS.notInitialized,
  );

  const initialized = await session.handleMessage(initializeRequest(2));
  assert.ok(initialized && "result" in initialized);

  const duplicate = await session.handleMessage(initializeRequest(3));
  assert.ok(duplicate && "error" in duplicate);
  assert.equal(
    duplicate.error.data.forgeCode,
    FORGE_TRANSPORT_ERROR_IDS.alreadyInitialized,
  );
});

test("ping succeeds, tool discovery is empty, and tool calls refuse deterministically", async () => {
  const harness = new ForgeTransportHarness();
  await harness.initialize();

  const ping = await harness.request("ping");
  assert.ok(ping && "result" in ping);
  assert.deepEqual(ping.result, {});

  const tools = await harness.request("tools/list");
  assert.ok(tools && "result" in tools);
  assert.deepEqual(tools.result, { tools: [] });

  const call = await harness.request("tools/call", {
    name: "forge.search.lore",
    arguments: {},
  });
  assert.ok(call && "error" in call);
  assert.equal(call.error.code, FORGE_JSON_RPC_ERROR_CODES.invalidParams);
  assert.equal(
    call.error.data.forgeCode,
    FORGE_TRANSPORT_ERROR_IDS.noToolsEnabled,
  );
});

test("unknown methods return public-safe method-not-found errors", async () => {
  const harness = new ForgeTransportHarness();
  await harness.initialize();

  const response = await harness.request("forge.untrusted.register-tool", {
    riskClass: "read-public",
  });
  assert.ok(response && "error" in response);
  assert.equal(response.error.code, FORGE_JSON_RPC_ERROR_CODES.methodNotFound);
  assert.equal(
    response.error.data.forgeCode,
    FORGE_TRANSPORT_ERROR_IDS.methodNotFound,
  );
  assert.equal(JSON.stringify(response).includes("stack"), false);
});

test("cancellation aborts an active direct request and suppresses its response", async () => {
  let markStarted;
  const started = new Promise((resolve) => {
    markStarted = resolve;
  });
  let observedAbort = false;

  const harness = new ForgeTransportHarness({
    requestHandlers: {
      "forge.test.wait": async (_params, context) => {
        markStarted();
        await new Promise((resolve) => {
          context.signal.addEventListener(
            "abort",
            () => {
              observedAbort = true;
              resolve();
            },
            { once: true },
          );
        });
        return { shouldNotBeReturned: true };
      },
    },
  });
  await harness.initialize();

  const pending = harness.startRequest("forge.test.wait");
  await started;
  assert.equal(harness.session.getActiveRequestCount(), 1);
  await harness.cancel(pending.id, "test cancellation");

  assert.equal(await pending.response, undefined);
  assert.equal(observedAbort, true);
  assert.equal(harness.session.getActiveRequestCount(), 0);
});

test("malformed or unknown cancellation notifications are ignored", async () => {
  const harness = new ForgeTransportHarness();
  await harness.initialize();

  await harness.notify("notifications/cancelled", {});
  await harness.notify("notifications/cancelled", {
    requestId: "unknown",
    reason: 42,
  });

  const ping = await harness.request("ping");
  assert.ok(ping && "result" in ping);
  assert.equal(harness.session.getState(), "ready");
});

test("closing a session aborts pending work and is idempotent", async () => {
  let markStarted;
  const started = new Promise((resolve) => {
    markStarted = resolve;
  });

  const harness = new ForgeTransportHarness({
    requestHandlers: {
      "forge.test.close": async (_params, context) => {
        markStarted();
        await new Promise((resolve) => {
          context.signal.addEventListener("abort", resolve, { once: true });
        });
        return { shouldNotBeReturned: true };
      },
    },
  });
  await harness.initialize();

  const pending = harness.startRequest("forge.test.close");
  await started;
  await harness.close();
  await harness.close();

  assert.equal(await pending.response, undefined);
  assert.equal(harness.session.getState(), "closed");
  assert.equal(harness.session.getActiveRequestCount(), 0);
});

test("stdio framing returns newline-delimited JSON only and logs nothing to stdout", async () => {
  const input = new PassThrough();
  const output = new PassThrough();
  const errors = new PassThrough();
  const getOutput = collectUtf8(output);
  const getErrors = collectUtf8(errors);
  const server = new ForgeStdioServer();

  const serving = server.serve(input, output, errors);
  input.write(`${JSON.stringify(initializeRequest(1))}\n`);
  input.write(
    `${JSON.stringify({
      jsonrpc: "2.0",
      method: "notifications/initialized",
      params: {},
    })}\n`,
  );
  input.write(`${JSON.stringify({ jsonrpc: "2.0", id: 2, method: "ping" })}\n`);
  input.write(
    `${JSON.stringify({ jsonrpc: "2.0", id: 3, method: "tools/list" })}\n`,
  );
  input.end();
  await serving;

  const rawOutput = getOutput();
  assert.equal(rawOutput.endsWith("\n"), true);
  const messages = rawOutput
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  assert.deepEqual(messages.map((message) => message.id), [1, 2, 3]);
  assert.deepEqual(messages[1].result, {});
  assert.deepEqual(messages[2].result, { tools: [] });
  assert.equal(getErrors(), "");
});

test("stdio parse, batch, and message-size failures are bounded and public-safe", async () => {
  const input = new PassThrough();
  const output = new PassThrough();
  const errors = new PassThrough();
  const getOutput = collectUtf8(output);
  const server = new ForgeStdioServer({ maxMessageBytes: 64 });

  const serving = server.serve(input, output, errors);
  input.write("not-json\n");
  input.write("[]\n");
  input.write(`${"x".repeat(80)}\n`);
  input.end();
  await serving;

  const messages = getOutput()
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  assert.equal(messages.length, 3);
  assert.equal(
    messages[0].error.data.forgeCode,
    FORGE_TRANSPORT_ERROR_IDS.parseError,
  );
  assert.equal(
    messages[1].error.data.forgeCode,
    FORGE_TRANSPORT_ERROR_IDS.invalidRequest,
  );
  assert.equal(
    messages[2].error.data.forgeCode,
    FORGE_TRANSPORT_ERROR_IDS.messageTooLarge,
  );
  assert.equal(JSON.stringify(messages).includes("not-json"), false);
});
