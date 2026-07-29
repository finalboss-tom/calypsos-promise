import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("publishes roadmap support and funding routes", async () => {
  for (const path of [
    "../src/app/roadmap/page.tsx",
    "../src/app/support/page.tsx",
    "../src/app/funding/page.tsx",
    "../src/app/public-records.css",
    "../src/lib/public-roadmap.ts",
    "../src/lib/support-routes.ts",
    "../src/lib/funding-transparency.ts",
  ]) {
    await access(new URL(path, import.meta.url));
  }

  const [navigation, sitemap, layout] = await Promise.all([
    read("../src/lib/navigation.ts"),
    read("../src/app/sitemap.ts"),
    read("../src/app/layout.tsx"),
  ]);
  const source = `${navigation}\n${sitemap}\n${layout}`;

  for (const route of ["/roadmap", "/support", "/funding"]) {
    assert.match(source, new RegExp(route));
  }
  assert.match(layout, /public-records\.css/);
  assert.doesNotMatch(source, /["']use client["']/);
});

test("uses a source-linked typed roadmap registry with reconciled gates", async () => {
  const [page, roadmap, capabilities] = await Promise.all([
    read("../src/app/roadmap/page.tsx"),
    read("../src/lib/public-roadmap.ts"),
    read("../src/lib/capability-status.ts"),
  ]);
  const source = `${page}\n${roadmap}\n${capabilities}`.replace(/\s+/g, " ");

  for (const phrase of [
    "Evidence decides what comes next.",
    "A roadmap is a sequence of evidence gates",
    "8.7 — Roadmap, status, support, and funding transparency",
    "8.8 and Phase 0 — Newsletter disposition",
    "8.9 — Accessibility, performance, security, and route validation",
    "8.10 — Completion and Sprint 9 handoff",
    "Sprint 9 — Public synthetic prologue",
    "issues/63",
    "issues/64",
    "sourceHref",
    "sourceLabel",
  ]) {
    assert.match(
      source,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  for (const status of ["live", "experimental", "planned", "long-horizon"]) {
    assert.match(source, new RegExp(`\\b${status}\\b`));
  }
  assert.match(roadmap, /id: "sprint-8-10"[\s\S]*status: "live"/);
  assert.match(roadmap, /id: "sprint-9"[\s\S]*status: "planned"/);
  assert.doesNotMatch(source, /guaranteed release date/i);
});

test("separates public-safe support from protected evidence", async () => {
  const [page, routes] = await Promise.all([
    read("../src/app/support/page.tsx"),
    read("../src/lib/support-routes.ts"),
  ]);
  const source = `${page}\n${routes}`.replace(/\s+/g, " ");

  for (const phrase of [
    "Use the route that protects the person.",
    "Report a public-safe problem",
    "Challenge an assumption or mechanism",
    "Security vulnerability or accidental disclosure",
    "Conduct or harassment concern",
    "No account-specific customer-support system is operating.",
    "Do not make private evidence public.",
  ]) {
    assert.match(
      source,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  assert.match(source, /issues\/new\/choose/);
  assert.match(source, /system-challenge\.yml/);
  assert.match(source, /SECURITY\.md/);
  assert.match(source, /CODE_OF_CONDUCT\.md/);
  assert.doesNotMatch(source, /["']use client["']/);
});

test("derives honest funding empty states from canonical public registries", async () => {
  const [page, module, records, opportunities] = await Promise.all([
    read("../src/app/funding/page.tsx"),
    read("../src/lib/funding-transparency.ts"),
    read("../../../docs/economics/funding-records.yml"),
    read("../../../docs/economics/funding-opportunities.yml"),
  ]);
  const source = `${page}\n${module}`.replace(/\s+/g, " ");

  assert.match(records, /^records: \[\]$/m);
  assert.match(opportunities, /^opportunities: \[\]$/m);
  assert.match(records, /contains no accepted funding relationships/i);
  assert.match(opportunities, /contains no live opportunity/i);

  for (const phrase of [
    "Support cannot purchase the Promise.",
    "No accepted funding relationships are recorded.",
    "No live funding opportunity is published.",
    "Attribution is not authority.",
    "No payment handoff is available.",
    "10% or more",
    "20% or more",
    "33% or more",
    "force-static",
    "readFileSync",
  ]) {
    assert.match(
      source,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  assert.doesNotMatch(page, /<form\b/i);
  assert.doesNotMatch(page, /<input\b/i);
  assert.doesNotMatch(page, /<button\b/i);
  assert.doesNotMatch(source, /stripe|paypal|checkout session|payment intent/i);
  assert.doesNotMatch(source, /["']use client["']/);
});

test("preserves public-record accessibility and resilience styles", async () => {
  const css = await read("../src/app/public-records.css");

  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.match(css, /grid-template-columns:\s*1fr/);
});
