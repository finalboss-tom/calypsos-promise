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

function requireAbsentText(path, content, forbidden) {
  if (content.includes(forbidden)) {
    fail(`${path}: contains stale or forbidden ${JSON.stringify(forbidden)}`);
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
  alignment:
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
  postMerge:
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
  rootReadme: "README.md",
  docsIndex: "docs/README.md",
  productIndex: "docs/product/README.md",
  moduleBoundaries: "docs/architecture/module-boundaries.md",
  siteReadme: "apps/site/README.md",
  gameReadme: "apps/game/README.md",
  vision: "VISION.md",
  constitution: "docs/frozen/product-constitution.md",
  architectureFoundation: "docs/frozen/architecture.md",
  gameplayFoundation: "docs/product/gameplay-foundation.md",
  incentiveModel: "docs/product/incentive-model.md",
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
      "ACCEPTED AND SQUASH MERGED",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
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
      "ACCEPTED AND SQUASH MERGED",
      "edd954d0e5ce61f53918a74ec804964ad987830f",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
      "one cross-contract reconciliation with 24 findings",
      "60 stable controls",
      "24 holdpoints and 24 unresolved records",
      "Acceptance and merge outcome",
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
      "Accepted and merged numbered sprints:** 0–10",
      "Sprint 10.1 through Sprint 10.10 are complete, accepted, and merged as one bounded package",
      "Sprint 10 implementation package is accepted and merged",
      "23dffb031657181d9c0ca42457b95128520f7870",
      "edd954d0e5ce61f53918a74ec804964ad987830f",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
      "Sprint 11 remains unstarted",
      "dedicated pre-Sprint 11 alignment review",
    ],
  ],
  [
    paths.roadmapIndex,
    texts.roadmapIndex,
    [
      "Post-Sprint 10 Repository Reconciliation",
      "Sprint 10 is accepted and squash merged",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
      "Sprint 11 remains unstarted",
      "Phase 0 remains active",
    ],
  ],
  [
    paths.architectureIndex,
    texts.architectureIndex,
    [
      "Sprint 10 universal game shell completion package",
      "accepted and squash merged",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
      "universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    ],
  ],
  [
    paths.alignment,
    texts.alignment,
    [
      "ALIGNMENT RECONCILIATION COMPLETE",
      "Mission and player promise",
      "Incentive alignment",
      "Prior-sprint inheritance",
      "Operational simplicity and developer experience",
      "Material corrections applied",
      "No material implementation blocker remains",
      "23dffb031657181d9c0ca42457b95128520f7870",
      "CI 1513 / DCO 1618",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.rootReadme,
    texts.rootReadme,
    [
      "Sprints 0–10 are accepted and merged",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
      "Accepted and merged Sprint 10 foundation",
      "apps/game",
      "packages/game-content",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.docsIndex,
    texts.docsIndex,
    [
      "Post-Sprint 10 Repository Reconciliation",
      "Sprint 10 is accepted and squash merged",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
      "Sprint 10 universal shell",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.productIndex,
    texts.productIndex,
    [
      "Current universal-shell implementation",
      "pre-acceptance full alignment reconciliation",
      "deterministic non-authority",
    ],
  ],
  [
    paths.moduleBoundaries,
    texts.moduleBoundaries,
    ["apps/game", "game-content", "Universal game shell", "Sprint 10 boundary"],
  ],
  [
    paths.siteReadme,
    texts.siteReadme,
    [
      "Post-Sprint 10 Reconciliation",
      "accepted and merged Sprint 10 package",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
      "No site redeploy",
      "apps/game",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.gameReadme,
    texts.gameReadme,
    [
      "10.9",
      "10.10",
      "/operations",
      "Sprint 10 completion, merge, and reconciliation",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
      "merged into `main`",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.postMerge,
    texts.postMerge,
    [
      "COMPLETE AND VALIDATED",
      "edd954d0e5ce61f53918a74ec804964ad987830f",
      "28bb5a7ae268d28a67d737777cafdd760c796cd1",
      "No Calypso's Promise public-site redeploy is justified",
      "Issue #80",
      "Sprint 11 remains unstarted",
      "LI-V1 through LI-V8 remain inactive",
    ],
  ],
  [
    paths.vision,
    texts.vision,
    [
      "Return useful personal value",
      "Preserve individual control",
      "Enable separately authorized collective benefit",
      "Progressive decentralization means authority follows demonstrated capacity",
    ],
  ],
  [
    paths.constitution,
    texts.constitution,
    [
      "Build your Living Chronicle. Improve your health. Keep the key.",
      "Meaningful refusal without punishment",
      "Accessible participation",
      "Evidence before expansion",
    ],
  ],
  [
    paths.architectureFoundation,
    texts.architectureFoundation,
    [
      "Universal playable client: Expo / React Native / Expo Router",
      "AI proposes. The player confirms. The domain service validates and stores.",
      "Open code never implies open production data",
    ],
  ],
  [
    paths.gameplayFoundation,
    texts.gameplayFoundation,
    [
      "The first player is **people**",
      "The player can replace, defer, or reject a route without punishment",
      "There are no broken streak punishments",
    ],
  ],
  [
    paths.incentiveModel,
    texts.incentiveModel,
    [
      "The first two loops must create a worthwhile product without requiring the third",
      "A quest must provide immediate player value",
      "punish refusal, deferral, withdrawal, correction, export, deletion, or return after interruption",
      "Engagement without increasing personal utility",
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

for (const [path, content, forbidden] of [
  [paths.rootReadme, texts.rootReadme, "Complete unmerged Sprint 10 candidate"],
  [paths.rootReadme, texts.rootReadme, "It remains unaccepted, unmerged"],
  [
    paths.docsIndex,
    texts.docsIndex,
    "Sprint 10 remains unaccepted and unmerged",
  ],
  [paths.roadmapIndex, texts.roadmapIndex, "not yet accepted or merged"],
  [
    paths.architectureIndex,
    texts.architectureIndex,
    "complete unmerged Sprint 10",
  ],
  [paths.siteReadme, texts.siteReadme, "complete unmerged Sprint 10 package"],
  [paths.gameReadme, texts.gameReadme, "The application remains unmerged"],
  [paths.status, texts.status, "Sprint 10 acceptance and merge remain pending"],
  [
    paths.rootReadme,
    texts.rootReadme,
    "Sprint 10 implementation has **not** started",
  ],
  [paths.rootReadme, texts.rootReadme, "draft PR #72"],
  [
    paths.rootReadme,
    texts.rootReadme,
    "preparation for a dedicated pre-Sprint 10 alignment review",
  ],
  [
    paths.docsIndex,
    texts.docsIndex,
    "Founding-steward acceptance remains pending",
  ],
  [
    paths.docsIndex,
    texts.docsIndex,
    "Sprint 10 remains planned and not started",
  ],
  [
    paths.architectureIndex,
    texts.architectureIndex,
    "LI-V0 closure candidate adds",
  ],
  [
    paths.architectureIndex,
    texts.architectureIndex,
    "Sprint 10 remains planned and not started",
  ],
  [
    paths.moduleBoundaries,
    texts.moduleBoundaries,
    "Planned applications such as `apps/game`",
  ],
  [
    paths.moduleBoundaries,
    texts.moduleBoundaries,
    "Sprint 8 will migrate this application",
  ],
  [
    paths.siteReadme,
    texts.siteReadme,
    "Sprint 10 remains planned and not started",
  ],
  [paths.siteReadme, texts.siteReadme, "Draft Reconciliation PR #72"],
]) {
  requireAbsentText(path, content, forbidden);
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
          [
            "temp-sprint-10-10-implementation.yml",
            "temp-sprint-10-alignment-reconciliation.yml",
            "temp-sprint-10-alignment-evidence.yml",
            "temp-sprint-10-post-merge-reconciliation.yml",
          ].includes(entry);
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
  "Sprint 10 accepted and post-merge-reconciled package validated: frozen mission and incentive inheritance, current canonical orientation, 24 findings, 60 controls, 24 holdpoints, 24 unresolved records, closed release gates, no site redeploy, and bounded Sprint 11 handoff.",
);
