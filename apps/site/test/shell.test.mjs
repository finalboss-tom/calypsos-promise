import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import nextConfig from "../next.config.mjs";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("pins the supported Next.js and React baseline", async () => {
  const packageJson = JSON.parse(await read("../package.json"));

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

test("provides direct and narrative navigation without a client boundary", async () => {
  const [layout, navigation, navigationData] = await Promise.all([
    read("../src/app/layout.tsx"),
    read("../src/components/site-navigation.tsx"),
    read("../src/lib/navigation.ts"),
  ]);
  const source = `${layout}\n${navigation}\n${navigationData}`;

  assert.match(source, /Skip to primary navigation/);
  assert.match(source, /id="primary-navigation"/);
  assert.match(source, /aria-label="Narrative journey"/);
  assert.match(source, /No story traversal is required/);
  assert.match(source, /<details/);
  assert.match(source, /<summary>/);
  assert.doesNotMatch(source, /["']use client["']/);
});

test("defines all controlled capability status values", async () => {
  const [statusData, statusBadge, grid] = await Promise.all([
    read("../src/lib/capability-status.ts"),
    read("../src/components/status-badge.tsx"),
    read("../src/components/capability-status-grid.tsx"),
  ]);
  const source = `${statusData}\n${statusBadge}\n${grid}`;

  for (const status of ["live", "experimental", "planned", "long-horizon"]) {
    assert.match(source, new RegExp(`\\b${status}\\b`));
  }
  assert.match(source, /canonical source/i);
  assert.doesNotMatch(source, /["']use client["']/);
});

test("provides reduced-motion, reduced-data, contrast, and forced-color fallbacks", async () => {
  const [css, page] = await Promise.all([
    read("../src/app/globals.css"),
    read("../src/app/page.tsx"),
  ]);

  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.match(css, /\.hero-image\s*\{[\s\S]*display:\s*none/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /Essential[\s\S]*server-rendered/);
});

test("pauses signup without accepting data", async () => {
  const route = await read("../src/app/api/join/route.ts");

  assert.match(route, /SIGNUP_MIGRATION_PAUSED/);
  assert.match(route, /status: 503/);
  assert.doesNotMatch(route, /SIGNUP_WEBHOOK_URL/);
  assert.doesNotMatch(route, /email\s*:/);
});

test("keeps Git-triggered deployments disabled", async () => {
  const vercel = JSON.parse(await read("../vercel.json"));

  assert.equal(vercel.git.deploymentEnabled, false);
});
