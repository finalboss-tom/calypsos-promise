import { StyleSheet, Text, View } from "react-native";

import { ActionLink } from "./ActionLink";
import { colors, radii, spacing } from "../theme";

interface ContentFallbackProps {
  title: string;
  detail: string;
}

export function ContentFallback({ title, detail }: ContentFallbackProps) {
  return (
    <View accessibilityRole="alert" style={styles.card}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.body}>{detail}</Text>
      <ActionLink
        href="/map"
        label="Return to the island map"
        description="The map remains available without an account."
        variant="secondary"
      />
      <ActionLink
        href="/"
        label="Return to arrival"
        description="Discard this temporary navigation state."
        variant="quiet"
      />
    </View>
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
    fontSize: 24,
    fontWeight: "800",
  },
  body: {
    color: colors.foam,
    fontSize: 16,
    lineHeight: 24,
  },
});
