import {
  CATEGORY_ASLEEP,
  CHRONICLE,
  CONNECTOR,
  NOW,
  PERSON,
  SERVICE,
  UNIT_KILOGRAM,
  UNIT_POUND,
  UNIT_STEP,
  VARIABLE_SLEEP,
  VARIABLE_STEPS,
  VARIABLE_WEIGHT,
  confirmation,
  confirmedRecord,
  proposedRecord,
  revision,
  sourceReference,
} from "./common.mjs";

export const RECORD_MANUAL_STEPS = "record.activity.steps-manual";
export const RECORD_DEVICE_STEPS = "record.activity.steps-device";
export const RECORD_REFLECTION = "record.reflection.study-weeks";
export const RECORD_SLEEP_OPEN = "record.sleep.open-interval";
export const RECORD_SLEEP_BOUNDED = "record.sleep.bounded-interval";
export const RECORD_WEIGHT_WRONG = "record.body.weight-wrong";
export const RECORD_WEIGHT_CORRECTED = "record.body.weight-corrected";
export const RECORD_WEIGHT_NORMALIZED = "record.body.weight-normalized";

export const SOURCE_VERSION_WEIGHT = "source-version.manual.weight.v1";
export const DERIVATION_WEIGHT =
  "provenance.derivation.weight-normalization";
export const RELATIONSHIP_WEIGHT_CORRECTION = "relationship.correction.weight";

export function addTimeSourceAndCorrectionScenarios(bundle) {
  const source = {
    manualSteps: "source.manual.steps",
    deviceSteps: "source.device.steps",
    reflection: "source.manual.reflection",
    sleep: "source.manual.sleep",
    weight: "source.manual.weight",
  };
  const version = {
    manualSteps: "source-version.manual.steps.v1",
    deviceSteps: "source-version.device.steps.v1",
    reflection: "source-version.manual.reflection.v1",
    sleep: "source-version.manual.sleep.v1",
    weight: SOURCE_VERSION_WEIGHT,
  };
  const locator = {
    manualSteps: "locator.manual.steps.value",
    deviceSteps: "locator.device.steps.value",
    reflection: "locator.manual.reflection.text",
    sleepOpen: "locator.manual.sleep.open",
    sleepBounded: "locator.manual.sleep.bounded",
    weight: "locator.manual.weight.value",
  };
  const provenance = {
    manualSteps: "provenance.capture.steps",
    deviceSteps: "provenance.import.device-steps",
    reflection: "provenance.capture.reflection",
    sleep: "provenance.capture.sleep",
    weight: "provenance.capture.weight",
    normalize: "provenance.transform.weight-normalization",
    derive: DERIVATION_WEIGHT,
  };
  const confirmations = {
    manualSteps: "confirmation.record.steps-manual",
    reflection: "confirmation.record.reflection",
    sleepOpen: "confirmation.record.sleep-open",
    sleepBounded: "confirmation.record.sleep-bounded",
    weightWrong: "confirmation.record.weight-wrong",
    weightCorrected: "confirmation.record.weight-corrected",
  };

  bundle.sourceArtifacts.push(
    revision({
      id: source.manualSteps,
      chronicleId: CHRONICLE,
      kind: "manual-entry",
      dataClassification: "synthetic",
      preferredLabel: "Synthetic manual step entry",
      lifecycleState: "active",
    }),
    revision(
      {
        id: source.deviceSteps,
        chronicleId: CHRONICLE,
        kind: "device-payload",
        dataClassification: "synthetic",
        preferredLabel: "Synthetic device payload",
        lifecycleState: "active",
      },
      { actor: CONNECTOR },
    ),
    revision({
      id: source.reflection,
      chronicleId: CHRONICLE,
      kind: "manual-entry",
      dataClassification: "synthetic",
      preferredLabel: "Synthetic historical reflection",
      lifecycleState: "active",
    }),
    revision({
      id: source.sleep,
      chronicleId: CHRONICLE,
      kind: "manual-entry",
      dataClassification: "synthetic",
      preferredLabel: "Synthetic sleep intervals",
      lifecycleState: "active",
    }),
    revision({
      id: source.weight,
      chronicleId: CHRONICLE,
      kind: "manual-entry",
      dataClassification: "synthetic",
      preferredLabel: "Synthetic weight entry",
      lifecycleState: "active",
    }),
  );

  bundle.sourceVersions.push(
    revision({
      id: version.manualSteps,
      sourceArtifactId: source.manualSteps,
      sourceRevision: "1",
      representationType: "text",
      capturedAt: NOW,
      sourceCreatedAt: { kind: "calendar-date", date: "2026-07-24" },
      length: 4,
      custodyReferenceIds: [],
      availabilityState: "available",
      authorActorIds: [PERSON],
      sourceActorIds: [PERSON],
    }),
    revision(
      {
        id: version.deviceSteps,
        sourceArtifactId: source.deviceSteps,
        sourceRevision: "1",
        mediaType: "application/json",
        representationType: "structured-payload",
        capturedAt: "2026-07-24T10:15:00Z",
        sourceCreatedAt: {
          kind: "exact-instant",
          instant: "2026-07-24T10:14:58Z",
        },
        length: 64,
        custodyReferenceIds: [],
        availabilityState: "available",
        sourceActorIds: [CONNECTOR],
      },
      { actor: CONNECTOR },
    ),
    revision({
      id: version.reflection,
      sourceArtifactId: source.reflection,
      sourceRevision: "1",
      representationType: "text",
      capturedAt: NOW,
      sourceCreatedAt: { kind: "calendar-date", date: "2026-07-24" },
      length: 58,
      custodyReferenceIds: [],
      availabilityState: "available",
      authorActorIds: [PERSON],
      sourceActorIds: [PERSON],
    }),
    revision({
      id: version.sleep,
      sourceArtifactId: source.sleep,
      sourceRevision: "1",
      representationType: "text",
      capturedAt: NOW,
      sourceCreatedAt: { kind: "calendar-date", date: "2026-07-24" },
      length: 32,
      custodyReferenceIds: [],
      availabilityState: "available",
      authorActorIds: [PERSON],
      sourceActorIds: [PERSON],
    }),
    revision({
      id: version.weight,
      sourceArtifactId: source.weight,
      sourceRevision: "1",
      representationType: "text",
      capturedAt: NOW,
      sourceCreatedAt: { kind: "calendar-date", date: "2026-07-24" },
      length: 6,
      custodyReferenceIds: [],
      availabilityState: "available",
      authorActorIds: [PERSON],
      sourceActorIds: [PERSON],
    }),
  );

  bundle.sourceLocators.push(
    revision({
      id: locator.manualSteps,
      sourceVersionId: version.manualSteps,
      kind: "field-path",
      locatorValue: "value",
      sourceSnapshot: "7215",
    }),
    revision(
      {
        id: locator.deviceSteps,
        sourceVersionId: version.deviceSteps,
        kind: "json-pointer",
        locatorValue: "/steps",
        sourceSnapshot: "7215",
      },
      { actor: CONNECTOR },
    ),
    revision({
      id: locator.reflection,
      sourceVersionId: version.reflection,
      kind: "whole-source-version",
      locatorValue: "whole",
      sourceSnapshot:
        "Around spring 2021 I often felt tired after long study weeks.",
    }),
    revision({
      id: locator.sleepOpen,
      sourceVersionId: version.sleep,
      kind: "field-path",
      locatorValue: "openInterval",
      sourceSnapshot: "since 23:00",
    }),
    revision({
      id: locator.sleepBounded,
      sourceVersionId: version.sleep,
      kind: "field-path",
      locatorValue: "boundedInterval",
      sourceSnapshot: "23:00 to 07:00",
    }),
    revision({
      id: locator.weight,
      sourceVersionId: version.weight,
      kind: "field-path",
      locatorValue: "value",
      sourceSnapshot: "180 lb",
    }),
  );

  bundle.provenanceEvents.push(
    revision({
      id: provenance.manualSteps,
      kind: "capture",
      sourceVersionId: version.manualSteps,
      actorId: PERSON,
      chronicleId: CHRONICLE,
      captureMode: "manual-entry",
      occurredAt: NOW,
      fixtureDataClassification: "synthetic",
    }),
    revision(
      {
        id: provenance.deviceSteps,
        kind: "import",
        sourceArtifactId: source.deviceSteps,
        sourceVersionId: version.deviceSteps,
        importerActorId: CONNECTOR,
        occurredAt: "2026-07-24T10:15:00Z",
        sourceSystemVersion: "synthetic-1",
        payloadFormat: "application/json",
        mappingContractVersion: "0.1.0",
        state: "success",
        errors: [],
        omissions: [],
      },
      { actor: CONNECTOR },
    ),
    revision({
      id: provenance.reflection,
      kind: "capture",
      sourceVersionId: version.reflection,
      actorId: PERSON,
      chronicleId: CHRONICLE,
      captureMode: "manual-entry",
      occurredAt: NOW,
      fixtureDataClassification: "synthetic",
    }),
    revision({
      id: provenance.sleep,
      kind: "capture",
      sourceVersionId: version.sleep,
      actorId: PERSON,
      chronicleId: CHRONICLE,
      captureMode: "manual-entry",
      occurredAt: NOW,
      fixtureDataClassification: "synthetic",
    }),
    revision({
      id: provenance.weight,
      kind: "capture",
      sourceVersionId: version.weight,
      actorId: PERSON,
      chronicleId: CHRONICLE,
      captureMode: "manual-entry",
      occurredAt: NOW,
      fixtureDataClassification: "synthetic",
    }),
  );

  bundle.records.push(
    confirmedRecord({
      id: RECORD_MANUAL_STEPS,
      family: "observation",
      assertionClass: "direct-observation",
      temporalAssertion: {
        kind: "calendar-date",
        date: "2026-07-24",
        sourceText: "today",
      },
      payload: {
        variableId: VARIABLE_STEPS,
        value: { kind: "integer-count", value: 7215, countUnitId: UNIT_STEP },
      },
      sourceReferences: [
        sourceReference(
          source.manualSteps,
          version.manualSteps,
          locator.manualSteps,
        ),
      ],
      provenanceEventIds: [provenance.manualSteps],
      confirmationEventId: confirmations.manualSteps,
    }),
    proposedRecord({
      id: RECORD_DEVICE_STEPS,
      family: "observation",
      assertionClass: "imported-claim",
      temporalAssertion: {
        kind: "exact-instant",
        instant: "2026-07-24T10:14:58Z",
        timeZone: "UTC",
      },
      payload: {
        variableId: VARIABLE_STEPS,
        value: { kind: "integer-count", value: 7215, countUnitId: UNIT_STEP },
      },
      sourceReferences: [
        sourceReference(
          source.deviceSteps,
          version.deviceSteps,
          locator.deviceSteps,
        ),
      ],
      provenanceEventIds: [provenance.deviceSteps],
    }),
    confirmedRecord({
      id: RECORD_REFLECTION,
      family: "reflection",
      assertionClass: "reflection",
      temporalAssertion: {
        kind: "approximate",
        earliest: "2021-03-01",
        latest: "2021-05-31",
        centralEstimate: "2021-04-15",
        precision: "season",
        sourceText: "around spring 2021",
      },
      payload: {
        text: {
          kind: "text",
          text: "Around spring 2021 I often felt tired after long study weeks.",
          locale: "en-US",
          format: "plain",
        },
        proposedExtractionRecordIds: [],
      },
      sourceReferences: [
        sourceReference(
          source.reflection,
          version.reflection,
          locator.reflection,
        ),
      ],
      provenanceEventIds: [provenance.reflection],
      confirmationEventId: confirmations.reflection,
    }),
    confirmedRecord({
      id: RECORD_SLEEP_OPEN,
      family: "interval",
      assertionClass: "self-report",
      temporalAssertion: {
        kind: "interval",
        start: {
          kind: "local-date-time",
          localDateTime: "2026-07-23T23:00:00",
          timeZone: "America/New_York",
          resolutionState: "resolved",
          sourceText: "11 PM",
        },
        startBoundary: "inclusive",
        endBoundary: "unknown",
        sourceText: "since 11 PM",
      },
      payload: {
        variableId: VARIABLE_SLEEP,
        value: { kind: "coded-category", categoryId: CATEGORY_ASLEEP },
        boundaryMeaning: "open interval",
      },
      sourceReferences: [
        sourceReference(source.sleep, version.sleep, locator.sleepOpen),
      ],
      provenanceEventIds: [provenance.sleep],
      confirmationEventId: confirmations.sleepOpen,
    }),
    confirmedRecord({
      id: RECORD_SLEEP_BOUNDED,
      family: "interval",
      assertionClass: "self-report",
      temporalAssertion: {
        kind: "interval",
        start: {
          kind: "local-date-time",
          localDateTime: "2026-07-22T23:00:00",
          timeZone: "America/New_York",
          resolutionState: "resolved",
        },
        end: {
          kind: "local-date-time",
          localDateTime: "2026-07-23T07:00:00",
          timeZone: "America/New_York",
          resolutionState: "resolved",
        },
        startBoundary: "inclusive",
        endBoundary: "exclusive",
        sourceText: "11 PM to 7 AM",
      },
      payload: {
        variableId: VARIABLE_SLEEP,
        value: { kind: "coded-category", categoryId: CATEGORY_ASLEEP },
        boundaryMeaning: "bounded interval",
      },
      sourceReferences: [
        sourceReference(source.sleep, version.sleep, locator.sleepBounded),
      ],
      provenanceEventIds: [provenance.sleep],
      confirmationEventId: confirmations.sleepBounded,
    }),
    confirmedRecord({
      id: RECORD_WEIGHT_WRONG,
      family: "observation",
      assertionClass: "self-report",
      temporalAssertion: {
        kind: "exact-instant",
        instant: "2026-07-24T08:00:00-04:00",
      },
      payload: {
        variableId: VARIABLE_WEIGHT,
        value: {
          kind: "quantity",
          magnitude: "180",
          unitId: UNIT_KILOGRAM,
          sourceText: "180 lb",
        },
      },
      sourceReferences: [
        sourceReference(source.weight, version.weight, locator.weight),
      ],
      provenanceEventIds: [provenance.weight],
      confirmationEventId: confirmations.weightWrong,
      relationshipIds: [RELATIONSHIP_WEIGHT_CORRECTION],
      lifecycleState: "superseded",
    }),
    confirmedRecord({
      id: RECORD_WEIGHT_CORRECTED,
      family: "observation",
      assertionClass: "self-report",
      temporalAssertion: {
        kind: "exact-instant",
        instant: "2026-07-24T08:00:00-04:00",
      },
      payload: {
        variableId: VARIABLE_WEIGHT,
        value: {
          kind: "quantity",
          magnitude: "180",
          unitId: UNIT_POUND,
          sourceText: "180 lb",
        },
      },
      sourceReferences: [
        sourceReference(source.weight, version.weight, locator.weight),
      ],
      provenanceEventIds: [provenance.weight],
      confirmationEventId: confirmations.weightCorrected,
      relationshipIds: [RELATIONSHIP_WEIGHT_CORRECTION],
    }),
    proposedRecord({
      id: RECORD_WEIGHT_NORMALIZED,
      family: "derived",
      assertionClass: "deterministic-calculation",
      temporalAssertion: {
        kind: "exact-instant",
        instant: "2026-07-24T08:00:00-04:00",
      },
      payload: {
        variableId: VARIABLE_WEIGHT,
        value: {
          kind: "quantity",
          magnitude: "81.6466266",
          unitId: UNIT_KILOGRAM,
        },
        inputRecordIds: [RECORD_WEIGHT_CORRECTED],
        derivationId: "derivation.weight.pound-to-kilogram",
        invalidationBehavior: "recompute",
      },
      sourceReferences: [
        sourceReference(source.weight, version.weight, locator.weight),
      ],
      provenanceEventIds: [provenance.normalize, provenance.derive],
      actor: SERVICE,
    }),
  );

  bundle.provenanceEvents.push(
    revision(
      {
        id: provenance.normalize,
        kind: "transformation",
        transformationId: "transformation.weight.pound-to-kilogram",
        transformationKind: "unit-normalization",
        methodId: "method.mass.pound-to-kilogram",
        methodVersion: "1",
        actorId: SERVICE,
        inputSourceVersionIds: [version.weight],
        inputSourceLocatorIds: [locator.weight],
        inputRecordIds: [RECORD_WEIGHT_CORRECTED],
        parameters: { factor: "0.45359237" },
        assumptions: [],
        outputReferenceIds: [RECORD_WEIGHT_NORMALIZED],
        occurredAt: "2026-07-24T12:05:00Z",
      },
      { actor: SERVICE },
    ),
    revision(
      {
        id: provenance.derive,
        kind: "derivation",
        derivationId: "derivation.weight.pound-to-kilogram",
        methodId: "method.mass.pound-to-kilogram",
        methodVersion: "1",
        actorId: SERVICE,
        inputRecordIds: [RECORD_WEIGHT_CORRECTED],
        parameters: { factor: "0.45359237" },
        outputRecordIds: [RECORD_WEIGHT_NORMALIZED],
        occurredAt: "2026-07-24T12:05:00Z",
      },
      { actor: SERVICE },
    ),
  );

  bundle.confirmationEvents.push(
    confirmation(confirmations.manualSteps, RECORD_MANUAL_STEPS),
    confirmation(confirmations.reflection, RECORD_REFLECTION),
    confirmation(confirmations.sleepOpen, RECORD_SLEEP_OPEN),
    confirmation(confirmations.sleepBounded, RECORD_SLEEP_BOUNDED),
    confirmation(confirmations.weightWrong, RECORD_WEIGHT_WRONG),
    confirmation(
      confirmations.weightCorrected,
      RECORD_WEIGHT_CORRECTED,
      "corrected-and-accepted",
    ),
  );

  bundle.relationships.push(
    revision({
      id: RELATIONSHIP_WEIGHT_CORRECTION,
      relationshipType: "correction",
      sourceRecordIds: [RECORD_WEIGHT_WRONG],
      targetRecordIds: [RECORD_WEIGHT_CORRECTED],
      actorId: PERSON,
      recordedAt: NOW,
      reasonCode: "unit-error",
      reasonText: "The source said 180 lb, but the first record used kilograms.",
      sourceReferenceIds: [version.weight, locator.weight],
      reviewState: "confirmed",
      correctionType: "unit-error",
      changedComponents: ["payload.value.unitId"],
      dependentRecordIds: [RECORD_WEIGHT_NORMALIZED],
    }),
  );

  return bundle;
}
