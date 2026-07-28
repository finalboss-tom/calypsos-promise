import {
  FORGE_EXECUTION_ERROR_CODES,
  FORGE_INVOCATION_RECEIPT_SCHEMA_ID,
  FORGE_NON_AUTHORITY_PROFILE_ID,
  FORGE_STABLE_ERROR_SCHEMA_ID,
  findForgeExecutionScope,
  type ForgeExecutionErrorCode,
  type ForgeExecutionResultState,
  type ForgeInvocationReceipt,
  type ForgeToolExecutionScope,
} from "./execution-contracts.js";
import {
  FORGE_LORE_SCHEMA_ERROR_CODES,
  FORGE_TOOL_NON_AUTHORITY,
  ForgeLoreSchemaToolError,
  type ForgeMcpToolCallResult,
} from "./lore-schema-contracts.js";
import { forgeToolResult, isRecord } from "./lore-tool-support.js";

interface ForgeExecutionMetrics {
  readonly scannedFiles: number;
  readonly returnedResults: number;
  readonly resultState: ForgeExecutionResultState;
  readonly partialReasons: readonly string[];
}

interface ForgeAssembledResult {
  readonly result: ForgeMcpToolCallResult;
  readonly outputBytes: number;
}

type ForgeToolOperation = (signal: AbortSignal) => Promise<unknown>;

class ForgeExecutionFault extends Error {
  readonly code: ForgeExecutionErrorCode;

  constructor(code: ForgeExecutionErrorCode, message: string) {
    super(message);
    this.name = "ForgeExecutionFault";
    this.code = code;
  }
}

function serializedBytes(value: unknown): number {
  const serialized = JSON.stringify(value);
  return Buffer.byteLength(serialized ?? "null", "utf8");
}

function publicAbortReason(signal: AbortSignal): unknown {
  return signal.reason ?? new Error("Forge tool invocation cancelled.");
}

function safeCount(value: unknown): number | undefined {
  return Number.isSafeInteger(value) && Number(value) >= 0
    ? Number(value)
    : undefined;
}

function uniqueSortedStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [
    ...new Set(value.filter((entry): entry is string => typeof entry === "string")),
  ].sort();
}

function executionMetrics(
  value: Record<string, unknown>,
  scope: ForgeToolExecutionScope,
): ForgeExecutionMetrics {
  const partialReasons = uniqueSortedStrings(value.partialReasons);
  const reportedScannedFiles =
    safeCount(value.scannedFiles) ?? (isRecord(value.provenance) ? 1 : 0);
  const scannedFiles =
    partialReasons.includes("file-limit-reached") &&
    reportedScannedFiles === scope.limits.maxFilesScanned + 1
      ? scope.limits.maxFilesScanned
      : reportedScannedFiles;

  const returnedResults =
    safeCount(value.returnedMatches) ??
    safeCount(value.generatedCount) ??
    (Array.isArray(value.matches)
      ? value.matches.length
      : Array.isArray(value.records)
        ? value.records.length
        : 1);

  const resultState: ForgeExecutionResultState =
    value.resultState === "partial" || value.resultState === "truncated"
      ? value.resultState
      : "complete";

  return {
    scannedFiles,
    returnedResults,
    resultState,
    partialReasons,
  };
}

function invocationReceipt(
  scope: ForgeToolExecutionScope,
  inputBytes: number,
  metrics: ForgeExecutionMetrics,
  outputBytes: number,
  errorCode?: string,
): ForgeInvocationReceipt {
  return {
    schemaId: FORGE_INVOCATION_RECEIPT_SCHEMA_ID,
    revision: scope.revision,
    contractVersion: "0.1.0-pre.1",
    acceptedRegistryRevision: "1",
    runtimeRegistryRevision: "4",
    toolId: scope.toolId,
    toolRevision: scope.toolRevision,
    riskClass: scope.riskClass,
    operation: scope.operation,
    sourceClasses: scope.sourceClasses,
    inputSchemaId: scope.inputSchemaId,
    outputSchemaId: scope.outputSchemaId,
    limits: scope.limits,
    observed: {
      inputBytes,
      scannedFiles: metrics.scannedFiles,
      returnedResults: metrics.returnedResults,
      outputBytes,
      serializedMaterializedBytes: inputBytes + outputBytes,
      resultState: metrics.resultState,
      partialReasons: metrics.partialReasons,
      ...(errorCode === undefined ? {} : { errorCode }),
    },
    enforcement: {
      requestLimit: true,
      scanLimit: true,
      resultLimit: true,
      outputLimit: true,
      timeout: true,
      cancellation: true,
      concurrency: true,
      materializedMemory: true,
      memoryModel: "serialized-input-output-plus-one-bounded-source-file",
    },
    disclosures: {
      rawInputIncluded: false,
      absolutePathsIncluded: false,
      environmentValuesIncluded: false,
      stackTracesIncluded: false,
      credentialsIncluded: false,
      protectedSourceMaterialIncluded: false,
      wallClockTimestampIncluded: false,
    },
    authority: {
      profileId: FORGE_NON_AUTHORITY_PROFILE_ID,
      resultAuthority: "none",
      canApproveItself: false,
      canCreateAuthority: false,
      canMutateRepository: false,
      canCreatePermission: false,
      canCompleteGameplay: false,
      canGrantReward: false,
    },
  };
}

function withReceipt(
  base: Record<string, unknown>,
  scope: ForgeToolExecutionScope,
  inputBytes: number,
  metrics: ForgeExecutionMetrics,
  isError: boolean,
  errorCode?: string,
): ForgeAssembledResult {
  let outputBytes = 0;
  let result = forgeToolResult(base, isError);

  for (let iteration = 0; iteration < 8; iteration += 1) {
    const receipt = invocationReceipt(
      scope,
      inputBytes,
      metrics,
      outputBytes,
      errorCode,
    );
    result = forgeToolResult({ ...base, receipt }, isError);
    const nextOutputBytes = serializedBytes(result);
    if (nextOutputBytes === outputBytes) {
      return { result, outputBytes };
    }
    outputBytes = nextOutputBytes;
  }

  const receipt = invocationReceipt(
    scope,
    inputBytes,
    metrics,
    outputBytes,
    errorCode,
  );
  result = forgeToolResult({ ...base, receipt }, isError);
  return { result, outputBytes: serializedBytes(result) };
}

function errorBase(code: string, message: string): Record<string, unknown> {
  return {
    schemaId: FORGE_STABLE_ERROR_SCHEMA_ID,
    revision: "1",
    error: { code, message },
    ...FORGE_TOOL_NON_AUTHORITY,
  };
}

function bareError(code: string, message: string): ForgeMcpToolCallResult {
  return forgeToolResult(errorBase(code, message), true);
}

function errorResult(
  scope: ForgeToolExecutionScope,
  inputBytes: number,
  code: string,
  message: string,
  metrics: ForgeExecutionMetrics = {
    scannedFiles: 0,
    returnedResults: 0,
    resultState: "error",
    partialReasons: [],
  },
): ForgeMcpToolCallResult {
  return withReceipt(
    errorBase(code, message),
    scope,
    inputBytes,
    { ...metrics, resultState: "error" },
    true,
    code,
  ).result;
}

export class ForgeToolExecutionController {
  readonly #activeByTool = new Map<string, number>();

  getActiveToolCallCount(toolId?: string): number {
    if (toolId !== undefined) return this.#activeByTool.get(toolId) ?? 0;
    return [...this.#activeByTool.values()].reduce(
      (total, count) => total + count,
      0,
    );
  }

  async execute(
    toolId: string,
    input: unknown,
    externalSignal: AbortSignal,
    operation: ForgeToolOperation,
  ): Promise<ForgeMcpToolCallResult> {
    const scope = findForgeExecutionScope(toolId);
    if (scope === undefined) {
      return bareError(
        FORGE_LORE_SCHEMA_ERROR_CODES.toolUnknown,
        "The requested Forge tool is not enabled.",
      );
    }

    let inputBytes: number;
    try {
      inputBytes = serializedBytes(input);
    } catch {
      return errorResult(
        scope,
        0,
        FORGE_EXECUTION_ERROR_CODES.inputNotSerializable,
        "Forge tool input must be JSON serializable.",
      );
    }

    if (inputBytes > scope.limits.maxInputBytes) {
      return errorResult(
        scope,
        inputBytes,
        FORGE_EXECUTION_ERROR_CODES.inputLimitReached,
        "Forge tool input exceeds the accepted request limit.",
      );
    }

    if (externalSignal.aborted) throw publicAbortReason(externalSignal);

    const active = this.#activeByTool.get(toolId) ?? 0;
    if (active >= scope.limits.maxConcurrency) {
      return errorResult(
        scope,
        inputBytes,
        FORGE_EXECUTION_ERROR_CODES.concurrencyLimitReached,
        "The accepted concurrency limit for this Forge tool is already in use.",
      );
    }

    this.#activeByTool.set(toolId, active + 1);
    const executionController = new AbortController();
    const abortFromCaller = (): void => {
      executionController.abort(publicAbortReason(externalSignal));
    };
    externalSignal.addEventListener("abort", abortFromCaller, { once: true });

    let timedOut = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeoutFault = new ForgeExecutionFault(
      FORGE_EXECUTION_ERROR_CODES.timeoutReached,
      "The Forge tool invocation reached its accepted timeout limit.",
    );
    const timeout = new Promise<never>((_resolve, reject) => {
      timer = setTimeout(() => {
        timedOut = true;
        executionController.abort(timeoutFault);
        reject(timeoutFault);
      }, scope.limits.timeoutMilliseconds);
    });

    try {
      const value = await Promise.race([
        operation(executionController.signal),
        timeout,
      ]);
      if (externalSignal.aborted) throw publicAbortReason(externalSignal);
      if (!isRecord(value) || value.toolId !== scope.toolId || "receipt" in value) {
        return errorResult(
          scope,
          inputBytes,
          FORGE_EXECUTION_ERROR_CODES.invalidToolResult,
          "The Forge tool returned a result outside its accepted output contract.",
        );
      }

      const metrics = executionMetrics(value, scope);
      if (metrics.scannedFiles > scope.limits.maxFilesScanned) {
        return errorResult(
          scope,
          inputBytes,
          FORGE_EXECUTION_ERROR_CODES.scanLimitExceeded,
          "The Forge tool exceeded its accepted scan limit.",
          metrics,
        );
      }
      if (metrics.returnedResults > scope.limits.maxResults) {
        return errorResult(
          scope,
          inputBytes,
          FORGE_EXECUTION_ERROR_CODES.resultLimitExceeded,
          "The Forge tool exceeded its accepted result limit.",
          metrics,
        );
      }

      const assembled = withReceipt(value, scope, inputBytes, metrics, false);
      if (assembled.outputBytes > scope.limits.maxOutputBytes) {
        return errorResult(
          scope,
          inputBytes,
          FORGE_EXECUTION_ERROR_CODES.outputLimitReached,
          "The Forge tool result exceeds its accepted output limit.",
          metrics,
        );
      }
      if (
        inputBytes +
          assembled.outputBytes +
          scope.limits.maxSourceWorkingBytes >
        scope.limits.maxMaterializedBytes
      ) {
        return errorResult(
          scope,
          inputBytes,
          FORGE_EXECUTION_ERROR_CODES.outputLimitReached,
          "The Forge tool result exceeds its accepted materialized-memory limit.",
          metrics,
        );
      }
      return assembled.result;
    } catch (error) {
      if (externalSignal.aborted) throw publicAbortReason(externalSignal);
      if (timedOut || error === timeoutFault) {
        return errorResult(
          scope,
          inputBytes,
          FORGE_EXECUTION_ERROR_CODES.timeoutReached,
          timeoutFault.message,
        );
      }
      if (error instanceof ForgeLoreSchemaToolError) {
        return errorResult(scope, inputBytes, error.code, error.message);
      }
      if (error instanceof ForgeExecutionFault) {
        return errorResult(scope, inputBytes, error.code, error.message);
      }
      return errorResult(
        scope,
        inputBytes,
        FORGE_LORE_SCHEMA_ERROR_CODES.sourceUnavailable,
        "The requested public Forge operation failed safely.",
      );
    } finally {
      if (timer !== undefined) clearTimeout(timer);
      externalSignal.removeEventListener("abort", abortFromCaller);
      const current = this.#activeByTool.get(toolId) ?? 1;
      if (current <= 1) this.#activeByTool.delete(toolId);
      else this.#activeByTool.set(toolId, current - 1);
    }
  }
}
