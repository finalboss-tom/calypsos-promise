import { getSupporterReadConfig } from "./config";

type NeonField = Readonly<{ name: string; dataTypeID: number }>;
type NeonRawResult = Readonly<{
  fields: readonly NeonField[];
  rows: readonly (readonly (string | null)[])[];
}>;

export function neonHttpEndpoint(connectionString: string): string {
  const parsed = new URL(connectionString);
  if (
    (parsed.protocol !== "postgres:" && parsed.protocol !== "postgresql:") ||
    !parsed.username ||
    !parsed.password ||
    !parsed.hostname ||
    !parsed.pathname
  ) {
    throw new Error("Invalid supporter runtime database URL");
  }
  if (!parsed.hostname.endsWith(".neon.tech")) {
    throw new Error("Supporter runtime database URL must target Neon");
  }
  const apiHostname = parsed.hostname.replace(/^[^.]+\./, "api.");
  return `https://${apiHostname}/sql`;
}

export function encodeNeonParameter(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  if (Buffer.isBuffer(value)) return `\\x${value.toString("hex")}`;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "boolean" || typeof value === "number") {
    return String(value);
  }
  return value;
}

function parseNeonColumn(value: string | null, dataTypeID: number): unknown {
  if (value === null) return null;
  switch (dataTypeID) {
    case 16:
      return value === "t" || value === "true";
    case 20:
    case 21:
    case 23:
    case 26:
    case 700:
    case 701:
    case 1700:
      return Number(value);
    case 114:
    case 3802:
      return JSON.parse(value) as unknown;
    case 17:
      return Buffer.from(
        value.startsWith("\\x") ? value.slice(2) : value,
        "hex",
      );
    default:
      return value;
  }
}

export function parseNeonResult<T extends object>(result: NeonRawResult): T[] {
  return result.rows.map(
    (row) =>
      Object.fromEntries(
        result.fields.map((field, index) => [
          field.name,
          parseNeonColumn(row[index] ?? null, field.dataTypeID),
        ]),
      ) as T,
  );
}

export async function supporterQuery<T extends object>(
  query: string,
  params: readonly unknown[] = [],
): Promise<T[]> {
  const { databaseUrl } = getSupporterReadConfig();
  const response = await fetch(neonHttpEndpoint(databaseUrl), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Neon-Connection-String": databaseUrl,
      "Neon-Raw-Text-Output": "true",
      "Neon-Array-Mode": "true",
    },
    body: JSON.stringify({
      query,
      params: params.map(encodeNeonParameter),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(
      `Supporter database request failed with HTTP ${response.status}`,
    );
  }
  return parseNeonResult<T>((await response.json()) as NeonRawResult);
}

export type PublishedPromise = Readonly<{
  promise_version_id: string;
  version_label: string;
  canonical_text: string;
  content_hash: string;
  published_at: string;
}>;

export type MovementTotals = Readonly<{
  active_verified_supporters: number;
  public_supporters: number;
  active_founding_supporters: number;
  founding_numbers_assigned: number;
}>;

export async function getPublishedPromise(
  promiseVersionId?: string,
): Promise<PublishedPromise | undefined> {
  const id = promiseVersionId ?? getSupporterReadConfig().promiseVersionId;
  const rows = await supporterQuery<PublishedPromise>(
    "SELECT * FROM supporter_private.get_published_promise($1::uuid)",
    [id],
  );
  return rows[0];
}

export async function getMovementTotals(): Promise<MovementTotals> {
  const rows = await supporterQuery<MovementTotals>(
    "SELECT * FROM supporter_private.get_movement_totals()",
  );
  return (
    rows[0] ?? {
      active_verified_supporters: 0,
      public_supporters: 0,
      active_founding_supporters: 0,
      founding_numbers_assigned: 0,
    }
  );
}

export type PublicSupporterProfile = Readonly<{
  founding_number: number | null;
  display_name: string;
  profile_slug: string;
  broad_region: string | null;
  why_i_signed: string | null;
  published_at: string;
}>;

export async function listPublicSupporters(
  limit = 50,
  offset = 0,
): Promise<PublicSupporterProfile[]> {
  return supporterQuery<PublicSupporterProfile>(
    "SELECT * FROM supporter_private.list_public_supporters($1::integer, $2::integer)",
    [limit, offset],
  );
}

export async function startSupporterEnrollment(input: {
  supporterId: string;
  signatureId: string;
  verificationId: string;
  contactId: string;
  signatureConsentId: string;
  visibilityConsentId?: string;
  promiseVersionId: string;
  encryptedContact: Buffer;
  lookupHmac: Buffer;
  encryptionKeyVersion: string;
  visibility: "private" | "public";
  displayName?: string;
  profileSlug?: string;
  broadRegion?: string;
  whyISigned?: string;
  signaturePolicyVersion: string;
  visibilityPolicyVersion?: string;
  tokenHash: Buffer;
  encryptedToken: Buffer;
  tokenEncryptionKeyVersion: string;
  expiresAt: Date;
  now: Date;
  auditEventId: string;
  outboxId: string;
}): Promise<
  | Readonly<{
      created: boolean;
      supporter_id: string | null;
      signature_id: string | null;
      verification_id: string | null;
      outbox_id: string | null;
    }>
  | undefined
> {
  const rows = await supporterQuery<{
    created: boolean;
    supporter_id: string | null;
    signature_id: string | null;
    verification_id: string | null;
    outbox_id: string | null;
  }>(
    `SELECT * FROM supporter_private.start_supporter_enrollment(
      $1::uuid, $2::uuid, $3::uuid, $4::uuid, $5::uuid, $6::uuid,
      $7::uuid, $8::bytea, $9::bytea, $10::text, $11::text,
      $12::text, $13::text, $14::text, $15::text, $16::text,
      $17::text, $18::bytea, $19::bytea, $20::text,
      $21::timestamptz, $22::timestamptz, $23::uuid, $24::uuid
    )`,
    [
      input.supporterId,
      input.signatureId,
      input.verificationId,
      input.contactId,
      input.signatureConsentId,
      input.visibilityConsentId,
      input.promiseVersionId,
      input.encryptedContact,
      input.lookupHmac,
      input.encryptionKeyVersion,
      input.visibility,
      input.displayName,
      input.profileSlug,
      input.broadRegion,
      input.whyISigned,
      input.signaturePolicyVersion,
      input.visibilityPolicyVersion,
      input.tokenHash,
      input.encryptedToken,
      input.tokenEncryptionKeyVersion,
      input.expiresAt,
      input.now,
      input.auditEventId,
      input.outboxId,
    ],
  );
  return rows[0];
}

export async function activateSupporter(input: {
  tokenHash: Buffer;
  now: Date;
  verificationEvidenceId: string;
  auditEventId: string;
}): Promise<
  | Readonly<{
      supporter_id: string;
      signature_id: string;
      founding_number: number | null;
      was_idempotent: boolean;
    }>
  | undefined
> {
  const rows = await supporterQuery<{
    supporter_id: string;
    signature_id: string;
    founding_number: number | null;
    was_idempotent: boolean;
  }>(
    `SELECT * FROM supporter_private.activate_supporter(
      $1::bytea, $2::timestamptz, $3::uuid, $4::uuid
    )`,
    [
      input.tokenHash,
      input.now,
      input.verificationEvidenceId,
      input.auditEventId,
    ],
  );
  return rows[0];
}

export async function completeSupporterEmail(input: {
  outboxId: string;
  sent: boolean;
  errorCode?: string;
  now: Date;
}): Promise<void> {
  await supporterQuery(
    `SELECT supporter_private.complete_supporter_email(
      $1::uuid, $2::boolean, $3::text, $4::timestamptz
    )`,
    [input.outboxId, input.sent, input.errorCode, input.now],
  );
}

export async function consumeSupporterAttempt(input: {
  actionName: string;
  bucketHmac: Buffer;
  now: Date;
  windowSeconds: number;
  limit: number;
}): Promise<boolean> {
  const rows = await supporterQuery<{ allowed: boolean }>(
    `SELECT supporter_private.consume_supporter_attempt(
      $1::text, $2::bytea, $3::timestamptz, $4::integer, $5::integer
    ) AS allowed`,
    [
      input.actionName,
      input.bucketHmac,
      input.now,
      input.windowSeconds,
      input.limit,
    ],
  );
  return rows[0]?.allowed === true;
}
