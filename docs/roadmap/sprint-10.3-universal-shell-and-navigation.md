# Sprint 10.3 — Universal shell and navigation

**Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION  
**Parent:** Sprint 10 — universal game shell  
**Tracker:** issue #80  
**Implementation:** draft PR #79

## Decision

Establish the first universal no-account application shell over the accepted `packages/game-content` contract.

The shell provides arrival, island-map, Hearth, direct-information, unavailable-destination, and unknown-route paths across browser, iOS, and Android. It remains presentation navigation only. It does not implement the generic scene, dialogue, quest, state, offline, authentication, release, or authority behavior assigned to Sprint 10.4 through Sprint 10.9.

## Implemented boundary

1. The public synthetic application opens without an account and gives equal prominence to narrative, direct, and map entry paths.
2. One shared shell layout exposes visible navigation to the island map, Hearth, and direct path.
3. The island map identifies Lantern Shore and the Hearth as available while future places are explicitly planned and inactive rather than behaviorally locked.
4. The Hearth presents pre-authored package content through a narrative route without a model provider or generic scene renderer.
5. The direct route presents materially equivalent essential authority information without story traversal.
6. Missing package content, inactive destinations, and unknown routes fail closed with explicit return and discard paths.
7. Navigation is temporary and in-memory only; no local persistence, account, profile, analytics, network request, model/provider call, permission, progress, reward, Chronicle record, or Longitudinal Intelligence result is created.
8. `apps/site` remains the canonical public institutional site and production `/prologue` owner.

## Route contract

| Route          | Purpose                                     | Authority |
| -------------- | ------------------------------------------- | --------- |
| `/`            | no-account public synthetic arrival         | none      |
| `/map`         | island orientation and availability         | none      |
| `/hearth`      | bundled narrative presentation              | none      |
| `/direct`      | direct essential-information presentation   | none      |
| `/unavailable` | explicit planned/inactive destination state | none      |
| `+not-found`   | unknown-route fail-closed return            | none      |

A route may identify which public package content was presented. It cannot establish subject identity, Chronicle truth, permission, completion, durable progress, reward, health result, authentic preference, or current personal applicability.

## Content and parity boundary

The Hearth and direct paths both consume the versioned 10.2 package. The narrative path uses the synthetic welcome and agency dialogue; the direct path uses the synthetic direct explanation and authority-boundary lesson.

Both paths disclose that accounts, private Chronicles, production Aster/model providers, analytics, permission grants, durable progress, rewards, and later Longitudinal Intelligence stages remain inactive. Essential comprehension requires no animation, imagery, audio, haptics, gestures, network access, model provider, or account.

Generic scene/dialogue rendering, quest cards, Wayfinder Orb behavior, deterministic interaction execution, and content-driven route generation remain assigned to Sprint 10.4.

## Validation target

The exact 10.3 checkpoint will be recorded after frozen installation, shell-contract validation, formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, tests, existing site release validation, browser/iOS/Android credential-free export, generated-state cleanup, CI, and DCO complete.

## Holdpoints preserved

Sprint 10.3 does not authorize:

- migration of `/prologue` or canonical public routes from `apps/site`;
- hosted preview, production deployment, indexing, public navigation, store submission, beta, or official release;
- production authentication, identity-provider selection, private Chronicle operation, or House of Keys runtime;
- production Aster, model/provider egress, analytics, profiling, advertising, or inferred preferences;
- generic content execution, durable rewards, personal progression, client-authoritative completion, or canonical unlocks;
- local or offline persistence assigned to later workstreams;
- LI-V1 through LI-V8, Sprint 11, or institutional Phase 0 exit; or
- independent accessibility, security, privacy, legal, affected-user, field, or device certification.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.4 on the same branch and PR.
