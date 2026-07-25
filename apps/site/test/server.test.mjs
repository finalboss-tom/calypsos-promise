import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, test } from "node:test";

import { createSiteServer } from "../src/server.mjs";
import { validateSignup } from "../src/signup.mjs";

let siteServer;
let siteOrigin;

before(async () => {
  siteServer = createSiteServer();
  await new Promise((resolve) => siteServer.listen(0, "127.0.0.1", resolve));
  const address = siteServer.address();
  siteOrigin = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => siteServer.close((error) => (error ? reject(error) : resolve())));
});

test("validates purpose-limited signup fields", () => {
  assert.deepEqual(validateSignup({ email: " Seeker@Example.com ", consent: true }), {
    ok: true,
    email: "seeker@example.com",
  });
  assert.equal(validateSignup({ email: "invalid", consent: true }).ok, false);
  assert.equal(validateSignup({ email: "seeker@example.com", consent: false }).ok, false);
  assert.deepEqual(validateSignup({ email: "anything", consent: false, website: "spam" }), {
    ok: true,
    ignored: true,
  });
});

test("serves the cinematic public gateway with security headers", async () => {
  const response = await fetch(`${siteOrigin}/`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-security-policy"), /default-src 'self'/);
  assert.match(html, /View on GitHub/);
  assert.match(html, /Meet Aster/);
  assert.match(html, /AI proposes/);
  assert.match(html, /The House of Keys/);
});

test("serves the private signup notice", async () => {
  const response = await fetch(`${siteOrigin}/privacy`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Signup privacy notice/);
  assert.match(html, /not written to this public repository/);
});

test("does not store signups when the private webhook is unconfigured", async () => {
  const previousWebhook = process.env.SIGNUP_WEBHOOK_URL;
  delete process.env.SIGNUP_WEBHOOK_URL;

  try {
    const response = await fetch(`${siteOrigin}/api/join`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "seeker@example.com", consent: true }),
    });
    const body = await response.json();

    assert.equal(response.status, 503);
    assert.match(body.error, /not connected yet/);
  } finally {
    if (previousWebhook) {
      process.env.SIGNUP_WEBHOOK_URL = previousWebhook;
    }
  }
});

test("forwards a validated signup to the configured private endpoint", async () => {
  let receivedPayload;
  const provider = createServer(async (request, response) => {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    receivedPayload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    response.writeHead(204);
    response.end();
  });

  await new Promise((resolve) => provider.listen(0, "127.0.0.1", resolve));
  const providerAddress = provider.address();
  const previousWebhook = process.env.SIGNUP_WEBHOOK_URL;
  process.env.SIGNUP_WEBHOOK_URL = `http://127.0.0.1:${providerAddress.port}/private-signup`;

  try {
    const response = await fetch(`${siteOrigin}/api/join`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "founder@example.com", consent: true }),
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.equal(body.redirect, "/joined");
    assert.equal(receivedPayload.email, "founder@example.com");
    assert.equal(receivedPayload.consent, true);
    assert.equal(receivedPayload.source, "founding-expedition-website");
    assert.equal(receivedPayload.policyVersion, "2026-07-25");
  } finally {
    if (previousWebhook) process.env.SIGNUP_WEBHOOK_URL = previousWebhook;
    else delete process.env.SIGNUP_WEBHOOK_URL;
    await new Promise((resolve, reject) => provider.close((error) => (error ? reject(error) : resolve())));
  }
});
