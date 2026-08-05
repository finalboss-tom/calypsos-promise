import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  FORBIDDEN_PRESENTATION_PATTERNS,
  PRESENTATION_COMPONENTS,
  PRESENTATION_CONTENT_IDS,
  PRESENTATION_ROUTE,
} from "./presentation-contract.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(scriptDirectory, "..");
const repositoryRoot = resolve(gameRoot, "../..");

function read(path) {
  return readFileSync(path, "utf8");
}

assert.ok(
  existsSync(join(gameRoot, PRESENTATION_ROUTE.file)),
  `missing ${PRESENTATION_ROUTE.purpose} route`,
);

for (const component of PRESENTATION_COMPONENTS) {
  assert.ok(existsSync(join(gameRoot, component)), `missing ${component}`);
}

const route = read(join(gameRoot, PRESENTATION_ROUTE.file));
assert.match(route, /SceneRenderer/);
assert.match(route, /BoundaryNotice/);
assert.match(route, /non-authoritative/i);

const renderer = read(join(gameRoot, "src/components/SceneRenderer.tsx"));
for (const required of [
  "resolvePresentationScene",
  "resolveSyntheticChoice",
  "DialogueChoices",
  "QuestCard",
  "WayfinderOrb",
  "PRESENTATION_AUTHORITY",
  "accessibilityLiveRegion",
]) {
  assert.match(renderer, new RegExp(required));
}
assert.match(renderer, /temporary/);
assert.match(
  renderer,
  /Nothing (?:has|was) been recorded|nothing (?:has|was) been recorded/i,
);

const model = read(
  join(gameRoot, "src/presentation/synthetic-presentation.ts"),
);
for (const required of [
  "resolvePresentationScene",
  "resolveSyntheticChoice",
  "authoritative: false",
  "preferenceInference: false",
  "chronicle: false",
  "permission: false",
  "rewards: false",
  '"presentation-only"',
]) {
  assert.match(model, new RegExp(required.replaceAll(":", "\\:")));
}
assert.doesNotMatch(model, /Date\.now|new Date|Math\.random/);

const hearth = read(join(gameRoot, "app/(shell)/hearth.tsx"));
const direct = read(join(gameRoot, "app/(shell)/direct.tsx"));
assert.match(hearth, /pathname: "\/play"/);
assert.match(direct, /pathname: "\/play"/);

const packageSource = read(
  join(repositoryRoot, "packages/game-content/src/index.ts"),
);
for (const contentId of PRESENTATION_CONTENT_IDS) {
  assert.match(
    packageSource,
    new RegExp(contentId.replaceAll(".", "\\.")),
    `game-content package must retain ${contentId}`,
  );
}

for (const sourcePath of [
  PRESENTATION_ROUTE.file,
  ...PRESENTATION_COMPONENTS,
]) {
  const source = read(join(gameRoot, sourcePath));
  for (const pattern of FORBIDDEN_PRESENTATION_PATTERNS) {
    assert.doesNotMatch(
      source,
      pattern,
      `${sourcePath} matched forbidden presentation pattern ${pattern}`,
    );
  }
}

console.log("Sprint 10.4 presentation contract validated:");
console.log(
  "- generic zone and scene renderer consumes versioned package content",
);
console.log("- dialogue choices resolve through deterministic synthetic rules");
console.log("- quest card and Wayfinder Orb remain presentation-only");
console.log(
  "- direct and narrative package paths remain materially equivalent",
);
console.log(
  "- no persistence, provider, analytics, reward, or authority expansion",
);
