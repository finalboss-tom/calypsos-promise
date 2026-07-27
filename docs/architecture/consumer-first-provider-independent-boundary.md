# Consumer-First and Provider-Independent Architecture

[Architecture home](README.md) · [Decision 0010](../decisions/0010-consumer-first-provider-independent-boundary.md) · [Living Chronicle](README.md#living-chronicle-architecture) · [Funding baseline](../economics/README.md) · [Roadmap workstream](../roadmap/consumer-first-provider-independent-workstream.md)

- **Status:** PROPOSED BASELINE
- **Tracking issue:** [#41](https://github.com/finalboss-tom/calypsos-promise/issues/41)
- **Implementation status:** architecture and evidence framing only; no production provider, EHR, connector, clinical, research, or enterprise runtime

## Purpose

This document explains why Calypso’s Promise is centered on the person rather than an institution while preserving a constructive path to clinical and enterprise interoperability.

The position is not that healthcare lacks standards, that providers oppose interoperability, or that institutional data has little value. The position is that no provider, payer, device, application, standard, or encounter follows a person through every stage of life. The person is the only durable continuity layer across organizations, technologies, geography, insurance, and time.

The Living Chronicle therefore serves as a provider-independent longitudinal account under the person’s control. Institutional systems connect through bounded adapters.

## Strategic statement

> The institution is an important participant in a person’s health. It is not the owner of the person’s complete longitudinal product experience.

Calypso’s Promise begins by proving that a person can receive recurring value from building, understanding, correcting, and using a Chronicle. Provider, payer, research, public-health, and enterprise value may be added later through separate authority and evidence.

This ordering protects the project against two common distortions:

- **enterprise capture** — procurement, billing, local workflow, integration contracts, or sponsor needs become the product definition; and
- **consumer isolation** — the product ignores valuable clinical records, standards, professional context, and care collaboration.

The intended system does neither.

## Standards exist; canonical completeness does not

Healthcare interoperability has meaningful standards and implementation programs. FHIR defines exchange resources and conformance mechanisms. US Core constrains a minimum U.S. implementation floor. USCDI defines standardized data classes and elements. Clinical documents, claims formats, laboratory and medication terminologies, imaging standards, device APIs, public-health guides, research models, and specialty profiles cover additional purposes.

That progress does not produce one universally implemented, semantically complete model of a person’s health and lived experience.

The architecture must account for:

- multiple FHIR versions and implementation guides;
- profiles, extensions, local fields, optional elements, and different conformance claims;
- terminology versions, local codes, translations, and incomplete bindings;
- documents and payloads that are not reducible to structured exchange resources;
- varying source completeness, correction, deletion, and provenance behavior;
- claims, clinical, device, research, and person-generated records that express different kinds of evidence;
- local workflows that affect when and why data is recorded; and
- standards that evolve as clinical, policy, and implementation needs change.

The correct boundary is therefore **standards at the edges, provider-independent meaning at the core**.

## Why the person is the continuity layer

A clinical system ordinarily records a bounded set of encounters, orders, diagnoses, procedures, measurements, claims, communications, or professional observations. Those records can be highly authoritative within their stated context.

A person’s longitudinal account may also include:

- symptoms and changes between encounters;
- goals, preferences, recollections, and uncertainty;
- sleep, activity, nutrition, environment, and routines;
- device and home measurements;
- adherence and reasons for non-adherence;
- responses to interventions over time;
- records from multiple countries, providers, insurers, pharmacies, laboratories, and devices;
- corrections and conflicts across sources; and
- questions the person is trying to answer.

No single provider has a natural operational mandate to preserve and explain that complete sequence indefinitely. The person has a direct reason to make it coherent when doing so returns understandable value.

This is a hypothesis to test, not a declaration that person-entered records are always complete or accurate. The architecture preserves source class, confirmation, provenance, uncertainty, and conflict so personal continuity does not become false equivalence between evidence types.

## Incentive structure

### Institutional incentives

Providers and health systems can benefit from safer coordination, fewer duplicate procedures, better histories, more efficient exchange, and improved outcomes. They also face concentrated costs and risks involving implementation, workflow change, procurement, liability, training, integration maintenance, patient matching, privacy, and vendor dependence.

A shared schema can require one organization to change local operations while much of the benefit accrues to patients, future providers, research, public health, or the wider system. That creates a coordination problem even when the public benefit is real.

### Person incentives

A person can benefit directly from:

- remembering and explaining what happened;
- preparing for care;
- seeing trends and changes;
- preserving corrections and uncertainty;
- avoiding repeated reconstruction of history;
- asking bounded personal questions;
- exporting or sharing selected information; and
- deciding whether later collective use is worthwhile.

The intended loop is:

> Useful participation improves the Chronicle. A better Chronicle returns more personal understanding. Personal value creates a reason to continue voluntarily.

If that loop does not work, the project must improve or narrow the product. It may not compensate for failure by coercing disclosure, selling access, or making enterprise adoption the prerequisite for basic value.

## Historical lessons

### Google Health

Google Health was a consumer personal health record. Google discontinued it after limited use among some groups did not become widespread participation in daily health routines.

The relevant lesson is not that a person-controlled record is impossible. It is that aggregation and storage alone are insufficient. A durable product must provide recurring relevance, trust, understandable utility, low-friction capture, portability, and reasons to return.

Calypso’s Promise addresses that risk through a narrative and direct-mode product, brief participation, personal insight, provenance, correction, quests, and non-punitive return. Whether that design succeeds remains unproven.

### Microsoft HealthVault

HealthVault was also a consumer personal health record. Research at the time described critical-mass, usefulness, trust, and adoption challenges. Its history is relevant to consumer engagement and ecosystem design, not proof that Microsoft’s enterprise strategy universally failed.

### Amalga and Caradigm

Microsoft Amalga was an enterprise health intelligence platform later contributed to the GE–Microsoft Caradigm joint venture. Caradigm explicitly sought to integrate data across care-delivery silos through an open, interoperable platform.

That history demonstrates the legitimate enterprise need and the complexity of integrating many institutional systems. It supports modular adapters, transparent mappings, provider replacement, and caution about making enterprise integration the only route to value. It does not justify dismissing institutional partnership.

## Canonical model and adapter rules

### Source preservation

Every imported artifact should retain, as applicable:

- source organization and system;
- source record and resource identity;
- format, standard, profile, implementation guide, and version;
- terminology and mapping versions;
- creation, assertion, effective, encounter, import, and transformation timing;
- author, performer, recorder, custodian, and confirmer roles;
- raw or faithful source representation;
- exact transformation and normalization history;
- correction, retraction, supersession, and deletion evidence; and
- known omissions or retrieval limits.

### Semantic separation

The system must distinguish:

- a clinician’s assertion from a person’s recollection;
- a billed claim from a clinical conclusion;
- an ordered medication from a medication taken;
- a laboratory result from an interpretation;
- a device observation from a person-confirmed record;
- a source-system deletion from verified deletion of every downstream copy;
- a mapped value from the original code and text; and
- a descriptive association from diagnosis or causality.

Normalization may improve usability. It may not erase those distinctions.

### Mapping lifecycle

A mapping is a versioned, reviewable derivative rather than timeless truth. It should record:

- source and target versions;
- exact mapping rule;
- confidence and known loss;
- terminology and unit transformations;
- one-to-one, one-to-many, many-to-one, or unmapped behavior;
- affected records;
- review and validation evidence;
- replacement or supersession; and
- rollback or forward-migration behavior.

### Conflict behavior

When sources disagree, the Chronicle may preserve multiple assertions and a preferred presentation. It must not silently rewrite history to match the newest provider, largest institution, sponsoring organization, or most convenient integration.

### Export behavior

FHIR, US Core, clinical documents, CSV, JSON, PDF, research models, and other formats may be useful exports. An export is a purpose-specific representation with declared scope and limitations. It does not replace the canonical Chronicle or imply that every Chronicle element fits without loss.

## Institutional integration layers

Future work should separate at least four layers:

1. **Personal import and export** — the person authorizes data movement for their Chronicle.
2. **Care collaboration** — the person authorizes a provider or caregiver to view or receive bounded information.
3. **Institutional workflow** — a provider organization integrates selected capabilities into operations under separate contracts, safety review, and authority.
4. **Research or public benefit** — separately governed access, analysis, recruitment, or result return under House of Keys and research safeguards.

Success at one layer does not authorize another.

## Funding and partnership boundary

An institutional relationship is simultaneously an architecture, economic, conflict, and governance relationship when it can influence provider selection, schema design, connector priority, access, distribution, or roadmap.

A funded connector must publish a reviewed institutional record covering:

- source and relationship class;
- requested and approved benefits;
- product need and alternatives;
- standards, profiles, versions, and proprietary dependencies;
- data and metadata processed;
- personal value and affected groups;
- conflicts, recusals, and evaluator independence;
- mapping quality, known gaps, and negative findings;
- portability, replacement, migration, and exit;
- concentration and critical-function status;
- linked work and validation;
- actual outcome rather than output alone; and
- correction, suspension, termination, and residual obligations.

Recognition must remain separate from provider recommendation, health guidance, permission flows, connector ranking, or clinical endorsement.

## Allowed future institutional value

Subject to later gates, institutional surfaces may include:

- standards-based imports and exports;
- provider-readable summaries selected by the person;
- visit-preparation and reconciliation tools;
- bounded care-team collaboration;
- referrals and result return;
- correction requests and source reconciliation;
- clinical-trial or study matching under separate authority;
- public-health reporting where lawful and authorized;
- implementation and connector tooling; and
- hosted or supported deployments that preserve portability and the complete personal rights floor.

## Explicit non-goals for the initial product

The initial product is not:

- an EHR replacement;
- a clinical documentation or billing system;
- a hospital data warehouse;
- a universal health information exchange;
- an employer wellness surveillance system;
- a payer utilization-management platform;
- a clinical decision-support product;
- a default research recruitment funnel; or
- an enterprise procurement dependency for personal participation.

These boundaries may be reconsidered only through explicit decisions. A later capability cannot inherit authority merely because the project already exchanges data with the same institution.

## Failure modes

Review for:

- internal ontology isolation and weak external mappings;
- overreliance on person-entered data without adequate source quality;
- anti-provider rhetoric that damages legitimate collaboration;
- provider records treated as automatically complete or infallible;
- proprietary implementation logic entering core packages;
- connector priority driven by sponsorship rather than personal value;
- one EHR, network, cloud, or integration vendor becoming irreplaceable;
- enterprise revenue displacing the meaningfully free product;
- selective publication of interoperability findings;
- hidden mapping loss or false normalization confidence;
- institutional access broadening beyond the person’s grant; and
- standards compliance represented as evidence of clinical safety, completeness, or semantic equivalence.

## Evidence plan

The project should eventually measure:

- whether people can create useful Chronicles without enterprise enrollment;
- import success and time-to-value across sources;
- mapping completeness, loss, and disagreement rates;
- source and provenance comprehension;
- correction and reconciliation success;
- export fidelity and downstream usability;
- provider and patient comprehension of summaries;
- connector maintenance and migration cost;
- institutional partnership effects on roadmap and provider neutrality;
- whether funded integrations receive disproportionate attention;
- voluntary return and perceived personal utility; and
- whether a provider can be replaced without losing records, rights, or product continuity.

The linked [AS-0012 assumption record](../governance/assumption-AS-0012-consumer-first-continuity-value.md) defines weakening and invalidation conditions.

## External references

- [HL7 FHIR overview](https://hl7.org/fhir/overview.html)
- [US Core 9.0.0](https://hl7.org/fhir/us/core/STU9/)
- [ONC Interoperability Standards Platform](https://isp.healthit.gov/)
- [GAO-15-817 — Nonfederal interoperability efforts](https://www.gao.gov/products/gao-15-817)
- [GAO-17-184 — Post-acute interoperability](https://www.gao.gov/products/gao-17-184)
- [ONC — Getting Real about Information Blocking and APIs](https://healthit.gov/blog/interoperability/getting-real-about-information-blocking-and-apis/)
- [Google — An update on Google Health](https://googleblog.blogspot.com/2011/06/update-on-google-health-and-google.html)
- [Spil and Klein — Personal Health Records Success](https://doi.org/10.1109/HICSS.2014.353)
- [Microsoft and GE — Caradigm announcement](https://news.microsoft.com/source/2012/02/13/ge-microsoft-share-plans-for-new-joint-venture-caradigm/)

## Boundary rule

Institutional interoperability is a capability of Calypso’s Promise. It is not the source of the Promise.

The person remains the product’s continuity layer. External systems remain attributable sources, destinations, and partners connected through inspectable, versioned, purpose-specific, replaceable boundaries.
