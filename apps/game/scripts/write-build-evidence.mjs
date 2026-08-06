import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { createUnsignedBuildEvidence } from "../src/operations/build-release-operations.mjs";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(gameRoot, "../..");
const distRoot = join(gameRoot, "dist");

function argument(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) {
    throw new TypeError(`missing required argument ${name}`);
  }
  return process.argv[index + 1];
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function listFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

const sourceRevision = argument("--source");
const files = listFiles(distRoot)
  .filter((path) => relative(distRoot, path) !== "build-evidence.json")
  .map((path) => {
    const content = readFileSync(path);
    return {
      path: relative(distRoot, path).replaceAll("\\", "/"),
      sha256: sha256(content),
      bytes: content.byteLength,
    };
  });

const evidence = createUnsignedBuildEvidence({
  sourceRevision,
  lockfileSha256: sha256(readFileSync(join(repositoryRoot, "pnpm-lock.yaml"))),
  files,
});

writeFileSync(
  join(distRoot, "build-evidence.json"),
  `${JSON.stringify(evidence, null, 2)}
`,
);
console.log(
  `Unsigned build evidence written for ${files.length} artifacts at ${sourceRevision}.`,
);
