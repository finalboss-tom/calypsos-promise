import assert from "node:assert/strict";
import test from "node:test";

import {
  LIVING_CHRONICLE_SCHEMA_VERSION,
  validateChronicleSchemaBundle,
} from "../dist/index.js";

const ACTOR_ID = "actor.person.demo";
const CHRONICLE_ID = "chronicle.person.demo";
const SUBJECT_ID = "subject.person.demo";
const VARIABLE_ID = "variable.activity.step-count";
const DIMENSION_ID = "dimension.count.step";
const UNIT_ID = "unit.count.step";
const RECORD_ID = "record.activity.steps";
const SOURCE_ARTIFACT_ID = "source.manual.steps";
const SOURCE_VERSION_ID = "source-version.manual.steps.v1";
const SOURCE_LOCATOR_ID = "locator.manual.steps.value";
const CAPTURE_EVENT_ID = "provenance.capture.steps";
const CONFIRMATION_EVENT_ID = "confirmation.record.steps";
const NOW = "2026-07-24T12:00:00Z";

function revisionMetadata() {
  return {
    schemaVersion: LIVING_CHRONICLE_SCHEMA_VERSION,
    revision: 1,
    createdAt: NOW,
    createdBy: ACTOR_ID,
    updatedAt: NOW,
    updatedBy: ACTOR_ID,
  };
}

function validBundle() {
  return {
    schemaVersion: LIVING_CHRONICLE_SCHEMA_VERSION,
    chronicles: [
      {
        id: CHRONICLE_ID,
        controllingPersonActorId: ACTOR_ID,
      },
    ],
    subjects: [
      {
        id: SUBJECT_ID,
        kind: "controlling-person",
        label: "Synthetic person",
      },
    ],
    actors: [
      {
        id: ACTOR_ID,
        kind: "controlling-person",
        displayLabel: "Synthetic person",
      },
    ],
    variables: [
      {
        ...revisionMetadata(),
        id: VARIABLE_ID,
        status: "active",
        preferredLabel: "Step count",
        plainLanguageDescription:
          "A synthetic count of steps for a stated period.",
        aliases: [],
        valueShape: "integer-count",
        unitDimensionId: DIMENSION_ID,
        allowedUnitIds: [UNIT_ID],
        temporalSemantics: "period-total",
        aggregationSemantics: "sum",
        externalMappings: [],
      },
    ],
    categorySets: [],
    unitDimensions: [
      {
        ...revisionMetadata(),
        id: DIMENSION_ID,
        preferredLabel: "Step count",
        description: "A discrete synthetic count dimension.",
        status: "active",
      },
    ],
    units: [
      {
        ...revisionMetadata(),
        id: UNIT_ID,
        status: "active",
        preferredLabel: "step",
        symbol: "step",
        aliases: [],
        dimensionId: DIMENSION_ID,
        conversionCapability: "identity",
        externalMappings: [],
      },
    ],
    records: [
      {
        ...revisionMetadata(),
        id: RECORD_ID,
        chronicleId: CHRONICLE_ID,
        subjectId: SUBJECT_ID,
        family: "observation",
        assertionClass: "direct-observation",
        authorityState: "confirmed",
        lifecycleState: "active",
        temporalAssertion: {
          kind: "calendar-date",
          date: "2026-07-24",
          sourceText: "today",
        },
        payload: {
          variableId: VARIABLE_ID,
          value: {
            kind: "integer-count",
            value: 7215,
            countUnitId: UNIT_ID,
          },
        },
        sourceReferences: [
          {
            sourceArtifactId: SOURCE_ARTIFACT_ID,
            sourceVersionId: SOURCE_VERSION_ID,
            sourceLocatorIds: [SOURCE_LOCATOR_ID],
          },
        ],
        provenanceEventIds: [CAPTURE_EVENT_ID],
        authorActorIds: [ACTOR_ID],
        recorderActorId: ACTOR_ID,
        confirmerActorId: ACTOR_ID,
        confirmationEventId: CONFIRMATION_EVENT_ID,
        relationshipIds: [],
      },
    ],
    sourceArtifacts: [
      {
        ...revisionMetadata(),
        id: SOURCE_ARTIFACT_ID,
        chronicleId: CHRONICLE_ID,
        kind: "manual-entry",
        dataClassification: "synthetic",
        preferredLabel: "Synthetic manual step entry",
        lifecycleState: "active",
      },
    ],
    sourceVersions: [
      {
        ...revisionMetadata(),
        id: SOURCE_VERSION_ID,
        sourceArtifactId: SOURCE_ARTIFACT_ID,
        sourceRevision: "1",
        representationType: "text",
        capturedAt: NOW,
        sourceCreatedAt: {
          kind: "calendar-date",
          date: "2026-07-24",
        },
        length: 4,
        custodyReferenceIds: [],
        availabilityState: "available",
        authorActorIds: [ACTOR_ID],
        sourceActorIds: [ACTOR_ID],
      },
    ],
    sourceLocators: [
      {
        ...revisionMetadata(),
        id: SOURCE_LOCATOR_ID,
        sourceVersionId: SOURCE_VERSION_ID,
        kind: "field-path",
        locatorValue: "value",
        sourceSnapshot: "7215",
      },
    ],
    provenanceEvents: [
      {
        ...revisionMetadata(),
        id: CAPTURE_EVENT_ID,
        kind: "capture",
        sourceVersionId: SOURCE_VERSION_ID,
        actorId: ACTOR_ID,
        chronicleId: CHRONICLE_ID,
        captureMode: "manual-entry",
        occurredAt: NOW,
        fixtureDataClassification: "synthetic",
      },
    ],
    confirmationEvents: [
      {
        ...revisionMetadata(),
        id: CONFIRMATION_EVENT_ID,
        kind: "confirmation",
        recordId: RECORD_ID,
        recordRevision: 1,
        confirmerActorId: ACTOR_ID,
        occurredAt: NOW,
        proposalContextReferenceIds: [SOURCE_VERSION_ID],
        contractVersion: LIVING_CHRONICLE_SCHEMA_VERSION,
        decision: "accepted",
      },
    ],
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

function issueCodes(result) {
  return new Set(result.issues.map((issue) => issue.code));
}

test("accepts a traceable confirmed synthetic observation", () => {
  const result = validateChronicleSchemaBundle(validBundle(), {
    fixtureDataPolicy: "public-or-synthetic",
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.issues, []);
});

test("rejects identifiers without a dotted namespace", () => {
  const bundle = validBundle();
  bundle.records[0].id = "record";

  const result = validateChronicleSchemaBundle(bundle);
  assert.equal(result.valid, false);
  assert.ok(issueCodes(result).has("ID_INVALID"));
});

test("rejects globally duplicated identifiers", () => {
  const bundle = validBundle();
  bundle.actors.push({
    id: ACTOR_ID,
    kind: "maintainer",
    displayLabel: "Duplicate actor",
  });

  const result = validateChronicleSchemaBundle(bundle);
  assert.ok(issueCodes(result).has("ID_DUPLICATE"));
});

test("requires matching confirmation evidence for confirmed records", () => {
  const bundle = validBundle();
  delete bundle.records[0].confirmationEventId;
  delete bundle.records[0].confirmerActorId;

  const result = validateChronicleSchemaBundle(bundle);
  assert.ok(issueCodes(result).has("CONFIRMATION_REQUIRED"));
});

test("requires interval records to use an interval temporal assertion", () => {
  const bundle = validBundle();
  bundle.records[0].family = "interval";
  bundle.records[0].payload = {
    variableId: VARIABLE_ID,
    value: { kind: "integer-count", value: 1, countUnitId: UNIT_ID },
  };

  const result = validateChronicleSchemaBundle(bundle);
  assert.ok(issueCodes(result).has("INTERVAL_TEMPORAL_REQUIRED"));
});

test("rejects dangling derivation inputs", () => {
  const bundle = validBundle();
  bundle.records[0].family = "derived";
  bundle.records[0].assertionClass = "deterministic-calculation";
  bundle.records[0].payload = {
    variableId: VARIABLE_ID,
    value: { kind: "decimal", value: "7215" },
    inputRecordIds: ["record.missing.input"],
    derivationId: "derivation.synthetic.steps",
    invalidationBehavior: "invalidate",
  };

  const result = validateChronicleSchemaBundle(bundle);
  assert.ok(issueCodes(result).has("REFERENCE_DANGLING"));
});

test("rejects approximate time that preserves words but no usable bounds", () => {
  const bundle = validBundle();
  bundle.records[0].temporalAssertion = {
    kind: "approximate",
    precision: "month",
    sourceText: "around then",
  };

  const result = validateChronicleSchemaBundle(bundle);
  assert.ok(issueCodes(result).has("TEMPORAL_APPROXIMATE_BOUNDS_REQUIRED"));
});

test("rejects reversed exact decimal ranges", () => {
  const bundle = validBundle();
  bundle.records[0].payload.value = {
    kind: "numeric-range",
    lower: "10.00",
    upper: "2",
    lowerInclusive: true,
    upperInclusive: true,
  };

  const result = validateChronicleSchemaBundle(bundle);
  assert.ok(issueCodes(result).has("RANGE_ORDER_INVALID"));
});

test("rejects destructive or sensitive tombstone fields", () => {
  const bundle = validBundle();
  bundle.deletionRequests.push({
    ...revisionMetadata(),
    id: "deletion-request.synthetic.one",
    chronicleId: CHRONICLE_ID,
    requestedBy: ACTOR_ID,
    requestedAt: NOW,
    targets: [{ kind: "whole-chronicle" }],
    state: "completed",
  });
  bundle.tombstones.push({
    ...revisionMetadata(),
    id: "tombstone.synthetic.one",
    deletionRequestId: "deletion-request.synthetic.one",
    deletedTargetKind: "chronicle-record",
    deletedTargetId: "record.deleted.synthetic",
    purpose: "record-deletion-completion",
    retainedFields: { healthValue: "sensitive" },
  });

  const result = validateChronicleSchemaBundle(bundle);
  assert.ok(issueCodes(result).has("TOMBSTONE_FIELD_FORBIDDEN"));
});

test("enforces public-or-synthetic fixture classification when requested", () => {
  const bundle = validBundle();
  bundle.sourceArtifacts[0].dataClassification = "private";

  const result = validateChronicleSchemaBundle(bundle, {
    fixtureDataPolicy: "public-or-synthetic",
  });
  assert.ok(issueCodes(result).has("FIXTURE_PRIVATE_DATA_FORBIDDEN"));
});

test("does not allow a relationship to point at an absent replacement", () => {
  const bundle = validBundle();
  bundle.relationships.push({
    ...revisionMetadata(),
    id: "relationship.correction.synthetic",
    relationshipType: "correction",
    sourceRecordIds: [RECORD_ID],
    targetRecordIds: ["record.missing.replacement"],
    actorId: ACTOR_ID,
    recordedAt: NOW,
    reasonCode: "unit-error",
    reviewState: "confirmed",
    correctionType: "unit-error",
    changedComponents: ["payload.value.unitId"],
    dependentRecordIds: [],
  });

  const result = validateChronicleSchemaBundle(bundle);
  assert.ok(issueCodes(result).has("REFERENCE_DANGLING"));
});
