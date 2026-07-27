# Decision 0010 — Consumer-First, Provider-Independent Product Boundary

- **Status:** BASELINE — accepted through PR #42
- **Date:** 2026-07-27
- **Decision class:** Product, architecture, strategy, economics, and institutional resilience
- **Acceptance authority:** Founding steward under the Phase 0 governance baseline
- **Tracking issue:** [#41](https://github.com/finalboss-tom/calypsos-promise/issues/41)
- **Pull request:** [#42](https://github.com/finalboss-tom/calypsos-promise/pull/42)
- **Squash commit:** `188a6409de9bfc967fdb0f46bc08eb35ddfd6f9c`
- **Entry baseline:** Phase 0 Funding and Sponsorship Baseline squash commit `32ac27bfb35ed64f34c64108a5d54c375d429593`
- **Independent review:** Not yet obtained; clinical informatics, interoperability, health-system operations, privacy, security, accessibility, regulatory, procurement, and economic review remain pending

## Context

Calypso’s Promise begins with a useful consumer application and a person-controlled longitudinal Living Chronicle. The repository already preserves personal value first, provider-independent identity, provenance, correction, export, deletion, purpose-specific authority, provider replaceability, and separately gated research and commerce.

The project did not yet contain one explicit decision explaining how those commitments affect clinics, physicians, electronic health records, payers, laboratories, pharmacies, health information exchanges, research institutions, and future enterprise relationships.

Without a durable boundary, later implementation or funding pressure could produce two opposite errors:

1. treating institutional healthcare as irrelevant and refusing useful standards, sources, destinations, or partnerships; or
2. allowing an EHR vendor, provider organization, enterprise buyer, sponsor, grantor, implementation guide, or integration contract to become the de facto authority over the Living Chronicle, product roadmap, or player relationship.

Neither outcome serves the Promise.

## Source basis

### Internal sources

- [Product Constitution](../frozen/product-constitution.md)
- [Vision and Institutional Mandate](../../VISION.md)
- [Architecture Foundation](../frozen/architecture.md)
- [Living Chronicle Architecture](../architecture/README.md#living-chronicle-architecture)
- [House of Keys Architecture](../architecture/README.md#house-of-keys-architecture)
- [Public Institutional Roadmap](../../ROADMAP.md)
- [Decision 0008 — Funding and Sponsorship Baseline](0008-funding-and-sponsorship-baseline.md)
- [Infrastructure Sponsorship and Exit Policy](../economics/infrastructure-sponsorship-and-exit-policy.md)
- [Assumption Registry](../governance/assumption-registry.md)

### External standards and policy sources

These sources demonstrate meaningful interoperability progress and continuing implementation variation. They do not establish one universal product ontology for Calypso’s Promise.

- [HL7 FHIR overview](https://hl7.org/fhir/overview.html) defines an exchange standard built from resources, profiles, extensions, terminologies, and implementation rules.
- [US Core 9.0.0](https://hl7.org/fhir/us/core/STU9/) is the current published U.S. Realm implementation guide as of May 31, 2026. It defines minimum constraints and describes itself as a standards “floor” that can expand for particular use cases.
- [ONC Interoperability Standards Platform](https://isp.healthit.gov/) publishes the 2026 Interoperability Standards Advisory, USCDI versions, and approved standards rather than one complete longitudinal life-record schema.
- [GAO-15-817](https://www.gao.gov/products/gao-15-817) identifies standards insufficiencies, privacy variation, patient matching, cost, governance, and trust as persistent interoperability challenges.
- [GAO-17-184](https://www.gao.gov/products/gao-17-184) reports variability in standards implementation, difficulty locating relevant exchanged information, cost, and workflow disruption.
- [ONC’s information-blocking API analysis](https://healthit.gov/blog/interoperability/getting-real-about-information-blocking-and-apis/) describes behavioral, contractual, fee, registration, documentation, and connection barriers that remain even when standardized APIs exist.

### Historical product and platform sources

- Google’s [2011 Google Health retirement announcement](https://googleblog.blogspot.com/2011/06/update-on-google-health-and-google.html) states that limited adoption did not become widespread use in daily health routines. Google Health was a consumer personal health record, not an enterprise EHR replacement.
- The peer-reviewed study [“Personal Health Records Success: Why Google Health Failed and What Does that Mean for Microsoft HealthVault?”](https://doi.org/10.1109/HICSS.2014.353) examined relevance, usefulness, trust, perceived risk, adoption, and critical-mass problems. It does not prove that every person-controlled record must fail.
- Microsoft and GE’s [2012 Caradigm announcement](https://news.microsoft.com/source/2012/02/13/ge-microsoft-share-plans-for-new-joint-venture-caradigm/) describes an open, interoperable enterprise platform intended to integrate data across care-delivery silos and included Microsoft Amalga. It illustrates the scale and organizational complexity of enterprise integration; it does not prove that all B2B health technology is futile.

## Decision

Calypso’s Promise adopts a **consumer-first, provider-independent product boundary**.

The person-controlled Living Chronicle is the canonical longitudinal product model. Clinics, physicians, EHRs, payers, laboratories, pharmacies, devices, health information exchanges, research institutions, and other institutional systems are important sources, destinations, counterparties, and potential partners. They do not become the constitutional center of the product or the automatic authority over Chronicle meaning.

The durable rule is:

> Calypso’s Promise will interoperate with institutional healthcare without being architected around institutional healthcare.

## Required architectural behavior

A future implementation must:

1. preserve original source payloads, documents, versions, identifiers, timing, and provenance where lawful and technically possible;
2. map external standards and local implementations through versioned adapters rather than copying their assumptions into Chronicle truth;
3. distinguish clinical assertions, claims, device observations, person-confirmed records, recollections, calculations, associations, and inferences;
4. preserve conflicts and uncertainty rather than silently selecting one institutional source as universally authoritative;
5. record implementation-guide, profile, terminology, mapping, transformation, and compatibility versions;
6. support export and destination-specific representations without making an export schema the internal canonical model;
7. keep connector authorization, synchronization, revocation, deletion, receipt, and custody boundaries explicit;
8. make provider-specific code and mappings replaceable and prevent one connector from becoming a mandatory dependency for the complete personal product; and
9. require a separate decision and specialist review before clinical workflow, decision support, institutional administration, billing, research, or enterprise operations become product capabilities.

## Product and market boundary

The consumer-first decision means:

- a person can receive substantial core value without their provider, payer, employer, researcher, or EHR vendor becoming a Calypso’s Promise customer;
- no institutional procurement process defines the minimum useful Chronicle;
- enterprise requests do not silently displace the personal-value roadmap;
- clinical information is treated with appropriate weight and provenance without erasing lived experience between encounters;
- provider and caregiver collaboration may be added later through bounded, purpose-specific authority; and
- B2B, B2B2C, clinical, research, payer, employer, or public-health surfaces remain possible when they strengthen personal utility and satisfy their own evidence, legal, safety, privacy, security, accessibility, conflict, and governance gates.

This decision is not a permanent prohibition on institutional partnerships. It is a prohibition on institutional capture of the canonical product boundary.

## Funding and sponsorship inheritance

Decision 0008 applies to every institutional integration relationship.

A provider, EHR vendor, payer, laboratory, pharmacy, device company, health information network, infrastructure company, sponsor, grantor, investor, or affiliate may not purchase or condition:

- Chronicle schema authority or preferred source truth;
- connector priority, default placement, ranking, certification, or exclusivity;
- product roadmap priority or guaranteed implementation;
- provider, clinical, safety, research, or scientific endorsement;
- private information, participant access, or permission placement;
- favorable interoperability, benchmark, security, usability, or outcome findings;
- suppression of limitations, mapping failures, incidents, corrections, or migration risk; or
- a requirement that personal utility depend on an enterprise contract.

Funded connectors and mappings remain ordinary governed work. The sponsor, funded implementer, and sponsor-funded evaluator cannot independently certify their own integration.

## Incentive alignment

The project’s incentives remain ordered as follows:

1. the person receives useful value from building and understanding the Chronicle;
2. providers and institutions may receive bounded value from better-authorized information exchange and collaboration;
3. contributors may receive scoped recognition for reviewed work;
4. funders may receive transparent attribution and outcome evidence; and
5. no party receives product authority merely because it supplies data, money, infrastructure, distribution, or market access.

The project must not reward a person for selecting a preferred provider, importing from a sponsor, granting broader institutional access, keeping an incompatible connector active, or accepting an enterprise relationship.

## Consequences

### Benefits

- protects the personal-value-first thesis from procurement and sponsor pressure;
- gives Sprint 14 a clear standards-at-the-edges architecture;
- permits useful clinical and institutional interoperability without accepting an EHR ontology as universal Chronicle truth;
- makes provider and connector funding conflicts explicit before relationships exist;
- preserves portability, forkability, and provider replacement; and
- creates a truthful explanation for contributors, funders, clinicians, policymakers, and the public.

### Costs and tradeoffs

- maintaining a separate canonical ontology and versioned mappings requires substantial engineering and governance work;
- source disagreement, terminology mapping, and partial conformance remain visible rather than being hidden by one normalized field;
- some enterprise buyers or sponsors may reject the lack of roadmap, placement, or schema control;
- direct-to-person acquisition and recurring utility must be proven rather than subsidized indefinitely by hypothetical enterprise demand; and
- institutional partnerships may develop more slowly because they must satisfy product-rights, conflict, portability, and evidence gates.

### Risks

- “consumer-first” could become anti-clinician rhetoric or an excuse to ignore high-quality clinical evidence;
- an internally designed Chronicle ontology could become another isolated schema if mappings, exports, and external review are weak;
- direct-to-person utility may fail to produce sufficient participation or data quality;
- provider neutrality may be nominal if one connector, sponsor, or vendor becomes practically irreplaceable; and
- standards evolution may outpace connector maintenance.

## Alternatives considered

### Make an EHR or health system the primary customer and canonical model

Rejected as the initial center of gravity. It would make enterprise workflow, procurement, billing, and local implementation constraints likely to dominate the person’s longitudinal product and could make personal utility dependent on institutional adoption.

### Avoid institutional healthcare and rely only on person-entered data

Rejected. Clinical records, laboratories, medications, claims, devices, and professional observations are important sources. Refusing interoperability would reduce utility, completeness, and trust.

### Adopt FHIR or US Core directly as the complete internal Chronicle schema

Rejected. FHIR and US Core provide essential exchange and implementation contracts. US Core explicitly defines a minimum floor, not a complete ontology for all health and lived experience across a lifetime. External resources and profiles should map through adapters while retaining provenance and version context.

### Build every provider-specific integration directly into the core domain

Rejected. Provider-specific behavior belongs behind versioned connector and mapping boundaries so it can be tested, replaced, disabled, or migrated without rewriting Chronicle authority.

### Defer the decision until the first enterprise offer

Rejected. Private negotiation, sponsor urgency, or implementation convenience would then define the product boundary before public rules exist.

## Validation and review required

Before the first production institutional connector or material provider relationship, the project must obtain appropriate review of:

- clinical-informatics and terminology mappings;
- source authority, provenance, conflict, correction, and deletion behavior;
- FHIR, US Core, USCDI, SMART, document, bulk-data, and other applicable implementation contracts;
- security, privacy, identity, authorization, receipts, and downstream obligations;
- accessibility and comprehension;
- provider, sponsor, grantor, procurement, and related-party conflicts;
- data-processing, information-blocking, contract, regulatory, and jurisdiction-specific duties;
- export, portability, replacement, migration, and teardown; and
- whether the connector returns measurable personal value.

## Revalidation triggers

Revalidate this decision:

- before Sprint 14 connector implementation begins;
- before the first material provider, EHR, payer, laboratory, pharmacy, health-information-network, or clinical-integration relationship;
- before accepting funding, credits, distribution, or services from a party whose product may be selected or integrated;
- before an enterprise contract becomes a material revenue source;
- before a provider-specific schema or workflow is proposed as Chronicle authority;
- before a connector becomes a critical dependency;
- after a material mapping, provenance, deletion, access, portability, or information-blocking failure;
- when standards or regulation materially change; and
- at every institutional phase-exit review.

## Migration, rollback, and replacement

Specific standards, profiles, terminology systems, mappings, connectors, provider contracts, and institutional surfaces may be added, replaced, suspended, or retired through versioned work.

If an institutional relationship begins to distort product authority, evidence, provider choice, personal utility, or public reporting, the project must be able to pause new dependency, preserve source and mapping history, disable the affected adapter, migrate or export records, revoke credentials and access, correct public claims, terminate incompatible benefits, and continue through a degraded or manual personal path.

## Freeze impact

This accepted decision clarifies the frozen consumer-first product thesis and provider-independent architecture. It does not change the player promise, prohibit future institutional collaboration, select a standard or provider, authorize clinical use, activate a connector, accept funding, or change Sprint 6 order.
