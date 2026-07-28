# Sprint 7 Completion Record — Forge MCP and Agent Safety

[Current status](current-status.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Sprint 7 execution plan](sprint-7-execution-plan.md) · [Forge architecture](../architecture/README.md#forge-mcp-architecture) · [Cross-contract reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/forge-sprint-7-control-and-evidence-map.md) · [Specialist holdpoints and unresolved work](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** COMPLETE AND MERGED
- **Tracking issue:** [#54](https://github.com/finalboss-tom/calypsos-promise/issues/54) — closed as completed
- **Pull request:** [#55](https://github.com/finalboss-tom/calypsos-promise/pull/55) — squash merged
- **Squash commit:** `f28f054fe16d550fad37663cf234e06c5622dd42`
- **Entry baseline:** `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Final reviewed branch head:** `8be922187955480a473f11f5e03ee61be0c666b2`
- **Final branch validation:** CI run 926 and DCO Attestation run 1000 passed; final PR-body DCO run 1003 passed
- **Application:** `apps/mcp-forge`
- **Accepted registry revision:** `1`
- **Runtime registry revision:** `4`
- **Execution contract revision:** `1`
- **Scope:** bounded local public-and-synthetic Forge implementation, deterministic validators and generators, adversarial public tests, compatibility, migration, operability, completion evidence, holdpoints, and Sprint 8 handoff only

## Completion decision

The founding steward accepted Sprint 7 for the goal:

> Provide useful agent tooling without private health-data risk.

Sprint 7 establishes one local `stdio` contributor-tool application with ten server-owned tools over allowlisted public repository material and explicitly synthetic data.

Acceptance applies at the local implementation, deterministic-validation, public/synthetic source, adversarial-test, compatibility, migration, clean-start, and repository-consistency evidence level.

It does not authorize production deployment, private data, remote agents, providers, connectors, repository mutation, consequential actions, or specialist claims.

## Accepted deliverables

### Boundary, registry, and risk classes

Forge has one application owner at `apps/mcp-forge`, public and explicitly synthetic information classes, server-owned registry and source authority, bounded risk classes, ten accepted tool identities, exact schemas, limits, compatibility, migrations, funding neutrality, prohibited capabilities, literal non-authority, validators, and public tests.

### Local MCP transport

Forge implements MCP protocol revision `2025-11-25` over newline-delimited UTF-8 local `stdio`, deterministic initialization and discovery, bounded calls, cancellation, idempotent shutdown, bounded framing, and public-safe transport errors.

No remote endpoint, authentication service, provider call, credential path, repository mutation, or private-data path is introduced.

### Source catalogue and provenance

Nine server-owned roots use exact-file or recursive allowlists, prohibited names and segments, traversal rejection, symlink isolation, deterministic listing, bounded reads, SHA-256 digests, repository-relative paths, bounded locators, source authority, and visible complete, partial, and truncated states.

### Lore, schema, architecture, and decision tools

The runtime enables:

- `forge.search.lore`;
- `forge.validate.content`;
- `forge.inspect.quest-schema`;
- `forge.validate.quest`;
- `forge.search.architecture`; and
- `forge.search.decision`.

These tools return source-linked evidence and deterministic validation. They cannot accept canon, approve architecture, close decisions, create Chronicle truth or permission, complete quests, grant rewards, mutate the repository, or establish clinical authority.

Architecture and decision search preserve conservative authority classes so proposed, planned, historical, superseded, unresolved, reference-only, and working material cannot be silently promoted to accepted current truth.

### Standards, mappings, and connector fixtures

The runtime enables:

- `forge.search.public-standards`;
- `forge.validate.mapping-draft`; and
- `forge.search.synthetic-connector-fixtures`.

Standards search preserves provenance without claiming completeness, certification, semantic equivalence, provider preference, or endorsement.

Mapping validation requires revisioned draft status, deterministic validation, and human interoperability and semantic review. It denies approval, equivalence, connector behavior, certification, production readiness, and provider preference.

Connector search returns only explicitly synthetic, non-production, credential-free, personal-data-free fixtures and exposes skipped unclassified records.

### Deterministic synthetic generation

`forge.generate.synthetic-data` completes the ten-tool surface through runtime registry revision `4`.

The generator accepts bounded quest or mapping-draft requests, hashes rather than echoes its seed, derives cases and timestamps deterministically, uses fixed synthetic time, invokes no random source, network, provider, credential, production endpoint, arbitrary filesystem read, or repository write, immediately validates every artifact, and returns explicit generator, schema, validator, classification, diversity, synthetic, non-production, human-review, and non-authority evidence.

A passing batch does not prove privacy for arbitrary input, de-identification, representativeness, accessibility conformance, clinical realism, statistical validity, model-training fitness, or publication fitness.

### Scopes, limits, receipts, and errors

Execution contract revision `1` derives one immutable server-owned scope per enabled tool.

The controller enforces request serialization and bytes, file scans, result counts, complete serialized output, timeout, linked cancellation, one active call per tool identity, caller-owned receipt rejection, and a deterministic serialized-materialization budget.

Every scoped success and stable scoped error includes `forge.invocation-receipt.v1`; stable failures use `forge.error.v1`. Receipts and errors omit raw input, host paths, environment values, internal traces, credentials, protected source material, and wall-clock timestamps.

The materialized-memory model is local serialized evidence, not JavaScript heap isolation, operating-system enforcement, a production sandbox, distributed quota, or production rate limiting.

### Agent security, compatibility, and operability

Sprint 7 defines an 18-scenario adversarial matrix covering traversal, symlink escape, arbitrary roots, protected sources, shell, network, dynamic loading, registry and scope mutation, confused-deputy behavior, evidence suppression, oversized input, timeout, cancellation, receipt impersonation, synthetic-label removal, mapping self-approval, and funding influence.

Before each real operation, runtime-integrity fingerprints verify the boundary, accepted registry, source catalogue, enabled identities, descriptors, runtime registry, and scopes.

Every successful raw result is checked before receipt assembly for exact tool identity, common non-authority, provenance, visible partial state, result counts, conservative documentation authority, standards non-certification, provider neutrality, synthetic labels, mapping draft status, required human review, validation evidence, and tool-specific denial claims.

Compatibility remains pre-stable, exact-revision, migration-bearing, and fail-closed. Additive records cover runtime revisions `1` through `4` and execution envelope v1. Unknown and breaking changes fail closed; authority expansion requires an accepted governing decision.

The compiled entrypoint starts from a descendant directory with an empty environment, initializes, lists ten tools, performs deterministic generation, returns a bounded receipt, exits cleanly, and emits no stderr output.

Production Forge source has no shell, subprocess, network client, socket, VM, worker-thread, dynamic import, code-evaluation, or CommonJS-loading capability. The package depends only on `@calypsos-promise/content-schema` and does not depend on Aster.

## Accepted acceptance criteria

All Sprint 7 acceptance criteria are met at the bounded local implementation and public/synthetic-test evidence level:

- Forge operates entirely on public documentation and synthetic data.
- Retrieved content cannot grant itself tool authority.
- Tool contracts are versioned and testable.
- Generated mappings remain drafts requiring deterministic validation and human review.
- Sponsor-funded tools retain the same public-data, synthetic-only, risk, provider-neutrality, review, and publication boundaries as unfunded tools.
- Forge cannot access private provider negotiations, contracts, credentials, production endpoints, proprietary mappings, or protected interoperability findings.

## Completion-package evidence

The package records:

- twenty-eight stable control objectives;
- nineteen open Forge holdpoints;
- eighteen unresolved-work records;
- local implementation evidence;
- deterministic public/synthetic tests;
- clean compiled startup;
- exact compatibility and migrations;
- cross-contract reconciliation;
- truthful status boundaries; and
- the bounded Sprint 8 handoff.

Immutable validation layers:

- reviewed implementation head `32492040684c2a89e32c866888f6be0888ee1279` — CI 904, DCO 977;
- completed 7.10 evidence package `660b41e0ede313926a992c2ba7094a49fc756535` — CI 924, DCO 998;
- final branch head `8be922187955480a473f11f5e03ee61be0c666b2` — CI 926, DCO 1000, final PR-body DCO 1003; and
- squash merge commit `f28f054fe16d550fad37663cf234e06c5622dd42`.

## Evidence limits

Sprint 7 does not establish:

- production deployment or official service operation;
- remote MCP, authentication, tenancy, or private-data processing;
- private Chronicle or House of Keys tools;
- provider or network access, connectors, repository mutation, shell, or general-agent capability;
- production process isolation, CPU or heap enforcement, distributed quota, rate limiting, monitoring, incident response, backup, recovery, or deletion verification;
- representative security, reliability, performance, cost, accessibility, usability, or contributor-benefit measurement;
- production synthetic-data generation, de-identification, statistical population validity, or dataset publication; or
- independent penetration testing or specialist review.

## Open holdpoints

The controlling follow-up record is the [Sprint 7 Forge Specialist Holdpoint and Unresolved-Work Register](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md).

No production or specialist holdpoint closed because Sprint 7 was accepted or merged.

## Handoff

The [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md) is the controlling next-sprint review.

Sprint 8 may evolve the existing `apps/site` Website Track 0A repository gateway into one honest, accessible Next.js public website foundation only after the post-merge reconciliation is accepted and merged.

Sprint 8 inherits frozen mission and player rights, truthful capability status, public-code and private-data separation, consumer-first provider independence, Aster and Forge non-authority, canonical funding transparency, disabled transactions without operational evidence, narrative and direct navigation parity, accessibility and performance gates, signup privacy gates, and every open production, specialist, institutional, and measurement holdpoint.
