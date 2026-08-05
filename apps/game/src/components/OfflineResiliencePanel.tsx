import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import {
  cacheBundledPublicContent,
  clearAllOfflineStorage,
  loadTemporarySyntheticSession,
  storeTemporarySyntheticSession,
} from "../offline/async-offline-storage";
import type { SyntheticSessionState } from "../state/synthetic-session-state.mjs";
import { colors, radii, spacing } from "../theme";

interface OfflineResiliencePanelProps {
  session: SyntheticSessionState;
  onRestore: (state: SyntheticSessionState) => void;
}

export function OfflineResiliencePanel({
  session,
  onRestore,
}: OfflineResiliencePanelProps) {
  const [status, setStatus] = useState(
    "Bundled public content is available without a network. Stored session state has not been inspected.",
  );
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    setBusy(true);
    cacheBundledPublicContent()
      .then((result) => {
        if (!active) return;
        setStatus(
          result.ok
            ? "Bundled PUBLIC_SYNTHETIC content is cached for offline fallback."
            : "The public cache could not be written. Bundled content remains available without a network.",
        );
      })
      .catch(() => {
        if (active) {
          setStatus(
            "Offline storage is unavailable. The app continues with bundled public content and memory-only session state.",
          );
        }
      })
      .finally(() => {
        if (active) setBusy(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function storeSession() {
    setBusy(true);
    const result = await storeTemporarySyntheticSession(session);
    setStatus(
      result.ok
        ? "Temporary public/synthetic session state was stored. It remains non-authoritative and expires automatically."
        : result.status === "conflict"
          ? "A newer or divergent stored session exists. Nothing was overwritten; restore, clear, or restart explicitly."
          : result.status === "low-storage"
            ? "Storage is full. The current session remains available in memory, and bundled content still works offline."
            : "Temporary storage is unavailable. The current session remains memory-only.",
    );
    setBusy(false);
  }

  async function restoreSession() {
    setBusy(true);
    const result = await loadTemporarySyntheticSession();
    if (result.ok && result.restoredState) {
      onRestore(result.restoredState);
      setStatus(
        "Stored public/synthetic session state was restored explicitly. No completion, reward, permission, Chronicle truth, or personal progress transferred.",
      );
    } else {
      setStatus(
        result.status === "missing"
          ? "No stored synthetic session exists."
          : `Stored session could not be restored (${result.status}). Invalid state was cleared and bundled content remains available.`,
      );
    }
    setBusy(false);
  }

  async function clearOffline() {
    setBusy(true);
    const result = await clearAllOfflineStorage();
    setStatus(
      result.ok
        ? "Public cache metadata and temporary synthetic-session storage were cleared. Bundled content remains available."
        : "Offline storage could not be cleared through the adapter. No authority was created.",
    );
    setBusy(false);
  }

  return (
    <View accessibilityRole="summary" style={styles.panel}>
      <View style={styles.heading}>
        <Text style={styles.kicker}>OFFLINE AND RESILIENCE</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Bundled first. Temporary storage second. Authority never.
        </Text>
      </View>

      <Text style={styles.body}>
        The same versioned public content is bundled for browser, iOS, and
        Android. The offline storage adapter is unencrypted and is restricted
        here to PUBLIC_SYNTHETIC cache records and a minimal synthetic-session
        envelope.
      </Text>

      <Text style={styles.platform}>
        Platform adapter: {Platform.OS}. Quota and clearing behavior may differ,
        but protected data is prohibited everywhere.
      </Text>

      <View style={styles.actions}>
        <OfflineButton
          disabled={busy}
          label="Store temporary session"
          onPress={storeSession}
        />
        <OfflineButton
          disabled={busy}
          label="Restore stored session"
          onPress={restoreSession}
        />
        <OfflineButton
          disabled={busy}
          label="Clear offline storage"
          onPress={clearOffline}
        />
      </View>

      <Text
        accessibilityLiveRegion="polite"
        accessibilityRole="alert"
        style={styles.status}
      >
        {busy ? "Offline operation in progress. " : ""}
        {status}
      </Text>

      <Text style={styles.boundary}>
        Expired, corrupt, unsupported, oversized, or conflicting records fail
        closed. Low storage falls back to bundled content and memory-only state;
        it never creates success, completion, reward, or progress.
      </Text>
    </View>
  );
}

function OfflineButton({
  disabled,
  label,
  onPress,
}: {
  disabled: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paper,
    padding: spacing.large,
    gap: spacing.medium,
  },
  heading: {
    gap: spacing.xsmall,
  },
  kicker: {
    color: colors.coral,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "800",
  },
  body: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 23,
  },
  platform: {
    color: colors.inkSoft,
    fontSize: 13,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  button: {
    minHeight: 48,
    borderRadius: radii.medium,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.night,
    paddingHorizontal: spacing.medium,
    paddingVertical: 12,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
  status: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  boundary: {
    color: colors.inkSoft,
    fontSize: 13,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.76,
  },
  disabled: {
    opacity: 0.5,
  },
});
