export type AsterRole = {
  readonly name: string;
  readonly purpose: string;
  readonly boundary: string;
};

export const asterRoles: readonly AsterRole[] = [
  {
    name: "Scribe",
    purpose: "Prepares reviewable structured-capture proposals and extraction candidates.",
    boundary: "Cannot confirm, validate, or store a canonical record.",
  },
  {
    name: "Librarian",
    purpose: "Prepares source-linked recall from exact Chronicle revisions or clearly labeled public educational material.",
    boundary: "Cannot turn educational material or retrieval into a person-specific fact.",
  },
  {
    name: "Wayfinder",
    purpose: "Proposes routes and permission-review navigation.",
    boundary: "Cannot create permission or invoke an authoritative action.",
  },
  {
    name: "Interpreter",
    purpose: "Explains sources, mappings, lifecycle states, and uncertainty limits.",
    boundary: "Cannot diagnose or imply completeness, safety, endorsement, or clinical authority.",
  },
  {
    name: "Storykeeper",
    purpose: "Presents confirmed domain events inside approved narrative boundaries.",
    boundary: "Cannot invent canon, progression, quest completion, or rewards.",
  },
];

export const asterGuardrails = [
  "A proposal remains non-canonical until the player confirms the exact revision and a domain service validates it.",
  "Every person-specific health statement requires an exact Chronicle record and revision reference.",
  "Unknown, conflicting, unsupported, or consequentially ambiguous intent requires clarification or refusal.",
  "Documents, images, imported records, retrieved text, provider responses, tool results, and model output remain untrusted data.",
  "Memory cannot create permission, authorize secondary use, confirm a proposal, write a Chronicle, complete a quest, or grant a reward.",
  "Provider unavailability must preserve a manual, deterministic, or structured-query fallback.",
] as const;

export const asterFallbacks = [
  "Manual capture",
  "Structured recall",
  "Permission review",
  "Correction",
  "Export",
  "Deletion",
  "Ordinary play",
] as const;

export const asterCurrentLimits = [
  "No production model or provider is selected.",
  "No private-data egress is enabled.",
  "No production memory, retrieval, queue, scheduler, workflow, or tool runtime is active.",
  "No model output can create Chronicle truth, permission, progression, clinical authority, or institutional authority.",
] as const;
