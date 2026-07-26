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
