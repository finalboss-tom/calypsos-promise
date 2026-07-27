import {
  ASTER_EXECUTION_CLASSES,
  ASTER_ROLES,
} from "./authority.js";
import {
  ASTER_ROLE_CONTRACTS,
  ASTER_ROLE_OPERATION_BY_ROLE,
  ASTER_ROLE_OPERATION_IDS,
} from "./role-contracts.js";
import { ASTER_CONTRACT_VERSION } from "./version.js";
import {
  ASTER_WORK_ACKNOWLEDGEMENT_STATES,
  ASTER_WORK_APPLICABILITY_STATES,
  ASTER_WORK_ATTEMPT_STATES,
  ASTER_WORK_AUTHORITY_BOUNDARY,
  ASTER_WORK_DEPENDENCY_AVAILABILITY_STATES,
  ASTER_WORK_DEPENDENCY_CLASSES,
  ASTER_WORK_DUPLICATE_DISPOSITIONS,
  ASTER_WORK_FALLBACK_MODES,
  ASTER_WORK_IDEMPOTENCY_STRATEGIES,
  ASTER_WORK_REPLAY_MODES,
  ASTER_WORK_RESULT_STATES,
  ASTER_WORK_RETRY_DECISIONS,
  ASTER_WORK_STATES,
  type AsterWorkAcknowledgementState,
  type AsterWorkAttempt,
  type AsterWorkLifecycleEnvelope,
  type AsterWorkState,
} from "./work-lifecycle.js";

export const ASTER_WORK_VALIDATION_CODES = [
  "aster.work.invalid-contract",
  "aster.work.invalid-identity",
  "aster.work.invalid-role-operation",
  "aster.work.invalid-execution-class",
  "aster.work.invalid-request-reference",
  "aster.work.invalid-revision-snapshot",
  "aster.work.invalid-attempt",
  "aster.work.invalid-state-transition-evidence",
  "aster.work.invalid-retry-policy",
  "aster.work.invalid-idempotency",
  "aster.work.invalid-dependency",
  "aster.work.invalid-fallback",
  "aster.work.invalid-result",
  "aster.work.invalid-acknowledgement",
  "aster.work.invalid-relationship",
  "aster.work.invalid-replay",
  "aster.work.stale-result-escalation",
  "aster.work.unknown-outcome-retry",
  "aster.work.authority-escalation",
] as const;
export type AsterWorkValidationCode =
  (typeof ASTER_WORK_VALIDATION_CODES)[number];

export interface AsterWorkValidationIssue {
  readonly code: AsterWorkValidationCode;
  readonly path: string;
  readonly message: string;
}

export interface AsterWorkValidationResult {
  readonly valid: boolean;
  readonly issues: readonly AsterWorkValidationIssue[];
}

function add(
  issues: AsterWorkValidationIssue[],
  code: AsterWorkValidationCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function positiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0;
}

function nullablePositiveInteger(value: unknown): value is number | null {
  return value === null || positiveInteger(value);
}

function nullableNonEmpty(value: unknown): value is string | null {
  return value === null || nonEmpty(value);
}

function isMember<T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value as never);
}

function validateStringReferences(
  issues: AsterWorkValidationIssue[],
  value: unknown,
  path: string,
): void {
  if (!Array.isArray(value)) {
    add(
      issues,
      "aster.work.invalid-revision-snapshot",
      path,
      "Revision references must be an array.",
    );
    return;
  }

  const seen = new Set<string>();
  value.forEach((item, index) => {
    if (!nonEmpty(item)) {
      add(
        issues,
        "aster.work.invalid-revision-snapshot",
        `${path}[${index}]`,
        "Revision references must be non-empty strings.",
      );
      return;
    }
    if (seen.has(item)) {
      add(
        issues,
        "aster.work.invalid-revision-snapshot",
        `${path}[${index}]`,
        "Revision references must not contain duplicates.",
      );
    }
    seen.add(item);
  });
}

function validateAttempts(
  work: AsterWorkLifecycleEnvelope,
  issues: AsterWorkValidationIssue[],
): void {
  if (!Array.isArray(work.attempts)) {
    add(
      issues,
      "aster.work.invalid-attempt",
      "attempts",
      "Attempts must be an array.",
    );
    return;
  }

  const ids = new Set<string>();
  const numbers = new Set<number>();
  let expected = 1;

  for (const [index, attempt] of work.attempts.entries()) {
    const path = `attempts[${index}]`;
    if (!nonEmpty(attempt.attemptId)) {
      add(
        issues,
        "aster.work.invalid-attempt",
        `${path}.attemptId`,
        "Attempt identity is required.",
      );
    } else if (ids.has(attempt.attemptId)) {
      add(
        issues,
        "aster.work.invalid-attempt",
        `${path}.attemptId`,
        "Attempt identities must be unique.",
      );
    }
    ids.add(attempt.attemptId);

    if (!positiveInteger(attempt.attemptNumber)) {
      add(
        issues,
        "aster.work.invalid-attempt",
        `${path}.attemptNumber`,
        "Attempt number must be a positive integer.",
      );
    } else {
      if (numbers.has(attempt.attemptNumber)) {
        add(
          issues,
          "aster.work.invalid-attempt",
          `${path}.attemptNumber`,
          "Attempt numbers must be unique.",
        );
      }
      if (attempt.attemptNumber !== expected) {
        add(
          issues,
          "aster.work.invalid-attempt",
          `${path}.attemptNumber`,
          "Attempt numbers must be contiguous and start at one.",
        );
      }
      numbers.add(attempt.attemptNumber);
      expected += 1;
    }

    if (!isMember(ASTER_WORK_ATTEMPT_STATES, attempt.state)) {
      add(
        issues,
        "aster.work.invalid-attempt",
        `${path}.state`,
        "Attempt state is not recognized.",
      );
    }
    if (!nullableNonEmpty(attempt.failureCode)) {
      add(
        issues,
        "aster.work.invalid-attempt",
        `${path}.failureCode`,
        "Failure code must be null or a non-empty string.",
      );
    }
    if (!nullableNonEmpty(attempt.detail)) {
      add(
        issues,
        "aster.work.invalid-attempt",
        `${path}.detail`,
        "Attempt detail must be null or a non-empty string.",
      );
    }

    const needsFailure = [
      "failed-retryable",
      "failed-terminal",
      "timed-out",
      "provider-unavailable",
      "outcome-unknown",
    ].includes(attempt.state);
    if (needsFailure && !nonEmpty(attempt.failureCode)) {
      add(
        issues,
        "aster.work.invalid-attempt",
        `${path}.failureCode`,
        "Failure-like attempts require a stable failure code.",
      );
    }
  }

  const activeAttempts = work.attempts.filter((attempt) =>
    ["pending", "running"].includes(attempt.state),
  );
  if (activeAttempts.length > 1) {
    add(
      issues,
      "aster.work.invalid-attempt",
      "attempts",
      "Only one attempt may be pending or running.",
    );
  }

  if (
    work.retry.maxAttempts !== null &&
    work.attempts.some(
      (attempt) => attempt.attemptNumber > work.retry.maxAttempts!,
    )
  ) {
    add(
      issues,
      "aster.work.invalid-retry-policy",
      "retry.maxAttempts",
      "Recorded attempts cannot exceed the retry policy maximum.",
    );
  }
}

function latestAttempt(
  attempts: readonly AsterWorkAttempt[],
): AsterWorkAttempt | null {
  return attempts.length === 0 ? null : attempts[attempts.length - 1] ?? null;
}

function hasPair(id: string | null, revision: number | null): boolean {
  return nonEmpty(id) && positiveInteger(revision);
}

function hasNoPair(id: string | null, revision: number | null): boolean {
  return id === null && revision === null;
}

function validatePair(
  issues: AsterWorkValidationIssue[],
  id: string | null,
  revision: number | null,
  path: string,
): void {
  if (!hasPair(id, revision) && !hasNoPair(id, revision)) {
    add(
      issues,
      "aster.work.invalid-relationship",
      path,
      "Relationship identity and revision must both be present or both be null.",
    );
  }
}

function acknowledgementAllowed(
  state: AsterWorkState,
  acknowledgement: AsterWorkAcknowledgementState,
): boolean {
  const allowed: Readonly<
    Record<AsterWorkState, readonly AsterWorkAcknowledgementState[]>
  > = {
    requested: ["requested", "pending"],
    accepted: ["pending", "delayed"],
    running: ["processing", "delayed"],
    succeeded: ["complete", "partial", "manual-fallback"],
    "failed-retryable": ["failed", "delayed"],
    "failed-terminal": ["failed"],
    "timed-out": ["timed-out", "delayed"],
    cancelled: ["cancelled"],
    stale: ["stale"],
    superseded: ["superseded"],
    "provider-unavailable": ["provider-unavailable", "manual-fallback"],
    quarantined: ["quarantined"],
    corrected: ["corrected"],
  };
  return allowed[state].includes(acknowledgement);
}

export function validateAsterWorkLifecycle(
  work: AsterWorkLifecycleEnvelope,
): AsterWorkValidationResult {
  const issues: AsterWorkValidationIssue[] = [];

  if (
    work.schemaId !== "aster.work.lifecycle" ||
    work.schemaRevision !== 1 ||
    work.contractVersion !== ASTER_CONTRACT_VERSION
  ) {
    add(
      issues,
      "aster.work.invalid-contract",
      "schemaId",
      "Work lifecycle contract identity or version is invalid.",
    );
  }

  if (!nonEmpty(work.workId) || !positiveInteger(work.workRevision)) {
    add(
      issues,
      "aster.work.invalid-identity",
      "workId",
      "Work identity and positive revision are required.",
    );
  }

  if (
    !isMember(ASTER_ROLES, work.role) ||
    !isMember(ASTER_ROLE_OPERATION_IDS, work.operationId) ||
    ASTER_ROLE_OPERATION_BY_ROLE[work.role] !== work.operationId
  ) {
    add(
      issues,
      "aster.work.invalid-role-operation",
      "operationId",
      "Role and operation must match the public role contract.",
    );
  }

  if (
    !isMember(ASTER_EXECUTION_CLASSES, work.executionClass) ||
    !ASTER_ROLE_CONTRACTS[work.role].executionClasses.includes(
      work.executionClass as never,
    )
  ) {
    add(
      issues,
      "aster.work.invalid-execution-class",
      "executionClass",
      "Execution class is not allowed for the selected role.",
    );
  }

  if (!isMember(ASTER_WORK_STATES, work.state)) {
    add(
      issues,
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Work state is not recognized.",
    );
  }

  if (!nonEmpty(work.subject.subjectId)) {
    add(
      issues,
      "aster.work.invalid-request-reference",
      "subject.subjectId",
      "Subject identity is required.",
    );
  }
  if (!nullableNonEmpty(work.subject.subjectRevision)) {
    add(
      issues,
      "aster.work.invalid-request-reference",
      "subject.subjectRevision",
      "Subject revision must be null or a non-empty string.",
    );
  }

  if (
    !nonEmpty(work.request.requestId) ||
    !positiveInteger(work.request.requestRevision)
  ) {
    add(
      issues,
      "aster.work.invalid-request-reference",
      "request",
      "A stable request identity and revision are required.",
    );
  }
  validatePair(
    issues,
    work.request.intentDecisionId,
    work.request.intentDecisionRevision,
    "request.intentDecision",
  );
  validatePair(
    issues,
    work.request.proposalId,
    work.request.proposalRevision,
    "request.proposal",
  );

  for (const [name, snapshot] of [
    ["inputSnapshot", work.inputSnapshot],
    ["currentSnapshot", work.currentSnapshot],
  ] as const) {
    if (!nullableNonEmpty(snapshot.subjectRevision)) {
      add(
        issues,
        "aster.work.invalid-revision-snapshot",
        `${name}.subjectRevision`,
        "Snapshot subject revision must be null or a non-empty string.",
      );
    }
    validateStringReferences(
      issues,
      snapshot.authorityRevisionReferences,
      `${name}.authorityRevisionReferences`,
    );
    validateStringReferences(
      issues,
      snapshot.sourceRevisionReferences,
      `${name}.sourceRevisionReferences`,
    );
    validateStringReferences(
      issues,
      snapshot.policyRevisionReferences,
      `${name}.policyRevisionReferences`,
    );
  }

  if (!isMember(ASTER_WORK_APPLICABILITY_STATES, work.applicability)) {
    add(
      issues,
      "aster.work.invalid-revision-snapshot",
      "applicability",
      "Applicability state is not recognized.",
    );
  }
  if (work.inputSnapshot.subjectRevision !== work.subject.subjectRevision) {
    add(
      issues,
      "aster.work.invalid-revision-snapshot",
      "inputSnapshot.subjectRevision",
      "The input snapshot must bind the subject revision used when work was created.",
    );
  }
  if (
    work.applicability === "current" &&
    JSON.stringify(work.inputSnapshot) !== JSON.stringify(work.currentSnapshot)
  ) {
    add(
      issues,
      "aster.work.invalid-revision-snapshot",
      "currentSnapshot",
      "Current applicability requires the exact input and current revision snapshots to match.",
    );
  }
  if (
    work.applicability === "stale" &&
    JSON.stringify(work.inputSnapshot) === JSON.stringify(work.currentSnapshot)
  ) {
    add(
      issues,
      "aster.work.invalid-revision-snapshot",
      "currentSnapshot",
      "Stale applicability requires an inspectable revision difference.",
    );
  }

  validateAttempts(work, issues);

  if (
    !nonEmpty(work.retry.policyId) ||
    !positiveInteger(work.retry.policyRevision) ||
    !isMember(ASTER_WORK_RETRY_DECISIONS, work.retry.decision) ||
    !nullablePositiveInteger(work.retry.maxAttempts) ||
    work.retry.requiresFreshAuthority !== true ||
    work.retry.providerDefaultIsAuthority !== false ||
    !nonEmpty(work.retry.reason)
  ) {
    add(
      issues,
      "aster.work.invalid-retry-policy",
      "retry",
      "Retry policy must be versioned, explicit, freshness-preserving, and provider-neutral.",
    );
  }

  if (
    !nonEmpty(work.idempotency.operationIdentity) ||
    !isMember(
      ASTER_WORK_IDEMPOTENCY_STRATEGIES,
      work.idempotency.strategy,
    ) ||
    !isMember(
      ASTER_WORK_DUPLICATE_DISPOSITIONS,
      work.idempotency.duplicateDisposition,
    ) ||
    work.idempotency.retryMayRepeatAuthoritativeEffect !== false ||
    work.idempotency.transportDeduplicationIsSufficient !== false
  ) {
    add(
      issues,
      "aster.work.invalid-idempotency",
      "idempotency",
      "Idempotency must prevent duplicate authoritative effects and cannot rely only on transport de-duplication.",
    );
  }

  if (
    !isMember(ASTER_WORK_DEPENDENCY_CLASSES, work.dependency.dependencyClass) ||
    !nullableNonEmpty(work.dependency.dependencyReferenceId) ||
    !isMember(
      ASTER_WORK_DEPENDENCY_AVAILABILITY_STATES,
      work.dependency.availability,
    )
  ) {
    add(
      issues,
      "aster.work.invalid-dependency",
      "dependency",
      "Dependency state is invalid.",
    );
  }
  if (
    work.dependency.dependencyClass === "none" &&
    (work.dependency.dependencyReferenceId !== null ||
      work.dependency.availability !== "not-required")
  ) {
    add(
      issues,
      "aster.work.invalid-dependency",
      "dependency",
      "No-dependency work must use not-required availability and no dependency reference.",
    );
  }
  if (
    work.dependency.dependencyClass !== "none" &&
    work.dependency.availability !== "not-required" &&
    !nonEmpty(work.dependency.dependencyReferenceId)
  ) {
    add(
      issues,
      "aster.work.invalid-dependency",
      "dependency.dependencyReferenceId",
      "Applicable dependencies require a bounded reference.",
    );
  }

  if (
    !isMember(ASTER_WORK_FALLBACK_MODES, work.fallback.mode) ||
    typeof work.fallback.active !== "boolean" ||
    !nullableNonEmpty(work.fallback.reasonCode) ||
    !nullableNonEmpty(work.fallback.description) ||
    work.fallback.blocksCorePath !== false
  ) {
    add(
      issues,
      "aster.work.invalid-fallback",
      "fallback",
      "Fallback must be recognized, inspectable, and non-blocking for core paths.",
    );
  }
  if (
    work.fallback.active &&
    (work.fallback.mode === "not-required" ||
      !nonEmpty(work.fallback.reasonCode) ||
      !nonEmpty(work.fallback.description))
  ) {
    add(
      issues,
      "aster.work.invalid-fallback",
      "fallback",
      "Active fallback requires a concrete mode, reason, and description.",
    );
  }
  if (
    !work.fallback.active &&
    (work.fallback.mode !== "not-required" ||
      work.fallback.reasonCode !== null ||
      work.fallback.description !== null)
  ) {
    add(
      issues,
      "aster.work.invalid-fallback",
      "fallback",
      "Inactive fallback must use the not-required empty form.",
    );
  }

  if (
    !isMember(ASTER_WORK_RESULT_STATES, work.result.state) ||
    !nullableNonEmpty(work.result.resultId) ||
    !nullablePositiveInteger(work.result.resultRevision) ||
    !nullablePositiveInteger(work.result.producedAgainstWorkRevision) ||
    work.result.proposalOnly !== true ||
    work.result.canonical !== false ||
    work.result.authoritativeActionInvoked !== false ||
    work.result.domainAccepted !== false ||
    typeof work.result.mayReplaceCurrentResult !== "boolean" ||
    !Array.isArray(work.result.limitations) ||
    work.result.limitations.some((item) => !nonEmpty(item))
  ) {
    add(
      issues,
      "aster.work.invalid-result",
      "result",
      "Work result is invalid or attempts to exceed proposal-only authority.",
    );
  }
  if (
    ["complete", "partial"].includes(work.result.state) &&
    (!hasPair(work.result.resultId, work.result.resultRevision) ||
      work.result.producedAgainstWorkRevision !== work.workRevision)
  ) {
    add(
      issues,
      "aster.work.invalid-result",
      "result",
      "Complete or partial results require exact identity, revision, and producing work revision.",
    );
  }
  if (
    !["complete", "partial"].includes(work.result.state) &&
    (!hasNoPair(work.result.resultId, work.result.resultRevision) ||
      work.result.producedAgainstWorkRevision !== null)
  ) {
    add(
      issues,
      "aster.work.invalid-result",
      "result",
      "Non-result states must not claim a result identity or producing revision.",
    );
  }

  if (
    !isMember(
      ASTER_WORK_ACKNOWLEDGEMENT_STATES,
      work.acknowledgement.state,
    ) ||
    !nonEmpty(work.acknowledgement.message) ||
    typeof work.acknowledgement.claimsAcceptedForProcessing !== "boolean" ||
    typeof work.acknowledgement.claimsComplete !== "boolean" ||
    work.acknowledgement.claimsAuthoritativeEffect !== false
  ) {
    add(
      issues,
      "aster.work.invalid-acknowledgement",
      "acknowledgement",
      "Acknowledgement must be direct, truthful, and non-authoritative.",
    );
  } else if (!acknowledgementAllowed(work.state, work.acknowledgement.state)) {
    add(
      issues,
      "aster.work.invalid-acknowledgement",
      "acknowledgement.state",
      "Acknowledgement state does not match the work lifecycle state.",
    );
  }

  for (const [name, id, revision] of [
    [
      "duplicateOfWork",
      work.relationships.duplicateOfWorkId,
      work.relationships.duplicateOfWorkRevision,
    ],
    [
      "supersedesWork",
      work.relationships.supersedesWorkId,
      work.relationships.supersedesWorkRevision,
    ],
    [
      "supersededByWork",
      work.relationships.supersededByWorkId,
      work.relationships.supersededByWorkRevision,
    ],
    [
      "correctsWork",
      work.relationships.correctsWorkId,
      work.relationships.correctsWorkRevision,
    ],
    [
      "correctedByWork",
      work.relationships.correctedByWorkId,
      work.relationships.correctedByWorkRevision,
    ],
  ] as const) {
    validatePair(issues, id, revision, `relationships.${name}`);
    if (id === work.workId) {
      add(
        issues,
        "aster.work.invalid-relationship",
        `relationships.${name}`,
        "Work cannot relate to itself.",
      );
    }
  }
  if (!nullableNonEmpty(work.relationships.cancellationReferenceId)) {
    add(
      issues,
      "aster.work.invalid-relationship",
      "relationships.cancellationReferenceId",
      "Cancellation reference must be null or a non-empty string.",
    );
  }

  if (
    !isMember(ASTER_WORK_REPLAY_MODES, work.replay.mode) ||
    !nullableNonEmpty(work.replay.sourceWorkId) ||
    !nullablePositiveInteger(work.replay.sourceWorkRevision) ||
    typeof work.replay.usesCurrentAuthorityFacts !== "boolean" ||
    work.replay.createsNewWorkIdentity !== true ||
    work.replay.preservesPriorResult !== true
  ) {
    add(
      issues,
      "aster.work.invalid-replay",
      "replay",
      "Replay contract is invalid.",
    );
  }
  if (
    work.replay.mode === "not-replay" &&
    (!hasNoPair(work.replay.sourceWorkId, work.replay.sourceWorkRevision) ||
      work.replay.usesCurrentAuthorityFacts !== true)
  ) {
    add(
      issues,
      "aster.work.invalid-replay",
      "replay",
      "Non-replay work uses no source work and current authority facts.",
    );
  }
  if (
    work.replay.mode !== "not-replay" &&
    (!hasPair(work.replay.sourceWorkId, work.replay.sourceWorkRevision) ||
      work.replay.sourceWorkId === work.workId)
  ) {
    add(
      issues,
      "aster.work.invalid-replay",
      "replay",
      "Replay requires a distinct source work identity and revision.",
    );
  }
  if (
    work.replay.mode === "historical-reproduction" &&
    (work.replay.usesCurrentAuthorityFacts || work.result.mayReplaceCurrentResult)
  ) {
    add(
      issues,
      "aster.work.invalid-replay",
      "replay",
      "Historical reproduction cannot use current authority claims or replace current results.",
    );
  }
  if (
    ["same-input", "current-input"].includes(work.replay.mode) &&
    !work.replay.usesCurrentAuthorityFacts
  ) {
    add(
      issues,
      "aster.work.invalid-replay",
      "replay.usesCurrentAuthorityFacts",
      "Operational replay requires current authority facts.",
    );
  }

  if (
    JSON.stringify(work.authority) !==
    JSON.stringify(ASTER_WORK_AUTHORITY_BOUNDARY)
  ) {
    add(
      issues,
      "aster.work.authority-escalation",
      "authority",
      "Work lifecycle authority must remain the exact public non-authority boundary.",
    );
  }

  const latest = latestAttempt(work.attempts);

  if (work.acknowledgement.claimsComplete && work.state !== "succeeded") {
    add(
      issues,
      "aster.work.invalid-acknowledgement",
      "acknowledgement.claimsComplete",
      "Only succeeded work may claim completion.",
    );
  }

  if (["requested", "accepted", "running"].includes(work.state)) {
    if (!["none", "pending"].includes(work.result.state)) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "result.state",
        "Incomplete work cannot claim a completed result.",
      );
    }
    if (work.acknowledgement.claimsComplete) {
      add(
        issues,
        "aster.work.invalid-acknowledgement",
        "acknowledgement.claimsComplete",
        "Requested, accepted, or running work cannot claim completion.",
      );
    }
  }

  if (work.state === "requested" && work.attempts.length !== 0) {
    add(
      issues,
      "aster.work.invalid-state-transition-evidence",
      "attempts",
      "Requested work cannot already contain an execution attempt.",
    );
  }

  if (work.state === "accepted") {
    if (
      work.executionClass !== "deferred" ||
      !work.acknowledgement.claimsAcceptedForProcessing ||
      work.attempts.length !== 0
    ) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "state",
        "Accepted means deferred work was truthfully accepted for later processing without an attempt or completion claim.",
      );
    }
  }

  if (work.state === "running" && latest?.state !== "running") {
    add(
      issues,
      "aster.work.invalid-state-transition-evidence",
      "attempts",
      "Running work requires one current running attempt.",
    );
  }

  if (work.state === "succeeded") {
    if (
      latest?.state !== "succeeded" ||
      !["complete", "partial"].includes(work.result.state) ||
      work.applicability !== "current" ||
      !work.result.mayReplaceCurrentResult ||
      !work.acknowledgement.claimsComplete
    ) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "state",
        "Succeeded work requires a successful attempt, current applicability, a complete or partial result, and truthful completion acknowledgement.",
      );
    }
  }

  if (work.state === "failed-retryable") {
    if (
      latest?.state !== "failed-retryable" ||
      work.retry.decision !== "permitted" ||
      work.retry.maxAttempts === null ||
      work.idempotency.strategy === "non-repeatable" ||
      work.result.state !== "failed"
    ) {
      add(
        issues,
        "aster.work.invalid-retry-policy",
        "retry",
        "Retryable failure requires a retryable attempt, explicit bounded permission, and a repeat-safe idempotency strategy.",
      );
    }
  }

  if (work.state === "failed-terminal") {
    if (
      latest?.state !== "failed-terminal" ||
      work.retry.decision !== "blocked" ||
      work.result.state !== "failed"
    ) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "state",
        "Terminal failure requires terminal attempt evidence, blocked retry, and failed result state.",
      );
    }
  }

  if (work.state === "timed-out") {
    if (
      latest?.state !== "timed-out" ||
      !["permitted", "blocked", "manual-review"].includes(
        work.retry.decision,
      ) ||
      !["none", "pending", "failed"].includes(work.result.state)
    ) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "state",
        "Timed-out work requires timeout attempt evidence and an explicit retry decision without completion claims.",
      );
    }
  }

  if (work.state === "cancelled") {
    if (
      !nonEmpty(work.relationships.cancellationReferenceId) ||
      work.retry.decision !== "blocked" ||
      work.result.state !== "cancelled" ||
      work.attempts.some((attempt) =>
        ["pending", "running"].includes(attempt.state),
      )
    ) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "state",
        "Cancelled work requires cancellation evidence, blocked retry, no active attempt, and cancelled result state.",
      );
    }
  }

  if (work.state === "provider-unavailable") {
    if (
      work.dependency.dependencyClass !== "provider" ||
      !["unavailable", "unknown"].includes(work.dependency.availability) ||
      !work.fallback.active ||
      work.fallback.mode === "not-required" ||
      !["provider-unavailable", "manual-fallback"].includes(
        work.acknowledgement.state,
      )
    ) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "state",
        "Provider-unavailable work requires a provider dependency, unavailable or unknown state, and a safe active fallback.",
      );
    }
  }

  if (work.state === "quarantined") {
    if (
      work.retry.decision !== "manual-review" ||
      work.result.state !== "quarantined" ||
      work.result.mayReplaceCurrentResult
    ) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "state",
        "Quarantined work requires manual review and cannot replace current results.",
      );
    }
  }

  if (work.state === "stale") {
    if (
      !["stale", "unknown"].includes(work.applicability) ||
      work.result.state !== "stale" ||
      work.result.mayReplaceCurrentResult ||
      work.retry.decision === "permitted"
    ) {
      add(
        issues,
        "aster.work.stale-result-escalation",
        "state",
        "Stale or unknown work cannot replace current results or retry automatically under stale authority.",
      );
    }
  }

  if (work.state === "superseded") {
    if (
      work.applicability !== "superseded" ||
      !hasPair(
        work.relationships.supersededByWorkId,
        work.relationships.supersededByWorkRevision,
      ) ||
      work.result.state !== "superseded" ||
      work.result.mayReplaceCurrentResult ||
      work.retry.decision !== "blocked"
    ) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "state",
        "Superseded work must identify its replacement and cannot replace current results or retry.",
      );
    }
  }

  if (work.state === "corrected") {
    if (
      work.applicability !== "superseded" ||
      !hasPair(
        work.relationships.correctedByWorkId,
        work.relationships.correctedByWorkRevision,
      ) ||
      work.result.state !== "corrected" ||
      work.result.mayReplaceCurrentResult ||
      work.retry.decision !== "blocked"
    ) {
      add(
        issues,
        "aster.work.invalid-state-transition-evidence",
        "state",
        "Corrected prior work must identify the correcting work and remain non-current.",
      );
    }
  }

  if (
    ["stale", "superseded", "unknown"].includes(work.applicability) &&
    work.result.mayReplaceCurrentResult
  ) {
    add(
      issues,
      "aster.work.stale-result-escalation",
      "result.mayReplaceCurrentResult",
      "Non-current work cannot overwrite a newer result.",
    );
  }

  if (
    work.attempts.some((attempt) => attempt.state === "outcome-unknown") &&
    work.retry.decision === "permitted"
  ) {
    add(
      issues,
      "aster.work.unknown-outcome-retry",
      "retry.decision",
      "Unknown external outcomes require blocking or manual reconciliation before retry.",
    );
  }

  return { valid: issues.length === 0, issues };
}
