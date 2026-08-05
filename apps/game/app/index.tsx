import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";

const platformLabel =
  Platform.OS === "web"
    ? "Browser"
    : Platform.OS === "ios"
      ? "iOS"
      : Platform.OS === "android"
        ? "Android"
        : Platform.OS;

export default function FoundationScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View accessibilityRole="summary" style={styles.card}>
        <Text accessibilityRole="header" style={styles.eyebrow}>
          CALYPSO&apos;S PROMISE
        </Text>
        <Text accessibilityRole="header" style={styles.title}>
          Universal shell foundation
        </Text>
        <Text style={styles.body}>
          Sprint 10.1 establishes one credential-free application toolchain for browser, iOS, and Android while the public website remains independently owned by apps/site.
        </Text>
        <View style={styles.boundary}>
          <Text style={styles.boundaryLabel}>Current platform</Text>
          <Text style={styles.boundaryValue}>{platformLabel}</Text>
        </View>
        <Text style={styles.note}>
          This surface contains no private Chronicle data, authentication, analytics, model providers, durable progression, or production deployment configuration.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
    backgroundColor: "#f3efe6"
  },
  card: {
    width: "100%",
    maxWidth: 720,
    padding: 32,
    borderWidth: 1,
    borderColor: "#c9c0ae",
    borderRadius: 24,
    backgroundColor: "#fffdf8",
    gap: 18
  },
  eyebrow: {
    color: "#5d5548",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.8
  },
  title: {
    color: "#1e1d1a",
    fontSize: 38,
    fontWeight: "700",
    lineHeight: 44
  },
  body: {
    color: "#35322d",
    fontSize: 18,
    lineHeight: 28
  },
  boundary: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#e7e0d3",
    gap: 2
  },
  boundaryLabel: {
    color: "#655d51",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  boundaryValue: {
    color: "#1e1d1a",
    fontSize: 18,
    fontWeight: "700"
  },
  note: {
    color: "#5d5548",
    fontSize: 14,
    lineHeight: 21
  }
});
