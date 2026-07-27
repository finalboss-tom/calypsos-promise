import {
  ASTER_AUTHORITY_SOURCE_CLASSES,
  ASTER_ROLES,
  type AsterAuthoritySourceClass,
  type AsterAuthoritativeActionOwner,
  type AsterRole,
} from "./authority.js";
import {
  ASTER_ROLE_CONTRACTS,
  ASTER_ROLE_OPERATION_BY_ROLE,
  type AsterRoleOperationId,
} from "./role-contracts.js";
import {
  ASTER_CONTRACT_VERSION,
  type AsterContractVersion,
} from "./version.js";

export type AsterJsonPrimitive = string | number | boolean | null;
export type AsterJsonValue =
  | AsterJsonPrimitive
  | readonly AsterJsonValue[]
  | { readonly [key: string]: AsterJsonValue };
export type AsterJsonObject = { readonly [key: string]: AsterJsonValue };

export const ASTER_PROPOSAL_KINDS = [
  "structured-capture",
  "source-linked-recall",
  "product-route",
  "source-aware-explanation",
  "narrative-presentation",
  "clarification-request",
] as const;

export type AsterProposalKind = (typeof ASTER_PROPOSAL_KINDS)[number];

export const ASTER_PRIMARY_PROPOSAL_KIND_BY_ROLE = {
  scribe: "structured-capture",
  librarian: "source-linked-recall",
  wayfinder: "product-route",
  interpreter: "source-aware-explanation",
  storykeeper: "narrative-presentation",
} as const satisfies Readonly<Record<AsterRole, AsterProposalKind>>;

export const ASTER_SUBJECT_CLASSES = [
  "chronicle-subject",
  "application-session",
  "gameplay-session",
] as const;

export type AsterSubjectClass = (typeof ASTER_SUBJECT_CLASSES)[number];

export const ASTER_PRODUCER_CLASSES = [
  "deterministic-rule",
  "local-synthetic-adapter",
  "model-adapter",
  "manual",
] as const;

export type AsterProducerClass = (typeof ASTER_PRODUCER_CLASSES)[number];

export const ASTER_TRANSFORMATION_CLASSES = [
  "copied",
  "parsed",
  "normalized",
  "mapped",
  "summarized",
  "retrieved",
  "rule-applied",
  "model-generated",
  "manually-entered",
] as const;

export type AsterTransformationClass =
  (typeof ASTER_TRANSFORMATION_CLASSES)[number];

export const ASTER_QUALITATIVE_CONFIDENCE_LEVELS = [
  "not-assessed",
  "low",
  "medium",
  "high",
] as const;

export type AsterQualitativeConfidenceLevel =
  (typeof ASTER_QUALITATIVE_CONFIDENCE_LEVELS)[number];

export const ASTER_PROPOSAL_REVIEW_STATES = [
  "not-reviewed",
  "confirmed",
  "rejected",
  "superseded",
  "expired",
] as const;

export type AsterProposalReviewState =
  (typeof ASTER_PROPOSAL_REVIEW_STATES)[number];

export const ASTER_REVIEW_ACTORS = ["player", "system"] as const;
export type AsterReviewActor = (typeof ASTER_REVIEW_ACTORS)[number];

export const ASTER_EXTRACTION_VALUE_CLASSES = [
  "text",
  "number",
  "boolean",
  "date-time",
  "approximate-time",
  "coded-value",
  "quantity",
  "reference",
  "unknown",
] as const;

export type AsterExtractionValueClass =
  (typeof ASTER_EXTRACTION_VALUE_CLASSES)[number];

export const ASTER_EXTRACTION_STATES = [
  "draft",
  "clarification-required",
  "unsupported",
] as const;

export type AsterExtractionState = (typeof ASTER_EXTRACTION_STATES)[number];

export interface AsterProposalSubjectReference {
  readonly subjectClass: AsterSubjectClass;
  readonly subjectId: string;
  readonly subjectRevision: string | null;
}

export interface AsterProposalRequestReference {
  readonly requestId: string;
  readonly requestRevision: number;
  readonly intentRevision: string | null;
  readonly authorityRevisionReferences: readonly string[];
}

export interface AsterProposalProducerReference {
  readonly producerClass: AsterProducerClass;
  readonly producerId: string;
  readonly producerRevision: string;
  readonly providerReference: string | null;
  readonly modelReference: string | null;
}

export interface AsterProposalSourceReference {
  readonly sourceReferenceId: string;
  readonly sourceClass: AsterAuthoritySourceClass;
  readonly sourceId: string;
  readonly sourceRevision: string | null;
  readonly purpose: string;
  readonly sourceMaterialCopied: false;
}

export interface AsterTransformationProvenanceStep {
  readonly transformationStepId: string;
  readonly transformationClass: AsterTransformationClass;
  readonly transformerId: string;
  readonly transformerRevision: string;
  readonly inputSourceReferenceIds: readonly string[];
  readonly notes: string | null;
}

export interface AsterProposalConfidence {
  readonly level: AsterQualitativeConfidenceLevel;
  readonly basis: string;
  readonly notAuthority: true;
}

export interface AsterProposalUncertainty {
  readonly uncertaintyId: string;
  readonly code: string;
  readonly description: string;
  readonly material: boolean;
}

export interface AsterProposalClarification {
  readonly clarificationId: string;
  readonly trigger: string;
  readonly question: string;
  readonly status: "open" | "answered" | "not-required";
}

export interface AsterProposalIntendedAction {
  readonly actionId: string;
  readonly actionOwner: AsterAuthoritativeActionOwner;
  readonly requiresExactPlayerConfirmation: boolean;
  readonly description: string;
}

export interface AsterProposalPayload {
  readonly schemaId: string;
  readonly schemaRevision: number;
  readonly data: AsterJsonObject;
  readonly canonical: false;
}

export interface AsterProposalReview {
  readonly state: AsterProposalReviewState;
  readonly actor: AsterReviewActor | null;
  readonly boundProposalRevision: number | null;
  readonly decisionReferenceId: string | null;
}

export interface AsterProposalAuthorityBoundary {
  readonly canWriteCanonicalRecords: false;
  readonly canCreateOrExpandPermission: false;
  readonly canSelfConfirm: false;
  readonly canInvokeAuthoritativeAction: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
}

export interface AsterProposalDomainOutcome {
  readonly invoked: false;
  readonly accepted: false;
  readonly storedOrExecuted: false;
}

export interface AsterProposalEnvelope {
  readonly schemaId: "aster.proposal.envelope";
  readonly schemaRevision: 1;
  readonly contractVersion: AsterContractVersion;
  readonly proposalId: string;
  readonly proposalRevision: number;
  readonly role: AsterRole;
  readonly operationId: AsterRoleOperationId;
  readonly proposalKind: AsterProposalKind;
  readonly subject: AsterProposalSubjectReference;
  readonly request: AsterProposalRequestReference;
  readonly producer: AsterProposalProducerReference;
  readonly sourceReferences: readonly AsterProposalSourceReference[];
  readonly transformationProvenance: readonly AsterTransformationProvenanceStep[];
  readonly intendedAction: AsterProposalIntendedAction;
  readonly confidence: AsterProposalConfidence;
  readonly uncertainties: readonly AsterProposalUncertainty[];
  readonly clarifications: readonly AsterProposalClarification[];
  readonly payload: AsterProposalPayload;
  readonly review: AsterProposalReview;
  readonly authority: AsterProposalAuthorityBoundary;
  readonly domainOutcome: AsterProposalDomainOutcome;
}

export interface AsterExtractionCandidate {
  readonly candidateId: string;
  readonly fieldPath: string;
  readonly valueClass: AsterExtractionValueClass;
  readonly value: AsterJsonValue;
  readonly sourceReferenceIds: readonly string[];
  readonly transformationStepIds: readonly string[];
  readonly confidence: AsterProposalConfidence;
  readonly uncertaintyCodes: readonly string[];
  readonly requiresClarification: boolean;
  readonly state: "candidate";
  readonly canonical: false;
  readonly playerConfirmed: false;
  readonly domainAccepted: false;
}

export interface AsterUnparsedSegment {
  readonly segmentId: string;
  readonly sourceReferenceId: string;
  readonly reason: string;
}

export interface AsterStructuredExtraction {
  readonly schemaId: "aster.extraction.structured";
  readonly schemaRevision: 1;
  readonly state: AsterExtractionState;
  readonly candidates: readonly AsterExtractionCandidate[];
  readonly unparsedSegments: readonly AsterUnparsedSegment[];
  readonly canonicalRecord: false;
}

export const ASTER_PROPOSAL_AUTHORITY_BOUNDARY: AsterProposalAuthorityBoundary =
  {
    canWriteCanonicalRecords: false,
    canCreateOrExpandPermission: false,
    canSelfConfirm: false,
    canInvokeAuthoritativeAction: false,
    canCompleteQuest: false,
    canGrantReward: false,
  };

export const ASTER_PROPOSAL_DOMAIN_OUTCOME: AsterProposalDomainOutcome = {
  invoked: false,
  accepted: false,
  storedOrExecuted: false,
};

export function getAsterPrimaryProposalKind(
  role: AsterRole,
): AsterProposalKind {
  return ASTER_PRIMARY_PROPOSAL_KIND_BY_ROLE[role];
}

export function getAsterProposalOperation(
  role: AsterRole,
): AsterRoleOperationId {
  return ASTER_ROLE_OPERATION_BY_ROLE[role];
}

export function getAsterProposalActionOwner(
  role: AsterRole,
): AsterAuthoritativeActionOwner {
  return ASTER_ROLE_CONTRACTS[role].deterministicActionOwner;
}

export function asterProposalRequiresExactConfirmation(
  role: AsterRole,
): boolean {
  return (
    ASTER_ROLE_CONTRACTS[role].confirmationRule ===
    "required-before-domain-action"
  );
}

export function isAsterProposalKind(
  value: unknown,
): value is AsterProposalKind {
  return (
    typeof value === "string" && ASTER_PROPOSAL_KINDS.includes(value as never)
  );
}

export function isAsterAuthoritySourceClass(
  value: unknown,
): value is AsterAuthoritySourceClass {
  return (
    typeof value === "string" &&
    ASTER_AUTHORITY_SOURCE_CLASSES.includes(value as never)
  );
}

export function isAsterProposalRole(value: unknown): value is AsterRole {
  return typeof value === "string" && ASTER_ROLES.includes(value as never);
}

export { ASTER_CONTRACT_VERSION };
