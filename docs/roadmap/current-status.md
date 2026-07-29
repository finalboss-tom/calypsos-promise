# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Post-Sprint 8 reconciliation](post-sprint-8-reconciliation-and-sprint-9-preparation.md) · [Sprint 8 completion](sprint-8-completion-record.md) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Accepted numbered sprints:** 0–8
- **Sprint 8 squash commit:** `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`
- **Post-Sprint 8 reconciliation and newsletter squash commit:** `032a368bcd4beb999fee9a14fe4118aead0801a5` through PR #66
- **Production website:** live on the canonical domains through Vercel deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`
- **Deployed source commit:** `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`
- **Release control:** Git-triggered Vercel deployment is disabled through `6be7d20fbfe1079881a0717f30760b0e48b265b5`
- **Sprint 9:** planned and not started; pre-implementation alignment issue #64 is active
- **Newsletter:** deployed on every accepted public page under Path A; private provider-delivery verification and final gate acceptance remain open in issue #63
- **Production health data:** none
- **Accounts, private Chronicles, production Aster, private MCP, providers, connectors, clinical workflows, research enrollment, payments, or consequential actions:** none
- **Independent specialist review:** not established for the principal product or the website’s accessibility, security, privacy, legal, communications, clinical, interoperability, provider, financial, operational, or research boundaries
- **Phase 0 exit review:** not completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every route, game mechanic, data flow, model, tool, provider, funding relationship, newsletter surface, deployment, and governance action remains subordinate to that purpose.

## Current position

Sprints 0–8 are accepted and merged.

Sprint 8 achieved its goal:

> Publish an honest, accessible gateway to Ogygia.

PR #61 was squash merged as `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`, issue #60 was closed as completed, and the accepted Next.js site was deployed to the existing production project.

PR #66 was subsequently squash merged as `032a368bcd4beb999fee9a14fe4118aead0801a5`. It reconciled the repository after production cutover, restored the existing bounded newsletter connection, placed exactly one opt-in on every accepted public route, cleaned obsolete signup copy, and established issue #64 as the pre-Sprint 9 gate.

The final newsletter release reached `READY` through deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`. Its source commit `1b25a2e64ff272927c65afa5e1f16aedc5e448d7` also declares `SIGNUP_WEBHOOK_URL` and optional `SIGNUP_WEBHOOK_TOKEN` in Turbo’s server environment passthrough so Vercel does not drop the existing private connection. Both apex and `www` aliases were assigned without error, representative live routes returned HTTP 200, the expected security headers remained present, and no production error or fatal logs were found during immediate verification.

Automatic Git deployment was then restored to disabled through `6be7d20fbfe1079881a0717f30760b0e48b265b5`. That commit created no additional Vercel deployment.

## Live public website surface

`apps/site` is the single public website owner and currently provides:

- the cinematic server-rendered homepage;
- `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, and `/aster` source-backed product explanations;
- `/trust` and `/forge` trust and bounded-tool explanations;
- `/roadmap`, `/support`, and `/funding` public status, contribution, and canonical funding-transparency views;
- `/privacy`, `/joined`, and `/api/join` as the bounded newsletter surface under Phase 0 gate #63;
- exactly one shared newsletter opt-in on each of the thirteen accepted public routes;
- shared direct navigation and an optional narrative path reaching the same essential information;
- skip links, semantic landmarks, visible focus, keyboard foundations, reduced motion, reduced data, forced colors, contrast, responsive behavior, and image-failure behavior;
- canonical metadata, sitemap, robots, not-found, error, security-header, nonce-CSP, caching, route, and transfer-budget controls; and
- permanent source validation plus isolated local production-preview evidence covering all accepted routes without contacting the private newsletter provider.

The website is live evidence of the public gateway. It is not evidence of a private health product, independent accessibility certification, production-health-data security, clinical safety, provider interoperability, or institutional readiness.

## Newsletter disposition — Phase 0 gate #63

The founding steward selected **Path A — preserve and activate** for the period leading to Phase 0 completion.

The narrow purpose is occasional Calypso’s Promise project updates and opportunities to inspect, play, review, or contribute.

The deployed implementation reuses the existing server-only connection:

- production configuration through `SIGNUP_WEBHOOK_URL` and optional `SIGNUP_WEBHOOK_TOKEN`;
- the existing private Google Apps Script webhook and private Google Sheet;
- email address, affirmative consent, privacy-policy version, narrow purpose, source, and submission time only; and
- no GitHub publication, public logs, website analytics, account creation, Chronicle intake, research enrollment, provider intake, donation processing, or game identity.

Implemented controls include explicit consent, validation, a bot honeypot, bounded request size, best-effort throttling, HTTPS-only forwarding, timeout handling, no-store responses, no cookies, public-safe errors, a privacy notice, manual correction/deletion/unsubscribe, and a rollback path independent of the rest of the site.

Repository CI run 1156 and DCO run 1239 passed on the accepted PR head. The production-preview job proved exactly one opt-in on all thirteen routes, route and canonical behavior, security headers, resource and transfer budgets, invalid-request handling, honeypot behavior, and `providerContacted: false`.

The public deployment is verified. Issue #63 remains open only for a private end-to-end delivery check using an address whose owner affirmatively consents, confirmation that the record reaches the existing private Google Sheet, rollback evidence, and final founding-steward gate acceptance. No real subscriber address or provider credential may be posted to the repository or issue.

## Sprint 9 preparation

Sprint 9’s accepted goal remains:

> Let anyone understand the product through play before creating an account.

Issue [#64](https://github.com/finalboss-tom/calypsos-promise/issues/64) is the active pre-Sprint 9 alignment gate.

Implementation has not started. The review must first select:

- whether the public synthetic prologue remains inside `apps/site` or earns a separate application boundary;
- exact routes and entry, refusal, restart, discard, exit, and optional conversion paths;
- explicitly synthetic identities, observations, Chronicle records, and House of Keys receipts;
- temporary data storage, lifetime, reset, teardown, logging, and no-silent-persistence behavior;
- deterministic state, confirmation, First Lantern completion, and evidence;
- Aster proposal behavior and a complete manual or deterministic fallback;
- keyboard, screen-reader, reduced-motion, timing, dialogue, error, confirmation, and exit evidence;
- CSP, security, publication, performance, analytics, rollback, and deployment boundaries; and
- the issue, branch, PR, review, validation, acceptance, and completion structure.

Sprint 9 remains public and explicitly synthetic only. It cannot require an account, email, real health data, a production model provider, a provider connection, research enrollment, payment, donation, or durable private progression.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — live public Next.js website with manual release controls and a deployed bounded newsletter under issue #63
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

The Living Chronicle owns longitudinal records, values, temporal assertions, source provenance, correction, conflict, supersession, source artifacts, export, and deletion contracts. It does not own authentication, permission, gameplay, AI behavior, MCP tools, mappings, connectors, newsletter contacts, or website presentation.

### House of Keys

The House of Keys owns purpose-specific permission truth. It does not authenticate actors, execute operations, create Chronicle truth, or convert website, newsletter, model, tool, provider, or gameplay confidence into permission.

### Aster

Aster may draft, clarify, recall source-linked information, explain provenance and uncertainty, route, and prepare narrative presentation. It cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, or treat website, newsletter, model, provider, retrieval, compatibility, or CI output as truth.

> AI proposes. The player confirms. The domain service validates and stores.

### Forge MCP

Forge remains local public/synthetic contributor tooling, not a repository database, shell, mutation agent, private Chronicle service, provider gateway, connector runtime, production sandbox, or institutional authority.

### Public website and newsletter

The website explains, navigates, invites contribution, displays status, and renders accepted public transparency records. It cannot create product, security, funding, provider, clinical, legal, permission, or governance authority.

The newsletter is a narrow contact list for public project updates. It cannot become an account, Chronicle identity, research consent, health intake, provider lead system, donation flow, advertising profile, governance electorate, or gameplay requirement.

## Remaining Phase 0 work

Before Phase 0 can close, the project still requires:

- private delivery verification and final acceptance of newsletter gate #63;
- key-person, succession, founder-reserved-power, and economic-dependency records;
- historical governance-source recovery;
- branch-protection and DCO-transition evidence;
- clean-machine measurements and distributed ownership planning;
- Decision 0009 disposition;
- a named specialist-review strategy;
- the human-readable and machine-readable architecture audit; and
- an explicit Phase 0 exit review.

## Status rule

A capability must remain labeled according to evidence. A passing test, accepted sprint, production deployment, subscriber delivery, preview, provider connection, or public page proves only what that environment and evidence actually exercise. It does not create independent accessibility, security, privacy, communications, clinical, legal, provider, financial, operational, research, or production-health-data approval.
