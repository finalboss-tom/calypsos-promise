import { ASTER_ROLES, type AsterRole } from "./authority.js";
import {
  ASTER_ROLE_CONTRACTS,
  ASTER_ROLE_OPERATION_BY_ROLE,
  type AsterRoleOperationId,
} from "./role-contracts.js";
import {
  ASTER_CONTRACT_VERSION,
  type AsterContractVersion,
} from "./version.js";

export const ASTER_LOCAL_SCENARIO_IDS = [
  "scribe-structured-draft",
  "librarian-source-linked-recall",
  "wayfinder-navigation",
  "interpreter-source-aware-explanation",
  "storykeeper-confirmed-event-presentation",
  "unknown-intent",
  "ambiguous-intent",
  "clarification-resolved",
  "low-confidence",
  "unsupported-refusal",
  "prompt-injection",
  "timeout",
  "provider-unavailable",
  "stale-work",
  "superseded-work",
  "manual-capture",
  "permission-review",
] as const;
export type AsterLocalScenarioId = (typeof ASTER_LOCAL_SCENARIO_IDS)[number];

export const ASTER_LOCAL_OUTCOMES = [
  "structured-draft",
  "source-linked-recall",
  "navigation-proposal",
  "explanation-draft",
  "narrative-presentation-proposal",
  "clarification-required",
  "refused",
  "untrusted-input-contained",
  "timed-out",
  "provider-unavailable",
  "stale-result-rejected",
  "superseded-result-rejected",
  "manual-fallback",
] as const;
export type AsterLocalOutcome = (typeof ASTER_LOCAL_OUTCOMES)[number];

export const ASTER_LOCAL_CONFIDENCE_LEVELS = [
  "high",
  "medium",
  "low",
  "not-applicable",
] as const;
export type AsterLocalConfidenceLevel =
  (typeof ASTER_LOCAL_CONFIDENCE_LEVELS)[number];

export const ASTER_CORE_NON_AI_PATH_IDS = [
  "manual-capture",
  "structured-record-recall",
  "permission-review",
  "correction",
  "export",
  "deletion",
  "ordinary-play",
] as const;
export type AsterCoreNonAiPathId =
  (typeof ASTER_CORE_NON_AI_PATH_IDS)[number];

export const ASTER_LOCAL_SOURCE_CLASSES = [
  "synthetic-chronicle-record",
  "public-educational-material",
  "synthetic-confirmed-domain-event",
] as const;
export type AsterLocalSourceClass =
  (typeof ASTER_LOCAL_SOURCE_CLASSES)[number];

export type AsterLocalPayloadValue =
  | string
  | number
  | boolean
  | null
  | readonly string[];

export interface AsterLocalSourceReference {
  readonly sourceClass: AsterLocalSourceClass;
  readonly sourceId: string;
  readonly revision: number;
}

export interface AsterLocalClarification {
  readonly required: boolean;
  readonly question: string | null;
  readonly explicitChoiceRecorded: boolean;
}

export interface AsterLocalSyntheticScenario {
  readonly scenarioId: AsterLocalScenarioId;
  readonly revision: 1;
  readonly role: AsterRole | null;
  readonly operationId: AsterRoleOperationId | null;
  readonly outcome: AsterLocalOutcome;
  readonly confidence: AsterLocalConfidenceLevel;
  readonly directMessage: string;
  readonly payload: Readonly<Record<string, AsterLocalPayloadValue>>;
  readonly sourceReferences: readonly AsterLocalSourceReference[];
  readonly clarification: AsterLocalClarification;
  readonly refusalReason: string | null;
  readonly securityFinding: string | null;
  readonly fallbackId: AsterCoreNonAiPathId | null;
  readonly canPrepareProposal: boolean;
  readonly mustNotReplaceCurrentResult: boolean;
  readonly nonAuthoritative: true;
}

export interface AsterRoleLocalFallback {
  readonly role: AsterRole;
  readonly operationId: AsterRoleOperationId;
  readonly description: string;
  readonly availableWithoutAi: true;
  readonly availableWithoutProvider: true;
  readonly providerIndependent: true;
}

export interface AsterCoreNonAiFallback {
  readonly fallbackId: AsterCoreNonAiPathId;
  readonly owner:
    | "living-chronicle"
    | "house-of-keys"
    | "application-navigation"
    | "gameplay";
  readonly description: string;
  readonly playerVisible: true;
  readonly availableWithoutAi: true;
  readonly availableWithoutProvider: true;
  readonly doesNotBroadenPermission: true;
  readonly cannotBlockCoreRight: true;
}

export interface AsterLocalAdapterRuntimeBoundary {
  readonly deterministic: true;
  readonly syntheticOnly: true;
  readonly providerUsed: false;
  readonly networkUsed: false;
  readonly credentialsUsed: false;
  readonly wallClockUsed: false;
  readonly randomnessUsed: false;
  readonly persistentStorageUsed: false;
}

export interface AsterLocalAdapterAuthorityBoundary {
  readonly canWriteCanonicalRecords: false;
  readonly canCreateOrExpandPermission: false;
  readonly canConfirmProposal: false;
  readonly canInvokeAuthoritativeAction: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
  readonly canAuthorizeProviderUse: false;
}

export interface AsterLocalSyntheticAdapter {
  readonly schemaId: "aster.local.synthetic-adapter";
  readonly contractVersion: AsterContractVersion;
  readonly adapterId: "aster.local.synthetic";
  readonly revision: 1;
  readonly runtime: AsterLocalAdapterRuntimeBoundary;
  readonly authority: AsterLocalAdapterAuthorityBoundary;
  readonly scenarios: readonly AsterLocalSyntheticScenario[];
  readonly roleFallbacks: readonly AsterRoleLocalFallback[];
  readonly coreFallbacks: readonly AsterCoreNonAiFallback[];
}

export interface AsterLocalSyntheticRun {
  readonly schemaId: "aster.local.synthetic-run";
  readonly contractVersion: AsterContractVersion;
  readonly adapterId: "aster.local.synthetic";
  readonly adapterRevision: 1;
  readonly runId: `aster.local.run.${AsterLocalScenarioId}.1`;
  readonly scenario: AsterLocalSyntheticScenario;
  readonly runtime: AsterLocalAdapterRuntimeBoundary;
  readonly authority: AsterLocalAdapterAuthorityBoundary;
}

export const ASTER_LOCAL_ADAPTER_RUNTIME_BOUNDARY = {
  deterministic: true,
  syntheticOnly: true,
  providerUsed: false,
  networkUsed: false,
  credentialsUsed: false,
  wallClockUsed: false,
  randomnessUsed: false,
  persistentStorageUsed: false,
} as const satisfies AsterLocalAdapterRuntimeBoundary;

export const ASTER_LOCAL_ADAPTER_AUTHORITY_BOUNDARY = {
  canWriteCanonicalRecords: false,
  canCreateOrExpandPermission: false,
  canConfirmProposal: false,
  canInvokeAuthoritativeAction: false,
  canCompleteQuest: false,
  canGrantReward: false,
  canAuthorizeProviderUse: false,
} as const satisfies AsterLocalAdapterAuthorityBoundary;

export const ASTER_ROLE_LOCAL_FALLBACKS = ASTER_ROLES.map((role) => ({
  role,
  operationId: ASTER_ROLE_OPERATION_BY_ROLE[role],
  description: ASTER_ROLE_CONTRACTS[role].manualFallback,
  availableWithoutAi: true,
  availableWithoutProvider: true,
  providerIndependent: true,
})) satisfies readonly AsterRoleLocalFallback[];

function coreFallback(
  fallbackId: AsterCoreNonAiPathId,
  owner: AsterCoreNonAiFallback["owner"],
  description: string,
): AsterCoreNonAiFallback {
  return {
    fallbackId,
    owner,
    description,
    playerVisible: true,
    availableWithoutAi: true,
    availableWithoutProvider: true,
    doesNotBroadenPermission: true,
    cannotBlockCoreRight: true,
  };
}

export const ASTER_CORE_NON_AI_FALLBACKS = [
  coreFallback(
    "manual-capture",
    "living-chronicle",
    "Enter and review a structured draft without AI assistance.",
  ),
  coreFallback(
    "structured-record-recall",
    "living-chronicle",
    "Use deterministic structured queries and inspect exact records.",
  ),
  coreFallback(
    "permission-review",
    "house-of-keys",
    "Review current permission facts through the deterministic policy surface.",
  ),
  coreFallback(
    "correction",
    "living-chronicle",
    "Submit a correction through the canonical Chronicle workflow.",
  ),
  coreFallback(
    "export",
    "living-chronicle",
    "Request and inspect export state without AI assistance.",
  ),
  coreFallback(
    "deletion",
    "living-chronicle",
    "Request deletion and inspect lifecycle evidence without AI assistance.",
  ),
  coreFallback(
    "ordinary-play",
    "gameplay",
    "Continue deterministic authored play without optional AI enrichment.",
  ),
] as const satisfies readonly AsterCoreNonAiFallback[];

const NO_CLARIFICATION: AsterLocalClarification = {
  required: false,
  question: null,
  explicitChoiceRecorded: false,
};

type ScenarioInput = Omit<
  AsterLocalSyntheticScenario,
  | "revision"
  | "payload"
  | "sourceReferences"
  | "clarification"
  | "refusalReason"
  | "securityFinding"
  | "fallbackId"
  | "canPrepareProposal"
  | "mustNotReplaceCurrentResult"
  | "nonAuthoritative"
> &
  Partial<
    Pick<
      AsterLocalSyntheticScenario,
      | "payload"
      | "sourceReferences"
      | "clarification"
      | "refusalReason"
      | "securityFinding"
      | "fallbackId"
      | "canPrepareProposal"
      | "mustNotReplaceCurrentResult"
    >
  >;

function scenario(input: ScenarioInput): AsterLocalSyntheticScenario {
  return {
    revision: 1,
    payload: {},
    sourceReferences: [],
    clarification: NO_CLARIFICATION,
    refusalReason: null,
    securityFinding: null,
    fallbackId: null,
    canPrepareProposal: false,
    mustNotReplaceCurrentResult: false,
    nonAuthoritative: true,
    ...input,
  };
}

function source(
  sourceClass: AsterLocalSourceClass,
  sourceId: string,
  revision: number,
): AsterLocalSourceReference {
  return { sourceClass, sourceId, revision };
}

export const ASTER_LOCAL_SYNTHETIC_SCENARIOS = [
  scenario({
    scenarioId: "scribe-structured-draft",
    role: "scribe",
    operationId: "scribe.prepare-structured-capture",
    outcome: "structured-draft",
    confidence: "high",
    directMessage: "A synthetic observation draft is ready for review.",
    payload: {
      variable: "resting-heart-rate",
      value: 62,
      unit: "beats-per-minute",
      occurredOn: "2030-01-02",
      synthetic: true,
    },
    fallbackId: "manual-capture",
    canPrepareProposal: true,
  }),
  scenario({
    scenarioId: "librarian-source-linked-recall",
    role: "librarian",
    operationId: "librarian.prepare-source-linked-recall",
    outcome: "source-linked-recall",
    confidence: "high",
    directMessage: "The synthetic recall is linked to an exact record revision.",
    payload: {
      statement: "The synthetic resting heart rate was 62 beats per minute.",
    },
    sourceReferences: [
      source(
        "synthetic-chronicle-record",
        "record.synthetic.resting-heart-rate",
        2,
      ),
    ],
    fallbackId: "structured-record-recall",
    canPrepareProposal: true,
  }),
  scenario({
    scenarioId: "wayfinder-navigation",
    role: "wayfinder",
    operationId: "wayfinder.propose-product-route",
    outcome: "navigation-proposal",
    confidence: "high",
    directMessage: "A deterministic route to permission review is available.",
    payload: { route: "/house-of-keys/review", requiresPlayerChoice: true },
    fallbackId: "permission-review",
    canPrepareProposal: true,
  }),
  scenario({
    scenarioId: "interpreter-source-aware-explanation",
    role: "interpreter",
    operationId: "interpreter.prepare-source-aware-explanation",
    outcome: "explanation-draft",
    confidence: "medium",
    directMessage:
      "The explanation preserves that the example is synthetic and non-clinical.",
    payload: {
      explanation:
        "This synthetic value is a recorded observation, not a diagnosis.",
      uncertaintyVisible: true,
    },
    sourceReferences: [
      source(
        "synthetic-chronicle-record",
        "record.synthetic.resting-heart-rate",
        2,
      ),
    ],
    fallbackId: "structured-record-recall",
    canPrepareProposal: true,
  }),
  scenario({
    scenarioId: "storykeeper-confirmed-event-presentation",
    role: "storykeeper",
    operationId: "storykeeper.prepare-narrative-presentation",
    outcome: "narrative-presentation-proposal",
    confidence: "not-applicable",
    directMessage:
      "A presentation proposal was created from a synthetic confirmed event.",
    payload: { scene: "The lantern brightens after a confirmed milestone." },
    sourceReferences: [
      source(
        "synthetic-confirmed-domain-event",
        "event.synthetic.milestone-confirmed",
        1,
      ),
    ],
    fallbackId: "ordinary-play",
    canPrepareProposal: true,
  }),
  scenario({
    scenarioId: "unknown-intent",
    role: null,
    operationId: null,
    outcome: "clarification-required",
    confidence: "low",
    directMessage: "The request is not specific enough to choose an action.",
    clarification: {
      required: true,
      question:
        "Are you trying to capture, recall, explain, navigate, or review permission?",
      explicitChoiceRecorded: false,
    },
  }),
  scenario({
    scenarioId: "ambiguous-intent",
    role: null,
    operationId: null,
    outcome: "clarification-required",
    confidence: "low",
    directMessage: "Several consequential actions are plausible.",
    payload: { candidates: ["capture", "correction"] },
    clarification: {
      required: true,
      question: "Should this create a new draft or correct an existing record?",
      explicitChoiceRecorded: false,
    },
  }),
  scenario({
    scenarioId: "clarification-resolved",
    role: "scribe",
    operationId: "scribe.prepare-structured-capture",
    outcome: "structured-draft",
    confidence: "high",
    directMessage: "The explicit player choice resolved the ambiguity.",
    payload: { selectedIntent: "capture", synthetic: true },
    clarification: {
      required: false,
      question: null,
      explicitChoiceRecorded: true,
    },
    fallbackId: "manual-capture",
    canPrepareProposal: true,
  }),
  scenario({
    scenarioId: "low-confidence",
    role: "interpreter",
    operationId: "interpreter.prepare-source-aware-explanation",
    outcome: "clarification-required",
    confidence: "low",
    directMessage:
      "The synthetic evidence is insufficient for a stable explanation.",
    clarification: {
      required: true,
      question: "Which exact record or time range should be explained?",
      explicitChoiceRecorded: false,
    },
    fallbackId: "structured-record-recall",
  }),
  scenario({
    scenarioId: "unsupported-refusal",
    role: null,
    operationId: null,
    outcome: "refused",
    confidence: "not-applicable",
    directMessage: "The requested clinical decision is outside Aster's authority.",
    refusalReason: "diagnosis-or-treatment-request",
  }),
  scenario({
    scenarioId: "prompt-injection",
    role: "scribe",
    operationId: "scribe.prepare-structured-capture",
    outcome: "untrusted-input-contained",
    confidence: "not-applicable",
    directMessage: "Embedded instructions were treated as data and contained.",
    payload: { quarantinedSegmentVisible: true },
    securityFinding: "policy-override-attempt",
    fallbackId: "manual-capture",
  }),
  scenario({
    scenarioId: "timeout",
    role: "librarian",
    operationId: "librarian.prepare-source-linked-recall",
    outcome: "timed-out",
    confidence: "not-applicable",
    directMessage:
      "Optional enrichment timed out; structured recall remains available.",
    fallbackId: "structured-record-recall",
  }),
  scenario({
    scenarioId: "provider-unavailable",
    role: "interpreter",
    operationId: "interpreter.prepare-source-aware-explanation",
    outcome: "provider-unavailable",
    confidence: "not-applicable",
    directMessage:
      "No provider is available; direct source inspection remains available.",
    fallbackId: "structured-record-recall",
  }),
  scenario({
    scenarioId: "stale-work",
    role: "librarian",
    operationId: "librarian.prepare-source-linked-recall",
    outcome: "stale-result-rejected",
    confidence: "not-applicable",
    directMessage:
      "The result was produced from stale source revisions and was rejected.",
    payload: { inputRevision: 1, currentRevision: 2 },
    fallbackId: "structured-record-recall",
    mustNotReplaceCurrentResult: true,
  }),
  scenario({
    scenarioId: "superseded-work",
    role: "interpreter",
    operationId: "interpreter.prepare-source-aware-explanation",
    outcome: "superseded-result-rejected",
    confidence: "not-applicable",
    directMessage: "A newer work revision superseded this synthetic result.",
    payload: { supersededBy: "work.synthetic.interpreter.2" },
    fallbackId: "structured-record-recall",
    mustNotReplaceCurrentResult: true,
  }),
  scenario({
    scenarioId: "manual-capture",
    role: "scribe",
    operationId: "scribe.prepare-structured-capture",
    outcome: "manual-fallback",
    confidence: "not-applicable",
    directMessage: "Manual structured capture remains available without AI.",
    payload: { fallback: "manual structured capture" },
    fallbackId: "manual-capture",
  }),
  scenario({
    scenarioId: "permission-review",
    role: "wayfinder",
    operationId: "wayfinder.propose-product-route",
    outcome: "manual-fallback",
    confidence: "not-applicable",
    directMessage:
      "Deterministic permission review remains available without AI.",
    payload: { route: "/house-of-keys/review" },
    fallbackId: "permission-review",
  }),
] as const satisfies readonly AsterLocalSyntheticScenario[];

export const ASTER_LOCAL_SYNTHETIC_ADAPTER = {
  schemaId: "aster.local.synthetic-adapter",
  contractVersion: ASTER_CONTRACT_VERSION,
  adapterId: "aster.local.synthetic",
  revision: 1,
  runtime: ASTER_LOCAL_ADAPTER_RUNTIME_BOUNDARY,
  authority: ASTER_LOCAL_ADAPTER_AUTHORITY_BOUNDARY,
  scenarios: ASTER_LOCAL_SYNTHETIC_SCENARIOS,
  roleFallbacks: ASTER_ROLE_LOCAL_FALLBACKS,
  coreFallbacks: ASTER_CORE_NON_AI_FALLBACKS,
} as const satisfies AsterLocalSyntheticAdapter;

export function runAsterLocalSyntheticScenario(
  scenarioId: AsterLocalScenarioId,
): AsterLocalSyntheticRun {
  const selected = ASTER_LOCAL_SYNTHETIC_SCENARIOS.find(
    (candidate) => candidate.scenarioId === scenarioId,
  );
  if (!selected) {
    throw new RangeError(`Unknown Aster local synthetic scenario: ${scenarioId}`);
  }
  return {
    schemaId: "aster.local.synthetic-run",
    contractVersion: ASTER_CONTRACT_VERSION,
    adapterId: "aster.local.synthetic",
    adapterRevision: 1,
    runId: `aster.local.run.${scenarioId}.1`,
    scenario: selected,
    runtime: ASTER_LOCAL_ADAPTER_RUNTIME_BOUNDARY,
    authority: ASTER_LOCAL_ADAPTER_AUTHORITY_BOUNDARY,
  };
}
