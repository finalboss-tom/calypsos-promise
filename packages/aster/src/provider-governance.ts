import type { AsterRoleOperationId } from "./role-contracts.js";
import {
  ASTER_CONTRACT_VERSION,
  type AsterContractVersion,
} from "./version.js";

export const ASTER_PROVIDER_SERVICE_CLASSES = [
  "model-inference",
  "embedding-or-retrieval",
  "document-processing",
  "speech-processing",
  "image-processing",
  "translation",
  "safety-or-moderation",
] as const;
export type AsterProviderServiceClass =
  (typeof ASTER_PROVIDER_SERVICE_CLASSES)[number];

export const ASTER_PROVIDER_INFORMATION_CLASSES = [
  "public",
  "synthetic",
  "private-personal",
  "protected-operational",
] as const;
export type AsterProviderInformationClass =
  (typeof ASTER_PROVIDER_INFORMATION_CLASSES)[number];

export const ASTER_PROVIDER_GOVERNANCE_STATES = [
  "not-approved",
  "synthetic-evaluation-only",
  "specialist-review-required",
  "blocked",
  "retired",
] as const;
export type AsterProviderGovernanceState =
  (typeof ASTER_PROVIDER_GOVERNANCE_STATES)[number];

export const ASTER_PROVIDER_EGRESS_MODES = [
  "none",
  "public-or-synthetic-minimum-necessary",
  "private-egress-specialist-hold",
] as const;
export type AsterProviderEgressMode =
  (typeof ASTER_PROVIDER_EGRESS_MODES)[number];

export const ASTER_PROVIDER_FIELD_CLASSES = [
  "task-instruction",
  "synthetic-input",
  "public-educational-excerpt",
  "source-reference",
  "output-schema",
  "player-expression",
  "chronicle-record",
  "subject-identifier",
  "account-identifier",
  "house-of-keys-fact",
  "permission-decision",
  "receipt",
  "memory",
  "provider-operational-metadata",
  "protected-audit",
  "credential-or-secret",
] as const;
export type AsterProviderFieldClass =
  (typeof ASTER_PROVIDER_FIELD_CLASSES)[number];

export const ASTER_PROVIDER_ALLOWED_SYNTHETIC_EGRESS_FIELDS = [
  "task-instruction",
  "synthetic-input",
  "public-educational-excerpt",
  "source-reference",
  "output-schema",
] as const satisfies readonly AsterProviderFieldClass[];

export const ASTER_PROVIDER_MANDATORY_PROHIBITED_FIELDS = [
  "player-expression",
  "chronicle-record",
  "subject-identifier",
  "account-identifier",
  "house-of-keys-fact",
  "permission-decision",
  "receipt",
  "memory",
  "provider-operational-metadata",
  "protected-audit",
  "credential-or-secret",
] as const satisfies readonly AsterProviderFieldClass[];

export const ASTER_PROVIDER_RETENTION_MODES = [
  "no-retention",
  "bounded-retention",
  "unknown",
] as const;
export type AsterProviderRetentionMode =
  (typeof ASTER_PROVIDER_RETENTION_MODES)[number];

export const ASTER_PROVIDER_LOGGING_MODES = [
  "metadata-only",
  "content-bounded",
  "unknown",
] as const;
export type AsterProviderLoggingMode =
  (typeof ASTER_PROVIDER_LOGGING_MODES)[number];

export const ASTER_PROVIDER_USE_POLICIES = [
  "prohibited",
  "contractually-bounded",
  "allowed",
  "unknown",
] as const;
export type AsterProviderUsePolicy =
  (typeof ASTER_PROVIDER_USE_POLICIES)[number];

export const ASTER_PROVIDER_SUBPROCESSOR_STATES = [
  "none",
  "declared",
  "unknown",
] as const;
export type AsterProviderSubprocessorState =
  (typeof ASTER_PROVIDER_SUBPROCESSOR_STATES)[number];

export const ASTER_PROVIDER_DELETION_EVIDENCE_CLASSES = [
  "contractual-commitment",
  "provider-attestation",
  "verified-request-and-response",
  "unknown",
] as const;
export type AsterProviderDeletionEvidenceClass =
  (typeof ASTER_PROVIDER_DELETION_EVIDENCE_CLASSES)[number];

export const ASTER_PROVIDER_EVALUATION_CRITERIA = [
  "task-quality",
  "source-fidelity",
  "uncertainty-preservation",
  "privacy",
  "security",
  "accessibility",
  "reliability",
  "latency",
  "cost",
  "portability",
  "fallback",
  "replacement",
  "deletion",
  "concentration",
] as const;
export type AsterProviderEvaluationCriterion =
  (typeof ASTER_PROVIDER_EVALUATION_CRITERIA)[number];

export const ASTER_PROVIDER_EVALUATOR_FUNDING_SOURCES = [
  "project-independent",
  "provider-funded",
  "unknown",
] as const;
export type AsterProviderEvaluatorFundingSource =
  (typeof ASTER_PROVIDER_EVALUATOR_FUNDING_SOURCES)[number];

export const ASTER_PROVIDER_EVALUATION_INDEPENDENCE_STATES = [
  "independent",
  "conflicted-disclosed",
  "not-independent",
  "unknown",
] as const;
export type AsterProviderEvaluationIndependenceState =
  (typeof ASTER_PROVIDER_EVALUATION_INDEPENDENCE_STATES)[number];

export const ASTER_PROVIDER_FUNDING_RELATIONSHIP_STATES = [
  "none",
  "public-record-linked",
  "unknown",
] as const;
export type AsterProviderFundingRelationshipState =
  (typeof ASTER_PROVIDER_FUNDING_RELATIONSHIP_STATES)[number];

export const ASTER_PROVIDER_CONCENTRATION_STATES = [
  "not-material",
  "watch",
  "mitigation-required",
  "pause-or-exception-required",
  "unknown",
] as const;
export type AsterProviderConcentrationState =
  (typeof ASTER_PROVIDER_CONCENTRATION_STATES)[number];

export const ASTER_PROVIDER_CRITICALITY_STATES = [
  "non-critical",
  "critical-with-exit-plan",
  "critical-without-exit-plan",
] as const;
export type AsterProviderCriticalityState =
  (typeof ASTER_PROVIDER_CRITICALITY_STATES)[number];

export const ASTER_PROVIDER_SPECIALIST_HOLDPOINTS = [
  "security",
  "privacy",
  "legal",
  "procurement",
  "accessibility",
  "clinical",
  "interoperability",
  "financial-control",
  "data-protection",
  "ai-safety",
] as const;
export type AsterProviderSpecialistHoldpoint =
  (typeof ASTER_PROVIDER_SPECIALIST_HOLDPOINTS)[number];

export interface AsterProviderVersionedReference {
  readonly id: string;
  readonly revision: number;
}

export interface AsterProviderReference {
  readonly providerId: string;
  readonly providerRevision: number;
  readonly serviceClass: AsterProviderServiceClass;
  readonly adapterId: string;
  readonly adapterRevision: number;
}

export interface AsterProviderTaskScope {
  readonly operationIds: readonly AsterRoleOperationId[];
  readonly informationClasses: readonly AsterProviderInformationClass[];
  readonly purpose: string;
  readonly outputContractId: string;
  readonly outputContractRevision: number;
}

export interface AsterProviderEgressContract {
  readonly mode: AsterProviderEgressMode;
  readonly mayTransmit: boolean;
  readonly allowedFields: readonly AsterProviderFieldClass[];
  readonly prohibitedFields: readonly AsterProviderFieldClass[];
  readonly minimumNecessary: true;
  readonly authorityBearingContextProhibited: true;
  readonly rawSourceMaterialProhibited: true;
  readonly secretsProhibited: true;
  readonly privateDataAuthorized: false;
}

export interface AsterProviderDataHandlingContract {
  readonly regionStatus: "declared" | "unknown";
  readonly regions: readonly string[];
  readonly retentionMode: AsterProviderRetentionMode;
  readonly maxRetentionDays: number | null;
  readonly requestLogging: AsterProviderLoggingMode;
  readonly responseLogging: AsterProviderLoggingMode;
  readonly contentLogging: false;
  readonly trainingUse: AsterProviderUsePolicy;
  readonly modelImprovementUse: AsterProviderUsePolicy;
  readonly humanReview: AsterProviderUsePolicy;
  readonly abuseMonitoringUse: "metadata-only" | "content-bounded" | "unknown";
  readonly subprocessorState: AsterProviderSubprocessorState;
  readonly subprocessors: readonly AsterProviderVersionedReference[];
}

export interface AsterProviderDeletionContract {
  readonly deletionRequestSupported: boolean;
  readonly deletionDeadlineDays: number | null;
  readonly evidenceClass: AsterProviderDeletionEvidenceClass;
  readonly downstreamCopyUncertaintyDisclosed: true;
  readonly providerEvidenceIsNotUniversalProof: true;
}

export interface AsterProviderCredentialBoundary {
  readonly credentialReference: string | null;
  readonly containsSecretMaterial: false;
  readonly leastPrivilegeRequired: true;
  readonly environmentBound: true;
  readonly rotationAndRevocationRequired: true;
  readonly publicRepositoryCredentialsProhibited: true;
}

export interface AsterProviderEvaluationContract {
  readonly criteriaId: string;
  readonly criteriaRevision: number;
  readonly criteria: readonly AsterProviderEvaluationCriterion[];
  readonly evaluatorFundingSource: AsterProviderEvaluatorFundingSource;
  readonly independence: AsterProviderEvaluationIndependenceState;
  readonly conflictsDisclosed: boolean;
  readonly separateReviewerRequired: boolean;
  readonly providerCanSetCriteria: false;
  readonly providerCanSetWeights: false;
  readonly providerCanControlFindings: false;
  readonly providerCanControlPublication: false;
  readonly negativeFindingsPublishable: true;
  readonly sponsorBenefitsDoNotAffectOutcome: true;
}

export interface AsterProviderFundingConflictContract {
  readonly relationshipState: AsterProviderFundingRelationshipState;
  readonly publicFundingRecord: AsterProviderVersionedReference | null;
  readonly providerCreditsPresent: boolean;
  readonly sponsorBenefitsPresent: boolean;
  readonly conflictsDisclosed: boolean;
  readonly fundingCanDetermineProviderDefault: false;
  readonly fundingCanDetermineSourceRank: false;
  readonly fundingCanDetermineConnectorRank: false;
  readonly fundingCanDetermineEgressPolicy: false;
  readonly fundingCanDetermineBenchmarkConclusion: false;
  readonly fundingCanControlPublication: false;
  readonly fundingCreatesGovernanceAuthority: false;
}

export interface AsterProviderContinuityContract {
  readonly criticality: AsterProviderCriticalityState;
  readonly concentration: AsterProviderConcentrationState;
  readonly providerIndependentAdapter: true;
  readonly localOrManualFallback: true;
  readonly replacementPlan: AsterProviderVersionedReference;
  readonly migrationPlan: AsterProviderVersionedReference;
  readonly teardownPlan: AsterProviderVersionedReference;
  readonly configurationExportSupported: boolean;
  readonly dataExportSupported: boolean;
  readonly credentialRotationIncluded: true;
  readonly providerSideDeletionIncluded: true;
  readonly residualObligationsTracked: true;
}

export interface AsterProviderIncidentAndCorrectionContract {
  readonly suspensionSupported: true;
  readonly incidentPath: string;
  readonly correctionPath: string;
  readonly publicClaimsCorrectable: true;
  readonly materialChangeTriggersRevalidation: true;
  readonly termsChangeRequiresReview: true;
  readonly acquisitionRequiresReview: true;
}

export interface AsterProviderPublicClaimBoundary {
  readonly claimsProductionApproved: false;
  readonly claimsZeroRetentionProven: false;
  readonly claimsDeletionComplete: false;
  readonly claimsIndependentReviewWithoutEvidence: false;
  readonly claimsClinicalSuitability: false;
  readonly claimsStandardsConformanceAsSafety: false;
  readonly claimsPreferredProvider: false;
  readonly claimsSourceAuthority: false;
}

export interface AsterProviderAuthorityBoundary {
  readonly canWriteCanonicalRecords: false;
  readonly canCreateOrExpandPermission: false;
  readonly canConfirmProposal: false;
  readonly canDetermineProviderDefault: false;
  readonly canDetermineSourceRank: false;
  readonly canDetermineConnectorRank: false;
  readonly canAuthorizeProductionUse: false;
  readonly canControlBenchmarkConclusion: false;
  readonly canControlPublication: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
}

export interface AsterProviderGovernanceEnvelope {
  readonly schemaId: "aster.provider.governance";
  readonly contractVersion: AsterContractVersion;
  readonly policyId: string;
  readonly revision: number;
  readonly state: AsterProviderGovernanceState;
  readonly provider: AsterProviderReference;
  readonly task: AsterProviderTaskScope;
  readonly egress: AsterProviderEgressContract;
  readonly handling: AsterProviderDataHandlingContract;
  readonly deletion: AsterProviderDeletionContract;
  readonly credentials: AsterProviderCredentialBoundary;
  readonly evaluation: AsterProviderEvaluationContract;
  readonly funding: AsterProviderFundingConflictContract;
  readonly continuity: AsterProviderContinuityContract;
  readonly incidentAndCorrection: AsterProviderIncidentAndCorrectionContract;
  readonly publicClaims: AsterProviderPublicClaimBoundary;
  readonly specialistHoldpoints: readonly AsterProviderSpecialistHoldpoint[];
  readonly authority: AsterProviderAuthorityBoundary;
}

export const ASTER_PROVIDER_AUTHORITY_BOUNDARY: AsterProviderAuthorityBoundary = {
  canWriteCanonicalRecords: false,
  canCreateOrExpandPermission: false,
  canConfirmProposal: false,
  canDetermineProviderDefault: false,
  canDetermineSourceRank: false,
  canDetermineConnectorRank: false,
  canAuthorizeProductionUse: false,
  canControlBenchmarkConclusion: false,
  canControlPublication: false,
  canCompleteQuest: false,
  canGrantReward: false,
};

export const ASTER_PROVIDER_GOVERNANCE_SCHEMA_ID =
  "aster.provider.governance" as const;
export const ASTER_PROVIDER_GOVERNANCE_REVISION = 1 as const;
export const ASTER_PROVIDER_CONTRACT_VERSION = ASTER_CONTRACT_VERSION;
