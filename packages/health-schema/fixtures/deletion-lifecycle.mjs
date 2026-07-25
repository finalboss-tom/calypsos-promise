import {
  CHRONICLE,
  OPERATOR,
  PERSON,
  revision,
} from "./common.mjs";
import {
  ATTACHMENT_DOCUMENT_V1,
  DELETION_EVIDENCE,
  DELETION_REQUEST,
  DELETION_SCOPE,
  RECORD_DOSE_V1,
  RELATIONSHIP_DOSE_CONFLICT,
  RETENTION_EXCEPTION,
  SOURCE_VERSION_DOCUMENT_V1,
  TOMBSTONE,
} from "./conflict-export-deletion-ids.mjs";

export function addDeletionScenario(bundle) {
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
        dependentIds: [RELATIONSHIP_DOSE_CONFLICT, ATTACHMENT_DOCUMENT_V1],
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
        minimumRetainedFields: ["id", "sourceArtifactId", "availabilityState"],
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
        completedTargets: [{ kind: "chronicle-record", id: RECORD_DOSE_V1 }],
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
