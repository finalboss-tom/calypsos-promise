import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_CORE_NON_AI_FALLBACKS,
  ASTER_CORE_NON_AI_PATH_IDS,
  ASTER_LOCAL_SCENARIO_IDS,
  ASTER_LOCAL_SYNTHETIC_ADAPTER,
  ASTER_ROLES,
  ASTER_ROLE_OPERATION_BY_ROLE,
  runAsterLocalSyntheticScenario,
  validateAsterLocalSyntheticAdapter,
} from "../dist/index.js";

function codes(result) {
  return result.issues.map((issue) => issue.code);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("the local synthetic adapter validates and covers every required scenario", () => {
  const result = validateAsterLocalSyntheticAdapter(
    ASTER_LOCAL_SYNTHETIC_ADAPTER,
  );
  assert.equal(result.ok, true, JSON.stringify(result.issues, null, 2));
  assert.deepEqual(
    ASTER_LOCAL_SYNTHETIC_ADAPTER.scenarios.map(
      (scenario) => scenario.scenarioId,
    ),
    ASTER_LOCAL_SCENARIO_IDS,
  );
});

test("the local runner is deterministic and uses no provider or ambient runtime", () => {
  const first = runAsterLocalSyntheticScenario("scribe-structured-draft");
  const second = runAsterLocalSyntheticScenario("scribe-structured-draft");
  assert.deepEqual(first, second);
  assert.equal(first.runtime.providerUsed, false);
  assert.equal(first.runtime.networkUsed, false);
  assert.equal(first.runtime.credentialsUsed, false);
  assert.equal(first.runtime.wallClockUsed, false);
  assert.equal(first.runtime.randomnessUsed, false);
  assert.equal(first.runtime.persistentStorageUsed, false);
});

test("successful fixtures cover every Aster role with public operation alignment", () => {
  const successful = ASTER_LOCAL_SYNTHETIC_ADAPTER.scenarios.filter(
    (scenario) => scenario.canPrepareProposal,
  );
  const roles = new Set(successful.map((scenario) => scenario.role));
  for (const role of ASTER_ROLES) {
    assert.equal(roles.has(role), true);
    const scenario = successful.find((candidate) => candidate.role === role);
    assert.equal(scenario.operationId, ASTER_ROLE_OPERATION_BY_ROLE[role]);
    assert.equal(scenario.nonAuthoritative, true);
  }

  for (const scenarioId of [
    "librarian-source-linked-recall",
    "interpreter-source-aware-explanation",
    "storykeeper-confirmed-event-presentation",
  ]) {
    const scenario = runAsterLocalSyntheticScenario(scenarioId).scenario;
    assert.ok(scenario.sourceReferences.length > 0);
  }
});

test("unknown, ambiguous, and low-confidence intent require clarification", () => {
  for (const scenarioId of [
    "unknown-intent",
    "ambiguous-intent",
    "low-confidence",
  ]) {
    const scenario = runAsterLocalSyntheticScenario(scenarioId).scenario;
    assert.equal(scenario.outcome, "clarification-required");
    assert.equal(scenario.clarification.required, true);
    assert.ok(scenario.clarification.question);
    assert.equal(scenario.canPrepareProposal, false);
  }

  const resolved = runAsterLocalSyntheticScenario("clarification-resolved");
  assert.equal(resolved.scenario.clarification.explicitChoiceRecorded, true);
  assert.equal(resolved.scenario.canPrepareProposal, true);
});

test("refusal and prompt injection cannot become proposal work", () => {
  const refusal = runAsterLocalSyntheticScenario("unsupported-refusal");
  assert.equal(refusal.scenario.outcome, "refused");
  assert.ok(refusal.scenario.refusalReason);
  assert.equal(refusal.scenario.canPrepareProposal, false);

  const injection = runAsterLocalSyntheticScenario("prompt-injection");
  assert.equal(injection.scenario.outcome, "untrusted-input-contained");
  assert.ok(injection.scenario.securityFinding);
  assert.equal(injection.scenario.canPrepareProposal, false);
  assert.equal(injection.scenario.fallbackId, "manual-capture");
});

test("timeout and provider unavailability activate complete non-AI fallback", () => {
  for (const scenarioId of ["timeout", "provider-unavailable"]) {
    const scenario = runAsterLocalSyntheticScenario(scenarioId).scenario;
    assert.ok(scenario.fallbackId);
    assert.equal(scenario.canPrepareProposal, false);
  }

  assert.deepEqual(
    ASTER_CORE_NON_AI_FALLBACKS.map((fallback) => fallback.fallbackId),
    ASTER_CORE_NON_AI_PATH_IDS,
  );
  for (const fallback of ASTER_CORE_NON_AI_FALLBACKS) {
    assert.equal(fallback.availableWithoutAi, true);
    assert.equal(fallback.availableWithoutProvider, true);
    assert.equal(fallback.doesNotBroadenPermission, true);
    assert.equal(fallback.cannotBlockCoreRight, true);
  }
});

test("stale and superseded local work cannot replace current results", () => {
  for (const scenarioId of ["stale-work", "superseded-work"]) {
    const scenario = runAsterLocalSyntheticScenario(scenarioId).scenario;
    assert.equal(scenario.mustNotReplaceCurrentResult, true);
    assert.equal(scenario.canPrepareProposal, false);
  }
});

test("validation rejects runtime, fallback, role, and authority escalation", () => {
  const adapter = clone(ASTER_LOCAL_SYNTHETIC_ADAPTER);
  adapter.runtime.providerUsed = true;
  adapter.authority.canWriteCanonicalRecords = true;
  adapter.scenarios[0].operationId = "librarian.prepare-source-linked-recall";
  adapter.scenarios.find(
    (scenario) => scenario.scenarioId === "timeout",
  ).fallbackId = null;
  adapter.coreFallbacks.find(
    (fallback) => fallback.fallbackId === "permission-review",
  ).cannotBlockCoreRight = false;

  const result = validateAsterLocalSyntheticAdapter(adapter);
  assert.equal(result.ok, false);
  assert.ok(codes(result).includes("aster.local.invalid-runtime-boundary"));
  assert.ok(codes(result).includes("aster.local.authority-escalation"));
  assert.ok(codes(result).includes("aster.local.role-operation-mismatch"));
  assert.ok(codes(result).includes("aster.local.missing-fallback"));
  assert.ok(codes(result).includes("aster.local.fallback-blocks-core"));
});
