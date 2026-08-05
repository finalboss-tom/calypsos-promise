# `@calypsos-promise/game`

`apps/game` is the universal application shell established by Sprint 10.1. It is deliberately small: one Expo Router application, one compatibility contract, and credential-free validation for browser, iOS, and Android.

## Ownership boundary

- `apps/site` remains the canonical public website and retains all current routes, indexing, authority, and deployment ownership.
- `apps/game` is a separate public/synthetic shell. Sprint 10.1 does not move `/prologue`, create a production route, or configure public deployment.
- Shared game content begins in Sprint 10.2. No shared UI package is introduced here.

## Pinned compatibility

| Layer | Sprint 10.1 pin |
| --- | --- |
| Node repository runtime | 24 |
| Minimum supported Expo runtime | 22.13.0 |
| Package manager | pnpm 10.13.1 |
| Expo | 57.0.10 |
| Expo Router | 57.0.10 |
| React Native | 0.86.2 |
| React / React DOM | 19.2.3 |
| React Native Web | 0.21.0 |
| TypeScript for `apps/game` | 6.0.3 |

The repository's Node 24 requirement is stricter than Expo SDK 57's Node minimum and is therefore the effective development and CI runtime.

## Commands

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm game:validate
pnpm game:web
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

The all-platform export checks JavaScript and asset bundling for iOS, Android, and web. It does not generate native projects, sign binaries, create hosted build projects, deploy the browser output, or submit to an app store.

## Platform boundaries

| Platform | Included in 10.1 | Explicitly deferred |
| --- | --- | --- |
| Browser | Local Metro startup and static export | Production route, hosting, indexing, canonical-site migration |
| iOS | Expo local entry point and unsigned bundle export | Generated `ios/`, signing, credentials, TestFlight/App Store submission |
| Android | Expo local entry point and unsigned bundle export | Generated `android/`, signing, credentials, Play Console submission |

## Security and data boundary

No environment variables, credentials, authentication, analytics, telemetry provider, model provider, private Chronicle data, House of Keys runtime, durable progression, or production Aster integration are required or permitted in this foundation.

Run `pnpm --filter @calypsos-promise/game validate:toolchain` to enforce these boundaries. Run `pnpm --filter @calypsos-promise/game clean` after local exports to remove `.expo/` and `dist/` generated state.
