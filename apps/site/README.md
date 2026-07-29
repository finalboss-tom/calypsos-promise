# Calypso’s Promise public site

`apps/site` is the single owner of the live Calypso’s Promise public website.

Sprint 8 — Public Website Foundation is accepted, merged, and deployed. Current work reconciles the production state, activates the bounded Phase 0 newsletter, and prepares the mandatory pre-Sprint 9 alignment review.

Controlling records:

- [Current Project Status](../../docs/roadmap/current-status.md)
- [Post-Sprint 8 Reconciliation and Sprint 9 Preparation](../../docs/roadmap/post-sprint-8-reconciliation-and-sprint-9-preparation.md)
- [Sprint 8 Completion Record](../../docs/roadmap/sprint-8-completion-record.md)
- [Release, Rollback, and Sprint 9 Handoff](../../docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md)
- [Public Website Foundation and Migration Boundary](../../docs/architecture/public-website-foundation-and-migration.md)
- [Phase 0 Newsletter Gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63)
- [Pre-Sprint 9 Alignment Gate #64](https://github.com/finalboss-tom/calypsos-promise/issues/64)

## Current implementation

The application is a pinned Next.js App Router site with:

- Next.js `16.2.12` and React/React DOM `19.2.8`;
- one server-rendered root layout and accepted public route family;
- a shared Founding Expedition newsletter opt-in rendered exactly once on every public route;
- source-backed Promise, laws, experience, consumer-first, Aster, Trust Center, Open Forge, roadmap, support, and funding-transparency views;
- direct navigation and an optional narrative path reaching the same essential destinations;
- visible-on-focus skip links, semantic landmarks, keyboard operation, and resilient presentation foundations;
- nonce-bearing CSP and public security headers;
- metadata, sitemap, robots, not-found, and error presentation;
- permanent source, route, authority, newsletter, security, metadata, and transfer-budget validation;
- isolated local production-preview CI with machine-readable evidence; and
- disabled Git-triggered Vercel deployment.

## Newsletter boundary

The shared opt-in reuses the existing server-only `SIGNUP_WEBHOOK_URL` and optional `SIGNUP_WEBHOOK_TOKEN` connection to the private Google Apps Script webhook and private Google Sheet.

It accepts only an email address plus explicit consent and cannot create an account, game identity, Chronicle record, research enrollment, provider lead, donation, governance role, advertising profile, or gameplay requirement.

Every public page renders the same component from `src/app/layout.tsx`, preventing route-specific drift and duplicate forms. The validator requires exactly one opt-in on every accepted route.

Real subscriber addresses, webhook URLs, credentials, provider records, and protected incident evidence remain outside the public repository and CI artifacts.

## Release boundary

`vercel.json` explicitly selects the Next.js framework and keeps Git-triggered deployment disabled. Production releases require a separate attributable action after merge.

## Sprint 9 boundary

Sprint 9 remains planned and not started. Issue #64 must resolve public synthetic data, temporary state, Aster fallback, deterministic completion, refusal and exit, accessibility, security, performance, publication, rollback, deployment, and completion evidence before implementation begins.

## Run locally

```bash
pnpm --filter @calypsos-promise/site dev
```

Open `http://localhost:3000`.

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

Repository tests and deployed verification do not establish independent accessibility, privacy, security, legal, communications, clinical, interoperability, provider, financial, operational, or research approval. Institutional Phase 0 remains active, newsletter gate #63 remains open through production delivery verification, and Sprint 9 remains behind issue #64.
