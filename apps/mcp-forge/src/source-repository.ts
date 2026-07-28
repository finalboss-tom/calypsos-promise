import { createHash } from "node:crypto";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import { join, posix } from "node:path";

import {
  FORGE_SOURCE_CATALOGUE,
  FORGE_SOURCE_ERROR_CODES,
  FORGE_SOURCE_PROVENANCE_REVISION,
  type ForgeLineRangeLocator,
  type ForgeObjectIdLocator,
  type ForgeRepositoryIdentity,
  type ForgeSourceCatalogueEntry,
  type ForgeSourceListItem,
  type ForgeSourceListRequest,
  type ForgeSourceListResult,
  type ForgeSourcePartialReasonId,
  type ForgeSourceProvenance,
  type ForgeSourceReadRequest,
  type ForgeSourceReadResult,
  type ForgeSourceResultState,
  type ForgeSourceRootId,
  type ForgeWholeFileLocator,
} from "./source-contracts.js";
import { createForgeSourceError, ForgeSourceError } from "./source-errors.js";
import {
  assertForgeSourcePathAllowed,
  compareForgeSourcePaths,
  forgeSourcePathHasPrefix,
  forgeSourcePathIsAllowed,
  forgeSourcePathIsProhibited,
  normalizeForgeSourceRelativePath,
} from "./source-paths.js";
import {
  assertForgeSourceCatalogueValid,
  assertNoForgeSourceSymlinkSegments,
  createForgeRepositoryIdentity,
  createProcessForgeSourceRoot,
  resolveForgeSourceRoot,
} from "./source-roots.js";

const MAX_OBJECT_ID_LENGTH = 512;

const sha256 = (bytes: Uint8Array): `sha256:${string}` =>
  `sha256:${createHash("sha256").update(bytes).digest("hex")}`;

const countLines = (content: string): number =>
  content.length === 0 ? 0 : content.split(/\r\n|\r|\n/).length;

const truncateUtf8 = (
  bytes: Uint8Array,
  maxBytes: number,
): { content: string; truncated: boolean } => {
  if (bytes.byteLength <= maxBytes) {
    return {
      content: new TextDecoder("utf-8", { fatal: true }).decode(bytes),
      truncated: false,
    };
  }

  const decoder = new TextDecoder("utf-8", { fatal: true });
  let end = maxBytes;
  while (end > 0) {
    try {
      return {
        content: decoder.decode(bytes.subarray(0, end)),
        truncated: true,
      };
    } catch {
      end -= 1;
    }
  }
  return { content: "", truncated: true };
};

const repositoryRelativePath = (
  entry: ForgeSourceCatalogueEntry,
  sourceRelativePath: string,
): string =>
  entry.repositoryRelativeRoot === "."
    ? sourceRelativePath
    : posix.join(entry.repositoryRelativeRoot, sourceRelativePath);

const wholeFileLocator = (path: string): ForgeWholeFileLocator => ({
  kind: "whole-file",
  repositoryRelativePath: path,
});

const boundedLimit = (
  requested: number | undefined,
  maximum: number,
): number => {
  if (requested === undefined) return maximum;
  if (!Number.isSafeInteger(requested) || requested <= 0) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.invalidRequestLimit,
      "Requested source limits must be positive safe integers.",
    );
  }
  return Math.min(requested, maximum);
};

export class ForgeSourceRepository {
  readonly identity: ForgeRepositoryIdentity;
  readonly catalogue: readonly ForgeSourceCatalogueEntry[];
  readonly #repositoryRoot: string;

  private constructor(
    repositoryRoot: string,
    identity: ForgeRepositoryIdentity,
    catalogue: readonly ForgeSourceCatalogueEntry[],
  ) {
    assertForgeSourceCatalogueValid(catalogue);
    this.#repositoryRoot = repositoryRoot;
    this.identity = identity;
    this.catalogue = catalogue;
  }

  static async fromProcessWorkingDirectory(): Promise<ForgeSourceRepository> {
    const resolved = await createProcessForgeSourceRoot();
    return new ForgeSourceRepository(
      resolved.repositoryRoot,
      resolved.identity,
      resolved.catalogue,
    );
  }

  static async forSyntheticTests(
    repositoryRoot: string,
    catalogue: readonly ForgeSourceCatalogueEntry[] = FORGE_SOURCE_CATALOGUE,
  ): Promise<ForgeSourceRepository> {
    let resolvedRoot: string;
    try {
      resolvedRoot = await realpath(repositoryRoot);
      const rootStat = await lstat(resolvedRoot);
      if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) {
        throw new Error("invalid");
      }
    } catch {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.repositoryRootInvalid,
        "The synthetic repository root is invalid.",
      );
    }
    return new ForgeSourceRepository(
      resolvedRoot,
      createForgeRepositoryIdentity("synthetic-test"),
      catalogue,
    );
  }

  getCatalogueEntry(
    sourceRootId: ForgeSourceRootId,
  ): ForgeSourceCatalogueEntry {
    const entry = this.catalogue.find(
      (candidate) => candidate.id === sourceRootId,
    );
    if (!entry) {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.sourceRootUnknown,
        "The requested source root is not registered.",
        { sourceRootId },
      );
    }
    return entry;
  }

  async readText(
    request: ForgeSourceReadRequest,
  ): Promise<ForgeSourceReadResult> {
    const entry = this.getCatalogueEntry(request.sourceRootId);
    const sourceRelativePath = normalizeForgeSourceRelativePath(
      request.relativePath,
    );
    assertForgeSourcePathAllowed(entry, sourceRelativePath);
    const sourceRoot = await resolveForgeSourceRoot(
      this.#repositoryRoot,
      entry,
    );
    const targetPath = await assertNoForgeSourceSymlinkSegments(
      sourceRoot,
      sourceRelativePath,
      entry.id,
    );

    const targetStat = await lstat(targetPath);
    if (!targetStat.isFile()) {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.sourceNotFile,
        "The requested public source is not a regular file.",
        { sourceRootId: entry.id },
      );
    }
    if (targetStat.size > entry.maxFileBytes) {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.sourceTooLarge,
        "The requested public source exceeds its server-owned file limit.",
        { sourceRootId: entry.id, maxFileBytes: entry.maxFileBytes },
      );
    }

    let bytes: Uint8Array;
    try {
      bytes = await readFile(targetPath);
    } catch {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.readFailed,
        "The requested public source could not be read.",
        { sourceRootId: entry.id },
      );
    }

    let fullContent: string;
    try {
      fullContent = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.invalidUtf8,
        "The requested source is not valid UTF-8 text.",
        { sourceRootId: entry.id },
      );
    }

    const outputLimit = boundedLimit(
      request.maxOutputBytes,
      entry.maxOutputBytes,
    );
    const decoded = truncateUtf8(bytes, outputLimit);
    const path = repositoryRelativePath(entry, sourceRelativePath);
    const resultState: ForgeSourceResultState = decoded.truncated
      ? "truncated"
      : "complete";
    const partialReasons: readonly ForgeSourcePartialReasonId[] =
      decoded.truncated ? ["output-limit-reached"] : [];

    return {
      content: decoded.content,
      provenance: {
        revision: FORGE_SOURCE_PROVENANCE_REVISION,
        sourceRootId: entry.id,
        informationClasses: entry.informationClasses,
        repositoryRelativePath: path,
        contentDigest: sha256(bytes),
        byteLength: bytes.byteLength,
        lineCount: countLines(fullContent),
        locator: wholeFileLocator(path),
        resultState,
        partialReasons,
        sourceAuthority: "evidence-only",
        canCreateTruth: false,
        canCreatePermission: false,
        canApproveCanon: false,
        canApproveMapping: false,
      },
    };
  }

  async listFiles(
    request: ForgeSourceListRequest,
  ): Promise<ForgeSourceListResult> {
    const entry = this.getCatalogueEntry(request.sourceRootId);
    const relativeDirectory = normalizeForgeSourceRelativePath(
      request.relativeDirectory ?? "",
      { allowEmpty: true },
    );

    if (relativeDirectory && forgeSourcePathIsProhibited(relativeDirectory)) {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.pathProhibited,
        "The requested directory belongs to a prohibited source class.",
        { sourceRootId: entry.id },
      );
    }

    let sourceRoot: string;
    try {
      sourceRoot = await resolveForgeSourceRoot(this.#repositoryRoot, entry);
    } catch (error) {
      if (
        error instanceof ForgeSourceError &&
        error.code === FORGE_SOURCE_ERROR_CODES.sourceRootUnavailable &&
        entry.availability === "optional-reserved"
      ) {
        return {
          sourceRootId: entry.id,
          items: [],
          resultState: "partial",
          partialReasons: ["unavailable-optional-root"],
          scannedFiles: 0,
          returnedFiles: 0,
          outputBytes: 0,
        };
      }
      throw error;
    }

    const targetDirectory = relativeDirectory
      ? await assertNoForgeSourceSymlinkSegments(
          sourceRoot,
          relativeDirectory,
          entry.id,
        )
      : sourceRoot;
    const directoryStat = await lstat(targetDirectory);
    if (!directoryStat.isDirectory()) {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.sourceNotDirectory,
        "The requested source path is not a directory.",
        { sourceRootId: entry.id },
      );
    }

    const maxFiles = boundedLimit(request.maxFiles, entry.maxFilesPerRequest);
    const maxOutputBytes = boundedLimit(
      request.maxOutputBytes,
      entry.maxOutputBytes,
    );
    const items: ForgeSourceListItem[] = [];
    const partialReasons = new Set<ForgeSourcePartialReasonId>();
    let scannedFiles = 0;
    let outputBytes = 0;
    let stop = false;

    const walk = async (
      absoluteDirectory: string,
      sourcePrefix: string,
    ): Promise<void> => {
      if (stop) return;
      const entries = (
        await readdir(absoluteDirectory, { withFileTypes: true })
      ).sort((left, right) => compareForgeSourcePaths(left.name, right.name));

      for (const directoryEntry of entries) {
        if (stop) break;
        const sourceRelativePath = sourcePrefix
          ? posix.join(sourcePrefix, directoryEntry.name)
          : directoryEntry.name;

        if (forgeSourcePathIsProhibited(sourceRelativePath)) continue;
        if (
          entry.excludedPathPrefixes.some((prefix) =>
            forgeSourcePathHasPrefix(sourceRelativePath, prefix),
          )
        ) {
          continue;
        }

        const absolutePath = join(absoluteDirectory, directoryEntry.name);
        if (directoryEntry.isSymbolicLink()) {
          partialReasons.add("symlink-skipped");
          continue;
        }
        if (directoryEntry.isDirectory()) {
          await walk(absolutePath, sourceRelativePath);
          continue;
        }
        if (
          !directoryEntry.isFile() ||
          !forgeSourcePathIsAllowed(entry, sourceRelativePath)
        ) {
          continue;
        }

        scannedFiles += 1;
        if (scannedFiles > maxFiles) {
          partialReasons.add("file-limit-reached");
          stop = true;
          break;
        }

        const fileStat = await lstat(absolutePath);
        if (fileStat.size > entry.maxFileBytes) {
          partialReasons.add("oversized-file-skipped");
          continue;
        }

        let bytes: Uint8Array;
        try {
          bytes = await readFile(absolutePath);
        } catch {
          throw createForgeSourceError(
            FORGE_SOURCE_ERROR_CODES.readFailed,
            "An allowlisted public source could not be read.",
            { sourceRootId: entry.id },
          );
        }

        let content: string;
        try {
          content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
        } catch {
          partialReasons.add("non-utf8-file-skipped");
          continue;
        }

        const path = repositoryRelativePath(entry, sourceRelativePath);
        const item: ForgeSourceListItem = {
          repositoryRelativePath: path,
          sourceRelativePath,
          contentDigest: sha256(bytes),
          byteLength: bytes.byteLength,
          lineCount: countLines(content),
          locator: wholeFileLocator(path),
        };
        const itemBytes = Buffer.byteLength(JSON.stringify(item), "utf8");
        if (outputBytes + itemBytes > maxOutputBytes) {
          partialReasons.add("output-limit-reached");
          stop = true;
          break;
        }
        items.push(item);
        outputBytes += itemBytes;
      }
    };

    await walk(targetDirectory, relativeDirectory);
    items.sort((left, right) =>
      compareForgeSourcePaths(
        left.repositoryRelativePath,
        right.repositoryRelativePath,
      ),
    );

    const reasons = [...partialReasons].sort(compareForgeSourcePaths);
    const resultState: ForgeSourceResultState = reasons.some(
      (reason) =>
        reason === "file-limit-reached" || reason === "output-limit-reached",
    )
      ? "truncated"
      : reasons.length > 0
        ? "partial"
        : "complete";

    return {
      sourceRootId: entry.id,
      items,
      resultState,
      partialReasons: reasons,
      scannedFiles,
      returnedFiles: items.length,
      outputBytes,
    };
  }
}

export const createForgeLineRangeLocator = (
  provenance: ForgeSourceProvenance,
  startLine: number,
  endLine: number,
): ForgeLineRangeLocator => {
  if (
    !Number.isSafeInteger(startLine) ||
    !Number.isSafeInteger(endLine) ||
    startLine < 1 ||
    endLine < startLine ||
    endLine > provenance.lineCount
  ) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.invalidLineRange,
      "Line locators must be ordered and remain within the source line count.",
      { lineCount: provenance.lineCount },
    );
  }
  return {
    kind: "line-range",
    repositoryRelativePath: provenance.repositoryRelativePath,
    startLine,
    endLine,
  };
};

export const createForgeObjectIdLocator = (
  provenance: ForgeSourceProvenance,
  objectId: string,
): ForgeObjectIdLocator => {
  if (
    typeof objectId !== "string" ||
    objectId.length === 0 ||
    objectId.length > MAX_OBJECT_ID_LENGTH ||
    /[\u0000-\u001F\u007F]/.test(objectId)
  ) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.invalidObjectId,
      "Object locators require a bounded public-safe object identity.",
    );
  }
  return {
    kind: "object-id",
    repositoryRelativePath: provenance.repositoryRelativePath,
    objectId,
  };
};
