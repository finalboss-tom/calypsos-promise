import { LIVING_CHRONICLE_SCHEMA_VERSION } from "./version.js";
import type {
  ChronicleRecord,
  ChronicleSchemaBundle,
  ChronicleValue,
  DataClassification,
  DeletionTarget,
  NamespacedId,
  RecordRelationship,
  RevisionMetadata,
  TemporalAssertion,
} from "./types.js";

export interface ChronicleValidationIssue {
  code: string;
  path: string;
  message: string;
}

export interface ChronicleValidationResult {
  valid: boolean;
  issues: ReadonlyArray<ChronicleValidationIssue>;
}

export interface ChronicleValidationOptions {
  fixtureDataPolicy?: "any" | "public-or-synthetic";
}

const NAMESPACED_ID_PATTERN =
  /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:\.[a-z][a-z0-9]*(?:-[a-z0-9]+)*)+$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATE_TIME_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const LOCAL_DATE_TIME_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/;
const DECIMAL_TEXT_PATTERN = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/;

const TOMBSTONE_RETAINED_FIELD_ALLOWLIST = new Set([
  "completedAt",
  "deletionState",
  "reasonCode",
  "replacementReferenceId",
]);

function isIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function isIsoDateTime(value: string): boolean {
  return ISO_DATE_TIME_PATTERN.test(value) && !Number.isNaN(Date.parse(value));
}

function isLocalDateTime(value: string): boolean {
  return LOCAL_DATE_TIME_PATTERN.test(value);
}

function compareTemporalText(left: string, right: string): number | undefined {
  const leftValue = Date.parse(left.includes("T") ? left : `${left}T00:00:00Z`);
  const rightValue = Date.parse(right.includes("T") ? right : `${right}T00:00:00Z`);
  if (Number.isNaN(leftValue) || Number.isNaN(rightValue)) return undefined;
  return Math.sign(leftValue - rightValue);
}

function compareDecimalText(left: string, right: string): number | undefined {
  if (!DECIMAL_TEXT_PATTERN.test(left) || !DECIMAL_TEXT_PATTERN.test(right)) {
    return undefined;
  }

  const normalize = (value: string) => {
    const negative = value.startsWith("-");
    const unsigned = negative ? value.slice(1) : value;
    const [integerPart, fractionalPart = ""] = unsigned.split(".");
    const integer = integerPart.replace(/^0+(?=\d)/, "");
    const fraction = fractionalPart.replace(/0+$/, "");
    const zero = integer === "0" && fraction.length === 0;
    return { negative: zero ? false : negative, integer, fraction };
  };

  const leftNormalized = normalize(left);
  const rightNormalized = normalize(right);

  if (leftNormalized.negative !== rightNormalized.negative) {
    return leftNormalized.negative ? -1 : 1;
  }

  const direction = leftNormalized.negative ? -1 : 1;
  if (leftNormalized.integer.length !== rightNormalized.integer.length) {
    return (
      Math.sign(leftNormalized.integer.length - rightNormalized.integer.length) *
      direction
    );
  }

  if (leftNormalized.integer !== rightNormalized.integer) {
    return (leftNormalized.integer < rightNormalized.integer ? -1 : 1) * direction;
  }

  const width = Math.max(
    leftNormalized.fraction.length,
    rightNormalized.fraction.length,
  );
  const leftFraction = leftNormalized.fraction.padEnd(width, "0");
  const rightFraction = rightNormalized.fraction.padEnd(width, "0");
  if (leftFraction === rightFraction) return 0;
  return (leftFraction < rightFraction ? -1 : 1) * direction;
}

function addIssue(
  issues: ChronicleValidationIssue[],
  code: string,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function validateNamespacedId(
  value: string,
  path: string,
  issues: ChronicleValidationIssue[],
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

function validateRevisionMetadata(
  value: RevisionMetadata,
  path: string,
  actorIds: ReadonlySet<string>,
  issues: ChronicleValidationIssue[],
): void {
  if (value.schemaVersion !== LIVING_CHRONICLE_SCHEMA_VERSION) {
    addIssue(
      issues,
      "SCHEMA_VERSION_UNSUPPORTED",
      `${path}.schemaVersion`,
      `Expected schema version ${LIVING_CHRONICLE_SCHEMA_VERSION}.`,
    );
  }
  if (!Number.isSafeInteger(value.revision) || value.revision < 1) {
    addIssue(
      issues,
      "REVISION_INVALID",
      `${path}.revision`,
      "Revision must be a positive safe integer.",
    );
  }
  if (!isIsoDateTime(value.createdAt)) {
    addIssue(
      issues,
      "DATETIME_INVALID",
      `${path}.createdAt`,
      "createdAt must be an offset-qualified ISO date-time.",
    );
  }
  if (!isIsoDateTime(value.updatedAt)) {
    addIssue(
      issues,
      "DATETIME_INVALID",
      `${path}.updatedAt`,
      "updatedAt must be an offset-qualified ISO date-time.",
    );
  }
  for (const [field, actorId] of [
    ["createdBy", value.createdBy],
    ["updatedBy", value.updatedBy],
  ] as const) {
    validateNamespacedId(actorId, `${path}.${field}`, issues);
    if (!actorIds.has(actorId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.${field}`,
        `Actor ${actorId} does not exist in the bundle.`,
      );
    }
  }
}

function validateTemporalAssertion(
  temporal: TemporalAssertion,
  path: string,
  recordIds: ReadonlySet<string>,
  issues: ChronicleValidationIssue[],
): void {
  switch (temporal.kind) {
    case "exact-instant":
      if (!isIsoDateTime(temporal.instant)) {
        addIssue(
          issues,
          "TEMPORAL_EXACT_INVALID",
          `${path}.instant`,
          "Exact instants require an offset-qualified ISO date-time.",
        );
      }
      break;
    case "calendar-date":
      if (!isIsoDate(temporal.date)) {
        addIssue(
          issues,
          "TEMPORAL_DATE_INVALID",
          `${path}.date`,
          "Calendar dates must be valid ISO dates without fabricated time.",
        );
      }
      break;
    case "local-date-time":
      if (!isLocalDateTime(temporal.localDateTime)) {
        addIssue(
          issues,
          "TEMPORAL_LOCAL_INVALID",
          `${path}.localDateTime`,
          "Local date-times must omit an offset and use ISO local syntax.",
        );
      }
      if (
        temporal.resolutionState === "resolved" &&
        temporal.timeZone === undefined &&
        temporal.offset === undefined
      ) {
        addIssue(
          issues,
          "TEMPORAL_RESOLUTION_INCOMPLETE",
          path,
          "A resolved local date-time requires a time zone or offset.",
        );
      }
      break;
    case "interval":
      if (temporal.start === undefined && temporal.end === undefined) {
        addIssue(
          issues,
          "TEMPORAL_INTERVAL_EMPTY",
          path,
          "An interval must have at least one boundary.",
        );
      }
      if (temporal.start !== undefined) {
        validateTemporalAssertion(temporal.start, `${path}.start`, recordIds, issues);
      }
      if (temporal.end !== undefined) {
        validateTemporalAssertion(temporal.end, `${path}.end`, recordIds, issues);
      }
      break;
    case "approximate": {
      if (temporal.sourceText.trim().length === 0) {
        addIssue(
          issues,
          "TEMPORAL_APPROXIMATE_SOURCE_REQUIRED",
          `${path}.sourceText`,
          "Approximate time must preserve the source assertion.",
        );
      }
      if (
        temporal.earliest === undefined &&
        temporal.latest === undefined &&
        temporal.centralEstimate === undefined
      ) {
        addIssue(
          issues,
          "TEMPORAL_APPROXIMATE_BOUNDS_REQUIRED",
          path,
          "Approximate time requires an earliest, latest, or central estimate.",
        );
      }
      for (const [field, value] of [
        ["earliest", temporal.earliest],
        ["latest", temporal.latest],
        ["centralEstimate", temporal.centralEstimate],
      ] as const) {
        if (
          value !== undefined &&
          !isIsoDate(value) &&
          !isIsoDateTime(value)
        ) {
          addIssue(
            issues,
            "TEMPORAL_APPROXIMATE_VALUE_INVALID",
            `${path}.${field}`,
            "Approximate bounds must be valid ISO dates or offset-qualified date-times.",
          );
        }
      }
      if (temporal.earliest !== undefined && temporal.latest !== undefined) {
        const order = compareTemporalText(temporal.earliest, temporal.latest);
        if (order !== undefined && order > 0) {
          addIssue(
            issues,
            "TEMPORAL_ORDER_INVALID",
            path,
            "Approximate earliest time cannot be after latest time.",
          );
        }
      }
      break;
    }
    case "named-period":
      if (temporal.label.trim().length === 0) {
        addIssue(
          issues,
          "TEMPORAL_NAMED_LABEL_REQUIRED",
          `${path}.label`,
          "Named periods require a human-readable label.",
        );
      }
      if (temporal.start !== undefined && temporal.end !== undefined) {
        const order = compareTemporalText(temporal.start, temporal.end);
        if (order !== undefined && order > 0) {
          addIssue(
            issues,
            "TEMPORAL_ORDER_INVALID",
            path,
            "Named-period start cannot be after end.",
          );
        }
      }
      break;
    case "relative":
      if (temporal.expression.trim().length === 0) {
        addIssue(
          issues,
          "TEMPORAL_RELATIVE_EXPRESSION_REQUIRED",
          `${path}.expression`,
          "Relative time requires the original expression.",
        );
      }
      if (
        temporal.anchorRecordId === undefined &&
        temporal.anchorTemporalAssertion === undefined
      ) {
        addIssue(
          issues,
          "TEMPORAL_RELATIVE_ANCHOR_REQUIRED",
          path,
          "Relative time requires a record or temporal anchor.",
        );
      }
      if (
        temporal.anchorRecordId !== undefined &&
        !recordIds.has(temporal.anchorRecordId)
      ) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.anchorRecordId`,
          `Record ${temporal.anchorRecordId} does not exist.`,
        );
      }
      if (temporal.anchorTemporalAssertion !== undefined) {
        validateTemporalAssertion(
          temporal.anchorTemporalAssertion,
          `${path}.anchorTemporalAssertion`,
          recordIds,
          issues,
        );
      }
      if (temporal.resolvedTemporalAssertion !== undefined) {
        validateTemporalAssertion(
          temporal.resolvedTemporalAssertion,
          `${path}.resolvedTemporalAssertion`,
          recordIds,
          issues,
        );
      }
      break;
    case "recurring":
      if (temporal.sourceRule.trim().length === 0) {
        addIssue(
          issues,
          "TEMPORAL_RECURRENCE_RULE_REQUIRED",
          `${path}.sourceRule`,
          "Recurring time must preserve its source rule.",
        );
      }
      if (temporal.start !== undefined) {
        validateTemporalAssertion(temporal.start, `${path}.start`, recordIds, issues);
      }
      if (temporal.end !== undefined) {
        validateTemporalAssertion(temporal.end, `${path}.end`, recordIds, issues);
      }
      break;
  }
}

function validateValue(
  value: ChronicleValue,
  path: string,
  unitIds: ReadonlySet<string>,
  categoryIds: ReadonlySet<string>,
  recordIds: ReadonlySet<string>,
  issues: ChronicleValidationIssue[],
): void {
  switch (value.kind) {
    case "quantity":
      if (!DECIMAL_TEXT_PATTERN.test(value.magnitude)) {
        addIssue(
          issues,
          "DECIMAL_INVALID",
          `${path}.magnitude`,
          "Quantity magnitude must be exact decimal text without exponent notation.",
        );
      }
      if (!unitIds.has(value.unitId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.unitId`,
          `Unit ${value.unitId} does not exist.`,
        );
      }
      break;
    case "integer-count":
      if (!Number.isSafeInteger(value.value)) {
        addIssue(
          issues,
          "INTEGER_COUNT_INVALID",
          `${path}.value`,
          "Integer counts must be safe integers.",
        );
      }
      if (value.countUnitId !== undefined && !unitIds.has(value.countUnitId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.countUnitId`,
          `Unit ${value.countUnitId} does not exist.`,
        );
      }
      break;
    case "decimal":
      if (!DECIMAL_TEXT_PATTERN.test(value.value)) {
        addIssue(
          issues,
          "DECIMAL_INVALID",
          `${path}.value`,
          "Decimal values must use exact decimal text without exponent notation.",
        );
      }
      break;
    case "boolean":
      break;
    case "coded-category":
      if (!categoryIds.has(value.categoryId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.categoryId`,
          `Category ${value.categoryId} does not exist.`,
        );
      }
      break;
    case "ordinal":
      validateNamespacedId(value.scaleId, `${path}.scaleId`, issues);
      validateNamespacedId(value.valueId, `${path}.valueId`, issues);
      if (
        value.displayNumber !== undefined &&
        !DECIMAL_TEXT_PATTERN.test(value.displayNumber)
      ) {
        addIssue(
          issues,
          "DECIMAL_INVALID",
          `${path}.displayNumber`,
          "Ordinal display numbers must use exact decimal text.",
        );
      }
      break;
    case "text":
      if (value.text.trim().length === 0) {
        addIssue(
          issues,
          "TEXT_EMPTY",
          `${path}.text`,
          "Text values cannot be empty.",
        );
      }
      if (value.locale.trim().length === 0) {
        addIssue(
          issues,
          "LOCALE_REQUIRED",
          `${path}.locale`,
          "Text values require a locale.",
        );
      }
      break;
    case "numeric-range":
      if (value.lower === undefined && value.upper === undefined) {
        addIssue(
          issues,
          "RANGE_EMPTY",
          path,
          "A numeric range requires at least one bound.",
        );
      }
      for (const [field, bound] of [
        ["lower", value.lower],
        ["upper", value.upper],
      ] as const) {
        if (bound !== undefined && !DECIMAL_TEXT_PATTERN.test(bound)) {
          addIssue(
            issues,
            "DECIMAL_INVALID",
            `${path}.${field}`,
            "Range bounds must use exact decimal text.",
          );
        }
      }
      if (value.lower !== undefined && value.upper !== undefined) {
        const order = compareDecimalText(value.lower, value.upper);
        if (order !== undefined && order > 0) {
          addIssue(
            issues,
            "RANGE_ORDER_INVALID",
            path,
            "Range lower bound cannot exceed upper bound.",
          );
        }
      }
      if (value.unitId !== undefined && !unitIds.has(value.unitId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.unitId`,
          `Unit ${value.unitId} does not exist.`,
        );
      }
      break;
    case "duration":
      if (!DECIMAL_TEXT_PATTERN.test(value.magnitude)) {
        addIssue(
          issues,
          "DECIMAL_INVALID",
          `${path}.magnitude`,
          "Duration magnitude must use exact decimal text.",
        );
      }
      if (!unitIds.has(value.unitId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.unitId`,
          `Unit ${value.unitId} does not exist.`,
        );
      }
      break;
    case "temporal-value":
      validateTemporalAssertion(
        value.temporalAssertion,
        `${path}.temporalAssertion`,
        recordIds,
        issues,
      );
      break;
    case "absent":
      break;
  }
}

function validateDeletionTarget(
  target: DeletionTarget,
  path: string,
  issues: ChronicleValidationIssue[],
): void {
  if (target.kind === "whole-chronicle") {
    if (target.id !== undefined) {
      addIssue(
        issues,
        "DELETION_TARGET_ID_FORBIDDEN",
        `${path}.id`,
        "Whole-Chronicle deletion is scoped by the request Chronicle and must not carry another target ID.",
      );
    }
    return;
  }

  if (target.id === undefined) {
    addIssue(
      issues,
      "DELETION_TARGET_ID_REQUIRED",
      `${path}.id`,
      `Deletion target kind ${target.kind} requires an ID.`,
    );
    return;
  }
  validateNamespacedId(target.id, `${path}.id`, issues);
}

function validateRelationship(
  relationship: RecordRelationship,
  path: string,
  recordIds: ReadonlySet<string>,
  relationshipById: ReadonlyMap<string, RecordRelationship>,
  actorIds: ReadonlySet<string>,
  issues: ChronicleValidationIssue[],
): void {
  if (relationship.sourceRecordIds.length === 0) {
    addIssue(
      issues,
      "RELATIONSHIP_SOURCE_REQUIRED",
      `${path}.sourceRecordIds`,
      "Record relationships require at least one source record.",
    );
  }
  if (relationship.targetRecordIds.length === 0) {
    addIssue(
      issues,
      "RELATIONSHIP_TARGET_REQUIRED",
      `${path}.targetRecordIds`,
      "Record relationships require at least one target record.",
    );
  }
  for (const [field, recordIdsToCheck] of [
    ["sourceRecordIds", relationship.sourceRecordIds],
    ["targetRecordIds", relationship.targetRecordIds],
  ] as const) {
    recordIdsToCheck.forEach((recordId, index) => {
      if (!recordIds.has(recordId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.${field}[${index}]`,
          `Record ${recordId} does not exist.`,
        );
      }
    });
  }
  if (!actorIds.has(relationship.actorId)) {
    addIssue(
      issues,
      "REFERENCE_DANGLING",
      `${path}.actorId`,
      `Actor ${relationship.actorId} does not exist.`,
    );
  }
  if (relationship.reasonCode.trim().length === 0) {
    addIssue(
      issues,
      "RELATIONSHIP_REASON_REQUIRED",
      `${path}.reasonCode`,
      "Material record relationships require a reason code.",
    );
  }
  if (relationship.reversesRelationshipId !== undefined) {
    const reversed = relationshipById.get(relationship.reversesRelationshipId);
    if (reversed === undefined) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.reversesRelationshipId`,
        `Relationship ${relationship.reversesRelationshipId} does not exist.`,
      );
    }
  }

  const participating = new Set([
    ...relationship.sourceRecordIds,
    ...relationship.targetRecordIds,
  ]);
  if (
    (relationship.relationshipType === "conflict" ||
      relationship.relationshipType === "duplicate-candidate" ||
      relationship.relationshipType === "confirmed-duplicate") &&
    participating.size < 2
  ) {
    addIssue(
      issues,
      "RELATIONSHIP_PARTICIPANTS_INSUFFICIENT",
      path,
      `${relationship.relationshipType} requires at least two distinct records.`,
    );
  }

  if (relationship.relationshipType === "unmerge") {
    const reversedMerge = relationshipById.get(
      relationship.reversedMergeRelationshipId,
    );
    if (reversedMerge?.relationshipType !== "merge") {
      addIssue(
        issues,
        "UNMERGE_TARGET_INVALID",
        `${path}.reversedMergeRelationshipId`,
        "Unmerge must reference an existing merge relationship.",
      );
    }
  }
}

export function validateChronicleSchemaBundle(
  bundle: ChronicleSchemaBundle,
  options: ChronicleValidationOptions = {},
): ChronicleValidationResult {
  const issues: ChronicleValidationIssue[] = [];

  if (bundle.schemaVersion !== LIVING_CHRONICLE_SCHEMA_VERSION) {
    addIssue(
      issues,
      "SCHEMA_VERSION_UNSUPPORTED",
      "schemaVersion",
      `Expected schema version ${LIVING_CHRONICLE_SCHEMA_VERSION}.`,
    );
  }

  const actorIds = new Set(bundle.actors.map((actor) => actor.id));
  const subjectIds = new Set(bundle.subjects.map((subject) => subject.id));
  const chronicleIds = new Set(bundle.chronicles.map((chronicle) => chronicle.id));
  const variableIds = new Set(bundle.variables.map((variable) => variable.id));
  const categorySetIds = new Set(
    bundle.categorySets.map((categorySet) => categorySet.id),
  );
  const categoryIds = new Set(
    bundle.categorySets.flatMap((categorySet) =>
      categorySet.categories.map((category) => category.id),
    ),
  );
  const unitDimensionIds = new Set(
    bundle.unitDimensions.map((dimension) => dimension.id),
  );
  const unitIds = new Set(bundle.units.map((unit) => unit.id));
  const recordIds = new Set(bundle.records.map((record) => record.id));
  const sourceArtifactIds = new Set(
    bundle.sourceArtifacts.map((artifact) => artifact.id),
  );
  const sourceVersionIds = new Set(
    bundle.sourceVersions.map((version) => version.id),
  );
  const sourceLocatorIds = new Set(
    bundle.sourceLocators.map((locator) => locator.id),
  );
  const provenanceEventIds = new Set(
    bundle.provenanceEvents.map((event) => event.id),
  );
  const confirmationEventIds = new Set(
    bundle.confirmationEvents.map((event) => event.id),
  );
  const relationshipIds = new Set(
    bundle.relationships.map((relationship) => relationship.id),
  );
  const custodyReferenceIds = new Set(
    bundle.custodyReferences.map((reference) => reference.id),
  );
  const externalReferenceIds = new Set(
    bundle.externalReferences.map((reference) => reference.id),
  );
  const exportRequestIds = new Set(
    bundle.exportRequests.map((request) => request.id),
  );
  const exportPlanIds = new Set(bundle.exportPlans.map((plan) => plan.id));
  const exportManifestIds = new Set(
    bundle.exportManifests.map((manifest) => manifest.id),
  );
  const exportArtifactIds = new Set(
    bundle.exportArtifacts.map((artifact) => artifact.id),
  );
  const deletionRequestIds = new Set(
    bundle.deletionRequests.map((request) => request.id),
  );
  const retentionExceptionIds = new Set(
    bundle.retentionExceptions.map((exception) => exception.id),
  );
  const tombstoneIds = new Set(bundle.tombstones.map((tombstone) => tombstone.id));

  const globalIds = new Map<string, string>();
  const register = (id: string, path: string) => {
    validateNamespacedId(id, path, issues);
    const existing = globalIds.get(id);
    if (existing !== undefined) {
      addIssue(
        issues,
        "ID_DUPLICATE",
        path,
        `Identifier ${id} is already used at ${existing}.`,
      );
    } else {
      globalIds.set(id, path);
    }
  };

  bundle.chronicles.forEach((chronicle, index) => {
    const path = `chronicles[${index}]`;
    register(chronicle.id, `${path}.id`);
    if (!actorIds.has(chronicle.controllingPersonActorId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.controllingPersonActorId`,
        `Actor ${chronicle.controllingPersonActorId} does not exist.`,
      );
    }
  });
  bundle.subjects.forEach((subject, index) =>
    register(subject.id, `subjects[${index}].id`),
  );
  bundle.actors.forEach((actor, index) =>
    register(actor.id, `actors[${index}].id`),
  );

  const revisionedCollections: ReadonlyArray<
    readonly [string, ReadonlyArray<RevisionMetadata & { id: NamespacedId }>]
  > = [
    ["variables", bundle.variables],
    ["categorySets", bundle.categorySets],
    ["unitDimensions", bundle.unitDimensions],
    ["units", bundle.units],
    ["records", bundle.records],
    ["sourceArtifacts", bundle.sourceArtifacts],
    ["sourceVersions", bundle.sourceVersions],
    ["sourceLocators", bundle.sourceLocators],
    ["provenanceEvents", bundle.provenanceEvents],
    ["confirmationEvents", bundle.confirmationEvents],
    ["externalReferences", bundle.externalReferences],
    ["relationships", bundle.relationships],
    ["attachments", bundle.attachments],
    ["custodyReferences", bundle.custodyReferences],
    ["storedRepresentations", bundle.storedRepresentations],
    ["derivedRepresentations", bundle.derivedRepresentations],
    ["exportRequests", bundle.exportRequests],
    ["exportPlans", bundle.exportPlans],
    ["exportManifests", bundle.exportManifests],
    ["exportArtifacts", bundle.exportArtifacts],
    ["exportDeliveries", bundle.exportDeliveries],
    ["deletionRequests", bundle.deletionRequests],
    ["deletionScopeResolutions", bundle.deletionScopeResolutions],
    ["retentionExceptions", bundle.retentionExceptions],
    ["tombstones", bundle.tombstones],
    ["deletionCompletionEvidence", bundle.deletionCompletionEvidence],
  ];

  revisionedCollections.forEach(([collectionName, collection]) => {
    collection.forEach((entity, index) => {
      const path = `${collectionName}[${index}]`;
      register(entity.id, `${path}.id`);
      validateRevisionMetadata(entity, path, actorIds, issues);
    });
  });

  bundle.categorySets.forEach((categorySet, setIndex) => {
    const localCategoryIds = new Set(categorySet.categories.map((category) => category.id));
    categorySet.categories.forEach((category, categoryIndex) => {
      const path = `categorySets[${setIndex}].categories[${categoryIndex}]`;
      register(category.id, `${path}.id`);
      if (
        category.parentCategoryId !== undefined &&
        !localCategoryIds.has(category.parentCategoryId)
      ) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.parentCategoryId`,
          `Parent category ${category.parentCategoryId} is not in this category set.`,
        );
      }
    });
  });

  bundle.variables.forEach((variable, index) => {
    const path = `variables[${index}]`;
    if (
      variable.unitDimensionId !== undefined &&
      !unitDimensionIds.has(variable.unitDimensionId)
    ) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.unitDimensionId`,
        `Unit dimension ${variable.unitDimensionId} does not exist.`,
      );
    }
    variable.allowedUnitIds?.forEach((unitId, unitIndex) => {
      const unit = bundle.units.find((candidate) => candidate.id === unitId);
      if (unit === undefined) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.allowedUnitIds[${unitIndex}]`,
          `Unit ${unitId} does not exist.`,
        );
      } else if (
        variable.unitDimensionId !== undefined &&
        unit.dimensionId !== variable.unitDimensionId
      ) {
        addIssue(
          issues,
          "UNIT_DIMENSION_MISMATCH",
          `${path}.allowedUnitIds[${unitIndex}]`,
          `Unit ${unitId} is not in dimension ${variable.unitDimensionId}.`,
        );
      }
    });
    if (
      variable.categorySetId !== undefined &&
      !categorySetIds.has(variable.categorySetId)
    ) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.categorySetId`,
        `Category set ${variable.categorySetId} does not exist.`,
      );
    }
  });

  bundle.units.forEach((unit, index) => {
    const path = `units[${index}]`;
    if (!unitDimensionIds.has(unit.dimensionId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.dimensionId`,
        `Unit dimension ${unit.dimensionId} does not exist.`,
      );
    }
    if (unit.canonicalUnitId !== undefined) {
      const canonical = bundle.units.find(
        (candidate) => candidate.id === unit.canonicalUnitId,
      );
      if (canonical === undefined) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.canonicalUnitId`,
          `Canonical unit ${unit.canonicalUnitId} does not exist.`,
        );
      } else if (canonical.dimensionId !== unit.dimensionId) {
        addIssue(
          issues,
          "UNIT_DIMENSION_MISMATCH",
          `${path}.canonicalUnitId`,
          "Canonical and source units must share a dimension.",
        );
      }
    }
  });

  const sourceVersionById = new Map(
    bundle.sourceVersions.map((version) => [version.id, version]),
  );
  const sourceLocatorById = new Map(
    bundle.sourceLocators.map((locator) => [locator.id, locator]),
  );
  const confirmationById = new Map(
    bundle.confirmationEvents.map((event) => [event.id, event]),
  );
  const relationshipById = new Map(
    bundle.relationships.map((relationship) => [relationship.id, relationship]),
  );

  bundle.records.forEach((record, index) => {
    const path = `records[${index}]`;
    if (!chronicleIds.has(record.chronicleId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.chronicleId`,
        `Chronicle ${record.chronicleId} does not exist.`,
      );
    }
    if (!subjectIds.has(record.subjectId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.subjectId`,
        `Subject ${record.subjectId} does not exist.`,
      );
    }
    validateTemporalAssertion(record.temporalAssertion, `${path}.temporalAssertion`, recordIds, issues);

    const expectedAssertionClass: Partial<Record<ChronicleRecord["family"], ChronicleRecord["assertionClass"]>> = {
      reflection: "reflection",
      goal: "intention",
      derived: "deterministic-calculation",
      association: "descriptive-association",
      inference: "inference",
    };
    const expected = expectedAssertionClass[record.family];
    if (expected !== undefined && record.assertionClass !== expected) {
      addIssue(
        issues,
        "ASSERTION_CLASS_MISMATCH",
        `${path}.assertionClass`,
        `Record family ${record.family} requires assertion class ${expected}.`,
      );
    }
    if (record.family === "interval" && record.temporalAssertion.kind !== "interval") {
      addIssue(
        issues,
        "INTERVAL_TEMPORAL_REQUIRED",
        `${path}.temporalAssertion`,
        "Interval records require an interval temporal assertion.",
      );
    }

    record.sourceReferences.forEach((reference, referenceIndex) => {
      const referencePath = `${path}.sourceReferences[${referenceIndex}]`;
      if (!sourceArtifactIds.has(reference.sourceArtifactId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${referencePath}.sourceArtifactId`,
          `Source artifact ${reference.sourceArtifactId} does not exist.`,
        );
      }
      const version = sourceVersionById.get(reference.sourceVersionId);
      if (version === undefined) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${referencePath}.sourceVersionId`,
          `Source version ${reference.sourceVersionId} does not exist.`,
        );
      } else if (version.sourceArtifactId !== reference.sourceArtifactId) {
        addIssue(
          issues,
          "SOURCE_VERSION_ARTIFACT_MISMATCH",
          referencePath,
          "Source version does not belong to the referenced source artifact.",
        );
      }
      reference.sourceLocatorIds?.forEach((locatorId, locatorIndex) => {
        const locator = sourceLocatorById.get(locatorId);
        if (locator === undefined) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${referencePath}.sourceLocatorIds[${locatorIndex}]`,
            `Source locator ${locatorId} does not exist.`,
          );
        } else if (locator.sourceVersionId !== reference.sourceVersionId) {
          addIssue(
            issues,
            "SOURCE_LOCATOR_VERSION_MISMATCH",
            `${referencePath}.sourceLocatorIds[${locatorIndex}]`,
            "Source locator addresses a different source version.",
          );
        }
      });
    });

    record.provenanceEventIds.forEach((eventId, eventIndex) => {
      if (!provenanceEventIds.has(eventId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.provenanceEventIds[${eventIndex}]`,
          `Provenance event ${eventId} does not exist.`,
        );
      }
    });
    record.relationshipIds.forEach((relationshipId, relationshipIndex) => {
      if (!relationshipIds.has(relationshipId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.relationshipIds[${relationshipIndex}]`,
          `Relationship ${relationshipId} does not exist.`,
        );
      }
    });
    for (const [field, actorId] of [
      ["recorderActorId", record.recorderActorId],
      ["confirmerActorId", record.confirmerActorId],
    ] as const) {
      if (actorId !== undefined && !actorIds.has(actorId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.${field}`,
          `Actor ${actorId} does not exist.`,
        );
      }
    }
    record.authorActorIds?.forEach((actorId, actorIndex) => {
      if (!actorIds.has(actorId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.authorActorIds[${actorIndex}]`,
          `Actor ${actorId} does not exist.`,
        );
      }
    });

    if (record.authorityState === "confirmed") {
      if (
        record.confirmationEventId === undefined ||
        record.confirmerActorId === undefined
      ) {
        addIssue(
          issues,
          "CONFIRMATION_REQUIRED",
          path,
          "Confirmed records require a confirmer and confirmation event.",
        );
      } else {
        const confirmation = confirmationById.get(record.confirmationEventId);
        if (confirmation === undefined) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.confirmationEventId`,
            `Confirmation event ${record.confirmationEventId} does not exist.`,
          );
        } else {
          if (
            confirmation.recordId !== record.id ||
            confirmation.recordRevision !== record.revision ||
            confirmation.confirmerActorId !== record.confirmerActorId
          ) {
            addIssue(
              issues,
              "CONFIRMATION_MISMATCH",
              `${path}.confirmationEventId`,
              "Confirmation event does not match the record identity, revision, and confirmer.",
            );
          }
          if (
            confirmation.decision !== "accepted" &&
            confirmation.decision !== "corrected-and-accepted"
          ) {
            addIssue(
              issues,
              "CONFIRMATION_DECISION_INVALID",
              `${path}.confirmationEventId`,
              "Confirmed records require an accepting confirmation decision.",
            );
          }
        }
      }
    }

    switch (record.family) {
      case "observation":
      case "interval":
        if (!variableIds.has(record.payload.variableId)) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.payload.variableId`,
            `Variable ${record.payload.variableId} does not exist.`,
          );
        }
        validateValue(
          record.payload.value,
          `${path}.payload.value`,
          unitIds,
          categoryIds,
          recordIds,
          issues,
        );
        break;
      case "reflection":
        validateValue(
          record.payload.text,
          `${path}.payload.text`,
          unitIds,
          categoryIds,
          recordIds,
          issues,
        );
        break;
      case "goal":
        validateValue(
          record.payload.description,
          `${path}.payload.description`,
          unitIds,
          categoryIds,
          recordIds,
          issues,
        );
        if (record.payload.targetVariableId !== undefined && !variableIds.has(record.payload.targetVariableId)) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.payload.targetVariableId`,
            `Variable ${record.payload.targetVariableId} does not exist.`,
          );
        }
        if (record.payload.targetValue !== undefined) {
          validateValue(
            record.payload.targetValue,
            `${path}.payload.targetValue`,
            unitIds,
            categoryIds,
            recordIds,
            issues,
          );
        }
        break;
      case "derived":
        validateValue(
          record.payload.value,
          `${path}.payload.value`,
          unitIds,
          categoryIds,
          recordIds,
          issues,
        );
        if (record.payload.inputRecordIds.length === 0) {
          addIssue(
            issues,
            "DERIVATION_INPUT_REQUIRED",
            `${path}.payload.inputRecordIds`,
            "Derived records require at least one input record.",
          );
        }
        record.payload.inputRecordIds.forEach((inputId, inputIndex) => {
          if (!recordIds.has(inputId)) {
            addIssue(
              issues,
              "REFERENCE_DANGLING",
              `${path}.payload.inputRecordIds[${inputIndex}]`,
              `Input record ${inputId} does not exist.`,
            );
          }
          if (inputId === record.id) {
            addIssue(
              issues,
              "DERIVATION_SELF_REFERENCE",
              `${path}.payload.inputRecordIds[${inputIndex}]`,
              "A derived record cannot derive from itself.",
            );
          }
        });
        break;
      case "association":
        if (record.payload.inputRecordIds.length === 0) {
          addIssue(
            issues,
            "ASSOCIATION_INPUT_REQUIRED",
            `${path}.payload.inputRecordIds`,
            "Associations require identified input records.",
          );
        }
        record.payload.inputRecordIds.forEach((inputId, inputIndex) => {
          if (!recordIds.has(inputId)) {
            addIssue(
              issues,
              "REFERENCE_DANGLING",
              `${path}.payload.inputRecordIds[${inputIndex}]`,
              `Input record ${inputId} does not exist.`,
            );
          }
        });
        validateTemporalAssertion(
          record.payload.analysisPeriod,
          `${path}.payload.analysisPeriod`,
          recordIds,
          issues,
        );
        break;
      case "inference":
        if (record.payload.evidenceRecordIds.length === 0) {
          addIssue(
            issues,
            "INFERENCE_EVIDENCE_REQUIRED",
            `${path}.payload.evidenceRecordIds`,
            "Inference records require evidence records.",
          );
        }
        record.payload.evidenceRecordIds.forEach((evidenceId, evidenceIndex) => {
          if (!recordIds.has(evidenceId)) {
            addIssue(
              issues,
              "REFERENCE_DANGLING",
              `${path}.payload.evidenceRecordIds[${evidenceIndex}]`,
              `Evidence record ${evidenceId} does not exist.`,
            );
          }
        });
        validateValue(
          record.payload.conclusion,
          `${path}.payload.conclusion`,
          unitIds,
          categoryIds,
          recordIds,
          issues,
        );
        break;
    }
  });

  bundle.sourceArtifacts.forEach((artifact, index) => {
    const path = `sourceArtifacts[${index}]`;
    if (!chronicleIds.has(artifact.chronicleId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.chronicleId`,
        `Chronicle ${artifact.chronicleId} does not exist.`,
      );
    }
    if (
      options.fixtureDataPolicy === "public-or-synthetic" &&
      artifact.dataClassification === ("private" satisfies DataClassification)
    ) {
      addIssue(
        issues,
        "FIXTURE_PRIVATE_DATA_FORBIDDEN",
        `${path}.dataClassification`,
        "Contributor fixtures may contain only public or synthetic data.",
      );
    }
  });

  bundle.sourceVersions.forEach((version, index) => {
    const path = `sourceVersions[${index}]`;
    if (!sourceArtifactIds.has(version.sourceArtifactId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.sourceArtifactId`,
        `Source artifact ${version.sourceArtifactId} does not exist.`,
      );
    }
    version.custodyReferenceIds.forEach((referenceId, referenceIndex) => {
      if (!custodyReferenceIds.has(referenceId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.custodyReferenceIds[${referenceIndex}]`,
          `Custody reference ${referenceId} does not exist.`,
        );
      }
    });
  });

  bundle.sourceLocators.forEach((locator, index) => {
    if (!sourceVersionIds.has(locator.sourceVersionId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `sourceLocators[${index}].sourceVersionId`,
        `Source version ${locator.sourceVersionId} does not exist.`,
      );
    }
  });

  bundle.provenanceEvents.forEach((event, index) => {
    const path = `provenanceEvents[${index}]`;
    switch (event.kind) {
      case "capture":
        if (!sourceVersionIds.has(event.sourceVersionId)) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.sourceVersionId`,
            `Source version ${event.sourceVersionId} does not exist.`,
          );
        }
        if (!actorIds.has(event.actorId)) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.actorId`,
            `Actor ${event.actorId} does not exist.`,
          );
        }
        break;
      case "import":
        if (!sourceArtifactIds.has(event.sourceArtifactId)) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.sourceArtifactId`,
            `Source artifact ${event.sourceArtifactId} does not exist.`,
          );
        }
        if (!sourceVersionIds.has(event.sourceVersionId)) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.sourceVersionId`,
            `Source version ${event.sourceVersionId} does not exist.`,
          );
        }
        if (!actorIds.has(event.importerActorId)) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.importerActorId`,
            `Actor ${event.importerActorId} does not exist.`,
          );
        }
        if (
          event.externalReferenceId !== undefined &&
          !externalReferenceIds.has(event.externalReferenceId)
        ) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.externalReferenceId`,
            `External reference ${event.externalReferenceId} does not exist.`,
          );
        }
        break;
      case "transformation":
        if (
          event.inputSourceVersionIds.length === 0 &&
          (event.inputRecordIds?.length ?? 0) === 0
        ) {
          addIssue(
            issues,
            "TRANSFORMATION_INPUT_REQUIRED",
            path,
            "Transformations require at least one source version or record input.",
          );
        }
        event.inputSourceVersionIds.forEach((id, inputIndex) => {
          if (!sourceVersionIds.has(id)) {
            addIssue(
              issues,
              "REFERENCE_DANGLING",
              `${path}.inputSourceVersionIds[${inputIndex}]`,
              `Source version ${id} does not exist.`,
            );
          }
        });
        event.inputSourceLocatorIds?.forEach((id, inputIndex) => {
          if (!sourceLocatorIds.has(id)) {
            addIssue(
              issues,
              "REFERENCE_DANGLING",
              `${path}.inputSourceLocatorIds[${inputIndex}]`,
              `Source locator ${id} does not exist.`,
            );
          }
        });
        event.inputRecordIds?.forEach((id, inputIndex) => {
          if (!recordIds.has(id)) {
            addIssue(
              issues,
              "REFERENCE_DANGLING",
              `${path}.inputRecordIds[${inputIndex}]`,
              `Record ${id} does not exist.`,
            );
          }
        });
        if (!actorIds.has(event.actorId)) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.actorId`,
            `Actor ${event.actorId} does not exist.`,
          );
        }
        break;
      case "derivation":
        if (event.inputRecordIds.length === 0 || event.outputRecordIds.length === 0) {
          addIssue(
            issues,
            "DERIVATION_CHAIN_INCOMPLETE",
            path,
            "Derivation events require input and output records.",
          );
        }
        [...event.inputRecordIds, ...event.outputRecordIds].forEach((id, idIndex) => {
          if (!recordIds.has(id)) {
            addIssue(
              issues,
              "REFERENCE_DANGLING",
              `${path}.recordReferences[${idIndex}]`,
              `Record ${id} does not exist.`,
            );
          }
        });
        if (!actorIds.has(event.actorId)) {
          addIssue(
            issues,
            "REFERENCE_DANGLING",
            `${path}.actorId`,
            `Actor ${event.actorId} does not exist.`,
          );
        }
        break;
    }
  });

  bundle.confirmationEvents.forEach((event, index) => {
    const path = `confirmationEvents[${index}]`;
    if (!recordIds.has(event.recordId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.recordId`,
        `Record ${event.recordId} does not exist.`,
      );
    }
    if (!actorIds.has(event.confirmerActorId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.confirmerActorId`,
        `Actor ${event.confirmerActorId} does not exist.`,
      );
    }
  });

  bundle.relationships.forEach((relationship, index) =>
    validateRelationship(
      relationship,
      `relationships[${index}]`,
      recordIds,
      relationshipById,
      actorIds,
      issues,
    ),
  );

  bundle.attachments.forEach((attachment, index) => {
    const path = `attachments[${index}]`;
    if (!sourceArtifactIds.has(attachment.sourceArtifactId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.sourceArtifactId`,
        `Source artifact ${attachment.sourceArtifactId} does not exist.`,
      );
    }
    if (attachment.sourceVersionId !== undefined) {
      const version = sourceVersionById.get(attachment.sourceVersionId);
      if (version === undefined) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.sourceVersionId`,
          `Source version ${attachment.sourceVersionId} does not exist.`,
        );
      } else if (version.sourceArtifactId !== attachment.sourceArtifactId) {
        addIssue(
          issues,
          "SOURCE_VERSION_ARTIFACT_MISMATCH",
          path,
          "Attached source version does not belong to the attached artifact.",
        );
      }
    }
    if (!globalIds.has(attachment.targetId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.targetId`,
        `Attachment target ${attachment.targetId} does not exist.`,
      );
    }
  });

  bundle.storedRepresentations.forEach((representation, index) => {
    const path = `storedRepresentations[${index}]`;
    if (!sourceVersionIds.has(representation.sourceVersionId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.sourceVersionId`,
        `Source version ${representation.sourceVersionId} does not exist.`,
      );
    }
    if (!custodyReferenceIds.has(representation.custodyReferenceId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.custodyReferenceId`,
        `Custody reference ${representation.custodyReferenceId} does not exist.`,
      );
    }
  });

  bundle.derivedRepresentations.forEach((representation, index) => {
    const path = `derivedRepresentations[${index}]`;
    if (representation.sourceVersionIds.length === 0) {
      addIssue(
        issues,
        "DERIVED_REPRESENTATION_SOURCE_REQUIRED",
        `${path}.sourceVersionIds`,
        "Derived representations require at least one source version.",
      );
    }
    representation.sourceVersionIds.forEach((versionId, versionIndex) => {
      if (!sourceVersionIds.has(versionId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.sourceVersionIds[${versionIndex}]`,
          `Source version ${versionId} does not exist.`,
        );
      }
    });
    representation.sourceLocatorIds?.forEach((locatorId, locatorIndex) => {
      if (!sourceLocatorIds.has(locatorId)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.sourceLocatorIds[${locatorIndex}]`,
          `Source locator ${locatorId} does not exist.`,
        );
      }
    });
    if (!actorIds.has(representation.actorId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.actorId`,
        `Actor ${representation.actorId} does not exist.`,
      );
    }
    if (
      representation.custodyReferenceId !== undefined &&
      !custodyReferenceIds.has(representation.custodyReferenceId)
    ) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.custodyReferenceId`,
        `Custody reference ${representation.custodyReferenceId} does not exist.`,
      );
    }
  });

  bundle.exportRequests.forEach((request, index) => {
    const path = `exportRequests[${index}]`;
    if (!chronicleIds.has(request.chronicleId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.chronicleId`,
        `Chronicle ${request.chronicleId} does not exist.`,
      );
    }
    if (!actorIds.has(request.requestedBy)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.requestedBy`,
        `Actor ${request.requestedBy} does not exist.`,
      );
    }
    if (request.formats.length === 0 || request.scope.length === 0) {
      addIssue(
        issues,
        "EXPORT_SCOPE_REQUIRED",
        path,
        "Export requests require at least one format and scope item.",
      );
    }
    if (!request.includeHumanReadable && !request.includeMachineReadable) {
      addIssue(
        issues,
        "EXPORT_REPRESENTATION_REQUIRED",
        path,
        "Export requests require a human-readable or machine-readable representation.",
      );
    }
  });

  bundle.exportPlans.forEach((plan, index) => {
    const path = `exportPlans[${index}]`;
    if (!exportRequestIds.has(plan.exportRequestId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.exportRequestId`,
        `Export request ${plan.exportRequestId} does not exist.`,
      );
    }
    plan.includedIds.forEach((id, includedIndex) => {
      if (!globalIds.has(id)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.includedIds[${includedIndex}]`,
          `Included ID ${id} does not exist.`,
        );
      }
    });
  });

  bundle.exportManifests.forEach((manifest, index) => {
    if (!exportPlanIds.has(manifest.exportPlanId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `exportManifests[${index}].exportPlanId`,
        `Export plan ${manifest.exportPlanId} does not exist.`,
      );
    }
  });

  bundle.exportArtifacts.forEach((artifact, index) => {
    const path = `exportArtifacts[${index}]`;
    if (!exportRequestIds.has(artifact.exportRequestId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.exportRequestId`,
        `Export request ${artifact.exportRequestId} does not exist.`,
      );
    }
    if (!exportPlanIds.has(artifact.exportPlanId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.exportPlanId`,
        `Export plan ${artifact.exportPlanId} does not exist.`,
      );
    }
    if (!exportManifestIds.has(artifact.exportManifestId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.exportManifestId`,
        `Export manifest ${artifact.exportManifestId} does not exist.`,
      );
    }
    if (
      artifact.custodyReferenceId !== undefined &&
      !custodyReferenceIds.has(artifact.custodyReferenceId)
    ) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.custodyReferenceId`,
        `Custody reference ${artifact.custodyReferenceId} does not exist.`,
      );
    }
  });

  bundle.exportDeliveries.forEach((delivery, index) => {
    const path = `exportDeliveries[${index}]`;
    if (!exportArtifactIds.has(delivery.exportArtifactId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.exportArtifactId`,
        `Export artifact ${delivery.exportArtifactId} does not exist.`,
      );
    }
    if (!actorIds.has(delivery.deliveredToActorId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.deliveredToActorId`,
        `Actor ${delivery.deliveredToActorId} does not exist.`,
      );
    }
  });

  bundle.deletionRequests.forEach((request, index) => {
    const path = `deletionRequests[${index}]`;
    if (!chronicleIds.has(request.chronicleId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.chronicleId`,
        `Chronicle ${request.chronicleId} does not exist.`,
      );
    }
    if (!actorIds.has(request.requestedBy)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.requestedBy`,
        `Actor ${request.requestedBy} does not exist.`,
      );
    }
    if (request.targets.length === 0) {
      addIssue(
        issues,
        "DELETION_TARGET_REQUIRED",
        `${path}.targets`,
        "Deletion requests require at least one target.",
      );
    }
    request.targets.forEach((target, targetIndex) =>
      validateDeletionTarget(target, `${path}.targets[${targetIndex}]`, issues),
    );
  });

  bundle.deletionScopeResolutions.forEach((resolution, index) => {
    const path = `deletionScopeResolutions[${index}]`;
    if (!deletionRequestIds.has(resolution.deletionRequestId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.deletionRequestId`,
        `Deletion request ${resolution.deletionRequestId} does not exist.`,
      );
    }
    resolution.resolvedTargets.forEach((target, targetIndex) =>
      validateDeletionTarget(
        target,
        `${path}.resolvedTargets[${targetIndex}]`,
        issues,
      ),
    );
  });

  bundle.retentionExceptions.forEach((exception, index) => {
    const path = `retentionExceptions[${index}]`;
    if (!deletionRequestIds.has(exception.deletionRequestId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.deletionRequestId`,
        `Deletion request ${exception.deletionRequestId} does not exist.`,
      );
    }
    validateDeletionTarget(exception.target, `${path}.target`, issues);
    if (!actorIds.has(exception.accountableActorId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.accountableActorId`,
        `Actor ${exception.accountableActorId} does not exist.`,
      );
    }
    if (compareTemporalText(exception.startsAt, exception.reviewAt) >= 0) {
      addIssue(
        issues,
        "RETENTION_REVIEW_INVALID",
        `${path}.reviewAt`,
        "Retention review must occur after the exception starts.",
      );
    }
    if (
      exception.endsAt !== undefined &&
      compareTemporalText(exception.startsAt, exception.endsAt) >= 0
    ) {
      addIssue(
        issues,
        "RETENTION_END_INVALID",
        `${path}.endsAt`,
        "Retention end must occur after the exception starts.",
      );
    }
    if (exception.minimumRetainedFields.length === 0) {
      addIssue(
        issues,
        "RETENTION_FIELDS_REQUIRED",
        `${path}.minimumRetainedFields`,
        "Retention exceptions must name the minimum retained fields.",
      );
    }
  });

  bundle.tombstones.forEach((tombstone, index) => {
    const path = `tombstones[${index}]`;
    if (!deletionRequestIds.has(tombstone.deletionRequestId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.deletionRequestId`,
        `Deletion request ${tombstone.deletionRequestId} does not exist.`,
      );
    }
    validateNamespacedId(tombstone.deletedTargetId, `${path}.deletedTargetId`, issues);
    Object.keys(tombstone.retainedFields).forEach((field) => {
      if (!TOMBSTONE_RETAINED_FIELD_ALLOWLIST.has(field)) {
        addIssue(
          issues,
          "TOMBSTONE_FIELD_FORBIDDEN",
          `${path}.retainedFields.${field}`,
          `Tombstones may not retain field ${field}.`,
        );
      }
    });
  });

  bundle.deletionCompletionEvidence.forEach((evidence, index) => {
    const path = `deletionCompletionEvidence[${index}]`;
    if (!deletionRequestIds.has(evidence.deletionRequestId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.deletionRequestId`,
        `Deletion request ${evidence.deletionRequestId} does not exist.`,
      );
    }
    if (!actorIds.has(evidence.accountableActorId)) {
      addIssue(
        issues,
        "REFERENCE_DANGLING",
        `${path}.accountableActorId`,
        `Actor ${evidence.accountableActorId} does not exist.`,
      );
    }
    evidence.completedTargets.forEach((target, targetIndex) =>
      validateDeletionTarget(
        target,
        `${path}.completedTargets[${targetIndex}]`,
        issues,
      ),
    );
    evidence.retainedUnderExceptionIds.forEach((id, exceptionIndex) => {
      if (!retentionExceptionIds.has(id)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.retainedUnderExceptionIds[${exceptionIndex}]`,
          `Retention exception ${id} does not exist.`,
        );
      }
    });
    evidence.tombstoneIds.forEach((id, tombstoneIndex) => {
      if (!tombstoneIds.has(id)) {
        addIssue(
          issues,
          "REFERENCE_DANGLING",
          `${path}.tombstoneIds[${tombstoneIndex}]`,
          `Tombstone ${id} does not exist.`,
        );
      }
    });
  });

  issues.sort((left, right) =>
    `${left.path}:${left.code}`.localeCompare(`${right.path}:${right.code}`),
  );
  return { valid: issues.length === 0, issues };
}
