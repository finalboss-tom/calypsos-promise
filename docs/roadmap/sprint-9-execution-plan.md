# Sprint 9 Execution Plan — Public Synthetic Prologue

[Current status](current-status.md) · [9.7 departure record](sprint-9-workstream-9-7-record.md) · [9.8 validation](sprint-9-workstream-9-8-validation-record.md) · [9.8 representative review](sprint-9-workstream-9-8-manual-review.md) · [9.9 publication and rollback](sprint-9-workstream-9-9-publication-and-rollback.md) · [Quality-gate closure](sprint-9-pre-9-10-quality-gate-closure.md) · [Completion record](sprint-9-completion-record.md) · [Sprint 10 handoff](sprint-9-release-rollback-and-sprint-10-handoff.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68) · [Prologue boundary](../architecture/public-synthetic-prologue-boundary.md)

- **Status:** IMPLEMENTATION PACKAGE COMPLETE — workstreams 9.1–9.9 accepted; 9.10 ready for founding-steward acceptance
- **Application owner:** `apps/site`
- **Primary route:** `/prologue`
- **Data class:** PUBLIC and explicitly synthetic only
- **Institutional phase:** Phase 0 remains active
- **Newsletter gate:** issue #63 remains separate
- **Release control:** Git-triggered Vercel deployment remains disabled
- **Validated pre-completion head:** `3d7c02f303e052c07fb023ff39673a15c1d62349` — CI 1286 / DCO 1371
- **Whole-sprint state:** not yet accepted, squash merged, publicly linked, indexed, deployed to production, officially released, or closed

## Goal

> Let anyone understand the product through play before creating an account.

Sprint 9 proves a bounded public synthetic prologue. It does not establish the universal game shell, account system, private Chronicle storage, production Aster, real voice capture, provider connectivity, research enrollment, payments, analytics, or production health-data operation.

## Permanent Sprint 9 boundary

- No account, authentication, email requirement, free-form health text, microphone, file, camera, location, wearable, provider, connector, clinical, research, payment, donation, analytics, or private-data requirement.
- All content and state are public or explicitly synthetic.
- Interaction state remains React memory only and disappears on refresh, navigation, tab close, restart, discard, or exit.
- Voice and text use pre-authored synthetic choices only.
- The experience does not request microphone permission.
- Aster remains deterministic and optional, with a complete manual path.
- Chronicle and receipt-shaped views remain temporary explanations, not truth or permission.
- First Lantern completion depends only on explicit inspectable synthetic evidence.
- Refusal, restart, discard, leave, and completion without account conversion remain non-punitive.
- The future-account boundary remains informational only.
- Invalid actions fail closed.
- Confirmation requires an explicit visitor confirmation action.
- The receipt explains that no real identity exists, no real grant or recipient exists, and no legal consent or production permission is created.
- Completion does not survive refresh or exit.
- Merge, public linking, indexing, preview, production deployment, announcement, and institutional acceptance are separate founding-steward decisions.

## Accepted workstreams

### 9.1 — Contracts

Accepted at `6bd992f91ea0948fe248ef55817afcd520664205` — CI 1169 / DCO 1247.

Established application and route ownership, public-synthetic and memory-only lifecycle, fixtures, deterministic authority, Aster/manual parity, projection limits, validation, release separation, rollback, and holdpoints. A separate application is not justified.

### 9.2 — Opening and Lantern Shore

Accepted at `6565fbc43c9356e7b72acaed30b50cbff2907a38` — CI 1180 / DCO 1258.

Provides direct and skippable arrival, Lantern Shore, no required animation, no required timing, visible exit, scene focus, and memory-only disclosure.

### 9.3 — Aster and manual fallback

Accepted at `72f72223d7a07d460e89ec69b87b2003e84cdd3b` — CI 1188 / DCO 1266.

Both paths use the same facts, fixtures, review controls, projections, completion rule, refusal, and authority. Aster changes framing, not truth or capability.

### 9.4 — Synthetic review and confirmation

Accepted at `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a` — CI 1205 / DCO 1283.

Provides pre-authored synthetic text and voice-transcript choices, deterministic drafts, explicit review, prepared correction, refusal, and confirmation without arbitrary input or microphone use.

### 9.5 — Chronicle and House of Keys explanations

Accepted at `e819c71f31041632998b5f468c492e8b1c810a44` — CI 1221 / DCO 1300, with corrections revalidated in later aggregates.

The Chronicle-shaped explanation maps selected `ChronicleRecordEnvelope` vocabulary without creating a record. The receipt-shaped explanation maps selected `AccessReceipt` meanings without creating a request, evaluation, grant, consent, audit event, recipient authority, or data release.

### 9.6 — First Lantern

Accepted at `4d1fa7fdec3e83f282ee8ed8f16292e509d514fa` — CI 1253 / DCO 1334.

First Lantern requires Lantern Shore, guide selection, synthetic fixture, draft review, explicit confirmation or correction, Chronicle inspection, receipt inspection, and deterministic completion. It creates no reward, rank, canonical unlock, Fourteen Lantern progression, account, permission, provider status, health outcome, or durable state.

### 9.7 — Refusal, restart, discard, exit, and future-account boundary

Accepted at `a3ac15f32ca098a2955c14bf815af60cccfd56d6` — CI 1257 / DCO 1339.

Provides restart from every progressed scene, exact reset, functional discard, departure after First Lantern, completion without an account, and optional future-account information without email, signup, sign-in, authentication, newsletter coupling, persistence, conversion pressure, or durable progression.

### 9.8 — Playable validation and measurement

Accepted at `b1fdba193e1ebaa8096695192ddd5f6965255529` — CI 1280 / DCO 1365.

The permanent dependency-free Chrome DevTools Protocol validator proves:

- rendered shortest manual/text and representative Aster/voice direct completion;
- native keyboard completion for both direct paths;
- all 41 visible controls and disclosures exercised;
- logical keyboard order, scene-heading focus, polite announcements, accessible names, semantic progress, and no keyboard trap;
- confirmation disabled until explicit review;
- reduced motion, reduced data, increased contrast, forced colors, narrow viewport, and no-JavaScript behavior;
- storage API use, cookies, IndexedDB, Cache Storage, network calls, `/api/join`, WebSockets, browser errors, external resources, and hidden restoration are absent;
- completion without explicit confirmation is prohibited;
- direct completion measures 8.45 and 9.11 modeled minutes;
- optional looped exploration measures 11.96 minutes separately; and
- `/prologue` remains within every accepted Sprint 8 performance ceiling.

The evidence remains maintainer implementation evidence, not independent accessibility, named screen-reader, affected-user, cognitive-load, browser/device, or field-performance certification.

### 9.9 — Publication, hosted evidence, rollback, and status controls

Accepted through `3d7c02f303e052c07fb023ff39673a15c1d62349` — CI 1286 / DCO 1371.

The founding steward authorized one least-authority protected branch preview. Commit `66979c71732f0bc343000fe143485d06e0bc7fec` produced Vercel deployment `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M` without moving the production alias.

9.9 established:

- commit-pinned source links;
- exact Git and Vercel provenance;
- protected noindex hosted evidence;
- successful hosted build and route generation;
- no runtime error cluster during the verification window;
- truthful public-synthetic and non-production capability labels;
- separate merge, link, index, preview, and production authority;
- release, correction, and rollback ownership;
- production isolation from the preview; and
- restoration of `git.deploymentEnabled: false` for every branch.

The protected preview is maintainer evidence, not a production or public gameplay release.

## Workstream 9.10 — Final reconciliation and completion package

**Implementation package complete; exact-head aggregate and founding-steward acceptance remain controlling.**

9.10 adds:

- [Pre-9.10 Quality-Gate Closure](sprint-9-pre-9-10-quality-gate-closure.md), mapping all sixteen historical findings to exact dispositions;
- [Sprint 9 Cross-Contract Reconciliation](../architecture/public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md);
- [Sprint 9 Control and Evidence Map](../architecture/public-synthetic-prologue-sprint-9-control-and-evidence-map.md) with 48 stable controls;
- [Sprint 9 Specialist Holdpoint and Unresolved-Work Register](../architecture/public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md) with 24 open holdpoints and 24 unresolved-work items;
- [Sprint 9 Completion Record](sprint-9-completion-record.md);
- [Sprint 9 Release, Rollback, and Sprint 10 Handoff](sprint-9-release-rollback-and-sprint-10-handoff.md); and
- executable tests that detect drift in status, evidence counts, release controls, protected-preview provenance, production isolation, and Sprint 10 boundaries.

### 9.10 acceptance requirements

The exact final candidate must pass:

- formatting;
- documentation links;
- repository policy;
- economics validation;
- content validation;
- lint;
- typecheck;
- all tests, including the completion-package drift tests;
- production build and isolated local preview;
- rendered click and native-keyboard prologue journeys;
- accessibility, storage, network, duration, and performance checks;
- generated-state cleanup;
- DCO; and
- final issue #67 and PR #68 reconciliation.

The package may then be presented for founding-steward acceptance and directed squash merge.

9.10 does not itself authorize squash merge, issue closure, public linking, indexing, production deployment, official release, Phase 0 completion, specialist holdpoint closure, or Sprint 10 implementation.

## Deterministic state and refusal rule

Scenes remain `arrival`, `lantern-shore`, `aster-introduction`, `guide-choice`, `capture-choice`, `synthetic-draft`, `review-and-correction`, `confirmed-entry`, `synthetic-chronicle`, `synthetic-receipt`, `first-lantern`, `exit-choice`, `future-account`, and `complete`.

Invalid actions fail closed. Confirmation requires explicit review. Chronicle requires confirmation. Receipt requires Chronicle inspection. First Lantern requires all deterministic evidence. Departure and completion require First Lantern. Restart returns the exact initial object.

Visitors may skip optional narration, use the complete manual path, refuse synthetic capture, choose another fixture, review and correct, discard, restart, leave, complete without account conversion, and inspect future-account information without activating it.

No path uses countdowns, shame, lost rewards, reduced access, health warnings, repeated contact requests, or manufactured urgency.

## Release state

- `/prologue` remains `noindex`, unlinked, outside the sitemap, unmerged, and absent from the production domain.
- The 9.9 hosted preview is protected by Vercel authentication and is not stored as an expiring share link.
- Production remains `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp` from `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`.
- Git-triggered deployment remains disabled for every branch.
- Merge does not authorize public linking or production deployment.
- No private-data migration or deletion procedure exists because Sprint 9 persists nothing.

## Open specialist and institutional limits

Sprint 9 does not close:

- independent accessibility or security review;
- named screen-reader or assistive-technology testing;
- affected-user and cognitive-accessibility research;
- browser, device, zoom, reflow, touch, or platform matrices;
- field performance or real-user completion timing;
- production monitoring, incident response, or rollback exercise;
- public release, linking, indexing, or production-domain verification;
- real voice and arbitrary-input privacy design;
- production identity, authentication, recovery, or support;
- private Chronicle storage, export, correction, or deletion;
- production House of Keys, Aster, analytics, providers, connectors, research, payments, or health-data operation;
- newsletter issue #63;
- key-person, succession, governance, funding, and Phase 0 gates; or
- the pre-Sprint 10 alignment gate.

## Completion rule

Sprint 9 closes only when:

1. the exact 9.10 candidate passes the complete permanent suite and DCO;
2. issue #67, PR #68, current status, roadmap indexes, evidence records, release records, and holdpoints agree;
3. the founding steward explicitly accepts the package;
4. the founding steward directs the squash merge;
5. the squash merge succeeds and is verified;
6. issue #67 closes as completed;
7. the protected-preview retention or teardown decision is recorded; and
8. a post-merge reconciliation confirms no unexpected deployment, public link, indexing, or private capability was activated.

Passing CI, a browser playthrough, modeled duration, protected preview, or completion record proves only its bounded evidence.
