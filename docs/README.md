# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Pre-Sprint 6 review](roadmap/pre-sprint-6-alignment-review.md) · [Contributing](../CONTRIBUTING.md)

This is the canonical entry point for repository documentation. It should answer four questions quickly:

1. What is Calypso’s Promise ultimately trying to accomplish?
2. Which documents are authoritative for the decision being made?
3. What is implemented now, accepted but planned, proposed for review, or intentionally deferred?
4. Where should a contributor make a change without crossing a product, privacy, safety, canon, permission, security, funding, provider, interoperability, workflow, operability, succession, or governance boundary?

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The directive is constrained by the player promise:

> **Build your Living Chronicle. Improve your health. Keep the key.**

The application is the first operating surface of a long-lived public-benefit institution. Product utility, individual control, provider-independent continuity, operational legibility, transparent contribution, sustainable economics, founder independence, and person-directed long-horizon stewardship must mature together rather than being treated as unrelated workstreams.

## Current orientation

1. [Current Project Status](roadmap/current-status.md)
2. [Pre-Sprint 6 Repository Alignment Review](roadmap/pre-sprint-6-alignment-review.md)
3. [Sprint Roadmap](roadmap/sprints.md)
4. [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
5. [Security Architecture](security/README.md)
6. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
7. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
8. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
9. [Repository and Module Boundaries](architecture/module-boundaries.md)
10. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
11. [Minimum Viable Validation](policies/minimum-viable-validation.md)
12. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary

## Mission and non-negotiable boundaries

Read in this order:

1. [Product Constitution](frozen/product-constitution.md)
2. [Vision and Institutional Mandate](../VISION.md)
3. [Architecture Foundation](frozen/architecture.md)
4. [World and Lore Canon](frozen/world-and-lore-canon.md)
5. [Gameplay Foundation](product/gameplay-foundation.md)
6. [Public Institutional Roadmap](../ROADMAP.md)
7. [Governance Baseline](../GOVERNANCE.md)

These documents protect personal value first, meaningful refusal, non-punitive return, deterministic authority, private health data, provider replaceability, progressive decentralization, public institutional legibility, and the rule that AI proposes while people and domain services control authoritative changes.

## Authority and conflict order

When documents appear to conflict, use this order and open a decision record rather than silently choosing a convenient interpretation:

1. Frozen product, architecture, world, gameplay, and institutional commitments
2. Accepted decision records
3. Governance, public roadmap, security, publication, economics, development, and other cross-cutting policies
4. Versioned architecture, product, data, content, security, and operating baselines
5. Sprint plans, cross-phase workstreams, completion records, implementation notes, and current-status records
6. Public campaign materials and time-sensitive experiments

A proposed decision or architecture establishes reviewable intent and future constraints. It does not override an accepted record until accepted through the repository’s ordinary authority process.

A lower layer may implement or explain a higher layer. It may not quietly override it.

## Current accepted strategic and architectural baselines

### Consumer-first and provider-independent

- [Decision 0010](decisions/0010-consumer-first-provider-independent-boundary.md)
- [Consumer-First and Provider-Independent Architecture](architecture/consumer-first-provider-independent-boundary.md)
- [Consumer-First and Institutional Interoperability Workstream](roadmap/consumer-first-provider-independent-workstream.md)
- [AS-0012 — Consumer-First Continuity Can Create Durable Personal Value](governance/assumption-AS-0012-consumer-first-continuity-value.md)
- [Infrastructure Sponsorship and Exit Policy](economics/infrastructure-sponsorship-and-exit-policy.md)

Decision 0010 is accepted. Providers, EHRs, payers, laboratories, pharmacies, devices, exchanges, and research institutions are important sources, destinations, and potential partners connected through versioned adapters. They do not become the automatic owner of Chronicle meaning, product authority, roadmap, permissions, or governance.

AS-0012 is active because it informs design, but it remains an unvalidated working hypothesis.

### Operational simplicity and durable workflows

- [Decision 0011](decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Operational Simplicity and Durable Workflows Architecture](architecture/operational-simplicity-and-durable-workflows.md)
- [Mission-to-Runtime Traceability](architecture/mission-to-runtime-traceability.md)
- [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
- [Operational Simplicity and Durable Workflows Workstream](roadmap/operational-simplicity-workstream.md)
- [AS-0013 — Operational Simplicity Can Support Durable Personal Value](governance/assumption-AS-0013-operational-simplicity-durable-value.md)

Decision 0011 is accepted. The modular monolith remains the default deployment posture. Responsive work, deferred jobs, schedules, domain events, projections, and provider adapters remain explicit concepts rather than hidden infrastructure conventions. Event-informed architecture does not select universal event sourcing, and offline-tolerant direction does not claim a completed local-first design.

AS-0013 is active because it informs design, but it remains an unvalidated working hypothesis.

### Funding and sponsorship

- [Economics and Public-Good Funding](economics/README.md)
- [Decision 0008 — Funding and Sponsorship Baseline](decisions/0008-funding-and-sponsorship-baseline.md)
- [Funding and Sponsorship Operating Baseline](economics/funding-and-sponsorship-baseline.md)
- [Sponsor Benefit and Recognition Policy](economics/sponsor-benefit-and-recognition-policy.md)
- [Funding Conflict and Acceptance Policy](economics/funding-conflict-and-acceptance-policy.md)
- [Public Funding Ledger Policy](economics/public-funding-ledger-policy.md)
- [Infrastructure Sponsorship and Exit Policy](economics/infrastructure-sponsorship-and-exit-policy.md)
- [Funding Concentration and Continuity Policy](economics/funding-concentration-and-continuity-policy.md)

The funding doctrine is accepted and merged. It does not accept money or establish an entity, fiscal sponsor, bank, payment rail, accounting system, tax status, treasury, compensation system, affiliate program, investment instrument, research-funding program, provider, connector, or production financial control.

Funding cannot purchase private data, product authority, health influence, source rank, provider defaults, connector placement, research authority, roadmap control, governance power, favorable findings, safety exceptions, game progression, or publication control.

## Living Chronicle and House of Keys

### Living Chronicle

1. [Living Chronicle Architecture](architecture/README.md#living-chronicle-architecture)
2. [Living Chronicle Contract Baseline](product/living-chronicle-schema-baseline.md)
3. [Living Chronicle Validation Baseline](product/living-chronicle-validation-baseline.md)
4. [Living Chronicle Synthetic Fixtures](product/living-chronicle-synthetic-fixtures.md)
5. [Living Chronicle Compatibility and Migration](product/living-chronicle-compatibility-migration.md)
6. [Sprint 3 Completion Record](roadmap/sprint-3-completion-record.md)

External clinical, claims, laboratory, pharmacy, device, EHR, payer, and research records remain source-attributed inputs mapped through future versioned adapters. A source schema, implementation guide, provider relationship, sponsor, or enterprise contract does not silently become Chronicle truth.

### House of Keys

1. [House of Keys Architecture](architecture/README.md#house-of-keys-architecture)
2. [House of Keys Contract and Validation Baseline](product/house-of-keys-contract-baseline.md)
3. [Sprint 4 Completion Record](roadmap/sprint-4-completion-record.md)

Permission truth remains separate from Chronicle truth. A grant may authorize an operation; it does not create the underlying record, authenticate an actor, execute the operation, or become a reward condition.

## Sprint 6 — Aster contracts and AI governance

The [Pre-Sprint 6 Alignment Review](roadmap/pre-sprint-6-alignment-review.md) is the controlling handoff.

Sprint 6 should define one bounded pre-stable Aster contract capability rather than extending Chronicle truth or selecting a provider runtime. It must cover:

- Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper role contracts;
- intent, extraction, clarification, confidence, uncertainty, refusal, and fallback;
- a structured proposal envelope distinct from Chronicle, House of Keys, quest, memory, receipt, audit, provider-log, retrieval-index, and work-operation state;
- source-linked recall and retrieval freshness;
- visible, editable, exportable, deletable memory classes;
- provider egress, retention, training, conflicts, replacement, and teardown;
- prompt-injection and untrusted-input isolation;
- responsive, deferred, failed, stale, corrected, superseded, and provider-unavailable result contracts;
- a deterministic local or synthetic adapter;
- a complete manual and non-AI path;
- public synthetic fixtures and tests; and
- compatibility, security-control, specialist-holdpoint, and completion evidence.

The frozen transaction rule remains:

> AI proposes. The player confirms. The domain service validates and stores.

Sprint 6 does not select or endorse a production AI provider, EHR, connector, clinical partner, queue, scheduler, workflow engine, event store, vector database, model gateway, cloud, or enterprise relationship.

## Security and information handling

1. [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
2. [Security Architecture](security/README.md)
3. [Cross-Contract Reconciliation](security/sprint-5-cross-contract-reconciliation.md)
4. [Specialist Holdpoint Register](security/sprint-5-specialist-holdpoint-and-evidence-register.md)
5. [Security Policy](../SECURITY.md)
6. [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)

No production health data, credentials, private exports, raw campaign submissions, contact lists, private correspondence, conduct evidence, security reports, protected provider or interoperability records, private contracts or negotiations, estate records, financial source records, or protected operational information belong in public project systems.

Use public or synthetic information. Create reviewed, minimized public derivatives when protected evidence materially affects a public decision.

## Legacy, incapacity, estate, or post-mortem stewardship

1. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
2. [Health Data Legacy and Succession Architecture](architecture/health-data-legacy-and-succession.md)
3. [Future Health Data Legacy Workstream](roadmap/health-data-legacy-workstream.md)
4. [AS-0011 — Post-Mortem Chronicle Value](governance/assumption-AS-0011-health-data-legacy-value.md)
5. [Account Recovery and Emergency Access Model](security/account-recovery-and-emergency-access-model.md)

These documents remain proposed future capability only. They do not create a production estate-planning service, universal will, executor override, property classification, post-mortem research release, public archive, successor-access runtime, or legal conclusion.

## Contribute code, content, or documentation

1. [Contributing](../CONTRIBUTING.md)
2. [Development Policy](policies/development.md)
3. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
4. [Repository and Module Boundaries](architecture/module-boundaries.md)
5. [Content Governance](governance/content-governance.md)
6. [Decision Records](decisions/README.md)
7. [Minimum Viable Validation](policies/minimum-viable-validation.md)

A new module requires a bounded responsibility, current consumer, public contract, dependency direction, owner, tests, synthetic evidence, and proportionate operational justification. Do not create empty topology placeholders.

## Feedback, governance, and institutional resilience

1. [Governance Baseline](../GOVERNANCE.md)
2. [Feedback to Governed Work](governance/feedback-to-governed-work.md)
3. [Manual Feedback Triage Protocol](governance/feedback-triage-operating-protocol.md)
4. [Institutional Immune System](governance/institutional-immune-system.md)
5. [Assumption Registry](governance/assumption-registry.md)
6. [Public Institutional Roadmap](../ROADMAP.md)

The project remains maintainer-led during Phase 0. Community signals are advisory. Broader authority is earned through published evidence, safeguards, competence, representation, conflicts, reversibility, and phase gates—not fundraising, user count, token issuance, provider status, enterprise revenue, or contribution volume alone.

## Documentation map

| Area                 | Purpose                                                                                                      | Entry point                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Frozen foundations   | Constitutional and canonical constraints                                                                     | [Frozen Foundations](frozen/README.md)                      |
| Decisions            | Material architectural and institutional choices                                                             | [Decision Records](decisions/README.md)                     |
| Architecture         | System, workflow, data, permission, AI, provider, interoperability, story, succession, and module boundaries | [Architecture Documentation](architecture/README.md)        |
| Security             | Threats, controls, evidence, residual risk, and tabletop exercises                                           | [Security Architecture](security/README.md)                 |
| Economics            | Funding, sponsorship, underwriting, conflicts, concentration, provider neutrality, and exit                  | [Economics and Public-Good Funding](economics/README.md)    |
| Product              | Gameplay, incentives, vocabulary, schemas, and validation contracts                                          | [Product Documentation](product/README.md)                  |
| Governance           | Contribution, content, feedback, challenge, correction, assumptions, and authority                           | [Governance Documentation](governance/README.md)            |
| Roadmap              | Current status, sprint sequence, future workstreams, evidence, and completion records                        | [Roadmap Documentation](roadmap/README.md)                  |
| Policies             | Development, operability, validation, publication, and information handling                                  | [Policy Documentation](policies/README.md)                  |
| Website              | Public discovery, trust, lore, consumer-first explanation, documentation, and synthetic prologue             | [Website Documentation](website/README.md)                  |
| Public communication | Campaign strategy, provenance, launch material, and public ledger                                            | [Public Narrative and Campaign Documents](public/README.md) |

## Implemented repository surfaces

The current codebase is intentionally smaller than the frozen target topology.

- [`apps/site`](../apps/site) — bounded public repository gateway
- [`packages/domain`](../packages/domain) — shared public and synthetic invariants
- [`packages/content-schema`](../packages/content-schema) — content contracts and deterministic validation
- [`packages/health-schema`](../packages/health-schema) — Living Chronicle contracts and public synthetic fixtures
- [`packages/house-of-keys`](../packages/house-of-keys) — House of Keys contracts, pure policy evaluation, receipts, and public synthetic fixtures
- [`content`](../content) — versioned public and synthetic content
- [`tools`](../tools) — repository, documentation, funding, and content validation

No production health-data, account, House of Keys enforcement, agent, connector, research, financial, legacy, estate, successor, workflow, or deployed security-control runtime exists.

## Status rule

Use [Current Project Status](roadmap/current-status.md) as the canonical integrated status record. A merged document can still define a proposed future capability. An accepted doctrine can still have no runtime. A completed sprint can still lack independent review. Never convert design, synthetic evidence, CI success, vendor capability, or founder acceptance into a stronger status than the evidence supports.
