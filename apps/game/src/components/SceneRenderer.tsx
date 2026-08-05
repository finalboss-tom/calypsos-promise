import { useRouter } from "expo-router";
import { useMemo, useReducer } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  DIRECT_SCENE_ID,
  PRESENTATION_AUTHORITY,
  WELCOME_SCENE_ID,
  resolvePresentationScene,
  resolveSyntheticChoice,
} from "../presentation/synthetic-presentation";
import {
  canInteractWithSyntheticSession,
  createPresentedSyntheticSessionState,
  isTerminalSyntheticSession,
  transitionSyntheticSession,
  type SyntheticSessionState,
  type SyntheticSessionStatus,
} from "../state/synthetic-session-state.mjs";
import { colors, radii, spacing } from "../theme";
import { DialogueChoices } from "./DialogueChoices";
import { QuestCard } from "./QuestCard";
import { StateAuthorityPanel } from "./StateAuthorityPanel";
import { WayfinderOrb } from "./WayfinderOrb";

interface SceneRendererProps {
  initialSceneId?: string;
}

type DemonstrableStatus = Extract<
  SyntheticSessionStatus,
  "pending" | "failed" | "stale" | "corrected" | "superseded" | "conflict"
>;

export function SceneRenderer({
  initialSceneId = WELCOME_SCENE_ID,
}: SceneRendererProps) {
  const router = useRouter();
  const [session, dispatch] = useReducer(
    transitionSyntheticSession,
    initialSceneId,
    createPresentedSyntheticSessionState,
  );

  const resolution = useMemo(
    () => resolvePresentationScene(session.sceneId),
    [session.sceneId],
  );

  function openScene(nextSceneId: string, notice: string) {
    dispatch({
      type: "scene-presented",
      sceneId: nextSceneId,
      notice,
    });
  }

  function restart() {
    dispatch({
      type: "restart",
      sceneId: WELCOME_SCENE_ID,
      notice:
        "Nothing has been recorded. The temporary synthetic session restarted from bundled welcome content, and no history was retained.",
    });
  }

  function choose(choiceId: string) {
    const outcome = resolveSyntheticChoice(session.sceneId, choiceId);

    if (outcome.kind === "scene") {
      openScene(outcome.nextSceneId, outcome.announcement);
      return;
    }

    if (outcome.kind === "route") {
      router.push(outcome.route);
      return;
    }

    if (outcome.kind === "message") {
      dispatch({ type: outcome.status, notice: outcome.announcement });
      return;
    }

    if (outcome.kind === "exit") {
      dispatch({ type: "discarded", notice: outcome.announcement });
      return;
    }

    dispatch({
      type: "failed",
      reason: "invalid-choice-outcome",
      notice: outcome.announcement,
    });
  }

  function demonstrateState(status: DemonstrableStatus) {
    switch (status) {
      case "pending":
        dispatch({
          type: "scene-requested",
          sceneId: session.sceneId,
          notice:
            "Pending was demonstrated without optimistic completion, reward, or personal progress.",
        });
        return;
      case "failed":
        dispatch({
          type: "failed",
          reason: "synthetic-demonstration",
          notice:
            "Failure was demonstrated. The renderer stopped authority instead of inventing success.",
        });
        return;
      case "stale":
        dispatch({
          type: "stale",
          notice:
            "Stale presentation evidence was demonstrated. It cannot support current completion or progress.",
        });
        return;
      case "corrected":
        dispatch({
          type: "corrected",
          notice:
            "A correction was demonstrated. The correction is visible but still cannot create authority.",
        });
        return;
      case "superseded":
        dispatch({
          type: "superseded",
          replacementSceneId: DIRECT_SCENE_ID,
          notice:
            "Supersession was demonstrated. Prior presentation evidence cannot retain completion authority.",
        });
        return;
      case "conflict":
        dispatch({
          type: "conflict",
          reason: "two synthetic presentation claims disagree",
          notice:
            "Conflict was demonstrated. The client failed closed and requires an explicit restart or correction.",
        });
    }
  }

  if (!resolution.ok) {
    const failedSession = transitionSyntheticSession(session, {
      type: "failed",
      reason: resolution.reason,
      notice:
        "The requested package scene failed closed. No completion, reward, permission, or progress was created.",
    });

    return (
      <View style={styles.renderer}>
        <StateAuthorityPanel
          session={failedSession}
          onDemonstrate={demonstrateState}
          onRestart={restart}
        />
        <View accessibilityRole="alert" style={styles.fallback}>
          <Text accessibilityRole="header" style={styles.fallbackTitle}>
            Scene package unavailable
          </Text>
          <Text style={styles.fallbackBody}>{resolution.reason}</Text>
          <Text style={styles.fallbackDetail}>
            Missing:{" "}
            {resolution.missingIds.join(", ") || "unknown package entry"}
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
      </View>
    );
  }

  const { scene, zone, dialogues, speakers, quest } = resolution.bundle;
  const speakerById = new Map(
    speakers.map((speaker) => [speaker.id, speaker.displayName] as const),
  );
  const interactionAllowed = canInteractWithSyntheticSession(session);
  const terminal = isTerminalSyntheticSession(session);

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

      <StateAuthorityPanel
        session={session}
        onDemonstrate={demonstrateState}
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
          <StateMessage
            title={`Synthetic session state: ${session.status}`}
            notice={session.notice}
            detail="Essential information remains available. This state is temporary, non-authoritative, and clearable."
            onRestart={restart}
          />
        ) : interactionAllowed ? (
          <DialogueChoices choices={scene.choices} onChoose={choose} />
        ) : (
          <StateMessage
            title={`Interaction paused: ${session.status}`}
            notice={session.notice}
            detail="The scene remains readable, but choices cannot create or bypass authority while this state is unresolved."
            onRestart={restart}
          />
        )}

        <Text accessibilityLiveRegion="polite" style={styles.announcement}>
          {session.notice}
        </Text>
      </View>

      {quest ? (
        <QuestCard quest={quest} session={session} />
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

function StateMessage({
  title,
  notice,
  detail,
  onRestart,
}: {
  title: string;
  notice: string;
  detail: string;
  onRestart: () => void;
}) {
  return (
    <View accessibilityRole="alert" style={styles.terminal}>
      <Text style={styles.terminalTitle}>{title}</Text>
      <Text style={styles.terminalBody}>{notice}</Text>
      <Text style={styles.terminalBody}>{detail}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onRestart}
        style={({ pressed }: { pressed: boolean }) => [
          styles.restartButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.restartText}>Restart presentation</Text>
      </Pressable>
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
