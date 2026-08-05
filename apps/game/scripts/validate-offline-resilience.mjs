import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  GAME_CONTENT_ENTRIES,
  GAME_CONTENT_MANIFEST,
} from "@calypsos-promise/game-content";
import {
  OFFLINE_INFORMATION_CLASS,
  OFFLINE_RECORD_KINDS,
  OFFLINE_RECORD_VERSION,
  OFFLINE_TTLS_MS,
  createOfflineController,
  createPublicContentCacheRecord,
  createSyntheticSessionRecord,
  decodeOfflineRecord,
  resolveOfflineWrite,
  serializeOfflineRecord,
} from "../src/offline/offline-resilience.mjs";
import {
  createPresentedSyntheticSessionState,
  transitionSyntheticSession,
} from "../src/state/synthetic-session-state.mjs";
import {
  FORBIDDEN_OFFLINE_SOURCE_PATTERNS,
  OFFLINE_RESILIENCE_FILES,
  REQUIRED_OFFLINE_OUTCOMES,
  REQUIRED_OFFLINE_RECORD_KINDS,
} from "./offline-resilience-contract.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(scriptDirectory, "..");
const repositoryRoot = resolve(gameRoot, "../..");

function read(path) {
  return readFileSync(join(gameRoot, path), "utf8");
}

function createMemoryStorage({ failWrites = false } = {}) {
  const values = new Map();
  return {
    values,
    async getItem(key) {
      return values.get(key) ?? null;
    },
    async setItem(key, value) {
      if (failWrites) {
        const error = new Error("storage quota full");
        error.name = "QuotaExceededError";
        throw error;
      }
      values.set(key, value);
    },
    async removeItem(key) {
      values.delete(key);
    },
  };
}

for (const path of OFFLINE_RESILIENCE_FILES) {
  assert.ok(
    existsSync(join(gameRoot, path)),
    `missing offline-resilience file: ${path}`,
  );
}

assert.equal(OFFLINE_RECORD_VERSION, "0.1.0");
assert.equal(OFFLINE_INFORMATION_CLASS, "PUBLIC_SYNTHETIC");
assert.deepEqual(OFFLINE_RECORD_KINDS, REQUIRED_OFFLINE_RECORD_KINDS);
assert.equal(OFFLINE_TTLS_MS.syntheticSession, 24 * 60 * 60 * 1000);
assert.equal(OFFLINE_TTLS_MS.publicContent, 30 * 24 * 60 * 60 * 1000);

const nowMs = 1_800_000_000_000;
const publicRecord = createPublicContentCacheRecord({
  entries: GAME_CONTENT_ENTRIES,
  manifest: GAME_CONTENT_MANIFEST,
  nowMs,
});
assert.equal(publicRecord.informationClass, "PUBLIC_SYNTHETIC");
assert.equal(publicRecord.payload.entries.length, GAME_CONTENT_ENTRIES.length);

let session = createPresentedSyntheticSessionState(
  "scene.hearth.welcome.synthetic",
);
session = transitionSyntheticSession(session, {
  type: "scene-presented",
  sceneId: "scene.hearth.direct-path.synthetic",
});
const sessionRecord = createSyntheticSessionRecord({ state: session, nowMs });
const serializedSession = serializeOfflineRecord(sessionRecord);
assert.equal(serializedSession.ok, true);
assert.doesNotMatch(
  serializedSession.serialized,
  /email|phone|accessToken|refreshToken|dateOfBirth|chronicleRecord|permissionGrant|healthResult|analyticsId/i,
);

const valid = decodeOfflineRecord(serializedSession.serialized, {
  expectedKind: "synthetic-session",
  nowMs: nowMs + 1,
  packageVersion: GAME_CONTENT_MANIFEST.version,
});
assert.equal(valid.ok, true);
assert.equal(valid.record.payload.sceneId, session.sceneId);
assert.equal(valid.record.payload.authority, undefined);
assert.equal(valid.record.payload.notice, undefined);

const expired = decodeOfflineRecord(serializedSession.serialized, {
  expectedKind: "synthetic-session",
  nowMs: nowMs + OFFLINE_TTLS_MS.syntheticSession + 1,
  packageVersion: GAME_CONTENT_MANIFEST.version,
});
assert.equal(expired.status, "expired");

const tampered = JSON.parse(serializedSession.serialized);
tampered.payload.sceneId = "scene.tampered.synthetic";
const corrupt = decodeOfflineRecord(JSON.stringify(tampered), {
  expectedKind: "synthetic-session",
  nowMs: nowMs + 1,
  packageVersion: GAME_CONTENT_MANIFEST.version,
});
assert.equal(corrupt.status, "corrupt");

const legacy = JSON.stringify({
  version: "0.0.1",
  kind: "synthetic-session",
  savedAtMs: nowMs,
  expiresAtMs: nowMs + OFFLINE_TTLS_MS.syntheticSession,
  revision: session.revision,
  payload: session,
});
const migrated = decodeOfflineRecord(legacy, {
  expectedKind: "synthetic-session",
  nowMs: nowMs + 1,
  packageVersion: GAME_CONTENT_MANIFEST.version,
});
assert.equal(migrated.ok, true);
assert.equal(migrated.record.version, "0.1.0");

const newerRecord = createSyntheticSessionRecord({
  state: { ...session, revision: session.revision + 3 },
  nowMs,
});
const conflict = resolveOfflineWrite(
  serializeOfflineRecord(newerRecord).serialized,
  sessionRecord,
  { nowMs: nowMs + 1, packageVersion: GAME_CONTENT_MANIFEST.version },
);
assert.equal(conflict.status, "conflict");

const storage = createMemoryStorage();
const controller = createOfflineController({
  storage,
  now: () => nowMs,
  publicContent: {
    entries: GAME_CONTENT_ENTRIES,
    manifest: GAME_CONTENT_MANIFEST,
  },
});
assert.equal((await controller.cachePublicContent()).ok, true);
assert.equal((await controller.storeSyntheticSession(session)).ok, true);
assert.equal((await controller.loadSyntheticSession()).status, "available");
assert.equal((await controller.clearAll()).status, "cleared-all");
assert.equal((await controller.loadSyntheticSession()).status, "missing");

const quotaController = createOfflineController({
  storage: createMemoryStorage({ failWrites: true }),
  now: () => nowMs,
  publicContent: {
    entries: GAME_CONTENT_ENTRIES,
    manifest: GAME_CONTENT_MANIFEST,
  },
});
assert.equal(
  (await quotaController.cachePublicContent()).status,
  "low-storage",
);
assert.equal(
  (await quotaController.storeSyntheticSession(session)).status,
  "low-storage",
);

const sourceFiles = [
  "src/offline/offline-resilience.mjs",
  "src/offline/async-offline-storage.ts",
  "src/components/OfflineResiliencePanel.tsx",
];
for (const path of sourceFiles) {
  const source = read(path);
  for (const pattern of FORBIDDEN_OFFLINE_SOURCE_PATTERNS) {
    assert.doesNotMatch(source, pattern, `${path} matched ${pattern}`);
  }
}

const stateSource = read("src/state/synthetic-session-state.mjs");
const rendererSource = read("src/components/SceneRenderer.tsx");
const panelSource = read("src/components/OfflineResiliencePanel.tsx");
const storageSource = read("src/offline/async-offline-storage.ts");
const packageJson = JSON.parse(read("package.json"));
const lockfile = readFileSync(join(repositoryRoot, "pnpm-lock.yaml"), "utf8");

assert.match(stateSource, /case "offline-restored"/);
assert.match(rendererSource, /OfflineResiliencePanel/);
assert.match(rendererSource, /clearStoredSyntheticSession/);
assert.match(panelSource, /PUBLIC_SYNTHETIC/);
assert.match(panelSource, /Clear offline storage/);
assert.match(panelSource, /Low storage|Storage is full/i);
assert.match(storageSource, /AsyncStorage/);
assert.match(storageSource, /GAME_CONTENT_ENTRIES/);
assert.equal(
  packageJson.dependencies["@react-native-async-storage/async-storage"],
  "2.2.0",
);
assert.match(packageJson.scripts.lint, /validate-offline-resilience\.mjs/);
assert.equal(
  packageJson.scripts["validate:offline-resilience"],
  "node scripts/validate-offline-resilience.mjs",
);
assert.match(
  lockfile,
  /@react-native-async-storage\/async-storage[\'"]?:\s*\n\s+specifier:\s+2\.2\.0/,
);

for (const status of REQUIRED_OFFLINE_OUTCOMES) {
  assert.match(read("src/offline/offline-resilience.mjs"), new RegExp(status));
}

console.log("Sprint 10.6 offline and resilience contract validated:");
console.log(
  "- bundled PUBLIC_SYNTHETIC content remains the universal offline fallback",
);
console.log(
  "- temporary synthetic-session storage is versioned, expiring, clearable, migratable, and non-authoritative",
);
console.log(
  "- corrupt, stale, conflicting, unsupported, quota-limited, and unavailable storage fail closed",
);
console.log(
  "- no protected data, network dependency, analytics, provider, permission, completion, reward, or progress authority is introduced",
);
