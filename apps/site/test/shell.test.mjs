import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import nextConfig from "../next.config.mjs";

test("pins the supported Next.js and React baseline", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.deepEqual(packageJson.dependencies, {
    next: "16.2.12",
    react: "19.2.8",
    "react-dom": "19.2.8",
  });
});

test("preserves security headers and mutable asset cache semantics", async () => {
  const rules = await nextConfig.headers();
  const shared = rules.find((rule) => rule.source === "/:path*");
  const assets = rules.find((rule) => rule.source === "/assets/:path*");

  assert.ok(shared);
  assert.ok(assets);
  assert.equal(
    shared.headers.find((header) => header.key === "X-Frame-Options")?.value,
    "DENY",
  );
  assert.equal(
    assets.headers.find((header) => header.key === "Cache-Control")?.value,
    "public, max-age=0, must-revalidate",
  );
});

test("keeps current public route contracts present", async () => {
  for (const path of [
    "../src/app/page.tsx",
    "../src/app/privacy/page.tsx",
    "../src/app/joined/page.tsx",
    "../src/app/api/join/route.ts",
  ]) {
    await access(new URL(path, import.meta.url));
  }
});

test("pauses signup without accepting data", async () => {
  const route = await readFile(
    new URL("../src/app/api/join/route.ts", import.meta.url),
    "utf8",
  );

  assert.match(route, /SIGNUP_MIGRATION_PAUSED/);
  assert.match(route, /status: 503/);
  assert.doesNotMatch(route, /SIGNUP_WEBHOOK_URL/);
  assert.doesNotMatch(route, /email\s*:/);
});

test("keeps Git-triggered deployments disabled", async () => {
  const vercel = JSON.parse(
    await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  );

  assert.equal(vercel.git.deploymentEnabled, false);
});
