# Forge MCP Boundary and Tool Registry

[Architecture index](README.md) · [Pre-Sprint 7 review](../roadmap/pre-sprint-7-alignment-review.md) · [Sprint 7 execution plan](../roadmap/sprint-7-execution-plan.md) · [Sprint 7 issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54)

- **Status:** Sprint 7.1 baseline — public contract and synthetic-test evidence only
- **Application:** `apps/mcp-forge`
- **Public workspace identity:** `@calypsos-promise/mcp-forge`
- **Contract version:** `0.1.0-pre.1`
- **Registry revision:** `1`
- **Transport status:** not implemented; every initial tool is `planned` and `not-exposed`
- **Information boundary:** allowlisted public repository material and explicitly synthetic data only

## Purpose

Forge is the bounded local contributor-tool application for Sprint 7. It will expose selected repository search, inspection, validation, and synthetic-draft capabilities through local `stdio` MCP without becoming a general shell, arbitrary filesystem reader, repository mutation agent, private Chronicle service, provider gateway, or institutional authority.

Sprint 7.1 establishes what Forge is allowed to become before transport or filesystem behavior exists.

## Ownership and dependency direction

`apps/mcp-forge` owns:

- local MCP transport composition;
- server-owned tool registration and lifecycle;
- application-level source-catalogue binding;
- public-safe result, receipt, and error translation;
- bounded orchestration of deterministic public repository validators and search functions; and
- future local process startup and shutdown behavior.

It does not become the canonical home for reusable content, Chronicle, House of Keys, Aster, standards, or provider-independent domain rules. Existing package public exports remain the inward dependency boundary.

The deterministic tool core remains separable from transport handling inside the application. No shared Forge package is created until a second real consumer and independent change pressure justify extraction.

## Contract-only status

All ten accepted initial tool identities are currently:

- lifecycle: `planned`;
- transport exposure: `not-exposed`;
- implementation evidence: contract and deterministic validation only; and
- result authority: none.

A tool may not become `enabled` or `local-stdio-only` merely because its identity appears in the registry. Later workstreams must implement and validate its transport, source catalogue, path isolation, behavior, limits, receipts, errors, compatibility, migration, and security evidence.

## Information classes

The initial accepted information classes are:

| Class                                | Purpose                                                                              | Synthetic-only |
| ------------------------------------ | ------------------------------------------------------------------------------------ | -------------- |
| `public-documentation`               | public documentation, decisions, policies, assumptions, roadmaps, and status records | no             |
| `public-content`                     | public lore, quest, dialogue, education, and safety content                          | no             |
| `public-schema`                      | public schema and contract sources used by deterministic validators                  | no             |
| `public-synthetic-fixture`           | explicitly synthetic public fixtures and test evidence                               | yes            |
| `public-generated-artifact`          | generated public schema artifacts approved for repository use                        | no             |
| `public-standards-reference`         | explicitly public standards references and public mapping guidance                   | no             |
| `public-synthetic-connector-fixture` | synthetic connector examples with no proprietary or protected source material        | yes            |

Every source class:

- is public-only;
- requires a server-owned root;
- cannot authorize personal data, credentials, or protected operational evidence; and
- remains `contract-only` until Sprint 7.3 defines exact repository roots, file classes, exclusions, path resolution, symlink handling, provenance, and source revisions.

A file being present in a checkout does not make it an approved Forge source.

## Risk classes

### `read-public`

Bounded search or inspection of allowlisted public sources. It permits `search` and `inspect` operations only.

### `validate-public`

Deterministic validation of public or explicitly synthetic inputs with no mutation. Passing validation proves only conformance to the named validator revision.

### `generate-synthetic-draft`

Generation of explicitly synthetic or draft output requiring deterministic validation and human review before ordinary repository acceptance.

### `unsupported-or-prohibited`

Mutation, shell, network, private-data, credential, arbitrary-resource, production, or consequential behavior. It permits no operation.

All risk classes explicitly deny mutation, network, private-data, credential, and result authority.

## Initial tool registry

| Tool                                        | Risk class                 | Operation                | Accepted source classes                           | Current state        |
| ------------------------------------------- | -------------------------- | ------------------------ | ------------------------------------------------- | -------------------- |
| `forge.search.lore`                         | `read-public`              | search                   | public content                                    | planned, not exposed |
| `forge.validate.content`                    | `validate-public`          | validate                 | public content and schemas                        | planned, not exposed |
| `forge.inspect.quest-schema`                | `read-public`              | inspect                  | public schemas and generated artifacts            | planned, not exposed |
| `forge.validate.quest`                      | `validate-public`          | validate                 | public content, schemas, and synthetic fixtures   | planned, not exposed |
| `forge.search.architecture`                 | `read-public`              | search                   | public documentation                              | planned, not exposed |
| `forge.search.decision`                     | `read-public`              | search                   | public documentation                              | planned, not exposed |
| `forge.generate.synthetic-data`             | `generate-synthetic-draft` | generate synthetic draft | public schemas and synthetic fixtures             | planned, not exposed |
| `forge.search.public-standards`             | `read-public`              | search                   | public standards references                       | planned, not exposed |
| `forge.validate.mapping-draft`              | `validate-public`          | validate                 | public standards, schemas, and synthetic fixtures | planned, not exposed |
| `forge.search.synthetic-connector-fixtures` | `read-public`              | search                   | public synthetic connector fixtures               | planned, not exposed |

The registry is complete for the accepted Sprint 7 deliverables but does not imply that every tool must be implemented simultaneously. Workstreams enable tools only when their own evidence is complete.

## Versioned contract requirements

Every tool contract binds:

- stable tool identity and exact revision;
- title and bounded purpose;
- risk class and operation;
- lifecycle and transport exposure;
- accepted source classes;
- input and output schema identities;
- resource limits;
- bounded invocation-receipt and public-safe error schema identities;
- exact compatibility state and fail-closed unknown-change behavior;
- migration requirements for breaking changes; and
- a literal non-authority profile.

Optional additive changes may later be classified compatible. Required fields, enum expansion, source-scope changes, receipt or error semantic changes, removal, or narrowing require explicit compatibility and migration review. Mutation, network, private-data, production, or authority expansion is not an ordinary compatible change and requires a new governing decision and specialist review.

## Resource limits

Sprint 7.1 records conservative contract upper bounds for each risk class. These are not claims of runtime enforcement. A tool cannot be enabled until Sprint 7.8 implements and tests the corresponding input, scan, result, output, timeout, and concurrency controls.

The prohibited risk class has zero limits.

## Prohibited capabilities

The public contract explicitly prohibits:

- private-data and arbitrary-filesystem reads;
- filesystem, repository, Git, and GitHub mutation;
- arbitrary shell and subprocess execution;
- dynamic module loading;
- network and provider calls;
- credential and production-endpoint access;
- canonical writes and permission decisions;
- gameplay completion and reward grants;
- canon and mapping approval;
- clinical actions;
- institutional decisions; and
- protected-audit writes.

No tool may list an exception to this catalogue.

## Authority boundary

Every authority flag is literal `false`.

Forge cannot:

- select its own repository root;
- read an arbitrary caller-selected file;
- modify repository or hosting state;
- call providers or production endpoints;
- access credentials or private data;
- create Chronicle truth or House of Keys permission;
- approve canon or mappings;
- complete quests or grant rewards;
- claim clinical authority;
- create institutional authority; or
- write protected audit evidence.

Retrieved, caller-supplied, generated, prior-tool, and model-like content cannot modify the registry, expand resource scope, authorize another tool call, suppress validation or provenance, or convert a draft into accepted truth.

## Funding and provider neutrality

Funding, credits, sponsors, affiliates, related parties, providers, and enterprise distribution cannot control:

- whether a tool exists;
- tool risk class;
- source authority or ranking;
- validation outcomes;
- mapping acceptance;
- provider defaults;
- publication;
- roadmap priority; or
- governance.

Material future relationships remain subject to ordinary public records, conflicts, recusal, evaluator independence, concentration, replacement, and exit controls.

## Receipt boundary

Each tool references `forge.invocation-receipt.v1`, but Sprint 7.1 does not implement receipts.

A future Forge receipt may prove only that a named local tool contract received a request and returned a bounded outcome. It cannot prove permission, correctness, accepted mappings, repository mutation, gameplay completion, protected audit, institutional approval, or production readiness.

## Validation evidence

The public validator checks:

- exact application, contract, and registry revisions;
- server-owned registry and source authority;
- complete public and synthetic source-class coverage;
- complete risk-class coverage;
- complete initial tool registry coverage;
- unique identities and valid risk-to-operation bindings;
- contract-only tools remain transport-free;
- schema, receipt, error, authority, compatibility, migration, and resource-limit bindings;
- the complete prohibited-capability catalogue;
- literal false authority and funding-control fields; and
- no self-approval or prohibited capability exceptions.

Public tests import only `dist/index.js` and cover the valid baseline plus registry mutation, prohibited capability, sensitive source, untrusted authority, and funding influence failures.

## Deferred work

Sprint 7.1 does not implement:

- MCP initialization or `stdio` transport;
- repository root resolution;
- filesystem reads;
- source allowlist roots;
- path or symlink isolation;
- content digests or provenance extraction;
- search or validation execution;
- synthetic generation;
- runtime resource enforcement;
- receipts or errors;
- compatibility migrations; or
- agent-security integration tests.

Those capabilities remain assigned to workstreams 7.2 through 7.9 and must preserve this boundary.
