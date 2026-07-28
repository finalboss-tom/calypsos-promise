import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  FORGE_EXECUTION_CONTRACT_REVISION,
  FORGE_EXECUTION_ERROR_CODES,
  FORGE_EXECUTION_SCOPE_VALIDATION_CODES,
  FORGE_INVOCATION_RECEIPT_SCHEMA_ID,
  FORGE_RUNTIME_ENABLED_TOOL_IDS,
  FORGE_RUNTIME_EXECUTION_SCOPES,
  FORGE_STABLE_ERROR_SCHEMA_ID,
  ForgeLoreSchemaToolService,
  ForgeSourceRepository,
  ForgeToolExecutionController,
  ForgeTransportSession,
  validateForgeExecutionScopes,
} from "../dist/index.js";

async function createService(t) {
  const repositoryRoot = await mkdtemp(join(tmpdir(), "forge-7-8-"));
  t.after(async () => {
    await rm(repositoryRoot, { recursive: true, force: true });
  });
  await mkdir(join(repositoryRoot, "content"), { recursive: true });
  await writeFile(
    join(repositoryRoot, "content/one.json"),
    JSON.stringify({
      id: "dialogue.synthetic.one",
      kind: "dialogue",
      title: "First moon record",
      text: "The shared moon phrase appears in the first public fixture.",
    }),
    "utf8",
  );
  await writeFile(
    join(repositoryRoot, "content/two.json"),
    JSON.stringify({
      id: "dialogue.synthetic.two",
      kind: "dialogue",
      title: "Second moon record",
      text: "The shared moon phrase appears in the second public fixture.",
    }),
    "utf8",
  );
  const repository =
    await ForgeSourceRepository.forSyntheticTests(repositoryRoot);
  return new ForgeLoreSchemaToolService(repository);
}

function searchOutput(overrides = {}) {
  return {
    toolId: "forge.search.lore",
    revision: "1",
    query: "bounded",
    matches: [],
    resultState: "complete",
    partialReasons: [],
    scannedFiles: 0,
    returnedMatches: 0,
    canonAcceptance: "not-granted",
    resultAuthority: "none",
    sourceAuthority: "evidence-only",
    canApproveCanon: false,
    canMutateRepository: false,
    canWriteCanonicalRecord: false,
    canCreateOrExpandPermission: false,
    canCompleteQuest: false,
    canGrantReward: false,
    canClaimClinicalAuthority: false,
    canCreateInstitutionalAuthority: false,
    ...overrides,
  };
}

async function initialize(session) {
  const response = await session.handleMessage({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-11-25",
      capabilities: {},
      clientInfo: { name: "forge-7-8-test", version: "1" },
    },
  });
  assert.ok(response && "result" in response);
  await session.handleMessage({
    jsonrpc: "2.0",
    method: "notifications/initialized",
    params: {},
  });
  return response;
}

test("every enabled tool has one immutable server-owned execution scope", () => {
  assert.equal(FORGE_EXECUTION_CONTRACT_REVISION, "1");
  assert.deepEqual(
    FORGE_RUNTIME_EXECUTION_SCOPES.map((scope) => scope.toolId),
    FORGE_RUNTIME_ENABLED_TOOL_IDS,
  );
  assert.deepEqual(validateForgeExecutionScopes(), []);

  for (const scope of FORGE_RUNTIME_EXECUTION_SCOPES) {
    assert.equal(scope.serverOwned, true);
    assert.equal(scope.callerCanChangeScope, false);
    assert.equal(scope.resultAuthority, "none");
    assert.equal(scope.transportExposure, "local-stdio-only");
    assert.equal(scope.receiptSchemaId, FORGE_INVOCATION_RECEIPT_SCHEMA_ID);
    assert.equal(scope.errorSchemaId, FORGE_STABLE_ERROR_SCHEMA_ID);
    assert.equal(
      scope.limits.maxMaterializedBytes,
      scope.limits.maxInputBytes +
        scope.limits.maxOutputBytes +
        scope.limits.maxSourceWorkingBytes,
    );
  }
});

test("scope validation rejects caller control and altered limits", () => {
  const authority = structuredClone(FORGE_RUNTIME_EXECUTION_SCOPES);
  authority[0].callerCanChangeScope = true;
  const authorityIssues = validateForgeExecutionScopes(authority);
  assert.ok(
    authorityIssues.some(
      (issue) =>
        issue.code ===
        FORGE_EXECUTION_SCOPE_VALIDATION_CODES.authorityExpansion,
    ),
  );

  const limits = structuredClone(FORGE_RUNTIME_EXECUTION_SCOPES);
  limits[0].limits.maxResults += 1;
  const limitIssues = validateForgeExecutionScopes(limits);
  assert.ok(
    limitIssues.some(
      (issue) =>
        issue.code === FORGE_EXECUTION_SCOPE_VALIDATION_CODES.limitMismatch,
    ),
  );
});

test("successful partial search returns a stable public-safe receipt", async (t) => {
  const service = await createService(t);
  const input = {
    query: "shared moon phrase",
    maxResults: 1,
    maxFiles: 10,
  };
  const first = await service.callTool(
    "forge.search.lore",
    input,
    new AbortController().signal,
  );
  const second = await service.callTool(
    "forge.search.lore",
    input,
    new AbortController().signal,
  );

  assert.equal(first.isError, false);
  assert.deepEqual(
    first.structuredContent.receipt,
    second.structuredContent.receipt,
  );
  const receipt = first.structuredContent.receipt;
  assert.equal(receipt.schemaId, FORGE_INVOCATION_RECEIPT_SCHEMA_ID);
  assert.equal(receipt.toolId, "forge.search.lore");
  assert.equal(receipt.riskClass, "read-public");
  assert.equal(receipt.operation, "search");
  assert.equal(receipt.observed.resultState, "truncated");
  assert.ok(receipt.observed.partialReasons.includes("result-limit-reached"));
  assert.equal(receipt.observed.returnedResults, 1);
  assert.ok(receipt.observed.scannedFiles <= receipt.limits.maxFilesScanned);
  assert.equal(
    receipt.observed.outputBytes,
    Buffer.byteLength(JSON.stringify(first), "utf8"),
  );
  assert.equal(
    receipt.observed.serializedMaterializedBytes,
    receipt.observed.inputBytes + receipt.observed.outputBytes,
  );
  assert.equal(receipt.enforcement.materializedMemory, true);
  assert.equal(receipt.disclosures.rawInputIncluded, false);
  assert.equal(receipt.disclosures.internalTraceIncluded, false);
  assert.equal(receipt.disclosures.wallClockTimestampIncluded, false);
  assert.equal(receipt.authority.resultAuthority, "none");
});

test("generation receipts count records without echoing the raw seed", async (t) => {
  const service = await createService(t);
  const seed = "private-looking-but-fictional-seed-marker";
  const result = await service.callTool(
    "forge.generate.synthetic-data",
    { kind: "quest", seed, count: 3, profile: "accessibility" },
    new AbortController().signal,
  );

  assert.equal(result.isError, false);
  const receipt = result.structuredContent.receipt;
  assert.equal(receipt.toolId, "forge.generate.synthetic-data");
  assert.equal(receipt.observed.scannedFiles, 0);
  assert.equal(receipt.observed.returnedResults, 3);
  assert.equal(receipt.limits.maxSourceWorkingBytes, 0);
  assert.equal(receipt.observed.resultState, "complete");
  assert.equal(JSON.stringify(result).includes(seed), false);
});

test("request serialization and byte limits fail before tool execution", async () => {
  const controller = new ForgeToolExecutionController();
  let called = false;
  const oversized = await controller.execute(
    "forge.search.lore",
    { query: "x".repeat(40_000) },
    new AbortController().signal,
    async () => {
      called = true;
      return searchOutput();
    },
  );

  assert.equal(called, false);
  assert.equal(oversized.isError, true);
  assert.equal(
    oversized.structuredContent.error.code,
    FORGE_EXECUTION_ERROR_CODES.inputLimitReached,
  );
  assert.equal(
    oversized.structuredContent.receipt.observed.resultState,
    "error",
  );
  assert.equal(JSON.stringify(oversized).includes("x".repeat(200)), false);

  const circular = {};
  circular.self = circular;
  const unserializable = await controller.execute(
    "forge.search.lore",
    circular,
    new AbortController().signal,
    async () => searchOutput(),
  );
  assert.equal(
    unserializable.structuredContent.error.code,
    FORGE_EXECUTION_ERROR_CODES.inputNotSerializable,
  );
});

test("scan result output and server-owned receipt limits fail closed", async () => {
  const controller = new ForgeToolExecutionController();
  const signal = new AbortController().signal;

  const scan = await controller.execute(
    "forge.search.lore",
    { query: "bounded" },
    signal,
    async () => searchOutput({ scannedFiles: 201 }),
  );
  assert.equal(
    scan.structuredContent.error.code,
    FORGE_EXECUTION_ERROR_CODES.scanLimitExceeded,
  );

  const results = await controller.execute(
    "forge.search.lore",
    { query: "bounded" },
    signal,
    async () => searchOutput({ returnedMatches: 51 }),
  );
  assert.equal(
    results.structuredContent.error.code,
    FORGE_EXECUTION_ERROR_CODES.resultLimitExceeded,
  );

  const output = await controller.execute(
    "forge.search.lore",
    { query: "bounded" },
    signal,
    async () => searchOutput({ oversized: "y".repeat(600_000) }),
  );
  assert.equal(
    output.structuredContent.error.code,
    FORGE_EXECUTION_ERROR_CODES.outputLimitReached,
  );

  const callerReceipt = await controller.execute(
    "forge.search.lore",
    { query: "bounded" },
    signal,
    async () => searchOutput({ receipt: { callerOwned: true } }),
  );
  assert.equal(
    callerReceipt.structuredContent.error.code,
    FORGE_EXECUTION_ERROR_CODES.invalidToolResult,
  );
});

test("per-tool concurrency is enforced without blocking other identities", async () => {
  const controller = new ForgeToolExecutionController();
  let release;
  let markStarted;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  const started = new Promise((resolve) => {
    markStarted = resolve;
  });

  const first = controller.execute(
    "forge.search.lore",
    { query: "first" },
    new AbortController().signal,
    async () => {
      markStarted();
      await gate;
      return searchOutput({ query: "first" });
    },
  );
  await started;
  assert.equal(controller.getActiveToolCallCount("forge.search.lore"), 1);

  const second = await controller.execute(
    "forge.search.lore",
    { query: "second" },
    new AbortController().signal,
    async () => searchOutput({ query: "second" }),
  );
  assert.equal(
    second.structuredContent.error.code,
    FORGE_EXECUTION_ERROR_CODES.concurrencyLimitReached,
  );

  const otherTool = await controller.execute(
    "forge.search.architecture",
    { query: "other" },
    new AbortController().signal,
    async () => ({
      ...searchOutput({ toolId: "forge.search.architecture", query: "other" }),
    }),
  );
  assert.equal(otherTool.isError, false);

  release();
  assert.equal((await first).isError, false);
  assert.equal(controller.getActiveToolCallCount(), 0);
});

test("accepted timeout returns one stable error receipt", async () => {
  const controller = new ForgeToolExecutionController();
  const result = await controller.execute(
    "forge.search.lore",
    { query: "timeout" },
    new AbortController().signal,
    async () => new Promise(() => {}),
  );

  assert.equal(result.isError, true);
  assert.equal(
    result.structuredContent.error.code,
    FORGE_EXECUTION_ERROR_CODES.timeoutReached,
  );
  assert.equal(
    result.structuredContent.receipt.observed.errorCode,
    FORGE_EXECUTION_ERROR_CODES.timeoutReached,
  );
  assert.equal(result.structuredContent.receipt.enforcement.timeout, true);
  assert.equal(JSON.stringify(result).includes("stack"), false);
});

test("caller cancellation propagates without manufacturing a receipt", async () => {
  const controller = new ForgeToolExecutionController();
  const external = new AbortController();
  let markStarted;
  const started = new Promise((resolve) => {
    markStarted = resolve;
  });
  const pending = controller.execute(
    "forge.search.lore",
    { query: "cancel" },
    external.signal,
    async (signal) => {
      markStarted();
      await new Promise((_resolve, reject) => {
        signal.addEventListener("abort", () => reject(signal.reason), {
          once: true,
        });
      });
      return searchOutput();
    },
  );
  await started;
  external.abort(new Error("public cancellation"));
  await assert.rejects(pending, /public cancellation/);
  assert.equal(controller.getActiveToolCallCount(), 0);
});

test("tool errors include stable schemas and exclude caller secrets or internals", async (t) => {
  const service = await createService(t);
  const marker = "SECRET-CALLER-MARKER-/tmp/private";
  const result = await service.callTool(
    "forge.validate.content",
    { content: { marker } },
    new AbortController().signal,
  );
  const serialized = JSON.stringify(result);

  assert.equal(result.isError, true);
  assert.equal(result.structuredContent.schemaId, FORGE_STABLE_ERROR_SCHEMA_ID);
  assert.equal(serialized.includes(marker), false);
  assert.equal(serialized.includes("stack"), false);
  assert.equal(serialized.includes(process.cwd()), false);
  assert.equal(
    result.structuredContent.receipt.disclosures.credentialsIncluded,
    false,
  );
  assert.equal(
    result.structuredContent.receipt.disclosures
      .protectedSourceMaterialIncluded,
    false,
  );
});

test("transport dispatch preserves the server-owned receipt envelope", async (t) => {
  const service = await createService(t);
  const session = new ForgeTransportSession({ toolService: service });
  await initialize(session);
  const response = await session.handleMessage({
    jsonrpc: "2.0",
    id: 2,
    method: "tools/call",
    params: {
      name: "forge.search.lore",
      arguments: { query: "shared moon phrase", maxResults: 1 },
    },
  });

  assert.ok(response && "result" in response);
  assert.equal(response.result.isError, false);
  assert.equal(
    response.result.structuredContent.receipt.schemaId,
    FORGE_INVOCATION_RECEIPT_SCHEMA_ID,
  );
  assert.equal(
    response.result.structuredContent.receipt.authority.canCreateAuthority,
    false,
  );
});
