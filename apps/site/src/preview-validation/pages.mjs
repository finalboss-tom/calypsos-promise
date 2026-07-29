import {
  attribute,
  baseUrl,
  fail,
  normalizeUrl,
  performanceBudgets,
  request,
  requiredCspDirectives,
  requiredPageHeaders,
  routeContracts,
  secretPatterns,
  siteOrigin,
} from "./shared.mjs";

function validateHeaders(response, route) {
  for (const [name, expected] of Object.entries(requiredPageHeaders)) {
    if (response.headers.get(name) !== expected) {
      fail(`${route}: ${name} must be ${expected}`);
    }
  }
  if (response.headers.has("x-powered-by")) {
    fail(`${route}: X-Powered-By must be absent`);
  }
  const csp = response.headers.get("content-security-policy") ?? "";
  for (const directive of requiredCspDirectives) {
    if (!csp.includes(directive)) fail(`${route}: CSP is missing ${directive}`);
  }
  if (!/nonce-[A-Za-z0-9-]+/.test(csp)) fail(`${route}: CSP nonce is missing`);
  if (csp.includes("'unsafe-eval'")) fail(`${route}: CSP must not include unsafe-eval`);
}

function validateMarkup(html, contract) {
  const route = contract.path;
  const required = [
    ["html language", /<html\b[^>]*lang="en"/i],
    ["primary-navigation skip link", /href="#primary-navigation"/i],
    ["content skip link", /href="#main"/i],
    ["newsletter email", /id="newsletter-email"/i],
    ["newsletter consent", /name="consent"/i],
    ["newsletter honeypot", /name="website"/i],
    ["newsletter privacy link", /href="\/privacy"/i],
    ["newsletter heading", /Follow the build toward Phase 0 completion\./i],
  ];
  for (const [label, pattern] of required) {
    if (!pattern.test(html)) fail(`${route}: missing ${label}`);
  }

  const singular = [
    ["main landmark", /<main\b/gi],
    ["h1", /<h1\b/gi],
    ["shared newsletter form", /<form\b/gi],
  ];
  for (const [label, pattern] of singular) {
    const count = (html.match(pattern) ?? []).length;
    if (count !== 1) fail(`${route}: expected exactly one ${label}, found ${count}`);
  }

  const ids = [...html.matchAll(/\bid="([^"]+)"/gi)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    fail(`${route}: duplicate ids: ${[...new Set(duplicates)].join(", ")}`);
  }

  const pageTitle = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  if (!pageTitle.includes(contract.title)) {
    fail(`${route}: title does not include ${contract.title}`);
  }

  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonicalTag = links.find((link) => attribute(link, "rel") === "canonical");
  const actualCanonical = canonicalTag ? attribute(canonicalTag, "href") : undefined;
  const expectedCanonical = new URL(route, siteOrigin).toString();
  if (
    !actualCanonical ||
    normalizeUrl(actualCanonical) !== normalizeUrl(expectedCanonical)
  ) {
    fail(`${route}: canonical ${actualCanonical ?? "missing"} does not match ${expectedCanonical}`);
  }

  if (
    contract.noindex &&
    !/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)
  ) {
    fail(`${route}: route must remain noindex`);
  }
}

async function validateResources(html, route) {
  const resources = new Map();
  for (const tag of html.match(/<(?:script|link|img)\b[^>]*>/gi) ?? []) {
    const tagName = tag.match(/^<([a-z]+)/i)?.[1]?.toLowerCase();
    const source = attribute(tag, tagName === "link" ? "href" : "src");
    if (!source || source.startsWith("data:")) continue;
    if (tagName === "link" && attribute(tag, "rel") !== "stylesheet") continue;
    const type =
      tagName === "img" ? "image" : tagName === "link" ? "css" : "javascript";
    resources.set(new URL(source, baseUrl).toString(), type);
  }

  const totals = {
    javascriptBytes: 0,
    cssBytes: 0,
    imageBytes: 0,
    fontBytes: 0,
    firstPartyRequests: 1,
  };
  const scanned = [html];

  for (const [url, type] of resources) {
    if (new URL(url).origin !== new URL(baseUrl).origin) {
      fail(`${route}: external runtime resource is not allowed: ${url}`);
      continue;
    }
    const { response, body } = await request(url);
    if (!response.ok) {
      fail(`${route}: resource failed with ${response.status}: ${url}`);
      continue;
    }
    totals.firstPartyRequests += 1;
    if (type === "javascript") {
      totals.javascriptBytes += body.byteLength;
      scanned.push(body.toString("utf8"));
    } else if (type === "css") {
      totals.cssBytes += body.byteLength;
      scanned.push(body.toString("utf8"));
    } else {
      totals.imageBytes += body.byteLength;
    }
  }

  for (const content of scanned) {
    for (const secret of secretPatterns) {
      if (secret.pattern.test(content)) {
        fail(`${route}: rendered output contains ${secret.name}`);
      }
    }
  }
  return totals;
}

export async function validatePages() {
  const routeEvidence = [];
  for (const contract of routeContracts) {
    const { response, body } = await request(contract.path);
    const html = body.toString("utf8");
    const route = contract.path;
    if (response.status !== 200) {
      fail(`${route}: expected 200, received ${response.status}`);
      continue;
    }
    if (!response.headers.get("content-type")?.includes("text/html")) {
      fail(`${route}: expected HTML content type`);
    }
    validateHeaders(response, route);
    validateMarkup(html, contract);

    const metrics = await validateResources(html, route);
    const values = { htmlBytes: body.byteLength, ...metrics };
    values.totalBytes =
      values.htmlBytes +
      values.javascriptBytes +
      values.cssBytes +
      values.imageBytes +
      values.fontBytes;
    for (const [name, budget] of Object.entries(performanceBudgets)) {
      if (values[name] > budget) {
        fail(`${route}: ${name} ${values[name]} exceeds ${budget}`);
      }
    }
    routeEvidence.push({ path: route, status: response.status, ...values });
  }
  return routeEvidence;
}
