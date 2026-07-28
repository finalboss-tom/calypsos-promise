import {
  FORGE_ACCEPTED_TOOL_IDS,
  FORGE_APPLICATION_ID,
  FORGE_CONTRACT_VERSION,
  FORGE_INFORMATION_CLASS_IDS,
  FORGE_OPERATION_IDS,
  FORGE_PROHIBITED_CAPABILITY_IDS,
  FORGE_REGISTRY_REVISION,
  FORGE_RISK_CLASS_IDS,
  FORGE_TOOL_LIFECYCLE_STATES,
  FORGE_TRANSPORT_EXPOSURE_STATES,
  type ForgeBaselineContract,
  type ForgeBoundaryContract,
  type ForgeResourceLimits,
  type ForgeRiskClassContract,
  type ForgeSourceClassContract,
  type ForgeToolContract,
} from "./contracts.js";

export const FORGE_VALIDATION_CODES = {
  applicationId: "forge.boundary.application-id",
  contractVersion: "forge.boundary.contract-version",
  registryRevision: "forge.boundary.registry-revision",
  registryAuthority: "forge.boundary.registry-authority",
  sourceAuthority: "forge.boundary.source-authority",
  mcpOptional: "forge.boundary.mcp-optional",
  untrustedAuthority: "forge.boundary.untrusted-authority",
  authorityMustBeFalse: "forge.boundary.authority-must-be-false",
  fundingMustNotControl: "forge.boundary.funding-must-not-control",
  prohibitedCatalogue: "forge.boundary.prohibited-catalogue",
  duplicateSourceClass: "forge.source.duplicate",
  unexpectedSourceClass: "forge.source.unexpected",
  publicOnly: "forge.source.public-only",
  serverOwnedRoot: "forge.source.server-owned-root",
  sourceSensitiveContent: "forge.source.sensitive-content-forbidden",
  duplicateRiskClass: "forge.risk.duplicate",
  unexpectedRiskClass: "forge.risk.unexpected",
  riskAuthority: "forge.risk.authority-forbidden",
  riskOperation: "forge.risk.operation-invalid",
  riskLimits: "forge.risk.limits-invalid",
  duplicateTool: "forge.tool.duplicate",
  missingTool: "forge.tool.missing-accepted",
  unexpectedTool: "forge.tool.unexpected",
  toolRevision: "forge.tool.revision",
  toolRiskClass: "forge.tool.risk-class",
  toolLifecycle: "forge.tool.lifecycle",
  toolOperation: "forge.tool.operation",
  toolSourceClass: "forge.tool.source-class",
  toolTransport: "forge.tool.transport-exposure",
  toolSchema: "forge.tool.schema",
  toolReceipt: "forge.tool.receipt-schema",
  toolError: "forge.tool.error-schema",
  toolAuthority: "forge.tool.authority-profile",
  toolLimits: "forge.tool.limits-invalid",
  toolCompatibility: "forge.tool.compatibility",
  toolSelfApproval: "forge.tool.self-approval",
  toolProhibitedCapability: "forge.tool.prohibited-capability",
} as const;

export type ForgeValidationCode =
  (typeof FORGE_VALIDATION_CODES)[keyof typeof FORGE_VALIDATION_CODES];

export interface ForgeValidationIssue {
  readonly code: ForgeValidationCode;
  readonly path: string;
  readonly message: string;
}

function issue(
  code: ForgeValidationCode,
  path: string,
  message: string,
): ForgeValidationIssue {
  return { code, path, message };
}

function sameStringSet(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  const sortedActual = [...actual].sort();
  const sortedExpected = [...expected].sort();
  return (
    sortedActual.length === sortedExpected.length &&
    sortedActual.every((value, index) => value === sortedExpected[index])
  );
}

function validateLimits(
  limits: ForgeResourceLimits,
  path: string,
  allowZero: boolean,
): ForgeValidationIssue[] {
  const issues: ForgeValidationIssue[] = [];
  const entries = Object.entries(limits) as [
    keyof ForgeResourceLimits,
    number,
  ][];
  for (const [name, value] of entries) {
    const valid =
      Number.isInteger(value) && (allowZero ? value >= 0 : value > 0);
    if (!valid) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolLimits,
          `${path}.${name}`,
          `${name} must be ${allowZero ? "a non-negative" : "a positive"} integer.`,
        ),
      );
    }
  }
  return issues;
}

export function validateForgeBoundary(
  boundary: ForgeBoundaryContract,
): ForgeValidationIssue[] {
  const issues: ForgeValidationIssue[] = [];

  if (boundary.applicationId !== FORGE_APPLICATION_ID) {
    issues.push(
      issue(
        FORGE_VALIDATION_CODES.applicationId,
        "boundary.applicationId",
        "Forge application identity must remain exact.",
      ),
    );
  }
  if (boundary.contractVersion !== FORGE_CONTRACT_VERSION) {
    issues.push(
      issue(
        FORGE_VALIDATION_CODES.contractVersion,
        "boundary.contractVersion",
        "Forge contract version must remain exact.",
      ),
    );
  }
  if (boundary.registryRevision !== FORGE_REGISTRY_REVISION) {
    issues.push(
      issue(
        FORGE_VALIDATION_CODES.registryRevision,
        "boundary.registryRevision",
        "Forge registry revision must remain exact.",
      ),
    );
  }
  if (boundary.registryAuthority !== "server-owned") {
    issues.push(
      issue(
        FORGE_VALIDATION_CODES.registryAuthority,
        "boundary.registryAuthority",
        "Only the server may own the tool registry.",
      ),
    );
  }
  if (boundary.sourceAuthority !== "server-owned-allowlist") {
    issues.push(
      issue(
        FORGE_VALIDATION_CODES.sourceAuthority,
        "boundary.sourceAuthority",
        "Source authority must remain a server-owned allowlist.",
      ),
    );
  }
  if (boundary.ordinaryContributionRequiresMcp !== false) {
    issues.push(
      issue(
        FORGE_VALIDATION_CODES.mcpOptional,
        "boundary.ordinaryContributionRequiresMcp",
        "Ordinary repository contribution must remain complete without MCP.",
      ),
    );
  }

  for (const [name, value] of Object.entries({
    untrustedContentCanModifyRegistry:
      boundary.untrustedContentCanModifyRegistry,
    untrustedContentCanExpandResources:
      boundary.untrustedContentCanExpandResources,
    untrustedContentCanAuthorizeToolCalls:
      boundary.untrustedContentCanAuthorizeToolCalls,
  })) {
    if (value !== false) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.untrustedAuthority,
          `boundary.${name}`,
          "Untrusted content cannot create or expand tool authority.",
        ),
      );
    }
  }

  for (const [name, value] of Object.entries(boundary.authority)) {
    if (value !== false) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.authorityMustBeFalse,
          `boundary.authority.${name}`,
          "Forge authority boundary flags must remain literal false.",
        ),
      );
    }
  }

  for (const [name, value] of Object.entries(boundary.funding)) {
    if (value !== false) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.fundingMustNotControl,
          `boundary.funding.${name}`,
          "Funding, credits, providers, and sponsors cannot control Forge authority or outcomes.",
        ),
      );
    }
  }

  if (
    !sameStringSet(
      boundary.prohibitedCapabilities,
      FORGE_PROHIBITED_CAPABILITY_IDS,
    )
  ) {
    issues.push(
      issue(
        FORGE_VALIDATION_CODES.prohibitedCatalogue,
        "boundary.prohibitedCapabilities",
        "The complete prohibited capability catalogue must remain explicit.",
      ),
    );
  }

  return issues;
}

export function validateForgeSourceClasses(
  sourceClasses: readonly ForgeSourceClassContract[],
): ForgeValidationIssue[] {
  const issues: ForgeValidationIssue[] = [];
  const seen = new Set<string>();

  for (const [index, sourceClass] of sourceClasses.entries()) {
    const path = `sourceClasses[${index}]`;
    if (seen.has(sourceClass.id)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.duplicateSourceClass,
          `${path}.id`,
          "Source class IDs must be unique.",
        ),
      );
    }
    seen.add(sourceClass.id);
    if (!FORGE_INFORMATION_CLASS_IDS.includes(sourceClass.id)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.unexpectedSourceClass,
          `${path}.id`,
          "Only accepted public or synthetic source classes are allowed.",
        ),
      );
    }
    if (sourceClass.publicOnly !== true) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.publicOnly,
          `${path}.publicOnly`,
          "Every Sprint 7 source class must be public-only.",
        ),
      );
    }
    if (sourceClass.requiresServerOwnedRoot !== true) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.serverOwnedRoot,
          `${path}.requiresServerOwnedRoot`,
          "Every source class must require a server-owned root.",
        ),
      );
    }
    if (
      sourceClass.canContainPersonalData !== false ||
      sourceClass.canContainCredentials !== false ||
      sourceClass.canContainProtectedOperationalEvidence !== false
    ) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.sourceSensitiveContent,
          path,
          "Source classes cannot authorize personal data, credentials, or protected operational evidence.",
        ),
      );
    }
  }

  for (const id of FORGE_INFORMATION_CLASS_IDS) {
    if (!seen.has(id)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.unexpectedSourceClass,
          "sourceClasses",
          `Missing accepted source class ${id}.`,
        ),
      );
    }
  }

  return issues;
}

export function validateForgeRiskClasses(
  riskClasses: readonly ForgeRiskClassContract[],
): ForgeValidationIssue[] {
  const issues: ForgeValidationIssue[] = [];
  const seen = new Set<string>();

  for (const [index, riskClass] of riskClasses.entries()) {
    const path = `riskClasses[${index}]`;
    if (seen.has(riskClass.id)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.duplicateRiskClass,
          `${path}.id`,
          "Risk class IDs must be unique.",
        ),
      );
    }
    seen.add(riskClass.id);
    if (!FORGE_RISK_CLASS_IDS.includes(riskClass.id)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.unexpectedRiskClass,
          `${path}.id`,
          "Only accepted risk classes are allowed.",
        ),
      );
    }
    if (
      riskClass.canMutate !== false ||
      riskClass.canUseNetwork !== false ||
      riskClass.canAccessPrivateData !== false ||
      riskClass.canAccessCredentials !== false ||
      riskClass.resultAuthority !== "none"
    ) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.riskAuthority,
          path,
          "Risk classes cannot grant mutation, network, private-data, credential, or result authority.",
        ),
      );
    }
    if (
      riskClass.allowedOperations.some(
        (operation) => !FORGE_OPERATION_IDS.includes(operation),
      )
    ) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.riskOperation,
          `${path}.allowedOperations`,
          "Risk classes may contain only accepted operation IDs.",
        ),
      );
    }
    issues.push(
      ...validateLimits(
        riskClass.defaultLimits,
        `${path}.defaultLimits`,
        riskClass.id === "unsupported-or-prohibited",
      ),
    );
  }

  for (const id of FORGE_RISK_CLASS_IDS) {
    if (!seen.has(id)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.unexpectedRiskClass,
          "riskClasses",
          `Missing accepted risk class ${id}.`,
        ),
      );
    }
  }

  return issues;
}

export function validateForgeToolRegistry(
  tools: readonly ForgeToolContract[],
  sourceClasses: readonly ForgeSourceClassContract[],
  riskClasses: readonly ForgeRiskClassContract[],
): ForgeValidationIssue[] {
  const issues: ForgeValidationIssue[] = [];
  const seen = new Set<string>();
  const sourceIds = new Set(sourceClasses.map((sourceClass) => sourceClass.id));
  const riskById = new Map(
    riskClasses.map((riskClass) => [riskClass.id, riskClass]),
  );

  for (const [index, tool] of tools.entries()) {
    const path = `tools[${index}]`;
    if (seen.has(tool.id)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.duplicateTool,
          `${path}.id`,
          "Tool IDs must be unique.",
        ),
      );
    }
    seen.add(tool.id);
    if (
      !FORGE_ACCEPTED_TOOL_IDS.includes(
        tool.id as (typeof FORGE_ACCEPTED_TOOL_IDS)[number],
      )
    ) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.unexpectedTool,
          `${path}.id`,
          "Only accepted Sprint 7 tool identities may appear in the initial registry.",
        ),
      );
    }
    if (tool.revision !== "1") {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolRevision,
          `${path}.revision`,
          "Initial tool revisions must be exact revision 1.",
        ),
      );
    }
    if (!FORGE_RISK_CLASS_IDS.includes(tool.riskClass)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolRiskClass,
          `${path}.riskClass`,
          "Tool risk class must be accepted.",
        ),
      );
    }
    if (!FORGE_TOOL_LIFECYCLE_STATES.includes(tool.lifecycle)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolLifecycle,
          `${path}.lifecycle`,
          "Tool lifecycle must use the accepted vocabulary.",
        ),
      );
    }
    if (!FORGE_OPERATION_IDS.includes(tool.operation)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolOperation,
          `${path}.operation`,
          "Tool operation must use the accepted vocabulary.",
        ),
      );
    }
    const risk = riskById.get(tool.riskClass);
    if (!risk || !risk.allowedOperations.includes(tool.operation)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolOperation,
          `${path}.operation`,
          "Tool operation must be allowed by its risk class.",
        ),
      );
    }
    for (const sourceClass of tool.sourceClasses) {
      if (!sourceIds.has(sourceClass)) {
        issues.push(
          issue(
            FORGE_VALIDATION_CODES.toolSourceClass,
            `${path}.sourceClasses`,
            `Unknown source class ${sourceClass}.`,
          ),
        );
      }
    }
    if (!FORGE_TRANSPORT_EXPOSURE_STATES.includes(tool.transportExposure)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolTransport,
          `${path}.transportExposure`,
          "Tool transport exposure must use the accepted vocabulary.",
        ),
      );
    }
    if (
      tool.lifecycle === "planned" &&
      tool.transportExposure !== "not-exposed"
    ) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolTransport,
          `${path}.transportExposure`,
          "Contract-only planned tools cannot be exposed through transport.",
        ),
      );
    }
    if (!tool.inputSchemaId || !tool.outputSchemaId) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolSchema,
          path,
          "Every tool requires explicit input and output schema identities.",
        ),
      );
    }
    if (tool.receiptSchemaId !== "forge.invocation-receipt.v1") {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolReceipt,
          `${path}.receiptSchemaId`,
          "Every tool must use the bounded Forge invocation receipt contract.",
        ),
      );
    }
    if (tool.errorSchemaId !== "forge.error.v1") {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolError,
          `${path}.errorSchemaId`,
          "Every tool must use the public-safe Forge error contract.",
        ),
      );
    }
    if (tool.authorityProfileId !== "forge.non-authority.v1") {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolAuthority,
          `${path}.authorityProfileId`,
          "Every tool must retain the non-authority profile.",
        ),
      );
    }
    issues.push(
      ...validateLimits(
        tool.limits,
        `${path}.limits`,
        tool.riskClass === "unsupported-or-prohibited",
      ),
    );
    if (
      tool.compatibility.status !== "pre-stable-exact-revision" ||
      tool.compatibility.unknownChangeBehavior !== "fail-closed" ||
      tool.compatibility.breakingChangeRequiresMigration !== true ||
      tool.compatibility.authorityExpansionRequiresGoverningDecision !== true
    ) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolCompatibility,
          `${path}.compatibility`,
          "Tool compatibility must remain exact, migration-bearing, and fail-closed.",
        ),
      );
    }
    if (
      tool.resultCanCreateAuthority !== false ||
      tool.resultCanApproveItself !== false
    ) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolSelfApproval,
          path,
          "Tool results cannot create authority or approve themselves.",
        ),
      );
    }
    if (tool.allowedProhibitedCapabilities.length !== 0) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.toolProhibitedCapability,
          `${path}.allowedProhibitedCapabilities`,
          "No tool may allow a prohibited capability.",
        ),
      );
    }
  }

  for (const id of FORGE_ACCEPTED_TOOL_IDS) {
    if (!seen.has(id)) {
      issues.push(
        issue(
          FORGE_VALIDATION_CODES.missingTool,
          "tools",
          `Missing accepted tool contract ${id}.`,
        ),
      );
    }
  }

  return issues;
}

export function validateForgeBaseline(
  baseline: ForgeBaselineContract,
): ForgeValidationIssue[] {
  return [
    ...validateForgeBoundary(baseline.boundary),
    ...validateForgeSourceClasses(baseline.sourceClasses),
    ...validateForgeRiskClasses(baseline.riskClasses),
    ...validateForgeToolRegistry(
      baseline.tools,
      baseline.sourceClasses,
      baseline.riskClasses,
    ),
  ];
}
