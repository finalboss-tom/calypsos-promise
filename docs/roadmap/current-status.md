# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Merged baseline:** `main` at accepted pre-Sprint 8 reconciliation squash commit `9da8034220954a1ca50420e71fd94e7795232a35`
- **Completed numbered sprints:** 0–7
- **Active sprint:** Sprint 8 — Public Website Foundation
- **Active workstream:** 8.1 — website application boundary and migration contract
- **Tracking:** issue #60, branch `agent/sprint-8-public-website-foundation`, draft PR #61
- **Website owner:** `apps/site`
- **Existing site:** Website Track 0A repository gateway; Next.js migration not yet implemented
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

The reconciliation merged through PR #59 as squash commit `9da8034220954a1ca50420e71fd94e7795232a35`, closing issue #58 and authorizing the separately tracked Sprint 8 implementation.

Sprint 8 is active through issue #60, draft PR #61, and branch `agent/sprint-8-public-website-foundation`.

The accepted Sprint 8 goal is:

> Publish an honest, accessible gateway to Ogygia.

No new decision record or scope amendment is required.

## Workstream 8.1

Workstream 8.1 defines the website boundary before adding framework dependencies.

The candidate establishes:

- `apps/site` as the single public website owner;
- one in-place migration of Website Track 0A rather than a duplicate application;
- current route inventory and preserve, redirect, or retire rules for `/`, `/privacy`, `/joined`, and `/api/join`;
- repository-owned content authority and canonical source-link requirements;
- a site-local presentation registry that cannot become independent product truth;
- build-time canonical economics views or honest empty states;
- server-rendered essential information with optional client enhancement;
- design-token ownership inside `apps/site` without a premature shared package;
- explicit security-header, secret, cache, and asset rules;
- a preserve-or-retire gate for signup;
- preview, official cutover, rollback, and release-evidence distinctions;
- accessibility, performance, route, metadata, status, funding, signup, security, and content-authority validation requirements; and
- permanent non-scope.

Workstream 8.1 does not add Next.js or React dependencies. Framework and version selection belong to 8.2 after this boundary is validated.

## Existing public website surface

`apps/site` currently implements Website Track 0A — Repository Gateway.

It provides:

- a custom Node HTTP server;
- semantic HTML fragments;
- repository-owned CSS, JavaScript, SVG, and WebP assets;
- one cinematic homepage;
- privacy and signup-confirmation pages;
- a purpose-limited email signup webhook adapter;
- responsive and reduced-motion behavior;
- public security headers; and
- required-file, required-copy, prohibited-field, lint, type, and test checks.

It does not provide the Sprint 8 Next.js shell, durable route architecture, Trust Center, Open Forge page, canonical funding views, defined accessibility and performance baselines, accounts, private health-data flows, providers, connectors, transactions, or Sprint 9 play.

Git-triggered Vercel deployments remain disabled at Sprint 8 entry. Any change belongs to the explicit deployment, preview, cutover, rollback, and release gate.

## Sprint 8 workstreams

1. Website application boundary and migration contract
2. Next.js shell, tokens, security, metadata, and assets
3. Navigation, narrative entry, status primitives, and accessibility foundations
4. Homepage and Promise migration
5. Seven Laws, How It Works, consumer-first explanation, and Aster/AI
6. Trust Center and Open Forge
7. Roadmap, capability status, support, and funding transparency
8. Signup preserve-or-retire decision and bounded implementation
9. Accessibility, performance, security, route, metadata, authority, and full validation
10. Completion, release evidence, and Sprint 9 handoff

The sprint-level acceptance criteria remain open until workstream 8.10 and explicit founding-steward acceptance.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — current Track 0A public gateway and separately gated signup adapter; Sprint 8 owner
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

The House of Keys owns purpose-specific permission truth and returns inspectable `allow`, `deny`, or `indeterminate` decisions from explicit facts. It does not authenticate actors, execute operations, mutate grants, create Chronicle truth, or convert website, model, or tool confidence into permission.

### Aster

Aster may draft, clarify, recall source-linked information, explain provenance and uncertainty, route, and prepare narrative presentation. It cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, or treat website, model, provider, retrieval, compatibility, or CI output as truth.

> AI proposes. The player confirms. The domain service validates and stores.

### Forge MCP

Forge remains a local public/synthetic contributor tool, not a repository database, shell, mutation agent, private Chronicle service, provider gateway, connector runtime, production sandbox, or institutional authority.

### Public website

The website is a public explanation, navigation, contribution, status, trust, and transparency surface. It may summarize and render accepted public records. It cannot create product, security, funding, provider, clinical, legal, permission, or governance authority.

Website capability and funding views must remain validated read-only derivatives with canonical sources. A deployment or preview cannot silently change upstream truth.

## Sprint 8 non-scope

Sprint 8 does not activate:

- accounts, authentication, or private identity;
- real health-data capture or private Living Chronicles;
- production Aster or private MCP;
- providers, EHR calls, connectors, or production exchange;
- clinical workflows or health guidance;
- research enrollment;
- governance voting;
- donations, sponsorship checkout, payments, tax claims, or financial operations;
- estate or legacy directives;
- analytics over personal data; or
- Sprint 9 prologue or gameplay.

## Remaining Phase 0 work

Before Phase 0 can close, the project still requires key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection evidence, DCO transition, clean-machine measurements, distributed ownership planning, Decision 0009 disposition, a named specialist-review strategy, the human-readable and machine-readable architecture audit, and an explicit Phase 0 exit review.

## Status rule

A capability must remain labeled according to evidence. A completed workstream, passing test, preview, or deployment proves only the environment and claims it actually exercises. It does not create independent accessibility, security, privacy, clinical, legal, provider, financial, operational, or production-health-data approval.
