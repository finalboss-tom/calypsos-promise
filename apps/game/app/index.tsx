import {
  GAME_CONTENT_MANIFEST,
  getGameContentEntry,
} from "@calypsos-promise/game-content";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActionLink } from "../src/components/ActionLink";
import { BoundaryNotice } from "../src/components/BoundaryNotice";
import { colors, radii, spacing } from "../src/theme";

const zoneEntry = getGameContentEntry("zone.lantern-shore.synthetic");
const zoneSummary =
  zoneEntry?.content.kind === "zone"
    ? zoneEntry.content.playerValue
    : "Explore a public synthetic shell with direct, narrative, refusal, and exit paths.";

export default function ArrivalScreen() {
  const { status } = useLocalSearchParams<{ status?: string | string[] }>();
  const statusLabel = Array.isArray(status) ? status[0] : status;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.frame}>
          <View style={styles.brandRow}>
            <View style={styles.mark} accessibilityElementsHidden>
              <View style={styles.markCore} />
            </View>
            <View style={styles.brandCopy}>
              <Text style={styles.brand}>CALYPSO&apos;S PROMISE</Text>
              <Text style={styles.release}>Universal shell · Sprint 10</Text>
            </View>
          </View>

          <View style={styles.hero}>
            <View style={styles.heroCopy}>
              <Text style={styles.eyebrow}>NO ACCOUNT REQUIRED</Text>
              <Text accessibilityRole="header" style={styles.title}>
                Arrive at Ogygia on your terms.
              </Text>
              <Text style={styles.intro}>{zoneSummary}</Text>
              <View style={styles.actions}>
                <ActionLink
                  href="/hearth"
                  label="Enter through the story"
                  description="Meet the Hearth through bundled synthetic narrative content."
                  accessibilityHint="Opens the narrative Hearth route."
                />
                <ActionLink
                  href="/direct"
                  label="Use the direct path"
                  description="Read the same essential boundary information without story traversal."
                  accessibilityHint="Opens the direct information route."
                  variant="secondary"
                />
                <ActionLink
                  href="/map"
                  label="Open the island map"
                  description="See available and explicitly inactive places."
                  accessibilityHint="Opens the public synthetic island map."
                  variant="quiet"
                />
              </View>
            </View>

            <View
              accessibilityLabel="Abstract island marker"
              style={styles.islandCard}
            >
              <View style={styles.orbitOuter}>
                <View style={styles.orbitInner}>
                  <View style={styles.islandShape}>
                    <View style={styles.lantern} />
                  </View>
                </View>
              </View>
              <Text style={styles.islandLabel}>Lantern Shore</Text>
              <Text style={styles.islandMeta}>
                Public · Synthetic · Temporary
              </Text>
            </View>
          </View>

          {statusLabel ? (
            <BoundaryNotice title="Temporary session cleared" tone="dark">
              Your previous synthetic navigation state was discarded. No
              account, Chronicle record, preference, progress, or reward was
              created.
            </BoundaryNotice>
          ) : null}

          <BoundaryNotice tone="dark">
            Package {GAME_CONTENT_MANIFEST.version} contains public synthetic
            content only. Accounts, private Chronicles, analytics, production
            AI, permissions, personal progress, and authoritative rewards are
            inactive.
          </BoundaryNotice>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.night,
  },
  page: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.xlarge,
  },
  frame: {
    width: "100%",
    maxWidth: 1120,
    gap: spacing.xlarge,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.medium,
  },
  mark: {
    width: 42,
    height: 42,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  markCore: {
    width: 14,
    height: 20,
    borderRadius: radii.pill,
    backgroundColor: colors.gold,
  },
  brandCopy: {
    gap: 2,
  },
  brand: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.7,
  },
  release: {
    color: colors.foam,
    fontSize: 12,
  },
  hero: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.nightSoft,
    padding: spacing.xlarge,
    gap: spacing.xlarge,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  heroCopy: {
    flexGrow: 1,
    flexBasis: 480,
    gap: spacing.medium,
  },
  eyebrow: {
    color: colors.goldSoft,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: {
    color: colors.white,
    fontSize: 48,
    fontWeight: "800",
    lineHeight: 54,
    maxWidth: 680,
  },
  intro: {
    color: colors.foam,
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 680,
  },
  actions: {
    gap: spacing.small,
    marginTop: spacing.small,
  },
  islandCard: {
    flexGrow: 1,
    flexBasis: 280,
    minHeight: 360,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.large,
    backgroundColor: colors.ocean,
    padding: spacing.large,
    gap: spacing.medium,
  },
  orbitOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    alignItems: "center",
    justifyContent: "center",
  },
  orbitInner: {
    width: 164,
    height: 164,
    borderRadius: 82,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  islandShape: {
    width: 92,
    height: 116,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 34,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 52,
    backgroundColor: colors.parchment,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "8deg" }],
  },
  lantern: {
    width: 20,
    height: 32,
    borderRadius: radii.pill,
    backgroundColor: colors.gold,
  },
  islandLabel: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800",
  },
  islandMeta: {
    color: colors.foam,
    fontSize: 13,
    textAlign: "center",
  },
});
