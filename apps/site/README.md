# Calypso’s Promise public site

`apps/site` is the single owner of the Calypso’s Promise public website.

Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstreams 8.1 through 8.4 are complete; workstream 8.5 is next.

Controlling records:

- [Sprint 8 Execution Plan](../../docs/roadmap/sprint-8-execution-plan.md)
- [Public Website Foundation and Migration Boundary](../../docs/architecture/public-website-foundation-and-migration.md)
- [Workstream 8.4 Record](../../docs/roadmap/sprint-8-workstream-8-4-record.md)
- [Current Project Status](../../docs/roadmap/current-status.md)

## Current implementation

The application is a pinned Next.js App Router site with a migrated cinematic homepage, a dedicated Promise route, and validated server-rendered navigation, status, and accessibility foundations:

- Next.js `16.2.12`;
- React and React DOM `19.2.8`;
- exact React type dependencies and monorepo lockfile evidence;
- one server-rendered root layout;
- migrated cinematic homepage preserving the Ogygia direction;
- dedicated source-backed `/promise` route;
- shared direct navigation;
- optional native `details` and `summary` Ogygia path;
- visible-on-focus skip links and semantic landmarks;
- controlled `live`, `experimental`, `planned`, and `long-horizon` capability statuses;
- stable capability IDs and canonical source links;
- application-local design tokens and presentation styles;
- reduced-motion, reduced-data, higher-contrast, forced-colors, responsive, and image-failure foundations;
- lazy decorative hero imagery;
- nonce-bearing content-security policy through `src/proxy.ts`;
- public security headers in `next.config.mjs`;
- metadata, sitemap, robots, not-found, and error presentation;
- deterministic shell validation and focused tests; and
- Git-triggered Vercel deployment still disabled.

The old custom Node page server, HTML-fragment runtime, legacy styles, browser script, signup-forwarding adapter, and parallel server tests remain removed rather than retained as a second website implementation.

## Current route behavior

| Route          | Current behavior                                                                |
| -------------- | ------------------------------------------------------------------------------- |
| `/`            | migrated cinematic homepage with Promise, status, and contribution paths       |
| `/promise`     | source-backed player Promise, rights, three loops, and meaningfully-free policy |
| `/privacy`     | migration-period signup privacy explanation                                     |
| `/joined`      | migration-period no-submission confirmation                                     |
| `/api/join`    | `503 SIGNUP_MIGRATION_PAUSED`; no address accepted or forwarded                 |
| `/robots.txt`  | App Router metadata route                                                       |
| `/sitemap.xml` | App Router metadata route including `/promise`                                  |
| `/assets/*`    | repository-owned compatibility assets with revalidation caching                 |

The compatibility route names remain deliberate contracts. Workstream 8.8 owns the final signup preserve-or-retire decision.

## Homepage and Promise migration

The homepage is derived from the frozen Product Constitution and the accepted Track 0A visual direction.

It provides:

- the player promise: **Build your Living Chronicle. Improve your health. Keep the key.**;
- a plain-language explanation of the product and planned Ogygia game;
- visually distinct experimental website, live repository, and planned-game claims;
- the three connected loops for building the Chronicle, receiving personal value, and separately choosing collective or compensated use;
- the public-software/private-data boundary;
- private-by-default, meaningful-refusal, player-confirmation, and correction-and-exit principles;
- the canonical capability status grid; and
- ordinary contribution paths through the public repository and issue tracker.

The `/promise` route provides the fuller player-rights explanation, canonical metadata, sitemap inclusion, and a direct source link to the frozen Product Constitution.

The Product Constitution remains upstream authority. Website presentation cannot amend it.

## Direct and narrative navigation

The shared direct-navigation registry exposes conventional links to:

- the public homepage;
- the Promise;
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
- no `use client` requirement for homepage, Promise, navigation, or status understanding;
- reduced-motion removal of smooth scrolling and non-essential motion;
- reduced-data suppression of decorative imagery and gradients;
- non-image backgrounds so image failure does not hide essential content;
- higher-contrast border treatment;
- forced-colors removal of decorative imagery and overlays; and
- responsive homepage, navigation, status, loop, principle, and contribution layouts.

These are validated implementation foundations, not accessibility conformance certification or affected-user validation.

## What is not implemented

- Seven Laws, How It Works, consumer-first, interoperability, or Aster/AI pages;
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

The site does not accept or forward email addresses.

`POST /api/join` returns `503 SIGNUP_MIGRATION_PAUSED`. No signup webhook URL, token, provider, retention behavior, or private endpoint is included.

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

Workstream 8.3 final head `9174d713755220906144beef80bec6b43932f459` passed CI 994 and DCO 1072.

Workstream 8.4 focused build commit `790bf9a79a76c28451fefcf959d92aefa59b5d03` passed the production build, site lint, typecheck, and focused tests through a self-removing workflow.

The generated TypeScript cache and incremental setting were removed. Clean source-only head `dc5986d19c691ba4dea95040be5bc5aa34a8d1b2` passed CI 1010 and DCO 1089.

This evidence does not prove preview deployment, official release, deployed headers or caching, accessibility conformance, performance targets, or production readiness.
