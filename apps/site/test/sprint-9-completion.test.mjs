import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function uniqueMatches(source, pattern) {
  return new Set([...source.matchAll(pattern)].map((match) => match[1]));
}

test("assembles the complete Sprint 9 reconciliation package", async () => {
  const [
    currentStatus,
    plan,
    completion,
    reconciliation,
    controlMap,
    holdpoints,
    qualityClosure,
    handoff,
  ] = await Promise.all([
    read("../../../docs/roadmap/current-status.md"),
    read("../../../docs/roadmap/sprint-9-execution-plan.md"),
    read("../../../docs/roadmap/sprint-9-completion-record.md"),
    read(
      "../../../docs/architecture/public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md",
    ),
    read(
      "../../../docs/architecture/public-synthetic-prologue-sprint-9-control-and-evidence-map.md",
    ),
    read(
      "../../../docs/architecture/public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md",
    ),
    read("../../../docs/roadmap/sprint-9-pre-9-10-quality-gate-closure.md"),
    read(
      "../../../docs/roadmap/sprint-9-release-rollback-and-sprint-10-handoff.md",
    ),
  ]);
  const source = [
    currentStatus,
    plan,
    completion,
    reconciliation,
    controlMap,
    holdpoints,
    qualityClosure,
    handoff,
  ].join("\n");

  for (const phrase of [
    "READY FOR FOUNDING-STEWARD ACCEPTANCE",
    "IMPLEMENTATION PACKAGE COMPLETE",
    "workstreams 9.1–9.9",
    "Sprint 9 remains active",
    "not yet accepted",
    "squash merge",
    "issue #67",
    "PR #68",
    "Phase 0 remains active",
    "Sprint 10 remains planned and not started",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }
});

test("pins the Sprint 9 evidence inventory and quality dispositions", async () => {
  const [controlMap, holdpoints, qualityClosure] = await Promise.all([
    read(
      "../../../docs/architecture/public-synthetic-prologue-sprint-9-control-and-evidence-map.md",
    ),
    read(
      "../../../docs/architecture/public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md",
    ),
    read("../../../docs/roadmap/sprint-9-pre-9-10-quality-gate-closure.md"),
  ]);

  assert.equal(uniqueMatches(controlMap, /`(CTL-S9-\d{3})`/g).size, 48);
  assert.equal(uniqueMatches(holdpoints, /`(HLD-S9-\d{3})`/g).size, 24);
  assert.equal(uniqueMatches(holdpoints, /`(UR-S9-\d{3})`/g).size, 24);
  assert.equal(uniqueMatches(qualityClosure, /`(QG-\d{2})`/g).size, 16);
  assert.match(holdpoints, /No `HLD-S9-\*` holdpoint is closed/);
});

test("records exact protected-preview provenance and production isolation", async () => {
  const [completion, handoff, publication, vercel] = await Promise.all([
    read("../../../docs/roadmap/sprint-9-completion-record.md"),
    read(
      "../../../docs/roadmap/sprint-9-release-rollback-and-sprint-10-handoff.md",
    ),
    read(
      "../../../docs/roadmap/sprint-9-workstream-9-9-publication-and-rollback.md",
    ),
    read("../vercel.json"),
  ]);
  const source = `${completion}\n${handoff}\n${publication}`;

  for (const phrase of [
    "66979c71732f0bc343000fe143485d06e0bc7fec",
    "dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M",
    "dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp",
    "1b25a2e64ff272927c65afa5e1f16aedc5e448d7",
    "protected",
    "noindex",
    "not production",
    "production remained",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }

  const vercelConfig = JSON.parse(vercel);
  assert.equal(vercelConfig.framework, "nextjs");
  assert.equal(vercelConfig.git.deploymentEnabled, false);
});

test("preserves the accepted playable evidence and its limitations", async () => {
  const [completion, reconciliation, currentStatus] = await Promise.all([
    read("../../../docs/roadmap/sprint-9-completion-record.md"),
    read(
      "../../../docs/architecture/public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md",
    ),
    read("../../../docs/roadmap/current-status.md"),
  ]);
  const source = `${completion}\n${reconciliation}\n${currentStatus}`;

  for (const phrase of [
    "8.45",
    "9.11",
    "11.96",
    "41 visible controls",
    "native-keyboard",
    "zero cookies",
    "zero localStorage",
    "zero sessionStorage",
    "zero IndexedDB",
    "zero Cache Storage",
    "zero external runtime",
    "713,812",
    "799,902",
    "15 first-party requests",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }

  for (const phrase of [
    "independent accessibility",
    "named screen-reader",
    "affected-user",
    "device",
    "field performance",
    "legal",
    "privacy",
    "security",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }
});

test("keeps newsletter, funding, providers, and private capabilities outside Sprint 9", async () => {
  const [reconciliation, completion, holdpoints] = await Promise.all([
    read(
      "../../../docs/architecture/public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md",
    ),
    read("../../../docs/roadmap/sprint-9-completion-record.md"),
    read(
      "../../../docs/architecture/public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md",
    ),
  ]);
  const source = `${reconciliation}\n${completion}\n${holdpoints}`;

  for (const phrase of [
    "issue #63 remains open",
    "newsletter as prologue identity",
    "funding",
    "sponsorship",
    "provider",
    "private Living Chronicle",
    "production House of Keys",
    "production Aster",
    "analytics",
    "payments",
    "production health-data",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }
});

test("bounds Sprint 10 to the universal shell and no client-side trust", async () => {
  const [handoff, sprints] = await Promise.all([
    read(
      "../../../docs/roadmap/sprint-9-release-rollback-and-sprint-10-handoff.md",
    ),
    read("../../../docs/roadmap/sprints.md"),
  ]);
  const source = `${handoff}\n${sprints}`;

  for (const phrase of [
    "Universal game shell",
    "Expo application",
    "island map navigation",
    "Hearth",
    "zone and scene renderer",
    "dialogue choices",
    "quest cards",
    "Wayfinder Orb",
    "accessibility settings",
    "offline state strategy",
    "authentication boundary after the prologue",
    "One content package",
    "web, iOS, and Android",
    "keyboard",
    "screen-reader",
    "reduced-motion",
    "low-bandwidth",
    "No gameplay rule depends on client-side trust",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }

  assert.match(handoff, /dedicated pre-Sprint 10 alignment review/i);
  assert.match(handoff, /Sprint 10 remains planned and not started/i);
});

test("keeps merge, release, issue closure, and Sprint 10 start attributable", async () => {
  const [completion, handoff, currentStatus] = await Promise.all([
    read("../../../docs/roadmap/sprint-9-completion-record.md"),
    read(
      "../../../docs/roadmap/sprint-9-release-rollback-and-sprint-10-handoff.md",
    ),
    read("../../../docs/roadmap/current-status.md"),
  ]);
  const source = `${completion}\n${handoff}\n${currentStatus}`;

  for (const phrase of [
    "explicit founding-steward acceptance",
    "directed squash merge",
    "issue #67 closure",
    "preview disposition",
    "post-merge reconciliation",
    "no unexpected deployment",
    "public link",
    "indexing",
    "private capability",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }
});
