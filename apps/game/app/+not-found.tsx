import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radii, spacing } from "../src/theme";

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View accessibilityRole="alert" style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>ROUTE NOT FOUND</Text>
          <Text accessibilityRole="header" style={styles.title}>
            This path is not part of the public synthetic shell.
          </Text>
          <Text style={styles.body}>
            No content, progress, permission, or account state was created. The
            shell fails closed and offers a safe return to arrival.
          </Text>
          <Link href="/" asChild>
            <Pressable accessibilityRole="link" style={styles.link}>
              <Text style={styles.linkText}>Return to arrival</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.night,
  },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.large,
  },
  card: {
    width: "100%",
    maxWidth: 680,
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.nightSoft,
    padding: spacing.xlarge,
    gap: spacing.medium,
  },
  eyebrow: {
    color: colors.goldSoft,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "800",
  },
  body: {
    color: colors.foam,
    fontSize: 17,
    lineHeight: 26,
  },
  link: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.medium,
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.medium,
  },
  linkText: {
    color: colors.night,
    fontSize: 16,
    fontWeight: "800",
  },
});
