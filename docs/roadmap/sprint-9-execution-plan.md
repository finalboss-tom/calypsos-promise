# Sprint 9 Execution Plan — Public Synthetic Prologue

[Current status](current-status.md) · [Sprint 9.7 record](sprint-9-workstream-9-7-record.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Sprint sequence](sprints.md) · [Accepted alignment issue #64](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68) · [Public synthetic prologue boundary](../architecture/public-synthetic-prologue-boundary.md)

- **Status:** ACTIVE — workstreams 9.1–9.6 complete; 9.7 implemented and under exact-candidate validation; 9.8–9.9 unfinished; 9.10 blocked
- **Application owner:** `apps/site`
- **Primary route:** `/prologue`
- **Data class:** PUBLIC and explicitly synthetic only
- **Institutional phase:** Phase 0 remains active
- **Newsletter gate:** issue #63 remains separate
- **Release control:** Git-triggered Vercel deployment remains disabled
- **Latest accepted candidate:** `4d1fa7fdec3e83f282ee8ed8f16292e509d514fa` — CI 1253 / DCO 1334

## Goal

> Let anyone understand the product through play before creating an account.

Sprint 9 proves a bounded public synthetic prologue. It does not establish the universal game shell, an account system, private Chronicle storage, production Aster, real voice capture, provider connectivity, research enrollment, payments, analytics, or production health-data operation.

## Accepted entry baseline

Sprint 9 follows:

- Sprint 8 acceptance and squash merge through PR #61;
- post-Sprint 8 reconciliation and newsletter implementation through PR #66;
- production deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp` reaching `READY`;
- Git-triggered deployment returning to disabled; and
- acceptance of pre-Sprint 9 issue #64.

A separate application is not justified. `apps/site` remains the owner because the prologue has not earned a separate trust, runtime, scale, legal, release, or ownership boundary.

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

## Workstream state

### 9.1 — Application, route, state, lifecycle, fixtures, and validation contracts

**Complete:** `6bd992f91ea0948fe248ef55817afcd520664205` — CI 1169 / DCO 1247.

Established ownership, route, memory lifecycle, synthetic fixtures, deterministic Aster/manual parity, temporary projection limits, validation, release separation, rollback, and holdpoints.

The quality review strengthened the permanent validation rule: executable state and rendered interaction evidence are required; source-string checks alone cannot prove playable behavior.

### 9.2 — Opening sequence and Lantern Shore

**Complete:** `6565fbc43c9356e7b72acaed30b50cbff2907a38` — CI 1180 / DCO 1258.

Provides direct and skippable arrival, Lantern Shore, no required animation, no autoplay, no timed progression, visible exit, scene focus, and memory-only disclosure.

### 9.3 — Deterministic Aster and manual fallback

**Complete:** `72f72223d7a07d460e89ec69b87b2003e84cdd3b` — CI 1188 / DCO 1266.

Both paths use the same facts, fixtures, review controls, projections, completion rule, and authority. Aster changes framing, not truth or capability.

### 9.4 — Synthetic capture, draft, correction, and confirmation

**Complete:** `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a` — CI 1205 / DCO 1283.

Provides pre-authored synthetic text and voice-transcript choices, deterministic drafts, explicit review, prepared correction, refusal, and confirmation without arbitrary input or microphone use.

### 9.5 — Synthetic Chronicle and House of Keys explanation

**Complete:** `e819c71f31041632998b5f468c492e8b1c810a44` — CI 1221 / DCO 1300, with cross-contract corrections revalidated in the 9.6 aggregate.

The Chronicle-shaped explanation maps selected `ChronicleRecordEnvelope` vocabulary without creating a record. The receipt-shaped explanation maps selected `AccessReceipt` meanings without a policy request, evaluation, grant, consent, audit event, or data release.

### 9.6 — Deterministic First Lantern completion

**Complete:** `4d1fa7fdec3e83f282ee8ed8f16292e509d514fa` — CI 1253 / DCO 1334.

The accepted rule requires eight inspectable conditions:

1. Lantern Shore reached;
2. Aster or manual guide selected;
3. synthetic fixture selected and visibly labeled;
4. draft reviewed;
5. accept-or-correct choice confirmed;
6. Chronicle-shaped explanation inspected;
7. receipt-shaped explanation inspected; and
8. completion without account, email, newsletter, model, provider, payment, real data, real-world action, timer, analytics, or hidden state.

First Lantern is reversible and page-memory-only. It creates no reward, rank, canonical unlock, Fourteen Lantern progression, account, permission, provider status, health outcome, or durable state.

### 9.7 — Refusal, restart, discard, exit, and informational account boundary

**Implemented and under exact-candidate validation.**

Deliverables:

- `exit-choice`, `future-account`, and `complete` scenes;
- explicit restart from every non-arrival scene;
- exact restart to the frozen initial state;
- departure after First Lantern;
- completion without an account;
- future-account explanation without intake or activation;
- no email field, signup, sign-in, authentication, `/api/join`, newsletter call, persistence, or conversion pressure;
- direct leave paths that destroy temporary state through navigation; and
- executable tests across Aster/manual, text/voice, refusal, discard, restart, future-boundary inspection, and completion.

The [Sprint 9.7 Record](sprint-9-workstream-9-7-record.md) controls its evidence and limitations.

### 9.8 — Accessibility, security, performance, storage, network, and interaction validation

**Not implemented as a complete workstream.**

Must add:

- browser-rendered interaction coverage for Aster/manual and text/voice paths;
- visible-control-to-valid-transition coverage;
- keyboard, focus, announcement, and screen-reader review;
- reduced-motion, reduced-data, forced-colors, enhanced-contrast, narrow-screen, and no-JavaScript review;
- shortest, representative, and longest completion paths and duration measurements;
- exact route-level HTML, JavaScript, CSS, image, font, total-transfer, and request measurements;
- written justification for any budget increase above Sprint 8;
- zero web fonts, first-party-only runtime, no secrets, no storage, no analytics, and no provider contact; and
- a representative manual implementation review comparable to Sprint 8.9.

### 9.9 — Publication, rollback, hosted evidence, and public-status reconciliation

**Not implemented.**

Must define stable `main` or commit-pinned source links, exact candidate provenance, separate merge/link/deploy authority, manual deployment ownership, canonical-domain and runtime verification, public capability labels, rollback, correction ownership, and confirmation that Git-triggered deployment returns to disabled after any authorized release.

Hosted evidence may be created only after explicit founding-steward release direction.

### 9.10 — Cross-contract reconciliation, completion, and Sprint 10 handoff

**Blocked and not started.**

May begin only after 9.7–9.9 are complete and every issue, PR, status, roadmap, evidence, release, and holdpoint record agrees on the exact state.

## Deterministic state model

The 9.7 candidate uses these scenes:

1. `arrival`
2. `lantern-shore`
3. `guide-choice`
4. `aster-introduction`
5. `manual-introduction`
6. `capture-choice`
7. `synthetic-draft`
8. `review-and-correction`
9. `confirmed-entry`
10. `synthetic-chronicle`
11. `synthetic-receipt`
12. `first-lantern`
13. `exit-choice`
14. `future-account`
15. `complete`

Invalid actions fail closed and return the same state object. `confirmed-entry` requires an explicit visitor confirmation action. Chronicle inspection requires confirmation. Receipt inspection requires Chronicle inspection. First Lantern requires all eight deterministic conditions. Departure and completion require First Lantern. Restart returns the exact initial object.

No scene state enters a URL, cookie, browser storage, log, provider, newsletter, database, or remote model.

## Refusal, restart, and departure rule

Visitors may:

- skip optional narration;
- use the complete manual path;
- refuse synthetic capture;
- choose another fixture;
- review and correct;
- discard temporary state;
- restart from any non-arrival scene;
- leave for the public site;
- complete without account conversion; and
- inspect a future account explanation without activating it.

No path uses countdowns, shame, lost rewards, reduced access, health warnings, repeated contact requests, or manufactured urgency.

## Validation and Actions-conservation mode

GitHub Actions capacity is limited for three days beginning July 29, 2026. During that period:

- each workstream is assembled as one detached Git tree;
- the branch advances once per complete workstream;
- one CI/DCO checkpoint is used per workstream;
- metadata updates do not advance the branch; and
- work halts before acceptance if the required checks cannot run.

Reduced Actions usage does not reduce the acceptance standard. A workstream is not accepted without its required exact-candidate evidence.

## Publication and rollback

- Branch and PR builds remain validation-only.
- `/prologue` remains noindex, unlinked, outside the sitemap, unmerged, and undeployed.
- Merge does not authorize public linking or deployment.
- Rollback may remove a future entry link, restore the prior deployment, or revert the eventual squash commit.
- No private-data migration exists because Sprint 9 persists nothing.

## Unresolved inherited holdpoints

Sprint 9 does not close independent accessibility or assistive-technology review, affected-user evidence, device/browser field performance, real voice privacy, production identity, authentication, recovery, private Chronicle storage, production Aster, legal review of permission presentation, analytics, monitoring, incident operations, or remaining Phase 0 gates.

## Completion rule

Sprint 9 closes only when all ten workstreams, acceptance criteria, completion evidence, explicit founding-steward acceptance, and directed squash merge are complete. Passing CI, a local playthrough, or a hosted route proves only its bounded evidence.
