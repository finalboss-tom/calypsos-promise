# `@calypsos-promise/game`

`apps/game` is the universal browser, iOS, and Android application established during Sprint 10. It remains separate from `apps/site`, which continues to own the canonical public website, newsletter, and production `/prologue`.

## Current Sprint 10 boundary

- **10.1:** exact Expo Router toolchain and credential-free all-platform exports.
- **10.2:** versioned `@calypsos-promise/game-content` package containing public synthetic content only.
- **10.3:** no-account arrival, island map, Hearth narrative route, direct-information route, and fail-closed fallback navigation.
- **10.4:** generic package-driven zone and scene renderer, dialogue choices, quest card, Wayfinder Orb, and deterministic synthetic interaction.
- **10.5:** versioned synthetic session-state machine, explicit pending/failed/stale/corrected/superseded/conflict states, and executable denial of every client-authority claim.
- **10.6:** bundled public-content fallback plus versioned, expiring, clearable, migratable temporary PUBLIC_SYNTHETIC storage with corruption, conflict, quota, and adapter-failure handling.
- **10.7:** informational authentication-after-prologue boundary with no provider, no silent transfer, and discard-by-default temporary state.
- **10.8:** executable browser/iOS/Android accessibility matrix, contrast, reflow, modality alternatives, direct-path parity, and residual limitations.

The application implements only bounded offline storage for public packaged content and minimal temporary synthetic-session state. Production authentication, independent accessibility certification, release, and production-authority work remain separately gated. Sprint 10.7 implements only the informational account boundary, and Sprint 10.8 implements maintainer source and CI parity evidence.

## Route contract

| Route            | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `/`              | no-account public synthetic arrival                       |
| `/map`           | island map and availability orientation                   |
| `/accessibility` | modality and platform-parity evidence                     |
| `/account`       | post-prologue informational account boundary              |
| `/hearth`        | pre-authored narrative preview                            |
| `/direct`        | direct essential-information preview                      |
| `/play`          | generic presentation plus synthetic state/authority proof |
| `/unavailable`   | planned/inactive destination explanation                  |
| `+not-found`     | unknown-route fail-closed return                          |

Navigation, interaction, and session state remain temporary presentation evidence. They create no account, Chronicle record, permission, profile, analytics event, durable progress, reward, health claim, authentic preference, or Longitudinal Intelligence result.

## State and authority contract

The session-state model is versioned as `0.1.0` and supports these explicit states:

- pending;
- presented;
- failed;
- stale;
- corrected;
- superseded;
- conflict;
- deferred;
- refused; and
- discarded.

Only `presented` and `corrected` allow temporary dialogue interaction. Pending, failed, stale, superseded, and conflict states keep essential content readable while stopping interaction authority. Deferred, refused, and discarded states remain visible, non-punitive, restartable, and clearable.

Every client claim for scene completion, quest completion, reward, restoration, unlock, permission, Chronicle truth, personal progress, health result, authentic preference, or Longitudinal Intelligence is denied by executable rules. Unknown future authority claims also fail closed.

No transition uses device time, randomness, persistence, network state, provider output, analytics, hidden flags, or optimistic completion.

## Offline and resilience contract

The accepted public content package is bundled into browser, iOS, and Android output and remains the essential offline fallback. AsyncStorage `2.2.0` is an unencrypted replaceable adapter used only for:

- an optional `PUBLIC_SYNTHETIC` public-content cache with a 30-day expiry; and
- a minimal synthetic-session envelope with a 24-hour expiry.

The session envelope stores only state version, temporary revision, bounded status, current bundled scene ID, and bundled scene IDs shown. It does not store notices, arbitrary UI input, authority objects, accounts, credentials, private Chronicle data, permission, health data, analytics, research, payment, or provider output.

Expired, corrupt, stale, unsupported, oversized, or conflicting records fail closed. Low storage evicts the optional public cache once before falling back to memory-only session state. Public content remains available from the app bundle even if storage is cleared, unavailable, full, or replaced.

Restore is explicit, restart and discard clear the stored session, and every restored state receives the same immutable client-authority ceiling.

## Presentation contract

The `/play` route consumes the same versioned public synthetic package on browser, iOS, and Android.

It provides:

- zone and scene presentation from stable package identifiers;
- pre-authored dialogue and plain-language alternatives;
- every declared continue, defer, refuse, and exit choice;
- deterministic choice and session-state resolution without time, randomness, network, or provider state;
- a synthetic quest card that explicitly lacks completion and reward authority;
- a Wayfinder Orb that navigates presentation only;
- visible state correction, supersession, conflict, stale, pending, and failure behavior; and
- fail-closed behavior for missing or mismatched package content.

The renderer may identify which public content revision and scene were shown in the current React-memory session. It cannot establish personal truth, permission, authentic preference, canonical completion, durable progress, or a health result.

## Pinned compatibility

| Layer                          | Sprint 10 pin |
| ------------------------------ | ------------- |
| Node repository runtime        | 24            |
| Minimum supported Expo runtime | 22.13.0       |
| Package manager                | pnpm 10.13.1  |
| Expo                           | 57.0.10       |
| Expo Router                    | 57.0.10       |
| AsyncStorage                   | 2.2.0         |
| React Native                   | 0.86.2        |
| React / React DOM              | 19.2.3        |
| React Native Web               | 0.21.0        |
| React Native Worklets          | 0.10.1        |
| TypeScript for `apps/game`     | 6.0.3         |

The repository's Node 24 requirement is stricter than Expo SDK 57's Node minimum and is therefore the effective development and CI runtime.

## Commands

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm game:validate
pnpm game:web
```

Focused validation:

```bash
pnpm --filter @calypsos-promise/game validate:shell
pnpm --filter @calypsos-promise/game validate:presentation
pnpm --filter @calypsos-promise/game validate:state-authority
pnpm --filter @calypsos-promise/game validate:offline-resilience
pnpm --filter @calypsos-promise/game validate:authentication-boundary
pnpm --filter @calypsos-promise/game validate:accessibility-parity
```

Platform entry points:

```bash
pnpm --filter @calypsos-promise/game ios
pnpm --filter @calypsos-promise/game android
pnpm --filter @calypsos-promise/game web
```

Credential-free bundle validation:

```bash
pnpm --filter @calypsos-promise/game build
```

The all-platform export checks JavaScript and asset bundling for iOS, Android, and web. It does not generate native projects, sign binaries, create hosted build projects, deploy browser output, or submit to an app store.

## Security and data boundary

No environment variables, credentials, authentication, analytics, telemetry provider, model provider, private Chronicle data, House of Keys runtime, durable progression, or production Aster integration are required or permitted. Persistence is limited to the versioned PUBLIC_SYNTHETIC records defined by the 10.6 offline contract.

Run `validate:toolchain`, `validate:shell`, `validate:presentation`, `validate:state-authority`, `validate:offline-resilience`, `validate:authentication-boundary`, and `validate:accessibility-parity` to enforce these boundaries. Run `pnpm --filter @calypsos-promise/game clean` after local exports to remove `.expo/` and `dist/` generated state.
