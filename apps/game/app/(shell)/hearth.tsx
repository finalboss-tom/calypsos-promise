import { getGameContentEntry } from "@calypsos-promise/game-content";
import { StyleSheet, Text, View } from "react-native";

import { ActionLink } from "../../src/components/ActionLink";
import { BoundaryNotice } from "../../src/components/BoundaryNotice";
import { ContentFallback } from "../../src/components/ContentFallback";
import { ShellPage } from "../../src/components/ShellPage";
import { colors, radii, spacing } from "../../src/theme";

const welcomeEntry = getGameContentEntry("dialogue.aster.welcome.synthetic");
const choiceEntry = getGameContentEntry("dialogue.aster.choice.synthetic");
const asterEntry = getGameContentEntry("character.aster.synthetic-guide");

export default function HearthScreen() {
  if (
    welcomeEntry?.content.kind !== "dialogue" ||
    choiceEntry?.content.kind !== "dialogue" ||
    asterEntry?.content.kind !== "character"
  ) {
    return (
      <ShellPage
        eyebrow="HEARTH FALLBACK"
        title="The Hearth content is unavailable."
        intro="The shell failed closed instead of inventing or substituting content."
        tone="dark"
      >
        <ContentFallback
          title="Bundled Hearth content could not be resolved"
          detail="No model, network service, or hidden fallback was used. You can return to the map or clear the temporary route."
        />
      </ShellPage>
    );
  }

  return (
    <ShellPage
      eyebrow="THE HEARTH · NARRATIVE PATH"
      title="A warm place to begin, with every exit still visible."
      intro="This route presents bundled story framing only. A generic scene engine, quest execution, and durable state remain outside 10.3."
      tone="dark"
      aside={
        <BoundaryNotice tone="dark">
          Aster is a pre-authored synthetic guide here. No model provider is
          active, and this dialogue cannot create truth, permission, progress,
          or an inferred preference.
        </BoundaryNotice>
      }
    >
      <View style={styles.scene}>
        <View accessibilityElementsHidden style={styles.fireRing}>
          <View style={styles.fireCore} />
        </View>
        <View style={styles.dialoguePanel}>
          <Text style={styles.speaker}>{asterEntry.content.displayName}</Text>
          <Text style={styles.dialogue}>{welcomeEntry.content.text}</Text>
          <Text style={styles.dialogue}>{choiceEntry.content.text}</Text>
          <View style={styles.pathLabel}>
            <Text style={styles.pathLabelText}>
              Narrative presentation only
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <ActionLink
          href="/map"
          label="Open the island map"
          description="Continue through presentation-only shell navigation."
        />
        <ActionLink
          href="/direct"
          label="Switch to the direct explanation"
          description="Receive materially equivalent essential information without story framing."
          variant="secondary"
        />
        <ActionLink
          href={{ pathname: "/", params: { status: "paused" } }}
          label="Pause and clear this route"
          description="Return to arrival with no penalty or retained session progress."
          variant="quiet"
        />
      </View>
    </ShellPage>
  );
}

const styles = StyleSheet.create({
  scene: {
    minHeight: 360,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.nightSoft,
    padding: spacing.xlarge,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.xlarge,
  },
  fireRing: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    backgroundColor: colors.ocean,
    alignItems: "center",
    justifyContent: "center",
  },
  fireCore: {
    width: 74,
    height: 108,
    borderTopLeftRadius: 52,
    borderTopRightRadius: 52,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.gold,
  },
  dialoguePanel: {
    flexGrow: 1,
    flexBasis: 430,
    gap: spacing.medium,
  },
  speaker: {
    color: colors.goldSoft,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  dialogue: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 31,
  },
  pathLabel: {
    alignSelf: "flex-start",
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pathLabelText: {
    color: colors.foam,
    fontSize: 12,
    fontWeight: "700",
  },
  actions: {
    gap: spacing.small,
  },
});
