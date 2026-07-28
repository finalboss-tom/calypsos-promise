# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.5 record](sprint-8-workstream-8-5-record.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Merged baseline:** `main` at accepted pre-Sprint 8 reconciliation squash commit `9da8034220954a1ca50420e71fd94e7795232a35`
- **Completed numbered sprints:** 0–7
- **Active sprint:** Sprint 8 — Public Website Foundation
- **Completed workstreams:** 8.1 through 8.5
- **Next workstream:** 8.6 — Trust Center and Open Forge
- **Tracking:** issue #60, branch `agent/sprint-8-public-website-foundation`, draft PR #61
- **Website owner:** `apps/site`
- **Website runtime:** validated Next.js App Router site with homepage, Promise, Seven Laws, How It Works, consumer-first, Aster, navigation, status, and accessibility foundations; not deployed or officially released
- **Production health data:** none
- **Production AI, private MCP, providers, connectors, accounts, transactions, or consequential actions:** none
- **Independent specialist review:** not established for the principal product, website accessibility, security, privacy, AI safety, clinical, interoperability, legal, provider, financial, operational, or research boundaries
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

- shared direct navigation and an optional native Ogygia path reaching the same essential destinations;
- visible-on-focus skip links and semantic landmarks;
- deterministic visible-focus and keyboard foundations;
- controlled `live`, `experimental`, `planned`, and `long-horizon` status values;
- source-linked reusable status data, badge, and grid components;
- no client-component dependency for essential navigation or status understanding;
- reduced-motion, reduced-data, higher-contrast, forced-colors, image-failure, and responsive foundations; and
- expanded deterministic validation and focused tests.

Validated final head `9174d713755220906144beef80bec6b43932f459` passed CI 994 and DCO 1072.

## Workstream 8.4 — validated homepage and Promise migration

Workstream 8.4 established:

- a cinematic `/` route preserving the Ogygia direction while explaining the product plainly;
- visibly distinct experimental website, live repository, and planned-game claims;
- the frozen player promise and three connected value loops;
- the public-software/private-data boundary;
- private-by-default, meaningful-refusal, player-confirmation, correction-and-exit, and meaningfully-free explanations;
- a dedicated `/promise` route with canonical metadata and sitemap inclusion;
- direct Product Constitution source links;
- Promise navigation parity and ordinary public contribution paths; and
- retained server-rendering, accessibility, resilience, security, signup, and deployment boundaries.

The clean source-only head `dc5986d19c691ba4dea95040be5bc5aa34a8d1b2` passed CI 1010 and DCO 1089. Final repository-wide head `c54c377ad072f745772ccf3bbbcdabf1b8193cc3` passed CI 1021 and DCO 1100.

## Workstream 8.5 — validated source-backed guide family

Workstream 8.5 established four public routes:

- `/laws` — the exact frozen Seven Laws of Ogygia and their authority boundary;
- `/how-it-works` — the planned three-to-eight-minute, player-confirmed, non-punitive experience;
- `/consumer-first` — provider-respectful interoperability with standards at the edges and provider-independent Chronicle meaning at the core; and
- `/aster` — accepted pre-stable proposal, confirmation, source, uncertainty, memory, fallback, and non-authority contracts.

It also established:

- route metadata, canonical URLs, sitemap inclusion, and direct/narrative navigation parity for all four routes;
- explicit live, experimental, and planned status distinctions;
- deterministic authority over permission, completion, safety, progression, rewards, story order, and canon;
- AI-assisted drafting and explanation without canonical, permission, clinical, provider, or institutional authority;
- explicit absence of production providers, EHRs, connectors, clinical workflows, production Aster, private-data egress, memory, retrieval, workflow, or tools;
- server-rendered essential information without `use client`;
- responsive guide layouts and inherited reduced-motion, reduced-data, contrast, forced-colors, and image-failure behavior; and
- deterministic source, route, authority, fallback, signup, and deployment validation.

The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `16fe324c508719734b8923a8f99b59fb16712726`.

The controlling evidence is [Sprint 8.5 Record](sprint-8-workstream-8-5-record.md).

## Current public website surface

`apps/site` now provides:

- one pinned Next.js App Router application;
- a migrated cinematic homepage;
- `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, and `/aster` source-backed routes;
- shared direct navigation and an optional narrative path;
- skip links, semantic landmarks, and visible-focus foundations;
- controlled capability-status primitives with canonical source links;
- privacy and joined compatibility pages;
- paused signup route behavior;
- metadata, sitemap, robots, not-found, and error states;
- nonce CSP and public security headers;
- reduced-motion, reduced-data, contrast, forced-colors, responsive, and image-failure foundations; and
- deterministic build, validation, typecheck, and focused tests.

It does not yet provide:

- Trust Center or Open Forge routes;
- canonical roadmap, support, or funding-transparency pages;
- final signup disposition;
- representative accessibility review or certification;
- defined route-level performance release evidence;
- preview or official production deployment; or
- any private or production product capability.

## Next workstream

Workstream 8.6 may now implement:

- a Trust Center organizing player rights, privacy, security disclosure, authority boundaries, provider and connector status, funding doctrine, open holdpoints, corrections, and challenge routes; and
- an Open Forge page explaining the ten bounded local public/synthetic tools, provenance, scopes, limits, receipts, errors, compatibility, non-authority, and ordinary non-MCP contribution path.

It must preserve frozen authority, the accepted page family, direct and narrative navigation parity, controlled status values, canonical source links, server-rendered essential information, provider independence, Aster and Forge non-authority, accessibility and resilience foundations, paused signup, disabled deployment, and every permanent Sprint 8 non-scope boundary.

It may not claim certification, production safety, private-data capability, provider capability, clinical capability, transactions, or Sprint 9 gameplay.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — validated source-backed public website foundation through workstream 8.5; not deployed
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
