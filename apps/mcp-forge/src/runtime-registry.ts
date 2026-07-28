import {
  FORGE_TOOL_REGISTRY,
  type ForgeToolContract,
} from "./contracts.js";
import {
  FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS,
  FORGE_LORE_SCHEMA_TOOL_DESCRIPTORS,
} from "./lore-schema-contracts.js";
import {
  FORGE_INITIALIZE_RESULT,
  FORGE_TRANSPORT_BOUNDARY,
  type ForgeInitializeResult,
} from "./transport-contracts.js";

export const FORGE_RUNTIME_REGISTRY_REVISION = "1" as const;

const ENABLED_IDS = new Set<string>(FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS);

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
  "Exactly four Sprint 7.4 lore and schema tools are enabled through a server-owned allowlist.",
  "Tool and transport success do not create canon, Chronicle truth, permission, gameplay completion, rewards, provider approval, clinical authority, or institutional authority.",
  "Forge does not provide shell, network, repository mutation, private-data, provider, connector, or consequential action authority.",
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
  enabledToolIds: FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS,
  callerCanRegisterTool: false,
  callerCanSelectRepositoryRoot: false,
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
  const descriptorById = new Map(
    FORGE_LORE_SCHEMA_TOOL_DESCRIPTORS.map((descriptor) => [
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
            "Sprint 7.4 tools must be explicitly enabled.",
          ),
        );
      }
      if (tool.transportExposure !== "local-stdio-only") {
        issues.push(
          runtimeIssue(
            FORGE_RUNTIME_VALIDATION_CODES.enabledTransport,
            `${path}.transportExposure`,
            "Sprint 7.4 tools may be exposed only through local stdio.",
          ),
        );
      }
      const descriptor = descriptorById.get(
        tool.id as (typeof FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS)[number],
      );
      if (descriptor === undefined) {
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
          "Only the four accepted Sprint 7.4 tools may be enabled.",
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

  if (
    FORGE_LORE_SCHEMA_TOOL_DESCRIPTORS.length !==
      FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS.length ||
    FORGE_LORE_SCHEMA_TOOL_DESCRIPTORS.some(
      (descriptor) => !ENABLED_IDS.has(descriptor.name),
    )
  ) {
    issues.push(
      runtimeIssue(
        FORGE_RUNTIME_VALIDATION_CODES.descriptorMismatch,
        "descriptors",
        "MCP descriptors must exactly cover the enabled Sprint 7.4 tool set.",
      ),
    );
  }

  return issues;
}
