import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  CLIENT_AUTHORITY_CLAIMS,
  denyClientAuthority,
  type SyntheticSessionState,
  type SyntheticSessionStatus,
} from "../state/synthetic-session-state.mjs";
import { colors, radii, spacing } from "../theme";

type DemonstrableStatus = Extract<
  SyntheticSessionStatus,
  "pending" | "failed" | "stale" | "corrected" | "superseded" | "conflict"
>;

interface StateAuthorityPanelProps {
  session: SyntheticSessionState;
  onDemonstrate: (status: DemonstrableStatus) => void;
  onRestart: () => void;
}

const demonstrations: readonly {
  status: DemonstrableStatus;
  label: string;
  description: string;
}[] = [
  {
    status: "pending",
    label: "Pending",
    description: "Awaiting presentation without optimistic completion.",
  },
  {
    status: "failed",
    label: "Failed",
    description: "Failed closed without inventing progress or content.",
  },
  {
    status: "stale",
    label: "Stale",
    description: "Visible but unusable as current completion evidence.",
  },
  {
    status: "corrected",
    label: "Corrected",
    description: "Correction is visible and remains non-authoritative.",
  },
  {
    status: "superseded",
    label: "Superseded",
    description: "Replaced evidence cannot retain completion authority.",
  },
  {
    status: "conflict",
    label: "Conflict",
    description:
      "Conflicting evidence stops authority and requires resolution.",
  },
];

export function StateAuthorityPanel({
  session,
  onDemonstrate,
  onRestart,
}: StateAuthorityPanelProps) {
  return (
    <View accessibilityRole="summary" style={styles.panel}>
      <View style={styles.heading}>
        <Text style={styles.kicker}>SYNTHETIC SESSION STATE</Text>
        <Text accessibilityRole="header" style={styles.title}>
          {session.status}
        </Text>
        <Text style={styles.body}>{session.notice}</Text>
        <Text style={styles.meta}>
          Revision {session.revision} · state version {session.version} ·
          authoritative: no
        </Text>
      </View>

      <View style={styles.demonstrations}>
        <Text style={styles.sectionTitle}>
          Deterministic state demonstrations
        </Text>
        <View style={styles.grid}>
          {demonstrations.map(({ status, label, description }) => (
            <Pressable
              key={status}
              accessibilityRole="button"
              accessibilityHint={`Demonstrate the ${status} temporary synthetic state.`}
              onPress={() => onDemonstrate(status)}
              style={({ pressed }: { pressed: boolean }) => [
                styles.demonstration,
                session.status === status && styles.demonstrationActive,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.demonstrationTitle}>{label}</Text>
              <Text style={styles.demonstrationBody}>{description}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onRestart}
          style={({ pressed }: { pressed: boolean }) => [
            styles.restart,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.restartText}>Restart clear temporary state</Text>
        </Pressable>
      </View>

      <View style={styles.denials}>
        <Text style={styles.sectionTitle}>
          Client authority is always denied
        </Text>
        <View style={styles.claims}>
          {CLIENT_AUTHORITY_CLAIMS.map((claim) => {
            const decision = denyClientAuthority(claim);
            return (
              <View key={claim} style={styles.claimRow}>
                <Text accessibilityElementsHidden style={styles.deniedMark}>
                  ×
                </Text>
                <Text style={styles.claimText}>
                  {claim}: {decision.allowed ? "allowed" : "denied"}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.nightSoft,
    padding: spacing.large,
    gap: spacing.large,
  },
  heading: {
    gap: spacing.xsmall,
  },
  kicker: {
    color: colors.goldSoft,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "800",
    textTransform: "capitalize",
  },
  body: {
    color: colors.foam,
    fontSize: 15,
    lineHeight: 22,
  },
  meta: {
    color: colors.goldSoft,
    fontSize: 12,
    lineHeight: 18,
  },
  demonstrations: {
    gap: spacing.small,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  demonstration: {
    flexGrow: 1,
    flexBasis: 220,
    minHeight: 88,
    borderRadius: radii.medium,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    padding: spacing.medium,
    gap: 4,
  },
  demonstrationActive: {
    backgroundColor: colors.ocean,
    borderColor: colors.goldSoft,
  },
  demonstrationTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
  demonstrationBody: {
    color: colors.foam,
    fontSize: 12,
    lineHeight: 18,
  },
  restart: {
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
  denials: {
    gap: spacing.small,
  },
  claims: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  claimRow: {
    flexBasis: 250,
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.small,
  },
  deniedMark: {
    color: colors.coral,
    fontSize: 16,
    fontWeight: "800",
  },
  claimText: {
    flex: 1,
    color: colors.foam,
    fontSize: 13,
    lineHeight: 19,
  },
  pressed: {
    opacity: 0.76,
  },
});
