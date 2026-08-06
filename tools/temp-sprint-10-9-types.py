from pathlib import Path

Path("apps/game/src/operations/build-release-operations.d.mts").write_text(
    '''export type OperationsPlatform = "web" | "ios" | "android";

export interface BuildArtifactEvidence {
  path: string;
  sha256: string;
  bytes: number;
}

export interface BuildInputs {
  node: string;
  packageManager: string;
  expo: string;
  expoRouter: string;
  reactNative: string;
  react: string;
  gameContent: string;
  platforms: readonly OperationsPlatform[];
  command: string;
}

export interface UnsignedBuildEvidence {
  schemaVersion: string;
  operationsContractVersion: string;
  evidenceClass: "repository-ci-unsigned-export";
  informationClass: "PUBLIC_SYNTHETIC";
  sourceRevision: string;
  lockfileSha256: string;
  inputs: Readonly<BuildInputs>;
  artifacts: readonly BuildArtifactEvidence[];
  signed: false;
  credentialsUsed: false;
  releaseAuthorized: false;
  distributionAuthorized: false;
  authority: string;
}

export interface HostedPreviewDecision {
  state: "not-authorized" | "record-complete";
  authorization: boolean;
  sourceRevision: string | null;
  providerProject: string;
  accessState: string;
  indexingDiscovery: string;
  configurationSecrets: string;
  runtimeLimitations: readonly string[];
  dataClasses: readonly "PUBLIC_SYNTHETIC"[];
  monitoringIncidentOwnership: string;
  expiryTeardown: string;
  rollback: string;
}

export interface ProviderAdapter {
  id: string;
  capability: string;
  currentUse: string;
  replacement: string;
  manualFallback: string;
  authority: false;
}

export interface IncidentContract {
  currentScope: string;
  activeOwner: string;
  releaseOwner: string;
  coveredClasses: readonly string[];
  requiredActions: readonly string[];
  outOfScopeUntilCapabilityExists: readonly string[];
}

export interface RollbackScenario {
  id: string;
  activeNow: boolean;
  trigger: string;
  actions: readonly string[];
}

export interface GeneratedStatePolicy {
  generatedPaths: readonly string[];
  tracked: false;
  cleanAfterValidation: true;
  nativeProjectsGenerated: false;
  evidenceLocation: string;
  rule: string;
}

export interface SigningDistributionBoundary {
  easConfigured: false;
  appleSigningConfigured: false;
  googleSigningConfigured: false;
  storeCredentialsPresent: false;
  updateChannelConfigured: false;
  repositorySecretsRequiredForBuildEvidence: false;
  unsignedExportIsReleaseArtifact: false;
  distributionAuthority: false;
  rule: string;
}

export const OPERATIONS_CONTRACT_VERSION: string;
export const BUILD_EVIDENCE_SCHEMA_VERSION: string;
export const BUILD_INPUTS: Readonly<BuildInputs>;
export const RELEASE_GATES: Readonly<Record<string, false>>;
export const HOSTED_PREVIEW_DECISION_FIELDS: readonly string[];
export const CURRENT_HOSTED_PREVIEW_DECISION: Readonly<HostedPreviewDecision>;
export const SIGNING_DISTRIBUTION_BOUNDARY: Readonly<SigningDistributionBoundary>;
export const PROVIDER_ADAPTERS: readonly Readonly<ProviderAdapter>[];
export const PUBLIC_SYNTHETIC_INCIDENT_CONTRACT: Readonly<IncidentContract>;
export const ROLLBACK_SCENARIOS: readonly Readonly<RollbackScenario>[];
export const GENERATED_STATE_POLICY: Readonly<GeneratedStatePolicy>;
export const RESIDUAL_OPERATIONS_LIMITATIONS: readonly string[];

export function validateHostedPreviewDecision(
  decision: HostedPreviewDecision | Record<string, unknown>,
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
'''
)
