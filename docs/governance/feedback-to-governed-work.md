# Feedback-to-Governed-Work Loop — BASELINE

**Decision basis:** Decision 0006  
**Institutional basis:** `VISION.md`, `GOVERNANCE.md`, `ROADMAP.md`, and Decision 0003  
**Information boundary:** `docs/policies/publication-and-confidentiality.md`  
**Incentive basis:** `docs/product/incentive-model.md`

## Purpose

Calypso’s Promise should turn legitimate user and contributor friction into inspectable, prioritized, funded, implemented, and verified work.

The governing architectural principle is:

> Every legitimate expression of friction should have a traceable path to evidence, prioritization, accountable execution, validation, and governance learning.

Open-source issue tracking is not merely a substitute for a private support queue. Properly designed, it becomes a public work ledger, participatory roadmap, contribution surface, institutional memory, and early training ground for progressive decentralization.

This document defines that closed loop without selecting a final voting formula, identity system, token, blockchain, treasury mechanism, or production implementation.

## Core outcome

The intended loop is:

1. A person uses the product, website, contributor workflow, or public institution.
2. The person encounters friction, identifies a defect, proposes an improvement, or offers evidence.
3. A safe, structured intake creates or links a public work item when publication is appropriate.
4. Maintainers and qualified participants normalize the item, identify duplicates, classify risk, and gather evidence.
5. Community signals reveal affectedness, reproducibility, expertise, willingness to contribute, and willingness to validate.
6. A deterministic, versioned priority policy produces an explainable assessment.
7. The authority appropriate to the current institutional phase decides what is committed, deferred, declined, escalated, or delegated.
8. Contributors implement the work through linked pull requests and review.
9. Players, reporters, specialists, and maintainers validate the result.
10. The project measures the outcome, records the decision and rationale, credits validated contribution, and updates the product and governance system.

The loop then begins again with a better product, stronger public evidence, and a more capable community.

## Scope

This baseline covers:

- product feedback, defects, feature proposals, accessibility friction, documentation gaps, contributor tooling, content, community operations, and public institutional proposals
- GitHub issues as the current canonical public work ledger
- future in-product feedback intake that can create or link safe public issues
- issue normalization, evidence gathering, duplicate handling, prioritization, execution, validation, and outcome measurement
- community signaling as a governance input
- phase-gated transfer from advisory input to bounded binding authority
- deterministic priority policies and public override records
- contribution recognition compatible with the Fellowship incentive dimension
- privacy, safety, conduct, security, legal, and anti-capture boundaries

## Explicit non-scope

This baseline does not establish:

- public handling of health information, account records, private correspondence, conduct evidence, security reports, or production logs
- a promise that every user concern becomes a public GitHub issue
- one-person-one-vote for every decision
- raw reaction counts as a binding roadmap mechanism
- a final weighted-governance formula
- identity proofing or anti-Sybil technology
- automatic governance power from issue activity, code contribution, health disclosure, wealth, donation, or social reach
- a token, transferable reputation asset, blockchain, NFT, or on-chain voting system
- compensation, bounty, treasury, or ownership mechanics
- replacement of maintainers, specialist review, incident response, or constitutional change control
- an entitlement to implementation merely because an item receives many signals

## Public and private intake boundary

### GitHub is a public work system

A GitHub issue, comment, branch, pull request, build log, attachment, or deleted revision must be treated as permanently public.

Public issues may contain only information classified **PUBLIC** under `docs/policies/publication-and-confidentiality.md`. Synthetic examples are the default when reproduction requires data.

A public issue must never contain:

- real health or medical information
- account, consent, identity, payment, or contact records
- production payloads, logs, screenshots, exports, or documents
- credentials or vulnerability details
- conduct complaints or witness evidence
- private correspondence or support transcripts
- information that identifies another person without a legitimate reviewed purpose

### Not every support event becomes public

Future intake must route information before publication:

- **Public work candidate:** a minimized defect, proposal, accessibility issue, documentation gap, or institutional question suitable for the public ledger
- **Private support:** account-specific or person-specific help that does not belong in the repository
- **Privacy or security report:** privately handled under the applicable incident path
- **Conduct or moderation matter:** privately handled with due process
- **Clinical or health-safety concern:** privately escalated when person-specific information or urgent care context is involved; only a safe institutional derivative may later become public
- **Duplicate or known item:** linked to the canonical public work item without republishing source material

The intake layer must minimize first and publish second. It may never create a public issue from raw private input and attempt to redact it afterward.

### Future in-product intake

A native **Report, Suggest, or Help Improve** flow should make participation possible without requiring GitHub knowledge. It should collect only the minimum information needed for routing, such as:

- the affected surface and capability
- expected and observed behavior
- a safe reproduction using synthetic or non-sensitive information
- accessibility impact
- whether the person can validate a future change
- whether the person can contribute relevant expertise or implementation help
- explicit confirmation that no private health, account, security, or third-party information will be published

Diagnostics, screenshots, and attachments must be opt-in, minimized, and screened before public release. Public issue creation must be a separate confirmed action or an approved institutional derivative.

## Canonical public work ledger

GitHub issues are the current canonical ledger for public work because they provide stable identifiers, links, history, discussion, assignment, pull-request integration, and public accountability.

Each canonical work item should eventually identify:

- stable issue identifier
- title and problem statement
- affected surface and audience
- desired outcome
- information classification
- decision class
- risk and specialist-review requirements
- related connected loop, player right, progress dimension, or enabling purpose
- evidence and confidence
- duplicates, dependencies, and superseded items
- community signals by type
- priority-policy revision and resulting assessment
- decision, authority, date, and rationale
- implementation owner and linked pull requests
- validation plan and validators
- release or publication evidence
- measured outcome
- closure, deferral, decline, escalation, or rollback reason
- contribution credits and disputes

Private source records must use private identifiers and systems. The public ledger may reference only a safe derivative and may not contain a reversible pointer to protected source material.

## Work-item lifecycle

A public work item may move through the following states. Implementations may refine names while preserving the distinctions.

1. **Submitted** — received through a public-safe path.
2. **Needs triage** — not yet normalized, classified, or checked for duplicates.
3. **Needs evidence** — the problem is plausible but requires reproduction, affectedness, or feasibility evidence.
4. **Validated** — sufficient evidence exists to prioritize the item.
5. **Prioritized** — assessed under a named priority-policy revision.
6. **Committed** — accepted into a roadmap, sprint, release, or bounded work allocation.
7. **In progress** — accountable implementation is underway.
8. **Needs validation** — implementation exists and requires review, testing, or participant confirmation.
9. **Released or published** — the change is available in the relevant surface.
10. **Outcome review** — the project is assessing whether the change solved the stated problem.
11. **Closed** — completed, declined, duplicate, superseded, invalid, out of scope, or unable to reproduce, with a reason.
12. **Reopened or rolled back** — evidence shows the problem persists, the change caused harm, or assumptions failed.

Status changes should be explainable. Closing an issue is not equivalent to solving it.

## Normalization and evidence

Triage converts a raw proposal into a governable work item.

The triage function should:

- confirm the item is safe for public handling
- identify and link duplicates rather than fragmenting support
- distinguish defect, feature, question, documentation, accessibility, safety, security, governance, content, research, and operational work
- identify the affected product surface and population
- map the item to the appropriate governance decision class
- record severity, urgency, reversibility, dependencies, and specialist-review needs
- identify which connected loop, player right, progress dimension, public promise, or enabling architecture is affected
- request reproducible evidence without soliciting private information
- distinguish reported impact from verified impact
- preserve minority or low-frequency harms that popularity metrics would hide
- separate the existence of a problem from a proposed solution

Triage authority must be published and appealable. Duplicate closure must preserve the reporter’s signal and contribution rather than erasing it.

## Community signals

A single undifferentiated upvote is too weak for responsible prioritization. The system should distinguish at least these signals:

- **Affected** — the problem or desired outcome materially affects the participant
- **Reproduced or confirmed** — the participant independently verified the behavior with safe evidence
- **Priority preference** — the participant believes the item should receive scarce roadmap capacity
- **Can validate** — the participant is willing and able to test a proposed resolution
- **Can contribute** — the participant can provide implementation, design, documentation, research, or operational help
- **Domain evidence** — the participant can contribute relevant qualified expertise or source material through an appropriate safe path
- **Dependency** — another accepted work item depends on this item

Signals must remain purpose-limited. No participant should need to reveal a diagnosis, disability, account identity, intimate experience, or broader data consent to express affectedness.

Raw GitHub reactions may remain a lightweight discovery signal during early phases, but they are not equivalent to verified affectedness, unique participants, competence, evidence, or a binding vote.

## Deterministic priority policy

Prioritization should become an explicit, deterministic, versioned domain policy rather than an opaque maintainer intuition, popularity contest, AI judgment, or analytics experiment.

A priority assessment should record:

- the input facts used
- the policy revision
- each dimension and normalized value
- the resulting score, band, or ordered comparison
- confidence and missing evidence
- specialist constraints
- the responsible decision authority
- any override and its public rationale

### Required dimensions

A future policy should evaluate at least:

- **Affectedness and reach:** how many people or workflows are credibly affected, including concentrated impact on a small group
- **Severity and urgency:** magnitude, time sensitivity, and whether delay creates compounding harm
- **Evidence confidence:** reproducibility, source quality, independent confirmation, and uncertainty
- **Mission and loop alignment:** relationship to the three connected loops and the personal-value-first sequence
- **Rights and safety:** privacy, consent, security, clinical safety, accessibility, due process, and constitutional protections
- **Accessibility and equity:** barriers for people who may be underrepresented by raw engagement counts
- **Longitudinal value:** improvement to Chronicle quality, continuity, provenance, correction, portability, understanding, or safe personal action
- **Architectural leverage:** removal of systemic friction, repeated manual work, lock-in, or key-person dependency
- **Contributor readiness:** availability of a viable specification, implementers, reviewers, validators, and dependencies
- **Cost and complexity:** expected effort, opportunity cost, operational burden, and maintenance cost
- **Execution and systemic risk:** reversibility, blast radius, specialist risk, migration risk, and uncertainty

### Reference shape, not a selected formula

A future implementation may use an explainable shape such as:

```text
priority benefit = affectedness + severity + evidence + mission alignment
                 + rights or accessibility protection + longitudinal leverage
                 + architectural leverage + contributor readiness

priority burden  = effort + dependency cost + operational risk + uncertainty

advisory priority = versioned policy(priority benefit, priority burden)
```

The exact scales, weights, thresholds, aggregation method, and tie-breakers remain unresolved until they are tested with synthetic backlogs, real advisory use, capture analysis, and participant comprehension review.

AI may summarize evidence or propose classifications. AI may not silently assign the authoritative priority, cast signals, establish affectedness, or override the deterministic policy and accountable human authority.

## Safety and constitutional precedence

Community preference cannot waive rights or duties.

The following may bypass ordinary roadmap ordering for accountable handling, but not ordinary safeguards:

- active security vulnerabilities
- privacy incidents
- urgent health-safety defects
- data-integrity failures
- accessibility blockers
- legal or regulatory obligations
- violations of frozen player rights
- conduct or due-process emergencies
- failures that threaten export, deletion, consent, or access controls

These items may require private intake, limited disclosure, specialist review, and emergency authority. A safe public record should follow when disclosure is appropriate.

A high community score cannot authorize:

- publication of protected information
- weakening meaningful refusal
- broader consent coercion
- direct AI authority over canonical records or rewards
- bypass of clinical, privacy, security, accessibility, legal, or constitutional review
- capital-weighted purchase of rights or roadmap control

## Phase-gated governance

The feedback loop is useful before it becomes binding governance. Authority expands only through the gates in `ROADMAP.md`.

### Phase 0 — Public work and maintainer accountability

Current authority remains maintainer-led.

- Public issues and proposals create an inspectable work ledger.
- Structured templates improve evidence and safety.
- Community reactions and comments are non-binding signals.
- Maintainers triage, prioritize, merge, defer, or decline work.
- Material decisions require the applicable review or decision record.
- Maintainers should publish reasons when material community input is not followed.
- No broad community mechanism controls constitutional or safety-critical systems.

### Phase 1 — Structured player advisory input

After a useful private product exists:

- in-product intake may create or link safe public work items
- participants can express typed signals without learning GitHub
- advisory priority assessments become visible
- maintainers publish decisions, overrides, and outcome reviews
- product feedback does not require research participation or broader data consent

### Phase 2 — Bounded councils and delegated triage

After evidence and trust gates are met:

- player, contributor, and specialist bodies may validate evidence within published scopes
- low-risk documentation, tooling, community, content, and selected product decisions may be delegated
- council terms, conflicts, removals, appeals, and concentration are public
- maintainers remain an appeal and safety backstop within the accepted charter

### Phase 3 — Binding roadmap capacity

After community-stewardship gates are met:

- qualified community processes may control a defined percentage of roadmap or grant capacity
- eligible decision classes, budget or capacity limits, quorum, delegation, and rollback are explicit
- the remainder of capacity may remain reserved for safety, maintenance, constitutional obligations, and accountable executive strategy
- decisions and implementation outcomes are auditable

### Later phases

Research, treasury, economic, and constitutional authority require their own phase gates. Success in product prioritization does not automatically grant authority over health-data access, participant research, treasury custody, compensation, ownership, or constitutional amendment.

## Decision and override records

Every material prioritization decision should eventually record:

- the eligible decision class
- the current authority holder
- evidence considered
- community signals considered
- priority-policy revision and result
- conflicts and recusals
- the decision and rationale
- any override of the computed order
- capacity or budget committed
- implementation and validation owners
- appeal path
- review or expiration date
- measured outcome

An override is permitted when accountable judgment is required, but it must not be silent. Overrides should be categorized so the project can identify whether the priority model is incomplete, routinely manipulated, or being ignored.

## Contribution and incentive integration

The feedback loop creates legitimate Fellowship contributions when value is validated.

Examples include:

- reporting a distinct, reproducible public-safe issue
- confirming or disproving a report
- identifying a duplicate and preserving linked evidence
- improving a problem statement or acceptance criteria
- supplying qualified domain review through the proper channel
- designing an accessible solution
- implementing the change
- reviewing code, content, policy, or architecture
- testing the change with synthetic or personally safe conditions
- improving documentation or migration guidance
- measuring whether the change solved the stated problem
- correcting a mistaken priority assessment or governance decision

Rewards or reputation must be based on validated contribution, not raw activity.

The system must not reward:

- issue spam or duplicate flooding
- reaction volume or voting frequency by itself
- unnecessary intimate disclosure
- broader health-data consent
- manufactured urgency
- performative comments without evidence or value
- brigading, popularity, social reach, wealth, or donation size
- creating avoidable work and then claiming credit for resolving it

Fellowship is optional and must not gate the complete personal product. Fellowship, contribution credit, or reputation must not automatically become transferable property or universal governance power.

Contribution records should be attributable, reviewable, correctable, appealable, and scoped to the domain in which value was created. Credit may decay or be superseded when evidence changes; institutional memory should not be erased.

## Abuse, capture, and failure modes

The architecture must model at least:

- spam and duplicate flooding
- coordinated brigading
- sockpuppet or duplicate identities
- popularity contests that suppress minority harms
- contributor oligarchy
- expert capture
- maintainer entrenchment
- donor or capital influence
- urgency inflation
- solution-first lobbying that obscures the actual problem
- issue closure used to hide unresolved friction
- public pressure to expose private evidence
- AI-generated issue volume and synthetic consensus
- bounties that incentivize vulnerability creation or low-quality work
- strategic under-reporting of maintenance, safety, and accessibility work
- permanent accumulation of reputation or delegation

Controls may include rate limits, duplicate linking, evidence thresholds, typed signals, scoped reputation, conflict disclosure, recusal, delegation caps, audits, appeals, decay, random review, participant sampling, private escalation, and public concentration reports.

No anti-abuse mechanism may require public disclosure of health information or unnecessary identity data.

## Logical architecture

Future implementation should preserve separable components rather than embedding the entire loop in GitHub-specific UI.

### Feedback Intake

Accepts public-safe feedback and future in-product submissions. Performs consent, minimization, classification, and routing before publication.

### Public Work Ledger Adapter

Creates and links canonical GitHub issues, comments, labels, pull requests, releases, and public decision records. GitHub is the current adapter, not the permanent domain model.

### Triage and Evidence Service

Maintains classification, duplicates, dependencies, evidence, affectedness, risk, and specialist-review state.

### Signal Registry

Stores typed, purpose-specific signals with privacy-preserving identity and anti-abuse controls appropriate to the phase.

### Priority Policy Engine

Applies deterministic, versioned policy and emits inspectable assessments. It does not silently decide authority.

### Governance Gate

Determines which authority may decide each class at the current phase and enforces quorum, conflict, review, appeal, emergency, sunset, and rollback rules.

### Contribution Ledger

Records validated contributions and disputes without converting raw activity into permanent privilege.

### Outcome Evaluator

Links releases and institutional changes to acceptance evidence, participant validation, measured outcomes, regressions, reopening, and policy learning.

These components may begin as manual repository processes and structured documents. Service, schema, queue, database, identity, and provider choices remain future implementation decisions.

## Minimum viable validation

Before automation or binding governance, the repository should validate the cheapest objective boundaries.

### Intake and issue validation

- required problem and desired-outcome fields are present
- the reporter certifies public or synthetic information only
- the affected area is identified
- privacy, security, conduct, and person-specific health matters are directed away from public issues
- the proposal identifies relevant constitutional or safety boundaries when known
- acceptance evidence can be stated without production data

### Governance validation

- every prioritized item names a decision class
- every automated assessment names a policy revision
- every override names an authority and rationale
- safety and constitutional review cannot be bypassed by score or vote
- delegated decisions remain within chartered scope and capacity
- conflicts and recusals are recorded where required
- closed items include a closure reason

### Execution and outcome validation

- committed work links to implementation
- implementation links to tests, review, or other acceptance evidence
- release or publication status is explicit
- reporter or participant validation is invited when safe
- regressions can reopen or roll back the item
- outcome review distinguishes delivery from problem resolution

### Synthetic governance fixtures

Future tests should include synthetic backlogs covering:

- a popular cosmetic request versus a low-volume accessibility blocker
- a severe security report that must remain private
- duplicate reports from several participants
- a high-impact item with weak evidence
- a low-effort, high-leverage documentation correction
- a donor-favored proposal with weak mission alignment
- a contributor-favored refactor with no near-term player value
- an urgent legal obligation
- a brigaded issue
- a maintainer override that is justified and one that should fail review
- an item that ships but does not improve the stated outcome

## Metrics and public learning

The project should measure the health of the loop without optimizing for raw engagement.

Useful measures may include:

- time to safe routing and initial triage
- percentage of items with clear decision class and public rationale
- duplicate-linking quality
- evidence-confirmation rate
- accessibility and minority-impact representation
- time from validation to decision
- time from commitment to release
- percentage of released changes with outcome review
- reporter or validator confirmation rate
- reopen and rollback rate
- distribution of contributors, validators, and decision authority
- priority overrides by category and authority
- percentage of roadmap capacity governed through bounded community processes
- unresolved high-severity maintenance and safety work
- privacy, security, conduct, and publication incidents caused by intake

Issue volume, reaction totals, comments, time-on-platform, and nominal voter count are not sufficient success measures.

## Implementation sequence

### Step 0 — Repository baseline

- accept Decision 0006
- publish this architecture
- strengthen the public issue template
- cross-link governance, roadmap, contributor, status, and README surfaces

### Step 1 — Manual operating protocol

- define labels, decision classes, closure reasons, evidence states, and triage ownership
- publish a maintainer prioritization cadence and rationale format
- record typed signals manually where they can be verified
- create safe private escalation paths before public product use

### Step 2 — Product intake and advisory assessment

- implement in-product public-safe intake and private routing
- add duplicate suggestions and issue linking
- implement a versioned advisory priority policy against synthetic fixtures
- publish decision and override records

### Step 3 — Bounded delegated pilots

- charter player, contributor, or specialist participation for low-risk domains
- allocate a defined, reversible portion of capacity
- test quorum, delegation, conflicts, appeals, and capture controls
- publish results and rollback conditions

### Step 4 — Binding community capacity

- unlock only after the applicable institutional gates are met
- preserve executive, maintenance, safety, and constitutional reserves
- audit concentration, comprehension, outcomes, and minority protection

## Explicitly unresolved

The following require later evidence and decisions:

- exact issue taxonomy and label names
- signal storage and identity model
- affectedness verification
- anti-Sybil controls
- priority scales, weights, thresholds, and tie-breakers
- voting, delegation, quorum, and conviction mechanics
- council composition and selection
- percentage of community-controlled roadmap capacity
- reputation scope, decay, portability, and appeal
- compensation or bounty programs
- integration between GitHub and the product
- private-support, security, conduct, and clinical escalation systems
- data retention and deletion for non-public intake
- analytics and public dashboard implementation

These mechanisms should remain unresolved until they can be tested without weakening the frozen product promise, public-information boundary, deterministic incentive contract, or progressive-decentralization gates.

## Success condition

The loop is working when:

- people can express legitimate friction without exposing private information
- the public can see how issues become evidence, decisions, work, releases, and outcomes
- community input increasingly controls appropriate decisions as capacity matures
- safety and minority rights survive popularity pressure
- contributors are rewarded for validated value rather than volume
- maintainers remain accountable and replaceable
- the product measurably improves
- every cycle increases both product utility and institutional capacity

The support surface then becomes more than support. It becomes the earliest operating layer of a self-correcting, progressively governed institution.
