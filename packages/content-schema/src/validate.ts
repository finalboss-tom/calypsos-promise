import {
  CONTENT_SCHEMA_VERSION,
  type CalypsoContent,
  type ValidationIssue,
  type ValidationResult,
} from "./types.js";

const ID_PATTERN =
  /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$/;
const CANON_PATTERN =
  /^canon\.[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)*$/;
const KINDS = new Set([
  "character",
  "zone",
  "scene",
  "dialogue",
  "quest",
  "lesson",
  "notification",
]);
const REVIEW_STATES = new Set([
  "draft",
  "editorial-review",
  "specialist-review",
  "approved",
  "retired",
]);
const CAPABILITY_STATUSES = new Set([
  "live",
  "experimental",
  "planned",
  "long-horizon",
  "deferred",
]);
const REVIEW_DOMAINS = new Set([
  "editorial",
  "canon",
  "privacy",
  "safety",
  "clinical",
  "accessibility",
  "security",
  "research-governance",
  "economic-claims",
]);
const LOOPS = new Set([
  "build-chronicle",
  "improve-understanding",
  "control-and-share-value",
]);
const DIMENSIONS = new Set(["vitality", "chronicle", "fellowship", "renown"]);
const REQUIREMENT_TYPES = new Set([
  "player-confirmation",
  "chronicle-record",
  "learning-completion",
  "permission-review",
  "scene-completion",
  "manual-action",
]);
const REWARD_TYPES = new Set([
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

  for (const key of [
    "id",
    "kind",
    "title",
    "summary",
    "locale",
    "owner",
    "createdAt",
    "updatedAt",
  ]) {
    requireString(input, key, issues);
  }
  for (const key of [
    "tags",
    "canonReferences",
    "dependencies",
    "reviewRequirements",
  ]) {
    requireStringArray(input, key, issues);
  }
  requireArray(input, "reviewApprovals", issues);

  validateId(input.id, "id", issues);
  validateIdArray(input.dependencies, "dependencies", issues);
  validatePatternArray(
    input.canonReferences,
    "canonReferences",
    CANON_PATTERN,
    "Canon references must begin with canon. and use dotted namespaces.",
    issues,
  );
  validateAllowed(input.kind, "kind", KINDS, issues);
  validateAllowed(input.reviewState, "reviewState", REVIEW_STATES, issues);
  validateAllowed(
    input.capabilityStatus,
    "capabilityStatus",
    CAPABILITY_STATUSES,
    issues,
  );
  validateAllowedArray(
    input.reviewRequirements,
    "reviewRequirements",
    REVIEW_DOMAINS,
    issues,
  );

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
  validateApprovals(input, issues);
  validateOptionalMetadata(input, issues);

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
  validateAllowed(
    value.mode,
    "authorship.mode",
    new Set(["human-authored", "ai-assisted-reviewed"]),
    issues,
  );
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
  if (value.aiTools !== undefined) {
    requireStringArray(value, "aiTools", issues, "authorship.");
  }
  if (
    value.mode === "ai-assisted-reviewed" &&
    (!Array.isArray(value.aiTools) || value.aiTools.length === 0)
  ) {
    issues.push({
      path: "authorship.aiTools",
      message: "AI-assisted content must identify a material AI tool.",
    });
  }
}

function validateApprovals(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  const approvals = input.reviewApprovals;
  if (!Array.isArray(approvals)) return;

  const completeDomains = new Set<string>();
  approvals.forEach((approval, index) => {
    if (!isRecord(approval)) {
      issues.push({
        path: `reviewApprovals.${index}`,
        message: "Review approval must be an object.",
      });
      return;
    }
    const prefix = `reviewApprovals.${index}.`;
    requireString(approval, "domain", issues, prefix);
    requireString(approval, "reviewer", issues, prefix);
    requireString(approval, "reviewedAt", issues, prefix);
    validateAllowed(
      approval.domain,
      `${prefix}domain`,
      REVIEW_DOMAINS,
      issues,
    );
    if (
      typeof approval.domain === "string" &&
      typeof approval.reviewer === "string" &&
      approval.reviewer.trim() !== "" &&
      typeof approval.reviewedAt === "string" &&
      approval.reviewedAt.trim() !== ""
    ) {
      completeDomains.add(approval.domain);
    }
  });

  const requirements = input.reviewRequirements;
  if (input.reviewState !== "approved" || !Array.isArray(requirements)) return;
  for (const domain of requirements) {
    if (typeof domain === "string" && !completeDomains.has(domain)) {
      issues.push({
        path: "reviewApprovals",
        message: `Missing named approval for required review domain ${domain}.`,
      });
    }
  }
}

function validateOptionalMetadata(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  for (const key of ["supersedes", "replacedBy"]) {
    if (input[key] !== undefined) validateId(input[key], key, issues);
  }
  if (input.spoilerGate === undefined) return;
  if (!isRecord(input.spoilerGate)) {
    issues.push({ path: "spoilerGate", message: "spoilerGate must be an object." });
    return;
  }
  const gate = input.spoilerGate;
  if (gate.requiredClueIds !== undefined) {
    requireStringArray(gate, "requiredClueIds", issues, "spoilerGate.");
    validateIdArray(gate.requiredClueIds, "spoilerGate.requiredClueIds", issues);
  }
  if (gate.requiredContentIds !== undefined) {
    requireStringArray(gate, "requiredContentIds", issues, "spoilerGate.");
    validateIdArray(
      gate.requiredContentIds,
      "spoilerGate.requiredContentIds",
      issues,
    );
  }
}

function validateScene(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  requireString(input, "zoneId", issues);
  validateId(input.zoneId, "zoneId", issues);
  for (const key of [
    "speakerIds",
    "dialogueIds",
    "prerequisiteStateIds",
    "grantsStateIds",
  ]) {
    requireStringArray(input, key, issues);
    validateIdArray(input[key], key, issues);
  }

  const choices = input.choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    issues.push({ path: "choices", message: "Scene choices must be a non-empty array." });
    return;
  }

  let hasAgencyPath = false;
  choices.forEach((choice, index) => {
    if (!isRecord(choice)) {
      issues.push({ path: `choices.${index}`, message: "Scene choice must be an object." });
      return;
    }
    const prefix = `choices.${index}.`;
    requireString(choice, "id", issues, prefix);
    validateId(choice.id, `${prefix}id`, issues);
    requireString(choice, "label", issues, prefix);
    requireString(choice, "consequenceText", issues, prefix);
    validateAllowed(
      choice.disposition,
      `${prefix}disposition`,
      new Set(["continue", "defer", "refuse", "exit"]),
      issues,
    );
    if (["defer", "refuse", "exit"].includes(String(choice.disposition))) {
      hasAgencyPath = true;
    }
    if (choice.nextSceneId !== undefined) {
      validateId(choice.nextSceneId, `${prefix}nextSceneId`, issues);
    }
    if (choice.actionId !== undefined) {
      validateId(choice.actionId, `${prefix}actionId`, issues);
    }
    if (
      choice.disposition === "continue" &&
      choice.nextSceneId === undefined &&
      choice.actionId === undefined
    ) {
      issues.push({
        path: `choices.${index}`,
        message: "Continue choices require a nextSceneId or actionId.",
      });
    }
  });

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
  for (const key of [
    "publicTitle",
    "inWorldTitle",
    "zoneId",
    "guideCharacterId",
    "playerValue",
    "objective",
    "feedback",
    "narrativeConsequence",
    "deferralPath",
    "refusalPath",
    "analyticsHypothesis",
  ]) {
    requireString(input, key, issues);
  }
  validateId(input.zoneId, "zoneId", issues);
  validateId(input.guideCharacterId, "guideCharacterId", issues);
  validateAllowed(input.connectedLoop, "connectedLoop", LOOPS, issues);
  validateAllowed(
    input.progressDimension,
    "progressDimension",
    DIMENSIONS,
    issues,
  );
  validateAllowed(
    input.safetyClassification,
    "safetyClassification",
    new Set(["general", "sensitive", "specialist-review-required"]),
    issues,
  );
  if (input.canDecline !== true) {
    issues.push({ path: "canDecline", message: "Quests must permit decline." });
  }
  if (input.canDefer !== true) {
    issues.push({ path: "canDefer", message: "Quests must permit deferral." });
  }
  if (!Number.isFinite(input.estimatedMinutes) || Number(input.estimatedMinutes) <= 0) {
    issues.push({ path: "estimatedMinutes", message: "estimatedMinutes must be positive." });
  }
  requireArray(input, "accessibilityVariants", issues);
  requireStringArray(input, "dataCategories", issues);
  requireStringArray(input, "permissionPurposeIds", issues);
  validateIdArray(input.permissionPurposeIds, "permissionPurposeIds", issues);

  const requirementIds = validateRequirements(input.requirements, issues);
  validateCompletionRule(input.completionRule, requirementIds, issues);
  validateRewards(input.rewards, issues);
}

function validateRequirements(
  value: unknown,
  issues: ValidationIssue[],
): Set<string> {
  const ids = new Set<string>();
  if (!Array.isArray(value) || value.length === 0) {
    issues.push({
      path: "requirements",
      message: "Quest requirements must be a non-empty array.",
    });
    return ids;
  }
  value.forEach((requirement, index) => {
    if (!isRecord(requirement)) {
      issues.push({
        path: `requirements.${index}`,
        message: "Quest requirement must be an object.",
      });
      return;
    }
    const prefix = `requirements.${index}.`;
    requireString(requirement, "id", issues, prefix);
    validateId(requirement.id, `${prefix}id`, issues);
    requireString(requirement, "description", issues, prefix);
    validateAllowed(
      requirement.type,
      `${prefix}type`,
      REQUIREMENT_TYPES,
      issues,
    );
    if (!isRecord(requirement.parameters)) {
      issues.push({
        path: `${prefix}parameters`,
        message: "Quest requirement parameters must be an object.",
      });
    }
    if (typeof requirement.id === "string") {
      if (ids.has(requirement.id)) {
        issues.push({
          path: `${prefix}id`,
          message: `Duplicate quest requirement ID ${requirement.id}.`,
        });
      }
      ids.add(requirement.id);
    }
  });
  return ids;
}

function validateCompletionRule(
  value: unknown,
  requirementIds: Set<string>,
  issues: ValidationIssue[],
): void {
  if (!isRecord(value)) {
    issues.push({
      path: "completionRule",
      message: "Quests require a structured deterministic completion rule.",
    });
    return;
  }
  validateAllowed(
    value.mode,
    "completionRule.mode",
    new Set(["all", "any"]),
    issues,
  );
  if (!Array.isArray(value.requirementIds) || value.requirementIds.length === 0) {
    issues.push({
      path: "completionRule.requirementIds",
      message: "Completion rule requires at least one requirement ID.",
    });
    return;
  }
  for (const requirementId of value.requirementIds) {
    validateId(requirementId, "completionRule.requirementIds", issues);
    if (typeof requirementId === "string" && !requirementIds.has(requirementId)) {
      issues.push({
        path: "completionRule.requirementIds",
        message: `Unknown completion requirement ${requirementId}.`,
      });
    }
  }
}

function validateRewards(value: unknown, issues: ValidationIssue[]): void {
  if (!Array.isArray(value) || value.length === 0) {
    issues.push({ path: "rewards", message: "Quest rewards must be a non-empty array." });
    return;
  }
  value.forEach((reward, index) => {
    if (!isRecord(reward) || !REWARD_TYPES.has(String(reward.type))) {
      issues.push({
        path: `rewards.${index}.type`,
        message: "Quest reward type is not allowed by the incentive model.",
      });
      return;
    }
    if (reward.type === "progress") {
      validateAllowed(
        reward.dimension,
        `rewards.${index}.dimension`,
        DIMENSIONS,
        issues,
      );
      requirePositiveNumber(reward.amount, `rewards.${index}.amount`, issues);
    } else if (reward.type === "laurel") {
      requirePositiveNumber(reward.amount, `rewards.${index}.amount`, issues);
      if (reward.laurelId !== undefined) {
        validateId(reward.laurelId, `rewards.${index}.laurelId`, issues);
      }
    } else {
      requireString(reward, "targetId", issues, `rewards.${index}.`);
      validateId(reward.targetId, `rewards.${index}.targetId`, issues);
    }
  });
}

function validateNotification(
  input: Record<string, unknown>,
  issues: ValidationIssue[],
): void {
  requireString(input, "pressureFreeAlternative", issues);
  if (input.shameFree !== true) {
    issues.push({ path: "shameFree", message: "Notifications must be shame-free." });
  }
}

function validateAllowed(
  value: unknown,
  path: string,
  allowed: Set<string>,
  issues: ValidationIssue[],
): void {
  if (!allowed.has(String(value))) {
    issues.push({ path, message: `${path} has an unsupported value.` });
  }
}

function validateAllowedArray(
  value: unknown,
  path: string,
  allowed: Set<string>,
  issues: ValidationIssue[],
): void {
  if (!Array.isArray(value)) return;
  value.forEach((item, index) => {
    if (typeof item === "string" && !allowed.has(item)) {
      issues.push({
        path: `${path}.${index}`,
        message: `${path} contains an unsupported value.`,
      });
    }
  });
}

function validatePatternArray(
  value: unknown,
  path: string,
  pattern: RegExp,
  message: string,
  issues: ValidationIssue[],
): void {
  if (!Array.isArray(value)) return;
  value.forEach((item, index) => {
    if (typeof item === "string" && !pattern.test(item)) {
      issues.push({ path: `${path}.${index}`, message });
    }
  });
}

function validateIdArray(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
): void {
  if (!Array.isArray(value)) return;
  value.forEach((item, index) => validateId(item, `${path}.${index}`, issues));
}

function validateId(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
): void {
  if (typeof value === "string" && !ID_PATTERN.test(value)) {
    issues.push({
      path,
      message: "Use a lowercase dotted namespace; segments may contain hyphens.",
    });
  }
}

function requirePositiveNumber(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
): void {
  if (!Number.isFinite(value) || Number(value) <= 0) {
    issues.push({ path, message: `${path} must be a positive number.` });
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
    candidate.some((item) => typeof item !== "string" || item.trim() === "")
  ) {
    issues.push({
      path: `${prefix}${key}`,
      message: `${prefix}${key} must be an array of non-empty strings.`,
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
