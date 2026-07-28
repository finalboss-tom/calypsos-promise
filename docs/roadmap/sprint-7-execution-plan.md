# Sprint 7 Execution Plan — Forge MCP and Agent Safety

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint sequence](sprints.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54)

- **Status:** ACTIVE — Sprint 7.1 in progress
- **Entry baseline:** `main` at pre-Sprint 7 reconciliation squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Branch:** `agent/sprint-7-forge-mcp`
- **Application:** `apps/mcp-forge`
- **Information boundary:** public repository material and explicitly synthetic data only
- **Certification boundary:** public contracts, deterministic validation, local synthetic evidence, and repository consistency; not production security, privacy, clinical, accessibility, legal, interoperability, operations, provider, or AI-safety certification

## Goal

Provide useful agent tooling without private health-data risk.

Forge reduces contributor friction through bounded public search, inspection, validation, and synthetic-draft generation. It remains optional and cannot become repository, filesystem, network, canonical, permission, gameplay, clinical, provider, or institutional authority.

## Accepted roadmap scope

Sprint 7 implements the accepted deliverables and acceptance criteria in [`sprints.md`](sprints.md) without changing their meaning or order.

Deliverables:

- MCP tool registry and risk classes;
- local `stdio` Forge MCP;
- lore search and validation tools;
- quest-schema tools;
- architecture and decision search;
- synthetic-data generation;
- public standards, mapping, and synthetic connector-fixture tools where appropriate;
- tool scopes, rate limits, receipts, and errors;
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

Sprint 7 begins as one local application at `apps/mcp-forge`.

- Default transport is local `stdio`.
- No remote endpoint, authentication, database, queue, scheduler, workflow engine, event store, vector database, model provider, production service, or private-data path is introduced.
- Deterministic tool logic remains separable from transport inside the application.
- A shared Forge package is deferred until a second real consumer and independent change pressure exist.
- Ordinary repository workflows remain complete without MCP.

Forge may search, inspect, validate, and generate clearly labeled synthetic or draft output. It may not mutate files, Git, GitHub, issues, pull requests, tags, releases, canonical records, permissions, gameplay, or institutional state. It may not invoke arbitrary shell commands, subprocesses, dynamic modules, network requests, providers, credentials, or production endpoints.

## Workstreams

### 7.1 Forge boundary and registry

Define:

- application ownership and dependency direction;
- contract and registry revisions;
- public and synthetic information classes;
- server-owned registry and source authority;
- read, validation, synthetic-draft, and prohibited risk classes;
- initial accepted tool identities;
- lifecycle and transport-exposure states;
- conservative resource-limit contracts;
- receipt, error, compatibility, and migration references;
- prohibited capabilities;
- funding neutrality;
- literal non-authority; and
- deterministic validators and public tests.

**Exit:** all initial tools remain planned and unexposed; the boundary is public, validated, documented, and green in repository CI.

### 7.2 Local transport

Implement the local `stdio` MCP server, initialization, deterministic invocation envelope, direct test harness, cancellation, shutdown, and transport-safe errors.

**Exit:** transport is local-only, provider-free, credential-free, network-free, and cannot expand tool authority.

### 7.3 Source catalogue and provenance

Define exact repository root resolution, source allowlists, prohibited paths, path normalization, traversal and symlink isolation, content digests, line and object locators, deterministic ordering, truncation, and partial results.

**Exit:** no caller-selected root or arbitrary file can be read; every result has public-safe provenance.

### 7.4 Lore and schema tools

Implement lore search, content validation, quest-schema inspection, and quest validation through existing public package exports and deterministic validators.

**Exit:** tool success remains distinct from canon acceptance or repository mutation.

### 7.5 Architecture and decision tools

Implement architecture, decision, policy, assumption, roadmap, and status search with exact provenance and visible authority status.

**Exit:** search results cannot silently promote proposed, planned, synthetic, or historical material to accepted current truth.

### 7.6 Standards and synthetic connector fixtures

Implement search and validation for explicitly public standards references, public mapping drafts, and synthetic connector fixtures.

**Exit:** no proprietary mapping, provider credential, protected finding, certification claim, or provider preference is accessible or created.

### 7.7 Synthetic generation

Implement deterministic or reproducible synthetic generation with synthetic labels, generator and schema revisions, diverse and accessibility-relevant cases, deterministic validation, and draft-only mapping behavior.

**Exit:** generated output cannot self-approve or become canonical, clinical, provider, or connector authority.

### 7.8 Scopes, limits, receipts, and errors

Implement tool scopes, request, scan, result, output, timeout, cancellation, concurrency, and memory limits; stable partial results; public-safe receipts; and stable errors.

**Exit:** limits are enforced and receipts reveal no absolute paths, environment values, stack traces, credentials, or protected source material.

### 7.9 Agent security, compatibility, and operability

Exercise path traversal, symlink escape, arbitrary roots, shell, network, module loading, registry mutation, confused-deputy behavior, source suppression, oversized inputs, timeout, cancellation, receipt leakage, synthetic-label removal, mapping self-approval, funding influence, and protected-source access.

Define compatibility, migration, clean local startup, focused validation, and contributor documentation. Review issue #50 only if Forge has become a genuine Aster consumer with concrete friction evidence.

**Exit:** all public tools and contracts are adversarially tested, versioned, locally reproducible, and provider-independent.

### 7.10 Completion

Publish cross-contract reconciliation, control and evidence mapping, specialist holdpoints, unresolved work, completion record, status repairs, full validation, and the Sprint 8 handoff.

**Exit:** accepted scope is complete at the stated evidence level and explicit founding-steward acceptance remains a separate human gate.

## Initial 7.1 evidence

Sprint 7.1 creates `@calypsos-promise/mcp-forge` as a private workspace application with a deliberate contract export surface.

It defines seven accepted public or synthetic information classes, four risk classes, ten planned tool identities, twenty-two prohibited capabilities, conservative resource-limit contracts, exact compatibility and migration rules, a literal false authority matrix, funding-neutrality controls, deterministic validators, and public-surface tests.

It does not implement transport or repository reads.

## Information handling

Only public repository records and public synthetic evidence may appear in Sprint 7 issues, branches, pull requests, fixtures, tests, comments, logs, and artifacts.

No production health data, credentials, private provider negotiations, contracts, evaluations, proprietary mappings, protected interoperability findings, real exploit details, protected audit, account-specific support, or private operational evidence belongs here.

## Validation strategy

Every workstream should run the narrowest focused validation first and then the complete repository check.

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

Public tests should import the application contract through `dist/index.js` rather than private source paths.

## Completion rule

Sprint 7 completion does not establish production MCP, private Chronicle tools, provider approval, clinical behavior, repository mutation authority, remote hosting, deployment, or independent specialist approval.

The sprint remains open until all accepted workstreams and criteria are evidenced, the completion package is validated, and the founding steward explicitly accepts and squash merges the final pull request.
