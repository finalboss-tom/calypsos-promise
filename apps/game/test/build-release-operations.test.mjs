import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  CURRENT_HOSTED_PREVIEW_DECISION,
  PROVIDER_ADAPTERS,
  RELEASE_GATES,
  ROLLBACK_SCENARIOS,
  createUnsignedBuildEvidence,
  evaluateReleaseAuthority,
  validateBuildEvidence,
  validateHostedPreviewDecision,
  validateOperationsContract,
} from "../src/operations/build-release-operations.mjs";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("build evidence is deterministic, unsigned, and non-authorizing", () => {
  const input = {
    sourceRevision: "1".repeat(40),
    lockfileSha256: "2".repeat(64),
    files: [
      { path: "z.js", sha256: "3".repeat(64), bytes: 2 },
      { path: "a.js", sha256: "4".repeat(64), bytes: 1 },
    ],
  };
  const first = createUnsignedBuildEvidence(input);
  const second = createUnsignedBuildEvidence(input);
  assert.deepEqual(first, second);
  assert.deepEqual(
    first.artifacts.map(({ path }) => path),
    ["a.js", "z.js"],
  );
  assert.equal(first.signed, false);
  assert.equal(first.credentialsUsed, false);
  assert.equal(first.releaseAuthorized, false);
  assert.equal(validateBuildEvidence(first, input.sourceRevision).ok, true);
});

test("preview and every release gate remain separately unauthorized", () => {
  assert.equal(
    validateHostedPreviewDecision(CURRENT_HOSTED_PREVIEW_DECISION).ok,
    true,
  );
  assert.equal(
    validateHostedPreviewDecision(CURRENT_HOSTED_PREVIEW_DECISION)
      .authorizesPreview,
    false,
  );
  assert.ok(Object.values(RELEASE_GATES).every((value) => value === false));
  assert.equal(evaluateReleaseAuthority().authorized, false);
});

test("provider exit and rollback remain inspectable without provider authority", () => {
  assert.ok(PROVIDER_ADAPTERS.length >= 7);
  assert.ok(PROVIDER_ADAPTERS.every(({ authority }) => authority === false));
  assert.ok(ROLLBACK_SCENARIOS.some(({ activeNow }) => activeNow === true));
  assert.ok(ROLLBACK_SCENARIOS.some(({ activeNow }) => activeNow === false));
  assert.equal(validateOperationsContract().ok, true);
});

test("operations validator passes against the tracked application and CI", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/validate-build-release-operations.mjs"],
    { cwd: gameRoot, encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Sprint 10\.9 build, release, rollback/);
});
