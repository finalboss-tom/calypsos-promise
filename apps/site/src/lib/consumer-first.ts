export type ConsumerFirstPrinciple = {
  readonly title: string;
  readonly explanation: string;
};

export const consumerFirstPrinciples: readonly ConsumerFirstPrinciple[] = [
  {
    title: "The person is the continuity layer",
    explanation:
      "Providers, payers, devices, applications, standards, and encounters may change. The person is the only durable continuity layer across organizations, geography, insurance, technology, and time.",
  },
  {
    title: "Standards at the edges",
    explanation:
      "FHIR, implementation guides, clinical documents, claims, devices, and other formats remain important exchange contracts. They connect through versioned adapters rather than silently becoming complete Chronicle meaning.",
  },
  {
    title: "Evidence types stay distinct",
    explanation:
      "Clinical assertions, claims, device observations, person-confirmed records, recollections, calculations, associations, and inferences retain their source class, timing, provenance, conflicts, and uncertainty.",
  },
  {
    title: "Partnership without capture",
    explanation:
      "Providers and institutions may become important sources, destinations, collaborators, and partners. Data, funding, infrastructure, or distribution do not purchase schema authority, roadmap control, source rank, or preferred status.",
  },
];

export const institutionalLayers = [
  {
    title: "Personal import and export",
    explanation:
      "The person authorizes data movement into or out of their Chronicle.",
  },
  {
    title: "Care collaboration",
    explanation:
      "The person may later authorize a provider or caregiver to view or receive bounded information.",
  },
  {
    title: "Institutional workflow",
    explanation:
      "Provider operations require separate contracts, authority, safety review, and implementation evidence.",
  },
  {
    title: "Research or public benefit",
    explanation:
      "Access, analysis, recruitment, or result return require separate House of Keys and research safeguards.",
  },
] as const;

export const currentInstitutionalLimits = [
  "No production provider or EHR connector is live.",
  "No clinical workflow or decision-support capability is active.",
  "No enterprise procurement process defines the minimum useful Chronicle.",
  "No provider, sponsor, or standard is the automatic authority over Chronicle meaning.",
] as const;
