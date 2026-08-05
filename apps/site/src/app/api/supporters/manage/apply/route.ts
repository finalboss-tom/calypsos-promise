import { randomUUID } from "node:crypto";
import { getSupporterEnrollmentConfig } from "@/lib/supporters/config";
import { hashVerificationToken } from "@/lib/supporters/crypto";
import { consumeSupporterAttempt } from "@/lib/supporters/database";
import { applySupporterManagement } from "@/lib/supporters/management-database";
import { validateManagementActionInput } from "@/lib/supporters/management-input";
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
      actionName: "supporter_management_apply",
      bucketHmac: clientBucketHmac(request, config.abuseHmacKey),
      now,
      windowSeconds: 15 * 60,
      limit: 10,
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

  const body: Record<string, unknown> = await readBoundedJson(request).catch(
    () => ({}),
  );
  const token = typeof body.token === "string" ? body.token : "";
  if (!/^[A-Za-z0-9_-]{40,200}$/.test(token)) {
    return Response.json(
      { error: "This management link is invalid or expired." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const validated = validateManagementActionInput(body);
  if (!validated.ok) {
    return Response.json(
      { error: validated.message },
      { status: 400, headers: noStoreHeaders },
    );
  }

  try {
    const result = await applySupporterManagement({
      tokenHash: hashVerificationToken(token, config.verificationTokenPepper),
      now,
      expectedRevision: validated.value.expectedRevision,
      action: validated.value.action,
      confirmation: validated.value.confirmation,
      auditEventId: randomUUID(),
      ...(validated.value.profile
        ? {
            displayName: validated.value.profile.displayName,
            profileSlug: validated.value.profile.profileSlug,
            ...(validated.value.profile.broadRegion
              ? { broadRegion: validated.value.profile.broadRegion }
              : {}),
            ...(validated.value.profile.whyISigned
              ? { whyISigned: validated.value.profile.whyISigned }
              : {}),
          }
        : {}),
      ...(validated.value.action === "set_public"
        ? { publicListingConsentId: randomUUID() }
        : {}),
    });

    if (!result) throw new Error("No management result");

    const message =
      result.result_status === "withdrawn"
        ? `Support withdrawn. Founding Supporter number ${String(
            result.result_founding_number ?? "",
          ).padStart(4, "0")} is permanently retired.`
        : result.result_visibility === "public"
          ? "Your supporter record is active and your consented public profile is published."
          : "Your supporter record remains active and private. No public profile is published.";

    return Response.json(
      {
        ok: true,
        message,
        status: result.result_status,
        visibility: result.result_visibility,
        foundingNumber: result.result_founding_number,
        supporterRevision: result.result_revision,
      },
      { headers: noStoreHeaders },
    );
  } catch {
    return Response.json(
      {
        error:
          "The requested change could not be applied. The link may be expired, used, or based on an older record revision.",
      },
      { status: 409, headers: noStoreHeaders },
    );
  }
}
