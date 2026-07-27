# Economics and Public-Good Funding

[Documentation home](../README.md) · [Decision 0008](../decisions/0008-funding-and-sponsorship-baseline.md) · [Decision 0010](../decisions/0010-consumer-first-provider-independent-boundary.md) · [Governance](../../GOVERNANCE.md) · [Institutional roadmap](../../ROADMAP.md) · [Tracking issue #37](https://github.com/finalboss-tom/calypsos-promise/issues/37)

## Purpose

This directory is the source of truth for Calypso’s Promise’s Phase 0 funding and sponsorship doctrine.

It defines how donations, grants, sponsorships, public-good underwriting, in-kind support, provider credits, funded connectors, enterprise support, and related economic relationships may be evaluated without allowing money to purchase private information, product authority, health influence, research access, governance control, player progression, favorable findings, provider placement, connector priority, canonical schema authority, or exemption from ordinary review.

The current implementation is documentation, public registers, synthetic exercises, and lightweight repository validation only.

No file in this directory establishes:

- an operating treasury;
- a nonprofit, for-profit, fiscal sponsor, foundation, or other legal entity;
- tax-deductible or charitable status;
- an approved payment processor, bank, accounting platform, or custody arrangement;
- accepted donations, grants, sponsors, investments, affiliate revenue, research funding, enterprise contracts, or provider relationships;
- compensation, reimbursement, reserves, budgeting, or ownership systems;
- a preferred provider, EHR, connector, implementation guide, clinical partner, or infrastructure vendor; or
- production financial controls or independent financial review.

## Read in this order

1. [Decision 0008 — Funding and Sponsorship Baseline](../decisions/0008-funding-and-sponsorship-baseline.md)
2. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
3. [Funding and Sponsorship Operating Baseline](funding-and-sponsorship-baseline.md)
4. [Sponsor Benefit and Recognition Policy](sponsor-benefit-and-recognition-policy.md)
5. [Funding Conflict and Acceptance Policy](funding-conflict-and-acceptance-policy.md)
6. [Public Funding Ledger Policy](public-funding-ledger-policy.md)
7. [Public-Good Underwriting Catalogue](public-good-underwriting-catalogue.md)
8. [Infrastructure Sponsorship and Exit Policy](infrastructure-sponsorship-and-exit-policy.md)
9. [Funding Concentration and Continuity Policy](funding-concentration-and-continuity-policy.md)
10. [Synthetic Funding Scenarios and Table Exercises](funding-synthetic-scenarios-and-tabletops.md)
11. [Phase 0 Funding Completion Record](phase-0-funding-completion-record.md)

Machine-readable public records:

- [`funding-records.yml`](funding-records.yml) — material relationship register
- [`funding-opportunities.yml`](funding-opportunities.yml) — public-good funding opportunities
- [`synthetic-funding-records.yml`](synthetic-funding-records.yml) — fictional relationship examples for validation and review
- [`synthetic-funding-opportunities.yml`](synthetic-funding-opportunities.yml) — fictional public-good opportunity examples

## Validation

Run `pnpm economics:check` to verify that the canonical live registers remain empty, synthetic records are explicitly fictional, stable identifiers are unique, and required relationship and opportunity sections are present. This lightweight validation checks repository contracts; it is not accounting reconciliation, legal review, operational financial assurance, provider evaluation, connector validation, or clinical interoperability certification.

## Authority

The authority order is:

1. Product Constitution, Vision, public-domain commitment, and frozen player rights
2. Accepted decision records, including Decision 0008 and, if accepted, Decision 0010
3. Governance, institutional roadmap, publication, security, and other cross-cutting policies
4. This economics baseline and its public registers
5. Website, campaign, fundraising, partnership, connector, enterprise, and implementation surfaces

A donation form, sponsor page, contract, payment processor, private negotiation, vendor offer, provider partnership, EHR integration, grant restriction, or website experiment cannot silently override a higher layer.

## Current status

- **Funding doctrine:** accepted internally through Decision 0008
- **Consumer-first provider boundary:** proposed through Decision 0010 and issue #41
- **Public registers:** Phase 0 public and synthetic structures only
- **Actual funding destination:** not selected or approved
- **`.github/FUNDING.yml`:** intentionally absent until a legitimate approved destination exists
- **Donation or sponsorship runtime:** not implemented
- **Provider, EHR, connector, enterprise, affiliate, or procurement runtime:** not implemented
- **Independent legal, accounting, tax, nonprofit, financial-control, clinical-informatics, interoperability, and procurement review:** pending
- **Treasury and sustainable-economics governance:** deferred to later gates
- **Founder-subsidy and economic-dependency inventory:** still required as a separate factual Phase 0 closure artifact

## Core rules

- Personal value comes before secondary use and does not depend on payment or enterprise enrollment.
- Funding cannot purchase rights, data, authority, favorable findings, safety exceptions, provider placement, connector rank, canonical schema authority, or roadmap priority.
- Recognition is attribution, not product endorsement, clinical approval, preferred-provider status, or institutional power.
- Funded work uses ordinary governed-work processes.
- Public records expose institutional relationships and effects, not raw private financial sources.
- In-kind support is funding and must be valued, disclosed, dependency-reviewed, and replaceable.
- A funded provider, EHR, payer, laboratory, device, exchange, AI, cloud, or connector relationship is both an economic input and a product or architecture conflict.
- A sponsor, funded implementer, or sponsor-funded evaluator cannot independently certify its own connector, mapping, provider suitability, security, accessibility, clinical safety, or outcome.
- External schemas, implementation guides, and provider models remain versioned adapter concerns; support does not make them Chronicle authority.
- Concentration is assessed through financial share, market distribution, data access, source reach, and critical-function dependency.
- Every material relationship must be challengeable, containable, correctable, terminable, migratable, and revalidated.

## Repository boundary

Only PUBLIC, reviewed institutional records and synthetic examples belong here.

Do not commit:

- donor, patient, provider, clinician, partner, or participant contact lists;
- bank, card, payment, tax, payroll, or identity-verification records;
- raw contracts, invoices, receipts, negotiations, business-associate agreements, data-processing agreements, procurement records, or correspondence;
- credentials, credits, tokens, account identifiers, private endpoints, or nonpublic connector configuration;
- confidential legal, accounting, tax, clinical, regulatory, interoperability, security, or procurement advice;
- personal compensation records; or
- nonpublic vendor, provider, mapping, conformance, pricing, or partner evaluation material.

A public record may cite a stable public relationship identifier. Any mapping to a private source record remains in the approved private system.

## Website relationship

The website may later render approved records from this directory for support, donation transparency, current status, public-good opportunities, funding outcomes, and material provider or connector relationships.

The website may not activate a donation, sponsor, affiliate, grant-intake, provider-intake, enterprise-contract, connector-placement, referral, ranking, or procurement surface merely because the documentation exists. Implementation requires a separately approved destination, authority, privacy and retention rules, custody, accounting ownership, correction and refund behavior, conflict review, portability, termination, and truthful capability status.

Provider, EHR, connector, and infrastructure recognition must remain separate from health recommendations, provider rankings, permission flows, research eligibility, clinical claims, standards certification, and product defaults.
