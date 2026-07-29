export type OgygiaLaw = {
  readonly id: string;
  readonly title: string;
  readonly law: string;
  readonly explanation: string;
};

export const sevenLaws: readonly OgygiaLaw[] = [
  {
    id: "open-hand",
    title: "The Law of the Open Hand",
    law: "Nothing is taken through coercion, confusion, deception, or manufactured urgency.",
    explanation:
      "Purpose, choice, and consequences must be understandable before participation. Narrative cannot become pressure or concealment.",
  },
  {
    id: "right-of-the-key",
    title: "The Right of the Key",
    law: "Every person controls access to their Chronicle.",
    explanation:
      "Access must remain purpose-specific, inspectable, revocable, and subordinate to the person rather than a provider, sponsor, or platform.",
  },
  {
    id: "sanctity-of-the-hearth",
    title: "The Sanctity of the Hearth",
    law: "Private by default.",
    explanation:
      "The software may be public while production health data remains private. Visibility and sharing require separate, deliberate choices.",
  },
  {
    id: "true-chronicle",
    title: "The Law of the True Chronicle",
    law: "Provenance, timing, method, and uncertainty must be preserved.",
    explanation:
      "A useful Chronicle keeps source context and evidence differences visible instead of flattening every record into one unquestioned claim.",
  },
  {
    id: "no-oracle-above-evidence",
    title: "No Oracle Above Evidence",
    law: "No claim may exceed its evidence.",
    explanation:
      "Models, institutions, standards, associations, and confident language cannot turn incomplete evidence into diagnosis, certainty, or authority.",
  },
  {
    id: "right-of-return",
    title: "The Right of Return",
    law: "People may export, revoke, correct, and request deletion where possible.",
    explanation:
      "Leaving, changing course, correcting history, and carrying records elsewhere are product rights rather than progression rewards.",
  },
  {
    id: "covenant-of-the-commons",
    title: "The Covenant of the Commons",
    law: "Public-good knowledge must be governed transparently and cannot be silently converted into private extraction.",
    explanation:
      "Research and collective benefit require visible governance, purpose-specific authority, and protection against sponsor or institutional capture.",
  },
];
