const freeze = (value) => {
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
  rule: "Signing, store submission, store approval, public beta, updates, and official release require separate attributable decisions and credentials outside the repository.",
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
    trigger:
      "a separately authorized browser production cutover must be reversed",
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
  rule: "Generated bundles, native projects, credentials, signing material, and deployment output are not durable repository source.",
});

export const RESIDUAL_OPERATIONS_LIMITATIONS = freeze([
  "byte-for-byte reproducibility across independent hosts is not established",
  "no emulator, simulator, physical-device, store, signing, or update-channel qualification exists",
  "no hosted preview or production game deployment exists",
  "no monitoring provider, service-level objective, or on-call rotation is selected",
  "no independent security, privacy, accessibility, legal, release-engineering, or incident-response certification exists",
]);

function requireHex(value, length, label) {
  if (
    typeof value !== "string" ||
    !new RegExp(`^[0-9a-f]{${length}}$`).test(value)
  ) {
    throw new TypeError(
      `${label} must be ${length} lowercase hexadecimal characters`,
    );
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
      throw new TypeError(
        `artifact ${file.path} bytes must be a non-negative integer`,
      );
    }
    return { path: file.path, sha256: file.sha256, bytes: file.bytes };
  });
  normalizedFiles.sort((left, right) => left.path.localeCompare(right.path));
  if (
    new Set(normalizedFiles.map(({ path }) => path)).size !==
    normalizedFiles.length
  ) {
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
    if (
      expectedSourceRevision &&
      evidence.sourceRevision !== expectedSourceRevision
    ) {
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
  const preview = validateHostedPreviewDecision(
    CURRENT_HOSTED_PREVIEW_DECISION,
  );
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
