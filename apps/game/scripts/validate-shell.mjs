import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  FORBIDDEN_SHELL_SOURCE_PATTERNS,
  SHELL_CONTENT_IDS,
  SHELL_ROUTES,
} from "./shell-contract.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(scriptDirectory, "..");
const repositoryRoot = resolve(gameRoot, "../..");

function listFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

function read(path) {
  return readFileSync(path, "utf8");
}

const routeSet = new Set(SHELL_ROUTES.map(({ route }) => route));
assert.equal(routeSet.size, SHELL_ROUTES.length, "shell routes must be unique");

for (const route of SHELL_ROUTES) {
  const path = join(gameRoot, route.file);
  assert.ok(existsSync(path), `missing ${route.purpose} route: ${route.file}`);
}

const packageJson = JSON.parse(read(join(gameRoot, "package.json")));
assert.equal(
  packageJson.dependencies["@calypsos-promise/game-content"],
  "workspace:*",
  "apps/game must consume the earned game-content workspace package",
);

const shellLayout = read(join(gameRoot, "app/(shell)/_layout.tsx"));
for (const route of ["/map", "/hearth", "/direct"]) {
  assert.match(shellLayout, new RegExp(route.replace("/", "\\/")));
}
assert.match(shellLayout, /<Slot\s*\/>/);
assert.match(shellLayout, /No account/);

const arrival = read(join(gameRoot, "app/index.tsx"));
assert.match(arrival, /NO ACCOUNT REQUIRED/);
assert.match(arrival, /GAME_CONTENT_MANIFEST/);
assert.match(arrival, /href="\/hearth"/);
assert.match(arrival, /href="\/direct"/);
assert.match(arrival, /href="\/map"/);

const map = read(join(gameRoot, "app/(shell)/map.tsx"));
assert.match(map, /Island map/i);
assert.match(map, /PLANNED · INACTIVE/);
assert.match(map, /not locked by/);

const hearth = read(join(gameRoot, "app/(shell)/hearth.tsx"));
const direct = read(join(gameRoot, "app/(shell)/direct.tsx"));
assert.match(hearth, /ContentFallback/);
assert.match(direct, /ContentFallback/);
assert.match(hearth, /Narrative presentation only/);
assert.match(direct, /DIRECT INFORMATION PATH/);

const appSources = [
  ...listFiles(join(gameRoot, "app")),
  ...listFiles(join(gameRoot, "src")),
].filter((path) => /\.(?:ts|tsx|js|jsx|mjs)$/.test(path));

for (const sourcePath of appSources) {
  const source = read(sourcePath);
  for (const pattern of FORBIDDEN_SHELL_SOURCE_PATTERNS) {
    assert.doesNotMatch(
      source,
      pattern,
      `${relative(gameRoot, sourcePath)} matched forbidden shell pattern ${pattern}`,
    );
  }
}

const packageSource = read(
  join(repositoryRoot, "packages/game-content/src/index.ts"),
);
for (const contentId of SHELL_CONTENT_IDS) {
  assert.match(
    packageSource,
    new RegExp(contentId.replaceAll(".", "\\.")),
    `game-content package must retain ${contentId}`,
  );
}

for (const forbiddenPackage of ["packages/ui", "packages/shared-ui"]) {
  assert.equal(
    existsSync(join(repositoryRoot, forbiddenPackage)),
    false,
    `${forbiddenPackage} is not earned by Sprint 10.3`,
  );
}

console.log("Sprint 10.3 shell and navigation contract validated:");
console.log(`- routes: ${SHELL_ROUTES.map(({ route }) => route).join(", ")}`);
console.log(
  "- no-account arrival, island map, Hearth, and direct path present",
);
console.log("- unavailable and unknown routes fail closed");
console.log(
  "- no persistence, network, provider, analytics, or authority expansion",
);
