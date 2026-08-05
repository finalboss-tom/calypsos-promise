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

Private storage contains encrypted contact data, verification challenges and evidence, consent records, exact Promise signatures, founding-number assignments, moderation state, the email outbox, and protected audit events. Public storage is a minimized projection containing only opted-in profile fields and aggregate movement totals.

## Security boundary

The public runtime connects through a dedicated Neon login that inherits only the `supporter_runtime` NOLOGIN role. Runtime code executes reviewed `SECURITY DEFINER` commands and cannot freely select from private tables. The migration-owner URL is never accepted by runtime configuration.

Verification tokens are random and single-use. Only a peppered hash is used for verification lookup. The email outbox stores the retry copy encrypted under a separate key. Contact lookup uses an independent HMAC key; contact ciphertext uses AES-256-GCM under a versioned encryption key.

## Release boundary

The module is disabled by default. Feature-branch Preview can enable it against an isolated Neon branch and synthetic Promise version. Production remains disabled until management and withdrawal, accessibility, abuse handling, email delivery, migration, rollback, observability, and production-secret gates are accepted.
