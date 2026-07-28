import { validateForgeAgentSecurityOperability } from "./agent-security-operability-contracts.js";
import { FORGE_BASELINE } from "./contracts.js";
import { validateForgeExecutionScopes } from "./execution-contracts.js";
import { validateForgeRuntimeToolRegistry } from "./runtime-registry.js";
import { validateForgeRuntimeIntegrity } from "./security-postconditions.js";
import { FORGE_SOURCE_CATALOGUE } from "./source-contracts.js";
import { validateForgeSourceCatalogue } from "./validate-source-catalogue.js";
import { validateForgeBaseline } from "./validate.js";

export const FORGE_COMPLETE_RUNTIME_VALIDATION_REVISION = "1" as const;

export type ForgeCompleteRuntimeValidationIssue =
  | ReturnType<typeof validateForgeBaseline>[number]
  | ReturnType<typeof validateForgeSourceCatalogue>[number]
  | ReturnType<typeof validateForgeRuntimeToolRegistry>[number]
  | ReturnType<typeof validateForgeExecutionScopes>[number]
  | ReturnType<typeof validateForgeRuntimeIntegrity>[number]
  | ReturnType<typeof validateForgeAgentSecurityOperability>[number];

export function validateForgeCompleteRuntime(): ForgeCompleteRuntimeValidationIssue[] {
  return [
    ...validateForgeBaseline(FORGE_BASELINE),
    ...validateForgeSourceCatalogue(FORGE_SOURCE_CATALOGUE),
    ...validateForgeRuntimeToolRegistry(),
    ...validateForgeExecutionScopes(),
    ...validateForgeRuntimeIntegrity(),
    ...validateForgeAgentSecurityOperability(),
  ];
}
