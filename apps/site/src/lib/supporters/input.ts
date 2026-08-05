import { normalizeEmail } from "./crypto";

export type SupporterEnrollmentInput = Readonly<{
  email: string;
  visibility: "private" | "public";
  displayName?: string;
  profileSlug?: string;
  broadRegion?: string;
  whyISigned?: string;
}>;

export type EnrollmentValidation =
  | Readonly<{ ok: true; value: SupporterEnrollmentInput }>
  | Readonly<{ ok: false; message: string }>;

function optionalString(
  value: unknown,
  maximum: number,
): string | undefined | null {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.length <= maximum ? trimmed : null;
}

export function validateEnrollmentInput(
  body: Record<string, unknown>,
): EnrollmentValidation {
  if (body.adultAttestation !== true || body.signatureConsent !== true) {
    return {
      ok: false,
      message: "Adult attestation and Promise affirmation are required.",
    };
  }

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  if (
    email.length < 3 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { ok: false, message: "Enter a valid email address." };
  }

  const requestedPublic = body.visibility === "public";
  if (!requestedPublic) {
    return { ok: true, value: { email, visibility: "private" } };
  }

  if (body.publicListingConsent !== true) {
    return {
      ok: false,
      message: "Public listing requires separate, affirmative consent.",
    };
  }

  const displayName = optionalString(body.displayName, 100);
  const broadRegion = optionalString(body.broadRegion, 100);
  const whyISigned = optionalString(body.whyISigned, 1_000);
  const profileSlugRaw = optionalString(body.profileSlug, 64);
  const profileSlug =
    typeof profileSlugRaw === "string" ? profileSlugRaw.toLowerCase() : profileSlugRaw;

  if (
    typeof displayName !== "string" ||
    typeof profileSlug !== "string" ||
    broadRegion === null ||
    whyISigned === null ||
    !/^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/.test(profileSlug)
  ) {
    return {
      ok: false,
      message:
        "Public profiles require a display name and a lowercase letter, number, or hyphen profile slug.",
    };
  }

  return {
    ok: true,
    value: {
      email,
      visibility: "public",
      displayName,
      profileSlug,
      ...(broadRegion ? { broadRegion } : {}),
      ...(whyISigned ? { whyISigned } : {}),
    },
  };
}
