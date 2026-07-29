import { fail, request, routeContracts, siteOrigin } from "./shared.mjs";

export async function validateSupportingRoutes() {
  const sitemap = await request("/sitemap.xml");
  const sitemapText = sitemap.body.toString("utf8");
  if (sitemap.response.status !== 200) fail("/sitemap.xml: expected 200");
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

  const robots = await request("/robots.txt");
  const robotsText = robots.body.toString("utf8");
  for (const phrase of [
    "User-Agent: *",
    "Allow: /",
    "Disallow: /api/",
    `Sitemap: ${siteOrigin}/sitemap.xml`,
    `Host: ${siteOrigin}`,
  ]) {
    if (!robotsText.includes(phrase)) fail(`/robots.txt: missing ${phrase}`);
  }

  const missing = await request("/route-that-does-not-exist");
  if (missing.response.status !== 404) fail("not-found route: expected 404");
  if (
    !missing.body
      .toString("utf8")
      .includes("This path is not part of Ogygia yet.")
  ) {
    fail("not-found route: expected public-safe explanation");
  }

  const invalidSignup = await request("/api/join", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "invalid", consent: false }),
  });
  if (invalidSignup.response.status !== 400) {
    fail(
      `/api/join invalid POST: expected 400, received ${invalidSignup.response.status}`,
    );
  }
  if (invalidSignup.response.headers.get("cache-control") !== "no-store") {
    fail("/api/join invalid POST: Cache-Control must be no-store");
  }
  if (invalidSignup.response.headers.has("set-cookie")) {
    fail("/api/join invalid POST: must not set a cookie");
  }

  const botSignup = await request("/api/join", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: "synthetic-validator@example.invalid",
      consent: true,
      website: "bot-field-must-be-ignored",
    }),
  });
  if (botSignup.response.status !== 202) {
    fail(
      `/api/join honeypot POST: expected 202, received ${botSignup.response.status}`,
    );
  }
  if (JSON.parse(botSignup.body.toString("utf8")).ok !== true) {
    fail("/api/join honeypot POST: ignored success is missing");
  }

  const joinGet = await request("/api/join", { method: "GET" });
  if (joinGet.response.status !== 405) {
    fail(`/api/join GET: expected 405, received ${joinGet.response.status}`);
  }

  const asset = await request("/assets/compass-mark.svg");
  if (asset.response.status !== 200) fail("compass asset: expected 200");
  if (
    asset.response.headers.get("cache-control") !==
    "public, max-age=0, must-revalidate"
  ) {
    fail("compass asset: mutable asset cache contract changed");
  }

  return {
    sitemap: sitemap.response.status,
    robots: robots.response.status,
    notFound: missing.response.status,
    signupInvalid: invalidSignup.response.status,
    signupHoneypot: botSignup.response.status,
    signupGet: joinGet.response.status,
    asset: asset.response.status,
  };
}
