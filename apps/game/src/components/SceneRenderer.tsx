import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  DIRECT_SCENE_ID,
  PRESENTATION_AUTHORITY,
  WELCOME_SCENE_ID,
  resolvePresentationScene,
  resolveSyntheticChoice,
} from "../presentation/synthetic-presentation";
import { colors, radii, spacing } from "../theme";
import { DialogueChoices } from "./DialogueChoices";
import { QuestCard } from "./QuestCard";
import { WayfinderOrb } from "./WayfinderOrb";

interface SceneRendererProps {
  initialSceneId?: string;
}

export function SceneRenderer({
  initialSceneId = WELCOME_SCENE_ID,
}: SceneRendererProps) {
  const router = useRouter();
  const [sceneId, setSceneId] = useState(initialSceneId);
  const [announcement, setAnnouncement] = useState(
    "Synthetic presentation ready. Nothing has been recorded.",
  );
  const [terminal, setTerminal] = useState<
    "deferred" | "refused" | "discarded" | null
  >(null);
  const [presentedSceneIds, setPresentedSceneIds] = useState<readonly string[]>(
    [initialSceneId],
  );

  const resolution = useMemo(
    () => resolvePresentationScene(sceneId),
    [sceneId],
  );

  function openScene(nextSceneId: string, message: string) {
    setSceneId(nextSceneId);
    setTerminal(null);
    setAnnouncement(message);
    setPresentedSceneIds((current) =>
      current.includes(nextSceneId) ? current : [...current, nextSceneId],
    );
  }

  function restart() {
    setSceneId(WELCOME_SCENE_ID);
    setTerminal(null);
    setPresentedSceneIds([WELCOME_SCENE_ID]);
    setAnnouncement(
      "The temporary synthetic presentation restarted. No history was retained.",
    );
  }

  function choose(choiceId: string) {
    const outcome = resolveSyntheticChoice(sceneId, choiceId);
    setAnnouncement(outcome.announcement);

    if (outcome.kind === "scene") {
      openScene(outcome.nextSceneId, outcome.announcement);
      return;
    }

    if (outcome.kind === "route") {
      router.push(outcome.route);
      return;
    }

    if (outcome.kind === "message") {
      setTerminal(outcome.status);
      return;
    }

    if (outcome.kind === "exit") {
      setTerminal(outcome.status);
    }
  }

  if (!resolution.ok) {
    return (
      <View accessibilityRole="alert" style={styles.fallback}>
        <Text accessibilityRole="header" style={styles.fallbackTitle}>
          Scene package unavailable
        </Text>
        <Text style={styles.fallbackBody}>{resolution.reason}</Text>
        <Text style={styles.fallbackDetail}>
          Missing: {resolution.missingIds.join(", ") || "unknown package entry"}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={restart}
          style={({ pressed }: { pressed: boolean }) => [
            styles.restartButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.restartText}>Restart from bundled welcome</Text>
        </Pressable>
      </View>
    );
  }

  const { scene, zone, dialogues, speakers, quest } = resolution.bundle;
  const speakerById = new Map(
    speakers.map((speaker) => [speaker.id, speaker.displayName] as const),
  );
  const scenePresented = presentedSceneIds.includes(
    "scene.hearth.direct-path.synthetic",
  );

  return (
    <View style={styles.renderer}>
      <View accessibilityRole="summary" style={styles.zone}>
        <Text style={styles.kicker}>ZONE RENDERER</Text>
        <Text accessibilityRole="header" style={styles.zoneTitle}>
          {zone.title}
        </Text>
        <Text style={styles.zoneBody}>{zone.publicPurpose}</Text>
        <Text style={styles.zoneValue}>{zone.playerValue}</Text>
      </View>

      <WayfinderOrb
        currentSceneTitle={scene.title}
        onDirectScene={() =>
          openScene(
            DIRECT_SCENE_ID,
            "The Wayfinder Orb opened the bundled direct scene. No progress or preference was created.",
          )
        }
        onRestart={restart}
      />

      <View style={styles.scene}>
        <View style={styles.sceneHeading}>
          <View>
            <Text style={styles.kicker}>SCENE RENDERER · {scene.sequence}</Text>
            <Text accessibilityRole="header" style={styles.sceneTitle}>
              {scene.title}
            </Text>
          </View>
          <View style={styles.authorityBadge}>
            <Text style={styles.authorityText}>
              {PRESENTATION_AUTHORITY.state}
            </Text>
          </View>
        </View>

        <Text style={styles.sceneSummary}>{scene.summary}</Text>

        <View style={styles.dialogues}>
          {dialogues.map((dialogue) => (
            <View key={dialogue.id} style={styles.dialogue}>
              <Text style={styles.speaker}>
                {speakerById.get(dialogue.speakerId) ?? "Synthetic guide"}
              </Text>
              <Text style={styles.dialogueText}>{dialogue.text}</Text>
              {dialogue.plainLanguageText ? (
                <Text style={styles.plainLanguage}>
                  Plain language: {dialogue.plainLanguageText}
                </Text>
              ) : null}
            </View>
          ))}
        </View>

        {terminal ? (
          <View accessibilityRole="alert" style={styles.terminal}>
            <Text style={styles.terminalTitle}>
              Synthetic session state: {terminal}
            </Text>
            <Text style={styles.terminalBody}>{announcement}</Text>
            <Text style={styles.terminalBody}>
              Essential information remains available. This state is temporary,
              non-authoritative, and clearable.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={restart}
              style={({ pressed }: { pressed: boolean }) => [
                styles.restartButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.restartText}>Restart presentation</Text>
            </Pressable>
          </View>
        ) : (
          <DialogueChoices choices={scene.choices} onChoose={choose} />
        )}

        <Text accessibilityLiveRegion="polite" style={styles.announcement}>
          {announcement}
        </Text>
      </View>

      {quest ? (
        <QuestCard quest={quest} scenePresented={scenePresented} />
      ) : (
        <View accessibilityRole="alert" style={styles.fallback}>
          <Text style={styles.fallbackTitle}>Quest card unavailable</Text>
          <Text style={styles.fallbackBody}>
            The renderer will not invent a replacement quest or completion
            state.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  renderer: {
    gap: spacing.large,
  },
  zone: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paper,
    padding: spacing.large,
    gap: spacing.small,
  },
  kicker: {
    color: colors.coral,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  zoneTitle: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "800",
  },
  zoneBody: {
    color: colors.ink,
    fontSize: 16,
    lineHeight: 24,
  },
  zoneValue: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
  },
  scene: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.night,
    padding: spacing.large,
    gap: spacing.medium,
  },
  sceneHeading: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.medium,
  },
  sceneTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "800",
  },
  sceneSummary: {
    color: colors.foam,
    fontSize: 15,
    lineHeight: 23,
  },
  authorityBadge: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  authorityText: {
    color: colors.goldSoft,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  dialogues: {
    gap: spacing.small,
  },
  dialogue: {
    borderRadius: radii.medium,
    backgroundColor: colors.nightSoft,
    padding: spacing.medium,
    gap: spacing.xsmall,
  },
  speaker: {
    color: colors.goldSoft,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  dialogueText: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 28,
  },
  plainLanguage: {
    color: colors.foam,
    fontSize: 14,
    lineHeight: 21,
  },
  terminal: {
    borderRadius: radii.medium,
    backgroundColor: colors.ocean,
    padding: spacing.medium,
    gap: spacing.small,
  },
  terminalTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "800",
  },
  terminalBody: {
    color: colors.foam,
    fontSize: 14,
    lineHeight: 21,
  },
  announcement: {
    color: colors.foam,
    fontSize: 13,
    lineHeight: 19,
  },
  fallback: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.coral,
    backgroundColor: colors.paper,
    padding: spacing.large,
    gap: spacing.small,
  },
  fallbackTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
  },
  fallbackBody: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  fallbackDetail: {
    color: colors.coral,
    fontSize: 13,
    lineHeight: 19,
  },
  restartButton: {
    minHeight: 48,
    alignSelf: "flex-start",
    borderRadius: radii.medium,
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.medium,
    paddingVertical: 12,
    justifyContent: "center",
  },
  restartText: {
    color: colors.night,
    fontSize: 14,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.76,
  },
});
