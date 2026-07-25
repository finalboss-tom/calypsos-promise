import assert from "node:assert/strict";
import test from "node:test";

import {
  syntheticFixtureDeclaration,
  syntheticLivingChronicleFixture,
  syntheticScenarioCoverage,
} from "../fixtures/index.mjs";
import { validateChronicleSchemaBundle } from "../dist/index.js";

const REQUIRED_SCENARIOS = [
  "exactDeviceTimestamp",
  "calendarDateWithoutTime",
  "approximateHistoricalRecollection",
  "openInterval",
  "boundedInterval",
  "manualObservation",
  "importedExternalClaim",
  "unitNormalizationWithRawValue",
  "deterministicDerivedValueWithSourceChain",
  "correctionWithInspectableHistory",
  "conflictingSources",
  "duplicateCandidateAndReversibleMerge",
  "versionedDocumentWithExactLocator",
  "exportWithRecordsAndProvenance",
  "deletionRetentionTombstoneCompletion",
];

function collectFixtureIds(bundle) {
  const ids = new Set();

  for (const collection of [
    bundle.chronicles,
    bundle.subjects,
    bundle.actors,
  ]) {
    for (const entity of collection) ids.add(entity.id);
  }

  for (const collectionName of [
    "variables",
    "categorySets",
    "unitDimensions",
    "units",
    "records",
    "sourceArtifacts",
    "sourceVersions",
    "sourceLocators",
    "provenanceEvents",
    "confirmationEvents",
    "externalReferences",
    "relationships",
    "attachments",
    "custodyReferences",
    "storedRepresentations",
    "derivedRepresentations",
    "exportRequests",
    "exportPlans",
    "exportManifests",
    "exportArtifacts",
    "exportDeliveries",
    "deletionRequests",
    "deletionScopeResolutions",
    "retentionExceptions",
    "tombstones",
    "deletionCompletionEvidence",
  ]) {
    for (const entity of bundle[collectionName]) ids.add(entity.id);
  }

  for (const categorySet of bundle.categorySets) {
    for (const category of categorySet.categories) ids.add(category.id);
  }

  return ids;
}

test("validates the comprehensive public synthetic fixture", () => {
  const result = validateChronicleSchemaBundle(
    syntheticLivingChronicleFixture,
    { fixtureDataPolicy: "public-or-synthetic" },
  );

  assert.equal(result.valid, true, JSON.stringify(result.issues, null, 2));
  assert.deepEqual(result.issues, []);
});

test("preserves validity through a JSON serialization round trip", () => {
  const portableFixture = JSON.parse(
    JSON.stringify(syntheticLivingChronicleFixture),
  );
  const result = validateChronicleSchemaBundle(portableFixture, {
    fixtureDataPolicy: "public-or-synthetic",
  });

  assert.equal(result.valid, true, JSON.stringify(result.issues, null, 2));
});

test("declares every required Sprint 3 scenario with resolvable evidence", () => {
  assert.deepEqual(Object.keys(syntheticScenarioCoverage), REQUIRED_SCENARIOS);

  const ids = collectFixtureIds(syntheticLivingChronicleFixture);
  for (const [scenario, evidenceIds] of Object.entries(
    syntheticScenarioCoverage,
  )) {
    assert.ok(evidenceIds.length > 0, `${scenario} has no fixture evidence`);
    for (const evidenceId of evidenceIds) {
      assert.ok(
        ids.has(evidenceId),
        `${scenario} references missing ${evidenceId}`,
      );
    }
  }
});

test("declares the fixture synthetic and free of product incentives", () => {
  assert.equal(syntheticFixtureDeclaration.dataClassification, "synthetic");
  assert.equal(syntheticFixtureDeclaration.schemaVersion, "0.1.0");
  assert.ok(
    syntheticFixtureDeclaration.prohibitedContentAssertions.some((statement) =>
      statement.includes("No production or private health data"),
    ),
  );
  assert.ok(
    syntheticFixtureDeclaration.prohibitedContentAssertions.some((statement) =>
      statement.includes("progression, or governance effect"),
    ),
  );
});
