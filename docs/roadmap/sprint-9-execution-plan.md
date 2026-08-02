# Sprint 9 Execution Plan — Public Synthetic Prologue

[Current status](current-status.md) · [Sprint 9.7 record](sprint-9-workstream-9-7-record.md) · [Sprint 9.8 validation record](sprint-9-workstream-9-8-validation-record.md) · [Sprint 9.8 representative review](sprint-9-workstream-9-8-manual-review.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Sprint sequence](sprints.md) · [Accepted alignment issue #64](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68) · [Public synthetic prologue boundary](../architecture/public-synthetic-prologue-boundary.md)

- **Status:** ACTIVE — workstreams 9.1–9.7 complete; 9.8 substantively validated with final aggregate pending; 9.9 unfinished; 9.10 blocked
- **Application owner:** `apps/site`
- **Primary route:** `/prologue`
- **Data class:** PUBLIC and explicitly synthetic only
- **Institutional phase:** Phase 0 remains active
- **Newsletter gate:** issue #63 remains separate
- **Release control:** Git-triggered Vercel deployment remains disabled
- **Latest accepted candidate:** `a3ac15f32ca098a2955c14bf815af60cccfd56d6` — CI 1257 / DCO 1339

## Goal

> Let anyone understand the product through play before creating an account.

Sprint 9 proves a bounded public synthetic prologue. It does not establish the universal game shell, account system, private Chronicle storage, production Aster, real voice capture, provider connectivity, research enrollment, payments, analytics, or production health-data operation.

## Permanent Sprint 9 boundary

- No account, authentication, email requirement, free-form health text, microphone, file, camera, location, wearable, provider, connector, clinical, research, payment, donation, or analytics requirement.
- All content and state are public or explicitly synthetic.
- Interactive state remains React memory only and disappears on refresh, navigation, tab close, restart, or explicit discard.
- Voice and text use pre-authored synthetic choices only.
- Aster remains deterministic and optional, with a complete manual path.
- Chronicle and receipt-shaped views remain temporary explanations, not truth or permission.
- First Lantern completion depends only on explicit inspectable synthetic evidence.
- Refusal, restart, discard, leave, and completion without account conversion remain non-punitive.
- The future account boundary remains informational only.
- Merge, public linking, and deployment are separate founding-steward decisions.

## Accepted workstreams

### 9.1 — Contracts

**Complete:** `6bd992f91ea0948fe248ef55817afcd520664205` — CI 1169 / DCO 1247.

Established ownership, route, memory lifecycle, synthetic fixtures, deterministic Aster/manual parity, temporary projection limits, validation, release separation, rollback, and holdpoints. Executable state and rendered interaction evidence are permanent requirements.

### 9.2 — Opening and Lantern Shore

**Complete:** `6565fbc43c9356e7b72acaed30b50cbff2907a38` — CI 1180 / DCO 1258.

Provides direct and skippable arrival, Lantern Shore, no required animation, no autoplay, no required timing, visible exit, scene focus, and memory-only disclosure.

### 9.3 — Aster and manual fallback

**Complete:** `72f72223d7a07d460e89ec69b87b2003e84cdd3b` — CI 1188 / DCO 1266.

Both paths use the same facts, fixtures, review controls, projections, completion rule, and authority. Aster changes framing, not truth or capability.

### 9.4 — Synthetic review and confirmation

**Complete:** `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a` — CI 1205 / DCO 1283.

Provides pre-authored synthetic text and voice-transcript choices, deterministic drafts, explicit review, prepared correction, refusal, and confirmation without arbitrary input or microphone use.

### 9.5 — Chronicle and House of Keys explanations

**Complete:** `e819c71f31041632998b5f468c492e8b1c810a44` — CI 1221 / DCO 1300, with corrections revalidated in 9.6.

The Chronicle-shaped explanation maps selected `ChronicleRecordEnvelope` vocabulary without creating a record. The receipt-shaped explanation maps selected `AccessReceipt` meanings without a request, evaluation, grant, consent, audit event, or data release.

### 9.6 — First Lantern

**Complete:** `4d1fa7fdec3e83f282ee8ed8f16292e509d514fa` — CI 1253 / DCO 1334.

First Lantern requires Lantern Shore, guide selection, synthetic fixture, draft review, explicit confirmation or correction, Chronicle inspection, receipt inspection, and completion without remote or consequential inputs. It creates no reward, rank, canonical unlock, Fourteen Lantern progression, account, permission, provider status, health outcome, or durable state.

### 9.7 — Refusal, restart, discard, exit, and future account boundary

**Complete:** `a3ac15f32ca098a2955c14bf815af60cccfd56d6` — CI 1257 / DCO 1339.

Provides `exit-choice`, `future-account`, and `complete`; restart from progressed scenes; exact reset to initial state; departure after First Lantern; completion without an account; and future-account information without email field, signup, sign-in, authentication, `/api/join`, newsletter call, persistence, conversion pressure, or durable progression.

## Active workstream

### 9.8 — Accessibility, security, performance, storage, network, and interaction validation

**Substantive rendered evidence established; final aggregate validation pending.**

The [validation record](sprint-9-workstream-9-8-validation-record.md) and [representative review](sprint-9-workstream-9-8-manual-review.md) define the package.

The permanent validator must:

- run the production build in isolated localhost preview;
- execute shortest manual/text and representative Aster/voice direct-completion journeys plus a looped optional exploration in rendered Chrome or Chromium;
- complete the two direct paths through native keyboard events;
- exercise every visible scene button and native disclosure;
- verify logical keyboard order, scene-heading focus, polite announcements, accessible names, and no keyboard trap;
- verify confirmation remains disabled before review choice;
- cover refusal, alternate fixture, correction, restart, discard, departure, future-account inspection, public exit, and completion without conversion;
- exercise reduced motion, reduced data, increased contrast, forced colors, narrow viewport, and no-JavaScript behavior;
- fail on storage API use, cookies, IndexedDB, Cache Storage, external runtime network calls, `/api/join`, WebSockets, browser errors, or hidden state restoration;
- hold the shortest and representative direct-completion paths under ten modeled minutes while timing optional exploration separately; and
- read the static preview report and fail if `/prologue` exceeds the accepted Sprint 8 route ceilings.

Rendered validation also discovered and corrected an inherited static-site CSP defect that blocked Next.js hydration. The current static site uses a static-rendering-compatible CSP; future identity, private Chronicle, or sensitive-data routes must reopen rendering and CSP architecture rather than inheriting this public-site policy without review.

Sprint 8 ceilings remain:

- HTML 96 KiB;
- JavaScript 704 KiB;
- CSS 128 KiB;
- images 1,536 KiB;
- fonts 0;
- total transfer 2,048 KiB; and
- first-party requests 32.

CI 1272 measured `/prologue` below every ceiling, including 713,812 JavaScript bytes against the 720,896-byte ceiling and 799,902 total bytes against 2,097,152. Sprint 9 has not earned a larger route budget.

The same artifact measured direct completion at 8.45 minutes for manual/text and 9.11 minutes for Aster/voice. The deliberately looped 23-action exploration measured 11.96 minutes and remains evidence, not a direct-completion claim.

Workstream 9.8 remains implementation evidence, not independent accessibility, named screen-reader, affected-user, cognitive-load, device/browser, or field-performance certification.

## Remaining workstreams

### 9.9 — Publication, rollback, hosted evidence, and status reconciliation

**Not implemented.**

Must define stable `main` or commit-pinned source links, exact candidate provenance, separate merge/link/deploy authority, manual deployment ownership, canonical-domain and runtime verification, public capability labels, rollback, correction ownership, and confirmation that Git-triggered deployment returns to disabled after any authorized release.

Hosted evidence may be created only after explicit founding-steward release direction.

### 9.10 — Cross-contract reconciliation, completion, and Sprint 10 handoff

**Blocked and not started.**

May begin only after 9.8–9.9 are complete and every issue, PR, status, roadmap, evidence, release, and holdpoint record agrees.

## Deterministic state and refusal rule

Scenes remain `arrival`, `lantern-shore`, `guide-choice`, Aster/manual introduction, capture choice, synthetic draft, review and correction, confirmed entry, Chronicle, receipt, First Lantern, exit choice, future account, and complete.

Invalid actions fail closed. Confirmation requires explicit review. Chronicle requires confirmation. Receipt requires Chronicle inspection. First Lantern requires all deterministic evidence. Departure and completion require First Lantern. Restart returns the exact initial object.

Visitors may skip optional narration, use the complete manual path, refuse synthetic capture, choose another fixture, review and correct, discard, restart, leave, complete without account conversion, and inspect the future account explanation without activating it.

No path uses countdowns, shame, lost rewards, reduced access, health warnings, repeated contact requests, or manufactured urgency.

## Validation and release

- Branch and PR builds remain validation-only.
- `/prologue` remains noindex, unlinked, outside the sitemap, unmerged, and undeployed.
- Merge does not authorize public linking or deployment.
- All generated preview and browser evidence is removed before the tracked-mutation check.
- Rollback may remove a future entry link, restore the prior deployment, or revert the eventual squash commit.
- No private-data migration exists because Sprint 9 persists nothing.

## Unresolved inherited holdpoints

Sprint 9 does not close independent accessibility or assistive-technology review, affected-user evidence, named screen-reader review, device/browser field performance, real voice privacy, production identity, authentication, recovery, private Chronicle storage, production Aster, legal review of permission presentation, analytics, monitoring, incident operations, or remaining Phase 0 gates.

## Completion rule

Sprint 9 closes only when all ten workstreams, acceptance criteria, completion evidence, explicit founding-steward acceptance, and directed squash merge are complete. Passing CI, a browser playthrough, modeled duration, or a hosted route proves only its bounded evidence.
