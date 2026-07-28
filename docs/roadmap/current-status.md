# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 7 completion](sprint-7-completion-record.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Sprint 7 plan](sprint-7-execution-plan.md) · [Sprint sequence](sprints.md) · [Forge architecture](../architecture/README.md#forge-mcp-architecture) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Merged baseline:** `main` at pre-Sprint 7 reconciliation squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Active review:** issue #54, branch `agent/sprint-7-forge-mcp`, draft PR #55
- **Sprint 7 workstreams:** 7.1–7.10 evidence present
- **Sprint 7 decision state:** ready for founding-steward acceptance; not merged
- **Sprint 8 state:** prepared handoff only; implementation blocked pending Sprint 7 acceptance and squash merge
- **Forge runtime:** local `stdio`, runtime registry revision `4`, exactly ten enabled public or synthetic tools, execution contract revision `1`, security/compatibility/operability revision `1`
- **Production health data:** none
- **Production AI, providers, connectors, private MCP, mutation, or consequential actions:** none
- **Production sandbox, process isolation, distributed rate limiting, monitoring, incident response, or resource certification:** none
- **Independent specialist review:** not established for the principal product, AI, MCP, security, privacy, clinical, accessibility, interoperability, legal, operations, financial, statistical-synthetic-data, resource-isolation, penetration-test, or research boundaries
- **Phase 0 exit review:** not completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every implementation, provider, sponsor, institution, workflow, contributor practice, governance mechanism, and future economic system remains subordinate to that purpose.

## Current position

Sprints 0–6 and the pre-Sprint 7 repository reconciliation are complete and merged. Sprint 7 remains unmerged but its implementation and completion evidence are present on issue #54 and draft PR #55.

The candidate establishes:

- one bounded Forge application at `apps/mcp-forge`;
- an immutable accepted registry with ten tool identities;
- local newline-delimited UTF-8 `stdio` transport using MCP protocol revision `2025-11-25`;
- inert default sessions, cancellation, shutdown, bounded framing, and public-safe transport errors;
- nine server-owned public or synthetic source roots with exact allowlists, traversal and symlink isolation, SHA-256 provenance, and visible partial states;
- lore, architecture, decision, and public-standards search;
- content, quest, and draft-mapping validation;
- fixed quest-schema inspection;
- explicitly synthetic connector-fixture search;
- deterministic synthetic quest and mapping-draft generation;
- one server-owned execution scope, resource-limit, receipt, and stable-error envelope across all ten tool calls;
- runtime-integrity checks before real tool operations;
- successful-result security postconditions before receipt assembly;
- exact-revision compatibility and additive migration records;
- clean local startup from a descendant directory with an empty environment;
- static production-source and dependency evidence for provider independence;
- an 18-scenario public/synthetic adversarial matrix;
- one aggregate runtime validator;
- twenty-eight stable control objectives;
- nineteen open Forge holdpoints and eighteen unresolved-work records; and
- a bounded pre-Sprint 8 alignment review.

Runtime registry revision `4` exposes exactly ten accepted identities in accepted order. Sprint 7.8–7.10 add controls and evidence without adding tools, changing accepted schemas, broadening source authority, or creating domain authority.

## Sprint 7 evidence by workstream

### 7.1–7.6 — Boundary, transport, sources, and public tools

The first six workstreams establish the accepted registry, local transport, source catalogue, provenance, six lore/schema/architecture/decision tools, and three standards/mapping/fixture tools.

They do not establish canon approval, Chronicle truth, permission, gameplay completion, rewards, clinical safety, certification, semantic equivalence, mapping approval, provider preference, connector behavior, production readiness, or connector activation.

### 7.7 — Deterministic synthetic generation

`forge.generate.synthetic-data` completes the accepted ten-tool surface. It hashes rather than echoes its bounded seed, derives synthetic cases deterministically, validates every artifact through its accepted validator, and preserves explicit synthetic, non-production, credential-free, personal-data-free, human-review-required, and non-authoritative state.

A passing batch does not prove privacy for arbitrary input, de-identification, statistical validity, demographic representativeness, accessibility conformance, clinical realism, model-training fitness, or publication fitness.

### 7.8 — Scopes, limits, receipts, and errors

Execution contract revision `1` derives one immutable server-owned scope per enabled tool.

The central controller enforces request serialization and bytes, files scanned, results returned, complete serialized output, timeout, linked cancellation, per-tool concurrency, caller-owned receipt rejection, and a deterministic serialized-materialization budget.

Every scoped success and stable scoped error includes `forge.invocation-receipt.v1`; stable failures use `forge.error.v1`. Receipts omit raw input, host paths, environment values, internal traces, credentials, protected source material, and wall-clock timestamps.

This is local serialized execution evidence, not production process or operating-system resource isolation.

### 7.9 — Agent security, compatibility, and operability

Security, compatibility-manifest, operability, security-postcondition, and aggregate-runtime-validation contracts are revision `1`.

The adversarial matrix covers traversal, symlink escape, arbitrary roots, shell, network, dynamic loading, registry and scope mutation, confused-deputy behavior, evidence suppression, oversized input, timeout, cancellation, receipt impersonation, synthetic-label removal, mapping self-approval, funding influence, and protected sources.

Runtime-integrity fingerprints verify the boundary, accepted registry, source catalogue, enabled identities, descriptors, runtime registry, and scopes before real operations. Successful-result postconditions preserve tool identity, non-authority, provenance, partial state, synthetic labels, draft mapping status, human review, and provider neutrality before receipt assembly.

Compatibility remains exact-revision, migration-bearing, and fail-closed. The compiled entrypoint starts cleanly with an empty environment and requires no credentials, network, provider, database, authentication service, queue, scheduler, or remote endpoint.

Forge depends only on `@calypsos-promise/content-schema`. It does not import Aster; issue #50 remains untriggered.

### 7.10 — Completion and Sprint 8 handoff

The branch now includes:

- [Sprint 7 Cross-Contract Reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md);
- [Sprint 7 Control and Evidence Map](../architecture/forge-sprint-7-control-and-evidence-map.md);
- [Sprint 7 Specialist Holdpoint and Unresolved-Work Register](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md);
- [Sprint 7 Completion Record](sprint-7-completion-record.md);
- [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md); and
- reconciled architecture, roadmap, documentation, and repository entry points.

The completion package supports every Sprint 7 acceptance criterion at the bounded local implementation and public/synthetic-test evidence level. Explicit founding-steward acceptance and squash merge remain open.

## Evidence limits

Sprint 7 does not establish:

- production deployment or official service operation;
- private Chronicle, House of Keys, provider, connector, repository-mutation, shell, or remote-agent tools;
- production identity, authentication, tenancy, permissions, or private-data processing;
- production process isolation, CPU or heap enforcement, distributed quota, rate limiting, monitoring, incident response, backup, recovery, or deletion verification;
- representative security, reliability, performance, cost, accessibility, usability, or contributor-benefit measurement;
- production synthetic-data generation, de-identification, statistical population validity, or dataset publication;
- independent penetration testing or specialist approval; or
- safety after compromise of the host process, runtime, operating system, or checkout.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — Website Track 0A repository gateway and purpose-limited signup adapter; not yet the Sprint 8 Next.js foundation
- [`apps/mcp-forge`](../../apps/mcp-forge) — local public/synthetic contributor tooling with ten bounded tools and Sprint 7 controls
- [`packages/content-schema`](../../packages/content-schema) — content contracts, deterministic validation, graph contracts, and JSON Schema
- [`packages/health-schema`](../../packages/health-schema) — pre-stable Living Chronicle contracts, validation, and public synthetic fixtures
- [`packages/house-of-keys`](../../packages/house-of-keys) — pre-stable permission contracts, pure evaluation, receipts, and public synthetic fixtures
- [`packages/aster`](../../packages/aster) — merged pre-stable provider-independent Aster contracts, validators, local fixtures, compatibility, and migration evidence
- [`docs/security`](../security/README.md) — merged security design baseline and open specialist holdpoints
- [`docs/economics`](../economics/README.md) — merged funding doctrine without operating finance
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

Retrieved, supplied, or generated content cannot register tools, alter risk classes or scopes, expand source access, invoke arbitrary resources, impersonate receipts, suppress evidence, approve mappings, claim certification, select providers, create canon or Chronicle truth, change permission, complete gameplay, grant rewards, or create governance authority.

## Sprint 8 handoff

The prepared [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md) preserves `apps/site` as the single website owner and directs Sprint 8 to migrate Website Track 0A into one honest, accessible Next.js public website foundation.

Sprint 8 remains blocked until Sprint 7 is explicitly accepted and squash merged. It does not activate accounts, real health-data capture, private Chronicles, production Aster, private MCP, providers, connectors, clinical workflows, research enrollment, governance voting, donation checkout, or financial operations.

## Information handling

Only public repository records and explicitly synthetic evidence may appear in public project systems. No production health data, credentials, private provider negotiations, contracts, proprietary mappings, protected interoperability findings, security reports, conduct evidence, account-specific support, estate records, private financial records, or protected operational evidence belongs here.

An input satisfying a syntax or size contract is not proof that its contents are public or appropriate.

## Remaining Phase 0 work

Before Phase 0 can close, the project still requires key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection evidence, DCO transition, clean-machine measurements, distributed ownership planning, Decision 0009 disposition, a named specialist-review strategy, the full human-readable and machine-readable architecture audit, and an explicit Phase 0 exit review.

These gates do not require premature selection of a token, treasury, identity system, broad vote, legal wrapper, payment rail, production queue, production provider, enterprise contract, or estate workflow.

## Status rule

A capability must remain labeled according to evidence. A merged document may describe a proposed future capability, and a completed sprint may still lack deployment, production operation, representative measurement, or independent review. Status must describe what the evidence proves, not what the project hopes to build.
