import type { SceneChoice } from "../presentation/synthetic-presentation";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../theme";

interface DialogueChoicesProps {
  choices: readonly SceneChoice[];
  onChoose: (choiceId: string) => void;
}

export function DialogueChoices({ choices, onChoose }: DialogueChoicesProps) {
  return (
    <View
      accessibilityRole="list"
      accessibilityLabel="Available synthetic dialogue choices"
      style={styles.list}
    >
      {choices.map((choice) => (
        <Pressable
          accessibilityRole="button"
          accessibilityHint={choice.consequenceText}
          key={choice.id}
          onPress={() => onChoose(choice.id)}
          style={({ pressed }: { pressed: boolean }) => [
            styles.choice,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.copy}>
            <Text style={styles.label}>{choice.label}</Text>
            <Text style={styles.consequence}>{choice.consequenceText}</Text>
          </View>
          <Text accessibilityElementsHidden style={styles.disposition}>
            {choice.disposition.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.small,
  },
  choice: {
    minHeight: 64,
    borderRadius: radii.medium,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.nightSoft,
    padding: spacing.medium,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.medium,
  },
  pressed: {
    opacity: 0.76,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22,
  },
  consequence: {
    color: colors.foam,
    fontSize: 13,
    lineHeight: 19,
  },
  disposition: {
    color: colors.goldSoft,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
