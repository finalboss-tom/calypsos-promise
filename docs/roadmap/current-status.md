# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 8 completion package](sprint-8-completion-record.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Merged baseline:** `main` at accepted pre-Sprint 8 reconciliation squash commit `9da8034220954a1ca50420e71fd94e7795232a35`
- **Completed numbered sprints:** 0–7
- **Active sprint:** Sprint 8 — Public Website Foundation
- **Implementation workstreams:** 8.1 through 8.10 complete
- **Next action:** explicit founding-steward acceptance and directed squash merge of PR #61; not yet accepted or merged
- **Tracking:** issue #60, branch `agent/sprint-8-public-website-foundation`, draft PR #61
- **Website owner:** `apps/site`
- **Website runtime:** validated Next.js App Router site with the accepted public route family, permanent source checks, isolated local production-preview validation, explicit transfer budgets, and representative implementation review; not deployed or officially released
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

## Workstream 8.6 — validated Trust Center and Open Forge

Workstream 8.6 established:

- `/trust` with source-backed player rights, public/private information boundaries, truthful security status, authority separation, provider and connector status, funding doctrine, public and private challenge routes, and open operational and independent-review gates;
- `/forge` with all ten accepted local public/synthetic tool identities, runtime and source boundaries, receipts, public-safe errors, tool-specific denials, open holdpoints, unresolved work, and ordinary non-MCP contribution paths;
- direct and narrative navigation parity, footer links, canonical metadata, and sitemap inclusion for both routes;
- server-rendered essential information without a client-component dependency;
- inherited keyboard, focus, responsive, reduced-data, contrast, forced-colors, and image-failure behavior; and
- deterministic trust, tool-registry, receipt, error, route, signup, deployment, and non-certification validation.

The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `e43d0a47186041599674f6608455752a4e3b7319`.

The controlling evidence is [Sprint 8.6 Record](sprint-8-workstream-8-6-record.md).

## Workstream 8.7 — validated roadmap, support, and funding transparency

Workstream 8.7 established:

- `/roadmap` with the controlled evidence-status vocabulary, shared capability registry, a typed source-linked Sprint 8 presentation registry, later sprint groupings, and institutional Phase 0 gates;
- `/support` with public-safe issue, system-challenge, contribution, and status routes plus separate security, conduct, account, and personal-information boundaries;
- `/funding` with build-time reads of the two canonical public economics registers, fail-closed parsing, honest empty states, permitted and prohibited benefits, conflict and concentration controls, and an explicit disabled transaction boundary;
- direct and narrative navigation parity, footer links, canonical metadata, and sitemap inclusion for all three routes;
- server-rendered essential information without a client-component dependency;
- responsive, reduced-data, contrast, forced-colors, and image-independent presentation; and
- deterministic roadmap, support, canonical-register, empty-state, transaction-prohibition, signup, and deployment validation.

The initial focused build exposed a Turbopack incompatibility with a module-relative `URL` passed to Node file APIs. The build-time reader was corrected to search upward for two fixed canonical public repository paths using string filesystem paths.

The self-removing focused workflow then passed formatting, the production site build, site validation and lint, typecheck, focused tests, generated-state cleanup, final formatting, and cleanup before producing clean candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf`.

The controlling evidence is [Sprint 8.7 Record](sprint-8-workstream-8-7-record.md).

## Workstream 8.8 — validated paused email-signup disposition

Workstream 8.8 established:

- the public newsletter or waitlist route remains paused and no-intake for Sprint 8;
- `POST /api/join` remains `503 SIGNUP_MIGRATION_PAUSED` without parsing, storing, forwarding, cookies, a provider, webhook, database, or private destination;
- `/privacy` and `/joined` truthfully explain the interim state;
- the final safe activation-or-retirement decision is Phase 0 gate [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63); and
- the surface cannot become game registration, account creation, health-data intake, research enrollment, provider intake, donation processing, or an undeclared marketing database.

The controlling evidence is [Sprint 8.8 Record](sprint-8-workstream-8-8-record.md).

## Workstream 8.9 — validated accessibility, performance, security, route, metadata, and authority baseline

Workstream 8.9 established:

- one versioned release contract for thirteen accepted routes, indexing behavior, security headers, CSP directives, contrast pairs, secret patterns, and transfer budgets;
- permanent source validation in the ordinary site lint command;
- a permanent CI job that builds and serves an isolated local production preview, validates rendered routes and supporting surfaces, uploads machine-readable evidence, removes generated state, and proves no tracked mutation;
- route, heading, ID, label, alternative-text, canonical, sitemap, robots, 404, API-method, asset-cache, funding-authority, signup, and runtime-resource checks;
- explicit HTML, JavaScript, CSS, image, zero-font, total-transfer, and request-count budgets;
- a representative founding-steward implementation review with independent-review and affected-user limitations; and
- a permanent evidence boundary that local validation is not hosted deployment, field performance, independent certification, or production readiness.

The initial normal validation candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed CI 1110 and DCO 1192, including all nine CI jobs and the new production-preview evidence job.

The controlling evidence is [Sprint 8.9 Record](sprint-8-workstream-8-9-record.md), [Review Protocol](sprint-8-workstream-8-9-review-protocol.md), and [Representative Review](sprint-8-workstream-8-9-manual-review.md).

## Workstream 8.10 — completion package ready for acceptance

Workstream 8.10 established:

- cross-contract reconciliation across product, canon, architecture, Chronicle, permission, Aster, Forge, gameplay, provider, funding, support, signup, security, accessibility, performance, metadata, publication, operations, institutional, and Sprint 9 boundaries;
- thirty-six stable control objectives with explicit evidence levels and revalidation triggers;
- twenty open specialist, production, release, measurement, implementation, and institutional holdpoints;
- twenty unresolved-work records;
- truthful release classification: repository implementation with isolated local-preview evidence, not hosted or officially released;
- merge, hosted preview, production cutover, and official release as separate attributable decisions;
- rollback paths before merge, after merge, for hosted preview, and for official cutover;
- no Sprint 8 database, active signup, payment, provider, private Chronicle, or transaction migration to reverse;
- a completion record ready for explicit founding-steward acceptance; and
- a bounded Sprint 9 handoff requiring acceptance, squash merge, issue closure, post-merge reconciliation, and a dedicated pre-Sprint 9 review.

The implementation package is complete, but Sprint 8 remains active. Issue #60 stays open and PR #61 stays draft and unmerged until explicit acceptance and squash merge. Git-triggered deployment remains disabled, signup gate #63 remains open, no hosted release exists, and Sprint 9 is planned but not started.

The controlling evidence is [Sprint 8 Completion Record](sprint-8-completion-record.md), [Cross-Contract Reconciliation](../architecture/public-site-sprint-8-cross-contract-reconciliation.md), [Control and Evidence Map](../architecture/public-site-sprint-8-control-and-evidence-map.md), [Holdpoints and Unresolved Work](../architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md), and [Release, Rollback, and Sprint 9 Handoff](sprint-8-release-rollback-and-sprint-9-handoff.md).

## Current public website surface

`apps/site` now provides:

- one pinned Next.js App Router application;
- a migrated cinematic homepage;
- `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, `/forge`, `/roadmap`, `/support`, and `/funding` source-backed routes;
- shared direct navigation and an optional narrative path;
- skip links, semantic landmarks, and visible-focus foundations;
- controlled capability-status primitives with canonical source links;
- privacy and joined compatibility pages;
- paused signup route behavior;
- metadata, sitemap, robots, not-found, and error states;
- nonce CSP and public security headers;
- reduced-motion, reduced-data, contrast, forced-colors, responsive, and image-failure foundations; and
- permanent source validation, production builds, isolated local production-preview evidence, transfer budgets, typecheck, and tests.

It does not yet provide:

- final email-signup activation or retirement, which remains Phase 0 gate #63;
- independent accessibility certification, assistive-technology or affected-user validation, field performance, or deployed verification;
- hosted preview or official production deployment; or
- any private or production product capability.

## Acceptance and merge gate

The next decision is whether the founding steward accepts Sprint 8 at the bounded repository implementation, deterministic validation, isolated local-preview, measured-transfer, and representative implementation-review evidence level.

If accepted, PR #61 may be squash merged, issue #60 may be closed after the squash commit is verified, and a post-merge reconciliation may begin. Merge does not deploy the site, close gate #63, establish independent certification, complete institutional Phase 0, or start Sprint 9.

Until explicit direction is given, the PR remains draft and unmerged, the issue remains open, deployment remains disabled, and Sprint 9 remains planned but not started.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — Sprint 8 implementation package complete and ready for explicit acceptance, with permanent local-preview CI; not merged, deployed, or officially released
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

Before Phase 0 can close, the project still requires email-signup disposition gate #63, key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection evidence, DCO transition, clean-machine measurements, distributed ownership planning, Decision 0009 disposition, a named specialist-review strategy, the human-readable and machine-readable architecture audit, and an explicit Phase 0 exit review.

## Status rule

A capability must remain labeled according to evidence. A completed workstream, passing test, preview, or deployment proves only the environment and claims it actually exercises. It does not create independent accessibility, security, privacy, clinical, legal, provider, financial, operational, or production-health-data approval.
