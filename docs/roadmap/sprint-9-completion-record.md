# Sprint 9 Completion Record — Public Synthetic Prologue

[Current status](current-status.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Quality-gate closure](sprint-9-pre-9-10-quality-gate-closure.md) · [Release, rollback, and Sprint 10 handoff](sprint-9-release-rollback-and-sprint-10-handoff.md) · [Cross-contract reconciliation](../architecture/public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/public-synthetic-prologue-sprint-9-control-and-evidence-map.md) · [Holdpoints and unresolved work](../architecture/public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE; not accepted, squash merged, publicly linked, indexed, deployed to production, officially released, or closed
- **Tracking issue:** [#67](https://github.com/finalboss-tom/calypsos-promise/issues/67) — remains open
- **Draft pull request:** [#68](https://github.com/finalboss-tom/calypsos-promise/pull/68) — remains draft and unmerged
- **Entry baseline:** `main` at `722f44d8ddcfe2692eb833ce6e879b5b2dc3b7e0`
- **Validated pre-completion head:** `3d7c02f303e052c07fb023ff39673a15c1d62349` — CI 1286 / DCO 1371
- **Application:** `apps/site`
- **Route:** `/prologue`
- **Protected preview:** `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M` from `66979c71732f0bc343000fe143485d06e0bc7fec`
- **Production deployment:** unchanged at `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp` from `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`
- **Newsletter Phase 0 gate:** [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63) — remains open
- **Scope:** complete bounded public synthetic prologue implementation, deterministic authority and refusal, rendered-browser and measured evidence, protected-preview provenance and rollback, final reconciliation, open holdpoints, and Sprint 10 handoff

## Readiness decision

The Sprint 9 implementation package is complete for the accepted goal:

> Let anyone understand the product through play before creating an account.

The package is ready for explicit founding-steward acceptance and directed squash merge.

Readiness applies at the repository implementation, deterministic state and source validation, isolated local-production-preview, rendered Chrome click and native-keyboard evidence, modeled-duration, measured-transfer, protected-preview provenance, and founding-steward review level.

It does not authorize a production `/prologue` link, public indexing, production deployment, official launch, accounts, authentication, private data, production Aster, real voice, providers, connectors, clinical workflows, research, analytics, payments, independent certification, institutional Phase 0 exit, or Sprint 10 implementation.

Sprint 9 becomes complete and merged only after the founding steward explicitly accepts this package and directs the squash merge of PR #68.

## Accepted implementation package

### Application and route boundary

Sprint 9 keeps the public prologue inside `apps/site` and implements exactly one `/prologue` route.

A separate application, universal shell, database, CMS, queue, scheduler, model runtime, provider runtime, analytics system, identity service, payment system, or generic shared package is not introduced.

### Public and explicitly synthetic experience

Every identity, observation, text example, voice transcript, draft, correction, Chronicle-shaped value, receipt-shaped explanation, evidence item, and completion state is public or explicitly synthetic.

The route accepts no free-form health text, microphone, file, camera, location, wearable, contact, provider, connector, account, or real-person input.

### Memory-only lifecycle

All interaction state remains React memory only and is destroyed by refresh, navigation, tab close, restart, discard, or exit.

The rendered validator observed:

- zero cookies;
- zero localStorage entries;
- zero sessionStorage entries;
- zero IndexedDB databases;
- zero Cache Storage names; and
- no hidden state restoration after leaving and returning.

### Deterministic state and authority

The exported state contract defines the complete scene and transition table.

Invalid or premature transitions fail closed. Confirmation, Chronicle inspection, receipt inspection, First Lantern completion, departure, and terminal completion require explicit deterministic evidence.

No client-side state becomes authoritative Chronicle truth, permission, consent, identity, audit, health outcome, or durable gameplay state.

### Aster and manual routes

Aster and the direct guide share the same facts, fixtures, review controls, projections, completion rule, refusal, departure, and authority.

Aster may frame, draft, clarify, and explain. It cannot confirm itself, write truth, grant permission, create storage, or complete the quest without the same deterministic player evidence.

The manual route is complete without a model, provider, network call, or AI dependency.

### Synthetic text and voice demonstration

The capture demonstration provides two pre-authored public synthetic fixtures presented as text or synthetic voice transcripts.

No microphone permission, transcription provider, device capture, free-form entry, private log, remote model prompt, or contact intake exists.

### Review, correction, refusal, and confirmation

Visitors must explicitly review a synthetic draft before confirmation.

Prepared correction and fixture changes invalidate dependent evidence. Visitors may refuse, reconsider, choose another fixture, discard, or restart without punishment or reduced core explanation.

### Chronicle-shaped explanation

The temporary Chronicle projection maps selected accepted `ChronicleRecordEnvelope` concepts for explanation.

It remains visibly synthetic, correctable, source linked, discardable, unstored, and non-authoritative. It creates no private Chronicle, subject identity, authoritative record, provenance chain, health conclusion, export, or deletion obligation.

### House of Keys receipt-shaped explanation

The receipt-shaped view explains selected `AccessReceipt` meanings.

It creates no request, evaluation, grant, consent, recipient authority, audit event, execution, legal permission, or data release. Production House of Keys remains separately gated.

### First Lantern

The bounded First Lantern rule requires:

- Lantern Shore reached;
- guide selected;
- visibly synthetic fixture selected;
- draft reviewed;
- explicit confirmation or prepared correction;
- Chronicle explanation inspected;
- receipt limitations inspected; and
- deterministic completion without consequential or remote input.

The result creates no reward, rank, health outcome, canonical zone unlock, Fourteen Lantern progression, account, permission, provider status, payment, or durable state.

### Reversal, restart, discard, departure, and completion

Reversal clears dependent First Lantern evidence. Restart from every progressed scene returns the exact frozen initial state. Discard clears temporary dependent state.

Visitors may leave or complete without an account. Future-account information is optional and informational only; it creates no identity, contact, authentication, recovery, persistence, or conversion reward.

### Accessibility and resilient interaction

The permanent dependency-free CDP validator:

- executes shortest manual/text and representative Aster/voice rendered journeys;
- completes both direct paths with native keyboard events;
- exercises all 41 visible controls and disclosures;
- checks logical tab order, no keyboard trap, scene-heading focus, and polite announcements;
- checks accessible names, accessibility-tree roles, semantic progress, and no positive tabindex;
- verifies confirmation remains disabled before explicit review;
- exercises reduced motion, reduced data, increased contrast, forced colors, 360×800 narrow layout, and no-JavaScript behavior; and
- captures representative screenshots and a machine-readable report.

Independent accessibility, named assistive technology, affected-user, cognitive-accessibility, zoom/reflow, device, browser, and platform evidence remains open.

### Duration evidence

The permanent model counts unique visible scene words at 160 words per minute and adds four seconds per activated control.

Accepted direct-path evidence:

- manual/text: 13 actions, 1,214 visible words, 8.45 modeled minutes;
- Aster/voice: 15 actions, 1,297 visible words, 9.11 modeled minutes.

The deliberately looped optional exploration measured 23 actions, 1,668 visible words, and 11.96 minutes. It remains separate from the direct-completion criterion.

### Performance evidence

The accepted 9.8 evidence measured `/prologue` at:

- HTML: 37,652 bytes;
- JavaScript: 713,812 bytes;
- CSS: 47,733 bytes;
- images: 705 bytes;
- web fonts: zero bytes;
- total transfer: 799,902 bytes; and
- first-party requests: 15.

Every value fits the accepted Sprint 8 playable-route ceilings. Sprint 9 does not require a larger route budget.

### Security, storage, and network evidence

The rendered evidence observed:

- zero external runtime requests;
- zero newsletter API requests;
- zero WebSockets;
- zero browser console or runtime errors;
- zero cookies and browser storage; and
- no restored state.

The public static site uses the reviewed static-rendering-compatible CSP and public security headers. Future identity or private-data routes must reopen rendering and CSP architecture.

### Stable sources and publication evidence

The prologue boundary link is commit pinned to accepted 9.8 evidence.

Workstream 9.9 created one least-authority protected preview:

- source: `66979c71732f0bc343000fe143485d06e0bc7fec`;
- deployment: `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M`;
- target: preview, not production;
- state: `READY`;
- access: Vercel authentication;
- indexing: noindex protection response;
- runtime review: no error cluster during the verification window.

No expiring share link is stored as durable evidence.

### Production isolation and release controls

Production remains:

- deployment: `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`;
- source: `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`;
- canonical domain: `https://www.calypsospromise.org`;
- state: `READY`.

No production alias, environment variable, newsletter provider configuration, navigation entry, sitemap entry, or public capability status changed.

Git-triggered Vercel deployment remains disabled for every branch.

### Validation package

Ordinary CI includes formatting, documentation links, repository policy, economics validation, content validation, lint, typecheck, tests, and `site-release-validation`.

The release job builds the production site, starts an isolated local preview, validates routes and budgets, executes rendered prologue journeys, uploads evidence, removes generated state, and proves no tracked mutation.

### Cross-contract and completion evidence

Workstream 9.10 adds:

- one quality-gate closure covering all sixteen pre-9.10 findings;
- one cross-contract reconciliation;
- 48 stable control objectives;
- 24 open holdpoints;
- 24 unresolved-work items;
- one completion record;
- one release, rollback, and Sprint 10 handoff;
- executable completion-package drift tests; and
- truthful acceptance, release, certification, and institutional boundaries.

## Acceptance-criterion status

The implementation package supports every Sprint 9 acceptance criterion at the named evidence level:

- **No real health data or account required:** implemented and source/browser verified.
- **Temporary data behavior disclosed:** implemented and storage/restoration verified.
- **Under-ten-minute direct completion:** measured at 8.45 and 9.11 modeled minutes.
- **Refusal and exit functional:** state tested and rendered-control verified.
- **Aster/manual parity:** shared deterministic state and rendered direct journeys.
- **Chronicle and receipt non-authority:** mapped, labeled, tested, and reconciled.
- **Keyboard and resilient modes:** rendered and recorded.
- **No persistence, analytics, provider, model, or hidden network dependency:** source and browser verified.
- **Performance baseline:** measured and enforced.
- **Release and rollback truth:** protected-preview provenance, production isolation, stable sources, ownership, and disabled Git deployment recorded.
- **Residual risk:** specialist, affected-user, production, legal, privacy, security, operational, Phase 0, and Sprint 10 gates remain visible.

The sprint-level checkboxes remain subject to explicit founding-steward acceptance. Open specialist and production limitations are not silently treated as completed evidence.

## Completion-package evidence

The package records:

- workstreams 9.1–9.9 accepted at their exact bounded candidates;
- accepted 9.9 baseline `3d7c02f303e052c07fb023ff39673a15c1d62349` — CI 1286 / DCO 1371;
- protected preview `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M` from `66979c71732f0bc343000fe143485d06e0bc7fec`;
- 48 controls;
- 24 open holdpoints;
- 24 unresolved-work records;
- 16 reconciled quality findings;
- deterministic repository validation;
- isolated local-production-preview validation;
- rendered click and native-keyboard validation;
- measured duration and transfer evidence;
- a representative founding-steward review;
- stable source links and release provenance;
- truthful production isolation and rollback; and
- the bounded Sprint 10 handoff.

The final 9.10 exact-head validation is recorded in issue #67 and PR #68 after the completion package itself passes the permanent suite.

## Evidence limits

Sprint 9 does not establish:

- a production `/prologue` link, indexing, official launch, or production deployment;
- deployed application-header, CSP, CDN, cache, TLS, DNS, monitoring, incident, or rollback-exercise evidence for a public prologue route;
- independent accessibility, security, privacy, legal, communications, clinical, provider, funding, or institutional review;
- formal WCAG conformance;
- named screen-reader, assistive-technology, affected-user, cognitive-accessibility, device, browser, zoom, reflow, touch, platform, or field-performance evidence;
- real voice, arbitrary health input, files, sensors, location, wearables, or provider data;
- accounts, authentication, recovery, or prologue-state transfer;
- private Living Chronicles, production House of Keys, production Aster, analytics, providers, connectors, clinical workflows, research, payments, or production health-data operation;
- institutional Phase 0 completion; or
- Sprint 10 universal-shell implementation.

## Open holdpoints

The controlling follow-up record is the [Sprint 9 Public Synthetic Prologue Specialist Holdpoint and Unresolved-Work Register](../architecture/public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md).

No public-release, production, independent-specialist, affected-user, field-measurement, legal, privacy, security, operational, newsletter, provider, funding, ownership, Phase 0, or Sprint 10 entry holdpoint closes because Sprint 9 is accepted or merged.

## Acceptance and merge gate

The implementation package is ready for the founding steward to decide whether to:

1. accept Sprint 9 at the stated evidence level;
2. direct squash merge of PR #68;
3. close issue #67 as completed after the merge is verified;
4. decide the protected-preview retention or teardown state; and
5. authorize a post-merge reconciliation.

Until explicit direction is given:

- PR #68 remains draft and unmerged;
- issue #67 remains open;
- Sprint 9 remains active;
- `/prologue` remains absent from the production domain, public navigation, and sitemap;
- Git-triggered deployment remains disabled;
- issue #63 remains open;
- institutional Phase 0 remains active; and
- Sprint 10 remains planned and not started.

## Handoff

After acceptance, squash merge, issue closure, preview disposition, and post-merge reconciliation, a dedicated pre-Sprint 10 alignment review becomes the controlling next step.

Sprint 10 inherits the exact boundaries in the [Release, Rollback, and Sprint 10 Handoff](sprint-9-release-rollback-and-sprint-10-handoff.md).
