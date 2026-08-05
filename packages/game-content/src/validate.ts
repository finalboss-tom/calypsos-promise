import {
  CONTENT_SCHEMA_VERSION,
  validateContent,
} from "@calypsos-promise/content-schema";
import {
  GAME_CONTENT_API_VERSION,
  GAME_CONTENT_DEFAULT_LOCALE,
  GAME_CONTENT_ENTRIES,
  GAME_CONTENT_INFORMATION_CLASS,
  GAME_CONTENT_MANIFEST,
  GAME_CONTENT_PACKAGE_ID,
  GAME_CONTENT_PACKAGE_VERSION,
  type GameContentEntry,
  type GameContentPackageManifest,
  type GamePlatform,
} from "./index.js";

export interface GameContentValidationIssue {
  path: string;
  message: string;
}

export interface GameContentValidationResult {
  ok: boolean;
  issues: GameContentValidationIssue[];
}

const REQUIRED_PLATFORMS: GamePlatform[] = ["browser", "ios", "android"];
const FORBIDDEN_KEYS = new Set([
  "accountId",
  "analyticsId",
  "accessToken",
  "refreshToken",
  "email",
  "phone",
  "dateOfBirth",
  "chronicleRecord",
  "permissionGrant",
  "providerPayload",
  "researchParticipantId",
  "paymentMethod",
]);

export function validateGameContentPackage(
  manifest: GameContentPackageManifest = GAME_CONTENT_MANIFEST,
  entries: readonly GameContentEntry[] = GAME_CONTENT_ENTRIES,
): GameContentValidationResult {
  const issues: GameContentValidationIssue[] = [];

  requireEqual(manifest.id, GAME_CONTENT_PACKAGE_ID, "manifest.id", issues);
  requireEqual(
    manifest.version,
    GAME_CONTENT_PACKAGE_VERSION,
    "manifest.version",
    issues,
  );
  requireEqual(
    manifest.apiVersion,
    GAME_CONTENT_API_VERSION,
    "manifest.apiVersion",
    issues,
  );
  requireEqual(
    manifest.contentSchemaVersion,
    CONTENT_SCHEMA_VERSION,
    "manifest.contentSchemaVersion",
    issues,
  );
  requireEqual(
    manifest.informationClass,
    GAME_CONTENT_INFORMATION_CLASS,
    "manifest.informationClass",
    issues,
  );
  requireEqual(manifest.synthetic, true, "manifest.synthetic", issues);
  requireEqual(
    manifest.defaultLocale,
    GAME_CONTENT_DEFAULT_LOCALE,
    "manifest.defaultLocale",
    issues,
  );

  if (!manifest.supportedLocales.includes(manifest.defaultLocale)) {
    issues.push({
      path: "manifest.supportedLocales",
      message: "The default locale must be supported.",
    });
  }
  requirePlatforms(
    manifest.compatibility.platforms,
    "manifest.compatibility.platforms",
    issues,
  );
  requireEqual(
    manifest.compatibility.requiresModelProvider,
    false,
    "manifest.compatibility.requiresModelProvider",
    issues,
  );
  requireEqual(
    manifest.compatibility.requiresNetwork,
    false,
    "manifest.compatibility.requiresNetwork",
    issues,
  );
  requireEqual(
    manifest.migration.preserveSyntheticSessionState,
    false,
    "manifest.migration.preserveSyntheticSessionState",
    issues,
  );
  requireEqual(
    manifest.migration.unknownVersionBehavior,
    "reject-and-restart-synthetic-session",
    "manifest.migration.unknownVersionBehavior",
    issues,
  );

  for (const [key, value] of Object.entries(manifest.authority)) {
    if (
      ["contentIdentity", "clientState", "longitudinalIntelligence"].includes(
        key,
      )
    ) {
      continue;
    }
    if (value !== false) {
      issues.push({
        path: `manifest.authority.${key}`,
        message: "Public synthetic content cannot activate authority.",
      });
    }
  }

  if (entries.length === 0) {
    issues.push({
      path: "entries",
      message: "At least one public synthetic fixture is required.",
    });
    return { ok: false, issues };
  }

  const contentKeys = new Set<string>();
  const knownIds = new Set(entries.map(({ content }) => content.id));
  const manifestIds = new Set(manifest.contentIds);

  if (manifestIds.size !== manifest.contentIds.length) {
    issues.push({
      path: "manifest.contentIds",
      message: "Manifest content IDs must be unique.",
    });
  }

  for (const id of knownIds) {
    if (!manifestIds.has(id)) {
      issues.push({
        path: "manifest.contentIds",
        message: `Missing content ID ${id}.`,
      });
    }
  }
  for (const id of manifestIds) {
    if (!knownIds.has(id)) {
      issues.push({
        path: "manifest.contentIds",
        message: `Unknown content ID ${id}.`,
      });
    }
  }

  entries.forEach((entry, index) => {
    const prefix = `entries.${index}`;
    const key = `${entry.content.id}@${entry.content.locale}`;
    if (contentKeys.has(key)) {
      issues.push({
        path: `${prefix}.content.id`,
        message: `Duplicate content-locale key ${key}.`,
      });
    }
    contentKeys.add(key);

    const schemaResult = validateContent(entry.content);
    for (const issue of schemaResult.issues) {
      issues.push({
        path: `${prefix}.content.${issue.path}`,
        message: issue.message,
      });
    }

    if (!manifest.supportedLocales.includes(entry.content.locale)) {
      issues.push({
        path: `${prefix}.content.locale`,
        message: `Unsupported locale ${entry.content.locale}.`,
      });
    }
    requireEqual(
      entry.provenance.informationClass,
      GAME_CONTENT_INFORMATION_CLASS,
      `${prefix}.provenance.informationClass`,
      issues,
    );
    requireEqual(
      entry.provenance.synthetic,
      true,
      `${prefix}.provenance.synthetic`,
      issues,
    );
    if (!entry.provenance.sourcePath.startsWith("packages/game-content/")) {
      issues.push({
        path: `${prefix}.provenance.sourcePath`,
        message: "Provenance must resolve to the game-content package.",
      });
    }
    if (entry.provenance.authorship.responsibleHumans.length === 0) {
      issues.push({
        path: `${prefix}.provenance.authorship.responsibleHumans`,
        message: "At least one responsible human is required.",
      });
    }
    requireEqual(
      entry.compatibility.apiVersion,
      manifest.apiVersion,
      `${prefix}.compatibility.apiVersion`,
      issues,
    );
    requirePlatforms(
      entry.compatibility.platforms,
      `${prefix}.compatibility.platforms`,
      issues,
    );
    requireAccessibility(entry, prefix, issues);
    inspectForbiddenKeys(entry, prefix, issues);
    validateReferences(entry, knownIds, prefix, issues);
  });

  return { ok: issues.length === 0, issues };
}

function requireAccessibility(
  entry: GameContentEntry,
  prefix: string,
  issues: GameContentValidationIssue[],
): void {
  for (const key of [
    "directPathSummary",
    "plainLanguageSummary",
    "textAlternative",
  ] as const) {
    if (entry.accessibility[key].trim() === "") {
      issues.push({
        path: `${prefix}.accessibility.${key}`,
        message: "Accessibility alternatives must be non-empty.",
      });
    }
  }
  for (const [key, value] of Object.entries(
    entry.accessibility.essentialMedia,
  )) {
    if (value !== false) {
      issues.push({
        path: `${prefix}.accessibility.essentialMedia.${key}`,
        message: "Essential comprehension cannot require media or gestures.",
      });
    }
  }
}

function validateReferences(
  entry: GameContentEntry,
  knownIds: Set<string>,
  prefix: string,
  issues: GameContentValidationIssue[],
): void {
  const content = entry.content;
  content.dependencies.forEach((id, index) =>
    requireReference(
      id,
      `${prefix}.content.dependencies.${index}`,
      knownIds,
      issues,
    ),
  );

  if (content.kind === "character") {
    content.zoneIds.forEach((id, index) =>
      requireReference(
        id,
        `${prefix}.content.zoneIds.${index}`,
        knownIds,
        issues,
      ),
    );
  }
  if (content.kind === "zone") {
    content.guideCharacterIds.forEach((id, index) =>
      requireReference(
        id,
        `${prefix}.content.guideCharacterIds.${index}`,
        knownIds,
        issues,
      ),
    );
    content.sceneIds.forEach((id, index) =>
      requireReference(
        id,
        `${prefix}.content.sceneIds.${index}`,
        knownIds,
        issues,
      ),
    );
  }
  if (content.kind === "dialogue") {
    requireReference(
      content.speakerId,
      `${prefix}.content.speakerId`,
      knownIds,
      issues,
    );
  }
  if (content.kind === "scene") {
    requireReference(
      content.zoneId,
      `${prefix}.content.zoneId`,
      knownIds,
      issues,
    );
    content.speakerIds.forEach((id, index) =>
      requireReference(
        id,
        `${prefix}.content.speakerIds.${index}`,
        knownIds,
        issues,
      ),
    );
    content.dialogueIds.forEach((id, index) =>
      requireReference(
        id,
        `${prefix}.content.dialogueIds.${index}`,
        knownIds,
        issues,
      ),
    );
    content.choices.forEach((choice, index) => {
      if (choice.nextSceneId !== undefined) {
        requireReference(
          choice.nextSceneId,
          `${prefix}.content.choices.${index}.nextSceneId`,
          knownIds,
          issues,
        );
      }
    });
  }
  if (content.kind === "quest") {
    requireReference(
      content.zoneId,
      `${prefix}.content.zoneId`,
      knownIds,
      issues,
    );
    requireReference(
      content.guideCharacterId,
      `${prefix}.content.guideCharacterId`,
      knownIds,
      issues,
    );
    content.rewards.forEach((reward, index) => {
      if ("targetId" in reward && knownIds.has(reward.targetId) === false) {
        issues.push({
          path: `${prefix}.content.rewards.${index}.targetId`,
          message: `Unknown content reference ${reward.targetId}.`,
        });
      }
    });
  }
}

function requireReference(
  id: string,
  path: string,
  knownIds: Set<string>,
  issues: GameContentValidationIssue[],
): void {
  if (!knownIds.has(id)) {
    issues.push({ path, message: `Unknown content reference ${id}.` });
  }
}

function inspectForbiddenKeys(
  value: unknown,
  path: string,
  issues: GameContentValidationIssue[],
): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      inspectForbiddenKeys(item, `${path}.${index}`, issues),
    );
    return;
  }
  if (value === null || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key)) {
      issues.push({
        path: `${path}.${key}`,
        message:
          "Protected, identity, provider, analytics, or payment fields are prohibited.",
      });
    }
    inspectForbiddenKeys(child, `${path}.${key}`, issues);
  }
}

function requirePlatforms(
  actual: readonly GamePlatform[],
  path: string,
  issues: GameContentValidationIssue[],
): void {
  const actualSet = new Set(actual);
  if (
    actualSet.size !== REQUIRED_PLATFORMS.length ||
    REQUIRED_PLATFORMS.some((platform) => !actualSet.has(platform))
  ) {
    issues.push({
      path,
      message: "Browser, iOS, and Android compatibility must be explicit.",
    });
  }
}

function requireEqual(
  actual: unknown,
  expected: unknown,
  path: string,
  issues: GameContentValidationIssue[],
): void {
  if (actual !== expected) {
    issues.push({
      path,
      message: `Expected ${JSON.stringify(expected)}, found ${JSON.stringify(actual)}.`,
    });
  }
}
