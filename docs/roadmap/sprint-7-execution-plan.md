# Sprint 7 Execution Plan — Forge MCP and Agent Safety

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint sequence](sprints.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Forge boundary](../architecture/forge-mcp-boundary-and-tool-registry.md) · [Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](../architecture/forge-mcp-source-catalogue-and-provenance.md) · [Lore and schema tools](../architecture/forge-mcp-lore-and-schema-tools.md) · [Architecture and decision tools](../architecture/forge-mcp-architecture-and-decision-tools.md) · [Standards, mapping, and synthetic connectors](../architecture/forge-mcp-public-standards-mapping-and-synthetic-connectors.md) · [Deterministic synthetic generation](../architecture/forge-mcp-deterministic-synthetic-generation.md) · [Scopes, limits, receipts, and errors](../architecture/forge-mcp-scopes-limits-receipts-and-errors.md) · [Agent security, compatibility, and operability](../architecture/forge-mcp-agent-security-compatibility-and-operability.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** ACTIVE — Sprint 7.1–7.9 implemented; Sprint 7.10 next and unstarted
- **Entry baseline:** `main` at pre-Sprint 7 reconciliation squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Branch:** `agent/sprint-7-forge-mcp`
- **Application:** `apps/mcp-forge`
- **Information boundary:** public repository material and explicitly synthetic data only
- **Certification boundary:** public contracts, deterministic validation, local synthetic evidence, repository consistency, static production-source auditing, and clean local startup; not production security, privacy, clinical, accessibility, legal, interoperability, operations, provider, statistical, resource-isolation, penetration-test, or AI-safety certification

## Goal

Provide useful agent tooling without private health-data risk.

Forge reduces contributor friction through bounded public search, inspection, validation, and synthetic-draft generation. It remains optional and cannot become repository, filesystem, network, canonical, permission, gameplay, clinical, provider, connector, or institutional authority.

## Accepted roadmap scope

Sprint 7 implements the accepted deliverables and acceptance criteria in [`sprints.md`](sprints.md) without changing their meaning or order.

Deliverables:

- MCP tool registry and risk classes;
- local `stdio` Forge MCP;
- lore search and validation tools;
- quest-schema tools;
- architecture and decision search;
- public standards, mapping, and synthetic connector-fixture tools;
- synthetic-data generation;
- tool scopes, limits, receipts, and errors;
- sponsor-funded tool and infrastructure conflict review; and
- an agent-security test suite.

Acceptance criteria:

- Forge operates entirely on public documentation and synthetic data;
- retrieved content cannot grant itself tool authority;
- tool contracts are versioned and testable;
- generated mappings remain drafts requiring deterministic validation and human review;
- funded tools remain subject to the same public-data, synthetic-only, risk, provider-neutrality, review, and publication boundaries as unfunded tools; and
- tools cannot access private provider negotiations, contracts, credentials, production endpoints, proprietary mappings, or protected interoperability findings.

## Permanent implementation boundary

Sprint 7 remains one local application at `apps/mcp-forge`.

- Default transport is local `stdio`.
- No remote endpoint, authentication, database, queue, scheduler, workflow engine, event store, vector database, model provider, production service, or private-data path is introduced.
- Deterministic tool logic remains separable from transport inside the application.
- A shared Forge package is deferred until a second real consumer and independent change pressure exist.
- Ordinary repository workflows remain complete without MCP.

Forge may search, inspect, validate, and generate clearly labeled synthetic or draft output. It may not mutate files, Git, GitHub, issues, pull requests, tags, releases, canonical records, permissions, gameplay, or institutional state. It may not invoke arbitrary shell commands, subprocesses, dynamic modules, network requests, providers, credentials, endpoints, or production connectors.

## Workstreams

### 7.1 Forge boundary and registry

Defines application ownership, public and synthetic information classes, server-owned registry and source authority, risk classes, ten accepted tool identities, limits, compatibility, migration, funding neutrality, prohibited capabilities, literal non-authority, validators, and public tests.

**Exit:** met. The accepted registry remains unchanged and every runtime tool must originate from it.

### 7.2 Local transport

Implements finalized MCP protocol revision `2025-11-25`, local newline-delimited UTF-8 `stdio`, initialization, discovery, deterministic calls and refusals, cancellation, bounded framing, shutdown, direct harnesses, and public-safe errors.

**Exit:** met. Transport remains local-only, provider-free, credential-free, network-free, and unable to expand tool authority.

### 7.3 Source catalogue and provenance

Defines fixed repository discovery, nine server-owned roots, exact allowlists, prohibited paths, traversal and symlink isolation, deterministic ordering, SHA-256 provenance, line and object locators, truncation, partial states, public-safe errors, validators, and tests.

**Exit:** met. No caller-selected root or arbitrary path can be read.

### 7.4 Lore and schema tools

Activates `forge.search.lore`, `forge.validate.content`, `forge.inspect.quest-schema`, and `forge.validate.quest` through local `stdio`.

**Exit:** met. Search and validation remain source-linked evidence and cannot approve canon, mutate the repository, complete quests, grant rewards, prove semantic completeness, or establish clinical safety.

### 7.5 Architecture and decision tools

Activates `forge.search.architecture` and `forge.search.decision` with exact line provenance and visible conservative authority states.

**Exit:** met. Proposed, planned, active-hypothesis, historical, superseded, unresolved, and reference-only records cannot be silently promoted to accepted current truth.

### 7.6 Standards and synthetic connector fixtures

Activates `forge.search.public-standards`, `forge.validate.mapping-draft`, and `forge.search.synthetic-connector-fixtures`.

**Exit:** met. Public standards search remains non-certifying; mapping validation requires draft status and human review; connector search returns only explicitly synthetic, credential-free, personal-data-free, non-production fixtures and exposes skipped unclassified records.

### 7.7 Synthetic generation

Activates `forge.generate.synthetic-data` through runtime registry revision `4`, exposing all ten accepted identities in accepted registry order.

The tool generates deterministic synthetic quest or mapping-draft batches from one bounded public-safe seed, count, and profile. Every artifact is immediately passed through its accepted deterministic validator and returned with generator, schema, validator, case, classification, and diversity evidence.

**Exit:** met at the public-contract and synthetic-evidence level. Generated output cannot self-approve or become canonical, clinical, provider, mapping, connector, permission, gameplay, production, or institutional authority. A passing batch does not prove statistical validity, demographic representativeness, accessibility conformance, clinical realism, privacy for arbitrary caller input, or fitness for model training.

### 7.8 Scopes, limits, receipts, and errors

Applies one revision-1 server-owned execution scope to every enabled tool. Scopes derive immutable request, scan, result, output, timeout, and per-tool concurrency ceilings from the accepted Sprint 7.1 registry and add an explicit serialized-materialization budget.

The central controller rejects non-serializable and oversized requests, enforces cancellation and timeout, controls per-tool concurrency, verifies scan and result postconditions, measures the complete output envelope, rejects caller-owned receipts, preserves visible completion state, and returns bounded revision-1 receipts and stable errors.

**Exit:** met at the public-contract and local deterministic-evidence level. Limits are enforced, partial states remain visible, receipts are server-owned and bounded, stable errors do not leak prohibited material, and no scope or receipt creates authority.

### 7.9 Agent security, compatibility, and operability

Adds:

- a revision-1 adversarial scenario matrix covering every named 7.9 attack class plus execution-scope mutation;
- runtime-integrity fingerprints for the server-owned boundary, registries, catalogue, descriptors, and execution scopes;
- successful-result security postconditions for provenance, partial-state evidence, tool identity, documentation authority, standards neutrality, connector labels, content and quest authority, mapping drafts, and generated records;
- stable integrity and postcondition error codes inside the existing bounded error envelope;
- a pre-stable exact-revision compatibility manifest and additive migration records;
- a revision-1 clean-startup and contributor-operability contract;
- a static production-source audit for shell, network, VM, worker, dynamic-loading, and code-evaluation primitives;
- a provider and dependency audit showing Forge depends only on `@calypsos-promise/content-schema`; and
- clean compiled-entrypoint startup from a descendant directory with an empty environment.

Issue #50 remains untriggered because Forge does not depend on or consume `@calypsos-promise/aster`, and the workstream produced no concrete Aster API or validator friction.

**Exit:** met at the public-contract, local runtime, static source, clean-startup, and synthetic-evidence level. All ten tools and cross-cutting contracts are adversarially tested, exact-revision compatibility is explicit, migrations are visible, startup is reproducible without credentials or providers, and the runtime remains provider-independent.

This exit does not establish independent penetration testing, production sandboxing, operating-system attestation, secure boot, production monitoring, incident response, privacy certification, or security after compromise of the host process or checkout.

### 7.10 Completion

Publish cross-contract reconciliation, control and evidence mapping, specialist holdpoints, unresolved work, completion record, status repairs, full validation, and the Sprint 8 handoff.

**Exit:** accepted scope is complete at the stated evidence level and explicit founding-steward acceptance remains a separate human gate.

## Validated evidence through 7.8

The completed prior workstreams establish:

- accepted registry revision `1` and runtime registry revision `4`;
- finalized local MCP transport revision `2025-11-25`;
- fixed public and synthetic source roots with exact provenance;
- ten enabled search, inspection, validation, fixture, and generation tools;
- execution contract revision `1` with bounded receipts and stable errors;
- deterministic validation and generation;
- inert default sessions;
- retrieved-instruction isolation; and
- visible non-authority for canon, Chronicle truth, permission, gameplay, rewards, clinical claims, providers, mappings, connectors, production readiness, and institutional decisions.

Sprint 7.6 final head `16701b72fe3d11159774aac746adc9f0ead7743a` passed CI run 833 and DCO run 903. Sprint 7.7 final head `97b8b9152f1efcd0b1284daafa35c441d3ec0e25` passed CI run 858 and DCO run 930. Sprint 7.8 final head `9fcac0a6ab912202b34c71350a92559d8b9f280b` passed CI run 877 and DCO run 950.

## Sprint 7.9 evidence

Sprint 7.9 adds:

- security, compatibility-manifest, and operability contract revision `1`;
- 18 unique public-or-synthetic adversarial scenarios;
- central integrity checks before every real tool operation;
- central security postconditions before every successful receipt;
- rejection of missing provenance, hidden partial state, tool redirection, synthetic-label removal, and mapping self-approval;
- static verification that production Forge source contains no shell, network-client, socket, VM, worker-thread, dynamic-import, `eval`, or `require` primitive;
- a runtime fetch trap showing no network use;
- protected-source and traversal service tests with no path or content leakage;
- runtime and scope mutation candidates that fail integrity validation;
- funding-influence tamper and unknown-field rejection;
- exact compatibility identities for the active contracts;
- additive migration records for runtime revisions `1`–`4` and execution envelope v1;
- clean entrypoint startup from `apps/mcp-forge/src` with an empty environment;
- exact ten-tool discovery and deterministic generation through the child process;
- one aggregate `validateForgeCompleteRuntime()` entry point;
- explicit provider independence and no Aster dependency; and
- a canonical [agent security, compatibility, and operability architecture](../architecture/forge-mcp-agent-security-compatibility-and-operability.md).

Focused implementation and final reconciliation evidence are recorded in issue #54 and draft PR #55.

## Information handling

Only public repository records and public synthetic evidence may appear in Sprint 7 issues, branches, pull requests, fixtures, tests, comments, logs, and artifacts.

No production health data, credentials, private provider negotiations, contracts, evaluations, proprietary mappings, protected interoperability findings, real exploit details, protected audit, account-specific support, or private operational evidence belongs here.

A seed or other input that satisfies a public-safe syntax contract is not proof that its contents are appropriate. Private or production information remains prohibited.

## Validation strategy

Every workstream runs the narrowest focused validation first and then the complete repository check.

The final reviewed head must pass:

- formatting;
- documentation links;
- repository policy;
- economics validation;
- content validation;
- lint;
- typecheck;
- tests; and
- DCO attestation.

Public tests import the application contract through `dist/index.js` rather than private source paths.

## Completion rule

Sprint 7 completion does not establish production MCP, private Chronicle tools, provider approval, connector operation, clinical behavior, repository mutation authority, remote hosting, deployment, statistical synthetic-data validity, production resource isolation, independent penetration testing, or specialist approval.

The sprint remains open until workstream 7.10 and the sprint-level acceptance criteria are evidenced, the completion package is validated, and the founding steward explicitly accepts and squash merges the final pull request.
