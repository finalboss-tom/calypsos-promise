# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Operational simplicity](decisions/0011-operational-simplicity-and-durable-workflows.md) · [Funding baseline](economics/README.md) · [Consumer-first boundary](decisions/0010-consumer-first-provider-independent-boundary.md) · [Contributing](../CONTRIBUTING.md) · [Current status](roadmap/current-status.md) · [Sprint 5 completion](roadmap/sprint-5-completion-record.md)

This is the canonical entry point for repository documentation. It is designed to answer four questions quickly:

1. What is Calypso’s Promise ultimately trying to accomplish?
2. Which documents are authoritative for the decision I am making?
3. What is implemented now, planned next, proposed for review, or intentionally deferred?
4. Where should a contributor make a change without crossing a product, privacy, safety, canon, consent, security, funding, provider, interoperability, workflow, operability, succession, or governance boundary?

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The directive is constrained by the player promise:

> **Build your Living Chronicle. Improve your health. Keep the key.**

The application is the first operating surface of a long-lived public-benefit institution. Product utility, individual control, provider-independent continuity, operational legibility, transparent contribution, sustainable economics, founder independence, and person-directed long-horizon stewardship must mature together rather than being treated as unrelated workstreams.

## Start with the right reading path

### Understand the mission and non-negotiable boundaries

1. [Product Constitution](frozen/product-constitution.md)
2. [Vision and Institutional Mandate](../VISION.md)
3. [Architecture Foundation](frozen/architecture.md)
4. [World and Lore Canon](frozen/world-and-lore-canon.md)
5. [Gameplay Foundation](product/gameplay-foundation.md)
6. [Public Institutional Roadmap](../ROADMAP.md)

### Understand what exists now

1. [Current Project Status](roadmap/current-status.md)
2. [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
3. [Security Architecture](security/README.md)
4. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
5. [Proposed Operational Simplicity Reconciliation](roadmap/operational-simplicity-reconciliation.md)
6. [Proposed Operational Simplicity and Durable Workflows Workstream](roadmap/operational-simplicity-workstream.md)
7. [Proposed Consumer-First Repository Reconciliation](roadmap/consumer-first-provider-independent-reconciliation.md)
8. [Proposed Consumer-First and Institutional Interoperability Workstream](roadmap/consumer-first-provider-independent-workstream.md)
9. [Sprint Roadmap](roadmap/sprints.md)
10. [Repository and Module Boundaries](architecture/module-boundaries.md)
11. [Minimum Viable Validation](policies/minimum-viable-validation.md)
12. [Pre-Sprint 5 Alignment Review](roadmap/pre-sprint-5-alignment-review.md)
13. [Sprint 4 Completion Record](roadmap/sprint-4-completion-record.md)
14. [Repository Reconciliation](repository-reconciliation-2026-07-24.md)

### Work on operational architecture, workflows, or developer experience

1. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
2. [Operational Simplicity and Durable Workflows Architecture](architecture/operational-simplicity-and-durable-workflows.md)
3. [Mission-to-Runtime Traceability](architecture/mission-to-runtime-traceability.md)
4. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
5. [Operational Simplicity and Durable Workflows Workstream](roadmap/operational-simplicity-workstream.md)
6. [Operational Simplicity Repository Reconciliation](roadmap/operational-simplicity-reconciliation.md)
7. [AS-0013 — Operational Simplicity Can Support Durable Personal Value](governance/assumption-AS-0013-operational-simplicity-durable-value.md)
8. [Calypso Engine](architecture/calypso-engine.md)
9. [Repository and Module Boundaries](architecture/module-boundaries.md)
10. [Minimum Viable Validation](policies/minimum-viable-validation.md)

These documents do not select or implement a production queue, scheduler, event store, database topology, observability provider, offline synchronization protocol, service topology, or performance guarantee. They define a proposed modular-monolith default, responsive and deferred work boundaries, durable operation semantics, local simulation requirements, and evidence-gated complexity.

### Work on provider, EHR, connector, or institutional interoperability

1. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
2. [Consumer-First and Provider-Independent Architecture](architecture/consumer-first-provider-independent-boundary.md)
3. [Consumer-First and Institutional Interoperability Workstream](roadmap/consumer-first-provider-independent-workstream.md)
4. [Consumer-First Repository Reconciliation](roadmap/consumer-first-provider-independent-reconciliation.md)
5. [AS-0012 — Consumer-First Continuity Can Create Durable Personal Value](governance/assumption-AS-0012-consumer-first-continuity-value.md)
6. [Infrastructure Sponsorship and Exit Policy](economics/infrastructure-sponsorship-and-exit-policy.md)
7. [Funding Conflict and Acceptance Policy](economics/funding-conflict-and-acceptance-policy.md)
8. [Why Calypso’s Promise Is Consumer-First](website/why-consumer-first.md)

These documents do not establish a production connector, provider partnership, clinical workflow, standards certification, enterprise product, or EHR replacement. They define a proposed boundary: institutional systems are important sources, destinations, and potential partners connected through versioned adapters; they do not become the automatic owner of Chronicle truth, product authority, roadmap, permissions, or governance.

### Understand the Living Chronicle and House of Keys

1. [Living Chronicle Architecture](architecture/README.md#living-chronicle-architecture)
2. [Living Chronicle Contract Baseline](product/living-chronicle-schema-baseline.md)
3. [House of Keys Architecture](architecture/README.md#house-of-keys-architecture)
4. [House of Keys Contract and Validation Baseline](product/house-of-keys-contract-baseline.md)
5. [Sprint 4 Completion Record](roadmap/sprint-4-completion-record.md)

### Work on legacy, incapacity, estate, or post-mortem stewardship

1. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
2. [Health Data Legacy and Succession Architecture](architecture/health-data-legacy-and-succession.md)
3. [Proposed Future Health Data Legacy Workstream](roadmap/health-data-legacy-workstream.md)
4. [AS-0011 — A provenance-rich Living Chronicle can retain legitimate value after death](governance/assumption-AS-0011-health-data-legacy-value.md)
5. [Living Chronicle Identity and Authority Boundary](architecture/living-chronicle-identity-authority.md)
6. [House of Keys Ontology and Authority Boundary](architecture/house-of-keys-ontology.md)
7. [Account Recovery and Emergency Access Model](security/account-recovery-and-emergency-access-model.md)
8. [Institutional Immune System](governance/institutional-immune-system.md)

These documents define a proposed future capability only. They do not create a production estate-planning service, universal will, executor override, property classification, post-mortem research release, public archive, or successor-access runtime.

### Work on threat modeling or security

1. [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
2. [Security Architecture](security/README.md)
3. [Cross-Contract Reconciliation](security/sprint-5-cross-contract-reconciliation.md)
4. [Specialist Holdpoint Register](security/sprint-5-specialist-holdpoint-and-evidence-register.md)
5. [Sprint 5 Plan](roadmap/sprint-5-plan.md)
6. [Control Status and Risk Vocabulary](security/control-status-and-risk-vocabulary.md)
7. [Security Policy](../SECURITY.md)
8. [Pre-Sprint 5 Alignment Review](roadmap/pre-sprint-5-alignment-review.md)
9. [Architecture Foundation](frozen/architecture.md)
10. [Repository and Module Boundaries](architecture/module-boundaries.md)
11. [Publication and Confidentiality](policies/publication-and-confidentiality.md)
12. [Institutional Immune System](governance/institutional-immune-system.md)

### Work on funding, sponsorship, or institutional economics

1. [Economics and Public-Good Funding](economics/README.md)
2. [Decision 0008 — Funding and Sponsorship Baseline](decisions/0008-funding-and-sponsorship-baseline.md)
3. [Funding and Sponsorship Operating Baseline](economics/funding-and-sponsorship-baseline.md)
4. [Sponsor Benefit and Recognition Policy](economics/sponsor-benefit-and-recognition-policy.md)
5. [Funding Conflict and Acceptance Policy](economics/funding-conflict-and-acceptance-policy.md)
6. [Public Funding Ledger Policy](economics/public-funding-ledger-policy.md)
7. [Public-Good Underwriting Catalogue](economics/public-good-underwriting-catalogue.md)
8. [Infrastructure Sponsorship and Exit Policy](economics/infrastructure-sponsorship-and-exit-policy.md)
9. [Funding Concentration and Continuity Policy](economics/funding-concentration-and-continuity-policy.md)
10. [Synthetic Funding Scenarios and Table Exercises](economics/funding-synthetic-scenarios-and-tabletops.md)
11. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
12. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)

### Contribute code, content, or documentation

1. [Contributing](../CONTRIBUTING.md)
2. [Development Policy](policies/development.md)
3. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
4. [Repository and Module Boundaries](architecture/module-boundaries.md)
5. [Content Governance](governance/content-governance.md)
6. [Decision Records](decisions/README.md)

### Work on feedback, governance, or institutional resilience

1. [Governance Baseline](../GOVERNANCE.md)
2. [Feedback to Governed Work](governance/feedback-to-governed-work.md)
3. [Manual Feedback Triage Protocol](governance/feedback-triage-operating-protocol.md)
4. [Institutional Immune System](governance/institutional-immune-system.md)
5. [Assumption Registry](governance/assumption-registry.md)
6. [Funding and Sponsorship Baseline](economics/README.md)
7. [Operational Simplicity Assumption](governance/assumption-AS-0013-operational-simplicity-durable-value.md)
8. [Consumer-First Continuity Assumption](governance/assumption-AS-0012-consumer-first-continuity-value.md)
9. [Health Data Legacy Value Assumption](governance/assumption-AS-0011-health-data-legacy-value.md)

### Work on the public website or campaign

1. [Website Documentation](website/README.md)
2. [Why Calypso’s Promise Is Consumer-First](website/why-consumer-first.md)
3. [Public Narrative and Campaign Documents](public/README.md)
4. [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)
5. [Public-Domain Commons](../PUBLIC_DOMAIN.md)
6. [Funding and Sponsorship Baseline](economics/README.md)

## Authority and conflict order

When documents appear to conflict, use this order and open a decision record rather than silently choosing a convenient interpretation:

1. Frozen product, architecture, world, gameplay, and institutional commitments
2. Accepted decision records
3. Governance, public roadmap, security, publication, economics, and other cross-cutting policies
4. Versioned architecture, product, data, content, and operating baselines
5. Sprint plans, workstreams, completion records, implementation notes, and current-status records
6. Public campaign materials and time-sensitive experiments

A proposed decision or architecture establishes reviewable intent and future constraints. It does not override an accepted record until accepted through the repository’s ordinary authority process.

A lower layer may implement or explain a higher layer. It may not quietly override it.

## Documentation map

| Area                 | Purpose                                                                                                   | Entry point                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Frozen foundations   | Constitutional and canonical constraints                                                                  | [Frozen Foundations](frozen/README.md)                      |
| Decisions            | Material architectural and institutional choices                                                          | [Decision Records](decisions/README.md)                     |
| Architecture         | System, workflow, data, consent, AI, provider, interoperability, story, succession, and module boundaries | [Architecture Documentation](architecture/README.md)        |
| Security             | Threats, controls, evidence, residual risk, and tabletop exercises                                        | [Security Architecture](security/README.md)                 |
| Economics            | Funding, sponsorship, underwriting, conflicts, concentration, provider neutrality, and exit               | [Economics and Public-Good Funding](economics/README.md)    |
| Product              | Gameplay, incentives, vocabulary, schemas, and validation contracts                                       | [Product Documentation](product/README.md)                  |
| Governance           | Contribution, content, feedback, challenge, correction, assumptions, and authority                        | [Governance Documentation](governance/README.md)            |
| Roadmap              | Current status, sprint sequence, future workstreams, evidence, and completion records                     | [Roadmap Documentation](roadmap/README.md)                  |
| Policies             | Development, operability, validation, publication, and information handling                               | [Policy Documentation](policies/README.md)                  |
| Website              | Public discovery, trust, lore, consumer-first explanation, documentation, and synthetic prologue          | [Website Documentation](website/README.md)                  |
| Public communication | Campaign strategy, provenance, launch material, and public ledger                                         | [Public Narrative and Campaign Documents](public/README.md) |

## Implemented repository surfaces

The current codebase is intentionally smaller than the frozen target topology.

- [`apps/site`](../apps/site) — bounded public repository gateway and purpose-limited signup adapter
- [`packages/domain`](../packages/domain) — small shared invariant package for public and synthetic contributor data
- [`packages/content-schema`](../packages/content-schema) — pre-stable content contracts, deterministic validation, graph contracts, and JSON Schema
- [`packages/health-schema`](../packages/health-schema) — pre-stable Living Chronicle contracts, deterministic cross-reference validation, and public synthetic fixtures
- [`packages/house-of-keys`](../packages/house-of-keys) — pre-stable purpose-specific permission contracts, deterministic validation and policy evaluation, access receipts, and public synthetic fixtures
- [`content`](../content) — versioned, review-gated public content examples
- [`security`](security/README.md) — completed Sprint 5 architecture, procedures, controls, residual risk, synthetic tabletop evidence, reconciliation, and specialist holdpoints
- [`economics`](economics/README.md) — merged Phase 0 funding and sponsorship doctrine, public register structures, synthetic examples, and design table exercises; no operating treasury, provider, connector, or enterprise relationship
- [`tools`](../tools) — repository policy, documentation, funding-register, and content validation

The House of Keys package remains separate from the Living Chronicle package. It may reference controlled Chronicle resources, but permission truth, grant state, decisions, receipts, comprehension evidence, commands, jobs, projections, Legacy Directives, authority claims, succession cases, estate evidence, provider relationships, standards mappings, and enterprise contracts do not become Chronicle truth.

Planned applications, services, packages, infrastructure, production orchestration, workflow systems, security controls, financial systems, provider and connector integrations, clinical and enterprise systems, legacy and succession systems, and real-data paths remain design targets until an accepted workstream creates them with an owner, public contract, tests or evidence, and a justified dependency boundary. Do not add empty packages merely to mirror the frozen topology.

## Navigation and maintenance rules

Every new documentation area should have one index that explains:

- what belongs there
- which document is canonical for each concern
- the recommended reading order
- the authority level of the documents
- how to return to this documentation home

Use relative Markdown links for navigational references rather than presenting repository paths only as inline code. Run `pnpm docs:check` or the full `pnpm check` before opening a pull request.

Update this index when a new top-level documentation area, canonical baseline, accepted or proposed decision, implemented package, or major reading path is added.
