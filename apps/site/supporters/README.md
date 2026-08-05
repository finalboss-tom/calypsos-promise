# Supporter movement subsystem

This directory contains the database contract and operator-facing runbook for the public Personal Health Data Promise supporter module.

## Runtime boundaries

- The website uses only `SUPPORTER_RUNTIME_DATABASE_URL`, backed by the least-privilege `supporter_runtime_login` role.
- The Neon integration-managed `SUPPORTER_DATABASE_URL` remains migration-owner infrastructure and is never consumed by public runtime code.
- Contacts are encrypted with AES-256-GCM and located for duplicate prevention through a separate HMAC.
- Verification and management tokens are random, peppered before storage, single-use, and placed in URL fragments so the token is not sent with the initial page request.
- Public listing is optional and separately consented. Private supporters are counted without appearing in the public profile projection.
- Supporter self-management is email-controlled, revision-bound, and authorizes one reviewed action per link.
- Withdrawing support retires a Founding Supporter number permanently; the counter is not decremented and the number is never reassigned.
- Resend is outbound-only through `SUPPORTER_EMAIL_RESEND_API_KEY`; inbound receiving is not required.

## Migration order

Apply these files as the Neon database owner, in order:

1. `database/migrations/0001_supporter_baseline.sql`
2. `database/migrations/0002_supporter_commands_and_outbox.sql`
3. `database/migrations/0003_supporter_runtime.sql`
4. `database/migrations/0004_supporter_public_runtime_reads.sql`
5. `database/migrations/0005_fix_activation_output_name_collision.sql`
6. `database/migrations/0006_supporter_management.sql`

Run the read-only checks under `database/verification/` after migration. `0200_runtime_read_checks.sql` should be executed through `SET ROLE supporter_runtime_login` when Neon’s SQL Editor cannot select the role directly.

Migration 0006 grants only three narrow management commands to the runtime role:

- issue a generic, cooldown-protected management challenge;
- inspect state through a valid management token;
- apply one revision-bound visibility, profile, or withdrawal action.

The broad operator withdrawal function remains unavailable to the website runtime.

## Required runtime variables

All secrets and connection strings live in Vercel, never in the repository.

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

`SUPPORTER_PUBLIC_BASE_URL` is optional on Vercel Preview because the runtime uses the trusted `VERCEL_URL`. It should be explicitly set to the canonical HTTPS origin for production.

## Deployment gates

1. Apply and verify migrations 0001–0006 on the isolated validation branch.
2. Keep Production flags false.
3. Set `SUPPORTER_MOVEMENT_ENABLED=true` only for the feature-branch Preview.
4. Create a bounded protected Preview deployment, then immediately restore the repository-wide Git deployment lock.
5. Complete synthetic private and public enrollment, email verification, duplicate-contact, idempotency, numbering, and privilege checks.
6. Complete management-link, public/private visibility, public-profile editing, withdrawal, and permanent-number-retirement acceptance.
7. Keep contact recovery, retry-worker observability, and moderation as separate gates.
8. Seed the accepted production Promise version and create a separate production secret set.
9. Enable Production only through an explicit reviewed deployment.
