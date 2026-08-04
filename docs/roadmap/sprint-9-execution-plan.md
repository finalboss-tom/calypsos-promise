# Sprint 9 Execution Plan — Public Synthetic Prologue

[Current status](current-status.md) · [9.7 departure record](sprint-9-workstream-9-7-record.md) · [9.8 validation](sprint-9-workstream-9-8-validation-record.md) · [9.8 representative review](sprint-9-workstream-9-8-manual-review.md) · [9.9 publication and rollback](sprint-9-workstream-9-9-publication-and-rollback.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68) · [Prologue boundary](../architecture/public-synthetic-prologue-boundary.md)

- **Status:** ACTIVE — workstreams 9.1–9.9 accepted; 9.10 is next and not started
- **Application owner:** `apps/site`
- **Primary route:** `/prologue`
- **Data class:** PUBLIC and explicitly synthetic only
- **Institutional phase:** Phase 0 remains active
- **Newsletter gate:** issue #63 remains separate
- **Release control:** Git-triggered Vercel deployment remains disabled
- **Latest accepted technical candidate:** `0ac02609dc18ab7ff1f2b4f55ba058b6536f505c` — CI 1284 / DCO 1369

## Goal

> Let anyone understand the product through play before creating an account.

Sprint 9 proves a bounded public synthetic prologue. It does not establish the universal game shell, account system, private Chronicle storage, production Aster, real voice capture, provider connectivity, research enrollment, payments, analytics, or production health-data operation.

## Permanent boundary

- No account, authentication, email requirement, free-form health text, microphone, file, camera, location, wearable, provider, connector, clinical, research, payment, donation, analytics, or private-data requirement.
- All content and state are public or explicitly synthetic.
- Interaction state remains React memory only and disappears on refresh, navigation, tab close, restart, discard, or exit.
- Voice and text use pre-authored synthetic choices only.
- Aster remains deterministic and optional, with a complete manual path.
- Chronicle and receipt-shaped views remain temporary explanations, not truth or permission.
- First Lantern completion depends only on explicit inspectable synthetic evidence.
- Refusal, restart, discard, leave, and completion without account conversion remain non-punitive.
- The future-account boundary remains informational only.
- Merge, production linking, public indexing, and deployment are separate founding-steward decisions.

## Accepted workstreams

### 9.1 — Contracts

Accepted at `6bd992f91ea0948fe248ef55817afcd520664205` — CI 1169 / DCO 1247.

Established ownership, route, memory lifecycle, synthetic fixtures, deterministic Aster/manual parity, temporary projection limits, validation, release separation, rollback, and holdpoints.

### 9.2 — Opening and Lantern Shore

Accepted at `6565fbc43c9356e7b72acaed30b50cbff2907a38` — CI 1180 / DCO 1258.

Provides direct and skippable arrival, Lantern Shore, no required animation or timing, visible exit, scene focus, and memory-only disclosure.

### 9.3 — Aster and manual fallback

Accepted at `72f72223d7a07d460e89ec69b87b2003e84cdd3b` — CI 1188 / DCO 1266.

Both paths use the same facts, fixtures, review controls, projections, completion rule, and authority. Aster changes framing, not truth or capability.

### 9.4 — Synthetic review and confirmation

Accepted at `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a` — CI 1205 / DCO 1283.

Provides pre-authored synthetic text and voice-transcript choices, deterministic drafts, explicit review, prepared correction, refusal, and confirmation without arbitrary input or microphone use.

### 9.5 — Chronicle and House of Keys explanations

Accepted at `e819c71f31041632998b5f468c492e8b1c810a44` — CI 1221 / DCO 1300, with corrections revalidated in later aggregates.

The Chronicle-shaped explanation maps selected `ChronicleRecordEnvelope` vocabulary without creating a record. The receipt-shaped explanation maps selected `AccessReceipt` meanings without creating a request, evaluation, grant, consent, audit event, or data release.

### 9.6 — First Lantern

Accepted at `4d1fa7fdec3e83f282ee8ed8f16292e509d514fa` — CI 1253 / DCO 1334.

First Lantern requires Lantern Shore, guide selection, synthetic fixture, draft review, explicit confirmation or correction, Chronicle inspection, receipt inspection, and deterministic completion. It creates no reward, rank, canonical unlock, Fourteen Lantern progression, account, permission, provider status, health outcome, or durable state.

### 9.7 — Refusal, restart, discard, exit, and future-account boundary

Accepted at `a3ac15f32ca098a2955c14bf815af60cccfd56d6` — CI 1257 / DCO 1339.

Provides restart from progressed scenes, exact reset, functional discard, departure after First Lantern, completion without an account, and optional future-account information without email, signup, sign-in, authentication, newsletter coupling, persistence, conversion pressure, or durable progression.

### 9.8 — Playable validation and measurement

Accepted at `b1fdba193e1ebaa8096695192ddd5f6965255529` — CI 1280 / DCO 1365.

The permanent dependency-free Chrome DevTools Protocol validator proves:

- rendered shortest manual/text and representative Aster/voice completion;
- native keyboard completion for both direct paths;
- all 41 visible controls and disclosures exercised;
- focus movement, announcements, accessible names, semantic progress, and no keyboard trap;
- confirmation disabled until explicit review;
- reduced motion, reduced data, increased contrast, forced colors, narrow viewport, and no-JavaScript behavior;
- no cookies, browser storage, IndexedDB, Cache Storage, external runtime requests, newsletter calls, WebSockets, browser errors, or hidden state restoration;
- direct completion at 8.45 and 9.11 modeled minutes, with 11.96-minute optional exploration measured separately; and
- `/prologue` within every accepted Sprint 8 performance ceiling.

The evidence remains maintainer implementation evidence, not independent accessibility, named screen-reader, affected-user, cognitive-load, browser/device, or field-performance certification.

### 9.9 — Publication, hosted evidence, rollback, and status controls

Accepted at `0ac02609dc18ab7ff1f2b4f55ba058b6536f505c` — CI 1284 / DCO 1369.

The founding steward authorized a least-authority protected branch preview. Commit `66979c71732f0bc343000fe143485d06e0bc7fec` produced Vercel deployment `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M` without moving the production alias.

9.9 established:

- commit-pinned source links to the accepted 9.8 boundary;
- exact Git and Vercel provenance;
- protected, noindex hosted evidence;
- successful hosted build and route generation;
- no runtime error cluster during review;
- truthful public-synthetic and non-production capability labels;
- separate merge, link, index, preview, and production authority;
- release, correction, and rollback ownership;
- production isolation from the preview; and
- restoration of `git.deploymentEnabled: false` for every branch.

The protected preview is maintainer evidence, not a production or public gameplay release.

## Next workstream

### 9.10 — Cross-contract reconciliation, completion, and Sprint 10 handoff

**Planned and not started.**

9.10 may now:

1. verify issue #67, PR #68, roadmap indexes, evidence records, release records, and holdpoints agree;
2. confirm the complete Sprint 9 boundary across Living Chronicle, House of Keys, Aster, website, newsletter, funding, privacy, security, and governance records;
3. assemble a Sprint 9 completion record and explicit unresolved-work register;
4. confirm no public link, production alias, indexing, or private capability was silently activated;
5. define the exact Sprint 10 handoff; and
6. present the complete candidate for founding-steward acceptance and directed squash merge.

9.10 does not itself authorize merge, public linking, production deployment, institutional Phase 0 completion, or closure of specialist holdpoints.

## Deterministic state and refusal rule

Scenes remain arrival, Lantern Shore, guide choice, Aster/manual introduction, capture choice, synthetic draft, review and correction, confirmed entry, Chronicle, receipt, First Lantern, exit choice, future account, and complete.

Invalid actions fail closed. Confirmation requires explicit review. Chronicle requires confirmation. Receipt requires Chronicle inspection. First Lantern requires all deterministic evidence. Departure and completion require First Lantern. Restart returns the exact initial object.

Visitors may skip optional narration, use the complete manual path, refuse synthetic capture, choose another fixture, review and correct, discard, restart, leave, complete without account conversion, and inspect future-account information without activating it. No path uses countdowns, shame, lost rewards, reduced access, health warnings, repeated contact requests, or manufactured urgency.

## Release state

- `/prologue` remains noindex, unlinked, outside the sitemap, unmerged, and absent from the production domain.
- The 9.9 hosted preview is protected by Vercel authentication and is not stored as an expiring share link.
- The production deployment remains `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp` from `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`.
- Git-triggered deployment is disabled for every branch.
- Merge does not authorize public linking or production deployment.
- No private-data migration or deletion procedure exists because Sprint 9 persists nothing.

## Completion rule

Sprint 9 closes only when 9.10 completes the final reconciliation, all acceptance criteria and completion evidence agree, the founding steward explicitly accepts the sprint, and the directed squash merge succeeds. Passing CI, a browser playthrough, modeled duration, or a hosted preview proves only its bounded evidence.
