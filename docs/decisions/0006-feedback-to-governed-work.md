# Decision 0006 — Feedback-to-governed-work as an institutional loop

- **Status:** Accepted
- **Date:** 2026-07-24
- **Owners:** Founding steward
- **Affected frozen components:** None; implements the progressive-decentralization constraint without changing frozen player rights
- **Related issues or pull requests:** Added by the feedback-governance-loop pull request

## Context

Calypso’s Promise is an open-source product intended to mature into a self-sustaining, founder-independent institution. Its repository already defines public pull requests, contribution rules, decision classes, progressive authority transfer, deterministic incentives, and a principled boundary between public institutional records and protected source material.

The repository does not yet define how ordinary product friction becomes governed work.

Without a durable architecture, user reports could fragment across private support messages, public issues, informal polls, maintainer intuition, analytics dashboards, and future in-product feedback. Raw GitHub reactions could be mistaken for representative votes. Valuable issue triage, reproduction, testing, documentation, and outcome measurement could remain invisible or unrewarded. A future governance module could then be bolted onto the product without preserving privacy, safety, decision classes, evidence, accountability, or the project’s hardcoded incentive boundaries.

Open-source issue tracking creates an opportunity to connect product use, public evidence, roadmap prioritization, contribution, implementation, validation, and progressive decentralization in one traceable loop.

## Source basis

- `docs/frozen/product-constitution.md`
- `docs/frozen/architecture.md`
- `docs/product/incentive-model.md`
- `GOVERNANCE.md`
- `ROADMAP.md`
- `CONTRIBUTING.md`
- `docs/decisions/0003-progressive-decentralization.md`
- `docs/decisions/0005-principled-confidentiality.md`
- `docs/policies/publication-and-confidentiality.md`
- the founding steward’s direction that community-governed issue prioritization should form a closed product-refinement loop

No final voting formula, identity mechanism, priority weights, token, treasury, compensation program, or production service is selected by this decision.

## Decision

Calypso’s Promise accepts the feedback-to-governed-work loop as a baseline institutional and product architecture.

The following statements are binding at the baseline level:

1. GitHub issues are the current canonical public ledger for public-safe work items, while private support, health, security, conduct, and account-specific source material remain outside the public repository.
2. Future in-product feedback should make issue participation accessible without requiring GitHub knowledge, but public issue creation must occur only after classification, minimization, and explicit safe publication behavior.
3. Public work items should trace the path from problem or proposal through evidence, prioritization, decision, implementation, validation, release, outcome, correction, and institutional learning.
4. Issue triage must distinguish the problem from a proposed solution, preserve duplicate reporters’ evidence, identify decision class and risk, and protect low-frequency or minority harms from popularity bias.
5. Community input must use typed signals such as affectedness, reproduction, priority preference, willingness to validate, willingness to contribute, and domain evidence. Raw reactions are lightweight discovery signals, not verified votes.
6. Prioritization should become a deterministic, versioned, explainable domain policy. Every automated assessment must preserve its inputs, policy revision, result, confidence, and accountable authority.
7. AI may summarize evidence or propose classifications. It may not silently cast signals, establish affectedness, assign authoritative priority, or override the deterministic policy and accountable governance authority.
8. Community signals are non-binding during Phase 0. Binding authority over defined low-risk domains or roadmap capacity unlocks only through the evidence gates, charters, appeals, specialist controls, and rollback rules in `ROADMAP.md` and `GOVERNANCE.md`.
9. Constitutional, safety, privacy, security, clinical, accessibility, legal, consent, conduct, and data-integrity obligations cannot be waived by popularity, issue volume, contributor activity, capital, or a computed priority score.
10. Maintainers may override an advisory order when accountable judgment requires it, but material overrides must record the authority, rationale, conflicts, and later outcome.
11. Validated reporting, reproduction, triage, specification, implementation, review, testing, documentation, and outcome measurement may earn scoped Fellowship contribution credit.
12. Raw issue volume, reactions, comments, health disclosure, broader consent, wealth, donation, social reach, manufactured urgency, or avoidable work must not create rewards or universal governance power.
13. The public work ledger must record closure, deferral, decline, escalation, duplicate, supersession, release, outcome, reopening, and rollback reasons. Closing an issue is not equivalent to solving the problem.
14. The logical architecture must separate feedback intake, public-ledger adaptation, triage and evidence, typed signals, priority policy, governance gates, contribution records, and outcome evaluation so GitHub remains replaceable as an adapter rather than becoming the permanent domain model.
15. Mechanisms must begin as manual, inspectable repository processes and advance toward automation or binding governance only after minimum viable validation, synthetic governance fixtures, participant comprehension, capture analysis, and bounded pilots.

The canonical baseline is `docs/governance/feedback-to-governed-work.md`.

## Consequences

### Benefits

- Product support, roadmap planning, contribution, and governance become one traceable improvement system.
- GitHub issues compound into public institutional memory instead of disappearing into private queues.
- People can contribute through reporting, validation, specification, review, testing, and documentation rather than code alone.
- Community participation begins immediately as evidence and advisory input without pretending that the current project has mature decentralized authority.
- Deterministic, versioned priority logic extends the project’s hardcoded incentive philosophy into roadmap governance.
- Maintainer judgment remains possible but becomes more visible, comparable, and accountable.
- Future product intake and governance services receive a stable logical boundary before implementation choices are made.
- Progressive decentralization gains an operating apprenticeship: participants learn governance through ordinary product improvement.

### Costs and tradeoffs

- Triage, duplicate handling, classification, rationale, and outcome review create continuing maintenance work.
- Public accountability may slow informal roadmap decisions.
- A useful priority policy requires careful data definitions, synthetic fixtures, audits, and periodic revision.
- Private routing and safe public derivatives require systems beyond GitHub before real product support begins.
- Typed signals and phase-aware governance are more complex than reaction counts or simple majority polls.
- Contribution credit and reputation introduce appeal, correction, decay, and capture problems that must remain bounded.

### Risks

- Community voting may become governance theater if maintainers routinely ignore signals without consequences.
- Binding prioritization may transfer too early and create brigading, popularity contests, or strategic manipulation.
- A computed score may create false precision or hide normative choices inside weights.
- Contributor recognition may become an oligarchy or incentive for spam.
- A public issue flow may pressure people to expose private evidence.
- GitHub participation may exclude ordinary users, people with accessibility barriers, or those unwilling to maintain a public technical identity.
- Safety or maintenance work may be consistently deprioritized because its beneficiaries are diffuse or invisible.
- Maintainer overrides may become an unreviewed escape hatch.
- AI-generated issues, comments, or consensus may overwhelm authentic human evidence.

These risks require public rationale, privacy-preserving intake, typed signals, scoped authority, minority protection, specialist review, appeals, concentration reporting, synthetic fixtures, bounded pilots, and rollback.

## Alternatives considered

### Private customer-support queue as the primary system

Rejected as the public work architecture because it isolates evidence, duplicates effort, obscures prioritization, and fails to build contributor or governance capacity. Private support remains necessary for protected and person-specific matters.

### GitHub reactions as direct binding votes

Rejected because reactions do not establish unique identity, affectedness, evidence, competence, minority impact, decision class, or freedom from brigading.

### Maintainer-only prioritization indefinitely

Rejected as the permanent model because it conflicts with progressive decentralization, conceals institutional learning, and preserves key-person dependence. Maintainer-led prioritization remains appropriate during the current phase when it is transparent and bounded.

### Immediate community control of the entire roadmap

Rejected because the product, identity model, councils, representation, safeguards, and community capacity are not mature enough. Broad authority before evidence would create governance theater or capture risk.

### AI-selected roadmap priority

Rejected because priority includes rights, duties, tradeoffs, affectedness, and legitimate authority. AI may assist analysis but cannot become the unaccountable decision maker.

### Tokenized voting or transferable reputation

Rejected as a default because capital and speculation do not prove affectedness, competence, stewardship, or public benefit. These mechanisms remain optional and deferred under Decision 0003.

### Bounty-first contribution market

Rejected as the baseline because bounties can reward easy visible work, duplicate claims, vulnerability creation, short-term patches, and financial participation while undervaluing maintenance, care, review, accessibility, and institutional knowledge.

## Validation or review required

Before an automated advisory priority system is represented as reliable:

- define stable work-item, signal, evidence, decision, override, contribution, and outcome contracts
- create synthetic backlogs covering safety, accessibility, minority impact, duplication, weak evidence, brigading, contributor bias, donor influence, maintenance, and failed outcomes
- test deterministic behavior and policy revision history
- publish the dimensions, scales, weights, thresholds, tie-breakers, missing-data behavior, and rationale format
- verify AI cannot create authoritative signals or priority decisions
- review privacy, security, accessibility, governance, and anti-capture risks
- demonstrate that ordinary participants can understand the result

Before community input controls any roadmap capacity:

- identify the eligible decision classes and excluded reserves
- define the constituency, identity or eligibility boundary, quorum, delegation, conflicts, recusal, removal, appeal, emergency, sunset, and rollback rules
- cap the initial capacity and duration
- publish a charter and authority map
- simulate brigading, apathy, collusion, popularity bias, contributor oligarchy, expert capture, donor influence, and maintainer override abuse
- complete a bounded real-world pilot
- publish participation, concentration, decisions, outcomes, failures, and corrections
- verify that no player right or safety control is weakened

Before real in-product feedback is linked to public issues:

- implement private support and escalation paths
- classify and minimize before publication
- prohibit raw health, account, security, conduct, and third-party information
- provide accessible non-GitHub participation
- define retention, deletion, consent, and correction behavior for private intake
- test metadata, attachment, screenshot, log, and diagnostic leakage controls

## Migration and rollback

Migration begins with documentation and the public issue template.

The implementation order is:

1. publish the decision and canonical architecture
2. strengthen public-safe issue intake
3. define a manual triage, decision-class, evidence, closure, and rationale protocol
4. add typed advisory signals and public priority assessments
5. implement in-product private routing and safe public issue linking
6. pilot delegated low-risk prioritization under a charter
7. allocate binding roadmap capacity only after the applicable phase gates

A priority-policy revision may be replaced when it produces false precision, exclusion, systematic bias, unsafe delay, manipulation, incomprehension, or poor outcomes. Prior assessments must retain their original policy revision.

A delegated or binding governance mechanism may be paused or rolled back when it causes capture, low participation, rights violations, safety delay, chronic deadlock, corruption, or conflict with frozen foundations.

Rollback of a mechanism does not remove the feedback-to-governed-work objective. A replacement must preserve traceability, public accountability, safe intake, evidence, outcome review, and continued progress toward legitimate community stewardship.

## Freeze impact

This decision establishes a new **BASELINE** governance and product-operations architecture under the frozen progressive-decentralization mandate.

It does not change:

- the player promise
- private-by-default operation
- personal utility before secondary use
- meaningful refusal and non-punitive return
- open code and private production health data
- deterministic player incentives
- AI and domain-authority boundaries
- specialist review and safety precedence
- the institutional phase gates
- the deferral of identity, weighted-governance, token, blockchain, NFT, treasury, ownership, and on-chain mechanisms

Removing the closed-loop direction or granting binding authority outside the accepted phase gates requires a later material governance decision record.