import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  GAME_CONTENT_ENTRIES,
  GAME_CONTENT_MANIFEST,
  getGameContentEntry,
  isCompatibleGameContentVersion,
  listGameContentEntries,
  resolveGameContentLocale,
} from "../dist/index.js";
import { validateGameContentPackage } from "../dist/validate.js";

test("the public synthetic package satisfies schema and package contracts", () => {
  const result = validateGameContentPackage();
  assert.equal(result.ok, true, JSON.stringify(result.issues, null, 2));
  assert.equal(GAME_CONTENT_MANIFEST.informationClass, "PUBLIC_SYNTHETIC");
  assert.equal(GAME_CONTENT_MANIFEST.synthetic, true);
  assert.deepEqual(GAME_CONTENT_MANIFEST.compatibility.platforms, [
    "browser",
    "ios",
    "android",
  ]);
});

test("stable IDs resolve with deterministic locale fallback", () => {
  const entry = getGameContentEntry(
    "scene.hearth.welcome.synthetic",
    "fr-FR",
  );
  assert.equal(entry?.content.locale, "en-US");
  assert.equal(resolveGameContentLocale("fr-FR"), "en-US");
  assert.equal(listGameContentEntries({ kind: "scene" }).length, 2);
});

test("published package values are recursively frozen", () => {
  assert.equal(Object.isFrozen(GAME_CONTENT_MANIFEST), true);
  assert.equal(Object.isFrozen(GAME_CONTENT_MANIFEST.authority), true);
  assert.equal(Object.isFrozen(GAME_CONTENT_ENTRIES), true);
  assert.equal(Object.isFrozen(GAME_CONTENT_ENTRIES[0]), true);
  assert.equal(Object.isFrozen(GAME_CONTENT_ENTRIES[0]?.content), true);
});

test("migration rejects unknown versions and never preserves synthetic state", () => {
  assert.equal(isCompatibleGameContentVersion("0.1.0"), true);
  assert.equal(isCompatibleGameContentVersion("0.2.0"), false);
  assert.equal(
    GAME_CONTENT_MANIFEST.migration.preserveSyntheticSessionState,
    false,
  );
  assert.equal(
    GAME_CONTENT_MANIFEST.migration.unknownVersionBehavior,
    "reject-and-restart-synthetic-session",
  );
});

test("validator fails closed for protected fields and broken references", () => {
  const unsafeEntries = structuredClone(GAME_CONTENT_ENTRIES);
  unsafeEntries[0].accountId = "forbidden";
  unsafeEntries[1].content.dependencies.push("scene.missing.synthetic");

  const result = validateGameContentPackage(
    structuredClone(GAME_CONTENT_MANIFEST),
    unsafeEntries,
  );
  assert.equal(result.ok, false);
  assert.equal(
    result.issues.some((issue) => issue.path.endsWith("accountId")),
    true,
  );
  assert.equal(
    result.issues.some((issue) =>
      issue.message.includes("Unknown content reference scene.missing.synthetic"),
    ),
    true,
  );
});

test("the package has one earned workspace dependency and no providers", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  assert.deepEqual(packageJson.dependencies, {
    "@calypsos-promise/content-schema": "workspace:*",
  });
});
