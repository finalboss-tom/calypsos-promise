# Governance Baseline

**Status:** BASELINE  
**Long-horizon mandate:** FROZEN through `VISION.md` and Decision 0003  
**Operational feedback baseline:** Decision 0006

Calypso’s Promise begins with maintainer-led governance because early execution requires coherent responsibility. It is designed to progressively transfer authority as the product, evidence, contributor community, safeguards, and institution mature.

Maintainer-led does not mean permanently founder-controlled. Progressive decentralization and founder independence are architectural constraints.

## Governance objectives

The governance system must:

- protect the frozen product promise and player rights
- make authority, reasoning, conflicts, and changes visible
- support timely and accountable execution
- represent people affected by decisions
- recognize competence and sustained contribution without creating permanent privilege
- prevent capital, popularity, expertise, or a single constituency from capturing the institution
- preserve meaningful correction, appeal, removal, exit, and succession
- enable the founder to leave operational and governance loops without institutional collapse

## Current roles

### Founding steward

The founding steward currently provides product direction, resolves foundational ambiguity, and approves material changes to frozen components.

This authority is transitional and constitutionally bounded. It may not override frozen player rights, conceal conflicts, silently change the mission, or establish permanent personal control over community, treasury, data, releases, brand, or infrastructure.

Founder-reserved powers must be documented. Future powers must include scope, justification, review date, and sunset or transfer conditions.

### Maintainer

Maintainers may merge changes, manage releases, handle conduct and security matters, and steward the roadmap.

Maintainers must:

- disclose conflicts of interest
- preserve review records
- avoid silently overriding frozen foundations
- document material decisions
- maintain succession and recovery information
- reduce key-person dependency within their areas
- recuse when impartial judgment is reasonably in doubt

### Contributor

Contributors propose code, content, documentation, research, design, tests, operations, and review.

Contribution does not automatically grant:

- production-system access
- private-data access
- authority over every decision class
- permanent governance weight
- exemption from conflict, conduct, competence, or review requirements

### Specialist reviewer

Security, clinical, privacy, accessibility, research, legal, economic, and canon changes may require review by qualified specialists before merge or release.

Specialist authority is bounded to relevant claims and risks. Expertise is not a license to override player rights, conceal reasoning, or control unrelated domains.

### Player and affected participant

Players and other affected participants must gain increasing representation as real people use the system.

No person must disclose additional health information, consent to secondary use, pay, or purchase an asset to retain basic product rights or express concerns.

## Decision classes

Governance must not treat every decision as the same kind of vote.

### Constitutional decisions

Examples include:

- player rights and product prohibitions
- mission and institutional purpose
- governance structure
- founder-reserved powers
- data-control and consent guarantees
- dissolution, merger, or mission-asset transfer

These require a decision record, explicit constitutional review, elevated approval thresholds, and affected-party protections.

### Safety and rights decisions

Examples include clinical boundaries, privacy controls, security requirements, accessibility, research safeguards, and high-risk AI behavior.

These require relevant specialist review and cannot be bypassed solely by popular vote, contributor volume, or financial stake.

### Strategic and economic decisions

Examples include roadmap priorities, major partnerships, treasury policy, business models, public-good allocations, and compensation frameworks.

These require transparent conflicts, financial evidence, stakeholder impact analysis, and governance appropriate to the amount and reversibility of risk.

### Technical and operational decisions

Examples include implementation details, vendor selection within approved boundaries, releases, incident response, maintenance, and routine content changes.

These may be delegated to accountable maintainers, councils, or operators with published scopes and appeal paths.

### Community and cultural decisions

Examples include contributor programs, moderation norms, events, community grants, and non-frozen lore or content.

These should become early candidates for bounded participatory governance.

## Present decision authority

- Frozen constitutional and canon changes require a decision record and explicit founding-steward approval while the founding-steward role remains active.
- Baseline architecture changes require a decision record when they alter trust boundaries, data behavior, governance progression, or public promises.
- Ordinary implementation details may be decided through pull-request review.
- Security incidents may require temporary private decisions followed by a public post-incident record when safe.
- No current community poll or informal vote may waive privacy, security, clinical, accessibility, consent, or legal controls.

## Feedback-to-governed-work loop

Decision 0006 establishes product feedback, public issues, prioritization, contribution, implementation, validation, and outcome review as one traceable institutional loop. The canonical architecture is `docs/governance/feedback-to-governed-work.md`.

Current rules are:

- GitHub issues are the canonical public ledger for public-safe work items.
- Health information, account-specific support, private correspondence, security reports, conduct evidence, and other protected source material remain outside public issues.
- Future in-product intake must classify and minimize information before creating or linking a public issue.
- Community input should distinguish affectedness, reproduction, priority preference, willingness to validate, willingness to contribute, and domain evidence.
- Raw reactions and comment volume are discovery signals, not verified identity, evidence, or a binding vote.
- Priority should become a deterministic, versioned, explainable policy with recorded inputs, confidence, authority, and override rationale.
- Maintainers retain roadmap authority during Phase 0 and should publish reasons when material community input is not followed.
- Binding authority over selected low-risk domains or a defined share of roadmap capacity may transfer only through the gates, charters, appeals, specialist controls, and rollback rules in `ROADMAP.md`.
- Safety, constitutional, privacy, security, clinical, accessibility, legal, consent, conduct, and data-integrity duties take precedence over popularity or a computed score.
- Validated issue reporting, reproduction, triage, specification, implementation, review, testing, documentation, and outcome measurement may earn scoped Fellowship contribution credit. Raw activity does not create permanent privilege.

Closing an issue is not equivalent to solving the problem. Material work items should preserve the path from evidence and decision through release, measured outcome, correction, reopening, or rollback.

## Progressive authority transfer

Authority transfers only through a published governance gate.

Each transfer must define:

- the decision class and authority being transferred
- the eligible constituency or office
- qualification, selection, and removal rules
- term and rotation rules
- quorum and approval thresholds
- conflict and recusal rules
- transparency requirements
- appeal and review
- emergency override, if any
- sunset, renewal, and rollback conditions

A transfer is incomplete until the receiving body has demonstrated capacity and the previous key-person dependency has been reduced.

The phase model is defined in `ROADMAP.md`.

## Weighted-governance principles

The final weighted-governance mechanism is not yet selected. Any proposal must satisfy these constraints.

### Affectedness

People materially affected by a decision require representation. A research participant, player, contributor, operator, specialist, and donor may have legitimate but different claims.

### Contribution

Sustained, reviewable contributions may earn influence within relevant domains. Raw activity counts, issue volume, wealth, or social reach are insufficient.

### Competence

Some decisions require demonstrated knowledge or duty of care. Competence gates must be transparent, appealable, renewable, and narrow enough to avoid permanent expert capture.

### Trust and conduct

Governance weight may depend on a record of reliable stewardship, conflict disclosure, respectful conduct, and correction of errors. Reputation must decay, remain contestable, and not become hereditary or permanently transferable.

### Delegation

Participants should be able to delegate authority to trusted representatives and revoke that delegation. Delegation chains and concentrations must be visible and capped where necessary.

### Capital limits

Funding the mission does not confer unlimited control. Donation, investment, token ownership, service purchases, or treasury contribution must not buy player rights, private-data access, constitutional dominance, or immunity from oversight.

### Privacy and anti-Sybil controls

Governance must resist duplicate identities and coordinated capture without forcing public disclosure of health status or unnecessary identity information. No identity system is selected yet.

### Separation of powers

Proposal, execution, review, audit, appeal, and emergency authority should not remain permanently concentrated in one body.

## Merge and repository policy

- Pull requests are the default change mechanism.
- At least one maintainer approval is required.
- Authors should not be the sole approver of material security, consent, clinical, economic, governance, or canon changes.
- Squash merge is the default.
- Material governance changes require a decision record.
- Governance implementation must include tests, simulations, or other evidence appropriate to the risk.
- Material AI assistance must be disclosed; human stewards remain accountable.

## Transparency

The project should publish, subject to privacy and security limits:

- decision records
- governance charters
- meeting outcomes and vote records
- conflicts and recusals
- treasury policy and reports
- authority maps
- active emergency powers
- governance experiments and failures
- roadmap-gate evidence
- succession and key-person-risk status
- material priority assessments and overrides
- roadmap-capacity allocations and outcomes

Private handling is permitted for security incidents, personal information, protected disclosures, personnel matters, or legally restricted material. The reason for confidentiality and the responsible authority should be documented when safe.

## Emergency powers

Emergency authority must be:

- limited to a defined threat
- held by named accountable roles
- no broader than necessary
- logged and independently reviewable
- unable to permanently amend the constitution
- automatically expired unless renewed through ordinary governance
- followed by a public record when disclosure is safe

## Conflicts, accountability, and removal

Every office must have:

- conflict-disclosure rules
- recusal expectations
- performance and conduct standards
- a complaint and appeal path
- temporary suspension procedures where urgent protection is needed
- a legitimate removal mechanism
- a succession or replacement procedure

No founder, maintainer, council, specialist, donor, executive, or elected representative is exempt.

## Contribution certification

The baseline decision is to use the Developer Certificate of Origin rather than a Contributor License Agreement unless later legal review identifies a concrete need for a CLA.

Contributors certify their right to submit work through the repository’s current DCO process.

## Succession and founder exit

No individual should remain an irreplaceable operational dependency.

The project must progressively establish:

- at least two qualified stewards for critical functions
- documented ownership and recovery procedures
- distributed release and infrastructure access
- treasury and legal continuity
- rotation and handoff exercises
- founder incapacity and absence procedures
- public institutional memory
- removal and replacement rules
- a final founder-exit gate

Founder independence is reached only when the product, community, treasury, critical accounts, release process, and constitutional authority can continue without founder intervention.

## Explicitly unresolved

The following remain open design work:

- the final weighted-governance formula
- identity and anti-Sybil mechanisms
- council composition and constituency boundaries
- feedback signal identity, verification, and privacy
- priority scales, weights, thresholds, and tie-breakers
- the percentage of roadmap capacity eligible for binding community control
- contribution-credit scope, decay, portability, and appeal
- legal entities and their relationship to constitutional governance
- treasury custody and voting mechanics
- token, blockchain, or on-chain components
- compensation and ownership instruments
- judicial, ombuds, or constitutional-review structure
- precise founder-power sunsets
- fork, merger, dissolution, and mission-asset-lock procedures

These mechanisms must not be selected merely because they are technically available. They must be justified against the frozen mandate, public roadmap, real evidence, and capture risks.
