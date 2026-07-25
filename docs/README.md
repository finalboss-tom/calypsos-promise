# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Contributing](../CONTRIBUTING.md) · [Current status](roadmap/current-status.md) · [Repository review](repository-reconciliation-2026-07-24.md)

This is the canonical entry point for repository documentation. It is designed to answer four questions quickly:

1. What is Calypso’s Promise ultimately trying to accomplish?
2. Which documents are authoritative for the decision I am making?
3. What is implemented now, planned next, or intentionally deferred?
4. Where should a contributor make a change without crossing a product, privacy, safety, canon, or governance boundary?

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The directive is constrained by the player promise:

> **Build your Living Chronicle. Improve your health. Keep the key.**

The application is the first operating surface of a long-lived public-benefit institution. Product utility, individual control, transparent contribution, sustainable economics, and founder independence must mature together rather than being treated as unrelated workstreams.

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
2. [Repository Reconciliation](repository-reconciliation-2026-07-24.md)
3. [Sprint Roadmap](roadmap/sprints.md)
4. [Repository and Module Boundaries](architecture/module-boundaries.md)
5. [Minimum Viable Validation](policies/minimum-viable-validation.md)

### Contribute code, content, or documentation

1. [Contributing](../CONTRIBUTING.md)
2. [Development Policy](policies/development.md)
3. [Repository and Module Boundaries](architecture/module-boundaries.md)
4. [Content Governance](governance/content-governance.md)
5. [Decision Records](decisions/README.md)

### Work on feedback, governance, or institutional resilience

1. [Governance Baseline](../GOVERNANCE.md)
2. [Feedback to Governed Work](governance/feedback-to-governed-work.md)
3. [Manual Feedback Triage Protocol](governance/feedback-triage-operating-protocol.md)
4. [Institutional Immune System](governance/institutional-immune-system.md)
5. [Assumption Registry](governance/assumption-registry.md)

### Work on the public website or campaign

1. [Website Documentation](website/README.md)
2. [Public Narrative and Campaign Documents](public/README.md)
3. [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)
4. [Public-Domain Commons](../PUBLIC_DOMAIN.md)

## Authority and conflict order

When documents appear to conflict, use this order and open a decision record rather than silently choosing a convenient interpretation:

1. Frozen product, architecture, world, gameplay, and institutional commitments
2. Accepted decision records
3. Governance, public roadmap, security, publication, and other cross-cutting policies
4. Versioned architecture, product, data, content, and operating baselines
5. Sprint plans, completion records, implementation notes, and current-status records
6. Public campaign materials and time-sensitive experiments

A lower layer may implement or explain a higher layer. It may not quietly override it.

## Documentation map

| Area | Purpose | Entry point |
| --- | --- | --- |
| Frozen foundations | Constitutional and canonical constraints | [Frozen Foundations](frozen/README.md) |
| Decisions | Material architectural and institutional choices | [Decision Records](decisions/README.md) |
| Architecture | System, data, AI, story, and module boundaries | [Architecture Documentation](architecture/README.md) |
| Product | Gameplay, incentives, vocabulary, schemas, and validation contracts | [Product Documentation](product/README.md) |
| Governance | Contribution, content, feedback, challenge, and correction systems | [Governance Documentation](governance/README.md) |
| Roadmap | Current status, sprint sequence, evidence, and completion records | [Roadmap Documentation](roadmap/README.md) |
| Policies | Development, validation, publication, and information handling | [Policy Documentation](policies/README.md) |
| Website | Public discovery, trust, lore, documentation, and synthetic prologue | [Website Documentation](website/README.md) |
| Public communication | Campaign strategy, provenance, launch material, and public ledger | [Public Narrative and Campaign Documents](public/README.md) |

## Implemented repository surfaces

The current codebase is intentionally smaller than the frozen target topology.

- [`apps/site`](../apps/site) — credential-free contributor smoke-test site; not yet the planned Next.js experience
- [`packages/domain`](../packages/domain) — small shared invariant package for public and synthetic contributor data
- [`packages/content-schema`](../packages/content-schema) — pre-stable content contracts, deterministic validation, graph contracts, and JSON Schema
- [`packages/health-schema`](../packages/health-schema) — pre-stable Living Chronicle contracts, deterministic cross-reference validation, and public synthetic fixtures
- [`content`](../content) — versioned, review-gated public content examples
- [`tools`](../tools) — repository policy and documentation validation

Planned applications, services, packages, infrastructure, and production data paths remain design targets until a sprint creates them with an owner, public contract, tests, and a justified dependency boundary. Do not add empty packages merely to mirror the frozen topology.

## Navigation and maintenance rules

Every new documentation area should have one index that explains:

- what belongs there
- which document is canonical for each concern
- the recommended reading order
- the authority level of the documents
- how to return to this documentation home

Use relative Markdown links for navigational references rather than presenting repository paths only as inline code. Run `pnpm docs:check` or the full `pnpm check` before opening a pull request.

Update this index when a new top-level documentation area, canonical baseline, accepted decision, implemented package, or major reading path is added.
