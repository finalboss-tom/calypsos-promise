# Calypso’s Promise public site

`apps/site` is the single owner of the Calypso’s Promise public website.

Sprint 8 is accepted, merged, deployed, and closed at its bounded evidence level. The current repository work is post-Sprint 8 reconciliation, Phase 0 newsletter gate #63, and pre-Sprint 9 alignment issue #64.

Controlling records:

- [Current Project Status](../../docs/roadmap/current-status.md)
- [Post-Sprint 8 Reconciliation and Sprint 9 Preparation](../../docs/roadmap/post-sprint-8-reconciliation-and-sprint-9-preparation.md)
- [Sprint 8 Completion Record](../../docs/roadmap/sprint-8-completion-record.md)
- [Public Website Foundation and Migration Boundary](../../docs/architecture/public-website-foundation-and-migration.md)
- [Release, Rollback, and Sprint 9 Handoff](../../docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md)
- [Newsletter Gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63)
- [Pre-Sprint 9 Gate #64](https://github.com/finalboss-tom/calypsos-promise/issues/64)

## Current implementation

The application is a pinned Next.js App Router site with:

- Next.js `16.2.12` and React/React DOM `19.2.8`;
- one server-rendered root layout and public page family;
- a cinematic homepage;
- source-backed `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, `/forge`, `/roadmap`, `/support`, and `/funding` routes;
- shared direct navigation and an optional Ogygia path reaching the same essential destinations;
- visible-on-focus skip links, semantic landmarks, keyboard and focus foundations;
- controlled `live`, `experimental`, `planned`, and `long-horizon` evidence statuses;
- application-local design tokens and styles;
- reduced-motion, reduced-data, contrast, forced-colors, responsive, and image-failure behavior;
- nonce-bearing CSP and public security headers;
- metadata, sitemap, robots, not-found, and error presentation;
- a bounded Phase 0 newsletter form and server-only webhook adapter;
- permanent source, route, authority, newsletter, security, metadata, and budget validation;
- isolated local production-preview CI with machine-readable evidence; and
- disabled Git-triggered Vercel deployment.

The old custom Node page server and HTML-fragment runtime remain removed. The previous newsletter forwarding contract is restored inside the Next.js route rather than reintroducing a second server implementation.

## Deployment state

Sprint 8 was squash merged through PR #61 as `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`.

Production deployment `dpl_3V2e76y1fwrR19j1BzUFpo9U9kjp` reached `READY` on the existing Vercel project and serves the canonical domains. The repository retains `framework: "nextjs"` and `git.deploymentEnabled: false` through `a5146237356f58e8d28343e90918b70a418bccbb`.

A normal commit does not automatically create a production release.

## Route behavior

| Route             | Current behavior |
| ----------------- | ---------------- |
| `/`               | live cinematic homepage, status, Promise, newsletter, and contribution paths |
| `/promise`        | player Promise, rights, three loops, and meaningfully-free policy |
| `/laws`           | frozen Seven Laws with direct canon source |
| `/how-it-works`   | planned short-session, player-confirmed, non-punitive experience |
| `/consumer-first` | provider-respectful consumer-first and interoperability boundary |
| `/aster`          | Aster proposal, confirmation, source, uncertainty, fallback, and non-authority |
| `/trust`          | source-backed rights, safeguards, open gates, and challenge routes |
| `/forge`          | ten bounded local public/synthetic tools with visible evidence limits |
| `/roadmap`        | evidence-based capability status and source-linked roadmap gates |
| `/support`        | public-safe contribution paths and protected-information routing |
| `/funding`        | canonical public funding registers, empty states, and anti-capture rules |
| `/privacy`        | Phase 0 newsletter data, provider, retention, deletion, incident, and rollback notice |
| `/joined`         | no-index newsletter delivery confirmation |
| `/api/join`       | validates and forwards bounded email-update consent through the existing server webhook |
| `/robots.txt`     | App Router metadata route |
| `/sitemap.xml`    | accepted public page family; excludes `/joined` and API routes |
| `/assets/*`       | repository-owned assets with revalidation caching |

## Newsletter boundary

The founding steward selected **Path A — preserve and activate** under issue #63 for the period leading to Phase 0 completion.

The route reads server-only configuration:

- `SIGNUP_WEBHOOK_URL` — required HTTPS destination in production;
- `SIGNUP_WEBHOOK_TOKEN` — optional bearer token.

The configured destination is the existing private Google Apps Script webhook and private Google Sheet.

Accepted data is limited to:

- normalized email address;
- affirmative consent;
- privacy-policy version;
- narrow project-update purpose;
- website source identifier; and
- submission time.

Controls include:

- explicit consent;
- a hidden bot honeypot;
- email validation and normalization;
- a 16 KiB body limit;
- best-effort five-attempt, fifteen-minute per-source throttling;
- HTTPS-only forwarding except local loopback validation;
- an eight-second provider timeout;
- no-store responses and no cookies;
- public-safe errors without subscriber logging; and
- source and preview tests that never contact the real provider.

The in-memory throttle is not distributed or durable. Manual unsubscribe, correction, access, and deletion handling remains required. The temporary Google provider route must be reviewed at Phase 0 exit or before migration.

The newsletter cannot create an account, Chronicle identity, game registration, research consent, health-data intake, provider lead, donation, governance role, advertising profile, or gameplay requirement.

## Sprint 9 boundary

Issue #64 is the active pre-Sprint 9 alignment gate. Sprint 9 implementation has not started.

The review must settle application ownership, routes, explicitly synthetic data, temporary storage and teardown, deterministic state and First Lantern completion, Aster and manual fallback, refusal and exit, accessibility, security, performance, analytics, rollback, deployment, and completion evidence.

Newsletter identity may not be reused as prologue identity or account conversion. The entire public synthetic prologue must work without email, an account, real health data, or a production model provider.

## Capability-status model

The controlled site-local values are:

- `live` — publicly available and inspectable now;
- `experimental` — available at a bounded evidence level with explicit unresolved limitations;
- `planned` — accepted roadmap work not implemented yet; and
- `long-horizon` — future direction behind later evidence and safety gates.

This is presentation data, not independent product, provider, funding, clinical, permission, newsletter, or governance truth.

## Application boundary

`apps/site` may own public routes, server-rendered presentation, navigation, metadata, design tokens, validated public view models, build-time public-record adapters, public security headers, accessibility and performance budgets, and the separately gated newsletter adapter.

It may not own Product Constitution, lore canon, security policy, funding doctrine, provider policy, clinical policy, legal interpretation, governance authority, Chronicle or House of Keys truth, Aster or Forge authority, accounts, private health data, production providers or connectors, a second status registry or funding ledger, an unevidenced CMS, or Sprint 9 game state.

## Run locally

```bash
pnpm --filter @calypsos-promise/site dev
```

Open `http://localhost:3000`.

Without `SIGNUP_WEBHOOK_URL`, valid newsletter delivery fails closed with `SIGNUP_NOT_CONFIGURED`. Invalid and honeypot requests can still be validated locally without contacting a provider.

For a production build:

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
# With a production server running on 127.0.0.1:3000:
pnpm --filter @calypsos-promise/site validate:preview
```

Run `pnpm check` from the repository root before review.

## Evidence limits

The accepted Sprint 8 and deployed website evidence does not establish independent accessibility certification, assistive-technology or affected-user validation, field performance, production-health-data security, provider integration, clinical safety, production AI, legal sufficiency, or institutional Phase 0 completion.

The newsletter implementation is not accepted as complete until issue #63 records merged production deployment, end-to-end delivery, public-copy agreement, rollback verification, limitations, and explicit founding-steward acceptance.
