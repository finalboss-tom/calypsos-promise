import { randomUUID } from "node:crypto";
import { getSupporterEnrollmentConfig } from "@/lib/supporters/config";
import {
  activateSupporter,
  consumeSupporterAttempt,
} from "@/lib/supporters/database";
import { hashVerificationToken } from "@/lib/supporters/crypto";
import {
  supporterMovementEnabled,
  unavailableResponse,
} from "@/lib/supporters/feature";
import {
  clientBucketHmac,
  readBoundedJson,
} from "@/lib/supporters/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = { "cache-control": "no-store" };

export async function POST(request: Request) {
  if (!supporterMovementEnabled()) return unavailableResponse();

  let config: ReturnType<typeof getSupporterEnrollmentConfig>;
  try {
    config = getSupporterEnrollmentConfig();
  } catch {
    return Response.json(
      { error: "Verification is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  const now = new Date();
  let allowed: boolean;
  try {
    allowed = await consumeSupporterAttempt({
      actionName: "supporter_verification",
      bucketHmac: clientBucketHmac(request, config.abuseHmacKey),
      now,
      windowSeconds: 15 * 60,
      limit: 10,
    });
  } catch {
    return Response.json(
      { error: "Verification is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  if (!allowed) {
    return Response.json(
      { error: "Too many attempts. Please wait before trying again." },
      { status: 429, headers: noStoreHeaders },
    );
  }

  const body = (await readBoundedJson(request).catch(() => ({}))) as {
    token?: unknown;
  };
  const token = typeof body.token === "string" ? body.token : "";
  if (!/^[A-Za-z0-9_-]{40,200}$/.test(token)) {
    return Response.json(
      { error: "Verification could not be completed." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  try {
    const result = await activateSupporter({
      tokenHash: hashVerificationToken(token, config.verificationTokenPepper),
      now,
      verificationEvidenceId: randomUUID(),
      auditEventId: randomUUID(),
    });
    if (!result) throw new Error("No activation result");

    return Response.json(
      {
        ok: true,
        supporterNumber: result.founding_number,
        wasAlreadyVerified: result.was_idempotent,
      },
      { headers: noStoreHeaders },
    );
  } catch {
    return Response.json(
      {
        error:
          "Verification could not be completed. The link may be expired, invalid, or already withdrawn.",
      },
      { status: 400, headers: noStoreHeaders },
    );
  }
}
