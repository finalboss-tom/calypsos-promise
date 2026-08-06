import { randomUUID } from "node:crypto";
import { setTimeout } from "node:timers/promises";
import { sendSupporterVerification } from "./email";
import { decryptSerializedValue } from "./management-crypto";
import { sendSupporterManagementEmail } from "./management-email";
import {
  claimSupporterEmail,
  getSupporterOutboxHealth,
  recordSupporterEmailAttempt,
  type ClaimedSupporterEmail,
  type SupporterOutboxHealth,
} from "./outbox-database";
import type { SupporterOutboxWorkerConfig } from "./outbox-config";
import {
  SupporterEmailDeliveryError,
  type SupporterEmailDelivery,
} from "./resend-email";

const maxAttempts = 5;
const leaseSeconds = 120;
const providerSpacingMilliseconds = 250;

type WorkerResult = Readonly<{
  claimed: number;
  sent: number;
  retried: number;
  deadLettered: number;
  cancelled: number;
  completionErrors: number;
  health: SupporterOutboxHealth;
}>;

function idempotencyKey(outboxId: string): string {
  return `supporter-outbox/${outboxId}`;
}

function expiresInMinutes(expiresAt: string, now: Date): number {
  return Math.max(
    1,
    Math.ceil((new Date(expiresAt).getTime() - now.getTime()) / 60_000),
  );
}

async function deliverClaimedEmail(
  config: SupporterOutboxWorkerConfig,
  claim: ClaimedSupporterEmail,
  now: Date,
): Promise<SupporterEmailDelivery> {
  const contact = decryptSerializedValue(
    claim.result_encrypted_contact,
    config.contactEncryptionKey,
    claim.result_contact_key_version,
  );
  const token = decryptSerializedValue(
    claim.result_encrypted_token,
    config.outboxTokenEncryptionKey,
    claim.result_token_key_version,
  );
  const remainingMinutes = expiresInMinutes(claim.result_expires_at, now);

  if (claim.result_template_name === "supporter_verification") {
    if (!claim.result_promise_version_label) {
      throw new SupporterEmailDeliveryError({
        code: "missing_promise_version_label",
        retryable: false,
      });
    }
    const url = new URL("/supporters/verify", config.publicBaseUrl);
    url.hash = new URLSearchParams({ token }).toString();
    return sendSupporterVerification({
      apiKey: config.resendApiKey,
      from: config.fromEmail,
      to: contact,
      verificationUrl: url.toString(),
      promiseVersionLabel: claim.result_promise_version_label,
      expiresInMinutes: remainingMinutes,
      idempotencyKey: idempotencyKey(claim.result_outbox_id),
    });
  }

  const url = new URL("/supporters/manage", config.publicBaseUrl);
  url.hash = new URLSearchParams({ token }).toString();
  return sendSupporterManagementEmail({
    apiKey: config.resendApiKey,
    from: config.fromEmail,
    to: contact,
    managementUrl: url.toString(),
    expiresInMinutes: remainingMinutes,
    idempotencyKey: idempotencyKey(claim.result_outbox_id),
  });
}

export async function runSupporterOutboxWorker(input: {
  config: SupporterOutboxWorkerConfig;
  batchSize?: number;
}): Promise<WorkerResult> {
  const batchSize = Math.max(1, Math.min(10, input.batchSize ?? 8));
  let claimed = 0;
  let sent = 0;
  let retried = 0;
  let deadLettered = 0;
  let cancelled = 0;
  let completionErrors = 0;

  for (let index = 0; index < batchSize; index += 1) {
    const now = new Date();
    const claim = await claimSupporterEmail({
      databaseUrl: input.config.workerDatabaseUrl,
      now,
      maxAttempts,
      leaseSeconds,
      claimToken: randomUUID(),
    });
    if (!claim) break;
    claimed += 1;

    try {
      const delivery = await deliverClaimedEmail(input.config, claim, now);
      const result = await recordSupporterEmailAttempt({
        databaseUrl: input.config.workerDatabaseUrl,
        outboxId: claim.result_outbox_id,
        claimToken: claim.result_claim_token,
        outcome: "sent",
        providerMessageId: delivery.providerMessageId,
        now: new Date(),
        maxAttempts,
      });
      if (result?.result_status === "sent") sent += 1;
    } catch (error) {
      const deliveryError =
        error instanceof SupporterEmailDeliveryError
          ? error
          : new SupporterEmailDeliveryError({
              code: "worker_delivery_error",
              retryable: true,
            });
      try {
        const result = await recordSupporterEmailAttempt({
          databaseUrl: input.config.workerDatabaseUrl,
          outboxId: claim.result_outbox_id,
          claimToken: claim.result_claim_token,
          outcome: deliveryError.retryable ? "retry" : "dead_letter",
          errorCode: deliveryError.code,
          retryAfterSeconds: deliveryError.retryAfterSeconds,
          now: new Date(),
          maxAttempts,
        });
        if (result?.result_status === "failed") retried += 1;
        if (result?.result_status === "dead_letter") deadLettered += 1;
        if (result?.result_status === "cancelled") cancelled += 1;
      } catch {
        completionErrors += 1;
      }
    }

    if (index + 1 < batchSize) {
      await setTimeout(providerSpacingMilliseconds);
    }
  }

  const health = await getSupporterOutboxHealth({
    databaseUrl: input.config.workerDatabaseUrl,
    now: new Date(),
  });

  return {
    claimed,
    sent,
    retried,
    deadLettered,
    cancelled,
    completionErrors,
    health,
  };
}
