import {
  FORGE_MAPPING_DRAFT_INFORMATION_CLASSES,
  FORGE_MAPPING_VALIDATION_CODES,
  FORGE_STANDARDS_MAPPING_TOOL_REVISION,
  type ForgeMappingDraftInformationClass,
  type ForgeMappingValidationIdentity,
  type ForgeMappingValidationIssue,
  type ForgeValidateMappingDraftInput,
  type ForgeValidateMappingDraftOutput,
} from "./standards-mapping-contracts.js";
import {
  FORGE_LORE_SCHEMA_ERROR_CODES,
  FORGE_TOOL_NON_AUTHORITY,
  ForgeLoreSchemaToolError,
} from "./lore-schema-contracts.js";
import type { ForgeSourceProvenance } from "./source-contracts.js";
import { ForgeSourceRepository } from "./source-repository.js";
import { isRecord } from "./lore-tool-support.js";

const MAX_MAPPING_BYTES = 1_048_576;
const ID_PATTERN = /^[a-z][a-z0-9]*(?:[.-][a-z0-9]+)*$/;
const ALLOWED_TRANSFORMS = new Set([
  "identity",
  "code-map",
  "unit-conversion",
  "date-normalization",
  "text-copy",
  "unsupported",
]);
const ALLOWED_CONFIDENCE = new Set([
  "exact-structural",
  "candidate",
  "unsupported",
]);
const ALLOWED_REVIEW_REQUIREMENTS = new Set([
  "interoperability",
  "semantic",
  "privacy",
  "clinical",
  "security",
  "accessibility",
]);
const FORBIDDEN_KEYS = new Set([
  "approved",
  "approval",
  "mappingAccepted",
  "certified",
  "certificationClaim",
  "productionReady",
  "providerDefault",
  "preferredProvider",
]);

interface ResolvedMappingDraft {
  readonly value: unknown;
  readonly inputMode: "inline-public" | "allowlisted-public-source";
  readonly inputInformationClass: ForgeMappingDraftInformationClass;
  readonly provenance?: ForgeSourceProvenance;
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowed: readonly string[],
): boolean {
  const allowedSet = new Set(allowed);
  return Object.keys(value).every((key) => allowedSet.has(key));
}

function issue(
  code: ForgeMappingValidationIssue["code"],
  path: string,
  message: string,
): ForgeMappingValidationIssue {
  return { code, path, message };
}

function validString(value: unknown, maximum = 512): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= maximum &&
    !/[\u0000-\u001F\u007F]/.test(value)
  );
}

function scanForbiddenKeys(
  value: unknown,
  path: string,
  issues: ForgeMappingValidationIssue[],
): void {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      scanForbiddenKeys(entry, `${path}[${index}]`, issues),
    );
    return;
  }
  if (!isRecord(value)) return;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key)) {
      const normalized = key.toLowerCase();
      const code = normalized.includes("provider")
        ? FORGE_MAPPING_VALIDATION_CODES.providerPreference
        : normalized.includes("certif")
          ? FORGE_MAPPING_VALIDATION_CODES.certificationClaim
          : normalized.includes("production")
            ? FORGE_MAPPING_VALIDATION_CODES.productionClaim
            : FORGE_MAPPING_VALIDATION_CODES.approvalClaim;
      issues.push(
        issue(
          code,
          `${path}.${key}`,
          "Mapping drafts cannot carry approval, certification, production, or provider-preference fields.",
        ),
      );
    }
    scanForbiddenKeys(child, `${path}.${key}`, issues);
  }
}

function validateSourceStandard(
  value: unknown,
  issues: ForgeMappingValidationIssue[],
): void {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, ["id", "version", "publicReference"]) ||
    !validString(value.id, 160) ||
    !validString(value.version, 80) ||
    !validString(value.publicReference, 512)
  ) {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidStandard,
        "sourceStandard",
        "sourceStandard requires bounded id, version, and publicReference fields.",
      ),
    );
  }
}

function validateTargetModel(
  value: unknown,
  issues: ForgeMappingValidationIssue[],
): void {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, ["id", "version"]) ||
    !validString(value.id, 160) ||
    !validString(value.version, 80)
  ) {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidTarget,
        "targetModel",
        "targetModel requires bounded id and version fields.",
      ),
    );
  }
}

function validateEntries(
  value: unknown,
  issues: ForgeMappingValidationIssue[],
): void {
  if (!Array.isArray(value) || value.length < 1 || value.length > 100) {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidEntry,
        "entries",
        "entries must contain 1-100 mapping entries.",
      ),
    );
    return;
  }
  const ids = new Set<string>();
  const pairs = new Set<string>();
  value.forEach((entry, index) => {
    const path = `entries[${index}]`;
    if (
      !isRecord(entry) ||
      !hasOnlyKeys(entry, [
        "id",
        "sourcePath",
        "targetPath",
        "transform",
        "confidence",
        "notes",
      ]) ||
      !validString(entry.id, 160) ||
      !ID_PATTERN.test(entry.id) ||
      !validString(entry.sourcePath, 256) ||
      !validString(entry.targetPath, 256) ||
      typeof entry.transform !== "string" ||
      !ALLOWED_TRANSFORMS.has(entry.transform) ||
      typeof entry.confidence !== "string" ||
      !ALLOWED_CONFIDENCE.has(entry.confidence) ||
      (entry.notes !== undefined && !validString(entry.notes, 500))
    ) {
      issues.push(
        issue(
          FORGE_MAPPING_VALIDATION_CODES.invalidEntry,
          path,
          "Each entry requires accepted identity, paths, transform, confidence, and optional bounded notes.",
        ),
      );
      return;
    }
    const pair = `${entry.sourcePath}\u0000${entry.targetPath}`;
    if (ids.has(entry.id) || pairs.has(pair)) {
      issues.push(
        issue(
          FORGE_MAPPING_VALIDATION_CODES.duplicateEntry,
          path,
          "Mapping entry identities and source-target pairs must be unique.",
        ),
      );
    }
    ids.add(entry.id);
    pairs.add(pair);
  });
}

function validateSyntheticEvidence(
  value: unknown,
  issues: ForgeMappingValidationIssue[],
): void {
  if (value === undefined) return;
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, ["fixtureIds", "evidenceOnly"]) ||
    !Array.isArray(value.fixtureIds) ||
    value.fixtureIds.length < 1 ||
    value.fixtureIds.length > 50 ||
    !value.fixtureIds.every((id) => validString(id, 160)) ||
    value.evidenceOnly !== true
  ) {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidEvidence,
        "syntheticEvidence",
        "Synthetic evidence must name bounded fixture IDs and remain evidenceOnly.",
      ),
    );
  }
}

function validateReviewRequirements(
  value: unknown,
  issues: ForgeMappingValidationIssue[],
): void {
  if (
    !Array.isArray(value) ||
    value.length < 2 ||
    new Set(value).size !== value.length ||
    !value.every(
      (requirement) =>
        typeof requirement === "string" &&
        ALLOWED_REVIEW_REQUIREMENTS.has(requirement),
    ) ||
    !value.includes("interoperability") ||
    !value.includes("semantic")
  ) {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidReview,
        "reviewRequirements",
        "Mapping drafts require unique accepted review domains including interoperability and semantic review.",
      ),
    );
  }
}

function validateClaims(
  value: unknown,
  issues: ForgeMappingValidationIssue[],
): void {
  if (!isRecord(value)) {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.approvalClaim,
        "claims",
        "Mapping drafts require explicit non-authority claims.",
      ),
    );
    return;
  }
  const allowed = [
    "mappingApproval",
    "semanticEquivalence",
    "connectorBehavior",
    "certification",
    "productionReadiness",
    "providerPreference",
  ];
  if (!hasOnlyKeys(value, allowed) || value.mappingApproval !== "not-granted") {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.approvalClaim,
        "claims.mappingApproval",
        "Mapping approval must remain not-granted.",
      ),
    );
  }
  if (value.semanticEquivalence !== "not-proven") {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.approvalClaim,
        "claims.semanticEquivalence",
        "Semantic equivalence must remain not-proven.",
      ),
    );
  }
  if (value.connectorBehavior !== "not-proven") {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.productionClaim,
        "claims.connectorBehavior",
        "Connector behavior must remain not-proven.",
      ),
    );
  }
  if (value.certification !== "not-granted") {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.certificationClaim,
        "claims.certification",
        "Certification must remain not-granted.",
      ),
    );
  }
  if (value.productionReadiness !== "not-established") {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.productionClaim,
        "claims.productionReadiness",
        "Production readiness must remain not-established.",
      ),
    );
  }
  if (value.providerPreference !== "none") {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.providerPreference,
        "claims.providerPreference",
        "Provider preference must remain none.",
      ),
    );
  }
}

function validateMapping(value: unknown): ForgeMappingValidationIssue[] {
  const issues: ForgeMappingValidationIssue[] = [];
  if (!isRecord(value)) {
    return [
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidInput,
        "$",
        "A mapping draft must be an object.",
      ),
    ];
  }
  scanForbiddenKeys(value, "$", issues);
  if (
    !hasOnlyKeys(value, [
      "kind",
      "id",
      "revision",
      "status",
      "title",
      "sourceStandard",
      "targetModel",
      "entries",
      "syntheticEvidence",
      "reviewRequirements",
      "claims",
    ])
  ) {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidInput,
        "$",
        "Mapping drafts may contain only accepted revision-1 fields.",
      ),
    );
  }
  if (value.kind !== "mapping-draft") {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidKind,
        "kind",
        "kind must be mapping-draft.",
      ),
    );
  }
  if (value.revision !== "1") {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidRevision,
        "revision",
        "revision must be 1.",
      ),
    );
  }
  if (value.status !== "draft") {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.notDraft,
        "status",
        "Mapping status must remain draft.",
      ),
    );
  }
  if (!validString(value.id, 160) || !ID_PATTERN.test(value.id)) {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidIdentity,
        "id",
        "id must be a bounded lowercase dotted or hyphenated identifier.",
      ),
    );
  }
  if (!validString(value.title, 200)) {
    issues.push(
      issue(
        FORGE_MAPPING_VALIDATION_CODES.invalidIdentity,
        "title",
        "title must be a bounded public-safe string.",
      ),
    );
  }
  validateSourceStandard(value.sourceStandard, issues);
  validateTargetModel(value.targetModel, issues);
  validateEntries(value.entries, issues);
  validateSyntheticEvidence(value.syntheticEvidence, issues);
  validateReviewRequirements(value.reviewRequirements, issues);
  validateClaims(value.claims, issues);
  return issues;
}

function parseInput(input: unknown): ForgeValidateMappingDraftInput {
  if (
    !isRecord(input) ||
    Object.keys(input).some(
      (key) =>
        ![
          "mapping",
          "sourcePath",
          "informationClass",
          "mappingRevision",
        ].includes(key),
    )
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Mapping validation requires one inline public draft or one allowlisted public source.",
    );
  }
  const hasMapping = Object.prototype.hasOwnProperty.call(input, "mapping");
  const hasSourcePath = Object.prototype.hasOwnProperty.call(input, "sourcePath");
  if (hasMapping === hasSourcePath) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Provide exactly one of mapping or sourcePath.",
    );
  }
  if (input.mappingRevision !== undefined && input.mappingRevision !== "1") {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Only mapping revision 1 is supported.",
    );
  }
  if (hasMapping) {
    if (
      typeof input.informationClass !== "string" ||
      !FORGE_MAPPING_DRAFT_INFORMATION_CLASSES.includes(
        input.informationClass as ForgeMappingDraftInformationClass,
      )
    ) {
      throw new ForgeLoreSchemaToolError(
        FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
        "Inline mapping validation requires an explicit public or synthetic information class.",
      );
    }
  } else if (
    typeof input.sourcePath !== "string" ||
    input.sourcePath.length === 0 ||
    input.sourcePath.length > 512
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "sourcePath must be a bounded allowlisted relative path.",
    );
  }
  return input;
}

async function resolveMapping(
  repository: ForgeSourceRepository,
  input: ForgeValidateMappingDraftInput,
): Promise<ResolvedMappingDraft> {
  if (Object.prototype.hasOwnProperty.call(input, "mapping")) {
    return {
      value: input.mapping,
      inputMode: "inline-public",
      inputInformationClass:
        input.informationClass as ForgeMappingDraftInformationClass,
    };
  }
  const read = await repository.readText({
    sourceRootId: "forge.public-standards",
    relativePath: input.sourcePath as string,
    maxOutputBytes: MAX_MAPPING_BYTES,
  });
  try {
    return {
      value: JSON.parse(read.content),
      inputMode: "allowlisted-public-source",
      inputInformationClass: "public-standards-reference",
      provenance: read.provenance,
    };
  } catch {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidJson,
      "The allowlisted public mapping draft is not valid JSON.",
    );
  }
}

function identity(value: unknown): ForgeMappingValidationIdentity {
  if (!isRecord(value)) return {};
  return {
    ...(typeof value.id === "string" ? { id: value.id } : {}),
    ...(typeof value.kind === "string" ? { kind: value.kind } : {}),
    ...(typeof value.revision === "string" ? { revision: value.revision } : {}),
    ...(typeof value.status === "string" ? { status: value.status } : {}),
  };
}

export async function validateForgeMappingDraft(
  repository: ForgeSourceRepository,
  input: unknown,
): Promise<ForgeValidateMappingDraftOutput> {
  const request = parseInput(input);
  const resolved = await resolveMapping(repository, request);
  const issues = validateMapping(resolved.value);
  return {
    toolId: "forge.validate.mapping-draft",
    revision: FORGE_STANDARDS_MAPPING_TOOL_REVISION,
    mappingRevision: "1",
    valid: issues.length === 0,
    issues,
    identity: identity(resolved.value),
    inputMode: resolved.inputMode,
    inputInformationClass: resolved.inputInformationClass,
    ...(resolved.provenance === undefined
      ? {}
      : { provenance: resolved.provenance }),
    humanReviewRequired: true,
    mappingApproval: "not-granted",
    semanticEquivalence: "not-proven",
    connectorBehavior: "not-proven",
    certification: "not-granted",
    productionReadiness: "not-established",
    providerPreference: "none",
    ...FORGE_TOOL_NON_AUTHORITY,
  };
}
