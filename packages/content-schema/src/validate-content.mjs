import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { validateContent } from "../dist/index.js";

const root = process.cwd();
const contentRoot = path.join(root, "content");
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

for (const file of await collectJson(contentRoot)) {
  const relative = path.relative(root, file);
  let value;
  try {
    value = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    errors.push(`${relative}: invalid JSON (${error.message})`);
    continue;
  }

  const result = validateContent(value);
  for (const issue of result.issues) {
    errors.push(`${relative}: ${issue.path}: ${issue.message}`);
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) continue;
  records.push({ file: relative, value });

  if (typeof value.id === "string") {
    const duplicate = ids.get(value.id);
    if (duplicate)
      errors.push(`${relative}: duplicate id also used by ${duplicate}`);
    else ids.set(value.id, relative);
  }
}

function requireContentReference(file, field, reference) {
  if (typeof reference === "string" && !ids.has(reference)) {
    errors.push(`${file}: ${field} ${reference} does not resolve to content`);
  }
}

function requireContentReferenceList(file, field, references) {
  if (!Array.isArray(references)) return;
  for (const reference of references) {
    requireContentReference(file, field, reference);
  }
}

for (const { file, value } of records) {
  for (const field of [
    "zoneId",
    "speakerId",
    "guideCharacterId",
    "supersedes",
    "replacedBy",
  ]) {
    requireContentReference(file, field, value[field]);
  }

  for (const field of [
    "dependencies",
    "zoneIds",
    "sceneIds",
    "speakerIds",
    "dialogueIds",
    "guideCharacterIds",
  ]) {
    requireContentReferenceList(file, field, value[field]);
  }

  requireContentReferenceList(
    file,
    "unlock.requiredContentIds",
    value.unlock?.requiredContentIds,
  );
  requireContentReferenceList(
    file,
    "spoilerGate.requiredContentIds",
    value.spoilerGate?.requiredContentIds,
  );

  for (const choice of value.choices ?? []) {
    requireContentReference(file, "choice.nextSceneId", choice?.nextSceneId);
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
