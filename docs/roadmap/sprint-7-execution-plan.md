# Sprint 7 Execution Plan — Forge MCP and Agent Safety

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint sequence](sprints.md) · [Completion record](sprint-7-completion-record.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Cross-contract reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md) · [Control map](../architecture/forge-sprint-7-control-and-evidence-map.md) · [Holdpoints](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** ALL WORKSTREAM EVIDENCE PRESENT — ready for founding-steward acceptance; not merged
- **Entry baseline:** `main` at pre-Sprint 7 reconciliation squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Branch:** `agent/sprint-7-forge-mcp`
- **Application:** `apps/mcp-forge`
- **Information boundary:** public repository material and explicitly synthetic data only
- **Certification boundary:** local public/synthetic implementation, deterministic validation, adversarial testing, repository consistency, static production-source auditing, compatibility, migration, and clean startup; not production security, privacy, clinical, accessibility, legal, interoperability, operations, provider, statistical, resource-isolation, penetration-test, or AI-safety certification

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

The completion package supports all criteria at the bounded local implementation and public/synthetic-test evidence level. Final acceptance remains a separate founding-steward decision.

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

**Exit:** met. The accepted registry remains unchanged and every runtime tool originates from it.

### 7.2 Local transport

Implements MCP protocol revision `2025-11-25`, local newline-delimited UTF-8 `stdio`, initialization, discovery, deterministic calls and refusals, cancellation, bounded framing, shutdown, direct harnesses, and public-safe errors.

**Exit:** met. Transport remains local-only, provider-free, credential-free, network-free, and unable to expand tool authority.

### 7.3 Source catalogue and provenance

Defines fixed repository discovery, nine server-owned roots, exact allowlists, prohibited paths, traversal and symlink isolation, deterministic ordering, SHA-256 provenance, line and object locators, truncation, partial states, public-safe errors, validators, and tests.

**Exit:** met. No caller-selected root or arbitrary path can be read.

### 7.4 Lore and schema tools

Activates `forge.search.lore`, `forge.validate.content`, `forge.inspect.quest-schema`, and `forge.validate.quest` through local `stdio`.

**Exit:** met. Search and validation remain source-linked evidence and cannot approve canon, mutate the repository, complete quests, grant rewards, prove semantic completeness, or establish clinical safety.

### 7.5 Architecture and decision tools

Activates `forge.search.architecture` and `forge.search.decision` with exact line provenance and visible conservative authority states.

**Exit:** met. Proposed, planned, working, historical, superseded, unresolved, and reference-only material cannot be silently promoted to accepted current truth.

### 7.6 Standards and synthetic connector fixtures

Activates `forge.search.public-standards`, `forge.validate.mapping-draft`, and `forge.search.synthetic-connector-fixtures`.

**Exit:** met. Public standards search remains non-certifying; mapping validation requires draft status and human review; connector search returns only explicitly synthetic, credential-free, personal-data-free, non-production fixtures and exposes skipped unclassified records.

### 7.7 Synthetic generation

Activates `forge.generate.synthetic-data` through runtime registry revision `4`, exposing all ten accepted identities in accepted registry order.

The tool generates deterministic synthetic quest or mapping-draft batches from one bounded public-safe seed, count, and profile. Every artifact is immediately passed through its accepted deterministic validator and returned with generator, schema, validator, case, classification, and diversity evidence.

**Exit:** met at the public-contract and synthetic-evidence level. Generated output cannot self-approve or become canonical, clinical, provider, mapping, connector, permission, gameplay, production, or institutional authority. A passing batch does not prove statistical validity, demographic representativeness, accessibility conformance, clinical realism, privacy for arbitrary input, de-identification, or publication fitness.

### 7.8 Scopes, limits, receipts, and errors

Applies one revision-1 server-owned execution scope to every enabled tool. The central controller rejects non-serializable and oversized requests, enforces cancellation and timeout, controls per-tool concurrency, verifies scan and result postconditions, measures the complete output envelope, rejects caller-owned receipts, preserves visible completion state, and returns bounded revision-1 receipts and stable errors.

**Exit:** met at the public-contract and local deterministic-evidence level. Limits are enforced, partial states remain visible, receipts are server-owned and bounded, stable errors do not leak prohibited material, and no scope or receipt creates authority.

### 7.9 Agent security, compatibility, and operability

Adds a revision-1 adversarial matrix, runtime-integrity fingerprints, successful-result security postconditions, stable integrity and postcondition errors, an exact-revision compatibility manifest, additive migrations, a clean-startup contract, a static prohibited-capability audit, provider and dependency evidence, and compiled-entrypoint startup from a descendant directory with an empty environment.

Issue #50 remains untriggered because Forge does not depend on or consume `@calypsos-promise/aster`, and no concrete Aster API or validator friction was produced.

**Exit:** met at the public-contract, local runtime, static source, clean-startup, and synthetic-evidence level. All ten tools and cross-cutting contracts are adversarially tested, compatibility and migrations are explicit, startup is reproducible without credentials or providers, and the runtime remains provider-independent.

This exit does not establish independent penetration testing, production sandboxing, operating-system attestation, secure boot, production monitoring, incident response, privacy certification, or safety after compromise of the host process or checkout.

### 7.10 Completion

Publishes:

- [Sprint 7 Cross-Contract Reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md);
- [Sprint 7 Control and Evidence Map](../architecture/forge-sprint-7-control-and-evidence-map.md);
- [Sprint 7 Specialist Holdpoint and Unresolved-Work Register](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md);
- [Sprint 7 Completion Record](sprint-7-completion-record.md);
- [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md);
- architecture, roadmap, documentation, and repository status repairs; and
- complete exact-head validation evidence after final reconciliation.

**Exit:** met at the documentation and evidence-package level, subject to final exact-head validation. The accepted scope is ready for founding-steward review. Acceptance and squash merge remain separate human gates.

## Completion evidence

The package records:

- exactly ten enabled tools in runtime registry revision `4`;
- execution, security, compatibility, operability, and aggregate validation revision `1`;
- public and explicitly synthetic sources only;
- deterministic validation and generation;
- allowlisted source provenance and visible partial states;
- bounded execution scopes, receipts, and stable errors;
- runtime integrity and successful-result postconditions;
- exact compatibility and additive migrations;
- clean credential-free provider-independent startup;
- twenty-eight stable controls;
- nineteen open Forge holdpoints;
- eighteen unresolved-work records;
- all acceptance-criterion mappings; and
- the bounded Sprint 8 website handoff.

The reviewed implementation head `32492040684c2a89e32c866888f6be0888ee1279` passed CI run 904 and DCO run 977 before the 7.10 completion documentation was added.

The final completion-package head and validation runs will be recorded in the completion record, issue #54, and PR #55 after exact-head validation.

## Information handling

Only public repository records and public synthetic evidence may appear in Sprint 7 issues, branches, pull requests, fixtures, tests, comments, logs, and artifacts.

No production health data, credentials, private provider negotiations, contracts, evaluations, proprietary mappings, protected interoperability findings, real exploit details, protected audit, account-specific support, or private operational evidence belongs here.

A seed or other input satisfying a public-safe syntax contract is not proof that its contents are appropriate. Private or production information remains prohibited.

## Validation strategy

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

All workstream and evidence-package requirements are present. The sprint remains open until the final exact head is green and the founding steward explicitly accepts and squash merges PR #55.
