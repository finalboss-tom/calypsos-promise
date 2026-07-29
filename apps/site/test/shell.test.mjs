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

test("keeps current public routes and newsletter files present", async () => {
  for (const path of [
    "../src/app/page.tsx",
    "../src/app/promise/page.tsx",
    "../src/app/laws/page.tsx",
    "../src/app/how-it-works/page.tsx",
    "../src/app/consumer-first/page.tsx",
    "../src/app/aster/page.tsx",
    "../src/app/trust/page.tsx",
    "../src/app/forge/page.tsx",
    "../src/app/roadmap/page.tsx",
    "../src/app/support/page.tsx",
    "../src/app/funding/page.tsx",
    "../src/app/privacy/page.tsx",
    "../src/app/joined/page.tsx",
    "../src/app/api/join/route.ts",
    "../src/components/newsletter-signup-form.tsx",
    "../src/components/newsletter-signup-form.module.css",
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
    "/trust",
    "/forge",
    "/roadmap",
    "/support",
    "/funding",
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
  assert.match(source, /Public website/);
  assert.match(source, /Phase 0 newsletter signup/);
  assert.match(source, /issues\/64/);
  assert.match(source, /sourceHref/);
  assert.match(source, /sourceLabel/);
  assert.doesNotMatch(source, /["']use client["']/);
});

test("publishes the source-backed homepage, Promise, and newsletter entry", async () => {
  const [
    home,
    promisePage,
    promiseData,
    loops,
    principles,
    newsletter,
    sitemap,
  ] = await Promise.all([
    read("../src/app/page.tsx"),
    read("../src/app/promise/page.tsx"),
    read("../src/lib/promise.ts"),
    read("../src/components/connected-loops.tsx"),
    read("../src/components/promise-principles.tsx"),
    read("../src/components/newsletter-signup-form.tsx"),
    read("../src/app/sitemap.ts"),
  ]);
  const serverSource = `${home}\n${promisePage}\n${promiseData}\n${loops}\n${principles}`;

  assert.match(
    serverSource,
    /Build your Living Chronicle\. Improve your health\. Keep the key\./,
  );
  assert.match(
    serverSource,
    /The software is open\. The person’s health data is private\./,
  );
  assert.match(serverSource, /without agreeing to research/);
  assert.match(serverSource, /Build your health record/);
  assert.match(serverSource, /Improve your health/);
  assert.match(serverSource, /Control and share in created value/);
  assert.match(serverSource, /Product Constitution/);
  assert.match(home, /NewsletterSignupForm/);
  assert.match(home, /Follow the build toward Phase 0 completion/);
  assert.match(newsletter, /["']use client["']/);
  assert.match(newsletter, /name="email"/);
  assert.match(newsletter, /name="consent"/);
  assert.match(newsletter, /name="website"/);
  assert.match(sitemap, /\/promise/);
  assert.doesNotMatch(serverSource, /["']use client["']/);
});

test("publishes the source-backed guide family", async () => {
  const [
    lawsPage,
    lawsData,
    howPage,
    howData,
    consumerPage,
    consumerData,
    asterPage,
    asterData,
  ] = await Promise.all([
    read("../src/app/laws/page.tsx"),
    read("../src/lib/seven-laws.ts"),
    read("../src/app/how-it-works/page.tsx"),
    read("../src/lib/how-it-works.ts"),
    read("../src/app/consumer-first/page.tsx"),
    read("../src/lib/consumer-first.ts"),
    read("../src/app/aster/page.tsx"),
    read("../src/lib/aster.ts"),
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
  const normalized = source.replace(/\s+/g, " ");

  for (const law of [
    "The Law of the Open Hand",
    "The Right of the Key",
    "The Sanctity of the Hearth",
    "The Law of the True Chronicle",
    "No Oracle Above Evidence",
    "The Right of Return",
    "The Covenant of the Commons",
  ]) {
    assert.match(normalized, new RegExp(law));
  }
  assert.match(normalized, /A typical session is.*three to eight minutes/);
  assert.match(normalized, /AI may assist\. Deterministic services decide\./);
  assert.match(normalized, /No broken-streak punishment/);
  assert.match(normalized, /Standards at the edges/);
  assert.match(normalized, /No provider or connector capability is live/);
  assert.match(
    normalized,
    /AI proposes\. The player confirms\. The domain service validates and stores\./,
  );
  assert.match(normalized, /No production Aster capability is live/);
  for (const role of [
    "Scribe",
    "Librarian",
    "Wayfinder",
    "Interpreter",
    "Storykeeper",
  ]) {
    assert.match(normalized, new RegExp(role));
  }
  assert.doesNotMatch(source, /["']use client["']/);
});

test("publishes the source-backed Trust Center and Open Forge", async () => {
  const [trustPage, trustData, forgePage, forgeData] = await Promise.all([
    read("../src/app/trust/page.tsx"),
    read("../src/lib/trust-center.ts"),
    read("../src/app/forge/page.tsx"),
    read("../src/lib/open-forge.ts"),
  ]);
  const normalized =
    `${trustPage}\n${trustData}\n${forgePage}\n${forgeData}`.replace(
      /\s+/g,
      " ",
    );

  for (const phrase of [
    "Trust begins with visible limits.",
    "A documented control is not a deployed control.",
    "Do not open a public issue.",
    "No public page closes these gates.",
    "Useful tools without hidden authority.",
    "Exactly ten tools",
    "forge.invocation-receipt.v1",
    "forge.error.v1",
    "Nineteen specialist holdpoints and eighteen unresolved-work records remain open",
    "Contributors do not need Forge to participate.",
  ]) {
    assert.match(
      normalized,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
  for (const tool of [
    "forge.search.lore",
    "forge.validate.content",
    "forge.inspect.quest-schema",
    "forge.validate.quest",
    "forge.search.architecture",
    "forge.search.decision",
    "forge.search.public-standards",
    "forge.validate.mapping-draft",
    "forge.search.synthetic-connector-fixtures",
    "forge.generate.synthetic-data",
  ]) {
    assert.match(normalized, new RegExp(tool.replace(/\./g, "\\.")));
  }
});

test("provides reduced-motion, reduced-data, contrast, forced-color, and form fallbacks", async () => {
  const [globalCss, homepageCss, guideCss, trustForgeCss, newsletterCss, page] =
    await Promise.all([
      read("../src/app/globals.css"),
      read("../src/app/homepage.css"),
      read("../src/app/guide-pages.css"),
      read("../src/app/trust-forge.css"),
      read("../src/components/newsletter-signup-form.module.css"),
      read("../src/app/page.tsx"),
    ]);
  const css = `${globalCss}\n${homepageCss}\n${guideCss}\n${trustForgeCss}\n${newsletterCss}`;

  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.match(css, /\.hero-image\s*\{[\s\S]*display:\s*none/);
  assert.match(newsletterCss, /\.honeypot/);
  assert.match(newsletterCss, /:focus-visible/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /planned game/);
});

test("restores bounded newsletter forwarding without hard-coded provider details", async () => {
  const [route, privacy, joined] = await Promise.all([
    read("../src/app/api/join/route.ts"),
    read("../src/app/privacy/page.tsx"),
    read("../src/app/joined/page.tsx"),
  ]);

  assert.match(route, /SIGNUP_WEBHOOK_URL/);
  assert.match(route, /SIGNUP_WEBHOOK_TOKEN/);
  assert.match(route, /maxBodyBytes/);
  assert.match(route, /maxAttemptsPerWindow/);
  assert.match(route, /AbortController/);
  assert.match(route, /redirect: "\/joined"/);
  assert.doesNotMatch(route, /script\.google(?:usercontent)?\.com\/macros/);
  assert.doesNotMatch(route, /console\.(?:log|error)\([^)]*email/i);
  assert.match(privacy, /Google Apps Script/);
  assert.match(privacy, /private Google Sheet/);
  assert.match(joined, /signup was delivered/i);
});

test("keeps Git-triggered deployments disabled and Next.js explicit", async () => {
  const vercel = JSON.parse(await read("../vercel.json"));
  assert.equal(vercel.framework, "nextjs");
  assert.equal(vercel.git.deploymentEnabled, false);
});
