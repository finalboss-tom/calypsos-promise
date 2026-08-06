import { randomUUID } from "node:crypto";
import { getSupporterEnrollmentConfig } from "@/lib/supporters/config";
import {
  contactLookupHmac,
  createVerificationToken,
  encryptContact,
  encryptValue,
  hashVerificationToken,
  serializeEncryptedValue,
} from "@/lib/supporters/crypto";
import {
  consumeSupporterAttempt,
  getPublishedPromise,
  startSupporterEnrollment,
} from "@/lib/supporters/database";
import { sendSupporterVerification } from "@/lib/supporters/email";
import {
  supporterMovementEnabled,
  unavailableResponse,
} from "@/lib/supporters/feature";
import { validateEnrollmentInput } from "@/lib/supporters/input";
import { recordSupporterEmailAttempt } from "@/lib/supporters/outbox-database";
import { SupporterEmailDeliveryError } from "@/lib/supporters/resend-email";
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
    "When the request is eligible, a single-use verification email will be sent.",
};

export async function POST(request: Request) {
  if (!supporterMovementEnabled()) return unavailableResponse();

  let config: ReturnType<typeof getSupporterEnrollmentConfig>;
  try {
    config = getSupporterEnrollmentConfig();
  } catch {
    return Response.json(
      { error: "Supporter enrollment is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  const now = new Date();
  let allowed: boolean;
  try {
    allowed = await consumeSupporterAttempt({
      actionName: "supporter_enrollment",
      bucketHmac: clientBucketHmac(request, config.abuseHmacKey),
      now,
      windowSeconds: 15 * 60,
      limit: 5,
    });
  } catch {
    return Response.json(
      { error: "Supporter enrollment is temporarily unavailable." },
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
      { error: "The enrollment request could not be read." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  if (isHoneypotTriggered(body)) {
    return Response.json(genericAccepted, {
      status: 202,
      headers: noStoreHeaders,
    });
  }

  const validated = validateEnrollmentInput(body);
  if (!validated.ok) {
    return Response.json(
      { error: validated.message },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const promise = await getPublishedPromise(config.promiseVersionId).catch(
    () => undefined,
  );
  if (!promise) {
    return Response.json(
      { error: "The active Promise version is unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  const token = createVerificationToken();
  const expiresAt = new Date(now.getTime() + 30 * 60 * 1000);
  const encryptedContact = serializeEncryptedValue(
    encryptContact(validated.value.email, config.contactEncryptionKey),
    config.contactEncryptionKeyVersion,
  );
  const encryptedToken = serializeEncryptedValue(
    encryptValue(token, config.outboxTokenEncryptionKey),
    config.outboxTokenEncryptionKeyVersion,
  );
  const ids = {
    supporterId: randomUUID(),
    signatureId: randomUUID(),
    verificationId: randomUUID(),
    contactId: randomUUID(),
    signatureConsentId: randomUUID(),
    visibilityConsentId:
      validated.value.visibility === "public" ? randomUUID() : undefined,
    auditEventId: randomUUID(),
    outboxId: randomUUID(),
  };

  try {
    const result = await startSupporterEnrollment({
      ...ids,
      promiseVersionId: promise.promise_version_id,
      encryptedContact,
      lookupHmac: contactLookupHmac(
        validated.value.email,
        config.contactLookupHmacKey,
      ),
      encryptionKeyVersion: config.contactEncryptionKeyVersion,
      visibility: validated.value.visibility,
      displayName: validated.value.displayName,
      profileSlug: validated.value.profileSlug,
      broadRegion: validated.value.broadRegion,
      whyISigned: validated.value.whyISigned,
      signaturePolicyVersion: "promise-signature-v1",
      visibilityPolicyVersion:
        validated.value.visibility === "public"
          ? "public-listing-v1"
          : undefined,
      tokenHash: hashVerificationToken(token, config.verificationTokenPepper),
      encryptedToken,
      tokenEncryptionKeyVersion: config.outboxTokenEncryptionKeyVersion,
      expiresAt,
      now,
    });

    if (result?.created) {
      const url = new URL("/supporters/verify", config.publicBaseUrl);
      url.hash = new URLSearchParams({ token }).toString();

      try {
        const delivery = await sendSupporterVerification({
          apiKey: config.resendApiKey,
          from: config.fromEmail,
          to: validated.value.email,
          verificationUrl: url.toString(),
          promiseVersionLabel: promise.version_label,
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
                code: "verification_delivery_error",
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
    // Deliberately preserve one response shape for duplicate contacts and
    // operational conflicts. No email address or supporter identity is logged.
  }

  return Response.json(genericAccepted, {
    status: 202,
    headers: noStoreHeaders,
  });
}
