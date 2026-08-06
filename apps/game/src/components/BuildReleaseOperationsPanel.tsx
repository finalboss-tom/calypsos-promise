import { StyleSheet, Text, View } from "react-native";

import {
  BUILD_INPUTS,
  CURRENT_HOSTED_PREVIEW_DECISION,
  GENERATED_STATE_POLICY,
  PROVIDER_ADAPTERS,
  PUBLIC_SYNTHETIC_INCIDENT_CONTRACT,
  RELEASE_GATES,
  RESIDUAL_OPERATIONS_LIMITATIONS,
  ROLLBACK_SCENARIOS,
  SIGNING_DISTRIBUTION_BOUNDARY,
  validateOperationsContract,
} from "../operations/build-release-operations.mjs";
import { colors, radii, spacing } from "../theme";

export function BuildReleaseOperationsPanel() {
  const validation = validateOperationsContract();

  return (
    <View style={styles.panel}>
      <View accessibilityRole="summary" style={styles.summary}>
        <Text style={styles.kicker}>CURRENT RELEASE STATE</Text>
        <Text accessibilityRole="header" style={styles.summaryTitle}>
          Reproducible unsigned evidence; no release authority
        </Text>
        <Text style={styles.summaryBody}>
          Browser, iOS, and Android export from exact repository inputs. No
          hosted game preview, signing, store, update, production, or official
          release is active.
        </Text>
        <Text accessibilityLiveRegion="polite" style={styles.validation}>
          Operations contract: {validation.ok ? "passed" : "failed closed"}
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.kicker}>BUILD PROVENANCE</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Pinned universal export inputs
          </Text>
          <View accessibilityRole="list" style={styles.list}>
            {Object.entries(BUILD_INPUTS).map(([name, value]) => (
              <Text key={name} style={styles.body}>
                • {name}: {Array.isArray(value) ? value.join(", ") : value}
              </Text>
            ))}
          </View>
          <Text style={styles.note}>
            CI writes a temporary manifest of exact source, lockfile digest,
            artifact paths, byte sizes, and SHA-256 digests, then removes all
            generated state.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>HOSTED PREVIEW</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            {CURRENT_HOSTED_PREVIEW_DECISION.state}
          </Text>
          <Text style={styles.body}>
            Provider/project: {CURRENT_HOSTED_PREVIEW_DECISION.providerProject}
          </Text>
          <Text style={styles.body}>
            Access: {CURRENT_HOSTED_PREVIEW_DECISION.accessState}
          </Text>
          <Text style={styles.body}>
            Incident owner:{" "}
            {CURRENT_HOSTED_PREVIEW_DECISION.monitoringIncidentOwnership}
          </Text>
          <Text style={styles.note}>
            A future preview must record source revision, access, indexing,
            secrets, limitations, data classes, ownership, expiry, teardown, and
            rollback before execution.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>SEPARATE RELEASE DECISIONS</Text>
        <Text accessibilityRole="header" style={styles.cardTitle}>
          Every release gate remains closed
        </Text>
        <View accessibilityRole="list" style={styles.gateGrid}>
          {Object.entries(RELEASE_GATES).map(([gate, active]) => (
            <View key={gate} style={styles.gate}>
              <Text style={styles.gateName}>{gate}</Text>
              <Text style={styles.closed}>
                {active ? "ACTIVE" : "NOT AUTHORIZED"}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.note}>{SIGNING_DISTRIBUTION_BOUNDARY.rule}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>PROVIDER REPLACEMENT</Text>
        <Text accessibilityRole="header" style={styles.cardTitle}>
          Providers remain adapters, not authorities
        </Text>
        <View accessibilityRole="list" style={styles.grid}>
          {PROVIDER_ADAPTERS.map((provider) => (
            <View key={provider.id} style={styles.subcard}>
              <Text style={styles.subcardTitle}>{provider.id}</Text>
              <Text style={styles.body}>{provider.capability}</Text>
              <Text style={styles.body}>Current: {provider.currentUse}</Text>
              <Text style={styles.note}>
                Replacement: {provider.replacement}
              </Text>
              <Text style={styles.note}>
                Fallback: {provider.manualFallback}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.kicker}>INCIDENT OWNERSHIP</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Public/synthetic scope only
          </Text>
          <Text style={styles.body}>
            Current owner: {PUBLIC_SYNTHETIC_INCIDENT_CONTRACT.activeOwner}
          </Text>
          <View accessibilityRole="list" style={styles.list}>
            {PUBLIC_SYNTHETIC_INCIDENT_CONTRACT.requiredActions.map(
              (action) => (
                <Text key={action} style={styles.body}>
                  • {action}
                </Text>
              ),
            )}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>GENERATED STATE</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Temporary and removed after validation
          </Text>
          <Text style={styles.body}>
            Paths: {GENERATED_STATE_POLICY.generatedPaths.join(", ")}
          </Text>
          <Text style={styles.note}>{GENERATED_STATE_POLICY.rule}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>ROLLBACK</Text>
        <Text accessibilityRole="header" style={styles.cardTitle}>
          Narrow, attributable, and provider-neutral
        </Text>
        <View accessibilityRole="list" style={styles.grid}>
          {ROLLBACK_SCENARIOS.map((scenario) => (
            <View key={scenario.id} style={styles.subcard}>
              <Text style={styles.subcardTitle}>{scenario.id}</Text>
              <Text style={styles.body}>Trigger: {scenario.trigger}</Text>
              <Text style={styles.closed}>
                {scenario.activeNow
                  ? "CURRENTLY APPLICABLE"
                  : "FUTURE HOLDPOINT"}
              </Text>
              {scenario.actions.map((action) => (
                <Text key={action} style={styles.note}>
                  • {action}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>RESIDUAL LIMITATIONS</Text>
        <Text accessibilityRole="header" style={styles.cardTitle}>
          Evidence still required before release
        </Text>
        <View accessibilityRole="list" style={styles.list}>
          {RESIDUAL_OPERATIONS_LIMITATIONS.map((limitation) => (
            <Text key={limitation} style={styles.body}>
              • {limitation}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.large },
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
  summaryBody: { color: colors.foam, fontSize: 15, lineHeight: 23 },
  validation: { color: colors.goldSoft, fontSize: 14, fontWeight: "800" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.medium,
  },
  card: {
    flexGrow: 1,
    flexBasis: 340,
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
  list: { gap: spacing.xsmall },
  body: { color: colors.inkSoft, fontSize: 14, lineHeight: 21 },
  note: { color: colors.ink, fontSize: 13, lineHeight: 20 },
  gateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  gate: {
    flexGrow: 1,
    flexBasis: 180,
    borderRadius: radii.medium,
    backgroundColor: colors.parchment,
    padding: spacing.medium,
    gap: spacing.xsmall,
  },
  gateName: { color: colors.ink, fontSize: 14, fontWeight: "800" },
  closed: { color: colors.coral, fontSize: 11, fontWeight: "800" },
  subcard: {
    flexGrow: 1,
    flexBasis: 260,
    borderRadius: radii.medium,
    backgroundColor: colors.parchment,
    padding: spacing.medium,
    gap: spacing.xsmall,
  },
  subcardTitle: { color: colors.ink, fontSize: 15, fontWeight: "800" },
});
