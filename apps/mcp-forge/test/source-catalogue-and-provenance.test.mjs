import assert from "node:assert/strict";
import { mkdir, mkdtemp, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  FORGE_SOURCE_CATALOGUE,
  FORGE_SOURCE_ERROR_CODES,
  ForgeSourceError,
  ForgeSourceRepository,
  createForgeLineRangeLocator,
  createForgeObjectIdLocator,
  normalizeForgeSourceRelativePath,
  validateForgeSourceCatalogue,
} from "../dist/index.js";

const makeRepo = async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "forge-source-"));
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({ name: "calypsos-promise" }),
  );
  await writeFile(
    path.join(root, "pnpm-workspace.yaml"),
    "packages:\n  - apps/*\n",
  );
  await writeFile(path.join(root, "README.md"), "# Root\n");
  await mkdir(path.join(root, "docs", "architecture"), { recursive: true });
  await mkdir(path.join(root, "content"), { recursive: true });
  for (const name of [
    "content-schema",
    "health-schema",
    "house-of-keys",
    "aster",
  ]) {
    await mkdir(path.join(root, "packages", name, "src"), { recursive: true });
    await writeFile(
      path.join(root, "packages", name, "src", "index.ts"),
      `export const ${name.replaceAll("-", "_")} = true;\n`,
    );
  }
  await writeFile(
    path.join(root, "docs", "architecture", "b.md"),
    "b\nsecond\n",
  );
  await writeFile(path.join(root, "docs", "architecture", "a.md"), "a\n");
  await writeFile(path.join(root, "docs", ".env"), "SECRET=1\n");
  await writeFile(path.join(root, "content", "quest.json"), '{"id":"q1"}\n');
  return root;
};

test("catalogue validates and every root remains unexposed", () => {
  assert.deepEqual(validateForgeSourceCatalogue(FORGE_SOURCE_CATALOGUE), []);
  assert.ok(
    FORGE_SOURCE_CATALOGUE.every(
      (entry) => entry.toolExposure === "not-exposed",
    ),
  );
  assert.ok(
    FORGE_SOURCE_CATALOGUE.every(
      (entry) => entry.callerCanSelectRoot === false,
    ),
  );
});

test("process discovery resolves the repository from a nested working directory", async () => {
  const root = await makeRepo();
  const nested = path.join(root, "docs", "architecture");
  const original = process.cwd();
  process.chdir(nested);
  try {
    const repository =
      await ForgeSourceRepository.fromProcessWorkingDirectory();
    assert.equal(repository.identity.rootKind, "process-discovered");
    assert.equal(repository.identity.callerCanSelectRoot, false);
  } finally {
    process.chdir(original);
  }
});

test("allowlisted reads return stable digest and non-authoritative provenance", async () => {
  const root = await makeRepo();
  const repository = await ForgeSourceRepository.forSyntheticTests(root);
  const result = await repository.readText({
    sourceRootId: "forge.docs",
    relativePath: "architecture/b.md",
  });
  assert.equal(result.content, "b\nsecond\n");
  assert.match(result.provenance.contentDigest, /^sha256:[a-f0-9]{64}$/);
  assert.equal(
    result.provenance.repositoryRelativePath,
    "docs/architecture/b.md",
  );
  assert.equal(result.provenance.lineCount, 3);
  assert.equal(result.provenance.sourceAuthority, "evidence-only");
  assert.equal(result.provenance.canCreateTruth, false);
  assert.equal(result.provenance.canCreatePermission, false);
});

test("root documents use an exact-file allowlist", async () => {
  const root = await makeRepo();
  const repository = await ForgeSourceRepository.forSyntheticTests(root);
  const result = await repository.readText({
    sourceRootId: "forge.root-documents",
    relativePath: "README.md",
  });
  assert.equal(result.provenance.repositoryRelativePath, "README.md");
  await assert.rejects(
    repository.readText({
      sourceRootId: "forge.root-documents",
      relativePath: "package.json",
    }),
    (error) =>
      error instanceof ForgeSourceError &&
      error.code === FORGE_SOURCE_ERROR_CODES.pathNotAllowlisted,
  );
});

test("plain, encoded, double-encoded, backslash, absolute, and URI traversal fail closed", () => {
  const cases = [
    "../README.md",
    "%2e%2e/README.md",
    "%252e%252e/README.md",
    "..\\README.md",
    "/etc/passwd",
    "C:\\Windows\\system.ini",
    "file:///etc/passwd",
  ];
  for (const value of cases) {
    assert.throws(
      () => normalizeForgeSourceRelativePath(value),
      ForgeSourceError,
    );
  }
});

test("prohibited files are not readable even under an allowlisted root", async () => {
  const root = await makeRepo();
  const repository = await ForgeSourceRepository.forSyntheticTests(root);
  await assert.rejects(
    repository.readText({
      sourceRootId: "forge.docs",
      relativePath: ".env",
    }),
    (error) =>
      error instanceof ForgeSourceError &&
      error.code === FORGE_SOURCE_ERROR_CODES.pathProhibited,
  );
});

test("symlink files and symlink directories are rejected without leaking host paths", async () => {
  const root = await makeRepo();
  const outside = await mkdtemp(path.join(os.tmpdir(), "forge-outside-"));
  await writeFile(path.join(outside, "secret.md"), "secret\n");
  await symlink(
    path.join(outside, "secret.md"),
    path.join(root, "docs", "linked.md"),
  );
  await symlink(outside, path.join(root, "docs", "linked-dir"));
  const repository = await ForgeSourceRepository.forSyntheticTests(root);

  for (const relativePath of ["linked.md", "linked-dir/secret.md"]) {
    await assert.rejects(
      repository.readText({ sourceRootId: "forge.docs", relativePath }),
      (error) => {
        assert.ok(error instanceof ForgeSourceError);
        assert.equal(error.code, FORGE_SOURCE_ERROR_CODES.symlinkRejected);
        assert.equal(error.message.includes(root), false);
        assert.equal(JSON.stringify(error.publicDetails).includes(root), false);
        return true;
      },
    );
  }
});

test("file listing is deterministic and carries digest and whole-file locators", async () => {
  const root = await makeRepo();
  const repository = await ForgeSourceRepository.forSyntheticTests(root);
  const result = await repository.listFiles({
    sourceRootId: "forge.docs",
    relativeDirectory: "architecture",
  });
  assert.deepEqual(
    result.items.map((item) => item.repositoryRelativePath),
    ["docs/architecture/a.md", "docs/architecture/b.md"],
  );
  assert.ok(
    result.items.every((item) =>
      /^sha256:[a-f0-9]{64}$/.test(item.contentDigest),
    ),
  );
  assert.ok(result.items.every((item) => item.locator.kind === "whole-file"));
  assert.equal(result.resultState, "complete");
});

test("read and list limits produce explicit truncation evidence", async () => {
  const root = await makeRepo();
  const repository = await ForgeSourceRepository.forSyntheticTests(root);
  const read = await repository.readText({
    sourceRootId: "forge.docs",
    relativePath: "architecture/b.md",
    maxOutputBytes: 2,
  });
  assert.equal(read.provenance.resultState, "truncated");
  assert.deepEqual(read.provenance.partialReasons, ["output-limit-reached"]);

  const listed = await repository.listFiles({
    sourceRootId: "forge.docs",
    relativeDirectory: "architecture",
    maxFiles: 1,
  });
  assert.equal(listed.resultState, "truncated");
  assert.ok(listed.partialReasons.includes("file-limit-reached"));
  assert.equal(listed.returnedFiles, 1);
});

test("optional reserved roots report partial availability rather than broadening access", async () => {
  const root = await makeRepo();
  const repository = await ForgeSourceRepository.forSyntheticTests(root);
  const result = await repository.listFiles({
    sourceRootId: "forge.synthetic-connectors",
  });
  assert.equal(result.resultState, "partial");
  assert.deepEqual(result.partialReasons, ["unavailable-optional-root"]);
  assert.deepEqual(result.items, []);
});

test("line and object locators remain bound to the original source", async () => {
  const root = await makeRepo();
  const repository = await ForgeSourceRepository.forSyntheticTests(root);
  const result = await repository.readText({
    sourceRootId: "forge.docs",
    relativePath: "architecture/b.md",
  });
  assert.deepEqual(createForgeLineRangeLocator(result.provenance, 1, 2), {
    kind: "line-range",
    repositoryRelativePath: "docs/architecture/b.md",
    startLine: 1,
    endLine: 2,
  });
  assert.deepEqual(
    createForgeObjectIdLocator(result.provenance, "decision-0011"),
    {
      kind: "object-id",
      repositoryRelativePath: "docs/architecture/b.md",
      objectId: "decision-0011",
    },
  );
  assert.throws(
    () => createForgeLineRangeLocator(result.provenance, 0, 2),
    ForgeSourceError,
  );
});
