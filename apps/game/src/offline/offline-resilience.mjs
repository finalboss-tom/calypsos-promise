import {
  CLIENT_AUTHORITY_CEILING,
  SYNTHETIC_SESSION_STATE_VERSION,
  SYNTHETIC_SESSION_STATUSES,
} from "../state/synthetic-session-state.mjs";

export const OFFLINE_RECORD_VERSION = "0.1.0";
export const LEGACY_OFFLINE_RECORD_VERSION = "0.0.1";
export const OFFLINE_OWNER = "apps/game";
export const OFFLINE_INFORMATION_CLASS = "PUBLIC_SYNTHETIC";
export const OFFLINE_PUBLIC_CONTENT_KEY =
  "calypsos-promise.game.public-content-cache.v0";
export const OFFLINE_SYNTHETIC_SESSION_KEY =
  "calypsos-promise.game.synthetic-session.v0";

export const OFFLINE_RECORD_KINDS = Object.freeze([
  "public-content-cache",
  "synthetic-session",
]);

export const OFFLINE_TTLS_MS = Object.freeze({
  publicContent: 30 * 24 * 60 * 60 * 1000,
  syntheticSession: 24 * 60 * 60 * 1000,
});

export const OFFLINE_BYTE_LIMITS = Object.freeze({
  publicContent: 256 * 1024,
  syntheticSession: 16 * 1024,
});

const SESSION_PAYLOAD_KEYS = Object.freeze([
  "version",
  "revision",
  "status",
  "sceneId",
  "presentedSceneIds",
]);

const PROTECTED_KEY_PATTERNS = Object.freeze([
  /account/i,
  /access.?token/i,
  /refresh.?token/i,
  /credential/i,
  /email/i,
  /phone/i,
  /date.?of.?birth/i,
  /chronicle/i,
  /permission/i,
  /health/i,
  /research/i,
  /payment/i,
  /analytics/i,
  /profile/i,
  /voice/i,
]);

function freezeList(values) {
  return Object.freeze([...values]);
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  Object.freeze(value);
  for (const item of Object.values(value)) deepFreeze(item);
  return value;
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonicalize(value[key])]),
  );
}

function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

export function checksumOfflineRecord(recordWithoutChecksum) {
  const input = canonicalJson(recordWithoutChecksum);
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function withChecksum(recordWithoutChecksum) {
  return deepFreeze({
    ...recordWithoutChecksum,
    checksum: checksumOfflineRecord(recordWithoutChecksum),
  });
}

export function estimateOfflineBytes(serialized) {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(serialized).byteLength;
  }
  return unescape(encodeURIComponent(serialized)).length;
}

function hasProtectedKey(value) {
  if (Array.isArray(value)) return value.some(hasProtectedKey);
  if (!value || typeof value !== "object") return false;
  return Object.entries(value).some(
    ([key, nested]) =>
      PROTECTED_KEY_PATTERNS.some((pattern) => pattern.test(key)) ||
      hasProtectedKey(nested),
  );
}

function isFiniteInteger(value) {
  return Number.isInteger(value) && Number.isFinite(value);
}

function sanitizeStringList(values, limit = 32) {
  if (!Array.isArray(values)) return freezeList([]);
  return freezeList(
    values
      .filter((value) => typeof value === "string" && value.length > 0)
      .slice(0, limit),
  );
}

export function sanitizeSyntheticSessionForStorage(state) {
  const status = SYNTHETIC_SESSION_STATUSES.includes(state?.status)
    ? state.status
    : "failed";
  return deepFreeze({
    version: SYNTHETIC_SESSION_STATE_VERSION,
    revision:
      isFiniteInteger(state?.revision) && state.revision >= 0
        ? state.revision
        : 0,
    status,
    sceneId:
      typeof state?.sceneId === "string" && state.sceneId.length > 0
        ? state.sceneId
        : "scene.hearth.welcome.synthetic",
    presentedSceneIds: sanitizeStringList(state?.presentedSceneIds),
  });
}

function validateSessionPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }
  if (
    Object.keys(payload).some((key) => !SESSION_PAYLOAD_KEYS.includes(key)) ||
    hasProtectedKey(payload)
  ) {
    return false;
  }
  return (
    payload.version === SYNTHETIC_SESSION_STATE_VERSION &&
    isFiniteInteger(payload.revision) &&
    payload.revision >= 0 &&
    SYNTHETIC_SESSION_STATUSES.includes(payload.status) &&
    typeof payload.sceneId === "string" &&
    payload.sceneId.length > 0 &&
    Array.isArray(payload.presentedSceneIds) &&
    payload.presentedSceneIds.every((id) => typeof id === "string")
  );
}

function validatePublicEntries(entries) {
  return (
    Array.isArray(entries) &&
    entries.length > 0 &&
    entries.every(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        entry.provenance?.informationClass === OFFLINE_INFORMATION_CLASS &&
        entry.provenance?.synthetic === true &&
        entry.compatibility?.platforms?.includes("browser") &&
        entry.compatibility?.platforms?.includes("ios") &&
        entry.compatibility?.platforms?.includes("android"),
    )
  );
}

export function createPublicContentCacheRecord({ entries, manifest, nowMs }) {
  if (!validatePublicEntries(entries)) {
    throw new TypeError(
      "Public content cache accepts only validated PUBLIC_SYNTHETIC entries.",
    );
  }
  if (
    manifest?.informationClass !== OFFLINE_INFORMATION_CLASS ||
    manifest?.synthetic !== true ||
    typeof manifest?.version !== "string"
  ) {
    throw new TypeError("Public content cache manifest is invalid.");
  }

  return withChecksum({
    version: OFFLINE_RECORD_VERSION,
    kind: "public-content-cache",
    owner: OFFLINE_OWNER,
    informationClass: OFFLINE_INFORMATION_CLASS,
    revision: 0,
    createdAtMs: nowMs,
    updatedAtMs: nowMs,
    expiresAtMs: nowMs + OFFLINE_TTLS_MS.publicContent,
    packageVersion: manifest.version,
    payload: {
      manifest: {
        id: manifest.id,
        version: manifest.version,
        apiVersion: manifest.apiVersion,
        contentSchemaVersion: manifest.contentSchemaVersion,
        contentIds: freezeList(manifest.contentIds),
      },
      entries,
    },
  });
}

export function createSyntheticSessionRecord({ state, nowMs }) {
  const payload = sanitizeSyntheticSessionForStorage(state);
  return withChecksum({
    version: OFFLINE_RECORD_VERSION,
    kind: "synthetic-session",
    owner: OFFLINE_OWNER,
    informationClass: OFFLINE_INFORMATION_CLASS,
    revision: payload.revision,
    createdAtMs: nowMs,
    updatedAtMs: nowMs,
    expiresAtMs: nowMs + OFFLINE_TTLS_MS.syntheticSession,
    stateVersion: SYNTHETIC_SESSION_STATE_VERSION,
    payload,
  });
}

export function serializeOfflineRecord(record) {
  const serialized = canonicalJson(record);
  const limit =
    record.kind === "public-content-cache"
      ? OFFLINE_BYTE_LIMITS.publicContent
      : OFFLINE_BYTE_LIMITS.syntheticSession;
  if (estimateOfflineBytes(serialized) > limit) {
    return Object.freeze({
      ok: false,
      status: "low-storage",
      serialized: null,
      bytes: estimateOfflineBytes(serialized),
      limit,
    });
  }
  return Object.freeze({
    ok: true,
    status: "ready",
    serialized,
    bytes: estimateOfflineBytes(serialized),
    limit,
  });
}

function migrateLegacyOfflineRecord(record) {
  if (
    record?.version !== LEGACY_OFFLINE_RECORD_VERSION ||
    !OFFLINE_RECORD_KINDS.includes(record.kind) ||
    typeof record.savedAtMs !== "number" ||
    typeof record.expiresAtMs !== "number"
  ) {
    return null;
  }

  const payload =
    record.kind === "synthetic-session"
      ? sanitizeSyntheticSessionForStorage(record.payload)
      : record.payload;

  const migrated = {
    version: OFFLINE_RECORD_VERSION,
    kind: record.kind,
    owner: OFFLINE_OWNER,
    informationClass: OFFLINE_INFORMATION_CLASS,
    revision: isFiniteInteger(record.revision) ? record.revision : 0,
    createdAtMs: record.savedAtMs,
    updatedAtMs: record.savedAtMs,
    expiresAtMs: record.expiresAtMs,
    ...(record.kind === "synthetic-session"
      ? { stateVersion: SYNTHETIC_SESSION_STATE_VERSION }
      : { packageVersion: record.packageVersion }),
    payload,
  };
  return withChecksum(migrated);
}

function validateRecordShape(record, expectedKind) {
  if (
    !record ||
    record.version !== OFFLINE_RECORD_VERSION ||
    record.kind !== expectedKind ||
    record.owner !== OFFLINE_OWNER ||
    record.informationClass !== OFFLINE_INFORMATION_CLASS ||
    !isFiniteInteger(record.revision) ||
    typeof record.createdAtMs !== "number" ||
    typeof record.updatedAtMs !== "number" ||
    typeof record.expiresAtMs !== "number" ||
    typeof record.checksum !== "string"
  ) {
    return false;
  }
  const { checksum, ...withoutChecksum } = record;
  return checksumOfflineRecord(withoutChecksum) === checksum;
}

export function decodeOfflineRecord(
  serialized,
  { expectedKind, nowMs, packageVersion },
) {
  if (serialized === null || serialized === undefined) {
    return Object.freeze({ ok: false, status: "missing" });
  }

  let parsed;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    return Object.freeze({ ok: false, status: "corrupt" });
  }

  if (parsed?.version === LEGACY_OFFLINE_RECORD_VERSION) {
    parsed = migrateLegacyOfflineRecord(parsed);
    if (!parsed) {
      return Object.freeze({ ok: false, status: "unsupported-version" });
    }
  }

  if (parsed?.version !== OFFLINE_RECORD_VERSION) {
    return Object.freeze({ ok: false, status: "unsupported-version" });
  }

  if (!validateRecordShape(parsed, expectedKind)) {
    return Object.freeze({ ok: false, status: "corrupt" });
  }

  if (parsed.expiresAtMs <= nowMs) {
    return Object.freeze({ ok: false, status: "expired", record: parsed });
  }

  if (
    expectedKind === "public-content-cache" &&
    parsed.packageVersion !== packageVersion
  ) {
    return Object.freeze({ ok: false, status: "stale", record: parsed });
  }

  if (
    expectedKind === "public-content-cache" &&
    (!validatePublicEntries(parsed.payload?.entries) ||
      parsed.payload?.manifest?.version !== packageVersion)
  ) {
    return Object.freeze({ ok: false, status: "corrupt" });
  }

  if (
    expectedKind === "synthetic-session" &&
    (parsed.stateVersion !== SYNTHETIC_SESSION_STATE_VERSION ||
      !validateSessionPayload(parsed.payload))
  ) {
    return Object.freeze({ ok: false, status: "unsupported-version" });
  }

  return Object.freeze({
    ok: true,
    status:
      parsed.version === LEGACY_OFFLINE_RECORD_VERSION ? "migrated" : "valid",
    record: deepFreeze(parsed),
  });
}

export function resolveOfflineWrite(
  existingSerialized,
  candidate,
  { nowMs, packageVersion },
) {
  const existing = decodeOfflineRecord(existingSerialized, {
    expectedKind: candidate.kind,
    nowMs,
    packageVersion,
  });

  if (!existing.ok) {
    return Object.freeze({
      status: "replace",
      candidate,
      replacedStatus: existing.status,
    });
  }

  if (
    candidate.kind === "public-content-cache" &&
    existing.record.packageVersion !== candidate.packageVersion
  ) {
    return Object.freeze({ status: "replace", candidate });
  }

  if (
    canonicalJson(existing.record.payload) === canonicalJson(candidate.payload)
  ) {
    return Object.freeze({
      status: "unchanged",
      candidate: existing.record,
    });
  }

  if (existing.record.revision > candidate.revision) {
    return Object.freeze({
      status: "conflict",
      reason: "stored-revision-is-newer",
      existing: existing.record,
      candidate,
    });
  }

  if (
    existing.record.revision === candidate.revision &&
    existing.record.checksum !== candidate.checksum
  ) {
    return Object.freeze({
      status: "conflict",
      reason: "same-revision-diverged",
      existing: existing.record,
      candidate,
    });
  }

  if (existing.record.checksum === candidate.checksum) {
    return Object.freeze({
      status: "unchanged",
      candidate: existing.record,
    });
  }

  return Object.freeze({ status: "write", candidate });
}

function isQuotaLikeError(error) {
  return /quota|space|storage.*full|disk.*full/i.test(
    `${error?.name ?? ""} ${error?.message ?? ""}`,
  );
}

async function removeInvalidRecord(storage, key, result) {
  if (
    ["corrupt", "expired", "stale", "unsupported-version"].includes(
      result.status,
    )
  ) {
    try {
      await storage.removeItem(key);
    } catch {
      // The caller still receives the fail-closed read result.
    }
  }
}

export function createOfflineController({ storage, now, publicContent }) {
  async function cachePublicContent() {
    const nowMs = now();
    const record = createPublicContentCacheRecord({
      entries: publicContent.entries,
      manifest: publicContent.manifest,
      nowMs,
    });
    const serialized = serializeOfflineRecord(record);
    if (!serialized.ok) return serialized;

    let existingSerialized = null;
    try {
      existingSerialized = await storage.getItem(OFFLINE_PUBLIC_CONTENT_KEY);
    } catch {
      return Object.freeze({
        ok: false,
        status: "storage-unavailable",
        fallback: "bundled-public-content",
      });
    }

    const resolution = resolveOfflineWrite(existingSerialized, record, {
      nowMs,
      packageVersion: publicContent.manifest.version,
    });
    if (resolution.status === "conflict") {
      return Object.freeze({
        ok: false,
        status: "conflict",
        reason: resolution.reason,
        fallback: "bundled-public-content",
      });
    }
    if (resolution.status === "unchanged") {
      return Object.freeze({
        ok: true,
        status: "cached",
        bytes: serialized.bytes,
        source: "existing-cache",
      });
    }

    try {
      await storage.setItem(OFFLINE_PUBLIC_CONTENT_KEY, serialized.serialized);
      return Object.freeze({
        ok: true,
        status: "cached",
        bytes: serialized.bytes,
        source: "bundled-package",
      });
    } catch (error) {
      return Object.freeze({
        ok: false,
        status: isQuotaLikeError(error) ? "low-storage" : "storage-unavailable",
        fallback: "bundled-public-content",
      });
    }
  }

  async function storeSyntheticSession(state) {
    const nowMs = now();
    const record = createSyntheticSessionRecord({ state, nowMs });
    const serialized = serializeOfflineRecord(record);
    if (!serialized.ok) return serialized;

    let existingSerialized = null;
    try {
      existingSerialized = await storage.getItem(OFFLINE_SYNTHETIC_SESSION_KEY);
    } catch {
      return Object.freeze({
        ok: false,
        status: "storage-unavailable",
        fallback: "memory-only",
      });
    }

    const resolution = resolveOfflineWrite(existingSerialized, record, {
      nowMs,
      packageVersion: publicContent.manifest.version,
    });
    if (resolution.status === "conflict") {
      return Object.freeze({
        ok: false,
        status: "conflict",
        reason: resolution.reason,
        fallback: "memory-only",
      });
    }
    if (resolution.status === "unchanged") {
      return Object.freeze({
        ok: true,
        status: "stored",
        bytes: serialized.bytes,
        source: "existing-record",
      });
    }

    try {
      await storage.setItem(
        OFFLINE_SYNTHETIC_SESSION_KEY,
        serialized.serialized,
      );
      return Object.freeze({
        ok: true,
        status: "stored",
        bytes: serialized.bytes,
        source: "temporary-session",
      });
    } catch (error) {
      if (!isQuotaLikeError(error)) {
        return Object.freeze({
          ok: false,
          status: "storage-unavailable",
          fallback: "memory-only",
        });
      }

      try {
        await storage.removeItem(OFFLINE_PUBLIC_CONTENT_KEY);
        await storage.setItem(
          OFFLINE_SYNTHETIC_SESSION_KEY,
          serialized.serialized,
        );
        return Object.freeze({
          ok: true,
          status: "stored-after-cache-eviction",
          bytes: serialized.bytes,
          source: "temporary-session",
        });
      } catch {
        return Object.freeze({
          ok: false,
          status: "low-storage",
          fallback: "memory-only",
        });
      }
    }
  }

  async function readRecord(key, expectedKind) {
    let serialized;
    try {
      serialized = await storage.getItem(key);
    } catch {
      return Object.freeze({
        ok: false,
        status: "storage-unavailable",
      });
    }
    const result = decodeOfflineRecord(serialized, {
      expectedKind,
      nowMs: now(),
      packageVersion: publicContent.manifest.version,
    });
    await removeInvalidRecord(storage, key, result);
    return result;
  }

  async function inspect() {
    const [publicContentResult, syntheticSessionResult] = await Promise.all([
      readRecord(OFFLINE_PUBLIC_CONTENT_KEY, "public-content-cache"),
      readRecord(OFFLINE_SYNTHETIC_SESSION_KEY, "synthetic-session"),
    ]);
    return Object.freeze({
      publicContent: publicContentResult,
      syntheticSession: syntheticSessionResult,
      fallback: "bundled-public-content",
    });
  }

  async function loadSyntheticSession() {
    const result = await readRecord(
      OFFLINE_SYNTHETIC_SESSION_KEY,
      "synthetic-session",
    );
    if (!result.ok) return result;
    return Object.freeze({
      ok: true,
      status: "available",
      payload: result.record.payload,
      recordRevision: result.record.revision,
    });
  }

  async function clearSyntheticSession() {
    try {
      await storage.removeItem(OFFLINE_SYNTHETIC_SESSION_KEY);
      return Object.freeze({ ok: true, status: "cleared-session" });
    } catch {
      return Object.freeze({
        ok: false,
        status: "storage-unavailable",
        fallback: "memory-only",
      });
    }
  }

  async function clearAll() {
    try {
      await Promise.all([
        storage.removeItem(OFFLINE_PUBLIC_CONTENT_KEY),
        storage.removeItem(OFFLINE_SYNTHETIC_SESSION_KEY),
      ]);
      return Object.freeze({ ok: true, status: "cleared-all" });
    } catch {
      return Object.freeze({
        ok: false,
        status: "storage-unavailable",
        fallback: "bundled-public-content",
      });
    }
  }

  return Object.freeze({
    cachePublicContent,
    storeSyntheticSession,
    inspect,
    loadSyntheticSession,
    clearSyntheticSession,
    clearAll,
  });
}

export function restoreSyntheticSessionPayload(payload) {
  if (!validateSessionPayload(payload)) {
    return Object.freeze({
      ok: false,
      status: "corrupt",
    });
  }
  return Object.freeze({
    ok: true,
    status: "restorable",
    state: Object.freeze({
      ...payload,
      presentedSceneIds: freezeList(payload.presentedSceneIds),
      authority: CLIENT_AUTHORITY_CEILING,
      notice:
        "Stored public/synthetic presentation state is available. No completion, reward, permission, Chronicle truth, or personal progress transferred.",
    }),
  });
}
