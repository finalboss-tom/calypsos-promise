# Sprint 9 Public Synthetic Prologue Control and Evidence Map

[Architecture index](README.md) · [Cross-contract reconciliation](public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md) · [Holdpoints and unresolved work](public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md) · [Quality-gate closure](../roadmap/sprint-9-pre-9-10-quality-gate-closure.md) · [Completion record](../roadmap/sprint-9-completion-record.md) · [Sprint 10 handoff](../roadmap/sprint-9-release-rollback-and-sprint-10-handoff.md)

- **Status:** READY FOR FOUNDING-STEWARD ACCEPTANCE — bounded repository, isolated-preview, rendered-browser, modeled-duration, measured-transfer, and protected-preview evidence
- **Application:** `apps/site`
- **Route:** `/prologue`
- **Accepted 9.9 baseline:** `3d7c02f303e052c07fb023ff39673a15c1d62349` — CI 1286 / DCO 1371
- **Scope:** stable control objectives, owning evidence, evidence status, and revalidation triggers for the complete Sprint 9 package

## Purpose

This map prevents Sprint 9 completion from becoming an undifferentiated claim that the prologue is accessible, secure, private, usable, production ready, clinically safe, legally sufficient, or independently reviewed. Each control has a stable identity, bounded objective, owning evidence, current evidence status, and revalidation trigger.

## Evidence vocabulary

- **REQUIRED:** demanded by frozen commitments, accepted decisions, inherited controls, or Sprint 9 acceptance criteria.
- **DESIGNED:** expressed as an inspectable architecture, state, lifecycle, route, release, or failure rule.
- **IMPLEMENTED:** enforced by current repository source and configuration.
- **DETERMINISTICALLY TESTED:** exercised through repository state, source, policy, and content tests.
- **ISOLATED PREVIEW TESTED:** exercised against a production build on an isolated local Next.js process.
- **BROWSER TESTED:** exercised in rendered Chrome through the dependency-free CDP harness.
- **MEASURED:** produces bounded quantitative evidence such as actions, visible words, duration, bytes, requests, contrast, or control coverage.
- **HOSTED-PREVIEW VERIFIED:** tied to an exact protected non-production deployment with current provenance.
- **FOUNDING-STEWARD REVIEWED:** reviewed by the proposing steward with explicit limitations.
- **DEPLOYED TO PRODUCTION:** running on the official production domain under declared controls.
- **OPERATIONALLY VERIFIED:** measured during representative operation with current field and incident evidence.
- **INDEPENDENTLY REVIEWED:** reviewed by a named qualified reviewer outside proposing and implementing authority.

Sprint 9 establishes the statuses named for each control. It does not establish production deployment of `/prologue`, representative operation, or independent review.

## Control map

### `CTL-S9-001`

- **Objective:** `apps/site` remains the sole owner of the bounded public prologue and `/prologue` remains the single route.
- **Owning evidence:** Application boundary, route contract, package structure, and source tests.
- **Current status:** Required; designed; implemented; deterministically tested.
- **Revalidate when:** Application ownership, route topology, or universal-shell architecture changes.

### `CTL-S9-002`

- **Objective:** The prologue remains a bounded explanation-through-play experience rather than the universal game shell.
- **Owning evidence:** Sprint 9 boundary, execution plan, completion record, Sprint 10 handoff.
- **Current status:** Required; designed; implemented; reconciled.
- **Revalidate when:** Shared shell, mobile application, durable progression, or account scope changes.

### `CTL-S9-003`

- **Objective:** Only PUBLIC or explicitly synthetic facts, fixtures, identities, observations, drafts, projections, and receipts enter the experience.
- **Owning evidence:** Synthetic fixture registry, publication rules, source scans, rendered evidence.
- **Current status:** Required; designed; implemented; deterministically and browser tested.
- **Revalidate when:** Any real-person, private, imported, provider, account, or health-data input is proposed.

### `CTL-S9-004`

- **Objective:** All interaction state remains React memory only and is destroyed by refresh, navigation, tab close, restart, discard, or exit.
- **Owning evidence:** State contract, transition tests, browser storage and restoration checks.
- **Current status:** Required; designed; implemented; deterministically and browser tested.
- **Revalidate when:** Storage, sync, account handoff, URL state, logs, or recovery behavior changes.

### `CTL-S9-005`

- **Objective:** No arbitrary text, editable region, file, microphone, camera, location, wearable, contact, or provider input exists.
- **Owning evidence:** Source tests, rendered control inventory, browser API checks.
- **Current status:** Required; designed; implemented; deterministically and browser tested.
- **Revalidate when:** Any input component, device API, upload, connector, or capture surface is proposed.

### `CTL-S9-006`

- **Objective:** The route sets no cookies and creates no localStorage, sessionStorage, IndexedDB, or Cache Storage state.
- **Owning evidence:** Browser evidence report and permanent validator.
- **Current status:** Required; implemented; browser tested.
- **Revalidate when:** State, authentication, offline, caching, or personalization behavior changes.

### `CTL-S9-007`

- **Objective:** The prologue performs no external runtime request, newsletter call, model/provider call, WebSocket, analytics, or hidden network state.
- **Owning evidence:** CDP network interception, source scans, release validator.
- **Current status:** Required; implemented; browser tested.
- **Revalidate when:** External resources, telemetry, providers, models, APIs, or remote content are introduced.

### `CTL-S9-008`

- **Objective:** The finite scene and transition table is exhaustive, inspectable, and shared by all presentations.
- **Owning evidence:** Exported state contract and state-machine tests.
- **Current status:** Required; designed; implemented; deterministically tested.
- **Revalidate when:** Scene, transition, prerequisite, or route composition changes.

### `CTL-S9-009`

- **Objective:** Invalid or premature actions fail closed and preserve the same state object.
- **Owning evidence:** Pure transition tests.
- **Current status:** Required; designed; implemented; deterministically tested.
- **Revalidate when:** Transition dispatch, validation, or state ownership changes.

### `CTL-S9-010`

- **Objective:** A visitor can complete the full prologue without an account, email, authentication, provider, model, payment, or remote service.
- **Owning evidence:** State journeys, rendered journeys, departure flow, source scans.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Identity, conversion, remote dependency, or completion rules change.

### `CTL-S9-011`

- **Objective:** Aster is optional and the manual route remains materially complete.
- **Owning evidence:** Guide-choice contract, parity tests, rendered manual journey.
- **Current status:** Required; designed; implemented; deterministically and browser tested.
- **Revalidate when:** Aster framing, guide facts, exclusive content, or fallback behavior changes.

### `CTL-S9-012`

- **Objective:** Aster and the manual route use the same fixtures, review controls, projections, completion rule, and authority.
- **Owning evidence:** Shared state, guide content, journey comparison.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Presentation-specific rules, data, rewards, or transitions are introduced.

### `CTL-S9-013`

- **Objective:** Aster may frame, draft, and explain but cannot create truth, permission, confirmation, storage, or completion authority.
- **Owning evidence:** Aster copy, state prerequisites, cross-contract reconciliation.
- **Current status:** Required; designed; implemented; deterministically tested.
- **Revalidate when:** Model integration, agent tools, memory, retrieval, or authority changes.

### `CTL-S9-014`

- **Objective:** Text and voice are pre-authored synthetic fixture choices; voice is a transcript presentation, not microphone capture.
- **Owning evidence:** Fixture registry, capture panel, source and browser checks.
- **Current status:** Required; designed; implemented; deterministically and browser tested.
- **Revalidate when:** Real voice, transcription, free-form entry, or provider capture is proposed.

### `CTL-S9-015`

- **Objective:** Confirmation remains unavailable until the visitor explicitly reviews and chooses an allowed disposition.
- **Owning evidence:** State prerequisites, disabled-control checks, rendered journeys.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Review, correction, confirmation, or disabled-state behavior changes.

### `CTL-S9-016`

- **Objective:** Prepared correction and fixture changes invalidate dependent confirmation and downstream evidence.
- **Owning evidence:** State transition tests and reversal journeys.
- **Current status:** Required; designed; implemented; deterministically tested.
- **Revalidate when:** Correction, supersession, or evidence invalidation semantics change.

### `CTL-S9-017`

- **Objective:** Refusal remains visible, reversible, non-punitive, and does not remove the core explanation.
- **Owning evidence:** Refusal transitions, rendered control coverage, copy review.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Refusal, urgency, reward, loss, or conversion behavior changes.

### `CTL-S9-018`

- **Objective:** The Chronicle-shaped view remains temporary, visibly synthetic, correctable, source linked, and non-authoritative.
- **Owning evidence:** Projection component, Chronicle vocabulary mapping, tests.
- **Current status:** Required; designed; implemented; deterministically and browser tested.
- **Revalidate when:** Chronicle schema, storage, authority, provenance, or correction behavior changes.

### `CTL-S9-019`

- **Objective:** The Chronicle explanation maps selected accepted `ChronicleRecordEnvelope` concepts without claiming a real record.
- **Owning evidence:** Mapping registry, accepted schema sources, tests.
- **Current status:** Required; designed; implemented; deterministically tested.
- **Revalidate when:** Schema version, mapping, field meaning, or public claim changes.

### `CTL-S9-020`

- **Objective:** The receipt-shaped view explains selected `AccessReceipt` meanings but creates no request, evaluation, grant, consent, audit event, recipient authority, or data release.
- **Owning evidence:** Receipt component, House of Keys sources, tests.
- **Current status:** Required; designed; implemented; deterministically and browser tested.
- **Revalidate when:** Permission vocabulary, legal claim, grant, recipient, or execution behavior changes.

### `CTL-S9-021`

- **Objective:** Receipt inspection requires confirmed Chronicle explanation state and cannot be reached by presentation confidence alone.
- **Owning evidence:** State prerequisites and transition tests.
- **Current status:** Required; implemented; deterministically tested.
- **Revalidate when:** Receipt ordering, prerequisite, or transition rules change.

### `CTL-S9-022`

- **Objective:** First Lantern requires every named deterministic evidence item and no remote or consequential input.
- **Owning evidence:** Quest definition, state rule, rendered journeys.
- **Current status:** Required; designed; implemented; deterministically and browser tested.
- **Revalidate when:** Quest prerequisites, evidence, completion, or remote inputs change.

### `CTL-S9-023`

- **Objective:** First Lantern creates no reward, rank, health result, canonical zone unlock, Fourteen Lantern progression, account, permission, or durable state.
- **Owning evidence:** Quest limitations, completion copy, tests.
- **Current status:** Required; designed; implemented; deterministically tested.
- **Revalidate when:** Reward, progression, canon, account, or health claims change.

### `CTL-S9-024`

- **Objective:** Reversal or dependent-state invalidation clears First Lantern completion until the rule is run again.
- **Owning evidence:** State tests and optional-exploration journey.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Back navigation, reversal, or completion persistence changes.

### `CTL-S9-025`

- **Objective:** Restart from every progressed scene returns the exact frozen initial state.
- **Owning evidence:** Exhaustive restart tests and visible controls.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Scene set, reset behavior, or retained state changes.

### `CTL-S9-026`

- **Objective:** Discard clears temporary fixture, correction, confirmation, inspection, completion, and departure evidence as applicable.
- **Owning evidence:** State tests and rendered discard coverage.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Discard scope, persistence, or downstream evidence changes.

### `CTL-S9-027`

- **Objective:** Departure and terminal completion remain available without conversion, punishment, or hidden retention.
- **Owning evidence:** Departure component, state journeys, rendered controls.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Departure, terminal state, conversion, or retention behavior changes.

### `CTL-S9-028`

- **Objective:** Future-account information remains optional, read-only, informational only, and incapable of creating identity or retaining prologue state.
- **Owning evidence:** Departure contract, source scans, state tests.
- **Current status:** Required; designed; implemented; deterministically tested.
- **Revalidate when:** Authentication, signup, account recovery, or state-transfer behavior changes.

### `CTL-S9-029`

- **Objective:** Scene changes move focus to the scene heading; in-scene choices use polite announcements without false focus claims.
- **Owning evidence:** Component focus logic, status region, rendered evidence.
- **Current status:** Required; implemented; browser tested; founding-steward reviewed.
- **Revalidate when:** Focus management, scene composition, or live-region behavior changes.

### `CTL-S9-030`

- **Objective:** Native keyboard order and activation remain logical and trap free for both direct journeys.
- **Owning evidence:** CDP native-keyboard journeys and tab-order evidence.
- **Current status:** Required; implemented; browser tested.
- **Revalidate when:** Controls, disclosures, keyboard handlers, or visual order change.

### `CTL-S9-031`

- **Objective:** Controls retain accessible names, native semantics, semantic progress, and no positive tabindex.
- **Owning evidence:** Accessibility tree, source tests, rendered validator.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Component roles, labels, progress, or focus attributes change.

### `CTL-S9-032`

- **Objective:** Reduced motion, reduced data, increased contrast, forced colors, and visible focus remain supported without removing essential controls.
- **Owning evidence:** CSS contracts and rendered media-mode evidence.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Animation, media, tokens, imagery, or styling changes.

### `CTL-S9-033`

- **Objective:** The 360×800 narrow layout and no-JavaScript explanation remain usable and free of hidden data collection.
- **Owning evidence:** Rendered narrow and script-disabled evidence, route source.
- **Current status:** Required; implemented; browser tested.
- **Revalidate when:** Layout, route rendering, JavaScript dependency, or fallback changes.

### `CTL-S9-034`

- **Objective:** The shortest manual/text and representative Aster/voice direct paths remain below ten modeled minutes.
- **Owning evidence:** Permanent duration model and CI evidence.
- **Current status:** Required; implemented; measured; browser tested.
- **Revalidate when:** Words, controls, scenes, timing model, or direct path changes.

### `CTL-S9-035`

- **Objective:** Looped optional exploration is measured separately and cannot be misrepresented as a direct-completion failure or success.
- **Owning evidence:** Scenario classification and validation record.
- **Current status:** Required; designed; measured.
- **Revalidate when:** Optional loops, timing claims, or acceptance interpretation changes.

### `CTL-S9-036`

- **Objective:** `/prologue` remains within the accepted Sprint 8 HTML, JavaScript, CSS, image, font, total-transfer, and request ceilings.
- **Owning evidence:** Static preview report and browser validator.
- **Current status:** Required; implemented; measured; CI enforced.
- **Revalidate when:** Framework, dependency, route, asset, or build output changes.

### `CTL-S9-037`

- **Objective:** Zero web-font dependence and first-party-only runtime resources remain enforced.
- **Owning evidence:** Release contract, resource scan, browser evidence.
- **Current status:** Designed; implemented; measured; CI enforced.
- **Revalidate when:** Fonts, CDNs, external images, scripts, styles, or assets are introduced.

### `CTL-S9-038`

- **Objective:** The static site retains the reviewed static-rendering-compatible CSP and public security headers without pretending nonce protection exists.
- **Owning evidence:** Proxy, release contract, source and preview tests.
- **Current status:** Required; designed; implemented; deterministically and preview tested.
- **Revalidate when:** Rendering mode, identity, private data, scripts, headers, or hosting changes.

### `CTL-S9-039`

- **Objective:** The dependency-free CDP harness executes rendered click and native-keyboard journeys and exercises every visible control.
- **Owning evidence:** CI workflow, validator modules, artifact report.
- **Current status:** Required; implemented; deterministically and browser tested.
- **Revalidate when:** Browser harness, controls, scenarios, Chrome behavior, or CI changes.

### `CTL-S9-040`

- **Objective:** Public source links used by the prologue are commit pinned or stable after branch deletion.
- **Owning evidence:** Prologue page and 9.9 provenance record.
- **Current status:** Required; implemented; deterministically tested.
- **Revalidate when:** Source path, branch lifecycle, contract location, or release copy changes.

### `CTL-S9-041`

- **Objective:** Hosted evidence remains bound to exact Git and Vercel provenance and is labeled protected preview evidence.
- **Owning evidence:** 9.9 record, Vercel metadata, PR evidence.
- **Current status:** Required; hosted-preview verified; maintainer reviewed.
- **Revalidate when:** Deployment, alias, source commit, protection, or claim changes.

### `CTL-S9-042`

- **Objective:** The production alias, production deployment, production source, environment configuration, and newsletter provider remain isolated from Sprint 9 preview evidence.
- **Owning evidence:** Vercel inspection and 9.9 record.
- **Current status:** Required; hosted-preview verified.
- **Revalidate when:** Production deployment, alias, environment, domain, or provider configuration changes.

### `CTL-S9-043`

- **Objective:** Git-triggered deployment remains disabled for every branch after the bounded preview, and rollback ownership is explicit.
- **Owning evidence:** `vercel.json`, tests, deployment policy, 9.9 record.
- **Current status:** Required; implemented; deterministically tested.
- **Revalidate when:** Git integration, deployment provider, branch rules, or release process changes.

### `CTL-S9-044`

- **Objective:** Merge, preview, public linking, indexing, production deployment, announcement, and institutional acceptance remain separate attributable decisions.
- **Owning evidence:** Execution plan, issue, PR, completion and handoff records.
- **Current status:** Required; designed; governance tracked.
- **Revalidate when:** Release authority, issue state, PR state, domain, or communications process changes.

### `CTL-S9-045`

- **Objective:** The newsletter remains a separate Phase 0 contact surface and cannot become identity, capture, consent, completion, progression, or state.
- **Owning evidence:** Source scans, page and API separation, issue #63.
- **Current status:** Required; implemented; deterministically tested.
- **Revalidate when:** Newsletter form, account, contact, prologue, or research behavior changes.

### `CTL-S9-046`

- **Objective:** Funding, sponsorship, provider relationships, or institutional opportunity cannot purchase placement, source authority, Aster behavior, progression, findings, ranking, or conversion pressure.
- **Owning evidence:** Funding doctrine, public copy, reconciliation.
- **Current status:** Required; designed; reconciled.
- **Revalidate when:** Funding relationship, sponsor benefit, provider, ranking, or recognition changes.

### `CTL-S9-047`

- **Objective:** Open specialist, affected-user, production, legal, privacy, security, operational, and Phase 0 gates remain visible and cannot be closed by maintainer evidence alone.
- **Owning evidence:** Holdpoint register, current status, completion record.
- **Current status:** Required; designed; governance tracked.
- **Revalidate when:** New evidence, named reviewer, production operation, or gate disposition changes.

### `CTL-S9-048`

- **Objective:** Sprint 10 may establish a universal browser/iOS/Android shell only after separate alignment, with one content package, accessibility paths, explicit offline/auth boundaries, and no gameplay rule depending on client-side trust.
- **Owning evidence:** Sprint 10 handoff and sprint sequence.
- **Current status:** Required; designed; recorded for next sprint.
- **Revalidate when:** Sprint 10 scope, application boundary, client authority, offline, or authentication design changes.

## Acceptance support

The controls collectively support the Sprint 9 acceptance criteria at the bounded evidence level:

- `CTL-S9-001` through `CTL-S9-010` establish bounded ownership, public-synthetic inputs, memory-only lifecycle, deterministic state, and no-account completion.
- `CTL-S9-011` through `CTL-S9-017` establish Aster/manual parity, synthetic capture, review, correction, confirmation, and non-punitive refusal.
- `CTL-S9-018` through `CTL-S9-028` establish Chronicle, receipt, First Lantern, reversal, restart, discard, departure, and informational-account authority boundaries.
- `CTL-S9-029` through `CTL-S9-039` establish focus, announcements, keyboard behavior, resilient presentation, direct-path duration, performance, security, storage, network, and permanent rendered-browser evidence.
- `CTL-S9-040` through `CTL-S9-047` establish stable sources, protected-preview provenance, production isolation, rollback, release separation, newsletter independence, funding/provider independence, and visible residual gates.
- `CTL-S9-048` establishes the bounded Sprint 10 entry rule.

## Residual-risk rule

A passing control proves only the evidence status named for that control. It does not automatically close a related production, public-release, pilot, specialist, affected-user, field-measurement, legal, privacy, security, operational, institutional, or next-sprint holdpoint.

The [Specialist Holdpoint and Unresolved-Work Register](public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md) remains controlling for evidence not established by Sprint 9.
