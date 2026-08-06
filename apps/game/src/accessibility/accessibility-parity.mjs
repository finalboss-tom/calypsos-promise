export const ACCESSIBILITY_PARITY_VERSION = "0.1.0";

export const ACCESSIBILITY_MODALITIES = Object.freeze([
  "keyboard",
  "screen-reader",
  "touch",
  "switch",
  "scaling",
  "reflow",
  "contrast",
  "orientation",
  "reduced-motion",
  "reduced-data",
  "low-bandwidth",
  "audio-text",
  "haptic",
  "gesture-alternatives",
]);

export const ACCESSIBILITY_PLATFORMS = Object.freeze([
  "browser",
  "ios",
  "android",
]);

function support(status, evidence, alternative, residual = null) {
  return Object.freeze({ status, evidence, alternative, residual });
}

export const PLATFORM_SUPPORT_MATRIX = Object.freeze({
  browser: Object.freeze({
    keyboard: support(
      "supported-by-shell",
      "Links and buttons use semantic roles and sequential focus without gesture-only actions.",
      "Every action is available as a visible link or button.",
    ),
    "screen-reader": support(
      "platform-assisted",
      "Headings, lists, alerts, summaries, labels, hints, and polite live regions are exposed.",
      "Essential information is also visible text.",
      "Browser and screen-reader combinations still require independent device testing.",
    ),
    touch: support(
      "supported-by-shell",
      "Interactive targets use at least 44 logical pixels of height.",
      "Keyboard and switch-access paths expose the same actions.",
    ),
    switch: support(
      "platform-assisted",
      "Semantic links and buttons participate in platform focus traversal.",
      "No action requires free-form drawing, dragging, or timed gestures.",
      "Switch-control behavior varies by browser and operating system.",
    ),
    scaling: support(
      "supported-by-shell",
      "Text uses platform scaling and compact layouts reduce title size without clipping.",
      "All essential copy remains text rather than image text.",
    ),
    reflow: support(
      "supported-by-shell",
      "Pages use scroll containers, wrapping rows, flexible bases, and bounded readable widths.",
      "Content remains in document order when cards wrap.",
    ),
    contrast: support(
      "validated-by-contract",
      "Named foreground/background pairs meet at least 4.5:1.",
      "Meaning is not conveyed by color alone.",
    ),
    orientation: support(
      "supported-by-reflow",
      "The layout responds to available width rather than requiring one orientation.",
      "Scrollable text-first content remains available.",
    ),
    "reduced-motion": support(
      "not-required-by-default",
      "The Sprint 10 shell uses no essential animation or motion transition.",
      "All state changes are announced with text.",
    ),
    "reduced-data": support(
      "supported-by-bundle",
      "Essential public content is bundled and does not require analytics, media, or provider requests.",
      "Text-first routes remain complete.",
    ),
    "low-bandwidth": support(
      "supported-by-bundle",
      "Essential content and interaction rules work without a network request.",
      "The direct path is always available.",
    ),
    "audio-text": support(
      "text-is-primary",
      "No essential information depends on audio.",
      "Dialogue and state changes are exposed as text.",
    ),
    haptic: support(
      "not-required-by-default",
      "No essential state or action depends on haptic feedback.",
      "Visible and announced text provides the equivalent.",
    ),
    "gesture-alternatives": support(
      "supported-by-shell",
      "Every action is a standard pressable link or button.",
      "No essential action depends on swipe, pinch, drag, long press, or multi-touch.",
    ),
  }),
  ios: Object.freeze({
    keyboard: support(
      "platform-assisted",
      "Semantic controls support external-keyboard and focus traversal through React Native.",
      "Touch and switch-access paths expose the same actions.",
      "External-keyboard behavior requires device testing.",
    ),
    "screen-reader": support(
      "platform-assisted",
      "VoiceOver receives roles, labels, hints, headings, lists, alerts, and live-region text.",
      "Essential information is visible text.",
      "Independent VoiceOver device testing remains open.",
    ),
    touch: support(
      "supported-by-shell",
      "Interactive targets use at least 44 logical pixels of height.",
      "VoiceOver and Switch Control can reach the same controls.",
    ),
    switch: support(
      "platform-assisted",
      "Standard semantic controls are compatible with Switch Control traversal.",
      "No timed or gesture-only action exists.",
      "Independent Switch Control device testing remains open.",
    ),
    scaling: support(
      "supported-by-shell",
      "React Native text scaling remains enabled and compact layout avoids fixed-height text containers.",
      "All essential copy remains text.",
    ),
    reflow: support(
      "supported-by-shell",
      "Scroll containers and wrapping cards adapt to compact widths.",
      "Direct information remains in reading order.",
    ),
    contrast: support(
      "validated-by-contract",
      "Named foreground/background pairs meet at least 4.5:1.",
      "Labels and state text accompany color.",
    ),
    orientation: support(
      "supported-by-reflow",
      "No route is locked to portrait or landscape.",
      "The same scrollable content reflows by width.",
    ),
    "reduced-motion": support(
      "not-required-by-default",
      "No essential animation, parallax, or auto-advancing transition is present.",
      "Text and explicit controls expose every state.",
    ),
    "reduced-data": support(
      "supported-by-bundle",
      "Essential content is bundled and no media or analytics request is required.",
      "The direct path remains complete.",
    ),
    "low-bandwidth": support(
      "supported-by-bundle",
      "Public content and rules remain usable without network access.",
      "Storage failure falls back to bundled text.",
    ),
    "audio-text": support(
      "text-is-primary",
      "No essential information depends on audio.",
      "Dialogue, notices, and alternatives are text.",
    ),
    haptic: support(
      "not-required-by-default",
      "No essential state depends on haptics.",
      "Text and control state provide the equivalent.",
    ),
    "gesture-alternatives": support(
      "supported-by-shell",
      "All actions are standard buttons or links.",
      "No essential action requires swipe, drag, pinch, shake, or long press.",
    ),
  }),
  android: Object.freeze({
    keyboard: support(
      "platform-assisted",
      "Semantic controls support hardware-keyboard and focus traversal through React Native.",
      "Touch and switch-access paths expose the same actions.",
      "Hardware-keyboard behavior requires device testing.",
    ),
    "screen-reader": support(
      "platform-assisted",
      "TalkBack receives roles, labels, hints, headings, lists, alerts, and live-region text.",
      "Essential information is visible text.",
      "Independent TalkBack device testing remains open.",
    ),
    touch: support(
      "supported-by-shell",
      "Interactive targets use at least 44 logical pixels of height.",
      "TalkBack and Switch Access can reach the same controls.",
    ),
    switch: support(
      "platform-assisted",
      "Standard semantic controls are compatible with Switch Access traversal.",
      "No timed or gesture-only action exists.",
      "Independent Switch Access device testing remains open.",
    ),
    scaling: support(
      "supported-by-shell",
      "React Native text scaling remains enabled and compact layout avoids fixed-height text containers.",
      "All essential copy remains text.",
    ),
    reflow: support(
      "supported-by-shell",
      "Scroll containers and wrapping cards adapt to compact widths.",
      "Direct information remains in reading order.",
    ),
    contrast: support(
      "validated-by-contract",
      "Named foreground/background pairs meet at least 4.5:1.",
      "Labels and state text accompany color.",
    ),
    orientation: support(
      "supported-by-reflow",
      "No route is locked to portrait or landscape.",
      "The same scrollable content reflows by width.",
    ),
    "reduced-motion": support(
      "not-required-by-default",
      "No essential animation, parallax, or auto-advancing transition is present.",
      "Text and explicit controls expose every state.",
    ),
    "reduced-data": support(
      "supported-by-bundle",
      "Essential content is bundled and no media or analytics request is required.",
      "The direct path remains complete.",
    ),
    "low-bandwidth": support(
      "supported-by-bundle",
      "Public content and rules remain usable without network access.",
      "Storage failure falls back to bundled text.",
    ),
    "audio-text": support(
      "text-is-primary",
      "No essential information depends on audio.",
      "Dialogue, notices, and alternatives are text.",
    ),
    haptic: support(
      "not-required-by-default",
      "No essential state depends on haptics.",
      "Text and control state provide the equivalent.",
    ),
    "gesture-alternatives": support(
      "supported-by-shell",
      "All actions are standard buttons or links.",
      "No essential action requires swipe, drag, pinch, shake, or long press.",
    ),
  }),
});

export const DIRECT_PATH_PARITY = Object.freeze({
  narrative: Object.freeze([
    "no-account-public-entry",
    "authority-boundary",
    "meaningful-refusal",
    "future-account-inactive",
    "discard-by-default",
  ]),
  direct: Object.freeze([
    "no-account-public-entry",
    "authority-boundary",
    "meaningful-refusal",
    "future-account-inactive",
    "discard-by-default",
  ]),
});

export const CONTRAST_PAIRS = Object.freeze([
  Object.freeze({
    name: "ink on paper",
    foreground: "#1D272B",
    background: "#FFFDF7",
  }),
  Object.freeze({
    name: "soft ink on paper",
    foreground: "#526168",
    background: "#FFFDF7",
  }),
  Object.freeze({
    name: "white on night",
    foreground: "#FFFFFF",
    background: "#101A24",
  }),
  Object.freeze({
    name: "foam on night",
    foreground: "#E9F1EE",
    background: "#101A24",
  }),
  Object.freeze({
    name: "soft gold on night",
    foreground: "#F1DEAE",
    background: "#101A24",
  }),
  Object.freeze({
    name: "night on gold",
    foreground: "#101A24",
    background: "#D6A84A",
  }),
  Object.freeze({
    name: "coral on paper",
    foreground: "#9F523F",
    background: "#FFFDF7",
  }),
  Object.freeze({
    name: "ink on parchment",
    foreground: "#1D272B",
    background: "#F4EFE3",
  }),
  Object.freeze({
    name: "soft ink on parchment",
    foreground: "#526168",
    background: "#F4EFE3",
  }),
]);

export const RESIDUAL_ACCESSIBILITY_LIMITATIONS = Object.freeze([
  "Independent browser and assistive-technology testing remains open.",
  "Independent VoiceOver, TalkBack, Switch Control, Switch Access, external-keyboard, orientation, and device testing remains open.",
  "Affected-user comprehension and usability evidence remains open.",
  "Operating-system focus, scaling, backup, and eviction behavior may vary.",
  "Accessibility preferences are not persisted in Sprint 10.",
  "No audio or haptic experience is implemented; text is the complete primary path.",
  "Structural parity evidence is not independent accessibility certification.",
]);

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const value = hex.replace("#", "");
  const red = channel(Number.parseInt(value.slice(0, 2), 16));
  const green = channel(Number.parseInt(value.slice(2, 4), 16));
  const blue = channel(Number.parseInt(value.slice(4, 6), 16));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function calculateContrastRatio(foreground, background) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function validateDirectPathParity() {
  const narrative = new Set(DIRECT_PATH_PARITY.narrative);
  const direct = new Set(DIRECT_PATH_PARITY.direct);
  const missingFromDirect = [...narrative].filter((item) => !direct.has(item));
  const missingFromNarrative = [...direct].filter(
    (item) => !narrative.has(item),
  );

  return Object.freeze({
    ok: missingFromDirect.length === 0 && missingFromNarrative.length === 0,
    missingFromDirect: Object.freeze(missingFromDirect),
    missingFromNarrative: Object.freeze(missingFromNarrative),
  });
}

export function validateAccessibilityParity() {
  const failures = [];

  for (const platform of ACCESSIBILITY_PLATFORMS) {
    const support = PLATFORM_SUPPORT_MATRIX[platform];
    for (const modality of ACCESSIBILITY_MODALITIES) {
      if (!support[modality]) {
        failures.push(`${platform} is missing ${modality}`);
      }
    }
  }

  for (const pair of CONTRAST_PAIRS) {
    const ratio = calculateContrastRatio(pair.foreground, pair.background);
    if (ratio < 4.5) {
      failures.push(`${pair.name} contrast is ${ratio.toFixed(2)}:1`);
    }
  }

  if (!validateDirectPathParity().ok) {
    failures.push("direct and narrative essential concepts are not equivalent");
  }

  if (RESIDUAL_ACCESSIBILITY_LIMITATIONS.length === 0) {
    failures.push("residual limitations are not documented");
  }

  return Object.freeze({
    ok: failures.length === 0,
    failures: Object.freeze(failures),
  });
}
