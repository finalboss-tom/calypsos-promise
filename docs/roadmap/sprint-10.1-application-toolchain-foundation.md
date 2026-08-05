# Sprint 10.1 — Application and toolchain foundation

**Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10  
**Parent:** Sprint 10 — universal application shell  
**Tracker:** issue #80  
**Sprint implementation:** draft PR #79

## Decision

Establish `apps/game` as a managed Expo Router application that can start and produce credential-free JavaScript bundles for browser, iOS, and Android from the existing pnpm/Turborepo workspace.

This implementation follows the accepted pre-Sprint 10 alignment review without expanding its authority. `apps/site` remains the canonical public website. Sprint 10.1 establishes application and toolchain capability only; it does not migrate routes or content, configure production deployment, introduce private data, or begin Sprint 11 runtime behavior.

## Sprint PR model

PR #79 is the single draft implementation pull request for workstreams 10.1 through 10.10.

Sprint 10.1 is a validated internal checkpoint, not a separate founding-steward acceptance or merge gate. The branch and PR continue directly into 10.2. The complete Sprint 10 package is presented once for acceptance and directed squash merge only after 10.10 final reconciliation and permanent validation.

## Compatibility baseline

- repository runtime: Node 24
- package manager: pnpm 10.13.1
- Expo: 57.0.10
- Expo Router: 57.0.10
- React Native: 0.86.2
- React and React DOM: 19.2.3
- React Native Web: 0.21.0
- React Native Worklets: 0.10.1
- game-local TypeScript: 6.0.3

The game package uses exact direct-dependency versions under the repository's `save-exact` and strict-peer-dependency policy. The repository's Node 24 baseline exceeds Expo SDK 57's Node 22.13 minimum. React Native Worklets remains on the Expo-compatible 0.10 line rather than the incompatible 0.11 line selected by unconstrained peer auto-installation.

## Implemented boundary

1. `apps/game` exists as a separate Expo Router workspace.
2. Browser, iOS, and Android entry points are named and independently exportable.
3. The all-platform build performs an unsigned, credential-free Expo export.
4. CI validates the toolchain contract and all-platform export, then verifies that generated state does not mutate tracked files.
5. No `ios/`, `android/`, `eas.json`, credentials, provider SDKs, analytics, authentication, private Chronicle data, or production deployment configuration are introduced.
6. `apps/site` remains unchanged and retains its existing build and release validation.

## Validated checkpoint evidence

Latest fully validated Sprint 10.1 checkpoint: `2a9fef52c128e79ccdd2a2872f893d44b9d3ff3c`

- CI 1367: success
- DCO 1465: success
- `pnpm install --frozen-lockfile`: success under Node 24 and pnpm 10.13.1
- `pnpm --filter @calypsos-promise/game validate:toolchain`: success
- `pnpm --filter @calypsos-promise/game typecheck`: success
- `pnpm --filter @calypsos-promise/game test`: success
- `pnpm --filter @calypsos-promise/game build`: browser, iOS, and Android exports succeeded without credentials
- repository formatting, documentation, policy, Longitudinal Intelligence coherence, economics, content, lint, typecheck, tests, and existing site release validation: success
- generated-state cleanup and no tracked build mutation: success

This evidence proves the named maintainer and CI implementation boundary only. It does not authorize deployment, mobile distribution, private capability, independent specialist certification, Sprint 11, a later Longitudinal Intelligence stage, or institutional Phase 0 exit.

## Holdpoints preserved

Sprint 10.1 does not authorize:

- moving `/prologue` or any canonical public route into `apps/game`
- public browser deployment or app-store distribution
- authentication, identity, private Chronicle access, or House of Keys runtime
- analytics, telemetry providers, model providers, production Aster integration, or durable progression
- shared game content or shell behavior assigned to Sprint 10.2 and later
- Longitudinal Intelligence stages beyond the already accepted LI-V0 baseline

## Continuation gate

The next workstream is Sprint 10.2 on the same branch and draft PR. No workstream-level acceptance or merge is requested. Final founding-steward acceptance applies once to the complete Sprint 10 candidate after workstream 10.10.
