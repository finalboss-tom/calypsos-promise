import assert from "node:assert/strict";
import test from "node:test";

import {
  syntheticLivingChronicleFixture as bundle,
  syntheticScenarioCoverage as coverage,
} from "../fixtures/index.mjs";

const byId = (collection, id) => collection.find((entity) => entity.id === id);

test("keeps imported claims proposed and human confirmation explicit", () => {
  const deviceRecord = byId(bundle.records, coverage.exactDeviceTimestamp[0]);
  assert.equal(deviceRecord.authorityState, "proposed");
  assert.equal(deviceRecord.assertionClass, "imported-claim");
  assert.equal(deviceRecord.confirmationEventId, undefined);

  for (const recordId of coverage.importedExternalClaim) {
    const record = byId(bundle.records, recordId);
    assert.equal(record.authorityState, "proposed");
    assert.equal(record.assertionClass, "imported-claim");
  }
});

test("preserves correction history, raw source truth, and derivation provenance", () => {
  const [wrongId, correctedId, correctionId] =
    coverage.correctionWithInspectableHistory;
  const wrong = byId(bundle.records, wrongId);
  const corrected = byId(bundle.records, correctedId);
  const correction = byId(bundle.relationships, correctionId);

  assert.equal(wrong.lifecycleState, "superseded");
  assert.equal(corrected.lifecycleState, "active");
  assert.deepEqual(correction.sourceRecordIds, [wrongId]);
  assert.deepEqual(correction.targetRecordIds, [correctedId]);
  assert.ok(wrong.relationshipIds.includes(correctionId));
  assert.ok(corrected.relationshipIds.includes(correctionId));

  const correctedValue = corrected.payload.value;
  assert.equal(correctedValue.kind, "quantity");
  assert.equal(correctedValue.magnitude, "180");
  assert.equal(correctedValue.sourceText, "180 lb");

  const sourceReference = corrected.sourceReferences[0];
  const locator = byId(
    bundle.sourceLocators,
    sourceReference.sourceLocatorIds[0],
  );
  assert.equal(locator.sourceSnapshot, "180 lb");

  const normalizedId = coverage.deterministicDerivedValueWithSourceChain[0];
  const normalized = byId(bundle.records, normalizedId);
  assert.equal(normalized.family, "derived");
  assert.equal(normalized.authorityState, "proposed");
  assert.ok(normalized.payload.inputRecordIds.includes(correctedId));
  assert.ok(normalized.provenanceEventIds.length >= 2);

  const provenanceKinds = normalized.provenanceEventIds.map(
    (id) => byId(bundle.provenanceEvents, id).kind,
  );
  assert.ok(provenanceKinds.includes("transformation"));
  assert.ok(provenanceKinds.includes("derivation"));
});

test("keeps conflict and duplicate decisions visible and non-destructive", () => {
  const [doseOneId, doseTwoId, conflictId] = coverage.conflictingSources;
  const conflict = byId(bundle.relationships, conflictId);
  assert.equal(conflict.relationshipType, "conflict");
  assert.equal(conflict.resolutionState, "unresolved");
  assert.deepEqual(
    new Set(conflict.sourceRecordIds),
    new Set([doseOneId, doseTwoId]),
  );

  const doseVersions = [doseOneId, doseTwoId].map(
    (id) => byId(bundle.records, id).sourceReferences[0].sourceVersionId,
  );
  assert.equal(new Set(doseVersions).size, 2);

  const [replayOneId, replayTwoId, mergedId, duplicateId, mergeId] =
    coverage.duplicateCandidateAndReversibleMerge;
  const duplicate = byId(bundle.relationships, duplicateId);
  const merge = byId(bundle.relationships, mergeId);

  assert.equal(duplicate.relationshipType, "duplicate-candidate");
  assert.equal(merge.relationshipType, "merge");
  assert.equal(merge.reversible, true);
  assert.equal(merge.outputRecordId, mergedId);
  assert.ok(byId(bundle.records, replayOneId));
  assert.ok(byId(bundle.records, replayTwoId));
  assert.ok(byId(bundle.records, mergedId));
  assert.notEqual(byId(bundle.records, replayOneId).lifecycleState, "deleted");
  assert.notEqual(byId(bundle.records, replayTwoId).lifecycleState, "deleted");
});

test("keeps export and deletion as independent inspectable lifecycles", () => {
  const [requestId, planId, manifestId, artifactId, deliveryId] =
    coverage.exportWithRecordsAndProvenance;
  const request = byId(bundle.exportRequests, requestId);
  const plan = byId(bundle.exportPlans, planId);
  const manifest = byId(bundle.exportManifests, manifestId);
  const artifact = byId(bundle.exportArtifacts, artifactId);
  const delivery = byId(bundle.exportDeliveries, deliveryId);

  assert.equal(request.includeHumanReadable, true);
  assert.equal(request.includeMachineReadable, true);
  assert.equal(plan.exportRequestId, requestId);
  assert.equal(manifest.exportPlanId, planId);
  assert.equal(artifact.exportRequestId, requestId);
  assert.equal(artifact.exportPlanId, planId);
  assert.equal(artifact.exportManifestId, manifestId);
  assert.equal(delivery.exportArtifactId, artifactId);
  assert.ok(plan.omittedItems.length > 0);

  const [deletionId, scopeId, exceptionId, tombstoneId, evidenceId] =
    coverage.deletionRetentionTombstoneCompletion;
  const deletion = byId(bundle.deletionRequests, deletionId);
  const scope = byId(bundle.deletionScopeResolutions, scopeId);
  const exception = byId(bundle.retentionExceptions, exceptionId);
  const tombstone = byId(bundle.tombstones, tombstoneId);
  const evidence = byId(bundle.deletionCompletionEvidence, evidenceId);

  assert.equal(deletion.state, "partially-completed");
  assert.equal(scope.deletionRequestId, deletionId);
  assert.equal(exception.deletionRequestId, deletionId);
  assert.equal(exception.state, "active");
  assert.deepEqual(Object.keys(tombstone.retainedFields).sort(), [
    "completedAt",
    "deletionState",
  ]);
  assert.equal(evidence.deletionRequestId, deletionId);
  assert.ok(evidence.retainedUnderExceptionIds.includes(exceptionId));
  assert.ok(evidence.tombstoneIds.includes(tombstoneId));
});

test("keeps bounded product and institutional truths outside the Chronicle bundle", () => {
  for (const forbiddenDomain of [
    "story",
    "quests",
    "progression",
    "consent",
    "receipts",
    "aiMemory",
    "research",
    "compensation",
    "governance",
  ]) {
    assert.equal(
      Object.hasOwn(bundle, forbiddenDomain),
      false,
      `${forbiddenDomain} leaked into Chronicle truth`,
    );
  }
});
