import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { ActionLink } from "../../src/components/ActionLink";
import { BoundaryNotice } from "../../src/components/BoundaryNotice";
import { ShellPage } from "../../src/components/ShellPage";
import { colors, radii, spacing } from "../../src/theme";

export default function UnavailableScreen() {
  const { target } = useLocalSearchParams<{ target?: string | string[] }>();
  const targetLabel = Array.isArray(target)
    ? target[0]
    : target || "This destination";

  return (
    <ShellPage
      eyebrow="PLANNED DESTINATION"
      title={`${targetLabel} is not active.`}
      intro="The map shows future places for orientation, not as behavioral locks, account gates, or progress pressure."
      tone="dark"
      aside={
        <BoundaryNotice title="Fail-closed availability" tone="dark">
          The shell will not simulate this destination, invent content, ask a
          model provider, or imply that continuing elsewhere unlocks it.
        </BoundaryNotice>
      }
    >
      <View accessibilityRole="alert" style={styles.card}>
        <Text accessibilityRole="header" style={styles.title}>
          Nothing was lost.
        </Text>
        <Text style={styles.body}>
          Visiting an inactive route creates no refusal record, engagement
          score, penalty, missed reward, or inferred preference. You may return
          to any available public path.
        </Text>
        <ActionLink
          href="/map"
          label="Return to the island map"
          description="Review the currently available shell routes."
        />
        <ActionLink
          href="/direct"
          label="Read the direct boundary"
          description="See what is active and inactive without story framing."
          variant="secondary"
        />
        <ActionLink
          href={{ pathname: "/", params: { status: "cleared" } }}
          label="Leave and clear the route"
          variant="quiet"
        />
      </View>
    </ShellPage>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.nightSoft,
    padding: spacing.large,
    gap: spacing.medium,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "800",
  },
  body: {
    color: colors.foam,
    fontSize: 17,
    lineHeight: 26,
  },
});
