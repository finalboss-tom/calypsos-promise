# Pre-Sprint 10 Alignment Review

**Status:** READY FOR FOUNDING-STEWARD ACCEPTANCE  
**Recommended decision:** AUTHORIZED WITH NAMED HOLDPOINTS  
**Tracking:** [Issue #75](https://github.com/finalboss-tom/calypsos-promise/issues/75)  
**Entry baseline:** `main` at `6b89b1435d4bfc00ba93262fa197b69d8ea23fd7`  
**LI-V0 tracking:** [Issue #73](https://github.com/finalboss-tom/calypsos-promise/issues/73)  
**Draft pull request:** [#76](https://github.com/finalboss-tom/calypsos-promise/pull/76)  
**Candidate provenance:** PR #76 records the exact validated head, CI, and DCO before acceptance.

[Current status](current-status.md) · [Sprint sequence](sprints.md) · [Sprint 9 handoff](sprint-9-release-rollback-and-sprint-10-handoff.md) · [LI doctrine](../architecture/longitudinal-intelligence-doctrine.md) · [LI validation plan](longitudinal-intelligence-validation-plan.md) · [LI-V0 completion](longitudinal-intelligence-li-v0-completion-record.md)

## Purpose

Resolve the architecture, ownership, state, accessibility, offline, authentication, release, and Longitudinal Intelligence boundaries required before Sprint 10 — Universal game shell — begins.

This review does not implement Sprint 10. It defines the bounded implementation target and the conditions under which the founding steward may authorize it.

## Entry reconciliation

The review begins after:

- Sprints 0–9 were accepted and merged;
- Sprint 9 was production hosted as a public, explicitly synthetic, no-account, memory-only, non-authoritative prologue;
- the post-Sprint 9 repository and production reconciliation was accepted and merged;
- the Longitudinal Intelligence doctrine and staged validation baseline were accepted and merged;
- LI-V0 closure artifacts were prepared for acceptance;
- LI-V1 through LI-V8 remained inactive;
- Git-triggered deployment remained disabled for every branch; and
- institutional Phase 0 remained active.

No current evidence authorizes private Chronicles, production House of Keys, production Aster, real health or voice capture, providers, connectors, analytics, payments, personal experiments, causal health conclusions, research enrollment, clinical workflows, or production health-data operation.

## Sprint 10 accepted goal

> Establish the browser, iOS, and Android playable application.

Sprint 10 proves a universal application shell and public/synthetic gameplay foundation. It is not the Sprint 11 private value loop and not a Longitudinal Intelligence implementation stage.

## Architecture decision

### Application ownership

Create one new application:

- **`apps/game`** — Expo and Expo Router application owning the universal browser, iOS, and Android playable shell.

Retain:

- **`apps/site`** — owner of the public institutional website, newsletter surface, and production-hosted public synthetic prologue.

Sprint 10 does not migrate the canonical public site or production `/prologue` into `apps/game`. Any later consolidation requires separate evidence for route ownership, SEO, security headers, public content, newsletter isolation, deployment, rollback, and production continuity.

### Shared content ownership

Create one earned package:

- **`packages/game-content`** — versioned public and explicitly synthetic playable-content package consumed by `apps/game`.

The package:

- depends on `@calypsos-promise/content-schema` for accepted validation;
- exposes narrow, stable, versioned content and fixture interfaces;
- preserves stable IDs, provenance, status, locale, accessibility alternatives, and compatibility information;
- contains no private Chronicle data, account data, permission, provider, model, analytics, payment, research, or clinical content;
- cannot approve lore, Chronicle truth, quest completion, rewards, permissions, or Longitudinal Intelligence claims; and
- remains usable without a model or external provider.

Do not create a generic shared UI package during Sprint 10. Extract reusable UI only after a second real consumer demonstrates stable cross-application needs.

### Existing package ownership

- `packages/content-schema` continues to own content schemas and deterministic validation.
- `packages/domain` continues to own deterministic domain contracts already accepted there.
- `packages/aster` remains a non-authoritative proposal and presentation contract.
- `packages/health-schema` remains the health and Chronicle schema foundation; Sprint 10 does not extend it for private operation or Longitudinal Intelligence.
- `packages/house-of-keys` remains the permission contract foundation; Sprint 10 creates no production permission runtime.

## Runtime and authority map

### Public packaged content

Public and explicitly synthetic content may be bundled or cached across platforms. Content identity and version are authoritative only for the published content package, not for personal truth, permissions, progress, rewards, or health outcomes.

### Local presentation state

The client may hold local state for:

- navigation;
- scene and dialogue presentation;
- accessibility and presentation settings;
- temporary quest-card interaction;
- temporary synthetic-session progress;
- deterministic retry, restart, discard, and exit; and
- explicitly bounded offline operation.

Local state is presentation evidence only.

### Deterministic synthetic game state

Sprint 10 may implement deterministic, public/synthetic, session-scoped game behavior sufficient to test the shell.

It cannot create:

- canonical personal progression;
- durable First Lantern or Fourteen Lantern rewards;
- private Chronicle records;
- permission grants or access receipts;
- account ownership;
- personal health results;
- Longitudinal Intelligence results;
- clinical or research status; or
- financial value.

### Future authoritative state

Future authoritative private state remains outside Sprint 10. Its ownership, persistence, authentication, authorization, encryption, synchronization, audit, correction, deletion, export, backup, recovery, incident, and provider boundaries must be earned by later accepted work.

### Client-trust rule

No gameplay rule depends on client-side trust.

Client rendering, device time, local storage, cached state, optimistic UI, animation completion, hidden flags, offline state, or model output cannot independently create authoritative completion, rewards, permission, Chronicle truth, Longitudinal Intelligence claims, or canonical progression.

Invalid or conflicting authority claims fail closed or enter an explicit non-authoritative reconciliation state.

## Longitudinal Intelligence inheritance

LI-V0 is the only accepted Longitudinal Intelligence stage available to Sprint 10.

### Permitted Sprint 10 LI-adjacent work

The shell may implement public or synthetic presentation primitives for:

- source and provenance labels;
- claim-level labels;
- active, inactive, experimental, planned, mixed, inconclusive, invalid, stale, and unknown states;
- correction, refusal, deletion, export, and provider-exit explanations;
- evidence and authority disclosures;
- accessible plain-language alternatives; and
- non-AI fallback presentation.

Every primitive must truthfully state that the underlying personal or production capability is inactive when it is inactive.

### Prohibited Sprint 10 LI work

Sprint 10 cannot:

- implement or activate LI-V1 through LI-V8;
- select or qualify a health measurement;
- score personal health data;
- analyze a private Chronicle;
- infer health state from gameplay or telemetry;
- infer authentic preferences;
- recommend an intervention;
- activate randomization or a personal experiment;
- estimate a personal causal effect;
- determine current applicability;
- produce a “what works for you” result;
- grant clinical, medication, diagnostic, emergency, or research authority; or
- allow a model, provider, sponsor, or analytics system to select claims or actions.

### Analytics and telemetry

No product analytics, behavioral profiling, experiment platform, advertising tracker, crash recorder containing private content, or preference-inference system is introduced by default.

Any future telemetry requires a separate purpose, minimization, privacy, security, consent or lawful-basis, retention, deletion, access, incident, provider, and public-copy review. Telemetry can never become Chronicle truth or personal preference authority merely because it is observed.

## Browser, iOS, and Android boundary

### Browser

`apps/game` may build an Expo web target for browser validation. Sprint 10 does not move canonical production domains, public navigation, indexing, or `/prologue` ownership.

A hosted browser preview or production route requires a separate attributable release decision.

### iOS and Android

Sprint 10 may establish local and CI build capability, platform adapters, accessibility behavior, and distribution preparation.

It does not automatically authorize:

- App Store or Play Store submission;
- public beta distribution;
- signing-key custody as production-ready;
- production push notifications;
- production analytics;
- production authentication;
- private-data entitlements; or
- official mobile release.

## Content and presentation parity

One versioned `packages/game-content` revision must render materially equivalent essential content and choices across browser, iOS, and Android.

Platform-specific presentation may improve layout, navigation, input, audio, haptics, or animation, but cannot create exclusive:

- rights;
- essential information;
- refusal or exit paths;
- authority;
- evidence;
- progress;
- rewards; or
- account conversion.

The direct information path and narrative path must reach materially equivalent essential content.

## Accessibility and low-bandwidth requirements

Sprint 10 must define and test, where supported:

- keyboard operation;
- screen-reader semantics and announcements;
- touch and switch-compatible targets;
- text scaling;
- zoom and reflow;
- orientation behavior;
- visible focus where applicable;
- contrast and forced-colors behavior where applicable;
- reduced motion;
- reduced data;
- low-bandwidth and image-failure behavior;
- captions or text alternatives for material audio;
- haptic-independent operation;
- gesture alternatives; and
- no-JavaScript or degraded browser explanation where applicable.

No animation, Aster presentation, audio, haptic, gesture, image, or story traversal may be required for essential comprehension.

Accessibility failure remains an implementation failure or limitation. It must not be classified as refusal, low engagement, preference, inability, or reduced authority.

## Offline-state strategy

### Allowed offline material

Sprint 10 may store:

- versioned public packaged content;
- public static assets;
- accessibility and presentation preferences that contain no health inference;
- temporary synthetic-session state; and
- non-sensitive build and compatibility metadata.

### Required state properties

Each offline class must define:

- storage mechanism;
- version;
- owner;
- expiry;
- clearing behavior;
- migration behavior;
- corruption behavior;
- conflict behavior;
- accessibility impact;
- low-storage behavior; and
- platform differences.

### Prohibited offline material

Sprint 10 does not store:

- real health or voice data;
- private Chronicle records;
- credentials or production sessions;
- permission grants;
- personal inference results;
- analytics profiles;
- research records;
- payment information; or
- clinical content requiring protected handling.

Offline state cannot bypass future revocation, correction, deletion, permission, or authority validation.

## Authentication-after-prologue boundary

Sprint 10 implements the boundary and explanation, not a production authentication system.

Requirements:

- the public prologue remains completable without authentication;
- authentication is offered only after the prologue boundary;
- the shell clearly explains what future account value might enable and what remains inactive;
- no production identity provider is selected by Sprint 10;
- no public prologue state transfers silently;
- the default is to discard temporary or synthetic state;
- any future transfer requires explicit disclosure, review, player confirmation, provenance, purpose, correction, and deletion behavior; and
- account creation, recovery, session, support, abuse, deletion, incident, and accessibility remain later security and operations work.

Synthetic dialogue choices, temporary preferences, prologue completion, First Lantern presentation, and Aster framing do not become Chronicle evidence, permission, Longitudinal Intelligence, or canonical progression through authentication.

## Release, rollback, monitoring, and incident boundary

### Repository and CI

Sprint 10 must establish reproducible installation, build, lint, typecheck, tests, platform validation, and clean generated-state behavior.

### Hosted preview

Any hosted browser or mobile preview requires an explicit decision recording:

- exact source revision;
- provider and project;
- access state;
- indexing and discovery;
- configuration and secrets;
- runtime limitations;
- data classes;
- monitoring and incident ownership;
- expiry or teardown; and
- rollback.

### Production and stores

Merge, browser deployment, canonical-domain routing, indexing, store submission, store approval, public beta, official release, account activation, private capability, and Longitudinal Intelligence activation remain separate attributable decisions.

### Provider replacement

Expo, EAS, Apple, Google, Vercel, package registries, build services, monitoring services, and other providers remain adapters. Repository source, public content, deterministic rules, evidence, and manual development paths must survive provider failure or replacement as far as technically practical.

### Incident scope

Sprint 10 must define public/synthetic shell incident ownership. Private-data, authentication, payment, clinical, research, and personal-inference incidents remain outside scope until those capabilities exist.

## Named holdpoints carried into Sprint 10

1. **No private Chronicle or production health-data operation.**
2. **No production authentication or identity provider.**
3. **No production House of Keys.**
4. **No production Aster or model-provider egress.**
5. **No LI-V1 through LI-V8.**
6. **No analytics, profiling, advertising, or inferred-preference authority.**
7. **No app-store or official public mobile release without separate authorization.**
8. **No canonical production route or indexing change without separate authorization.**
9. **No durable rewards, personal progression, or client-authoritative gameplay.**
10. **No provider, sponsor, or platform purchases product or authority preference.**
11. **Independent accessibility, security, privacy, legal, device, and affected-user evidence remain open.**
12. **Institutional Phase 0 remains active.**

## Bounded Sprint 10 execution sequence

### Sprint 10.1 — Application ownership and toolchain

- establish `apps/game`;
- pin Expo, React Native, Expo Router, Node, and package-manager compatibility;
- define browser, iOS, and Android build boundaries;
- preserve `apps/site` ownership; and
- validate credential-free local and CI startup where practical.

### Sprint 10.2 — Versioned game-content package

- establish `packages/game-content`;
- bind accepted content-schema validation;
- define stable public interfaces, IDs, locale, provenance, status, accessibility alternatives, compatibility, and migration; and
- provide public synthetic fixtures.

### Sprint 10.3 — Universal shell and navigation

- app shell;
- island map;
- Hearth;
- direct and narrative navigation;
- error and fallback states; and
- no-account public/synthetic entry.

### Sprint 10.4 — Scene, dialogue, and quest presentation

- zone and scene renderer;
- dialogue choices;
- quest cards;
- Wayfinder Orb;
- deterministic synthetic interaction; and
- materially equivalent essential content across platforms.

### Sprint 10.5 — State and authority boundaries

- local presentation-state contracts;
- deterministic synthetic-session state;
- pending, failed, stale, corrected, superseded, and conflict states;
- no client-authoritative completion or rewards; and
- executable authority tests.

### Sprint 10.6 — Offline and resilience behavior

- public content caching;
- temporary synthetic-session storage;
- expiry, clear, migration, corruption, and conflict behavior;
- low-storage and offline failure; and
- no protected data.

### Sprint 10.7 — Authentication-after-prologue boundary

- informational account boundary;
- no production provider;
- no silent state transfer;
- discard-by-default temporary state; and
- future handoff contract without implementation authority.

### Sprint 10.8 — Accessibility and platform parity

- keyboard, screen-reader, touch, switch, scaling, reflow, contrast, orientation, reduced-motion, reduced-data, low-bandwidth, audio-text, haptic, and gesture alternatives;
- platform support matrix;
- direct-path parity; and
- documented residual limitations.

### Sprint 10.9 — Build, release, rollback, and operations evidence

- reproducible platform builds;
- preview and production decision boundaries;
- signing and store-distribution boundaries;
- provider replacement;
- monitoring and incident ownership;
- rollback; and
- generated-state cleanup.

### Sprint 10.10 — Final reconciliation and Sprint 11 handoff

- cross-contract reconciliation;
- control and evidence map;
- specialist holdpoints and unresolved work;
- completion record;
- exact validation evidence;
- merge, preview, distribution, production, and release gates; and
- bounded Sprint 11 private-value-loop handoff without starting Sprint 11.

## Sprint 10 acceptance criteria

Sprint 10 may close only when:

- one versioned content package renders materially equivalent essential content on browser, iOS, and Android;
- supported platform and version ranges are explicit;
- keyboard, screen-reader, reduced-motion, reduced-data, and low-bandwidth paths exist;
- essential comprehension does not require animation, AI, audio, haptics, gestures, images, or account creation;
- offline and local state remain classified, clearable, versioned, and non-authoritative;
- no gameplay rule depends on client-side trust;
- no private data, production authentication, analytics, payments, research, clinical workflow, or Longitudinal Intelligence beyond LI-V0 is active;
- provider failure does not erase repository source, content, evidence, or complete manual development paths;
- release, store distribution, deployment, indexing, private capability, and Sprint 11 remain separate decisions; and
- exact completion, holdpoint, rollback, and handoff records are accepted.

## Alignment conclusion

The accepted Sprint 10 goal remains correct. The new Longitudinal Intelligence doctrine does not require a change to the numbered sprint goal or acceptance criteria; it adds explicit authority, evidence, telemetry, preference, and future-replay boundaries.

The recommended decision is:

> **AUTHORIZED WITH NAMED HOLDPOINTS**

Authorization is limited to the universal public/synthetic game shell and the Sprint 10.1–10.10 sequence above.

It does not close institutional Phase 0, activate LI-V1, authorize a private Chronicle, select a production provider, permit personal experimentation, or create clinical, research, payment, analytics, or production health-data authority.
