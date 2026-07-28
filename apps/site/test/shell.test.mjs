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
    "../src/app/promise/page.tsx",
    "../src/app/laws/page.tsx",
    "../src/app/how-it-works/page.tsx",
    "../src/app/consumer-first/page.tsx",
    "../src/app/aster/page.tsx",
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
  for (const route of [
    "/promise",
    "/laws",
    "/how-it-works",
    "/consumer-first",
    "/aster",
  ]) {
    assert.match(source, new RegExp(`href: "${route}"`));
  }
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
  assert.match(source, /sourceHref/);
  assert.match(source, /sourceLabel/);
  assert.doesNotMatch(source, /["']use client["']/);
});

test("migrates the source-backed homepage and Promise explanation", async () => {
  const [home, promisePage, promiseData, loops, principles, sitemap] =
    await Promise.all([
      read("../src/app/page.tsx"),
      read("../src/app/promise/page.tsx"),
      read("../src/lib/promise.ts"),
      read("../src/components/connected-loops.tsx"),
      read("../src/components/promise-principles.tsx"),
      read("../src/app/sitemap.ts"),
    ]);
  const source = `${home}\n${promisePage}\n${promiseData}\n${loops}\n${principles}`;

  assert.match(
    source,
    /Build your Living Chronicle\. Improve your health\. Keep the key\./,
  );
  assert.match(
    source,
    /The software is open\. The person’s health data is private\./,
  );
  assert.match(source, /without agreeing to research/);
  assert.match(source, /Build your health record/);
  assert.match(source, /Improve your health/);
  assert.match(source, /Control and share in created value/);
  assert.match(source, /Product Constitution/);
  assert.match(home, /Read the contribution guide/);
  assert.match(sitemap, /\/promise/);
  assert.doesNotMatch(source, /["']use client["']/);
});

test("publishes the source-backed Sprint 8.5 guide family", async () => {
  const [
    lawsPage,
    lawsData,
    howPage,
    howData,
    consumerPage,
    consumerData,
    asterPage,
    asterData,
    sitemap,
  ] = await Promise.all([
    read("../src/app/laws/page.tsx"),
    read("../src/lib/seven-laws.ts"),
    read("../src/app/how-it-works/page.tsx"),
    read("../src/lib/how-it-works.ts"),
    read("../src/app/consumer-first/page.tsx"),
    read("../src/lib/consumer-first.ts"),
    read("../src/app/aster/page.tsx"),
    read("../src/lib/aster.ts"),
    read("../src/app/sitemap.ts"),
  ]);
  const source = [
    lawsPage,
    lawsData,
    howPage,
    howData,
    consumerPage,
    consumerData,
    asterPage,
    asterData,
  ].join("\n");
  const normalizedSource = source.replace(/\s+/g, " ");

  for (const law of [
    "The Law of the Open Hand",
    "The Right of the Key",
    "The Sanctity of the Hearth",
    "The Law of the True Chronicle",
    "No Oracle Above Evidence",
    "The Right of Return",
    "The Covenant of the Commons",
  ]) {
    assert.match(normalizedSource, new RegExp(law));
  }

  assert.match(
    normalizedSource,
    /A typical session is.*three to eight minutes/,
  );
  assert.match(
    normalizedSource,
    /AI may assist\. Deterministic services decide\./,
  );
  assert.match(normalizedSource, /No broken-streak punishment/);
  assert.match(
    normalizedSource,
    /interoperate with institutional healthcare without.*architected around institutional healthcare/i,
  );
  assert.match(normalizedSource, /Standards at the edges/);
  assert.match(normalizedSource, /No provider or connector capability is live/);
  assert.match(
    normalizedSource,
    /AI proposes\. The player confirms\. The domain service validates and stores\./,
  );
  assert.match(normalizedSource, /No production Aster capability is live/);
  for (const role of [
    "Scribe",
    "Librarian",
    "Wayfinder",
    "Interpreter",
    "Storykeeper",
  ]) {
    assert.match(normalizedSource, new RegExp(role));
  }
  for (const route of ["/laws", "/how-it-works", "/consumer-first", "/aster"]) {
    assert.match(sitemap, new RegExp(route));
  }
  assert.doesNotMatch(source, /["']use client["']/);
});

test("provides reduced-motion, reduced-data, contrast, and forced-color fallbacks", async () => {
  const [globalCss, homepageCss, guideCss, page] = await Promise.all([
    read("../src/app/globals.css"),
    read("../src/app/homepage.css"),
    read("../src/app/guide-pages.css"),
    read("../src/app/page.tsx"),
  ]);
  const css = `${globalCss}\n${homepageCss}\n${guideCss}`;

  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.match(css, /\.hero-image\s*\{[\s\S]*display:\s*none/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /planned game/);
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
