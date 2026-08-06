import { randomUUID } from "node:crypto";
import { getSupporterEnrollmentConfig } from "@/lib/supporters/config";
import {
  contactLookupHmac,
  createVerificationToken,
  encryptValue,
  hashVerificationToken,
  serializeEncryptedValue,
} from "@/lib/supporters/crypto";
import { consumeSupporterAttempt } from "@/lib/supporters/database";
import { decryptSerializedValue } from "@/lib/supporters/management-crypto";
import { startSupporterManagement } from "@/lib/supporters/management-database";
import { sendSupporterManagementEmail } from "@/lib/supporters/management-email";
import { validateManagementRequestInput } from "@/lib/supporters/management-input";
import { recordSupporterEmailAttempt } from "@/lib/supporters/outbox-database";
import { SupporterEmailDeliveryError } from "@/lib/supporters/resend-email";
import {
  supporterMovementEnabled,
  unavailableResponse,
} from "@/lib/supporters/feature";
import {
  clientBucketHmac,
  isHoneypotTriggered,
  readBoundedJson,
} from "@/lib/supporters/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = { "cache-control": "no-store" };
const genericAccepted = {
  ok: true,
  message:
    "When the address is eligible, a single-use management email will be sent.",
};

export async function POST(request: Request) {
  if (!supporterMovementEnabled()) return unavailableResponse();

  let config: ReturnType<typeof getSupporterEnrollmentConfig>;
  try {
    config = getSupporterEnrollmentConfig();
  } catch {
    return Response.json(
      { error: "Supporter management is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  const now = new Date();
  let allowed: boolean;
  try {
    allowed = await consumeSupporterAttempt({
      actionName: "supporter_management_request",
      bucketHmac: clientBucketHmac(request, config.abuseHmacKey),
      now,
      windowSeconds: 15 * 60,
      limit: 5,
    });
  } catch {
    return Response.json(
      { error: "Supporter management is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  if (!allowed) {
    return Response.json(
      { error: "Too many attempts. Please wait before trying again." },
      { status: 429, headers: noStoreHeaders },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await readBoundedJson(request);
  } catch {
    return Response.json(
      { error: "The management request could not be read." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  if (isHoneypotTriggered(body)) {
    return Response.json(genericAccepted, {
      status: 202,
      headers: noStoreHeaders,
    });
  }

  const validated = validateManagementRequestInput(body);
  if (!validated.ok) {
    return Response.json(
      { error: validated.message },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const token = createVerificationToken();
  const expiresAt = new Date(now.getTime() + 30 * 60 * 1000);
  const encryptedToken = serializeEncryptedValue(
    encryptValue(token, config.outboxTokenEncryptionKey),
    config.outboxTokenEncryptionKeyVersion,
  );
  const ids = {
    verificationId: randomUUID(),
    outboxId: randomUUID(),
    auditEventId: randomUUID(),
  };

  try {
    const result = await startSupporterManagement({
      lookupHmac: contactLookupHmac(
        validated.value.email,
        config.contactLookupHmacKey,
      ),
      tokenHash: hashVerificationToken(token, config.verificationTokenPepper),
      encryptedToken,
      tokenEncryptionKeyVersion: config.outboxTokenEncryptionKeyVersion,
      expiresAt,
      now,
      ...ids,
    });

    if (
      result?.created &&
      result.encrypted_contact &&
      result.contact_encryption_key_version ===
        config.contactEncryptionKeyVersion
    ) {
      const contact = decryptSerializedValue(
        result.encrypted_contact,
        config.contactEncryptionKey,
        config.contactEncryptionKeyVersion,
      );
      const url = new URL("/supporters/manage", config.publicBaseUrl);
      url.hash = new URLSearchParams({ token }).toString();

      try {
        const delivery = await sendSupporterManagementEmail({
          apiKey: config.resendApiKey,
          from: config.fromEmail,
          to: contact,
          managementUrl: url.toString(),
          expiresInMinutes: 30,
          idempotencyKey: `supporter-outbox/${ids.outboxId}`,
        });
        await recordSupporterEmailAttempt({
          databaseUrl: config.databaseUrl,
          outboxId: ids.outboxId,
          outcome: "sent",
          providerMessageId: delivery.providerMessageId,
          now: new Date(),
        }).catch(() => undefined);
      } catch (error) {
        const deliveryError =
          error instanceof SupporterEmailDeliveryError
            ? error
            : new SupporterEmailDeliveryError({
                code: "management_delivery_error",
                retryable: true,
              });
        await recordSupporterEmailAttempt({
          databaseUrl: config.databaseUrl,
          outboxId: ids.outboxId,
          outcome: deliveryError.retryable ? "retry" : "dead_letter",
          errorCode: deliveryError.code,
          retryAfterSeconds: deliveryError.retryAfterSeconds,
          now: new Date(),
        }).catch(() => undefined);
      }
    }
  } catch {
    // Preserve the same public response for missing contacts, cooldowns,
    // encryption-version failures, and operational conflicts.
  }

  return Response.json(genericAccepted, {
    status: 202,
    headers: noStoreHeaders,
  });
}
