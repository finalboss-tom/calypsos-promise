import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { PLATFORMS, TOOLCHAIN } from "../scripts/toolchain-contract.mjs";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(gameRoot, "../..");
const gamePackage = JSON.parse(readFileSync(resolve(gameRoot, "package.json"), "utf8"));
const appConfig = JSON.parse(readFileSync(resolve(gameRoot, "app.json"), "utf8"));
const sitePackage = JSON.parse(readFileSync(resolve(repositoryRoot, "apps/site/package.json"), "utf8"));

test("pins the supported universal toolchain", () => {
  assert.equal(gamePackage.dependencies.expo, TOOLCHAIN.expo);
  assert.equal(gamePackage.dependencies["expo-router"], TOOLCHAIN.expoRouter);
  assert.equal(gamePackage.dependencies["react-native"], TOOLCHAIN.reactNative);
  assert.equal(gamePackage.dependencies.react, TOOLCHAIN.react);
  assert.deepEqual(appConfig.expo.platforms, PLATFORMS);
});

test("preserves the public-site ownership boundary", () => {
  assert.equal(sitePackage.name, "@calypsos-promise/site");
  assert.equal(sitePackage.scripts.build, "next build");
});

test("does not introduce native generated projects or hosted build configuration", () => {
  assert.equal(existsSync(resolve(gameRoot, "android")), false);
  assert.equal(existsSync(resolve(gameRoot, "ios")), false);
  assert.equal(existsSync(resolve(gameRoot, "eas.json")), false);
});
