import { lstat, readFile, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

import {
  FORGE_SOURCE_CATALOGUE,
  FORGE_SOURCE_CATALOGUE_REVISION,
  FORGE_SOURCE_ERROR_CODES,
  type ForgeRepositoryIdentity,
  type ForgeSourceCatalogueEntry,
  type ForgeSourceRootId,
} from "./source-contracts.js";
import { createForgeSourceError, ForgeSourceError } from "./source-errors.js";
import { forgePathIsWithin } from "./source-paths.js";
import { validateForgeSourceCatalogue } from "./validate-source-catalogue.js";

const REPOSITORY_PACKAGE_NAME = "calypsos-promise" as const;

const parseRepositoryPackageName = async (
  directory: string,
): Promise<string | undefined> => {
  try {
    const packagePath = join(directory, "package.json");
    const packageStat = await lstat(packagePath);
    if (!packageStat.isFile() || packageStat.isSymbolicLink()) return undefined;
    const parsed = JSON.parse(await readFile(packagePath, "utf8")) as {
      name?: unknown;
    };
    return typeof parsed.name === "string" ? parsed.name : undefined;
  } catch {
    return undefined;
  }
};

const directoryHasWorkspaceMarker = async (
  directory: string,
): Promise<boolean> => {
  try {
    const marker = await lstat(join(directory, "pnpm-workspace.yaml"));
    return marker.isFile() && !marker.isSymbolicLink();
  } catch {
    return false;
  }
};

export const discoverForgeRepositoryRoot = async (): Promise<string> => {
  let current: string;
  try {
    current = await realpath(process.cwd());
  } catch {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.repositoryRootInvalid,
      "The process working directory cannot be resolved safely.",
    );
  }

  while (true) {
    const [packageName, hasWorkspace] = await Promise.all([
      parseRepositoryPackageName(current),
      directoryHasWorkspaceMarker(current),
    ]);
    if (packageName === REPOSITORY_PACKAGE_NAME && hasWorkspace) return current;

    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }

  throw createForgeSourceError(
    FORGE_SOURCE_ERROR_CODES.repositoryRootNotFound,
    "The Calypso's Promise repository root was not found from the process working directory.",
  );
};

export const assertForgeSourceCatalogueValid = (
  catalogue: readonly ForgeSourceCatalogueEntry[],
): void => {
  const issues = validateForgeSourceCatalogue(catalogue);
  if (issues.length > 0) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.catalogueInvalid,
      "The server-owned source catalogue is invalid.",
      { issueCount: issues.length },
    );
  }
};

export const resolveForgeSourceRoot = async (
  repositoryRoot: string,
  entry: ForgeSourceCatalogueEntry,
): Promise<string> => {
  const candidate = resolve(repositoryRoot, entry.repositoryRelativeRoot);
  if (!forgePathIsWithin(repositoryRoot, candidate)) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.pathEscape,
      "A configured source root escapes the repository boundary.",
      { sourceRootId: entry.id },
    );
  }

  try {
    const candidateStat = await lstat(candidate);
    if (candidateStat.isSymbolicLink()) {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.symlinkRejected,
        "Symbolic links are not accepted as source roots.",
        { sourceRootId: entry.id },
      );
    }
    if (!candidateStat.isDirectory()) {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.sourceNotDirectory,
        "The configured source root is not a directory.",
        { sourceRootId: entry.id },
      );
    }
    const resolved = await realpath(candidate);
    if (!forgePathIsWithin(repositoryRoot, resolved)) {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.pathEscape,
        "A configured source root resolves outside the repository boundary.",
        { sourceRootId: entry.id },
      );
    }
    return resolved;
  } catch (error) {
    if (error instanceof ForgeSourceError) throw error;
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.sourceRootUnavailable,
      "The configured source root is unavailable.",
      {
        sourceRootId: entry.id,
        optional: entry.availability === "optional-reserved",
      },
    );
  }
};

export const assertNoForgeSourceSymlinkSegments = async (
  sourceRoot: string,
  relativePath: string,
  sourceRootId: ForgeSourceRootId,
): Promise<string> => {
  let current = sourceRoot;
  for (const segment of relativePath.split("/")) {
    current = join(current, segment);
    let currentStat;
    try {
      currentStat = await lstat(current);
    } catch {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.sourceNotFound,
        "The requested public source does not exist.",
        { sourceRootId },
      );
    }
    if (currentStat.isSymbolicLink()) {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.symlinkRejected,
        "Symbolic links are not accepted in source paths.",
        { sourceRootId },
      );
    }
  }

  const resolved = await realpath(current);
  if (!forgePathIsWithin(sourceRoot, resolved)) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.pathEscape,
      "The requested source resolves outside its server-owned root.",
      { sourceRootId },
    );
  }
  return resolved;
};

export const createForgeRepositoryIdentity = (
  rootKind: ForgeRepositoryIdentity["rootKind"],
): ForgeRepositoryIdentity => ({
  rootKind,
  catalogueRevision: FORGE_SOURCE_CATALOGUE_REVISION,
  markerPackageName: REPOSITORY_PACKAGE_NAME,
  callerCanSelectRoot: false,
});

export const createProcessForgeSourceRoot = async (): Promise<{
  readonly repositoryRoot: string;
  readonly identity: ForgeRepositoryIdentity;
  readonly catalogue: readonly ForgeSourceCatalogueEntry[];
}> => ({
  repositoryRoot: await discoverForgeRepositoryRoot(),
  identity: createForgeRepositoryIdentity("process-discovered"),
  catalogue: FORGE_SOURCE_CATALOGUE,
});
