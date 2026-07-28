import type { ForgeInformationClassId } from "./contracts.js";

export const FORGE_SOURCE_CATALOGUE_REVISION = "1" as const;
export const FORGE_SOURCE_PROVENANCE_REVISION = "1" as const;

export const FORGE_SOURCE_ROOT_IDS = [
  "forge.root-documents",
  "forge.docs",
  "forge.content",
  "forge.content-schema",
  "forge.health-schema",
  "forge.house-of-keys",
  "forge.aster",
  "forge.public-standards",
  "forge.synthetic-connectors",
] as const;

export type ForgeSourceRootId = (typeof FORGE_SOURCE_ROOT_IDS)[number];

export const FORGE_SOURCE_ACCESS_MODES = [
  "exact-files",
  "recursive-tree",
] as const;

export type ForgeSourceAccessMode = (typeof FORGE_SOURCE_ACCESS_MODES)[number];

export const FORGE_SOURCE_AVAILABILITY_STATES = [
  "required",
  "optional-reserved",
] as const;

export type ForgeSourceAvailabilityState =
  (typeof FORGE_SOURCE_AVAILABILITY_STATES)[number];

export const FORGE_SOURCE_RESULT_STATES = [
  "complete",
  "partial",
  "truncated",
] as const;

export type ForgeSourceResultState = (typeof FORGE_SOURCE_RESULT_STATES)[number];

export const FORGE_SOURCE_PARTIAL_REASON_IDS = [
  "file-limit-reached",
  "output-limit-reached",
  "symlink-skipped",
  "unavailable-optional-root",
  "oversized-file-skipped",
  "non-utf8-file-skipped",
] as const;

export type ForgeSourcePartialReasonId =
  (typeof FORGE_SOURCE_PARTIAL_REASON_IDS)[number];

export const FORGE_SOURCE_LOCATOR_KINDS = [
  "whole-file",
  "line-range",
  "object-id",
] as const;

export type ForgeSourceLocatorKind =
  (typeof FORGE_SOURCE_LOCATOR_KINDS)[number];

export const FORGE_SOURCE_ERROR_CODES = {
  repositoryRootNotFound: "forge.source.repository-root-not-found",
  repositoryRootInvalid: "forge.source.repository-root-invalid",
  catalogueInvalid: "forge.source.catalogue-invalid",
  sourceRootUnknown: "forge.source.root-unknown",
  sourceRootUnavailable: "forge.source.root-unavailable",
  invalidRelativePath: "forge.source.invalid-relative-path",
  encodedTraversal: "forge.source.encoded-traversal",
  absolutePath: "forge.source.absolute-path",
  pathNotAllowlisted: "forge.source.path-not-allowlisted",
  pathProhibited: "forge.source.path-prohibited",
  pathEscape: "forge.source.path-escape",
  symlinkRejected: "forge.source.symlink-rejected",
  sourceNotFound: "forge.source.not-found",
  sourceNotFile: "forge.source.not-file",
  sourceNotDirectory: "forge.source.not-directory",
  sourceTooLarge: "forge.source.too-large",
  invalidUtf8: "forge.source.invalid-utf8",
  readFailed: "forge.source.read-failed",
  invalidLineRange: "forge.source.invalid-line-range",
  invalidObjectId: "forge.source.invalid-object-id",
  invalidRequestLimit: "forge.source.invalid-request-limit",
} as const;

export type ForgeSourceErrorCode =
  (typeof FORGE_SOURCE_ERROR_CODES)[keyof typeof FORGE_SOURCE_ERROR_CODES];

export const FORGE_PROHIBITED_SOURCE_SEGMENTS = [
  ".git",
  ".github-private",
  ".next",
  ".pnpm-store",
  ".turbo",
  ".vercel",
  "coverage",
  "dist",
  "node_modules",
  "private",
  "protected",
  "provider-negotiations",
  "provider-contracts",
  "provider-evaluations",
  "proprietary-mappings",
  "protected-interoperability-findings",
  "incident-evidence",
  "conduct-evidence",
  "financial-source-records",
] as const;

export const FORGE_PROHIBITED_SOURCE_FILE_NAMES = [
  ".env",
  ".npmrc",
  "credentials.json",
  "id_ed25519",
  "id_rsa",
  "secrets.json",
] as const;

export const FORGE_PROHIBITED_SOURCE_SUFFIXES = [
  ".env.local",
  ".key",
  ".p12",
  ".pem",
  ".pfx",
] as const;

export interface ForgeSourceCatalogueEntry {
  readonly id: ForgeSourceRootId;
  readonly revision: typeof FORGE_SOURCE_CATALOGUE_REVISION;
  readonly purpose: string;
  readonly informationClasses: readonly ForgeInformationClassId[];
  readonly repositoryRelativeRoot: string;
  readonly accessMode: ForgeSourceAccessMode;
  readonly availability: ForgeSourceAvailabilityState;
  readonly exactFileNames: readonly string[];
  readonly allowedPathPrefixes: readonly string[];
  readonly allowedExtensions: readonly string[];
  readonly excludedPathPrefixes: readonly string[];
  readonly maxFileBytes: number;
  readonly maxFilesPerRequest: number;
  readonly maxOutputBytes: number;
  readonly rootAuthority: "server-owned";
  readonly callerCanSelectRoot: false;
  readonly callerCanEscapeRoot: false;
  readonly symlinkPolicy: "reject";
  readonly deterministicOrdering: "unicode-code-point";
  readonly toolExposure: "not-exposed";
}

export interface ForgeRepositoryIdentity {
  readonly rootKind: "process-discovered" | "synthetic-test";
  readonly catalogueRevision: typeof FORGE_SOURCE_CATALOGUE_REVISION;
  readonly markerPackageName: "calypsos-promise";
  readonly callerCanSelectRoot: false;
}

export interface ForgeWholeFileLocator {
  readonly kind: "whole-file";
  readonly repositoryRelativePath: string;
}

export interface ForgeLineRangeLocator {
  readonly kind: "line-range";
  readonly repositoryRelativePath: string;
  readonly startLine: number;
  readonly endLine: number;
}

export interface ForgeObjectIdLocator {
  readonly kind: "object-id";
  readonly repositoryRelativePath: string;
  readonly objectId: string;
}

export type ForgeSourceLocator =
  | ForgeWholeFileLocator
  | ForgeLineRangeLocator
  | ForgeObjectIdLocator;

export interface ForgeSourceProvenance {
  readonly revision: typeof FORGE_SOURCE_PROVENANCE_REVISION;
  readonly sourceRootId: ForgeSourceRootId;
  readonly informationClasses: readonly ForgeInformationClassId[];
  readonly repositoryRelativePath: string;
  readonly contentDigest: `sha256:${string}`;
  readonly byteLength: number;
  readonly lineCount: number;
  readonly locator: ForgeSourceLocator;
  readonly resultState: ForgeSourceResultState;
  readonly partialReasons: readonly ForgeSourcePartialReasonId[];
  readonly sourceAuthority: "evidence-only";
  readonly canCreateTruth: false;
  readonly canCreatePermission: false;
  readonly canApproveCanon: false;
  readonly canApproveMapping: false;
}

export interface ForgeSourceReadRequest {
  readonly sourceRootId: ForgeSourceRootId;
  readonly relativePath: string;
  readonly maxOutputBytes?: number;
}

export interface ForgeSourceReadResult {
  readonly content: string;
  readonly provenance: ForgeSourceProvenance;
}

export interface ForgeSourceListRequest {
  readonly sourceRootId: ForgeSourceRootId;
  readonly relativeDirectory?: string;
  readonly maxFiles?: number;
  readonly maxOutputBytes?: number;
}

export interface ForgeSourceListItem {
  readonly repositoryRelativePath: string;
  readonly sourceRelativePath: string;
  readonly contentDigest: `sha256:${string}`;
  readonly byteLength: number;
  readonly lineCount: number;
  readonly locator: ForgeWholeFileLocator;
}

export interface ForgeSourceListResult {
  readonly sourceRootId: ForgeSourceRootId;
  readonly items: readonly ForgeSourceListItem[];
  readonly resultState: ForgeSourceResultState;
  readonly partialReasons: readonly ForgeSourcePartialReasonId[];
  readonly scannedFiles: number;
  readonly returnedFiles: number;
  readonly outputBytes: number;
}

const MARKDOWN_AND_DATA_EXTENSIONS = [".json", ".md", ".txt", ".yaml", ".yml"];
const PACKAGE_SOURCE_EXTENSIONS = [".json", ".md", ".mjs", ".ts"];

const packageSourceEntry = (
  id: ForgeSourceRootId,
  purpose: string,
  repositoryRelativeRoot: string,
  informationClasses: readonly ForgeInformationClassId[],
): ForgeSourceCatalogueEntry => ({
  id,
  revision: FORGE_SOURCE_CATALOGUE_REVISION,
  purpose,
  informationClasses,
  repositoryRelativeRoot,
  accessMode: "recursive-tree",
  availability: "required",
  exactFileNames: [],
  allowedPathPrefixes: ["src/", "schema/", "schemas/", "fixtures/", "examples/", "test/"],
  allowedExtensions: PACKAGE_SOURCE_EXTENSIONS,
  excludedPathPrefixes: ["dist/", "node_modules/", "coverage/"],
  maxFileBytes: 1_048_576,
  maxFilesPerRequest: 200,
  maxOutputBytes: 2_097_152,
  rootAuthority: "server-owned",
  callerCanSelectRoot: false,
  callerCanEscapeRoot: false,
  symlinkPolicy: "reject",
  deterministicOrdering: "unicode-code-point",
  toolExposure: "not-exposed",
});

export const FORGE_SOURCE_CATALOGUE: readonly ForgeSourceCatalogueEntry[] = [
  {
    id: "forge.root-documents",
    revision: FORGE_SOURCE_CATALOGUE_REVISION,
    purpose: "Canonical public repository entry documents.",
    informationClasses: ["public-documentation"],
    repositoryRelativeRoot: ".",
    accessMode: "exact-files",
    availability: "required",
    exactFileNames: [
      "CODE_OF_CONDUCT.md",
      "CONTRIBUTING.md",
      "GOVERNANCE.md",
      "LICENSE",
      "PUBLIC_DOMAIN.md",
      "README.md",
      "ROADMAP.md",
      "SECURITY.md",
      "SUPPORT.md",
      "VISION.md",
    ],
    allowedPathPrefixes: [],
    allowedExtensions: ["", ".md"],
    excludedPathPrefixes: [],
    maxFileBytes: 1_048_576,
    maxFilesPerRequest: 32,
    maxOutputBytes: 2_097_152,
    rootAuthority: "server-owned",
    callerCanSelectRoot: false,
    callerCanEscapeRoot: false,
    symlinkPolicy: "reject",
    deterministicOrdering: "unicode-code-point",
    toolExposure: "not-exposed",
  },
  {
    id: "forge.docs",
    revision: FORGE_SOURCE_CATALOGUE_REVISION,
    purpose: "Public documentation, decisions, policies, roadmaps, and architecture.",
    informationClasses: ["public-documentation", "public-standards-reference"],
    repositoryRelativeRoot: "docs",
    accessMode: "recursive-tree",
    availability: "required",
    exactFileNames: [],
    allowedPathPrefixes: [],
    allowedExtensions: MARKDOWN_AND_DATA_EXTENSIONS,
    excludedPathPrefixes: [
      "private/",
      "protected/",
      "security-reports/",
      "incident-evidence/",
      "provider-negotiations/",
      "provider-contracts/",
      "provider-evaluations/",
      "proprietary-mappings/",
      "protected-interoperability-findings/",
      "conduct-evidence/",
      "financial-source-records/",
    ],
    maxFileBytes: 1_048_576,
    maxFilesPerRequest: 500,
    maxOutputBytes: 4_194_304,
    rootAuthority: "server-owned",
    callerCanSelectRoot: false,
    callerCanEscapeRoot: false,
    symlinkPolicy: "reject",
    deterministicOrdering: "unicode-code-point",
    toolExposure: "not-exposed",
  },
  {
    id: "forge.content",
    revision: FORGE_SOURCE_CATALOGUE_REVISION,
    purpose: "Public lore, quest, dialogue, education, and safety content.",
    informationClasses: ["public-content", "public-synthetic-fixture"],
    repositoryRelativeRoot: "content",
    accessMode: "recursive-tree",
    availability: "required",
    exactFileNames: [],
    allowedPathPrefixes: [],
    allowedExtensions: MARKDOWN_AND_DATA_EXTENSIONS,
    excludedPathPrefixes: ["private/", "protected/"],
    maxFileBytes: 1_048_576,
    maxFilesPerRequest: 500,
    maxOutputBytes: 4_194_304,
    rootAuthority: "server-owned",
    callerCanSelectRoot: false,
    callerCanEscapeRoot: false,
    symlinkPolicy: "reject",
    deterministicOrdering: "unicode-code-point",
    toolExposure: "not-exposed",
  },
  packageSourceEntry(
    "forge.content-schema",
    "Public content schemas, deterministic validators, examples, and synthetic fixtures.",
    "packages/content-schema",
    ["public-schema", "public-generated-artifact", "public-synthetic-fixture"],
  ),
  packageSourceEntry(
    "forge.health-schema",
    "Public Living Chronicle contracts, validators, examples, and synthetic fixtures.",
    "packages/health-schema",
    ["public-schema", "public-synthetic-fixture"],
  ),
  packageSourceEntry(
    "forge.house-of-keys",
    "Public House of Keys contracts, validators, evaluators, and synthetic fixtures.",
    "packages/house-of-keys",
    ["public-schema", "public-synthetic-fixture"],
  ),
  packageSourceEntry(
    "forge.aster",
    "Public Aster contracts, validators, compatibility evidence, and synthetic fixtures.",
    "packages/aster",
    ["public-schema", "public-synthetic-fixture"],
  ),
  {
    id: "forge.public-standards",
    revision: FORGE_SOURCE_CATALOGUE_REVISION,
    purpose: "Explicitly public standards references and public mapping guidance.",
    informationClasses: ["public-standards-reference"],
    repositoryRelativeRoot: "docs",
    accessMode: "recursive-tree",
    availability: "optional-reserved",
    exactFileNames: [],
    allowedPathPrefixes: ["sources/", "standards/", "architecture/", "product/"],
    allowedExtensions: MARKDOWN_AND_DATA_EXTENSIONS,
    excludedPathPrefixes: [
      "private/",
      "protected/",
      "provider-negotiations/",
      "provider-contracts/",
      "provider-evaluations/",
      "proprietary-mappings/",
      "protected-interoperability-findings/",
    ],
    maxFileBytes: 1_048_576,
    maxFilesPerRequest: 200,
    maxOutputBytes: 2_097_152,
    rootAuthority: "server-owned",
    callerCanSelectRoot: false,
    callerCanEscapeRoot: false,
    symlinkPolicy: "reject",
    deterministicOrdering: "unicode-code-point",
    toolExposure: "not-exposed",
  },
  {
    id: "forge.synthetic-connectors",
    revision: FORGE_SOURCE_CATALOGUE_REVISION,
    purpose: "Explicitly synthetic connector fixtures with no proprietary source material.",
    informationClasses: ["public-synthetic-connector-fixture"],
    repositoryRelativeRoot: "fixtures/connectors",
    accessMode: "recursive-tree",
    availability: "optional-reserved",
    exactFileNames: [],
    allowedPathPrefixes: [],
    allowedExtensions: [".json", ".md", ".yaml", ".yml"],
    excludedPathPrefixes: [],
    maxFileBytes: 1_048_576,
    maxFilesPerRequest: 200,
    maxOutputBytes: 2_097_152,
    rootAuthority: "server-owned",
    callerCanSelectRoot: false,
    callerCanEscapeRoot: false,
    symlinkPolicy: "reject",
    deterministicOrdering: "unicode-code-point",
    toolExposure: "not-exposed",
  },
];
