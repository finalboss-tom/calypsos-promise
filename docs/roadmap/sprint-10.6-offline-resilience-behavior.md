# Sprint 10.6 — Offline and resilience behavior

**Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION  
**Parent:** Sprint 10 — universal game shell  
**Tracker:** issue #80  
**Implementation:** draft PR #79

## Decision

Establish bounded offline behavior for versioned public content and temporary public/synthetic session state without storing protected data or transferring authority to the client.

The universal application keeps the accepted `@calypsos-promise/game-content` package bundled across browser, iOS, and Android. AsyncStorage is used only as an unencrypted adapter for a replaceable public-content cache and a minimal synthetic-session envelope. Storage failure never removes essential bundled content, and stored state never becomes completion, reward, permission, Chronicle truth, personal progress, health evidence, authentic preference, or Longitudinal Intelligence.

## Offline classes

| Class                                  | Mechanism                                   | Version                         | Owner                                               | Expiry                         | Failure fallback             |
| -------------------------------------- | ------------------------------------------- | ------------------------------- | --------------------------------------------------- | ------------------------------ | ---------------------------- |
| public packaged content                | app bundle plus optional AsyncStorage cache | package `0.1.0`, record `0.1.0` | `packages/game-content` identity; `apps/game` cache | 30 days or package replacement | bundled package              |
| temporary synthetic session            | explicit AsyncStorage record                | state `0.1.0`, record `0.1.0`   | `apps/game`                                         | 24 hours                       | memory-only session          |
| static app assets                      | Expo bundle                                 | application revision            | `apps/game`                                         | application replacement        | text-first bundled interface |
| accessibility/presentation preferences | not stored in 10.6                          | not active                      | none                                                | none                           | platform defaults            |

No health, voice, private Chronicle, account, credential, permission, inference, analytics, research, payment, or protected clinical material is eligible for offline storage.

## Record contract

Every stored record includes:

- exact record version and kind;
- owner and `PUBLIC_SYNTHETIC` information class;
- revision;
- explicit creation, update, and expiry timestamps;
- package or state version;
- minimal payload;
- deterministic corruption checksum; and
- strict byte budget.

The checksum detects accidental corruption only. It is not encryption, authentication, or a security boundary.

## Session minimization

The synthetic-session record retains only:

- state version;
- temporary revision;
- bounded state status;
- bundled scene identifier; and
- bundled scene identifiers shown in the temporary session.

Notices, authority objects, arbitrary UI state, user-entered text, identifiers, account fields, credentials, health data, permission data, analytics data, and provider output are not serialized. Restored state receives the immutable client-authority ceiling again.

## Expiry, clear, and migration

- Public cache records expire after 30 days and are replaced when the packaged content version changes.
- Synthetic-session records expire after 24 hours.
- Expired, stale, corrupt, or unsupported records are removed when inspected.
- The player can explicitly store, restore, and clear temporary state.
- Discard and restart clear the stored synthetic-session record.
- Legacy `0.0.1` public/synthetic records migrate deterministically to `0.1.0`.
- Unknown future record or state versions fail closed and are cleared rather than guessed.

## Conflict behavior

A stored record with a higher revision cannot be overwritten by an older client state. Equal revisions with different checksums are conflicts and remain untouched until explicit restore, clear, or restart.

A conflict creates no preference, completion, reward, or progress inference. The current session remains memory-only and readable.

## Corruption and low-storage behavior

- Invalid JSON, checksum mismatch, invalid payload shape, wrong information class, protected fields, and incompatible versions fail closed.
- Public cache write failure falls back to the bundled package.
- Synthetic-session quota failure evicts the optional public cache once and retries.
- Continued quota failure keeps the active session in memory only.
- Oversized records are rejected before write.
- Storage unavailability never blocks essential content or direct-path comprehension.

## Platform differences

The same AsyncStorage API and record contract are used across browser, iOS, and Android. Underlying quota, eviction, app-data clearing, backup, and operating-system behavior may differ.

The product therefore treats storage as replaceable and non-authoritative on every platform. Browser clearing, mobile uninstall, operating-system eviction, storage pressure, or adapter failure may remove records without affecting bundled content or creating a gameplay penalty.

## Accessibility and resilience

Offline status and actions are exposed as text, accessible buttons, and polite live-region updates. Essential information remains readable when storage is pending, unavailable, full, expired, corrupt, or in conflict.

No image, audio, animation, haptic, gesture, network request, or successful storage write is required for essential comprehension.

## Holdpoints preserved

Sprint 10.6 does not authorize:

- protected or private offline data;
- production authentication, credentials, sessions, or silent state transfer;
- permission grants or House of Keys execution;
- durable or canonical completion, rewards, restoration, unlocks, or progression;
- health conclusions, personal inference, analytics, profiling, advertising, research, payment, clinical, or LI-V1 through LI-V8 behavior;
- deployment, indexing, public navigation, mobile distribution, official release, Sprint 11, or institutional Phase 0 exit; or
- independent accessibility, security, privacy, legal, affected-user, field, or device certification.

## Validation target

The exact 10.6 checkpoint will be recorded after dependency and lockfile reconciliation, frozen installation, focused offline-resilience validation, formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, tests, existing site release validation, browser/iOS/Android credential-free export, generated-state cleanup, CI, and DCO complete.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.7 on the same branch and PR.
