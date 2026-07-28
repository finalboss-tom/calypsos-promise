import { extname, isAbsolute, posix, relative, sep } from "node:path";

import {
  FORGE_PROHIBITED_SOURCE_FILE_NAMES,
  FORGE_PROHIBITED_SOURCE_SEGMENTS,
  FORGE_PROHIBITED_SOURCE_SUFFIXES,
  FORGE_SOURCE_ERROR_CODES,
  type ForgeSourceCatalogueEntry,
} from "./source-contracts.js";
import { createForgeSourceError } from "./source-errors.js";

const MAX_RELATIVE_PATH_LENGTH = 2_048;

export const compareForgeSourcePaths = (
  left: string,
  right: string,
): number => (left < right ? -1 : left > right ? 1 : 0);

export const forgePathIsWithin = (
  parentPath: string,
  childPath: string,
): boolean => {
  const result = relative(parentPath, childPath);
  return (
    result === "" ||
    (!result.startsWith(`..${sep}`) && result !== ".." && !isAbsolute(result))
  );
};

const decodePathInput = (input: string): { value: string; decoded: boolean } => {
  let value = input.normalize("NFKC");
  let decoded = false;

  for (let iteration = 0; iteration < 4; iteration += 1) {
    let next: string;
    try {
      next = decodeURIComponent(value);
    } catch {
      throw createForgeSourceError(
        FORGE_SOURCE_ERROR_CODES.invalidRelativePath,
        "Source path contains invalid percent encoding.",
      );
    }
    if (next === value) break;
    decoded = true;
    value = next;
  }

  return { value, decoded };
};

export const normalizeForgeSourceRelativePath = (
  input: string,
  options: { readonly allowEmpty?: boolean } = {},
): string => {
  if (typeof input !== "string" || input.length > MAX_RELATIVE_PATH_LENGTH) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.invalidRelativePath,
      "Source path is missing or exceeds the public path limit.",
    );
  }

  const decoded = decodePathInput(input);
  let value = decoded.value.replaceAll("\\", "/");

  if (value.includes("\0") || /[\u0000-\u001F\u007F]/.test(value)) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.invalidRelativePath,
      "Source path contains prohibited control characters.",
    );
  }

  if (
    value.startsWith("/") ||
    value.startsWith("//") ||
    /^[A-Za-z]:/.test(value) ||
    /^[A-Za-z][A-Za-z0-9+.-]*:/.test(value)
  ) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.absolutePath,
      "Absolute paths and URI-like paths are not accepted.",
    );
  }

  while (value.endsWith("/")) value = value.slice(0, -1);
  if (value === "" && options.allowEmpty) return "";
  if (value === "") {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.invalidRelativePath,
      "A source-relative file path is required.",
    );
  }

  const segments = value.split("/");
  const containsTraversal = segments.some(
    (segment) => segment === "." || segment === ".." || segment === "",
  );
  if (containsTraversal) {
    throw createForgeSourceError(
      decoded.decoded
        ? FORGE_SOURCE_ERROR_CODES.encodedTraversal
        : FORGE_SOURCE_ERROR_CODES.invalidRelativePath,
      "Source path traversal and ambiguous path segments are prohibited.",
    );
  }

  const normalized = posix.normalize(value);
  if (
    normalized !== value ||
    normalized.startsWith("../") ||
    normalized === ".."
  ) {
    throw createForgeSourceError(
      decoded.decoded
        ? FORGE_SOURCE_ERROR_CODES.encodedTraversal
        : FORGE_SOURCE_ERROR_CODES.invalidRelativePath,
      "Source path must already be normalized and remain within its root.",
    );
  }

  return normalized;
};

export const forgeSourcePathIsProhibited = (
  relativePath: string,
): boolean => {
  const segments = relativePath.toLowerCase().split("/");
  const fileName = segments.at(-1) ?? "";

  return (
    segments.some(
      (segment) =>
        segment.startsWith(".") ||
        (FORGE_PROHIBITED_SOURCE_SEGMENTS as readonly string[]).includes(segment),
    ) ||
    (FORGE_PROHIBITED_SOURCE_FILE_NAMES as readonly string[]).includes(fileName) ||
    (FORGE_PROHIBITED_SOURCE_SUFFIXES as readonly string[]).some((suffix) =>
      fileName.endsWith(suffix),
    )
  );
};

export const forgeSourcePathHasPrefix = (
  relativePath: string,
  prefix: string,
): boolean =>
  relativePath.startsWith(prefix) || relativePath === prefix.slice(0, -1);

export const forgeSourcePathIsAllowed = (
  entry: ForgeSourceCatalogueEntry,
  relativePath: string,
): boolean => {
  if (
    entry.excludedPathPrefixes.some((prefix) =>
      forgeSourcePathHasPrefix(relativePath, prefix),
    )
  ) {
    return false;
  }

  if (entry.accessMode === "exact-files") {
    return !relativePath.includes("/") && entry.exactFileNames.includes(relativePath);
  }

  if (
    entry.allowedPathPrefixes.length > 0 &&
    !entry.allowedPathPrefixes.some((prefix) =>
      forgeSourcePathHasPrefix(relativePath, prefix),
    )
  ) {
    return false;
  }

  return entry.allowedExtensions.includes(extname(relativePath).toLowerCase());
};

export const assertForgeSourcePathAllowed = (
  entry: ForgeSourceCatalogueEntry,
  relativePath: string,
): void => {
  if (forgeSourcePathIsProhibited(relativePath)) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.pathProhibited,
      "The requested path belongs to a prohibited source class.",
      { sourceRootId: entry.id },
    );
  }
  if (!forgeSourcePathIsAllowed(entry, relativePath)) {
    throw createForgeSourceError(
      FORGE_SOURCE_ERROR_CODES.pathNotAllowlisted,
      "The requested path is not allowlisted for this source root.",
      { sourceRootId: entry.id },
    );
  }
};
