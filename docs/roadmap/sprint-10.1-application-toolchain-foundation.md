# Sprint 10.1 — Application and toolchain foundation

**Status:** IMPLEMENTED — PENDING FOUNDING-STEWARD ACCEPTANCE  
**Parent:** Sprint 10 — universal application shell  
**Issue:** #75

## Decision

Establish `apps/game` as a managed Expo Router application that can start and produce credential-free JavaScript bundles for browser, iOS, and Android from the existing pnpm/Turborepo workspace.

This implementation accepts the pre-Sprint 10 alignment review without expanding its authority. `apps/site` remains the canonical public website. Sprint 10.1 establishes application and toolchain capability only; it does not migrate routes or content, configure production deployment, introduce private data, or begin Sprint 11 runtime behavior.

## Compatibility baseline

- repository runtime: Node 24
- package manager: pnpm 10.13.1
- Expo: 57.0.10
- Expo Router: 57.0.10
- React Native: 0.86.2
- React and React DOM: 19.2.3
- React Native Web: 0.21.0
- game-local TypeScript: 6.0.3

The game package uses exact direct-dependency versions under the repository's `save-exact` and strict-peer-dependency policy. The repository's Node 24 baseline exceeds Expo SDK 57's Node 22.13 minimum.

## Implemented boundary

1. `apps/game` exists as a separate Expo Router workspace.
2. Browser, iOS, and Android entry points are named and independently exportable.
3. The all-platform build performs an unsigned, credential-free Expo export.
4. CI validates the toolchain contract and all-platform export, then verifies that generated state does not mutate tracked files.
5. No `ios/`, `android/`, `eas.json`, credentials, provider SDKs, analytics, authentication, private Chronicle data, or production deployment configuration are introduced.
6. `apps/site` remains unchanged and retains its existing build and release validation.

## Acceptance evidence

Required before acceptance:

- `pnpm install --frozen-lockfile`
- `pnpm --filter @calypsos-promise/game validate:toolchain`
- `pnpm --filter @calypsos-promise/game typecheck`
- `pnpm --filter @calypsos-promise/game test`
- `pnpm --filter @calypsos-promise/game build`
- repository formatting, policy, lint, typecheck, and test checks
- clean tracked state after generated artifacts are removed

## Holdpoints preserved

Sprint 10.1 does not authorize:

- moving `/prologue` or any canonical public route into `apps/game`
- public browser deployment or app-store distribution
- authentication, identity, private Chronicle access, or House of Keys runtime
- analytics, telemetry providers, model providers, production Aster integration, or durable progression
- shared game content or shell behavior assigned to Sprint 10.2 and later
- Longitudinal Intelligence stages beyond the already accepted LI-V0 baseline
