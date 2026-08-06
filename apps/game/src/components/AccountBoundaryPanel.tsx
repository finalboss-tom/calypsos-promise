import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  FUTURE_ACCOUNT_VALUE,
  FUTURE_TRANSFER_REQUIREMENTS,
  PROLOGUE_AUTHORITY_CLAIMS,
  createAuthenticationBoundaryState,
  denyAuthenticationAuthority,
  evaluateFutureTransfer,
} from "../auth/authentication-boundary.mjs";
import { colors, radii, spacing } from "../theme";
import { ActionLink } from "./ActionLink";

interface AccountBoundaryPanelProps {
  notice: string;
  onDiscard: () => void;
}

export function AccountBoundaryPanel({
  notice,
  onDiscard,
}: AccountBoundaryPanelProps) {
  const boundary = createAuthenticationBoundaryState();
  const completeReview = evaluateFutureTransfer(
    FUTURE_TRANSFER_REQUIREMENTS.map((requirement) => requirement.id),
  );

  return (
    <View style={styles.panel}>
      <View accessibilityRole="summary" style={styles.statusCard}>
        <Text style={styles.kicker}>CURRENT SPRINT 10 STATE</Text>
        <Text accessibilityRole="header" style={styles.title}>
          No account system is active.
        </Text>
        <Text style={styles.body}>
          The public synthetic experience remains completable without an
          account. No provider, credential, token, recovery flow, or production
          session is present.
        </Text>
        <View accessibilityRole="list" style={styles.factList}>
          <Text style={styles.fact}>
            Offer position: {boundary.accountOfferPosition}
          </Text>
          <Text style={styles.fact}>
            Default temporary-state disposition: {boundary.defaultDisposition}
          </Text>
          <Text style={styles.fact}>Silent transfer allowed: no</Text>
          <Text style={styles.fact}>Transfer authorized: no</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.kicker}>FUTURE ACCOUNT VALUE</Text>
          <Text style={styles.cardTitle}>
            Possible later value, not active capability
          </Text>
          <View accessibilityRole="list" style={styles.factList}>
            {FUTURE_ACCOUNT_VALUE.map((value) => (
              <Text key={value} style={styles.fact}>
                • {value}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>FUTURE TRANSFER REVIEW</Text>
          <Text style={styles.cardTitle}>
            Seven requirements before any later confirmation
          </Text>
          <View accessibilityRole="list" style={styles.requirements}>
            {FUTURE_TRANSFER_REQUIREMENTS.map((requirement) => (
              <View key={requirement.id} style={styles.requirement}>
                <Text style={styles.requirementTitle}>{requirement.label}</Text>
                <Text style={styles.fact}>{requirement.description}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.warning}>
            Even a complete review authorizes nothing in Sprint 10:{" "}
            {completeReview.transferAuthorized
              ? "authorized"
              : "not authorized"}
            .
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>AUTHORITY DENIAL</Text>
        <Text style={styles.cardTitle}>
          Authentication cannot transform presentation into personal truth
        </Text>
        <View accessibilityRole="list" style={styles.claims}>
          {PROLOGUE_AUTHORITY_CLAIMS.map((claim) => {
            const denial = denyAuthenticationAuthority(claim);
            return (
              <Text key={claim} style={styles.fact}>
                {claim}: {denial.allowed ? "allowed" : "denied"}
              </Text>
            );
          })}
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Clears the stored temporary synthetic session and returns to the public arrival."
          onPress={onDiscard}
          style={({ pressed }: { pressed: boolean }) => [
            styles.discard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.discardText}>Discard temporary state</Text>
        </Pressable>
        <ActionLink
          href="/map"
          label="Continue without an account"
          description="Return to the public synthetic island map."
          variant="secondary"
        />
        <ActionLink
          href="/direct"
          label="Review the direct explanation"
          description="Read the same essential authority boundary without story framing."
          variant="secondary"
        />
      </View>

      <Text accessibilityLiveRegion="polite" style={styles.notice}>
        {notice}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: spacing.large,
  },
  statusCard: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.nightSoft,
    padding: spacing.large,
    gap: spacing.small,
  },
  kicker: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "800",
  },
  body: {
    color: colors.foam,
    fontSize: 16,
    lineHeight: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.medium,
  },
  card: {
    flexGrow: 1,
    flexBasis: 320,
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paper,
    padding: spacing.large,
    gap: spacing.small,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
  },
  factList: {
    gap: spacing.xsmall,
  },
  fact: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  requirements: {
    gap: spacing.small,
  },
  requirement: {
    gap: 3,
  },
  requirementTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
  },
  warning: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 21,
  },
  claims: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  actions: {
    gap: spacing.small,
  },
  discard: {
    minHeight: 56,
    borderRadius: radii.medium,
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.medium,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  discardText: {
    color: colors.night,
    fontSize: 16,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.76,
  },
  notice: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
  },
});
