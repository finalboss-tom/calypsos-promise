import { normalizeEmail } from "./crypto";
import type { SupporterManagementAction } from "./management-database";

export type SupporterManagementRequestInput = Readonly<{
  email: string;
}>;

export type SupporterPublicProfileInput = Readonly<{
  displayName: string;
  profileSlug: string;
  broadRegion?: string;
  whyISigned?: string;
}>;

export type SupporterManagementActionInput = Readonly<{
  expectedRevision: number;
  action: SupporterManagementAction;
  confirmation: boolean;
  profile?: SupporterPublicProfileInput;
}>;

export type ManagementValidation<T> =
  | Readonly<{ ok: true; value: T }>
  | Readonly<{ ok: false; message: string }>;

function validEmail(value: unknown): string | undefined {
  const email = typeof value === "string" ? normalizeEmail(value) : "";
  if (
    email.length < 3 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return undefined;
  }
  return email;
}

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

function validatePublicProfile(
  body: Record<string, unknown>,
): ManagementValidation<SupporterPublicProfileInput> {
  const displayName = optionalString(body.displayName, 100);
  const broadRegion = optionalString(body.broadRegion, 100);
  const whyISigned = optionalString(body.whyISigned, 1_000);
  const profileSlugRaw = optionalString(body.profileSlug, 64);
  const profileSlug =
    typeof profileSlugRaw === "string"
      ? profileSlugRaw.toLowerCase()
      : profileSlugRaw;

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
      displayName,
      profileSlug,
      ...(broadRegion ? { broadRegion } : {}),
      ...(whyISigned ? { whyISigned } : {}),
    },
  };
}

export function validateManagementRequestInput(
  body: Record<string, unknown>,
): ManagementValidation<SupporterManagementRequestInput> {
  const email = validEmail(body.email);
  return email
    ? { ok: true, value: { email } }
    : { ok: false, message: "Enter a valid email address." };
}

export function validateManagementActionInput(
  body: Record<string, unknown>,
): ManagementValidation<SupporterManagementActionInput> {
  const expectedRevision = Number(body.expectedRevision);
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) {
    return {
      ok: false,
      message: "The supporter record revision is invalid.",
    };
  }

  const action = body.action;
  if (
    action !== "set_private" &&
    action !== "set_public" &&
    action !== "update_public_profile" &&
    action !== "withdraw"
  ) {
    return { ok: false, message: "Choose a valid supporter action." };
  }

  if (action === "set_public") {
    if (body.publicListingConsent !== true) {
      return {
        ok: false,
        message: "Public listing requires fresh, affirmative consent.",
      };
    }
    const profile = validatePublicProfile(body);
    return profile.ok
      ? {
          ok: true,
          value: {
            expectedRevision,
            action,
            confirmation: true,
            profile: profile.value,
          },
        }
      : profile;
  }

  if (action === "update_public_profile") {
    const profile = validatePublicProfile(body);
    return profile.ok
      ? {
          ok: true,
          value: {
            expectedRevision,
            action,
            confirmation: true,
            profile: profile.value,
          },
        }
      : profile;
  }

  if (
    action === "set_private" &&
    body.privateVisibilityConfirmation !== true
  ) {
    return {
      ok: false,
      message: "Confirm that the public profile should be removed.",
    };
  }

  if (action === "withdraw" && body.withdrawalConfirmation !== true) {
    return {
      ok: false,
      message:
        "Confirm withdrawal and permanent retirement of the Founding Supporter number.",
    };
  }

  return {
    ok: true,
    value: {
      expectedRevision,
      action,
      confirmation: true,
    },
  };
}
