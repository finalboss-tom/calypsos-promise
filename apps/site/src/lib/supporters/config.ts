const keyVariables = [
  "SUPPORTER_CONTACT_ENCRYPTION_KEY_B64",
  "SUPPORTER_CONTACT_LOOKUP_HMAC_KEY_B64",
  "SUPPORTER_VERIFICATION_TOKEN_PEPPER_B64",
  "SUPPORTER_OUTBOX_TOKEN_ENCRYPTION_KEY_B64",
  "SUPPORTER_ABUSE_HMAC_KEY_B64",
] as const;

type KeyVariable = (typeof keyVariables)[number];

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing server configuration: ${name}`);
  return value;
}

function key(name: KeyVariable): Buffer {
  const value = Buffer.from(required(name), "base64");
  if (value.length !== 32) {
    throw new Error(`${name} must decode to exactly 32 bytes`);
  }
  return value;
}

function resolvePublicBaseUrl(): string {
  const explicit = process.env.SUPPORTER_PUBLIC_BASE_URL?.trim();
  const candidate =
    explicit ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  if (!candidate) {
    throw new Error(
      "Missing SUPPORTER_PUBLIC_BASE_URL and VERCEL_URL; a trusted verification-link origin is required",
    );
  }
  const parsed = new URL(candidate);
  if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
    throw new Error("Supporter verification links require an HTTPS base URL");
  }
  return parsed.origin;
}

export type SupporterReadConfig = Readonly<{
  databaseUrl: string;
  promiseVersionId: string;
}>;

export type SupporterEnrollmentConfig = SupporterReadConfig &
  Readonly<{
    resendApiKey: string;
    fromEmail: string;
    publicBaseUrl: string;
    contactEncryptionKey: Buffer;
    contactEncryptionKeyVersion: string;
    contactLookupHmacKey: Buffer;
    verificationTokenPepper: Buffer;
    outboxTokenEncryptionKey: Buffer;
    outboxTokenEncryptionKeyVersion: string;
    abuseHmacKey: Buffer;
  }>;

export function getSupporterReadConfig(): SupporterReadConfig {
  const databaseUrl = required("SUPPORTER_RUNTIME_DATABASE_URL");
  if (databaseUrl === process.env.SUPPORTER_DATABASE_URL) {
    throw new Error(
      "Supporter runtime must not use the Marketplace owner database connection",
    );
  }
  return {
    databaseUrl,
    promiseVersionId: required("SUPPORTER_PROMISE_VERSION_ID"),
  };
}

export function getSupporterEnrollmentConfig(): SupporterEnrollmentConfig {
  return {
    ...getSupporterReadConfig(),
    resendApiKey: required("SUPPORTER_EMAIL_RESEND_API_KEY"),
    fromEmail: required("SUPPORTER_FROM_EMAIL"),
    publicBaseUrl: resolvePublicBaseUrl(),
    contactEncryptionKey: key("SUPPORTER_CONTACT_ENCRYPTION_KEY_B64"),
    contactEncryptionKeyVersion: required(
      "SUPPORTER_CONTACT_ENCRYPTION_KEY_VERSION",
    ),
    contactLookupHmacKey: key("SUPPORTER_CONTACT_LOOKUP_HMAC_KEY_B64"),
    verificationTokenPepper: key("SUPPORTER_VERIFICATION_TOKEN_PEPPER_B64"),
    outboxTokenEncryptionKey: key("SUPPORTER_OUTBOX_TOKEN_ENCRYPTION_KEY_B64"),
    outboxTokenEncryptionKeyVersion: required(
      "SUPPORTER_OUTBOX_TOKEN_ENCRYPTION_KEY_VERSION",
    ),
    abuseHmacKey: key("SUPPORTER_ABUSE_HMAC_KEY_B64"),
  };
}
