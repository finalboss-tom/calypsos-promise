from pathlib import Path
import json


def write(path: str, content: str) -> None:
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content)


write(
    "apps/game/src/operations/build-release-operations.mjs",
    '''const freeze = (value) => {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const nested of Object.values(value)) {
      freeze(nested);
    }
  }
  return value;
};

export const OPERATIONS_CONTRACT_VERSION = "0.1.0";
export const BUILD_EVIDENCE_SCHEMA_VERSION = "0.1.0";

export const BUILD_INPUTS = freeze({
  node: "24",
  packageManager: "pnpm@10.13.1",
  expo: "57.0.10",
  expoRouter: "57.0.10",
  reactNative: "0.86.2",
  react: "19.2.3",
  gameContent: "0.1.0",
  platforms: ["web", "ios", "android"],
  command: "expo export --platform all --output-dir dist",
});

export const RELEASE_GATES = freeze({
  merge: false,
  hostedPreview: false,
  browserDeployment: false,
  canonicalDomainRouting: false,
  publicNavigation: false,
  indexing: false,
  signing: false,
  storeSubmission: false,
  storeApproval: false,
  publicBeta: false,
  overTheAirUpdate: false,
  officialRelease: false,
  accountActivation: false,
  privateCapability: false,
  longitudinalIntelligence: false,
});

export const HOSTED_PREVIEW_DECISION_FIELDS = freeze([
  "sourceRevision",
  "providerProject",
  "accessState",
  "indexingDiscovery",
  "configurationSecrets",
  "runtimeLimitations",
  "dataClasses",
  "monitoringIncidentOwnership",
  "expiryTeardown",
  "rollback",
]);

export const CURRENT_HOSTED_PREVIEW_DECISION = freeze({
  state: "not-authorized",
  authorization: false,
  sourceRevision: null,
  providerProject: "none selected",
  accessState: "no hosted preview exists",
  indexingDiscovery: "not applicable while no hosted preview exists",
  configurationSecrets: "none selected or provisioned",
  runtimeLimitations: ["repository and CI evidence only"],
  dataClasses: ["PUBLIC_SYNTHETIC"],
  monitoringIncidentOwnership:
    "must be named by a separate attributable hosted-preview decision",
  expiryTeardown: "no hosted resource exists to expire or tear down",
  rollback: "no hosted alias or deployment exists to remove",
});

export const SIGNING_DISTRIBUTION_BOUNDARY = freeze({
  easConfigured: false,
  appleSigningConfigured: false,
  googleSigningConfigured: false,
  storeCredentialsPresent: false,
  updateChannelConfigured: false,
  repositorySecretsRequiredForBuildEvidence: false,
  unsignedExportIsReleaseArtifact: false,
  distributionAuthority: false,
  rule:
    "Signing, store submission, store approval, public beta, updates, and official release require separate attributable decisions and credentials outside the repository.",
});

export const PROVIDER_ADAPTERS = freeze([
  {
    id: "provider.expo",
    capability: "universal application tooling and unsigned export",
    currentUse: "pinned repository dependency",
    replacement:
      "preserve content, deterministic rules, authority contracts, and platform-neutral source before replacing the application toolchain",
    manualFallback:
      "inspect and validate public content and deterministic contracts without hosted Expo services",
    authority: false,
  },
  {
    id: "provider.eas",
    capability: "hosted build, signing, and distribution",
    currentUse: "inactive",
    replacement:
      "select only through a separately reviewed build and signing decision with exportable provenance and credentials",
    manualFallback: "credential-free local Expo export remains available",
    authority: false,
  },
  {
    id: "provider.apple",
    capability: "iOS signing and App Store distribution",
    currentUse: "inactive",
    replacement:
      "repository source and unsigned iOS export remain inspectable if store access is unavailable",
    manualFallback: "no public iOS distribution occurs",
    authority: false,
  },
  {
    id: "provider.google",
    capability: "Android signing and Play distribution",
    currentUse: "inactive",
    replacement:
      "repository source and unsigned Android export remain inspectable if store access is unavailable",
    manualFallback: "no public Android distribution occurs",
    authority: false,
  },
  {
    id: "provider.vercel",
    capability: "browser hosting and canonical-domain routing",
    currentUse: "apps/site only; apps/game remains undeployed",
    replacement:
      "static browser output and repository-owned routing decisions must remain portable",
    manualFallback: "local static export and isolated preview validation",
    authority: false,
  },
  {
    id: "provider.registry",
    capability: "package distribution",
    currentUse: "dependency retrieval only",
    replacement:
      "lockfile, exact versions, local workspace packages, and archived source preserve rebuild inputs",
    manualFallback: "use a reviewed package mirror or source archive",
    authority: false,
  },
  {
    id: "provider.monitoring",
    capability: "hosted telemetry and alerting",
    currentUse: "inactive",
    replacement:
      "public-safe status checks and incident evidence must remain provider-neutral",
    manualFallback:
      "manual route, artifact, network, and error verification for separately authorized previews",
    authority: false,
  },
]);

export const PUBLIC_SYNTHETIC_INCIDENT_CONTRACT = freeze({
  currentScope: "repository-and-CI-evidence",
  activeOwner: "repository maintainer for source and CI evidence",
  releaseOwner:
    "must be named by each separate preview, production, or distribution decision",
  coveredClasses: [
    "incorrect or unavailable public synthetic content",
    "unexpected public discovery or indexing",
    "artifact or source provenance mismatch",
    "unexpected network, secret, provider, or analytics dependency",
    "accessibility or direct-path regression",
    "offline corruption, expiry, conflict, or low-storage regression",
    "provider outage affecting a separately authorized public surface",
  ],
  requiredActions: [
    "contain the affected public surface",
    "preserve public-safe provenance and exact revisions",
    "use the narrowest safe rollback or fix-forward path",
    "verify discovery, aliases, routes, headers, caches, and capability labels",
    "publish a reviewed correction when people were materially affected",
    "route credentials, private logs, and protected evidence outside the public repository",
  ],
  outOfScopeUntilCapabilityExists: [
    "private health data",
    "authentication and account security",
    "payments",
    "clinical workflows",
    "research records",
    "personal inference",
    "production House of Keys",
    "production Aster or model-provider egress",
  ],
});

export const ROLLBACK_SCENARIOS = freeze([
  {
    id: "rollback.repository-candidate",
    activeNow: true,
    trigger: "draft implementation or reconciliation is rejected",
    actions: [
      "keep PR #79 draft or close it without merge",
      "revert or fix forward through ordinary reviewed repository changes",
      "preserve the last accepted main revision",
      "record the exact rejected source and disposition",
    ],
  },
  {
    id: "rollback.hosted-preview",
    activeNow: false,
    trigger: "a separately authorized preview is unsafe, stale, or misleading",
    actions: [
      "remove discovery and aliases",
      "restore access protection or tear down the deployment",
      "verify the rejected source no longer serves",
      "preserve public-safe evidence and privately route protected incident material",
    ],
  },
  {
    id: "rollback.browser-production",
    activeNow: false,
    trigger: "a separately authorized browser production cutover must be reversed",
    actions: [
      "repoint aliases to the last accepted deployment",
      "verify DNS, TLS, routes, headers, CSP, caches, metadata, and capability labels",
      "publish a reviewed correction when materially necessary",
      "record residual obligations and revalidation conditions",
    ],
  },
  {
    id: "rollback.mobile-distribution",
    activeNow: false,
    trigger: "a separately authorized store or update release must be stopped",
    actions: [
      "halt staged rollout or update promotion where the platform permits",
      "restore the last accepted binary or issue a reviewed fix-forward release",
      "verify signing, version, update-channel, store-listing, and support state",
      "record platform limitations because installed clients cannot be remotely erased",
    ],
  },
]);

export const GENERATED_STATE_POLICY = freeze({
  generatedPaths: [".expo", "dist", "android", "ios"],
  tracked: false,
  cleanAfterValidation: true,
  nativeProjectsGenerated: false,
  evidenceLocation: "temporary CI artifact or local dist/build-evidence.json",
  rule:
    "Generated bundles, native projects, credentials, signing material, and deployment output are not durable repository source.",
});

export const RESIDUAL_OPERATIONS_LIMITATIONS = freeze([
  "byte-for-byte reproducibility across independent hosts is not established",
  "no emulator, simulator, physical-device, store, signing, or update-channel qualification exists",
  "no hosted preview or production game deployment exists",
  "no monitoring provider, service-level objective, or on-call rotation is selected",
  "no independent security, privacy, accessibility, legal, release-engineering, or incident-response certification exists",
]);

function requireHex(value, length, label) {
  if (typeof value !== "string" || !new RegExp(`^[0-9a-f]{${length}}$`).test(value)) {
    throw new TypeError(`${label} must be ${length} lowercase hexadecimal characters`);
  }
}

export function validateHostedPreviewDecision(decision) {
  if (!decision || typeof decision !== "object") {
    return { ok: false, authorizesPreview: false, reason: "missing decision" };
  }
  for (const field of HOSTED_PREVIEW_DECISION_FIELDS) {
    if (!(field in decision)) {
      return {
        ok: false,
        authorizesPreview: false,
        reason: `missing hosted-preview field: ${field}`,
      };
    }
  }
  if (decision.authorization !== true) {
    return {
      ok:
        decision.state === "not-authorized" &&
        decision.sourceRevision === null &&
        decision.dataClasses?.length === 1 &&
        decision.dataClasses[0] === "PUBLIC_SYNTHETIC",
      authorizesPreview: false,
      reason: "no hosted preview is authorized",
    };
  }
  try {
    requireHex(decision.sourceRevision, 40, "sourceRevision");
  } catch (error) {
    return { ok: false, authorizesPreview: false, reason: error.message };
  }
  if (
    !Array.isArray(decision.dataClasses) ||
    decision.dataClasses.some((value) => value !== "PUBLIC_SYNTHETIC")
  ) {
    return {
      ok: false,
      authorizesPreview: false,
      reason: "hosted preview data must remain PUBLIC_SYNTHETIC",
    };
  }
  return {
    ok: true,
    authorizesPreview: false,
    reason:
      "a complete decision record remains evidence only; execution requires a separate attributable release action",
  };
}

export function createUnsignedBuildEvidence({
  sourceRevision,
  lockfileSha256,
  files,
}) {
  requireHex(sourceRevision, 40, "sourceRevision");
  requireHex(lockfileSha256, 64, "lockfileSha256");
  if (!Array.isArray(files) || files.length === 0) {
    throw new TypeError("files must contain at least one exported artifact");
  }
  const normalizedFiles = files.map((file) => {
    if (!file || typeof file.path !== "string" || file.path.length === 0) {
      throw new TypeError("artifact path is required");
    }
    requireHex(file.sha256, 64, `artifact ${file.path} sha256`);
    if (!Number.isSafeInteger(file.bytes) || file.bytes < 0) {
      throw new TypeError(`artifact ${file.path} bytes must be a non-negative integer`);
    }
    return { path: file.path, sha256: file.sha256, bytes: file.bytes };
  });
  normalizedFiles.sort((left, right) => left.path.localeCompare(right.path));
  if (new Set(normalizedFiles.map(({ path }) => path)).size !== normalizedFiles.length) {
    throw new TypeError("artifact paths must be unique");
  }
  return freeze({
    schemaVersion: BUILD_EVIDENCE_SCHEMA_VERSION,
    operationsContractVersion: OPERATIONS_CONTRACT_VERSION,
    evidenceClass: "repository-ci-unsigned-export",
    informationClass: "PUBLIC_SYNTHETIC",
    sourceRevision,
    lockfileSha256,
    inputs: BUILD_INPUTS,
    artifacts: normalizedFiles,
    signed: false,
    credentialsUsed: false,
    releaseAuthorized: false,
    distributionAuthorized: false,
    authority:
      "build provenance and artifact inventory only; not preview, production, signing, store, update, or release authority",
  });
}

export function validateBuildEvidence(evidence, expectedSourceRevision) {
  try {
    if (!evidence || typeof evidence !== "object") {
      throw new TypeError("build evidence is missing");
    }
    if (evidence.schemaVersion !== BUILD_EVIDENCE_SCHEMA_VERSION) {
      throw new TypeError("unsupported build evidence schema");
    }
    requireHex(evidence.sourceRevision, 40, "sourceRevision");
    if (expectedSourceRevision && evidence.sourceRevision !== expectedSourceRevision) {
      throw new TypeError("build evidence source revision mismatch");
    }
    requireHex(evidence.lockfileSha256, 64, "lockfileSha256");
    if (JSON.stringify(evidence.inputs) !== JSON.stringify(BUILD_INPUTS)) {
      throw new TypeError("build input contract mismatch");
    }
    if (!Array.isArray(evidence.artifacts) || evidence.artifacts.length === 0) {
      throw new TypeError("artifact inventory is empty");
    }
    for (const artifact of evidence.artifacts) {
      requireHex(artifact.sha256, 64, `artifact ${artifact.path} sha256`);
      if (!Number.isSafeInteger(artifact.bytes) || artifact.bytes < 0) {
        throw new TypeError(`artifact ${artifact.path} has invalid byte size`);
      }
    }
    if (
      evidence.signed !== false ||
      evidence.credentialsUsed !== false ||
      evidence.releaseAuthorized !== false ||
      evidence.distributionAuthorized !== false
    ) {
      throw new TypeError("unsigned evidence cannot claim release authority");
    }
    return { ok: true, releaseAuthorized: false };
  } catch (error) {
    return { ok: false, releaseAuthorized: false, reason: error.message };
  }
}

export function validateOperationsContract() {
  const preview = validateHostedPreviewDecision(CURRENT_HOSTED_PREVIEW_DECISION);
  const gateValues = Object.values(RELEASE_GATES);
  const providerIds = PROVIDER_ADAPTERS.map(({ id }) => id);
  const rollbackIds = ROLLBACK_SCENARIOS.map(({ id }) => id);
  return {
    ok:
      preview.ok &&
      gateValues.every((value) => value === false) &&
      PROVIDER_ADAPTERS.every(({ authority }) => authority === false) &&
      new Set(providerIds).size === providerIds.length &&
      new Set(rollbackIds).size === rollbackIds.length &&
      SIGNING_DISTRIBUTION_BOUNDARY.distributionAuthority === false &&
      GENERATED_STATE_POLICY.tracked === false,
    releaseAuthorized: false,
    previewAuthorized: false,
  };
}

export function evaluateReleaseAuthority() {
  return freeze({
    authorized: false,
    reason:
      "Sprint 10.9 records evidence and gates only. Merge, preview, production, signing, stores, updates, public beta, and official release remain separate attributable decisions.",
  });
}
''',
)

write(
    "apps/game/src/operations/build-release-operations.d.mts",
    '''export type OperationsPlatform = "web" | "ios" | "android";

export interface BuildArtifactEvidence {
  path: string;
  sha256: string;
  bytes: number;
}

export interface UnsignedBuildEvidence {
  schemaVersion: string;
  operationsContractVersion: string;
  evidenceClass: "repository-ci-unsigned-export";
  informationClass: "PUBLIC_SYNTHETIC";
  sourceRevision: string;
  lockfileSha256: string;
  inputs: Readonly<{
    node: string;
    packageManager: string;
    expo: string;
    expoRouter: string;
    reactNative: string;
    react: string;
    gameContent: string;
    platforms: readonly OperationsPlatform[];
    command: string;
  }>;
  artifacts: readonly BuildArtifactEvidence[];
  signed: false;
  credentialsUsed: false;
  releaseAuthorized: false;
  distributionAuthorized: false;
  authority: string;
}

export const OPERATIONS_CONTRACT_VERSION: string;
export const BUILD_EVIDENCE_SCHEMA_VERSION: string;
export const BUILD_INPUTS: Readonly<Record<string, unknown>>;
export const RELEASE_GATES: Readonly<Record<string, false>>;
export const HOSTED_PREVIEW_DECISION_FIELDS: readonly string[];
export const CURRENT_HOSTED_PREVIEW_DECISION: Readonly<Record<string, unknown>>;
export const SIGNING_DISTRIBUTION_BOUNDARY: Readonly<Record<string, unknown>>;
export const PROVIDER_ADAPTERS: readonly Readonly<Record<string, unknown>>[];
export const PUBLIC_SYNTHETIC_INCIDENT_CONTRACT: Readonly<Record<string, unknown>>;
export const ROLLBACK_SCENARIOS: readonly Readonly<Record<string, unknown>>[];
export const GENERATED_STATE_POLICY: Readonly<Record<string, unknown>>;
export const RESIDUAL_OPERATIONS_LIMITATIONS: readonly string[];

export function validateHostedPreviewDecision(
  decision: Record<string, unknown>,
): { ok: boolean; authorizesPreview: false; reason?: string };
export function createUnsignedBuildEvidence(input: {
  sourceRevision: string;
  lockfileSha256: string;
  files: readonly BuildArtifactEvidence[];
}): UnsignedBuildEvidence;
export function validateBuildEvidence(
  evidence: UnsignedBuildEvidence | Record<string, unknown>,
  expectedSourceRevision?: string,
): { ok: boolean; releaseAuthorized: false; reason?: string };
export function validateOperationsContract(): {
  ok: boolean;
  releaseAuthorized: false;
  previewAuthorized: false;
};
export function evaluateReleaseAuthority(): Readonly<{
  authorized: false;
  reason: string;
}>;
''',
)

write(
    "apps/game/scripts/write-build-evidence.mjs",
    '''import { createHash } from "node:crypto";
import {
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { createUnsignedBuildEvidence } from "../src/operations/build-release-operations.mjs";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(gameRoot, "../..");
const distRoot = join(gameRoot, "dist");

function argument(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) {
    throw new TypeError(`missing required argument ${name}`);
  }
  return process.argv[index + 1];
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function listFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

const sourceRevision = argument("--source");
const files = listFiles(distRoot)
  .filter((path) => relative(distRoot, path) !== "build-evidence.json")
  .map((path) => {
    const content = readFileSync(path);
    return {
      path: relative(distRoot, path).replaceAll("\\\\", "/"),
      sha256: sha256(content),
      bytes: content.byteLength,
    };
  });

const evidence = createUnsignedBuildEvidence({
  sourceRevision,
  lockfileSha256: sha256(readFileSync(join(repositoryRoot, "pnpm-lock.yaml"))),
  files,
});

writeFileSync(
  join(distRoot, "build-evidence.json"),
  `${JSON.stringify(evidence, null, 2)}\n`,
);
console.log(
  `Unsigned build evidence written for ${files.length} artifacts at ${sourceRevision}.`,
);
''',
)

write(
    "apps/game/scripts/validate-build-evidence.mjs",
    '''import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { validateBuildEvidence } from "../src/operations/build-release-operations.mjs";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function argument(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) {
    throw new TypeError(`missing required argument ${name}`);
  }
  return process.argv[index + 1];
}

const evidencePath = resolve(gameRoot, argument("--path"));
const sourceRevision = argument("--source");
const evidence = JSON.parse(readFileSync(evidencePath, "utf8"));
const result = validateBuildEvidence(evidence, sourceRevision);
assert.equal(result.ok, true, result.reason);
assert.equal(result.releaseAuthorized, false);
console.log(
  `Unsigned build evidence validated for ${evidence.artifacts.length} artifacts at ${sourceRevision}.`,
);
''',
)

write(
    "apps/game/scripts/validate-build-release-operations.mjs",
    '''import assert from "node:assert/strict";
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
    { path: "_expo/static/js/web/example.js", sha256: "c".repeat(64), bytes: 12 },
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
assert.match(ci, /validate:build-evidence -- --path dist\/build-evidence\.json/);
assert.match(ci, /test -f apps\/game\/dist\/build-evidence\.json/);
assert.match(ci, /pnpm --filter @calypsos-promise\/game clean/);
assert.match(ci, /git diff --exit-code/);
assert.match(writer, /pnpm-lock\.yaml/);
assert.match(writer, /sha256/);

for (const path of GENERATED_STATE_POLICY.generatedPaths) {
  assert.match(clean, new RegExp(`"${path.replace(".", "\\\\.")}"`));
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
    Object.keys(gamePackage.dependencies).some((name) => name.includes(forbidden)),
    false,
  );
}

console.log("Sprint 10.9 build, release, rollback, and operations evidence validated:");
console.log("- exact source, lockfile, toolchain, platform, and artifact-digest provenance");
console.log("- unsigned exports remain evidence rather than release artifacts");
console.log("- preview, production, signing, store, update, beta, and release gates remain false");
console.log("- provider replacement and manual fallback cover seven adapter classes");
console.log("- incident ownership is limited to public/synthetic shell evidence");
console.log("- rollback and generated-state cleanup remain explicit and provider-neutral");
''',
)

write(
    "apps/game/test/build-release-operations.test.mjs",
    '''import assert from "node:assert/strict";
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
  assert.deepEqual(first.artifacts.map(({ path }) => path), ["a.js", "z.js"]);
  assert.equal(first.signed, false);
  assert.equal(first.credentialsUsed, false);
  assert.equal(first.releaseAuthorized, false);
  assert.equal(validateBuildEvidence(first, input.sourceRevision).ok, true);
});

test("preview and every release gate remain separately unauthorized", () => {
  assert.equal(validateHostedPreviewDecision(CURRENT_HOSTED_PREVIEW_DECISION).ok, true);
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
''',
)

write(
    "apps/game/src/components/BuildReleaseOperationsPanel.tsx",
    '''import { StyleSheet, Text, View } from "react-native";

import {
  BUILD_INPUTS,
  CURRENT_HOSTED_PREVIEW_DECISION,
  GENERATED_STATE_POLICY,
  PROVIDER_ADAPTERS,
  PUBLIC_SYNTHETIC_INCIDENT_CONTRACT,
  RELEASE_GATES,
  RESIDUAL_OPERATIONS_LIMITATIONS,
  ROLLBACK_SCENARIOS,
  SIGNING_DISTRIBUTION_BOUNDARY,
  validateOperationsContract,
} from "../operations/build-release-operations.mjs";
import { colors, radii, spacing } from "../theme";

export function BuildReleaseOperationsPanel() {
  const validation = validateOperationsContract();

  return (
    <View style={styles.panel}>
      <View accessibilityRole="summary" style={styles.summary}>
        <Text style={styles.kicker}>CURRENT RELEASE STATE</Text>
        <Text accessibilityRole="header" style={styles.summaryTitle}>
          Reproducible unsigned evidence; no release authority
        </Text>
        <Text style={styles.summaryBody}>
          Browser, iOS, and Android export from exact repository inputs. No
          hosted game preview, signing, store, update, production, or official
          release is active.
        </Text>
        <Text accessibilityLiveRegion="polite" style={styles.validation}>
          Operations contract: {validation.ok ? "passed" : "failed closed"}
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.kicker}>BUILD PROVENANCE</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Pinned universal export inputs
          </Text>
          <View accessibilityRole="list" style={styles.list}>
            {Object.entries(BUILD_INPUTS).map(([name, value]) => (
              <Text key={name} style={styles.body}>
                • {name}: {Array.isArray(value) ? value.join(", ") : value}
              </Text>
            ))}
          </View>
          <Text style={styles.note}>
            CI writes a temporary manifest of exact source, lockfile digest,
            artifact paths, byte sizes, and SHA-256 digests, then removes all
            generated state.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>HOSTED PREVIEW</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            {CURRENT_HOSTED_PREVIEW_DECISION.state}
          </Text>
          <Text style={styles.body}>
            Provider/project: {CURRENT_HOSTED_PREVIEW_DECISION.providerProject}
          </Text>
          <Text style={styles.body}>
            Access: {CURRENT_HOSTED_PREVIEW_DECISION.accessState}
          </Text>
          <Text style={styles.body}>
            Incident owner: {CURRENT_HOSTED_PREVIEW_DECISION.monitoringIncidentOwnership}
          </Text>
          <Text style={styles.note}>
            A future preview must record source revision, access, indexing,
            secrets, limitations, data classes, ownership, expiry, teardown,
            and rollback before execution.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>SEPARATE RELEASE DECISIONS</Text>
        <Text accessibilityRole="header" style={styles.cardTitle}>
          Every release gate remains closed
        </Text>
        <View accessibilityRole="list" style={styles.gateGrid}>
          {Object.entries(RELEASE_GATES).map(([gate, active]) => (
            <View key={gate} style={styles.gate}>
              <Text style={styles.gateName}>{gate}</Text>
              <Text style={styles.closed}>{active ? "ACTIVE" : "NOT AUTHORIZED"}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.note}>
          {SIGNING_DISTRIBUTION_BOUNDARY.rule}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>PROVIDER REPLACEMENT</Text>
        <Text accessibilityRole="header" style={styles.cardTitle}>
          Providers remain adapters, not authorities
        </Text>
        <View accessibilityRole="list" style={styles.grid}>
          {PROVIDER_ADAPTERS.map((provider) => (
            <View key={provider.id} style={styles.subcard}>
              <Text style={styles.subcardTitle}>{provider.id}</Text>
              <Text style={styles.body}>{provider.capability}</Text>
              <Text style={styles.body}>Current: {provider.currentUse}</Text>
              <Text style={styles.note}>Replacement: {provider.replacement}</Text>
              <Text style={styles.note}>Fallback: {provider.manualFallback}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.kicker}>INCIDENT OWNERSHIP</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Public/synthetic scope only
          </Text>
          <Text style={styles.body}>
            Current owner: {PUBLIC_SYNTHETIC_INCIDENT_CONTRACT.activeOwner}
          </Text>
          <View accessibilityRole="list" style={styles.list}>
            {PUBLIC_SYNTHETIC_INCIDENT_CONTRACT.requiredActions.map((action) => (
              <Text key={action} style={styles.body}>
                • {action}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>GENERATED STATE</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Temporary and removed after validation
          </Text>
          <Text style={styles.body}>
            Paths: {GENERATED_STATE_POLICY.generatedPaths.join(", ")}
          </Text>
          <Text style={styles.note}>{GENERATED_STATE_POLICY.rule}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>ROLLBACK</Text>
        <Text accessibilityRole="header" style={styles.cardTitle}>
          Narrow, attributable, and provider-neutral
        </Text>
        <View accessibilityRole="list" style={styles.grid}>
          {ROLLBACK_SCENARIOS.map((scenario) => (
            <View key={scenario.id} style={styles.subcard}>
              <Text style={styles.subcardTitle}>{scenario.id}</Text>
              <Text style={styles.body}>Trigger: {scenario.trigger}</Text>
              <Text style={styles.closed}>
                {scenario.activeNow ? "CURRENTLY APPLICABLE" : "FUTURE HOLDPOINT"}
              </Text>
              {scenario.actions.map((action) => (
                <Text key={action} style={styles.note}>
                  • {action}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>RESIDUAL LIMITATIONS</Text>
        <Text accessibilityRole="header" style={styles.cardTitle}>
          Evidence still required before release
        </Text>
        <View accessibilityRole="list" style={styles.list}>
          {RESIDUAL_OPERATIONS_LIMITATIONS.map((limitation) => (
            <Text key={limitation} style={styles.body}>
              • {limitation}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.large },
  summary: {
    borderRadius: radii.large,
    backgroundColor: colors.nightSoft,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    padding: spacing.large,
    gap: spacing.small,
  },
  kicker: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  summaryTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 31,
  },
  summaryBody: { color: colors.foam, fontSize: 15, lineHeight: 23 },
  validation: { color: colors.goldSoft, fontSize: 14, fontWeight: "800" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.medium,
  },
  card: {
    flexGrow: 1,
    flexBasis: 340,
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paper,
    padding: spacing.large,
    gap: spacing.small,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
  },
  list: { gap: spacing.xsmall },
  body: { color: colors.inkSoft, fontSize: 14, lineHeight: 21 },
  note: { color: colors.ink, fontSize: 13, lineHeight: 20 },
  gateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  gate: {
    flexGrow: 1,
    flexBasis: 180,
    borderRadius: radii.medium,
    backgroundColor: colors.parchment,
    padding: spacing.medium,
    gap: spacing.xsmall,
  },
  gateName: { color: colors.ink, fontSize: 14, fontWeight: "800" },
  closed: { color: colors.coral, fontSize: 11, fontWeight: "800" },
  subcard: {
    flexGrow: 1,
    flexBasis: 260,
    borderRadius: radii.medium,
    backgroundColor: colors.parchment,
    padding: spacing.medium,
    gap: spacing.xsmall,
  },
  subcardTitle: { color: colors.ink, fontSize: 15, fontWeight: "800" },
});
''',
)

write(
    "apps/game/app/(shell)/operations.tsx",
    '''import { BuildReleaseOperationsPanel } from "../../src/components/BuildReleaseOperationsPanel";
import { BoundaryNotice } from "../../src/components/BoundaryNotice";
import { ShellPage } from "../../src/components/ShellPage";

export default function OperationsScreen() {
  return (
    <ShellPage
      eyebrow="BUILD AND OPERATIONS EVIDENCE"
      title="Inspect what can be built—and what is still not released."
      intro="Sprint 10.9 records exact unsigned build provenance, release gates, provider replacement, incident scope, rollback, and cleanup without deploying the game or selecting signing, store, update, or monitoring providers."
      aside={
        <BoundaryNotice>
          Passing CI or exporting browser, iOS, and Android bundles does not
          authorize preview hosting, production, signing, store submission,
          public beta, official release, accounts, private data, or
          Longitudinal Intelligence.
        </BoundaryNotice>
      }
    >
      <BuildReleaseOperationsPanel />
    </ShellPage>
  );
}
''',
)

write(
    "docs/roadmap/sprint-10.9-build-release-rollback-operations-evidence.md",
    '''# Sprint 10.9 — Build, release, rollback, and operations evidence

- **Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION
- **Parent:** Sprint 10 — universal game shell
- **Tracker:** issue #80
- **Implementation:** draft PR #79

## Decision

Establish reproducible-input and artifact-provenance evidence, release decision gates, provider replacement, public/synthetic incident ownership, rollback, and generated-state cleanup without creating a release pipeline or authorizing deployment.

## Build provenance

The universal application continues to export browser, iOS, and Android bundles without credentials. CI now writes and validates a temporary versioned manifest containing:

- exact source revision;
- lockfile SHA-256;
- pinned Node, pnpm, Expo, Expo Router, React Native, React, and game-content versions;
- exact export command and platform set;
- sorted artifact paths;
- artifact byte sizes; and
- artifact SHA-256 digests.

The manifest classifies the output as repository/CI unsigned evidence. It explicitly records that no credentials were used and that signing, distribution, preview, production, and release authority remain false. Generated artifacts and the manifest are removed after validation.

This establishes inspectable rebuild inputs and artifact identity for the named environment. It does not claim byte-for-byte reproducibility across independent hosts.

## Preview and production decisions

No hosted game preview is authorized or active. A future hosted preview requires an attributable record naming:

- exact source revision;
- provider and project;
- access state;
- indexing and discovery behavior;
- configuration and secret inventory;
- runtime limitations;
- data classes;
- monitoring and incident ownership;
- expiry or teardown behavior; and
- rollback.

Merge, hosted preview, browser deployment, canonical-domain routing, public navigation, indexing, signing, store submission, store approval, public beta, over-the-air update, official release, account activation, private capability, and Longitudinal Intelligence activation remain separate closed gates.

## Signing and distribution

Sprint 10.9 configures no EAS project, Apple signing, Google signing, store credentials, store listing, update channel, public beta, or official mobile release.

Unsigned local and CI exports are build evidence, not distributable release artifacts. Credentials and signing material remain outside repository source and require separately reviewed ownership, rotation, revocation, compromise response, and rollback before use.

## Provider replacement

Expo, EAS, Apple, Google, Vercel, package registries, build services, and monitoring services remain adapters.

Repository source, the versioned public/synthetic content package, deterministic rules, authority contracts, exact dependency versions, manual local export, and public-safe evidence remain the portable center. Provider failure cannot grant product authority or silently activate a replacement.

## Monitoring and incident ownership

Current ownership covers repository source and CI evidence for the public/synthetic shell only. Each future preview, production, store, or update decision must name its operational and incident owner.

The current incident classes cover public/synthetic content errors, unexpected discovery, provenance mismatch, unexpected network or secret dependencies, accessibility regressions, offline-state failures, and provider outages affecting an authorized public surface.

Private health data, authentication, payments, clinical workflows, research records, personal inference, production House of Keys, and production Aster/model incidents remain out of scope until those capabilities exist and receive separate operations plans.

Protected logs, credentials, private provider records, and sensitive incident evidence do not belong in the public repository.

## Rollback

The currently active rollback path is repository-only: keep PR #79 draft, close it without merge, or revert/fix forward through ordinary reviewed changes while preserving the last accepted `main` revision.

Future preview, production-browser, and mobile-distribution rollback scenarios are defined but inactive. They require removal or restoration of discovery and aliases, exact source verification, provider-neutral evidence, correction when people were materially affected, and explicit platform limitations.

No private-data, account, payment, permission, model-memory, or durable-gameplay migration exists to reverse in Sprint 10.

## Generated-state cleanup

`.expo`, `dist`, generated `android`, and generated `ios` directories are temporary validation state and are removed after build evidence is validated. Native projects, credentials, signing material, deployment output, and build artifacts remain untracked.

CI verifies no tracked build mutation after cleanup.

## Residual limitations

Sprint 10.9 is maintainer repository, CI, unsigned-export, and operations-contract evidence. It is not:

- independent release-engineering certification;
- byte-for-byte multi-host reproducibility evidence;
- emulator, simulator, physical-device, store, signing, or update qualification;
- hosted-preview or production readiness;
- a monitoring service, service-level objective, or on-call program;
- independent security, privacy, accessibility, legal, incident-response, or affected-user evidence; or
- authorization to merge, deploy, distribute, release, begin Sprint 11, activate LI-V1 through LI-V8, or exit institutional Phase 0.

## Validation target

The exact implementation checkpoint must pass focused operations and build-evidence tests, the complete permanent repository suite, real browser/iOS/Android unsigned export, source-bound build-manifest generation and validation, existing production-site validation, generated-state cleanup, no tracked mutation, and DCO.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation and reconciliation, the next implementation step is Sprint 10.10 on the same branch and PR.
''',
)

# Update JSON scripts.
game_package_path = Path("apps/game/package.json")
game_package = json.loads(game_package_path.read_text())
game_scripts = game_package["scripts"]
game_scripts["build:evidence"] = "node scripts/write-build-evidence.mjs"
game_scripts["validate:build-evidence"] = "node scripts/validate-build-evidence.mjs"
game_scripts["validate:operations"] = "node scripts/validate-build-release-operations.mjs"
if "validate-build-release-operations.mjs" not in game_scripts["lint"]:
    game_scripts["lint"] += " && node scripts/validate-build-release-operations.mjs"
game_package_path.write_text(json.dumps(game_package, indent=2) + "\n")

root_package_path = Path("package.json")
root_package = json.loads(root_package_path.read_text())
root_package["scripts"]["game:validate"] = (
    "pnpm --filter @calypsos-promise/game validate:toolchain && "
    "pnpm --filter @calypsos-promise/game validate:operations"
)
root_package_path.write_text(json.dumps(root_package, indent=2) + "\n")

# Expand generated-state cleanup.
clean_path = Path("apps/game/scripts/clean-generated.mjs")
clean_source = clean_path.read_text()
clean_source = clean_source.replace(
    'for (const path of [".expo", "dist"]) {',
    'for (const path of [".expo", "dist", "android", "ios"]) {',
)
clean_path.write_text(clean_source)

# Add operations to shell navigation and contract.
layout_path = Path("apps/game/app/(shell)/_layout.tsx")
layout = layout_path.read_text()
layout = layout.replace(
    '  { href: "/accessibility", label: "Accessibility" },\n',
    '  { href: "/accessibility", label: "Accessibility" },\n  { href: "/operations", label: "Operations" },\n',
)
layout_path.write_text(layout)

shell_contract_path = Path("apps/game/scripts/shell-contract.mjs")
shell_contract = shell_contract_path.read_text()
shell_contract = shell_contract.replace(
    '  {\n    route: "/account",\n',
    '  {\n    route: "/operations",\n    file: "app/(shell)/operations.tsx",\n    purpose: "build, release, rollback, and operations evidence",\n  },\n  {\n    route: "/account",\n',
)
shell_contract_path.write_text(shell_contract)

shell_test_path = Path("apps/game/test/shell-navigation.test.mjs")
shell_test = shell_test_path.read_text()
shell_test = shell_test.replace(
    "assert.equal(new Set(routes).size, 8);",
    "assert.equal(new Set(routes).size, 9);",
)
shell_test = shell_test.replace(
    '      "/map",\n      "/unavailable",',
    '      "/map",\n      "/operations",\n      "/unavailable",',
)
shell_test_path.write_text(shell_test)

# Add explicit build evidence to permanent CI.
ci_path = Path(".github/workflows/ci.yml")
ci = ci_path.read_text()
ci = ci.replace(
    '      - name: Validate application and toolchain boundary\n        run: pnpm game:validate\n\n      - name: Export browser, iOS, and Android bundles without credentials\n        run: pnpm --filter @calypsos-promise/game build\n',
    '      - name: Validate application and toolchain boundary\n        run: pnpm game:validate\n\n      - name: Validate build, release, rollback, and operations evidence\n        run: pnpm --filter @calypsos-promise/game validate:operations\n\n      - name: Export browser, iOS, and Android bundles without credentials\n        run: pnpm --filter @calypsos-promise/game build\n\n      - name: Write deterministic unsigned build evidence\n        run: pnpm --filter @calypsos-promise/game build:evidence -- --source "$GITHUB_SHA"\n\n      - name: Validate deterministic unsigned build evidence\n        run: |\n          test -f apps/game/dist/build-evidence.json\n          pnpm --filter @calypsos-promise/game validate:build-evidence -- --path dist/build-evidence.json --source "$GITHUB_SHA"\n',
)
ci_path.write_text(ci)

# Append README explanation once.
readme_path = Path("apps/game/README.md")
readme = readme_path.read_text()
marker = "## Sprint 10.9 build and operations evidence"
if marker not in readme:
    readme += '''\n## Sprint 10.9 build and operations evidence\n\n`/operations` exposes the public/synthetic build, release-gate, provider-replacement, incident, rollback, and cleanup contract. CI exports all three platforms without credentials, writes and validates a source-bound SHA-256 artifact manifest, removes generated state, and proves no tracked mutation.\n\nThis is unsigned maintainer build evidence. It is not a hosted preview, signing configuration, store artifact, update channel, production deployment, monitoring service, public beta, or official release.\n'''
readme_path.write_text(readme)
