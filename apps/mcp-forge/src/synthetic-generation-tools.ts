import { createHash } from "node:crypto";

import {
  CONTENT_SCHEMA_VERSION,
  validateContent,
  type AccessibilityVariant,
  type QuestContent,
  type ReviewDomain,
} from "@calypsos-promise/content-schema";

import {
  FORGE_LORE_SCHEMA_ERROR_CODES,
  FORGE_TOOL_NON_AUTHORITY,
  ForgeLoreSchemaToolError,
} from "./lore-schema-contracts.js";
import { isRecord } from "./lore-tool-support.js";
import { validateForgeMappingDraft } from "./mapping-draft-tools.js";
import { ForgeSourceRepository } from "./source-repository.js";
import {
  FORGE_SYNTHETIC_GENERATION_KIND_IDS,
  FORGE_SYNTHETIC_GENERATION_PROFILE_IDS,
  FORGE_SYNTHETIC_GENERATION_TOOL_REVISION,
  FORGE_SYNTHETIC_GENERATOR_ID,
  FORGE_SYNTHETIC_GENERATOR_REVISION,
  type ForgeGenerateSyntheticDataInput,
  type ForgeGenerateSyntheticDataOutput,
  type ForgeGeneratedSyntheticRecord,
  type ForgeSyntheticGenerationKind,
  type ForgeSyntheticGenerationProfile,
} from "./synthetic-generation-contracts.js";

const DEFAULT_COUNT = 4;
const MAX_COUNT = 25;
const MAX_SEED_LENGTH = 128;
const MAX_INPUT_BYTES = 131_072;
const DAY_MILLISECONDS = 86_400_000;
const SYNTHETIC_EPOCH = Date.UTC(2020, 0, 1);

interface QuestScenario {
  readonly id: string;
  readonly title: string;
  readonly objective: string;
  readonly requirementType: QuestContent["requirements"][number]["type"];
  readonly accessibilityVariants: readonly AccessibilityVariant[];
  readonly edgeCase: boolean;
}

interface MappingScenario {
  readonly id: string;
  readonly sourcePath: string;
  readonly targetPath: string;
  readonly transform:
    | "identity"
    | "code-map"
    | "unit-conversion"
    | "date-normalization"
    | "text-copy"
    | "unsupported";
  readonly confidence: "exact-structural" | "candidate" | "unsupported";
  readonly accessibilityRelevant: boolean;
  readonly edgeCase: boolean;
}

const QUEST_SCENARIOS: readonly QuestScenario[] = [
  {
    id: "daily-reflection",
    title: "Daily Reflection",
    objective: "Review one fictional daily wellbeing note.",
    requirementType: "player-confirmation",
    accessibilityVariants: [],
    edgeCase: false,
  },
  {
    id: "plain-language",
    title: "Plain Language Review",
    objective: "Review a fictional health concept in plain language.",
    requirementType: "learning-completion",
    accessibilityVariants: [
      {
        id: "accessibility.plain-language",
        label: "Plain language",
        description: "Uses shorter sentences and direct vocabulary.",
      },
    ],
    edgeCase: false,
  },
  {
    id: "screen-reader",
    title: "Screen Reader Path",
    objective: "Review a fictional record through a linear text-first path.",
    requirementType: "player-confirmation",
    accessibilityVariants: [
      {
        id: "accessibility.screen-reader",
        label: "Screen reader sequence",
        description:
          "Presents controls and context in a predictable linear order.",
      },
    ],
    edgeCase: false,
  },
  {
    id: "reduced-motion",
    title: "Reduced Motion Path",
    objective: "Complete a fictional reflection without motion-dependent cues.",
    requirementType: "manual-action",
    accessibilityVariants: [
      {
        id: "accessibility.reduced-motion",
        label: "Reduced motion",
        description:
          "Avoids motion-dependent instructions and timed animation.",
      },
    ],
    edgeCase: false,
  },
  {
    id: "low-dexterity",
    title: "Low Dexterity Path",
    objective:
      "Confirm a fictional preference using a minimal interaction path.",
    requirementType: "player-confirmation",
    accessibilityVariants: [
      {
        id: "accessibility.low-dexterity",
        label: "Minimal interaction",
        description:
          "Uses one large confirmation target and no precision gesture.",
      },
    ],
    edgeCase: false,
  },
  {
    id: "decline-and-return",
    title: "Decline and Return",
    objective:
      "Exercise a fictional non-punitive decline and later-return path.",
    requirementType: "player-confirmation",
    accessibilityVariants: [],
    edgeCase: true,
  },
  {
    id: "minimal-duration",
    title: "One Minute Check-In",
    objective: "Exercise a fictional one-minute completion path.",
    requirementType: "manual-action",
    accessibilityVariants: [],
    edgeCase: true,
  },
];

const MAPPING_SCENARIOS: readonly MappingScenario[] = [
  {
    id: "numeric-observation",
    sourcePath: "Observation.valueQuantity.value",
    targetPath: "record.value.numericValue",
    transform: "identity",
    confidence: "candidate",
    accessibilityRelevant: false,
    edgeCase: false,
  },
  {
    id: "coded-observation",
    sourcePath: "Observation.code.coding",
    targetPath: "record.variable.sourceCodes",
    transform: "code-map",
    confidence: "candidate",
    accessibilityRelevant: false,
    edgeCase: false,
  },
  {
    id: "effective-date",
    sourcePath: "Observation.effectiveDateTime",
    targetPath: "record.assertedAt",
    transform: "date-normalization",
    confidence: "candidate",
    accessibilityRelevant: false,
    edgeCase: false,
  },
  {
    id: "accessible-display",
    sourcePath: "Observation.note.text",
    targetPath: "record.presentation.plainLanguageSummary",
    transform: "text-copy",
    confidence: "candidate",
    accessibilityRelevant: true,
    edgeCase: false,
  },
  {
    id: "unsupported-component",
    sourcePath: "Observation.component.extension",
    targetPath: "record.unmappedSourceEvidence",
    transform: "unsupported",
    confidence: "unsupported",
    accessibilityRelevant: false,
    edgeCase: true,
  },
  {
    id: "unit-conversion-candidate",
    sourcePath: "Observation.valueQuantity.unit",
    targetPath: "record.value.canonicalUnit",
    transform: "unit-conversion",
    confidence: "candidate",
    accessibilityRelevant: false,
    edgeCase: true,
  },
];

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowed: readonly string[],
): boolean {
  const allowedSet = new Set(allowed);
  return Object.keys(value).every((key) => allowedSet.has(key));
}

function hashHex(...parts: readonly (string | number)[]): string {
  const hash = createHash("sha256");
  for (const part of parts) {
    hash.update(String(part));
    hash.update("\u0000");
  }
  return hash.digest("hex");
}

function digestNumber(hex: string, offset: number): number {
  return Number.parseInt(hex.slice(offset, offset + 8), 16);
}

function parseInput(input: unknown): Required<ForgeGenerateSyntheticDataInput> {
  if (
    !isRecord(input) ||
    !hasOnlyKeys(input, ["kind", "seed", "count", "profile"]) ||
    typeof input.kind !== "string" ||
    !FORGE_SYNTHETIC_GENERATION_KIND_IDS.includes(
      input.kind as ForgeSyntheticGenerationKind,
    ) ||
    typeof input.seed !== "string"
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Synthetic generation requires an accepted kind, a public-safe seed, and optional bounded count and profile fields.",
    );
  }

  let inputBytes: number;
  try {
    inputBytes = Buffer.byteLength(JSON.stringify(input), "utf8");
  } catch {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Synthetic generation input must be JSON serializable.",
    );
  }
  if (inputBytes > MAX_INPUT_BYTES) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      `Synthetic generation input must not exceed ${MAX_INPUT_BYTES} bytes.`,
    );
  }

  const seed = input.seed.normalize("NFKC").trim();
  if (
    seed.length === 0 ||
    seed.length > MAX_SEED_LENGTH ||
    /[\u0000-\u001F\u007F]/.test(seed)
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      `seed must contain 1-${MAX_SEED_LENGTH} public-safe characters.`,
    );
  }

  const count = input.count === undefined ? DEFAULT_COUNT : input.count;
  if (
    !Number.isSafeInteger(count) ||
    Number(count) < 1 ||
    Number(count) > MAX_COUNT
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      `count must be an integer from 1-${MAX_COUNT}.`,
    );
  }

  const profile = input.profile === undefined ? "balanced" : input.profile;
  if (
    typeof profile !== "string" ||
    !FORGE_SYNTHETIC_GENERATION_PROFILE_IDS.includes(
      profile as ForgeSyntheticGenerationProfile,
    )
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "profile must be balanced, accessibility, or edge-cases.",
    );
  }

  return {
    kind: input.kind as ForgeSyntheticGenerationKind,
    seed,
    count: Number(count),
    profile: profile as ForgeSyntheticGenerationProfile,
  };
}

function candidatesForQuest(
  profile: ForgeSyntheticGenerationProfile,
): readonly QuestScenario[] {
  if (profile === "accessibility") {
    return QUEST_SCENARIOS.filter(
      (scenario) => scenario.accessibilityVariants.length > 0,
    );
  }
  if (profile === "edge-cases") {
    return QUEST_SCENARIOS.filter((scenario) => scenario.edgeCase);
  }
  return QUEST_SCENARIOS;
}

function candidatesForMapping(
  profile: ForgeSyntheticGenerationProfile,
): readonly MappingScenario[] {
  if (profile === "accessibility") {
    return MAPPING_SCENARIOS.filter(
      (scenario) => scenario.accessibilityRelevant,
    );
  }
  if (profile === "edge-cases") {
    return MAPPING_SCENARIOS.filter((scenario) => scenario.edgeCase);
  }
  return MAPPING_SCENARIOS;
}

function deterministicDate(caseDigest: string): string {
  const dayOffset = digestNumber(caseDigest, 0) % 3_650;
  return new Date(SYNTHETIC_EPOCH + dayOffset * DAY_MILLISECONDS).toISOString();
}

function questArtifact(
  scenario: QuestScenario,
  caseDigest: string,
  index: number,
): QuestContent {
  const suffix = caseDigest.slice(0, 12);
  const timestamp = deterministicDate(caseDigest);
  const reviewRequirements: ReviewDomain[] = ["editorial"];
  if (scenario.accessibilityVariants.length > 0) {
    reviewRequirements.push("accessibility");
  }
  const requirementId = `requirement.synthetic.${scenario.id}`;

  return {
    id: `quest.synthetic.${scenario.id}.${suffix}`,
    schemaVersion: CONTENT_SCHEMA_VERSION,
    revision: 1,
    reviewState: "draft",
    capabilityStatus: "experimental",
    kind: "quest",
    title: `Synthetic ${scenario.title} ${index + 1}`,
    summary:
      "A deterministic fictional quest fixture generated for public contract testing.",
    locale: "en-US",
    tags: ["synthetic", "forge-generated", scenario.id],
    canonReferences: [],
    dependencies: [],
    owner: "forge-synthetic-fixture",
    reviewRequirements,
    reviewApprovals: [],
    authorship: {
      mode: "human-authored",
      humanContributors: ["Fictional synthetic fixture steward"],
    },
    createdAt: timestamp,
    updatedAt: timestamp,
    publicTitle: `Synthetic ${scenario.title}`,
    inWorldTitle: `The ${scenario.title} Exercise`,
    zoneId: "zone.synthetic.ogygia",
    guideCharacterId: "character.synthetic.guide",
    connectedLoop: "improve-understanding",
    playerValue: "Exercise a bounded fictional contributor-test path.",
    objective: scenario.objective,
    progressDimension: "chronicle",
    requirements: [
      {
        id: requirementId,
        type: scenario.requirementType,
        description: "Complete the fictional synthetic test step.",
        parameters: {
          synthetic: true,
          caseIndex: index,
        },
      },
    ],
    completionRule: {
      mode: "all",
      requirementIds: [requirementId],
    },
    rewards: [{ type: "progress", dimension: "chronicle", amount: 1 }],
    estimatedMinutes: scenario.id === "minimal-duration" ? 1 : 5,
    accessibilityVariants: [...scenario.accessibilityVariants],
    dataCategories: ["data.synthetic"],
    permissionPurposeIds: [],
    safetyClassification: "general",
    feedback: "The fictional synthetic test step is structurally complete.",
    narrativeConsequence:
      "No product, Chronicle, permission, gameplay, or institutional state changes.",
    canDefer: true,
    canDecline: true,
    deferralPath: "Return to the fictional fixture later without penalty.",
    refusalPath: "Decline the fictional fixture without penalty.",
    analyticsHypothesis:
      "Deterministic synthetic fixtures can improve contributor validation.",
  };
}

function mappingArtifact(
  scenario: MappingScenario,
  caseDigest: string,
  profile: ForgeSyntheticGenerationProfile,
): Record<string, unknown> {
  const suffix = caseDigest.slice(0, 12);
  const reviewRequirements = ["interoperability", "semantic", "privacy"];
  if (profile === "accessibility" || scenario.accessibilityRelevant) {
    reviewRequirements.push("accessibility");
  }

  return {
    kind: "mapping-draft",
    id: `mapping-draft.synthetic.${scenario.id}.${suffix}`,
    revision: "1",
    status: "draft",
    title: `Synthetic ${scenario.id} mapping draft`,
    sourceStandard: {
      id: "hl7.fhir.r4",
      version: "4.0.1",
      publicReference: "https://hl7.org/fhir/R4/observation.html",
    },
    targetModel: {
      id: "calypsos-promise.living-chronicle",
      version: "0.1.0-pre.1",
    },
    entries: [
      {
        id: `entry.${scenario.id}`,
        sourcePath: scenario.sourcePath,
        targetPath: scenario.targetPath,
        transform: scenario.transform,
        confidence: scenario.confidence,
        notes:
          "Deterministic synthetic candidate only; semantic review remains required.",
      },
    ],
    syntheticEvidence: {
      fixtureIds: [`generator-case.${suffix}`],
      evidenceOnly: true,
    },
    reviewRequirements,
    claims: {
      mappingApproval: "not-granted",
      semanticEquivalence: "not-proven",
      connectorBehavior: "not-proven",
      certification: "not-granted",
      productionReadiness: "not-established",
      providerPreference: "none",
    },
  };
}

function recordBase(
  kind: ForgeSyntheticGenerationKind,
  seedDigest: `sha256:${string}`,
  profile: ForgeSyntheticGenerationProfile,
  scenarioId: string,
  caseIndex: number,
  caseId: string,
): Omit<ForgeGeneratedSyntheticRecord, "schema" | "validation" | "artifact"> {
  return {
    caseId,
    kind,
    synthetic: true,
    informationClass: "public-synthetic-fixture",
    productionReady: false,
    containsCredentials: false,
    containsPersonalData: false,
    generator: {
      id: FORGE_SYNTHETIC_GENERATOR_ID,
      revision: FORGE_SYNTHETIC_GENERATOR_REVISION,
      seedDigest,
      caseIndex,
      profile,
      scenarioId,
    },
    humanReviewRequired: true,
    canonAcceptance: "not-granted",
    mappingApproval: "not-granted",
    semanticEquivalence: "not-proven",
    clinicalUse: "not-authorized",
    providerPreference: "none",
    connectorActivation: "not-granted",
    productionReadiness: "not-established",
  };
}

async function generateQuestRecord(
  seed: string,
  seedDigest: `sha256:${string}`,
  profile: ForgeSyntheticGenerationProfile,
  index: number,
): Promise<ForgeGeneratedSyntheticRecord> {
  const candidates = candidatesForQuest(profile);
  const caseDigest = hashHex(seed, "quest", profile, index);
  const scenario = candidates[digestNumber(caseDigest, 8) % candidates.length];
  if (scenario === undefined) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.sourceUnavailable,
      "The deterministic quest scenario catalogue is unavailable.",
    );
  }
  const artifact = questArtifact(scenario, caseDigest, index);
  const validation = validateContent(artifact);
  if (!validation.ok) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.sourceUnavailable,
      "A generated synthetic quest failed deterministic validation.",
    );
  }
  const caseId = `synthetic-case.quest.${caseDigest.slice(0, 16)}`;
  return {
    ...recordBase("quest", seedDigest, profile, scenario.id, index, caseId),
    schema: {
      id: "calypsos-promise.content.quest",
      revision: CONTENT_SCHEMA_VERSION,
    },
    validation: {
      validatorId: "calypsos-promise.content-schema.validate-content",
      validatorRevision: CONTENT_SCHEMA_VERSION,
      valid: true,
      issues: [],
    },
    artifact,
  };
}

async function generateMappingRecord(
  repository: ForgeSourceRepository,
  seed: string,
  seedDigest: `sha256:${string}`,
  profile: ForgeSyntheticGenerationProfile,
  index: number,
): Promise<ForgeGeneratedSyntheticRecord> {
  const candidates = candidatesForMapping(profile);
  const caseDigest = hashHex(seed, "mapping-draft", profile, index);
  const scenario = candidates[digestNumber(caseDigest, 8) % candidates.length];
  if (scenario === undefined) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.sourceUnavailable,
      "The deterministic mapping scenario catalogue is unavailable.",
    );
  }
  const artifact = mappingArtifact(scenario, caseDigest, profile);
  const validation = await validateForgeMappingDraft(repository, {
    mapping: artifact,
    informationClass: "public-synthetic-fixture",
  });
  if (!validation.valid) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.sourceUnavailable,
      "A generated synthetic mapping draft failed deterministic validation.",
    );
  }
  const caseId = `synthetic-case.mapping-draft.${caseDigest.slice(0, 16)}`;
  return {
    ...recordBase(
      "mapping-draft",
      seedDigest,
      profile,
      scenario.id,
      index,
      caseId,
    ),
    schema: {
      id: "forge.mapping-draft",
      revision: "1",
    },
    validation: {
      validatorId: "forge.validate.mapping-draft",
      validatorRevision: "1",
      valid: true,
      issues: [],
    },
    artifact,
  };
}

function isAccessibilityRecord(record: ForgeGeneratedSyntheticRecord): boolean {
  if (record.kind === "quest") {
    return (
      isRecord(record.artifact) &&
      Array.isArray(record.artifact.accessibilityVariants) &&
      record.artifact.accessibilityVariants.length > 0
    );
  }
  return record.generator.scenarioId === "accessible-display";
}

function isEdgeRecord(record: ForgeGeneratedSyntheticRecord): boolean {
  return [
    "decline-and-return",
    "minimal-duration",
    "unsupported-component",
    "unit-conversion-candidate",
  ].includes(record.generator.scenarioId);
}

export async function generateForgeSyntheticData(
  repository: ForgeSourceRepository,
  input: unknown,
  signal?: AbortSignal,
): Promise<ForgeGenerateSyntheticDataOutput> {
  const request = parseInput(input);
  const seedDigest = `sha256:${hashHex(request.seed)}` as const;
  const records: ForgeGeneratedSyntheticRecord[] = [];

  for (let index = 0; index < request.count; index += 1) {
    if (signal?.aborted) throw signal.reason;
    records.push(
      request.kind === "quest"
        ? await generateQuestRecord(
            request.seed,
            seedDigest,
            request.profile,
            index,
          )
        : await generateMappingRecord(
            repository,
            request.seed,
            seedDigest,
            request.profile,
            index,
          ),
    );
  }

  const scenarioIds = [
    ...new Set(records.map((record) => record.generator.scenarioId)),
  ];

  return {
    toolId: "forge.generate.synthetic-data",
    revision: FORGE_SYNTHETIC_GENERATION_TOOL_REVISION,
    generatorId: FORGE_SYNTHETIC_GENERATOR_ID,
    generatorRevision: FORGE_SYNTHETIC_GENERATOR_REVISION,
    deterministic: true,
    seedDigest,
    kind: request.kind,
    profile: request.profile,
    requestedCount: request.count,
    generatedCount: records.length,
    records,
    diversity: {
      profile: request.profile,
      scenarioIds,
      distinctScenarioCount: scenarioIds.length,
      accessibilityRelevantCases: records.filter(isAccessibilityRecord).length,
      edgeCaseCount: records.filter(isEdgeRecord).length,
    },
    allRecordsValidated: true,
    humanReviewRequired: true,
    repositoryWrite: "not-performed",
    networkUsed: false,
    providerUsed: false,
    canonAcceptance: "not-granted",
    mappingApproval: "not-granted",
    clinicalUse: "not-authorized",
    providerPreference: "none",
    connectorActivation: "not-granted",
    productionReadiness: "not-established",
    ...FORGE_TOOL_NON_AUTHORITY,
  };
}
