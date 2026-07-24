import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const allowedKinds = new Set([
  "zone",
  "character",
  "scene",
  "dialogue",
  "quest",
  "lesson",
  "notification",
]);
const allowedStatuses = new Set([
  "draft",
  "review",
  "approved",
  "published",
  "retired",
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

async function collectJson(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true }).catch(() => [])) {
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

for (const file of await collectJson(contentRoot)) {
  const relative = path.relative(root, file);
  let value;
  try {
    value = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    errors.push(`${relative}: invalid JSON (${error.message})`);
    continue;
  }

  requireString(value.id, "id", relative);
  requireString(value.title, "title", relative);
  requireString(value.summary, "summary", relative);
  requireString(value.locale, "locale", relative);
  requireString(value.owner, "owner", relative);
  requireArray(value.tags, "tags", relative);
  requireArray(value.canonRefs, "canonRefs", relative);
  requireArray(value.reviewers, "reviewers", relative);

  if (value.schemaVersion !== "0.1.0") {
    errors.push(`${relative}: schemaVersion must be 0.1.0`);
  }
  if (!allowedKinds.has(value.kind)) {
    errors.push(`${relative}: unsupported kind ${String(value.kind)}`);
  }
  if (!allowedStatuses.has(value.status)) {
    errors.push(`${relative}: unsupported status ${String(value.status)}`);
  }
  if (!Number.isInteger(value.version) || value.version < 1) {
    errors.push(`${relative}: version must be a positive integer`);
  }

  if (typeof value.id === "string") {
    const duplicate = ids.get(value.id);
    if (duplicate) errors.push(`${relative}: duplicate id also used by ${duplicate}`);
    else ids.set(value.id, relative);
  }

  const activeText = JSON.stringify(value);
  if (!value.historicalContext && value.status !== "retired") {
    for (const pattern of retiredPatterns) {
      if (pattern.test(activeText)) {
        errors.push(`${relative}: active content contains retired terminology (${pattern})`);
      }
    }
  }

  if (value.kind === "quest") {
    if (value.canDecline !== true) errors.push(`${relative}: quests must permit decline`);
    if (!Number.isFinite(value.estimatedMinutes) || value.estimatedMinutes <= 0) {
      errors.push(`${relative}: estimatedMinutes must be positive`);
    }
    requireString(value.playerValue, "playerValue", relative);
    requireArray(value.requirements, "requirements", relative);
    requireArray(value.rewards, "rewards", relative);
  }

  if (value.kind === "notification" && value.shameFree !== true) {
    errors.push(`${relative}: notifications must set shameFree to true`);
  }

  if (value.kind === "scene") {
    requireArray(value.choices, "choices", relative);
    if (Array.isArray(value.choices) && !value.choices.some((choice) => choice.refusal === true)) {
      errors.push(`${relative}: scenes with choices must include a refusal or exit choice`);
    }
  }
}

if (errors.length > 0) {
  console.error("Content validation failed:\n" + errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Content validation passed for ${ids.size} content records.`);
