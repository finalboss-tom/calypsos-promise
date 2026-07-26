import {
  HOUSE_OF_KEYS_CONTRACT_VERSION,
  HOUSE_OF_KEYS_EVALUATOR_ID,
  HOUSE_OF_KEYS_EVALUATOR_REVISION,
  HOUSE_OF_KEYS_POLICY_ID,
  HOUSE_OF_KEYS_POLICY_REVISION,
} from "./version.js";
import {
  durationsEqual,
  hasBlanketToken,
  isIsoDateTime,
  NAMESPACED_ID_PATTERN,
  recordKeysMatchIds,
  sameSet,
  selectorsEqual,
  uniqueValues,
} from "./contract-utils.js";
import type {
  AccessReceipt,
  ActorReference,
  DataClassification,
  DefinitionRevision,
  GrantDuration,
  GrantLifecycleState,
  HouseOfKeysSchemaBundle,
  NamespacedId,
  PermissionGrant,
  ScopeSelector,
} from "./types.js";

export interface HouseOfKeysValidationIssue {
  code: string;
  path: string;
  message: string;
}

export interface HouseOfKeysValidationResult {
  valid: boolean;
  issues: ReadonlyArray<HouseOfKeysValidationIssue>;
}

export interface HouseOfKeysValidationOptions {
  fixtureDataPolicy?: "any" | "public-or-synthetic";
}

function addIssue(
  issues: HouseOfKeysValidationIssue[],
  code: string,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function validateId(
  value: string,
  path: string,
  issues: HouseOfKeysValidationIssue[],
): void {
  if (!NAMESPACED_ID_PATTERN.test(value)) {
    addIssue(
      issues,
      "ID_INVALID",
      path,
      "Identifier must be a lowercase dotted namespaced identifier.",
    );
  }
}

function validateRevision(
  value: number,
  path: string,
  issues: HouseOfKeysValidationIssue[],
): void {
  if (!Number.isSafeInteger(value) || value < 1) {
    addIssue(
      issues,
      "REVISION_INVALID",
      path,
      "Revision must be a positive safe integer.",
    );
  }
}

function registerId(
  id: string,
  path: string,
  seenIds: Set<string>,
  issues: HouseOfKeysValidationIssue[],
): void {
  if (seenIds.has(id)) {
    addIssue(
      issues,
      "ID_DUPLICATE",
      path,
      `Identifier ${id} is duplicated in the bundle.`,
    );
  } else {
    seenIds.add(id);
  }
}

function ensureReference(
  id: string,
  knownIds: ReadonlySet<string>,
  path: string,
  issues: HouseOfKeysValidationIssue[],
): void {
  validateId(id, path, issues);
  if (!knownIds.has(id)) {
    addIssue(
      issues,
      "REFERENCE_DANGLING",
      path,
      `Referenced identifier ${id} does not exist in the bundle.`,
    );
  }
}

function validateClassification(
  value: DataClassification,
  path: string,
  options: HouseOfKeysValidationOptions,
  issues: HouseOfKeysValidationIssue[],
): void {
  if (
    options.fixtureDataPolicy === "public-or-synthetic" &&
    value === "private"
  ) {
    addIssue(
      issues,
      "FIXTURE_PRIVATE_DATA_FORBIDDEN",
      path,
      "Public fixtures may contain only public or synthetic data.",
    );
  }
}

function validateDefinition(
  value: DefinitionRevision,
  path: string,
  seenIds: Set<string>,
  issues: HouseOfKeysValidationIssue[],
): void {
  validateId(value.id, `${path}.id`, issues);
  validateRevision(value.revision, `${path}.revision`, issues);
  registerId(value.id, `${path}.id`, seenIds, issues);
  if (value.familyId !== undefined) {
    validateId(value.familyId, `${path}.familyId`, issues);
  }
  if (value.publicName.trim().length === 0) {
    addIssue(
      issues,
      "DEFINITION_NAME_REQUIRED",
      `${path}.publicName`,
      "A direct public name is required.",
    );
  }
  if (value.directExplanation.trim().length === 0) {
    addIssue(
      issues,
      "DEFINITION_EXPLANATION_REQUIRED",
      `${path}.directExplanation`,
      "A direct explanation is required.",
    );
  }
}

function validateStringArray(
  values: ReadonlyArray<string>,
  path: string,
  issues: HouseOfKeysValidationIssue[],
  options: { requireNonEmpty?: boolean; namespaced?: boolean } = {},
): void {
  if (options.requireNonEmpty && values.length === 0) {
    addIssue(issues, "SCOPE_EMPTY", path, "At least one value is required.");
  }
  if (!uniqueValues(values)) {
    addIssue(issues, "DUPLICATE_VALUE", path, "Values must be unique.");
  }
  if (options.namespaced) {
    values.forEach((value, index) =>
      validateId(value, `${path}[${index}]`, issues),
    );
  }
}

function validateSelector(
  selector: ScopeSelector | undefined,
  path: string,
  issues: HouseOfKeysValidationIssue[],
): void {
  if (selector === undefined) return;
  for (const [field, values] of [
    ["exactRecordIds", selector.exactRecordIds],
    ["exactVariableIds", selector.exactVariableIds],
    ["exactSourceArtifactIds", selector.exactSourceArtifactIds],
    ["exactDocumentVersionIds", selector.exactDocumentVersionIds],
    ["exactAttachmentIds", selector.exactAttachmentIds],
    ["exactPermissionRecordIds", selector.exactPermissionRecordIds],
  ] as const) {
    if (values !== undefined) {
      validateStringArray(values, `${path}.${field}`, issues, {
        namespaced: true,
      });
    }
  }
  if (selector.recordLifecycleStates !== undefined) {
    validateStringArray(
      selector.recordLifecycleStates,
      `${path}.recordLifecycleStates`,
      issues,
    );
  }
  for (const [field, value] of [
    ["representedFrom", selector.representedFrom],
    ["representedThrough", selector.representedThrough],
  ] as const) {
    if (value !== undefined && !isIsoDateTime(value)) {
      addIssue(
        issues,
        "DATETIME_INVALID",
        `${path}.${field}`,
        `${field} must be an offset-qualified ISO date-time.`,
      );
    }
  }
  if (
    selector.representedFrom !== undefined &&
    selector.representedThrough !== undefined &&
    Date.parse(selector.representedThrough) <
      Date.parse(selector.representedFrom)
  ) {
    addIssue(
      issues,
      "SELECTOR_TIME_INVALID",
      path,
      "The represented-through boundary must not precede represented-from.",
    );
  }
}

function validateDuration(
  duration: GrantDuration,
  path: string,
  issues: HouseOfKeysValidationIssue[],
): void {
  const validateBoundary = (value: string, field: string) => {
    if (!isIsoDateTime(value)) {
      addIssue(
        issues,
        "DATETIME_INVALID",
        `${path}.${field}`,
        `${field} must be an offset-qualified ISO date-time.`,
      );
    }
  };

  switch (duration.kind) {
    case "fixed-interval":
    case "single-use":
      validateBoundary(duration.startsAt, "startsAt");
      validateBoundary(duration.endsAt, "endsAt");
      if (Date.parse(duration.endsAt) <= Date.parse(duration.startsAt)) {
        addIssue(
          issues,
          "GRANT_DURATION_INVALID",
          path,
          "The duration end must be later than the start.",
        );
      }
      break;
    case "bounded-count":
      validateBoundary(duration.startsAt, "startsAt");
      validateBoundary(duration.endsAt, "endsAt");
      if (
        Date.parse(duration.endsAt) <= Date.parse(duration.startsAt) ||
        !Number.isSafeInteger(duration.maximumUses) ||
        duration.maximumUses < 1
      ) {
        addIssue(
          issues,
          "GRANT_DURATION_INVALID",
          path,
          "Bounded-count duration needs ordered times and a positive maximumUses.",
        );
      }
      break;
    case "review-bounded":
      validateBoundary(duration.startsAt, "startsAt");
      validateBoundary(duration.reviewAt, "reviewAt");
      if (Date.parse(duration.reviewAt) <= Date.parse(duration.startsAt)) {
        addIssue(
          issues,
          "GRANT_DURATION_INVALID",
          path,
          "The review time must be later than the start.",
        );
      }
      break;
    case "delayed-activation":
      validateId(
        duration.activationConditionId,
        `${path}.activationConditionId`,
        issues,
      );
      validateBoundary(duration.expiresAt, "expiresAt");
      break;
    case "session-bounded":
      validateId(duration.sessionId, `${path}.sessionId`, issues);
      validateBoundary(duration.absoluteEndsAt, "absoluteEndsAt");
      break;
  }
}

function definitionIsActiveGrantable(
  definition: DefinitionRevision | undefined,
): boolean {
  return definition?.grantable === true && definition.status === "active";
}

function revisionRecordMatches(
  ids: ReadonlyArray<string>,
  revisions: Readonly<Record<string, number>>,
  definitions: ReadonlyMap<string, DefinitionRevision>,
): boolean {
  return (
    recordKeysMatchIds(revisions, ids) &&
    ids.every((id) => definitions.get(id)?.revision === revisions[id])
  );
}

function validateGrant(
  grant: PermissionGrant,
  path: string,
  actors: ReadonlyMap<string, ActorReference>,
  purposes: ReadonlyMap<string, DefinitionRevision>,
  recipients: ReadonlyMap<string, DefinitionRevision>,
  categories: ReadonlyMap<string, DefinitionRevision>,
  actions: ReadonlyMap<string, DefinitionRevision>,
  seenIds: Set<string>,
  options: HouseOfKeysValidationOptions,
  issues: HouseOfKeysValidationIssue[],
): void {
  validateId(grant.id, `${path}.id`, issues);
  registerId(grant.id, `${path}.id`, seenIds, issues);
  validateRevision(grant.revision, `${path}.revision`, issues);
  if (grant.contractVersion !== HOUSE_OF_KEYS_CONTRACT_VERSION) {
    addIssue(
      issues,
      "CONTRACT_VERSION_UNSUPPORTED",
      `${path}.contractVersion`,
      `Expected contract version ${HOUSE_OF_KEYS_CONTRACT_VERSION}.`,
    );
  }

  ensureReference(
    grant.grantingAuthorityId,
    new Set(actors.keys()),
    `${path}.grantingAuthorityId`,
    issues,
  );
  if (actors.get(grant.grantingAuthorityId)?.kind !== "controlling-person") {
    addIssue(
      issues,
      "GRANTING_AUTHORITY_INVALID",
      `${path}.grantingAuthorityId`,
      "Ordinary person-controlled grants require a controlling-person authority.",
    );
  }

  validateId(
    grant.controlledResourceId,
    `${path}.controlledResourceId`,
    issues,
  );
  validateStringArray(grant.subjectIds, `${path}.subjectIds`, issues, {
    requireNonEmpty: true,
    namespaced: true,
  });

  const purpose = purposes.get(grant.purposeId);
  ensureReference(
    grant.purposeId,
    new Set(purposes.keys()),
    `${path}.purposeId`,
    issues,
  );
  if (!definitionIsActiveGrantable(purpose)) {
    addIssue(
      issues,
      "DEFINITION_NOT_GRANTABLE",
      `${path}.purposeId`,
      "A grant must reference an active grantable purpose leaf.",
    );
  }
  if (purpose !== undefined && purpose.revision !== grant.purposeRevision) {
    addIssue(
      issues,
      "REVISION_MISMATCH",
      `${path}.purposeRevision`,
      "The grant purpose revision must match the referenced definition.",
    );
  }

  const recipient = recipients.get(grant.primaryRecipientId);
  ensureReference(
    grant.primaryRecipientId,
    new Set(recipients.keys()),
    `${path}.primaryRecipientId`,
    issues,
  );
  if (!definitionIsActiveGrantable(recipient)) {
    addIssue(
      issues,
      "DEFINITION_NOT_GRANTABLE",
      `${path}.primaryRecipientId`,
      "A grant must reference an active grantable recipient.",
    );
  }
  if (
    recipient !== undefined &&
    recipient.revision !== grant.primaryRecipientRevision
  ) {
    addIssue(
      issues,
      "REVISION_MISMATCH",
      `${path}.primaryRecipientRevision`,
      "The grant recipient revision must match the referenced definition.",
    );
  }

  for (const [field, actorIds] of [
    ["permittedPerformingActorIds", grant.permittedPerformingActorIds],
    ["permittedProcessorIds", grant.permittedProcessorIds],
  ] as const) {
    if (actorIds !== undefined) {
      validateStringArray(actorIds, `${path}.${field}`, issues, {
        namespaced: true,
      });
      actorIds.forEach((id, index) =>
        ensureReference(
          id,
          new Set(actors.keys()),
          `${path}.${field}[${index}]`,
          issues,
        ),
      );
    }
  }

  validateStringArray(
    grant.dataCategoryIds,
    `${path}.dataCategoryIds`,
    issues,
    { requireNonEmpty: true, namespaced: true },
  );
  for (const [index, categoryId] of grant.dataCategoryIds.entries()) {
    if (hasBlanketToken(categoryId)) {
      addIssue(
        issues,
        "GRANT_BLANKET_SCOPE",
        `${path}.dataCategoryIds[${index}]`,
        "Blanket, wildcard, or future category authority is invalid.",
      );
    }
    const category = categories.get(categoryId);
    ensureReference(
      categoryId,
      new Set(categories.keys()),
      `${path}.dataCategoryIds[${index}]`,
      issues,
    );
    if (!definitionIsActiveGrantable(category)) {
      addIssue(
        issues,
        "DEFINITION_NOT_GRANTABLE",
        `${path}.dataCategoryIds[${index}]`,
        "A grant must reference active grantable category leaves.",
      );
    }
  }
  if (
    !revisionRecordMatches(
      grant.dataCategoryIds,
      grant.dataCategoryRevisions,
      categories,
    )
  ) {
    addIssue(
      issues,
      "REVISION_MISMATCH",
      `${path}.dataCategoryRevisions`,
      "Category revision snapshots must exactly match the selected definitions.",
    );
  }

  validateSelector(grant.selector, `${path}.selector`, issues);

  validateStringArray(grant.actionIds, `${path}.actionIds`, issues, {
    requireNonEmpty: true,
    namespaced: true,
  });
  for (const [index, actionId] of grant.actionIds.entries()) {
    if (hasBlanketToken(actionId)) {
      addIssue(
        issues,
        "GRANT_BLANKET_SCOPE",
        `${path}.actionIds[${index}]`,
        "Blanket or wildcard action authority is invalid.",
      );
    }
    const action = actions.get(actionId);
    ensureReference(
      actionId,
      new Set(actions.keys()),
      `${path}.actionIds[${index}]`,
      issues,
    );
    if (!definitionIsActiveGrantable(action)) {
      addIssue(
        issues,
        "DEFINITION_NOT_GRANTABLE",
        `${path}.actionIds[${index}]`,
        "A grant must reference active grantable action leaves.",
      );
    }
  }
  if (!revisionRecordMatches(grant.actionIds, grant.actionRevisions, actions)) {
    addIssue(
      issues,
      "REVISION_MISMATCH",
      `${path}.actionRevisions`,
      "Action revision snapshots must exactly match the selected definitions.",
    );
  }

  validateStringArray(
    grant.conditions.map((condition) => condition.id),
    `${path}.conditions`,
    issues,
    { namespaced: true },
  );
  validateDuration(grant.duration, `${path}.duration`, issues);
  validateClassification(
    grant.dataClassification,
    `${path}.dataClassification`,
    options,
    issues,
  );

  if (purpose !== undefined && "purposeClass" in purpose) {
    const purposeClass = purpose.purposeClass;
    if (
      purposeClass === "personal-core" &&
      grant.optionality !== "essential-personal"
    ) {
      addIssue(
        issues,
        "ESSENTIAL_USE_CLASSIFICATION_INVALID",
        `${path}.optionality`,
        "A personal-core purpose must remain classified as essential personal use.",
      );
    }
    if (purposeClass !== "personal-core" && grant.optionality !== "optional") {
      addIssue(
        issues,
        "ESSENTIAL_USE_CLASSIFICATION_INVALID",
        `${path}.optionality`,
        "Only a personal-core purpose may be essential personal use.",
      );
    }
  }
}

const ALLOWED_TRANSITIONS: Readonly<
  Record<GrantLifecycleState, ReadonlySet<GrantLifecycleState>>
> = {
  proposed: new Set(["pending-confirmation", "declined", "invalidated"]),
  "pending-confirmation": new Set(["active", "declined", "invalidated"]),
  active: new Set([
    "suspended",
    "expired",
    "exhausted",
    "withdrawn",
    "superseded",
    "invalidated",
  ]),
  suspended: new Set([
    "active",
    "expired",
    "exhausted",
    "withdrawn",
    "superseded",
    "invalidated",
  ]),
  expired: new Set(),
  exhausted: new Set(),
  withdrawn: new Set(),
  declined: new Set(),
  superseded: new Set(),
  invalidated: new Set(),
};

function validateReceipt(
  receipt: AccessReceipt,
  path: string,
  actors: ReadonlyMap<string, ActorReference>,
  purposes: ReadonlyMap<string, DefinitionRevision>,
  recipients: ReadonlyMap<string, DefinitionRevision>,
  categories: ReadonlyMap<string, DefinitionRevision>,
  actions: ReadonlyMap<string, DefinitionRevision>,
  grantsByKey: ReadonlyMap<string, PermissionGrant>,
  seenIds: Set<string>,
  options: HouseOfKeysValidationOptions,
  issues: HouseOfKeysValidationIssue[],
): void {
  validateId(receipt.id, `${path}.id`, issues);
  registerId(receipt.id, `${path}.id`, seenIds, issues);
  validateRevision(receipt.revision, `${path}.revision`, issues);
  if (receipt.contractVersion !== HOUSE_OF_KEYS_CONTRACT_VERSION) {
    addIssue(
      issues,
      "CONTRACT_VERSION_UNSUPPORTED",
      `${path}.contractVersion`,
      `Expected contract version ${HOUSE_OF_KEYS_CONTRACT_VERSION}.`,
    );
  }
  validateId(receipt.correlationId, `${path}.correlationId`, issues);
  validateId(
    receipt.controlledResourceId,
    `${path}.controlledResourceId`,
    issues,
  );
  validateStringArray(receipt.subjectIds, `${path}.subjectIds`, issues, {
    requireNonEmpty: true,
    namespaced: true,
  });

  for (const [field, actorId] of [
    ["requesterId", receipt.requesterId],
    ["performingActorId", receipt.performingActorId],
    ["processorId", receipt.processorId],
    ["receiptIssuerId", receipt.receiptIssuerId],
  ] as const) {
    if (actorId !== undefined) {
      ensureReference(
        actorId,
        new Set(actors.keys()),
        `${path}.${field}`,
        issues,
      );
    }
  }
  if (actors.get(receipt.receiptIssuerId)?.kind !== "receipt-issuer") {
    addIssue(
      issues,
      "RECEIPT_ISSUER_INVALID",
      `${path}.receiptIssuerId`,
      "The receipt issuer must use the receipt-issuer actor kind.",
    );
  }

  const purpose = purposes.get(receipt.purposeId);
  ensureReference(
    receipt.purposeId,
    new Set(purposes.keys()),
    `${path}.purposeId`,
    issues,
  );
  if (purpose?.revision !== receipt.purposeRevision) {
    addIssue(
      issues,
      "REVISION_MISMATCH",
      `${path}.purposeRevision`,
      "The receipt purpose revision must match the referenced definition.",
    );
  }

  const recipient = recipients.get(receipt.primaryRecipientId);
  ensureReference(
    receipt.primaryRecipientId,
    new Set(recipients.keys()),
    `${path}.primaryRecipientId`,
    issues,
  );
  if (recipient?.revision !== receipt.primaryRecipientRevision) {
    addIssue(
      issues,
      "REVISION_MISMATCH",
      `${path}.primaryRecipientRevision`,
      "The receipt recipient revision must match the referenced definition.",
    );
  }

  validateStringArray(
    receipt.dataCategoryIds,
    `${path}.dataCategoryIds`,
    issues,
    { requireNonEmpty: true, namespaced: true },
  );
  receipt.dataCategoryIds.forEach((id, index) =>
    ensureReference(
      id,
      new Set(categories.keys()),
      `${path}.dataCategoryIds[${index}]`,
      issues,
    ),
  );
  if (
    !revisionRecordMatches(
      receipt.dataCategoryIds,
      receipt.dataCategoryRevisions,
      categories,
    )
  ) {
    addIssue(
      issues,
      "REVISION_MISMATCH",
      `${path}.dataCategoryRevisions`,
      "Receipt category revisions must match the referenced definitions.",
    );
  }
  validateSelector(receipt.selector, `${path}.selector`, issues);

  validateStringArray(receipt.actionIds, `${path}.actionIds`, issues, {
    requireNonEmpty: true,
    namespaced: true,
  });
  receipt.actionIds.forEach((id, index) =>
    ensureReference(
      id,
      new Set(actions.keys()),
      `${path}.actionIds[${index}]`,
      issues,
    ),
  );
  if (
    !revisionRecordMatches(receipt.actionIds, receipt.actionRevisions, actions)
  ) {
    addIssue(
      issues,
      "REVISION_MISMATCH",
      `${path}.actionRevisions`,
      "Receipt action revisions must match the referenced definitions.",
    );
  }

  if (receipt.grantReferences.length === 0) {
    addIssue(
      issues,
      "RECEIPT_GRANT_REFERENCE_REQUIRED",
      `${path}.grantReferences`,
      "A material permission receipt must identify the grant revisions considered.",
    );
  }
  for (const [index, reference] of receipt.grantReferences.entries()) {
    validateId(
      reference.grantId,
      `${path}.grantReferences[${index}].grantId`,
      issues,
    );
    validateRevision(
      reference.grantRevision,
      `${path}.grantReferences[${index}].grantRevision`,
      issues,
    );
    if (!grantsByKey.has(`${reference.grantId}@${reference.grantRevision}`)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.grantReferences[${index}]`,
        "The receipt references an unavailable grant revision.",
      );
    }
  }

  validateId(receipt.policyRequestId, `${path}.policyRequestId`, issues);
  validateRevision(
    receipt.policyRequestRevision,
    `${path}.policyRequestRevision`,
    issues,
  );
  validateId(receipt.policyDecisionId, `${path}.policyDecisionId`, issues);

  for (const [field, value] of [
    ["requestedAt", receipt.requestedAt],
    ["decidedAt", receipt.decidedAt],
    ["attemptedAt", receipt.attemptedAt],
    ["releasedAt", receipt.releasedAt],
    ["completedAt", receipt.completedAt],
    ["failedAt", receipt.failedAt],
    ["recordedAt", receipt.recordedAt],
  ] as const) {
    if (value !== undefined && !isIsoDateTime(value)) {
      addIssue(
        issues,
        "DATETIME_INVALID",
        `${path}.${field}`,
        `${field} must be an offset-qualified ISO date-time.`,
      );
    }
  }

  if (
    receipt.eventKind === "receipt.access-completed" &&
    (!receipt.dataReleaseBoundaryCrossed ||
      receipt.executionState !== "complete")
  ) {
    addIssue(
      issues,
      "RECEIPT_OUTCOME_MISMATCH",
      path,
      "An access-completed receipt must record complete execution and a crossed data-release boundary.",
    );
  }
  if (
    receipt.eventKind === "receipt.policy-allowed" &&
    receipt.decisionOutcome !== "allow"
  ) {
    addIssue(
      issues,
      "RECEIPT_OUTCOME_MISMATCH",
      `${path}.decisionOutcome`,
      "A policy-allowed receipt must record an allow decision.",
    );
  }
  if (
    receipt.eventKind === "receipt.policy-denied" &&
    receipt.decisionOutcome !== "deny"
  ) {
    addIssue(
      issues,
      "RECEIPT_OUTCOME_MISMATCH",
      `${path}.decisionOutcome`,
      "A policy-denied receipt must record a deny decision.",
    );
  }
  if (
    receipt.eventKind === "receipt.policy-indeterminate" &&
    receipt.decisionOutcome !== "indeterminate"
  ) {
    addIssue(
      issues,
      "RECEIPT_OUTCOME_MISMATCH",
      `${path}.decisionOutcome`,
      "A policy-indeterminate receipt must record an indeterminate decision.",
    );
  }
  if (receipt.personVisibleSummary.trim().length === 0) {
    addIssue(
      issues,
      "RECEIPT_SUMMARY_REQUIRED",
      `${path}.personVisibleSummary`,
      "A direct person-visible receipt summary is required.",
    );
  }
  validateClassification(
    receipt.dataClassification,
    `${path}.dataClassification`,
    options,
    issues,
  );
}

export function validateHouseOfKeysSchemaBundle(
  bundle: HouseOfKeysSchemaBundle,
  options: HouseOfKeysValidationOptions = {},
): HouseOfKeysValidationResult {
  const issues: HouseOfKeysValidationIssue[] = [];
  const seenIds = new Set<string>();

  if (bundle.contractVersion !== HOUSE_OF_KEYS_CONTRACT_VERSION) {
    addIssue(
      issues,
      "CONTRACT_VERSION_UNSUPPORTED",
      "contractVersion",
      `Expected contract version ${HOUSE_OF_KEYS_CONTRACT_VERSION}.`,
    );
  }
  if (
    bundle.policyBundle.contractVersion !== HOUSE_OF_KEYS_CONTRACT_VERSION ||
    bundle.policyBundle.evaluatorId !== HOUSE_OF_KEYS_EVALUATOR_ID ||
    bundle.policyBundle.evaluatorRevision !==
      HOUSE_OF_KEYS_EVALUATOR_REVISION ||
    bundle.policyBundle.policyId !== HOUSE_OF_KEYS_POLICY_ID ||
    bundle.policyBundle.policyRevision !== HOUSE_OF_KEYS_POLICY_REVISION
  ) {
    addIssue(
      issues,
      "POLICY_BUNDLE_UNSUPPORTED",
      "policyBundle",
      "The policy bundle does not match the accepted baseline contract and evaluator revisions.",
    );
  }

  const actors = new Map<string, ActorReference>();
  for (const [index, actor] of bundle.actors.entries()) {
    validateId(actor.id, `actors[${index}].id`, issues);
    registerId(actor.id, `actors[${index}].id`, seenIds, issues);
    actors.set(actor.id, actor);
  }

  const purposes = new Map<string, DefinitionRevision>();
  for (const [index, purpose] of bundle.policyBundle.purposes.entries()) {
    validateDefinition(
      purpose,
      `policyBundle.purposes[${index}]`,
      seenIds,
      issues,
    );
    purposes.set(purpose.id, purpose);
  }
  const categories = new Map<string, DefinitionRevision>();
  for (const [
    index,
    category,
  ] of bundle.policyBundle.dataCategories.entries()) {
    validateDefinition(
      category,
      `policyBundle.dataCategories[${index}]`,
      seenIds,
      issues,
    );
    categories.set(category.id, category);
  }
  const recipients = new Map<string, DefinitionRevision>();
  for (const [index, recipient] of bundle.policyBundle.recipients.entries()) {
    validateDefinition(
      recipient,
      `policyBundle.recipients[${index}]`,
      seenIds,
      issues,
    );
    recipients.set(recipient.id, recipient);
  }
  const actions = new Map<string, DefinitionRevision>();
  for (const [index, action] of bundle.policyBundle.actions.entries()) {
    validateDefinition(
      action,
      `policyBundle.actions[${index}]`,
      seenIds,
      issues,
    );
    actions.set(action.id, action);
  }

  validateClassification(
    bundle.policyBundle.fixtureDataClassification,
    "policyBundle.fixtureDataClassification",
    options,
    issues,
  );

  const grantsByKey = new Map<string, PermissionGrant>();
  const grantIds = new Set<string>();
  for (const [index, grant] of bundle.grants.entries()) {
    validateGrant(
      grant,
      `grants[${index}]`,
      actors,
      purposes,
      recipients,
      categories,
      actions,
      seenIds,
      options,
      issues,
    );
    grantsByKey.set(`${grant.id}@${grant.revision}`, grant);
    grantIds.add(grant.id);
  }

  const explanationIds = new Set<string>();
  for (const [index, explanation] of bundle.explanations.entries()) {
    const path = `explanations[${index}]`;
    validateId(explanation.id, `${path}.id`, issues);
    registerId(explanation.id, `${path}.id`, seenIds, issues);
    validateRevision(explanation.revision, `${path}.revision`, issues);
    ensureReference(explanation.grantId, grantIds, `${path}.grantId`, issues);
    validateClassification(
      explanation.dataClassification,
      `${path}.dataClassification`,
      options,
      issues,
    );
    const grant = grantsByKey.get(
      `${explanation.grantId}@${explanation.grantRevision}`,
    );
    if (grant === undefined) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.grantRevision`,
        "The explanation references an unavailable grant revision.",
      );
    } else if (
      grant.purposeId !== explanation.purposeId ||
      grant.purposeRevision !== explanation.purposeRevision ||
      grant.primaryRecipientId !== explanation.recipientId ||
      grant.primaryRecipientRevision !== explanation.recipientRevision ||
      !sameSet(grant.dataCategoryIds, explanation.dataCategoryIds) ||
      !recordKeysMatchIds(
        explanation.dataCategoryRevisions,
        explanation.dataCategoryIds,
      ) ||
      explanation.dataCategoryIds.some(
        (id) =>
          explanation.dataCategoryRevisions[id] !==
          grant.dataCategoryRevisions[id],
      ) ||
      !selectorsEqual(grant.selector, explanation.selector) ||
      !sameSet(grant.actionIds, explanation.actionIds) ||
      !recordKeysMatchIds(explanation.actionRevisions, explanation.actionIds) ||
      explanation.actionIds.some(
        (id) => explanation.actionRevisions[id] !== grant.actionRevisions[id],
      ) ||
      !sameSet(
        explanation.conditionIds,
        grant.conditions.map((condition) => condition.id),
      ) ||
      !durationsEqual(grant.duration, explanation.duration) ||
      grant.optionality !== explanation.optionality ||
      !explanation.materiallyEquivalent
    ) {
      addIssue(
        issues,
        "EXPLANATION_MISMATCH",
        path,
        "The explanation snapshot must describe the exact grant revision and preserve direct/narrative parity.",
      );
    }
    explanationIds.add(explanation.id);
  }

  const comprehensionIds = new Set<string>();
  for (const [index, evidence] of bundle.comprehensionEvidence.entries()) {
    const path = `comprehensionEvidence[${index}]`;
    validateId(evidence.id, `${path}.id`, issues);
    registerId(evidence.id, `${path}.id`, seenIds, issues);
    validateRevision(evidence.revision, `${path}.revision`, issues);
    ensureReference(evidence.grantId, grantIds, `${path}.grantId`, issues);
    ensureReference(
      evidence.explanationSnapshotId,
      explanationIds,
      `${path}.explanationSnapshotId`,
      issues,
    );
    validateClassification(
      evidence.dataClassification,
      `${path}.dataClassification`,
      options,
      issues,
    );
    validateStringArray(
      evidence.requiredConceptIds,
      `${path}.requiredConceptIds`,
      issues,
      { namespaced: true },
    );
    validateStringArray(
      evidence.satisfiedConceptIds,
      `${path}.satisfiedConceptIds`,
      issues,
      { namespaced: true },
    );
    if (!isIsoDateTime(evidence.recordedAt)) {
      addIssue(
        issues,
        "DATETIME_INVALID",
        `${path}.recordedAt`,
        "Comprehension evidence time must be offset-qualified.",
      );
    }
    const grant = grantsByKey.get(
      `${evidence.grantId}@${evidence.grantRevision}`,
    );
    const explanation = bundle.explanations.find(
      (candidate) =>
        candidate.id === evidence.explanationSnapshotId &&
        candidate.revision === evidence.explanationRevision,
    );
    if (
      grant === undefined ||
      explanation === undefined ||
      explanation.grantId !== evidence.grantId ||
      explanation.grantRevision !== evidence.grantRevision
    ) {
      addIssue(
        issues,
        "COMPREHENSION_MISMATCH",
        path,
        "Comprehension evidence must reference the exact grant and explanation revisions.",
      );
    }
    if (
      evidence.status === "satisfied" &&
      (evidence.requiredConceptIds.length === 0 ||
        !evidence.requiredConceptIds.every((conceptId) =>
          evidence.satisfiedConceptIds.includes(conceptId),
        ) ||
        evidence.satisfiedConceptIds.some(
          (conceptId) => !evidence.requiredConceptIds.includes(conceptId),
        ))
    ) {
      addIssue(
        issues,
        "COMPREHENSION_MISMATCH",
        path,
        "Satisfied evidence must contain a non-empty required concept set and satisfy exactly those concepts.",
      );
    }
    comprehensionIds.add(evidence.id);
  }

  const confirmationIds = new Set<string>();
  for (const [index, confirmation] of bundle.confirmations.entries()) {
    const path = `confirmations[${index}]`;
    validateId(confirmation.id, `${path}.id`, issues);
    registerId(confirmation.id, `${path}.id`, seenIds, issues);
    validateRevision(confirmation.revision, `${path}.revision`, issues);
    ensureReference(confirmation.grantId, grantIds, `${path}.grantId`, issues);
    ensureReference(
      confirmation.grantingAuthorityId,
      new Set(actors.keys()),
      `${path}.grantingAuthorityId`,
      issues,
    );
    const grant = grantsByKey.get(
      `${confirmation.grantId}@${confirmation.grantRevision}`,
    );
    if (
      grant === undefined ||
      grant.grantingAuthorityId !== confirmation.grantingAuthorityId
    ) {
      addIssue(
        issues,
        "CONFIRMATION_MISMATCH",
        path,
        "Confirmation must reference the exact grant revision and granting authority.",
      );
    }
    if (!isIsoDateTime(confirmation.confirmedAt)) {
      addIssue(
        issues,
        "DATETIME_INVALID",
        `${path}.confirmedAt`,
        "Confirmation time must be an offset-qualified ISO date-time.",
      );
    }
    validateClassification(
      confirmation.dataClassification,
      `${path}.dataClassification`,
      options,
      issues,
    );
    confirmationIds.add(confirmation.id);
  }

  for (const [index, grant] of bundle.grants.entries()) {
    const path = `grants[${index}]`;
    ensureReference(
      grant.explanationSnapshotId,
      explanationIds,
      `${path}.explanationSnapshotId`,
      issues,
    );
    ensureReference(
      grant.confirmationEvidenceId,
      confirmationIds,
      `${path}.confirmationEvidenceId`,
      issues,
    );
    if (grant.requiresComprehension) {
      if (grant.comprehensionEvidenceId === undefined) {
        addIssue(
          issues,
          "COMPREHENSION_REQUIRED",
          `${path}.comprehensionEvidenceId`,
          "This grant requires comprehension evidence.",
        );
      } else {
        ensureReference(
          grant.comprehensionEvidenceId,
          comprehensionIds,
          `${path}.comprehensionEvidenceId`,
          issues,
        );
      }
    }
  }

  for (const [index, event] of bundle.lifecycleEvents.entries()) {
    const path = `lifecycleEvents[${index}]`;
    validateId(event.id, `${path}.id`, issues);
    registerId(event.id, `${path}.id`, seenIds, issues);
    ensureReference(event.grantId, grantIds, `${path}.grantId`, issues);
    if (!grantsByKey.has(`${event.grantId}@${event.grantRevision}`)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.grantRevision`,
        "The lifecycle event references an unavailable grant revision.",
      );
    }
    ensureReference(
      event.transitionActorId,
      new Set(actors.keys()),
      `${path}.transitionActorId`,
      issues,
    );
    validateId(event.reasonCode, `${path}.reasonCode`, issues);
    if (event.authorityBasis.trim().length === 0) {
      addIssue(
        issues,
        "LIFECYCLE_AUTHORITY_REQUIRED",
        `${path}.authorityBasis`,
        "A lifecycle transition must state its authority basis.",
      );
    }
    if (!ALLOWED_TRANSITIONS[event.previousState].has(event.nextState)) {
      addIssue(
        issues,
        "LIFECYCLE_TRANSITION_INVALID",
        path,
        "The lifecycle transition is not permitted by the baseline state model.",
      );
    }
    if (!isIsoDateTime(event.effectiveAt) || !isIsoDateTime(event.recordedAt)) {
      addIssue(
        issues,
        "DATETIME_INVALID",
        path,
        "Lifecycle effective and recorded times must be offset-qualified ISO date-times.",
      );
    }
  }

  const receiptIds = new Set(bundle.receipts.map((receipt) => receipt.id));
  for (const [index, receipt] of bundle.receipts.entries()) {
    validateReceipt(
      receipt,
      `receipts[${index}]`,
      actors,
      purposes,
      recipients,
      categories,
      actions,
      grantsByKey,
      seenIds,
      options,
      issues,
    );
  }
  for (const [index, receipt] of bundle.receipts.entries()) {
    if (
      receipt.correctsReceiptId !== undefined &&
      !receiptIds.has(receipt.correctsReceiptId)
    ) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `receipts[${index}].correctsReceiptId`,
        "A receipt correction must reference an existing receipt.",
      );
    }
  }

  try {
    JSON.stringify(bundle);
  } catch {
    addIssue(
      issues,
      "JSON_SERIALIZATION_FAILED",
      "$",
      "The House of Keys bundle must be JSON-serializable.",
    );
  }

  return { valid: issues.length === 0, issues };
}
