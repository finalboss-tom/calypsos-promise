import {
  HOUSE_OF_KEYS_CONTRACT_VERSION,
  HOUSE_OF_KEYS_EVALUATOR_ID,
  HOUSE_OF_KEYS_EVALUATOR_REVISION,
  HOUSE_OF_KEYS_POLICY_ID,
  HOUSE_OF_KEYS_POLICY_REVISION,
} from "./version.js";
import type {
  DataClassification,
  DefinitionRevision,
  GrantDuration,
  HouseOfKeysSchemaBundle,
  NamespacedId,
  PermissionGrant,
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

const NAMESPACED_ID_PATTERN =
  /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:\.[a-z][a-z0-9]*(?:-[a-z0-9]+)*)+$/;
const ISO_DATE_TIME_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

function addIssue(
  issues: HouseOfKeysValidationIssue[],
  code: string,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function isIsoDateTime(value: string): boolean {
  return ISO_DATE_TIME_PATTERN.test(value) && !Number.isNaN(Date.parse(value));
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

function hasBlanketToken(id: string): boolean {
  return (
    id.includes("*") ||
    id.endsWith(".all") ||
    id.endsWith(".any") ||
    id.endsWith(".future") ||
    id.includes("all-health-data")
  );
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

function validateGrant(
  grant: PermissionGrant,
  path: string,
  actors: ReadonlySet<string>,
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
    actors,
    `${path}.grantingAuthorityId`,
    issues,
  );
  validateId(
    grant.controlledResourceId,
    `${path}.controlledResourceId`,
    issues,
  );
  if (grant.subjectIds.length === 0) {
    addIssue(
      issues,
      "GRANT_SCOPE_EMPTY",
      `${path}.subjectIds`,
      "A grant must name at least one subject.",
    );
  }
  for (const [index, subjectId] of grant.subjectIds.entries()) {
    validateId(subjectId, `${path}.subjectIds[${index}]`, issues);
  }

  const purpose = purposes.get(grant.purposeId);
  ensureReference(
    grant.purposeId,
    new Set(purposes.keys()),
    `${path}.purposeId`,
    issues,
  );
  if (purpose !== undefined) {
    if (!purpose.grantable || purpose.status !== "active") {
      addIssue(
        issues,
        "DEFINITION_NOT_GRANTABLE",
        `${path}.purposeId`,
        "A grant must reference an active grantable purpose leaf.",
      );
    }
    if (purpose.revision !== grant.purposeRevision) {
      addIssue(
        issues,
        "REVISION_MISMATCH",
        `${path}.purposeRevision`,
        "The grant purpose revision must match the referenced definition.",
      );
    }
  }

  const recipient = recipients.get(grant.primaryRecipientId);
  ensureReference(
    grant.primaryRecipientId,
    new Set(recipients.keys()),
    `${path}.primaryRecipientId`,
    issues,
  );
  if (recipient !== undefined) {
    if (!recipient.grantable || recipient.status !== "active") {
      addIssue(
        issues,
        "DEFINITION_NOT_GRANTABLE",
        `${path}.primaryRecipientId`,
        "A grant must reference an active grantable recipient.",
      );
    }
    if (recipient.revision !== grant.primaryRecipientRevision) {
      addIssue(
        issues,
        "REVISION_MISMATCH",
        `${path}.primaryRecipientRevision`,
        "The grant recipient revision must match the referenced definition.",
      );
    }
  }

  if (grant.dataCategoryIds.length === 0 || grant.actionIds.length === 0) {
    addIssue(
      issues,
      "GRANT_SCOPE_EMPTY",
      path,
      "A grant must contain explicit category and action leaves.",
    );
  }

  for (const [index, categoryId] of grant.dataCategoryIds.entries()) {
    const category = categories.get(categoryId);
    ensureReference(
      categoryId,
      new Set(categories.keys()),
      `${path}.dataCategoryIds[${index}]`,
      issues,
    );
    if (hasBlanketToken(categoryId)) {
      addIssue(
        issues,
        "GRANT_BLANKET_SCOPE",
        `${path}.dataCategoryIds[${index}]`,
        "Blanket, wildcard, or future category authority is invalid.",
      );
    }
    if (category !== undefined) {
      if (!category.grantable || category.status !== "active") {
        addIssue(
          issues,
          "DEFINITION_NOT_GRANTABLE",
          `${path}.dataCategoryIds[${index}]`,
          "A grant must reference active grantable category leaves.",
        );
      }
      if (grant.dataCategoryRevisions[categoryId] !== category.revision) {
        addIssue(
          issues,
          "REVISION_MISMATCH",
          `${path}.dataCategoryRevisions.${categoryId}`,
          "The category revision snapshot must match the referenced definition.",
        );
      }
    }
  }

  for (const [index, actionId] of grant.actionIds.entries()) {
    const action = actions.get(actionId);
    ensureReference(
      actionId,
      new Set(actions.keys()),
      `${path}.actionIds[${index}]`,
      issues,
    );
    if (hasBlanketToken(actionId)) {
      addIssue(
        issues,
        "GRANT_BLANKET_SCOPE",
        `${path}.actionIds[${index}]`,
        "Blanket or wildcard action authority is invalid.",
      );
    }
    if (action !== undefined) {
      if (!action.grantable || action.status !== "active") {
        addIssue(
          issues,
          "DEFINITION_NOT_GRANTABLE",
          `${path}.actionIds[${index}]`,
          "A grant must reference active grantable action leaves.",
        );
      }
      if (grant.actionRevisions[actionId] !== action.revision) {
        addIssue(
          issues,
          "REVISION_MISMATCH",
          `${path}.actionRevisions.${actionId}`,
          "The action revision snapshot must match the referenced definition.",
        );
      }
    }
  }

  validateDuration(grant.duration, `${path}.duration`, issues);
  validateClassification(
    grant.dataClassification,
    `${path}.dataClassification`,
    options,
    issues,
  );

  if (
    grant.optionality === "essential-personal" &&
    purpose !== undefined &&
    "purposeClass" in purpose &&
    purpose.purposeClass !== "personal-core"
  ) {
    addIssue(
      issues,
      "ESSENTIAL_USE_CLASSIFICATION_INVALID",
      `${path}.optionality`,
      "Only a personal-core purpose may be classified as essential personal use.",
    );
  }
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

  const actorIds = new Set<string>();
  for (const [index, actor] of bundle.actors.entries()) {
    validateId(actor.id, `actors[${index}].id`, issues);
    registerId(actor.id, `actors[${index}].id`, seenIds, issues);
    actorIds.add(actor.id);
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

  const grantIds = new Set<string>();
  for (const [index, grant] of bundle.grants.entries()) {
    validateGrant(
      grant,
      `grants[${index}]`,
      actorIds,
      purposes,
      recipients,
      categories,
      actions,
      seenIds,
      options,
      issues,
    );
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
    const grant = bundle.grants.find(
      (candidate) =>
        candidate.id === explanation.grantId &&
        candidate.revision === explanation.grantRevision,
    );
    if (
      grant !== undefined &&
      (grant.purposeId !== explanation.purposeId ||
        grant.primaryRecipientId !== explanation.recipientId ||
        !sameSet(grant.dataCategoryIds, explanation.dataCategoryIds) ||
        !sameSet(grant.actionIds, explanation.actionIds) ||
        grant.optionality !== explanation.optionality ||
        !explanation.materiallyEquivalent)
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
    if (
      evidence.status === "satisfied" &&
      !evidence.requiredConceptIds.every((conceptId) =>
        evidence.satisfiedConceptIds.includes(conceptId),
      )
    ) {
      addIssue(
        issues,
        "COMPREHENSION_MISMATCH",
        path,
        "Satisfied evidence must satisfy every required concept.",
      );
    }
    comprehensionIds.add(evidence.id);
  }

  const confirmationIds = new Set<string>();
  for (const [index, confirmation] of bundle.confirmations.entries()) {
    const path = `confirmations[${index}]`;
    validateId(confirmation.id, `${path}.id`, issues);
    registerId(confirmation.id, `${path}.id`, seenIds, issues);
    ensureReference(confirmation.grantId, grantIds, `${path}.grantId`, issues);
    ensureReference(
      confirmation.grantingAuthorityId,
      actorIds,
      `${path}.grantingAuthorityId`,
      issues,
    );
    if (!isIsoDateTime(confirmation.confirmedAt)) {
      addIssue(
        issues,
        "DATETIME_INVALID",
        `${path}.confirmedAt`,
        "Confirmation time must be an offset-qualified ISO date-time.",
      );
    }
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
    validateId(event.reasonCode, `${path}.reasonCode`, issues);
    if (!isIsoDateTime(event.effectiveAt) || !isIsoDateTime(event.recordedAt)) {
      addIssue(
        issues,
        "DATETIME_INVALID",
        path,
        "Lifecycle effective and recorded times must be offset-qualified ISO date-times.",
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

function sameSet(
  left: ReadonlyArray<NamespacedId>,
  right: ReadonlyArray<NamespacedId>,
): boolean {
  if (left.length !== right.length) return false;
  const rightSet = new Set(right);
  return left.every((value) => rightSet.has(value));
}
