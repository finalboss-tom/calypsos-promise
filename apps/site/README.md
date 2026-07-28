# Calypso’s Promise public site

`apps/site` is the single owner of the Calypso’s Promise public website.

Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstreams 8.1 and 8.2 are complete; workstream 8.3 is next.

Controlling records:

- [Sprint 8 Execution Plan](../../docs/roadmap/sprint-8-execution-plan.md)
- [Public Website Foundation and Migration Boundary](../../docs/architecture/public-website-foundation-and-migration.md)
- [Workstream 8.2 Record](../../docs/roadmap/sprint-8-workstream-8-2-record.md)
- [Current Project Status](../../docs/roadmap/current-status.md)

## Current implementation

The application is a pinned Next.js App Router compatibility shell:

- Next.js `16.2.12`;
- React and React DOM `19.2.8`;
- exact React type dependencies and monorepo lockfile evidence;
- server-rendered root layout and compatibility homepage;
- application-local design tokens and global styling;
- nonce-bearing content-security policy through `src/proxy.ts`;
- public security headers in `next.config.mjs`;
- metadata, sitemap, robots, not-found, and error presentation;
- repository-owned SVG and WebP assets;
- shell validation and focused tests; and
- Git-triggered Vercel deployment still disabled.

The old custom Node page server, HTML-fragment runtime, legacy styles, browser script, signup-forwarding adapter, and server tests have been removed rather than retained as a second website implementation.

## Current route behavior

| Route | Current behavior |
| --- | --- |
| `/` | server-rendered compatibility homepage preserving the Ogygia visual direction |
| `/privacy` | migration-period signup privacy explanation |
| `/joined` | migration-period no-submission confirmation |
| `/api/join` | `503 SIGNUP_MIGRATION_PAUSED`; no address accepted or forwarded |
| `/robots.txt` | App Router metadata route |
| `/sitemap.xml` | App Router metadata route |
| `/assets/*` | repository-owned compatibility assets with revalidation caching |

The route names remain deliberate compatibility contracts. Workstream 8.8 owns the final signup preserve-or-retire decision.

## What is implemented

- one App Router application and one website owner;
- server-rendered compatibility content;
- skip link, root landmarks, basic header/footer, and direct repository/status links;
- canonical, Open Graph, Twitter, icon, viewport, and theme metadata;
- `next/image` for shell imagery;
- CSP nonce propagation and public security headers;
- mutable cache behavior for public compatibility assets;
- no-store API behavior;
- paused signup without intake, forwarding, or private configuration;
- not-found and error presentation;
- exact dependency validation;
- route and shell validation;
- focused Node tests; and
- successful production build, lint, typecheck, and tests.

## What is not implemented

- final direct and narrative navigation parity;
- reusable capability-status components;
- final homepage and Promise migration;
- Seven Laws, How It Works, consumer-first, or Aster/AI pages;
- Trust Center or Open Forge;
- roadmap, capability, support, or canonical funding views;
- final signup disposition;
- defined accessibility or performance release evidence;
- preview deployment or official production cutover;
- accounts, authentication, real health-data capture, or private Living Chronicles;
- production Aster, private MCP, providers, connectors, clinical workflows, research, governance voting, or transactions; or
- independent accessibility, security, privacy, legal, clinical, financial, or production review.

## Application boundary

`apps/site` may own:

- public routes and route composition;
- server-rendered page and layout presentation;
- repository-owned design tokens and website components;
- metadata, canonical URLs, sitemap, robots, not-found, and error presentation;
- public navigation and optional narrative entry;
- read-only capability, roadmap, Trust Center, Open Forge, and economics views;
- build-time ingestion of approved public repository records;
- public security headers and deployment configuration;
- accessibility and performance budgets; and
- the separately gated signup surface.

It may not own Product Constitution, lore canon, security policy, funding doctrine, provider policy, clinical policy, legal interpretation, governance authority, Chronicle or House of Keys truth, Aster or Forge authority, accounts, private data, production providers or connectors, a second status registry or funding ledger, an unevidenced CMS or remote content service, or Sprint 9 game state.

## Security and caching

The shell preserves or strengthens:

- nonce-bearing CSP;
- frame denial;
- content-type sniffing prevention;
- strict-origin referrer behavior;
- camera, geolocation, microphone, and payment denial;
- cross-origin opener policy;
- disabled `X-Powered-By`;
- `no-store` API caching; and
- no private signup configuration in application source.

Framework build assets use generated content-addressed paths. Repository-owned `/assets/*` compatibility URLs use `public, max-age=0, must-revalidate`, replacing Track 0A’s broad immutable caching.

These are repository implementation controls, not deployed-environment or independent security certification.

## Signup state

The compatibility shell does not accept or forward email addresses.

`POST /api/join` returns `503 SIGNUP_MIGRATION_PAUSED`. No signup webhook URL, token, provider, retention behavior, or private endpoint is included in the shell.

Workstream 8.8 must either preserve signup under accepted provider, purpose, retention, unsubscribe, correction, deletion, proxy-trust, abuse-control, incident, privacy, and rollback evidence, or retire the surface deliberately.

## Run locally

```bash
pnpm --filter @calypsos-promise/site dev
```

Open `http://localhost:3000`.

For the production build locally:

```bash
pnpm --filter @calypsos-promise/site build
pnpm --filter @calypsos-promise/site start
```

## Validate

```bash
pnpm --filter @calypsos-promise/site build
pnpm --filter @calypsos-promise/site lint
pnpm --filter @calypsos-promise/site typecheck
pnpm --filter @calypsos-promise/site test
```

Run `pnpm check` from the repository root before review.

## Evidence

Workstream 8.2 implementation head `8c757e9482e616db7c86689a1d1d9c99d70ca6cd` passed CI run 957 and DCO Attestation run 1034.

This proves the repository and shell checks at that head. It does not prove preview deployment, official release, deployed headers or caching, accessibility conformance, performance targets, or production readiness.
