import {
  encodeNeonParameter,
  neonHttpEndpoint,
  parseNeonResult,
} from "./database";

type NeonField = Readonly<{ name: string; dataTypeID: number }>;
type NeonRawResult = Readonly<{
  fields: readonly NeonField[];
  rows: readonly (readonly (string | null)[])[];
}>;

async function workerQuery<T extends object>(
  databaseUrl: string,
  query: string,
  params: readonly unknown[] = [],
): Promise<T[]> {
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
      `Supporter worker database request failed: ${response.status}`,
    );
  }
  return parseNeonResult<T>((await response.json()) as NeonRawResult);
}

export type SupporterEmailAttemptOutcome = "sent" | "retry" | "dead_letter";

export async function recordSupporterEmailAttempt(input: {
  databaseUrl: string;
  outboxId: string;
  claimToken?: string;
  outcome: SupporterEmailAttemptOutcome;
  providerMessageId?: string;
  errorCode?: string;
  retryAfterSeconds?: number;
  now: Date;
  maxAttempts?: number;
}): Promise<
  | Readonly<{
      result_status: string;
      result_attempt_count: number;
      result_not_before: string;
    }>
  | undefined
> {
  const rows = await workerQuery<{
    result_status: string;
    result_attempt_count: number;
    result_not_before: string;
  }>(
    input.databaseUrl,
    `SELECT * FROM supporter_private.record_supporter_email_attempt(
      $1::uuid, $2::uuid, $3::text, $4::text, $5::text,
      $6::integer, $7::timestamptz, $8::integer
    )`,
    [
      input.outboxId,
      input.claimToken,
      input.outcome,
      input.providerMessageId,
      input.errorCode,
      input.retryAfterSeconds,
      input.now,
      input.maxAttempts ?? 5,
    ],
  );
  return rows[0];
}

export type ClaimedSupporterEmail = Readonly<{
  result_outbox_id: string;
  result_claim_token: string;
  result_attempt_count: number;
  result_verification_id: string;
  result_encrypted_contact: Buffer;
  result_contact_key_version: string;
  result_encrypted_token: Buffer;
  result_token_key_version: string;
  result_expires_at: string;
  result_template_name: "supporter_verification" | "supporter_management";
  result_promise_version_label: string | null;
}>;

export async function claimSupporterEmail(input: {
  databaseUrl: string;
  now: Date;
  maxAttempts: number;
  leaseSeconds: number;
  claimToken: string;
}): Promise<ClaimedSupporterEmail | undefined> {
  const rows = await workerQuery<ClaimedSupporterEmail>(
    input.databaseUrl,
    `SELECT * FROM supporter_private.claim_supporter_email_v2(
      $1::timestamptz, $2::integer, $3::integer, $4::uuid
    )`,
    [input.now, input.maxAttempts, input.leaseSeconds, input.claimToken],
  );
  return rows[0];
}

export type SupporterOutboxHealth = Readonly<{
  pending_ready: number;
  retry_scheduled: number;
  processing_active: number;
  processing_stale: number;
  dead_letter: number;
  cancelled_last_24h: number;
  sent_last_24h: number;
  delivered_last_24h: number;
  delayed_current: number;
  bounced_last_24h: number;
  complained_last_24h: number;
  suppressed_last_24h: number;
  provider_failed_last_24h: number;
  oldest_actionable_at: string | null;
}>;

export async function getSupporterOutboxHealth(input: {
  databaseUrl: string;
  now: Date;
}): Promise<SupporterOutboxHealth> {
  const rows = await workerQuery<SupporterOutboxHealth>(
    input.databaseUrl,
    "SELECT * FROM supporter_private.get_supporter_outbox_health($1::timestamptz)",
    [input.now],
  );
  return (
    rows[0] ?? {
      pending_ready: 0,
      retry_scheduled: 0,
      processing_active: 0,
      processing_stale: 0,
      dead_letter: 0,
      cancelled_last_24h: 0,
      sent_last_24h: 0,
      delivered_last_24h: 0,
      delayed_current: 0,
      bounced_last_24h: 0,
      complained_last_24h: 0,
      suppressed_last_24h: 0,
      provider_failed_last_24h: 0,
      oldest_actionable_at: null,
    }
  );
}

export async function recordSupporterEmailProviderEvent(input: {
  databaseUrl: string;
  svixId: string;
  providerMessageId: string;
  eventType: string;
  eventCreatedAt: Date;
  reasonCode?: string;
  receivedAt: Date;
}): Promise<
  Readonly<{ result_duplicate: boolean; result_matched: boolean }> | undefined
> {
  const rows = await workerQuery<{
    result_duplicate: boolean;
    result_matched: boolean;
  }>(
    input.databaseUrl,
    `SELECT * FROM supporter_private.record_supporter_email_provider_event(
      $1::text, $2::text, $3::text, $4::timestamptz, $5::text, $6::timestamptz
    )`,
    [
      input.svixId,
      input.providerMessageId,
      input.eventType,
      input.eventCreatedAt,
      input.reasonCode,
      input.receivedAt,
    ],
  );
  return rows[0];
}
