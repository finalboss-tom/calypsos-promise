import { validateContent as validateBaseContent } from "./validate.js";
import type {
  CalypsoContent,
  ValidationIssue,
  ValidationResult,
} from "./types.js";

const ID_PATTERN =
  /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$/;

export function validateContent(
  input: unknown,
): ValidationResult<CalypsoContent> {
  const result = validateBaseContent(input);
  if (!isRecord(input) || input.kind !== "quest") return result;

  const additionalIssues: ValidationIssue[] = [];
  validateIdArray(input.dataCategories, "dataCategories", additionalIssues);

  if (additionalIssues.length === 0) return result;

  return {
    ok: false,
    issues: [...result.issues, ...additionalIssues],
  };
}

function validateIdArray(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
): void {
  if (!Array.isArray(value)) return;
  value.forEach((item, index) => {
    if (typeof item === "string" && !ID_PATTERN.test(item)) {
      issues.push({
        path: `${path}.${index}`,
        message:
          "Use a lowercase dotted namespace; segments may contain hyphens.",
      });
    }
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
