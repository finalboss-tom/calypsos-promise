import { writeFile } from "node:fs/promises";
import {
  contrastPairs,
  performanceBudgets,
  requiredCspDirectives,
  requiredPageHeaders,
  routeContracts,
  secretPatterns,
  siteOrigin,
} from "./release-contract.mjs";

const baseUrl = process.env.SITE_BASE_URL ?? "http://127.0.0.1:3000";
const reportPath = process.env.SITE_RELEASE_REPORT;
const failures = [];
const resourceCache = new Map();

function fail(message) {
  failures.push(message);
}

function byteLength(value) {
  return Buffer.byteLength(value, "utf8");
}

function extractTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\b[^>]*>`, "gi")) ?? [];
}

function parseAttributes(tag) {
  const attributes = new Map();
  const pattern =
    /([:@A-Za-z_][:@A-Za-z0-9_.-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  let first = true;

  while ((match = pattern.exec(tag))) {
    if (first) {
      first = false;
      continue;
    }

    const value = (match[2] ?? match[3] ?? match[4] ?? "")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">");
    attributes.set(match[1].toLowerCase(), value);
  }

  return attributes;
}

function stripMarkup(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
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

async function fetchResource(pathOrUrl, options = {}) {
  const url = new URL(pathOrUrl, baseUrl).toString();
  const cacheKey = `${options.method ?? "GET"}:${url}`;

  if (!options.body && resourceCache.has(cacheKey)) {
    return resourceCache.get(cacheKey);
  }

  const response = await fetch(url, { redirect: "manual", ...options });
  const body = Buffer.from(await response.arrayBuffer());
  const result = { response, body, url };

  if (!options.body) {
    resourceCache.set(cacheKey, result);
  }

  return result;
}

function validateSecurityHeaders(response, route) {
  for (const [header, expected] of Object.entries(requiredPageHeaders)) {
    if (response.headers.get(header) !== expected) {
      fail(`${route}: ${header} must be ${expected}`);
    }
  }

  if (response.headers.has("x-powered-by")) {
    fail(`${route}: X-Powered-By must be absent`);
  }

  const csp = response.headers.get("content-security-policy") ?? "";
  for (const directive of requiredCspDirectives) {
    if (!csp.includes(directive)) {
      fail(`${route}: CSP is missing ${directive}`);
    }
  }

  if (!/nonce-[A-Za-z0-9-]+/.test(csp)) {
    fail(`${route}: CSP nonce is missing`);
  }
  if (csp.includes("'unsafe-eval'")) {
    fail(`${route}: CSP must not include unsafe-eval`);
  }
}

function validateSharedNewsletter(html, route) {
  const formCount = (html.match(/<form\b/gi) ?? []).length;
  if (formCount !== 1) {
    fail(`${route}: expected exactly one shared newsletter form, found ${formCount}`);
  }

  for (const phrase of [
    'id="newsletter-email"',
    'name="email"',
    'name="consent"',
    'name="website"',
    'href="/privacy"',
    "Follow the build toward Phase 0 completion.",
  ]) {
    if (!html.includes(phrase)) {
      fail(`${route}: shared newsletter form is missing ${phrase}`);
    }
  }
}

function validatePage(html, contract) {
  const route = contract.path;

  if (!/<html\b[^>]*\blang="en"/i.test(html)) {
    fail(`${route}: html language must be en`);
  }
  if ((html.match(/<main\b/gi) ?? []).length !== 1) {
    fail(`${route}: expected one main landmark`);
  }
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) {
    fail(`${route}: expected one h1`);
  }
  if (!/href="#primary-navigation"/i.test(html) || !/href="#main"/i.test(html)) {
    fail(`${route}: both skip links must be present`);
  }

  validateSharedNewsletter(html, route);

  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map((match) =>
    Number(match[1]),
  );
  if (headings.length === 0 || headings[0] !== 1) {
    fail(`${route}: heading order must begin with h1`);
  }
  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index] - headings[index - 1] > 1) {
      fail(`${route}: heading order skips from h${headings[index - 1]} to h${headings[index]}`);
    }
  }

  const ids = [...html.matchAll(/\bid="([^"]+)"/gi)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    fail(`${route}: duplicate ids found: ${[...new Set(duplicateIds)].join(", ")}`);
  }

  const idSet = new Set(ids);
  for (const match of html.matchAll(/\baria-labelledby="([^"]+)"/gi)) {
    for (const id of match[1].split(/\s+/)) {
      if (!idSet.has(id)) {
        fail(`${route}: aria-labelledby references missing id ${id}`);
      }
    }
  }

  for (const tag of extractTags(html, "img")) {
    if (!parseAttributes(tag).has("alt")) {
      fail(`${route}: image is missing alt text`);
    }
  }

  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attributes = parseAttributes(`<a ${match[1]}>`);
    const accessibleName = stripMarkup(match[2]) || attributes.get("aria-label") || "";
    if (!accessibleName) {
      fail(`${route}: link has no accessible name`);
    }
    if (attributes.get("target") === "_blank") {
      const rel = attributes.get("rel") ?? "";
      if (!rel.split(/\s+/).includes("noreferrer")) {
        fail(`${route}: target=_blank link is missing rel=noreferrer`);
      }
    }
  }

  const title = stripMarkup(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  if (!title.includes(contract.title)) {
    fail(`${route}: title does not include ${contract.title}`);
  }

  const canonicalTag = extractTags(html, "link").find(
    (tag) => parseAttributes(tag).get("rel") === "canonical",
  );
  const canonical = canonicalTag
    ? parseAttributes(canonicalTag).get("href")
    : undefined;
  const normalize = (value) => {
    const url = new URL(value, siteOrigin);
    return url.pathname === "/"
      ? url.origin
      : `${url.origin}${url.pathname.replace(/\/$/, "")}`;
  };
  const expectedCanonical = new URL(route, siteOrigin).toString();

  if (!canonical || normalize(canonical) !== normalize(expectedCanonical)) {
    fail(`${route}: canonical does not match ${expectedCanonical}`);
  }

  if (
    contract.noindex &&
    !/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)
  ) {
    fail(`${route}: route must remain noindex`);
  }
}

async function resourceMetrics(html, route) {
  const resources = new Map();

  for (const tag of extractTags(html, "script")) {
    const src = parseAttributes(tag).get("src");
    if (src) {
      resources.set(new URL(src, baseUrl).toString(), "javascript");
    }
  }
  for (const tag of extractTags(html, "link")) {
    const attributes = parseAttributes(tag);
    const href = attributes.get("href");
    if (!href) continue;

    if (attributes.get("rel") === "stylesheet") {
      resources.set(new URL(href, baseUrl).toString(), "css");
    }
    if (attributes.get("rel") === "preload" && attributes.get("as") === "font") {
      resources.set(new URL(href, baseUrl).toString(), "font");
    }
  }
  for (const tag of extractTags(html, "img")) {
    const src = parseAttributes(tag).get("src");
    if (src && !src.startsWith("data:")) {
      resources.set(new URL(src, baseUrl).toString(), "image");
    }
  }

  const totals = {
    javascriptBytes: [
      ...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi),
    ].reduce((sum, match) => sum + byteLength(match[1]), 0),
    cssBytes: [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].reduce(
      (sum, match) => sum + byteLength(match[1]),
      0,
    ),
    imageBytes: 0,
    fontBytes: 0,
    firstPartyRequests: 1,
  };
  const scannedContent = [html];

  for (const [url, type] of resources) {
    if (new URL(url).origin !== new URL(baseUrl).origin) {
      fail(`${route}: external runtime resource is not allowed: ${url}`);
      continue;
    }

    const { response, body } = await fetchResource(url);
    if (!response.ok) {
      fail(`${route}: resource failed with ${response.status}: ${url}`);
      continue;
    }

    totals.firstPartyRequests += 1;
    if (type === "javascript") {
      totals.javascriptBytes += body.byteLength;
      scannedContent.push(body.toString("utf8"));
    } else if (type === "css") {
      totals.cssBytes += body.byteLength;
      scannedContent.push(body.toString("utf8"));
    } else if (type === "image") {
      totals.imageBytes += body.byteLength;
    } else if (type === "font") {
      totals.fontBytes += body.byteLength;
    }
  }

  for (const content of scannedContent) {
    for (const secret of secretPatterns) {
      if (secret.pattern.test(content)) {
        fail(`${route}: rendered output contains ${secret.name}`);
      }
    }
  }

  return totals;
}

function enforceBudgets(route, htmlBytes, metrics) {
  const values = { htmlBytes, ...metrics };
  values.totalBytes =
    htmlBytes +
    metrics.javascriptBytes +
    metrics.cssBytes +
    metrics.imageBytes +
    metrics.fontBytes;

  for (const [name, budget] of Object.entries(performanceBudgets)) {
    if (values[name] > budget) {
      fail(`${route}: ${name} ${values[name]} exceeds ${budget}`);
    }
  }

  return values;
}

const routeEvidence = [];
for (const contract of routeContracts) {
  const { response, body } = await fetchResource(contract.path);
  const html = body.toString("utf8");

  if (response.status !== 200) {
    fail(`${contract.path}: expected 200, received ${response.status}`);
    continue;
  }
  if (!response.headers.get("content-type")?.includes("text/html")) {
    fail(`${contract.path}: expected HTML content type`);
  }

  validateSecurityHeaders(response, contract.path);
  validatePage(html, contract);
  const values = enforceBudgets(
    contract.path,
    body.byteLength,
    await resourceMetrics(html, contract.path),
  );
  routeEvidence.push({ path: contract.path, status: response.status, ...values });
}

for (const pair of contrastPairs) {
  const ratio = contrastRatio(pair.foreground, pair.background);
  if (ratio < 7) {
    fail(`${pair.name}: contrast ratio ${ratio.toFixed(2)} is below 7:1`);
  }
}

const sitemap = await fetchResource("/sitemap.xml");
const sitemapText = sitemap.body.toString("utf8");
if (sitemap.response.status !== 200) {
  fail("/sitemap.xml: expected 200");
}
for (const contract of routeContracts) {
  const location = `<loc>${new URL(contract.path, siteOrigin).toString()}</loc>`;
  if (contract.sitemap && !sitemapText.includes(location)) {
    fail(`/sitemap.xml: missing ${contract.path}`);
  }
  if (!contract.sitemap && sitemapText.includes(location)) {
    fail(`/sitemap.xml: ${contract.path} must not be indexed`);
  }
}
if (/\/api\/join/.test(sitemapText)) {
  fail("/sitemap.xml: API route must not be present");
}

const robots = await fetchResource("/robots.txt");
const robotsText = robots.body.toString("utf8");
if (robots.response.status !== 200) {
  fail("/robots.txt: expected 200");
}
for (const phrase of [
  "User-Agent: *",
  "Allow: /",
  "Disallow: /api/",
  `Sitemap: ${siteOrigin}/sitemap.xml`,
  `Host: ${siteOrigin}`,
]) {
  if (!robotsText.includes(phrase)) {
    fail(`/robots.txt: missing ${phrase}`);
  }
}

const missing = await fetchResource("/route-that-does-not-exist");
if (missing.response.status !== 404) {
  fail("not-found route: expected 404");
}
if (!missing.body.toString("utf8").includes("This path is not part of Ogygia yet.")) {
  fail("not-found route: expected public-safe explanation");
}

const invalidSignup = await fetchResource("/api/join", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ email: "invalid", consent: false }),
});
if (invalidSignup.response.status !== 400) {
  fail(`/api/join invalid POST: expected 400, received ${invalidSignup.response.status}`);
}
if (invalidSignup.response.headers.get("cache-control") !== "no-store") {
  fail("/api/join invalid POST: Cache-Control must be no-store");
}
if (invalidSignup.response.headers.has("set-cookie")) {
  fail("/api/join invalid POST: must not set a cookie");
}

const botSignup = await fetchResource("/api/join", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    email: "synthetic-validator@example.invalid",
    consent: true,
    website: "bot-field-must-be-ignored",
  }),
});
if (botSignup.response.status !== 202) {
  fail(`/api/join honeypot POST: expected 202, received ${botSignup.response.status}`);
}
const botJson = JSON.parse(botSignup.body.toString("utf8"));
if (botJson.ok !== true) {
  fail("/api/join honeypot POST: ignored success is missing");
}

const joinGet = await fetchResource("/api/join", { method: "GET" });
if (joinGet.response.status !== 405) {
  fail(`/api/join GET: expected 405, received ${joinGet.response.status}`);
}

const asset = await fetchResource("/assets/compass-mark.svg");
if (asset.response.status !== 200) {
  fail("compass asset: expected 200");
}
if (asset.response.headers.get("cache-control") !== "public, max-age=0, must-revalidate") {
  fail("compass asset: mutable asset cache contract changed");
}

const report = {
  schema: "calypsos.site-release-evidence.v2",
  evidenceClass: "isolated-local-production-preview",
  certification: "repository implementation evidence only",
  origin: baseUrl,
  productionCanonicalOrigin: siteOrigin,
  routeEvidence,
  budgets: performanceBudgets,
  contrast: contrastPairs.map((pair) => ({
    name: pair.name,
    ratio: Number(contrastRatio(pair.foreground, pair.background).toFixed(2)),
  })),
  controls: {
    sitemap: sitemap.response.status,
    robots: robots.response.status,
    notFound: missing.response.status,
    newsletterRoutes: routeEvidence.length,
    signupInvalid: invalidSignup.response.status,
    signupHoneypot: botSignup.response.status,
    signupGet: joinGet.response.status,
    asset: asset.response.status,
  },
  providerContacted: false,
  failures,
};

if (reportPath) {
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

if (failures.length > 0) {
  console.error(
    `Site release validation failed:\n${failures
      .map((failure) => `- ${failure}`)
      .join("\n")}`,
  );
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
