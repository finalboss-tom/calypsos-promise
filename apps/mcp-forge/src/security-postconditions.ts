import { createHash } from "node:crypto";

import { FORGE_BOUNDARY, FORGE_TOOL_REGISTRY } from "./contracts.js";
import { FORGE_RUNTIME_EXECUTION_SCOPES } from "./execution-contracts.js";
import { FORGE_TOOL_NON_AUTHORITY } from "./lore-schema-contracts.js";
import {
  FORGE_RUNTIME_ENABLED_TOOL_IDS,
  FORGE_RUNTIME_TOOL_DESCRIPTORS,
  FORGE_RUNTIME_TOOL_REGISTRY,
  type ForgeRuntimeEnabledToolId,
} from "./runtime-registry.js";
import { FORGE_SOURCE_CATALOGUE } from "./source-contracts.js";

export const FORGE_SECURITY_POSTCONDITION_REVISION = "1" as const;

export const FORGE_SECURITY_ERROR_CODES = {
  integrityViolation: "forge.security.integrity-violation",
  postconditionFailed: "forge.security.postcondition-failed",
} as const;

export type ForgeSecurityErrorCode =
  (typeof FORGE_SECURITY_ERROR_CODES)[keyof typeof FORGE_SECURITY_ERROR_CODES];

export interface ForgeSecurityIssue {
  readonly code: ForgeSecurityErrorCode;
  readonly path: string;
  readonly message: string;
}

export interface ForgeSecurityIntegritySurface {
  readonly boundary: unknown;
  readonly acceptedToolRegistry: unknown;
  readonly sourceCatalogue: unknown;
  readonly runtimeEnabledToolIds: unknown;
  readonly runtimeToolDescriptors: unknown;
  readonly runtimeToolRegistry: unknown;
  readonly executionScopes: unknown;
}

const issue = (
  code: ForgeSecurityErrorCode,
  path: string,
  message: string,
): ForgeSecurityIssue => ({ code, path, message });

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function defaultIntegritySurface(): ForgeSecurityIntegritySurface {
  return {
    boundary: FORGE_BOUNDARY,
    acceptedToolRegistry: FORGE_TOOL_REGISTRY,
    sourceCatalogue: FORGE_SOURCE_CATALOGUE,
    runtimeEnabledToolIds: FORGE_RUNTIME_ENABLED_TOOL_IDS,
    runtimeToolDescriptors: FORGE_RUNTIME_TOOL_DESCRIPTORS,
    runtimeToolRegistry: FORGE_RUNTIME_TOOL_REGISTRY,
    executionScopes: FORGE_RUNTIME_EXECUTION_SCOPES,
  };
}

function digest(value: unknown): `sha256:${string}` {
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(value))
    .digest("hex")}`;
}

const EXPECTED_INTEGRITY_DIGESTS = Object.fromEntries(
  Object.entries(defaultIntegritySurface()).map(([key, value]) => [
    key,
    digest(value),
  ]),
) as Readonly<Record<keyof ForgeSecurityIntegritySurface, `sha256:${string}`>>;

export function validateForgeRuntimeIntegrity(
  surface: ForgeSecurityIntegritySurface = defaultIntegritySurface(),
): ForgeSecurityIssue[] {
  const issues: ForgeSecurityIssue[] = [];
  for (const [key, value] of Object.entries(surface) as [
    keyof ForgeSecurityIntegritySurface,
    unknown,
  ][]) {
    if (digest(value) !== EXPECTED_INTEGRITY_DIGESTS[key]) {
      issues.push(
        issue(
          FORGE_SECURITY_ERROR_CODES.integrityViolation,
          key,
          "A server-owned Forge registry, source, descriptor, or execution-scope contract changed after initialization.",
        ),
      );
    }
  }
  return issues;
}

function validateNonAuthority(
  value: Record<string, unknown>,
): ForgeSecurityIssue[] {
  const issues: ForgeSecurityIssue[] = [];
  for (const [key, expected] of Object.entries(FORGE_TOOL_NON_AUTHORITY)) {
    if (value[key] !== expected) {
      issues.push(
        issue(
          FORGE_SECURITY_ERROR_CODES.postconditionFailed,
          key,
          "Forge results must retain the complete non-authority profile.",
        ),
      );
    }
  }
  return issues;
}

function safeRepositoryRelativePath(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    !value.startsWith("/") &&
    !/^[A-Za-z]:/.test(value) &&
    !value.includes("\\") &&
    !value.includes("://") &&
    !value.split("/").includes("..")
  );
}

function validateProvenance(
  value: unknown,
  path: string,
): ForgeSecurityIssue[] {
  if (!isRecord(value)) {
    return [
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        path,
        "Source-linked results require server-owned public provenance.",
      ),
    ];
  }
  const issues: ForgeSecurityIssue[] = [];
  if (
    value.sourceAuthority !== "evidence-only" ||
    value.canCreateTruth !== false ||
    value.canCreatePermission !== false ||
    value.canApproveCanon !== false ||
    value.canApproveMapping !== false
  ) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        path,
        "Source provenance cannot create truth, permission, canon, or mapping authority.",
      ),
    );
  }
  if (!safeRepositoryRelativePath(value.repositoryRelativePath)) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        `${path}.repositoryRelativePath`,
        "Provenance paths must remain repository-relative and traversal-free.",
      ),
    );
  }
  if (
    typeof value.contentDigest !== "string" ||
    !/^sha256:[a-f0-9]{64}$/.test(value.contentDigest)
  ) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        `${path}.contentDigest`,
        "Source provenance requires an exact SHA-256 content digest.",
      ),
    );
  }
  if (isRecord(value.locator)) {
    if (value.locator.repositoryRelativePath !== value.repositoryRelativePath) {
      issues.push(
        issue(
          FORGE_SECURITY_ERROR_CODES.postconditionFailed,
          `${path}.locator`,
          "Source locators must remain bound to their original repository-relative path.",
        ),
      );
    }
  } else {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        `${path}.locator`,
        "Source provenance requires a bounded locator.",
      ),
    );
  }
  return issues;
}

function validateVisibleResultState(
  value: Record<string, unknown>,
): ForgeSecurityIssue[] {
  const issues: ForgeSecurityIssue[] = [];
  if (
    value.resultState !== "complete" &&
    value.resultState !== "partial" &&
    value.resultState !== "truncated"
  ) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "resultState",
        "Search results must expose complete, partial, or truncated state.",
      ),
    );
    return issues;
  }
  if (!Array.isArray(value.partialReasons)) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "partialReasons",
        "Search results must expose a stable partial-reason list.",
      ),
    );
    return issues;
  }
  const reasons = value.partialReasons.filter(
    (entry): entry is string => typeof entry === "string",
  );
  if (reasons.length !== value.partialReasons.length) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "partialReasons",
        "Partial reasons must use public stable string identities.",
      ),
    );
  }
  if (reasons.length > 0 && value.resultState === "complete") {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "resultState",
        "A result with partial reasons cannot claim complete state.",
      ),
    );
  }
  if (
    reasons.some((reason) =>
      [
        "file-limit-reached",
        "output-limit-reached",
        "result-limit-reached",
      ].includes(reason),
    ) &&
    value.resultState !== "truncated"
  ) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "resultState",
        "Limit-reached evidence must remain visibly truncated.",
      ),
    );
  }
  return issues;
}

const SEARCH_TOOL_IDS = new Set<ForgeRuntimeEnabledToolId>([
  "forge.search.lore",
  "forge.search.architecture",
  "forge.search.decision",
  "forge.search.public-standards",
  "forge.search.synthetic-connector-fixtures",
]);

function validateSearchOutput(
  toolId: ForgeRuntimeEnabledToolId,
  value: Record<string, unknown>,
): ForgeSecurityIssue[] {
  const issues = validateVisibleResultState(value);
  if (!Array.isArray(value.matches)) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "matches",
        "Search tools must return a bounded match array.",
      ),
    );
    return issues;
  }
  if (value.returnedMatches !== value.matches.length) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "returnedMatches",
        "Returned-match evidence must equal the materialized match count.",
      ),
    );
  }
  value.matches.forEach((match, index) => {
    if (!isRecord(match)) {
      issues.push(
        issue(
          FORGE_SECURITY_ERROR_CODES.postconditionFailed,
          `matches[${index}]`,
          "Search matches must be structured public evidence.",
        ),
      );
      return;
    }
    issues.push(
      ...validateProvenance(match.provenance, `matches[${index}].provenance`),
    );
    if (
      (toolId === "forge.search.architecture" ||
        toolId === "forge.search.decision") &&
      isRecord(match.authority)
    ) {
      if (match.authority.retrievedContentCanChangeAuthority !== false) {
        issues.push(
          issue(
            FORGE_SECURITY_ERROR_CODES.postconditionFailed,
            `matches[${index}].authority`,
            "Retrieved documentation cannot change its own authority state.",
          ),
        );
      }
      if (match.authority.evidenceProvenance !== undefined) {
        issues.push(
          ...validateProvenance(
            match.authority.evidenceProvenance,
            `matches[${index}].authority.evidenceProvenance`,
          ),
        );
      }
    }
    if (toolId === "forge.search.synthetic-connector-fixtures") {
      if (
        match.explicitSynthetic !== true ||
        match.productionReady !== false ||
        match.containsCredentials !== false ||
        match.containsPersonalData !== false
      ) {
        issues.push(
          issue(
            FORGE_SECURITY_ERROR_CODES.postconditionFailed,
            `matches[${index}]`,
            "Connector search may return only explicitly synthetic, non-production, credential-free, personal-data-free fixtures.",
          ),
        );
      }
    }
  });

  if (
    toolId === "forge.search.architecture" ||
    toolId === "forge.search.decision"
  ) {
    if (
      value.authorityInterpretation !== "explicit-and-conservative" ||
      value.ambiguousAuthorityIsPromoted !== false
    ) {
      issues.push(
        issue(
          FORGE_SECURITY_ERROR_CODES.postconditionFailed,
          "authorityInterpretation",
          "Documentation search must remain explicit, conservative, and unable to promote ambiguous authority.",
        ),
      );
    }
  }
  if (toolId === "forge.search.public-standards") {
    if (
      value.certificationClaim !== "not-established" ||
      value.completenessClaim !== "not-established" ||
      value.providerPreference !== "none" ||
      value.networkUsed !== false
    ) {
      issues.push(
        issue(
          FORGE_SECURITY_ERROR_CODES.postconditionFailed,
          "standardsBoundary",
          "Standards search cannot claim completeness, certification, provider preference, or network use.",
        ),
      );
    }
  }
  if (toolId === "forge.search.synthetic-connector-fixtures") {
    if (
      value.fixtureAuthority !== "synthetic-evidence-only" ||
      value.connectorActivation !== "not-granted" ||
      value.providerPreference !== "none" ||
      value.networkUsed !== false
    ) {
      issues.push(
        issue(
          FORGE_SECURITY_ERROR_CODES.postconditionFailed,
          "connectorBoundary",
          "Synthetic connector evidence cannot activate connectors, select providers, or gain authority.",
        ),
      );
    }
  }
  if (
    toolId === "forge.search.lore" &&
    value.canonAcceptance !== "not-granted"
  ) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "canonAcceptance",
        "Lore search cannot approve canon.",
      ),
    );
  }
  return issues;
}

function validateMappingBoundary(
  value: Record<string, unknown>,
): ForgeSecurityIssue[] {
  return value.humanReviewRequired === true &&
    value.mappingApproval === "not-granted" &&
    value.semanticEquivalence === "not-proven" &&
    value.connectorBehavior === "not-proven" &&
    value.certification === "not-granted" &&
    value.productionReadiness === "not-established" &&
    value.providerPreference === "none"
    ? []
    : [
        issue(
          FORGE_SECURITY_ERROR_CODES.postconditionFailed,
          "mappingBoundary",
          "Mapping validation must remain draft-only, human-reviewed, non-certifying, provider-neutral, and unable to approve equivalence or connector behavior.",
        ),
      ];
}

function validateGeneratedRecord(
  value: unknown,
  path: string,
): ForgeSecurityIssue[] {
  if (!isRecord(value)) {
    return [
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        path,
        "Generated records must remain structured synthetic evidence.",
      ),
    ];
  }
  if (
    value.synthetic !== true ||
    value.informationClass !== "public-synthetic-fixture" ||
    value.productionReady !== false ||
    value.containsCredentials !== false ||
    value.containsPersonalData !== false ||
    value.humanReviewRequired !== true ||
    value.canonAcceptance !== "not-granted" ||
    value.mappingApproval !== "not-granted" ||
    value.semanticEquivalence !== "not-proven" ||
    value.clinicalUse !== "not-authorized" ||
    value.providerPreference !== "none" ||
    value.connectorActivation !== "not-granted" ||
    value.productionReadiness !== "not-established" ||
    !isRecord(value.validation) ||
    value.validation.valid !== true ||
    !Array.isArray(value.validation.issues) ||
    value.validation.issues.length !== 0
  ) {
    return [
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        path,
        "Generated records cannot lose synthetic labels, validation evidence, human review, or non-authority claims.",
      ),
    ];
  }
  return [];
}

function validateGenerationBoundary(
  value: Record<string, unknown>,
): ForgeSecurityIssue[] {
  const issues: ForgeSecurityIssue[] = [];
  if (
    value.deterministic !== true ||
    value.allRecordsValidated !== true ||
    value.humanReviewRequired !== true ||
    value.repositoryWrite !== "not-performed" ||
    value.networkUsed !== false ||
    value.providerUsed !== false ||
    value.canonAcceptance !== "not-granted" ||
    value.mappingApproval !== "not-granted" ||
    value.clinicalUse !== "not-authorized" ||
    value.providerPreference !== "none" ||
    value.connectorActivation !== "not-granted" ||
    value.productionReadiness !== "not-established" ||
    !Array.isArray(value.records)
  ) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "generationBoundary",
        "Synthetic generation must remain deterministic, validated, non-production, non-mutating, provider-free, and non-authoritative.",
      ),
    );
    return issues;
  }
  if (value.generatedCount !== value.records.length) {
    issues.push(
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "generatedCount",
        "Generated-count evidence must equal the materialized record count.",
      ),
    );
  }
  value.records.forEach((record, index) => {
    issues.push(...validateGeneratedRecord(record, `records[${index}]`));
  });
  return issues;
}

export function validateForgeToolSecurityPostconditions(
  toolId: ForgeRuntimeEnabledToolId,
  value: unknown,
): ForgeSecurityIssue[] {
  if (!isRecord(value)) {
    return [
      issue(
        FORGE_SECURITY_ERROR_CODES.postconditionFailed,
        "result",
        "Forge tool results must remain structured public evidence.",
      ),
    ];
  }

  const issues = validateNonAuthority(value);
  if (SEARCH_TOOL_IDS.has(toolId)) {
    issues.push(...validateSearchOutput(toolId, value));
  }

  switch (toolId) {
    case "forge.validate.content":
      if (
        value.humanReviewRequired !== true ||
        value.canonAcceptance !== "not-granted"
      ) {
        issues.push(
          issue(
            FORGE_SECURITY_ERROR_CODES.postconditionFailed,
            "validationBoundary",
            "Content validation cannot approve canon or remove human review.",
          ),
        );
      }
      if (value.provenance !== undefined) {
        issues.push(...validateProvenance(value.provenance, "provenance"));
      }
      break;
    case "forge.inspect.quest-schema":
      if (
        value.humanReviewRequiredForChange !== true ||
        value.provesSemanticCompleteness !== false ||
        value.provesClinicalSafety !== false ||
        value.canonAcceptance !== "not-granted"
      ) {
        issues.push(
          issue(
            FORGE_SECURITY_ERROR_CODES.postconditionFailed,
            "schemaBoundary",
            "Schema inspection cannot approve changes, prove completeness, or claim clinical safety.",
          ),
        );
      }
      issues.push(...validateProvenance(value.provenance, "provenance"));
      break;
    case "forge.validate.quest":
      if (
        value.humanReviewRequired !== true ||
        value.questCompletion !== "not-granted" ||
        value.rewardGrant !== "not-granted" ||
        value.canonAcceptance !== "not-granted"
      ) {
        issues.push(
          issue(
            FORGE_SECURITY_ERROR_CODES.postconditionFailed,
            "questBoundary",
            "Quest validation cannot complete gameplay, grant rewards, approve canon, or remove human review.",
          ),
        );
      }
      if (value.provenance !== undefined) {
        issues.push(...validateProvenance(value.provenance, "provenance"));
      }
      break;
    case "forge.validate.mapping-draft":
      issues.push(...validateMappingBoundary(value));
      if (value.provenance !== undefined) {
        issues.push(...validateProvenance(value.provenance, "provenance"));
      }
      break;
    case "forge.generate.synthetic-data":
      issues.push(...validateGenerationBoundary(value));
      break;
  }

  return issues;
}
