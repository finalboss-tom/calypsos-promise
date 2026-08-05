import type { QuestContent } from "../presentation/synthetic-presentation";
import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../theme";

interface QuestCardProps {
  quest: QuestContent;
  scenePresented: boolean;
}

export function QuestCard({ quest, scenePresented }: QuestCardProps) {
  return (
    <View accessibilityRole="summary" style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.kicker}>PUBLIC SYNTHETIC QUEST CARD</Text>
        <Text accessibilityRole="header" style={styles.title}>
          {quest.publicTitle}
        </Text>
        <Text style={styles.inWorldTitle}>{quest.inWorldTitle}</Text>
      </View>

      <Text style={styles.body}>{quest.objective}</Text>

      <View style={styles.status}>
        <Text style={styles.statusLabel}>Presentation state</Text>
        <Text style={styles.statusValue}>
          {scenePresented ? "Scene shown in this session" : "Not yet shown"}
        </Text>
      </View>

      <Text style={styles.boundary}>
        This card may describe temporary synthetic presentation evidence. It
        cannot complete a quest, grant a reward, restore a canonical place, or
        create personal progress.
      </Text>

      <View style={styles.paths}>
        <Text style={styles.pathText}>Defer: {quest.deferralPath}</Text>
        <Text style={styles.pathText}>Refuse: {quest.refusalPath}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
    fontSize: 24,
    fontWeight: "800",
  },
  inWorldTitle: {
    color: colors.inkSoft,
    fontSize: 15,
    fontStyle: "italic",
  },
  body: {
    color: colors.ink,
    fontSize: 16,
    lineHeight: 24,
  },
  status: {
    borderRadius: radii.medium,
    backgroundColor: colors.goldSoft,
    padding: spacing.medium,
    gap: 3,
  },
  statusLabel: {
    color: colors.coral,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  statusValue: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "700",
  },
  boundary: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
  },
  paths: {
    gap: spacing.xsmall,
  },
  pathText: {
    color: colors.inkSoft,
    fontSize: 13,
    lineHeight: 19,
  },
});
