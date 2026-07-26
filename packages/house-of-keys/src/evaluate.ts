import {
  HOUSE_OF_KEYS_CONTRACT_VERSION,
  HOUSE_OF_KEYS_EVALUATOR_ID,
  HOUSE_OF_KEYS_EVALUATOR_REVISION,
  HOUSE_OF_KEYS_POLICY_ID,
  HOUSE_OF_KEYS_POLICY_REVISION,
} from "./version.js";
import {
  durationUpperBoundary,
  hasBlanketToken,
  isIsoDateTime,
  isSubset,
  recordKeysMatchIds,
  sameSet,
  selectorWithinGrant,
  selectorsEqual,
  durationsEqual,
  uniqueValues,
} from "./contract-utils.js";
import type {
  ActionDefinition,
  CapacitySnapshot,
  ComprehensionEvidence,
  ConditionFact,
  ExplanationSnapshot,
  GrantEvaluationFinding,
  NamespacedId,
  PermissionGrant,
  PolicyDecision,
  PolicyEvaluationInput,
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

function requestStructureReasons(input: PolicyEvaluationInput): string[] {
  const { request } = input;
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
    !uniqueValues(request.subjectIds) ||
    !uniqueValues(request.dataCategoryIds) ||
    !uniqueValues(request.actionIds) ||
    !uniqueValues(request.requestedConditionIds) ||
    !recordKeysMatchIds(
      request.dataCategoryRevisions,
      request.dataCategoryIds,
    ) ||
    !recordKeysMatchIds(request.actionRevisions, request.actionIds)
  ) {
    reasons.push("deny.request.invalid-structure");
  }

  if (
    !isIsoDateTime(request.requestedAt) ||
    !isIsoDateTime(input.evaluationTime) ||
    (input.executionWindowEndsAt !== undefined &&
      !isIsoDateTime(input.executionWindowEndsAt))
  ) {
    reasons.push("indeterminate.time.ambiguous");
  } else {
    if (Date.parse(request.requestedAt) > Date.parse(input.evaluationTime)) {
      reasons.push("indeterminate.time.ambiguous");
    }
    if (
      input.executionWindowEndsAt !== undefined &&
      Date.parse(input.executionWindowEndsAt) < Date.parse(input.evaluationTime)
    ) {
      reasons.push("deny.duration.outside-boundary");
    }
  }

  return reasons;
}

function actionFamilyMatchesBoundary(
  action: ActionDefinition,
  boundary: PolicyEvaluationInput["request"]["operationBoundary"],
): boolean {
  switch (boundary) {
    case "view":
    case "retrieve":
      return action.actionFamily === "read";
    case "create":
      return action.actionFamily === "create";
    case "transform":
      return (
        action.actionFamily === "transform" || action.actionFamily === "derive"
      );
    case "transmit":
      return action.actionFamily === "transmit";
    case "export":
      return action.actionFamily === "export";
    case "maintain":
      return (
        action.actionFamily === "maintain" ||
        action.actionFamily === "correct" ||
        action.actionFamily === "delete"
      );
    case "permission-administration":
      return action.actionFamily === "permission";
  }
}

function definitionsReasons(input: PolicyEvaluationInput): string[] {
  const { request } = input;
  const policy = input.bundle.policyBundle;
  const reasons: string[] = [];
  const purpose = policy.purposes.find(
    (value) => value.id === request.purposeId,
  );
  const recipient = policy.recipients.find(
    (value) => value.id === request.primaryRecipientId,
  );

  if (purpose === undefined) {
    reasons.push("indeterminate.taxonomy.unresolved");
  } else {
    if (!purpose.grantable || purpose.status !== "active") {
      reasons.push("deny.request.invalid-structure");
    }
    if (purpose.revision !== request.purposeRevision) {
      reasons.push("indeterminate.taxonomy.unresolved");
    }
  }

  if (recipient === undefined) {
    reasons.push("indeterminate.taxonomy.unresolved");
  } else {
    if (!recipient.grantable || recipient.status !== "active") {
      reasons.push("deny.request.invalid-structure");
    }
    if (recipient.revision !== request.primaryRecipientRevision) {
      reasons.push("indeterminate.recipient-membership.unresolved");
    }
  }

  for (const categoryId of request.dataCategoryIds) {
    const category = policy.dataCategories.find(
      (value) => value.id === categoryId,
    );
    if (category === undefined) {
      reasons.push("indeterminate.taxonomy.unresolved");
    } else {
      if (!category.grantable || category.status !== "active") {
        reasons.push("deny.request.invalid-structure");
      }
      if (request.dataCategoryRevisions[categoryId] !== category.revision) {
        reasons.push("indeterminate.taxonomy.unresolved");
      }
    }
  }

  for (const actionId of request.actionIds) {
    const action = policy.actions.find((value) => value.id === actionId);
    if (action === undefined) {
      reasons.push("indeterminate.taxonomy.unresolved");
    } else {
      if (!action.grantable || action.status !== "active") {
        reasons.push("deny.request.invalid-structure");
      }
      if (request.actionRevisions[actionId] !== action.revision) {
        reasons.push("indeterminate.taxonomy.unresolved");
      }
      if (!actionFamilyMatchesBoundary(action, request.operationBoundary)) {
        reasons.push("deny.request.invalid-structure");
      }
    }
  }

  return reasons;
}

function identityReasons(input: PolicyEvaluationInput): string[] {
  const reasons: string[] = [];
  const actorById = new Map(
    input.bundle.actors.map((actor) => [actor.id, actor] as const),
  );
  const requester = actorById.get(input.request.requesterId);
  if (
    requester === undefined ||
    requester.kind !== input.request.requesterKind
  ) {
    reasons.push("indeterminate.identity.unresolved");
  }
  for (const actorId of [
    input.request.performingActorId,
    input.request.processorId,
  ]) {
    if (actorId !== undefined && !actorById.has(actorId)) {
      reasons.push("indeterminate.identity.unresolved");
    }
  }
  return reasons;
}

function lifecycleReasons(grant: PermissionGrant): string[] {
  switch (grant.lifecycleState) {
    case "active":
      return [];
    case "proposed":
    case "pending-confirmation":
    case "declined":
      return ["deny.grant.lifecycle-non-applicable"];
    case "suspended":
      return ["deny.grant.suspended"];
    case "expired":
      return ["deny.grant.expired"];
    case "exhausted":
      return ["deny.grant.exhausted"];
    case "withdrawn":
      return ["deny.grant.withdrawn"];
    case "superseded":
      return ["deny.grant.superseded"];
    case "invalidated":
      return ["deny.grant.invalidated"];
  }
}

function durationReasons(
  grant: PermissionGrant,
  input: PolicyEvaluationInput,
  conditionFacts: ReadonlyMap<string, ConditionFact>,
  capacity: CapacitySnapshot | undefined,
): string[] {
  const reasons: string[] = [];
  const now = Date.parse(input.evaluationTime);

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
      if (
        capacity === undefined ||
        capacity.status === "unknown" ||
        capacity.status === "conflicting"
      ) {
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
      if (
        fact === undefined ||
        fact.status === "unknown" ||
        fact.status === "conflicting"
      ) {
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

  const upperBoundary = durationUpperBoundary(grant.duration);
  if (
    input.executionWindowEndsAt !== undefined &&
    upperBoundary !== undefined &&
    Date.parse(input.executionWindowEndsAt) > Date.parse(upperBoundary)
  ) {
    reasons.push("deny.duration.outside-boundary");
  }

  return reasons;
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
    !recordKeysMatchIds(
      explanation.dataCategoryRevisions,
      explanation.dataCategoryIds,
    ) ||
    explanation.dataCategoryIds.some(
      (id) =>
        explanation.dataCategoryRevisions[id] !==
        grant.dataCategoryRevisions[id],
    ) ||
    !selectorsEqual(explanation.selector, grant.selector) ||
    !sameSet(explanation.actionIds, grant.actionIds) ||
    !recordKeysMatchIds(explanation.actionRevisions, explanation.actionIds) ||
    explanation.actionIds.some(
      (id) => explanation.actionRevisions[id] !== grant.actionRevisions[id],
    ) ||
    !sameSet(
      explanation.conditionIds,
      grant.conditions.map((condition) => condition.id),
    ) ||
    !durationsEqual(explanation.duration, grant.duration) ||
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
    evidence.explanationRevision !== explanation.revision ||
    evidence.requiredConceptIds.length === 0
  ) {
    return ["indeterminate.comprehension.stale"];
  }
  if (evidence.status === "satisfied") {
    return evidence.requiredConceptIds.every((concept) =>
      evidence.satisfiedConceptIds.includes(concept),
    )
      ? []
      : ["indeterminate.comprehension.stale"];
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
    if (
      fact === undefined ||
      fact.status === "unknown" ||
      fact.status === "conflicting"
    ) {
      reasons.push("indeterminate.condition.unknown");
    } else if (
      fact.status === "false" ||
      (fact.actualValue !== undefined &&
        fact.actualValue !== condition.expectedValue)
    ) {
      reasons.push("deny.condition.false");
    }
  }
  return reasons;
}

function grantCoverageReasons(
  grant: PermissionGrant,
  input: PolicyEvaluationInput,
): string[] {
  const { request } = input;
  const reasons: string[] = [];

  if (
    grant.purposeId !== request.purposeId ||
    grant.purposeRevision !== request.purposeRevision
  ) {
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
  for (const id of request.dataCategoryIds) {
    if (request.dataCategoryRevisions[id] !== grant.dataCategoryRevisions[id]) {
      reasons.push("deny.scope.category-mismatch");
    }
  }
  if (!selectorWithinGrant(request.selector, grant.selector)) {
    reasons.push("deny.scope.selector-conflict");
  }
  if (!isSubset(request.actionIds, grant.actionIds)) {
    reasons.push("deny.action.mismatch");
  }
  for (const id of request.actionIds) {
    if (request.actionRevisions[id] !== grant.actionRevisions[id]) {
      reasons.push("deny.action.mismatch");
    }
  }

  if (
    grant.permittedPerformingActorIds !== undefined &&
    grant.permittedPerformingActorIds.length > 0
  ) {
    if (request.performingActorId === undefined) {
      reasons.push("indeterminate.fact.missing");
    } else if (
      !grant.permittedPerformingActorIds.includes(request.performingActorId)
    ) {
      reasons.push("deny.performing-actor.mismatch");
    }
  }
  if (
    grant.permittedProcessorIds !== undefined &&
    grant.permittedProcessorIds.length > 0
  ) {
    if (request.processorId === undefined) {
      reasons.push("indeterminate.fact.missing");
    } else if (!grant.permittedProcessorIds.includes(request.processorId)) {
      reasons.push("deny.performing-actor.mismatch");
    }
  }

  if (
    !sameSet(
      request.requestedConditionIds,
      grant.conditions.map((condition) => condition.id),
    )
  ) {
    reasons.push("deny.condition.false");
  }

  if (
    grant.conditions.some(
      (condition) => condition.kind === "player-visible-receipt-required",
    ) &&
    !request.receiptRequired
  ) {
    reasons.push("deny.condition.false");
  }

  return reasons;
}

function authorityReasons(
  grant: PermissionGrant,
  input: PolicyEvaluationInput,
): string[] {
  const actor = input.bundle.actors.find(
    (candidate) => candidate.id === grant.grantingAuthorityId,
  );
  if (actor === undefined) return ["indeterminate.identity.unresolved"];
  if (actor.kind !== "controlling-person") {
    return ["deny.authority.self-grant"];
  }
  return [];
}

function partialCompositionDetected(
  grants: ReadonlyArray<PermissionGrant>,
  input: PolicyEvaluationInput,
): boolean {
  const { request } = input;
  const relevant = grants.filter(
    (grant) =>
      grant.lifecycleState === "active" &&
      grant.purposeId === request.purposeId &&
      grant.purposeRevision === request.purposeRevision &&
      grant.primaryRecipientId === request.primaryRecipientId &&
      grant.primaryRecipientRevision === request.primaryRecipientRevision &&
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
  globalReasons.push(...identityReasons(input));

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

  const conditionFacts = new Map(
    input.conditionFacts.map((fact) => [fact.conditionId, fact] as const),
  );
  const capacities = new Map(
    input.capacitySnapshots.map(
      (snapshot) =>
        [`${snapshot.grantId}@${snapshot.grantRevision}`, snapshot] as const,
    ),
  );
  const explanationById = new Map(
    input.bundle.explanations.map((value) => [value.id, value] as const),
  );
  const comprehensionById = new Map(
    input.bundle.comprehensionEvidence.map(
      (value) => [value.id, value] as const,
    ),
  );
  const confirmationById = new Map(
    input.bundle.confirmations.map((value) => [value.id, value] as const),
  );

  const candidateIdSet =
    input.candidateGrantIds === undefined
      ? undefined
      : new Set(input.candidateGrantIds);
  if (
    candidateIdSet !== undefined &&
    [...candidateIdSet].some(
      (id) => !input.bundle.grants.some((grant) => grant.id === id),
    )
  ) {
    globalReasons.push("indeterminate.fact.missing");
  }

  const candidates = input.bundle.grants
    .filter(
      (grant) => candidateIdSet === undefined || candidateIdSet.has(grant.id),
    )
    .slice()
    .sort(
      (left, right) =>
        left.id.localeCompare(right.id) || left.revision - right.revision,
    );

  const findings: GrantEvaluationFinding[] = [];
  const authorizingGrantIds: NamespacedId[] = [];
  const authorizingGrants: PermissionGrant[] = [];

  for (const grant of candidates) {
    const reasons: string[] = [];
    reasons.push(...authorityReasons(grant, input));
    reasons.push(...grantCoverageReasons(grant, input));
    reasons.push(...lifecycleReasons(grant));
    reasons.push(
      ...durationReasons(
        grant,
        input,
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
      authorizingGrants.push(grant);
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
  const explicitGlobalDenial = orderedGlobalReasons.some(isDenyReason);
  const globalIndeterminate = orderedGlobalReasons.some(isIndeterminateReason);
  const potentiallyAuthorizingIndeterminate = findings.some((finding) => {
    const hasDeny = finding.reasonCodes.some(isDenyReason);
    const hasIndeterminate = finding.reasonCodes.some(isIndeterminateReason);
    return !hasDeny && hasIndeterminate;
  });

  let outcome: PolicyDecision["outcome"];
  let decisionReasons: string[];

  if (explicitGlobalDenial) {
    outcome = "deny";
    decisionReasons = orderedGlobalReasons.filter(isDenyReason);
  } else if (
    authorizingGrantIds.length > 0 &&
    !globalIndeterminate &&
    !potentiallyAuthorizingIndeterminate
  ) {
    outcome = "allow";
    decisionReasons = [
      authorizingGrantIds.length > 1
        ? "allow.multiple-independent-grants"
        : "allow.grant.exact-match",
    ];
  } else if (globalIndeterminate || potentiallyAuthorizingIndeterminate) {
    outcome = "indeterminate";
    decisionReasons = sortReasons([
      ...orderedGlobalReasons.filter(isIndeterminateReason),
      ...findings.flatMap((finding) =>
        finding.reasonCodes.some(isDenyReason)
          ? []
          : finding.reasonCodes.filter(isIndeterminateReason),
      ),
    ]);
  } else {
    outcome = "deny";
    decisionReasons = sortReasons([
      ...orderedGlobalReasons.filter(isDenyReason),
      ...findings.flatMap((finding) =>
        finding.reasonCodes.filter(isDenyReason),
      ),
      "deny.no-applicable-grant",
    ]);
  }

  const sortedAuthorizingGrantIds = [...authorizingGrantIds].sort(
    (left, right) => left.localeCompare(right),
  );
  const receiptRequiredByGrant = authorizingGrants.some((grant) =>
    grant.conditions.some(
      (condition) => condition.kind === "player-visible-receipt-required",
    ),
  );
  const missingOrConflictingFacts =
    outcome === "indeterminate"
      ? decisionReasons.filter(isIndeterminateReason)
      : [];

  return {
    decisionId: input.decisionId,
    correlationId: input.correlationId,
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
    receiptRequired: input.request.receiptRequired || receiptRequiredByGrant,
  };
}
