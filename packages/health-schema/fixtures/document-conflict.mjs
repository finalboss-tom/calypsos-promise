import {
  CHRONICLE,
  CONNECTOR,
  OPERATOR,
  SOURCE_ACTOR,
  VARIABLE_DOSE_TEXT,
  proposedRecord,
  revision,
  sourceReference,
} from "./common.mjs";
import {
  ATTACHMENT_DOCUMENT_V1,
  ATTACHMENT_DOCUMENT_V2,
  LOCATOR_DOCUMENT_V1,
  LOCATOR_DOCUMENT_V2,
  RECORD_DOSE_V1,
  RECORD_DOSE_V2,
  RELATIONSHIP_DOSE_CONFLICT,
  SOURCE_VERSION_DOCUMENT_V1,
  SOURCE_VERSION_DOCUMENT_V2,
} from "./conflict-export-deletion-ids.mjs";

export function addDocumentConflictScenario(bundle) {
  const sourceDocument = "source.document.medication";
  const importDocumentV1 = "provenance.import.medication-v1";
  const importDocumentV2 = "provenance.import.medication-v2";

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
  );

  bundle.attachments.push(
    revision(
      {
        id: ATTACHMENT_DOCUMENT_V1,
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
        id: ATTACHMENT_DOCUMENT_V2,
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

  return bundle;
}
