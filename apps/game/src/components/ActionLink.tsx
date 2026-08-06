import { Link, type Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../theme";

type ActionLinkVariant = "primary" | "secondary" | "quiet";

interface ActionLinkProps {
  href: Href;
  label: string;
  description?: string;
  accessibilityHint?: string;
  variant?: ActionLinkVariant;
}

export function ActionLink({
  href,
  label,
  description,
  accessibilityHint,
  variant = "primary",
}: ActionLinkProps) {
  const labelStyle =
    variant === "primary"
      ? styles.primaryLabel
      : variant === "secondary"
        ? styles.secondaryLabel
        : styles.quietLabel;
  const descriptionStyle =
    variant === "primary"
      ? styles.primaryDescription
      : variant === "secondary"
        ? styles.secondaryDescription
        : styles.quietDescription;

  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityHint={accessibilityHint}
        style={({ pressed }: { pressed: boolean }) => [
          styles.base,
          styles[variant],
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.copy}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {description ? (
            <Text style={[styles.description, descriptionStyle]}>
              {description}
            </Text>
          ) : null}
        </View>
        <Text
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[styles.arrow, labelStyle]}
        >
          →
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radii.medium,
    borderWidth: 1,
    paddingHorizontal: spacing.medium,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.medium,
  },
  primary: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  secondary: {
    backgroundColor: colors.paper,
    borderColor: colors.border,
  },
  quiet: {
    backgroundColor: colors.transparent,
    borderColor: colors.oceanBright,
  },
  pressed: {
    opacity: 0.78,
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 21,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  primaryLabel: {
    color: colors.night,
  },
  secondaryLabel: {
    color: colors.ink,
  },
  quietLabel: {
    color: colors.foam,
  },
  primaryDescription: {
    color: colors.nightSoft,
  },
  secondaryDescription: {
    color: colors.inkSoft,
  },
  quietDescription: {
    color: colors.foam,
  },
  arrow: {
    fontSize: 21,
    fontWeight: "700",
  },
});
