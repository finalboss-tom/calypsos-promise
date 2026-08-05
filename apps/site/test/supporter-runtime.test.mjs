import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import {
  contactLookupHmac,
  decryptValue,
  encryptValue,
  hashPromiseText,
  hashVerificationToken,
  normalizeEmail,
} from "../src/lib/supporters/crypto.ts";
import {
  readBoundedJson,
  supporterRequestBodyLimit,
} from "../src/lib/supporters/request.ts";

const siteRoot = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(siteRoot, path), "utf8");

test("supporter contact encryption round trips and lookup is normalized", () => {
  const encryptionKey = Buffer.alloc(32, 7);
  const lookupKey = Buffer.alloc(32, 9);
  const encrypted = encryptValue("person@example.org", encryptionKey);
  assert.equal(decryptValue(encrypted, encryptionKey), "person@example.org");
  assert.deepEqual(
    contactLookupHmac(" Person@Example.org ", lookupKey),
    contactLookupHmac("person@example.org", lookupKey),
  );
  assert.equal(normalizeEmail(" Person@Example.org "), "person@example.org");
});

test("verification lookup is HMAC-peppered and deterministic", () => {
  const pepper = Buffer.alloc(32, 3);
  assert.deepEqual(
    hashVerificationToken("token-value", pepper),
    hashVerificationToken("token-value", pepper),
  );
  assert.notDeepEqual(
    hashVerificationToken("token-value", pepper),
    hashVerificationToken("different-token", pepper),
  );
  assert.throws(
    () => hashVerificationToken("token-value", Buffer.alloc(31)),
    /must be 32 bytes/,
  );
});

test("Promise content hashing is stable", () => {
  assert.equal(
    hashPromiseText("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
});

test("JSON request bodies are bounded while streaming", async () => {
  const valid = new Request("https://example.test/api/supporters/start", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "person@example.org" }),
  });
  assert.deepEqual(await readBoundedJson(valid), {
    email: "person@example.org",
  });

  const oversized = new Request("https://example.test/api/supporters/start", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ value: "x".repeat(supporterRequestBodyLimit) }),
  });
  await assert.rejects(readBoundedJson(oversized), /BODY_TOO_LARGE/);
});

test("supporter module is disabled by default and uses scoped credentials", () => {
  const feature = read("src/lib/supporters/feature.ts");
  const config = read("src/lib/supporters/config.ts");
  const database = read("src/lib/supporters/database.ts");
  const email = read("src/lib/supporters/email.ts");
  const provider = read("src/lib/supporters/resend-email.ts");

  assert.match(feature, /SUPPORTER_MOVEMENT_ENABLED.*=== "true"/s);
  assert.match(config, /SUPPORTER_RUNTIME_DATABASE_URL/);
  assert.match(config, /SUPPORTER_EMAIL_RESEND_API_KEY/);
  assert.match(
    config,
    /must not use the Marketplace owner database connection/,
  );
  assert.doesNotMatch(database, /SUPPORTER_DATABASE_URL/);
  assert.match(database, /Neon-Connection-String/);
  assert.ok(database.includes('replace(/^[^.]+\\./, "api.")'));
  assert.match(
    database,
    /Published Promise content failed its integrity check/,
  );
  assert.match(email, /sendResendEmail/);
  assert.match(provider, /https:\/\/api\.resend\.com\/emails/);
});

test("signature, adult, and public-listing consent remain separate", () => {
  const form = read("src/app/supporters/supporter-enrollment-form.tsx");
  const input = read("src/lib/supporters/input.ts");

  assert.match(form, /name="adultAttestation"/);
  assert.match(form, /name="signatureConsent"/);
  assert.match(form, /name="publicListingConsent"/);
  assert.match(form, /Newsletter\s+consent remains separate/);
  assert.match(input, /body\.publicListingConsent !== true/);
});

test("verification token is handed off in the URL fragment", () => {
  const start = read("src/app/api/supporters/start/route.ts");
  const verify = read("src/app/supporters/verification-client.tsx");

  assert.match(
    start,
    /url\.hash = new URLSearchParams\(\{ token \}\)\.toString\(\)/,
  );
  assert.match(verify, /window\.location\.hash\.slice\(1\)/);
  assert.match(verify, /window\.history\.replaceState/);
  assert.doesNotMatch(start, /searchParams\.set\([^)]*token/);
});

test("public supporter reads expose only consented projection fields", () => {
  const database = read("src/lib/supporters/database.ts");
  const migration = read(
    "supporters/database/migrations/0004_supporter_public_runtime_reads.sql",
  );

  assert.match(database, /listPublicSupporters/);
  assert.match(migration, /list_public_supporters/);
  assert.match(migration, /supporter_public\.supporter_profiles/);
  assert.match(
    migration,
    /REVOKE EXECUTE ON FUNCTION supporter_private\.withdraw_supporter/,
  );
});

test("activation migration qualifies output-name collisions", () => {
  const migration = read(
    "supporters/database/migrations/0005_fix_activation_output_name_collision.sql",
  );

  assert.match(
    migration,
    /WHERE supporter\.supporter_id = v_challenge\.supporter_id/,
  );
  assert.match(
    migration,
    /WHERE signature\.signature_id = v_challenge\.signature_id/,
  );
  assert.match(
    migration,
    /WHERE profile\.supporter_id = v_supporter\.supporter_id/,
  );
  assert.match(migration, /ON CONFLICT ON CONSTRAINT supporter_profiles_pkey/);
  assert.doesNotMatch(migration, /WHERE supporter_id =/);
  assert.doesNotMatch(migration, /WHERE signature_id =/);
});
