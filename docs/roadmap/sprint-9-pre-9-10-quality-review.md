# Sprint 9 Pre-9.10 Quality and Coherence Review

[Current status](current-status.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68) · [Accepted pre-Sprint 9 alignment](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Public synthetic prologue boundary](../architecture/public-synthetic-prologue-boundary.md)

- **Review status:** BLOCKING — Sprint 9 is not ready to begin workstream 9.10
- **Review date:** July 29, 2026
- **Review scope:** actual repository and draft-PR state for workstreams 9.1 through 9.9
- **Release state:** branch-only, draft, noindex, unlinked, unmerged, and undeployed
- **Production impact:** none

## Review question

Does the actual Sprint 9 repository package meet the same standard of coherence, evidence density, correction, authority separation, and truthful status used by the accepted prior sprints before the project begins the final completion package in workstream 9.10?

## Answer

**Not yet.**

The review found strong architectural direction and useful implementation work in 9.1–9.6, but it also found material state-machine, source-integrity, cross-contract, testing, status, measurement, and sequencing gaps that prior sprint completion packages would have treated as blocking.

The repository does not contain completed 9.7, 9.8, or 9.9 work. Workstream 9.10 therefore remains blocked even after the corrective changes recorded below.

## Authorities used

This review applies the repository authority order rather than treating the current implementation or passing CI as self-authorizing:

1. Product Constitution and frozen player rights;
2. World and Lore Canon;
3. frozen Architecture Foundation and Gameplay Foundation;
4. accepted Living Chronicle, House of Keys, Aster, security, operational-simplicity, and website boundaries;
5. accepted pre-Sprint 9 issue #64;
6. Sprint 9 execution plan and issue #67;
7. current code, tests, pull-request evidence, and generated preview evidence.

A lower authority may implement or explain a higher one. It may not silently redefine it.

## Comparison baseline

### Sprint 7

Sprint 7 did not close because tools existed or because source strings matched. It paired deterministic implementations with adversarial, scope, compatibility, transport, timeout, cancellation, receipt, and failure evidence, plus cross-contract reconciliation, a control map, holdpoints, unresolved work, completion, and handoff records.

### Sprint 8

Sprint 8 paired each bounded workstream with exact review records, a versioned release contract, isolated production-preview measurements, manual representative review, a 36-control evidence map, cross-contract reconciliation, specialist holdpoints, a completion record, and a release/rollback handoff. It kept historical evidence separate from canonical current status.

### Minimum Sprint 9 implication

Sprint 9 must therefore provide more than a playable route and static source assertions. It needs executable interaction evidence, exact performance and duration evidence, cross-contract source integrity, functional refusal and exit behavior, truthful release/status records, and explicit remaining holdpoints before 9.10 may assemble the completion package.

## Actual workstream state at review start

| Workstream | Repository state at review start                                            | Review disposition                                                                     |
| ---------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 9.1        | contract and execution-plan package present                                 | directionally sound; validation and status assumptions required correction             |
| 9.2        | arrival and Lantern Shore present                                           | sound bounded implementation; remains branch-only                                      |
| 9.3        | deterministic Aster and manual paths present                                | materially coherent and provider-free                                                  |
| 9.4        | synthetic text/voice, review, correction, refusal, and confirmation present | sound direction; dead duplicate UI and source-only test confidence required correction |
| 9.5        | Chronicle and receipt-shaped projections present                            | material cross-contract provenance and vocabulary corrections required                 |
| 9.6        | First Lantern implementation present but not accepted                       | material evidence, quest-anatomy, canon, reversal, and test corrections required       |
| 9.7        | not implemented                                                             | blocking                                                                               |
| 9.8        | not implemented as a complete playable validation record                    | blocking                                                                               |
| 9.9        | not implemented                                                             | blocking                                                                               |
| 9.10       | not started                                                                 | correctly blocked                                                                      |

## Blocking and material findings

### QG-01 — Repository truth did not match the earlier progress summary

The actual issue and PR recorded 9.1–9.5 complete and 9.6 under review. Workstreams 9.7–9.9 were unchecked and absent. The review therefore rejects any claim that 9.7–9.9 were already complete or that 9.9 had a green candidate.

**Disposition:** corrected in this review record; canonical status and PR/issue records must remain aligned with the actual branch after the remediation candidate is validated.

### QG-02 — A visible discard control was non-functional

The confirmed-state screen dispatched `discard-projection`, but the `confirmed-entry` scene had no matching transition. The pure transition function correctly failed closed, which made the visible button silently do nothing.

**Correction applied:** `confirmed-entry` now permits `discard-projection` to return to the synthetic capture choice while clearing the temporary fixture, correction, confirmation, inspection, and completion evidence.

### QG-03 — Unreachable duplicate confirmation UI weakened reviewability

`PrologueCapturePanel` contained a complete `confirmed-entry` branch, while its parent deliberately stopped rendering that component in the same scene and rendered `PrologueConfirmedProjectionEntry` instead. Static tests could pass against copy in unreachable code.

**Correction applied:** the unreachable branch was removed; the confirmed-state handoff has one owner.

### QG-04 — State confidence relied too heavily on source-string assertions

The existing tests primarily searched source text for phrases and transition names. The isolated production preview fetched initial HTML, headers, resources, and budgets but did not execute the client interaction flow. This evidence model did not detect QG-02.

**Correction applied:** a dedicated executable Node test imports the TypeScript state contract and walks manual and Aster paths, text and voice fixtures, corrections, confirmation prerequisites, Chronicle and receipt prerequisites, discard, refusal, reconsideration, review invalidation, reversal, and First Lantern re-completion. Invalid actions must preserve the same state object.

**Remaining requirement:** workstream 9.8 must add rendered interaction evidence and a representative manual review; pure state tests do not prove browser, assistive-technology, focus, or comprehension behavior.

### QG-05 — House of Keys provenance link was stale

The receipt explanation linked to a fixed line range that no longer contained `AccessReceipt`.

**Correction applied:** canonical links now target the accepted contract and version files without brittle source-line anchors.

### QG-06 — The receipt cited an opposite evidence state as its accepted fixture

The prologue cited `receipt.personal-export.synthetic`, an accepted fixture representing an allowed, completed synthetic export with a grant and a crossed data-release boundary. The prologue intentionally represents no evaluation, no grant, no execution, and no release.

**Correction applied:** the receipt-shaped projection no longer claims an accepted fixture reference. It states that selected `AccessReceipt` field meanings are used for explanation only and explicitly records `not-evaluated`, `not-applicable`, no grants, and no release.

### QG-07 — The Chronicle projection did not map to accepted Chronicle vocabulary

The projection used simplified record, category, value, source, and confirmation fields without mapping them to the accepted `ChronicleRecordEnvelope` concepts.

**Correction applied:** the projection now names the accepted schema version and contract shape and exposes synthetic demonstration mappings for namespaced record, Chronicle, subject, variable, source artifact, and source version IDs; record family; assertion class; authority state; lifecycle state; temporal assertion kind; value shape; correction; and confirmation decision. It remains explicitly non-authoritative and unstored.

### QG-08 — First Lantern evidence was under-specified

The initial completion projection aggregated the rule into only confirmation, Chronicle inspection, and receipt inspection. The accepted boundary requires visible evidence that the visitor reached Lantern Shore, selected a guide, selected a visibly synthetic fixture, reviewed a draft, confirmed or corrected it, inspected the Chronicle projection, inspected the receipt limitations, and completed without forced or remote inputs.

**Correction applied:** the state now records Lantern Shore and draft-review evidence explicitly, and the completion projection lists eight inspectable evidence items.

### QG-09 — First Lantern lacked the frozen quest anatomy

The completion rule lacked the frozen gameplay fields for player value, zone, guide, estimated time, accessibility variants, data categories, purpose, safety classification, feedback, reward, narrative consequence, refusal, analytics hypothesis, and review state.

**Correction applied:** `firstLanternQuestDefinition` now records the complete bounded public-synthetic quest metadata.

### QG-10 — First Lantern could be confused with durable canon progression

The public synthetic completion used a canonical narrative term without explicitly separating it from the frozen Fourteen Lanterns chronology and durable game progression.

**Correction applied:** the quest and completion limitations state that the result ends only the bounded public synthetic prologue and creates no Fourteen Lantern progression, canonical zone unlock, rank, reward, account, or durable state.

### QG-11 — Reversal retained hidden completion state

Returning from First Lantern to inspect the receipt left the completion flag true in hidden state.

**Correction applied:** `return-to-receipt` clears First Lantern completion. The visitor must run the explicit deterministic completion transition again to relight it.

### QG-12 — Progress semantics were visual rather than structural

The progress display used anonymous spans and `data-current` styling rather than ordered-step semantics.

**Correction applied:** the progress display is now an ordered list with one `aria-current="step"` marker.

### QG-13 — Performance ceilings increased without a Sprint 9 measurement record

The branch raises the HTML, JavaScript, CSS, total-transfer, and request-count ceilings above the accepted Sprint 8 budgets. The Sprint 9 boundary requires explicit measured evidence before revising those budgets.

**Disposition:** open and blocking for 9.8. The final budget may remain higher only if a route-by-route measurement record shows the exact observed envelope, the reason for each revision, preserved zero-font and first-party-only constraints, and a margin that does not normalize uncontrolled growth.

### QG-14 — Under-ten-minute completion is not evidenced

Sprint 9 acceptance requires a visitor to complete the prologue in under ten minutes. The route currently contains substantial explanatory material and detailed contract fields, but no representative timed review, shortest/longest action path, reading-volume envelope, or affected-user evidence exists.

**Disposition:** open and blocking for 9.8. Contract detail is now placed behind native inspectable disclosure where possible, but a representative implementation review and measured path record remain required.

### QG-15 — Focus and announcement language requires precision

The implementation moves focus when the scene changes and uses live status for transitions that remain inside one scene. Some Sprint 9 prose says every transition moves focus, while the execution plan more accurately says focus follows scene transitions.

**Disposition:** open documentation reconciliation. The final contract must distinguish scene-change focus from in-scene selection announcements and must not claim evidence not exercised.

### QG-16 — Branch source links are not production-stable

The branch-only route correctly links its architecture source to the Sprint 9 branch during review. That link would become fragile after merge or branch deletion.

**Disposition:** open and blocking for 9.9. Public release copy must use stable `main` or commit-pinned sources.

## Workstream quality assessment

### 9.1 — Contracts

The application, route, memory-only lifecycle, provider-free Aster, synthetic-input, authority, release, and holdpoint boundaries remain coherent with the modular-monolith, consumer-first, operational-simplicity, Chronicle, House of Keys, and Aster authorities.

Quality gap: the original validation plan was not sufficient to catch invalid visible interactions. The executable-state and rendered-interaction requirements must be part of the permanent contract.

### 9.2 — Arrival and Lantern Shore

The route is skippable, noindex, no-account, no-input, memory-only, and direct. It keeps optional narration separate from essential information and preserves a clear exit.

Quality gap: 9.8 must record representative keyboard, announcement, focus, reduced-data, and no-JavaScript evidence rather than inheriting static-page evidence.

### 9.3 — Aster and manual parity

The same finite state, fixtures, review controls, projections, and completion rule serve both presentations. Aster changes framing, not authority, capability, or completion.

Quality gap: 9.8 must execute both paths in the browser and ensure the manual route remains complete after all later workstreams.

### 9.4 — Synthetic capture and confirmation

The pre-authored text and voice-transcript fixtures preserve the no-real-input boundary. Review, correction, refusal, and confirmation are explicit.

Quality correction: unreachable duplicate confirmation UI was removed and state behavior is now executed in tests.

### 9.5 — Chronicle and receipt explanation

The corrected design now explains selected accepted contract meanings without claiming a real record, accepted receipt fixture, grant, evaluation, audit, or data release.

Quality requirement: final wording still requires legal/communications specialist review before any future production permission experience; Sprint 9 does not close that holdpoint.

### 9.6 — First Lantern

The corrected rule is deterministic, evidence-based, reversible, provider-free, non-clinical, and non-authoritative. It exposes the frozen quest anatomy and avoids claiming durable canon progression.

Quality requirement: 9.6 is not complete until the exact remediated head passes all CI and DCO checks and issue/PR/status records are reconciled.

### 9.7 — Refusal, restart, discard, exit, and account boundary

Not implemented as a complete workstream. Existing local refusal, discard, and leave controls are useful foundations but do not substitute for the planned full departure, restart, terminal completion, and informational account boundary.

### 9.8 — Playable validation

Not complete. Existing build, source, static route, header, resource, contrast, and pure-state evidence is necessary but insufficient. Required additions include actual interaction execution, visible-control-to-transition validation, focus and announcement review, shortest/longest path measurements, exact route metrics and budget rationale, manual representative review, and explicit evidence limitations.

### 9.9 — Publication and rollback

Not implemented. Required records include release ownership, stable source links, manual deployment gate, exact commit provenance, hosted route verification, runtime-error review, public capability labels, rollback steps, and confirmation that Git-triggered deployment remains disabled outside an explicitly bounded release action.

## Required gate before 9.10

Workstream 9.10 may begin only after all of the following are true:

1. the remediation candidate passes formatting, build, typecheck, lint, tests, policy, content, economics, documentation, isolated preview, and DCO;
2. workstream 9.6 is accepted on that exact candidate;
3. workstream 9.7 is implemented and validated;
4. workstream 9.8 publishes executable interaction, representative manual, duration, accessibility, security, storage, network, and measured performance evidence;
5. performance-budget revisions are justified or returned to the accepted baseline;
6. workstream 9.9 publishes release, rollback, stable-source, hosted-evidence, and public-status records without deploying unless explicitly directed by the founding steward;
7. issue #67, PR #68, the execution plan, roadmap index, current status, and persistent roadmap issue all agree on the exact state; and
8. no material finding in this review remains falsely marked complete.

## Evidence limitations

This review and its automated corrections are maintainer implementation evidence. They are not independent accessibility, affected-user, legal, communications, clinical, privacy, security, or production-health-data certification. Those inherited holdpoints remain open.

## Decision

**Do not begin Sprint 9.10 yet.**

Complete and validate the remediation, then finish 9.7, 9.8, and 9.9 at the same gate and evidence standard used by Sprints 7 and 8. Only then assemble the cross-contract reconciliation, control map, holdpoint register, completion record, and Sprint 10 handoff.
