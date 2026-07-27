# Pre-Sprint 7 Repository Alignment Review

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint sequence](sprints.md) · [Sprint 6 completion](sprint-6-completion-record.md) · [Aster baseline](../product/aster-contract-baseline.md) · [Tracking issue #51](https://github.com/finalboss-tom/calypsos-promise/issues/51)

- **Status:** COMPLETE ON REVIEW BRANCH — merge recommended before Sprint 7 begins
- **Reviewed baseline:** `main` at Sprint 6 squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`
- **Review date:** 2026-07-27
- **Scope:** mission, player promise, incentives, governance, architecture, security, funding, provider independence, operability, open-source maintenance, repository status, implementation boundaries, and Sprint 7 handoff
- **Certification boundary:** internal repository-consistency and readiness review; not independent security, privacy, clinical, accessibility, legal, interoperability, operations, financial, AI-safety, or production-readiness certification

## Decision summary

Calypso’s Promise remains strongly aligned from its frozen purpose through the merged Sprint 6 Aster contracts and the next design-to-build boundary.

The review found no contradiction requiring a change to the Product Constitution, Vision, Architecture Foundation, Gameplay Foundation, World and Lore Canon, deterministic incentive model, progressive-decentralization mandate, Institutional Immune System, Living Chronicle baseline, House of Keys baseline, Sprint 5 security baseline, funding doctrine, consumer-first boundary, operational-simplicity boundary, or Sprint 6 Aster baseline.

The accepted Sprint 7 goal, deliverables, acceptance criteria, and numbered sequence remain correct:

> Provide useful agent tooling without private health-data risk.

No decision record is required before Sprint 7. The material readiness issues are:

1. canonical status drift after the Sprint 6 squash merge;
2. a high-level Sprint 7 description that requires implementation clarifications before code chooses filesystem, network, mutation, authority, provenance, receipt, compatibility, or provider behavior by accident; and
3. the need to keep the future Aster ergonomics review in issue #50 evidence-triggered rather than activating it merely because Forge becomes a possible consumer.

**Recommendation:** merge this reconciliation, then begin Sprint 7 through its own issue, execution plan, branch, draft pull request, public or synthetic evidence, completion record, and explicit founding-steward acceptance.

## Review authority and precedence

The review used this order:

1. frozen Product Constitution, Vision, Architecture Foundation, Gameplay Foundation, World and Lore Canon, and institutional commitments;
2. accepted decision records;
3. governance, public roadmap, security, publication, economics, development, and other cross-cutting policies;
4. controlled vocabulary and deterministic incentive model;
5. Living Chronicle, House of Keys, security, consumer-first, provider-independent, operational-simplicity, and Aster architecture;
6. versioned contracts, public exports, deterministic validators and evaluators, public synthetic fixtures, and tests;
7. sprint plans, completion records, current-status records, website claims, issue ledgers, and contributor documentation; and
8. this review.

A lower layer may implement, test, or explain a higher-authority requirement. It may not silently weaken it.

## Review method

The review examined:

- root mission, vision, governance, roadmap, security, contribution, support, public-domain, and current-status documents;
- frozen product, architecture, gameplay, lore, and institutional foundations;
- accepted decisions through Decision 0011 and proposed Decision 0009;
- the Institutional Immune System and assumption lifecycle;
- Living Chronicle, House of Keys, and Aster contracts, validators, fixtures, compatibility, migration, completion evidence, and holdpoints;
- Sprint 5 threats, controls, residual risks, procedures, public synthetic abuse cases, design tabletops, and MCP holdpoints;
- funding and sponsorship doctrine, public records, conflicts, concentration, replacement, and infrastructure-exit rules;
- consumer-first, provider-independent, standards-at-the-edges, and institutional-partnership boundaries;
- modular-monolith, responsive-path, durable-work, provider-replacement, local-simulation, and evidence-gated-complexity boundaries;
- repository module ownership, public APIs, dependency direction, local setup, validation, CI, DCO, issue intake, pull-request review, dependency policy, and security reporting;
- the bounded public website and its live-versus-planned claims;
- open issues, recent merge history, the persistent roadmap tracker, and issue #50; and
- the exact accepted Sprint 7 goal, deliverables, acceptance criteria, and Sprint 8 handoff.

The review tested consistency across purpose, authority, status honesty, incentives, public and private information boundaries, provider and funding conflicts, AI and MCP limits, provenance, uncertainty, refusal, correction, permission, receipts, resource use, mutation, operability, institutional succession, and phase gates.

## Repository state after Sprint 6

Sprint 6 is accepted and merged through PR #48 and squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`.

It establishes the pre-stable `@calypsos-promise/aster` public contract baseline for:

- bounded Aster role authority;
- proposals and structured extraction;
- intent, clarification, qualitative confidence, and refusal;
- source-linked recall and uncertainty;
- player-controlled memory lifecycle;
- prompt-injection and untrusted-input isolation;
- responsive and deferred work;
- provider governance and egress;
- deterministic local substitution and complete non-AI fallbacks;
- compatibility and evidence-preserving migration;
- public synthetic fixtures and validators;
- control mapping, specialist holdpoints, and unresolved work.

Sprint 6 does not establish production AI, private-data egress, provider approval, identity, persistence, retrieval, memory storage, durable execution, MCP tools, connectors, clinical behavior, deployment, or independent specialist review.

Issue #50 remains open as a trigger-based review of Aster public API and validator ergonomics after a real repository consumer produces concrete evidence. Sprint 7 may become that first consumer, but it must not import Aster merely to trigger the review or create an unnecessary dependency.

## Mission-to-Forge traceability

| Protected directive | Current owner or source | Sprint 7 expression | Result |
| --- | --- | --- | --- |
| Build useful personal and contributor value | Product Constitution; Vision | local search, validation, and synthetic generation reduce contributor friction | Consistent |
| Keep private people separate from open code | Product Constitution; publication policy | Forge uses only allowlisted public repository material and synthetic data | Required and consistent |
| Keep authority deterministic | Architecture Foundation; House of Keys; Aster | server-owned tool registry, exact contracts, deterministic validators, no content-derived authority | Required and consistent |
| Keep AI and agents non-authoritative | Architecture Foundation; Sprint 6 | MCP clients and retrieved content cannot grant tools, permission, canon, truth, or execution authority | Required and consistent |
| Preserve source and uncertainty | Living Chronicle; Aster | search and generated results carry repository-relative provenance and draft status | Required and consistent |
| Preserve meaningful refusal and non-punitive paths | Product Constitution; incentives | Forge remains optional; ordinary repository workflows remain complete without MCP | Consistent |
| Preserve provider and sponsor independence | Decisions 0008 and 0010 | no funded tool, credit, provider, or distribution relationship controls defaults, ranking, validation, or publication | Required and consistent |
| Preserve operational legibility | Decision 0011 | one local `stdio` process, deterministic core, no premature service or database | Required and consistent |
| Remain corrigible and replaceable | Decision 0007 | versioned tools, stable errors, bounded receipts, compatibility, migration, removal, and revalidation | Required and consistent |
| Progress toward founder-independent stewardship | Vision; Governance | public contracts and evidence allow future maintainers to inspect and replace Forge behavior | Consistent but intentionally incomplete |

## Incentive alignment

### Contributor value remains the purpose

Forge exists to make public repository work easier to inspect, validate, and create safely. It must not become a gate that contributors must pass to use the repository.

Ordinary local commands, documentation, tests, and human review remain complete without MCP, an agent client, a model, a provider, or sponsor-funded infrastructure.

### Tool use cannot become progression or authority

Tool invocation, tool frequency, successful validation, generated fixtures, agent use, or adoption cannot grant:

- player progression, Fellowship, Renown, rewards, or governance weight;
- repository authority or maintainer status;
- Chronicle truth or House of Keys permission;
- accepted canon, accepted mappings, or approved architecture;
- favorable issue priority; or
- superior access to core public contribution paths.

### Funding cannot purchase tool authority

Sponsor-funded tools, service credits, infrastructure support, connector work, standards mappings, evaluation labor, and related-party contributions remain subject to ordinary issue, pull-request, review, validation, publication, conflict, recusal, replacement, concentration, and exit rules.

Funding cannot determine:

- which tools exist;
- tool risk class or scope;
- source authority or search ranking;
- mapping acceptance;
- validation outcomes;
- default providers or services;
- publication or suppression of findings;
- roadmap priority or governance authority; or
- an exception to public-only and synthetic-only operation.

## Architecture alignment

### One bounded local application is the correct default

Sprint 7 should begin with one local `stdio` MCP application at `apps/mcp-forge`.

It should not begin with:

- a remote MCP endpoint;
- a hosted service;
- user accounts or authentication;
- a database, index service, queue, scheduler, worker, or workflow engine;
- a vector database or model provider;
- a production observability stack; or
- a second reusable Forge package without an actual second consumer and independent change pressure.

The deterministic tool core should remain separable from MCP transport handling inside the application. A reusable package may be extracted later when evidence demonstrates a distinct consumer and reason to change.

### MCP is an adapter, not the repository or a domain authority

Forge MCP exposes selected public contributor capabilities. It is not:

- the repository database;
- the canonical documentation store;
- the game or application protocol;
- a Chronicle or House of Keys service;
- a general shell or filesystem agent;
- a remote code-execution system;
- a production connector gateway; or
- an institutional governance mechanism.

## Binding Sprint 7 execution clarifications

These clarifications do not change the accepted Sprint 7 scope. They define how the accepted scope must be implemented.

### 1. Local `stdio` and provider-free operation

- Forge runs as one local `stdio` MCP server.
- Ordinary development requires no credentials, network access, hosted provider, model, or production data.
- The server must be testable through deterministic direct calls to its public tool core as well as through the MCP transport boundary.
- A transport acknowledgement proves only that the transport handled a request; it does not prove tool correctness, repository mutation, domain completion, or institutional acceptance.

### 2. Public and synthetic information allowlist

Forge may read only named repository roots and file classes required by accepted tools.

The initial source catalogue should identify:

- public documentation roots;
- content and schema roots;
- public synthetic fixture roots;
- generated public schema artifacts where needed; and
- explicit exclusions.

Forge must reject:

- absolute paths outside the resolved repository root;
- `..` traversal and encoded traversal;
- symlink escape;
- arbitrary caller-selected roots;
- environment files, credentials, tokens, or secret stores;
- private provider negotiations, contracts, evaluations, and protected mappings;
- production endpoints, logs, exports, or operational configuration;
- real health data or account-specific material; and
- protected security, conduct, estate, financial, or incident evidence.

A file being present in a local checkout does not automatically make it an approved Forge source.

### 3. No mutation, shell, or network authority

Sprint 7 tools may search, inspect, validate, and generate clearly labeled draft or synthetic output.

They may not:

- modify repository files;
- create commits, branches, issues, pull requests, releases, or tags;
- invoke arbitrary shell commands or subprocesses;
- load arbitrary code or modules from caller paths;
- make network requests;
- access production services;
- write canonical content or data; or
- perform consequential domain actions.

Generated output is returned to the caller for ordinary human-reviewed repository workflow.

### 4. Server-owned tool registry and risk classes

The server owns:

- tool identity and revision;
- input and output schemas;
- risk class;
- allowed source classes and resource roots;
- maximum input, scan, result, output, and time bounds;
- receipt and error contracts;
- compatibility and migration state; and
- whether a tool is enabled, deprecated, blocked, or retired.

Retrieved content, caller arguments, prior tool output, model-like text, generated content, and embedded instructions remain untrusted data. They cannot:

- register or rename tools;
- change risk classes or schemas;
- expand filesystem or resource access;
- suppress validation or provenance;
- choose another repository root;
- authorize another tool call;
- convert a draft into accepted canon or mapping; or
- create Chronicle, permission, gameplay, financial, or governance authority.

### 5. Initial risk taxonomy

The Sprint 7 execution plan should define stable risk classes at least equivalent to:

- **read-public:** bounded search or inspection of allowlisted public sources;
- **validate-public:** deterministic validation with no mutation;
- **generate-synthetic-draft:** generation of explicitly synthetic or draft output requiring validation and human review;
- **unsupported-or-prohibited:** mutation, shell, network, private-data, production, credential, arbitrary-resource, or consequential actions.

Risk classes describe required controls and evidence. They do not imply that a result is correct, accepted, safe, or authoritative.

### 6. Versioned tool contracts and provenance

Every public tool contract must include:

- stable tool identity and contract revision;
- purpose and risk class;
- input and output schema identifiers;
- allowed source classes;
- resource and result limits;
- stable success, partial, refusal, cancellation, timeout, and failure states;
- stable error codes;
- invocation-receipt shape;
- compatibility status and migration rules; and
- literal non-authority boundaries.

Search and inspection results should include inspectable provenance appropriate to the source:

- repository-relative path;
- line range, object identity, schema identity, or fixture identity;
- source revision or content digest where practical; and
- visible truncation, partial-result, unsupported, or stale limitations.

A citation or search hit is source evidence, not automatic truth, canon, permission, or acceptance.

### 7. Receipts remain operational evidence only

Forge invocation receipts record that a named local tool contract received a request and returned a bounded outcome.

They are not:

- House of Keys permission decisions or access receipts;
- proof that generated output is correct;
- proof that a mapping is accepted;
- proof that repository content changed;
- proof of gameplay completion;
- protected security audit; or
- institutional approval.

Receipts should minimize host details and must not expose absolute paths, environment values, stack traces, credentials, or protected source material.

### 8. Resource limits, cancellation, and errors

Initial rate limits are deterministic local resource limits rather than a hosted-account rate-limiting system.

The execution plan should define:

- maximum request and argument size;
- maximum files, records, or nodes scanned;
- maximum result count and output size;
- timeout and cancellation behavior;
- concurrency policy;
- stable partial-result behavior;
- memory and recursion limits where relevant;
- deterministic ordering where practical; and
- stable public-safe errors without host-path or stack-trace leakage.

Timeout, cancellation, or partial output cannot be represented as full success.

### 9. Search and validation tools

Lore, quest, architecture, decision, standards, mapping, and fixture tools must use existing public contracts and deterministic validators where available.

Forge may expose those capabilities through MCP, but MCP transport does not become the validator or source of truth.

Validation success means the input satisfies the named validator revision. It does not prove:

- canon acceptance;
- clinical completeness or safety;
- semantic equivalence;
- provider endorsement;
- interoperability certification;
- production readiness; or
- human review.

### 10. Synthetic generation and draft mappings

Synthetic generation must:

- use public schemas and public-safe source material;
- label every generated record or bundle synthetic;
- avoid realistic personal identifiers and reconstructed personal information;
- include diverse, edge-case, and accessibility-relevant fixtures;
- remain deterministic or reproducible where practical;
- record generator and schema revisions;
- pass named deterministic validation before being represented as valid synthetic output; and
- remain non-canonical and non-authoritative.

Generated standards or connector mappings remain drafts requiring deterministic validation and human review. They cannot become accepted mappings, source authority, connector behavior, or provider preference through generation success.

### 11. Security test inheritance

The agent-security suite should exercise at least:

- path traversal and symlink escape;
- arbitrary root, file, module, shell, and network requests;
- hidden and embedded instruction attempts;
- tool-registry and schema mutation attempts;
- cross-tool confused-deputy attempts;
- source and uncertainty suppression;
- oversized input and output;
- timeout, cancellation, and partial results;
- receipt and error leakage;
- synthetic-label removal;
- mapping self-approval;
- provider, sponsor, or credit influence; and
- attempts to access private or protected repository material.

Tests must use public or explicitly synthetic information and must not commit real exploit details that create unnecessary operational risk.

### 12. Compatibility and migration

Tool contracts, risk classes, source allowlists, schemas, receipts, errors, and public behavior require versioned compatibility classification.

- optional additive changes may remain compatible;
- required fields, enum expansion, source-scope changes, error-semantic changes, or receipt-semantic changes require explicit migration review;
- removal or narrowing requires deprecation and migration evidence where consumers exist;
- authority expansion, mutation, network, private-data, or production behavior is not an ordinary compatible change and requires a new governing decision and specialist review;
- unknown compatibility fails closed.

### 13. Issue #50 activation

Issue #50 activates only when a real repository consumer meaningfully imports and uses the Aster public surface and records concrete friction, repetition, ambiguity, coupling, or issue-code handling problems.

Sprint 7 should:

- avoid an Aster dependency unless a current Forge tool genuinely needs the public contract;
- record any actual Aster consumer flow and friction in issue #50; and
- avoid broad API refactoring based only on package size or aesthetic preference.

## Proposed Sprint 7 execution split

This split is an execution aid only. It does not modify the accepted roadmap.

1. **7.1 — Forge boundary and registry:** application ownership, public source classes, tool registry, risk classes, prohibited capabilities, and public exports.
2. **7.2 — Local transport:** local `stdio` MCP server, deterministic invocation envelope, direct test harness, initialization, cancellation, and transport errors.
3. **7.3 — Source catalogue and provenance:** repository-root resolution, source allowlists, path and symlink isolation, content digests, line and object locators, truncation, and partial results.
4. **7.4 — Lore and schema tools:** lore search, content validation, quest-schema inspection and validation, stable errors, and public-surface tests.
5. **7.5 — Architecture and decision tools:** architecture, decision, policy, assumption, and roadmap search with exact provenance and status visibility.
6. **7.6 — Standards and synthetic connector fixtures:** public standards, mapping, and synthetic connector-fixture search and validation without proprietary or protected sources.
7. **7.7 — Synthetic generation:** deterministic or reproducible generation, synthetic labels, diversity and accessibility cases, validation, draft mappings, and non-authority.
8. **7.8 — Scopes, limits, receipts, and errors:** tool scopes, resource budgets, concurrency, timeout, cancellation, partial results, public-safe receipts, and error formats.
9. **7.9 — Agent security, compatibility, and operability:** adversarial suite, compatibility and migration, clean local operation, package boundaries, and issue #50 evidence review.
10. **7.10 — Completion:** cross-contract reconciliation, control and holdpoint mapping, completion record, status repair, full validation, and Sprint 8 handoff.

## Explicit Sprint 7 non-scope

Sprint 7 does not authorize:

- private Chronicle MCP tools;
- private health-data access or processing;
- production identity, accounts, sessions, recovery, delegation, or representative authority;
- House of Keys production orchestration or consequential permission execution;
- repository mutation, Git hosting mutation, or arbitrary shell execution;
- remote MCP hosting or public network service;
- production providers, models, embeddings, retrieval, vector indexes, connectors, or credentials;
- proprietary mappings or protected interoperability findings;
- clinical decision support, diagnosis, treatment, emergency response, or clinical workflow;
- production queue, scheduler, workflow engine, event store, database, or observability system;
- production audit, incident response, backup, deletion verification, or secure erasure;
- sponsor placement, affiliate recommendation, provider ranking, or paid tool authority; or
- production deployment, release certification, or independent specialist approval.

## Inherited holdpoints

Sprint 7 inherits rather than closes:

- Sprint 5 MCP and agent capability mediation holdpoint `HLD-S5-011`;
- Sprint 5 upload, parser, media, environment, secret, supply-chain, repository-administration, and legal holdpoints where applicable;
- Sprint 6 independent AI-safety, privacy, accessibility, provider, identity, persistence, infrastructure, media, retrieval, memory, durable-work, MCP, connector, funding, reliability, repository-governance, and legal holdpoints;
- all Phase 0 founder-dependency, succession, branch-protection, DCO, ownership, specialist-review, and exit gates.

A successful local public tool does not close a production or private-data holdpoint.

## Repository status repairs

This reconciliation must make the following status truth consistent:

- Sprint 6 is complete and merged through PR #48 and squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`;
- issue #47 is closed as completed;
- the Aster baseline is accepted and merged at pre-stable contract and public-synthetic evidence level;
- production and specialist holdpoints remain open;
- Sprint 7 is next only after this pre-Sprint 7 reconciliation is accepted and merged;
- issue #50 remains open and trigger-based;
- institutional Phase 0 remains active; and
- no production AI, private MCP, provider, connector, clinical, financial, legacy, or workflow runtime is live.

Historical pre-Sprint 6 and Sprint 6 review-branch records may preserve their reviewed sequence, but their current status headers and canonical navigation must not imply that PR #48 is still pending.

## Sprint 7 entry conditions

Before Sprint 7 implementation begins:

1. merge this pre-Sprint 7 reconciliation;
2. open a dedicated Sprint 7 issue with workstreams and acceptance evidence;
3. publish a Sprint 7 execution plan linked to the accepted roadmap and this review;
4. create a focused branch and draft pull request;
5. use public documentation and synthetic data only;
6. define the exact initial source allowlist and prohibited paths before search tools are exposed;
7. define tool contracts, risk classes, resource limits, receipts, errors, compatibility, and migration before broad tool implementation;
8. keep all mutation, shell, network, private-data, production, provider, connector, clinical, and consequential action paths prohibited; and
9. preserve every inherited production and specialist holdpoint.

## Open issue reconciliation

- **Issue #2 — roadmap tracker:** must mark Sprint 6 complete and merged and identify the pre-Sprint 7 reconciliation as the current gate.
- **Issue #39 — proposed health-data legacy workstream:** remains proposed and does not change Sprint 7 order or scope.
- **Issue #50 — Aster API and validator ergonomics:** remains open and trigger-based; not a Sprint 7 prerequisite unless real consumer evidence activates it.
- **Issue #51 — this reconciliation:** remains open until its draft pull request is explicitly accepted and squash merged.

No open issue requires Sprint 7 renumbering, scope expansion, production capability, or a new decision record.

## Greenlight conclusion

Sprint 7 is aligned and ready to begin after this reconciliation merges.

The accepted Sprint 7 goal, deliverables, acceptance criteria, and numbered sequence remain unchanged. The implementation clarifications in this review prevent the most likely failure modes:

- turning MCP into a general shell or repository mutation agent;
- treating every local file as approved public input;
- allowing retrieved content to grant itself authority;
- collapsing transport receipts into permission, correctness, or acceptance evidence;
- selecting hosted infrastructure or providers prematurely;
- allowing generated mappings to self-approve;
- letting funding or service credits influence tool authority or publication; and
- activating broad Aster refactoring without real consumer evidence.

**Recommendation:** accept and merge this review, then start Sprint 7 through its own issue, plan, branch, draft pull request, public or synthetic evidence, completion record, and explicit founding-steward acceptance.
