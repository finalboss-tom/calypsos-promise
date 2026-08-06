import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GAME_CONTENT_ENTRIES,
  GAME_CONTENT_MANIFEST,
} from "@calypsos-promise/game-content";

import {
  createOfflineController,
  restoreSyntheticSessionPayload,
  type OfflineOperationResult,
  type StoredSyntheticSessionPayload,
} from "./offline-resilience.mjs";
import type { SyntheticSessionState } from "../state/synthetic-session-state.mjs";

const controller = createOfflineController({
  storage: AsyncStorage,
  now: () => Date.now(),
  publicContent: {
    entries: GAME_CONTENT_ENTRIES,
    manifest: GAME_CONTENT_MANIFEST,
  },
});

export type { OfflineOperationResult, StoredSyntheticSessionPayload };

export function cacheBundledPublicContent(): Promise<OfflineOperationResult> {
  return controller.cachePublicContent();
}

export function inspectOfflineStorage() {
  return controller.inspect();
}

export function storeTemporarySyntheticSession(
  state: SyntheticSessionState,
): Promise<OfflineOperationResult> {
  return controller.storeSyntheticSession(state);
}

export async function loadTemporarySyntheticSession(): Promise<
  OfflineOperationResult & { restoredState?: SyntheticSessionState }
> {
  const result = await controller.loadSyntheticSession();
  if (!result.ok || !result.payload) return result;

  const restored = restoreSyntheticSessionPayload(result.payload);
  if (!restored.ok) {
    await controller.clearSyntheticSession();
    return {
      ok: false,
      status: "corrupt",
      fallback: "memory-only",
    };
  }

  return {
    ...result,
    restoredState: restored.state,
  };
}

export function clearStoredSyntheticSession(): Promise<OfflineOperationResult> {
  return controller.clearSyntheticSession();
}

export function clearAllOfflineStorage(): Promise<OfflineOperationResult> {
  return controller.clearAll();
}
