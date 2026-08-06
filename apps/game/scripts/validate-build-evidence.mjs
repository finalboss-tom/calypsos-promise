import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { validateBuildEvidence } from "../src/operations/build-release-operations.mjs";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function argument(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) {
    throw new TypeError(`missing required argument ${name}`);
  }
  return process.argv[index + 1];
}

const evidencePath = resolve(gameRoot, argument("--path"));
const sourceRevision = argument("--source");
const evidence = JSON.parse(readFileSync(evidencePath, "utf8"));
const result = validateBuildEvidence(evidence, sourceRevision);
assert.equal(result.ok, true, result.reason);
assert.equal(result.releaseAuthorized, false);
console.log(
  `Unsigned build evidence validated for ${evidence.artifacts.length} artifacts at ${sourceRevision}.`,
);
