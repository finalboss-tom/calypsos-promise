# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Sprint 7 completion](sprint-7-completion-record.md) · [Sprint sequence](sprints.md) · [Forge architecture](../architecture/README.md#forge-mcp-architecture) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Merged baseline:** `main` at Sprint 7 squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`
- **Completed numbered sprints:** 0–7
- **Active review:** issue #58, branch `agent/pre-sprint-8-reconciliation`
- **Sprint 8 state:** not started; blocked pending acceptance and merge of the post-Sprint 7 reconciliation
- **Existing public site:** `apps/site`, Website Track 0A repository gateway
- **Forge runtime:** local `stdio`, runtime registry revision `4`, exactly ten enabled public or synthetic tools, execution contract revision `1`, security/compatibility/operability revision `1`
- **Production health data:** none
- **Production AI, providers, connectors, private MCP, mutation, or consequential actions:** none
- **Production sandbox, distributed rate limiting, monitoring, incident response, or resource certification:** none
- **Independent specialist review:** not established for the principal product, AI, MCP, security, privacy, clinical, accessibility, interoperability, legal, operations, financial, statistical-synthetic-data, resource-isolation, penetration-test, or research boundaries
- **Phase 0 exit review:** not completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every implementation, provider, sponsor, institution, workflow, contributor practice, governance mechanism, and future economic system remains subordinate to that purpose.

## Current position

Sprints 0–7 are complete and merged.

Sprint 7 — Forge MCP and Agent Safety merged through PR #55 as squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`, closing issue #54.

The accepted Sprint 7 evidence establishes:

- one bounded Forge application at `apps/mcp-forge`;
- exactly ten accepted tool identities through runtime registry revision `4`;
- local newline-delimited UTF-8 `stdio` using MCP protocol revision `2025-11-25`;
- public repository and explicitly synthetic information only;
- nine server-owned source roots with exact allowlists, traversal and symlink isolation, SHA-256 provenance, and visible partial states;
- bounded lore, content, quest, architecture, decision, standards, draft-mapping, synthetic-connector, and deterministic-generation tools;
- immutable execution scopes and central request, scan, result, output, timeout, cancellation, per-tool concurrency, and serialized-materialization controls;
- bounded server-owned receipts and stable public-safe errors;
- runtime-integrity checks and successful-result security postconditions;
- exact-revision compatibility and additive migration records;
- provider-independent clean startup and static prohibited-capability auditing;
- an 18-scenario public/synthetic adversarial matrix;
- twenty-eight stable controls;
- nineteen open Forge holdpoints and eighteen unresolved-work records; and
- the prepared public website handoff.

Sprint 7 acceptance is bounded local implementation and public/synthetic evidence. It does not establish private Chronicle tools, remote MCP, repository mutation, shell or network authority, production providers or connectors, process isolation, monitoring, incident response, representative measurement, independent penetration testing, specialist approval, or production readiness.

## Active pre-Sprint 8 reconciliation

Issue #58 reviews the merged repository before Sprint 8 begins.

The review has confirmed:

- the accepted Sprint 8 goal, deliverables, criteria, and sequence remain correct;
- no new decision record or scope amendment is required;
- `apps/site` remains the single public website owner;
- Website Track 0A must be migrated in place rather than replaced by a duplicate application;
- the current routes `/`, `/privacy`, `/joined`, and `/api/join` require deliberate preservation, redirect, or retirement;
- the cinematic Ogygia direction, semantic HTML, direct information access, reduced motion, responsive behavior, security-header intent, and public/private boundary should be preserved;
- deployment, preview, cutover, rollback, cache, CSP, signup privacy, canonical-data, metadata, accessibility, performance, and validation requirements must be explicit before implementation; and
- Sprint 8 may not begin until the reconciliation is validated, accepted, and squash merged.

## Existing public website surface

`apps/site` currently implements Website Track 0A — Repository Gateway.

It provides:

- a custom Node HTTP server;
- one cinematic semantic homepage;
- privacy and signup-confirmation pages;
- a purpose-limited email signup webhook adapter;
- repository-owned concept-art crops;
- responsive and reduced-motion behavior;
- security headers; and
- basic required-file, required-copy, prohibited-field, lint, type, and test checks.

It does not provide the Sprint 8 Next.js foundation, accounts, authentication, real health-data intake, private Chronicles, production Aster, private MCP, providers, connectors, research enrollment, governance voting, donation checkout, or financial operations.

Git-triggered Vercel deployments are currently disabled in `apps/site/vercel.json`. Any preview or production deployment change belongs to the Sprint 8 migration and release gate.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — Website Track 0A repository gateway and purpose-limited signup adapter
- [`apps/mcp-forge`](../../apps/mcp-forge) — accepted local public/synthetic contributor tooling with ten bounded tools and Sprint 7 controls
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

The Living Chronicle owns longitudinal records, values, temporal assertions, source provenance, correction, conflict, supersession, source artifacts, export, and deletion contracts. It does not own authentication, permission, gameplay, AI behavior, MCP tools, mappings, connectors, or delayed-work orchestration.

### House of Keys

The House of Keys owns purpose-specific permission truth and returns inspectable `allow`, `deny`, or `indeterminate` decisions from explicit facts. It does not authenticate actors, execute operations, mutate grants, create Chronicle truth, or convert model or tool confidence into permission.

### Aster

Aster may draft, clarify, recall source-linked information, explain provenance and uncertainty, route, and prepare narrative presentation. It cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, or treat model, provider, retrieval, fixture, compatibility, migration, or CI output as truth.

> AI proposes. The player confirms. The domain service validates and stores.

### Forge MCP

Forge is not the repository database, general shell, mutation agent, private Chronicle service, House of Keys service, standards or mapping authority, provider gateway, connector runtime, production synthetic-data system, production sandbox, general agent runtime, or institutional authority.

Retrieved, supplied, or generated content cannot register tools, alter risks or scopes, expand source access, invoke arbitrary resources, impersonate receipts, suppress evidence, approve mappings, claim certification, select providers, create canon or Chronicle truth, change permission, complete gameplay, grant rewards, or create governance authority.

### Public website

The website is a public explanation, navigation, contribution, status, and transparency surface. It may summarize and render accepted public records. It cannot create product, security, funding, provider, clinical, legal, permission, or governance authority.

## Next numbered sprint

Sprint 8 — Public Website Foundation remains the correct next numbered sprint:

> Publish an honest, accessible gateway to Ogygia.

After issue #58 and its reconciliation PR are accepted and squash merged, Sprint 8 should begin through its own issue, execution plan, branch, draft PR, public-only implementation evidence, accessibility and performance baselines, completion package, and explicit founding-steward acceptance.

Sprint 8 must preserve `apps/site` as the single website owner and migrate Track 0A into one honest, accessible Next.js foundation. It does not activate accounts, real health-data capture, private Chronicles, production Aster, private MCP, providers, connectors, clinical workflows, research enrollment, governance voting, donation checkout, or financial operations.

## Remaining Phase 0 work

Before Phase 0 can close, the project still requires key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection evidence, DCO transition, clean-machine measurements, distributed ownership planning, Decision 0009 disposition, a named specialist-review strategy, the human-readable and machine-readable architecture audit, and an explicit Phase 0 exit review.

These gates do not require premature selection of a token, treasury, identity system, broad vote, legal wrapper, payment rail, production queue, production provider, enterprise contract, or estate workflow.

## Status rule

A capability must remain labeled according to evidence. A merged document may describe a proposed future capability, and a completed sprint may still lack deployment, production operation, representative measurement, or independent review. Status must describe what the evidence proves, not what the project hopes to build.