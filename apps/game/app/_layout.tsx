import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "../src/theme";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: { backgroundColor: colors.night },
        }}
      />
      <StatusBar style="light" />
    </>
  );
}
