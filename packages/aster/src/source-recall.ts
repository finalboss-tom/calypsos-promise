import {
  ASTER_QUALITATIVE_CONFIDENCE_LEVELS,
  type AsterProposalConfidence,
} from "./proposal.js";
import {
  ASTER_CONTRACT_VERSION,
  type AsterContractVersion,
} from "./version.js";

export const ASTER_RECALL_ROLES = ["librarian", "interpreter"] as const;
export type AsterRecallRole = (typeof ASTER_RECALL_ROLES)[number];

export const ASTER_RECALL_MODES = ["recall", "explanation"] as const;
export type AsterRecallMode = (typeof ASTER_RECALL_MODES)[number];

export const ASTER_RECALL_STATEMENT_CLASSES = [
  "personal-health-recall",
  "public-education",
] as const;
export type AsterRecallStatementClass =
  (typeof ASTER_RECALL_STATEMENT_CLASSES)[number];

export const ASTER_RECALL_SOURCE_CLASSES = [
  "chronicle-record",
  "public-educational-material",
] as const;
export type AsterRecallSourceClass = (typeof ASTER_RECALL_SOURCE_CLASSES)[number];

export const ASTER_RECALL_RECORD_STATES = [
  "active",
  "amended",
  "corrected",
  "superseded",
  "retracted",
  "invalidated",
  "deleted",
  "unavailable",
] as const;
export type AsterRecallRecordState = (typeof ASTER_RECALL_RECORD_STATES)[number];

export const ASTER_RECALL_CORRECTION_STATES = [
  "none",
  "amended",
  "corrected",
  "superseded",
  "retracted",
  "invalidated",
] as const;
export type AsterRecallCorrectionState =
  (typeof ASTER_RECALL_CORRECTION_STATES)[number];

export const ASTER_RECALL_CONFLICT_STATES = [
  "none",
  "unresolved",
  "preferred-presentation",
  "resolved",
] as const;
export type AsterRecallConflictState =
  (typeof ASTER_RECALL_CONFLICT_STATES)[number];

export const ASTER_RECALL_DELETION_STATES = [
  "retained",
  "deletion-requested",
  "deleted",
  "retained-under-exception",
  "unavailable",
] as const;
export type AsterRecallDeletionState =
  (typeof ASTER_RECALL_DELETION_STATES)[number];

export const ASTER_RECALL_MAPPING_STATES = [
  "not-mapped",
  "exact",
  "partial",
  "lossy",
  "conflicting",
  "unsupported",
] as const;
export type AsterRecallMappingState =
  (typeof ASTER_RECALL_MAPPING_STATES)[number];

export const ASTER_RECALL_RETRIEVAL_METHODS = [
  "direct-record-reference",
  "structured-query",
  "semantic-index",
  "public-material-reference",
] as const;
export type AsterRecallRetrievalMethod =
  (typeof ASTER_RECALL_RETRIEVAL_METHODS)[number];

export const ASTER_RECALL_FRESHNESS_STATES = [
  "current",
  "stale",
  "unavailable",
  "unknown",
  "not-applicable",
] as const;
export type AsterRecallFreshnessState =
  (typeof ASTER_RECALL_FRESHNESS_STATES)[number];

export const ASTER_RECALL_FALLBACK_STATES = [
  "not-required",
  "used",
  "required-unavailable",
] as const;
export type AsterRecallFallbackState =
  (typeof ASTER_RECALL_FALLBACK_STATES)[number];

export const ASTER_RECALL_LOCATOR_KINDS = [
  "record",
  "field-path",
  "document-page",
  "document-region",
  "row-column",
  "json-pointer",
  "timestamp-range",
  "whole-source",
] as const;
export type AsterRecallLocatorKind =
  (typeof ASTER_RECALL_LOCATOR_KINDS)[number];

export const ASTER_RECALL_UNCERTAINTY_CODES = [
  "source-uncertainty",
  "approximate-time",
  "mapping-loss",
  "source-conflict",
  "correction-or-supersession",
  "source-deleted-or-unavailable",
  "retrieval-stale",
  "implementation-guide-limitation",
  "public-education-not-personal-evidence",
] as const;
export type AsterRecallUncertaintyCode =
  (typeof ASTER_RECALL_UNCERTAINTY_CODES)[number];

export interface AsterRecallSubjectReference {
  readonly subjectId: string;
  readonly subjectRevision: string | null;
}

export interface AsterRecallRequestReference {
  readonly requestId: string;
  readonly requestRevision: number;
  readonly intentDecisionId: string;
  readonly intentDecisionRevision: number;
}

export interface AsterRecallSourceLocator {
  readonly locatorId: string;
  readonly kind: AsterRecallLocatorKind;
  readonly value: string;
  readonly approximate: boolean;
}

export interface AsterRecallLifecycle {
  readonly recordState: AsterRecallRecordState;
  readonly correctionState: AsterRecallCorrectionState;
  readonly conflictState: AsterRecallConflictState;
  readonly deletionState: AsterRecallDeletionState;
  readonly relationshipReferenceIds: readonly string[];
}

export interface AsterRecallImplementationGuideReference {
  readonly standardId: string;
  readonly standardVersion: string;
  readonly guideId: string;
  readonly guideVersion: string;
  readonly profileId: string | null;
}

export interface AsterRecallMappingReference {
  readonly state: AsterRecallMappingState;
  readonly mappingId: string | null;
  readonly mappingRevision: string | null;
  readonly sourceSystemId: string | null;
  readonly sourceSystemVersion: string | null;
  readonly targetConceptId: string | null;
  readonly implementationGuide: AsterRecallImplementationGuideReference | null;
  readonly lossDescription: string | null;
  readonly conformanceProvesClinicalCompleteness: false;
  readonly conformanceProvesSemanticEquivalence: false;
  readonly conformanceProvesSafety: false;
  readonly conformanceProvesEndorsement: false;
}

export interface AsterRecallSourceAuthorityBoundary {
  readonly retrievalScoreIsTruth: false;
  readonly providerRankIsTruth: false;
  readonly newestSourceIsTruth: false;
  readonly standardsProfileIsTruth: false;
}

export interface AsterChronicleRecallSourceReference {
  readonly sourceReferenceId: string;
  readonly sourceClass: "chronicle-record";
  readonly recordId: string;
  readonly recordRevision: string;
  readonly chronicleSchemaVersion: string;
  readonly sourceVersionId: string;
  readonly sourceVersionRevision: string;
  readonly locator: AsterRecallSourceLocator;
  readonly lifecycle: AsterRecallLifecycle;
  readonly mapping: AsterRecallMappingReference;
  readonly authoritativeRecord: true;
  readonly clearlyLabeledEducational: false;
  readonly personalClaimAuthority: true;
  readonly authority: AsterRecallSourceAuthorityBoundary;
}

export interface AsterPublicEducationalRecallSourceReference {
  readonly sourceReferenceId: string;
  readonly sourceClass: "public-educational-material";
  readonly materialId: string;
  readonly materialRevision: string;
  readonly title: string;
  readonly publisher: string;
  readonly locator: AsterRecallSourceLocator;
  readonly availability: "available" | "withdrawn" | "deleted" | "unavailable";
  readonly authoritativeRecord: false;
  readonly clearlyLabeledEducational: true;
  readonly personalClaimAuthority: false;
  readonly authority: AsterRecallSourceAuthorityBoundary;
}

export type AsterRecallSourceReference =
  | AsterChronicleRecallSourceReference
  | AsterPublicEducationalRecallSourceReference;

export interface AsterRecallStructuredQueryFallback {
  readonly state: AsterRecallFallbackState;
  readonly queryId: string | null;
  readonly queryRevision: string | null;
  readonly explanation: string;
}

export interface AsterRecallRetrievalEvidence {
  readonly method: AsterRecallRetrievalMethod;
  readonly freshness: AsterRecallFreshnessState;
  readonly indexId: string | null;
  readonly indexRevision: string | null;
  readonly authoritativeRevisionBoundary: string | null;
  readonly structuredQueryFallback: AsterRecallStructuredQueryFallback;
  readonly retrievalScoreIsAuthority: false;
}

export interface AsterRecallStatement {
  readonly statementId: string;
  readonly statementClass: AsterRecallStatementClass;
  readonly text: string;
  readonly assertsPersonSpecificFact: boolean;
  readonly sourceReferenceIds: readonly string[];
  readonly confidence: AsterProposalConfidence;
  readonly uncertaintyCodes: readonly AsterRecallUncertaintyCode[];
  readonly sourceLabelsVisible: true;
  readonly lifecycleVisible: true;
  readonly mappingLimitsVisible: true;
  readonly alternativesAndConflictsPreserved: true;
  readonly canonical: false;
  readonly diagnosticClaim: false;
  readonly treatmentClaim: false;
  readonly emergencyDirection: false;
  readonly standardsConformanceClaim: false;
}

export interface AsterRecallAuthorityBoundary {
  readonly canWriteCanonicalRecords: false;
  readonly canCreateOrExpandPermission: false;
  readonly canSelfConfirm: false;
  readonly canInvokeAuthoritativeAction: false;
  readonly canDiagnose: false;
  readonly canPrescribe: false;
  readonly canDirectEmergencyCare: false;
  readonly canTreatRetrievalScoreAsTruth: false;
  readonly canTreatProviderRankAsTruth: false;
  readonly canTreatNewestSourceAsTruth: false;
  readonly canTreatStandardsConformanceAsTruth: false;
}

export interface AsterSourceLinkedRecall {
  readonly schemaId: "aster.recall.source-linked";
  readonly schemaRevision: 1;
  readonly contractVersion: AsterContractVersion;
  readonly recallId: string;
  readonly recallRevision: number;
  readonly role: AsterRecallRole;
  readonly mode: AsterRecallMode;
  readonly subject: AsterRecallSubjectReference;
  readonly request: AsterRecallRequestReference;
  readonly retrieval: AsterRecallRetrievalEvidence;
  readonly sources: readonly AsterRecallSourceReference[];
  readonly statements: readonly AsterRecallStatement[];
  readonly complete: boolean;
  readonly unavailableReasons: readonly string[];
  readonly canonical: false;
  readonly authority: AsterRecallAuthorityBoundary;
}

export const ASTER_RECALL_SOURCE_AUTHORITY_BOUNDARY: AsterRecallSourceAuthorityBoundary =
  {
    retrievalScoreIsTruth: false,
    providerRankIsTruth: false,
    newestSourceIsTruth: false,
    standardsProfileIsTruth: false,
  };

export const ASTER_RECALL_AUTHORITY_BOUNDARY: AsterRecallAuthorityBoundary = {
  canWriteCanonicalRecords: false,
  canCreateOrExpandPermission: false,
  canSelfConfirm: false,
  canInvokeAuthoritativeAction: false,
  canDiagnose: false,
  canPrescribe: false,
  canDirectEmergencyCare: false,
  canTreatRetrievalScoreAsTruth: false,
  canTreatProviderRankAsTruth: false,
  canTreatNewestSourceAsTruth: false,
  canTreatStandardsConformanceAsTruth: false,
};

export function getAsterRecallModeForRole(role: AsterRecallRole): AsterRecallMode {
  return role === "librarian" ? "recall" : "explanation";
}

export function isAsterRecallConfidenceLevel(value: unknown): boolean {
  return (
    typeof value === "string" &&
    ASTER_QUALITATIVE_CONFIDENCE_LEVELS.includes(value as never)
  );
}

export { ASTER_CONTRACT_VERSION };
