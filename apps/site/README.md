# Calypso’s Promise public site

`apps/site` is the single owner of the Calypso’s Promise public website.

Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstreams 8.1 through 8.3 are complete; workstream 8.4 is next.

Controlling records:

- [Sprint 8 Execution Plan](../../docs/roadmap/sprint-8-execution-plan.md)
- [Public Website Foundation and Migration Boundary](../../docs/architecture/public-website-foundation-and-migration.md)
- [Workstream 8.3 Record](../../docs/roadmap/sprint-8-workstream-8-3-record.md)
- [Current Project Status](../../docs/roadmap/current-status.md)

## Current implementation

The application is a pinned Next.js App Router compatibility shell with validated server-rendered navigation and status foundations:

- Next.js `16.2.12`;
- React and React DOM `19.2.8`;
- exact React type dependencies and monorepo lockfile evidence;
- server-rendered root layout and compatibility homepage;
- shared direct navigation;
- an optional native `details` and `summary` Ogygia path;
- visible-on-focus skip links for primary navigation and main content;
- semantic `header`, `nav`, `main`, and `footer` landmarks;
- controlled `live`, `experimental`, `planned`, and `long-horizon` capability statuses;
- stable capability IDs and canonical source links;
- application-local design tokens and global styling;
- reduced-motion, reduced-data, higher-contrast, forced-colors, responsive, and image-failure foundations;
- lazy decorative hero imagery;
- nonce-bearing content-security policy through `src/proxy.ts`;
- public security headers in `next.config.mjs`;
- metadata, sitemap, robots, not-found, and error presentation;
- repository-owned SVG and WebP assets;
- deterministic shell validation and focused tests; and
- Git-triggered Vercel deployment still disabled.

The old custom Node page server, HTML-fragment runtime, legacy styles, browser script, signup-forwarding adapter, and server tests remain removed rather than retained as a second website implementation.

## Current route behavior

| Route          | Current behavior                                                              |
| -------------- | ----------------------------------------------------------------------------- |
| `/`            | server-rendered compatibility homepage with shared navigation and status data |
| `/privacy`     | migration-period signup privacy explanation                                   |
| `/joined`      | migration-period no-submission confirmation                                   |
| `/api/join`    | `503 SIGNUP_MIGRATION_PAUSED`; no address accepted or forwarded               |
| `/robots.txt`  | App Router metadata route                                                     |
| `/sitemap.xml` | App Router metadata route                                                     |
| `/assets/*`    | repository-owned compatibility assets with revalidation caching               |

The route names remain deliberate compatibility contracts. Workstream 8.8 owns the final signup preserve-or-retire decision.

## Direct and narrative navigation

The shared direct-navigation registry exposes conventional links to:

- the public homepage;
- current capability status;
- signup privacy;
- the canonical repository status record; and
- the public GitHub repository.

The optional Ogygia path links to the same essential destinations with narrative labels. It uses native browser disclosure semantics and does not require a client component, animation, or story traversal.

No essential information is exclusive to the narrative path.

## Capability-status model

The controlled site-local values are:

- `live` — publicly available and inspectable now;
- `experimental` — implemented for review but not an accepted production release;
- `planned` — accepted roadmap work not implemented yet; and
- `long-horizon` — future direction behind later evidence and safety gates.

Each capability record contains a stable ID, public label, controlled status, concise summary, canonical source URL, and source-link label.

This is presentation data, not independent product, provider, funding, clinical, permission, or governance truth.

## Accessibility and resilience foundations

The current implementation includes:

- skip links for navigation and content;
- visible focus for interactive and programmatic focus targets;
- native keyboard behavior for links, `details`, and `summary`;
- assistive text for new-tab links;
- server-rendered essential information;
- no `use client` requirement for navigation or status understanding;
- reduced-motion removal of smooth scrolling and non-essential motion;
- reduced-data suppression of decorative imagery and gradients;
- non-image backgrounds so image failure does not hide essential content;
- higher-contrast border treatment;
- forced-colors removal of decorative imagery and overlays; and
- responsive navigation and status layouts.

These are validated implementation foundations, not accessibility conformance certification or affected-user validation.

## What is not implemented

- final homepage and Promise migration;
- final route architecture for later Sprint 8 pages;
- Seven Laws, How It Works, consumer-first, or Aster/AI pages;
- Trust Center or Open Forge;
- roadmap, support, or canonical funding-transparency pages;
- final signup disposition;
- representative accessibility review or certification;
- defined performance release evidence;
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

Framework build assets use generated content-addressed paths. Repository-owned `/assets/*` compatibility URLs use `public, max-age=0, must-revalidate`.

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

Workstream 8.2 final head `2e9170efebd68562e0dbf8775815066e2a042e4e` passed CI 968 and DCO 1045.

Workstream 8.3 validated reconciled head `2ff9fd966cd7d00bf846ed63147584cadd437d6b` passed formatting, documentation links, repository policy, economics validation, content validation, lint, typecheck, tests, CI 986, and DCO 1064.

This evidence does not prove preview deployment, official release, deployed headers or caching, accessibility conformance, performance targets, or production readiness.
