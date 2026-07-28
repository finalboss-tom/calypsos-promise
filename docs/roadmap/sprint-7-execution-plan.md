# Sprint 7 Execution Plan — Forge MCP and Agent Safety

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint sequence](sprints.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Forge boundary](../architecture/forge-mcp-boundary-and-tool-registry.md) · [Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](../architecture/forge-mcp-source-catalogue-and-provenance.md) · [Lore and schema tools](../architecture/forge-mcp-lore-and-schema-tools.md) · [Architecture and decision tools](../architecture/forge-mcp-architecture-and-decision-tools.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** ACTIVE — Sprint 7.1–7.5 implemented and validated; Sprint 7.6 next
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

**Exit:** met. All initial tools remain planned and unexposed; the boundary is public, validated, documented, and green in repository CI.

### 7.2 Local transport

Implement the local `stdio` MCP server, initialization, deterministic invocation envelope, direct test harness, cancellation, shutdown, and transport-safe errors.

Sprint 7.2 pins finalized MCP protocol revision `2025-11-25`, exposes only initialization, `ping`, empty tool discovery, deterministic tool-call refusal, cancellation, and local shutdown, and keeps all repository reads and planned tools disabled.

**Exit:** met. Transport is local-only, provider-free, credential-free, network-free, repository-read-free, and unable to expand tool authority.

### 7.3 Source catalogue and provenance

Define exact repository root resolution, source allowlists, prohibited paths, path normalization, traversal and symlink isolation, content digests, line and object locators, deterministic ordering, truncation, and partial results.

**Exit:** met. No caller-selected root or arbitrary file can be read; every accepted source result has public-safe provenance.

### 7.4 Lore and schema tools

Implement lore search, content validation, quest-schema inspection, and quest validation through existing public package exports and deterministic validators.

**Exit:** met. Exactly four server-owned read-only tools are activated through local `stdio`; success remains distinct from canon acceptance, repository mutation, quest completion, reward grant, semantic completeness, or clinical safety. The clean implementation head passed CI run 767 and DCO run 832.

### 7.5 Architecture and decision tools

Implement architecture, decision, policy, assumption, roadmap, and status search with exact provenance and visible authority status.

**Exit:** met. Runtime registry revision `2` enables exactly six accepted local `stdio` tools, including architecture and decision search with exact line provenance and explicit conservative authority states. Proposed, planned, active-hypothesis, historical, superseded, unresolved, and reference-only records cannot be silently promoted to accepted current truth. Implementation head `5fca3dc6063b3c461fb153e6ab29460a0094202f` passed CI run 793 and DCO run 861.

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

## Validated 7.1 evidence

Sprint 7.1 creates `@calypsos-promise/mcp-forge` as a private workspace application with a deliberate contract export surface.

It defines seven accepted public or synthetic information classes, four risk classes, ten planned tool identities, twenty-two prohibited capabilities, conservative resource-limit contracts, exact compatibility and migration rules, a literal false authority matrix, funding-neutrality controls, deterministic validators, and public-surface tests.

All tools remain `planned` and `not-exposed` in the accepted Sprint 7.1 contract registry.

## Sprint 7.2 transport evidence

Sprint 7.2 adds:

- transport contract revision `1`;
- finalized MCP protocol revision `2025-11-25` as the only supported wire version;
- a deterministic session state machine covering created, initialize-responded, ready, closing, and closed states;
- strict initialization and initialized-notification sequencing;
- `ping`;
- empty `tools/list` discovery for inert sessions;
- deterministic tool-call refusal when no server-owned service is supplied;
- server-owned request-handler injection for direct synthetic tests only;
- `notifications/cancelled` support for active non-initialize requests;
- response suppression after cancellation;
- EOF, `SIGINT`, and `SIGTERM` shutdown;
- newline-delimited UTF-8 stdio framing;
- 65,536-byte default transport message limit;
- parse, invalid-request, method, parameter, initialization, closing, and handler error contracts;
- strict stdout protocol isolation and stderr-only diagnostics;
- a direct transport harness; and
- public direct and stream-level tests.

Sprint 7.2 does not use the network, call a provider, access credentials, mutate files, or create domain authority.

The still-pre-release `2026-07-28` protocol path is deferred to explicit Sprint 7.9 compatibility and migration review rather than being adopted silently.

## Sprint 7.3 evidence

Sprint 7.3 defines nine server-owned source roots, exact-file and recursive-tree allowlists, public and synthetic information-class coverage, process-root discovery, prohibited path and credential classes, normalized path resolution, plain and encoded traversal rejection, component-level symlink rejection, resolved-path containment, locale-independent ordering, SHA-256 content digests, byte and line counts, whole-file, line-range, and object locators, explicit truncation and partial reasons, public-safe errors, deterministic validators, and public synthetic tests.

The source core is available through the direct application API and to server-owned enabled tools. No caller-selected root or arbitrary path is accepted.

## Sprint 7.4 evidence

Sprint 7.4 adds:

- runtime registry revision `1` without rewriting the accepted Sprint 7.1 registry;
- exact activation of `forge.search.lore`, `forge.validate.content`, `forge.inspect.quest-schema`, and `forge.validate.quest`;
- local-stdio-only exposure for those four identities;
- continued planned and unexposed status for the remaining six identities;
- server-owned MCP descriptors and dispatch allowlists;
- deterministic Unicode-normalized lore search with exact phrase, all-term, and partial-term classes;
- exact object or line provenance with no hidden numeric rank;
- deterministic content and quest validation through the public `@calypsos-promise/content-schema` export;
- explicit inline `public-content` or `public-synthetic-fixture` classification;
- allowlisted public source-path validation;
- fixed quest-schema inspection at `packages/content-schema/schema/content.schema.json`;
- visible non-authority for canon, repository mutation, canonical writes, permission, gameplay completion, rewards, clinical claims, and institutional decisions;
- stable public tool errors; and
- direct and transport-level tests, including untrusted instruction isolation.

Tool success remains evidence only. It does not approve canon, accept a repository change, complete gameplay, grant rewards, prove semantic completeness, prove clinical safety, or create institutional authority.

The clean implementation head passed formatting, documentation links, repository policy, economics validation, content validation, lint, typecheck, tests, and DCO through CI run 767 and DCO run 832.

## Sprint 7.5 evidence

Sprint 7.5 adds:

- runtime registry revision `2` while preserving the accepted Sprint 7.1 registry;
- exact activation of `forge.search.architecture` and `forge.search.decision` alongside the four existing Sprint 7.4 tools;
- local-stdio-only exposure for exactly six accepted identities;
- continued planned and unexposed status for the remaining four accepted identities;
- architecture search over allowlisted frozen, architecture, policy, governance, security, economics, and product records;
- decision search over allowlisted decisions, assumptions, roadmaps, workstreams, completion records, and current-status evidence;
- Unicode-normalized exact-phrase, all-term, and partial-term match classes without hidden numeric ranking;
- exact match-line provenance, document title, document class, section path, and status-evidence provenance;
- explicit `frozen-current`, `accepted-current`, `active-working-hypothesis`, `proposed`, `planned`, `historical`, `superseded`, `unresolved`, and `reference-only` states;
- explicit classification bases from status lines, confidence lines, headings, matched lines, path class, or conservative fallback;
- fail-closed unresolved classification for ambiguous decision and assumption records;
- reference-only treatment for other ambiguous public documentation;
- retrieved-instruction isolation preventing content from elevating status, changing registry or source authority, suppressing provenance, or creating domain authority;
- direct and transport-level tests preserving all Sprint 7.4 behavior; and
- complete repository validation on implementation head `5fca3dc6063b3c461fb153e6ab29460a0094202f` through CI run 793 and DCO run 861.

Search output remains evidence only. It cannot approve or change a decision, override the documentation authority order, create Chronicle truth or House of Keys permission, approve canon or mappings, mutate the repository, complete gameplay, grant rewards, endorse a provider, or create institutional authority.

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
