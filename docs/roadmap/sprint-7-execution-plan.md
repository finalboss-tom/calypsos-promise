# Sprint 7 Execution Plan — Forge MCP and Agent Safety

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Completion record](sprint-7-completion-record.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Merged PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** COMPLETE AND MERGED
- **Entry baseline:** `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Squash commit:** `f28f054fe16d550fad37663cf234e06c5622dd42`
- **Application:** `apps/mcp-forge`
- **Information boundary:** public repository material and explicitly synthetic data only
- **Certification boundary:** local public/synthetic implementation, deterministic validation, adversarial testing, repository consistency, static production-source auditing, compatibility, migration, and clean startup; not production security, privacy, clinical, accessibility, legal, interoperability, operations, provider, statistical, resource-isolation, penetration-test, or AI-safety certification

## Goal

> Provide useful agent tooling without private health-data risk.

Forge reduces contributor friction through bounded public search, inspection, validation, and synthetic-draft generation. It remains optional and cannot become repository, filesystem, network, canonical, permission, gameplay, clinical, provider, connector, or institutional authority.

## Accepted scope

Sprint 7 delivered:

- MCP tool registry and risk classes;
- local `stdio` Forge MCP;
- lore search and validation tools;
- quest-schema tools;
- architecture and decision search;
- public standards, mapping, and synthetic connector-fixture tools;
- deterministic synthetic-data generation;
- tool scopes, limits, receipts, and stable errors;
- sponsor-funded tool and infrastructure conflict controls; and
- an agent-security, compatibility, migration, and operability suite.

## Accepted criteria

Sprint 7 was accepted at the bounded local implementation and public/synthetic-test evidence level because:

- Forge operates entirely on public documentation and synthetic data;
- retrieved content cannot grant itself tool authority;
- tool contracts are versioned and testable;
- generated mappings remain drafts requiring deterministic validation and human review;
- funded tools remain subject to the same public-data, synthetic-only, risk, provider-neutrality, review, and publication boundaries as unfunded tools; and
- tools cannot access private provider negotiations, contracts, credentials, production endpoints, proprietary mappings, or protected interoperability findings.

## Permanent implementation boundary

Sprint 7 remains one local application at `apps/mcp-forge`.

- Default transport is local `stdio`.
- No remote endpoint, authentication, database, queue, scheduler, workflow engine, event store, vector database, model provider, production service, or private-data path was introduced.
- Deterministic tool logic remains separable from transport inside the application.
- A shared Forge package remains deferred until a second real consumer and independent change pressure exist.
- Ordinary repository workflows remain complete without MCP.

Forge may search, inspect, validate, and generate clearly labeled synthetic or draft output. It may not mutate files, Git, GitHub, issues, pull requests, tags, releases, canonical records, permissions, gameplay, or institutional state. It may not invoke arbitrary shell commands, subprocesses, dynamic modules, network requests, providers, credentials, endpoints, or production connectors.

## Completed workstreams

### 7.1 Forge boundary and registry

Defined application ownership, public and synthetic information classes, server-owned registry and source authority, risk classes, ten accepted tool identities, limits, compatibility, migration, funding neutrality, prohibited capabilities, literal non-authority, validators, and public tests.

### 7.2 Local transport

Implemented MCP protocol revision `2025-11-25`, local newline-delimited UTF-8 `stdio`, initialization, discovery, deterministic calls and refusals, cancellation, bounded framing, shutdown, direct harnesses, and public-safe errors.

### 7.3 Source catalogue and provenance

Defined nine server-owned roots, exact allowlists, prohibited paths, traversal and symlink isolation, deterministic ordering, SHA-256 provenance, bounded locators, truncation, partial states, public-safe errors, validators, and tests.

### 7.4 Lore and schema tools

Enabled `forge.search.lore`, `forge.validate.content`, `forge.inspect.quest-schema`, and `forge.validate.quest`.

### 7.5 Architecture and decision tools

Enabled `forge.search.architecture` and `forge.search.decision` with exact provenance and conservative authority classification.

### 7.6 Standards and synthetic connector fixtures

Enabled `forge.search.public-standards`, `forge.validate.mapping-draft`, and `forge.search.synthetic-connector-fixtures`.

### 7.7 Synthetic generation

Enabled `forge.generate.synthetic-data`, completing exactly ten accepted runtime identities through runtime registry revision `4`.

### 7.8 Scopes, limits, receipts, and errors

Applied one immutable server-owned execution scope per tool with centralized request, scan, result, output, timeout, cancellation, per-tool concurrency, serialized-materialization, receipt, and stable-error controls.

### 7.9 Agent security, compatibility, and operability

Added the 18-scenario adversarial matrix, runtime-integrity fingerprints, successful-result security postconditions, exact compatibility identities, additive migration records, static prohibited-capability auditing, provider-independent clean startup, and aggregate runtime validation.

### 7.10 Completion and Sprint 8 handoff

Published cross-contract reconciliation, 28 stable controls, 19 open holdpoints, 18 unresolved-work records, the completion record, status repairs, full validation, and the prepared public website handoff.

## Validation and merge evidence

- reviewed implementation head `32492040684c2a89e32c866888f6be0888ee1279` — CI 904, DCO 977;
- completed 7.10 evidence package `660b41e0ede313926a992c2ba7094a49fc756535` — CI 924, DCO 998;
- final reviewed branch head `8be922187955480a473f11f5e03ee61be0c666b2` — CI 926, DCO 1000, final PR-body DCO 1003; and
- squash merge commit `f28f054fe16d550fad37663cf234e06c5622dd42`.

## Completion rule and evidence limits

Sprint 7 completion does not establish production MCP, private Chronicle tools, provider approval, connector operation, clinical behavior, repository mutation authority, remote hosting, production deployment, statistical synthetic-data validity, production resource isolation, independent penetration testing, or specialist approval.

Every production, specialist, institutional, and measurement holdpoint remains open unless a later versioned record closes it with the required evidence.

## Handoff

The [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md) is the controlling post-merge handoff.

Sprint 8 implementation may begin only after the pre-Sprint 8 reconciliation is accepted and merged through issue #58. It must preserve `apps/site` as the single public website owner and migrate Website Track 0A in place.
