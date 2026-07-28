# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 7 plan](sprint-7-execution-plan.md) · [Sprint sequence](sprints.md) · [Forge architecture](../architecture/README.md#forge-mcp-architecture) · [Deterministic generation](../architecture/forge-mcp-deterministic-synthetic-generation.md) · [Scopes, limits, receipts, and errors](../architecture/forge-mcp-scopes-limits-receipts-and-errors.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Sprint 6 completion](sprint-6-completion-record.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Merged baseline:** `main` at pre-Sprint 7 reconciliation squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Active implementation:** issue #54, branch `agent/sprint-7-forge-mcp`, draft PR #55
- **Completed Sprint 7 workstreams:** 7.1–7.8
- **Next unstarted workstream:** 7.9 — agent security, compatibility, and operability
- **Forge runtime:** local `stdio`, runtime registry revision `4`, exactly ten enabled public or synthetic tools, execution contract revision `1`
- **Production health data:** none
- **Production AI, providers, connectors, private MCP, mutation, or consequential actions:** none
- **Production process isolation, distributed rate limiting, or resource certification:** none
- **Independent specialist review:** not established for the principal product, AI, MCP, security, privacy, clinical, accessibility, interoperability, legal, operations, financial, statistical-synthetic-data, resource-isolation, or research boundaries
- **Phase 0 exit review:** not completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every implementation, provider, sponsor, institution, workflow, contributor practice, governance mechanism, and future economic system remains subordinate to that purpose.

## Current position

Sprints 0–6 and the pre-Sprint 7 repository reconciliation are complete and merged. Their detailed evidence remains in the [sprint sequence](sprints.md), completion records, accepted decisions, architecture records, and the public roadmap.

Sprint 7 is active through issue #54 and draft PR #55. Workstreams 7.1–7.8 establish:

- one bounded Forge application at `apps/mcp-forge`;
- an immutable accepted registry with ten tool identities;
- local newline-delimited UTF-8 `stdio` transport using MCP protocol revision `2025-11-25`;
- inert default sessions, cancellation, shutdown, bounded framing, and public-safe errors;
- nine server-owned source roots with exact allowlists, traversal and symlink isolation, SHA-256 provenance, and visible partial states;
- lore, architecture, decision, and public-standards search;
- content, quest, and draft-mapping validation;
- fixed quest-schema inspection;
- explicitly synthetic connector-fixture search;
- deterministic synthetic quest and mapping-draft generation; and
- one server-owned execution scope, resource-limit, receipt, and stable-error envelope across all ten tool calls.

Runtime registry revision `4` still exposes all ten accepted identities through local `stdio` in accepted registry order. Sprint 7.8 adds no identity and does not change source or domain authority.

## Sprint 7 evidence

### 7.1–7.6 — Registry, transport, sources, and public tools

The first six workstreams establish the application boundary, finalized local transport, source catalogue and provenance, six lore/schema/architecture/decision tools, and three standards/mapping/fixture tools.

Sprint 7.5 final head `fc2f11c72e21aef573f6c1212880aed4cffb47f1` passed CI run 801 and DCO run 870. Sprint 7.6 final head `16701b72fe3d11159774aac746adc9f0ead7743a` passed CI run 833 and DCO run 903.

They do not establish canon approval, Chronicle truth, permission, gameplay completion, rewards, clinical safety, certification, semantic equivalence, mapping approval, provider preference, connector behavior, production readiness, or connector activation.

### 7.7 — Deterministic synthetic generation

`forge.generate.synthetic-data` completes the accepted ten-tool surface through runtime registry revision `4`.

The tool:

- accepts one bounded public-safe seed, count, output family, and profile;
- supports `quest` and `mapping-draft` output;
- supports `balanced`, `accessibility`, and `edge-cases` profiles;
- hashes rather than echoes the seed;
- derives identifiers, timestamps, cases, and values deterministically;
- uses no random source, wall-clock time, network, provider, credential, production endpoint, arbitrary filesystem read, or repository write;
- validates every generated artifact through its accepted validator; and
- labels every record synthetic, non-production, credential-free, personal-data-free, human-review-required, and non-authoritative.

Final head `97b8b9152f1efcd0b1284daafa35c441d3ec0e25` passed CI run 858 and DCO run 930.

A passing batch does not prove statistical validity, demographic representativeness, accessibility conformance, clinical realism, de-identification, privacy for arbitrary caller input, or fitness for model training or publication.

### 7.8 — Scopes, limits, receipts, and errors

Execution contract revision `1` derives one immutable server-owned scope for each enabled accepted tool.

The central controller enforces:

- JSON serialization and request-byte ceilings before tool execution;
- accepted file-scan and result postconditions;
- the complete serialized MCP output ceiling, including the receipt;
- linked caller cancellation and accepted tool timeouts;
- one active call per tool identity while allowing independent tool identities to proceed;
- rejection of tool- or caller-supplied receipt fields; and
- a serialized-materialization budget covering request, complete output, and at most one bounded public source file.

Every scoped success and stable scoped tool error includes a `forge.invocation-receipt.v1` receipt. The receipt exposes scope identity, accepted limits, bounded observed counts and bytes, completion state, partial reasons, enforced controls, and literal non-authority.

Receipts and stable `forge.error.v1` errors contain no raw input, absolute host path, environment value, internal trace, credential, protected source material, or wall-clock timestamp.

Caller cancellation suppresses a response rather than manufacturing a receipt. Accepted timeouts return one stable public-safe error receipt.

The materialized-memory model is a deterministic serialized contract. It does not prove peak JavaScript heap usage, operating-system memory isolation, distributed quotas, production rate limiting, or sandbox certification.

Focused and final validation evidence is recorded in issue #54 and draft PR #55.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — bounded public repository gateway and purpose-limited signup adapter
- [`apps/mcp-forge`](../../apps/mcp-forge) — active local contributor-tool application with ten bounded tools and server-owned execution receipts
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

The Living Chronicle owns longitudinal records, values, temporal assertions, source provenance, correction, conflict, supersession, source artifacts, export, and deletion contracts.

It does not own authentication, permission, gameplay, research enrollment, provider selection, AI behavior, MCP tools, mappings, connectors, or delayed-work orchestration.

### House of Keys

The House of Keys owns purpose-specific permission truth and returns inspectable `allow`, `deny`, or `indeterminate` decisions from explicit facts.

It does not authenticate actors, execute operations, mutate grants, create Chronicle truth, consume authority, or convert model or tool confidence into permission.

### Aster

Aster may draft, clarify, recall source-linked information, explain provenance and uncertainty, route, and prepare narrative presentation.

Aster cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, retain hidden material memory, or treat model, provider, retrieval, fixture, compatibility, migration, or CI output as truth.

> AI proposes. The player confirms. The domain service validates and stores.

### Forge MCP

Forge is not the repository database, a general shell, a mutation agent, a private Chronicle service, a House of Keys service, a standards or mapping authority, a provider gateway, a connector runtime, a production synthetic-data system, a production resource-isolation system, or an institutional authority.

Retrieved, supplied, or generated content cannot register tools, alter risk classes or execution scopes, expand source access, invoke arbitrary resources, impersonate receipts, elevate its own authority, approve mappings, claim certification, select providers, create canon, write Chronicle truth, change permission, complete gameplay, grant rewards, or create governance authority.

## Next workstream: 7.9

Sprint 7.9 will exercise the full agent-security matrix, compatibility and migration behavior, clean local startup, focused validation, contributor documentation, provider independence, and operability.

It must preserve the ten-tool registry, execution contract, public and synthetic information boundary, stable receipts and errors, and every production and specialist holdpoint.

## Information handling

Only public repository records and explicitly synthetic evidence may appear in Sprint 7 issues, branches, pull requests, fixtures, tests, comments, logs, and artifacts.

No production health data, credentials, private provider negotiations, contracts, evaluations, proprietary mappings, protected interoperability findings, security reports, conduct evidence, account-specific support, estate records, private financial records, or protected operational evidence belongs here.

An input satisfying a public-safe syntax contract is not proof that its contents are appropriate. Private or production information remains prohibited.

## Remaining Phase 0 work

Before Phase 0 can close, the project still requires key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection evidence, DCO transition, clean-machine measurements, distributed ownership planning, Decision 0009 disposition, a named specialist-review strategy, and an explicit Phase 0 exit review.

These gates do not require premature selection of a token, treasury, identity system, broad vote, legal wrapper, payment rail, production queue, production provider, enterprise contract, or estate workflow.

## Status rule

A capability must remain labeled according to evidence:

- **LIVE** only when available in the official product under current operational controls;
- **EXPERIMENTAL** only when available to a bounded audience with explicit uncertainty;
- **PLANNED** when accepted but unavailable;
- **LONG-HORIZON** when part of the vision without a committed release;
- **DEFERRED** when intentionally excluded pending named gates;
- **FROZEN** for protected foundations;
- **BASELINE** for accepted Phase 0 direction; and
- **PROPOSED** for reviewable direction not yet accepted.

A merged document may describe a proposed future capability. A completed sprint may still lack production operation or independent review. Status must describe what the evidence proves, not what the project hopes to build.
