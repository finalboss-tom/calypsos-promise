# Sprint 9 Execution Plan — Public Synthetic Prologue

[Current status](current-status.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Sprint sequence](sprints.md) · [Accepted alignment issue #64](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68) · [Public synthetic prologue boundary](../architecture/public-synthetic-prologue-boundary.md)

- **Status:** ACTIVE — 9.1–9.5 previously validated; 9.6 remediated and under exact-candidate validation; 9.7–9.9 unfinished; 9.10 blocked
- **Tracking issue:** [#67](https://github.com/finalboss-tom/calypsos-promise/issues/67)
- **Draft pull request:** [#68](https://github.com/finalboss-tom/calypsos-promise/pull/68)
- **Branch:** `agent/sprint-9-public-synthetic-prologue`
- **Application owner:** `apps/site`
- **Primary route:** `/prologue`
- **Institutional phase:** Phase 0 remains active
- **Newsletter gate:** [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63) remains separate
- **Release control:** Git-triggered Vercel deployment remains disabled
- **Latest fully validated workstream candidate:** `e819c71f31041632998b5f468c492e8b1c810a44` for 9.5 — CI 1221 / DCO 1300
- **Quality gate:** [Sprint 9 Pre-9.10 Quality and Coherence Review](sprint-9-pre-9-10-quality-review.md)

## Goal

> Let anyone understand the product through play before creating an account.

Sprint 9 proves a bounded public synthetic prologue. It does not establish the universal game shell, an account system, a private Chronicle, production Aster, real voice capture, provider connectivity, research enrollment, payments, analytics, or production health-data operation.

## Accepted entry baseline

Sprint 9 begins after:

- Sprint 8 acceptance and squash merge through PR #61;
- post-Sprint 8 reconciliation and newsletter implementation through PR #66;
- production deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp` reaching `READY`;
- Git-triggered deployment returning to disabled through `6be7d20fbfe1079881a0717f30760b0e48b265b5`; and
- explicit acceptance and closure of pre-Sprint 9 alignment issue #64.

The newsletter remains a distinct Phase 0 contact gate. It cannot become prologue identity, capture, conversion, completion, or progression.

## Permanent Sprint 9 boundary

- Public and explicitly synthetic information only.
- No account, authentication, email, free-form health text, microphone, file, camera, location, wearable, provider, connector, clinical, research, payment, donation, or analytics requirement.
- Interactive state remains memory-only and disappears on refresh, navigation, tab close, restart, or explicit discard.
- Voice and text are demonstrated through pre-authored synthetic choices only.
- Aster remains deterministic and optional, with a complete manual path.
- First Lantern completion depends only on explicit, inspectable synthetic evidence and player confirmation.
- The synthetic Chronicle and receipt remain temporary UI explanations, not authoritative records, grants, permission, consent, or audit evidence.
- Refusal, skip, restart, discard, exit, and completion without conversion remain functional and non-punitive.
- Account conversion remains informational only and cannot retain state or request contact information.
- No workstream may weaken the Product Constitution, frozen lore, gameplay foundation, Chronicle authority, House of Keys authority, Aster boundaries, security baseline, consumer-first doctrine, or manual release controls.

## Workstream order and actual state

### 9.1 — Application, route, state, lifecycle, fixtures, and validation contracts

Deliver:

- accepted `apps/site` ownership and `/prologue` route boundary;
- deterministic finite-state vocabulary and transition rules;
- named temporary-data classes and destruction behavior;
- public synthetic fixture and classification rules;
- scripted Aster and manual-fallback contract;
- synthetic Chronicle and House of Keys explanation rules;
- refusal, reset, discard, exit, and future-account boundaries;
- route, source, storage, network, secret, accessibility, performance, and interaction validation plan; and
- unresolved holdpoint register.

**State:** completed and previously validated at `6bd992f91ea0948fe248ef55817afcd520664205` — CI 1169 / DCO 1247.

**Quality-review inheritance:** the permanent validation contract must include executable state transitions and rendered interaction evidence; source-string checks and static route previews are not sufficient proof of playable behavior.

### 9.2 — Opening sequence and Lantern Shore

Deliver a direct, skippable opening and the first Lantern Shore scene without required animation, autoplay, or timed progression.

**State:** completed and previously validated at `6565fbc43c9356e7b72acaed30b50cbff2907a38` — CI 1180 / DCO 1258.

### 9.3 — Deterministic Aster and manual fallback

Introduce Aster through scripted public content while exposing an equivalent non-AI explanation and completion path.

**State:** completed and previously validated at `72f72223d7a07d460e89ec69b87b2003e84cdd3b` — CI 1188 / DCO 1266.

### 9.4 — Synthetic capture, draft, correction, and confirmation

Demonstrate text and voice modalities through pre-authored synthetic choices, produce a deterministic draft, and allow review, correction, confirmation, or refusal without arbitrary input.

**State:** completed and previously validated at `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a` — CI 1205 / DCO 1283.

**Quality-review correction:** an unreachable duplicate confirmed-state UI was removed. One component now owns the confirmed-state handoff, and the visible discard action is covered by executable transition tests.

### 9.5 — Synthetic Chronicle and House of Keys receipt

Render a visibly synthetic temporary Chronicle explanation and a non-authoritative receipt-shaped explanation derived from accepted public contract vocabulary where practical.

**State:** completed and previously validated at `e819c71f31041632998b5f468c492e8b1c810a44` — CI 1221 / DCO 1300. Cross-contract corrections from the quality review await validation on the remediated aggregate head.

**Quality-review corrections:**

- the Chronicle explanation maps selected `ChronicleRecordEnvelope` vocabulary without claiming to be a record;
- record, Chronicle, subject, variable, source artifact, and source version identifiers are namespaced and explicitly synthetic;
- the receipt explanation uses selected `AccessReceipt` field meanings only;
- stale source-line anchors were removed;
- the opposite-state `receipt.personal-export.synthetic` fixture is no longer claimed as the projection source; and
- no policy request, evaluation, grant, execution, audit event, or data release is implied.

### 9.6 — First Lantern completion

Tie completion to deterministic confirmed synthetic state and display exactly what evidence caused completion.

**State:** implemented and remediated; not yet accepted as a final workstream candidate.

The corrected rule requires explicit evidence that:

1. Lantern Shore was reached;
2. Aster or the manual guide was selected;
3. a visibly synthetic fixture was selected;
4. the draft was reviewed;
5. an accept-or-correct choice was explicitly confirmed;
6. the temporary Chronicle explanation was inspected;
7. the non-authoritative receipt explanation was inspected; and
8. completion occurred without account, email, newsletter, model, provider, payment, real health information, real-world action, timer, analytics, or hidden state.

The bounded quest definition now records player value, zone, guide, estimated time, accessibility variants, synthetic-only data category, no permission requirement, non-clinical safety class, feedback, no reward, refusal behavior, and a narrative consequence that creates no Fourteen Lanterns progression, canonical zone unlock, rank, account, or durable game state.

### 9.7 — Refusal, restart, discard, exit, and future account boundary

Provide complete non-punitive alternatives, destroy temporary state on exit, and explain future account conversion without activating it.

**State:** not implemented as a complete workstream.

Existing local refusal, review, discard, and leave controls are foundations only. Workstream 9.7 still must provide and validate:

- an explicit restart path from later scenes;
- a complete departure or terminal choice surface;
- a clear completed-without-conversion path;
- informational-only future account copy with no email field, account endpoint, state retention, or newsletter coupling;
- visible destruction behavior for restart, discard, and exit; and
- non-punitive parity across Aster and manual presentations.

### 9.8 — Accessibility, security, performance, storage, network, and interaction validation

Add permanent evidence for keyboard, screen reader, focus, reduced motion, reduced data, forced colors, contrast, dialogue, confirmation, errors, receipt, refusal, restart, discard, exit, no persistence, no hidden input, no remote calls, duration, and transfer budgets.

**State:** not implemented as a complete playable validation and measurement workstream.

Required evidence includes:

- executable pure-state coverage of valid and invalid transitions;
- browser-rendered interaction coverage across Aster/manual and text/voice paths;
- visible-control-to-valid-transition coverage so no rendered control can silently no-op;
- representative keyboard and focus review;
- live-region and screen-reader announcement review, distinguishing scene-change focus from in-scene status updates;
- reduced-motion, reduced-data, forced-colors, contrast, no-JavaScript, and narrow-screen review;
- shortest, representative, and longest completion-path action counts and duration measurements;
- exact route-by-route HTML, JavaScript, CSS, image, total-transfer, and request measurements;
- written rationale for any budget increase above Sprint 8 rather than normalizing growth;
- first-party-only resources, zero web-fonts, no secrets, no storage, no analytics, and no provider contact; and
- a representative manual implementation review comparable to Sprint 8.9.

### 9.9 — Publication, rollback, hosted evidence, and public-status reconciliation

Define release ownership, manual deployment, domain verification, runtime checks, rollback, correction, and truthful capability labeling.

**State:** not implemented.

Required records include:

- stable `main` or commit-pinned public source links instead of branch-only links;
- exact release-candidate and squash-commit provenance;
- explicit separation of merge, public linking, and production deployment authority;
- manual deployment ownership and Git-trigger restoration to disabled;
- hosted `/prologue` verification only after explicit founding-steward release direction;
- canonical-domain, headers, route, runtime-error, newsletter-separation, and no-persistence checks;
- rollback by entry-link removal, deployment restoration, or commit revert;
- public capability/status reconciliation; and
- clear evidence limitations and correction ownership.

### 9.10 — Cross-contract reconciliation, completion, and Sprint 10 handoff

Publish the control map, unresolved holdpoints, completion record, release evidence, rollback state, and bounded handoff to the universal game shell.

**State:** blocked and not started.

9.10 may begin only after 9.6 is accepted on an exact fully green candidate and 9.7–9.9 are implemented, validated, and reconciled.

## Deterministic prologue state model

The implemented pre-9.7 state vocabulary is:

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

Workstream 9.7 must add the accepted exit, restart, informational account, and terminal behavior without moving authority into URL state, browser persistence, a remote service, or presentation code.

Every transition must name its preconditions, visible consequence, reversibility, announcement behavior, and destruction behavior. URL, refresh, browser history, hidden network state, model output, newsletter state, or elapsed time may not silently advance the state machine.

## Temporary-data classes

| Class                           | Example                                                    | Location          | Lifetime                                                              | Destruction                                      |
| ------------------------------- | ---------------------------------------------------------- | ----------------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| navigation state                | current scene and explicit evidence flags                  | React memory      | current page instance                                                 | refresh, navigation, discard, restart, tab close |
| synthetic selection             | pre-authored text or voice fixture ID                      | React memory      | current page instance                                                 | same as navigation state                         |
| deterministic draft             | projection from selected fixture                           | React memory      | until correction, confirmation, discard, or exit                      | review reset, discard, exit, refresh, tab close  |
| correction choice               | accept-as-written or prepared correction                   | React memory      | until review reset, discard, or exit                                  | same                                             |
| synthetic Chronicle explanation | confirmed fixture mapping                                  | React memory      | until receipt, completion, review, discard, or exit                   | same                                             |
| synthetic receipt explanation   | non-authoritative field mapping                            | React memory      | until completion, review, discard, or exit                            | same                                             |
| First Lantern evidence          | explicit route, review, confirmation, and inspection flags | React memory      | until reversal, review, discard, restart, exit, refresh, or tab close | same                                             |
| accessibility announcements     | current transition status                                  | rendered DOM only | current interaction                                                   | replacement, navigation, refresh, tab close      |

No class may enter local storage, session storage, IndexedDB, cookies, query strings, hashes, analytics, server logs, provider logs, newsletter records, databases, remote models, or private destinations.

## Aster and manual parity rule

Sprint 9 Aster is a deterministic presentation adapter. It may introduce the demonstration, explain source and limitations, and narrate deterministic results. It may not call a model, accept arbitrary personal input, confirm itself, create Chronicle truth or permission, advance completion without domain evidence, or make diagnosis, treatment, provider, or research claims.

The manual path must expose materially equivalent facts, fixtures, controls, correction, refusal, projection, completion, restart, exit, and future-account behavior.

## Pre-9.10 quality gate

The [Sprint 9 Pre-9.10 Quality and Coherence Review](sprint-9-pre-9-10-quality-review.md) is a blocking record. It found and corrected material implementation defects while keeping these open gates:

- final formatting and exact-candidate validation of the aggregate remediation;
- 9.6 acceptance;
- full 9.7 implementation;
- playable and measured 9.8 evidence;
- 9.9 release, rollback, stable-source, hosted-evidence, and public-status records; and
- exact agreement among issue #67, PR #68, this plan, current status, roadmap indexes, and persistent roadmap tracking.

No completion package may mark these items complete by reference to passing static source tests, an earlier workstream candidate, or the existence of a playable local route.

## Publication and rollback

- Branch and PR builds remain validation-only while Git-triggered deployment is disabled.
- Merge does not itself authorize deployment or public linking.
- A hosted release requires explicit founding-steward direction, exact commit provenance, route verification, runtime-error review, stable source links, and rollback ownership.
- Rollback may remove the prologue entry link, restore the last accepted deployment, or revert the Sprint 9 squash commit while preserving public-safe evidence.
- No private-data migration or financial reconciliation exists because Sprint 9 may not persist visitor state.

## Unresolved inherited holdpoints

Sprint 9 does not close:

- independent accessibility or assistive-technology review;
- affected-user usability validation;
- field performance and device/browser matrices;
- real voice-capture privacy and security design;
- production account, identity, authentication, and private-state architecture;
- production Chronicle storage and security;
- production Aster or model-provider evaluation;
- legal and communications review of future receipt and permission presentation;
- production analytics, incident operations, and monitoring; or
- remaining institutional Phase 0 and specialist gates.

## Completion rule

Sprint 9 closes only when all ten workstreams, sprint acceptance criteria, completion evidence, explicit founding-steward acceptance, and directed squash merge are complete. A playable local build, passing CI run, hosted deployment, or visitor completion proves only the bounded public synthetic prologue evidence exercised by that environment.
