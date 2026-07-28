# Sprint 7 Execution Plan — Forge MCP and Agent Safety

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint sequence](sprints.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Forge boundary](../architecture/forge-mcp-boundary-and-tool-registry.md) · [Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](../architecture/forge-mcp-source-catalogue-and-provenance.md) · [Lore and schema tools](../architecture/forge-mcp-lore-and-schema-tools.md) · [Architecture and decision tools](../architecture/forge-mcp-architecture-and-decision-tools.md) · [Standards, mapping, and synthetic connectors](../architecture/forge-mcp-public-standards-mapping-and-synthetic-connectors.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** ACTIVE — Sprint 7.1–7.6 implemented; final 7.6 status-head validation pending; Sprint 7.7 next and unstarted
- **Entry baseline:** `main` at pre-Sprint 7 reconciliation squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Branch:** `agent/sprint-7-forge-mcp`
- **Application:** `apps/mcp-forge`
- **Information boundary:** public repository material and explicitly synthetic data only
- **Certification boundary:** public contracts, deterministic validation, local synthetic evidence, and repository consistency; not production security, privacy, clinical, accessibility, legal, interoperability, operations, provider, or AI-safety certification

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

Activates:

- `forge.search.public-standards`;
- `forge.validate.mapping-draft`; and
- `forge.search.synthetic-connector-fixtures`.

Runtime registry revision `3` exposes exactly nine accepted identities through local `stdio`. `forge.generate.synthetic-data` remains planned and unexposed for Sprint 7.7.

**Exit:** implementation complete; final status-head validation pending. Public standards search returns exact provenance without completeness, certification, or provider-preference claims. Mapping validation requires draft status, human interoperability and semantic review, and explicit non-authority claims. Connector search returns only explicitly synthetic, credential-free, personal-data-free, non-production fixtures and exposes skipped unclassified records. No proprietary mapping, provider credential, protected finding, certification claim, semantic-equivalence approval, provider preference, connector activation, production behavior, or institutional authority is accessed or created.

### 7.7 Synthetic generation

Implement deterministic or reproducible synthetic generation with synthetic labels, generator and schema revisions, diverse and accessibility-relevant cases, deterministic validation, and draft-only mapping behavior.

**Exit:** generated output cannot self-approve or become canonical, clinical, provider, mapping, or connector authority.

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

## Validated evidence through 7.5

The completed workstreams establish:

- accepted registry revision `1` and runtime revisions `1` and `2`;
- finalized local MCP transport revision `2025-11-25`;
- fixed public and synthetic source roots with exact provenance;
- four source-linked lore and schema tools;
- two source-linked architecture and decision tools;
- deterministic validation and public-safe errors;
- inert default sessions;
- retrieved-instruction isolation; and
- visible non-authority for canon, Chronicle truth, permission, gameplay, rewards, clinical claims, providers, mappings, and institutional decisions.

Sprint 7.5 implementation head `5fca3dc6063b3c461fb153e6ab29460a0094202f` passed CI run 793 and DCO run 861. Its final reconciled head `fc2f11c72e21aef573f6c1212880aed4cffb47f1` passed CI run 801 and DCO run 870.

## Sprint 7.6 evidence

Sprint 7.6 adds:

- tool contract revision `1` and runtime registry revision `3`;
- exact activation of the three accepted standards, mapping-draft, and synthetic-fixture identities;
- continued local-stdio-only exposure for exactly nine identities;
- continued planned and unexposed status for `forge.generate.synthetic-data`;
- deterministic Unicode-normalized public standards search with exact line provenance and no hidden numeric rank;
- explicit no-completeness, no-certification, no-network, and no-provider-preference results;
- revision-1 mapping-draft validation for inline public or synthetic records and allowlisted public JSON sources;
- bounded source and target identities, unique mapping entries, accepted transform and confidence classes, synthetic evidence, and required interoperability and semantic review;
- rejection of approval, certification, production-readiness, provider-default, and provider-preference fields or claims;
- explicit synthetic-only connector fixture filtering and exact object provenance;
- visible `unclassified-fixture-skipped` partial evidence;
- one pinned public FHIR R4 reference, one public draft mapping example, and one fictional synthetic connector fixture;
- direct and transport-level tests; and
- preservation of all six previously validated tools inside the nine-tool runtime.

The functional 7.6 head passed documentation links, repository policy, economics validation, content validation, lint, typecheck, and tests in CI run 815; DCO run 885 passed. Formatting was applied exactly afterward. Final combined status-head validation remains pending.

## Information handling

Only public repository records and public synthetic evidence may appear in Sprint 7 issues, branches, pull requests, fixtures, tests, comments, logs, and artifacts.

No production health data, credentials, private provider negotiations, contracts, evaluations, proprietary mappings, protected interoperability findings, real exploit details, protected audit, account-specific support, or private operational evidence belongs here.

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

Sprint 7 completion does not establish production MCP, private Chronicle tools, provider approval, connector operation, clinical behavior, repository mutation authority, remote hosting, deployment, or independent specialist approval.

The sprint remains open until all accepted workstreams and criteria are evidenced, the completion package is validated, and the founding steward explicitly accepts and squash merges the final pull request.
