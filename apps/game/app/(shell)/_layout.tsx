import { Link, Slot, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radii, spacing } from "../../src/theme";

const destinations = [
  { href: "/map", label: "Island map" },
  { href: "/hearth", label: "Hearth" },
  { href: "/direct", label: "Direct path" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/operations", label: "Operations" },
] as const;

export default function ShellLayout() {
  const pathname = usePathname();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.shell}>
        <View
          accessibilityLabel="Primary shell navigation"
          style={styles.header}
        >
          <Link href="/" asChild>
            <Pressable accessibilityRole="link" style={styles.brandLink}>
              <View accessibilityElementsHidden style={styles.brandMark} />
              <View>
                <Text style={styles.brand}>CALYPSO&apos;S PROMISE</Text>
                <Text style={styles.subBrand}>Public synthetic shell</Text>
              </View>
            </Pressable>
          </Link>
          <View style={styles.nav}>
            {destinations.map((destination) => {
              const active = pathname === destination.href;
              return (
                <Link key={destination.href} href={destination.href} asChild>
                  <Pressable
                    accessibilityRole="link"
                    accessibilityState={{ selected: active }}
                    style={({ pressed }: { pressed: boolean }) => [
                      styles.navLink,
                      active && styles.navLinkActive,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text
                      style={[styles.navText, active && styles.navTextActive]}
                    >
                      {destination.label}
                    </Text>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </View>
        <View style={styles.content}>
          <Slot />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            No account · No private Chronicle · No analytics · Temporary
            navigation only
          </Text>
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
  shell: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  header: {
    minHeight: 76,
    borderBottomWidth: 1,
    borderBottomColor: colors.oceanBright,
    backgroundColor: colors.night,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  brandLink: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
  },
  brandMark: {
    width: 24,
    height: 30,
    borderRadius: radii.pill,
    backgroundColor: colors.gold,
  },
  brand: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  subBrand: {
    color: colors.foam,
    fontSize: 11,
  },
  nav: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xsmall,
  },
  navLink: {
    minHeight: 44,
    justifyContent: "center",
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    paddingHorizontal: 14,
  },
  navLinkActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  navText: {
    color: colors.foam,
    fontSize: 13,
    fontWeight: "700",
  },
  navTextActive: {
    color: colors.night,
  },
  pressed: {
    opacity: 0.75,
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.paper,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.small,
    alignItems: "center",
  },
  footerText: {
    color: colors.inkSoft,
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
  },
});
