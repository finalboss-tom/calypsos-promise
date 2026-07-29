import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  contrastPairs,
  newsletterPolicyVersion,
  performanceBudgets,
  requiredCspDirectives,
  requiredPageHeaders,
  routeContracts,
  secretPatterns,
  signupGateIssue,
  sprint9GateIssue,
} from "./release-contract.mjs";

const app = fileURLToPath(new URL("../", import.meta.url));
const failures = [];

function fail(message) {
  failures.push(message);
}

async function read(relativePath) {
  return readFile(`${app}/${relativePath}`, "utf8");
}

async function filesRecursively(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...(await filesRecursively(path)));
    else files.push(path);
  }
  return files;
}

function contrastRatio(foreground, background) {
  function luminance(hex) {
    const channels = hex
      .replace("#", "")
      .match(/.{2}/g)
      .map((value) => Number.parseInt(value, 16) / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      );
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

const expectedRoutes = [
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
];
const contractRoutes = routeContracts.map((route) => route.path);
if (new Set(contractRoutes).size !== contractRoutes.length) {
  fail("release route contract contains duplicate paths");
}
if (JSON.stringify(contractRoutes) !== JSON.stringify(expectedRoutes)) {
  fail("release route contract does not match the accepted public route order");
}

for (const [name, value] of Object.entries(performanceBudgets)) {
  if (!Number.isInteger(value) || value < 0) {
    fail(`performance budget ${name} must be a non-negative integer`);
  }
}
if (performanceBudgets.fontBytes !== 0) {
  fail("the site must retain its zero web-font budget");
}

for (const pair of contrastPairs) {
  const ratio = contrastRatio(pair.foreground, pair.background);
  if (ratio < 7) fail(`${pair.name} contrast ${ratio.toFixed(2)} is below 7:1`);
}

const routeFile = (path) =>
  path === "/" ? "src/app/page.tsx" : `src/app${path}/page.tsx`;
for (const contract of routeContracts) {
  const page = await read(routeFile(contract.path));
  if (!/<h1\b/.test(page)) fail(`${contract.path} source is missing h1`);
  if (contract.path !== "/") {
    const canonical = `canonical: "${contract.path}"`;
    if (!page.includes(canonical))
      fail(`${contract.path} source is missing ${canonical}`);
  }
  if (contract.noindex && !/index:\s*false/.test(page)) {
    fail(`${contract.path} source must remain noindex`);
  }
  if (/^["']use client["'];/m.test(page)) {
    fail(`${contract.path} essential route must remain server-rendered`);
  }
}

const [
  layout,
  navigation,
  navigationComponent,
  sitemap,
  robots,
  globalCss,
  homepageCss,
  guideCss,
  trustCss,
  recordsCss,
  newsletterCss,
  newsletterComponent,
  nextConfig,
  proxy,
  vercelConfig,
  homepage,
  joinRoute,
  privacyPage,
  joinedPage,
  publicRoadmap,
] = await Promise.all([
  read("src/app/layout.tsx"),
  read("src/lib/navigation.ts"),
  read("src/components/site-navigation.tsx"),
  read("src/app/sitemap.ts"),
  read("src/app/robots.ts"),
  read("src/app/globals.css"),
  read("src/app/homepage.css"),
  read("src/app/guide-pages.css"),
  read("src/app/trust-forge.css"),
  read("src/app/public-records.css"),
  read("src/components/newsletter-signup-form.module.css"),
  read("src/components/newsletter-signup-form.tsx"),
  read("next.config.mjs"),
  read("src/proxy.ts"),
  read("vercel.json"),
  read("src/app/page.tsx"),
  read("src/app/api/join/route.ts"),
  read("src/app/privacy/page.tsx"),
  read("src/app/joined/page.tsx"),
  read("src/lib/public-roadmap.ts"),
]);

if (
  !layout.includes('href="#primary-navigation"') ||
  !layout.includes('href="#main"')
) {
  fail("layout must retain both visible-on-focus skip links");
}
if (!layout.includes('<main id="main"') || !layout.includes('lang="en"')) {
  fail("layout must retain the main landmark and English language declaration");
}
if (
  !`${navigation}\n${navigationComponent}`.includes(
    "No story traversal is required",
  )
) {
  fail("narrative navigation must remain optional");
}
for (const route of routeContracts.filter((route) => !route.noindex)) {
  if (route.path !== "/" && !navigation.includes(`href: "${route.path}"`)) {
    fail(`direct and narrative navigation are missing ${route.path}`);
  }
  if (
    route.sitemap &&
    !sitemap.includes(
      `\`${"${baseUrl}"}${route.path === "/" ? "/" : route.path}\``,
    )
  ) {
    fail(`sitemap source is missing ${route.path}`);
  }
}
if (sitemap.includes("/joined") || sitemap.includes("/api/join")) {
  fail("sitemap must exclude joined and API routes");
}
if (!robots.includes('disallow: ["/api/"]') || !robots.includes('allow: "/"')) {
  fail("robots source must allow public pages and disallow API crawling");
}

const css = [
  globalCss,
  homepageCss,
  guideCss,
  trustCss,
  recordsCss,
  newsletterCss,
].join("\n");
for (const phrase of [
  ":focus-visible",
  "outline-offset",
  "min-height: 2.8rem",
  "prefers-reduced-motion",
  "prefers-reduced-data",
  "prefers-contrast",
  "forced-colors",
]) {
  if (!css.includes(phrase)) fail(`accessibility CSS is missing ${phrase}`);
}
if (
  /outline:\s*(?:0|none)(?:;|\s)/i.test(css.replace(/outline:\s*0\.2rem/g, ""))
) {
  fail("accessibility CSS must not suppress focus outlines");
}

for (const [header, value] of Object.entries(requiredPageHeaders)) {
  if (!nextConfig.toLowerCase().includes(header)) {
    fail(`next config source is missing ${header}`);
  }
  if (!nextConfig.includes(value))
    fail(`next config source is missing ${header} value`);
}
for (const directive of requiredCspDirectives) {
  if (!proxy.includes(directive))
    fail(`proxy CSP source is missing ${directive}`);
}
if (
  !proxy.includes("crypto.randomUUID") ||
  !proxy.includes("Content-Security-Policy")
) {
  fail("proxy must retain per-request nonce CSP behavior");
}
if (!vercelConfig.includes('"framework": "nextjs"')) {
  fail("Vercel configuration must retain the Next.js framework override");
}
if (!vercelConfig.includes('"deploymentEnabled": false')) {
  fail("Git-triggered Vercel deployment must remain disabled");
}

for (const phrase of [
  '"use client"',
  'name="email"',
  'name="consent"',
  'name="website"',
  'aria-live="polite"',
  'href="/privacy"',
]) {
  if (!newsletterComponent.includes(phrase)) {
    fail(`newsletter form is missing ${phrase}`);
  }
}
if (!homepage.includes("NewsletterSignupForm")) {
  fail("homepage must render the newsletter form");
}

for (const phrase of [
  "SIGNUP_WEBHOOK_URL",
  "SIGNUP_WEBHOOK_TOKEN",
  "request.text()",
  "application/x-www-form-urlencoded",
  "maxBodyBytes",
  "maxAttemptsPerWindow",
  "AbortController",
  "https:",
  `policyVersion: "${newsletterPolicyVersion}"`,
  "status,",
  'redirect: "/joined"',
  '"Cache-Control": "no-store"',
]) {
  if (!joinRoute.includes(phrase))
    fail(`active signup route is missing ${phrase}`);
}
for (const prohibited of [
  "console.log(email",
  "console.error(email",
  "healthData",
  "medicalData",
  "researchEnrollment",
]) {
  if (joinRoute.includes(prohibited)) {
    fail(`active signup route contains prohibited behavior: ${prohibited}`);
  }
}
if (
  !privacyPage.includes(signupGateIssue) ||
  !joinedPage.includes(signupGateIssue)
) {
  fail("newsletter pages must link to Phase 0 gate #63");
}
for (const phrase of [
  "Google Apps Script",
  "private Google Sheet",
  "unsubscribe",
  "request deletion",
  "Phase 0",
]) {
  if (!privacyPage.includes(phrase))
    fail(`newsletter privacy notice is missing ${phrase}`);
}
if (
  !publicRoadmap.includes(sprint9GateIssue) ||
  !publicRoadmap.includes('status: "planned"')
) {
  fail("public roadmap must retain Sprint 9 as planned through issue #64");
}

const sourceFiles = (await filesRecursively(`${app}/src`)).filter((path) => {
  const filename = path.slice(path.lastIndexOf("/") + 1);
  return (
    /\.(?:ts|tsx|js|mjs|css)$/.test(path) &&
    filename !== "release-contract.mjs" &&
    !filename.startsWith("validate-")
  );
});
const source = (
  await Promise.all(sourceFiles.map((path) => readFile(path, "utf8")))
).join("\n");
for (const secret of secretPatterns) {
  if (secret.pattern.test(source))
    fail(`public site source contains ${secret.name}`);
}
if (
  /(?:from\s+|require\()\s*["'](?:stripe|paypal)|\bnew Stripe\(|\bpaypal\.Buttons\(|\bcheckout\.sessions\.create\b|\bpaymentIntents\.create\b/i.test(
    source,
  )
) {
  fail("public site source must not contain payment runtime behavior");
}

if (failures.length > 0) {
  console.error(
    `Public site source validation failed:\n${failures
      .map((failure) => `- ${failure}`)
      .join("\n")}`,
  );
  process.exit(1);
}

console.log(
  `Public site source validation passed for ${routeContracts.length} public routes, ${contrastPairs.length} contrast pairs, active Phase 0 newsletter gate #63, planned Sprint 9 gate #64, security headers, metadata, authority, and performance budgets.`,
);
