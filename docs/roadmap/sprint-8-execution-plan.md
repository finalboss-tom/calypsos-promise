# Sprint 8 Execution Plan — Public Website Foundation

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Workstream 8.3 record](sprint-8-workstream-8-3-record.md) · [Sprint sequence](sprints.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Tracking issue #60](https://github.com/finalboss-tom/calypsos-promise/issues/60) · [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

- **Status:** ACTIVE — workstreams 8.1 and 8.2 complete; workstream 8.3 implementation candidate awaiting final exact-head validation
- **Entry baseline:** `main` at accepted pre-Sprint 8 reconciliation squash commit `9da8034220954a1ca50420e71fd94e7795232a35`
- **Issue:** [#60](https://github.com/finalboss-tom/calypsos-promise/issues/60)
- **Branch:** `agent/sprint-8-public-website-foundation`
- **Application owner:** `apps/site`
- **Goal:** Publish an honest, accessible gateway to Ogygia.
- **Information boundary:** public repository records and explicitly synthetic examples only
- **Certification boundary:** repository-owned implementation, tests, accessibility and performance evidence, preview and release evidence, and truthful capability status; not independent accessibility, security, privacy, clinical, legal, provider, financial, or production-health-data certification

## Entry decision

The accepted Sprint 8 goal, deliverables, acceptance criteria, and order remain correct. No new decision record or scope amendment is required.

Sprint 8 evolves the existing Website Track 0A application in place. It does not create a second public site, shared website package, CMS, database, remote content service, account system, provider runtime, financial runtime, or Sprint 9 game surface.

## Binding inheritance

Sprint 8 inherits:

- the Product Constitution, player promise, Seven Laws, frozen lore, and architecture;
- the consumer-first and provider-independent boundary;
- operational simplicity and the modular-monolith default;
- public code and synthetic evidence with private future personal data;
- Aster and Forge non-authority;
- canonical economics records and funding-neutrality rules;
- truthful evidence-based status vocabulary;
- the Institutional Immune System, challenge routes, reversibility, and correction;
- the pre-Sprint 8 route, deployment, rollback, cache, security-header, signup, canonical-data, accessibility, performance, and validation controls; and
- every open production, specialist, institutional, signup, release, and measurement holdpoint.

## Workstream status

- [x] **8.1 — Website application boundary and migration contract**
- [x] **8.2 — Next.js shell, design tokens, security headers, metadata, and assets**
- [ ] **8.3 — Navigation, narrative entry, status primitives, and accessibility foundations — IMPLEMENTED; VALIDATION PENDING**
- [ ] **8.4 — Homepage and Promise migration — NEXT AFTER VALIDATION**
- [ ] **8.5 — Seven Laws, How It Works, consumer-first explanation, and Aster/AI**
- [ ] **8.6 — Trust Center and Open Forge**
- [ ] **8.7 — Roadmap, capability status, support, and funding transparency**
- [ ] **8.8 — Signup disposition and bounded implementation**
- [ ] **8.9 — Accessibility, performance, security, route, and authority validation**
- [ ] **8.10 — Completion, release evidence, and Sprint 9 handoff**

## 8.1 result — website boundary

Workstream 8.1 established:

- `apps/site` as the only website owner;
- one in-place migration and no duplicate application;
- explicit route migration rules;
- repository-owned content authority and canonical source links;
- design-token ownership inside `apps/site`;
- server-rendering and optional client-enhancement boundaries;
- security-header, secret, cache, asset, signup, deployment, rollback, accessibility, performance, metadata, and validation contracts; and
- permanent non-scope.

The validated 8.1 head is `d780a8c31cc484ede9b110b4dd0e43918ae88f42` with CI run 951 and DCO run 1027.

## 8.2 result — Next.js compatibility shell

Workstream 8.2 established:

- pinned Next.js `16.2.12`;
- pinned React and React DOM `19.2.8`;
- exact React type dependencies and lockfile evidence;
- App Router root layout and server-rendered compatibility homepage;
- preserved `/`, `/privacy`, `/joined`, and `/api/join` contracts;
- paused signup with no intake or forwarding;
- application-local design tokens and global styling;
- metadata, canonical URL, social preview, sitemap, robots, not-found, and error behavior;
- nonce CSP through the Next.js 16 proxy convention;
- public security headers and no-store API behavior;
- mutable cache semantics for repository-owned compatibility assets;
- `next/image` for shell imagery;
- shell validation and focused tests; and
- continued disabled Git-triggered Vercel deployment.

The custom Node page server and HTML-fragment runtime were removed rather than retained as a parallel website.

The final reconciled 8.2 head `2e9170efebd68562e0dbf8775815066e2a042e4e` passed CI run 968 and DCO Attestation run 1045.

## 8.3 result — navigation and accessibility foundations

The formatted implementation head is `641f298c13f030951fa9af3f8b1f82b2b9c1ef04`.

Workstream 8.3 adds:

- shared conventional direct navigation;
- an optional native `details` and `summary` narrative path reaching the same essential destinations;
- skip links for primary navigation and main content;
- semantic `header`, `nav`, `main`, and `footer` landmarks;
- deterministic visible-focus treatment and native keyboard operation;
- reusable `live`, `experimental`, `planned`, and `long-horizon` status primitives;
- stable capability IDs, summaries, canonical source URLs, and source labels;
- server-rendered navigation and status understanding without `use client`;
- reduced-motion and no-animation behavior;
- reduced-data, image-failure, higher-contrast, and forced-colors behavior;
- lazy decorative hero imagery; and
- expanded deterministic validation and focused tests.

Exit evidence implemented:

- essential shell destinations are available through direct navigation;
- the narrative path exposes no exclusive essential content;
- controlled status values are deterministic and source-linked;
- keyboard and visible-focus foundations are encoded and tested;
- reduced-motion removes non-essential movement;
- decorative images may fail or be suppressed without hiding essential information;
- client JavaScript is not required for essential navigation or status understanding; and
- no later page family, signup operation, transaction, or Sprint 9 behavior was activated.

The first implementation run passed documentation links, repository policy, economics validation, content validation, lint, and typecheck. It found one wording-coupled source assertion and formatter differences. The assertion now verifies the structured `sourceHref` and `sourceLabel` fields, and Prettier output was applied through a self-removing workflow.

Final exact-head validation remains pending. The controlling evidence is [Sprint 8.3 Record](sprint-8-workstream-8-3-record.md).

## 8.4 — homepage and Promise migration

After 8.3 validation, workstream 8.4 may deliver:

- migrated cinematic homepage using deliberate cuts and splices;
- primary Promise and player-control explanation;
- public-software/private-data boundary;
- current capability status and contribution paths; and
- route and content-authority tests.

It must preserve the 8.3 direct/narrative parity, controlled status values, server-rendered essential information, and accessibility/resilience foundations.

## 8.5 — Seven Laws, How It Works, consumer-first explanation, and Aster/AI

Deliverables:

- Seven Laws page;
- How It Works page;
- provider-respectful consumer-first and interoperability explanation;
- Aster and AI page preserving proposal, confirmation, validation, fallback, source, and uncertainty boundaries; and
- historical claims kept inside cited evidence.

## 8.6 — Trust Center and Open Forge

Deliverables:

- Trust Center shell organizing rights, privacy, security disclosure, authority boundaries, provider and connector status, funding doctrine, open holdpoints, corrections, and challenge routes;
- Open Forge page describing the ten bounded local public/synthetic tools, provenance, limits, receipts, errors, compatibility, non-authority, and ordinary non-MCP contribution path; and
- no certification or production-safety overstatement.

## 8.7 — roadmap, capability status, support, and funding transparency

Deliverables:

- roadmap and capability-status views from a validated site-local registry with canonical source links;
- build-time funding and relationship views from canonical public economics records or honest empty states;
- approved and prohibited benefit, conflict, concentration, outcome, correction, and challenge explanations; and
- disabled transaction handoff with no charitable, tax, nonprofit, payment, or public-benefit claim.

## 8.8 — signup disposition and bounded implementation

Choose one evidence-backed path:

1. preserve `/api/join`, `/privacy`, and `/joined` with published provider, purpose, retention, unsubscribe, correction, deletion, proxy-trust, abuse-control, incident, and rollback behavior; or
2. retire the signup surface and redirect visitors to public repository-following paths until those gates can be met.

The signup surface cannot become account creation, health-data intake, research enrollment, donation processing, or an undeclared marketing database.

## 8.9 — accessibility, performance, security, route, and authority validation

Deliverables:

- semantic and landmark checks;
- keyboard, focus, label, reading-order, contrast, reduced-motion, responsive, image-failure, and low-bandwidth checks;
- automated accessibility checks and representative manual review record;
- page, JavaScript, image, and font budgets;
- route and redirect checks;
- security-header and secret-leakage checks;
- metadata, canonical URL, sitemap, robots, not-found, and error checks;
- status and funding source-authority checks;
- signup checks for the selected disposition;
- full repository validation; and
- preview evidence without claiming independent certification.

## 8.10 — completion, release evidence, and Sprint 9 handoff

Deliverables:

- cross-contract reconciliation;
- control and evidence map;
- specialist holdpoints and unresolved-work register;
- completion record;
- preview, cutover, rollback, and official-release evidence appropriate to the actual deployment state;
- current-status and navigation reconciliation; and
- bounded Sprint 9 handoff.

Sprint 8 closes only through explicit founding-steward acceptance and squash merge.

## Sprint-level acceptance criteria

The sprint does not close until:

- live, experimental, planned, and long-horizon claims are visually distinct;
- all essential information is accessible without animation or story traversal;
- core pages pass defined accessibility and performance baselines;
- funding displays derive from canonical public economics records rather than an independent website sponsor model;
- the consumer-first explanation remains accurate, provider-respectful, and does not represent provider, EHR, connector, clinical, or enterprise capability as live;
- sponsor and partner recognition remains separate from recommendation, connector ranking, clinical endorsement, permission, safety, and health guidance; and
- no donation, sponsorship, checkout, payment, charitable, tax-deductible, nonprofit, or public-benefit transaction claim activates without accepted operational evidence.

## Permanent non-scope

Sprint 8 does not activate accounts, authentication, private identity, real health-data capture, private Living Chronicles, production Aster, private MCP, provider, EHR, connector, production exchange behavior, clinical workflows, health guidance, research enrollment, governance voting, donations, sponsorship checkout, payments, tax claims, financial operations, estate directives, personal-data analytics, or Sprint 9 gameplay.

## Evidence rule

A local build, test, preview, or deployment proves only the environment and claims it actually exercises. It does not create independent accessibility, security, privacy, clinical, legal, provider, financial, operational, or production-health-data approval.
