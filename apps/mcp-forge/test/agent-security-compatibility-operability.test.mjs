import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";
import test from "node:test";

import {
  FORGE_7_1_PUBLIC_FIXTURE,
  FORGE_AGENT_SECURITY_SCENARIO_IDS,
  FORGE_AGENT_SECURITY_VALIDATION_CODES,
  FORGE_BOUNDARY,
  FORGE_COMPATIBILITY_MANIFEST,
  FORGE_EXECUTION_ERROR_CODES,
  FORGE_OPERABILITY_CONTRACT,
  FORGE_RUNTIME_ENABLED_TOOL_IDS,
  FORGE_RUNTIME_EXECUTION_SCOPES,
  FORGE_RUNTIME_TOOL_DESCRIPTORS,
  FORGE_RUNTIME_TOOL_REGISTRY,
  FORGE_SECURITY_ERROR_CODES,
  FORGE_SOURCE_CATALOGUE,
  FORGE_TOOL_NON_AUTHORITY,
  FORGE_TOOL_REGISTRY,
  FORGE_VALIDATION_CODES,
  ForgeLoreSchemaToolService,
  ForgeSecureToolExecutionController,
  ForgeSourceRepository,
  validateForgeAgentSecurityOperability,
  validateForgeBaseline,
  validateForgeRuntimeIntegrity,
} from "../dist/index.js";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));

async function createService(t) {
  const root = await mkdtemp(join(tmpdir(), "forge-7-9-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, "content", "private"), { recursive: true });
  await mkdir(join(root, "content", "protected"), { recursive: true });
  await writeFile(
    join(root, "content", "public.json"),
    JSON.stringify({
      id: "dialogue.synthetic.security",
      kind: "dialogue",
      title: "Security fixture",
      text: "A public synthetic moon path remains visible.",
    }),
  );
  await writeFile(
    join(root, "content", "private", "secret.json"),
    JSON.stringify({ secret: "protected-marker-do-not-return" }),
  );
  await writeFile(
    join(root, "content", "protected", "secret.json"),
    JSON.stringify({ secret: "protected-marker-do-not-return" }),
  );
  await writeFile(
    join(root, "content", "credentials.json"),
    JSON.stringify({ token: "credential-marker-do-not-return" }),
  );
  const repository = await ForgeSourceRepository.forSyntheticTests(root);
  return { root, service: new ForgeLoreSchemaToolService(repository) };
}

const searchOutput = (overrides = {}) => ({
  toolId: "forge.search.lore",
  revision: "1",
  query: "bounded",
  matches: [],
  resultState: "complete",
  partialReasons: [],
  scannedFiles: 0,
  returnedMatches: 0,
  canonAcceptance: "not-granted",
  ...FORGE_TOOL_NON_AUTHORITY,
  ...overrides,
});

const mappingOutput = (overrides = {}) => ({
  toolId: "forge.validate.mapping-draft",
  revision: "1",
  mappingRevision: "1",
  valid: true,
  issues: [],
  identity: {
    id: "mapping.synthetic.security",
    kind: "mapping-draft",
    revision: "1",
    status: "draft",
  },
  inputMode: "inline-public",
  inputInformationClass: "public-synthetic-fixture",
  humanReviewRequired: true,
  mappingApproval: "not-granted",
  semanticEquivalence: "not-proven",
  connectorBehavior: "not-proven",
  certification: "not-granted",
  productionReadiness: "not-established",
  providerPreference: "none",
  ...FORGE_TOOL_NON_AUTHORITY,
  ...overrides,
});

async function sourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(path)));
    else if (entry.isFile() && entry.name.endsWith(".ts")) files.push(path);
  }
  return files;
}

const integritySurface = () => ({
  boundary: structuredClone(FORGE_BOUNDARY),
  acceptedToolRegistry: structuredClone(FORGE_TOOL_REGISTRY),
  sourceCatalogue: structuredClone(FORGE_SOURCE_CATALOGUE),
  runtimeEnabledToolIds: structuredClone(FORGE_RUNTIME_ENABLED_TOOL_IDS),
  runtimeToolDescriptors: structuredClone(FORGE_RUNTIME_TOOL_DESCRIPTORS),
  runtimeToolRegistry: structuredClone(FORGE_RUNTIME_TOOL_REGISTRY),
  executionScopes: structuredClone(FORGE_RUNTIME_EXECUTION_SCOPES),
});

test("agent-security, compatibility, migration, and operability contracts validate", () => {
  assert.deepEqual(validateForgeAgentSecurityOperability(), []);
  assert.equal(FORGE_AGENT_SECURITY_SCENARIO_IDS.length, 18);
  assert.equal(
    new Set(FORGE_AGENT_SECURITY_SCENARIO_IDS).size,
    FORGE_AGENT_SECURITY_SCENARIO_IDS.length,
  );
  assert.equal(FORGE_COMPATIBILITY_MANIFEST.runtimeRegistryRevision, "4");
  assert.equal(FORGE_COMPATIBILITY_MANIFEST.executionContractRevision, "1");
  assert.equal(
    FORGE_OPERABILITY_CONTRACT.issue50ActivationState,
    "not-triggered",
  );
  assert.equal(FORGE_OPERABILITY_CONTRACT.asterPackageDependency, false);

  const matrix = FORGE_AGENT_SECURITY_SCENARIO_IDS.map((id) => ({
    id,
    revision: "1",
    expectedBehavior: "reject-before-operation",
    evidenceClass: "direct-runtime-test",
    publicOrSyntheticOnly: true,
    canExpandAuthority: false,
    canSuppressEvidence: false,
  }));
  matrix[0].canExpandAuthority = true;
  const compatibility = structuredClone(FORGE_COMPATIBILITY_MANIFEST);
  compatibility.migrations[0].authorityExpanded = true;
  const operability = structuredClone(FORGE_OPERABILITY_CONTRACT);
  operability.cleanStartupRequiresProvider = true;
  const issues = validateForgeAgentSecurityOperability(
    matrix,
    compatibility,
    operability,
  );
  assert.ok(
    issues.some(
      (entry) =>
        entry.code === FORGE_AGENT_SECURITY_VALIDATION_CODES.scenarioBoundary,
    ),
  );
  assert.ok(
    issues.some(
      (entry) =>
        entry.code === FORGE_AGENT_SECURITY_VALIDATION_CODES.migrationInvalid,
    ),
  );
  assert.ok(
    issues.some(
      (entry) =>
        entry.code ===
        FORGE_AGENT_SECURITY_VALIDATION_CODES.operabilityBoundary,
    ),
  );
});

test("runtime integrity detects registry, scope, source, and funding mutation", () => {
  assert.deepEqual(validateForgeRuntimeIntegrity(), []);
  const surface = integritySurface();
  surface.runtimeEnabledToolIds.pop();
  surface.executionScopes[0].limits.maxResults += 1;
  surface.sourceCatalogue[0].callerCanSelectRoot = true;
  surface.boundary.funding.canControlValidationOutcome = true;
  const issues = validateForgeRuntimeIntegrity(surface);
  for (const path of [
    "runtimeEnabledToolIds",
    "executionScopes",
    "sourceCatalogue",
    "boundary",
  ]) {
    assert.ok(issues.some((entry) => entry.path === path));
  }

  const baseline = structuredClone(FORGE_7_1_PUBLIC_FIXTURE);
  baseline.boundary.funding.canControlValidationOutcome = true;
  assert.ok(
    validateForgeBaseline(baseline).some(
      (entry) => entry.code === FORGE_VALIDATION_CODES.fundingMustNotControl,
    ),
  );
});

test("production source and dependencies remain provider-independent and incapable of shell, network, or dynamic loading", async () => {
  const forbidden = [
    /from\s+["']node:(?:child_process|cluster|dgram|dns|http|https|net|tls|vm|worker_threads)["']/,
    /\bfetch\s*\(/,
    /\bWebSocket\s*\(/,
    /\bXMLHttpRequest\b/,
    /\beval\s*\(/,
    /\bnew\s+Function\s*\(/,
    /\bimport\s*\(/,
    /\brequire\s*\(/,
  ];
  for (const path of await sourceFiles(join(packageRoot, "src"))) {
    const source = await readFile(path, "utf8");
    for (const pattern of forbidden) {
      assert.equal(pattern.test(source), false, `${path} matched ${pattern}`);
    }
  }
  const packageJson = JSON.parse(
    await readFile(join(packageRoot, "package.json"), "utf8"),
  );
  assert.deepEqual(Object.keys(packageJson.dependencies ?? {}), [
    "@calypsos-promise/content-schema",
  ]);
});

test("inputs cannot select roots, invoke capabilities, suppress evidence, or buy outcomes", async (t) => {
  const { service } = await createService(t);
  const markers = [
    ["sourceRootId", "caller-root-marker"],
    ["command", "malicious-shell-marker"],
    ["url", "network-marker.invalid"],
    ["module", "dynamic-module-marker"],
    ["suppressProvenance", "suppress-provenance-marker"],
    ["suppressPartialReasons", "suppress-reasons-marker"],
    ["sponsorOverride", "funding-influence-marker"],
  ];
  for (const [key, marker] of markers) {
    const result = await service.callTool(
      "forge.search.lore",
      { query: "moon", [key]: marker },
      new AbortController().signal,
    );
    assert.equal(result.isError, true);
    assert.equal(
      result.structuredContent.error.code,
      "forge.tool.invalid-input",
    );
    assert.equal(JSON.stringify(result).includes(marker), false);
    assert.equal(
      result.structuredContent.receipt.authority.resultAuthority,
      "none",
    );
  }

  let networkCalls = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    networkCalls += 1;
    throw new Error("network must not be used");
  };
  try {
    const generated = await service.callTool(
      "forge.generate.synthetic-data",
      { kind: "quest", seed: "provider-independent", count: 1 },
      new AbortController().signal,
    );
    assert.equal(generated.isError, false);
    assert.equal(networkCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("protected and traversal source attempts fail without leakage", async (t) => {
  const { root, service } = await createService(t);
  for (const sourcePath of [
    "../README.md",
    "private/secret.json",
    "protected/secret.json",
    "credentials.json",
  ]) {
    const result = await service.callTool(
      "forge.validate.content",
      { sourcePath },
      new AbortController().signal,
    );
    const serialized = JSON.stringify(result);
    assert.equal(result.isError, true);
    for (const marker of [
      root,
      sourcePath,
      "protected-marker-do-not-return",
      "credential-marker-do-not-return",
    ]) {
      assert.equal(serialized.includes(marker), false);
    }
  }
});

test("confused-deputy, evidence suppression, synthetic-label removal, and mapping self-approval fail closed", async (t) => {
  const { service } = await createService(t);
  const controller = new ForgeSecureToolExecutionController();
  const signal = new AbortController().signal;

  const suppressed = await controller.execute(
    "forge.search.lore",
    { query: "bounded" },
    signal,
    async () =>
      searchOutput({
        resultState: "complete",
        partialReasons: ["file-limit-reached"],
      }),
  );
  assert.equal(
    suppressed.structuredContent.error.code,
    FORGE_SECURITY_ERROR_CODES.postconditionFailed,
  );

  const noProvenance = await controller.execute(
    "forge.search.lore",
    { query: "bounded" },
    signal,
    async () =>
      searchOutput({
        matches: [{ excerpt: "missing provenance" }],
        returnedMatches: 1,
      }),
  );
  assert.equal(
    noProvenance.structuredContent.error.code,
    FORGE_SECURITY_ERROR_CODES.postconditionFailed,
  );

  const redirected = await controller.execute(
    "forge.search.lore",
    { query: "bounded" },
    signal,
    async () => searchOutput({ toolId: "forge.search.architecture" }),
  );
  assert.equal(
    redirected.structuredContent.error.code,
    FORGE_EXECUTION_ERROR_CODES.invalidToolResult,
  );

  const generated = await service.generateSyntheticData(
    { kind: "quest", seed: "label-removal", count: 1 },
    signal,
  );
  const unlabeled = structuredClone(generated);
  unlabeled.records[0].synthetic = false;
  const unlabeledResult = await controller.execute(
    "forge.generate.synthetic-data",
    { kind: "quest", seed: "label-removal", count: 1 },
    signal,
    async () => unlabeled,
  );
  assert.equal(
    unlabeledResult.structuredContent.error.code,
    FORGE_SECURITY_ERROR_CODES.postconditionFailed,
  );

  const approved = await controller.execute(
    "forge.validate.mapping-draft",
    { mapping: {}, informationClass: "public-synthetic-fixture" },
    signal,
    async () => mappingOutput({ mappingApproval: "granted" }),
  );
  assert.equal(
    approved.structuredContent.error.code,
    FORGE_SECURITY_ERROR_CODES.postconditionFailed,
  );
});

test("clean entrypoint startup succeeds from a descendant directory with an empty environment", async () => {
  const child = spawn(
    process.execPath,
    [join(packageRoot, "dist", "stdio-entry.js")],
    {
      cwd: join(packageRoot, "src"),
      env: {},
      stdio: ["pipe", "pipe", "pipe"],
    },
  );
  const stderr = [];
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => stderr.push(chunk));

  const queued = [];
  const waiters = [];
  const lines = createInterface({ input: child.stdout });
  lines.on("line", (line) => {
    const message = JSON.parse(line);
    const waiter = waiters.shift();
    if (waiter) waiter(message);
    else queued.push(message);
  });
  const next = () =>
    queued.length > 0
      ? Promise.resolve(queued.shift())
      : new Promise((resolve) => waiters.push(resolve));
  const timeout = setTimeout(() => child.kill("SIGKILL"), 15_000);

  try {
    child.stdin.write(
      `${JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-11-25",
          capabilities: {},
          clientInfo: { name: "clean-startup-test", version: "1" },
        },
      })}\n`,
    );
    assert.equal((await next()).result.protocolVersion, "2025-11-25");
    child.stdin.write(
      `${JSON.stringify({
        jsonrpc: "2.0",
        method: "notifications/initialized",
        params: {},
      })}\n`,
    );
    child.stdin.write(
      `${JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list" })}\n`,
    );
    assert.equal((await next()).result.tools.length, 10);
    child.stdin.write(
      `${JSON.stringify({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: {
          name: "forge.generate.synthetic-data",
          arguments: { kind: "quest", seed: "clean-startup", count: 1 },
        },
      })}\n`,
    );
    const result = (await next()).result;
    assert.equal(result.isError, false);
    assert.equal(
      result.structuredContent.receipt.schemaId,
      "forge.invocation-receipt.v1",
    );
    child.stdin.end();
    const exitCode = await new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("close", resolve);
    });
    assert.equal(exitCode, 0);
    assert.equal(stderr.join(""), "");
  } finally {
    clearTimeout(timeout);
    lines.close();
    if (!child.killed && child.exitCode === null) child.kill("SIGKILL");
  }
});
