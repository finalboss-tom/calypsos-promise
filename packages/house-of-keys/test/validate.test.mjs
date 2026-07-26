import assert from "node:assert/strict";
import test from "node:test";

import {
  syntheticHouseOfKeysBundle,
  validateHouseOfKeysSchemaBundle,
} from "../dist/index.js";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function issueCodes(result) {
  return new Set(result.issues.map((issue) => issue.code));
}

test("accepts the public synthetic House of Keys baseline bundle", () => {
  const result = validateHouseOfKeysSchemaBundle(syntheticHouseOfKeysBundle, {
    fixtureDataPolicy: "public-or-synthetic",
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.issues, []);
});

test("rejects private fixture data under the public fixture policy", () => {
  const bundle = clone(syntheticHouseOfKeysBundle);
  bundle.grants[0].dataClassification = "private";

  const result = validateHouseOfKeysSchemaBundle(bundle, {
    fixtureDataPolicy: "public-or-synthetic",
  });

  assert.equal(result.valid, false);
  assert.ok(issueCodes(result).has("FIXTURE_PRIVATE_DATA_FORBIDDEN"));
});

test("rejects family or blanket category authority", () => {
  const bundle = clone(syntheticHouseOfKeysBundle);
  bundle.grants[0].dataCategoryIds = ["data.chronicle.all"];
  bundle.grants[0].dataCategoryRevisions = { "data.chronicle.all": 1 };

  const result = validateHouseOfKeysSchemaBundle(bundle);

  assert.equal(result.valid, false);
  assert.ok(issueCodes(result).has("GRANT_BLANKET_SCOPE"));
});

test("rejects satisfied evidence that omits a required concept", () => {
  const bundle = clone(syntheticHouseOfKeysBundle);
  bundle.comprehensionEvidence[0].satisfiedConceptIds = ["concept.purpose"];

  const result = validateHouseOfKeysSchemaBundle(bundle);

  assert.equal(result.valid, false);
  assert.ok(issueCodes(result).has("COMPREHENSION_MISMATCH"));
});

test("rejects an explanation whose duration differs from the grant", () => {
  const bundle = clone(syntheticHouseOfKeysBundle);
  bundle.explanations[0].duration.endsAt = "2026-07-28T00:00:00Z";

  const result = validateHouseOfKeysSchemaBundle(bundle);
  assert.equal(result.valid, false);
  assert.ok(issueCodes(result).has("EXPLANATION_MISMATCH"));
});

test("rejects a receipt that references an unavailable grant revision", () => {
  const bundle = clone(syntheticHouseOfKeysBundle);
  bundle.receipts[0].grantReferences[0].grantRevision = 2;

  const result = validateHouseOfKeysSchemaBundle(bundle);
  assert.equal(result.valid, false);
  assert.ok(issueCodes(result).has("REFERENCE_DANGLING"));
});

test("rejects ordinary grant authority assigned to a non-controlling actor", () => {
  const bundle = clone(syntheticHouseOfKeysBundle);
  bundle.grants[0].grantingAuthorityId = "actor.study.requester";

  const result = validateHouseOfKeysSchemaBundle(bundle);
  assert.equal(result.valid, false);
  assert.ok(issueCodes(result).has("GRANTING_AUTHORITY_INVALID"));
});
