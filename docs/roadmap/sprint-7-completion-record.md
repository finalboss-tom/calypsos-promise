# Sprint 7 Completion Record — Forge MCP and Agent Safety

[Current status](current-status.md) · [Sprint 7 execution plan](sprint-7-execution-plan.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Forge architecture](../architecture/README.md#forge-mcp-architecture) · [Cross-contract reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/forge-sprint-7-control-and-evidence-map.md) · [Specialist holdpoints and unresolved work](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** READY FOR FOUNDING-STEWARD ACCEPTANCE — not merged
- **Tracking issue:** [#54](https://github.com/finalboss-tom/calypsos-promise/issues/54)
- **Draft pull request:** [#55](https://github.com/finalboss-tom/calypsos-promise/pull/55)
- **Entry baseline:** `main` at `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Reviewed implementation head:** `32492040684c2a89e32c866888f6be0888ee1279`
- **Final completion-package head:** pending final exact-head validation
- **Application:** `apps/mcp-forge`
- **Accepted registry revision:** `1`
- **Runtime registry revision:** `4`
- **Execution contract revision:** `1`
- **Scope:** bounded local public-and-synthetic Forge implementation, deterministic validators and generators, adversarial public tests, compatibility, migration, operability, completion evidence, holdpoints, and Sprint 8 handoff only

## Completion decision awaiting acceptance

Sprint 7 produced a coherent local Forge MCP implementation for the accepted goal:

> Provide useful agent tooling without private health-data risk.

The exact candidate branch implements one local `stdio` contributor-tool application with ten server-owned tools over allowlisted public repository material and explicitly synthetic data.

The completion package supports acceptance at the local implementation, deterministic-validation, public/synthetic source, adversarial-test, compatibility, migration, clean-start, and repository-consistency evidence level.

Founding-steward acceptance and squash merge are still required. Until they occur:

- Sprint 7 is not accepted or merged;
- issue #54 remains open;
- PR #55 remains open and draft;
- no production, private-data, remote-agent, provider, connector, or consequential capability is authorized; and
- Sprint 8 should not begin on a new implementation branch.

## Accepted deliverables evidenced by the candidate

### Forge boundary and accepted registry

The candidate defines:

- one application owner at `apps/mcp-forge`;
- public and explicitly synthetic information classes;
- server-owned registry and source authority;
- read-public, validate-public, generate-synthetic-draft, and prohibited risk classes;
- ten accepted tool identities;
- input and output schema identities;
- limits, compatibility, migration, funding neutrality, prohibited capabilities, and literal non-authority; and
- deterministic validators and public tests.

### Local MCP transport

The candidate implements:

- MCP protocol revision `2025-11-25`;
- newline-delimited UTF-8 local `stdio`;
- deterministic initialization and initialized-notification lifecycle;
- bounded `ping`, `tools/list`, and `tools/call` behavior;
- cancellation, idempotent shutdown, and bounded framing;
- stable public-safe JSON-RPC transport errors; and
- direct harness and compiled-entrypoint tests.

No remote endpoint, listener, authentication service, provider call, credential path, repository mutation, or private-data path is introduced.

### Source catalogue and provenance

The candidate implements nine server-owned source roots with:

- exact-file and recursive-tree allowlists;
- prohibited path names, suffixes, and segments;
- plain, encoded, double-encoded, backslash, absolute, URI, and drive-path traversal rejection;
- symlink file and directory isolation;
- deterministic listing and bounded reads;
- SHA-256 content digests;
- repository-relative paths;
- whole-file, line-range, and object locators;
- source authority and literal non-authority; and
- complete, partial, and truncated evidence.

### Lore, schema, architecture, and decision tools

The candidate enables:

- `forge.search.lore`;
- `forge.validate.content`;
- `forge.inspect.quest-schema`;
- `forge.validate.quest`;
- `forge.search.architecture`; and
- `forge.search.decision`.

Search and validation remain source-linked evidence. They cannot accept canon, approve architecture, close decisions, create Chronicle truth, create permission, complete quests, grant rewards, mutate the repository, or establish clinical authority.

Architecture and decision search preserve conservative authority classes so proposed, planned, historical, superseded, unresolved, reference-only, and working material cannot be silently promoted to accepted current truth.

### Public standards, draft mappings, and synthetic connector fixtures

The candidate enables:

- `forge.search.public-standards`;
- `forge.validate.mapping-draft`; and
- `forge.search.synthetic-connector-fixtures`.

Public standards search preserves exact provenance without claiming completeness, certification, semantic equivalence, provider preference, or endorsement.

Mapping validation requires revisioned draft status, deterministic validation, and human interoperability and semantic review. It denies mapping approval, semantic equivalence, connector behavior, certification, production readiness, and provider preference.

Synthetic connector search returns only explicitly synthetic, non-production, credential-free, personal-data-free fixtures and exposes skipped unclassified records.

### Deterministic synthetic generation

The candidate enables `forge.generate.synthetic-data` and exposes exactly ten accepted tools through runtime registry revision `4`.

The generator:

- accepts `quest` or `mapping-draft` output;
- accepts one normalized public-safe seed, count, and bounded profile;
- supports balanced, accessibility-relevant, and edge-case scenarios;
- hashes rather than echoes the seed;
- derives case identities, values, and timestamps deterministically;
- uses fixed synthetic time rather than wall-clock time;
- uses no random source, network, provider, credential, production endpoint, arbitrary filesystem read, or repository write;
- immediately validates every generated artifact; and
- returns explicit generator, scenario, schema, validator, classification, diversity, synthetic, non-production, personal-data-free, credential-free, human-review, and non-authority evidence.

A passing generated batch does not prove privacy for arbitrary input, de-identification, representativeness, accessibility conformance, clinical realism, statistical validity, model-training fitness, or publication fitness.

### Scopes, limits, receipts, and stable errors

Execution contract revision `1` derives one immutable server-owned scope per enabled tool.

The central controller enforces:

- JSON serialization and request-byte ceilings before execution;
- accepted file-scan and result-count postconditions;
- the complete serialized MCP output ceiling;
- accepted timeout;
- linked caller cancellation;
- one active call per tool identity while allowing different identities to proceed;
- rejection of caller- or result-owned receipts; and
- a deterministic serialized-materialization model covering request, complete output, and at most one bounded public source file.

Every scoped success and stable scoped tool error includes `forge.invocation-receipt.v1`. Receipts report exact contract and scope identities, accepted limits, observed bounded counts and bytes, completion state, partial reasons, enforced controls, and non-authority.

Receipts and `forge.error.v1` errors omit raw input, absolute host paths, environment values, internal traces, credentials, protected source material, and wall-clock timestamps.

The materialized-memory model is deterministic serialized evidence. It is not JavaScript heap isolation, operating-system enforcement, a production sandbox, distributed quota, or production rate limiting.

### Agent security, compatibility, and operability

The candidate defines an 18-scenario adversarial matrix covering:

- path traversal and symlink escape;
- arbitrary root and protected-source access;
- shell, network, and dynamic-module attempts;
- registry and execution-scope mutation;
- confused-deputy behavior and evidence suppression;
- oversized input, timeout, and cancellation;
- receipt leakage or impersonation;
- synthetic-label removal;
- mapping self-approval; and
- funding influence.

Before every real tool operation, runtime-integrity fingerprints verify the application boundary, accepted registry, source catalogue, enabled identities, descriptors, runtime registry, and execution scopes.

Every successful raw result is checked before receipt assembly for exact tool identity, common non-authority, source evidence, visible partial state, result counts, conservative documentation authority, standards non-certification, provider neutrality, synthetic labels, mapping draft status, required human review, validation evidence, and tool-specific denial claims.

Compatibility remains pre-stable, exact-revision, migration-bearing, and fail-closed. Additive records cover runtime revisions `1` through `4` and execution envelope v1. Unknown and breaking changes fail closed; authority expansion requires an accepted governing decision.

The compiled `stdio` entrypoint starts from a descendant directory with an empty environment, initializes, lists exactly ten tools, performs deterministic generation, returns a bounded receipt, exits cleanly, and emits no stderr output.

The production source has no shell, subprocess, network client, socket, VM, worker-thread, dynamic import, code-evaluation, or CommonJS-loading capability. The package depends only on `@calypsos-promise/content-schema` and does not depend on Aster.

## Acceptance-criterion evidence

The completion package supports every accepted Sprint 7 criterion:

### Forge operates entirely on public documentation and synthetic data

**Evidence:** public-only source classes; nine server-owned allowlisted roots; prohibited source classes and paths; synthetic fixture labels; no private Chronicle, provider, credential, environment, or production endpoint dependency; static source audit; clean empty-environment startup; adversarial protected-source tests.

**Conclusion before human acceptance:** met at local implementation and public/synthetic-test level.

### Retrieved content cannot grant itself tool authority

**Evidence:** server-owned accepted and runtime registries; immutable execution scopes; data-only treatment of retrieved and generated content; tool identity validation; runtime-integrity fingerprints; successful-result postconditions; caller-owned receipt rejection; method and tool refusal tests.

**Conclusion before human acceptance:** met at contract, local runtime, integrity, and adversarial-test level.

### Tool contracts are versioned and testable

**Evidence:** application, registry, runtime, source catalogue, tool, execution, receipt, error, compatibility, security, and operability revisions; exact public schemas; stable error codes; additive migration records; aggregate runtime validator; public-surface tests; clean compiled startup.

**Conclusion before human acceptance:** met at public contract, migration, validator, and test level.

### Generated mappings remain drafts requiring deterministic validation and human review

**Evidence:** mapping-draft revision and status contract; deterministic validator; generator immediate validation; explicit human review; postconditions denying approval, equivalence, certification, connector behavior, provider preference, and production readiness.

**Conclusion before human acceptance:** met at local validator, generator, postcondition, and public-test level.

### Sponsor-funded tools retain the same public-data, synthetic-only, risk, provider-neutrality, review, and publication boundaries

**Evidence:** funding boundary flags; baseline validator; risk and scope immutability; source and ranking neutrality; provider-neutral standards and mappings; funding influence adversarial scenario; public doctrine; ordinary issue, PR, review, test, and publication path.

**Conclusion before human acceptance:** met at governance-contract, integrity-validator, and adversarial-test level; no active funding relationship is selected.

### Forge cannot access protected provider and interoperability information

**Evidence:** source allowlists and exclusions; prohibited names and segments; no arbitrary root; no environment or credential path; no network or provider dependency; protected-source adversarial tests; public-safe receipts and errors; static capability audit.

**Conclusion before human acceptance:** met at local source, runtime, disclosure, and adversarial-test level.

## Evidence status

The candidate establishes:

- twenty-eight stable Forge control objectives;
- nineteen open Forge-specific holdpoints;
- eighteen explicit unresolved-work records;
- required and designed evidence across all controls;
- local implementation evidence for the public/synthetic runtime controls;
- deterministic public/synthetic test evidence;
- clean compiled startup evidence;
- exact compatibility and migration evidence;
- cross-contract reconciliation; and
- a bounded Sprint 8 handoff.

It does not establish:

- production deployment or official service operation;
- remote MCP, authentication, tenancy, or private-data processing;
- private Chronicle or House of Keys tools;
- provider, network, connector, repository-mutation, shell, or general-agent capability;
- production process isolation, CPU or heap enforcement, distributed quota, or rate limiting;
- production monitoring, audit, incident response, backup, recovery, or deletion verification;
- representative security, performance, reliability, cost, accessibility, usability, or contributor-benefit measurement;
- production synthetic-data, de-identification, statistical validity, or dataset publication; or
- independent specialist review.

## Validation evidence

The reviewed implementation head `32492040684c2a89e32c866888f6be0888ee1279` passed formatting, documentation links, repository policy, economics validation, content validation, lint, typecheck, tests, GitHub Actions CI run 904, and DCO Attestation run 977.

The final completion-package head and exact validation runs will be inserted after the 7.10 documentation and status reconciliation is complete.

## Open holdpoints

The controlling follow-up record is the [Sprint 7 Forge Specialist Holdpoint and Unresolved-Work Register](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md).

No production or specialist holdpoint closes merely because Sprint 7 is accepted or merged.

## Handoff

The [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md) defines the bounded next-sprint entry conditions.

After explicit Sprint 7 acceptance and squash merge, Sprint 8 may evolve the existing `apps/site` Website Track 0A repository gateway into one honest, accessible Next.js public website foundation.

Sprint 8 inherits:

- frozen mission, player rights, lore, and architecture;
- truthful capability status;
- public code and private personal-data separation;
- consumer-first and provider-independent explanation;
- Aster and Forge non-authority;
- canonical funding transparency;
- disabled transaction surfaces without operational evidence;
- narrative and direct navigation parity;
- accessibility and performance gates;
- existing signup privacy and operational holdpoints; and
- every open production, specialist, institutional, and measurement gate.
