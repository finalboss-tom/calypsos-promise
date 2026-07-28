import {
  FORGE_INFORMATION_CLASS_IDS,
  type ForgeInformationClassId,
} from "./contracts.js";
import {
  FORGE_PROHIBITED_SOURCE_FILE_NAMES,
  FORGE_PROHIBITED_SOURCE_SEGMENTS,
  FORGE_PROHIBITED_SOURCE_SUFFIXES,
  FORGE_SOURCE_ACCESS_MODES,
  FORGE_SOURCE_AVAILABILITY_STATES,
  FORGE_SOURCE_CATALOGUE_REVISION,
  FORGE_SOURCE_ROOT_IDS,
  type ForgeSourceCatalogueEntry,
  type ForgeSourceRootId,
} from "./source-contracts.js";

export const FORGE_SOURCE_CATALOGUE_VALIDATION_CODES = {
  duplicateRoot: "forge.source.catalogue.duplicate-root",
  missingRoot: "forge.source.catalogue.missing-root",
  unknownRoot: "forge.source.catalogue.unknown-root",
  invalidRevision: "forge.source.catalogue.invalid-revision",
  invalidInformationClass: "forge.source.catalogue.invalid-information-class",
  invalidRepositoryRoot: "forge.source.catalogue.invalid-repository-root",
  invalidAccessMode: "forge.source.catalogue.invalid-access-mode",
  invalidAvailability: "forge.source.catalogue.invalid-availability",
  invalidExactFile: "forge.source.catalogue.invalid-exact-file",
  invalidPrefix: "forge.source.catalogue.invalid-prefix",
  invalidExtension: "forge.source.catalogue.invalid-extension",
  invalidLimit: "forge.source.catalogue.invalid-limit",
  rootAuthority: "forge.source.catalogue.root-authority",
  callerRootSelection: "forge.source.catalogue.caller-root-selection",
  callerEscape: "forge.source.catalogue.caller-escape",
  symlinkPolicy: "forge.source.catalogue.symlink-policy",
  ordering: "forge.source.catalogue.ordering",
  exposure: "forge.source.catalogue.exposure",
  classCoverage: "forge.source.catalogue.class-coverage",
} as const;

export type ForgeSourceCatalogueValidationCode =
  (typeof FORGE_SOURCE_CATALOGUE_VALIDATION_CODES)[keyof typeof FORGE_SOURCE_CATALOGUE_VALIDATION_CODES];

export interface ForgeSourceCatalogueValidationIssue {
  readonly code: ForgeSourceCatalogueValidationCode;
  readonly path: string;
  readonly message: string;
}

const issue = (
  code: ForgeSourceCatalogueValidationCode,
  path: string,
  message: string,
): ForgeSourceCatalogueValidationIssue => ({ code, path, message });

const hasTraversalOrAbsoluteSyntax = (value: string): boolean => {
  const normalized = value.replaceAll("\\", "/");
  return (
    normalized.startsWith("/") ||
    /^[A-Za-z]:/.test(normalized) ||
    normalized.split("/").some((segment) => segment === ".." || segment === ".")
  );
};

const isSafeRelativePath = (value: string, allowDot: boolean): boolean => {
  if (allowDot && value === ".") return true;
  if (!value || value.includes("\0") || hasTraversalOrAbsoluteSyntax(value)) {
    return false;
  }
  return !value.startsWith("//") && !value.endsWith("/");
};

const isSafePrefix = (value: string): boolean => {
  if (!value.endsWith("/")) return false;
  const withoutSlash = value.slice(0, -1);
  return Boolean(withoutSlash) && isSafeRelativePath(withoutSlash, false);
};

const isSafeExactFile = (value: string): boolean =>
  isSafeRelativePath(value, false) && !value.includes("/");

const isKnownInformationClass = (
  value: string,
): value is ForgeInformationClassId =>
  (FORGE_INFORMATION_CLASS_IDS as readonly string[]).includes(value);

const isKnownRootId = (value: string): value is ForgeSourceRootId =>
  (FORGE_SOURCE_ROOT_IDS as readonly string[]).includes(value);

const isProhibitedName = (value: string): boolean => {
  const lower = value.toLowerCase();
  return (
    (FORGE_PROHIBITED_SOURCE_FILE_NAMES as readonly string[]).includes(lower) ||
    (FORGE_PROHIBITED_SOURCE_SUFFIXES as readonly string[]).some((suffix) =>
      lower.endsWith(suffix),
    ) ||
    (FORGE_PROHIBITED_SOURCE_SEGMENTS as readonly string[]).includes(lower)
  );
};

export const validateForgeSourceCatalogue = (
  catalogue: readonly ForgeSourceCatalogueEntry[],
): readonly ForgeSourceCatalogueValidationIssue[] => {
  const issues: ForgeSourceCatalogueValidationIssue[] = [];
  const seenRoots = new Set<string>();
  const coveredClasses = new Set<ForgeInformationClassId>();

  for (const [index, entry] of catalogue.entries()) {
    const base = `catalogue[${index}]`;

    if (!isKnownRootId(entry.id)) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.unknownRoot,
          `${base}.id`,
          "Source root identity is not part of the accepted catalogue.",
        ),
      );
    }
    if (seenRoots.has(entry.id)) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.duplicateRoot,
          `${base}.id`,
          "Source root identity must be unique.",
        ),
      );
    }
    seenRoots.add(entry.id);

    if (entry.revision !== FORGE_SOURCE_CATALOGUE_REVISION) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidRevision,
          `${base}.revision`,
          "Source catalogue revisions must match the accepted revision.",
        ),
      );
    }

    if (entry.informationClasses.length === 0) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidInformationClass,
          `${base}.informationClasses`,
          "Every source root must declare at least one public information class.",
        ),
      );
    }
    for (const [
      classIndex,
      informationClass,
    ] of entry.informationClasses.entries()) {
      if (!isKnownInformationClass(informationClass)) {
        issues.push(
          issue(
            FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidInformationClass,
            `${base}.informationClasses[${classIndex}]`,
            "Unknown source information class.",
          ),
        );
      } else {
        coveredClasses.add(informationClass);
      }
    }

    if (!isSafeRelativePath(entry.repositoryRelativeRoot, true)) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidRepositoryRoot,
          `${base}.repositoryRelativeRoot`,
          "Repository roots must be server-owned relative paths without traversal.",
        ),
      );
    }

    if (
      !(FORGE_SOURCE_ACCESS_MODES as readonly string[]).includes(
        entry.accessMode,
      )
    ) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidAccessMode,
          `${base}.accessMode`,
          "Unknown source access mode.",
        ),
      );
    }
    if (
      !(FORGE_SOURCE_AVAILABILITY_STATES as readonly string[]).includes(
        entry.availability,
      )
    ) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidAvailability,
          `${base}.availability`,
          "Unknown source availability state.",
        ),
      );
    }

    if (
      entry.accessMode === "exact-files" &&
      entry.exactFileNames.length === 0
    ) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidExactFile,
          `${base}.exactFileNames`,
          "Exact-file roots require at least one accepted file name.",
        ),
      );
    }
    for (const [fileIndex, fileName] of entry.exactFileNames.entries()) {
      if (!isSafeExactFile(fileName) || isProhibitedName(fileName)) {
        issues.push(
          issue(
            FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidExactFile,
            `${base}.exactFileNames[${fileIndex}]`,
            "Exact file names must be safe, direct, public repository file names.",
          ),
        );
      }
    }

    for (const [prefixIndex, prefix] of entry.allowedPathPrefixes.entries()) {
      if (!isSafePrefix(prefix)) {
        issues.push(
          issue(
            FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidPrefix,
            `${base}.allowedPathPrefixes[${prefixIndex}]`,
            "Allowed path prefixes must be normalized relative directory prefixes.",
          ),
        );
      }
    }
    for (const [prefixIndex, prefix] of entry.excludedPathPrefixes.entries()) {
      if (!isSafePrefix(prefix)) {
        issues.push(
          issue(
            FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidPrefix,
            `${base}.excludedPathPrefixes[${prefixIndex}]`,
            "Excluded path prefixes must be normalized relative directory prefixes.",
          ),
        );
      }
    }

    for (const [
      extensionIndex,
      extension,
    ] of entry.allowedExtensions.entries()) {
      if (
        extension !== "" &&
        (!extension.startsWith(".") || extension.includes("/"))
      ) {
        issues.push(
          issue(
            FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidExtension,
            `${base}.allowedExtensions[${extensionIndex}]`,
            "Allowed extensions must be empty or dot-prefixed file extensions.",
          ),
        );
      }
    }

    for (const [limitName, limit] of Object.entries({
      maxFileBytes: entry.maxFileBytes,
      maxFilesPerRequest: entry.maxFilesPerRequest,
      maxOutputBytes: entry.maxOutputBytes,
    })) {
      if (!Number.isSafeInteger(limit) || limit <= 0) {
        issues.push(
          issue(
            FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.invalidLimit,
            `${base}.${limitName}`,
            "Source limits must be positive safe integers.",
          ),
        );
      }
    }

    if (entry.rootAuthority !== "server-owned") {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.rootAuthority,
          `${base}.rootAuthority`,
          "Source roots must remain server-owned.",
        ),
      );
    }
    if (entry.callerCanSelectRoot !== false) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.callerRootSelection,
          `${base}.callerCanSelectRoot`,
          "Callers cannot select source roots.",
        ),
      );
    }
    if (entry.callerCanEscapeRoot !== false) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.callerEscape,
          `${base}.callerCanEscapeRoot`,
          "Callers cannot escape a source root.",
        ),
      );
    }
    if (entry.symlinkPolicy !== "reject") {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.symlinkPolicy,
          `${base}.symlinkPolicy`,
          "Source traversal must reject symlinks.",
        ),
      );
    }
    if (entry.deterministicOrdering !== "unicode-code-point") {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.ordering,
          `${base}.deterministicOrdering`,
          "Source ordering must be deterministic and locale-independent.",
        ),
      );
    }
    if (entry.toolExposure !== "not-exposed") {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.exposure,
          `${base}.toolExposure`,
          "Sprint 7.3 source roots remain unexposed to MCP tools.",
        ),
      );
    }
  }

  for (const rootId of FORGE_SOURCE_ROOT_IDS) {
    if (!seenRoots.has(rootId)) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.missingRoot,
          "catalogue",
          `Accepted source root ${rootId} is missing.`,
        ),
      );
    }
  }

  for (const informationClass of FORGE_INFORMATION_CLASS_IDS) {
    if (!coveredClasses.has(informationClass)) {
      issues.push(
        issue(
          FORGE_SOURCE_CATALOGUE_VALIDATION_CODES.classCoverage,
          "catalogue",
          `Information class ${informationClass} has no server-owned source root.`,
        ),
      );
    }
  }

  return issues;
};
