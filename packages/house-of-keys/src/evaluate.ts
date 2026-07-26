import {
  HOUSE_OF_KEYS_CONTRACT_VERSION,
  HOUSE_OF_KEYS_EVALUATOR_ID,
  HOUSE_OF_KEYS_EVALUATOR_REVISION,
  HOUSE_OF_KEYS_POLICY_ID,
  HOUSE_OF_KEYS_POLICY_REVISION,
} from "./version.js";
import type {
  CapacitySnapshot,
  ComprehensionEvidence,
  ConditionFact,
  ExplanationSnapshot,
  GrantEvaluationFinding,
  NamespacedId,
  PermissionGrant,
  PolicyDecision,
  PolicyEvaluationInput,
  ScopeSelector,
} from "./types.js";

const REASON_ORDER = [
  "indeterminate.contract.unsupported",
  "indeterminate.policy.unsupported",
  "indeterminate.policy.constitution-conflict",
  "deny.request.invalid-structure",
  "deny.request.non-atomic",
  "deny.request.blanket-scope",
  "indeterminate.fact.missing",
  "deny.authority.self-grant",
  "indeterminate.identity.unresolved",
  "indeterminate.recipient-membership.unresolved",
  "indeterminate.taxonomy.unresolved",
  "indeterminate.mapping.conflict",
  "deny.policy.secondary-use-bundling",
  "deny.policy.prohibition",
  "deny.purpose.mismatch",
  "deny.recipient.mismatch",
  "deny.performing-actor.mismatch",
  "deny.scope.category-mismatch",
  "deny.scope.selector-conflict",
  "deny.action.mismatch",
  "deny.condition.false",
  "indeterminate.condition.unknown",
  "deny.grant.lifecycle-non-applicable",
  "deny.grant.not-started",
  "deny.grant.expired",
  "deny.grant.exhausted",
  "deny.grant.withdrawn",
  "deny.grant.suspended",
  "deny.grant.superseded",
  "deny.grant.invalidated",
  "indeterminate.lifecycle.conflict",
  "indeterminate.time.ambiguous",
  "indeterminate.capacity.conflict",
  "deny.duration.outside-boundary",
  "indeterminate.explanation.mismatch",
  "deny.comprehension.not-satisfied",
  "indeterminate.comprehension.stale",
  "deny.confirmation.absent",
  "indeterminate.confirmation.conflict",
  "indeterminate.mandatory-authority.holdpoint",
  "deny.grant.partial-composition-prohibited",
  "deny.no-applicable-grant",
  "allow.grant.exact-match",
  "allow.grant.compatible-revision",
  "allow.multiple-independent-grants",
] as const;

const REASON_INDEX = new Map<string, number>(
  REASON_ORDER.map((reason, index) => [reason, index]),
);

function sortReasons(values: Iterable<string>): string[] {
  return [...new Set(values)].sort((left, right) => {
    const leftIndex = REASON_INDEX.get(left) ?? Number.MAX_SAFE_INTEGER;
    const rightIndex = REASON_INDEX.get(right) ?? Number.MAX_SAFE_INTEGER;
    return leftIndex - rightIndex || left.localeCompare(right);
  });
}

function isIndeterminateReason(reason: string): boolean {
  return reason.startsWith("indeterminate.");
}

function isDenyReason(reason: string): boolean {
  return reason.startsWith("deny.");
}

function sameSet(left: ReadonlyArray<string>, right: ReadonlyArray<string>): boolean {
  if (left.length !== right.length) return false;
  const rightSet = new Set(right);
  return left.every((value) => rightSet.has(value));
}

function isSubset(
  requested: ReadonlyArray<string>,
  permitted: ReadonlyArray<string>,
): boolean {
  const permittedSet = new Set(permitted);
  return requested.every((value) => permittedSet.has(value));
}

function hasBlanketToken(value: string): boolean {
  return (
    value.includes("*") ||
    value.endsWith(".all") ||
    value.endsWith(".any") ||
    value.endsWith(".future") ||
    value.includes("all-health-data")
  );
}

function selectorWithinGrant(
  requested: ScopeSelector | undefined,
  permitted: ScopeSelector | undefined,
): boolean {
  if (requested === undefined) return true;
  if (permitted === undefined) {
    return Object.values(requested).every(
      (value) => value === undefined || (Array.isArray(value) && value.length === 0),
    );
  }

  const arraysWithin = (
    requestedValues: ReadonlyArray<string> | undefined,
    permittedValues: ReadonlyArray<string> | undefined,
  ) => {
    if (requestedValues === undefined || requestedValues.length === 0) return true;
    if (permittedValues === undefined) return false;
    return isSubset(requestedValues, permittedValues);
  };

  if (
    !arraysWithin(requested.exactRecordIds, permitted.exactRecordIds) ||
    !arraysWithin(requested.exactVariableIds, permitted.exactVariableIds) ||
    !arraysWithin(
      requested.exactSourceArtifactIds,
      permitted.exactSourceArtifactIds,
    ) ||
    !arraysWithin(
      requested.exactDocumentVersionIds,
      permitted.exactDocumentVersionIds,
    ) ||
    !arraysWithin(requested.exactAttachmentIds, permitted.exactAttachmentIds)
  ) {
    return false;
  }

  if (
    requested.representedFrom !== undefined &&
    (permitted.representedFrom === undefined ||
      Date.parse(requested.representedFrom) < Date.parse(permitted.representedFrom))
  ) {
    return false;
  }
  if (
    requested.representedThrough !== undefined &&
    (permitted.representedThrough === undefined ||
      Date.parse(requested.representedThrough) >
        Date.parse(permitted.representedThrough))
  ) {
    return false;
  }

  return true;
}

function durationReasons(
  grant: PermissionGrant,
  evaluationTime: string,
  conditionFacts: ReadonlyMap<string, ConditionFact>,
  capacity: CapacitySnapshot | undefined,
): string[] {
  const reasons: string[] = [];
  const now = Date.parse(evaluationTime);

  switch (grant.duration.kind) {
    case "fixed-interval":
    case "single-use":
      if (now < Date.parse(grant.duration.startsAt)) {
        reasons.push("deny.grant.not-started");
      }
      if (now >= Date.parse(grant.duration.endsAt)) {
        reasons.push("deny.grant.expired");
      }
      break;
    case "bounded-count":
      if (now < Date.parse(grant.duration.startsAt)) {
        reasons.push("deny.grant.not-started");
      }
      if (now >= Date.parse(grant.duration.endsAt)) {
        reasons.push("deny.grant.expired");
      }
      if (capacity === undefined || capacity.status === "unknown") {
        reasons.push("indeterminate.capacity.conflict");
      } else if (capacity.status === "conflicting") {
        reasons.push("indeterminate.capacity.conflict");
      } else if (
        capacity.status === "exhausted" ||
        capacity.remainingCount === 0 ||
        (capacity.usedCount !== undefined &&
          capacity.usedCount >= grant.duration.maximumUses)
      ) {
        reasons.push("deny.grant.exhausted");
      }
      break;
    case "review-bounded":
      if (now < Date.parse(grant.duration.startsAt)) {
        reasons.push("deny.grant.not-started");
      }
      if (now >= Date.parse(grant.duration.reviewAt)) {
        reasons.push("deny.grant.expired");
      }
      break;
    case "delayed-activation": {
      const fact = conditionFacts.get(grant.duration.activationConditionId);
      if (fact === undefined || fact.status === "unknown" || fact.status === "conflicting") {
        reasons.push("indeterminate.condition.unknown");
      } else if (fact.status === "false") {
        reasons.push("deny.grant.not-started");
      }
      if (now >= Date.parse(grant.duration.expiresAt)) {
        reasons.push("deny.grant.expired");
      }
      break;
    }
    case "session-bounded":
      if (now >= Date.parse(grant.duration.absoluteEndsAt)) {
        reasons.push("deny.grant.expired");
      }
      break;
  }

  return reasons;
}

function lifecycleReasons(grant: PermissionGrant): string[] {
  switch (grant.lifecycleState) {
    case "active":
      return [];
    case "proposed":
    case "pending-confirmation":
      return ["deny.grant.lifecycle-non-applicable"];
    case "suspended":
      return ["deny.grant.suspended"];
    case "expired":
      return ["deny.grant.expired"];
    case "exhausted":
      return ["deny.grant.exhausted"];
    case "withdrawn":
      return ["deny.grant.withdrawn"];
    case "declined":
      return ["deny.grant.lifecycle-non-applicable"];
    case "superseded":
      return ["deny.grant.superseded"];
    case "invalidated":
      return ["deny.grant.invalidated"];
  }
}

function explanationReasons(
  grant: PermissionGrant,
  explanation: ExplanationSnapshot | undefined,
): string[] {
  if (explanation === undefined) {
    return ["indeterminate.explanation.mismatch"];
  }
  if (
    explanation.grantId !== grant.id ||
    explanation.grantRevision !== grant.revision ||
    explanation.purposeId !== grant.purposeId ||
    explanation.purposeRevision !== grant.purposeRevision ||
    explanation.recipientId !== grant.primaryRecipientId ||
    explanation.recipientRevision !== grant.primaryRecipientRevision ||
    !sameSet(explanation.dataCategoryIds, grant.dataCategoryIds) ||
    !sameSet(explanation.actionIds, grant.actionIds) ||
    explanation.optionality !== grant.optionality ||
    !explanation.materiallyEquivalent
  ) {
    return ["indeterminate.explanation.mismatch"];
  }
  return [];
}

function comprehensionReasons(
  grant: PermissionGrant,
  evidence: ComprehensionEvidence | undefined,
  explanation: ExplanationSnapshot | undefined,
): string[] {
  if (!grant.requiresComprehension) return [];
  if (evidence === undefined || explanation === undefined) {
    return ["indeterminate.comprehension.stale"];
  }
  if (
    evidence.grantId !== grant.id ||
    evidence.grantRevision !== grant.revision ||
    evidence.explanationSnapshotId !== explanation.id ||
    evidence.explanationRevision !== explanation.revision
  ) {
    return ["indeterminate.comprehension.stale"];
  }
  if (evidence.status === "satisfied") {
    if (
      evidence.requiredConceptIds.every((concept) =>
        evidence.satisfiedConceptIds.includes(concept),
      )
    ) {
      return [];
    }
    return ["indeterminate.comprehension.stale"];
  }
  if (evidence.status === "not-satisfied" || evidence.status === "declined") {
    return ["deny.comprehension.not-satisfied"];
  }
  return ["indeterminate.comprehension.stale"];
}

function conditionReasons(
  grant: PermissionGrant,
  conditionFacts: ReadonlyMap<string, ConditionFact>,
): string[] {
  const reasons: string[] = [];
  for (const condition of grant.conditions) {
    const fact = conditionFacts.get(condition.id);
    if (fact === undefined || fact.status === "unknown" || fact.status === "conflicting") {
      reasons.push("indeterminate.condition.unknown");
    } else if (fact.status === "false") {
      reasons.push("deny.condition.false");
    }
  }
  return reasons;
}

function grantCoverageReasons(
  grant: PermissionGrant,
  input: PolicyEvaluationInput,
): string[] {
  const request = input.request;
  const reasons: string[] = [];

  if (grant.purposeId !== request.purposeId || grant.purposeRevision !== request.purposeRevision) {
    reasons.push("deny.purpose.mismatch");
  }
  if (
    grant.primaryRecipientId !== request.primaryRecipientId ||
    grant.primaryRecipientRevision !== request.primaryRecipientRevision
  ) {
    reasons.push("deny.recipient.mismatch");
  }
  if (grant.controlledResourceId !== request.controlledResourceId) {
    reasons.push("deny.scope.selector-conflict");
  }
  if (!isSubset(request.subjectIds, grant.subjectIds)) {
    reasons.push("deny.scope.selector-conflict");
  }
  if (!isSubset(request.dataCategoryIds, grant.dataCategoryIds)) {
    reasons.push("deny.scope.category-mismatch");
  }
  if (!selectorWithinGrant(request.selector, grant.selector)) {
    reasons.push("deny.scope.selector-conflict");
  }
  if (!isSubset(request.actionIds, grant.actionIds)) {
    reasons.push("deny.action.mismatch");
  }
  if (
    request.performingActorId !== undefined &&
    grant.permittedPerformingActorIds !== undefined &&
    !grant.permittedPerformingActorIds.includes(request.performingActorId)
  ) {
    reasons.push("deny.performing-actor.mismatch");
  }
  if (
    request.processorId !== undefined &&
    grant.permittedProcessorIds !== undefined &&
    !grant.permittedProcessorIds.includes(request.processorId)
  ) {
    reasons.push("deny.performing-actor.mismatch");
  }
  if (!isSubset(request.requestedConditionIds, grant.conditions.map((condition) => condition.id))) {
    reasons.push("deny.condition.false");
  }

  return reasons;
}

function requestStructureReasons(input: PolicyEvaluationInput): string[] {
  const request = input.request;
  const reasons: string[] = [];
  if (
    request.subjectIds.length === 0 ||
    request.dataCategoryIds.length === 0 ||
    request.actionIds.length === 0 ||
    request.purposeId.length === 0 ||
    request.primaryRecipientId.length === 0 ||
    request.controlledResourceId.length === 0
  ) {
    reasons.push("indeterminate.fact.missing");
  }
  if (
    request.dataCategoryIds.some(hasBlanketToken) ||
    request.actionIds.some(hasBlanketToken) ||
    hasBlanketToken(request.purposeId) ||
    hasBlanketToken(request.primaryRecipientId)
  ) {
    reasons.push("deny.request.blanket-scope");
  }
  if (
    new Set(request.dataCategoryIds).size !== request.dataCategoryIds.length ||
    new Set(request.actionIds).size !== request.actionIds.length
  ) {
    reasons.push("deny.request.invalid-structure");
  }
  return reasons;
}

function definitionsReasons(input: PolicyEvaluationInput): string[] {
  const request = input.request;
  const policy = input.bundle.policyBundle;
  const reasons: string[] = [];
  const purpose = policy.purposes.find((value) => value.id === request.purposeId);
  const recipient = policy.recipients.find(
    (value) => value.id === request.primaryRecipientId,
  );

  if (purpose === undefined || recipient === undefined) {
    reasons.push("indeterminate.taxonomy.unresolved");
  } else {
    if (!purpose.grantable || purpose.status !== "active") {
      reasons.push("deny.request.invalid-structure");
    }
    if (!recipient.grantable || recipient.status !== "active") {
      reasons.push("deny.request.invalid-structure");
    }
    if (purpose.revision !== request.purposeRevision) {
      reasons.push("indeterminate.taxonomy.unresolved");
    }
    if (recipient.revision !== request.primaryRecipientRevision) {
      reasons.push("indeterminate.recipient-membership.unresolved");
    }
  }

  for (const categoryId of request.dataCategoryIds) {
    const category = policy.dataCategories.find((value) => value.id === categoryId);
    if (category === undefined) {
      reasons.push("indeterminate.taxonomy.unresolved");
    } else if (!category.grantable || category.status !== "active") {
      reasons.push("deny.request.invalid-structure");
    }
  }
  for (const actionId of request.actionIds) {
    const action = policy.actions.find((value) => value.id === actionId);
    if (action === undefined) {
      reasons.push("indeterminate.taxonomy.unresolved");
    } else if (!action.grantable || action.status !== "active") {
      reasons.push("deny.request.invalid-structure");
    }
  }
  return reasons;
}

function isSecondaryPurpose(input: PolicyEvaluationInput): boolean {
  const purpose = input.bundle.policyBundle.purposes.find(
    (candidate) => candidate.id === input.request.purposeId,
  );
  return purpose?.purposeClass.startsWith("secondary-") ?? false;
}

function partialCompositionDetected(
  grants: ReadonlyArray<PermissionGrant>,
  input: PolicyEvaluationInput,
): boolean {
  const request = input.request;
  const relevant = grants.filter(
    (grant) =>
      grant.lifecycleState === "active" &&
      grant.purposeId === request.purposeId &&
      grant.primaryRecipientId === request.primaryRecipientId &&
      grant.controlledResourceId === request.controlledResourceId &&
      isSubset(request.subjectIds, grant.subjectIds),
  );
  if (relevant.length < 2) return false;
  const categories = new Set<string>();
  const actions = new Set<string>();
  for (const grant of relevant) {
    grant.dataCategoryIds.forEach((value) => categories.add(value));
    grant.actionIds.forEach((value) => actions.add(value));
  }
  return (
    request.dataCategoryIds.every((value) => categories.has(value)) &&
    request.actionIds.every((value) => actions.has(value)) &&
    !relevant.some(
      (grant) =>
        isSubset(request.dataCategoryIds, grant.dataCategoryIds) &&
        isSubset(request.actionIds, grant.actionIds),
    )
  );
}

export function evaluateHouseOfKeysPolicy(
  input: PolicyEvaluationInput,
): PolicyDecision {
  const globalReasons: string[] = [];
  const missingOrConflictingFacts: string[] = [];

  if (
    input.contractVersion !== HOUSE_OF_KEYS_CONTRACT_VERSION ||
    input.bundle.contractVersion !== HOUSE_OF_KEYS_CONTRACT_VERSION ||
    input.bundle.policyBundle.contractVersion !== HOUSE_OF_KEYS_CONTRACT_VERSION
  ) {
    globalReasons.push("indeterminate.contract.unsupported");
  }
  if (
    input.evaluatorId !== HOUSE_OF_KEYS_EVALUATOR_ID ||
    input.evaluatorRevision !== HOUSE_OF_KEYS_EVALUATOR_REVISION ||
    input.policyId !== HOUSE_OF_KEYS_POLICY_ID ||
    input.policyRevision !== HOUSE_OF_KEYS_POLICY_REVISION ||
    input.bundle.policyBundle.evaluatorId !== HOUSE_OF_KEYS_EVALUATOR_ID ||
    input.bundle.policyBundle.evaluatorRevision !==
      HOUSE_OF_KEYS_EVALUATOR_REVISION ||
    input.bundle.policyBundle.policyId !== HOUSE_OF_KEYS_POLICY_ID ||
    input.bundle.policyBundle.policyRevision !== HOUSE_OF_KEYS_POLICY_REVISION
  ) {
    globalReasons.push("indeterminate.policy.unsupported");
  }

  globalReasons.push(...requestStructureReasons(input));
  globalReasons.push(...definitionsReasons(input));

  if (input.request.requesterId === input.bundle.grants[0]?.grantingAuthorityId && input.request.requesterKind === "requester") {
    const actor = input.bundle.actors.find(
      (candidate) => candidate.id === input.request.requesterId,
    );
    if (actor?.kind !== "controlling-person") {
      globalReasons.push("deny.authority.self-grant");
    }
  }

  if (
    input.bundle.policyBundle.prohibitedPurposeIds.includes(
      input.request.purposeId,
    ) ||
    input.request.actionIds.some((actionId) =>
      input.bundle.policyBundle.prohibitedActionIds.includes(actionId),
    )
  ) {
    globalReasons.push("deny.policy.prohibition");
  }

  const purpose = input.bundle.policyBundle.purposes.find(
    (candidate) => candidate.id === input.request.purposeId,
  );
  if (
    purpose?.purposeClass === "personal-core" &&
    isSecondaryPurpose(input)
  ) {
    globalReasons.push("indeterminate.policy.constitution-conflict");
  }

  const conditionFacts = new Map(
    input.conditionFacts.map((fact) => [fact.conditionId, fact]),
  );
  const capacities = new Map(
    input.capacitySnapshots.map((snapshot) => [
      `${snapshot.grantId}@${snapshot.grantRevision}`,
      snapshot,
    ]),
  );
  const explanationById = new Map(
    input.bundle.explanations.map((value) => [value.id, value]),
  );
  const comprehensionById = new Map(
    input.bundle.comprehensionEvidence.map((value) => [value.id, value]),
  );
  const confirmationById = new Map(
    input.bundle.confirmations.map((value) => [value.id, value]),
  );

  const candidateIdSet =
    input.candidateGrantIds === undefined
      ? undefined
      : new Set(input.candidateGrantIds);
  const candidates = input.bundle.grants
    .filter((grant) => candidateIdSet === undefined || candidateIdSet.has(grant.id))
    .slice()
    .sort((left, right) =>
      left.id.localeCompare(right.id) || left.revision - right.revision,
    );

  const findings: GrantEvaluationFinding[] = [];
  const authorizingGrantIds: NamespacedId[] = [];

  for (const grant of candidates) {
    const reasons: string[] = [];
    reasons.push(...grantCoverageReasons(grant, input));
    reasons.push(...lifecycleReasons(grant));
    reasons.push(
      ...durationReasons(
        grant,
        input.evaluationTime,
        conditionFacts,
        capacities.get(`${grant.id}@${grant.revision}`),
      ),
    );

    const explanation = explanationById.get(grant.explanationSnapshotId);
    reasons.push(...explanationReasons(grant, explanation));

    const evidence =
      grant.comprehensionEvidenceId === undefined
        ? undefined
        : comprehensionById.get(grant.comprehensionEvidenceId);
    reasons.push(...comprehensionReasons(grant, evidence, explanation));

    const confirmation = confirmationById.get(grant.confirmationEvidenceId);
    if (confirmation === undefined) {
      reasons.push("indeterminate.confirmation.conflict");
    } else if (
      confirmation.grantId !== grant.id ||
      confirmation.grantRevision !== grant.revision ||
      confirmation.grantingAuthorityId !== grant.grantingAuthorityId
    ) {
      reasons.push("indeterminate.confirmation.conflict");
    } else if (confirmation.decision !== "confirmed") {
      reasons.push("deny.confirmation.absent");
    }

    reasons.push(...conditionReasons(grant, conditionFacts));

    const orderedReasons = sortReasons(reasons);
    const independentlyAuthorizes = orderedReasons.length === 0;
    if (independentlyAuthorizes) {
      authorizingGrantIds.push(grant.id);
    }
    findings.push({
      grantId: grant.id,
      grantRevision: grant.revision,
      independentlyAuthorizes,
      reasonCodes: orderedReasons,
    });
  }

  if (
    authorizingGrantIds.length === 0 &&
    partialCompositionDetected(candidates, input)
  ) {
    globalReasons.push("deny.grant.partial-composition-prohibited");
  }

  const orderedGlobalReasons = sortReasons(globalReasons);
  const candidateReasons = findings.flatMap((finding) => finding.reasonCodes);
  const allReasons = sortReasons([...orderedGlobalReasons, ...candidateReasons]);

  for (const reason of allReasons) {
    if (isIndeterminateReason(reason)) {
      missingOrConflictingFacts.push(reason);
    }
  }

  const explicitGlobalDenial = orderedGlobalReasons.some(isDenyReason);
  const materialIndeterminate = allReasons.some(isIndeterminateReason);
  let outcome: PolicyDecision["outcome"];
  let decisionReasons: string[];

  if (explicitGlobalDenial) {
    outcome = "deny";
    decisionReasons = orderedGlobalReasons.filter(isDenyReason);
  } else if (authorizingGrantIds.length > 0 && !materialIndeterminate) {
    outcome = "allow";
    decisionReasons = [
      authorizingGrantIds.length > 1
        ? "allow.multiple-independent-grants"
        : "allow.grant.exact-match",
    ];
  } else if (materialIndeterminate) {
    outcome = "indeterminate";
    decisionReasons = allReasons.filter(isIndeterminateReason);
  } else {
    outcome = "deny";
    decisionReasons = sortReasons([
      ...allReasons.filter(isDenyReason),
      "deny.no-applicable-grant",
    ]);
  }

  const sortedAuthorizingGrantIds = [...authorizingGrantIds].sort((left, right) =>
    left.localeCompare(right),
  );

  return {
    outcome,
    contractVersion: HOUSE_OF_KEYS_CONTRACT_VERSION,
    evaluatorId: HOUSE_OF_KEYS_EVALUATOR_ID,
    evaluatorRevision: HOUSE_OF_KEYS_EVALUATOR_REVISION,
    policyId: HOUSE_OF_KEYS_POLICY_ID,
    policyRevision: HOUSE_OF_KEYS_POLICY_REVISION,
    requestId: input.request.id,
    requestRevision: input.request.revision,
    evaluatedAt: input.evaluationTime,
    independentlyAuthorizingGrantIds: sortedAuthorizingGrantIds,
    renderingGrantId: sortedAuthorizingGrantIds[0],
    grantFindings: findings,
    reasonCodes: sortReasons(decisionReasons),
    missingOrConflictingFacts: sortReasons(missingOrConflictingFacts),
    reEvaluationRequiredBeforeExecution: true,
    receiptRequired: input.request.receiptRequired,
  };
}
