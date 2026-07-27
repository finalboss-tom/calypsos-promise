import {
  ASTER_EXECUTION_CLASSES,
  type AsterExecutionClass,
  type AsterRole,
} from "./authority.js";
import type { AsterRoleOperationId } from "./role-contracts.js";
import {
  ASTER_CONTRACT_VERSION,
  type AsterContractVersion,
} from "./version.js";

export const ASTER_WORK_STATES = [
  "requested",
  "accepted",
  "running",
  "succeeded",
  "failed-retryable",
  "failed-terminal",
  "timed-out",
  "cancelled",
  "stale",
  "superseded",
  "provider-unavailable",
  "quarantined",
  "corrected",
] as const;
export type AsterWorkState = (typeof ASTER_WORK_STATES)[number];

export const ASTER_WORK_ATTEMPT_STATES = [
  "pending",
  "running",
  "succeeded",
  "failed-retryable",
  "failed-terminal",
  "timed-out",
  "cancelled",
  "provider-unavailable",
  "outcome-unknown",
] as const;
export type AsterWorkAttemptState =
  (typeof ASTER_WORK_ATTEMPT_STATES)[number];

export const ASTER_WORK_RESULT_STATES = [
  "none",
  "pending",
  "complete",
  "partial",
  "failed",
  "cancelled",
  "stale",
  "superseded",
  "corrected",
  "quarantined",
] as const;
export type AsterWorkResultState =
  (typeof ASTER_WORK_RESULT_STATES)[number];

export const ASTER_WORK_APPLICABILITY_STATES = [
  "current",
  "stale",
  "superseded",
  "unknown",
] as const;
export type AsterWorkApplicabilityState =
  (typeof ASTER_WORK_APPLICABILITY_STATES)[number];

export const ASTER_WORK_ACKNOWLEDGEMENT_STATES = [
  "requested",
  "pending",
  "processing",
  "delayed",
  "complete",
  "partial",
  "failed",
  "timed-out",
  "cancelled",
  "stale",
  "superseded",
  "provider-unavailable",
  "manual-fallback",
  "quarantined",
  "corrected",
] as const;
export type AsterWorkAcknowledgementState =
  (typeof ASTER_WORK_ACKNOWLEDGEMENT_STATES)[number];

export const ASTER_WORK_RETRY_DECISIONS = [
  "not-applicable",
  "permitted",
  "blocked",
  "manual-review",
] as const;
export type AsterWorkRetryDecision =
  (typeof ASTER_WORK_RETRY_DECISIONS)[number];

export const ASTER_WORK_IDEMPOTENCY_STRATEGIES = [
  "naturally-idempotent",
  "deduplicate-by-operation-id",
  "expected-version",
  "single-use",
  "append-only-detect-duplicate",
  "non-repeatable",
] as const;
export type AsterWorkIdempotencyStrategy =
  (typeof ASTER_WORK_IDEMPOTENCY_STRATEGIES)[number];

export const ASTER_WORK_DUPLICATE_DISPOSITIONS = [
  "return-existing",
  "ignore-duplicate",
  "reject-duplicate",
  "manual-reconcile",
] as const;
export type AsterWorkDuplicateDisposition =
  (typeof ASTER_WORK_DUPLICATE_DISPOSITIONS)[number];

export const ASTER_WORK_DEPENDENCY_CLASSES = [
  "none",
  "provider",
  "retrieval",
  "source",
  "manual",
] as const;
export type AsterWorkDependencyClass =
  (typeof ASTER_WORK_DEPENDENCY_CLASSES)[number];

export const ASTER_WORK_DEPENDENCY_AVAILABILITY_STATES = [
  "not-required",
  "available",
  "unavailable",
  "unknown",
] as const;
export type AsterWorkDependencyAvailabilityState =
  (typeof ASTER_WORK_DEPENDENCY_AVAILABILITY_STATES)[number];

export const ASTER_WORK_FALLBACK_MODES = [
  "not-required",
  "manual",
  "deterministic",
  "structured-query",
] as const;
export type AsterWorkFallbackMode =
  (typeof ASTER_WORK_FALLBACK_MODES)[number];

export const ASTER_WORK_REPLAY_MODES = [
  "not-replay",
  "same-input",
  "current-input",
  "historical-reproduction",
] as const;
export type AsterWorkReplayMode = (typeof ASTER_WORK_REPLAY_MODES)[number];

export interface AsterWorkSubjectReference {
  readonly subjectId: string;
  readonly subjectRevision: string | null;
}

export interface AsterWorkRequestReference {
  readonly requestId: string;
  readonly requestRevision: number;
  readonly intentDecisionId: string | null;
  readonly intentDecisionRevision: number | null;
  readonly proposalId: string | null;
  readonly proposalRevision: number | null;
}

export interface AsterWorkRevisionSnapshot {
  readonly subjectRevision: string | null;
  readonly authorityRevisionReferences: readonly string[];
  readonly sourceRevisionReferences: readonly string[];
  readonly policyRevisionReferences: readonly string[];
}

export interface AsterWorkAttempt {
  readonly attemptId: string;
  readonly attemptNumber: number;
  readonly state: AsterWorkAttemptState;
  readonly failureCode: string | null;
  readonly detail: string | null;
}

export interface AsterWorkRetryPolicy {
  readonly policyId: string;
  readonly policyRevision: number;
  readonly decision: AsterWorkRetryDecision;
  readonly maxAttempts: number | null;
  readonly requiresFreshAuthority: true;
  readonly providerDefaultIsAuthority: false;
  readonly reason: string;
}

export interface AsterWorkIdempotencyContract {
  readonly operationIdentity: string;
  readonly strategy: AsterWorkIdempotencyStrategy;
  readonly duplicateDisposition: AsterWorkDuplicateDisposition;
  readonly retryMayRepeatAuthoritativeEffect: false;
  readonly transportDeduplicationIsSufficient: false;
}

export interface AsterWorkDependencyState {
  readonly dependencyClass: AsterWorkDependencyClass;
  readonly dependencyReferenceId: string | null;
  readonly availability: AsterWorkDependencyAvailabilityState;
}

export interface AsterWorkFallback {
  readonly mode: AsterWorkFallbackMode;
  readonly active: boolean;
  readonly reasonCode: string | null;
  readonly description: string | null;
  readonly blocksCorePath: false;
}

export interface AsterWorkResult {
  readonly state: AsterWorkResultState;
  readonly resultId: string | null;
  readonly resultRevision: number | null;
  readonly producedAgainstWorkRevision: number | null;
  readonly proposalOnly: true;
  readonly canonical: false;
  readonly authoritativeActionInvoked: false;
  readonly domainAccepted: false;
  readonly mayReplaceCurrentResult: boolean;
  readonly limitations: readonly string[];
}

export interface AsterWorkAcknowledgement {
  readonly state: AsterWorkAcknowledgementState;
  readonly message: string;
  readonly claimsAcceptedForProcessing: boolean;
  readonly claimsComplete: boolean;
  readonly claimsAuthoritativeEffect: false;
}

export interface AsterWorkRelationships {
  readonly duplicateOfWorkId: string | null;
  readonly duplicateOfWorkRevision: number | null;
  readonly supersedesWorkId: string | null;
  readonly supersedesWorkRevision: number | null;
  readonly supersededByWorkId: string | null;
  readonly supersededByWorkRevision: number | null;
  readonly correctsWorkId: string | null;
  readonly correctsWorkRevision: number | null;
  readonly correctedByWorkId: string | null;
  readonly correctedByWorkRevision: number | null;
  readonly cancellationReferenceId: string | null;
}

export interface AsterWorkReplayContract {
  readonly mode: AsterWorkReplayMode;
  readonly sourceWorkId: string | null;
  readonly sourceWorkRevision: number | null;
  readonly usesCurrentAuthorityFacts: boolean;
  readonly createsNewWorkIdentity: true;
  readonly preservesPriorResult: true;
}

export interface AsterWorkAuthorityBoundary {
  readonly canWriteCanonicalRecords: false;
  readonly canCreateOrExpandPermission: false;
  readonly canReuseStaleAuthority: false;
  readonly canClaimAcceptanceAsCompletion: false;
  readonly canDuplicateAuthoritativeEffect: false;
  readonly canOverwriteNewerResult: false;
  readonly canRetryUnknownExternalOutcome: false;
  readonly canBlockCorePathWhenProviderUnavailable: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
}

export interface AsterWorkLifecycleEnvelope {
  readonly schemaId: "aster.work.lifecycle";
  readonly schemaRevision: 1;
  readonly contractVersion: AsterContractVersion;
  readonly workId: string;
  readonly workRevision: number;
  readonly role: AsterRole;
  readonly operationId: AsterRoleOperationId;
  readonly executionClass: AsterExecutionClass;
  readonly state: AsterWorkState;
  readonly subject: AsterWorkSubjectReference;
  readonly request: AsterWorkRequestReference;
  readonly inputSnapshot: AsterWorkRevisionSnapshot;
  readonly currentSnapshot: AsterWorkRevisionSnapshot;
  readonly applicability: AsterWorkApplicabilityState;
  readonly attempts: readonly AsterWorkAttempt[];
  readonly retry: AsterWorkRetryPolicy;
  readonly idempotency: AsterWorkIdempotencyContract;
  readonly dependency: AsterWorkDependencyState;
  readonly fallback: AsterWorkFallback;
  readonly result: AsterWorkResult;
  readonly acknowledgement: AsterWorkAcknowledgement;
  readonly relationships: AsterWorkRelationships;
  readonly replay: AsterWorkReplayContract;
  readonly authority: AsterWorkAuthorityBoundary;
}

export const ASTER_WORK_AUTHORITY_BOUNDARY: AsterWorkAuthorityBoundary = {
  canWriteCanonicalRecords: false,
  canCreateOrExpandPermission: false,
  canReuseStaleAuthority: false,
  canClaimAcceptanceAsCompletion: false,
  canDuplicateAuthoritativeEffect: false,
  canOverwriteNewerResult: false,
  canRetryUnknownExternalOutcome: false,
  canBlockCorePathWhenProviderUnavailable: false,
  canCompleteQuest: false,
  canGrantReward: false,
};

export function isAsterExecutionClass(
  value: unknown,
): value is AsterExecutionClass {
  return (
    typeof value === "string" && ASTER_EXECUTION_CLASSES.includes(value as never)
  );
}

export function createAsterWorkLifecycleContractVersion(): AsterContractVersion {
  return ASTER_CONTRACT_VERSION;
}
