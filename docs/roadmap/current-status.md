# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Accepted alignment issue #64](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Accepted numbered sprints:** 0–8
- **Active numbered sprint:** Sprint 9 — Public synthetic prologue
- **Sprint 9 tracking:** issue #67 / draft PR #68 / branch `agent/sprint-9-public-synthetic-prologue`
- **Sprint 9 entry gate:** issue #64 accepted and closed on July 29, 2026
- **Sprint 9 completed workstreams:** 9.1–9.4
- **Sprint 9 active workstream:** 9.5 synthetic Chronicle and House of Keys receipt demonstration
- **Latest validated Sprint 9 candidate:** `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a` — CI 1205 / DCO 1283
- **Sprint 8 squash commit:** `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`
- **Post-Sprint 8 reconciliation and newsletter squash commit:** `032a368bcd4beb999fee9a14fe4118aead0801a5` through PR #66
- **Production website:** live on the canonical domains through Vercel deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`
- **Deployed source commit:** `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`
- **Release control:** Git-triggered Vercel deployment is disabled through `6be7d20fbfe1079881a0717f30760b0e48b265b5`
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

Sprints 0–8 are accepted and merged. Sprint 9 is active.

Sprint 8 achieved its goal:

> Publish an honest, accessible gateway to Ogygia.

PR #61 was squash merged as `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`, issue #60 was closed as completed, and the accepted Next.js site was deployed to the existing production project.

PR #66 was subsequently squash merged as `032a368bcd4beb999fee9a14fe4118aead0801a5`. It reconciled the repository after production cutover, restored the existing bounded newsletter connection, placed exactly one opt-in on every accepted public route, cleaned obsolete signup copy, and established issue #64 as the pre-Sprint 9 gate.

The final newsletter release reached `READY` through deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`. Its source commit `1b25a2e64ff272927c65afa5e1f16aedc5e448d7` declares `SIGNUP_WEBHOOK_URL` and optional `SIGNUP_WEBHOOK_TOKEN` in Turbo’s server environment passthrough so Vercel does not drop the existing private connection. Both apex and `www` aliases were assigned without error, representative live routes returned HTTP 200, expected security headers remained present, and no production error or fatal logs were found during immediate verification.

Automatic Git deployment was restored to disabled through `6be7d20fbfe1079881a0717f30760b0e48b265b5`. That commit created no additional Vercel deployment.

Pre-Sprint 9 alignment issue #64 is accepted and closed. It selects `apps/site` as the owner, `/prologue` as the route, memory-only interaction state, pre-authored public synthetic inputs, deterministic Aster with a complete manual fallback, no microphone or free-form health input, a temporary synthetic Chronicle and House of Keys receipt projection, deterministic First Lantern evidence, non-punitive refusal and exit, and an informational-only future account boundary.

Sprint 9 is tracked through issue #67 and draft PR #68. Workstreams 9.1–9.4 now establish the permanent route and lifecycle contracts, the branch-only opening and Lantern Shore, deterministic Aster/manual parity, and pre-authored synthetic text/voice draft review with correction, refusal, and explicit memory-only confirmation. The latest accepted branch candidate is `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a`, which passed CI 1205 and DCO 1283. Workstream 9.5 is active.

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

The Sprint 9 `/prologue` route is not yet a live public capability. It exists only on draft PR #68, remains noindex, unlinked, outside the sitemap, unmerged, undeployed, and subject to the remaining Sprint 9 workstreams and explicit release acceptance.

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

The newsletter is separate from Sprint 9. It cannot become prologue identity, capture, conversion, completion, progression, or durable state.

## Sprint 9 — Public synthetic prologue

Sprint 9’s goal is:

> Let anyone understand the product through play before creating an account.

The accepted architecture is:

- `apps/site` remains the owner;
- `/prologue` is the one canonical entry route;
- interaction state is React memory only and is destroyed by refresh, navigation, tab close, restart, discard, or exit;
- all identities, observations, Chronicle entries, receipts, timestamps, sources, and fixtures are public and explicitly synthetic;
- synthetic text and voice are pre-authored choices, not arbitrary input or microphone capture;
- Aster is deterministic and optional, with a materially equivalent manual path;
- the synthetic Chronicle and receipt are temporary UI projections and cannot create truth, identity, permission, consent, audit, or production access;
- First Lantern completion depends only on explicit confirmed synthetic state;
- refusal, skip, restart, discard, leave, and completion without account creation remain non-punitive and functional;
- future account conversion is informational only and cannot retain state or request email; and
- no analytics, model provider, external service, secret, storage, or new server endpoint is authorized.

Validated branch behavior currently includes:

- a skippable arrival and Lantern Shore;
- deterministic Aster and complete manual presentation over one shared fact set;
- prepared synthetic text and visual voice-transcript fixtures;
- visible draft source, classification, timestamp, value, context, and limitations;
- explicit accept-as-written, prepared correction, refusal, alternate-example, and confirmation controls;
- fail-closed confirmation before review; and
- no arbitrary input, microphone, audio, storage, analytics, provider, model, account, newsletter, or network dependency.

The state vocabulary, data lifecycle, validation contract, release separation, rollback model, and inherited holdpoints are recorded in [Sprint 9 Execution Plan](sprint-9-execution-plan.md) and [Public Synthetic Prologue Boundary](../architecture/public-synthetic-prologue-boundary.md).

Sprint 9 does not authorize the Sprint 10 universal game shell, real accounts, private Chronicles, production Aster, real voice capture, providers, connectors, clinical workflows, research enrollment, payments, donations, analytics, or production health-data operation.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — live public Next.js website with manual release controls and a deployed bounded newsletter under issue #63; Sprint 9 prologue work remains branch-only until accepted
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

A Sprint 9 synthetic Chronicle projection is not a Chronicle record and cannot create durable or production truth.

### House of Keys

The House of Keys owns purpose-specific permission truth. It does not authenticate actors, execute operations, create Chronicle truth, or convert website, newsletter, model, tool, provider, or gameplay confidence into permission.

A Sprint 9 synthetic receipt projection cannot create identity, grant, permission, consent, audit, recipient authority, or production access.

### Aster

Aster may draft, clarify, recall source-linked information, explain provenance and uncertainty, route, and prepare narrative presentation. It cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, or treat website, newsletter, model, provider, retrieval, compatibility, or CI output as truth.

> AI proposes. The player confirms. The domain service validates and stores.

Sprint 9 uses a deterministic scripted Aster presentation with a complete manual fallback and no model provider.

### Forge MCP

Forge remains local public/synthetic contributor tooling, not a repository database, shell, mutation agent, private Chronicle service, provider gateway, connector runtime, production sandbox, or institutional authority.

### Public website and newsletter

The website explains, navigates, invites contribution, displays status, renders accepted public transparency records, and may host the bounded public synthetic prologue after acceptance. It cannot create product, security, funding, provider, clinical, legal, permission, or governance authority.

The newsletter is a narrow contact list for public project updates. It cannot become an account, Chronicle identity, research consent, health intake, provider lead system, donation flow, advertising profile, governance electorate, gameplay requirement, or Sprint 9 state store.

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

A capability must remain labeled according to evidence. A passing test, accepted sprint, production deployment, subscriber delivery, preview, provider connection, public page, or playable synthetic interaction proves only what that environment and evidence actually exercise. It does not create independent accessibility, security, privacy, communications, clinical, legal, provider, financial, operational, research, identity, permission, or production-health-data approval.
