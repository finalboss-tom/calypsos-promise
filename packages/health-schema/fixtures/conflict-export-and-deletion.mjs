import {
  CHRONICLE,
  CONNECTOR,
  OPERATOR,
  PERSON,
  SERVICE,
  SOURCE_ACTOR,
  UNIT_STEP,
  VARIABLE_DOSE_TEXT,
  VARIABLE_STEPS,
  proposedRecord,
  revision,
  sourceReference,
} from "./common.mjs";
import {
  DERIVATION_WEIGHT,
  RECORD_MANUAL_STEPS,
  RECORD_WEIGHT_CORRECTED,
  RECORD_WEIGHT_NORMALIZED,
  RELATIONSHIP_WEIGHT_CORRECTION,
  SOURCE_VERSION_WEIGHT,
} from "./time-source-and-correction.mjs";

export const RECORD_DOSE_V1 = "record.medication.dose-v1";
export const RECORD_DOSE_V2 = "record.medication.dose-v2";
export const RECORD_REPLAY_ONE = "record.activity.steps-replay-one";
export const RECORD_REPLAY_TWO = "record.activity.steps-replay-two";
export const RECORD_REPLAY_MERGED = "record.activity.steps-replay-merged";

export const SOURCE_VERSION_DOCUMENT_V1 =
  "source-version.document.medication.v1";
export const SOURCE_VERSION_DOCUMENT_V2 =
  "source-version.document.medication.v2";
export const LOCATOR_DOCUMENT_V1 =
  "locator.document.medication.v1.page-one";
export const LOCATOR_DOCUMENT_V2 =
  "locator.document.medication.v2.page-one";

export const RELATIONSHIP_DOSE_CONFLICT = "relationship.conflict.medication";
export const RELATIONSHIP_REPLAY_DUPLICATE = "relationship.duplicate.steps";
export const RELATIONSHIP_REPLAY_MERGE = "relationship.merge.steps";

export const EXPORT_REQUEST = "export-request.synthetic.full";
export const EXPORT_PLAN = "export-plan.synthetic.full";
export const EXPORT_MANIFEST = "export-manifest.synthetic.full";
export const EXPORT_ARTIFACT = "export-artifact.synthetic.full";
export const EXPORT_DELIVERY = "export-delivery.synthetic.full";

export const DELETION_REQUEST =
  "deletion-request.synthetic.medication-v1";
export const DELETION_SCOPE = "deletion-scope.synthetic.medication-v1";
export const RETENTION_EXCEPTION =
  "retention-exception.synthetic.medication-v1";
export const TOMBSTONE = "tombstone.synthetic.medication-v1";
export const DELETION_EVIDENCE =
  "deletion-evidence.synthetic.medication-v1";

export function addConflictExportAndDeletionScenarios(bundle) {
  const sourceDocument = "source.document.medication";
  const sourceReplay = "source.connector.steps-replay";
  const sourceReplayV1 = "source-version.connector.steps-replay.v1";
  const sourceReplayV2 = "source-version.connector.steps-replay.v2";
  const locatorReplayV1 = "locator.connector.steps-replay.v1.value";
  const locatorReplayV2 = "locator.connector.steps-replay.v2.value";
  const importDocumentV1 = "provenance.import.medication-v1";
  const importDocumentV2 = "provenance.import.medication-v2";
  const importReplayV1 = "provenance.import.replay-v1";
  const importReplayV2 = "provenance.import.replay-v2";
  const attachmentV1 = "attachment.document.medication-v1";
  const attachmentV2 = "attachment.document.medication-v2";

  bundle.sourceArtifacts.push(
    revision(
      {
        id: sourceDocument,
        chronicleId: CHRONICLE,
        kind: "document",
        dataClassification: "synthetic",
        preferredLabel: "Synthetic medication letter",
        lifecycleState: "active",
      },
      { actor: SOURCE_ACTOR },
    ),
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
        id: SOURCE_VERSION_DOCUMENT_V1,
        sourceArtifactId: sourceDocument,
        sourceRevision: "1",
        mediaType: "application/pdf",
        representationType: "bytes",
        capturedAt: "2026-07-24T09:00:00Z",
        sourceCreatedAt: { kind: "calendar-date", date: "2026-07-20" },
        length: 1200,
        custodyReferenceIds: [],
        availabilityState: "retained-under-exception",
        authorActorIds: [SOURCE_ACTOR],
        sourceActorIds: [SOURCE_ACTOR],
      },
      { actor: SOURCE_ACTOR },
    ),
    revision(
      {
        id: SOURCE_VERSION_DOCUMENT_V2,
        sourceArtifactId: sourceDocument,
        sourceRevision: "2",
        mediaType: "application/pdf",
        representationType: "bytes",
        capturedAt: "2026-07-24T11:00:00Z",
        sourceCreatedAt: { kind: "calendar-date", date: "2026-07-22" },
        length: 1250,
        custodyReferenceIds: [],
        availabilityState: "available",
        authorActorIds: [SOURCE_ACTOR],
        sourceActorIds: [SOURCE_ACTOR],
      },
      {
        actor: SOURCE_ACTOR,
        revisionNumber: 2,
        createdAt: "2026-07-24T11:00:00Z",
      },
    ),
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
        id: LOCATOR_DOCUMENT_V1,
        sourceVersionId: SOURCE_VERSION_DOCUMENT_V1,
        kind: "page",
        locatorValue: "1",
        sourceSnapshot: "Dose: 10 mg",
      },
      { actor: SOURCE_ACTOR },
    ),
    revision(
      {
        id: LOCATOR_DOCUMENT_V2,
        sourceVersionId: SOURCE_VERSION_DOCUMENT_V2,
        kind: "page",
        locatorValue: "1",
        sourceSnapshot: "Dose: 20 mg",
      },
      {
        actor: SOURCE_ACTOR,
        revisionNumber: 2,
        createdAt: "2026-07-24T11:00:00Z",
      },
    ),
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
        id: importDocumentV1,
        kind: "import",
        sourceArtifactId: sourceDocument,
        sourceVersionId: SOURCE_VERSION_DOCUMENT_V1,
        importerActorId: CONNECTOR,
        occurredAt: "2026-07-24T09:00:00Z",
        sourceSystemVersion: "synthetic-clinic-v1",
        payloadFormat: "application/pdf",
        mappingContractVersion: "0.1.0",
        state: "success",
        errors: [],
        omissions: [],
      },
      { actor: SOURCE_ACTOR },
    ),
    revision(
      {
        id: importDocumentV2,
        kind: "import",
        sourceArtifactId: sourceDocument,
        sourceVersionId: SOURCE_VERSION_DOCUMENT_V2,
        importerActorId: CONNECTOR,
        occurredAt: "2026-07-24T11:00:00Z",
        sourceSystemVersion: "synthetic-clinic-v2",
        payloadFormat: "application/pdf",
        mappingContractVersion: "0.1.0",
        state: "success",
        errors: [],
        omissions: [],
      },
      {
        actor: SOURCE_ACTOR,
        revisionNumber: 2,
        createdAt: "2026-07-24T11:00:00Z",
      },
    ),
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
      id: RECORD_DOSE_V1,
      family: "observation",
      assertionClass: "imported-claim",
      temporalAssertion: { kind: "calendar-date", date: "2026-07-20" },
      payload: {
        variableId: VARIABLE_DOSE_TEXT,
        value: { kind: "text", text: "10 mg", locale: "en-US" },
      },
      sourceReferences: [
        sourceReference(
          sourceDocument,
          SOURCE_VERSION_DOCUMENT_V1,
          LOCATOR_DOCUMENT_V1,
        ),
      ],
      provenanceEventIds: [importDocumentV1],
      relationshipIds: [RELATIONSHIP_DOSE_CONFLICT],
      lifecycleState: "deleted",
    }),
    proposedRecord({
      id: RECORD_DOSE_V2,
      family: "observation",
      assertionClass: "imported-claim",
      temporalAssertion: { kind: "calendar-date", date: "2026-07-22" },
      payload: {
        variableId: VARIABLE_DOSE_TEXT,
        value: { kind: "text", text: "20 mg", locale: "en-US" },
      },
      sourceReferences: [
        sourceReference(
          sourceDocument,
          SOURCE_VERSION_DOCUMENT_V2,
          LOCATOR_DOCUMENT_V2,
        ),
      ],
      provenanceEventIds: [importDocumentV2],
      relationshipIds: [RELATIONSHIP_DOSE_CONFLICT],
    }),
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
        id: RELATIONSHIP_DOSE_CONFLICT,
        relationshipType: "conflict",
        sourceRecordIds: [RECORD_DOSE_V1, RECORD_DOSE_V2],
        targetRecordIds: [RECORD_DOSE_V1, RECORD_DOSE_V2],
        actorId: OPERATOR,
        recordedAt: "2026-07-24T11:10:00Z",
        reasonCode: "source-version-disagreement",
        reasonText: "Two source versions report different dose text.",
        sourceReferenceIds: [
          SOURCE_VERSION_DOCUMENT_V1,
          SOURCE_VERSION_DOCUMENT_V2,
        ],
        reviewState: "confirmed",
        conflictType: "source-version-disagreement",
        resolutionState: "unresolved",
      },
      { actor: OPERATOR },
    ),
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

  bundle.attachments.push(
    revision(
      {
        id: attachmentV1,
        sourceArtifactId: sourceDocument,
        sourceVersionId: SOURCE_VERSION_DOCUMENT_V1,
        targetId: RECORD_DOSE_V1,
        targetKind: "chronicle-record",
        role: "primary-evidence",
        lifecycleState: "active",
      },
      { actor: SOURCE_ACTOR },
    ),
    revision(
      {
        id: attachmentV2,
        sourceArtifactId: sourceDocument,
        sourceVersionId: SOURCE_VERSION_DOCUMENT_V2,
        targetId: RECORD_DOSE_V2,
        targetKind: "chronicle-record",
        role: "correction-support",
        lifecycleState: "active",
      },
      {
        actor: SOURCE_ACTOR,
        revisionNumber: 2,
        createdAt: "2026-07-24T11:00:00Z",
      },
    ),
  );

  bundle.exportRequests.push(
    revision({
      id: EXPORT_REQUEST,
      chronicleId: CHRONICLE,
      requestedBy: PERSON,
      requestedAt: "2026-07-24T13:00:00Z",
      formats: ["application/json", "text/markdown"],
      scope: [
        { kind: "chronicle-record", includeHistory: true },
        {
          kind: "source-version",
          includeRawRepresentation: false,
          includeHistory: true,
        },
        { kind: "provenance", includeHistory: true },
        { kind: "relationship", includeHistory: true },
      ],
      includeHumanReadable: true,
      includeMachineReadable: true,
      state: "ready",
    }),
  );
  bundle.exportPlans.push(
    revision(
      {
        id: EXPORT_PLAN,
        exportRequestId: EXPORT_REQUEST,
        includedIds: [
          RECORD_MANUAL_STEPS,
          RECORD_WEIGHT_CORRECTED,
          RECORD_WEIGHT_NORMALIZED,
          SOURCE_VERSION_WEIGHT,
          DERIVATION_WEIGHT,
          RELATIONSHIP_WEIGHT_CORRECTION,
        ],
        omittedItems: [
          {
            id: SOURCE_VERSION_DOCUMENT_V1,
            kind: "source-version",
            reason: "Retained under a synthetic exception; metadata only.",
          },
        ],
        schemaVersions: ["0.1.0"],
        generatedAt: "2026-07-24T13:01:00Z",
      },
      { actor: SERVICE },
    ),
  );
  bundle.exportManifests.push(
    revision(
      {
        id: EXPORT_MANIFEST,
        exportPlanId: EXPORT_PLAN,
        entries: [
          {
            path: "chronicle.json",
            mediaType: "application/json",
            sourceId: CHRONICLE,
          },
          { path: "README.md", mediaType: "text/markdown" },
          {
            path: "sources/weight.txt",
            mediaType: "text/plain",
            sourceId: SOURCE_VERSION_WEIGHT,
          },
        ],
        generatedAt: "2026-07-24T13:02:00Z",
        limitations: ["Synthetic fixture only."],
      },
      { actor: SERVICE },
    ),
  );
  bundle.exportArtifacts.push(
    revision(
      {
        id: EXPORT_ARTIFACT,
        exportRequestId: EXPORT_REQUEST,
        exportPlanId: EXPORT_PLAN,
        exportManifestId: EXPORT_MANIFEST,
        format: "application/zip",
        generatedAt: "2026-07-24T13:03:00Z",
        expiresAt: "2026-07-31T13:03:00Z",
        state: "ready",
      },
      { actor: SERVICE },
    ),
  );
  bundle.exportDeliveries.push(
    revision(
      {
        id: EXPORT_DELIVERY,
        exportArtifactId: EXPORT_ARTIFACT,
        deliveredToActorId: PERSON,
        deliveryMethod: "synthetic-local-copy",
        deliveredAt: "2026-07-24T13:04:00Z",
        state: "delivered",
      },
      { actor: SERVICE },
    ),
  );

  bundle.deletionRequests.push(
    revision({
      id: DELETION_REQUEST,
      chronicleId: CHRONICLE,
      requestedBy: PERSON,
      requestedAt: "2026-07-24T14:00:00Z",
      targets: [
        { kind: "chronicle-record", id: RECORD_DOSE_V1 },
        { kind: "source-version", id: SOURCE_VERSION_DOCUMENT_V1 },
      ],
      reason: "Synthetic deletion lifecycle scenario.",
      state: "partially-completed",
    }),
  );
  bundle.deletionScopeResolutions.push(
    revision(
      {
        id: DELETION_SCOPE,
        deletionRequestId: DELETION_REQUEST,
        resolvedTargets: [
          { kind: "chronicle-record", id: RECORD_DOSE_V1 },
          { kind: "source-version", id: SOURCE_VERSION_DOCUMENT_V1 },
        ],
        dependentIds: [RELATIONSHIP_DOSE_CONFLICT, attachmentV1],
        excludedTargets: [],
        resolvedAt: "2026-07-24T14:01:00Z",
      },
      { actor: OPERATOR },
    ),
  );
  bundle.retentionExceptions.push(
    revision(
      {
        id: RETENTION_EXCEPTION,
        deletionRequestId: DELETION_REQUEST,
        target: { kind: "source-version", id: SOURCE_VERSION_DOCUMENT_V1 },
        authorityReference: "synthetic-policy-reference",
        policyId: "policy.retention.synthetic-review",
        policyVersion: "1",
        reason: "Synthetic temporary review hold.",
        minimumRetainedFields: [
          "id",
          "sourceArtifactId",
          "availabilityState",
        ],
        startsAt: "2026-07-24T14:02:00Z",
        reviewAt: "2026-08-24T14:02:00Z",
        endsAt: "2026-09-24T14:02:00Z",
        accountableActorId: OPERATOR,
        appealAvailable: true,
        state: "active",
      },
      { actor: OPERATOR },
    ),
  );
  bundle.tombstones.push(
    revision(
      {
        id: TOMBSTONE,
        deletionRequestId: DELETION_REQUEST,
        deletedTargetKind: "chronicle-record",
        deletedTargetId: RECORD_DOSE_V1,
        purpose: "record-deletion-completion",
        retainedFields: {
          deletionState: "completed",
          completedAt: "2026-07-24T14:05:00Z",
        },
      },
      { actor: OPERATOR },
    ),
  );
  bundle.deletionCompletionEvidence.push(
    revision(
      {
        id: DELETION_EVIDENCE,
        deletionRequestId: DELETION_REQUEST,
        completedAt: "2026-07-24T14:05:00Z",
        completedTargets: [
          { kind: "chronicle-record", id: RECORD_DOSE_V1 },
        ],
        retainedUnderExceptionIds: [RETENTION_EXCEPTION],
        tombstoneIds: [TOMBSTONE],
        failedTargets: [],
        accountableActorId: OPERATOR,
      },
      { actor: OPERATOR },
    ),
  );

  return bundle;
}
