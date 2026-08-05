# Sprint 10.4 — Scene, dialogue, and quest presentation

**Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10  
**Parent:** Sprint 10 — universal game shell  
**Tracker:** issue #80  
**Implementation:** draft PR #79

## Decision

Establish generic package-driven zone, scene, dialogue-choice, quest-card, and Wayfinder Orb presentation in `apps/game`.

The implementation consumes the accepted `@calypsos-promise/game-content` package and adds deterministic public/synthetic interaction sufficient to demonstrate materially equivalent essential content across browser, iOS, and Android. It remains presentation-only and does not implement the durable state and authority contracts assigned to Sprint 10.5.

## Implemented boundary

1. A generic zone and scene resolver fails closed when required package entries are missing or have the wrong content kind.
2. The scene renderer displays zone purpose, scene identity, pre-authored dialogue, plain-language alternatives, and every declared choice.
3. Dialogue choices resolve through a deterministic pure function with no clock, random source, network, provider, analytics, or ambient state.
4. Continue choices may move only to another valid bundled scene or an allowlisted shell route.
5. Defer, refuse, and exit remain visible, non-punitive, and non-inferential.
6. The quest card presents objective, temporary presentation status, deferral, refusal, and the explicit absence of completion or reward authority.
7. The Wayfinder Orb is an accessible presentation navigator. It can open the direct scene, restart temporary presentation, or return to the island map; it cannot unlock content or choose for the player.
8. Narrative and direct scene entry use the same versioned package and reach materially equivalent essential authority information.
9. The implementation uses React memory only and introduces no persistence, account, identity, permission, Chronicle, personal progress, reward, health result, or Longitudinal Intelligence result.

## Presentation route

| Route   | Purpose                                                          | Authority         |
| ------- | ---------------------------------------------------------------- | ----------------- |
| `/play` | generic zone, scene, dialogue, quest, and Wayfinder presentation | presentation only |

The route accepts an optional public package scene identifier. Unknown or incomplete scene packages fail closed to a visible restart path rather than invoking a model, provider, or replacement-content generator.

## Deterministic interaction contract

The interaction resolver returns one of five bounded outcomes:

- another valid bundled scene;
- an allowlisted shell route;
- temporary deferred state;
- temporary refused state;
- temporary discarded exit state; or
- an invalid fail-closed result.

Every result is explicitly `authoritative: false`. No result grants completion, reward, unlock, permission, Chronicle truth, authentic preference, health status, or canonical progress.

## Content and platform parity

Browser, iOS, and Android export the same renderer and package revision. Essential scene text, dialogue choices, refusal, deferral, exit, quest boundary, and direct-path information do not depend on audio, imagery, animation, haptics, gestures, a model, network access, or account creation.

Platform-specific interaction polish remains allowed later, but no platform may receive exclusive essential information, rights, choices, progress, reward, or account conversion.

## Validated checkpoint

Exact clean checkpoint: `5115690810c570111fca10e14070152f0cbb1404`

- CI 1432: success
- DCO 1530: success
- frozen Node 24 / pnpm 10.13.1 installation: success
- exact implementation archive integrity and focused presentation-contract validation: success
- generic zone, scene, dialogue-choice, quest-card, and Wayfinder Orb tests: success
- formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, and tests: success
- existing production-site build and rendered prologue validation: success
- browser, iOS, and Android credential-free Expo export: success
- generated-state cleanup and no tracked build mutation: success
- temporary implementation tooling: removed before final checkpoint validation

This is maintainer implementation and CI evidence inside active Sprint 10. It is not independent accessibility, security, privacy, legal, affected-user, field, or device certification; deployment or distribution authorization; personal-data readiness; authority to begin Sprint 11; activation of LI-V1 through LI-V8; or institutional Phase 0 exit.

## Holdpoints preserved

Sprint 10.4 does not authorize:

- durable or canonical quest completion, rewards, restoration, unlocks, or personal progression;
- client-authoritative gameplay, device-time authority, hidden completion flags, or optimistic authority;
- persistent local or offline state assigned to later workstreams;
- production authentication, private Chronicle operation, House of Keys runtime, Aster/provider egress, or analytics;
- inferred preference, engagement classification, health claims, personal results, LI-V1 through LI-V8, clinical behavior, or research status;
- deployment, indexing, public navigation, mobile distribution, official release, Sprint 11, or institutional Phase 0 exit; or
- independent accessibility, security, privacy, legal, affected-user, field, or device certification.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.5 on the same branch and PR.
