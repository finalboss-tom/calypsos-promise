export const VERSION = "0.1.0";
export const NOW = "2026-07-24T12:00:00Z";

export const PERSON = "actor.person.synthetic";
export const CONNECTOR = "actor.connector.synthetic";
export const SERVICE = "actor.service.synthetic";
export const OPERATOR = "actor.operator.synthetic";
export const SOURCE_ACTOR = "actor.source.synthetic-clinic";
export const CHRONICLE = "chronicle.person.synthetic";
export const SUBJECT = "subject.person.synthetic";

export const DIMENSION_STEP_COUNT = "dimension.count.step";
export const DIMENSION_MASS = "dimension.mass";
export const UNIT_STEP = "unit.count.step";
export const UNIT_POUND = "unit.mass.pound";
export const UNIT_KILOGRAM = "unit.mass.kilogram";
export const CATEGORY_SET_SLEEP = "category-set.sleep-state";
export const CATEGORY_ASLEEP = "category.sleep-state.asleep";

export const VARIABLE_STEPS = "variable.activity.step-count";
export const VARIABLE_WEIGHT = "variable.body.weight";
export const VARIABLE_SLEEP = "variable.sleep.state";
export const VARIABLE_DOSE_TEXT = "variable.medication.dose-text";

export function revision(
  value,
  {
    actor = PERSON,
    revisionNumber = 1,
    createdAt = NOW,
    updatedAt = createdAt,
  } = {},
) {
  return {
    schemaVersion: VERSION,
    revision: revisionNumber,
    createdAt,
    createdBy: actor,
    updatedAt,
    updatedBy: actor,
    ...value,
  };
}

export function sourceReference(
  sourceArtifactId,
  sourceVersionId,
  ...locatorIds
) {
  return {
    sourceArtifactId,
    sourceVersionId,
    sourceLocatorIds: locatorIds,
  };
}

export function confirmedRecord({
  id,
  family,
  assertionClass,
  temporalAssertion,
  payload,
  sourceReferences,
  provenanceEventIds,
  confirmationEventId,
  relationshipIds = [],
  lifecycleState = "active",
}) {
  return revision({
    id,
    chronicleId: CHRONICLE,
    subjectId: SUBJECT,
    family,
    assertionClass,
    authorityState: "confirmed",
    lifecycleState,
    temporalAssertion,
    payload,
    sourceReferences,
    provenanceEventIds,
    authorActorIds: [PERSON],
    recorderActorId: PERSON,
    confirmerActorId: PERSON,
    confirmationEventId,
    relationshipIds,
  });
}

export function proposedRecord({
  id,
  family,
  assertionClass,
  temporalAssertion,
  payload,
  sourceReferences,
  provenanceEventIds,
  relationshipIds = [],
  lifecycleState = "active",
  actor = CONNECTOR,
}) {
  return revision(
    {
      id,
      chronicleId: CHRONICLE,
      subjectId: SUBJECT,
      family,
      assertionClass,
      authorityState: "proposed",
      lifecycleState,
      temporalAssertion,
      payload,
      sourceReferences,
      provenanceEventIds,
      recorderActorId: actor,
      relationshipIds,
    },
    { actor },
  );
}

export function confirmation(id, recordId, decision = "accepted") {
  return revision({
    id,
    kind: "confirmation",
    recordId,
    recordRevision: 1,
    confirmerActorId: PERSON,
    occurredAt: NOW,
    proposalContextReferenceIds: [],
    contractVersion: VERSION,
    decision,
  });
}

export function createBaseBundle() {
  return {
    schemaVersion: VERSION,
    chronicles: [
      {
        id: CHRONICLE,
        controllingPersonActorId: PERSON,
      },
    ],
    subjects: [
      {
        id: SUBJECT,
        kind: "controlling-person",
        label: "Synthetic person",
      },
    ],
    actors: [
      {
        id: PERSON,
        kind: "controlling-person",
        displayLabel: "Synthetic person",
      },
      {
        id: CONNECTOR,
        kind: "connector",
        displayLabel: "Synthetic connector",
      },
      {
        id: SERVICE,
        kind: "deterministic-domain-service",
        displayLabel: "Synthetic deterministic service",
      },
      {
        id: OPERATOR,
        kind: "operator",
        displayLabel: "Synthetic operator",
      },
      {
        id: SOURCE_ACTOR,
        kind: "external-source",
        displayLabel: "Synthetic clinic source",
      },
    ],
    variables: [
      revision({
        id: VARIABLE_STEPS,
        status: "active",
        preferredLabel: "Step count",
        plainLanguageDescription:
          "A synthetic count of steps for a stated period.",
        aliases: [],
        valueShape: "integer-count",
        unitDimensionId: DIMENSION_STEP_COUNT,
        allowedUnitIds: [UNIT_STEP],
        temporalSemantics: "period-total",
        aggregationSemantics: "sum",
        externalMappings: [],
      }),
      revision({
        id: VARIABLE_WEIGHT,
        status: "active",
        preferredLabel: "Body weight",
        plainLanguageDescription:
          "A synthetic body-weight assertion used only for contract testing.",
        aliases: [],
        valueShape: "quantity",
        unitDimensionId: DIMENSION_MASS,
        allowedUnitIds: [UNIT_POUND, UNIT_KILOGRAM],
        temporalSemantics: "instantaneous",
        aggregationSemantics: "latest",
        externalMappings: [],
      }),
      revision({
        id: VARIABLE_SLEEP,
        status: "active",
        preferredLabel: "Sleep state",
        plainLanguageDescription:
          "A synthetic interval state used only for contract testing.",
        aliases: [],
        valueShape: "coded-category",
        categorySetId: CATEGORY_SET_SLEEP,
        temporalSemantics: "interval-state",
        aggregationSemantics: "duration",
        externalMappings: [],
      }),
      revision({
        id: VARIABLE_DOSE_TEXT,
        status: "active",
        preferredLabel: "Medication dose text",
        plainLanguageDescription:
          "Synthetic source-reported dose text used to exercise document conflict.",
        aliases: [],
        valueShape: "text",
        temporalSemantics: "point-in-period",
        aggregationSemantics: "latest",
        externalMappings: [],
      }),
    ],
    categorySets: [
      revision({
        id: CATEGORY_SET_SLEEP,
        status: "active",
        preferredLabel: "Synthetic sleep state",
        categories: [
          {
            id: CATEGORY_ASLEEP,
            preferredLabel: "Asleep",
            plainLanguageDescription: "Synthetic asleep state.",
            aliases: [],
            order: 1,
            lifecycleState: "active",
            externalMappings: [],
          },
        ],
        ordering: "ordered",
        selection: "single",
        externalMappings: [],
      }),
    ],
    unitDimensions: [
      revision({
        id: DIMENSION_STEP_COUNT,
        preferredLabel: "Step count",
        description: "A discrete synthetic count dimension.",
        status: "active",
      }),
      revision({
        id: DIMENSION_MASS,
        preferredLabel: "Mass",
        description: "A synthetic mass dimension.",
        status: "active",
      }),
    ],
    units: [
      revision({
        id: UNIT_STEP,
        status: "active",
        preferredLabel: "step",
        symbol: "step",
        aliases: [],
        dimensionId: DIMENSION_STEP_COUNT,
        conversionCapability: "identity",
        externalMappings: [],
      }),
      revision({
        id: UNIT_POUND,
        status: "active",
        preferredLabel: "pound",
        symbol: "lb",
        aliases: [],
        dimensionId: DIMENSION_MASS,
        canonicalUnitId: UNIT_KILOGRAM,
        conversionCapability: "direct-versioned",
        externalMappings: [],
      }),
      revision({
        id: UNIT_KILOGRAM,
        status: "active",
        preferredLabel: "kilogram",
        symbol: "kg",
        aliases: [],
        dimensionId: DIMENSION_MASS,
        canonicalUnitId: UNIT_KILOGRAM,
        conversionCapability: "identity",
        externalMappings: [],
      }),
    ],
    records: [],
    sourceArtifacts: [],
    sourceVersions: [],
    sourceLocators: [],
    provenanceEvents: [],
    confirmationEvents: [],
    externalReferences: [],
    relationships: [],
    attachments: [],
    custodyReferences: [],
    storedRepresentations: [],
    derivedRepresentations: [],
    exportRequests: [],
    exportPlans: [],
    exportManifests: [],
    exportArtifacts: [],
    exportDeliveries: [],
    deletionRequests: [],
    deletionScopeResolutions: [],
    retentionExceptions: [],
    tombstones: [],
    deletionCompletionEvidence: [],
  };
}
