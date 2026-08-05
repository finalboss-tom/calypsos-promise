import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import {
  classifyResendFailure,
  SupporterEmailDeliveryError,
} from "../src/lib/supporters/resend-email.ts";
import { verifyResendWebhook } from "../src/lib/supporters/resend-webhook.ts";

const siteRoot = resolve(import.meta.dirname, "..");
const repoRoot = resolve(siteRoot, "../..");
const read = (path) => readFileSync(resolve(siteRoot, path), "utf8");

test("Resend failures distinguish retryable and permanent outcomes", () => {
  const quota = classifyResendFailure({
    status: 429,
    code: "daily_quota_exceeded",
    retryAfterSeconds: 120,
  });
  assert.ok(quota instanceof SupporterEmailDeliveryError);
  assert.equal(quota.retryable, true);
  assert.equal(quota.retryAfterSeconds, 120);

  const payload = classifyResendFailure({
    status: 422,
    code: "validation_error",
  });
  assert.equal(payload.retryable, false);

  const idempotency = classifyResendFailure({
    status: 409,
    code: "invalid_idempotent_request",
  });
  assert.equal(idempotency.retryable, false);
});

test("Resend webhook verification checks signature and timestamp", () => {
  const secretBytes = Buffer.alloc(32, 11);
  const webhookSecret = `whsec_${secretBytes.toString("base64")}`;
  const payload = JSON.stringify({ type: "email.delivered" });
  const svixId = "msg_test_delivery";
  const svixTimestamp = "1785938400";
  const signature = createHmac("sha256", secretBytes)
    .update(`${svixId}.${svixTimestamp}.${payload}`, "utf8")
    .digest("base64");

  assert.equal(
    verifyResendWebhook({
      payload,
      svixId,
      svixTimestamp,
      svixSignature: `v1,${signature}`,
      webhookSecret,
      now: new Date(Number(svixTimestamp) * 1000),
    }),
    true,
  );
  assert.equal(
    verifyResendWebhook({
      payload: `${payload} `,
      svixId,
      svixTimestamp,
      svixSignature: `v1,${signature}`,
      webhookSecret,
      now: new Date(Number(svixTimestamp) * 1000),
    }),
    false,
  );
  assert.equal(
    verifyResendWebhook({
      payload,
      svixId,
      svixTimestamp,
      svixSignature: `v1,${signature}`,
      webhookSecret,
      now: new Date((Number(svixTimestamp) + 301) * 1000),
    }),
    false,
  );
});

test("outbox migration adds leases, bounded retry, and dead-letter state", () => {
  const migration = read(
    "supporters/database/migrations/0007_supporter_outbox_reliability.sql",
  );

  assert.match(migration, /lease_expires_at/);
  assert.match(migration, /claim_token/);
  assert.match(migration, /'dead_letter'/);
  assert.match(migration, /claim_supporter_email_v2/);
  assert.match(migration, /record_supporter_email_attempt/);
  assert.match(migration, /60 \* \(2 \^ greatest/);
  assert.match(migration, /p_max_attempts/);
  assert.match(migration, /FOR UPDATE OF candidate SKIP LOCKED/);
  assert.match(migration, /lease_expired_max_attempts/);
});

test("outbox worker has a dedicated role and no private table reads", () => {
  const migration = read(
    "supporters/database/migrations/0007_supporter_outbox_reliability.sql",
  );
  const config = read("src/lib/supporters/outbox-config.ts");

  assert.match(migration, /CREATE ROLE supporter_outbox_worker NOLOGIN/);
  assert.match(
    migration,
    /GRANT EXECUTE ON FUNCTION supporter_private\.claim_supporter_email_v2/,
  );
  assert.match(
    migration,
    /GRANT EXECUTE ON FUNCTION supporter_private\.get_supporter_outbox_health/,
  );
  assert.doesNotMatch(migration, /GRANT SELECT ON supporter_private/);
  assert.match(config, /SUPPORTER_OUTBOX_WORKER_DATABASE_URL/);
  assert.match(config, /dedicated least-privilege database login/);
});

test("outgoing supporter email uses provider idempotency keys", () => {
  const sender = read("src/lib/supporters/resend-email.ts");
  const enrollment = read("src/app/api/supporters/start/route.ts");
  const management = read("src/app/api/supporters/manage/start/route.ts");

  assert.match(sender, /"idempotency-key": input\.idempotencyKey/);
  assert.match(enrollment, /supporter-outbox\/\$\{ids\.outboxId\}/);
  assert.match(management, /supporter-outbox\/\$\{ids\.outboxId\}/);
  assert.match(enrollment, /recordSupporterEmailAttempt/);
  assert.match(management, /recordSupporterEmailAttempt/);
  assert.doesNotMatch(enrollment, /completeSupporterEmail/);
  assert.doesNotMatch(management, /completeSupporterEmail/);
});

test("delivery observability stores no webhook recipient payload", () => {
  const migration = read(
    "supporters/database/migrations/0007_supporter_outbox_reliability.sql",
  );
  const webhook = read(
    "src/app/api/supporters/outbox/webhook/resend/route.ts",
  );
  const eventTable = migration
    .split("CREATE TABLE IF NOT EXISTS supporter_private.email_delivery_events", 2)[1]
    ?.split("CREATE INDEX IF NOT EXISTS email_delivery_events_provider_message", 1)[0];

  assert.ok(eventTable);
  assert.match(eventTable, /provider_message_id/);
  assert.match(migration, /result_duplicate/);
  assert.match(migration, /result_matched/);
  assert.doesNotMatch(
    eventTable,
    /raw_payload|recipient_email|encrypted_contact|encrypted_token/,
  );
  assert.match(webhook, /svix-id/);
  assert.match(webhook, /verifyResendWebhook/);
  assert.match(webhook, /readRawPayload/);
});

test("worker and health endpoints require scoped bearer authorization", () => {
  const worker = read("src/app/api/supporters/outbox/worker/route.ts");
  const health = read("src/app/api/supporters/outbox/health/route.ts");
  const turbo = readFileSync(resolve(repoRoot, "turbo.json"), "utf8");
  const vercel = read("vercel.json");

  assert.match(worker, /bearerAuthorized/);
  assert.match(worker, /supporterOutboxWorkerEnabled/);
  assert.match(worker, /maxDuration = 30/);
  assert.match(health, /bearerAuthorized/);
  assert.match(turbo, /SUPPORTER_OUTBOX_WORKER_SECRET_B64/);
  assert.match(turbo, /SUPPORTER_EMAIL_RESEND_WEBHOOK_SECRET/);
  assert.doesNotMatch(vercel, /"crons"/);
});
