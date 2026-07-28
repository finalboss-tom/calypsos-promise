# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 7 plan](sprint-7-execution-plan.md) · [Sprint sequence](sprints.md) · [Forge architecture](../architecture/README.md#forge-mcp-architecture) · [Deterministic generation](../architecture/forge-mcp-deterministic-synthetic-generation.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Sprint 6 completion](sprint-6-completion-record.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Merged baseline:** `main` at pre-Sprint 7 reconciliation squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Active implementation:** issue #54, branch `agent/sprint-7-forge-mcp`, draft PR #55
- **Completed Sprint 7 workstreams:** 7.1–7.7
- **Next unstarted workstream:** 7.8 — scopes, limits, receipts, and errors
- **Forge runtime:** local `stdio`, runtime registry revision `4`, exactly ten enabled public or synthetic tools
- **Production health data:** none
- **Production AI, providers, connectors, private MCP, or consequential actions:** none
- **Independent specialist review:** not established for the principal product, AI, MCP, security, privacy, clinical, accessibility, interoperability, legal, operations, financial, statistical-synthetic-data, or research boundaries
- **Phase 0 exit review:** not completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every implementation, provider, sponsor, institution, workflow, contributor practice, governance mechanism, and future economic system remains subordinate to that purpose.

## Current position

Sprints 0–6 and the pre-Sprint 7 repository reconciliation are complete and merged. Their detailed evidence remains in the [sprint sequence](sprints.md), completion records, accepted decisions, architecture records, and the public roadmap.

Sprint 7 is active through issue #54 and draft PR #55. Workstreams 7.1–7.7 establish:

- one bounded Forge application at `apps/mcp-forge`;
- an immutable accepted registry with ten tool identities;
- local newline-delimited UTF-8 `stdio` transport using MCP protocol revision `2025-11-25`;
- inert default sessions, cancellation, shutdown, bounded framing, and public-safe errors;
- nine server-owned source roots with exact allowlists, traversal and symlink isolation, SHA-256 provenance, and visible partial states;
- lore, architecture, decision, and public-standards search;
- content, quest, and draft-mapping validation;
- fixed quest-schema inspection;
- explicitly synthetic connector-fixture search; and
- deterministic synthetic quest and mapping-draft generation.

Runtime registry revision `4` exposes all ten accepted identities through local `stdio` in accepted registry order. Generated batches remain synthetic drafts with generator, schema, validator, case, classification, and diversity evidence. They are not persisted or promoted to authority.

## Sprint 7 evidence

### 7.1 — Forge boundary and registry

Defines application ownership, public and synthetic information classes, server-owned registry and source authority, risk classes, limits, compatibility, migration, funding neutrality, prohibited capabilities, literal non-authority, validators, and public tests.

**Does not establish:** transport, repository reads, enabled tools, remote hosting, private data, mutation, provider calls, or production readiness.

### 7.2 — Local transport

Implements finalized-version local `stdio`, initialization, inert discovery, deterministic calls and refusals, cancellation, bounded framing, shutdown, direct harnesses, and public-safe errors.

**Does not establish:** repository access by inert sessions, remote MCP, authentication, providers, or production operation.

### 7.3 — Source catalogue and provenance

Defines fixed repository discovery, nine server-owned roots, exact allowlists, prohibited paths, traversal and symlink isolation, deterministic ordering, SHA-256 provenance, locators, truncation, partial states, and tests.

**Does not establish:** arbitrary filesystem access, caller-selected roots, mutation, network access, or domain authority.

### 7.4 — Lore and schema tools

Activates `forge.search.lore`, `forge.validate.content`, `forge.inspect.quest-schema`, and `forge.validate.quest`.

**Does not establish:** canon approval, Chronicle truth, quest completion, rewards, semantic completeness, clinical safety, or repository mutation.

### 7.5 — Architecture and decision tools

Activates `forge.search.architecture` and `forge.search.decision` with exact line provenance and conservative visible authority states.

Final reconciled head `fc2f11c72e21aef573f6c1212880aed4cffb47f1` passed CI run 801 and DCO run 870.

**Does not establish:** that proposed, planned, active-hypothesis, historical, superseded, unresolved, or reference-only material is accepted current truth.

### 7.6 — Standards and synthetic connector fixtures

Activates `forge.search.public-standards`, `forge.validate.mapping-draft`, and `forge.search.synthetic-connector-fixtures` through runtime registry revision `3`.

Final head `16701b72fe3d11159774aac746adc9f0ead7743a` passed CI run 833 and DCO run 903.

**Does not establish:** certification, semantic equivalence, mapping approval, provider preference, connector behavior, production readiness, or connector activation.

### 7.7 — Deterministic synthetic generation

Activates `forge.generate.synthetic-data` through runtime registry revision `4`, exposing all ten accepted identities.

The tool:

- accepts one bounded public-safe seed, count, output family, and profile;
- supports `quest` and `mapping-draft` outputs;
- supports `balanced`, `accessibility`, and `edge-cases` profiles;
- hashes rather than echoes the seed;
- derives identifiers, timestamps, cases, and values deterministically;
- uses no random source, wall-clock time, network, provider, credentials, production endpoint, arbitrary filesystem read, or repository write;
- validates every generated quest through the accepted content validator;
- validates every generated mapping through the accepted mapping-draft validator;
- labels every record synthetic, non-production, credential-free, personal-data-free, and human-review-required; and
- exposes explicit denials for canon, mapping, clinical, provider, connector, permission, gameplay, reward, production, and institutional authority.

Implementation head `eed685814046f0cf5996fde37b084ebff457faa9` passed formatting, documentation links, repository policy, economics validation, content validation, lint, typecheck, tests, CI run 847, and DCO run 918.

A passing generated batch does not prove statistical validity, demographic representativeness, accessibility conformance, clinical realism, de-identification, privacy for arbitrary caller input, or fitness for model training or publication.

## Implemented repository surfaces

- [`apps/site`](../../apps/site) — bounded public repository gateway and purpose-limited signup adapter
- [`apps/mcp-forge`](../../apps/mcp-forge) — active local contributor-tool application with ten bounded public or synthetic tools
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

Forge is not the repository database, a general shell, a mutation agent, a private Chronicle service, a House of Keys service, a standards or mapping authority, a provider gateway, a connector runtime, a production synthetic-data system, or an institutional authority.

Retrieved, supplied, or generated content cannot register tools, alter risk classes, expand source access, invoke arbitrary resources, elevate its own authority, approve mappings, claim certification, select providers, create canon, write Chronicle truth, change permission, complete gameplay, grant rewards, or create governance authority.

## Next workstream: 7.8

Sprint 7.8 will complete cross-tool scopes, request and output limits, timeout and cancellation behavior, concurrency and memory boundaries, stable partial results, public-safe invocation receipts, and stable errors.

It must not weaken any existing source, information, authority, provider, funding, privacy, or publication boundary.

## Information handling

Only public repository records and explicitly synthetic evidence may appear in Sprint 7 issues, branches, pull requests, fixtures, tests, comments, logs, and artifacts.

No production health data, credentials, private provider negotiations, contracts, evaluations, proprietary mappings, protected interoperability findings, security reports, conduct evidence, account-specific support, estate records, private financial records, or protected operational evidence belongs here.

A seed satisfying the generator's syntax contract is not proof that its contents are appropriate. Private or production information remains prohibited.

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
