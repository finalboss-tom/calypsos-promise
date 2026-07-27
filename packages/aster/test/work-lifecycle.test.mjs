import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_CONTRACT_VERSION,
  ASTER_WORK_AUTHORITY_BOUNDARY,
  validateAsterWorkLifecycle,
} from "../dist/index.js";

function emptyRelationships() {
  return {
    duplicateOfWorkId: null,
    duplicateOfWorkRevision: null,
    supersedesWorkId: null,
    supersedesWorkRevision: null,
    supersededByWorkId: null,
    supersededByWorkRevision: null,
    correctsWorkId: null,
    correctsWorkRevision: null,
    correctedByWorkId: null,
    correctedByWorkRevision: null,
    cancellationReferenceId: null,
  };
}

function baseWork() {
  return {
    schemaId: "aster.work.lifecycle",
    schemaRevision: 1,
    contractVersion: ASTER_CONTRACT_VERSION,
    workId: "work-1",
    workRevision: 1,
    role: "librarian",
    operationId: "librarian.prepare-source-linked-recall",
    executionClass: "responsive",
    state: "succeeded",
    subject: { subjectId: "subject-1", subjectRevision: "subject-r3" },
    request: {
      requestId: "request-1",
      requestRevision: 2,
      intentDecisionId: "intent-1",
      intentDecisionRevision: 1,
      proposalId: null,
      proposalRevision: null,
    },
    inputSnapshot: {
      subjectRevision: "subject-r3",
      authorityRevisionReferences: ["keys-r4"],
      sourceRevisionReferences: ["record-r8"],
      policyRevisionReferences: ["policy-r2"],
    },
    currentSnapshot: {
      subjectRevision: "subject-r3",
      authorityRevisionReferences: ["keys-r4"],
      sourceRevisionReferences: ["record-r8"],
      policyRevisionReferences: ["policy-r2"],
    },
    applicability: "current",
    attempts: [
      {
        attemptId: "attempt-1",
        attemptNumber: 1,
        state: "succeeded",
        failureCode: null,
        detail: null,
      },
    ],
    retry: {
      policyId: "retry.none",
      policyRevision: 1,
      decision: "not-applicable",
      maxAttempts: 1,
      requiresFreshAuthority: true,
      providerDefaultIsAuthority: false,
      reason: "Responsive work completed in one bounded attempt.",
    },
    idempotency: {
      operationIdentity: "operation-1",
      strategy: "deduplicate-by-operation-id",
      duplicateDisposition: "return-existing",
      retryMayRepeatAuthoritativeEffect: false,
      transportDeduplicationIsSufficient: false,
    },
    dependency: {
      dependencyClass: "none",
      dependencyReferenceId: null,
      availability: "not-required",
    },
    fallback: {
      mode: "not-required",
      active: false,
      reasonCode: null,
      description: null,
      blocksCorePath: false,
    },
    result: {
      state: "complete",
      resultId: "result-1",
      resultRevision: 1,
      producedAgainstWorkRevision: 1,
      proposalOnly: true,
      canonical: false,
      authoritativeActionInvoked: false,
      domainAccepted: false,
      mayReplaceCurrentResult: true,
      limitations: ["Recall remains source-linked and non-canonical."],
    },
    acknowledgement: {
      state: "complete",
      message: "The source-linked recall draft is ready.",
      claimsAcceptedForProcessing: false,
      claimsComplete: true,
      claimsAuthoritativeEffect: false,
    },
    relationships: emptyRelationships(),
    replay: {
      mode: "not-replay",
      sourceWorkId: null,
      sourceWorkRevision: null,
      usesCurrentAuthorityFacts: true,
      createsNewWorkIdentity: true,
      preservesPriorResult: true,
    },
    authority: ASTER_WORK_AUTHORITY_BOUNDARY,
  };
}

function validate(work) {
  return validateAsterWorkLifecycle(structuredClone(work));
}

function issueCodes(result) {
  return result.issues.map((issue) => issue.code);
}

test("responsive success remains proposal-only and truthful", () => {
  const result = validate(baseWork());
  assert.equal(result.valid, true, JSON.stringify(result.issues));
});

test("deferred acceptance is pending rather than complete", () => {
  const work = baseWork();
  work.workId = "work-deferred";
  work.executionClass = "deferred";
  work.state = "accepted";
  work.attempts = [];
  work.retry = {
    ...work.retry,
    policyId: "retry.deferred",
    decision: "not-applicable",
    maxAttempts: 3,
    reason: "No attempt has started.",
  };
  work.dependency = {
    dependencyClass: "provider",
    dependencyReferenceId: "provider.synthetic",
    availability: "available",
  };
  work.result = {
    ...work.result,
    state: "pending",
    resultId: null,
    resultRevision: null,
    producedAgainstWorkRevision: null,
    mayReplaceCurrentResult: false,
    limitations: [],
  };
  work.acknowledgement = {
    state: "pending",
    message: "The work was accepted for later processing.",
    claimsAcceptedForProcessing: true,
    claimsComplete: false,
    claimsAuthoritativeEffect: false,
  };
  const result = validate(work);
  assert.equal(result.valid, true, JSON.stringify(result.issues));
});

test("retryable failure requires bounded retry and duplicate safety", () => {
  const work = baseWork();
  work.workId = "work-retry";
  work.executionClass = "deferred";
  work.state = "failed-retryable";
  work.attempts[0] = {
    attemptId: "attempt-1",
    attemptNumber: 1,
    state: "failed-retryable",
    failureCode: "aster.role.provider-unavailable",
    detail: "Synthetic provider returned a retryable failure.",
  };
  work.retry = {
    policyId: "retry.synthetic",
    policyRevision: 2,
    decision: "permitted",
    maxAttempts: 3,
    requiresFreshAuthority: true,
    providerDefaultIsAuthority: false,
    reason: "One bounded retry is permitted after authority freshness review.",
  };
  work.dependency = {
    dependencyClass: "provider",
    dependencyReferenceId: "provider.synthetic",
    availability: "available",
  };
  work.result = {
    ...work.result,
    state: "failed",
    resultId: null,
    resultRevision: null,
    producedAgainstWorkRevision: null,
    mayReplaceCurrentResult: false,
    limitations: ["No result was produced."],
  };
  work.acknowledgement = {
    state: "delayed",
    message: "The attempt failed and a bounded retry may occur.",
    claimsAcceptedForProcessing: true,
    claimsComplete: false,
    claimsAuthoritativeEffect: false,
  };
  const valid = validate(work);
  assert.equal(valid.valid, true, JSON.stringify(valid.issues));

  work.idempotency.strategy = "non-repeatable";
  const invalid = validate(work);
  assert.equal(invalid.valid, false);
  assert.ok(issueCodes(invalid).includes("aster.work.invalid-retry-policy"));
});

test("timeout and cancellation preserve explicit terminal evidence", () => {
  const timedOut = baseWork();
  timedOut.workId = "work-timeout";
  timedOut.executionClass = "deferred";
  timedOut.state = "timed-out";
  timedOut.attempts[0] = {
    attemptId: "attempt-1",
    attemptNumber: 1,
    state: "timed-out",
    failureCode: "aster.work.timeout",
    detail: "The bounded attempt exceeded its declared timeout.",
  };
  timedOut.retry = {
    ...timedOut.retry,
    decision: "manual-review",
    maxAttempts: 1,
    reason: "Review before any replay or retry.",
  };
  timedOut.result = {
    ...timedOut.result,
    state: "failed",
    resultId: null,
    resultRevision: null,
    producedAgainstWorkRevision: null,
    mayReplaceCurrentResult: false,
  };
  timedOut.acknowledgement = {
    state: "timed-out",
    message: "The attempt timed out and did not complete.",
    claimsAcceptedForProcessing: true,
    claimsComplete: false,
    claimsAuthoritativeEffect: false,
  };
  assert.equal(validate(timedOut).valid, true);

  const cancelled = baseWork();
  cancelled.workId = "work-cancelled";
  cancelled.executionClass = "deferred";
  cancelled.state = "cancelled";
  cancelled.attempts[0] = {
    attemptId: "attempt-1",
    attemptNumber: 1,
    state: "cancelled",
    failureCode: null,
    detail: "The player cancelled future processing.",
  };
  cancelled.retry = {
    ...cancelled.retry,
    decision: "blocked",
    maxAttempts: 1,
    reason: "Cancellation stops future execution.",
  };
  cancelled.result = {
    ...cancelled.result,
    state: "cancelled",
    resultId: null,
    resultRevision: null,
    producedAgainstWorkRevision: null,
    mayReplaceCurrentResult: false,
  };
  cancelled.acknowledgement = {
    state: "cancelled",
    message: "Future execution was cancelled.",
    claimsAcceptedForProcessing: false,
    claimsComplete: false,
    claimsAuthoritativeEffect: false,
  };
  cancelled.relationships.cancellationReferenceId = "cancel-1";
  assert.equal(validate(cancelled).valid, true);
});

test("provider unavailability activates a non-blocking fallback", () => {
  const work = baseWork();
  work.workId = "work-provider-down";
  work.executionClass = "deferred";
  work.state = "provider-unavailable";
  work.attempts[0] = {
    attemptId: "attempt-1",
    attemptNumber: 1,
    state: "provider-unavailable",
    failureCode: "aster.role.provider-unavailable",
    detail: "The synthetic provider is unavailable.",
  };
  work.retry = {
    ...work.retry,
    decision: "manual-review",
    maxAttempts: 1,
    reason: "Use the manual path before reconsidering provider work.",
  };
  work.dependency = {
    dependencyClass: "provider",
    dependencyReferenceId: "provider.synthetic",
    availability: "unavailable",
  };
  work.fallback = {
    mode: "structured-query",
    active: true,
    reasonCode: "provider-unavailable",
    description: "Use structured Chronicle query without hosted AI.",
    blocksCorePath: false,
  };
  work.result = {
    ...work.result,
    state: "failed",
    resultId: null,
    resultRevision: null,
    producedAgainstWorkRevision: null,
    mayReplaceCurrentResult: false,
  };
  work.acknowledgement = {
    state: "manual-fallback",
    message:
      "Hosted assistance is unavailable; the structured path remains available.",
    claimsAcceptedForProcessing: false,
    claimsComplete: false,
    claimsAuthoritativeEffect: false,
  };
  const result = validate(work);
  assert.equal(result.valid, true, JSON.stringify(result.issues));
});

test("stale and superseded work cannot replace newer results", () => {
  const stale = baseWork();
  stale.workId = "work-stale";
  stale.executionClass = "deferred";
  stale.state = "stale";
  stale.applicability = "stale";
  stale.currentSnapshot.sourceRevisionReferences = ["record-r9"];
  stale.retry = {
    ...stale.retry,
    decision: "blocked",
    maxAttempts: 1,
    reason: "The source revision changed.",
  };
  stale.result = {
    ...stale.result,
    state: "stale",
    resultId: null,
    resultRevision: null,
    producedAgainstWorkRevision: null,
    mayReplaceCurrentResult: false,
  };
  stale.acknowledgement = {
    state: "stale",
    message: "The result is stale and will not replace the current result.",
    claimsAcceptedForProcessing: false,
    claimsComplete: false,
    claimsAuthoritativeEffect: false,
  };
  assert.equal(validate(stale).valid, true);

  stale.result.mayReplaceCurrentResult = true;
  const invalid = validate(stale);
  assert.equal(invalid.valid, false);
  assert.ok(issueCodes(invalid).includes("aster.work.stale-result-escalation"));
});

test("replay creates a new identity and preserves prior results", () => {
  const work = baseWork();
  work.workId = "work-replay-2";
  work.replay = {
    mode: "current-input",
    sourceWorkId: "work-replay-1",
    sourceWorkRevision: 1,
    usesCurrentAuthorityFacts: true,
    createsNewWorkIdentity: true,
    preservesPriorResult: true,
  };
  work.relationships.correctsWorkId = "work-replay-1";
  work.relationships.correctsWorkRevision = 1;
  const valid = validate(work);
  assert.equal(valid.valid, true, JSON.stringify(valid.issues));

  work.replay.sourceWorkId = work.workId;
  const invalid = validate(work);
  assert.equal(invalid.valid, false);
  assert.ok(issueCodes(invalid).includes("aster.work.invalid-replay"));
});

test("unknown external outcomes and authority escalation are rejected", () => {
  const work = baseWork();
  work.workId = "work-unknown";
  work.executionClass = "deferred";
  work.state = "failed-retryable";
  work.attempts[0] = {
    attemptId: "attempt-1",
    attemptNumber: 1,
    state: "outcome-unknown",
    failureCode: "aster.work.outcome-unknown",
    detail: "An irreversible external outcome could not be established.",
  };
  work.retry = {
    ...work.retry,
    decision: "permitted",
    maxAttempts: 3,
    reason: "Unsafe test mutation.",
  };
  work.result = {
    ...work.result,
    state: "failed",
    resultId: null,
    resultRevision: null,
    producedAgainstWorkRevision: null,
    mayReplaceCurrentResult: false,
  };
  work.acknowledgement = {
    state: "failed",
    message: "The external outcome is unknown.",
    claimsAcceptedForProcessing: true,
    claimsComplete: false,
    claimsAuthoritativeEffect: false,
  };
  work.authority = {
    ...work.authority,
    canRetryUnknownExternalOutcome: true,
  };
  const invalid = validate(work);
  assert.equal(invalid.valid, false);
  assert.ok(issueCodes(invalid).includes("aster.work.unknown-outcome-retry"));
  assert.ok(issueCodes(invalid).includes("aster.work.authority-escalation"));
});
