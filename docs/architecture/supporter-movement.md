# Supporter movement architecture

The supporter movement is a public Calypso’s Promise module for verified affirmation of the Personal Health Data Promise. It is not a petition, account system, player rank, governance mechanism, research enrollment, newsletter subscription, or health-data collection flow.

## Identity boundary

The long-term relationship is deliberately indirect:

```text
Supporter Record ↔ Calypso Account ↔ Player Profile ↔ Chronicle
```

There is no direct Supporter Record ↔ Player Profile or Supporter Record ↔ Chronicle link. Future account linking must be explicit, narrow, reversible, private by default, and incapable of granting gameplay or governance advantage.

## Designations

- **Supporter** means a person affirmed a specific immutable Promise version and completed email-control verification.
- **Founding Supporter** means one of the first 1,000 verified supporters. Numbers are allocated atomically in chronological verification order, cannot be reserved or transferred, and are retired rather than reused.
- **Founding Advisor** is a founder-awarded historical designation for people consulted during the formative period. It is not a rank, job, fiduciary role, or governance seat. Public listing requires separate opt-in.

## Consent separation

The module records distinct affirmative consent for the exact Promise signature and, when selected, public listing. Newsletter updates, research, compensated opportunities, organizational endorsement, future account linking, and health-data use remain separate purposes.

## Data boundary

Private storage contains encrypted contact data, verification challenges and evidence, consent records, exact Promise signatures, founding-number assignments, moderation state, the email outbox, minimized provider-delivery events, and protected audit events. Public storage is a minimized projection containing only opted-in profile fields and aggregate movement totals.

Provider webhook payloads are verified from their raw bytes but are not stored. Delivery-event persistence is limited to the provider message identifier, event identifier, event type, timestamps, and a bounded non-identifying reason code.

## Security boundary

The public runtime connects through a dedicated Neon login that inherits only the `supporter_runtime` NOLOGIN role. Runtime code executes reviewed `SECURITY DEFINER` commands and cannot freely select from private tables. The migration-owner URL is never accepted by runtime configuration.

The email worker uses a separate Neon login inheriting only `supporter_outbox_worker`. It can claim and complete outbox items, read aggregate health, and record signed provider events only through reviewed functions. It cannot select private contact, token, consent, supporter, or audit tables.

Verification and management tokens are random and single-use. Only a peppered hash is used for lookup. The email outbox stores the retry copy encrypted under a separate key. Contact lookup uses an independent HMAC key; contact ciphertext uses AES-256-GCM under a versioned encryption key.

## Delivery reliability boundary

Email records are created transactionally before provider delivery. Initial and retried requests share one stable provider idempotency key per outbox record, preventing duplicate delivery when a network timeout or completion-write failure leaves the local outcome uncertain.

The worker uses:

- single-record `FOR UPDATE SKIP LOCKED` claims
- opaque claim tokens and expiring leases
- stale-lease recovery
- sequential provider calls with bounded batch size
- exponential retry delays, provider `Retry-After` support, and a fixed maximum attempt count
- dead-letter visibility when the active challenge window or attempt budget is exhausted
- signed, replay-deduplicated provider events for accepted, delayed, delivered, bounced, complained, suppressed, and failed states

The worker endpoint is independently authenticated and disabled by default. Scheduling is a launch-time infrastructure decision. A scheduler must run frequently enough for the 30-minute verification and management windows; a once-daily job is not acceptable.

## Release boundary

The module is disabled by default. Feature-branch Preview can enable it against an isolated Neon branch and synthetic Promise version. Production remains disabled until management and withdrawal, accessibility, abuse handling, email retry and event observability, scheduler selection, migration, rollback, and Production-secret gates are accepted.
