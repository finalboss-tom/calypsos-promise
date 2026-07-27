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
- Provider-neutral evaluation and funding-conflict rules for model credits, sponsored benchmarks, affiliate incentives, egress partners, infrastructure support, and related parties
- Prompt-injection isolation rules
- Non-AI fallback behavior

Acceptance:

- Aster cannot write directly to canonical records
- Every recalled health statement can reference authoritative records
- Material memories are visible, editable, exportable, and deletable
- AI unavailability does not block core capture or permissions
- Funding, credits, sponsorship, affiliate terms, or related-party interests cannot determine provider defaults, ranking, egress policy, benchmark conclusions, or publication
- Sprint 6 defines provider-governance requirements but does not select or endorse a production AI provider

## Sprint 7 — Forge MCP and agent safety

**Goal:** Provide useful agent tooling without private health-data risk.

Deliverables:

- MCP tool registry and risk classes
- Forge MCP using local `stdio`
- Lore search and validation tools
- Quest-schema tools
- Architecture and decision search
- Synthetic-data generation
- Tool scopes, rate limits, receipts, and error formats
- Sponsor-funded tool, service-credit, and infrastructure conflict review
- Agent security test suite

Acceptance:

- Forge MCP operates entirely on public documentation and synthetic data
- Retrieved content cannot grant itself tool authority
- Tool contracts are versioned and testable
- Sponsor-funded tools remain subject to the same public-data, synthetic-only, tool-risk, provider-neutrality, review, and publication boundaries as unfunded tools

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
- Aster and AI
- Trust Center shell
- Open Forge page
- Roadmap and capability-status components
- Support and funding-transparency surface generated from canonical economics records
- Public views of who supported the project, what they funded, approved benefits, prohibited or absent benefits, relationship status, delivery, outcomes, conflicts, concentration, corrections, and challenge routes
- Disabled transaction handoff until legitimate recipient, custody, accounting, tax, privacy, refund, and payment-rail gates are accepted

Acceptance:

- Live, experimental, planned, and long-horizon claims are visually distinct
- All essential information is accessible without animation or story traversal
- Core pages pass accessibility and performance baselines
- Funding displays derive from canonical public economics records rather than an independent website sponsor model
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

Acceptance:

- Every transition is tested end to end
- Export contains the stored record, provenance, permission, receipt, and quest result
- Deletion behavior is verifiable
- No model call is required to complete a manual fallback path

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
- Memory Chamber
- Preference, goal, story, and session-memory separation
- Correction and removal flows
- Contradiction and uncertainty handling

Acceptance:

- Recall benchmark measures source accuracy and unsupported statements
- Structured values never depend on vector retrieval
- All material retained memory is visible to the player

## Sprint 14 — Connector foundation

**Goal:** Add external data without sacrificing provenance or control.

Deliverables:

- Connector SDK
- Authorization, synchronization, cursor, revocation, and deletion contracts
- CSV import
- Document import
- HealthKit adapter
- Health Connect adapter
- Source review and duplicate detection
- Connector access receipts

Acceptance:

- Imported records preserve raw source references and normalization history
- Revocation stops future synchronization
- Conflicting sources remain distinguishable
- Connector failures do not corrupt the Chronicle

## Sprint 15 — Athena’s Observatory

**Goal:** Return useful descriptive personal intelligence safely.

Deliverables:

- Trends
- Period comparison
- Data-quality explanations
- Descriptive associations
- Evidence and uncertainty display
- Claim taxonomy enforcement
- Personal-question builder
- Safe experiment framework proposal

Acceptance:

- Associations are never phrased as diagnosis or proven causality
- Every insight exposes its source records and limitations
- Clinical and safety review approves public language

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
- Adverse-event process
- Accessibility conformance review
- Sponsor, grantor, vendor, and related-party conflict and independence rules for clinical, medication, safety, and accessibility content or review
- Moderation and support escalation

Acceptance:

- High-risk prompts route predictably
- Disclaimers are not used as substitutes for controls
- Accessibility acceptance criteria are part of release gates
- No funder, sponsor, vendor, or related party controls clinical or safety conclusions, product-specific health placement, specialist approval, adverse-event handling, or publication

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
- Operational funding evidence when any real relationship exists: ledger integrity, restrictions, approved benefits, conflicts, concentration, continuity, source-loss response, expenditure linkage where applicable, funded outcomes, corrections, and residual obligations
- Release readiness review

Acceptance:

- Quantitative thresholds are approved before recruitment
- Known safety or privacy blockers prevent release
- Findings create a prioritized evidence-based backlog
- A real funding relationship cannot be treated as operationally ready merely because the Phase 0 doctrine exists; applicable legal, accounting, tax, custody, privacy, conflict, continuity, and reporting evidence is required

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
- Deliberate manual release and deployment controls with attributable authorization

Acceptance:

- A clean machine can run the project from documentation
- At least one external contributor can complete a small change
- No production data or secret is required
- Funding transparency is already governed before launch, and every active material relationship can be traced through support, restrictions, benefits, work, expenditure where applicable, outcomes, conflicts, concentration, corrections, and residual obligations
- Production releases and deployments occur only through an explicit, attributable release decision rather than every repository commit

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
- Caregiver and legacy stewardship
- Community and social systems
- Hundred-Year Watch expansion
- Blockchain, token, NFT, or DAO mechanisms

Each deferred family requires its own constitutional, legal, safety, economic, and evidence gate before implementation.
