# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.3 record](sprint-8-workstream-8-3-record.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Merged baseline:** `main` at accepted pre-Sprint 8 reconciliation squash commit `9da8034220954a1ca50420e71fd94e7795232a35`
- **Completed numbered sprints:** 0–7
- **Active sprint:** Sprint 8 — Public Website Foundation
- **Completed workstreams:** 8.1, 8.2, and 8.3
- **Next workstream:** 8.4 — homepage and Promise migration
- **Tracking:** issue #60, branch `agent/sprint-8-public-website-foundation`, draft PR #61
- **Website owner:** `apps/site`
- **Website runtime:** validated Next.js App Router compatibility shell with server-rendered navigation and status foundations; not deployed or officially released
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
- explicit route migration rules;
- repository-owned content authority and canonical source-link requirements;
- server-rendered essential information with optional client enhancement;
- application-local design-token ownership;
- security-header, secret, cache, asset, signup, deployment, rollback, accessibility, performance, metadata, and validation contracts; and
- permanent non-scope.

Validated head `d780a8c31cc484ede9b110b4dd0e43918ae88f42` passed CI 951 and DCO 1027.

## Workstream 8.2 — validated Next.js shell

Workstream 8.2 replaced the custom Node page server and HTML-fragment runtime with one pinned App Router compatibility shell.

It established:

- Next.js `16.2.12`;
- React and React DOM `19.2.8`;
- exact React type dependencies and lockfile evidence;
- one server-rendered root layout and compatibility homepage;
- preserved `/`, `/privacy`, `/joined`, and `/api/join` route contracts;
- `503 SIGNUP_MIGRATION_PAUSED` without intake or forwarding;
- application-local design tokens and global styling;
- canonical and social metadata, sitemap, robots, not-found, and error behavior;
- nonce CSP through the Next.js 16 proxy convention;
- public security headers, mutable compatibility-asset caching, and `no-store` API behavior;
- focused shell validation and tests; and
- continued disabled Git-triggered Vercel deployment.

Final reconciled head `2e9170efebd68562e0dbf8775815066e2a042e4e` passed CI 968 and DCO 1045.

## Workstream 8.3 — validated navigation and accessibility foundations

Workstream 8.3 established:

- a shared direct-navigation registry;
- an optional native `details` and `summary` Ogygia path reaching the same essential destinations;
- visible-on-focus skip links for primary navigation and main content;
- semantic `header`, `nav`, `main`, and `footer` landmarks;
- deterministic visible-focus treatment;
- controlled `live`, `experimental`, `planned`, and `long-horizon` status values;
- reusable status data, badge, and grid components;
- canonical source URLs and labels for every capability record;
- no client-component dependency for essential navigation or status understanding;
- reduced-motion, reduced-data, higher-contrast, forced-colors, image-failure, and responsive foundations;
- deferred decorative hero imagery; and
- expanded deterministic shell validation and focused tests.

The first implementation run found one wording-coupled source assertion and formatter differences. The assertion was corrected to verify the structured `sourceHref` and `sourceLabel` fields, and Prettier output was applied through a self-removing workflow.

Validated reconciled head `2ff9fd966cd7d00bf846ed63147584cadd437d6b` passed formatting, documentation links, repository policy, economics validation, content validation, lint, typecheck, tests, CI 986, and DCO 1064.

The controlling evidence is [Sprint 8.3 Record](sprint-8-workstream-8-3-record.md).

## Current public website surface

`apps/site` now provides:

- one pinned Next.js App Router application;
- a server-rendered compatibility homepage preserving the Ogygia direction;
- shared direct navigation and an optional narrative path;
- skip links, semantic landmarks, and visible-focus foundations;
- controlled capability-status primitives with canonical source links;
- privacy and joined compatibility pages;
- paused signup route behavior;
- metadata, sitemap, robots, not-found, and error states;
- nonce CSP and public security headers;
- reduced-motion, reduced-data, contrast, forced-colors, and image-failure foundations; and
- deterministic build, validation, typecheck, and focused tests.

It does not yet provide:

- final homepage or Promise migration;
- Seven Laws, How It Works, consumer-first, or Aster/AI pages;
- Trust Center or Open Forge;
- canonical roadmap, support, or funding-transparency pages;
- final signup disposition;
- representative accessibility review or certification;
- defined performance release evidence;
- preview or official production deployment; or
- any private or production product capability.

## Next workstream

Workstream 8.4 may migrate the final cinematic homepage and Promise explanation through deliberate cuts and splices while preserving:

- direct and narrative navigation parity;
- server-rendered essential information;
- controlled status vocabulary and source links;
- reduced-motion, reduced-data, image-failure, contrast, and forced-colors behavior;
- paused signup; and
- every permanent Sprint 8 non-scope boundary.

It may not activate later page families, signup intake, transactions, private data, providers, connectors, or Sprint 9 gameplay prematurely.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — validated Next.js shell with navigation/status/accessibility foundations; not deployed
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
