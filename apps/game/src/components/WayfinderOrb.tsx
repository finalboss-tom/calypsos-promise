import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../theme";

interface WayfinderOrbProps {
  currentSceneTitle: string;
  onDirectScene: () => void;
  onRestart: () => void;
}

export function WayfinderOrb({
  currentSceneTitle,
  onDirectScene,
  onRestart,
}: WayfinderOrbProps) {
  return (
    <View accessibilityRole="toolbar" style={styles.wrapper}>
      <View accessibilityElementsHidden style={styles.orb}>
        <View style={styles.orbCore} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.kicker}>WAYFINDER ORB</Text>
        <Text style={styles.title}>{currentSceneTitle}</Text>
        <Text style={styles.body}>
          A presentation navigator only. It cannot unlock a zone, choose for
          you, or create progress.
        </Text>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={onDirectScene}
            style={({ pressed }: { pressed: boolean }) => [
              styles.button,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.buttonText}>Open direct scene</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={onRestart}
            style={({ pressed }: { pressed: boolean }) => [
              styles.button,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.buttonText}>Restart presentation</Text>
          </Pressable>
          <Link href="/map" asChild>
            <Pressable
              accessibilityRole="link"
              style={({ pressed }: { pressed: boolean }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonText}>Island map</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.ocean,
    padding: spacing.large,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.large,
  },
  orb: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: colors.goldSoft,
    backgroundColor: colors.night,
    alignItems: "center",
    justifyContent: "center",
  },
  orbCore: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.gold,
  },
  copy: {
    flexGrow: 1,
    flexBasis: 420,
    gap: spacing.xsmall,
  },
  kicker: {
    color: colors.goldSoft,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.white,
    fontSize: 21,
    fontWeight: "800",
  },
  body: {
    color: colors.foam,
    fontSize: 14,
    lineHeight: 21,
  },
  actions: {
    marginTop: spacing.small,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  button: {
    minHeight: 48,
    borderRadius: radii.medium,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    paddingHorizontal: spacing.medium,
    paddingVertical: 12,
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.76,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
});
