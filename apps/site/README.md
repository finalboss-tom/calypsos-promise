# Calypso’s Promise public site

`apps/site` is the single owner of the Calypso’s Promise public website.

Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstreams 8.1 through 8.6 are complete; workstream 8.7 is next.

Controlling records:

- [Sprint 8 Execution Plan](../../docs/roadmap/sprint-8-execution-plan.md)
- [Public Website Foundation and Migration Boundary](../../docs/architecture/public-website-foundation-and-migration.md)
- [Workstream 8.6 Record](../../docs/roadmap/sprint-8-workstream-8-6-record.md)
- [Current Project Status](../../docs/roadmap/current-status.md)

## Current implementation

The application is a pinned Next.js App Router site with:

- Next.js `16.2.12` and React/React DOM `19.2.8`;
- exact type dependencies and monorepo lockfile evidence;
- one server-rendered root layout;
- a migrated cinematic homepage;
- source-backed `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` routes;
- shared direct navigation and an optional native Ogygia path reaching the same essential destinations;
- visible-on-focus skip links and semantic landmarks;
- controlled `live`, `experimental`, `planned`, and `long-horizon` evidence statuses;
- stable source-linked capability records;
- application-local design tokens and presentation styles;
- reduced-motion, reduced-data, higher-contrast, forced-colors, responsive, and image-failure foundations;
- nonce-bearing CSP and public security headers;
- metadata, sitemap, robots, not-found, and error presentation;
- deterministic source, route, authority, signup, and deployment validation; and
- disabled Git-triggered Vercel deployment.

The old custom Node page server, HTML-fragment runtime, legacy styles, browser script, signup-forwarding adapter, and parallel server tests remain removed rather than retained as a second website implementation.

## Current route behavior

| Route             | Current behavior                                                               |
| ----------------- | ------------------------------------------------------------------------------ |
| `/`               | cinematic homepage with Promise, status, and contribution paths                |
| `/promise`        | player Promise, rights, three loops, and meaningfully-free policy              |
| `/laws`           | frozen Seven Laws of Ogygia with direct canon source                           |
| `/how-it-works`   | planned short-session, player-confirmed, non-punitive experience               |
| `/consumer-first` | provider-respectful consumer-first and interoperability boundary               |
| `/aster`          | Aster proposal, confirmation, source, uncertainty, fallback, and non-authority |
| `/trust`          | source-backed rights, safeguards, open gates, and challenge routes             |
| `/forge`          | ten bounded local public/synthetic tools with visible evidence limits          |
| `/privacy`        | migration-period signup privacy explanation                                    |
| `/joined`         | migration-period no-submission confirmation                                    |
| `/api/join`       | `503 SIGNUP_MIGRATION_PAUSED`; no address accepted or forwarded                |
| `/robots.txt`     | App Router metadata route                                                      |
| `/sitemap.xml`    | metadata route including the accepted public page family                       |
| `/assets/*`       | repository-owned compatibility assets with revalidation caching                |

Workstream 8.8 owns the final signup preserve-or-retire decision.

## Source-backed guide family

### Seven Laws

`/laws` presents the exact frozen laws protecting agency, access control, privacy, provenance, evidence limits, correction and exit, and transparent public benefit. The frozen world-and-lore canon remains upstream authority.

### How It Works

`/how-it-works` labels the product experience as planned, not playable. It explains the accepted three-to-eight-minute daily route, voluntary replacement or refusal, deterministic authority, AI-assisted presentation, non-punitive return, and core paths that remain available without AI.

### Consumer first

`/consumer-first` explains why the person is the continuity layer while providers, institutions, standards, and systems remain valuable sources, destinations, and partners. It preserves standards at the edges, provider-independent Chronicle meaning at the core, source and conflict visibility, separate authority layers, and partnership without capture.

No provider, EHR, connector, clinical workflow, decision-support, or enterprise runtime is live.

### Aster and AI

`/aster` presents accepted pre-stable public contracts as experimental and production AI as planned. It explains the Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper roles; exact source and uncertainty requirements; proposal-confirmation-validation sequencing; untrusted-input and memory boundaries; and provider-independent fallback.

No production model, provider, private-data egress, memory, retrieval, queue, scheduler, workflow, or tool runtime is live.

### Trust Center

`/trust` organizes the frozen rights floor, public/private information boundary, truthful security status, authority separation, provider and connector status, funding doctrine, correction routes, public-versus-private reporting paths, and open production and independent-review gates.

It is a read-only derivative of canonical repository records. It is not security, privacy, accessibility, clinical, legal, financial, provider, or institutional certification.

### Open Forge

`/forge` exposes all ten accepted local public/synthetic tool identities, source provenance, bounded scopes, receipts, errors, compatibility and non-authority limits, nineteen open holdpoints, eighteen unresolved-work records, and the ordinary repository contribution path.

Forge remains local-only, public-and-synthetic-only, non-mutating, provider-independent, and non-authoritative. No remote, private, provider, connector, repository-writing, shell, network, or production-sandbox capability is live.

## Direct and narrative navigation

Both navigation modes expose:

- Home;
- The Promise;
- Seven Laws;
- How It Works;
- Consumer First;
- Aster and AI;
- Trust Center;
- Open Forge;
- capability status;
- signup privacy;
- the canonical repository status; and
- the public repository.

The optional narrative path uses native browser disclosure semantics. It does not require client JavaScript, animation, or story traversal, and it exposes no exclusive essential information.

## Capability-status model

The controlled site-local values are:

- `live` — publicly available and inspectable now;
- `experimental` — implemented for review but not an accepted production release;
- `planned` — accepted roadmap work not implemented yet; and
- `long-horizon` — future direction behind later evidence and safety gates.

This is presentation data, not independent product, provider, funding, clinical, permission, or governance truth.

## Accessibility and resilience foundations

The current implementation includes:

- skip links and visible focus;
- native keyboard behavior;
- assistive text for new-tab links;
- server-rendered essential information;
- no `use client` requirement for the accepted page family;
- reduced-motion removal of non-essential motion;
- reduced-data suppression of decorative imagery and gradients;
- non-image backgrounds for image failure;
- higher-contrast borders;
- forced-colors behavior; and
- responsive homepage, navigation, guide, status, loop, principle, and contribution layouts.

These are validated implementation foundations, not accessibility conformance certification or affected-user validation.

## What is not implemented

- roadmap, support, or canonical funding-transparency pages;
- final signup disposition;
- representative accessibility review or certification;
- defined route-level performance release evidence;
- preview deployment or official production cutover;
- accounts, authentication, real health-data capture, or private Living Chronicles;
- production Aster, private MCP, providers, connectors, clinical workflows, research, governance voting, or transactions; or
- independent accessibility, security, privacy, AI-safety, interoperability, legal, clinical, financial, or production review.

## Application boundary

`apps/site` may own public routes, server-rendered presentation, navigation, metadata, design tokens, validated public view models, build-time public-record adapters, public security headers, accessibility and performance budgets, and the separately gated signup surface.

It may not own Product Constitution, lore canon, security policy, funding doctrine, provider policy, clinical policy, legal interpretation, governance authority, Chronicle or House of Keys truth, Aster or Forge authority, accounts, private data, production providers or connectors, a second status registry or funding ledger, an unevidenced CMS or remote content service, or Sprint 9 game state.

## Security and caching

The site preserves nonce CSP, frame denial, content-type sniffing prevention, strict-origin referrer behavior, camera/geolocation/microphone/payment denial, cross-origin opener policy, disabled `X-Powered-By`, `no-store` API caching, and no private signup configuration in source.

Framework build assets use generated content-addressed paths. Repository-owned `/assets/*` URLs use `public, max-age=0, must-revalidate`.

These are repository implementation controls, not deployed-environment or independent security certification.

## Signup state

The site does not accept or forward email addresses. `POST /api/join` returns `503 SIGNUP_MIGRATION_PAUSED`.

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

Workstream 8.4 final head `c54c377ad072f745772ccf3bbbcdabf1b8193cc3` passed CI 1021 and DCO 1100.

Workstream 8.5 focused candidate `16fe324c508719734b8923a8f99b59fb16712726` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

Workstream 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

This evidence does not prove preview deployment, official release, deployed headers or caching, accessibility conformance, performance targets, provider integration, clinical safety, production AI, or production readiness.
