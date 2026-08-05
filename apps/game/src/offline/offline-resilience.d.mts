import type {
  SyntheticSessionState,
  SyntheticSessionStatus,
} from "../state/synthetic-session-state.mjs";

export type OfflineRecordKind = "public-content-cache" | "synthetic-session";

export interface OfflineStorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export interface StoredSyntheticSessionPayload {
  readonly version: "0.1.0";
  readonly revision: number;
  readonly status: SyntheticSessionStatus;
  readonly sceneId: string;
  readonly presentedSceneIds: readonly string[];
}

export interface OfflineOperationResult {
  readonly ok: boolean;
  readonly status: string;
  readonly reason?: string;
  readonly fallback?: "bundled-public-content" | "memory-only";
  readonly bytes?: number;
  readonly source?: string;
  readonly payload?: StoredSyntheticSessionPayload;
}

export const OFFLINE_RECORD_VERSION: "0.1.0";
export const LEGACY_OFFLINE_RECORD_VERSION: "0.0.1";
export const OFFLINE_OWNER: "apps/game";
export const OFFLINE_INFORMATION_CLASS: "PUBLIC_SYNTHETIC";
export const OFFLINE_PUBLIC_CONTENT_KEY: string;
export const OFFLINE_SYNTHETIC_SESSION_KEY: string;
export const OFFLINE_RECORD_KINDS: readonly OfflineRecordKind[];
export const OFFLINE_TTLS_MS: {
  readonly publicContent: number;
  readonly syntheticSession: number;
};
export const OFFLINE_BYTE_LIMITS: {
  readonly publicContent: number;
  readonly syntheticSession: number;
};

export function checksumOfflineRecord(
  recordWithoutChecksum: Readonly<Record<string, unknown>>,
): string;
export function estimateOfflineBytes(serialized: string): number;
export function sanitizeSyntheticSessionForStorage(
  state: SyntheticSessionState,
): StoredSyntheticSessionPayload;
export function createPublicContentCacheRecord(input: {
  entries: readonly unknown[];
  manifest: Readonly<{
    id: string;
    version: string;
    apiVersion: string;
    contentSchemaVersion: string;
    contentIds: readonly string[];
    informationClass: "PUBLIC_SYNTHETIC";
    synthetic: true;
  }>;
  nowMs: number;
}): Readonly<Record<string, unknown>>;
export function createSyntheticSessionRecord(input: {
  state: SyntheticSessionState;
  nowMs: number;
}): Readonly<Record<string, unknown>>;
export function serializeOfflineRecord(
  record: Readonly<Record<string, unknown>>,
):
  | Readonly<{
      ok: true;
      status: "ready";
      serialized: string;
      bytes: number;
      limit: number;
    }>
  | Readonly<{
      ok: false;
      status: "low-storage";
      serialized: null;
      bytes: number;
      limit: number;
    }>;
export function decodeOfflineRecord(
  serialized: string | null,
  options: {
    expectedKind: OfflineRecordKind;
    nowMs: number;
    packageVersion?: string;
  },
): Readonly<Record<string, unknown>>;
export function resolveOfflineWrite(
  existingSerialized: string | null,
  candidate: Readonly<Record<string, unknown>>,
  options: { nowMs: number; packageVersion?: string },
): Readonly<Record<string, unknown>>;
export function createOfflineController(input: {
  storage: OfflineStorageAdapter;
  now: () => number;
  publicContent: {
    entries: readonly unknown[];
    manifest: Readonly<{
      id: string;
      version: string;
      apiVersion: string;
      contentSchemaVersion: string;
      contentIds: readonly string[];
      informationClass: "PUBLIC_SYNTHETIC";
      synthetic: true;
    }>;
  };
}): {
  cachePublicContent(): Promise<OfflineOperationResult>;
  storeSyntheticSession(
    state: SyntheticSessionState,
  ): Promise<OfflineOperationResult>;
  inspect(): Promise<
    Readonly<{
      publicContent: Readonly<Record<string, unknown>>;
      syntheticSession: Readonly<Record<string, unknown>>;
      fallback: "bundled-public-content";
    }>
  >;
  loadSyntheticSession(): Promise<OfflineOperationResult>;
  clearSyntheticSession(): Promise<OfflineOperationResult>;
  clearAll(): Promise<OfflineOperationResult>;
};
export function restoreSyntheticSessionPayload(
  payload: StoredSyntheticSessionPayload,
):
  | Readonly<{
      ok: true;
      status: "restorable";
      state: SyntheticSessionState;
    }>
  | Readonly<{ ok: false; status: "corrupt" }>;
