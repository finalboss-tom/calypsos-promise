import { createBaseBundle } from "./common.mjs";
import {
  DELETION_EVIDENCE,
  DELETION_REQUEST,
  DELETION_SCOPE,
  EXPORT_ARTIFACT,
  EXPORT_DELIVERY,
  EXPORT_MANIFEST,
  EXPORT_PLAN,
  EXPORT_REQUEST,
  LOCATOR_DOCUMENT_V1,
  LOCATOR_DOCUMENT_V2,
  RECORD_DOSE_V1,
  RECORD_DOSE_V2,
  RECORD_REPLAY_MERGED,
  RECORD_REPLAY_ONE,
  RECORD_REPLAY_TWO,
  RELATIONSHIP_DOSE_CONFLICT,
  RELATIONSHIP_REPLAY_DUPLICATE,
  RELATIONSHIP_REPLAY_MERGE,
  RETENTION_EXCEPTION,
  SOURCE_VERSION_DOCUMENT_V1,
  SOURCE_VERSION_DOCUMENT_V2,
  TOMBSTONE,
  addConflictExportAndDeletionScenarios,
} from "./conflict-export-and-deletion.mjs";
import {
  DERIVATION_WEIGHT,
  RECORD_DEVICE_STEPS,
  RECORD_MANUAL_STEPS,
  RECORD_REFLECTION,
  RECORD_SLEEP_BOUNDED,
  RECORD_SLEEP_OPEN,
  RECORD_WEIGHT_CORRECTED,
  RECORD_WEIGHT_NORMALIZED,
  RECORD_WEIGHT_WRONG,
  RELATIONSHIP_WEIGHT_CORRECTION,
  SOURCE_VERSION_WEIGHT,
  addTimeSourceAndCorrectionScenarios,
} from "./time-source-and-correction.mjs";

const bundle = createBaseBundle();
addTimeSourceAndCorrectionScenarios(bundle);
addConflictExportAndDeletionScenarios(bundle);

export const syntheticLivingChronicleFixture = bundle;

export const syntheticScenarioCoverage = Object.freeze({
  exactDeviceTimestamp: [RECORD_DEVICE_STEPS],
  calendarDateWithoutTime: [RECORD_MANUAL_STEPS],
  approximateHistoricalRecollection: [RECORD_REFLECTION],
  openInterval: [RECORD_SLEEP_OPEN],
  boundedInterval: [RECORD_SLEEP_BOUNDED],
  manualObservation: [RECORD_MANUAL_STEPS, RECORD_WEIGHT_CORRECTED],
  importedExternalClaim: [RECORD_DOSE_V1, RECORD_DOSE_V2],
  unitNormalizationWithRawValue: [
    RECORD_WEIGHT_CORRECTED,
    RECORD_WEIGHT_NORMALIZED,
    SOURCE_VERSION_WEIGHT,
  ],
  deterministicDerivedValueWithSourceChain: [
    RECORD_WEIGHT_NORMALIZED,
    DERIVATION_WEIGHT,
  ],
  correctionWithInspectableHistory: [
    RECORD_WEIGHT_WRONG,
    RECORD_WEIGHT_CORRECTED,
    RELATIONSHIP_WEIGHT_CORRECTION,
  ],
  conflictingSources: [
    RECORD_DOSE_V1,
    RECORD_DOSE_V2,
    RELATIONSHIP_DOSE_CONFLICT,
  ],
  duplicateCandidateAndReversibleMerge: [
    RECORD_REPLAY_ONE,
    RECORD_REPLAY_TWO,
    RECORD_REPLAY_MERGED,
    RELATIONSHIP_REPLAY_DUPLICATE,
    RELATIONSHIP_REPLAY_MERGE,
  ],
  versionedDocumentWithExactLocator: [
    SOURCE_VERSION_DOCUMENT_V1,
    SOURCE_VERSION_DOCUMENT_V2,
    LOCATOR_DOCUMENT_V1,
    LOCATOR_DOCUMENT_V2,
  ],
  exportWithRecordsAndProvenance: [
    EXPORT_REQUEST,
    EXPORT_PLAN,
    EXPORT_MANIFEST,
    EXPORT_ARTIFACT,
    EXPORT_DELIVERY,
  ],
  deletionRetentionTombstoneCompletion: [
    DELETION_REQUEST,
    DELETION_SCOPE,
    RETENTION_EXCEPTION,
    TOMBSTONE,
    DELETION_EVIDENCE,
  ],
});

export const syntheticFixtureDeclaration = Object.freeze({
  fixtureId: "fixture.synthetic.living-chronicle",
  schemaVersion: "0.1.0",
  dataClassification: "synthetic",
  description:
    "A wholly synthetic Living Chronicle bundle covering the required Sprint 3 scenarios.",
  prohibitedContentAssertions: [
    "No production or private health data.",
    "No diagnosis, treatment recommendation, or causal claim.",
    "No secondary-use permission, compensation, progression, or governance effect.",
  ],
});
