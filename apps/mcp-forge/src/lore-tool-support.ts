import {
  CONTENT_SCHEMA_VERSION,
  type ValidationIssue,
} from "@calypsos-promise/content-schema";

import {
  FORGE_INLINE_CONTENT_INFORMATION_CLASSES,
  FORGE_LORE_SCHEMA_ERROR_CODES,
  FORGE_TOOL_NON_AUTHORITY,
  ForgeLoreSchemaToolError,
  type ForgeInlineContentInformationClass,
  type ForgeInspectQuestSchemaInput,
  type ForgeLoreSchemaToolErrorPayload,
  type ForgeMcpToolCallResult,
  type ForgePublicRecordInput,
  type ForgeValidationIdentity,
} from "./lore-schema-contracts.js";
import type { ForgeSourceProvenance } from "./source-contracts.js";

const MAX_SOURCE_PATH_LENGTH = 512;
const MAX_INLINE_INPUT_BYTES = 1_048_576;
export const FORGE_QUEST_SCHEMA_PATH = "schema/content.schema.json" as const;

export interface ForgeTransportToolService {
  callTool(
    name: string,
    argumentsValue: unknown,
    signal: AbortSignal,
  ): Promise<ForgeMcpToolCallResult>;
}

export interface ResolvedPublicRecord {
  readonly value: unknown;
  readonly inputMode: "inline-public" | "allowlisted-public-source";
  readonly inputInformationClass: ForgeInlineContentInformationClass;
  readonly provenance?: ForgeSourceProvenance;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowed: readonly string[],
): boolean {
  const allowedSet = new Set(allowed);
  return Object.keys(value).every((key) => allowedSet.has(key));
}

export function assertForgeContentSchemaVersion(value: unknown): void {
  if (value === undefined) return;
  if (value !== CONTENT_SCHEMA_VERSION) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.schemaVersionUnsupported,
      `Only content schema version ${CONTENT_SCHEMA_VERSION} is supported.`,
    );
  }
}

export function parseForgePublicRecordInput(
  input: unknown,
): ForgePublicRecordInput {
  if (
    !isRecord(input) ||
    !hasOnlyKeys(input, [
      "content",
      "sourcePath",
      "informationClass",
      "schemaVersion",
    ])
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Validation requires one inline public content record or one allowlisted sourcePath.",
    );
  }

  const hasContent = Object.prototype.hasOwnProperty.call(input, "content");
  const hasSource = Object.prototype.hasOwnProperty.call(input, "sourcePath");
  if (hasContent === hasSource) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Provide exactly one of content or sourcePath.",
    );
  }
  if (
    hasContent &&
    !FORGE_INLINE_CONTENT_INFORMATION_CLASSES.includes(
      input.informationClass as ForgeInlineContentInformationClass,
    )
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Inline validation requires an explicit public-content or public-synthetic-fixture informationClass.",
    );
  }
  if (hasSource && input.informationClass !== undefined) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Allowlisted source validation derives its public information class from the server-owned catalogue.",
    );
  }
  assertForgeContentSchemaVersion(input.schemaVersion);

  if (
    hasSource &&
    (typeof input.sourcePath !== "string" ||
      input.sourcePath.length === 0 ||
      input.sourcePath.length > MAX_SOURCE_PATH_LENGTH)
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      `sourcePath must contain 1-${MAX_SOURCE_PATH_LENGTH} characters.`,
    );
  }

  if (hasContent) {
    let serialized: string;
    try {
      const encoded = JSON.stringify(input.content);
      if (typeof encoded !== "string") throw new Error("not-json-value");
      serialized = encoded;
    } catch {
      throw new ForgeLoreSchemaToolError(
        FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
        "content must be JSON-serializable.",
      );
    }
    if (Buffer.byteLength(serialized, "utf8") > MAX_INLINE_INPUT_BYTES) {
      throw new ForgeLoreSchemaToolError(
        FORGE_LORE_SCHEMA_ERROR_CODES.inputTooLarge,
        "Inline public content exceeds the bounded input limit.",
      );
    }
  }

  return {
    ...(hasContent ? { content: input.content } : {}),
    ...(hasSource ? { sourcePath: input.sourcePath as string } : {}),
    ...(hasContent
      ? {
          informationClass:
            input.informationClass as ForgeInlineContentInformationClass,
        }
      : {}),
    ...(input.schemaVersion === undefined
      ? {}
      : { schemaVersion: input.schemaVersion as string }),
  };
}

export function parseForgeInspectInput(
  input: unknown,
): ForgeInspectQuestSchemaInput {
  if (input === undefined) return {};
  if (!isRecord(input) || !hasOnlyKeys(input, ["schemaVersion"])) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Quest-schema inspection accepts only an optional schemaVersion.",
    );
  }
  assertForgeContentSchemaVersion(input.schemaVersion);
  return input.schemaVersion === undefined
    ? {}
    : { schemaVersion: input.schemaVersion as string };
}

export function forgeValidationIdentity(
  value: unknown,
): ForgeValidationIdentity {
  if (!isRecord(value)) return {};
  return {
    ...(typeof value.id === "string" ? { id: value.id } : {}),
    ...(typeof value.kind === "string" ? { kind: value.kind } : {}),
    ...(Number.isSafeInteger(value.revision)
      ? { revision: Number(value.revision) }
      : {}),
  };
}

export function forgeToolResult(
  value: unknown,
  isError = false,
): ForgeMcpToolCallResult {
  return {
    content: [{ type: "text", text: JSON.stringify(value) }],
    structuredContent: value,
    isError,
  };
}

export function forgePublicToolErrorResult(
  error: ForgeLoreSchemaToolError,
): ForgeMcpToolCallResult {
  const payload: ForgeLoreSchemaToolErrorPayload = {
    error: { code: error.code, message: error.message },
    ...FORGE_TOOL_NON_AUTHORITY,
  };
  return forgeToolResult(payload, true);
}

export function questKindIssue(value: unknown): ValidationIssue | undefined {
  return !isRecord(value) || value.kind !== "quest"
    ? { path: "kind", message: "Quest validation requires kind quest." }
    : undefined;
}
