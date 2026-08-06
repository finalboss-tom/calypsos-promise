import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { SHELL_CONTENT_IDS, SHELL_ROUTES } from "../scripts/shell-contract.mjs";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(testDirectory, "..");

function read(path) {
  return readFileSync(resolve(gameRoot, path), "utf8");
}

test("shell route contract is unique and includes agency-preserving fallbacks", () => {
  const routes = SHELL_ROUTES.map(({ route }) => route);
  assert.equal(new Set(routes).size, 8);
  assert.deepEqual(
    [...routes].sort(),
    [
      "/",
      "/accessibility",
      "/account",
      "/direct",
      "/hearth",
      "/map",
      "/unavailable",
      "+not-found",
    ].sort(),
  );
  assert.ok(SHELL_ROUTES.some(({ route }) => route === "/unavailable"));
  assert.ok(SHELL_ROUTES.some(({ route }) => route === "+not-found"));
});

test("narrative and direct paths rely on the same package boundary", () => {
  const hearth = read("app/(shell)/hearth.tsx");
  const direct = read("app/(shell)/direct.tsx");
  for (const source of [hearth, direct]) {
    assert.match(source, /@calypsos-promise\/game-content/);
    assert.match(source, /ContentFallback/);
  }
  assert.ok(SHELL_CONTENT_IDS.includes("dialogue.aster.welcome.synthetic"));
  assert.ok(SHELL_CONTENT_IDS.includes("dialogue.aster.direct-path.synthetic"));
});

test("shell validator passes against the tracked universal application", () => {
  const result = spawnSync(process.execPath, ["scripts/validate-shell.mjs"], {
    cwd: gameRoot,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(
    result.stdout,
    /Sprint 10\.3 shell and navigation contract validated/,
  );
});
