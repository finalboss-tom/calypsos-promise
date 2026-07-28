import { ForgeToolExecutionController } from "./execution-controller.js";
import {
  ForgeLoreSchemaToolError,
  type ForgeLoreSchemaErrorCode,
  type ForgeMcpToolCallResult,
} from "./lore-schema-contracts.js";
import {
  FORGE_RUNTIME_ENABLED_TOOL_IDS,
  type ForgeRuntimeEnabledToolId,
} from "./runtime-registry.js";
import {
  FORGE_SECURITY_ERROR_CODES,
  validateForgeRuntimeIntegrity,
  validateForgeToolSecurityPostconditions,
} from "./security-postconditions.js";

export class ForgeSecureToolExecutionController {
  readonly #delegate = new ForgeToolExecutionController();

  getActiveToolCallCount(toolId?: string): number {
    return this.#delegate.getActiveToolCallCount(toolId);
  }

  execute(
    toolId: string,
    input: unknown,
    externalSignal: AbortSignal,
    operation: (signal: AbortSignal) => Promise<unknown>,
  ): Promise<ForgeMcpToolCallResult> {
    const enabled = FORGE_RUNTIME_ENABLED_TOOL_IDS.includes(
      toolId as ForgeRuntimeEnabledToolId,
    );

    return this.#delegate.execute(
      toolId,
      input,
      externalSignal,
      async (executionSignal) => {
        const integrityIssues = validateForgeRuntimeIntegrity();
        if (integrityIssues.length > 0) {
          throw new ForgeLoreSchemaToolError(
            FORGE_SECURITY_ERROR_CODES.integrityViolation as ForgeLoreSchemaErrorCode,
            "The server-owned Forge runtime failed its integrity check.",
          );
        }

        const value = await operation(executionSignal);
        if (!enabled) return value;

        const securityIssues = validateForgeToolSecurityPostconditions(
          toolId as ForgeRuntimeEnabledToolId,
          value,
        );
        if (securityIssues.length > 0) {
          throw new ForgeLoreSchemaToolError(
            FORGE_SECURITY_ERROR_CODES.postconditionFailed as ForgeLoreSchemaErrorCode,
            "The Forge tool result failed its security postconditions.",
          );
        }
        return value;
      },
    );
  }
}
