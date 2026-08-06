# Supporter movement subsystem

This directory contains the database contract and operator-facing runbook for the public Personal Health Data Promise supporter module.

## Runtime boundaries

- The public website uses only `SUPPORTER_RUNTIME_DATABASE_URL`, backed by the least-privilege `supporter_runtime_login` role.
- The outbox worker and Resend webhook use only `SUPPORTER_OUTBOX_WORKER_DATABASE_URL`, backed by a separate login inheriting the `supporter_outbox_worker` NOLOGIN role.
- The Neon integration-managed `SUPPORTER_DATABASE_URL` remains migration-owner infrastructure and is never consumed by public or worker runtime code.
- Contacts are encrypted with AES-256-GCM and located for duplicate prevention through a separate HMAC.
- Verification and management tokens are random, peppered before lookup, single-use, and placed in URL fragments so the secret is not sent with the initial page request.
- Public listing is optional and separately consented. Private supporters are counted without appearing in the public profile projection.
- Resend is outbound-only through `SUPPORTER_EMAIL_RESEND_API_KEY`; inbound receiving is not required.

## Migration order

Apply these files as the Neon database owner, in order:

1. `database/migrations/0001_supporter_baseline.sql`
2. `database/migrations/0002_supporter_commands_and_outbox.sql`
3. `database/migrations/0003_supporter_runtime.sql`
4. `database/migrations/0004_supporter_public_runtime_reads.sql`
5. `database/migrations/0005_fix_activation_output_name_collision.sql`
6. `database/migrations/0006_supporter_management.sql`
7. `database/migrations/0007_supporter_outbox_reliability.sql`

Run the read-only checks under `database/verification/` after migration. The public runtime must retain only its reviewed supporter commands. The outbox worker must be able to claim, complete, observe, and record provider events without `SELECT` on private tables.

## Email outbox behavior

Every verification or management email is inserted transactionally before provider delivery. The initial request attempts delivery immediately using the stable idempotency key `supporter-outbox/<outbox UUID>`. If the provider call or completion write fails, the worker can safely retry the same payload.

Migration 0007 adds:

- claim tokens and expiring leases, with stale-claim recovery
- bounded exponential backoff and provider `Retry-After` support
- five-attempt dead-lettering inside the active challenge window
- provider message IDs and idempotent Resend event ingestion
- aggregate health counters without contact, token, or identity exposure
- a dedicated `supporter_outbox_worker` capability role
- signed-webhook replay protection through stored `svix-id` values

Dead-letter records remain operator-visible. Expired, consumed, or revoked challenges are cancelled and their encrypted retry tokens are destroyed.

## Scheduling boundary

The worker endpoint remains scheduler-neutral and supports manual or operator validation with `SUPPORTER_OUTBOX_WORKER_SECRET_B64`. For the current Vercel Pro deployment adapter, `vercel.json` declares a Production cron invocation every five minutes:

```text
/api/supporters/outbox/worker
*/5 * * * *
```

Vercel Cron is active only on Production deployments. The declaration therefore remains dormant while the repository-wide Git deployment lock is active and no approved Production deployment contains it.

Vercel supplies `Authorization: Bearer <CRON_SECRET>` to the scheduled request. The worker accepts that separate 256-bit credential or the manual worker credential through timing-safe comparison. `CRON_SECRET` must not be reused as the manual worker secret and must be created only in the Production environment during the Production-secret gate.

The scheduler supplies timing only. Neon remains authoritative for eligibility, leases, retries, cancellation, idempotency, and terminal state.

## Resend delivery events

Configure one Resend webhook for:

- `email.sent`
- `email.delivery_delayed`
- `email.delivered`
- `email.bounced`
- `email.complained`
- `email.suppressed`
- `email.failed`

Point it to:

```text
/api/supporters/outbox/webhook/resend
```

Store the endpoint signing secret as `SUPPORTER_EMAIL_RESEND_WEBHOOK_SECRET`. The route verifies the raw Svix-signed payload, rejects stale signatures, deduplicates by `svix-id`, and stores only provider IDs, event types, timestamps, and a bounded reason code. Recipient addresses and raw webhook bodies are never persisted.

## Required runtime variables

All secrets and connection strings live in Vercel, never in the repository.

Public supporter runtime:

- `SUPPORTER_RUNTIME_DATABASE_URL`
- `SUPPORTER_EMAIL_RESEND_API_KEY`
- `SUPPORTER_FROM_EMAIL`
- `SUPPORTER_PROMISE_VERSION_ID`
- `SUPPORTER_CONTACT_ENCRYPTION_KEY_B64`
- `SUPPORTER_CONTACT_ENCRYPTION_KEY_VERSION`
- `SUPPORTER_CONTACT_LOOKUP_HMAC_KEY_B64`
- `SUPPORTER_VERIFICATION_TOKEN_PEPPER_B64`
- `SUPPORTER_OUTBOX_TOKEN_ENCRYPTION_KEY_B64`
- `SUPPORTER_OUTBOX_TOKEN_ENCRYPTION_KEY_VERSION`
- `SUPPORTER_ABUSE_HMAC_KEY_B64`
- `SUPPORTER_MOVEMENT_ENABLED`
- `SUPPORTER_ADMIN_ENABLED`

Outbox worker and provider events:

- `SUPPORTER_OUTBOX_WORKER_DATABASE_URL`
- `SUPPORTER_OUTBOX_WORKER_SECRET_B64`
- `SUPPORTER_OUTBOX_WORKER_ENABLED`
- `SUPPORTER_EMAIL_RESEND_WEBHOOK_SECRET`

Production scheduler:

- `CRON_SECRET`

`SUPPORTER_PUBLIC_BASE_URL` is optional on a bounded Vercel Preview because the runtime uses the trusted `VERCEL_URL`. It must be explicitly set to the canonical HTTPS origin for Production so every retry reproduces the original provider payload and stable link origin.

## Deployment gates

1. Apply and verify all migrations on the isolated validation branch.
2. Keep Production flags false.
3. Enable the supporter movement and outbox worker only for the feature-branch Preview.
4. Create a protected Preview deployment.
5. Complete synthetic enrollment, management, email retry, idempotency, dead-letter, delivery-event, numbering, and privilege checks.
6. Retain the accepted five-minute Vercel Pro cron declaration while Production remains deployment-locked.
7. Configure the signed Resend webhook and accept event replay/out-of-order behavior.
8. Seed the accepted Production Promise version and create a separate Production secret set, including `CRON_SECRET`.
9. Enable Production only through an explicit reviewed deployment.
10. Confirm the deployed cron definition and two consecutive successful invocations before declaring the scheduler operational.
