import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("reconciles current-facing repository surfaces after Sprint 9", async () => {
  const [
    root,
    docs,
    roadmap,
    architecture,
    status,
    reconciliation,
    site,
    deployment,
  ] = await Promise.all([
    read("../../../README.md"),
    read("../../../docs/README.md"),
    read("../../../docs/roadmap/README.md"),
    read("../../../docs/architecture/README.md"),
    read("../../../docs/roadmap/current-status.md"),
    read(
      "../../../docs/roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md",
    ),
    read("../README.md"),
    read("../DEPLOYMENT.md"),
  ]);
  const source = [
    root,
    docs,
    roadmap,
    architecture,
    status,
    reconciliation,
    site,
    deployment,
  ].join("\n");

  for (const phrase of [
    "Sprints 0–9 are accepted and merged",
    "b22c32ad8f40610dc95a5b49a745da5adb9c1341",
    "dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6",
    "0100bbe08e0ddb3acddc5a3a926c1972b59b517d",
    "issue #71",
    "draft PR #72",
    "Sprint 10 remains planned and not started",
    "no gameplay authority depends on client-side trust",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }

  assert.doesNotMatch(root, /Sprint 9 implementation has \*\*not\*\* started/i);
  assert.doesNotMatch(docs, /Sprint 9 remains planned and not started/i);
  assert.doesNotMatch(roadmap, /Sprint 9 remains active on draft PR #68/i);
  assert.doesNotMatch(site, /Sprint 9 remains planned and not started/i);
});

test("preserves the production prologue boundary and release lock", async () => {
  const [page, navigation, sitemap, vercel, status, deployment] =
    await Promise.all([
      read("../src/app/prologue/page.tsx"),
      read("../src/lib/navigation.ts"),
      read("../src/app/sitemap.ts"),
      read("../vercel.json"),
      read("../../../docs/roadmap/current-status.md"),
      read("../DEPLOYMENT.md"),
    ]);

  assert.match(page, /Sprint 9 is accepted, squash merged, and manually deployed/i);
  assert.match(page, /production-hosted public synthetic prologue/i);
  assert.match(page, /not an account, private Chronicle, permission system/i);
  assert.match(page, /index: false/);
  assert.match(page, /follow: false/);
  assert.doesNotMatch(navigation, /href: "\/prologue"/);
  assert.doesNotMatch(sitemap, /\/prologue/);

  const config = JSON.parse(vercel);
  assert.equal(config.git.deploymentEnabled, false);

  for (const phrase of [
    "noindex, nofollow",
    "absent from public navigation and the sitemap",
    "public and explicitly synthetic",
    "no-account",
    "memory-only",
    "non-authoritative",
    "no runtime error cluster",
  ]) {
    assert.match(`${status}\n${deployment}`, new RegExp(phrase, "i"));
  }
});

test("records preview disposition and preserves historical evidence", async () => {
  const reconciliation = await read(
    "../../../docs/roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md",
  );

  assert.match(
    reconciliation,
    /dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M.*retained as access-controlled historical release evidence/is,
  );
  assert.match(reconciliation, /not an active release channel/i);
  assert.match(reconciliation, /Historical-record rule/i);
  assert.match(reconciliation, /without rewriting history/i);
  assert.match(reconciliation, /Sprint 9 completion record/i);
});

test("keeps newsletter and Aster maintenance boundaries separate", async () => {
  const [status, architecture, reconciliation, prologueFiles] = await Promise.all([
    read("../../../docs/roadmap/current-status.md"),
    read("../../../docs/architecture/README.md"),
    read(
      "../../../docs/roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md",
    ),
    Promise.all([
      read("../src/app/prologue/page.tsx"),
      read("../src/components/prologue-opening.tsx"),
      read("../src/components/prologue-guide-panel.tsx"),
      read("../src/lib/prologue-guide-content.ts"),
    ]).then((files) => files.join("\n")),
  ]);
  const source = `${status}\n${architecture}\n${reconciliation}`;

  assert.match(source, /newsletter remains separate/i);
  assert.match(source, /issue #63 remains open/i);
  assert.match(source, /Issue #50 remains open and inactive/i);
  assert.match(source, /does not import or consume the `@calypsos-promise\/aster` package/i);
  assert.doesNotMatch(prologueFiles, /@calypsos-promise\/aster/);
});

test("retains the accepted Sprint 10 goal without starting implementation", async () => {
  const [sprints, status, reconciliation] = await Promise.all([
    read("../../../docs/roadmap/sprints.md"),
    read("../../../docs/roadmap/current-status.md"),
    read(
      "../../../docs/roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md",
    ),
  ]);
  const source = `${sprints}\n${status}\n${reconciliation}`;

  assert.match(source, /Sprint 10 — Universal game shell/);
  assert.match(
    source,
    /Establish the browser, iOS, and Android playable application/,
  );
  assert.match(source, /Sprint 10 remains planned and not started/i);
  assert.match(source, /dedicated pre-Sprint 10 alignment review/i);
  assert.match(source, /authentication only after the prologue/i);
  assert.match(source, /no gameplay authority depends on client-side trust/i);
});
