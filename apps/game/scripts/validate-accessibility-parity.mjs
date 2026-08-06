import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ACCESSIBILITY_MODALITIES,
  ACCESSIBILITY_PLATFORMS,
  CONTRAST_PAIRS,
  PLATFORM_SUPPORT_MATRIX,
  RESIDUAL_ACCESSIBILITY_LIMITATIONS,
  calculateContrastRatio,
  validateAccessibilityParity,
  validateDirectPathParity,
} from "../src/accessibility/accessibility-parity.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(scriptDirectory, "..");

function read(path) {
  return readFileSync(join(gameRoot, path), "utf8");
}

function listFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

assert.equal(ACCESSIBILITY_MODALITIES.length, 14);
assert.deepEqual(ACCESSIBILITY_PLATFORMS, ["browser", "ios", "android"]);

for (const platform of ACCESSIBILITY_PLATFORMS) {
  for (const modality of ACCESSIBILITY_MODALITIES) {
    assert.ok(
      PLATFORM_SUPPORT_MATRIX[platform][modality],
      `${platform} is missing ${modality}`,
    );
  }
}

for (const pair of CONTRAST_PAIRS) {
  assert.ok(
    calculateContrastRatio(pair.foreground, pair.background) >= 4.5,
    `${pair.name} must meet 4.5:1`,
  );
}

assert.equal(validateDirectPathParity().ok, true);
assert.equal(validateAccessibilityParity().ok, true);
assert.ok(RESIDUAL_ACCESSIBILITY_LIMITATIONS.length >= 6);

const theme = read("src/theme.ts");
assert.match(theme, /coral: "#9F523F"/);

const shellPage = read("src/components/ShellPage.tsx");
assert.match(shellPage, /useWindowDimensions/);
assert.match(shellPage, /flexGrow: 1/);
assert.match(shellPage, /width: "100%"/);
assert.match(shellPage, /maxWidth: 1040/);
assert.match(shellPage, /titleCompact/);

const actionLink = read("src/components/ActionLink.tsx");
assert.match(actionLink, /accessibilityRole="link"/);
assert.match(actionLink, /minHeight: 56/);

const dialogueChoices = read("src/components/DialogueChoices.tsx");
assert.match(dialogueChoices, /accessibilityRole="button"/);
assert.match(dialogueChoices, /minHeight: 64/);

const accessibilityRoute = read("app/(shell)/accessibility.tsx");
assert.match(accessibilityRoute, /AccessibilityParityPanel/);
assert.match(accessibilityRoute, /Independent assistive/);

const shellLayout = read("app/(shell)/_layout.tsx");
assert.match(shellLayout, /href: "\/accessibility"/);

const direct = read("app/(shell)/direct.tsx");
const hearth = read("app/(shell)/hearth.tsx");
for (const essentialId of [
  "lesson.shell.authority-boundary.synthetic",
  "dialogue.aster.direct-path.synthetic",
]) {
  assert.match(direct + hearth, new RegExp(essentialId.replaceAll(".", "\.")));
}

const sourceFiles = [
  ...listFiles(join(gameRoot, "app")),
  ...listFiles(join(gameRoot, "src")),
].filter((path) => /\.(?:ts|tsx|js|jsx|mjs)$/.test(path));

for (const path of sourceFiles) {
  const source = readFileSync(path, "utf8");
  for (const prohibited of [
    /Animated/,
    /LayoutAnimation/,
    /PanResponder/,
    /react-native-gesture-handler/,
    /expo-haptics/,
    /expo-av/,
    /<Audio/,
    /<Video/,
  ]) {
    assert.doesNotMatch(
      source,
      prohibited,
      `${relative(gameRoot, path)} matched ${prohibited}`,
    );
  }
}

console.log("Sprint 10.8 accessibility and platform parity validated:");
console.log(`- modalities: ${ACCESSIBILITY_MODALITIES.join(", ")}`);
console.log("- browser, iOS, and Android matrix coverage is complete");
console.log("- named contrast pairs meet at least 4.5:1");
console.log("- direct and narrative essential concepts are equivalent");
console.log(
  "- no essential motion, audio, haptic, or gesture-only dependency exists",
);
console.log("- residual independent testing limitations remain explicit");
