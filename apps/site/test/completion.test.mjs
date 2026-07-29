import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function uniqueMatches(source, pattern) {
  return new Set([...source.matchAll(pattern)].map((match) => match[1]));
}

test("records the complete Sprint 8 readiness package without claiming acceptance", async () => {
  const [
    reconciliation,
    controlMap,
    holdpoints,
    releaseHandoff,
    completion,
    publicRoadmap,
  ] = await Promise.all([
    read("../../../docs/architecture/public-site-sprint-8-cross-contract-reconciliation.md"),
    read("../../../docs/architecture/public-site-sprint-8-control-and-evidence-map.md"),
    read("../../../docs/architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md"),
    read("../../../docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md"),
    read("../../../docs/roadmap/sprint-8-completion-record.md"),
    read("../src/lib/public-roadmap.ts"),
  ]);

  assert.match(reconciliation, /READY FOR FOUNDING-STEWARD ACCEPTANCE/);
  assert.match(reconciliation, /No merge, issue closure, production authorization/);
  assert.match(completion, /IMPLEMENTATION PACKAGE COMPLETE/);
  assert.match(completion, /not accepted, merged, deployed, officially released, or closed/);
  assert.match(completion, /issue #63 remains open/i);
  assert.match(releaseHandoff, /not hosted or officially released/i);
  assert.match(releaseHandoff, /Sprint 9 remains planned and not started/i);

  const controls = uniqueMatches(controlMap, /`(CTL-S8-\d{3})`/g);
  const holdpointIds = uniqueMatches(holdpoints, /`(HLD-S8-\d{3})`/g);
  const unresolvedIds = uniqueMatches(holdpoints, /`(UR-S8-\d{3})`/g);

  assert.equal(controls.size, 36);
  assert.equal(holdpointIds.size, 20);
  assert.equal(unresolvedIds.size, 20);
  assert.match(holdpoints, /No `HLD-S8-\*` holdpoint is closed/);

  assert.match(publicRoadmap, /id: "sprint-8-10"[\s\S]*status: "experimental"/);
  assert.match(publicRoadmap, /id: "sprint-9"[\s\S]*status: "planned"/);
  assert.match(publicRoadmap, /It has not started/);
  assert.doesNotMatch(
    publicRoadmap,
    /id: "sprint-9"[\s\S]{0,300}status: "live"/,
  );
});

test("preserves the bounded Sprint 9 public synthetic prologue handoff", async () => {
  const handoff = await read(
    "../../../docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md",
  );

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
    assert.match(handoff, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(handoff, /after Sprint 8 is explicitly accepted and merged/);
  assert.match(handoff, /pre-Sprint 9 alignment review/);
  assert.doesNotMatch(handoff, /Sprint 9 is active/);
});

test("keeps merge, deployment, signup, Phase 0, and release as separate gates", async () => {
  const [completion, releaseHandoff, holdpoints] = await Promise.all([
    read("../../../docs/roadmap/sprint-8-completion-record.md"),
    read("../../../docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md"),
    read("../../../docs/architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md"),
  ]);
  const source = `${completion}\n${releaseHandoff}\n${holdpoints}`;

  for (const phrase of [
    "Git-triggered Vercel deployment remains disabled",
    "PR #61 remains draft and unmerged",
    "issue #60 remains open",
    "issue #63 remains open",
    "institutional Phase 0",
    "No production or specialist holdpoint",
    "independent accessibility",
    "field performance",
  ]) {
    assert.match(
      source,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
});
