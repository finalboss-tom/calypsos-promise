import { ASTER_EXECUTION_CLASSES, ASTER_ROLES } from "./authority.js";
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

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function positiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0;
}

function nullableNonEmpty(value: unknown): value is string | null {
  return value === null || nonEmpty(value);
}

function nullablePositiveInteger(value: unknown): value is number | null {
  return value === null || positiveInteger(value);
}

function member<T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value as never);
}

function hasPair(id: unknown, revision: unknown): boolean {
  return nonEmpty(id) && positiveInteger(revision);
}

function hasNoPair(id: unknown, revision: unknown): boolean {
  return id === null && revision === null;
}

function snapshotsMatch(
  left: AsterWorkLifecycleEnvelope["inputSnapshot"],
  right: AsterWorkLifecycleEnvelope["currentSnapshot"],
): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function latestAttempt(
  attempts: readonly AsterWorkAttempt[],
): AsterWorkAttempt | null {
  return attempts.length === 0 ? null : (attempts.at(-1) ?? null);
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
  const issue = (
    code: AsterWorkValidationCode,
    path: string,
    message: string,
  ): void => {
    issues.push({ code, path, message });
  };

  if (
    work.schemaId !== "aster.work.lifecycle" ||
    work.schemaRevision !== 1 ||
    work.contractVersion !== ASTER_CONTRACT_VERSION
  ) {
    issue(
      "aster.work.invalid-contract",
      "schemaId",
      "Work lifecycle contract identity or version is invalid.",
    );
  }

  if (!nonEmpty(work.workId) || !positiveInteger(work.workRevision)) {
    issue(
      "aster.work.invalid-identity",
      "workId",
      "Stable work identity and positive revision are required.",
    );
  }

  if (
    !member(ASTER_ROLES, work.role) ||
    !member(ASTER_ROLE_OPERATION_IDS, work.operationId) ||
    ASTER_ROLE_OPERATION_BY_ROLE[work.role] !== work.operationId
  ) {
    issue(
      "aster.work.invalid-role-operation",
      "operationId",
      "Role and operation must match the public role contract.",
    );
  }

  if (
    !member(ASTER_EXECUTION_CLASSES, work.executionClass) ||
    !ASTER_ROLE_CONTRACTS[work.role].executionClasses.includes(
      work.executionClass as never,
    )
  ) {
    issue(
      "aster.work.invalid-execution-class",
      "executionClass",
      "Execution class is not allowed for the selected role.",
    );
  }

  if (!member(ASTER_WORK_STATES, work.state)) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Work state is not recognized.",
    );
  }

  if (
    !nonEmpty(work.subject.subjectId) ||
    !nullableNonEmpty(work.subject.subjectRevision) ||
    !nonEmpty(work.request.requestId) ||
    !positiveInteger(work.request.requestRevision)
  ) {
    issue(
      "aster.work.invalid-request-reference",
      "request",
      "Stable request and subject references are required.",
    );
  }

  for (const [path, id, revision] of [
    [
      "request.intentDecision",
      work.request.intentDecisionId,
      work.request.intentDecisionRevision,
    ],
    ["request.proposal", work.request.proposalId, work.request.proposalRevision],
  ] as const) {
    if (!hasPair(id, revision) && !hasNoPair(id, revision)) {
      issue(
        "aster.work.invalid-request-reference",
        path,
        "Reference identity and revision must both be present or both be null.",
      );
    }
  }

  const validateSnapshot = (
    path: string,
    snapshot: AsterWorkLifecycleEnvelope["inputSnapshot"],
  ): void => {
    if (!nullableNonEmpty(snapshot.subjectRevision)) {
      issue(
        "aster.work.invalid-revision-snapshot",
        `${path}.subjectRevision`,
        "Snapshot subject revision must be null or a non-empty string.",
      );
    }
    for (const [name, references] of [
      ["authorityRevisionReferences", snapshot.authorityRevisionReferences],
      ["sourceRevisionReferences", snapshot.sourceRevisionReferences],
      ["policyRevisionReferences", snapshot.policyRevisionReferences],
    ] as const) {
      if (
        !Array.isArray(references) ||
        references.some((reference) => !nonEmpty(reference)) ||
        new Set(references).size !== references.length
      ) {
        issue(
          "aster.work.invalid-revision-snapshot",
          `${path}.${name}`,
          "Revision references must be unique non-empty strings.",
        );
      }
    }
  };

  validateSnapshot("inputSnapshot", work.inputSnapshot);
  validateSnapshot("currentSnapshot", work.currentSnapshot);

  if (
    !member(ASTER_WORK_APPLICABILITY_STATES, work.applicability) ||
    work.inputSnapshot.subjectRevision !== work.subject.subjectRevision
  ) {
    issue(
      "aster.work.invalid-revision-snapshot",
      "applicability",
      "Applicability and the input subject revision must be explicit.",
    );
  }
  if (
    work.applicability === "current" &&
    !snapshotsMatch(work.inputSnapshot, work.currentSnapshot)
  ) {
    issue(
      "aster.work.invalid-revision-snapshot",
      "currentSnapshot",
      "Current applicability requires exact input and current snapshots.",
    );
  }
  if (
    work.applicability === "stale" &&
    snapshotsMatch(work.inputSnapshot, work.currentSnapshot)
  ) {
    issue(
      "aster.work.invalid-revision-snapshot",
      "currentSnapshot",
      "Stale applicability requires an inspectable revision difference.",
    );
  }

  if (!Array.isArray(work.attempts)) {
    issue(
      "aster.work.invalid-attempt",
      "attempts",
      "Attempts must be an array.",
    );
  } else {
    const identities = new Set<string>();
    const active = work.attempts.filter((attempt) =>
      ["pending", "running"].includes(attempt.state),
    );
    if (active.length > 1) {
      issue(
        "aster.work.invalid-attempt",
        "attempts",
        "Only one attempt may be pending or running.",
      );
    }
    work.attempts.forEach((attempt, index) => {
      const path = `attempts[${index}]`;
      if (
        !nonEmpty(attempt.attemptId) ||
        identities.has(attempt.attemptId) ||
        attempt.attemptNumber !== index + 1 ||
        !member(ASTER_WORK_ATTEMPT_STATES, attempt.state) ||
        !nullableNonEmpty(attempt.failureCode) ||
        !nullableNonEmpty(attempt.detail)
      ) {
        issue(
          "aster.work.invalid-attempt",
          path,
          "Attempts require unique identity, contiguous numbering, and recognized state.",
        );
      }
      identities.add(attempt.attemptId);
      if (
        [
          "failed-retryable",
          "failed-terminal",
          "timed-out",
          "provider-unavailable",
          "outcome-unknown",
        ].includes(attempt.state) &&
        !nonEmpty(attempt.failureCode)
      ) {
        issue(
          "aster.work.invalid-attempt",
          `${path}.failureCode`,
          "Failure-like attempts require a stable failure code.",
        );
      }
    });
  }

  if (
    !nonEmpty(work.retry.policyId) ||
    !positiveInteger(work.retry.policyRevision) ||
    !member(ASTER_WORK_RETRY_DECISIONS, work.retry.decision) ||
    !nullablePositiveInteger(work.retry.maxAttempts) ||
    work.retry.requiresFreshAuthority !== true ||
    work.retry.providerDefaultIsAuthority !== false ||
    !nonEmpty(work.retry.reason) ||
    (work.retry.maxAttempts !== null &&
      work.attempts.some(
        (attempt) => attempt.attemptNumber > work.retry.maxAttempts!,
      ))
  ) {
    issue(
      "aster.work.invalid-retry-policy",
      "retry",
      "Retry policy must be versioned, bounded, freshness-preserving, and provider-neutral.",
    );
  }

  if (
    !nonEmpty(work.idempotency.operationIdentity) ||
    !member(
      ASTER_WORK_IDEMPOTENCY_STRATEGIES,
      work.idempotency.strategy,
    ) ||
    !member(
      ASTER_WORK_DUPLICATE_DISPOSITIONS,
      work.idempotency.duplicateDisposition,
    ) ||
    work.idempotency.retryMayRepeatAuthoritativeEffect !== false ||
    work.idempotency.transportDeduplicationIsSufficient !== false
  ) {
    issue(
      "aster.work.invalid-idempotency",
      "idempotency",
      "Idempotency must prevent duplicate authoritative effects independently of transport de-duplication.",
    );
  }

  if (
    !member(ASTER_WORK_DEPENDENCY_CLASSES, work.dependency.dependencyClass) ||
    !nullableNonEmpty(work.dependency.dependencyReferenceId) ||
    !member(
      ASTER_WORK_DEPENDENCY_AVAILABILITY_STATES,
      work.dependency.availability,
    ) ||
    (work.dependency.dependencyClass === "none" &&
      (work.dependency.dependencyReferenceId !== null ||
        work.dependency.availability !== "not-required")) ||
    (work.dependency.dependencyClass !== "none" &&
      work.dependency.availability !== "not-required" &&
      !nonEmpty(work.dependency.dependencyReferenceId))
  ) {
    issue(
      "aster.work.invalid-dependency",
      "dependency",
      "Dependency class, reference, and availability must agree.",
    );
  }

  if (
    !member(ASTER_WORK_FALLBACK_MODES, work.fallback.mode) ||
    typeof work.fallback.active !== "boolean" ||
    !nullableNonEmpty(work.fallback.reasonCode) ||
    !nullableNonEmpty(work.fallback.description) ||
    work.fallback.blocksCorePath !== false ||
    (work.fallback.active &&
      (work.fallback.mode === "not-required" ||
        !nonEmpty(work.fallback.reasonCode) ||
        !nonEmpty(work.fallback.description))) ||
    (!work.fallback.active &&
      (work.fallback.mode !== "not-required" ||
        work.fallback.reasonCode !== null ||
        work.fallback.description !== null))
  ) {
    issue(
      "aster.work.invalid-fallback",
      "fallback",
      "Fallback must be inspectable, recognized, and non-blocking for core paths.",
    );
  }

  const resultHasIdentity = hasPair(
    work.result.resultId,
    work.result.resultRevision,
  );
  const resultHasNoIdentity = hasNoPair(
    work.result.resultId,
    work.result.resultRevision,
  );
  if (
    !member(ASTER_WORK_RESULT_STATES, work.result.state) ||
    !nullablePositiveInteger(work.result.producedAgainstWorkRevision) ||
    work.result.proposalOnly !== true ||
    work.result.canonical !== false ||
    work.result.authoritativeActionInvoked !== false ||
    work.result.domainAccepted !== false ||
    typeof work.result.mayReplaceCurrentResult !== "boolean" ||
    !Array.isArray(work.result.limitations) ||
    work.result.limitations.some((limitation) => !nonEmpty(limitation)) ||
    (["complete", "partial"].includes(work.result.state)
      ? !resultHasIdentity ||
        work.result.producedAgainstWorkRevision !== work.workRevision
      : !resultHasNoIdentity || work.result.producedAgainstWorkRevision !== null)
  ) {
    issue(
      "aster.work.invalid-result",
      "result",
      "Work result must remain proposal-only and consistent with its lifecycle state.",
    );
  }

  if (
    !member(
      ASTER_WORK_ACKNOWLEDGEMENT_STATES,
      work.acknowledgement.state,
    ) ||
    !nonEmpty(work.acknowledgement.message) ||
    typeof work.acknowledgement.claimsAcceptedForProcessing !== "boolean" ||
    typeof work.acknowledgement.claimsComplete !== "boolean" ||
    work.acknowledgement.claimsAuthoritativeEffect !== false ||
    !acknowledgementAllowed(work.state, work.acknowledgement.state) ||
    (work.acknowledgement.claimsComplete && work.state !== "succeeded")
  ) {
    issue(
      "aster.work.invalid-acknowledgement",
      "acknowledgement",
      "Acknowledgement must truthfully match the lifecycle state without claiming authority.",
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
    if (
      (!hasPair(id, revision) && !hasNoPair(id, revision)) ||
      id === work.workId
    ) {
      issue(
        "aster.work.invalid-relationship",
        `relationships.${name}`,
        "Work relationships require paired identity and revision and cannot self-reference.",
      );
    }
  }
  if (!nullableNonEmpty(work.relationships.cancellationReferenceId)) {
    issue(
      "aster.work.invalid-relationship",
      "relationships.cancellationReferenceId",
      "Cancellation reference must be null or a non-empty string.",
    );
  }

  if (
    !member(ASTER_WORK_REPLAY_MODES, work.replay.mode) ||
    !nullableNonEmpty(work.replay.sourceWorkId) ||
    !nullablePositiveInteger(work.replay.sourceWorkRevision) ||
    typeof work.replay.usesCurrentAuthorityFacts !== "boolean" ||
    work.replay.createsNewWorkIdentity !== true ||
    work.replay.preservesPriorResult !== true ||
    (work.replay.mode === "not-replay"
      ? !hasNoPair(work.replay.sourceWorkId, work.replay.sourceWorkRevision) ||
        !work.replay.usesCurrentAuthorityFacts
      : !hasPair(work.replay.sourceWorkId, work.replay.sourceWorkRevision) ||
        work.replay.sourceWorkId === work.workId) ||
    (work.replay.mode === "historical-reproduction" &&
      (work.replay.usesCurrentAuthorityFacts ||
        work.result.mayReplaceCurrentResult)) ||
    (["same-input", "current-input"].includes(work.replay.mode) &&
      !work.replay.usesCurrentAuthorityFacts)
  ) {
    issue(
      "aster.work.invalid-replay",
      "replay",
      "Replay must create a new identity, preserve prior evidence, and use the correct authority boundary.",
    );
  }

  if (
    JSON.stringify(work.authority) !==
    JSON.stringify(ASTER_WORK_AUTHORITY_BOUNDARY)
  ) {
    issue(
      "aster.work.authority-escalation",
      "authority",
      "Work authority must remain the exact public non-authority boundary.",
    );
  }

  const latest = latestAttempt(work.attempts);

  if (
    ["requested", "accepted", "running"].includes(work.state) &&
    (!["none", "pending"].includes(work.result.state) ||
      work.acknowledgement.claimsComplete)
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Incomplete work cannot claim a completed result or acknowledgement.",
    );
  }

  if (work.state === "requested" && work.attempts.length !== 0) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "attempts",
      "Requested work cannot already contain an execution attempt.",
    );
  }

  if (
    work.state === "accepted" &&
    (work.executionClass !== "deferred" ||
      !work.acknowledgement.claimsAcceptedForProcessing ||
      work.attempts.length !== 0)
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Accepted means deferred work was accepted for later processing without an attempt or completion claim.",
    );
  }

  if (work.state === "running" && latest?.state !== "running") {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "attempts",
      "Running work requires one current running attempt.",
    );
  }

  if (
    work.state === "succeeded" &&
    (latest?.state !== "succeeded" ||
      !["complete", "partial"].includes(work.result.state) ||
      work.applicability !== "current" ||
      !work.result.mayReplaceCurrentResult ||
      !work.acknowledgement.claimsComplete)
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Succeeded work requires a successful attempt, current applicability, usable result, and truthful completion acknowledgement.",
    );
  }

  if (
    work.state === "failed-retryable" &&
    (latest?.state !== "failed-retryable" ||
      work.retry.decision !== "permitted" ||
      work.retry.maxAttempts === null ||
      work.idempotency.strategy === "non-repeatable" ||
      work.result.state !== "failed")
  ) {
    issue(
      "aster.work.invalid-retry-policy",
      "retry",
      "Retryable failure requires bounded permission and a repeat-safe idempotency strategy.",
    );
  }

  if (
    work.state === "failed-terminal" &&
    (latest?.state !== "failed-terminal" ||
      work.retry.decision !== "blocked" ||
      work.result.state !== "failed")
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Terminal failure requires terminal evidence and blocked retry.",
    );
  }

  if (
    work.state === "timed-out" &&
    (latest?.state !== "timed-out" ||
      !["permitted", "blocked", "manual-review"].includes(
        work.retry.decision,
      ) ||
      !["none", "pending", "failed"].includes(work.result.state))
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Timed-out work requires timeout evidence and an explicit retry decision.",
    );
  }

  if (
    work.state === "cancelled" &&
    (!nonEmpty(work.relationships.cancellationReferenceId) ||
      work.retry.decision !== "blocked" ||
      work.result.state !== "cancelled" ||
      work.attempts.some((attempt) =>
        ["pending", "running"].includes(attempt.state),
      ))
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Cancelled work requires cancellation evidence, blocked retry, and no active attempt.",
    );
  }

  if (
    work.state === "provider-unavailable" &&
    (work.dependency.dependencyClass !== "provider" ||
      !["unavailable", "unknown"].includes(work.dependency.availability) ||
      !work.fallback.active ||
      work.fallback.mode === "not-required" ||
      !["provider-unavailable", "manual-fallback"].includes(
        work.acknowledgement.state,
      ))
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Provider unavailability requires an explicit dependency state and safe fallback.",
    );
  }

  if (
    work.state === "quarantined" &&
    (work.retry.decision !== "manual-review" ||
      work.result.state !== "quarantined" ||
      work.result.mayReplaceCurrentResult)
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Quarantined work requires manual review and cannot replace current results.",
    );
  }

  if (
    work.state === "stale" &&
    (!["stale", "unknown"].includes(work.applicability) ||
      work.result.state !== "stale" ||
      work.result.mayReplaceCurrentResult ||
      work.retry.decision === "permitted")
  ) {
    issue(
      "aster.work.stale-result-escalation",
      "state",
      "Stale work cannot replace current results or retry automatically under stale authority.",
    );
  }

  if (
    work.state === "superseded" &&
    (work.applicability !== "superseded" ||
      !hasPair(
        work.relationships.supersededByWorkId,
        work.relationships.supersededByWorkRevision,
      ) ||
      work.result.state !== "superseded" ||
      work.result.mayReplaceCurrentResult ||
      work.retry.decision !== "blocked")
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Superseded work must identify its replacement and remain non-current.",
    );
  }

  if (
    work.state === "corrected" &&
    (work.applicability !== "superseded" ||
      !hasPair(
        work.relationships.correctedByWorkId,
        work.relationships.correctedByWorkRevision,
      ) ||
      work.result.state !== "corrected" ||
      work.result.mayReplaceCurrentResult ||
      work.retry.decision !== "blocked")
  ) {
    issue(
      "aster.work.invalid-state-transition-evidence",
      "state",
      "Corrected prior work must identify the correcting work and remain non-current.",
    );
  }

  if (
    ["stale", "superseded", "unknown"].includes(work.applicability) &&
    work.result.mayReplaceCurrentResult
  ) {
    issue(
      "aster.work.stale-result-escalation",
      "result.mayReplaceCurrentResult",
      "Non-current work cannot overwrite a newer result.",
    );
  }

  if (
    work.attempts.some((attempt) => attempt.state === "outcome-unknown") &&
    work.retry.decision === "permitted"
  ) {
    issue(
      "aster.work.unknown-outcome-retry",
      "retry.decision",
      "Unknown external outcomes require blocking or manual reconciliation before retry.",
    );
  }

  return { valid: issues.length === 0, issues };
}
