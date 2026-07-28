import {
  FORGE_CONTRACT_VERSION,
  FORGE_REGISTRY_REVISION,
} from "./contracts.js";
import {
  FORGE_EXECUTION_CONTRACT_REVISION,
  FORGE_INVOCATION_RECEIPT_SCHEMA_ID,
  FORGE_STABLE_ERROR_SCHEMA_ID,
} from "./execution-contracts.js";
import { FORGE_RUNTIME_REGISTRY_REVISION } from "./runtime-registry.js";
import { FORGE_SOURCE_CATALOGUE_REVISION } from "./source-contracts.js";
import { FORGE_MCP_PROTOCOL_VERSION } from "./transport-contracts.js";

export const FORGE_AGENT_SECURITY_CONTRACT_REVISION = "1" as const;
export const FORGE_OPERABILITY_CONTRACT_REVISION = "1" as const;
export const FORGE_COMPATIBILITY_MANIFEST_REVISION = "1" as const;

export const FORGE_AGENT_SECURITY_SCENARIO_IDS = [
  "path-traversal",
  "symlink-escape",
  "arbitrary-root-selection",
  "shell-execution",
  "network-access",
  "dynamic-module-loading",
  "registry-mutation",
  "scope-mutation",
  "confused-deputy",
  "source-evidence-suppression",
  "oversized-input",
  "timeout",
  "cancellation",
  "receipt-leakage",
  "synthetic-label-removal",
  "mapping-self-approval",
  "funding-influence",
  "protected-source-access",
] as const;

export type ForgeAgentSecurityScenarioId =
  (typeof FORGE_AGENT_SECURITY_SCENARIO_IDS)[number];

export interface ForgeAgentSecurityScenarioContract {
  readonly id: ForgeAgentSecurityScenarioId;
  readonly revision: typeof FORGE_AGENT_SECURITY_CONTRACT_REVISION;
  readonly expectedBehavior:
    | "reject-before-operation"
    | "reject-during-source-resolution"
    | "reject-security-postcondition"
    | "fail-closed-integrity"
    | "preserve-visible-evidence"
    | "suppress-cancelled-response"
    | "return-stable-bounded-error";
  readonly evidenceClass:
    | "contract-validator"
    | "direct-runtime-test"
    | "transport-test"
    | "source-isolation-test"
    | "static-production-source-audit";
  readonly publicOrSyntheticOnly: true;
  readonly canExpandAuthority: false;
  readonly canSuppressEvidence: false;
}

const scenario = (
  id: ForgeAgentSecurityScenarioId,
  expectedBehavior: ForgeAgentSecurityScenarioContract["expectedBehavior"],
  evidenceClass: ForgeAgentSecurityScenarioContract["evidenceClass"],
): ForgeAgentSecurityScenarioContract => ({
  id,
  revision: FORGE_AGENT_SECURITY_CONTRACT_REVISION,
  expectedBehavior,
  evidenceClass,
  publicOrSyntheticOnly: true,
  canExpandAuthority: false,
  canSuppressEvidence: false,
});

export const FORGE_AGENT_SECURITY_MATRIX: readonly ForgeAgentSecurityScenarioContract[] =
  [
    scenario(
      "path-traversal",
      "reject-during-source-resolution",
      "source-isolation-test",
    ),
    scenario(
      "symlink-escape",
      "reject-during-source-resolution",
      "source-isolation-test",
    ),
    scenario(
      "arbitrary-root-selection",
      "reject-before-operation",
      "direct-runtime-test",
    ),
    scenario(
      "shell-execution",
      "reject-before-operation",
      "static-production-source-audit",
    ),
    scenario(
      "network-access",
      "reject-before-operation",
      "static-production-source-audit",
    ),
    scenario(
      "dynamic-module-loading",
      "reject-before-operation",
      "static-production-source-audit",
    ),
    scenario(
      "registry-mutation",
      "fail-closed-integrity",
      "contract-validator",
    ),
    scenario("scope-mutation", "fail-closed-integrity", "contract-validator"),
    scenario(
      "confused-deputy",
      "reject-security-postcondition",
      "direct-runtime-test",
    ),
    scenario(
      "source-evidence-suppression",
      "preserve-visible-evidence",
      "direct-runtime-test",
    ),
    scenario(
      "oversized-input",
      "reject-before-operation",
      "direct-runtime-test",
    ),
    scenario("timeout", "return-stable-bounded-error", "direct-runtime-test"),
    scenario("cancellation", "suppress-cancelled-response", "transport-test"),
    scenario(
      "receipt-leakage",
      "reject-security-postcondition",
      "direct-runtime-test",
    ),
    scenario(
      "synthetic-label-removal",
      "reject-security-postcondition",
      "direct-runtime-test",
    ),
    scenario(
      "mapping-self-approval",
      "reject-security-postcondition",
      "direct-runtime-test",
    ),
    scenario(
      "funding-influence",
      "fail-closed-integrity",
      "contract-validator",
    ),
    scenario(
      "protected-source-access",
      "reject-during-source-resolution",
      "source-isolation-test",
    ),
  ];

export interface ForgeCompatibilityMigrationRecord {
  readonly id: string;
  readonly revision: "1";
  readonly fromRuntimeRevision: "1" | "2" | "3" | "4";
  readonly toRuntimeRevision: "2" | "3" | "4";
  readonly classification: "additive-tool-activation" | "execution-envelope";
  readonly addedToolIds: readonly string[];
  readonly removedToolIds: readonly [];
  readonly acceptedToolSchemaChanged: false;
  readonly authorityExpanded: false;
  readonly migrationRequiredForConsumers: boolean;
}

export interface ForgeCompatibilityManifest {
  readonly revision: typeof FORGE_COMPATIBILITY_MANIFEST_REVISION;
  readonly contractVersion: typeof FORGE_CONTRACT_VERSION;
  readonly acceptedRegistryRevision: typeof FORGE_REGISTRY_REVISION;
  readonly runtimeRegistryRevision: typeof FORGE_RUNTIME_REGISTRY_REVISION;
  readonly executionContractRevision: typeof FORGE_EXECUTION_CONTRACT_REVISION;
  readonly sourceCatalogueRevision: typeof FORGE_SOURCE_CATALOGUE_REVISION;
  readonly protocolVersion: typeof FORGE_MCP_PROTOCOL_VERSION;
  readonly receiptSchemaId: typeof FORGE_INVOCATION_RECEIPT_SCHEMA_ID;
  readonly errorSchemaId: typeof FORGE_STABLE_ERROR_SCHEMA_ID;
  readonly status: "pre-stable-exact-revision";
  readonly unknownRevisionBehavior: "fail-closed";
  readonly breakingChangeRequiresMigration: true;
  readonly authorityExpansionRequiresGoverningDecision: true;
  readonly migrations: readonly ForgeCompatibilityMigrationRecord[];
}

export const FORGE_COMPATIBILITY_MANIFEST: ForgeCompatibilityManifest = {
  revision: FORGE_COMPATIBILITY_MANIFEST_REVISION,
  contractVersion: FORGE_CONTRACT_VERSION,
  acceptedRegistryRevision: FORGE_REGISTRY_REVISION,
  runtimeRegistryRevision: FORGE_RUNTIME_REGISTRY_REVISION,
  executionContractRevision: FORGE_EXECUTION_CONTRACT_REVISION,
  sourceCatalogueRevision: FORGE_SOURCE_CATALOGUE_REVISION,
  protocolVersion: FORGE_MCP_PROTOCOL_VERSION,
  receiptSchemaId: FORGE_INVOCATION_RECEIPT_SCHEMA_ID,
  errorSchemaId: FORGE_STABLE_ERROR_SCHEMA_ID,
  status: "pre-stable-exact-revision",
  unknownRevisionBehavior: "fail-closed",
  breakingChangeRequiresMigration: true,
  authorityExpansionRequiresGoverningDecision: true,
  migrations: [
    {
      id: "forge.runtime.1-to-2",
      revision: "1",
      fromRuntimeRevision: "1",
      toRuntimeRevision: "2",
      classification: "additive-tool-activation",
      addedToolIds: ["forge.search.architecture", "forge.search.decision"],
      removedToolIds: [],
      acceptedToolSchemaChanged: false,
      authorityExpanded: false,
      migrationRequiredForConsumers: true,
    },
    {
      id: "forge.runtime.2-to-3",
      revision: "1",
      fromRuntimeRevision: "2",
      toRuntimeRevision: "3",
      classification: "additive-tool-activation",
      addedToolIds: [
        "forge.search.public-standards",
        "forge.validate.mapping-draft",
        "forge.search.synthetic-connector-fixtures",
      ],
      removedToolIds: [],
      acceptedToolSchemaChanged: false,
      authorityExpanded: false,
      migrationRequiredForConsumers: true,
    },
    {
      id: "forge.runtime.3-to-4",
      revision: "1",
      fromRuntimeRevision: "3",
      toRuntimeRevision: "4",
      classification: "additive-tool-activation",
      addedToolIds: ["forge.generate.synthetic-data"],
      removedToolIds: [],
      acceptedToolSchemaChanged: false,
      authorityExpanded: false,
      migrationRequiredForConsumers: true,
    },
    {
      id: "forge.execution.envelope-v1",
      revision: "1",
      fromRuntimeRevision: "4",
      toRuntimeRevision: "4",
      classification: "execution-envelope",
      addedToolIds: [],
      removedToolIds: [],
      acceptedToolSchemaChanged: false,
      authorityExpanded: false,
      migrationRequiredForConsumers: true,
    },
  ],
};

export interface ForgeOperabilityContract {
  readonly revision: typeof FORGE_OPERABILITY_CONTRACT_REVISION;
  readonly application: "apps/mcp-forge";
  readonly runtimeMode: "local-stdio";
  readonly repositoryDiscovery: "ancestor-marker-search";
  readonly supportedWorkingDirectory: "repository-root-or-descendant";
  readonly buildCommand: "pnpm --filter @calypsos-promise/mcp-forge build";
  readonly startCommand: "pnpm --filter @calypsos-promise/mcp-forge start";
  readonly focusedValidationCommand: "pnpm --filter @calypsos-promise/mcp-forge test";
  readonly fullValidationCommand: "pnpm check";
  readonly cleanStartupRequiresCredentials: false;
  readonly cleanStartupRequiresNetwork: false;
  readonly cleanStartupRequiresProvider: false;
  readonly cleanStartupRequiresDatabase: false;
  readonly cleanStartupRequiresRemoteEndpoint: false;
  readonly stdoutProtocolOnly: true;
  readonly stderrDiagnosticsOnly: true;
  readonly ordinaryContributionRequiresMcp: false;
  readonly asterPackageDependency: false;
  readonly issue50ActivationState: "not-triggered";
  readonly providerIndependent: true;
}

export const FORGE_OPERABILITY_CONTRACT: ForgeOperabilityContract = {
  revision: FORGE_OPERABILITY_CONTRACT_REVISION,
  application: "apps/mcp-forge",
  runtimeMode: "local-stdio",
  repositoryDiscovery: "ancestor-marker-search",
  supportedWorkingDirectory: "repository-root-or-descendant",
  buildCommand: "pnpm --filter @calypsos-promise/mcp-forge build",
  startCommand: "pnpm --filter @calypsos-promise/mcp-forge start",
  focusedValidationCommand: "pnpm --filter @calypsos-promise/mcp-forge test",
  fullValidationCommand: "pnpm check",
  cleanStartupRequiresCredentials: false,
  cleanStartupRequiresNetwork: false,
  cleanStartupRequiresProvider: false,
  cleanStartupRequiresDatabase: false,
  cleanStartupRequiresRemoteEndpoint: false,
  stdoutProtocolOnly: true,
  stderrDiagnosticsOnly: true,
  ordinaryContributionRequiresMcp: false,
  asterPackageDependency: false,
  issue50ActivationState: "not-triggered",
  providerIndependent: true,
};

export const FORGE_AGENT_SECURITY_VALIDATION_CODES = {
  duplicateScenario: "forge.security.scenario-duplicate",
  missingScenario: "forge.security.scenario-missing",
  scenarioBoundary: "forge.security.scenario-boundary",
  compatibilityIdentity: "forge.compatibility.identity",
  compatibilityPolicy: "forge.compatibility.policy",
  migrationInvalid: "forge.compatibility.migration-invalid",
  operabilityBoundary: "forge.operability.boundary",
} as const;

export type ForgeAgentSecurityValidationCode =
  (typeof FORGE_AGENT_SECURITY_VALIDATION_CODES)[keyof typeof FORGE_AGENT_SECURITY_VALIDATION_CODES];

export interface ForgeAgentSecurityValidationIssue {
  readonly code: ForgeAgentSecurityValidationCode;
  readonly path: string;
  readonly message: string;
}

const issue = (
  code: ForgeAgentSecurityValidationCode,
  path: string,
  message: string,
): ForgeAgentSecurityValidationIssue => ({ code, path, message });

export function validateForgeAgentSecurityOperability(
  matrix: readonly ForgeAgentSecurityScenarioContract[] = FORGE_AGENT_SECURITY_MATRIX,
  compatibility: ForgeCompatibilityManifest = FORGE_COMPATIBILITY_MANIFEST,
  operability: ForgeOperabilityContract = FORGE_OPERABILITY_CONTRACT,
): ForgeAgentSecurityValidationIssue[] {
  const issues: ForgeAgentSecurityValidationIssue[] = [];
  const seen = new Set<string>();

  matrix.forEach((entry, index) => {
    const path = `securityMatrix[${index}]`;
    if (seen.has(entry.id)) {
      issues.push(
        issue(
          FORGE_AGENT_SECURITY_VALIDATION_CODES.duplicateScenario,
          `${path}.id`,
          "Agent-security scenario identities must remain unique.",
        ),
      );
    }
    seen.add(entry.id);
    if (
      entry.revision !== FORGE_AGENT_SECURITY_CONTRACT_REVISION ||
      entry.publicOrSyntheticOnly !== true ||
      entry.canExpandAuthority !== false ||
      entry.canSuppressEvidence !== false
    ) {
      issues.push(
        issue(
          FORGE_AGENT_SECURITY_VALIDATION_CODES.scenarioBoundary,
          path,
          "Every adversarial scenario must remain public-or-synthetic, evidence-preserving, and non-authoritative.",
        ),
      );
    }
  });

  for (const id of FORGE_AGENT_SECURITY_SCENARIO_IDS) {
    if (!seen.has(id)) {
      issues.push(
        issue(
          FORGE_AGENT_SECURITY_VALIDATION_CODES.missingScenario,
          "securityMatrix",
          `Missing adversarial scenario ${id}.`,
        ),
      );
    }
  }

  if (
    compatibility.revision !== FORGE_COMPATIBILITY_MANIFEST_REVISION ||
    compatibility.contractVersion !== FORGE_CONTRACT_VERSION ||
    compatibility.acceptedRegistryRevision !== FORGE_REGISTRY_REVISION ||
    compatibility.runtimeRegistryRevision !== FORGE_RUNTIME_REGISTRY_REVISION ||
    compatibility.executionContractRevision !==
      FORGE_EXECUTION_CONTRACT_REVISION ||
    compatibility.sourceCatalogueRevision !== FORGE_SOURCE_CATALOGUE_REVISION ||
    compatibility.protocolVersion !== FORGE_MCP_PROTOCOL_VERSION ||
    compatibility.receiptSchemaId !== FORGE_INVOCATION_RECEIPT_SCHEMA_ID ||
    compatibility.errorSchemaId !== FORGE_STABLE_ERROR_SCHEMA_ID
  ) {
    issues.push(
      issue(
        FORGE_AGENT_SECURITY_VALIDATION_CODES.compatibilityIdentity,
        "compatibility",
        "Compatibility identities must match the active public contracts exactly.",
      ),
    );
  }
  if (
    compatibility.status !== "pre-stable-exact-revision" ||
    compatibility.unknownRevisionBehavior !== "fail-closed" ||
    compatibility.breakingChangeRequiresMigration !== true ||
    compatibility.authorityExpansionRequiresGoverningDecision !== true
  ) {
    issues.push(
      issue(
        FORGE_AGENT_SECURITY_VALIDATION_CODES.compatibilityPolicy,
        "compatibility",
        "Compatibility must remain exact-revision, fail-closed, migration-bearing, and governance-gated for authority changes.",
      ),
    );
  }
  for (const [index, migration] of compatibility.migrations.entries()) {
    if (
      migration.revision !== "1" ||
      migration.removedToolIds.length !== 0 ||
      migration.acceptedToolSchemaChanged !== false ||
      migration.authorityExpanded !== false ||
      migration.migrationRequiredForConsumers !== true
    ) {
      issues.push(
        issue(
          FORGE_AGENT_SECURITY_VALIDATION_CODES.migrationInvalid,
          `compatibility.migrations[${index}]`,
          "Migration records cannot hide removal, schema replacement, authority expansion, or consumer migration obligations.",
        ),
      );
    }
  }

  if (
    operability.revision !== FORGE_OPERABILITY_CONTRACT_REVISION ||
    operability.application !== "apps/mcp-forge" ||
    operability.runtimeMode !== "local-stdio" ||
    operability.repositoryDiscovery !== "ancestor-marker-search" ||
    operability.supportedWorkingDirectory !== "repository-root-or-descendant" ||
    operability.cleanStartupRequiresCredentials !== false ||
    operability.cleanStartupRequiresNetwork !== false ||
    operability.cleanStartupRequiresProvider !== false ||
    operability.cleanStartupRequiresDatabase !== false ||
    operability.cleanStartupRequiresRemoteEndpoint !== false ||
    operability.stdoutProtocolOnly !== true ||
    operability.stderrDiagnosticsOnly !== true ||
    operability.ordinaryContributionRequiresMcp !== false ||
    operability.asterPackageDependency !== false ||
    operability.issue50ActivationState !== "not-triggered" ||
    operability.providerIndependent !== true
  ) {
    issues.push(
      issue(
        FORGE_AGENT_SECURITY_VALIDATION_CODES.operabilityBoundary,
        "operability",
        "Forge operability must remain local, credential-free, provider-independent, repository-discovered, and optional.",
      ),
    );
  }

  return issues;
}
