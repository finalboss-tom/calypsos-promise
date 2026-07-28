import {
  CONTENT_SCHEMA_VERSION,
  validateContent,
  type ValidationIssue,
} from "@calypsos-promise/content-schema";

import {
  FORGE_ENABLED_DOCUMENTATION_SEARCH_TOOL_IDS,
  type ForgeEnabledDocumentationSearchToolId,
  type ForgeSearchArchitectureOutput,
  type ForgeSearchDecisionOutput,
} from "./documentation-search-contracts.js";
import {
  searchForgeArchitecture,
  searchForgeDecision,
} from "./documentation-search-tools.js";
import {
  FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS,
  FORGE_LORE_SCHEMA_ERROR_CODES,
  FORGE_LORE_SCHEMA_TOOL_REVISION,
  FORGE_TOOL_NON_AUTHORITY,
  ForgeLoreSchemaToolError,
  type ForgeEnabledLoreSchemaToolId,
  type ForgeInlineContentInformationClass,
  type ForgeInspectQuestSchemaOutput,
  type ForgeMcpToolCallResult,
  type ForgePublicRecordInput,
  type ForgeSearchLoreOutput,
  type ForgeValidateContentOutput,
  type ForgeValidateQuestOutput,
} from "./lore-schema-contracts.js";
import { searchForgeLore } from "./lore-search-tool.js";
import {
  FORGE_QUEST_SCHEMA_PATH,
  forgePublicToolErrorResult,
  forgeToolResult,
  forgeValidationIdentity,
  isRecord,
  parseForgeInspectInput,
  parseForgePublicRecordInput,
  questKindIssue,
  type ForgeTransportToolService,
  type ResolvedPublicRecord,
} from "./lore-tool-support.js";
import { validateForgeMappingDraft } from "./mapping-draft-tools.js";
import { searchForgePublicStandards } from "./public-standards-tools.js";
import { createForgeObjectIdLocator } from "./source-repository.js";
import { ForgeSourceRepository } from "./source-repository.js";
import {
  FORGE_ENABLED_STANDARDS_MAPPING_TOOL_IDS,
  type ForgeEnabledStandardsMappingToolId,
  type ForgeSearchPublicStandardsOutput,
  type ForgeSearchSyntheticConnectorFixturesOutput,
  type ForgeValidateMappingDraftOutput,
} from "./standards-mapping-contracts.js";
import { searchForgeSyntheticConnectorFixtures } from "./synthetic-connector-tools.js";

const MAX_PUBLIC_RECORD_BYTES = 1_048_576;

export type { ForgeTransportToolService } from "./lore-tool-support.js";

export class ForgeLoreSchemaToolService implements ForgeTransportToolService {
  readonly #repository: ForgeSourceRepository;

  constructor(repository: ForgeSourceRepository) {
    this.#repository = repository;
  }

  async callTool(
    name: string,
    argumentsValue: unknown,
    signal: AbortSignal,
  ): Promise<ForgeMcpToolCallResult> {
    try {
      const loreTool = FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS.includes(
        name as ForgeEnabledLoreSchemaToolId,
      );
      const documentationTool =
        FORGE_ENABLED_DOCUMENTATION_SEARCH_TOOL_IDS.includes(
          name as ForgeEnabledDocumentationSearchToolId,
        );
      const standardsTool = FORGE_ENABLED_STANDARDS_MAPPING_TOOL_IDS.includes(
        name as ForgeEnabledStandardsMappingToolId,
      );
      if (!loreTool && !documentationTool && !standardsTool) {
        throw new ForgeLoreSchemaToolError(
          FORGE_LORE_SCHEMA_ERROR_CODES.toolUnknown,
          "The requested Forge tool is not enabled.",
        );
      }
      if (signal.aborted) throw signal.reason;

      switch (
        name as
          | ForgeEnabledLoreSchemaToolId
          | ForgeEnabledDocumentationSearchToolId
          | ForgeEnabledStandardsMappingToolId
      ) {
        case "forge.search.lore":
          return forgeToolResult(await this.searchLore(argumentsValue, signal));
        case "forge.validate.content":
          return forgeToolResult(
            await this.validatePublicContent(argumentsValue),
          );
        case "forge.inspect.quest-schema":
          return forgeToolResult(await this.inspectQuestSchema(argumentsValue));
        case "forge.validate.quest":
          return forgeToolResult(await this.validateQuest(argumentsValue));
        case "forge.search.architecture":
          return forgeToolResult(
            await this.searchArchitecture(argumentsValue, signal),
          );
        case "forge.search.decision":
          return forgeToolResult(
            await this.searchDecision(argumentsValue, signal),
          );
        case "forge.search.public-standards":
          return forgeToolResult(
            await this.searchPublicStandards(argumentsValue, signal),
          );
        case "forge.validate.mapping-draft":
          return forgeToolResult(await this.validateMappingDraft(argumentsValue));
        case "forge.search.synthetic-connector-fixtures":
          return forgeToolResult(
            await this.searchSyntheticConnectorFixtures(argumentsValue, signal),
          );
      }
    } catch (error) {
      if (signal.aborted) throw error;
      if (error instanceof ForgeLoreSchemaToolError) {
        return forgePublicToolErrorResult(error);
      }
      return forgePublicToolErrorResult(
        new ForgeLoreSchemaToolError(
          FORGE_LORE_SCHEMA_ERROR_CODES.sourceUnavailable,
          "The requested public Forge operation failed safely.",
        ),
      );
    }
  }

  searchLore(
    input: unknown,
    signal?: AbortSignal,
  ): Promise<ForgeSearchLoreOutput> {
    return searchForgeLore(this.#repository, input, signal);
  }

  searchArchitecture(
    input: unknown,
    signal?: AbortSignal,
  ): Promise<ForgeSearchArchitectureOutput> {
    return searchForgeArchitecture(this.#repository, input, signal);
  }

  searchDecision(
    input: unknown,
    signal?: AbortSignal,
  ): Promise<ForgeSearchDecisionOutput> {
    return searchForgeDecision(this.#repository, input, signal);
  }

  searchPublicStandards(
    input: unknown,
    signal?: AbortSignal,
  ): Promise<ForgeSearchPublicStandardsOutput> {
    return searchForgePublicStandards(this.#repository, input, signal);
  }

  validateMappingDraft(input: unknown): Promise<ForgeValidateMappingDraftOutput> {
    return validateForgeMappingDraft(this.#repository, input);
  }

  searchSyntheticConnectorFixtures(
    input: unknown,
    signal?: AbortSignal,
  ): Promise<ForgeSearchSyntheticConnectorFixturesOutput> {
    return searchForgeSyntheticConnectorFixtures(
      this.#repository,
      input,
      signal,
    );
  }

  async validatePublicContent(
    input: unknown,
  ): Promise<ForgeValidateContentOutput> {
    const request = parseForgePublicRecordInput(input);
    const resolved = await this.resolvePublicRecord(request);
    const validation = validateContent(resolved.value);
    return {
      toolId: "forge.validate.content",
      revision: FORGE_LORE_SCHEMA_TOOL_REVISION,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      valid: validation.ok,
      issues: validation.issues,
      identity: forgeValidationIdentity(resolved.value),
      inputMode: resolved.inputMode,
      inputInformationClass: resolved.inputInformationClass,
      ...(resolved.provenance === undefined
        ? {}
        : { provenance: resolved.provenance }),
      humanReviewRequired: true,
      canonAcceptance: "not-granted",
      ...FORGE_TOOL_NON_AUTHORITY,
    };
  }

  async inspectQuestSchema(
    input: unknown,
  ): Promise<ForgeInspectQuestSchemaOutput> {
    parseForgeInspectInput(input);
    const read = await this.#repository.readText({
      sourceRootId: "forge.content-schema",
      relativePath: FORGE_QUEST_SCHEMA_PATH,
      maxOutputBytes: MAX_PUBLIC_RECORD_BYTES,
    });
    let schema: unknown;
    try {
      schema = JSON.parse(read.content);
    } catch {
      throw new ForgeLoreSchemaToolError(
        FORGE_LORE_SCHEMA_ERROR_CODES.invalidJson,
        "The allowlisted public content schema is not valid JSON.",
      );
    }
    if (
      !isRecord(schema) ||
      !isRecord(schema.$defs) ||
      schema.$defs.quest === undefined
    ) {
      throw new ForgeLoreSchemaToolError(
        FORGE_LORE_SCHEMA_ERROR_CODES.sourceUnavailable,
        "The accepted quest schema definition is unavailable.",
      );
    }
    return {
      toolId: "forge.inspect.quest-schema",
      revision: FORGE_LORE_SCHEMA_TOOL_REVISION,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      ...(typeof schema.$id === "string" ? { schemaId: schema.$id } : {}),
      contentKind: "quest",
      questSchema: schema.$defs.quest,
      provenance: {
        ...read.provenance,
        locator: createForgeObjectIdLocator(read.provenance, "$defs.quest"),
      },
      humanReviewRequiredForChange: true,
      provesSemanticCompleteness: false,
      provesClinicalSafety: false,
      canonAcceptance: "not-granted",
      ...FORGE_TOOL_NON_AUTHORITY,
    };
  }

  async validateQuest(input: unknown): Promise<ForgeValidateQuestOutput> {
    const request = parseForgePublicRecordInput(input);
    const resolved = await this.resolvePublicRecord(request);
    const validation = validateContent(resolved.value);
    const issues: ValidationIssue[] = [...validation.issues];
    const kindIssue = questKindIssue(resolved.value);
    if (kindIssue !== undefined) issues.push(kindIssue);
    return {
      toolId: "forge.validate.quest",
      revision: FORGE_LORE_SCHEMA_TOOL_REVISION,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      valid: issues.length === 0,
      issues,
      identity: forgeValidationIdentity(resolved.value),
      inputMode: resolved.inputMode,
      inputInformationClass: resolved.inputInformationClass,
      ...(resolved.provenance === undefined
        ? {}
        : { provenance: resolved.provenance }),
      humanReviewRequired: true,
      questCompletion: "not-granted",
      rewardGrant: "not-granted",
      canonAcceptance: "not-granted",
      ...FORGE_TOOL_NON_AUTHORITY,
    };
  }

  private async resolvePublicRecord(
    input: ForgePublicRecordInput,
  ): Promise<ResolvedPublicRecord> {
    if (Object.prototype.hasOwnProperty.call(input, "content")) {
      return {
        value: input.content,
        inputMode: "inline-public",
        inputInformationClass:
          input.informationClass as ForgeInlineContentInformationClass,
      };
    }
    const read = await this.#repository.readText({
      sourceRootId: "forge.content",
      relativePath: input.sourcePath as string,
      maxOutputBytes: MAX_PUBLIC_RECORD_BYTES,
    });
    try {
      return {
        value: JSON.parse(read.content),
        inputMode: "allowlisted-public-source",
        inputInformationClass: "public-content",
        provenance: read.provenance,
      };
    } catch {
      throw new ForgeLoreSchemaToolError(
        FORGE_LORE_SCHEMA_ERROR_CODES.invalidJson,
        "The allowlisted public content source is not valid JSON.",
      );
    }
  }
}
