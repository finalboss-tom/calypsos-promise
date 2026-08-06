import type { PropsWithChildren, ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { colors, spacing } from "../theme";

interface ShellPageProps extends PropsWithChildren {
  eyebrow: string;
  title: string;
  intro: string;
  aside?: ReactNode;
  tone?: "light" | "dark";
}

export function ShellPage({
  eyebrow,
  title,
  intro,
  aside,
  tone = "light",
  children,
}: ShellPageProps) {
  const dark = tone === "dark";
  const { width } = useWindowDimensions();
  const compact = width < 480;

  return (
    <ScrollView
      style={[styles.scroll, dark && styles.scrollDark]}
      contentContainerStyle={[styles.content, compact && styles.contentCompact]}
    >
      <View style={styles.frame}>
        <View style={styles.heading}>
          <Text style={[styles.eyebrow, dark && styles.eyebrowDark]}>
            {eyebrow}
          </Text>
          <Text
            accessibilityRole="header"
            style={[
              styles.title,
              compact && styles.titleCompact,
              dark && styles.titleDark,
            ]}
          >
            {title}
          </Text>
          <Text style={[styles.intro, dark && styles.introDark]}>{intro}</Text>
        </View>
        {aside}
        <View style={styles.body}>{children}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  scrollDark: {
    backgroundColor: colors.night,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.xlarge,
  },
  contentCompact: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.large,
  },
  frame: {
    width: "100%",
    maxWidth: 1040,
    gap: spacing.large,
  },
  heading: {
    maxWidth: 760,
    gap: spacing.small,
  },
  eyebrow: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  eyebrowDark: {
    color: colors.goldSoft,
  },
  title: {
    color: colors.ink,
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 46,
  },
  titleCompact: {
    fontSize: 32,
    lineHeight: 38,
  },
  titleDark: {
    color: colors.white,
  },
  intro: {
    color: colors.inkSoft,
    fontSize: 18,
    lineHeight: 28,
  },
  introDark: {
    color: colors.foam,
  },
  body: {
    gap: spacing.large,
  },
});
