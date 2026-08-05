# `@calypsos-promise/game`

`apps/game` is the universal browser, iOS, and Android application established during Sprint 10. It remains separate from `apps/site`, which continues to own the canonical public website, newsletter, and production `/prologue`.

## Current Sprint 10 boundary

- **10.1:** exact Expo Router toolchain and credential-free all-platform exports.
- **10.2:** versioned `@calypsos-promise/game-content` package containing public synthetic content only.
- **10.3:** no-account arrival, island map, Hearth narrative route, direct-information route, and fail-closed fallback navigation.

The application does not yet implement the generic scene, dialogue, quest, state, offline, authentication, release, or production-authority work assigned to later Sprint 10 workstreams.

## Route contract

| Route          | Purpose                                   |
| -------------- | ----------------------------------------- |
| `/`            | no-account public synthetic arrival       |
| `/map`         | island map and availability orientation   |
| `/hearth`      | pre-authored narrative presentation       |
| `/direct`      | direct essential-information presentation |
| `/unavailable` | planned/inactive destination explanation  |
| `+not-found`   | unknown-route fail-closed return          |

Navigation is temporary presentation state. It creates no account, Chronicle record, permission, profile, analytics event, durable progress, reward, health claim, or Longitudinal Intelligence result.

## Pinned compatibility

| Layer                          | Sprint 10 pin |
| ------------------------------ | ------------- |
| Node repository runtime        | 24            |
| Minimum supported Expo runtime | 22.13.0       |
| Package manager                | pnpm 10.13.1  |
| Expo                           | 57.0.10       |
| Expo Router                    | 57.0.10       |
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

Focused shell validation:

```bash
pnpm --filter @calypsos-promise/game validate:shell
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

No environment variables, credentials, persistence, authentication, analytics, telemetry provider, model provider, private Chronicle data, House of Keys runtime, durable progression, or production Aster integration are required or permitted.

Run `pnpm --filter @calypsos-promise/game validate:toolchain` and `pnpm --filter @calypsos-promise/game validate:shell` to enforce these boundaries. Run `pnpm --filter @calypsos-promise/game clean` after local exports to remove `.expo/` and `dist/` generated state.
