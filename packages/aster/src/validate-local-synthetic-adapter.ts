import { ASTER_ROLES } from "./authority.js";
import {
  ASTER_CORE_NON_AI_PATH_IDS,
  ASTER_LOCAL_ADAPTER_AUTHORITY_BOUNDARY,
  ASTER_LOCAL_ADAPTER_RUNTIME_BOUNDARY,
  ASTER_LOCAL_OUTCOMES,
  ASTER_LOCAL_SCENARIO_IDS,
  ASTER_LOCAL_SOURCE_CLASSES,
  type AsterLocalSyntheticAdapter,
} from "./local-synthetic-adapter.js";
import { ASTER_ROLE_OPERATION_BY_ROLE } from "./role-contracts.js";
import { ASTER_CONTRACT_VERSION } from "./version.js";

export const ASTER_LOCAL_ADAPTER_VALIDATION_ISSUE_CODES = [
  "aster.local.invalid-adapter",
  "aster.local.contract-version-mismatch",
  "aster.local.invalid-runtime-boundary",
  "aster.local.synthetic-boundary-violation",
  "aster.local.authority-escalation",
  "aster.local.missing-scenario",
  "aster.local.duplicate-scenario",
  "aster.local.unknown-scenario",
  "aster.local.role-operation-mismatch",
  "aster.local.invalid-outcome",
  "aster.local.source-evidence-missing",
  "aster.local.unsafe-clarification",
  "aster.local.unsafe-refusal",
  "aster.local.prompt-injection-not-contained",
  "aster.local.missing-fallback",
  "aster.local.stale-or-superseded-overwrite",
  "aster.local.incomplete-role-coverage",
  "aster.local.incomplete-core-fallback",
  "aster.local.fallback-blocks-core",
] as const;

export type AsterLocalAdapterValidationIssueCode =
  (typeof ASTER_LOCAL_ADAPTER_VALIDATION_ISSUE_CODES)[number];

export interface AsterLocalAdapterValidationIssue {
  readonly code: AsterLocalAdapterValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

export interface AsterLocalAdapterValidationResult {
  readonly ok: boolean;
  readonly issues: readonly AsterLocalAdapterValidationIssue[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function includesString<const T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value as T[number]);
}

function addIssue(
  issues: AsterLocalAdapterValidationIssue[],
  code: AsterLocalAdapterValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function falseBoundaryMatches(
  value: unknown,
  expected: Readonly<Record<string, false>>,
): boolean {
  if (!isRecord(value)) return false;
  return Object.keys(expected).every((key) => value[key] === false);
}

export function validateAsterLocalSyntheticAdapter(
  value: unknown,
): AsterLocalAdapterValidationResult {
  const issues: AsterLocalAdapterValidationIssue[] = [];

  if (!isRecord(value)) {
    addIssue(
      issues,
      "aster.local.invalid-adapter",
      "$",
      "The local synthetic adapter must be an object.",
    );
    return { ok: false, issues };
  }

  if (value.contractVersion !== ASTER_CONTRACT_VERSION) {
    addIssue(
      issues,
      "aster.local.contract-version-mismatch",
      "$.contractVersion",
      "The adapter contract version must match the Aster contract version.",
    );
  }

  const runtime = value.runtime;
  if (!isRecord(runtime)) {
    addIssue(
      issues,
      "aster.local.invalid-runtime-boundary",
      "$.runtime",
      "The adapter must declare its deterministic runtime boundary.",
    );
  } else {
    for (const [key, expected] of Object.entries(
      ASTER_LOCAL_ADAPTER_RUNTIME_BOUNDARY,
    )) {
      if (runtime[key] !== expected) {
        addIssue(
          issues,
          key === "syntheticOnly"
            ? "aster.local.synthetic-boundary-violation"
            : "aster.local.invalid-runtime-boundary",
          `$.runtime.${key}`,
          "The local adapter cannot use providers, networks, credentials, wall clocks, randomness, or persistence.",
        );
      }
    }
  }

  if (
    !falseBoundaryMatches(
      value.authority,
      ASTER_LOCAL_ADAPTER_AUTHORITY_BOUNDARY,
    )
  ) {
    addIssue(
      issues,
      "aster.local.authority-escalation",
      "$.authority",
      "The local adapter cannot acquire domain, permission, progression, reward, or provider authority.",
    );
  }

  const scenarios = Array.isArray(value.scenarios) ? value.scenarios : [];
  const scenarioIds = new Set<string>();
  const coveredRoles = new Set<string>();

  for (const [index, scenarioValue] of scenarios.entries()) {
    const path = `$.scenarios[${index}]`;
    if (!isRecord(scenarioValue)) {
      addIssue(
        issues,
        "aster.local.invalid-adapter",
        path,
        "Every local scenario must be an object.",
      );
      continue;
    }

    const scenarioId = scenarioValue.scenarioId;
    if (!includesString(ASTER_LOCAL_SCENARIO_IDS, scenarioId)) {
      addIssue(
        issues,
        "aster.local.unknown-scenario",
        `${path}.scenarioId`,
        "The adapter contains an unknown scenario identifier.",
      );
    } else if (scenarioIds.has(scenarioId)) {
      addIssue(
        issues,
        "aster.local.duplicate-scenario",
        `${path}.scenarioId`,
        "Every required scenario must appear exactly once.",
      );
    } else {
      scenarioIds.add(scenarioId);
    }

    const role = scenarioValue.role;
    const operationId = scenarioValue.operationId;
    if (role !== null) {
      if (!includesString(ASTER_ROLES, role)) {
        addIssue(
          issues,
          "aster.local.role-operation-mismatch",
          `${path}.role`,
          "Scenario roles must use the public Aster role taxonomy.",
        );
      } else {
        coveredRoles.add(role);
        if (operationId !== ASTER_ROLE_OPERATION_BY_ROLE[role]) {
          addIssue(
            issues,
            "aster.local.role-operation-mismatch",
            `${path}.operationId`,
            "Scenario operations must match their public role contracts.",
          );
        }
      }
    } else if (operationId !== null) {
      addIssue(
        issues,
        "aster.local.role-operation-mismatch",
        `${path}.operationId`,
        "Unbound intent and refusal scenarios cannot claim a role operation.",
      );
    }

    if (!includesString(ASTER_LOCAL_OUTCOMES, scenarioValue.outcome)) {
      addIssue(
        issues,
        "aster.local.invalid-outcome",
        `${path}.outcome`,
        "The scenario outcome must use the public local outcome taxonomy.",
      );
    }

    const sourceReferences = Array.isArray(scenarioValue.sourceReferences)
      ? scenarioValue.sourceReferences
      : [];
    if (
      [
        "librarian-source-linked-recall",
        "interpreter-source-aware-explanation",
        "storykeeper-confirmed-event-presentation",
      ].includes(String(scenarioId)) &&
      !sourceReferences.some(
        (reference) =>
          isRecord(reference) &&
          includesString(ASTER_LOCAL_SOURCE_CLASSES, reference.sourceClass) &&
          isNonEmptyString(reference.sourceId) &&
          typeof reference.revision === "number" &&
          reference.revision > 0,
      )
    ) {
      addIssue(
        issues,
        "aster.local.source-evidence-missing",
        `${path}.sourceReferences`,
        "Source-linked local scenarios require an exact synthetic source revision.",
      );
    }

    const outcome = scenarioValue.outcome;
    const clarification = scenarioValue.clarification;
    if (outcome === "clarification-required") {
      if (
        !isRecord(clarification) ||
        clarification.required !== true ||
        !isNonEmptyString(clarification.question) ||
        scenarioValue.canPrepareProposal !== false
      ) {
        addIssue(
          issues,
          "aster.local.unsafe-clarification",
          `${path}.clarification`,
          "Unknown, ambiguous, and low-confidence scenarios must ask directly and cannot prepare a proposal.",
        );
      }
    }

    if (
      outcome === "refused" &&
      (!isNonEmptyString(scenarioValue.refusalReason) ||
        scenarioValue.canPrepareProposal !== false)
    ) {
      addIssue(
        issues,
        "aster.local.unsafe-refusal",
        path,
        "A refusal requires an inspectable reason and cannot prepare a proposal.",
      );
    }

    if (
      scenarioId === "prompt-injection" &&
      (outcome !== "untrusted-input-contained" ||
        !isNonEmptyString(scenarioValue.securityFinding) ||
        scenarioValue.canPrepareProposal !== false)
    ) {
      addIssue(
        issues,
        "aster.local.prompt-injection-not-contained",
        path,
        "Prompt injection must remain data-only, contained, and unable to prepare a proposal.",
      );
    }

    if (
      [
        "prompt-injection",
        "timeout",
        "provider-unavailable",
        "stale-work",
        "superseded-work",
        "manual-capture",
        "permission-review",
      ].includes(String(scenarioId)) &&
      !includesString(ASTER_CORE_NON_AI_PATH_IDS, scenarioValue.fallbackId)
    ) {
      addIssue(
        issues,
        "aster.local.missing-fallback",
        `${path}.fallbackId`,
        "Failure and degraded scenarios require a complete non-AI fallback.",
      );
    }

    if (
      ["stale-work", "superseded-work"].includes(String(scenarioId)) &&
      (scenarioValue.mustNotReplaceCurrentResult !== true ||
        scenarioValue.canPrepareProposal !== false)
    ) {
      addIssue(
        issues,
        "aster.local.stale-or-superseded-overwrite",
        path,
        "Stale and superseded results cannot replace current work or prepare proposals.",
      );
    }

    if (scenarioValue.nonAuthoritative !== true) {
      addIssue(
        issues,
        "aster.local.authority-escalation",
        `${path}.nonAuthoritative`,
        "Every local scenario must remain explicitly non-authoritative.",
      );
    }
  }

  for (const scenarioId of ASTER_LOCAL_SCENARIO_IDS) {
    if (!scenarioIds.has(scenarioId)) {
      addIssue(
        issues,
        "aster.local.missing-scenario",
        "$.scenarios",
        `The local adapter must include ${scenarioId}.`,
      );
    }
  }

  for (const role of ASTER_ROLES) {
    if (!coveredRoles.has(role)) {
      addIssue(
        issues,
        "aster.local.incomplete-role-coverage",
        "$.scenarios",
        `The local adapter must exercise the ${role} role.`,
      );
    }
  }

  const roleFallbacks = Array.isArray(value.roleFallbacks)
    ? value.roleFallbacks
    : [];
  for (const role of ASTER_ROLES) {
    const fallback = roleFallbacks.find(
      (candidate) => isRecord(candidate) && candidate.role === role,
    );
    if (
      !isRecord(fallback) ||
      fallback.operationId !== ASTER_ROLE_OPERATION_BY_ROLE[role] ||
      !isNonEmptyString(fallback.description) ||
      fallback.availableWithoutAi !== true ||
      fallback.availableWithoutProvider !== true ||
      fallback.providerIndependent !== true
    ) {
      addIssue(
        issues,
        "aster.local.incomplete-role-coverage",
        "$.roleFallbacks",
        `The ${role} role requires a provider-independent local fallback.`,
      );
    }
  }

  const coreFallbacks = Array.isArray(value.coreFallbacks)
    ? value.coreFallbacks
    : [];
  for (const fallbackId of ASTER_CORE_NON_AI_PATH_IDS) {
    const fallback = coreFallbacks.find(
      (candidate) =>
        isRecord(candidate) && candidate.fallbackId === fallbackId,
    );
    if (!isRecord(fallback)) {
      addIssue(
        issues,
        "aster.local.incomplete-core-fallback",
        "$.coreFallbacks",
        `The non-AI fallback matrix must include ${fallbackId}.`,
      );
    } else if (
      fallback.playerVisible !== true ||
      fallback.availableWithoutAi !== true ||
      fallback.availableWithoutProvider !== true ||
      fallback.doesNotBroadenPermission !== true ||
      fallback.cannotBlockCoreRight !== true
    ) {
      addIssue(
        issues,
        "aster.local.fallback-blocks-core",
        "$.coreFallbacks",
        `The ${fallbackId} path must remain visible, non-blocking, and permission-neutral.`,
      );
    }
  }

  return { ok: issues.length === 0, issues };
}

export function isAsterLocalSyntheticAdapter(
  value: unknown,
): value is AsterLocalSyntheticAdapter {
  return validateAsterLocalSyntheticAdapter(value).ok;
}
