import {
  CONTENT_SCHEMA_VERSION,
  type CalypsoContent,
  type ValidationIssue,
  type ValidationResult,
} from "./types.js";

const CONTENT_ID_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
const ALLOWED_KINDS = new Set([
  "character",
  "zone",
  "scene",
  "dialogue",
  "quest",
  "lesson",
  "notification",
]);
const ALLOWED_REVIEW_STATES = new Set([
  "draft",
  "editorial-review",
  "specialist-review",
  "approved",
  "retired",
]);
const ALLOWED_CAPABILITY_STATUSES = new Set([
  "live",
  "experimental",
  "planned",
  "long-horizon",
  "deferred",
]);
const ALLOWED_CONNECTED_LOOPS = new Set([
  "build-chronicle",
  "improve-understanding",
  "control-and-share-value",
]);
const ALLOWED_PROGRESS_DIMENSIONS = new Set([
  "vitality",
  "chronicle",
  "fellowship",
  "renown",
]);
const ALLOWED_REWARD_TYPES = new Set([
  "progress",
  "laurel",
  "restoration",
  "story-unlock",
  "clue",
]);
const RETIRED_LANGUAGE = [
  "trojan horse",
  "indoctrination",
  "ai doctor",
  "guaranteed data value",
] as const;

export function validateContent(
  input: unknown,
): ValidationResult<CalypsoContent> {
  const issues: ValidationIssue[] = [];

  if (!isRecord(input)) {
    return {
      ok: false,
      issues: [{ path: "$", message: "Content must be an object." }],
    };
  }

  requireString(input, "id", issues);
  requireString(input, "kind", issues);
  requireString(input, "title", issues);
  requireString(input, "summary", issues);
  requireString(input, "locale", issues);
  requireString(input, "owner", issues);
  requireStringArray(input, "tags", issues);
  requireStringArray(input, "canonReferences", issues);
  requireStringArray(input, "dependencies", issues);
  requireStringArray(input, "reviewRequirements", issues);
  requireArray(input, "reviewApprovals", issues);

  if (typeof input.id === "string" && !CONTENT_ID_PATTERN.test(input.id)) {
    issues.push({
      path: "id",
      message: "Use a lowercase namespaced identifier with dots or hyphens.",
    });
  }

  if (input.schemaVersion !== CONTENT_SCHEMA_VERSION) {
    issues.push({
      path: "schemaVersion",
      message: `Expected schema version ${CONTENT_SCHEMA_VERSION}.`,
    });
  }

  if (!Number.isInteger(input.revision) || Number(input.revision) < 1) {
    issues.push({
      path: "revision",
      message: "Revision must be a positive integer.",
    });
  }

  validateAllowedValue(input, "kind", ALLOWED_KINDS, issues);
  validateAllowedValue(input, "reviewState", ALLOWED_REVIEW_STATES, issues);
  validateAllowedValue(
    input,
    "capabilityStatus",
    ALLOWED_CAPABILITY_STATUSES,
    issues,
  );
  validateAuthorship(input.authorship, issues);
  validateApprovalRecords(input.reviewApprovals, issues);

  const serialized = JSON.stringify(input).toLowerCase();
  if (input.historicalContext !== true && input.reviewState !== "retired") {
    for (const phrase of RETIRED_LANGUAGE) {
      if (serialized.includes(phrase)) {
        issues.push({
          path: "$",
          message: `Retired language is not permitted: ${phrase}.`,
        });
      }
    }
  }

  if (input.reviewState === "approved") {
    validateReviewCompleteness(input, issues);
  }

  if (input.kind === "scene") validateScene(input, issues);
  if (input.kind === "quest") validateQuest(input, issues);
  if (input.kind === "notification") validateNotification(input, issues);

  return issues.length === 0
    ? { ok: true, value: input as unknown as CalypsoContent, issues }
    : { ok: false, issues };
}

function validateAuthorship(value: unknown, issues: ValidationIssue[]): void {
  if (!isRecord(value)) {
    issues.push({
      path: "authorship",
      message: "authorship must be an object.",
    });
    return;
  }

  if (
    !["human-authored", "ai-assisted-reviewed"].includes(String(value.mode))
  ) {
    issues.push({
      path: "authorship.mode",
      message:
        "authorship.mode must be human-authored or ai-assisted-reviewed.",
    });
  }
  requireStringArray(value, "humanContributors", issues, "authorship.");
  if (
    Array.isArray(value.humanContributors) &&
    value.humanContributors.length === 0
  ) {
    issues.push({
      path: "authorship.humanContributors",
      message: "At least one responsible human contributor is required.",
    });
  }
}

function validateApprovalRecords(
  value: unknown,
  issues: ValidationIssue[],
): void {
  if (!Array.isArray(value)) return;

  value.forEach((approval, index) => {
    if (!isRecord(approval)) {
      issues.push({
        path: `reviewApprovals.${index}`,
        message: "Review approval must be an object.",
      });
      return;
    }
    requireString(approval, "domain", issues, `reviewApprovals.${index}.`);
    requireString(approval, "reviewer", issues, `reviewApprovals.${index}.`);
    requireString(approval, "reviewedAt", issues, `reviewApprovals.${index}.`);
  });
}

function validateReviewCompleteness(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  const requirements = input.reviewRequirements;
  const approvals = input.reviewApprovals;
  if (!Array.isArray(approvals)) {
    issues.push({
      path: "reviewApprovals",
      message: "Approved content requires review approvals.",
    });
    return;
  }
  if (!Array.isArray(requirements)) return;

  const approvedDomains = new Set(
    approvals
      .filter(isRecord)
      .filter(
        (approval) =>
          typeof approval.reviewer === "string" &&
          approval.reviewer.trim() !== "" &&
          typeof approval.reviewedAt === "string" &&
          approval.reviewedAt.trim() !== "",
      )
      .map((approval) => approval.domain)
      .filter((domain): domain is string => typeof domain === "string"),
  );

  for (const domain of requirements) {
    if (typeof domain === "string" && !approvedDomains.has(domain)) {
      issues.push({
        path: "reviewApprovals",
        message: `Missing named approval for required review domain ${domain}.`,
      });
    }
  }
}

function validateScene(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  const choices = input.choices;
  if (!Array.isArray(choices)) {
    issues.push({
      path: "choices",
      message: "Scene choices must be an array.",
    });
    return;
  }

  const hasAgencyPath = choices.some(
    (choice) =>
      isRecord(choice) &&
      ["defer", "refuse", "exit"].includes(String(choice.disposition)),
  );
  if (!hasAgencyPath) {
    issues.push({
      path: "choices",
      message: "Scenes with choices need a defer, refusal, or exit route.",
    });
  }
}

function validateQuest(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  requireString(input, "playerValue", issues);
  requireString(input, "objective", issues);
  requireString(input, "refusalPath", issues);
  requireString(input, "deferralPath", issues);
  requireArray(input, "requirements", issues);

  validateAllowedValue(input, "connectedLoop", ALLOWED_CONNECTED_LOOPS, issues);
  validateAllowedValue(
    input,
    "progressDimension",
    ALLOWED_PROGRESS_DIMENSIONS,
    issues,
  );

  if (input.canDecline !== true) {
    issues.push({ path: "canDecline", message: "Quests must permit decline." });
  }
  if (input.canDefer !== true) {
    issues.push({ path: "canDefer", message: "Quests must permit deferral." });
  }

  const requirements = input.requirements;
  const requirementIds = new Set<string>();
  if (Array.isArray(requirements)) {
    requirements.forEach((requirement, index) => {
      if (!isRecord(requirement)) {
        issues.push({
          path: `requirements.${index}`,
          message: "Quest requirement must be an object.",
        });
        return;
      }
      requireString(requirement, "id", issues, `requirements.${index}.`);
      requireString(requirement, "type", issues, `requirements.${index}.`);
      requireString(
        requirement,
        "description",
        issues,
        `requirements.${index}.`,
      );
      if (typeof requirement.id === "string") {
        requirementIds.add(requirement.id);
      }
    });
  }

  const completionRule = input.completionRule;
  if (!isRecord(completionRule)) {
    issues.push({
      path: "completionRule",
      message: "Quests require a structured deterministic completion rule.",
    });
  } else {
    if (!["all", "any"].includes(String(completionRule.mode))) {
      issues.push({
        path: "completionRule.mode",
        message: "Completion mode must be all or any.",
      });
    }
    const completionRequirementIds = completionRule.requirementIds;
    if (!Array.isArray(completionRequirementIds)) {
      issues.push({
        path: "completionRule.requirementIds",
        message: "Completion rule requires an array of requirement IDs.",
      });
    } else {
      for (const requirementId of completionRequirementIds) {
        if (
          typeof requirementId !== "string" ||
          !requirementIds.has(requirementId)
        ) {
          issues.push({
            path: "completionRule.requirementIds",
            message: `Unknown completion requirement ${String(requirementId)}.`,
          });
        }
      }
    }
  }

  const rewards = input.rewards;
  if (!Array.isArray(rewards)) {
    issues.push({
      path: "rewards",
      message: "Quest rewards must be an array.",
    });
    return;
  }

  rewards.forEach((reward, index) => {
    if (!isRecord(reward) || !ALLOWED_REWARD_TYPES.has(String(reward.type))) {
      issues.push({
        path: `rewards.${index}.type`,
        message: "Quest reward type is not allowed by the incentive model.",
      });
      return;
    }

    if (reward.type === "progress") {
      if (!ALLOWED_PROGRESS_DIMENSIONS.has(String(reward.dimension))) {
        issues.push({
          path: `rewards.${index}.dimension`,
          message: "Progress reward dimension is not allowed.",
        });
      }
      if (!Number.isFinite(reward.amount) || Number(reward.amount) <= 0) {
        issues.push({
          path: `rewards.${index}.amount`,
          message: "Progress rewards require a positive amount.",
        });
      }
    }
  });
}

function validateNotification(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  if (input.shameFree !== true) {
    issues.push({
      path: "shameFree",
      message: "Notifications must be shame-free.",
    });
  }
  requireString(input, "pressureFreeAlternative", issues);
}

function validateAllowedValue(
  input: Record<string, unknown>,
  key: string,
  allowed: Set<string>,
  issues: ValidationIssue[],
): void {
  if (!allowed.has(String(input[key]))) {
    issues.push({
      path: key,
      message: `${key} has an unsupported value.`,
    });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(
  value: Record<string, unknown>,
  key: string,
  issues: ValidationIssue[],
  prefix = "",
): void {
  if (typeof value[key] !== "string" || value[key].trim() === "") {
    issues.push({
      path: `${prefix}${key}`,
      message: `${prefix}${key} must be a non-empty string.`,
    });
  }
}

function requireStringArray(
  value: Record<string, unknown>,
  key: string,
  issues: ValidationIssue[],
  prefix = "",
): void {
  const candidate = value[key];
  if (
    !Array.isArray(candidate) ||
    candidate.some((item) => typeof item !== "string")
  ) {
    issues.push({
      path: `${prefix}${key}`,
      message: `${prefix}${key} must be an array of strings.`,
    });
  }
}

function requireArray(
  value: Record<string, unknown>,
  key: string,
  issues: ValidationIssue[],
): void {
  if (!Array.isArray(value[key])) {
    issues.push({ path: key, message: `${key} must be an array.` });
  }
}
