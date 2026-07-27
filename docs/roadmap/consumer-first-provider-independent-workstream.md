# Consumer-First and Institutional Interoperability Workstream

[Roadmap home](README.md) · [Decision 0010](../decisions/0010-consumer-first-provider-independent-boundary.md) · [Architecture](../architecture/consumer-first-provider-independent-boundary.md) · [AS-0012](../governance/assumption-AS-0012-consumer-first-continuity-value.md) · [Funding baseline](../economics/README.md)

- **Status:** PROPOSED CROSS-PHASE WORKSTREAM
- **Tracking issue:** [#41](https://github.com/finalboss-tom/calypsos-promise/issues/41)
- **Sequence effect:** does not renumber or delay Sprint 6
- **Runtime effect:** none; no provider, EHR, connector, clinical, research, or enterprise capability is authorized

## Purpose

This workstream carries the proposed consumer-first, provider-independent boundary through the existing sprint and institutional phase sequence.

It prevents a later connector, enterprise offer, provider relationship, sponsorship, or integration shortcut from redefining the product by accident. It also prevents “consumer-first” from becoming a reason to ignore clinical evidence, interoperability standards, or useful institutional collaboration.

## Phase 0 completion scope

The Phase 0 documentation slice is complete when the repository contains:

- a reviewable Decision 0010;
- a source-backed architecture and historical rationale;
- a falsifiable AS-0012 assumption record;
- explicit funding and sponsorship inheritance;
- sprint and phase handoffs;
- a public explanation that is consumer-first without being anti-provider; and
- no false claim that provider or connector runtime exists.

Acceptance of the doctrine does not complete:

- standards selection;
- FHIR, US Core, USCDI, SMART, document, bulk-data, terminology, or other implementation design;
- a connector SDK;
- provider contracting;
- clinical workflow;
- legal, security, privacy, accessibility, regulatory, or procurement review;
- enterprise pricing or revenue;
- production data exchange; or
- independent validation of the consumer-first thesis.

## Sprint inheritance

### Sprint 6 — Aster contracts and AI governance

Add or preserve:

- clinical, claims, device, and EHR content remains source-attributed input rather than automatic Chronicle truth;
- Aster may explain source, mapping, uncertainty, and conflict but cannot select a preferred institutional source for commercial reasons;
- an AI provider, model-credit sponsor, EHR vendor, clinical partner, or funded evaluator cannot determine source ranking, connector priority, benchmark conclusions, or provider defaults; and
- Aster cannot imply that standards conformance proves clinical completeness, safety, or institutional endorsement.

Sprint 6 remains next. This workstream does not create new Aster implementation scope beyond contract and governance inheritance.

### Sprint 7 — Forge MCP and agent safety

Add or preserve:

- public standards and synthetic connector fixtures may be searchable and testable;
- Forge tools cannot access private provider negotiations, contracts, credentials, production endpoints, or protected interoperability findings;
- generated mappings remain drafts requiring deterministic validation and human review; and
- sponsor-funded interoperability tools receive no broader tool authority or publication control.

### Sprint 8 — Public website foundation

Add:

- a plain-language “Why consumer-first” explanation within `/what-is-calypso`, `/how-it-works`, or a dedicated route;
- an explicit statement that providers and EHRs are important sources, destinations, and future partners rather than the canonical product owner;
- a distinction between standards support, planned connectors, active partnerships, and live production exchange;
- source-backed historical treatment of Google Health, HealthVault, Amalga, and Caradigm without declaring universal failure; and
- provider and connector sponsor recognition visually and semantically separated from recommendation, ranking, clinical endorsement, permission, and health guidance.

Acceptance:

- the explanation does not claim healthcare lacks standards;
- no provider, EHR, connector, clinical, research, or enterprise feature is represented as live;
- support or sponsorship cannot purchase placement in product, provider, connector, consent, safety, or clinical flows; and
- a visitor can understand the boundary without lore knowledge.

### Sprint 11 — First Lantern vertical slice

Add evidence hooks for:

- personal value without provider enrollment;
- clear source-class and confirmation distinctions;
- manual capture when no institutional source is connected; and
- no enterprise dependency in the complete private value loop.

### Sprint 13 — Chronicle recall and Memory Chamber

Add or preserve:

- recalled institutional statements cite their original source and mapping;
- a provider record, person-confirmed record, recollection, calculation, association, and inference remain distinguishable;
- conflict and uncertainty remain visible; and
- retrieval does not elevate a sponsor, provider, or newest source into automatic truth.

### Sprint 14 — Connector foundation

This is the primary implementation inheritance.

Extend deliverables with:

- a version-aware standards and implementation-guide registry;
- FHIR, US Core, USCDI, SMART, clinical-document, terminology, and other applicable mapping strategy selected through review rather than assumed universally;
- source capability and conformance discovery;
- versioned source-to-Chronicle and Chronicle-to-destination mappings;
- explicit mapping loss, ambiguity, conflict, and unsupported-field behavior;
- provider-specific and proprietary behavior isolated behind adapters;
- source payload and transformation preservation;
- connector funding, sponsor, vendor, related-party, and evaluator conflict records;
- provider-neutral prioritization criteria tied to affected-person value, reach, feasibility, risk, maintenance cost, and evidence;
- export, portability, replacement, migration, suspension, and teardown plans; and
- synthetic fixtures representing multiple standards versions, local variation, partial conformance, conflicting sources, and inaccessible endpoints.

Extend acceptance with:

- no external schema, implementation guide, vendor model, or sponsor becomes Chronicle authority;
- every normalized value can trace to source and mapping versions;
- unsupported or lossy mappings remain explicit;
- a provider-specific integration can be disabled or replaced without rewriting the core Chronicle contract;
- revocation stops future synchronization without falsifying prior source history;
- connector priority and acceptance are not purchased by funding or distribution;
- one enterprise contract is not required to complete the personal import, manual, export, correction, or deletion paths; and
- specialist review or an explicit pending holdpoint exists for material clinical-informatics claims.

### Sprint 15 — Athena’s Observatory

Add or preserve:

- source class and institutional provenance are visible in insights;
- source disagreement and mapping limitations affect confidence and display;
- a clinical source is not converted into a new diagnosis or causal claim by aggregation; and
- sponsor, provider, and connector interests cannot influence insight selection or wording.

### Sprint 17 — Clinical, safety, and accessibility governance

Add:

- clinical-informatics and interoperability review responsibilities;
- boundaries for provider-facing summaries, correction requests, and care collaboration;
- rules preventing standards conformance from substituting for clinical safety or usability review;
- institutional partner, EHR vendor, payer, laboratory, device, sponsor, and related-party conflict treatment; and
- patient and clinician comprehension review for source, uncertainty, omission, and purpose.

Acceptance:

- no provider, funder, vendor, or enterprise partner controls clinical conclusions, mapping approval, source conflict treatment, negative finding publication, or specialist sign-off; and
- direct personal use remains available without institutional enrollment.

### Sprint 18 — Beta evidence and release gate

Add evidence for AS-0012:

- time to first personal value without enterprise adoption;
- meaningful return and usefulness by source availability;
- import and mapping success, loss, conflict, and support burden;
- provenance and uncertainty comprehension;
- correction and reconciliation success;
- provider usefulness of person-authorized summaries where tested;
- connector maintenance and replacement cost;
- provider, sponsor, and revenue concentration;
- whether funded integrations receive disproportionate roadmap attention; and
- differential access and utility for people with fragmented or unstable care.

Acceptance:

- consumer-first is not represented as validated merely because the architecture is coherent;
- an enterprise pilot does not prove general provider interoperability;
- a standards-conformant exchange does not prove semantic completeness or clinical safety; and
- evidence can narrow or weaken the market and product sequencing without weakening player rights.

### Sprint 19 — Open-source public launch

Add:

- public explanation of the provider-independent boundary;
- published connector capability and limitation status;
- standards, mapping, compatibility, and provider-dependency disclosures appropriate for public release;
- active institutional relationship and funding transparency; and
- clear challenge and correction routes for interoperability claims.

Acceptance:

- no sponsor or partner is presented as the preferred health provider, EHR, connector, clinical authority, or product owner merely because it supported the project; and
- all active material integration relationships can be traced through purpose, funding, conflict, implementation, evidence, limitations, replacement, and public outcome records.

## Institutional phase inheritance

### Phase 0 — Constitutional and open-source foundations

Add or preserve these gates:

- the consumer-first, provider-independent boundary is explicit;
- the project distinguishes exchange standards from canonical Chronicle meaning;
- provider, EHR, payer, laboratory, device, and enterprise funding cannot purchase schema authority, roadmap control, access, placement, findings, or exclusivity;
- the future connector and institutional-partnership workstreams have owners, evidence requirements, specialist holdpoints, and rollback conditions; and
- no partnership or standards claim is represented as operational without evidence.

### Phase 1 — Useful private product

Add or preserve:

- the complete personal-value loop works without enterprise enrollment;
- manual, import, export, correction, and deletion paths remain useful when a provider connector is unavailable;
- any material provider or infrastructure relationship is public, conflict-reviewed, replaceable, and unable to weaken the complete personal product; and
- AS-0012 receives its first evidence review rather than automatic confirmation.

### Phase 2 — Evidence and trust

Add or preserve:

- production mappings and connector behavior are versioned and auditable;
- institutional source, access, correction, deletion, and downstream obligations are inspectable;
- provider and sponsor conflicts are publicly attributable through reviewed derivatives;
- clinical-informatics, privacy, security, accessibility, legal, and regulatory review applies in proportion to consequence;
- active institutional relationships reconcile purpose, restrictions, funding, work, findings, incidents, and exit; and
- provider-facing or provider-integrated surfaces are independently evaluated where risk warrants it.

### Phase 3 — Community stewardship

Add or preserve:

- multiple maintainers can operate and review critical connectors;
- at least one major connector, provider, or implementation-guide migration has been exercised;
- the institution can replace a material EHR, exchange, integration, cloud, or AI dependency without abandoning records or rights;
- provider and enterprise strategy does not remain founder-only knowledge; and
- affected people and qualified specialists participate in material interoperability governance.

### Phase 4 — Research Commons and public-good infrastructure

Add or preserve:

- research data models remain purpose-specific derivatives rather than Chronicle authority;
- research institutions receive no broader access because they also provide clinical data, funding, or infrastructure;
- study and participant result return can interoperate with the Chronicle through separate authority; and
- research funding cannot purchase connector or source priority.

### Phase 5 — Sustainable economics and shared value

Add:

- hosted, enterprise, implementation, support, and interoperability economics remain compatible with the meaningfully free personal product;
- B2B or B2B2C revenue cannot make basic personal utility contingent on an institutional contract;
- provider placement, connector ranking, referral, affiliate, and procurement incentives require separate decisions and public conflict treatment;
- revenue concentration and critical integration dependency are assessed together; and
- enterprise revenue cannot purchase constitutional, product, clinical, research, or governance authority.

### Phases 6–8

Preserve:

- capital and enterprise customers cannot capture constitutional governance;
- institutional partners remain one affected constituency rather than the universal authority;
- provider, connector, mapping, archive, and successor-institution migrations remain possible; and
- the hundred-year institution can preserve personal records and rights when standards, care systems, business models, and counterparties change.

## Future Institutional Workstream — Clinical and Enterprise Interoperability Partnerships

### Entry condition

Begin before a material institutional integration, provider-facing workflow, enterprise contract, or B2B/B2B2C operating model becomes necessary—not merely because a provider expresses interest.

Minimum prerequisites:

- evidence that the private personal product creates meaningful value;
- accepted connector and mapping architecture;
- House of Keys and security implementation appropriate to the proposed flow;
- clinical-informatics, privacy, security, accessibility, legal, regulatory, and procurement review;
- Decision 0008 funding and conflict controls;
- Decision 0010 acceptance and revalidation;
- named operational and specialist authority;
- public capability and limitation status; and
- provider replacement and exit design.

### Expected deliverables

- institutional relationship taxonomy and authority model;
- provider, EHR, payer, laboratory, pharmacy, device, exchange, employer, public-health, and research boundaries;
- clinical and administrative use-case selection;
- person-authorized provider summaries and collaboration contracts;
- inbound and outbound data, correction, result-return, and receipt behavior;
- implementation-guide, terminology, mapping, and conformance governance;
- procurement, business-associate, data-processing, information-blocking, and contract review where applicable;
- provider and sponsor conflict, recusal, independent evaluation, and publication rules;
- service levels, support, incident, deletion, retention, and downstream obligations;
- pricing, subsidy, hosted-service, and meaningfully free boundaries;
- enterprise isolation, tenant, operator, and audit controls;
- portability, replacement, migration, termination, and teardown;
- pilot evidence and adverse-outcome review; and
- public institutional relationship records linked to work and outcomes.

### Acceptance

- the person’s grant, purpose, scope, and rights remain authoritative for the proposed flow;
- no institutional contract makes personal-core use contingent on the partner;
- no partner receives Chronicle schema authority, preferred source truth, provider ranking, health placement, or roadmap control;
- operational and clinical responsibility are explicit rather than implied by data exchange;
- negative findings and incidents remain publishable through reviewed processes;
- the partner, funded implementer, and sponsor-funded evaluator cannot independently certify the relationship;
- export, migration, and termination are operationally testable; and
- the pilot demonstrates measurable personal or public value rather than integration output alone.

## Dependency on funding operations

A real institutional partnership may require the [Future Funding Operations and Financial Controls workstream](sprints.md#future-institutional-workstream--funding-operations-and-financial-controls) before money, in-kind support, procurement, compensation, contracting, custody, expenditure, or revenue becomes operational.

The existence of an enterprise opportunity does not satisfy entity, legal, accounting, tax, privacy, conflict, payment, contract-signature, insurance, treasury, or financial-control gates.

## Holdpoints

Do not proceed to production when:

- the partner requires prohibited access, influence, exclusivity, placement, or publication control;
- schema or mapping authority is ambiguous;
- personal utility depends on enrollment or payment by the institution;
- clinical or operational responsibility is falsely implied;
- data, identity, permission, correction, receipt, deletion, or downstream boundaries are unresolved;
- portability or exit is not credible;
- the relationship creates unbounded concentration or critical dependency;
- independent review is required but unavailable; or
- capability status cannot be stated truthfully.

## Completion rule

This workstream succeeds when institutional interoperability can increase personal and public value without converting Calypso’s Promise into a provider-owned record, procurement-driven product, sponsor-ranked marketplace, or enterprise dependency.

It remains subject to challenge, evidence, narrowing, rollback, and replacement.