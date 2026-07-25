import { CHRONICLE, PERSON, SERVICE, revision } from "./common.mjs";
import {
  EXPORT_ARTIFACT,
  EXPORT_DELIVERY,
  EXPORT_MANIFEST,
  EXPORT_PLAN,
  EXPORT_REQUEST,
  SOURCE_VERSION_DOCUMENT_V1,
} from "./conflict-export-deletion-ids.mjs";
import {
  DERIVATION_WEIGHT,
  RECORD_MANUAL_STEPS,
  RECORD_WEIGHT_CORRECTED,
  RECORD_WEIGHT_NORMALIZED,
  RELATIONSHIP_WEIGHT_CORRECTION,
  SOURCE_VERSION_WEIGHT,
} from "./time-source-and-correction.mjs";

export function addExportScenario(bundle) {
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

  return bundle;
}
