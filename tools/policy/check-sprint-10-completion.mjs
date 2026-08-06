import { access, readFile, readdir } from "node:fs/promises";

const failures = [];
const allowTempTransport = process.env.SPRINT10_ALLOW_TEMP_TRANSPORT === "1";

function fail(message) {
  failures.push(message);
}

async function load(path) {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    fail(`${path}: ${error.message}`);
    return "";
  }
}

function requireText(path, content, expected) {
  if (!content.includes(expected)) {
    fail(`${path}: missing ${JSON.stringify(expected)}`);
  }
}

function requireUniqueCount(path, content, pattern, expected, label) {
  const values = new Set(content.match(pattern) ?? []);
  if (values.size !== expected) {
    fail(`${path}: expected ${expected} unique ${label}, found ${values.size}`);
  }
}

const paths = {
  cross:
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
  controls:
    "docs/architecture/universal-game-shell-sprint-10-control-and-evidence-map.md",
  holdpoints:
    "docs/architecture/universal-game-shell-sprint-10-specialist-holdpoint-and-unresolved-work-register.md",
  completion: "docs/roadmap/sprint-10-completion-record.md",
  handoff:
    "docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md",
  workstream:
    "docs/roadmap/sprint-10.10-final-reconciliation-and-sprint-11-handoff.md",
  status: "docs/roadmap/current-status.md",
  roadmapIndex: "docs/roadmap/README.md",
  architectureIndex: "docs/architecture/README.md",
  package: "package.json",
  ci: ".github/workflows/ci.yml",
};

const texts = {};
for (const [name, path] of Object.entries(paths)) {
  texts[name] = await load(path);
}

for (const [path, content, required] of [
  [
    paths.cross,
    texts.cross,
    [
      "IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE",
      "Sprint 11 remains unstarted",
      "No workstream silently expanded",
    ],
  ],
  [
    paths.controls,
    texts.controls,
    [
      "60 stable Sprint 10 control objectives",
      "ARTIFACT-PROVENANCE VERIFIED",
      "FOUNDING-STEWARD ACCEPTED",
      "Sprint 11 entry",
    ],
  ],
  [
    paths.holdpoints,
    texts.holdpoints,
    [
      "Holdpoints: 24",
      "Unresolved-work records: 24",
      "OPEN — SPRINT 11 ENTRY GATE",
      "LI-V1 through LI-V8",
    ],
  ],
  [
    paths.completion,
    texts.completion,
    [
      "IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE",
      "one cross-contract reconciliation with 24 findings",
      "60 stable controls",
      "24 holdpoints and 24 unresolved records",
      "Sprint 10 becomes accepted and merged only after",
    ],
  ],
  [
    paths.handoff,
    texts.handoff,
    [
      "Goal: Prove the complete private value loop",
      "Sprint 11 remains unstarted",
      "A sprint title or roadmap deliverable is not implementation authorization",
      "dedicated pre-Sprint 11 alignment review",
    ],
  ],
  [
    paths.workstream,
    texts.workstream,
    [
      "COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
      "IMPLEMENTATION PACKAGE READY FOR FOUNDING-STEWARD ACCEPTANCE",
      "24 cross-contract findings",
      "60 stable controls",
      "Sprint 11: unstarted",
    ],
  ],
  [
    paths.status,
    texts.status,
    [
      "Sprint 10.1 through Sprint 10.10 are complete as validated internal checkpoints",
      "Sprint 10 implementation package is complete and ready for founding-steward acceptance",
      "Sprint 11 remains unstarted",
      "explicit founding-steward acceptance",
    ],
  ],
  [
    paths.roadmapIndex,
    texts.roadmapIndex,
    [
      "Sprint 10 completion package",
      "Sprint 11 remains unstarted",
      "Phase 0 remains active",
    ],
  ],
  [
    paths.architectureIndex,
    texts.architectureIndex,
    [
      "Sprint 10 universal game shell completion package",
      "universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    ],
  ],
  [
    paths.ci,
    texts.ci,
    [
      "Validate build, release, rollback, and operations evidence",
      "Write deterministic unsigned build evidence",
      "Validate deterministic unsigned build evidence",
      "Verify no tracked build mutation",
    ],
  ],
]) {
  for (const expected of required) requireText(path, content, expected);
}

requireUniqueCount(
  paths.controls,
  texts.controls,
  /CTL-S10-\d{3}/g,
  60,
  "controls",
);
requireUniqueCount(
  paths.holdpoints,
  texts.holdpoints,
  /HLD-S10-\d{3}/g,
  24,
  "holdpoints",
);
requireUniqueCount(
  paths.holdpoints,
  texts.holdpoints,
  /UNR-S10-\d{3}/g,
  24,
  "unresolved-work records",
);

try {
  const packageJson = JSON.parse(texts.package);
  if (
    packageJson.scripts?.["sprint10:check"] !==
    "node tools/policy/check-sprint-10-completion.mjs"
  )
    fail(`${paths.package}: sprint10:check is not exact`);
  if (!packageJson.scripts?.["policy:check"]?.includes("pnpm sprint10:check"))
    fail(`${paths.package}: policy:check does not include sprint10:check`);
} catch (error) {
  fail(`${paths.package}: ${error.message}`);
}

for (const path of [
  "apps/game/dist",
  "apps/game/.expo",
  "apps/game/android",
  "apps/game/ios",
]) {
  try {
    await access(path);
    fail(`${path}: generated application state must be absent`);
  } catch {}
}

for (const directory of [".github/workflows", "tools"]) {
  try {
    for (const entry of await readdir(directory)) {
      if (/temp-sprint-10/i.test(entry)) {
        const permitted =
          allowTempTransport &&
          directory === ".github/workflows" &&
          entry === "temp-sprint-10-10-implementation.yml";
        if (!permitted)
          fail(
            `${directory}/${entry}: temporary Sprint 10 transport must be absent`,
          );
      }
    }
  } catch (error) {
    fail(`${directory}: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error(
    `Sprint 10 completion validation failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`,
  );
  process.exit(1);
}

console.log(
  "Sprint 10 completion package validated: 24 findings, 60 controls, 24 holdpoints, 24 unresolved records, closed release gates, exact permanent validation requirements, and bounded Sprint 11 handoff.",
);
