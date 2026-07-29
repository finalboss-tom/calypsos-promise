# Sprint 9 Execution Plan — Public Synthetic Prologue

[Current status](current-status.md) · [Sprint sequence](sprints.md) · [Accepted alignment issue #64](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Public synthetic prologue boundary](../architecture/public-synthetic-prologue-boundary.md)

- **Status:** ACTIVE — workstreams 9.1–9.4 complete; workstream 9.5 in progress
- **Tracking issue:** [#67](https://github.com/finalboss-tom/calypsos-promise/issues/67)
- **Draft pull request:** [#68](https://github.com/finalboss-tom/calypsos-promise/pull/68)
- **Branch:** `agent/sprint-9-public-synthetic-prologue`
- **Application owner:** `apps/site`
- **Primary route:** `/prologue`
- **Institutional phase:** Phase 0 remains active
- **Newsletter gate:** [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63) remains separate
- **Release control:** Git-triggered Vercel deployment remains disabled
- **Latest validated candidate:** `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a` — CI 1205 / DCO 1283

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
- First Lantern completion depends only on explicit synthetic state and player confirmation.
- The synthetic Chronicle and receipt remain temporary UI projections, not authoritative records or permission.
- Refusal, skip, restart, discard, exit, and completion without conversion remain functional and non-punitive.
- Account conversion remains informational only and cannot retain state or request contact information.

## Workstream order

### 9.1 — Application, route, state, lifecycle, fixtures, and validation contracts

Deliver:

- accepted `apps/site` ownership and `/prologue` route boundary;
- deterministic finite-state vocabulary and transition rules;
- named temporary-data classes and destruction behavior;
- public synthetic fixture and classification rules;
- scripted Aster and manual-fallback contract;
- synthetic Chronicle and House of Keys projection rules;
- refusal, reset, discard, exit, and future-account boundaries;
- route, source, storage, network, secret, accessibility, performance, and interaction validation plan; and
- unresolved holdpoint register.

Acceptance:

- no implementation ambiguity remains about storage, input, model, network, identity, receipt, completion, or release authority;
- later workstreams can be reviewed against stable state and data contracts; and
- no playable route is publicly linked before its validation contract passes.

**Status:** complete at `6bd992f91ea0948fe248ef55817afcd520664205` — CI 1169 / DCO 1247.

### 9.2 — Opening sequence and Lantern Shore

Deliver a direct, skippable opening and the first Lantern Shore scene without required animation, autoplay, or timed progression.

**Status:** complete at `6565fbc43c9356e7b72acaed30b50cbff2907a38` — CI 1180 / DCO 1258.

### 9.3 — Deterministic Aster and manual fallback

Introduce Aster through scripted public content while exposing an equivalent non-AI explanation and completion path.

**Status:** complete at `72f72223d7a07d460e89ec69b87b2003e84cdd3b` — CI 1188 / DCO 1266.

### 9.4 — Synthetic capture, draft, correction, and confirmation

Demonstrate text and voice modalities through pre-authored synthetic choices, produce a deterministic draft, and allow review, correction, confirmation, or refusal without arbitrary input.

**Status:** complete at `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a` — CI 1205 / DCO 1283.

### 9.5 — Synthetic Chronicle and House of Keys receipt

Render a visibly synthetic temporary Chronicle entry and a non-authoritative receipt projection derived from accepted public contracts where practical.

**Status:** active.

### 9.6 — First Lantern completion

Tie completion to deterministic confirmed synthetic state and display exactly what evidence caused completion.

### 9.7 — Refusal, restart, discard, exit, and future account boundary

Provide complete non-punitive alternatives, destroy temporary state on exit, and explain future account conversion without activating it.

### 9.8 — Accessibility, security, performance, storage, network, and interaction validation

Add permanent source and isolated production-preview evidence for keyboard, screen reader, focus, reduced motion, reduced data, forced colors, contrast, dialogue, confirmation, errors, receipt, refusal, exit, no persistence, no hidden input, no remote calls, and transfer budgets.

### 9.9 — Publication, rollback, hosted evidence, and public-status reconciliation

Define release ownership, manual deployment, domain verification, runtime checks, rollback, correction, and truthful capability labeling.

### 9.10 — Cross-contract reconciliation, completion, and Sprint 10 handoff

Publish the control map, unresolved holdpoints, completion record, release evidence, rollback state, and bounded handoff to the universal game shell.

## Validated progress through 9.4

The branch currently proves:

- one noindex, unlinked, branch-only `/prologue` route;
- a skippable arrival and Lantern Shore;
- deterministic Aster framing and a materially equivalent complete manual path;
- one shared immutable guide fact set and one shared interaction state machine;
- two pre-authored public synthetic fixtures: text and visual voice transcript;
- no arbitrary input, microphone, audio, files, camera, location, contact, account, model, provider, analytics, storage, or network dependency;
- deterministic fixture-to-draft projection;
- visible source, synthetic classification, timestamp, value, context, and prohibited interpretations;
- explicit accept-as-written, prepared correction, refusal, alternate-example, and confirmation controls;
- fail-closed confirmation until a review choice exists;
- confirmation held only in page memory; and
- no Chronicle, permission, identity, consent, audit, health, account, or durable-game authority.

The route remains unmerged and undeployed. Passing branch preview evidence is not a public release.

## Deterministic prologue state model

The accepted state vocabulary is:

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
14. terminal `discarded`, `left`, or `complete`

Every transition must name its preconditions, visible consequence, reversibility, announcement behavior, and destruction behavior. URL, refresh, browser history, hidden network state, model output, newsletter state, or elapsed time may not silently advance the state machine.

## Temporary-data classes

| Class                          | Example                               | Location          | Lifetime                                         | Destruction                                      |
| ------------------------------ | ------------------------------------- | ----------------- | ------------------------------------------------ | ------------------------------------------------ |
| navigation state               | current scene                         | React memory      | current page instance                            | refresh, navigation, discard, restart, tab close |
| synthetic selection            | pre-authored text or voice example ID | React memory      | current page instance                            | same as navigation state                         |
| deterministic draft            | UI projection from selected fixture   | React memory      | until correction, confirmation, discard, or exit | reset, discard, exit, refresh, tab close         |
| correction choice              | selected pre-authored correction      | React memory      | until confirmation or discard                    | reset, discard, exit, refresh, tab close         |
| synthetic Chronicle projection | confirmed public fixture projection   | React memory      | until receipt, completion, discard, or exit      | reset, discard, exit, refresh, tab close         |
| synthetic receipt projection   | public non-authoritative receipt view | React memory      | until completion, discard, or exit               | reset, discard, exit, refresh, tab close         |
| accessibility announcements    | current status text                   | rendered DOM only | current scene                                    | replacement, navigation, refresh, tab close      |

No class may enter local storage, session storage, IndexedDB, cookies, query strings, hashes, analytics, server logs, provider logs, newsletter records, databases, remote models, or private destinations.

## Synthetic fixture rule

Every fixture must include:

- stable public ID;
- `dataClassification: "synthetic"` or equivalent visible classification;
- human-readable synthetic label;
- source and provenance explanation;
- permitted display and transition uses;
- explicit prohibited interpretation; and
- correction and discard behavior.

The experience must never invite a visitor to replace a synthetic value with personal information.

## Aster rule

Sprint 9 Aster behavior is a deterministic presentation adapter. It may:

- introduce the demonstration;
- explain source, uncertainty, confirmation, and discard;
- draft from a selected public synthetic fixture; and
- narrate the deterministic result.

It may not:

- call a model or remote provider;
- accept arbitrary personal input;
- confirm itself;
- create Chronicle truth or permission;
- advance completion without deterministic evidence; or
- make diagnosis, treatment, safety, provider, or research claims.

The manual path must expose materially equivalent information and all required controls.

## Validation package

Workstream 9.8 must prove at minimum:

- `/prologue` has exactly one `h1`, one `main`, canonical metadata, security headers, and one shared newsletter opt-in outside the prologue state machine;
- the prologue uses no free-form text field, file input, microphone, camera, geolocation, media device, storage API, cookie mutation, analytics, remote fetch, websocket, event source, or third-party runtime resource;
- deterministic transition functions are pure, exhaustive, serializable for tests, and fail closed on invalid actions;
- no action reaches `first-lantern` without confirmed synthetic state;
- refusal, manual fallback, restart, discard, exit, and completion without conversion are tested;
- focus and announcements follow each scene transition;
- reduced-motion and reduced-data modes retain complete comprehension and controls;
- receipt and Chronicle labels remain visibly synthetic and non-authoritative;
- refresh and navigation do not imply persistence or recovery; and
- performance remains within an explicitly revised public-site budget.

CI must not contact the real newsletter provider, any model provider, or any external service while validating Sprint 9.

## Publication and rollback

- Branch and PR builds remain validation-only while Git-triggered deployment is disabled.
- Merge does not itself authorize deployment or public linking.
- A hosted release requires explicit founding-steward direction, exact commit provenance, route verification, runtime-error review, and rollback ownership.
- Rollback may remove the prologue entry link, restore the last accepted deployment, or revert the Sprint 9 squash commit while preserving public-safe evidence.
- No private-data migration or financial reconciliation exists because Sprint 9 may not persist visitor state.

## Unresolved holdpoints

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
