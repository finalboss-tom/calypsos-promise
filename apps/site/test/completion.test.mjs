import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function uniqueMatches(source, pattern) {
  return new Set([...source.matchAll(pattern)].map((match) => match[1]));
}

test("preserves the historical Sprint 8 readiness evidence", async () => {
  const [
    historicalReconciliation,
    controlMap,
    holdpoints,
    releaseHandoff,
    completion,
  ] = await Promise.all([
    read(
      "../../../docs/architecture/public-site-sprint-8-cross-contract-reconciliation.md",
    ),
    read(
      "../../../docs/architecture/public-site-sprint-8-control-and-evidence-map.md",
    ),
    read(
      "../../../docs/architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md",
    ),
    read(
      "../../../docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md",
    ),
    read("../../../docs/roadmap/sprint-8-completion-record.md"),
  ]);

  assert.match(historicalReconciliation, /READY FOR FOUNDING-STEWARD ACCEPTANCE/);
  assert.match(completion, /IMPLEMENTATION PACKAGE COMPLETE/);
  assert.match(completion, /not accepted, merged, deployed, officially released, or closed/);
  assert.match(releaseHandoff, /not hosted or officially released/i);

  const controls = uniqueMatches(controlMap, /`(CTL-S8-\d{3})`/g);
  const holdpointIds = uniqueMatches(holdpoints, /`(HLD-S8-\d{3})`/g);
  const unresolvedIds = uniqueMatches(holdpoints, /`(UR-S8-\d{3})`/g);

  assert.equal(controls.size, 36);
  assert.equal(holdpointIds.size, 20);
  assert.equal(unresolvedIds.size, 20);
  assert.match(holdpoints, /No `HLD-S8-\*` holdpoint is closed/);
});

test("records the accepted, merged, and deployed post-Sprint 8 state", async () => {
  const [reconciliation, currentStatus, publicRoadmap, vercel] = await Promise.all([
    read(
      "../../../docs/roadmap/post-sprint-8-reconciliation-and-sprint-9-preparation.md",
    ),
    read("../../../docs/roadmap/current-status.md"),
    read("../src/lib/public-roadmap.ts"),
    read("../vercel.json"),
  ]);
  const source = `${reconciliation}\n${currentStatus}\n${publicRoadmap}`;

  for (const phrase of [
    "20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a",
    "dpl_3V2e76y1fwrR19j1BzUFpo9U9kjp",
    "Sprints 0–8 are accepted and merged",
    "Git-triggered Vercel deployment was then restored to disabled",
    "Path A — preserve and activate",
    "issue #63 remains open",
    "Issue #64",
    "Sprint 9 implementation remains blocked",
  ]) {
    assert.match(
      source,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }

  assert.match(publicRoadmap, /id: "sprint-8-10"[\s\S]*status: "live"/);
  assert.match(publicRoadmap, /id: "sprint-9"[\s\S]*status: "planned"/);
  assert.doesNotMatch(publicRoadmap, /id: "sprint-9"[\s\S]{0,400}status: "live"/);

  const vercelConfig = JSON.parse(vercel);
  assert.equal(vercelConfig.framework, "nextjs");
  assert.equal(vercelConfig.git.deploymentEnabled, false);
});

test("preserves the bounded Sprint 9 public synthetic prologue handoff", async () => {
  const [handoff, gate] = await Promise.all([
    read(
      "../../../docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md",
    ),
    read(
      "../../../docs/roadmap/post-sprint-8-reconciliation-and-sprint-9-preparation.md",
    ),
  ]);

  for (const phrase of [
    "No real health data or account is required.",
    "Temporary data behavior is disclosed.",
    "under ten minutes",
    "Refusal and exit paths are fully functional.",
    "synthetic Chronicle",
    "synthetic House of Keys receipt demonstration",
    "A complete manual or deterministic fallback path remains required.",
    "does not automatically authorize",
  ]) {
    assert.match(
      handoff,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  assert.match(gate, /Issue #64 is the dedicated pre-Sprint 9 alignment gate/);
  assert.match(gate, /Sprint 9 implementation remains blocked until/);
  assert.doesNotMatch(gate, /Sprint 9 is active/);
});

test("keeps newsletter, Phase 0, Sprint 9, and specialist approval separate", async () => {
  const [currentStatus, reconciliation, holdpoints] = await Promise.all([
    read("../../../docs/roadmap/current-status.md"),
    read(
      "../../../docs/roadmap/post-sprint-8-reconciliation-and-sprint-9-preparation.md",
    ),
    read(
      "../../../docs/architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md",
    ),
  ]);
  const source = `${currentStatus}\n${reconciliation}\n${holdpoints}`;

  for (const phrase of [
    "issue #63 remains open",
    "institutional Phase 0 remains active",
    "planned and not started",
    "independent accessibility",
    "field performance",
    "specialist",
    "Git-triggered Vercel deployment is disabled",
  ]) {
    assert.match(
      source,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
});
