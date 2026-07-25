export const syntheticAccessibilityContexts = [
  {
    id: "fixture-context.avery.screen-reader",
    displayName: "Avery",
    ageBand: "teen",
    locale: "en-US",
    languageContext: "English-first",
    accessNeeds: ["screen-reader", "keyboard-only"],
    dataAvailability: ["manual-entry", "no-device-integration"],
    declaration: "synthetic-non-chronicle-test-context",
  },
  {
    id: "fixture-context.mina.rtl-multilingual",
    displayName: "Mina",
    ageBand: "adult",
    locale: "ar-EG",
    languageContext: "right-to-left and multilingual presentation",
    accessNeeds: ["keyboard-only", "clear-language"],
    dataAvailability: ["intermittent-connectivity", "document-import"],
    declaration: "synthetic-non-chronicle-test-context",
  },
  {
    id: "fixture-context.luz.large-text",
    displayName: "Luz",
    ageBand: "older-adult",
    locale: "es-MX",
    languageContext: "Spanish-first with translated support",
    accessNeeds: ["large-text", "high-contrast", "plain-language"],
    dataAvailability: ["paper-document", "manual-entry"],
    declaration: "synthetic-non-chronicle-test-context",
  },
  {
    id: "fixture-context.tane.reduced-motion",
    displayName: "Tane",
    ageBand: "adult",
    locale: "en-NZ",
    languageContext: "English-first with culturally adaptable copy",
    accessNeeds: ["reduced-motion", "touch-target-spacing"],
    dataAvailability: ["device-export", "manual-entry", "offline-periods"],
    declaration: "synthetic-non-chronicle-test-context",
  },
];

export const syntheticAccessibilityContextDeclaration = {
  dataClassification: "synthetic",
  purpose: "inclusive interaction and contributor-fixture review only",
  notChronicleData: true,
  assertions: [
    "These contexts do not describe real people.",
    "They contain no health values, diagnoses, treatments, or personal histories.",
    "Names, age bands, locales, access needs, and data-availability conditions are varied without assigning health outcomes or product value.",
    "No context creates consent, reward, progression, compensation, or governance authority.",
  ],
};
