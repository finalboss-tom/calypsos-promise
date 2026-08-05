import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  PRESENTATION_COMPONENTS,
  PRESENTATION_CONTENT_IDS,
  PRESENTATION_ROUTE,
} from "../scripts/presentation-contract.mjs";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(testDirectory, "..");

function read(path) {
  return readFileSync(resolve(gameRoot, path), "utf8");
}

test("10.4 exposes one generic presentation route and the required renderers", () => {
  assert.equal(PRESENTATION_ROUTE.route, "/play");
  assert.ok(
    PRESENTATION_COMPONENTS.includes("src/components/SceneRenderer.tsx"),
  );
  assert.ok(
    PRESENTATION_COMPONENTS.includes("src/components/DialogueChoices.tsx"),
  );
  assert.ok(PRESENTATION_COMPONENTS.includes("src/components/QuestCard.tsx"));
  assert.ok(
    PRESENTATION_COMPONENTS.includes("src/components/WayfinderOrb.tsx"),
  );
});

test("deterministic interaction is time-free, random-free, and non-authoritative", () => {
  const model = read("src/presentation/synthetic-presentation.ts");
  assert.doesNotMatch(model, /Date\.now|new Date|Math\.random/);
  assert.match(model, /authoritative: false/g);
  assert.match(model, /preferenceInference: false/);
  assert.match(model, /chronicle: false/);
  assert.match(model, /permission: false/);
  assert.match(model, /rewards: false/);
});

test("presentation content remains bound to the accepted synthetic package", () => {
  assert.ok(
    PRESENTATION_CONTENT_IDS.includes("scene.hearth.welcome.synthetic"),
  );
  assert.ok(
    PRESENTATION_CONTENT_IDS.includes("scene.hearth.direct-path.synthetic"),
  );
  assert.ok(
    PRESENTATION_CONTENT_IDS.includes(
      "quest.first-lantern.shell-demo.synthetic",
    ),
  );
  const renderer = read("src/components/SceneRenderer.tsx");
  assert.match(renderer, /resolvePresentationScene/);
  assert.match(renderer, /resolveSyntheticChoice/);
});

test("presentation validator passes against the tracked application", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/validate-presentation.mjs"],
    {
      cwd: gameRoot,
      encoding: "utf8",
    },
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Sprint 10\.4 presentation contract validated/);
});
