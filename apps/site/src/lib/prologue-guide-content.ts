export type PrologueGuideFact = {
  readonly id: "source" | "authority" | "storage" | "choice";
  readonly title: string;
  readonly detail: string;
};

export const prologueGuideFacts: readonly PrologueGuideFact[] = Object.freeze([
  Object.freeze({
    id: "source",
    title: "Source before suggestion",
    detail:
      "Every later draft begins from a named public synthetic fixture. The demonstration never treats generated language as its own source.",
  }),
  Object.freeze({
    id: "authority",
    title: "Aster cannot confirm itself",
    detail:
      "Aster may explain or prepare a draft, but only an explicit visitor choice can confirm the synthetic demonstration state.",
  }),
  Object.freeze({
    id: "storage",
    title: "Nothing becomes a durable record",
    detail:
      "The prologue keeps state only in this page. A refresh, restart, discard, exit, or tab close removes it.",
  }),
  Object.freeze({
    id: "choice",
    title: "The direct path remains complete",
    detail:
      "The manual guide exposes the same facts, controls, synthetic fixture choices, and later completion path without Aster framing.",
  }),
]);

export const asterIntroduction = Object.freeze({
  speaker: "Aster",
  label: "Deterministic scripted guide",
  opening:
    "I can help present what the source says, prepare a synthetic draft, and explain what remains uncertain. I cannot create truth, permission, or completion on my own.",
  closing:
    "You can switch to the direct guide at any time. The next workstream adds the same pre-authored synthetic capture choices to both paths.",
});

export const manualIntroduction = Object.freeze({
  label: "Direct manual guide",
  opening:
    "This route presents the prologue rules without an AI character. It uses the same sources, synthetic fixtures, correction controls, and deterministic evidence as the Aster presentation.",
  closing:
    "You can switch to Aster framing at any time. Neither route changes what can be confirmed or how First Lantern evidence is produced.",
});
