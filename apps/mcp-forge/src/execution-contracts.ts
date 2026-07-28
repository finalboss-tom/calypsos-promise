import {
  FORGE_CONTRACT_VERSION,
  FORGE_REGISTRY_REVISION,
  type ForgeInformationClassId,
  type ForgeOperationId,
  type ForgeResourceLimits,
  type ForgeRiskClassId,
  type ForgeToolContract,
} from "./contracts.js";
import {
  FORGE_RUNTIME_ENABLED_TOOL_IDS,
  FORGE_RUNTIME_REGISTRY_REVISION,
  FORGE_RUNTIME_TOOL_REGISTRY,
  type ForgeRuntimeEnabledToolId,
} from "./runtime-registry.js";

export const FORGE_EXECUTION_CONTRACT_REVISION = "1" as const;
export const FORGE_INVOCATION_RECEIPT_SCHEMA_ID =
  "forge.invocation-receipt.v1" as const;
export const FORGE_STABLE_ERROR_SCHEMA_ID = "forge.error.v1" as const;
export const FORGE_NON_AUTHORITY_PROFILE_ID = "forge.non-authority.v1" as const;

export const FORGE_EXECUTION_RESULT_STATES = [
  "complete",
  "partial",
  "truncated",
  "error",
] as const;

export type ForgeExecutionResultState =
  (typeof FORGE_EXECUTION_RESULT_STATES)[number];

export const FORGE_EXECUTION_ERROR_CODES = {
  inputNotSerializable: "forge.execution.input-not-serializable",
  inputLimitReached: "forge.execution.input-limit-reached",
  concurrencyLimitReached: "forge.execution.concurrency-limit-reached",
  timeoutReached: "forge.execution.timeout-reached",
  scanLimitExceeded: "forge.execution.scan-limit-exceeded",
  resultLimitExceeded: "forge.execution.result-limit-exceeded",
  outputLimitReached: "forge.execution.output-limit-reached",
  materializedMemoryLimitReached:
    "forge.execution.materialized-memory-limit-reached",
  invalidToolResult: "forge.execution.invalid-tool-result",
} as const;

export type ForgeExecutionErrorCode =
  (typeof FORGE_EXECUTION_ERROR_CODES)[keyof typeof FORGE_EXECUTION_ERROR_CODES];

export interface ForgeExecutionLimits extends ForgeResourceLimits {
  readonly maxSourceWorkingBytes: number;
  readonly maxMaterializedBytes: number;
}

export interface ForgeToolExecutionScope {
  readonly revision: typeof FORGE_EXECUTION_CONTRACT_REVISION;
  readonly toolId: ForgeRuntimeEnabledToolId;
  readonly toolRevision: "1";
  readonly riskClass: ForgeRiskClassId;
  readonly operation: ForgeOperationId;
  readonly sourceClasses: readonly ForgeInformationClassId[];
  readonly inputSchemaId: string;
  readonly outputSchemaId: string;
  readonly receiptSchemaId: typeof FORGE_INVOCATION_RECEIPT_SCHEMA_ID;
  readonly errorSchemaId: typeof FORGE_STABLE_ERROR_SCHEMA_ID;
  readonly authorityProfileId: typeof FORGE_NON_AUTHORITY_PROFILE_ID;
  readonly transportExposure: "local-stdio-only";
  readonly limits: ForgeExecutionLimits;
  readonly serverOwned: true;
  readonly callerCanChangeScope: false;
  readonly resultAuthority: "none";
}

export interface ForgeInvocationObservedLimits {
  readonly inputBytes: number;
  readonly scannedFiles: number;
  readonly returnedResults: number;
  readonly outputBytes: number;
  readonly serializedMaterializedBytes: number;
  readonly resultState: ForgeExecutionResultState;
  readonly partialReasons: readonly string[];
  readonly errorCode?: string;
}

export interface ForgeInvocationReceipt {
  readonly schemaId: typeof FORGE_INVOCATION_RECEIPT_SCHEMA_ID;
  readonly revision: typeof FORGE_EXECUTION_CONTRACT_REVISION;
  readonly contractVersion: typeof FORGE_CONTRACT_VERSION;
  readonly acceptedRegistryRevision: typeof FORGE_REGISTRY_REVISION;
  readonly runtimeRegistryRevision: typeof FORGE_RUNTIME_REGISTRY_REVISION;
  readonly toolId: ForgeRuntimeEnabledToolId;
  readonly toolRevision: "1";
  readonly riskClass: ForgeRiskClassId;
  readonly operation: ForgeOperationId;
  readonly sourceClasses: readonly ForgeInformationClassId[];
  readonly inputSchemaId: string;
  readonly outputSchemaId: string;
  readonly limits: ForgeExecutionLimits;
  readonly observed: ForgeInvocationObservedLimits;
  readonly enforcement: {
    readonly requestLimit: true;
    readonly scanLimit: true;
    readonly resultLimit: true;
    readonly outputLimit: true;
    readonly timeout: true;
    readonly cancellation: true;
    readonly concurrency: true;
    readonly materializedMemory: true;
    readonly memoryModel: "serialized-input-output-plus-one-bounded-source-file";
  };
  readonly disclosures: {
    readonly rawInputIncluded: false;
    readonly absolutePathsIncluded: false;
    readonly environmentValuesIncluded: false;
    readonly internalTraceIncluded: false;
    readonly credentialsIncluded: false;
    readonly protectedSourceMaterialIncluded: false;
    readonly wallClockTimestampIncluded: false;
  };
  readonly authority: {
    readonly profileId: typeof FORGE_NON_AUTHORITY_PROFILE_ID;
    readonly resultAuthority: "none";
    readonly canApproveItself: false;
    readonly canCreateAuthority: false;
    readonly canMutateRepository: false;
    readonly canCreatePermission: false;
    readonly canCompleteGameplay: false;
    readonly canGrantReward: false;
  };
}

export const FORGE_EXECUTION_SCOPE_VALIDATION_CODES = {
  duplicateScope: "forge.execution.scope-duplicate",
  missingScope: "forge.execution.scope-missing",
  unexpectedScope: "forge.execution.scope-unexpected",
  identityMismatch: "forge.execution.scope-identity-mismatch",
  schemaMismatch: "forge.execution.scope-schema-mismatch",
  limitMismatch: "forge.execution.scope-limit-mismatch",
  authorityExpansion: "forge.execution.scope-authority-expansion",
} as const;

export type ForgeExecutionScopeValidationCode =
  (typeof FORGE_EXECUTION_SCOPE_VALIDATION_CODES)[keyof typeof FORGE_EXECUTION_SCOPE_VALIDATION_CODES];

export interface ForgeExecutionScopeValidationIssue {
  readonly code: ForgeExecutionScopeValidationCode;
  readonly path: string;
  readonly message: string;
}

const MAX_SOURCE_WORKING_BYTES = 1_048_576;

function executionLimits(tool: ForgeToolContract): ForgeExecutionLimits {
  const maxSourceWorkingBytes =
    tool.operation === "generate-synthetic-draft"
      ? 0
      : MAX_SOURCE_WORKING_BYTES;
  return {
    ...tool.limits,
    maxSourceWorkingBytes,
    maxMaterializedBytes:
      tool.limits.maxInputBytes +
      tool.limits.maxOutputBytes +
      maxSourceWorkingBytes,
  };
}

function executionScope(tool: ForgeToolContract): ForgeToolExecutionScope {
  return {
    revision: FORGE_EXECUTION_CONTRACT_REVISION,
    toolId: tool.id as ForgeRuntimeEnabledToolId,
    toolRevision: tool.revision,
    riskClass: tool.riskClass,
    operation: tool.operation,
    sourceClasses: tool.sourceClasses,
    inputSchemaId: tool.inputSchemaId,
    outputSchemaId: tool.outputSchemaId,
    receiptSchemaId: FORGE_INVOCATION_RECEIPT_SCHEMA_ID,
    errorSchemaId: FORGE_STABLE_ERROR_SCHEMA_ID,
    authorityProfileId: FORGE_NON_AUTHORITY_PROFILE_ID,
    transportExposure: "local-stdio-only",
    limits: executionLimits(tool),
    serverOwned: true,
    callerCanChangeScope: false,
    resultAuthority: "none",
  };
}

export const FORGE_RUNTIME_EXECUTION_SCOPES: readonly ForgeToolExecutionScope[] =
  FORGE_RUNTIME_TOOL_REGISTRY.filter(
    (tool) => tool.lifecycle === "enabled",
  ).map(executionScope);

export function findForgeExecutionScope(
  toolId: string,
): ForgeToolExecutionScope | undefined {
  return FORGE_RUNTIME_EXECUTION_SCOPES.find(
    (scope) => scope.toolId === toolId,
  );
}

function validationIssue(
  code: ForgeExecutionScopeValidationCode,
  path: string,
  message: string,
): ForgeExecutionScopeValidationIssue {
  return { code, path, message };
}

export function validateForgeExecutionScopes(
  scopes: readonly ForgeToolExecutionScope[] = FORGE_RUNTIME_EXECUTION_SCOPES,
): ForgeExecutionScopeValidationIssue[] {
  const issues: ForgeExecutionScopeValidationIssue[] = [];
  const runtimeById = new Map(
    FORGE_RUNTIME_TOOL_REGISTRY.map((tool) => [tool.id, tool]),
  );
  const seen = new Set<string>();

  scopes.forEach((scope, index) => {
    const path = `executionScopes[${index}]`;
    if (seen.has(scope.toolId)) {
      issues.push(
        validationIssue(
          FORGE_EXECUTION_SCOPE_VALIDATION_CODES.duplicateScope,
          `${path}.toolId`,
          "Execution scope identities must remain unique.",
        ),
      );
    }
    seen.add(scope.toolId);

    const tool = runtimeById.get(scope.toolId);
    if (tool === undefined || tool.lifecycle !== "enabled") {
      issues.push(
        validationIssue(
          FORGE_EXECUTION_SCOPE_VALIDATION_CODES.unexpectedScope,
          `${path}.toolId`,
          "Execution scopes may describe only enabled accepted tools.",
        ),
      );
      return;
    }

    if (
      scope.revision !== FORGE_EXECUTION_CONTRACT_REVISION ||
      scope.toolRevision !== tool.revision ||
      scope.riskClass !== tool.riskClass ||
      scope.operation !== tool.operation ||
      scope.transportExposure !== "local-stdio-only" ||
      JSON.stringify(scope.sourceClasses) !== JSON.stringify(tool.sourceClasses)
    ) {
      issues.push(
        validationIssue(
          FORGE_EXECUTION_SCOPE_VALIDATION_CODES.identityMismatch,
          path,
          "Execution scope identity and operation must match the accepted runtime tool contract.",
        ),
      );
    }

    if (
      scope.inputSchemaId !== tool.inputSchemaId ||
      scope.outputSchemaId !== tool.outputSchemaId ||
      scope.receiptSchemaId !== tool.receiptSchemaId ||
      scope.errorSchemaId !== tool.errorSchemaId ||
      scope.authorityProfileId !== tool.authorityProfileId
    ) {
      issues.push(
        validationIssue(
          FORGE_EXECUTION_SCOPE_VALIDATION_CODES.schemaMismatch,
          path,
          "Execution scope schema identities must match the accepted tool contract.",
        ),
      );
    }

    if (
      JSON.stringify(scope.limits) !== JSON.stringify(executionLimits(tool))
    ) {
      issues.push(
        validationIssue(
          FORGE_EXECUTION_SCOPE_VALIDATION_CODES.limitMismatch,
          `${path}.limits`,
          "Execution limits must be derived from the immutable accepted tool limits.",
        ),
      );
    }

    if (
      scope.serverOwned !== true ||
      scope.callerCanChangeScope !== false ||
      scope.resultAuthority !== "none"
    ) {
      issues.push(
        validationIssue(
          FORGE_EXECUTION_SCOPE_VALIDATION_CODES.authorityExpansion,
          path,
          "Execution scopes cannot transfer control or result authority to callers.",
        ),
      );
    }
  });

  for (const toolId of FORGE_RUNTIME_ENABLED_TOOL_IDS) {
    if (!seen.has(toolId)) {
      issues.push(
        validationIssue(
          FORGE_EXECUTION_SCOPE_VALIDATION_CODES.missingScope,
          "executionScopes",
          `Missing execution scope for ${toolId}.`,
        ),
      );
    }
  }

  return issues;
}
