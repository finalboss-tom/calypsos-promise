# Sprint 7 Completion Record — Forge MCP and Agent Safety

[Current status](current-status.md) · [Sprint 7 execution plan](sprint-7-execution-plan.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Forge architecture](../architecture/README.md#forge-mcp-architecture) · [Cross-contract reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/forge-sprint-7-control-and-evidence-map.md) · [Specialist holdpoints and unresolved work](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** READY FOR FOUNDING-STEWARD ACCEPTANCE — not merged
- **Tracking issue:** [#54](https://github.com/finalboss-tom/calypsos-promise/issues/54)
- **Draft pull request:** [#55](https://github.com/finalboss-tom/calypsos-promise/pull/55)
- **Entry baseline:** `main` at `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Reviewed implementation head:** `32492040684c2a89e32c866888f6be0888ee1279`
- **Validated completion-package evidence head:** `660b41e0ede313926a992c2ba7094a49fc756535`
- **Completion-package validation:** CI run 924 and DCO Attestation run 998 passed
- **Application:** `apps/mcp-forge`
- **Accepted registry revision:** `1`
- **Runtime registry revision:** `4`
- **Execution contract revision:** `1`
- **Scope:** bounded local public-and-synthetic Forge implementation, deterministic validators and generators, adversarial public tests, compatibility, migration, operability, completion evidence, holdpoints, and Sprint 8 handoff only

## Completion decision awaiting acceptance

Sprint 7 produced a coherent local Forge MCP implementation for the accepted goal:

> Provide useful agent tooling without private health-data risk.

The candidate implements one local `stdio` contributor-tool application with ten server-owned tools over allowlisted public repository material and explicitly synthetic data.

The completion package supports acceptance at the local implementation, deterministic-validation, public/synthetic source, adversarial-test, compatibility, migration, clean-start, and repository-consistency evidence level.

Founding-steward acceptance and squash merge are still required. Until they occur:

- Sprint 7 is not accepted or merged;
- issue #54 remains open;
- PR #55 remains open and draft;
- no production, private-data, remote-agent, provider, connector, or consequential capability is authorized; and
- Sprint 8 remains blocked.

## Delivered Forge surface

### Boundary and registry

The candidate defines one application owner at `apps/mcp-forge`, public and explicitly synthetic information classes, server-owned registry and source authority, bounded risk classes, ten accepted tool identities, exact schemas, limits, compatibility, migrations, funding neutrality, prohibited capabilities, literal non-authority, validators, and public tests.

### Local MCP transport

The candidate implements MCP protocol revision `2025-11-25` over newline-delimited UTF-8 local `stdio`, deterministic initialization and discovery, bounded calls, cancellation, idempotent shutdown, bounded framing, and public-safe transport errors.

No remote endpoint, listener, authentication service, provider call, credential path, repository mutation, or private-data path is introduced.

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

The candidate defines an 18-scenario adversarial matrix covering traversal, symlink escape, arbitrary roots, protected sources, shell, network, dynamic loading, registry and scope mutation, confused-deputy behavior, evidence suppression, oversized input, timeout, cancellation, receipt impersonation, synthetic-label removal, mapping self-approval, and funding influence.

Before each real operation, runtime-integrity fingerprints verify the boundary, accepted registry, source catalogue, enabled identities, descriptors, runtime registry, and scopes.

Every successful raw result is checked before receipt assembly for exact tool identity, common non-authority, provenance, visible partial state, result counts, conservative documentation authority, standards non-certification, provider neutrality, synthetic labels, mapping draft status, required human review, validation evidence, and tool-specific denial claims.

Compatibility remains pre-stable, exact-revision, migration-bearing, and fail-closed. Additive records cover runtime revisions `1` through `4` and execution envelope v1. Unknown and breaking changes fail closed; authority expansion requires an accepted governing decision.

The compiled entrypoint starts from a descendant directory with an empty environment, initializes, lists ten tools, performs deterministic generation, returns a bounded receipt, exits cleanly, and emits no stderr output.

Production Forge source has no shell, subprocess, network client, socket, VM, worker-thread, dynamic import, code-evaluation, or CommonJS-loading capability. The package depends only on `@calypsos-promise/content-schema` and does not depend on Aster.

## Acceptance-criterion conclusion

### Public documentation and synthetic data only

Supported by public-only source classes, nine server-owned allowlisted roots, prohibited source classes and paths, synthetic labels, no private Chronicle or provider dependency, static source auditing, clean empty-environment startup, and protected-source adversarial tests.

**Conclusion before human acceptance:** met at local implementation and public/synthetic-test level.

### Retrieved content cannot grant tool authority

Supported by server-owned registries, immutable scopes, data-only treatment of retrieved and generated content, tool identity validation, integrity fingerprints, successful-result postconditions, caller-owned receipt rejection, and deterministic refusal tests.

**Conclusion before human acceptance:** met at contract, local runtime, integrity, and adversarial-test level.

### Versioned and testable contracts

Supported by exact application, registry, runtime, source, tool, execution, receipt, error, compatibility, security, and operability revisions; stable codes; additive migrations; aggregate validation; public-surface tests; and clean compiled startup.

**Conclusion before human acceptance:** met at public contract, migration, validator, and test level.

### Generated mappings remain drafts

Supported by mapping revision and draft status, deterministic validation, immediate generator validation, required human review, and postconditions denying approval, equivalence, certification, connector behavior, provider preference, and production readiness.

**Conclusion before human acceptance:** met at local validator, generator, postcondition, and public-test level.

### Sponsor-funded tools retain equal boundaries

Supported by funding boundary flags, immutable risks and scopes, source and ranking neutrality, provider-neutral standards and mappings, funding-influence adversarial tests, and ordinary issue, PR, review, test, and publication requirements.

**Conclusion before human acceptance:** met at governance-contract, integrity-validator, and adversarial-test level; no active funding relationship is selected.

### Protected provider and interoperability information remains inaccessible

Supported by source allowlists and exclusions, prohibited names and segments, no arbitrary root, environment, credential, network, or provider path, protected-source tests, public-safe receipts and errors, and static capability auditing.

**Conclusion before human acceptance:** met at local source, runtime, disclosure, and adversarial-test level.

## Completion-package evidence

The package records:

- twenty-eight stable Forge control objectives;
- nineteen open Forge-specific holdpoints;
- eighteen unresolved-work records;
- local implementation evidence for the public/synthetic controls;
- deterministic public/synthetic test evidence;
- clean compiled startup evidence;
- exact compatibility and migration evidence;
- cross-contract reconciliation;
- truthful status repairs; and
- the bounded Sprint 8 handoff.

The reviewed implementation head `32492040684c2a89e32c866888f6be0888ee1279` passed CI run 904 and DCO run 977.

The completed 7.10 evidence package at `660b41e0ede313926a992c2ba7094a49fc756535` passed formatting, documentation links, repository policy, economics validation, content validation, lint, typecheck, tests, CI run 924, and DCO run 998.

The exact final branch head and its validation are recorded in issue #54 and PR #55 after this evidence-only completion-record update.

## Evidence limits

Sprint 7 does not establish:

- production deployment or official service operation;
- remote MCP, authentication, tenancy, or private-data processing;
- private Chronicle or House of Keys tools;
- provider, network, connector, repository-mutation, shell, or general-agent capability;
- production process isolation, CPU or heap enforcement, distributed quota, or rate limiting;
- production monitoring, protected audit, incident response, backup, recovery, or deletion verification;
- representative security, performance, reliability, cost, accessibility, usability, or contributor-benefit measurement;
- production synthetic-data, de-identification, statistical validity, or dataset publication; or
- independent penetration testing or specialist review.

## Open holdpoints

The controlling follow-up record is the [Sprint 7 Forge Specialist Holdpoint and Unresolved-Work Register](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md).

No production or specialist holdpoint closes merely because Sprint 7 is accepted or merged.

## Sprint 8 handoff

The [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md) defines the bounded next-sprint entry conditions.

After explicit Sprint 7 acceptance and squash merge, Sprint 8 may evolve the existing `apps/site` Website Track 0A repository gateway into one honest, accessible Next.js public website foundation.

Sprint 8 inherits frozen mission and player rights, truthful capability status, public-code and private-data separation, consumer-first provider independence, Aster and Forge non-authority, canonical funding transparency, disabled transactions without operational evidence, narrative and direct navigation parity, accessibility and performance gates, signup privacy gates, and every open production, specialist, institutional, and measurement holdpoint.
