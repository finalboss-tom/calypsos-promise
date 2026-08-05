import { supporterQuery } from "./database";

export type SupporterManagementStartResult = Readonly<{
  created: boolean;
  management_outbox_id: string | null;
  encrypted_contact: Buffer | null;
  contact_encryption_key_version: string | null;
}>;

export type SupporterManagementState = Readonly<{
  result_revision: number;
  result_visibility: "private" | "public";
  result_founding_number: number | null;
  result_display_name: string | null;
  result_profile_slug: string | null;
  result_broad_region: string | null;
  result_why_i_signed: string | null;
  result_expires_at: string;
}>;

export type SupporterManagementResult = Readonly<{
  result_status: "active" | "withdrawn";
  result_visibility: "private" | "public";
  result_founding_number: number | null;
  result_revision: number;
}>;

export async function startSupporterManagement(input: {
  lookupHmac: Buffer;
  tokenHash: Buffer;
  encryptedToken: Buffer;
  tokenEncryptionKeyVersion: string;
  expiresAt: Date;
  now: Date;
  verificationId: string;
  outboxId: string;
  auditEventId: string;
}): Promise<SupporterManagementStartResult | undefined> {
  const rows = await supporterQuery<SupporterManagementStartResult>(
    `SELECT * FROM supporter_private.start_supporter_management(
      $1::bytea, $2::bytea, $3::bytea, $4::text,
      $5::timestamptz, $6::timestamptz, $7::uuid, $8::uuid, $9::uuid
    )`,
    [
      input.lookupHmac,
      input.tokenHash,
      input.encryptedToken,
      input.tokenEncryptionKeyVersion,
      input.expiresAt,
      input.now,
      input.verificationId,
      input.outboxId,
      input.auditEventId,
    ],
  );
  return rows[0];
}

export async function getSupporterManagementState(input: {
  tokenHash: Buffer;
  now: Date;
}): Promise<SupporterManagementState | undefined> {
  const rows = await supporterQuery<SupporterManagementState>(
    `SELECT * FROM supporter_private.get_supporter_management_state(
      $1::bytea, $2::timestamptz
    )`,
    [input.tokenHash, input.now],
  );
  return rows[0];
}

export type SupporterManagementAction =
  | "set_private"
  | "set_public"
  | "update_public_profile"
  | "withdraw";

export async function applySupporterManagement(input: {
  tokenHash: Buffer;
  now: Date;
  expectedRevision: number;
  action: SupporterManagementAction;
  displayName?: string;
  profileSlug?: string;
  broadRegion?: string;
  whyISigned?: string;
  publicListingConsentId?: string;
  confirmation: boolean;
  auditEventId: string;
}): Promise<SupporterManagementResult | undefined> {
  const rows = await supporterQuery<SupporterManagementResult>(
    `SELECT * FROM supporter_private.apply_supporter_management(
      $1::bytea, $2::timestamptz, $3::integer, $4::text,
      $5::text, $6::text, $7::text, $8::text, $9::uuid,
      $10::boolean, $11::uuid
    )`,
    [
      input.tokenHash,
      input.now,
      input.expectedRevision,
      input.action,
      input.displayName,
      input.profileSlug,
      input.broadRegion,
      input.whyISigned,
      input.publicListingConsentId,
      input.confirmation,
      input.auditEventId,
    ],
  );
  return rows[0];
}
