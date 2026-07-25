import {
  CHRONICLE,
  CONNECTOR,
  OPERATOR,
  UNIT_STEP,
  VARIABLE_STEPS,
  proposedRecord,
  revision,
  sourceReference,
} from "./common.mjs";
import {
  RECORD_REPLAY_MERGED,
  RECORD_REPLAY_ONE,
  RECORD_REPLAY_TWO,
  RELATIONSHIP_REPLAY_DUPLICATE,
  RELATIONSHIP_REPLAY_MERGE,
} from "./conflict-export-deletion-ids.mjs";

export function addDuplicateMergeScenario(bundle) {
  const sourceReplay = "source.connector.steps-replay";
  const sourceReplayV1 = "source-version.connector.steps-replay.v1";
  const sourceReplayV2 = "source-version.connector.steps-replay.v2";
  const locatorReplayV1 = "locator.connector.steps-replay.v1.value";
  const locatorReplayV2 = "locator.connector.steps-replay.v2.value";
  const importReplayV1 = "provenance.import.replay-v1";
  const importReplayV2 = "provenance.import.replay-v2";

  bundle.sourceArtifacts.push(
    revision(
      {
        id: sourceReplay,
        chronicleId: CHRONICLE,
        kind: "connector-payload",
        dataClassification: "synthetic",
        preferredLabel: "Synthetic replayed connector payload",
        lifecycleState: "active",
      },
      { actor: CONNECTOR },
    ),
  );

  bundle.sourceVersions.push(
    revision(
      {
        id: sourceReplayV1,
        sourceArtifactId: sourceReplay,
        sourceRevision: "1",
        mediaType: "application/json",
        representationType: "structured-payload",
        capturedAt: "2026-07-24T10:20:00Z",
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
    revision(
      {
        id: sourceReplayV2,
        sourceArtifactId: sourceReplay,
        sourceRevision: "2",
        mediaType: "application/json",
        representationType: "structured-payload",
        capturedAt: "2026-07-24T10:21:00Z",
        sourceCreatedAt: {
          kind: "exact-instant",
          instant: "2026-07-24T10:14:58Z",
        },
        length: 64,
        custodyReferenceIds: [],
        availabilityState: "available",
        sourceActorIds: [CONNECTOR],
      },
      {
        actor: CONNECTOR,
        revisionNumber: 2,
        createdAt: "2026-07-24T10:21:00Z",
      },
    ),
  );

  bundle.sourceLocators.push(
    revision(
      {
        id: locatorReplayV1,
        sourceVersionId: sourceReplayV1,
        kind: "json-pointer",
        locatorValue: "/steps",
        sourceSnapshot: "7215",
      },
      { actor: CONNECTOR },
    ),
    revision(
      {
        id: locatorReplayV2,
        sourceVersionId: sourceReplayV2,
        kind: "json-pointer",
        locatorValue: "/steps",
        sourceSnapshot: "7215",
      },
      {
        actor: CONNECTOR,
        revisionNumber: 2,
        createdAt: "2026-07-24T10:21:00Z",
      },
    ),
  );

  bundle.provenanceEvents.push(
    revision(
      {
        id: importReplayV1,
        kind: "import",
        sourceArtifactId: sourceReplay,
        sourceVersionId: sourceReplayV1,
        importerActorId: CONNECTOR,
        occurredAt: "2026-07-24T10:20:00Z",
        sourceSystemVersion: "synthetic-replay",
        payloadFormat: "application/json",
        mappingContractVersion: "0.1.0",
        state: "success",
        errors: [],
        omissions: [],
      },
      { actor: CONNECTOR },
    ),
    revision(
      {
        id: importReplayV2,
        kind: "import",
        sourceArtifactId: sourceReplay,
        sourceVersionId: sourceReplayV2,
        importerActorId: CONNECTOR,
        occurredAt: "2026-07-24T10:21:00Z",
        sourceSystemVersion: "synthetic-replay",
        payloadFormat: "application/json",
        mappingContractVersion: "0.1.0",
        state: "success",
        errors: [],
        omissions: [],
      },
      {
        actor: CONNECTOR,
        revisionNumber: 2,
        createdAt: "2026-07-24T10:21:00Z",
      },
    ),
  );

  bundle.records.push(
    proposedRecord({
      id: RECORD_REPLAY_ONE,
      family: "observation",
      assertionClass: "imported-claim",
      temporalAssertion: {
        kind: "exact-instant",
        instant: "2026-07-24T10:14:58Z",
      },
      payload: {
        variableId: VARIABLE_STEPS,
        value: { kind: "integer-count", value: 7215, countUnitId: UNIT_STEP },
      },
      sourceReferences: [
        sourceReference(sourceReplay, sourceReplayV1, locatorReplayV1),
      ],
      provenanceEventIds: [importReplayV1],
      relationshipIds: [
        RELATIONSHIP_REPLAY_DUPLICATE,
        RELATIONSHIP_REPLAY_MERGE,
      ],
    }),
    proposedRecord({
      id: RECORD_REPLAY_TWO,
      family: "observation",
      assertionClass: "imported-claim",
      temporalAssertion: {
        kind: "exact-instant",
        instant: "2026-07-24T10:14:58Z",
      },
      payload: {
        variableId: VARIABLE_STEPS,
        value: { kind: "integer-count", value: 7215, countUnitId: UNIT_STEP },
      },
      sourceReferences: [
        sourceReference(sourceReplay, sourceReplayV2, locatorReplayV2),
      ],
      provenanceEventIds: [importReplayV2],
      relationshipIds: [
        RELATIONSHIP_REPLAY_DUPLICATE,
        RELATIONSHIP_REPLAY_MERGE,
      ],
    }),
    proposedRecord({
      id: RECORD_REPLAY_MERGED,
      family: "observation",
      assertionClass: "imported-claim",
      temporalAssertion: {
        kind: "exact-instant",
        instant: "2026-07-24T10:14:58Z",
      },
      payload: {
        variableId: VARIABLE_STEPS,
        value: { kind: "integer-count", value: 7215, countUnitId: UNIT_STEP },
      },
      sourceReferences: [
        sourceReference(sourceReplay, sourceReplayV1, locatorReplayV1),
        sourceReference(sourceReplay, sourceReplayV2, locatorReplayV2),
      ],
      provenanceEventIds: [importReplayV1, importReplayV2],
      relationshipIds: [RELATIONSHIP_REPLAY_MERGE],
    }),
  );

  bundle.relationships.push(
    revision(
      {
        id: RELATIONSHIP_REPLAY_DUPLICATE,
        relationshipType: "duplicate-candidate",
        sourceRecordIds: [RECORD_REPLAY_ONE, RECORD_REPLAY_TWO],
        targetRecordIds: [RECORD_REPLAY_ONE, RECORD_REPLAY_TWO],
        actorId: CONNECTOR,
        recordedAt: "2026-07-24T10:22:00Z",
        reasonCode: "connector-replay",
        decisionMethodId: "method.duplicate.connector-replay",
        decisionMethodVersion: "1",
        reviewState: "proposed",
        confidence: 1,
        detectionEvidence: [
          "same source event time",
          "same value",
          "connector replay sequence",
        ],
      },
      { actor: CONNECTOR },
    ),
    revision(
      {
        id: RELATIONSHIP_REPLAY_MERGE,
        relationshipType: "merge",
        sourceRecordIds: [RECORD_REPLAY_ONE, RECORD_REPLAY_TWO],
        targetRecordIds: [RECORD_REPLAY_MERGED],
        actorId: OPERATOR,
        recordedAt: "2026-07-24T10:30:00Z",
        reasonCode: "confirmed-replay-composite",
        reasonText:
          "Create a non-destructive composite while preserving both source chains.",
        sourceReferenceIds: [sourceReplayV1, sourceReplayV2],
        reviewState: "confirmed",
        outputRecordId: RECORD_REPLAY_MERGED,
        mergePolicyId: "policy.merge.connector-replay",
        mergePolicyVersion: "1",
        retainedFieldsByRecord: {
          [RECORD_REPLAY_ONE]: ["sourceReferences"],
          [RECORD_REPLAY_TWO]: ["sourceReferences"],
        },
        unresolvedFields: [],
        reversible: true,
      },
      { actor: OPERATOR },
    ),
  );

  return bundle;
}
