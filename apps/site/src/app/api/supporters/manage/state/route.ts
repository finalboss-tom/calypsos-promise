import { getSupporterEnrollmentConfig } from "@/lib/supporters/config";
import { hashVerificationToken } from "@/lib/supporters/crypto";
import { consumeSupporterAttempt } from "@/lib/supporters/database";
import { getSupporterManagementState } from "@/lib/supporters/management-database";
import {
  supporterMovementEnabled,
  unavailableResponse,
} from "@/lib/supporters/feature";
import { clientBucketHmac, readBoundedJson } from "@/lib/supporters/request";

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
      { error: "Supporter management is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  const now = new Date();
  try {
    const allowed = await consumeSupporterAttempt({
      actionName: "supporter_management_state",
      bucketHmac: clientBucketHmac(request, config.abuseHmacKey),
      now,
      windowSeconds: 15 * 60,
      limit: 20,
    });
    if (!allowed) {
      return Response.json(
        { error: "Too many attempts. Please wait before trying again." },
        { status: 429, headers: noStoreHeaders },
      );
    }
  } catch {
    return Response.json(
      { error: "Supporter management is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  const body = (await readBoundedJson(request).catch(() => ({}))) as {
    token?: unknown;
  };
  const token = typeof body.token === "string" ? body.token : "";
  if (!/^[A-Za-z0-9_-]{40,200}$/.test(token)) {
    return Response.json(
      { error: "This management link is invalid or expired." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  try {
    const state = await getSupporterManagementState({
      tokenHash: hashVerificationToken(token, config.verificationTokenPepper),
      now,
    });
    if (!state) {
      return Response.json(
        { error: "This management link is invalid or expired." },
        { status: 400, headers: noStoreHeaders },
      );
    }

    return Response.json(
      {
        ok: true,
        supporterRevision: state.result_revision,
        visibility: state.result_visibility,
        foundingNumber: state.result_founding_number,
        displayName: state.result_display_name,
        profileSlug: state.result_profile_slug,
        broadRegion: state.result_broad_region,
        whyISigned: state.result_why_i_signed,
        expiresAt: state.result_expires_at,
      },
      { headers: noStoreHeaders },
    );
  } catch {
    return Response.json(
      { error: "This management link is invalid or expired." },
      { status: 400, headers: noStoreHeaders },
    );
  }
}
