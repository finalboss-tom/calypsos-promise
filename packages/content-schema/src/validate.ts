import {
  CONTENT_SCHEMA_VERSION,
  type CalypsoContent,
  type ValidationIssue,
  type ValidationResult,
} from "./types.js";

const IDENTIFIER_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
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

  if (typeof input.id === "string" && !IDENTIFIER_PATTERN.test(input.id)) {
    issues.push({ path: "id", message: "Use a lowercase kebab-case identifier." });
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

  requireStringArray(input, "canonReferences", issues);
  requireStringArray(input, "tags", issues);

  const serialized = JSON.stringify(input).toLowerCase();
  for (const phrase of RETIRED_LANGUAGE) {
    if (serialized.includes(phrase)) {
      issues.push({
        path: "$",
        message: `Retired language is not permitted: ${phrase}.`,
      });
    }
  }

  if (input.reviewState === "approved") {
    const authorship = input.authorship;
    if (!isRecord(authorship) || !Array.isArray(authorship.reviewedBy) || authorship.reviewedBy.length === 0) {
      issues.push({
        path: "authorship.reviewedBy",
        message: "Approved content requires at least one named reviewer.",
      });
    }
  }

  if (input.kind === "quest") {
    requireString(input, "refusalPath", issues);
    requireStringArray(input, "safetyBoundaries", issues);
    if (typeof input.refusalPath === "string" && input.refusalPath.trim().length === 0) {
      issues.push({ path: "refusalPath", message: "Every quest needs a usable refusal path." });
    }
  }

  if (input.kind === "notification") {
    requireString(input, "pressureFreeAlternative", issues);
  }

  return issues.length === 0
    ? { ok: true, value: input as unknown as CalypsoContent, issues }
    : { ok: false, issues };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(
  value: Record<string, unknown>,
  key: string,
  issues: ValidationIssue[],
): void {
  if (typeof value[key] !== "string") {
    issues.push({ path: key, message: `${key} must be a string.` });
  }
}

function requireStringArray(
  value: Record<string, unknown>,
  key: string,
  issues: ValidationIssue[],
): void {
  const candidate = value[key];
  if (!Array.isArray(candidate) || candidate.some((item) => typeof item !== "string")) {
    issues.push({ path: key, message: `${key} must be an array of strings.` });
  }
}
