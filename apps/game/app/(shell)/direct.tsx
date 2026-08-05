import { getGameContentEntry } from "@calypsos-promise/game-content";
import { StyleSheet, Text, View } from "react-native";

import { ActionLink } from "../../src/components/ActionLink";
import { BoundaryNotice } from "../../src/components/BoundaryNotice";
import { ContentFallback } from "../../src/components/ContentFallback";
import { ShellPage } from "../../src/components/ShellPage";
import { colors, radii, spacing } from "../../src/theme";

const directEntry = getGameContentEntry("dialogue.aster.direct-path.synthetic");
const lessonEntry = getGameContentEntry(
  "lesson.shell.authority-boundary.synthetic",
);

const inactiveCapabilities = [
  "Accounts and identity",
  "Private Chronicle records",
  "Production Aster or model providers",
  "Analytics or preference inference",
  "Permission grants",
  "Durable progress or rewards",
];

export default function DirectPathScreen() {
  if (
    directEntry?.content.kind !== "dialogue" ||
    lessonEntry?.content.kind !== "lesson"
  ) {
    return (
      <ShellPage
        eyebrow="DIRECT PATH FALLBACK"
        title="The direct explanation is unavailable."
        intro="The shell failed closed and will not generate replacement health or authority content."
        tone="dark"
      >
        <ContentFallback
          title="Bundled direct-path content could not be resolved"
          detail="Essential content was not fetched from a provider or inferred from your behavior. Return to the map or clear this temporary route."
        />
      </ShellPage>
    );
  }

  return (
    <ShellPage
      eyebrow="DIRECT INFORMATION PATH"
      title="The same essential boundary, without story traversal."
      intro={directEntry.content.plainLanguageText ?? directEntry.content.text}
      aside={
        <BoundaryNotice>
          Choosing this route does not mark you as less engaged, create a
          preference profile, reduce access, or change any future authority.
        </BoundaryNotice>
      }
    >
      <View style={styles.lessonCard}>
        <Text style={styles.lessonKicker}>WHAT THIS SHELL CAN PROVE</Text>
        <Text accessibilityRole="header" style={styles.lessonTitle}>
          {lessonEntry.content.title}
        </Text>
        <Text style={styles.lessonBody}>
          {lessonEntry.content.plainLanguageBody}
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.activeCard}>
          <Text style={styles.cardKicker}>ACTIVE IN 10.3</Text>
          <Text style={styles.cardTitle}>Presentation navigation</Text>
          <Text style={styles.cardBody}>
            The app can identify its public content revision and move between
            arrival, map, Hearth, direct, unavailable, and fallback routes.
          </Text>
        </View>
        <View style={styles.inactiveCard}>
          <Text style={styles.inactiveKicker}>EXPLICITLY INACTIVE</Text>
          {inactiveCapabilities.map((capability) => (
            <View key={capability} style={styles.inactiveRow}>
              <Text accessibilityElementsHidden style={styles.inactiveMark}>
                —
              </Text>
              <Text style={styles.inactiveText}>{capability}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <ActionLink
          href="/map"
          label="Open the island map"
          description="Review available and planned places."
        />
        <ActionLink
          href="/hearth"
          label="Use the narrative path"
          description="Receive the same essential boundary with story framing."
          variant="secondary"
        />
        <ActionLink
          href={{ pathname: "/", params: { status: "discarded" } }}
          label="Exit and discard temporary navigation"
          description="Return to arrival without saving a profile or progress state."
          variant="quiet"
        />
      </View>
    </ShellPage>
  );
}

const styles = StyleSheet.create({
  lessonCard: {
    borderRadius: radii.large,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.large,
    gap: spacing.small,
  },
  lessonKicker: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  lessonTitle: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "800",
  },
  lessonBody: {
    color: colors.inkSoft,
    fontSize: 17,
    lineHeight: 26,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.medium,
  },
  activeCard: {
    flexGrow: 1,
    flexBasis: 300,
    borderRadius: radii.large,
    backgroundColor: colors.goldSoft,
    padding: spacing.large,
    gap: spacing.small,
  },
  inactiveCard: {
    flexGrow: 1,
    flexBasis: 300,
    borderRadius: radii.large,
    backgroundColor: colors.nightSoft,
    padding: spacing.large,
    gap: spacing.small,
  },
  cardKicker: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  inactiveKicker: {
    color: colors.goldSoft,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "800",
  },
  cardBody: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 23,
  },
  inactiveRow: {
    flexDirection: "row",
    gap: spacing.small,
    alignItems: "flex-start",
  },
  inactiveMark: {
    color: colors.goldSoft,
    fontSize: 16,
    fontWeight: "800",
  },
  inactiveText: {
    flex: 1,
    color: colors.foam,
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.small,
  },
});
