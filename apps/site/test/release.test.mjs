import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  contrastPairs,
  performanceBudgets,
  requiredCspDirectives,
  requiredPageHeaders,
  routeContracts,
  signupGateIssue,
  siteOrigin,
} from "../src/release-contract.mjs";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function contrastRatio(foreground, background) {
  const luminance = (hex) => {
    const channels = hex
      .slice(1)
      .match(/.{2}/g)
      .map((value) => Number.parseInt(value, 16) / 255)
      .map((value) =>
        value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4,
      );
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

test("defines one canonical release contract for every public route", () => {
  assert.deepEqual(
    routeContracts.map(({ path }) => path),
    [
      "/",
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
      "/privacy",
      "/joined",
    ],
  );
  assert.equal(new Set(routeContracts.map(({ path }) => path)).size, 13);
  assert.equal(routeContracts.find(({ path }) => path === "/joined")?.noindex, true);
  assert.equal(routeContracts.find(({ path }) => path === "/joined")?.sitemap, false);
  assert.equal(siteOrigin, "https://www.calypsospromise.org");
});

test("keeps explicit page, JavaScript, CSS, image, font, request, and total budgets", () => {
  assert.deepEqual(performanceBudgets, {
    htmlBytes: 96 * 1024,
    javascriptBytes: 512 * 1024,
    cssBytes: 128 * 1024,
    imageBytes: 1536 * 1024,
    fontBytes: 0,
    totalBytes: 2048 * 1024,
    firstPartyRequests: 32,
  });
});

test("requires enhanced contrast for the accepted design-token pairs", () => {
  assert.equal(contrastPairs.length, 9);
  for (const pair of contrastPairs) {
    assert.ok(
      contrastRatio(pair.foreground, pair.background) >= 7,
      `${pair.name} must meet 7:1`,
    );
  }
});

test("keeps the permanent CI production-preview evidence job", async () => {
  const [workflow, packageJson, previewValidator, sourceValidator] =
    await Promise.all([
      read("../../../.github/workflows/ci.yml"),
      read("../package.json"),
      read("../src/validate-preview.mjs"),
      read("../src/validate-release-source.mjs"),
    ]);

  assert.match(workflow, /site-release-validation:/);
  assert.match(workflow, /Build production site/);
  assert.match(workflow, /Start isolated local production preview/);
  assert.match(workflow, /site-release-evidence\.json/);
  assert.match(workflow, /git diff --exit-code/);
  assert.match(packageJson, /"validate:preview": "node src\/validate-preview\.mjs"/);
  assert.match(packageJson, /validate-release-source\.mjs/);
  assert.match(previewValidator, /isolated-local-production-preview/);
  assert.match(sourceValidator, /Sprint 8\.9 source validation/);
});

test("validates the complete security-header and CSP contract", () => {
  assert.deepEqual(requiredPageHeaders, {
    "cross-origin-opener-policy": "same-origin",
    "permissions-policy": "camera=(), geolocation=(), microphone=(), payment=()",
    "referrer-policy": "strict-origin-when-cross-origin",
    "x-content-type-options": "nosniff",
    "x-dns-prefetch-control": "off",
    "x-frame-options": "DENY",
  });
  for (const directive of [
    "default-src 'self'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "'strict-dynamic'",
    "upgrade-insecure-requests",
  ]) {
    assert.ok(requiredCspDirectives.includes(directive));
  }
});

test("preserves paused email signup and the Phase 0 gate", async () => {
  const [route, privacy, joined, workstream] = await Promise.all([
    read("../src/app/api/join/route.ts"),
    read("../src/app/privacy/page.tsx"),
    read("../src/app/joined/page.tsx"),
    read("../../../docs/roadmap/sprint-8-workstream-8-8-record.md"),
  ]);

  assert.equal(signupGateIssue.endsWith("/issues/63"), true);
  assert.match(route, /SIGNUP_MIGRATION_PAUSED/);
  assert.match(route, /status: 503/);
  assert.doesNotMatch(route, /request\.(?:json|formData)/);
  assert.doesNotMatch(route, /SIGNUP_WEBHOOK_URL/);
  assert.match(privacy, /issues\/63/);
  assert.match(joined, /issues\/63/);
  assert.match(workstream, /COMPLETE FOR SPRINT 8/);
  assert.match(workstream, /Institutional Phase 0 cannot close/);
});
