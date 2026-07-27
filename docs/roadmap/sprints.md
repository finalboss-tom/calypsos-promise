# Design-to-Build Sprint Plan — BASELINE

## Cadence

Default cadence is two weeks per sprint. Sprint 0 is one week. Each sprint ends with:

- Reviewable artifacts in the repository
- Explicit acceptance criteria
- A decision log for unresolved items
- Tests or evidence appropriate to the work
- A freeze, baseline, proposed, deferred, or retired status for each output

No sprint closes with material decisions living only in chat.

## Sprint 0 — Warehouse and governance

**Goal:** Establish the repository as the source of truth.

Deliverables:

- Frozen-foundations register
- Product Constitution
- World and Lore Canon
- Architecture Foundation
- Gameplay Foundation
- Website information architecture
- Status vocabulary and change-control process
- Initial README
- Decision-record template
- Source and assumption register

Acceptance:

- Every frozen claim has an owner and repository path
- Historical language conflicting with the constitution is retired
- Material changes require a decision record

## Sprint 1 — Repository and open-source operating model

**Goal:** Make the project safe and understandable for contributors.

Deliverables:

- Monorepo scaffold
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- Governance baseline
- DCO versus CLA decision
- License decision record
- Trademark and official-deployment policy proposal
- Branch, review, release, and dependency policies
- Synthetic-data-only contributor rule
- CI skeleton

Acceptance:

- A new contributor can run the empty system locally
- No production secret or health-data dependency exists
- Pull requests execute formatting, type, unit, and policy checks

## Sprint 2 — Controlled vocabulary and content schemas

**Goal:** Ensure product, lore, technical, and legal language remain synchronized.

Deliverables:

- Approved vocabulary table
- Retired terminology list
- Zone, character, scene, dialogue, quest, lesson, and notification schemas
- Canon validator
- Content versioning and review-state model
- Story dependency and spoiler rules

Acceptance:

- Lore content can be validated without running the game
- Public, in-world, technical, and governance terms map explicitly
- AI cannot introduce unapproved canon facts through content schemas

## Sprint 3 — Canonical data model v1

**Goal:** Define the authoritative Living Chronicle.

Deliverables:

- Account and pseudonymous Chronicle identity
- Observation and interval models
- Variables, categories, units, and normalization
- Raw-source and provenance chains
- Approximate time representation
- Correction, supersession, and conflict handling
- Attachments and document versions
- Export and deletion states
- Story, quest, consent, receipt, and Aster-memory entities
- Database migrations and synthetic fixtures

Acceptance:

- Time zone, approximate-time, duplicate, conflict, correction, and deletion scenarios are tested
- Every derived record links to its sources
- Synthetic fixtures cover diverse people and accessibility contexts

## Sprint 4 — House of Keys consent architecture

**Goal:** Make purpose-specific authority a first-class domain.

Deliverables:

- Purpose taxonomy
- Data-category taxonomy
- Versioned consent grants
- Recipient and duration model
- Revocation behavior
- Access receipt format
- Permission explanation templates
- Consent comprehension prototype
- Policy evaluation library

Acceptance:

- No action can depend on blanket consent
- Active grants and receipts are inspectable
- Revocation tests verify future access is denied
- Essential use remains independent from research or commerce

## Sprint 5 — Threat model and security baseline

**Goal:** Define defenses before connecting real health data or agents.

Deliverables:

- Asset and trust-boundary map
- Threat model covering accounts, connectors, uploads, AI, MCP, insiders, supply chain, and research actors
- Encryption and key-management baseline
- Secret-management policy
- Environment-isolation design
- Account-recovery design
- Audit retention and incident-response plans
- Deletion-verification procedure
- Tabletop exercises

Acceptance:

- Cross-user leakage and compromised-agent scenarios have explicit controls
- No private origin, database, or administrative service requires public exposure
- Security disclosure workflow is published

## Phase 0 Institutional Workstream — Funding and Sponsorship Baseline

**Goal:** Establish what mission-aligned support may fund and what money or in-kind value can never purchase before any donation, sponsorship, grant, affiliate, provider-credit, compensation, investment, research-funding, treasury, payment, or accounting surface activates.

Decision and evidence:

- Decision 0008 — Funding and Sponsorship Baseline
- Canonical economics policies and public register contracts
- Empty real funding and opportunity registers
- Explicitly fictional funding records
- Sponsor-capture, dependency, concentration, and source-loss design table exercises
- Completion record distinguishing accepted doctrine from operational implementation

Acceptance:

- A decision record accepts the funding doctrine and identifies unresolved legal, accounting, tax, entity, custody, and payment-rail questions
- Funding cannot purchase data, research access, product authority, health influence, roadmap control, governance power, favorable findings, safety exceptions, or game progression
- Donations, grants, sponsorships, public-good underwriting, in-kind support, affiliate arrangements, investments, compensation, and research funding are distinctly classified
- Permitted and prohibited sponsor benefits are inspectable
- Organizational, restricted, related-party, vendor-linked, and material in-kind relationships require public institutional records
- Raw donor, contract, payment, tax, negotiation, banking, compensation, and accounting source information remains outside the public repository
- Funded work remains subject to ordinary issue, pull-request, review, testing, acceptance, correction, and outcome rules
- Sponsors, funded implementers, and sponsor-funded evaluators cannot independently certify their own work
- Infrastructure sponsorships require provider-neutral evaluation, replacement, migration, and exit plans
- Concentration and critical-dependency triggers are defined without pretending they prove safety or misconduct
- A relationship can be declined, paused, suspended, terminated, corrected, refunded, expired, or superseded
- Funding records link money or in-kind value to work, delivery, expenditure where applicable, outcomes, variance, unspent obligations, and residual risk
- Synthetic scenarios exercise capture, data access, provider influence, exclusivity, related parties, concentration, dependency, sponsor exit, source loss, and failed public benefit
- The public website cannot activate a donation or sponsorship transaction surface before this baseline and a legitimate recipient, custody, accounting, tax, privacy, refund, and payment route are accepted
- No charitable, tax-deductible, nonprofit, public-benefit, treasury, payment, accounting, or financial-control status is claimed without evidence
- The completion record distinguishes policy acceptance from actual fundraising, treasury, accounting, payment, expenditure-reporting, or operational implementation

Handoff:

- This is a non-numbered institutional workstream between Sprints 5 and 6; it does not renumber or replace the design-to-build sequence
- Sprint 6 inherits sponsor and provider-conflict boundaries before AI-provider governance matures
- Sprint 7 inherits the same public-data, synthetic-only, tool-risk, and conflict boundaries for sponsor-funded developer tooling
- Sprint 8 implements public support and funding transparency from canonical economics records rather than inventing sponsor logic
- Sprints 17 and 18 carry specialist-independence and operational-evidence gates when relevant
- Sprint 19 makes funding transparency launch-grade rather than designing it for the first time
- Phase 2 implements actual financial controls and independently reviewable records; Phase 5 matures sustainable economics, treasury, reserves, compensation, and participatory budgeting

## Phase 0 Institutional Workstream — Consumer-First and Provider-Independent Boundary

**Goal:** Make institutional interoperability additive to personal utility rather than allowing a provider, EHR, payer, laboratory, device, exchange, sponsor, enterprise contract, or external schema to become the canonical product center by default.

Decision and evidence:

- Proposed Decision 0010 — Consumer-First, Provider-Independent Product Boundary
- Source-backed architecture and historical rationale
- AS-0012 — Consumer-First Continuity Can Create Durable Personal Value
- Repository reconciliation against mission, vision, incentives, architecture, governance, funding, website, sprints, and institutional phases
- Cross-phase implementation and future partnership workstream
- Public website explanation baseline

Acceptance:

- Healthcare standards are described as substantial and evolving rather than absent
- The Living Chronicle remains the provider-independent longitudinal product model
- External systems remain source-attributed, versioned, mapped, purpose-specific, and replaceable
- No provider, EHR, implementation guide, funder, sponsor, enterprise buyer, or integration contract purchases Chronicle schema authority, source rank, connector priority, provider placement, roadmap control, private access, favorable findings, or an exception to the Promise
- Personal-core value does not require enterprise enrollment
- Future institutional collaboration remains possible through separate product, clinical, interoperability, privacy, security, accessibility, legal, procurement, economic, and governance gates
- Historical Google Health, HealthVault, Amalga, and Caradigm claims remain within their evidence
- The doctrine remains falsifiable through AS-0012 and does not represent a provider runtime or validated market outcome

Handoff:

- This is a non-numbered institutional workstream; Sprint 6 remains next
- Sprint 6 inherits institutional-source attribution, AI-provider neutrality, and sponsored-evaluation boundaries
- Sprint 8 implements the public consumer-first explanation without representing connectors or partnerships as live
- Sprint 11 proves the complete personal-value loop without enterprise enrollment
- Sprint 13 preserves source class, mapping, conflict, and uncertainty in recall
- Sprint 14 becomes the primary versioned standards, connector, mapping, replacement, and provider-neutrality implementation point
- Sprint 17 adds clinical-informatics and institutional-partner review boundaries
- Sprint 18 tests AS-0012 and measures funded-integration distortion, connector cost, and personal value
- Sprint 19 publishes connector and institutional-relationship status, limitations, conflicts, and corrections
- A separate future Clinical and Enterprise Interoperability Partnerships workstream begins before material institutional operation

The detailed inheritance is maintained in [`consumer-first-provider-independent-workstream.md`](consumer-first-provider-independent-workstream.md).

## Sprint 6 — Aster contracts and AI governance

**Goal:** Convert Aster from a concept into enforceable interfaces.

Deliverables:

- Scribe contract
- Librarian contract
- Wayfinder contract
- Interpreter contract
- Storykeeper contract
- Intent taxonomy
- Structured extraction schemas
- Confidence and clarification rules
- AI memory classes and retention rules
- Provider-egress policy
- Provider-neutral evaluation and funding-conflict rules for model credits, sponsored benchmarks, affiliate incentives, egress partners, infrastructure support, related parties, and institutional data sources
- Source-class, implementation-guide, mapping, provenance, and uncertainty explanation rules for clinical, claims, device, laboratory, pharmacy, EHR, and other imported information
- Prompt-injection isolation rules
- Non-AI fallback behavior

Acceptance:

- Aster cannot write directly to canonical records
- Every recalled health statement can reference authoritative records
- Material memories are visible, editable, exportable, and deletable
- AI unavailability does not block core capture or permissions
- Funding, credits, sponsorship, affiliate terms, related-party interests, provider relationships, or enterprise distribution cannot determine source authority, provider defaults, connector ranking, egress policy, benchmark conclusions, or publication
- Aster cannot imply that standards conformance proves clinical completeness, semantic equivalence, safety, or endorsement
- Sprint 6 defines provider-governance requirements but does not select or endorse a production AI provider, EHR, connector, or clinical partner

## Sprint 7 — Forge MCP and agent safety

**Goal:** Provide useful agent tooling without private health-data risk.

Deliverables:

- MCP tool registry and risk classes
- Forge MCP using local `stdio`
- Lore search and validation tools
- Quest-schema tools
- Architecture and decision search
- Synthetic-data generation
- Public standards, mapping, and synthetic connector-fixture search and validation tools where appropriate
- Tool scopes, rate limits, receipts, and error formats
- Sponsor-funded tool, service-credit, connector, mapping, and infrastructure conflict review
- Agent security test suite

Acceptance:

- Forge MCP operates entirely on public documentation and synthetic data
- Retrieved content cannot grant itself tool authority
- Tool contracts are versioned and testable
- Generated mappings remain drafts requiring deterministic validation and human review
- Sponsor-funded tools remain subject to the same public-data, synthetic-only, tool-risk, provider-neutrality, review, and publication boundaries as unfunded tools
- Forge tools cannot access private provider negotiations, contracts, credentials, production endpoints, proprietary mappings, or protected interoperability findings

## Sprint 8 — Public website foundation

**Goal:** Publish an honest, accessible gateway to Ogygia.

Deliverables:

- Next.js site shell
- Design tokens
- Narrative and direct navigation modes
- Homepage
- The Promise
- Seven Laws
- How It Works
- Plain-language consumer-first and provider-independent explanation
- Aster and AI
- Trust Center shell
- Open Forge page
- Roadmap and capability-status components
- Support and funding-transparency surface generated from canonical economics records
- Public views of who supported the project, what they funded, approved benefits, prohibited or absent benefits, relationship status, delivery, outcomes, conflicts, concentration, corrections, and challenge routes
- Clear distinction between standards support, planned connectors, active institutional relationships, and production exchange
- Disabled transaction handoff until legitimate recipient, custody, accounting, tax, privacy, refund, and payment-rail gates are accepted

Acceptance:

- Live, experimental, planned, and long-horizon claims are visually distinct
- All essential information is accessible without animation or story traversal
- Core pages pass accessibility and performance baselines
- Funding displays derive from canonical public economics records rather than an independent website sponsor model
- The consumer-first explanation does not claim healthcare lacks standards, disparage providers, overstate Google or Microsoft history, or represent a provider, EHR, connector, clinical, or enterprise capability as live
- Sponsor and partner recognition remains separate from provider recommendation, connector ranking, clinical endorsement, permission, safety, and health guidance
- No donation, sponsorship, checkout, payment, charitable, tax-deductible, nonprofit, or public-benefit transaction claim activates without accepted operational evidence

## Sprint 9 — Public synthetic prologue

**Goal:** Let anyone understand the product through play before creating an account.

Deliverables:

- Opening cinematic or illustrated sequence
- Lantern Shore scene
- Aster introduction
- Synthetic Chronicle
- Synthetic voice/text capture draft
- Player confirmation
- First Lantern completion
- House of Keys receipt demonstration
- Exit and account-conversion choices

Acceptance:

- No real health data or account is required
- Temporary data behavior is disclosed
- A visitor completes the prologue in under ten minutes
- Refusal and exit paths are fully functional

## Sprint 10 — Universal game shell

**Goal:** Establish the browser, iOS, and Android playable application.

Deliverables:

- Expo application
- Island map navigation
- Hearth
- Zone and scene renderer
- Dialogue choices
- Quest cards
- Wayfinder Orb
- Accessibility settings
- Offline state strategy
- Authentication boundary after the prologue

Acceptance:

- One content package renders consistently on web, iOS, and Android
- Keyboard, screen-reader, reduced-motion, and low-bandwidth paths exist
- No gameplay rule depends on client-side trust

## Sprint 11 — First Lantern vertical slice

**Goal:** Prove the complete private value loop.

Deliverables:

- Create private Chronicle
- Grant one core-operation permission
- Enter one observation through text or voice
- Review and correct Aster’s draft
- Store an authoritative record with provenance
- Complete one quest from domain evidence
- Restore one landmark
- Inspect one access receipt
- Export and delete the account
- Exercise a complete manual path without a provider, EHR, payer, employer, researcher, or enterprise enrollment

Acceptance:

- Every transition is tested end to end
- Export contains the stored record, provenance, permission, receipt, and quest result
- Deletion behavior is verifiable
- No model call is required to complete a manual fallback path
- The complete private value loop does not require an institutional connector or enterprise relationship

## Sprint 12 — Fourteen Lanterns content and routing

**Goal:** Implement the complete first two-week experience.

Deliverables:

- Fourteen scenes and quests
- Route-composition rules
- Goal selection and adaptation
- Deferral, replacement, and refusal
- Broken Lantern return flow
- Zone unlocks
- Calypso clue progression
- Content-review and rollback controls

Acceptance:

- Every day returns immediate player value
- No day exists solely to extract information
- Missed days do not produce punishment or shame
- Story state remains deterministic

## Sprint 13 — Chronicle recall and Memory Chamber

**Goal:** Make the accumulated record understandable and inspectable.

Deliverables:

- Structured timeline queries
- Semantic retrieval for notes and opted-in conversations
- Record-linked recall responses
- Source-class, provider, standards, implementation-guide, mapping, and provenance display for imported records
- Memory Chamber
- Preference, goal, story, and session-memory separation
- Correction and removal flows
- Contradiction and uncertainty handling

Acceptance:

- Recall benchmark measures source accuracy and unsupported statements
- Structured values never depend on vector retrieval
- All material retained memory is visible to the player
- A provider record, claim, device observation, person-confirmed record, recollection, calculation, association, and inference remain distinguishable
- Recall does not elevate a sponsor, provider, newest source, or mapped value into automatic Chronicle truth

## Sprint 14 — Connector foundation

**Goal:** Add external data without sacrificing provenance, personal control, or provider independence.

Deliverables:

- Connector SDK
- Authorization, synchronization, cursor, revocation, and deletion contracts
- Version-aware standards, implementation-guide, terminology, and source-capability registry
- Versioned source-to-Chronicle and Chronicle-to-destination mappings
- Mapping loss, ambiguity, unsupported-field, conflict, and local-extension behavior
- Provider-specific and proprietary behavior isolated behind adapters
- CSV import
- Document import
- HealthKit adapter
- Health Connect adapter
- Standards-based clinical, laboratory, pharmacy, claims, payer, EHR, exchange, or other adapters selected through evidence and review rather than assumed universally
- Source review and duplicate detection
- Raw or faithful source, transformation, conformance, and mapping preservation
- Connector access receipts
- Provider-neutral prioritization criteria tied to affected-person value, reach, feasibility, risk, maintenance cost, and evidence
- Connector sponsor, vendor, related-party, evaluator-independence, concentration, portability, replacement, migration, and teardown records
- Synthetic fixtures covering multiple versions, partial conformance, local variation, conflicting sources, mapping loss, and inaccessible endpoints

Acceptance:

- Imported records preserve raw source references, standards and mapping versions, and normalization history
- Revocation stops future synchronization
- Conflicting sources remain distinguishable
- Connector failures do not corrupt the Chronicle
- No external schema, implementation guide, vendor model, provider relationship, or sponsor becomes Chronicle authority
- Every normalized value can trace to its source and mapping behavior
- Unsupported or lossy mappings remain explicit rather than being silently dropped or promoted
- A provider-specific integration can be disabled or replaced without rewriting the core Chronicle contract
- Connector priority, ranking, certification, or acceptance cannot be purchased through funding, data access, distribution, or enterprise opportunity
- One enterprise contract is not required to complete personal import, manual capture, export, correction, or deletion paths
- Material clinical-informatics and interoperability claims receive named specialist review or an explicit pending holdpoint

## Sprint 15 — Athena’s Observatory

**Goal:** Return useful descriptive personal intelligence safely.

Deliverables:

- Trends
- Period comparison
- Data-quality explanations
- Descriptive associations
- Evidence and uncertainty display
- Source-class, provider, mapping, conflict, and semantic-loss display where relevant
- Claim taxonomy enforcement
- Personal-question builder
- Safe experiment framework proposal

Acceptance:

- Associations are never phrased as diagnosis or proven causality
- Every insight exposes its source records and limitations
- Clinical and safety review approves public language
- Standards conformance, provider source, sponsor status, or connector availability does not determine insight selection, confidence, or wording without evidence

## Sprint 16 — Chronicle MCP through the Veil

**Goal:** Allow authorized personal agents to use bounded Chronicle tools.

Deliverables:

- Authenticated remote MCP transport
- Policy gateway
- User-scoped read tools
- Draft-only write tools
- Step-up confirmation for sensitive actions
- Tool budgets and rate limits
- Player-visible receipts
- Client revocation
- Compromised-client tabletop and tests

Acceptance:

- No tool accepts a caller-supplied Chronicle owner
- No arbitrary query, filesystem, or database tool exists
- Revoked clients immediately lose future access
- Prompt injection from imported content cannot invoke tools

## Sprint 17 — Clinical, safety, and accessibility governance

**Goal:** Establish operational safeguards before broader beta use.

Deliverables:

- Claim taxonomy
- Emergency and crisis routing
- Medication, pregnancy, injury, eating-disorder, and other high-risk boundaries
- Minor and caregiver policy proposal
- Clinical content review workflow
- Clinical-informatics and interoperability review workflow for mappings, provider summaries, source conflicts, and standards-versus-safety claims
- Boundaries for provider-facing summaries, correction requests, and care collaboration
- Adverse-event process
- Accessibility conformance review
- Sponsor, grantor, vendor, provider, EHR, payer, laboratory, device, exchange, enterprise, and related-party conflict and independence rules for clinical, medication, safety, accessibility, interoperability, mapping, and provider-facing content or review
- Moderation and support escalation

Acceptance:

- High-risk prompts route predictably
- Disclaimers are not used as substitutes for controls
- Accessibility acceptance criteria are part of release gates
- Standards conformance is not represented as proof of clinical safety, semantic completeness, or usable care workflow
- No funder, sponsor, vendor, provider, EHR, enterprise partner, or related party controls clinical conclusions, mappings, source conflict treatment, product-specific health placement, specialist approval, adverse-event handling, negative findings, or publication
- Direct personal use remains available without institutional enrollment

## Sprint 18 — Beta evidence and release gate

**Goal:** Determine whether the first private product is ready for people.

Deliverables:

- Player interviews
- Prototype usability results
- Consent-comprehension results
- Extraction accuracy benchmark
- Recall citation benchmark
- Unsafe-response benchmark
- Export and deletion reliability results
- AI latency and cost model
- Seven-day and thirty-day meaningful-retention measures
- AS-0012 evidence: personal utility without enterprise enrollment, import success, mapping coverage and loss, source and uncertainty comprehension, correction and reconciliation, provider-summary usefulness where tested, connector maintenance and replacement cost, and provider or sponsor concentration
- Analysis of whether funded integrations receive disproportionate roadmap attention relative to affected-person value and evidence
- Operational funding evidence when any real relationship exists: ledger integrity, restrictions, approved benefits, conflicts, concentration, continuity, source-loss response, expenditure linkage where applicable, funded outcomes, corrections, and residual obligations
- Release readiness review

Acceptance:

- Quantitative thresholds are approved before recruitment
- Known safety or privacy blockers prevent release
- Findings create a prioritized evidence-based backlog
- Consumer-first is not represented as validated merely because the architecture is coherent
- An enterprise pilot does not prove general provider interoperability
- A standards-conformant exchange does not prove semantic completeness, clinical safety, or personal value
- Evidence may narrow or weaken market sequencing without weakening the player-rights floor
- A real funding or provider relationship cannot be treated as operationally ready merely because Phase 0 doctrine exists; applicable legal, accounting, tax, custody, privacy, clinical, interoperability, procurement, conflict, continuity, and reporting evidence is required

## Sprint 19 — Open-source public launch

**Goal:** Release a credible public project, not only a code dump.

Deliverables:

- Signed release
- Installation documentation
- Architecture and canon documentation
- Synthetic demo
- Contributor issue set
- Good-first-issue pathways
- Maintainer and security processes
- Public roadmap
- Launch-grade funding, sponsorship, expenditure, concentration, conflict, correction, and public-good outcome reporting derived from canonical economics records
- Public consumer-first and provider-independent explanation
- Connector capability, standards, mapping, compatibility, provider-dependency, limitation, and correction status
- Public material provider, EHR, connector, enterprise, and institutional relationship records linked to purpose, funding, work, findings, replacement, and outcomes
- Deliberate manual release and deployment controls with attributable authorization

Acceptance:

- A clean machine can run the project from documentation
- At least one external contributor can complete a small change
- No production data or secret is required
- Funding transparency is already governed before launch, and every active material relationship can be traced through support, restrictions, benefits, work, expenditure where applicable, outcomes, conflicts, concentration, corrections, and residual obligations
- No sponsor or partner is presented as a preferred health provider, EHR, connector, clinical authority, standards authority, or product owner merely because it supported the project
- Production releases and deployments occur only through an explicit, attributable release decision rather than every repository commit

## Future Institutional Workstream — Clinical and Enterprise Interoperability Partnerships

**Entry condition:** Begin before a material provider-facing workflow, institutional integration, enterprise contract, B2B/B2B2C operating model, or provider-dependent distribution path becomes necessary—not merely because an institution expresses interest.

**Goal:** Add legitimate clinical and institutional value without converting Calypso’s Promise into a provider-owned record, procurement-driven product, sponsor-ranked marketplace, or enterprise prerequisite for personal value.

Expected deliverables:

- Institutional relationship taxonomy and authority model
- Provider, EHR, payer, laboratory, pharmacy, device, exchange, employer, public-health, and research boundaries
- Person-authorized provider summaries, collaboration, correction, referral, and result-return contracts
- Implementation-guide, terminology, mapping, conformance, and source-authority governance
- Clinical, interoperability, privacy, security, accessibility, legal, regulatory, procurement, contract, and information-blocking review
- Provider and sponsor conflicts, recusals, evaluator independence, negative-finding publication, and correction rules
- Enterprise isolation, tenant, operator, support, audit, incident, deletion, retention, and downstream obligations
- Hosted-service, pricing, subsidy, support, and meaningfully free boundaries
- Provider, connector, source, distribution, revenue, and critical-function concentration controls
- Portability, replacement, migration, termination, and teardown
- Pilot evidence tied to personal or public value rather than integration output alone
- Public institutional relationship records linked to work, findings, limitations, incidents, and outcomes

Acceptance:

- The person’s purpose-specific authority and rights remain controlling for the proposed flow
- No institutional contract makes personal-core use contingent on the partner
- No partner receives Chronicle schema authority, preferred source truth, provider ranking, connector default, health placement, or roadmap control
- Operational, clinical, and legal responsibility are explicit rather than implied by data exchange
- Negative findings and incidents remain publishable through reviewed processes
- The partner, funded implementer, and sponsor-funded evaluator cannot independently certify the relationship
- Export, migration, replacement, and termination are operationally testable
- The pilot demonstrates measurable personal or public benefit rather than connection success alone

The detailed proposed entry and phase inheritance are maintained in [`consumer-first-provider-independent-workstream.md`](consumer-first-provider-independent-workstream.md).

## Future Institutional Workstream — Funding Operations and Financial Controls

**Entry condition:** Begin only before accepting or operating real funding, not merely because the Phase 0 doctrine is merged.

**Goal:** Operationalize Decision 0008 through legally and financially competent systems without weakening its constitutional, anti-capture, public-ledger, provider-neutrality, conflict, or private-source boundaries.

Expected deliverables:

- Legal recipient, entity, or fiscal-sponsor decision
- Authority to receive, hold, restrict, return, and spend funds
- Banking, payment, custody, reconciliation, fraud, sanctions, chargeback, and refund controls
- Accounting, tax, record-retention, contract-signature, and reporting responsibilities
- Donor and partner privacy notices, access roles, correction, deletion, and incident handling
- Expenditure, procurement, reimbursement, compensation, payroll, contractor, and related-party controls
- Treasury access, separation of duties, recovery, budget, reserves, runway, and continuity controls
- Public funding and expenditure reporting generated from reviewed institutional derivatives
- Multi-party exercises covering source loss, financial incidents, unauthorized spending, account recovery, concentration, and termination

Acceptance:

- A qualified legal and financial review identifies the lawful recipient, duties, authority, and unresolved risks
- No one person controls receipt, custody, spending, reporting, and recovery for a material operating fund
- Public records reconcile support and expenditure without exposing protected financial source information
- Refund, restriction, correction, suspension, termination, incident, continuity, and recovery behavior is operationally testable
- Compensation, procurement, or related-party payment cannot purchase constitutional or unrelated governance authority
- Operational funding claims remain distinct from Phase 0 doctrine and from mature Phase 5 treasury governance

## Deferred sprint families

These remain designed directions, not committed release work:

- Research Commons governance and secure analysis
- Commons MCP
- Study matching and recruitment
- Compensated opportunities and the House of Oaths
- Research and public-good funding programs after applicable governance and participant-protection gates
- Commercial hosted-service economics
- Clinical and enterprise interoperability capabilities beyond the bounded future workstream
- Caregiver and legacy stewardship
- Community and social systems
- Hundred-Year Watch expansion
- Blockchain, token, NFT, or DAO mechanisms

Each deferred family requires its own constitutional, legal, safety, economic, interoperability, procurement, and evidence gate before implementation.
