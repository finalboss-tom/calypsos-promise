import { FORGE_TOOL_REGISTRY, type ForgeToolContract } from "./contracts.js";
import {
  FORGE_DOCUMENTATION_SEARCH_TOOL_DESCRIPTORS,
  FORGE_ENABLED_DOCUMENTATION_SEARCH_TOOL_IDS,
} from "./documentation-search-contracts.js";
import {
  FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS,
  FORGE_LORE_SCHEMA_TOOL_DESCRIPTORS,
} from "./lore-schema-contracts.js";
import {
  FORGE_ENABLED_STANDARDS_MAPPING_TOOL_IDS,
  FORGE_STANDARDS_MAPPING_TOOL_DESCRIPTORS,
} from "./standards-mapping-contracts.js";
import { FORGE_SYNTHETIC_GENERATION_TOOL_DESCRIPTOR } from "./synthetic-generation-contracts.js";
import {
  FORGE_INITIALIZE_RESULT,
  FORGE_TRANSPORT_BOUNDARY,
  type ForgeInitializeResult,
} from "./transport-contracts.js";

export const FORGE_RUNTIME_REGISTRY_REVISION = "4" as const;

export const FORGE_RUNTIME_ENABLED_TOOL_IDS = [
  ...FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS,
  ...FORGE_ENABLED_DOCUMENTATION_SEARCH_TOOL_IDS,
  FORGE_SYNTHETIC_GENERATION_TOOL_DESCRIPTOR.name,
  ...FORGE_ENABLED_STANDARDS_MAPPING_TOOL_IDS,
] as const;

export type ForgeRuntimeEnabledToolId =
  (typeof FORGE_RUNTIME_ENABLED_TOOL_IDS)[number];

export const FORGE_RUNTIME_TOOL_DESCRIPTORS = [
  ...FORGE_LORE_SCHEMA_TOOL_DESCRIPTORS,
  ...FORGE_DOCUMENTATION_SEARCH_TOOL_DESCRIPTORS,
  FORGE_SYNTHETIC_GENERATION_TOOL_DESCRIPTOR,
  ...FORGE_STANDARDS_MAPPING_TOOL_DESCRIPTORS,
] as const;

const ENABLED_IDS = new Set<string>(FORGE_RUNTIME_ENABLED_TOOL_IDS);

export const FORGE_RUNTIME_TOOL_REGISTRY: readonly ForgeToolContract[] =
  FORGE_TOOL_REGISTRY.map((tool) =>
    ENABLED_IDS.has(tool.id)
      ? {
          ...tool,
          lifecycle: "enabled",
          transportExposure: "local-stdio-only",
        }
      : tool,
  );

export const FORGE_RUNTIME_TRANSPORT_INSTRUCTIONS = [
  "Forge is a local public-and-synthetic contributor tool boundary.",
  "Exactly ten Sprint 7.1-7.9 lore, schema, architecture, decision, deterministic synthetic-generation, standards, mapping-draft, and synthetic-connector tools are enabled through a server-owned allowlist in accepted registry order.",
  "Exactly nine previously validated Sprint 7.1-7.6 tools remain enabled unchanged inside the ten-tool runtime.",
  "Exactly six Sprint 7.1-7.5 lore, schema, architecture, and decision tools remain unchanged inside that prior nine-tool baseline.",
  "Sprint 7.9 adds no tool identity and does not change runtime registry revision 4 or an accepted tool schema.",
  "All ten calls use one server-owned execution contract for request bytes, files scanned, results, output bytes, timeout, cancellation, per-tool concurrency, and serialized materialized memory.",
  "Before each real operation Forge verifies the integrity of its boundary, accepted registry, source catalogue, enabled identities, descriptors, runtime registry, and execution scopes.",
  "Every successful raw result must preserve the full non-authority profile, source evidence, visible partial state, and tool-specific safety claims before a receipt is created.",
  "Every scoped success or stable tool error includes a bounded invocation receipt without raw input, absolute host paths, environment values, internal traces, credentials, protected source material, or wall-clock timestamps.",
  "Caller cancellation suppresses the response rather than manufacturing a receipt, while timeouts return one stable public-safe tool error receipt.",
  "Forge compatibility remains pre-stable, exact-revision, migration-bearing, and fail-closed for unknown revisions; authority expansion requires a governing decision.",
  "Clean local startup requires no credentials, provider, network, database, remote endpoint, authentication service, queue, or scheduler.",
  "Synthetic generation is deterministic, immediately validates every result, and retains synthetic, non-production, credential-free, personal-data-free, and human-review-required labels.",
  "Generated quests and mapping drafts cannot self-approve, create canon, prove semantic equivalence, authorize clinical use, select a provider, activate a connector, mutate the repository, complete gameplay, grant rewards, or create institutional authority.",
  "Documentation and standards search expose exact provenance and no certification, completeness, or provider-preference authority.",
  "Mapping validation requires draft-only non-authority claims and cannot approve semantic equivalence, connector behavior, certification, production readiness, or a provider default.",
  "Synthetic connector search returns only explicitly synthetic, non-production fixtures without personal data or credentials.",
  "Tool, integrity, security-postcondition, receipt, error, compatibility, startup, and transport success do not create canon, Chronicle truth, permission, gameplay completion, rewards, provider approval, clinical authority, or institutional authority.",
  "Forge does not provide shell, dynamic-module, network, repository mutation, private-data, provider, connector, or consequential action authority.",
].join(" ");

export const FORGE_RUNTIME_INITIALIZE_RESULT: ForgeInitializeResult = {
  ...FORGE_INITIALIZE_RESULT,
  instructions: FORGE_RUNTIME_TRANSPORT_INSTRUCTIONS,
};

export const FORGE_RUNTIME_TRANSPORT_BOUNDARY = {
  ...FORGE_TRANSPORT_BOUNDARY,
  runtimeRevision: FORGE_RUNTIME_REGISTRY_REVISION,
  toolsExposed: true,
  repositoryReadsEnabled: true,
  repositoryReadScope: "server-owned-public-allowlist",
  enabledToolIds: FORGE_RUNTIME_ENABLED_TOOL_IDS,
  executionScopesServerOwned: true,
  acceptedResourceLimitsEnforced: true,
  stableInvocationReceiptsEnabled: true,
  stableToolErrorsEnabled: true,
  runtimeIntegrityChecksEnabled: true,
  successfulResultSecurityPostconditionsEnabled: true,
  exactRevisionCompatibilityEnabled: true,
  cleanCredentialFreeStartupTested: true,
  providerIndependent: true,
  asterPackageDependency: false,
  callerCanRegisterTool: false,
  callerCanSelectRepositoryRoot: false,
  callerCanChangeExecutionScope: false,
  untrustedContentCanAuthorizeToolCall: false,
} as const;

export const FORGE_RUNTIME_VALIDATION_CODES = {
  duplicateTool: "forge.runtime.tool-duplicate",
  missingBaseTool: "forge.runtime.base-tool-missing",
  unexpectedEnablement: "forge.runtime.unexpected-enablement",
  enabledLifecycle: "forge.runtime.enabled-lifecycle",
  enabledTransport: "forge.runtime.enabled-transport",
  descriptorMismatch: "forge.runtime.descriptor-mismatch",
  schemaMismatch: "forge.runtime.schema-mismatch",
  authorityExpansion: "forge.runtime.authority-expansion",
} as const;

export type ForgeRuntimeValidationCode =
  (typeof FORGE_RUNTIME_VALIDATION_CODES)[keyof typeof FORGE_RUNTIME_VALIDATION_CODES];

export interface ForgeRuntimeValidationIssue {
  readonly code: ForgeRuntimeValidationCode;
  readonly path: string;
  readonly message: string;
}

function runtimeIssue(
  code: ForgeRuntimeValidationCode,
  path: string,
  message: string,
): ForgeRuntimeValidationIssue {
  return { code, path, message };
}

export function validateForgeRuntimeToolRegistry(
  tools: readonly ForgeToolContract[] = FORGE_RUNTIME_TOOL_REGISTRY,
): ForgeRuntimeValidationIssue[] {
  const issues: ForgeRuntimeValidationIssue[] = [];
  const seen = new Set<string>();
  const baseById = new Map(FORGE_TOOL_REGISTRY.map((tool) => [tool.id, tool]));
  const descriptorById = new Map<
    string,
    (typeof FORGE_RUNTIME_TOOL_DESCRIPTORS)[number]
  >(
    FORGE_RUNTIME_TOOL_DESCRIPTORS.map((descriptor) => [
      descriptor.name,
      descriptor,
    ]),
  );

  for (const [index, tool] of tools.entries()) {
    const path = `runtimeTools[${index}]`;
    if (seen.has(tool.id)) {
      issues.push(
        runtimeIssue(
          FORGE_RUNTIME_VALIDATION_CODES.duplicateTool,
          `${path}.id`,
          "Runtime tool identities must remain unique.",
        ),
      );
    }
    seen.add(tool.id);

    const base = baseById.get(tool.id);
    if (base === undefined) {
      issues.push(
        runtimeIssue(
          FORGE_RUNTIME_VALIDATION_CODES.missingBaseTool,
          `${path}.id`,
          "Every runtime tool must originate from the accepted contract registry.",
        ),
      );
      continue;
    }

    const shouldBeEnabled = ENABLED_IDS.has(tool.id);
    if (shouldBeEnabled) {
      if (tool.lifecycle !== "enabled") {
        issues.push(
          runtimeIssue(
            FORGE_RUNTIME_VALIDATION_CODES.enabledLifecycle,
            `${path}.lifecycle`,
            "Accepted Sprint 7.1-7.9 runtime tools must be explicitly enabled.",
          ),
        );
      }
      if (tool.transportExposure !== "local-stdio-only") {
        issues.push(
          runtimeIssue(
            FORGE_RUNTIME_VALIDATION_CODES.enabledTransport,
            `${path}.transportExposure`,
            "Enabled Forge tools may be exposed only through local stdio.",
          ),
        );
      }
      if (descriptorById.get(tool.id) === undefined) {
        issues.push(
          runtimeIssue(
            FORGE_RUNTIME_VALIDATION_CODES.descriptorMismatch,
            `${path}.id`,
            "Every enabled tool requires one server-owned MCP descriptor.",
          ),
        );
      }
    } else if (
      tool.lifecycle !== "planned" ||
      tool.transportExposure !== "not-exposed"
    ) {
      issues.push(
        runtimeIssue(
          FORGE_RUNTIME_VALIDATION_CODES.unexpectedEnablement,
          path,
          "Only the ten accepted Sprint 7.1-7.9 runtime tools may be enabled.",
        ),
      );
    }

    if (
      tool.inputSchemaId !== base.inputSchemaId ||
      tool.outputSchemaId !== base.outputSchemaId
    ) {
      issues.push(
        runtimeIssue(
          FORGE_RUNTIME_VALIDATION_CODES.schemaMismatch,
          path,
          "Runtime activation cannot replace accepted input or output schema identities.",
        ),
      );
    }
    if (
      tool.resultCanCreateAuthority !== false ||
      tool.resultCanApproveItself !== false ||
      tool.allowedProhibitedCapabilities.length !== 0
    ) {
      issues.push(
        runtimeIssue(
          FORGE_RUNTIME_VALIDATION_CODES.authorityExpansion,
          path,
          "Runtime activation cannot expand authority or prohibited capabilities.",
        ),
      );
    }
  }

  for (const base of FORGE_TOOL_REGISTRY) {
    if (!seen.has(base.id)) {
      issues.push(
        runtimeIssue(
          FORGE_RUNTIME_VALIDATION_CODES.missingBaseTool,
          "runtimeTools",
          `Missing accepted runtime tool ${base.id}.`,
        ),
      );
    }
  }

  const descriptorIds = FORGE_RUNTIME_TOOL_DESCRIPTORS.map(
    (descriptor) => descriptor.name,
  );
  if (
    descriptorIds.length !== FORGE_RUNTIME_ENABLED_TOOL_IDS.length ||
    new Set(descriptorIds).size !== descriptorIds.length ||
    descriptorIds.some((id) => !ENABLED_IDS.has(id)) ||
    FORGE_RUNTIME_ENABLED_TOOL_IDS.some((id) => !descriptorById.has(id))
  ) {
    issues.push(
      runtimeIssue(
        FORGE_RUNTIME_VALIDATION_CODES.descriptorMismatch,
        "descriptors",
        "MCP descriptors must exactly cover the enabled Sprint 7.1-7.9 tool set.",
      ),
    );
  }

  return issues;
}
