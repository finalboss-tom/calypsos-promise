import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  CLIENT_AUTHORITY_CLAIMS,
  canInteractWithSyntheticSession,
  createSyntheticSessionState,
  denyClientAuthority,
  getQuestPresentationEvidence,
  transitionSyntheticSession,
} from "../src/state/synthetic-session-state.mjs";

test("session state transitions never expand client authority", () => {
  let state = createSyntheticSessionState("scene.hearth.welcome.synthetic");
  const events = [
    {
      type: "scene-presented",
      sceneId: "scene.hearth.welcome.synthetic",
    },
    { type: "stale" },
    { type: "corrected" },
    {
      type: "superseded",
      replacementSceneId: "scene.hearth.direct-path.synthetic",
    },
    { type: "conflict", reason: "synthetic conflict" },
    { type: "failed", reason: "synthetic failure" },
    { type: "deferred" },
    { type: "refused" },
    { type: "discarded" },
  ];

  for (const event of events) {
    state = transitionSyntheticSession(state, event);
    assert.equal(state.authority.authoritative, false);
    assert.equal(state.authority.questCompletion, false);
    assert.equal(state.authority.rewards, false);
    assert.equal(state.authority.permission, false);
    assert.equal(state.authority.chronicleTruth, false);
    assert.equal(state.authority.personalProgress, false);
  }
});

test("only presented and corrected states allow temporary interaction", () => {
  let state = createSyntheticSessionState("scene.hearth.welcome.synthetic");
  assert.equal(canInteractWithSyntheticSession(state), false);

  state = transitionSyntheticSession(state, {
    type: "scene-presented",
    sceneId: state.sceneId,
  });
  assert.equal(canInteractWithSyntheticSession(state), true);

  state = transitionSyntheticSession(state, { type: "stale" });
  assert.equal(canInteractWithSyntheticSession(state), false);

  state = transitionSyntheticSession(state, { type: "corrected" });
  assert.equal(canInteractWithSyntheticSession(state), true);

  state = transitionSyntheticSession(state, {
    type: "conflict",
    reason: "synthetic conflict",
  });
  assert.equal(canInteractWithSyntheticSession(state), false);
});

test("all known and unknown authority claims fail closed", () => {
  for (const claim of CLIENT_AUTHORITY_CLAIMS) {
    assert.equal(denyClientAuthority(claim).allowed, false);
  }
  assert.equal(denyClientAuthority("future-authority-claim").allowed, false);
});

test("quest evidence cannot claim completion or reward", () => {
  const state = transitionSyntheticSession(
    createSyntheticSessionState("scene.hearth.welcome.synthetic"),
    {
      type: "scene-presented",
      sceneId: "scene.hearth.welcome.synthetic",
    },
  );
  const evidence = getQuestPresentationEvidence(state);
  assert.equal(evidence.completed, false);
  assert.equal(evidence.rewarded, false);
  assert.equal(evidence.restored, false);
  assert.equal(evidence.unlocked, false);
  assert.equal(evidence.personalProgress, false);
});

test("state-authority validator passes against the tracked application", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/validate-state-authority.mjs"],
    {
      cwd: new URL("..", import.meta.url),
      encoding: "utf8",
    },
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(
    result.stdout,
    /Sprint 10\.5 state and authority contract validated/,
  );
});
