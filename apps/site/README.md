# Calypso’s Promise public site

`apps/site` is the single owner of the live Calypso’s Promise public website and the production-hosted public synthetic prologue.

Controlling current records:

- [Current Project Status](../../docs/roadmap/current-status.md)
- [Post-Sprint 10 Reconciliation](../../docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md)
- [Sprint 10 Pre-Acceptance Alignment](../../docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)
- [Sprint 10 Completion Record](../../docs/roadmap/sprint-10-completion-record.md)
- [Sprint 10 Final Reconciliation and Sprint 11 Handoff](../../docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md)
- [Sprint 9 Completion Record](../../docs/roadmap/sprint-9-completion-record.md)
- [Post-Sprint 9 Repository and Production Reconciliation](../../docs/roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md)
- [Public Synthetic Prologue Boundary](../../docs/architecture/public-synthetic-prologue-boundary.md)
- [Phase 0 Newsletter Gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63)
- [Sprint 10 Issue #80](https://github.com/finalboss-tom/calypsos-promise/issues/80)
- [Sprint 10 PR #79](https://github.com/finalboss-tom/calypsos-promise/pull/79)

## Current implementation

The application is a pinned Next.js App Router site with:

- Next.js `16.2.12` and React/React DOM `19.2.8`;
- one server-rendered root layout and accepted public route family;
- a shared Founding Expedition newsletter opt-in rendered exactly once on every public route;
- source-backed Promise, laws, experience, consumer-first, Aster, Trust Center, Open Forge, roadmap, support, funding, and privacy views;
- direct navigation and an optional narrative path reaching the same essential destinations;
- the production-hosted `/prologue` route;
- visible-on-focus skip links, semantic landmarks, keyboard operation, and resilient presentation foundations;
- CSP and public security headers;
- metadata, sitemap, robots, not-found, and error presentation;
- permanent source, route, authority, newsletter, security, metadata, and transfer-budget validation;
- dependency-free rendered-browser prologue validation; and
- disabled Git-triggered Vercel deployment.

## Public synthetic prologue

Sprint 9 is accepted and merged. The canonical domains serve production deployment `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`.

`/prologue` remains:

- `noindex, nofollow`;
- absent from direct and narrative navigation;
- absent from the sitemap;
- public and explicitly synthetic;
- no-account and React-memory only;
- destroyed by refresh, navigation, tab close, restart, discard, or exit;
- complete through deterministic Aster framing or a materially equivalent manual path;
- free of real health input, arbitrary text, microphone, model provider, analytics, research, payment, permission, private Chronicle, and durable progression; and
- non-authoritative for identity, Chronicle truth, permission, consent, audit, health outcome, reward, or canonical story state.

The protected Sprint 9 preview remains access-controlled historical evidence, not an active release channel.

## Newsletter boundary

The shared opt-in reuses the existing server-only `SIGNUP_WEBHOOK_URL` and optional `SIGNUP_WEBHOOK_TOKEN` connection to a private provider destination.

It accepts only an email address plus explicit consent and cannot create an account, game identity, Chronicle record, research enrollment, provider lead, donation, governance role, advertising profile, or gameplay requirement.

Every public page renders the same component from `src/app/layout.tsx`, preventing route-specific drift and duplicate forms. Real subscriber addresses, provider URLs, credentials, and protected incident evidence remain outside the public repository and CI artifacts.

Issue #63 remains open for final Phase 0 disposition and acceptance.

## Release boundary

[`vercel.json`](vercel.json) explicitly selects Next.js and keeps Git-triggered deployment disabled for every branch. Production releases require a separate attributable action after review.

Current production and rollback evidence is recorded in [DEPLOYMENT.md](DEPLOYMENT.md).

## Sprint 10 boundary

The accepted and merged Sprint 10 package establishes `apps/game` as the browser, iOS, and Android universal shell at squash commit `28bb5a7ae268d28a67d737777cafdd760c796cd1` and `packages/game-content` as its versioned public/synthetic content source. `apps/site` retains the institutional website, newsletter, canonical public routes, and production `/prologue`.

No route ownership, public navigation, sitemap, indexing, domain, deployment, newsletter, or production-prologue state changed through Sprint 10. No site redeploy was performed because PR #79 changed only this README within `apps/site` and did not change the deployable site artifact. Any future consolidation or public game release remains a separately attributable decision with current security, accessibility, operations, and rollback evidence.

Sprint 11 remains unstarted.

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

Repository tests, modeled duration, rendered-browser validation, and deployed verification do not establish independent accessibility, privacy, security, legal, communications, clinical, interoperability, provider, financial, operational, research, affected-user, device-matrix, field-performance, or production-health-data approval. Institutional Phase 0 remains active.
