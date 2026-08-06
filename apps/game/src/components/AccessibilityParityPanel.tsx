import { Platform, StyleSheet, Text, View } from "react-native";

import {
  ACCESSIBILITY_MODALITIES,
  ACCESSIBILITY_PLATFORMS,
  PLATFORM_SUPPORT_MATRIX,
  RESIDUAL_ACCESSIBILITY_LIMITATIONS,
  validateAccessibilityParity,
  validateDirectPathParity,
  type AccessibilityPlatform,
} from "../accessibility/accessibility-parity.mjs";
import { colors, radii, spacing } from "../theme";

export function AccessibilityParityPanel() {
  const currentPlatform: AccessibilityPlatform =
    Platform.OS === "ios"
      ? "ios"
      : Platform.OS === "android"
        ? "android"
        : "browser";
  const parity = validateAccessibilityParity();
  const directParity = validateDirectPathParity();

  return (
    <View style={styles.panel}>
      <View accessibilityRole="summary" style={styles.summary}>
        <Text style={styles.kicker}>CURRENT PLATFORM</Text>
        <Text accessibilityRole="header" style={styles.summaryTitle}>
          {currentPlatform.toUpperCase()} uses the same essential text and
          authority rules.
        </Text>
        <Text style={styles.summaryBody}>
          This is executable maintainer evidence, not independent accessibility
          certification.
        </Text>
        <Text accessibilityLiveRegion="polite" style={styles.validation}>
          Contract validation: {parity.ok ? "passed" : "failed closed"}
        </Text>
      </View>

      <View accessibilityRole="list" style={styles.platformList}>
        {ACCESSIBILITY_PLATFORMS.map((platform) => (
          <View key={platform} style={styles.platformCard}>
            <Text accessibilityRole="header" style={styles.platformTitle}>
              {platform.toUpperCase()}
            </Text>
            <View style={styles.modalityGrid}>
              {ACCESSIBILITY_MODALITIES.map((modality) => {
                const support = PLATFORM_SUPPORT_MATRIX[platform][modality];
                return (
                  <View key={modality} style={styles.modality}>
                    <Text style={styles.modalityTitle}>{modality}</Text>
                    <Text style={styles.status}>{support.status}</Text>
                    <Text style={styles.body}>{support.evidence}</Text>
                    <Text style={styles.alternative}>
                      Alternative: {support.alternative}
                    </Text>
                    {support.residual ? (
                      <Text style={styles.residual}>
                        Residual: {support.residual}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.twoColumn}>
        <View style={styles.card}>
          <Text style={styles.kicker}>DIRECT-PATH PARITY</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Narrative and direct routes retain the same essential concepts
          </Text>
          <Text style={styles.body}>
            Structural parity: {directParity.ok ? "passed" : "failed closed"}.
            Neither route changes access, authority, preference, completion,
            reward, or progress.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>RESIDUAL LIMITATIONS</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Evidence still required
          </Text>
          <View accessibilityRole="list" style={styles.residualList}>
            {RESIDUAL_ACCESSIBILITY_LIMITATIONS.map((limitation) => (
              <Text key={limitation} style={styles.body}>
                • {limitation}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: spacing.large,
  },
  summary: {
    borderRadius: radii.large,
    backgroundColor: colors.nightSoft,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    padding: spacing.large,
    gap: spacing.small,
  },
  kicker: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  summaryTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 31,
  },
  summaryBody: {
    color: colors.foam,
    fontSize: 15,
    lineHeight: 23,
  },
  validation: {
    color: colors.goldSoft,
    fontSize: 14,
    fontWeight: "800",
  },
  platformList: {
    gap: spacing.large,
  },
  platformCard: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paper,
    padding: spacing.large,
    gap: spacing.medium,
  },
  platformTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "800",
  },
  modalityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.small,
  },
  modality: {
    flexGrow: 1,
    flexBasis: 260,
    borderRadius: radii.medium,
    backgroundColor: colors.parchment,
    padding: spacing.medium,
    gap: spacing.xsmall,
  },
  modalityTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
  },
  status: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  body: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
  },
  alternative: {
    color: colors.ink,
    fontSize: 13,
    lineHeight: 20,
  },
  residual: {
    color: colors.coral,
    fontSize: 13,
    lineHeight: 20,
  },
  twoColumn: {
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
  residualList: {
    gap: spacing.xsmall,
  },
});
