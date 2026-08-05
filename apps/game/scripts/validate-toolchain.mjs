import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  FORBIDDEN_RUNTIME_DEPENDENCY_PATTERNS,
  PLATFORMS,
  TOOLCHAIN,
} from "./toolchain-contract.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(scriptDirectory, "..");
const repositoryRoot = resolve(gameRoot, "../..");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function listFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

const gamePackage = readJson(join(gameRoot, "package.json"));
const appConfig = readJson(join(gameRoot, "app.json"));
const rootPackage = readJson(join(repositoryRoot, "package.json"));
const sitePackage = readJson(join(repositoryRoot, "apps/site/package.json"));
const nodeVersion = readFileSync(
  join(repositoryRoot, ".node-version"),
  "utf8",
).trim();
const npmrc = readFileSync(join(repositoryRoot, ".npmrc"), "utf8");
const workspace = readFileSync(
  join(repositoryRoot, "pnpm-workspace.yaml"),
  "utf8",
);

assert.equal(gamePackage.name, "@calypsos-promise/game");
assert.equal(gamePackage.main, "expo-router/entry");
assert.equal(gamePackage.engines.node, `>=${TOOLCHAIN.nodeMinimum}`);
assert.equal(rootPackage.packageManager, TOOLCHAIN.packageManager);
assert.equal(nodeVersion, TOOLCHAIN.nodeRepository);
assert.match(rootPackage.engines.node, /^>=24(?:\.0\.0)?$/);
assert.match(npmrc, /^engine-strict=true$/m);
assert.match(npmrc, /^save-exact=true$/m);
assert.match(npmrc, /^strict-peer-dependencies=true$/m);
assert.match(workspace, /^\s*- apps\/\*$/m);

const expectedDependencies = {
  expo: TOOLCHAIN.expo,
  "expo-router": TOOLCHAIN.expoRouter,
  react: TOOLCHAIN.react,
  "react-dom": TOOLCHAIN.react,
  "react-native": TOOLCHAIN.reactNative,
  "react-native-web": TOOLCHAIN.reactNativeWeb,
  "react-native-worklets": TOOLCHAIN.reactNativeWorklets,
};

for (const [name, version] of Object.entries(expectedDependencies)) {
  assert.equal(
    gamePackage.dependencies[name],
    version,
    `${name} must remain pinned to ${version}`,
  );
}
assert.equal(gamePackage.devDependencies.typescript, TOOLCHAIN.typescript);

for (const [name, version] of Object.entries({
  ...gamePackage.dependencies,
  ...gamePackage.devDependencies,
})) {
  assert.match(version, /^\d+\.\d+\.\d+$/, `${name} must use an exact version`);
}

assert.deepEqual(appConfig.expo.platforms, PLATFORMS);
assert.equal(appConfig.expo.web.bundler, "metro");
assert.equal(appConfig.expo.web.output, "static");
assert.ok(appConfig.expo.plugins.includes("expo-router"));

for (const script of [
  "start",
  "android",
  "ios",
  "web",
  "build",
  "build:android",
  "build:ios",
  "build:web",
  "clean",
  "lint",
  "test",
  "typecheck",
]) {
  assert.ok(gamePackage.scripts[script], `missing required script: ${script}`);
}

const dependencyNames = Object.keys(gamePackage.dependencies);
for (const pattern of FORBIDDEN_RUNTIME_DEPENDENCY_PATTERNS) {
  assert.equal(
    dependencyNames.some((name) => pattern.test(name)),
    false,
    `forbidden runtime dependency matched ${pattern}`,
  );
}

for (const forbiddenPath of ["android", "ios", "eas.json"]) {
  const entries = new Set(readdirSync(gameRoot));
  assert.equal(
    entries.has(forbiddenPath),
    false,
    `${forbiddenPath} is outside Sprint 10.1`,
  );
}

for (const sourceFile of listFiles(join(gameRoot, "app"))) {
  const source = readFileSync(sourceFile, "utf8");
  assert.doesNotMatch(
    source,
    /process\.env|EXPO_PUBLIC_|apiKey|accessToken|secret/i,
    `${relative(gameRoot, sourceFile)} must remain credential-free`,
  );
}

assert.equal(sitePackage.name, "@calypsos-promise/site");
assert.equal(sitePackage.scripts.dev, "next dev");
assert.equal(sitePackage.scripts.build, "next build");

console.log("Sprint 10.1 toolchain contract validated:");
console.log(`- Expo ${TOOLCHAIN.expo} / Expo Router ${TOOLCHAIN.expoRouter}`);
console.log(
  `- React Native ${TOOLCHAIN.reactNative} / React ${TOOLCHAIN.react}`,
);
console.log(`- Node ${TOOLCHAIN.nodeRepository} / ${TOOLCHAIN.packageManager}`);
console.log(`- platforms: ${PLATFORMS.join(", ")}`);
console.log(
  "- apps/site ownership preserved; no credentials or provider SDKs introduced",
);
