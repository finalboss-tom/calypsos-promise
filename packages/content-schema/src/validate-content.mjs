import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const contentIdPattern = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
const allowedKinds = new Set([
  "zone",
  "character",
  "scene",
  "dialogue",
  "quest",
  "lesson",
  "notification",
]);
const allowedReviewStates = new Set([
  "draft",
  "editorial-review",
  "specialist-review",
  "approved",
  "retired",
]);
const allowedCapabilityStatuses = new Set([
  "live",
  "experimental",
  "planned",
  "long-horizon",
  "deferred",
]);
const allowedRewardTypes = new Set([
  "progress",
  "laurel",
  "restoration",
  "story-unlock",
  "clue",
]);
const retiredPatterns = [
  /trojan horse/i,
  /indoctrinat/i,
  /ai doctor/i,
  /robot doctor/i,
  /health-data vacuum/i,
  /your data is worth \$/i,
  /sell your health data/i,
];

const errors = [];
const ids = new Map();
const records = [];

async function collectJson(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true }).catch(
    () => [],
  )) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectJson(fullPath)));
    else if (entry.name.endsWith(".json")) files.push(fullPath);
  }
  return files;
}

function requireString(value, field, file) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${file}: ${field} must be a non-empty string`);
  }
}

function requireArray(value, field, file) {
  if (!Array.isArray(value)) errors.push(`${file}: ${field} must be an array`);
}

function validateReviewApprovals(value, file) {
  if (value.reviewState !== "approved") return;
  if (!Array.isArray(value.reviewApprovals)) {
    errors.push(`${file}: approved content requires reviewApprovals`);
    return;
  }
  const approvedDomains = new Set(
    value.reviewApprovals
      .filter((approval) => approval && typeof approval === "object")
      .map((approval) => approval.domain),
  );
  for (const domain of value.reviewRequirements ?? []) {
    if (!approvedDomains.has(domain)) {
      errors.push(
        `${file}: missing named approval for review domain ${domain}`,
      );
    }
  }
}

function validateQuest(value, file) {
  if (value.canDecline !== true)
    errors.push(`${file}: quests must permit decline`);
  if (value.canDefer !== true)
    errors.push(`${file}: quests must permit deferral`);
  if (!Number.isFinite(value.estimatedMinutes) || value.estimatedMinutes <= 0) {
    errors.push(`${file}: estimatedMinutes must be positive`);
  }
  requireString(value.playerValue, "playerValue", file);
  requireString(value.refusalPath, "refusalPath", file);
  requireString(value.deferralPath, "deferralPath", file);
  requireArray(value.requirements, "requirements", file);
  requireArray(value.rewards, "rewards", file);
  if (!value.completionRule || typeof value.completionRule !== "object") {
    errors.push(`${file}: quests require a structured completionRule`);
  }
  if (Array.isArray(value.rewards)) {
    value.rewards.forEach((reward, index) => {
      if (
        !reward ||
        typeof reward !== "object" ||
        !allowedRewardTypes.has(reward.type)
      ) {
        errors.push(
          `${file}: rewards[${index}] uses an unsupported reward type`,
        );
      }
      if (
        reward?.type === "progress" &&
        (!Number.isFinite(reward.amount) || reward.amount <= 0)
      ) {
        errors.push(`${file}: progress rewards require a positive amount`);
      }
    });
  }
}

for (const file of await collectJson(contentRoot)) {
  const relative = path.relative(root, file);
  let value;
  try {
    value = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    errors.push(`${relative}: invalid JSON (${error.message})`);
    continue;
  }

  records.push({ file: relative, value });

  requireString(value.id, "id", relative);
  requireString(value.title, "title", relative);
  requireString(value.summary, "summary", relative);
  requireString(value.locale, "locale", relative);
  requireString(value.owner, "owner", relative);
  requireArray(value.tags, "tags", relative);
  requireArray(value.canonReferences, "canonReferences", relative);
  requireArray(value.dependencies, "dependencies", relative);
  requireArray(value.reviewRequirements, "reviewRequirements", relative);
  requireArray(value.reviewApprovals, "reviewApprovals", relative);

  if (value.schemaVersion !== "0.1.0") {
    errors.push(`${relative}: schemaVersion must be 0.1.0`);
  }
  if (!allowedKinds.has(value.kind)) {
    errors.push(`${relative}: unsupported kind ${String(value.kind)}`);
  }
  if (!allowedReviewStates.has(value.reviewState)) {
    errors.push(
      `${relative}: unsupported reviewState ${String(value.reviewState)}`,
    );
  }
  if (!allowedCapabilityStatuses.has(value.capabilityStatus)) {
    errors.push(
      `${relative}: unsupported capabilityStatus ${String(value.capabilityStatus)}`,
    );
  }
  if (!Number.isInteger(value.revision) || value.revision < 1) {
    errors.push(`${relative}: revision must be a positive integer`);
  }
  if (typeof value.id === "string" && !contentIdPattern.test(value.id)) {
    errors.push(
      `${relative}: id must be lowercase and namespaced with dots or hyphens`,
    );
  }
  if (
    !value.authorship ||
    typeof value.authorship !== "object" ||
    !Array.isArray(value.authorship.humanContributors) ||
    value.authorship.humanContributors.length === 0
  ) {
    errors.push(
      `${relative}: authorship must name at least one human contributor`,
    );
  }

  if (typeof value.id === "string") {
    const duplicate = ids.get(value.id);
    if (duplicate)
      errors.push(`${relative}: duplicate id also used by ${duplicate}`);
    else ids.set(value.id, relative);
  }

  const activeText = JSON.stringify(value);
  if (value.historicalContext !== true && value.reviewState !== "retired") {
    for (const pattern of retiredPatterns) {
      if (pattern.test(activeText)) {
        errors.push(
          `${relative}: active content contains retired terminology (${pattern})`,
        );
      }
    }
  }

  validateReviewApprovals(value, relative);

  if (value.kind === "quest") validateQuest(value, relative);

  if (value.kind === "notification" && value.shameFree !== true) {
    errors.push(`${relative}: notifications must set shameFree to true`);
  }

  if (value.kind === "scene") {
    requireArray(value.choices, "choices", relative);
    if (
      Array.isArray(value.choices) &&
      !value.choices.some((choice) =>
        ["defer", "refuse", "exit"].includes(choice?.disposition),
      )
    ) {
      errors.push(
        `${relative}: scenes with choices need a defer, refusal, or exit route`,
      );
    }
  }
}

for (const { file, value } of records) {
  for (const dependency of value.dependencies ?? []) {
    if (!ids.has(dependency)) {
      errors.push(
        `${file}: dependency ${dependency} does not resolve to content`,
      );
    }
  }
  for (const referenceField of [
    "zoneId",
    "speakerId",
    "guideCharacterId",
    "nextSceneId",
  ]) {
    const reference = value[referenceField];
    if (typeof reference === "string" && !ids.has(reference)) {
      errors.push(
        `${file}: ${referenceField} ${reference} does not resolve to content`,
      );
    }
  }
  for (const referenceListField of [
    "zoneIds",
    "sceneIds",
    "speakerIds",
    "dialogueIds",
  ]) {
    for (const reference of value[referenceListField] ?? []) {
      if (!ids.has(reference)) {
        errors.push(
          `${file}: ${referenceListField} reference ${reference} does not resolve to content`,
        );
      }
    }
  }
  for (const choice of value.choices ?? []) {
    if (choice.nextSceneId && !ids.has(choice.nextSceneId)) {
      errors.push(
        `${file}: choice nextSceneId ${choice.nextSceneId} does not resolve to content`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(
    "Content validation failed:\n" +
      errors.map((error) => `- ${error}`).join("\n"),
  );
  process.exit(1);
}

console.log(`Content validation passed for ${ids.size} content records.`);
