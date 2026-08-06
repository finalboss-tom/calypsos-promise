import { getGameContentEntry } from "@calypsos-promise/game-content";
import { StyleSheet, Text, View } from "react-native";

import { ActionLink } from "../../src/components/ActionLink";
import { BoundaryNotice } from "../../src/components/BoundaryNotice";
import { ShellPage } from "../../src/components/ShellPage";
import { colors, radii, spacing } from "../../src/theme";

const zoneEntry = getGameContentEntry("zone.lantern-shore.synthetic");
const zone = zoneEntry?.content.kind === "zone" ? zoneEntry.content : undefined;

const plannedPlaces = ["Memory Chamber", "Athena's Observatory"];

export default function IslandMapScreen() {
  return (
    <ShellPage
      eyebrow="ISLAND MAP"
      title="One shore is open. The rest is honestly inactive."
      intro={
        zone?.publicPurpose ??
        "Use this public synthetic map to move between the available shell routes without creating account or progress state."
      }
      aside={
        <BoundaryNotice>
          Map position and route history are presentation state only. They do
          not unlock Ogygia, prove completion, or create a player profile.
        </BoundaryNotice>
      }
    >
      <View
        accessible
        accessibilityLabel="Island map. Lantern Shore and the Hearth are available. Memory Chamber and Athena's Observatory are planned and inactive."
        style={styles.mapCanvas}
      >
        <View style={styles.waterRingLarge}>
          <View style={styles.waterRingSmall}>
            <View style={styles.island}>
              <View style={styles.shoreMarker}>
                <Text style={styles.markerLabel}>Lantern Shore</Text>
              </View>
              <View style={styles.hearthMarker}>
                <Text style={styles.markerLabel}>Hearth</Text>
              </View>
              <View style={styles.veilMarker}>
                <Text style={styles.veilLabel}>Veil</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.availableCard}>
          <Text style={styles.cardKicker}>AVAILABLE NOW</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            {zone?.title ?? "Lantern Shore"}
          </Text>
          <Text style={styles.cardBody}>
            {zone?.playerValue ??
              "Review the universal shell and its non-authoritative boundaries."}
          </Text>
          <ActionLink
            href="/hearth"
            label="Enter the Hearth"
            description="Follow the narrative route."
          />
          <ActionLink
            href="/direct"
            label="Read the direct explanation"
            description="Skip story traversal without losing essential information."
            variant="secondary"
          />
        </View>

        {plannedPlaces.map((place) => (
          <View key={place} style={styles.plannedCard}>
            <Text style={styles.plannedKicker}>PLANNED · INACTIVE</Text>
            <Text accessibilityRole="header" style={styles.plannedTitle}>
              {place}
            </Text>
            <Text style={styles.plannedBody}>
              This place is shown for orientation only. It is not locked by your
              behavior, progress, account status, or health data.
            </Text>
            <ActionLink
              href={{ pathname: "/unavailable", params: { target: place } }}
              label="Read the availability boundary"
              variant="quiet"
            />
          </View>
        ))}
      </View>
    </ShellPage>
  );
}

const styles = StyleSheet.create({
  mapCanvas: {
    minHeight: 430,
    borderRadius: 30,
    backgroundColor: colors.ocean,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.large,
    overflow: "hidden",
  },
  waterRingLarge: {
    width: 370,
    height: 370,
    maxWidth: "100%",
    borderRadius: 185,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    alignItems: "center",
    justifyContent: "center",
  },
  waterRingSmall: {
    width: 300,
    height: 300,
    maxWidth: "84%",
    borderRadius: 150,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  island: {
    width: 210,
    height: 245,
    maxWidth: "72%",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 72,
    borderBottomLeftRadius: 58,
    borderBottomRightRadius: 112,
    backgroundColor: colors.parchment,
    padding: spacing.large,
    justifyContent: "space-between",
    transform: [{ rotate: "5deg" }],
  },
  shoreMarker: {
    alignSelf: "flex-end",
    borderRadius: radii.pill,
    backgroundColor: colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  hearthMarker: {
    alignSelf: "center",
    borderRadius: radii.pill,
    backgroundColor: colors.coral,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  veilMarker: {
    alignSelf: "flex-start",
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.inkSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  markerLabel: {
    color: colors.night,
    fontSize: 12,
    fontWeight: "800",
  },
  veilLabel: {
    color: colors.inkSoft,
    fontSize: 12,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.medium,
  },
  availableCard: {
    flexGrow: 2,
    flexBasis: 390,
    borderRadius: radii.large,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.large,
    gap: spacing.medium,
  },
  plannedCard: {
    flexGrow: 1,
    flexBasis: 260,
    borderRadius: radii.large,
    backgroundColor: colors.nightSoft,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    padding: spacing.large,
    gap: spacing.medium,
  },
  cardKicker: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  plannedKicker: {
    color: colors.goldSoft,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 27,
    fontWeight: "800",
  },
  plannedTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
  },
  cardBody: {
    color: colors.inkSoft,
    fontSize: 16,
    lineHeight: 24,
  },
  plannedBody: {
    color: colors.foam,
    fontSize: 15,
    lineHeight: 23,
  },
});
