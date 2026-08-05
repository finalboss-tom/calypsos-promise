import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  GAME_CONTENT_ENTRIES,
  GAME_CONTENT_MANIFEST,
} from "@calypsos-promise/game-content";
import {
  OFFLINE_TTLS_MS,
  createOfflineController,
  createSyntheticSessionRecord,
  decodeOfflineRecord,
  restoreSyntheticSessionPayload,
  serializeOfflineRecord,
} from "../src/offline/offline-resilience.mjs";
import {
  createPresentedSyntheticSessionState,
  transitionSyntheticSession,
} from "../src/state/synthetic-session-state.mjs";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(testDirectory, "..");
const nowMs = 1_800_000_000_000;

function memoryStorage() {
  const values = new Map();
  return {
    values,
    async getItem(key) {
      return values.get(key) ?? null;
    },
    async setItem(key, value) {
      values.set(key, value);
    },
    async removeItem(key) {
      values.delete(key);
    },
  };
}

test("session records retain only the minimal public synthetic envelope", () => {
  const state = createPresentedSyntheticSessionState(
    "scene.hearth.welcome.synthetic",
  );
  const record = createSyntheticSessionRecord({
    state: {
      ...state,
      email: "must-not-persist@example.test",
      accessToken: "must-not-persist",
    },
    nowMs,
  });
  const serialized = serializeOfflineRecord(record);
  assert.equal(serialized.ok, true);
  assert.doesNotMatch(
    serialized.serialized,
    /must-not-persist|email|accessToken/,
  );
  assert.equal(record.payload.authority, undefined);
  assert.equal(record.payload.notice, undefined);
});

test("expiry and corruption fail closed", () => {
  const state = createPresentedSyntheticSessionState(
    "scene.hearth.welcome.synthetic",
  );
  const record = createSyntheticSessionRecord({ state, nowMs });
  const serialized = serializeOfflineRecord(record);
  assert.equal(serialized.ok, true);

  assert.equal(
    decodeOfflineRecord(serialized.serialized, {
      expectedKind: "synthetic-session",
      nowMs: nowMs + OFFLINE_TTLS_MS.syntheticSession + 1,
      packageVersion: GAME_CONTENT_MANIFEST.version,
    }).status,
    "expired",
  );

  const tampered = JSON.parse(serialized.serialized);
  tampered.revision += 1;
  assert.equal(
    decodeOfflineRecord(JSON.stringify(tampered), {
      expectedKind: "synthetic-session",
      nowMs: nowMs + 1,
      packageVersion: GAME_CONTENT_MANIFEST.version,
    }).status,
    "corrupt",
  );
});

test("stored state restores explicitly without authority transfer", () => {
  let state = createPresentedSyntheticSessionState(
    "scene.hearth.welcome.synthetic",
  );
  state = transitionSyntheticSession(state, {
    type: "corrected",
    sceneId: "scene.hearth.direct-path.synthetic",
  });
  const restored = restoreSyntheticSessionPayload(
    createSyntheticSessionRecord({ state, nowMs }).payload,
  );
  assert.equal(restored.ok, true);
  assert.equal(restored.state.status, "corrected");
  assert.equal(restored.state.authority.authoritative, false);
  assert.equal(restored.state.authority.questCompletion, false);
  assert.equal(restored.state.authority.rewards, false);
});

test("controller caches public content, stores a session, restores, and clears", async () => {
  const storage = memoryStorage();
  const controller = createOfflineController({
    storage,
    now: () => nowMs,
    publicContent: {
      entries: GAME_CONTENT_ENTRIES,
      manifest: GAME_CONTENT_MANIFEST,
    },
  });
  const state = createPresentedSyntheticSessionState(
    "scene.hearth.welcome.synthetic",
  );

  assert.equal((await controller.cachePublicContent()).status, "cached");
  assert.equal(
    (await controller.storeSyntheticSession(state)).status,
    "stored",
  );
  assert.equal((await controller.loadSyntheticSession()).status, "available");
  assert.equal((await controller.clearAll()).status, "cleared-all");
  assert.equal((await controller.loadSyntheticSession()).status, "missing");
});

test("offline validator passes against the tracked application", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/validate-offline-resilience.mjs"],
    {
      cwd: gameRoot,
      encoding: "utf8",
    },
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(
    result.stdout,
    /Sprint 10\.6 offline and resilience contract validated/,
  );
});
