# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.2 record](sprint-8-workstream-8-2-record.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Merged baseline:** `main` at accepted pre-Sprint 8 reconciliation squash commit `9da8034220954a1ca50420e71fd94e7795232a35`
- **Completed numbered sprints:** 0–7
- **Active sprint:** Sprint 8 — Public Website Foundation
- **Completed workstreams:** 8.1 and 8.2
- **Next workstream:** 8.3 — navigation, narrative entry, status primitives, and accessibility foundations
- **Tracking:** issue #60, branch `agent/sprint-8-public-website-foundation`, draft PR #61
- **Website owner:** `apps/site`
- **Website runtime:** validated Next.js App Router compatibility shell; not deployed or officially released
- **Production health data:** none
- **Production AI, private MCP, providers, connectors, accounts, transactions, or consequential actions:** none
- **Independent specialist review:** not established for the principal product, website accessibility, security, privacy, clinical, legal, provider, financial, operational, or research boundaries
- **Phase 0 exit review:** not completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every website route, design choice, status claim, support view, provider explanation, signup decision, and deployment remains subordinate to that purpose.

## Current position

Sprints 0–7 and the pre-Sprint 8 repository reconciliation are complete and merged.

Sprint 8 is active through issue #60, draft PR #61, and branch `agent/sprint-8-public-website-foundation`.

The accepted Sprint 8 goal is:

> Publish an honest, accessible gateway to Ogygia.

No new decision record or scope amendment is required.

## Workstream 8.1 — application boundary

Workstream 8.1 established:

- `apps/site` as the single public website owner;
- one in-place migration rather than a duplicate site;
- preserve, redirect, or retire rules for the existing public routes;
- repository-owned content authority and canonical source-link requirements;
- server-rendered essential information with optional client enhancement;
- design-token ownership inside `apps/site`;
- security-header, secret, cache, asset, signup, deployment, rollback, accessibility, performance, metadata, and validation contracts; and
- permanent non-scope.

The controlling records are the [Sprint 8 execution plan](sprint-8-execution-plan.md), [website architecture](../architecture/public-website-foundation-and-migration.md), and [8.1 record](sprint-8-workstream-8-1-record.md).

## Workstream 8.2 — validated Next.js shell

Workstream 8.2 replaces the custom Node page server and HTML-fragment runtime with one pinned App Router compatibility shell.

The validated implementation establishes:

- Next.js `16.2.12`;
- React and React DOM `19.2.8`;
- exact React type packages and lockfile evidence;
- one server-rendered root layout and compatibility homepage;
- preserved `/`, `/privacy`, `/joined`, and `/api/join` route contracts;
- a hard-paused signup endpoint returning `503 SIGNUP_MIGRATION_PAUSED` without accepting or forwarding data;
- application-local design tokens and global styling;
- canonical, Open Graph, Twitter, icon, viewport, sitemap, robots, not-found, and error behavior;
- nonce-bearing content-security policy through the Next.js 16 proxy convention;
- public security headers and disabled framework-identifying response header;
- mutable cache semantics for repository-owned `/assets/*` URLs;
- `no-store` API behavior;
- `next/image` for repository-owned shell imagery;
- focused shell validation and tests; and
- continued disabled Git-triggered Vercel deployment.

The exact implementation head `8c757e9482e616db7c86689a1d1d9c99d70ca6cd` passed CI run 957 and DCO Attestation run 1034.

This is local repository implementation evidence. It is not a preview deployment, official release, deployed security verification, accessibility certification, performance evidence, or production operation.

## Current public website surface

`apps/site` now provides a bounded compatibility foundation:

- server-rendered homepage shell preserving the Ogygia visual direction;
- shared root layout, skip link, header, footer, and basic direct links;
- privacy and joined compatibility pages;
- paused signup route behavior;
- repository-owned SVG and WebP assets;
- design tokens and global styles;
- security-header and CSP configuration;
- metadata routes and error states; and
- build, shell validation, typecheck, and focused tests.

It does not yet provide:

- final direct and narrative navigation parity;
- reusable capability-status primitives;
- final homepage or Promise migration;
- Seven Laws, How It Works, consumer-first, or Aster/AI pages;
- Trust Center or Open Forge;
- canonical roadmap, status, support, or funding views;
- final signup disposition;
- defined accessibility or performance release evidence;
- preview or official production deployment; or
- any private or production product capability.

## Next workstream

Workstream 8.3 may now implement:

- shared direct navigation;
- optional narrative entry exposing the same essential information;
- reusable status vocabulary and components;
- semantic landmarks, focus treatment, and keyboard foundations;
- reduced-motion and no-animation behavior;
- low-bandwidth and image-failure behavior; and
- server-rendered essential-information parity without client JavaScript.

It may not reopen the single-site boundary, activate signup intake, introduce a CMS or second source of truth, or begin later content, transaction, or Sprint 9 work prematurely.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — validated Next.js compatibility shell; Sprint 8 owner; not deployed
- [`apps/mcp-forge`](../../apps/mcp-forge) — accepted local public/synthetic contributor tooling with ten bounded tools
- [`packages/content-schema`](../../packages/content-schema) — content contracts, deterministic validation, graph contracts, and JSON Schema
- [`packages/health-schema`](../../packages/health-schema) — pre-stable Living Chronicle contracts, validation, and public synthetic fixtures
- [`packages/house-of-keys`](../../packages/house-of-keys) — pre-stable permission contracts, pure evaluation, receipts, and public synthetic fixtures
- [`packages/aster`](../../packages/aster) — pre-stable provider-independent Aster contracts, validators, local fixtures, compatibility, and migration evidence
- [`docs/security`](../security/README.md) — security design baseline and open specialist holdpoints
- [`docs/economics`](../economics/README.md) — funding doctrine and canonical public registers without operating finance
- [`docs/standards`](../standards/README.md) — public standards references and draft mappings without certification claims
- [`fixtures/connectors`](../../fixtures/connectors) — explicitly synthetic, non-production connector examples

## Permanent authority boundaries

### Living Chronicle

The Living Chronicle owns longitudinal records, values, temporal assertions, source provenance, correction, conflict, supersession, source artifacts, export, and deletion contracts. It does not own authentication, permission, gameplay, AI behavior, MCP tools, mappings, connectors, or website presentation.

### House of Keys

The House of Keys owns purpose-specific permission truth. It does not authenticate actors, execute operations, create Chronicle truth, or convert website, model, or tool confidence into permission.

### Aster

Aster may draft, clarify, recall source-linked information, explain provenance and uncertainty, route, and prepare narrative presentation. It cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, or treat website, model, provider, retrieval, compatibility, or CI output as truth.

> AI proposes. The player confirms. The domain service validates and stores.

### Forge MCP

Forge remains a local public/synthetic contributor tool, not a repository database, shell, mutation agent, private Chronicle service, provider gateway, connector runtime, production sandbox, or institutional authority.

### Public website

The website is a public explanation, navigation, contribution, status, trust, and transparency surface. It may summarize and render accepted public records. It cannot create product, security, funding, provider, clinical, legal, permission, or governance authority.

Website capability and funding views must remain validated read-only derivatives with canonical sources. A build, preview, deployment, or page cannot silently change upstream truth.

## Sprint 8 non-scope

Sprint 8 does not activate accounts, authentication, private identity, real health-data capture, private Living Chronicles, production Aster, private MCP, providers, EHR calls, connectors, production exchange, clinical workflows, health guidance, research enrollment, governance voting, transactions, tax claims, financial operations, estate directives, personal-data analytics, or Sprint 9 gameplay.

## Remaining Phase 0 work

Before Phase 0 can close, the project still requires key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection evidence, DCO transition, clean-machine measurements, distributed ownership planning, Decision 0009 disposition, a named specialist-review strategy, the human-readable and machine-readable architecture audit, and an explicit Phase 0 exit review.

## Status rule

A capability must remain labeled according to evidence. A completed workstream, passing test, preview, or deployment proves only the environment and claims it actually exercises. It does not create independent accessibility, security, privacy, clinical, legal, provider, financial, operational, or production-health-data approval.
