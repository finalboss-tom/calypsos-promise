# Sprint 10.2 — Versioned game-content package

**Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10  
**Parent:** Sprint 10 — universal game shell  
**Tracker:** issue #80  
**Implementation:** draft PR #79

## Decision

Establish `packages/game-content` as the one earned shared package for versioned public and explicitly synthetic playable content consumed by `apps/game`.

The package binds accepted `@calypsos-promise/content-schema` validation and exposes narrow content, fixture, lookup, locale, compatibility, migration, provenance, accessibility, and authority interfaces. It does not create a generic shared UI package or transfer route, state, private-data, permission, model, analytics, reward, deployment, or release authority.

## Version and compatibility baseline

- package version: `0.1.0`
- content API version: `0.1.0`
- accepted content schema: `0.1.0`
- default and currently supported locale: `en-US`
- application runtime contract: Expo SDK 57
- explicit content targets: browser, iOS, and Android
- network requirement: none
- model-provider requirement: none
- information class: `PUBLIC_SYNTHETIC`

These are package-consumption boundaries, not independent device certification, operating-system support claims, hosted deployment, app-store readiness, or official release.

## Implemented boundary

1. `packages/game-content` is a private workspace package and `apps/game` is its first real consumer.
2. The root export is provider-free source suitable for the universal application; validation is exposed separately through `@calypsos-promise/game-content/validate`.
3. Every entry includes stable content identity, locale, provenance, public/synthetic classification, accessibility alternatives, and browser/iOS/Android compatibility.
4. The package manifest defines exact schema/API versions, supported locales, package content IDs, offline/provider independence, migration behavior, and an explicit non-authority ceiling.
5. Content-schema validation, unique content-locale keys, internal references, manifest parity, accessibility alternatives, prohibited protected fields, and migration failure behavior are executable.
6. Unknown package versions fail closed and restart synthetic session state; temporary synthetic session state is never silently preserved.
7. No generic shared UI package, private Chronicle content, identity, permission, provider, analytics, payment, research, clinical, production Aster, or LI-V1 through LI-V8 capability is introduced.

## Public synthetic fixtures

The initial package contains nine `en-US` fixtures sufficient for later shell and renderer work:

- one non-authoritative synthetic Aster character presentation;
- one Lantern Shore zone;
- three dialogue records covering welcome, agency, and direct explanation;
- two Hearth scenes with story, direct, defer, refusal, and exit paths;
- one synthetic First Lantern quest-card fixture; and
- one direct authority-boundary lesson.

Essential comprehension is available as text. No fixture requires audio, imagery, animation, haptics, gestures, networking, authentication, analytics, or a model provider.

Quest and scene states remain content-shaped presentation fixtures only. Their IDs, requirements, choices, rewards, and state labels cannot establish personal completion, Chronicle truth, permission, durable progress, health results, or Longitudinal Intelligence.

## Validated checkpoint

Exact implementation source: `d207fcd42b2d781dd60ae5d752bb25f44970842c`

- CI 1402: success
- DCO 1498: success
- frozen Node 24 / pnpm 10.13.1 installation: success
- `@calypsos-promise/content-schema` and game-content package validation: success
- formatting, documentation, repository policy, Longitudinal Intelligence coherence, economics, lint, typecheck, and tests: success
- existing production-site build and rendered prologue validation: success
- browser, iOS, and Android credential-free Expo export: success
- generated-state cleanup and no tracked build mutation: success

This is maintainer implementation and CI evidence inside active Sprint 10. It is not independent specialist certification, deployment or distribution authorization, personal-data readiness, authority to begin Sprint 11, activation of LI-V1 through LI-V8, or institutional Phase 0 exit.

## Holdpoints preserved

Sprint 10.2 does not authorize:

- rendering or navigation assigned to Sprint 10.3 and later;
- migration of `/prologue` or canonical public routes from `apps/site`;
- hosted preview, production deployment, indexing, public navigation, store submission, beta, or official release;
- production authentication, identity provider selection, private Chronicle operation, or House of Keys runtime;
- production Aster, model/provider egress, analytics, profiling, advertising, or inferred preferences;
- durable rewards, personal progression, client-authoritative completion, or canonical unlocks;
- LI-V1 through LI-V8, Sprint 11, or institutional Phase 0 exit; or
- independent accessibility, security, privacy, legal, affected-user, or device certification.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.3 on the same branch and PR.
