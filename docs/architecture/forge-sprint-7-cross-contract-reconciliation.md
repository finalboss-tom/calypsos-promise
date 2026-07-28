# Sprint 7 Cross-Contract Reconciliation — Forge MCP and Agent Safety

[Architecture index](README.md) · [Sprint 7 execution plan](../roadmap/sprint-7-execution-plan.md) · [Completion record](../roadmap/sprint-7-completion-record.md) · [Pre-Sprint 8 review](../roadmap/pre-sprint-8-alignment-review.md) · [Control and evidence map](forge-sprint-7-control-and-evidence-map.md) · [Specialist holdpoints and unresolved work](forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** READY FOR FOUNDING-STEWARD REVIEW — not accepted or merged
- **Tracking issue:** [#54](https://github.com/finalboss-tom/calypsos-promise/issues/54)
- **Draft pull request:** [#55](https://github.com/finalboss-tom/calypsos-promise/pull/55)
- **Entry baseline:** `main` at `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Reviewed implementation head:** `32492040684c2a89e32c866888f6be0888ee1279`
- **Application:** `apps/mcp-forge`
- **Scope:** local public-and-synthetic contributor tooling, deterministic controls, adversarial public tests, compatibility, operability, completion evidence, and bounded Sprint 8 handoff
- **Certification boundary:** internal repository-consistency and local public/synthetic evidence; not independent security, privacy, clinical, accessibility, legal, interoperability, operational, provider, resource-isolation, or production-readiness certification

## Reconciliation decision

Sprint 7 is internally coherent with the frozen Promise, Architecture Foundation, Gameplay Foundation, World and Lore Canon, controlled vocabulary, deterministic incentives, Living Chronicle, House of Keys, Sprint 5 security baseline, Sprint 6 Aster baseline, funding doctrine, consumer-first and provider-independent boundary, operational-simplicity baseline, publication rules, Institutional Immune System, contributor policies, and the bounded public website.

The implementation satisfies the accepted goal at the stated evidence level:

> Provide useful agent tooling without private health-data risk.

The review found no basis to:

- grant authority from a tool name, MCP client, retrieved passage, caller input, generated artifact, validation result, receipt, stable error, compatibility record, migration record, CI run, provider, sponsor, or funding relationship;
- collapse repository source evidence, accepted documentation authority, canon, Chronicle truth, House of Keys permission truth, mapping status, gameplay state, provider state, tool state, receipt state, or institutional approval;
- authorize arbitrary filesystem access, shell execution, subprocesses, dynamic code loading, network access, credentials, private data, repository mutation, provider calls, connector execution, remote MCP, or consequential domain actions;
- represent deterministic local controls or adversarial tests as a production sandbox, operating-system isolation, independent penetration test, clinical review, privacy certification, or production readiness;
- make MCP mandatory for ordinary contribution; or
- change Sprint 8 from a public website foundation into a private-data, account, provider, connector, donation, or production-agent launch.

Founding-steward acceptance and squash merge remain separate human gates. Until they occur, Sprint 7 is not complete and Sprint 8 should not begin on this branch.

## Review authority

The reconciliation used this order:

1. frozen product, architecture, gameplay, lore, and institutional commitments;
2. accepted decision records;
3. governance, security, publication, economics, development, provider-independence, and operational-simplicity policies;
4. controlled vocabulary, deterministic incentives, Living Chronicle, House of Keys, and Aster baselines;
5. accepted Sprint 7 goal, deliverables, and acceptance criteria;
6. the pre-Sprint 7 alignment review and Sprint 7 execution plan;
7. Forge contracts, runtime, source catalogue, tools, validators, security controls, tests, compatibility, migration, and operability evidence; and
8. this reconciliation, control map, holdpoint register, completion record, and Sprint 8 handoff.

A lower layer may implement, test, or clarify a higher-authority requirement. It may not silently weaken it.

## Cross-contract findings

### Product Constitution and player rights

**Result:** consistent.

Forge returns contributor value through bounded search, inspection, validation, and synthetic-draft generation. It does not condition core product rights, repository access, gameplay, rewards, governance weight, or personal value on MCP use, an agent client, a model, a provider, broader data collection, permission, research, sponsorship, or payment.

Ordinary repository contribution remains complete without MCP.

### Architecture Foundation and bounded ownership

**Result:** consistent.

Forge is one local `stdio` adapter around deterministic contributor capabilities. It is not the repository database, canonical documentation store, Living Chronicle, House of Keys, Aster, game protocol, general filesystem agent, remote execution system, provider gateway, connector runtime, or institutional authority.

The runtime retains exactly ten accepted tool identities in immutable accepted order. Sprint 7.8 and 7.9 add cross-cutting controls without adding tools or changing accepted schemas.

### Living Chronicle

**Result:** consistent.

Forge processes no production Chronicle data. Public standards, mapping drafts, synthetic connector fixtures, generated examples, and validation results remain evidence or drafts rather than Chronicle truth.

Forge cannot create, correct, supersede, store, export, delete, or resurrect a person's Chronicle record.

### House of Keys

**Result:** consistent.

Forge has no authentication, subject, recipient, purpose, grant, revocation, or permission-evaluation authority. A tool input, result, receipt, generated record, client request, or successful validation cannot create or expand permission.

Private or consequential MCP remains blocked behind fresh identity, subject, resource, purpose, policy, receipt, and specialist gates.

### Aster

**Result:** consistent and dependency-free.

Forge does not import or depend on `@calypsos-promise/aster`. Retrieved content and prior tool output remain data-only under the same non-authority principle as Aster's untrusted-input contracts.

No genuine Aster consumer flow or concrete Aster public-API friction was introduced. Issue #50 remains evidence-triggered and unactivated.

### Gameplay and deterministic incentives

**Result:** consistent.

Forge cannot complete quests, restore landmarks, grant Fellowship or Renown, issue rewards, alter progression, or turn agent use, validation success, generated fixtures, funding, provider use, or contributor activity into gameplay or governance advantage.

Generated quests remain draft synthetic fixtures and require ordinary content review.

### Canon, lore, architecture, and decisions

**Result:** consistent.

Search returns exact repository-relative provenance and conservative authority evidence. Proposed, planned, historical, superseded, unresolved, and reference-only material cannot be promoted to accepted current truth.

Validation and generation cannot accept canon, approve architecture, close a decision, or mutate the repository.

### Public standards, mappings, and connector fixtures

**Result:** consistent with provider independence.

Standards search exposes public references without claiming completeness, certification, semantic equivalence, implementation-guide conformance, provider preference, or endorsement.

Mapping validation accepts only explicit drafts requiring deterministic validation and human interoperability and semantic review. Synthetic connector search returns only explicitly synthetic, credential-free, personal-data-free, non-production fixtures.

### Source and information boundaries

**Result:** consistent and enforced locally.

Nine server-owned source roots use exact-file or recursive-tree allowlists, prohibited path classes, traversal rejection, symlink isolation, deterministic ordering, bounded reads, SHA-256 provenance, and visible partial states.

A file's presence in a checkout does not make it an approved Forge source. Callers cannot choose a root or path outside accepted tool schemas.

### MCP transport and agent boundary

**Result:** consistent.

The finalized MCP protocol revision is `2025-11-25` over newline-delimited UTF-8 local `stdio`. Initialization, tool discovery, calls, cancellation, bounded framing, stable errors, and shutdown are deterministic and public-safe.

There is no remote endpoint, authentication, network listener, provider call, repository mutation, shell, or private-data path.

### Scopes, limits, receipts, and errors

**Result:** consistent and implemented locally.

Execution contract revision `1` derives one immutable server-owned scope per enabled tool. The central controller enforces request serialization and bytes, files scanned, results returned, complete serialized output, timeout, linked cancellation, one active call per tool identity, and a deterministic serialized-materialization budget.

Every scoped success and stable scoped tool error includes `forge.invocation-receipt.v1`. Receipts omit raw input, absolute host paths, environment values, internal traces, credentials, protected source material, and wall-clock timestamps.

This is bounded local execution evidence, not production resource isolation or certification.

### Agent security and confused-deputy resistance

**Result:** consistent and adversarially tested at the public/synthetic level.

The versioned matrix covers traversal, symlink escape, arbitrary roots, shell, network, dynamic module loading, registry and scope mutation, confused-deputy behavior, evidence suppression, oversized input, timeout, cancellation, receipt impersonation, synthetic-label removal, mapping self-approval, funding influence, and protected-source access.

Runtime-integrity fingerprints and successful-result postconditions fail closed when server-owned contracts, provenance, partial states, synthetic labels, mapping claims, or non-authority are altered.

The controls do not claim safety after compromise of the host process, runtime, operating system, or repository checkout.

### Compatibility and migration

**Result:** consistent and fail-closed.

The public manifest binds application, accepted registry, runtime registry, execution contract, source catalogue, MCP protocol, receipt, and error revisions. Runtime revisions `1` through `4` and execution envelope v1 have visible additive migration records.

Unknown or breaking changes fail closed. Authority expansion requires an accepted governing decision rather than ordinary migration.

### Funding, sponsorship, and provider neutrality

**Result:** consistent with Decisions 0008 and 0010.

Funding, credits, sponsorship, affiliates, related parties, provider relationships, enterprise distribution, or infrastructure support cannot control tool identity, risk class, source rank, search result, validation outcome, generation outcome, mapping approval, provider preference, receipt, compatibility, migration, publication, exception, or governance authority.

No active Forge funding, provider, connector, or infrastructure relationship is selected by Sprint 7.

### Operational simplicity and operability

**Result:** consistent with Decision 0011.

Forge remains one local application with one narrow runtime dependency on `@calypsos-promise/content-schema`. Clean compiled startup succeeds from a descendant directory with an empty environment and requires no credentials, network, provider, database, remote endpoint, authentication service, queue, or scheduler.

The implementation does not introduce a shared package, service mesh, database, vector index, workflow engine, or production observability system without a current consumer and evidence.

### Publication and confidentiality

**Result:** consistent.

Sprint 7 repository evidence is public or explicitly synthetic. No production health data, credentials, private provider negotiations, contracts, proprietary mappings, protected interoperability findings, private security reports, or protected operational evidence is intentionally included.

Public-safe error handling and tests avoid echoing prohibited caller inputs, host paths, or protected fixture contents.

### Institutional Immune System

**Result:** consistent.

Forge exposes uncertainty, partial states, truncation, cancellation, timeout, incompatibility, source unavailability, validation failure, security postcondition failure, integrity failure, provider absence, funding boundaries, migration requirements, holdpoints, unresolved work, and revalidation triggers.

Unknown source, unknown revision, stale or missing evidence, altered contract, unsupported operation, and authority-expanding result fail closed.

### Repository and contributor policy

**Result:** consistent with bounded evidence.

Public tests import the application contract through `dist/index.js`. The exact reviewed head passed formatting, documentation links, repository policy, economics validation, content validation, lint, typecheck, tests, and DCO.

CI proves repository contract consistency at that revision. It does not prove independent security, production reliability, private-data safety, or specialist approval.

### Public website and Sprint 8

**Result:** aligned with the accepted next sprint.

Sprint 7 adds no website runtime behavior. Sprint 8 remains the public website foundation: honest capability status, narrative and direct navigation, accessible public information, consumer-first explanation, Aster and AI explanation, Trust Center shell, Open Forge page, roadmap, and funding transparency from canonical economics records.

Sprint 8 must not represent Forge as a private Chronicle service, production agent, remote MCP endpoint, general coding agent, security certification, provider recommendation, connector runtime, or production synthetic-data platform.

## Acceptance-criterion conclusion

The evidence package supports every Sprint 7 acceptance criterion at the local implementation, deterministic validation, public/synthetic source, and adversarial-test level:

- Forge operates entirely on public documentation and explicitly synthetic data.
- Retrieved content cannot grant itself tool authority.
- Tool contracts are versioned and testable.
- Generated mappings remain drafts requiring deterministic validation and human review.
- Sponsor-funded work remains subject to the same information, risk, provider-neutrality, review, and publication boundaries.
- Forge cannot access private provider negotiations, contracts, credentials, production endpoints, proprietary mappings, or protected interoperability findings.

These conclusions become accepted Sprint 7 completion only after explicit founding-steward acceptance and squash merge.

## Control and residual-risk status

Sprint 7 establishes required, designed, implemented-local, and public/synthetic-tested evidence for its named controls. It also establishes clean local startup and repository-validation evidence.

It does not establish deployment, production operation, representative user measurement, independent specialist review, private-data processing, remote-agent safety, production sandboxing, operational monitoring, incident response, provider approval, clinical approval, or institutional readiness.

Every holdpoint in the [Specialist Holdpoint and Unresolved-Work Register](forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md) remains open unless a later versioned record closes it with named evidence.

## Review conclusion

Sprint 7 is ready for founding-steward review for its accepted local public/synthetic Forge implementation scope.

No merge, issue closure, production authorization, private-data access, remote deployment, or Sprint 8 start is implied by this document. The [Pre-Sprint 8 Alignment Review](../roadmap/pre-sprint-8-alignment-review.md) becomes the controlling handoff only after Sprint 7 is explicitly accepted and merged.
