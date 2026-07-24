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
export const LOCATOR_DOCUMENT_V1 = "locator.document.medication.v1.page-one";
export const LOCATOR_DOCUMENT_V2 = "locator.document.medication.v2.page-one";

export const RELATIONSHIP_DOSE_CONFLICT = "relationship.conflict.medication";
export const RELATIONSHIP_REPLAY_DUPLICATE = "relationship.duplicate.steps";
export const RELATIONSHIP_REPLAY_MERGE = "relationship.merge.steps";

export const EXPORT_REQUEST = "export-request.synthetic.full";
export const EXPORT_PLAN = "export-plan.synthetic.full";
export const EXPORT_MANIFEST = "export-manifest.synthetic.full";
export const EXPORT_ARTIFACT = "export-artifact.synthetic.full";
export const EXPORT_DELIVERY = "export-delivery.synthetic.full";

export const DELETION_REQUEST = "deletion-request.synthetic.medication-v1";
export const DELETION_SCOPE = "deletion-scope.synthetic.medication-v1";
export const RETENTION_EXCEPTION =
  "retention-exception.synthetic.medication-v1";
export const TOMBSTONE = "tombstone.synthetic.medication-v1";
export const DELETION_EVIDENCE = "deletion-evidence.synthetic.medication-v1";

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
        relationsh\\Nˆ˜ÛÛ™›Xİ‹ˆÛİ\˜ÙT™XÛÜ™YÎˆÔ‘PÓÔ‘ÑÔÑWÕŒK‘PÓÔ‘ÑÔÑWÕŒ—Kˆ\™Ù]™XÛÜ™YÎˆÔ‘PÓÔ‘ÑÔÑWÕŒK‘PÓÔ‘ÑÔÑWÕŒ—KˆXİÜ’YˆÔTUÔ‹ˆ™XÛÜ™Y]ˆŒŒ‹LËLLNŒLŒˆ‹ˆ™X\ÛÛÛÙNˆœÛİ\˜ÙK]™\œÚ[Û‹Y\ØYÜ™Y[Y[‹ˆ™X\ÛÛ•^ˆ•ÛÈÛİ\˜ÙH™\œÚ[ÛœÈ™\ÜY™™\™[ÜÙH^ˆ‹ˆÛİ\˜ÙT™Y™\™[˜ÙRYÎˆÂˆÓÕTÑWÕ‘T”ÒSÓ—ÑĞÕSQS•ÕŒKˆÓÕTÑWÕ‘T”ÒSÓ—ÑĞÕSQS•ÕŒ‹ˆKˆ™]šY]Ôİ]Nˆ˜ÛÛ™š\›YY‹ˆÛÛ™›Xİ\NˆœÛİ\˜ÙK]™\œÚ[Û‹Y\ØYÜ™Y[Y[‹ˆ™\ÛÛ][Û”İ]Nˆ[œ™\ÛÛ™Y‹ˆKˆÈXİÜˆÔTUÔˆKˆ
Kˆ™]š\Ú[ÛŠˆÂˆYˆ‘SUSÓ”ÒTÔ‘TVWÑTPĞUKˆ™[][ÛœÚ\\Nˆ™\XØ]KXØ[™Y]H‹ˆÛİ\˜ÙT™XÛÜ™YÎˆÔ‘PÓÔ‘Ô‘TVWÓÓ‘K‘PÓÔ‘Ô‘TVWÕÓ×Kˆ\™Ù]™XÛÜ™YÎˆÔ‘PÓÔ‘Ô‘TVWÓÓ‘K‘PÓÔ‘Ô‘TVWÕÓ×KˆXİÜ’YˆÓÓ“‘PÕÔ‹ˆ™XÛÜ™Y]ˆŒŒ‹LËLLŒŒŒˆ‹ˆ™X\ÛÛÛÙNˆ˜ÛÛ›™XİÜ‹\™\^H‹ˆXÚ\Ú[Û“Y]ÙYˆ›Y]Ù™\XØ]K˜ÛÛ›™XİÜ‹\™\^H‹ˆXÚ\Ú[Û“Y]Ù™\œÚ[ÛˆŒH‹ˆ™]šY]Ôİ]Nˆœ›ÜÜÙY‹ˆÛÛ™šY[˜ÙNˆKˆ]Xİ[Û‘]šY[˜ÙNˆÂˆœØ[YHÛİ\˜ÙH]™[[YH‹ˆœØ[YH˜[YH‹ˆ˜ÛÛ›™XİÜˆ™\^HÙ\]Y[˜ÙH‹ˆKˆKˆÈXİÜˆÓÓ“‘PÕÔˆKˆ
Kˆ™]š\Ú[ÛŠˆÂˆYˆ‘SUSÓ”ÒTÔ‘TVWÓQT‘ÑKˆ™[][ÛœÚ\\Nˆ›Y\™ÙH‹ˆÛİ\˜ÙT™XÛÜ™YÎˆÔ‘PÓÔ‘Ô‘TVWÓÓ‘K‘PÓÔ‘Ô‘TVWÕÓ×Kˆ\™Ù]™XÛÜ™YÎˆÔ‘PÓÔ‘Ô‘TVWÓQT‘ÑQKˆXİÜ’YˆÔTUÔ‹ˆ™XÛÜ™Y]ˆŒŒ‹LËLLŒÌŒˆ‹ˆ™X\ÛÛÛÙNˆ˜ÛÛ™š\›YY\™\^KXÛÛ\ÜÚ]H‹ˆ™X\ÛÛ•^‚ˆÜ™X]HH›Û‹Y\İXİ]™HÛÛ\ÜÚ]HÚ[H™\Ù\š[™È›İÛİ\˜ÙHÚZ[œËˆ‹ˆÛİ\˜ÙT™Y™\™[˜ÙRYÎˆÜÛİ\˜ÙT™\^UŒKÛİ\˜ÙT™\^UŒ—Kˆ™]šY]Ôİ]Nˆ˜ÛÛ™š\›YY‹ˆİ]]™XÛÜ™Yˆ‘PÓÔ‘Ô‘TVWÓQT‘ÑQˆY\™ÙTÛXŞRYˆœÛXŞK›Y\™ÙK˜ÛÛ›™XİÜ‹\™\^H‹ˆY\™ÙTÛXŞU™\œÚ[ÛˆŒH‹ˆ™]Z[™YšY[ĞT™XÛÜ™ˆÂˆÔ‘PÓÔ‘Ô‘TVWÓÓ‘WNˆÈœÛİ\˜ÙT™Y™\™[˜Ù\È—KˆÔ‘PÓÔ‘Ô‘TVWÕÓ×NˆÈœÛİ\˜ÙT™Y™\™[˜Ù\È—KˆKˆ[œ™\ÛÛ™YšY[Îˆ×Kˆ™]™\œÚX›NˆYKˆKˆÈXİÜˆÔTUÔˆKˆ
Kˆ
NÂ‚ˆ[™K˜]XÚY[Ëœ\Ú
ˆ™]š\Ú[ÛŠˆÂˆYˆ]XÚY[ŒKˆÛİ\˜ÙP\Y˜XİYˆÛİ\˜ÙQØİ[Y[ˆÛİ\˜ÙU™\œÚ[Û’YˆÓÕTÑWÕ‘T”ÒSÓ—ÑĞÕSQS•ÕŒKˆ\™Ù]Yˆ‘PÓÔ‘ÑÔÑWÕŒKˆ\™Ù]Ú[™ˆ˜Ú›ÛšXÛK\™XÛÜ™‹ˆ›ÛNˆœš[X\KY]šY[˜ÙH‹ˆY™XŞXÛTİ]Nˆ˜Xİ]™H‹ˆKˆÂˆXİÜˆÓÕTÑWĞPÕÔˆKˆ
Kˆ™]š\Ú[ÛŠˆÂˆYˆ]XÚY[Œ‹ˆÛİ\˜ÙP\Y˜XİYˆÛİ\˜ÙQØİ[Y[ˆÛİ\˜ÙU™\œÚ[Û’YˆÓÕTÑWÕ‘T”ÒSÓ—ÑĞÕSQS•ÕŒ‹ˆ\™Ù]Yˆ‘PÓÔ‘ÑÔÑWÕŒ‹ˆ\™Ù]Ú[™ˆ˜Ú›ÛšXÛK\™XÛÜ™‹ˆ›ÛNˆ˜ÛÜœ™Xİ[Û‹\İ\Ü‹ˆY™XŞXÛTİ]Nˆ˜Xİ]™H‹ˆKˆÂˆXİÜˆÓÕTÑWĞPÕÔ‹ˆ™]š\Ú[Û“[X™\ˆ‹ˆÜ™X]Y]ˆŒŒ‹LËLLNŒŒˆ‹ˆKˆ
Kˆ
NÂ‚ˆ[™K™^Ü™\]Y\İËœ\Ú
ˆ™]š\Ú[ÛŠÂˆYˆVÔ•Ô‘TUQTÕˆÚ›ÛšXÛRYˆÒ“Ó’PÓKˆ™\]Y\İYNˆT”ÓÓ‹ˆ™\]Y\İY]ˆŒŒ‹LËLLÎŒŒˆ‹ˆ›Ü›X]ÎˆÈ˜\XØ][Û‹ÚœÛÛˆ‹^ÛX\šÙİÛˆ—KˆØÛÜNˆÂˆÈÚ[™ˆ˜Ú›ÛšXÛK\™XÛÜ™‹[˜ÛYR\İÜNˆYHKˆÂˆÚ[™ˆœÛİ\˜ÙK]™\œÚ[Ûˆ‹ˆ[˜ÛYT˜]Ô™\™\Ù[][Ûˆ˜[ÙKˆ[˜ÛYR\İÜNˆYKˆKˆÈÚ[™ˆœ›İ™[˜[˜ÙH‹[˜ÛYR\İÜNˆYHKˆÈÚ[™ˆœ™[][ÛœÚ\‹[˜ÛYR\İÜNˆYHKˆKˆ[˜ÛYR[X[”™XYX›NˆYKˆ[˜ÛYSXXÚ[™T™XYX›NˆYKˆİ]Nˆœ™XYH‹ˆJKˆ
NÂˆ[™K™^Ü[œËœ\Ú
ˆ™]š\Ú[ÛŠˆÂˆYˆVÔ•ÔS‹ˆ^Ü™\]Y\İYˆVÔ•Ô‘TUQTÕˆ[˜ÛYYYÎˆÂˆ‘PÓÔ‘ÓPS•PSÔÕTËˆ‘PÓÔ‘ÕÑRQÒĞÓÔ”‘PÕQˆ‘PÓÔ‘ÕÑRQÒÓ“Ô“PSV‘QˆÓÕTÑWÕ‘T”ÒSÓ—ÕÑRQÒˆT’UUSÓ—ÕÑRQÒˆ‘SUSÓ”ÒTÕÑRQÒĞÓÔ”‘PÕSÓ‹ˆKˆÛZ]Y][\ÎˆÂˆÂˆYˆÓÕTÑWÕ‘T”ÒSÓ—ÑĞÕSQS•ÕŒKˆÚ[™ˆœÛİ\˜ÙK]™\œÚ[Ûˆ‹ˆ™X\ÛÛˆ”™]Z[™Y[™\ˆHŞ[]XÈ^Ù\[ÛÈY]Y]HÛ›Kˆ‹ˆKˆKˆØÚ[XU™\œÚ[ÛœÎˆÈŒŒKŒ—KˆÙ[™\˜]Y]ˆŒŒ‹LËLLÎŒNŒˆ‹ˆKˆÈXİÜˆÑT•’PÑHKˆ
Kˆ
NÂˆ[™K™^ÜX[šY™\İËœ\Ú
ˆ™]š\Ú[ÛŠˆÂˆYˆVÔ•ÓPS’Q‘TÕˆ^Ü[’YˆVÔ•ÔS‹ˆ[šY\ÎˆÂˆÂˆ]ˆ˜Ú›ÛšXÛKšœÛÛˆ‹ˆYYXU\Nˆ˜\XØ][Û‹ÚœÛÛˆ‹ˆÛİ\˜ÙRYˆÒ“Ó’PÓKˆKˆÈ]ˆ”‘PQQK›Y‹YYXU\Nˆ^ÛX\šÙİÛˆˆKˆÂˆ]ˆœÛİ\˜Ù\ËİÙZYÚ‹ˆYYXU\Nˆ^ÜZ[ˆ‹ˆÛİ\˜ÙRYˆÓÕTÑWÕ‘T”ÒSÓ—ÕÑRQÒˆKˆKˆÙ[™\˜]Y]ˆŒŒ‹LËLLÎŒŒˆ‹ˆ[Z]][ÛœÎˆÈ”Ş[]XÈš^\™HÛ›Kˆ—KˆKˆÈXİÜˆÑT•’PÑHKˆ
Kˆ
NÂˆ[™K™^Ü\Y˜XİËœ\Ú
ˆ™]š\Ú[ÛŠˆÂˆYˆVÔ•ĞT•QPÕˆ^Ü™\]Y\İYˆVÔ•Ô‘TUQTÕˆ^Ü[’YˆVÔ•ÔS‹ˆ^ÜX[šY™\İYˆVÔ•ÓPS’Q‘TÕˆ›Ü›X]ˆ˜\XØ][Û‹Şš\‹ˆÙ[™\˜]Y]ˆŒŒ‹LËLLÎŒÎŒˆ‹ˆ^\™\Ğ]ˆŒŒ‹LËLÌULÎŒÎŒˆ‹ˆİ]Nˆœ™XYH‹ˆKˆÈXİÜˆÑT•’PÑHKˆ
Kˆ
NÂˆ[™K™^Ü[]™\šY\Ëœ\Ú
ˆ™]š\Ú[ÛŠˆÂˆYˆVÔ•ÑSU‘T–Kˆ^Ü\Y˜XİYˆVÔ•ĞT•QPÕˆ[]™\™YĞXİÜ’YˆT”ÓÓ‹ˆ[]™\SY]ÙˆœŞ[]XË[ØØ[XÛÜH‹ˆ[]™\™Y]ˆŒŒ‹LËLLÎŒŒˆ‹ˆİ]Nˆ™[]™\™Y‹ˆKˆÈXİÜˆÑT•’PÑHKˆ
Kˆ
NÂ‚ˆ[™K™[][Û”™\]Y\İËœ\Ú
ˆ™]š\Ú[ÛŠÂˆYˆSUSÓ—Ô‘TUQTÕˆÚ›ÛšXÛRYˆÒ“Ó’PÓKˆ™\]Y\İYNˆT”ÓÓ‹ˆ™\]Y\İY]ˆŒŒ‹LËLMŒŒˆ‹ˆ\™Ù]ÎˆÂˆÈÚ[™ˆ˜Ú›ÛšXÛK\™XÛÜ™‹Yˆ‘PÓÔ‘ÑÔÑWÕŒHKˆÈÚ[™ˆœÛİ\˜ÙK]™\œÚ[Ûˆ‹YˆÓÕTÑWÕ‘T”ÒSÓ—ÑĞÕSQS•ÕŒHKˆKˆ™X\ÛÛˆ”Ş[]XÈ[][ÛˆY™XŞXÛHØÙ[˜\š[Ëˆ‹ˆİ]Nˆœ\X[KXÛÛ\]Y‹ˆJKˆ
NÂˆ[™K™[][Û”ØÛÜT™\ÛÛ][ÛœËœ\Ú
ˆ™]š\Ú[ÛŠˆÂˆYˆSUSÓ—ÔĞÓÔKˆ[][Û”™\]Y\İYˆSUSÓ—Ô‘TUQTÕˆ™\ÛÛ™Y\™Ù]ÎˆÂˆÈÚ[™ˆ˜Ú›ÛšXÛK\™XÛÜ™‹Yˆ‘PÓÔ‘ÑÔÑWÕŒHKˆÈÚ[™ˆœÛİ\˜ÙK]™\œÚ[Ûˆ‹YˆÓÕTÑWÕ‘T”ÒSÓ—ÑĞÕSQS•ÕŒHKˆKˆ\[™[YÎˆÔ‘SUSÓ”ÒTÑÔÑWĞÓÓ‘“PÕ]XÚY[ŒWKˆ^ÛYY\™Ù]Îˆ×Kˆ™\ÛÛ™Y]ˆŒŒ‹LËLMŒNŒˆ‹ˆKˆÈXİÜˆÔTUÔˆKˆ
Kˆ
NÂˆ[™Kœ™][[Û‘^Ù\[ÛœËœ\Ú
ˆ™]š\Ú[ÛŠˆÂˆYˆ‘US•SÓ—ÑVÑTSÓ‹ˆ[][Û”™\]Y\İYˆSUSÓ—Ô‘TUQTÕˆ\™Ù]ˆÈÚ[™ˆœÛİ\˜ÙK]™\œÚ[Ûˆ‹YˆÓÕTÑWÕ‘T”ÒSÓ—ÑĞÕSQS•ÕŒHKˆ]]Üš]T™Y™\™[˜ÙNˆœŞ[]XË\ÛXŞK\™Y™\™[˜ÙH‹ˆÛXŞRYˆœÛXŞKœ™][[Û‹œŞ[]XË\™]šY]È‹ˆÛXŞU™\œÚ[ÛˆŒH‹ˆ™X\ÛÛˆ”Ş[]XÈ[\Ü˜\H™]šY]ÈÛˆ‹ˆZ[š[][T™]Z[™YšY[ÎˆÈšY‹œÛİ\˜ÙP\Y˜XİY‹˜]˜Z[Xš[]Tİ]H—Kˆİ\Ğ]ˆŒŒ‹LËLMŒŒˆ‹ˆ™]šY]Ğ]ˆŒŒ‹LLMŒŒˆ‹ˆ[™Ğ]ˆŒŒ‹LKLMŒŒˆ‹ˆXØÛİ[X›PXİÜ’YˆÔTUÔ‹ˆ\X[]˜Z[X›NˆYKˆİ]Nˆ˜Xİ]™H‹ˆKˆÈXİÜˆÔTUÔˆKˆ
Kˆ
NÂˆ[™KÛXœİÛ™\Ëœ\Ú
ˆ™]š\Ú[ÛŠˆÂˆYˆÓP”ÕÓ‘Kˆ[][Û”™\]Y\İYˆSUSÓ—Ô‘TUQTÕˆ[]Y\™Ù]Ú[™ˆ˜Ú›ÛšXÛK\™XÛÜ™‹ˆ[]Y\™Ù]Yˆ‘PÓÔ‘ÑÔÑWÕŒKˆ\œÜÙNˆœ™XÛÜ™Y[][Û‹XÛÛ\][Ûˆ‹ˆ™]Z[™YšY[ÎˆÂˆ[][Û”İ]Nˆ˜ÛÛ\]Y‹ˆÛÛ\]Y]ˆŒŒ‹LËLMŒNŒˆ‹ˆKˆKˆÈXİÜˆÔTUÔˆKˆ
Kˆ
NÂˆ[™K™[][ÛÛÛ\][Û‘]šY[˜ÙKœ\Ú
ˆ™]š\Ú[ÛŠˆÂˆYˆSUSÓ—ÑU’QSÑKˆ[][Û”™\]Y\İYˆSUSÓ—Ô‘TUQTÕˆÛÛ\]Y]ˆŒŒ‹LËLMŒNŒˆ‹ˆÛÛ\]Y\™Ù]ÎˆŞÈÚ[™ˆ˜Ú›ÛšXÛK\™XÛÜ™‹Yˆ‘PÓÔ‘ÑÔÑWÕŒHWKˆ™]Z[™Y[™\‘^Ù\[Û’YÎˆÔ‘US•SÓ—ÑVÑTSÓ—KˆÛXœİÛ™RYÎˆÕÓP”ÕÓ‘WKˆ˜Z[Y\™Ù]Îˆ×KˆXØÛİ[X›PXİÜ’YˆÔTUÔ‹ˆKˆÈXİÜˆÔTUÔˆKˆ
Kˆ
NÂ‚ˆ™]\›ˆ[™NÂŸB