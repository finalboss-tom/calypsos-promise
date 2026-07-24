import {
  CONTENT_SCHEMA_VERSION,
  type CalypsoContent,
  type ValidationIssue,
  type ValidationResult,
} from "./types.js";

const CONTENT_ID_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
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

export function validateContent(input: unknown): ValidationResult<CalypsoContent> {
  const issues: ValidationIssue[] = [];

  if (!isRecord(input)) {
    return { ok: false, issues: [{ path: "$", message: "Content must be an object." }] };
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
    issues.push({ path: "revision", message: "Revision must be a positive integer." });
  }

  validateAuthorship(input.authorship, issues);

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
    validateReviewApprovals(input, issues);
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
    issues.push({ path: "authorship", message: "authorship must be an object." });
    return;
  }
  requireString(value, "mode", issues, "authorship.");
  requireStringArray(value, "humanContributors", issues, "authorship.");
}

function validateReviewApprovals(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  const requirements = input.reviewRequirements;
  const approvals = input.reviewApprovals;
  if (!Array.isArray(approvals)) {
    issues.push({ path: "reviewApprovals", message: "Approved content requires review approvals." });
    return;
  }
  if (!Array.isArray(requirements)) return;

  const approvedDomains = new Set(
    approvals
      .filter(isRecord)
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

function validateScene(input: Record<string, unknown>, issues: ValidationIssue[]): void {
  const choices = input.choices;
  if (!Array.isArray(choices)) {
    issues.push({ path: "choices", message: "Scene choices must be an array." });
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

function validateQuest(input: Record<string, unknown>, issues: ValidationIssue[]): void {
  requireString(input, "playerValue", issues);
  requireString(input, "objective", issues);
  requireString(input, "refusalPath", issues);
  requireString(input, "deferralPath", issues);
  requireStringArray(input, "requirements", issues);

  if (input.canDecline !== true) {
    issues.push({ path: "canDecline", message: "Quests must permit decline." });
  }
  if (input.canDefer !== true) {
    issues.push({ path: "canDefer", message: "Quests must permit deferral." });
  }

  if (!isRecord(input.completionRule)) {
    issues.push({
      path: "completionRule",
      message: "Quests require a structured deterministic completion rule.",
    });
  }

  const rewards = input.rewards;
  if (!Array.isArray(rewards)) {
    issues.push({ path: "rewards", message: "Quest rewards must be an array." });
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
    if (
      reward.type === "progress" &&
      (!Number.isFinite(reward.amount) || Number(reward.amount) <= 0)
    ) {
      issues.push({
        path: `rewards.${index}.amount`,
        message: "Progress rewards require a positive amount.",
      });
    }
  });
}

function validateNotification(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  if (input.shameFree !== true) {
    issues.push({ path: "shameFree", message: "Notifications must be shame-free." });
  }
  requireString(input, "pressureFreeAlternative", issues);
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
    issues.push({ path: `${prefix}${key}`, message: `${prefix}${key} must be a non-empty string.` });
  }
}

function requireStringArray(
  value: Record<string, unknown>,
  key: string,
  issues: ValidationIssue[],
  prefix = "",
): void {
  const candidate = value[key];
  if (!Array.isArray(candidate) || candidate.some((item) => typeof item !== "string")) {
    issues.push({
      path: `${prefix}${key}`,
      message: `${prefix}${key} must be an array of strings.`,
    });
  }
}
