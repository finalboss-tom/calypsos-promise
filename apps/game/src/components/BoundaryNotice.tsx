import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../theme";

interface BoundaryNoticeProps {
  title?: string;
  children: ReactNode;
  tone?: "light" | "dark";
}

export function BoundaryNotice({
  title = "Public synthetic shell",
  children,
  tone = "light",
}: BoundaryNoticeProps) {
  const dark = tone === "dark";
  return (
    <View
      accessibilityRole="summary"
      style={[styles.container, dark && styles.containerDark]}
    >
      <Text style={[styles.kicker, dark && styles.kickerDark]}>{title}</Text>
      <Text style={[styles.body, dark && styles.bodyDark]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.medium,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.parchment,
    padding: spacing.medium,
    gap: spacing.xsmall,
  },
  containerDark: {
    borderColor: colors.oceanBright,
    backgroundColor: colors.nightSoft,
  },
  kicker: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  kickerDark: {
    color: colors.goldSoft,
  },
  body: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
  },
  bodyDark: {
    color: colors.foam,
  },
});
