import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  BUILD_INPUTS,
  CURRENT_HOSTED_PREVIEW_DECISION,
  GENERATED_STATE_POLICY,
  HOSTED_PREVIEW_DECISION_FIELDS,
  PROVIDER_ADAPTERS,
  PUBLIC_SYNTHETIC_INCIDENT_CONTRACT,
  RELEASE_GATES,
  RESIDUAL_OPERATIONS_LIMITATIONS,
  ROLLBACK_SCENARIOS,
  SIGNING_DISTRIBUTION_BOUNDARY,
  createUnsignedBuildEvidence,
  evaluateReleaseAuthority,
  validateBuildEvidence,
  validateHostedPreviewDecision,
  validateOperationsContract,
} from "../src/operations/build-release-operations.mjs";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(gameRoot, "../..");
const read = (path) => readFileSync(resolve(repositoryRoot, path), "utf8");
const gamePackage = JSON.parse(read("apps/game/package.json"));
const rootPackage = JSON.parse(read("package.json"));
const ci = read(".github/workflows/ci.yml");
const operationsSource = read(
  "apps/game/src/operations/build-release-operations.mjs",
);
const writer = read("apps/game/scripts/write-build-evidence.mjs");
const clean = read("apps/game/scripts/clean-generated.mjs");
const shellContract = read("apps/game/scripts/shell-contract.mjs");
const shellLayout = read("apps/game/app/(shell)/_layout.tsx");
const operationsRoute = read("apps/game/app/(shell)/operations.tsx");
const operationsPanel = read(
  "apps/game/src/components/BuildReleaseOperationsPanel.tsx",
);

assert.equal(validateOperationsContract().ok, true);
assert.equal(evaluateReleaseAuthority().authorized, false);
assert.ok(Object.values(RELEASE_GATES).every((value) => value === false));
assert.equal(
  validateHostedPreviewDecision(CURRENT_HOSTED_PREVIEW_DECISION).ok,
  true,
);
assert.equal(
  validateHostedPreviewDecision(CURRENT_HOSTED_PREVIEW_DECISION)
    .authorizesPreview,
  false,
);
for (const field of HOSTED_PREVIEW_DECISION_FIELDS) {
  assert.ok(field in CURRENT_HOSTED_PREVIEW_DECISION);
}
assert.equal(SIGNING_DISTRIBUTION_BOUNDARY.distributionAuthority, false);
assert.equal(PROVIDER_ADAPTERS.length, 7);
assert.ok(PROVIDER_ADAPTERS.every(({ authority }) => authority === false));
assert.ok(
  PUBLIC_SYNTHETIC_INCIDENT_CONTRACT.outOfScopeUntilCapabilityExists.includes(
    "private health data",
  ),
);
assert.equal(ROLLBACK_SCENARIOS.length, 4);
assert.deepEqual(GENERATED_STATE_POLICY.generatedPaths, [
  ".expo",
  "dist",
  "android",
  "ios",
]);
assert.ok(RESIDUAL_OPERATIONS_LIMITATIONS.length >= 5);

const syntheticEvidence = createUnsignedBuildEvidence({
  sourceRevision: "a".repeat(40),
  lockfileSha256: "b".repeat(64),
  files: [
    {
      path: "_expo/static/js/web/example.js",
      sha256: "c".repeat(64),
      bytes: 12,
    },
    { path: "metadata.json", sha256: "d".repeat(64), bytes: 34 },
  ],
});
assert.equal(validateBuildEvidence(syntheticEvidence, "a".repeat(40)).ok, true);
assert.equal(syntheticEvidence.releaseAuthorized, false);
assert.equal(syntheticEvidence.signed, false);
assert.equal(syntheticEvidence.credentialsUsed, false);
assert.deepEqual(syntheticEvidence.inputs, BUILD_INPUTS);

assert.equal(
  gamePackage.scripts.build,
  "expo export --platform all --output-dir dist",
);
for (const script of [
  "build:evidence",
  "validate:build-evidence",
  "validate:operations",
]) {
  assert.ok(gamePackage.scripts[script], `missing operations script ${script}`);
}
assert.match(gamePackage.scripts.lint, /validate-build-release-operations/);
assert.match(rootPackage.scripts["game:validate"], /validate:operations/);
assert.match(ci, /Validate build, release, rollback, and operations evidence/);
assert.match(ci, /build:evidence -- --source "\$GITHUB_SHA"/);
assert.match(
  ci,
  /validate:build-evidence -- --path dist\/build-evidence\.json/,
);
assert.match(ci, /test -f apps\/game\/dist\/build-evidence\.json/);
assert.match(ci, /pnpm --filter @calypsos-promise\/game clean/);
assert.match(ci, /git diff --exit-code/);
assert.match(writer, /pnpm-lock\.yaml/);
assert.match(writer, /sha256/);

for (const path of GENERATED_STATE_POLICY.generatedPaths) {
  assert.match(clean, new RegExp(`"${path.replace(".", "\\.")}"`));
}
for (const forbiddenPath of ["eas.json", "android", "ios"]) {
  assert.equal(new Set(readdirSync(gameRoot)).has(forbiddenPath), false);
}
assert.match(shellContract, /route: "\/operations"/);
assert.match(shellLayout, /href: "\/operations"/);
assert.match(operationsRoute, /BuildReleaseOperationsPanel/);
assert.match(operationsRoute, /BoundaryNotice/);
assert.match(operationsPanel, /CURRENT_HOSTED_PREVIEW_DECISION/);
assert.match(operationsPanel, /PUBLIC_SYNTHETIC_INCIDENT_CONTRACT/);
assert.match(operationsPanel, /ROLLBACK_SCENARIOS/);

for (const source of [operationsSource, operationsRoute, operationsPanel]) {
  assert.doesNotMatch(source, /Date\.now|new Date|Math\.random/);
  assert.doesNotMatch(source, /fetch\s*\(|axios|WebSocket/);
  assert.doesNotMatch(source, /EXPO_PUBLIC_|apiKey|accessToken|secret\s*=/i);
}
for (const forbidden of [
  "@sentry",
  "eas-cli",
  "expo-updates",
  "firebase",
  "posthog",
  "segment",
]) {
  assert.equal(
    Object.keys(gamePackage.dependencies).some((name) =>
      name.includes(forbidden),
    ),
    false,
  );
}

console.log(
  "Sprint 10.9 build, release, rollback, and operations evidence validated:",
);
console.log(
  "- exact source, lockfile, toolchain, platform, and artifact-digest provenance",
);
console.log("- unsigned exports remain evidence rather than release artifacts");
console.log(
  "- preview, production, signing, store, update, beta, and release gates remain false",
);
console.log(
  "- provider replacement and manual fallback cover seven adapter classes",
);
console.log(
  "- incident ownership is limited to public/synthetic shell evidence",
);
console.log(
  "- rollback and generated-state cleanup remain explicit and provider-neutral",
);
