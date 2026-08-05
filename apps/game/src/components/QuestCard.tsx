import type { QuestContent } from "../presentation/synthetic-presentation";
import {
  getQuestPresentationEvidence,
  type SyntheticSessionState,
} from "../state/synthetic-session-state.mjs";
import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../theme";

interface QuestCardProps {
  quest: QuestContent;
  session: SyntheticSessionState;
}

export function QuestCard({ quest, session }: QuestCardProps) {
  const evidence = getQuestPresentationEvidence(session);

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
        <Text style={styles.statusLabel}>Temporary presentation evidence</Text>
        <Text style={styles.statusValue}>{evidence.label}</Text>
        <Text style={styles.statusDetail}>
          Session status: {evidence.sessionStatus} · authoritative: no
        </Text>
      </View>

      <View style={styles.authorityGrid}>
        <AuthorityItem label="Completed" value={evidence.completed} />
        <AuthorityItem label="Rewarded" value={evidence.rewarded} />
        <AuthorityItem label="Restored" value={evidence.restored} />
        <AuthorityItem label="Unlocked" value={evidence.unlocked} />
        <AuthorityItem
          label="Personal progress"
          value={evidence.personalProgress}
        />
      </View>

      <Text style={styles.boundary}>
        This card describes temporary synthetic presentation evidence only. No
        client event, displayed scene, animation, local flag, device time, or
        optimistic state can complete this quest or create a reward.
      </Text>

      <View style={styles.paths}>
        <Text style={styles.pathText}>Defer: {quest.deferralPath}</Text>
        <Text style={styles.pathText}>Refuse: {quest.refusalPath}</Text>
      </View>
    </View>
  );
}

function AuthorityItem({ label, value }: { label: string; value: false }) {
  return (
    <View style={styles.authorityItem}>
      <Text style={styles.authorityLabel}>{label}</Text>
      <Text style={styles.authorityValue}>{value ? "yes" : "no"}</Text>
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
  statusDetail: {
    color: colors.inkSoft,
    fontSize: 12,
    lineHeight: 18,
  },
  authorityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  authorityItem: {
    flexGrow: 1,
    flexBasis: 135,
    borderRadius: radii.small,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.small,
    gap: 2,
  },
  authorityLabel: {
    color: colors.inkSoft,
    fontSize: 11,
    fontWeight: "700",
  },
  authorityValue: {
    color: colors.coral,
    fontSize: 15,
    fontWeight: "800",
    textTransform: "uppercase",
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
