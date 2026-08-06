# `@calypsos-promise/game-content`

Versioned public and explicitly synthetic playable content for the universal game shell.

## Authority boundary

This package can identify which public content revision, locale, provenance record, accessibility alternative, and compatibility contract an application presents. It cannot create or approve:

- private Chronicle truth or health data;
- identity, authentication, permission, consent, or House of Keys records;
- personal health, clinical, research, or Longitudinal Intelligence claims;
- durable progress, rewards, unlocks, or completion authority;
- analytics, profiling, advertising, inferred preferences, or provider defaults; or
- deployment, indexing, app-store distribution, or official release.

All included fixtures are `PUBLIC_SYNTHETIC`, usable without a network or model provider, and disposable without migration of temporary synthetic session state.

## Public interface

The root export provides:

- `GAME_CONTENT_MANIFEST` — package, schema, API, locale, platform, migration, and authority metadata;
- `GAME_CONTENT_ENTRIES` — recursively frozen content envelopes containing schema-bound content, provenance, accessibility alternatives, and compatibility;
- `getGameContentEntry` — stable-ID lookup with deterministic locale fallback;
- `listGameContentEntries` — narrow kind and locale filtering;
- `resolveGameContentLocale` — exact-locale-or-default resolution; and
- `isCompatibleGameContentVersion` — explicit migration compatibility.

The `@calypsos-promise/game-content/validate` export is a repository and CI validation surface. Application rendering does not need to import the validator or a model/provider runtime.

## Validation

```bash
pnpm --filter @calypsos-promise/game-content validate:package
pnpm --filter @calypsos-promise/game-content test
```

Validation binds every content item to `@calypsos-promise/content-schema`, verifies stable ID and locale keys, resolves internal references, requires browser/iOS/Android compatibility, enforces accessibility alternatives, rejects protected or provider-shaped fields, and fails closed on unknown migration versions.

## Migration rule

The initial `0.1.0` package uses replacement migration for public bundled content. Unknown versions are rejected and the synthetic session restarts. Temporary synthetic session state is never silently preserved or converted into personal authority.
