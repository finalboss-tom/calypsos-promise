import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  contrastPairs,
  newsletterPolicyVersion,
  performanceBudgets,
  requiredCspDirectives,
  requiredPageHeaders,
  routeContracts,
  signupGateIssue,
  siteOrigin,
  sprint9GateIssue,
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
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      );
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

test("defines the canonical public route family", () => {
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
  assert.equal(
    routeContracts.find(({ path }) => path === "/joined")?.noindex,
    true,
  );
  assert.equal(
    routeContracts.find(({ path }) => path === "/joined")?.sitemap,
    false,
  );
  assert.equal(siteOrigin, "https://www.calypsospromise.org");
});

test("keeps explicit transfer budgets after adding the newsletter client island", () => {
  assert.deepEqual(performanceBudgets, {
    htmlBytes: 112 * 1024,
    javascriptBytes: 736 * 1024,
    cssBytes: 136 * 1024,
    imageBytes: 1536 * 1024,
    fontBytes: 0,
    totalBytes: 2112 * 1024,
    firstPartyRequests: 34,
  });
});

test("retains enhanced contrast for accepted token pairs", () => {
  assert.equal(contrastPairs.length, 9);
  for (const pair of contrastPairs) {
    assert.ok(contrastRatio(pair.foreground, pair.background) >= 7);
  }
});

test("keeps permanent isolated production-preview validation", async () => {
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
  assert.match(
    packageJson,
    /"validate:preview": "node src\/validate-preview\.mjs"/,
  );
  assert.match(packageJson, /validate-release-source\.mjs/);
  assert.match(previewValidator, /providerContacted: false/);
  assert.match(previewValidator, /bot-field-must-be-ignored/);
  assert.match(sourceValidator, /active Phase 0 newsletter gate #63/);
});

test("validates security headers and CSP", () => {
  assert.deepEqual(requiredPageHeaders, {
    "cross-origin-opener-policy": "same-origin",
    "permissions-policy":
      "camera=(), geolocation=(), microphone=(), payment=()",
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

test("implements bounded newsletter Path A without exposing provider configuration", async () => {
  const [route, form, privacy, joined, vercel, roadmap] = await Promise.all([
    read("../src/app/api/join/route.ts"),
    read("../src/components/newsletter-signup-form.tsx"),
    read("../src/app/privacy/page.tsx"),
    read("../src/app/joined/page.tsx"),
    read("../vercel.json"),
    read("../src/lib/public-roadmap.ts"),
  ]);

  assert.equal(signupGateIssue.endsWith("/issues/63"), true);
  assert.equal(sprint9GateIssue.endsWith("/issues/64"), true);
  assert.equal(newsletterPolicyVersion, "2026-07-29");

  for (const phrase of [
    "SIGNUP_WEBHOOK_URL",
    "SIGNUP_WEBHOOK_TOKEN",
    "maxBodyBytes",
    "maxAttemptsPerWindow",
    "AbortController",
    "SIGNUP_NOT_CONFIGURED",
    "SIGNUP_PROVIDER_UNAVAILABLE",
    'redirect: "/joined"',
  ]) {
    assert.match(
      route,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
  assert.doesNotMatch(route, /script\.google(?:usercontent)?\.com\/macros/);
  assert.doesNotMatch(route, /console\.(?:log|error)\([^)]*email/i);

  for (const phrase of [
    'name="email"',
    'name="consent"',
    'name="website"',
    'aria-live="polite"',
    'href="/privacy"',
  ]) {
    assert.match(
      form,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  assert.match(privacy, /Google Apps Script/);
  assert.match(privacy, /private Google Sheet/);
  assert.match(privacy, /unsubscribe/);
  assert.match(privacy, /request deletion/);
  assert.match(privacy, /issues\/63/);
  assert.match(joined, /signup was delivered/i);
  assert.match(joined, /issues\/63/);
  assert.match(vercel, /"framework": "nextjs"/);
  assert.match(vercel, /"deploymentEnabled": false/);
  assert.match(roadmap, /issues\/64/);
  assert.match(roadmap, /id: "sprint-9"[\s\S]*status: "planned"/);
});
