import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  CLIENT_AUTHORITY_CLAIMS,
  CLIENT_AUTHORITY_CEILING,
  SYNTHETIC_SESSION_STATUSES,
  canInteractWithSyntheticSession,
  createSyntheticSessionState,
  denyClientAuthority,
  getQuestPresentationEvidence,
  transitionSyntheticSession,
} from "../src/state/synthetic-session-state.mjs";
import {
  FORBIDDEN_STATE_SOURCE_PATTERNS,
  REQUIRED_DENIED_CLAIMS,
  REQUIRED_SESSION_STATUSES,
  STATE_AUTHORITY_FILES,
} from "./state-authority-contract.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(scriptDirectory, "..");

function read(path) {
  return readFileSync(join(gameRoot, path), "utf8");
}

for (const path of STATE_AUTHORITY_FILES) {
  assert.ok(
    existsSync(join(gameRoot, path)),
    `missing state-authority file: ${path}`,
  );
}

assert.deepEqual(SYNTHETIC_SESSION_STATUSES, REQUIRED_SESSION_STATUSES);
assert.deepEqual(CLIENT_AUTHORITY_CLAIMS, REQUIRED_DENIED_CLAIMS);
assert.deepEqual(CLIENT_AUTHORITY_CEILING, {
  authoritative: false,
  sceneCompletion: false,
  questCompletion: false,
  rewards: false,
  restoration: false,
  unlocks: false,
  permission: false,
  chronicleTruth: false,
  personalProgress: false,
  healthResults: false,
  authenticPreference: false,
  longitudinalIntelligence: false,
});

let state = createSyntheticSessionState("scene.hearth.welcome.synthetic");
assert.equal(state.status, "pending");
assert.equal(state.authority.authoritative, false);
assert.equal(canInteractWithSyntheticSession(state), false);

state = transitionSyntheticSession(state, {
  type: "scene-presented",
  sceneId: "scene.hearth.welcome.synthetic",
});
assert.equal(state.status, "presented");
assert.equal(canInteractWithSyntheticSession(state), true);
assert.deepEqual(state.presentedSceneIds, ["scene.hearth.welcome.synthetic"]);

for (const event of [
  { type: "failed", reason: "test" },
  { type: "stale" },
  { type: "corrected" },
  {
    type: "superseded",
    replacementSceneId: "scene.hearth.direct-path.synthetic",
  },
  { type: "conflict", reason: "test conflict" },
  { type: "deferred" },
  { type: "refused" },
  { type: "discarded" },
]) {
  state = transitionSyntheticSession(state, event);
  assert.equal(state.authority.authoritative, false);
  assert.equal(state.authority.questCompletion, false);
  assert.equal(state.authority.rewards, false);
  assert.equal(state.authority.permission, false);
  assert.equal(state.authority.chronicleTruth, false);
  assert.equal(state.authority.personalProgress, false);
}

for (const claim of REQUIRED_DENIED_CLAIMS) {
  const decision = denyClientAuthority(claim);
  assert.equal(decision.known, true);
  assert.equal(decision.allowed, false);
  assert.equal(decision.authoritative, false);
}
assert.equal(denyClientAuthority("unknown-claim").allowed, false);

const evidence = getQuestPresentationEvidence(state);
assert.equal(evidence.authoritative, false);
assert.equal(evidence.completed, false);
assert.equal(evidence.rewarded, false);
assert.equal(evidence.restored, false);
assert.equal(evidence.unlocked, false);
assert.equal(evidence.personalProgress, false);

const stateSource = read("src/state/synthetic-session-state.mjs");
const rendererSource = read("src/components/SceneRenderer.tsx");
const questSource = read("src/components/QuestCard.tsx");
const panelSource = read("src/components/StateAuthorityPanel.tsx");
const playSource = read("app/(shell)/play.tsx");
const packageJson = JSON.parse(read("package.json"));

for (const source of [
  stateSource,
  rendererSource,
  questSource,
  panelSource,
  playSource,
]) {
  for (const pattern of FORBIDDEN_STATE_SOURCE_PATTERNS) {
    assert.doesNotMatch(source, pattern);
  }
}

assert.match(rendererSource, /useReducer/);
assert.match(rendererSource, /transitionSyntheticSession/);
assert.match(rendererSource, /canInteractWithSyntheticSession/);
assert.match(rendererSource, /StateAuthorityPanel/);
assert.match(questSource, /getQuestPresentationEvidence/);
assert.match(panelSource, /Client authority is always denied/);
assert.match(playSource, /every client-authority claim fails closed/);
assert.equal(
  packageJson.scripts["validate:state-authority"],
  "node scripts/validate-state-authority.mjs",
);
assert.match(packageJson.scripts.lint, /validate-state-authority\.mjs/);

console.log("Sprint 10.5 state and authority contract validated:");
console.log(
  "- pending, failed, stale, corrected, superseded, and conflict states execute deterministically",
);
console.log(
  "- defer, refuse, discard, restart, and presentation evidence remain clearable and non-authoritative",
);
console.log(
  "- every client completion, reward, permission, Chronicle, preference, health, and progress claim is denied",
);
console.log(
  "- the state reducer remains clock-free, random-free, provider-free, analytics-free, and isolated from the bounded 10.6 storage adapter",
);
