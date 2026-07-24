# Manual Feedback Triage Operating Protocol — BASELINE

**Decision basis:** Decision 0006  
**Architecture basis:** `docs/governance/feedback-to-governed-work.md`  
**Information boundary:** `docs/policies/publication-and-confidentiality.md`  
**Current institutional phase:** Phase 0 — maintainer-led, advisory community input

## Purpose

This protocol implements Step 1 of the feedback-to-governed-work loop as a manual, inspectable repository process.

It defines:

- the public work-item taxonomy
- label families and application rules
- current triage ownership
- evidence states
- decision classes
- typed-signal recording
- prioritization cadence and rationale requirements
- closure and reopening reasons
- safe private-routing rules
- review, appeal, and correction behavior

The protocol does not implement a support service, product database, identity system, voting system, priority formula, reputation system, or automated governance mechanism.

## Sprint 3 and PR #14 boundary

This protocol is operational governance for public issues. It does not define or modify the Living Chronicle data model being developed in PR #14.

The following remain exclusively inside the Sprint 3 workstream unless separately reconciled:

- Chronicle identity, authority, truth classes, records, assertions, and payloads
- variables, values, categories, units, and normalization
- time representation
- source artifacts, provenance, correction, conflict, and supersession
- documents, attachments, exports, deletion, retention exceptions, and tombstones
- `@calypsos-promise/health-schema`
- TypeScript, JSON Schema, validators, fixtures, and invariant tests for the Chronicle contract

This protocol may classify a public-safe issue as affecting the Living Chronicle. Classification does not define schema semantics, alter Sprint 3 acceptance criteria, or authorize implementation against PR #14.

No file in PR #14's current change set is modified by this protocol.

## Governing rules

1. GitHub is a public work ledger, not a private support system.
2. Only PUBLIC or synthetic information belongs in public issues.
3. The problem must remain distinguishable from the proposed solution.
4. Triage records reported impact separately from verified impact.
5. Minority, accessibility, and low-frequency harms must not disappear behind popularity counts.
6. Current community signals are advisory and may not bypass accountable authority.
7. Safety, rights, and constitutional duties take precedence over ordinary roadmap ordering.
8. Closing an issue is not evidence that the underlying problem was solved.
9. Material decisions, deferrals, declines, overrides, and closures require a reason.
10. Contribution credit follows validated value, not issue, comment, reaction, or vote volume.

## Current roles and authority

### Reporter

The reporter describes a public-safe problem or desired outcome and may provide synthetic reproduction evidence.

A reporter is not required to:

- propose a solution
- disclose health status or disability
- identify an account
- expose private correspondence
- prove identity beyond the current public GitHub context
- consent to research, commercial use, or broader data collection

### Triage steward

During Phase 0, a maintainer acts as triage steward.

The triage steward may:

- verify public-information eligibility
- request a safer or clearer reproduction
- normalize the problem statement
- identify duplicates and dependencies
- apply the label registry
- record evidence and typed signals
- route the item to the correct decision authority
- close an item with a documented resolution reason

The triage steward may not:

- solicit protected personal information
- publish private evidence
- represent a report as independently verified without evidence
- convert reactions into verified affectedness or votes
- bypass specialist or constitutional review
- award authoritative Fellowship credit solely from activity

### Decision authority

The current decision authority follows `GOVERNANCE.md`.

- Constitutional decisions require the accepted constitutional process.
- Safety and rights decisions require the relevant accountable and specialist review.
- Strategic and economic decisions require the authority defined for their risk and scope.
- Technical and operational decisions may be handled by accountable maintainers within approved boundaries.
- Community and cultural decisions are early candidates for bounded participation but remain maintainer-led in Phase 0.

A triage steward classifies and routes a work item. Triage does not itself expand the steward's decision authority.

### Specialist reviewer

A qualified reviewer evaluates claims and risks within a bounded domain such as security, privacy, health safety, accessibility, legal, research, economics, or canon.

Specialist review does not create universal authority. The absence of a qualified reviewer remains an unresolved gate and may block commitment or release.

### Implementation owner

The implementation owner accepts responsibility for a committed change and links the issue to the relevant pull request, documentation change, release, or operational record.

### Validator

A validator tests whether the delivered change satisfies the stated acceptance evidence. The reporter may validate when safe, but reporter validation is not the only acceptable evidence.

## Manual operating cadence

These are operating targets, not customer-support, security-response, or safety guarantees.

### Intake sweep

When untriaged public issues exist, maintainers should perform an intake sweep at least weekly.

The sweep checks:

- public-information safety
- obvious duplicates
- required issue fields
- initial type and area
- urgent private-routing needs
- the next evidence request or decision owner

### Priority review

Maintainers should review validated candidates at least every two weeks while an active public backlog exists, or before making a sprint, release, or material roadmap commitment.

The review may commit, defer, decline, escalate, or retain an item as a candidate. It does not require a numeric score while the deterministic priority policy remains unselected.

### Backlog health review

At least monthly while the backlog is active, maintainers should inspect:

- untriaged items
- items waiting on evidence without a clear request
- stalled committed work
- accessibility, safety, maintenance, and minority-impact items
- duplicate clusters
- unresolved specialist gates
- items released without outcome review
- closure reasons and reopening patterns

### Outcome review

A released or published item should enter outcome review when meaningful evidence can be collected.

The review timing depends on the change. A documentation fix may be reviewed immediately; retention, reliability, or behavior changes may need a longer evidence window.

### Governance learning review

The project should periodically review whether the taxonomy, cadence, authority, and rationale process are producing understandable and useful decisions. During low issue volume, this may occur at a phase or sprint review rather than on a fixed quarterly schedule.

## Label-system rules

The canonical label registry is `docs/governance/feedback-label-registry.yml`.

Labels use prefixed families so their meaning remains legible without color.

### Required label families

A triaged public work item should normally have:

- one `type:` label
- one or more `area:` labels
- one `state:` label
- one `evidence:` label
- one `decision:` label
- zero or more `review:` labels
- exactly one `resolution:` label when closed

### Mutual-exclusion rules

- `type:` is the primary work kind. Select one.
- `state:` represents the current lifecycle state. Select one.
- `evidence:` represents the current evidence posture. Select one primary state.
- `decision:` represents the governing decision class. Select one.
- `resolution:` is applied only at closure. Select one.
- Multiple `area:` and `review:` labels are allowed when the work is genuinely cross-cutting.

### No priority-number labels yet

`P0`, `P1`, numeric scores, and ranked priority labels are not part of this baseline.

The exact priority formula, scales, weights, thresholds, and tie-breakers remain unresolved. Urgent safety and rights work is handled through the precedence rules and a public-safe rationale, not through an unreviewed pseudo-score.

### Label changes are records

A material label change should be understandable from the issue history or a triage comment. Maintainers should not silently relabel an item to obscure prior evidence, risk, or commitment.

## Type taxonomy

### `type:defect`

Observed behavior differs from the intended or documented behavior.

### `type:feature`

A new capability or materially expanded outcome is proposed.

### `type:accessibility`

The primary problem is an accessibility barrier or exclusion risk.

Accessibility may also be represented through `review:accessibility` on another type.

### `type:documentation`

The primary outcome concerns documentation, explanation, examples, onboarding, or contributor guidance.

### `type:content`

The primary outcome concerns lore, narrative, quests, education, copy, or governed content.

### `type:governance`

The primary outcome concerns authority, policy, institutional process, transparency, accountability, or participation.

### `type:performance`

The primary outcome concerns speed, reliability, resource use, or operational quality.

### `type:maintenance`

The work preserves correctness, security, portability, dependencies, tooling, or long-term operability without introducing a new product outcome.

### `type:question`

The submission seeks clarification and may become documentation, defect, feature, or governance work after triage.

## Area taxonomy

Area labels identify affected surfaces and domains. They do not assign decision authority by themselves.

- `area:website`
- `area:game`
- `area:living-chronicle`
- `area:aster-ai`
- `area:mcp-agents`
- `area:privacy-consent`
- `area:security`
- `area:lore-content`
- `area:open-source`
- `area:accessibility`
- `area:governance-community`
- `area:research-deferred`
- `area:cross-cutting`

An item labeled `area:living-chronicle` may require coordination with Sprint 3, but the label does not modify PR #14 or its contracts.

## Lifecycle states

### `state:needs-triage`

The item has not completed public-safety review, normalization, duplicate review, and initial classification.

### `state:needs-evidence`

The problem is plausible but requires clearer reproduction, affectedness, source quality, feasibility, or acceptance evidence.

### `state:validated`

Sufficient evidence exists for accountable prioritization. Validation does not guarantee commitment.

### `state:prioritized`

A named authority has completed the current manual priority review and recorded a rationale. This label does not imply a numeric score.

### `state:committed`

The item has been accepted into a sprint, release, roadmap allocation, or other bounded work commitment with an owner or explicit ownership gap.

### `state:in-progress`

Linked implementation, documentation, design, research, or operational work is underway.

### `state:needs-validation`

A proposed resolution exists and requires testing, review, reporter confirmation, or other acceptance evidence.

### `state:released`

The change is available on the relevant public or product surface. Release does not prove outcome resolution.

### `state:outcome-review`

The project is evaluating whether the released change solved the stated problem without unacceptable regressions.

### `state:blocked`

Progress depends on an unresolved dependency, authority, specialist review, capacity, external condition, or safety gate. The blocker must be stated.

## Evidence states

### `evidence:reported`

The work item contains a plausible report or proposal but has not been independently reproduced or confirmed.

### `evidence:reproduced`

The behavior or problem has been reproduced using public or synthetic evidence.

### `evidence:independently-confirmed`

A second participant, maintainer, test, source, or other independent method confirms the problem or material impact.

### `evidence:specialist-reviewed`

A qualified reviewer has evaluated the relevant claim or risk within their domain.

### `evidence:contested`

Material evidence conflicts. The issue must preserve the competing evidence and uncertainty.

### `evidence:insufficient`

The available evidence is not currently sufficient to validate the item. This is not the same as proving the report false.

## Decision classes

Decision labels implement the classes already defined in `GOVERNANCE.md`.

### `decision:constitutional`

Mission, player rights, frozen commitments, governance structure, founder-reserved powers, data-control guarantees, or institutional continuity.

### `decision:safety-rights`

Privacy, consent, security, health safety, accessibility, research safeguards, due process, and other protected rights or duties.

### `decision:strategic-economic`

Roadmap strategy, major partnerships, funding, treasury direction, compensation frameworks, or material economic choices.

### `decision:technical-operational`

Implementation details, routine releases, maintenance, tooling, and operations within accepted boundaries.

### `decision:community-cultural`

Contributor programs, community process, moderation norms, events, grants, and non-frozen cultural or content decisions.

## Review flags

Review labels identify required bounded review. They do not imply approval.

- `review:security`
- `review:privacy`
- `review:health-safety`
- `review:accessibility`
- `review:legal`
- `review:canon`
- `review:research`
- `review:economic`
- `review:conduct-private`

A public issue with `review:conduct-private` must contain only a safe institutional derivative. Conduct evidence remains private.

## Triage procedure

### 1. Check public eligibility

Before substantive triage, confirm that the title, text, links, screenshots, attachments, metadata, and comments contain only PUBLIC or synthetic information.

When protected information appears:

1. stop repeating or quoting it
2. restrict or remove it where authorized
3. route the matter through the appropriate private policy
4. preserve only minimum necessary private evidence
5. publish a safe derivative or incident record when appropriate

### 2. Separate the problem from the solution

Restate:

- the observed or anticipated problem
- the affected surface and participant
- the desired outcome
- the proposed solution, if any

A proposed implementation may be rejected while the underlying problem remains valid.

### 3. Search for duplicates and dependencies

Link the canonical item and preserve the reporter's contribution and typed signal.

Duplicate closure must not imply that the report was unhelpful or false.

### 4. Apply the taxonomy

Apply type, area, state, evidence, decision, and review labels using the registry.

### 5. Identify the next evidence

State the smallest safe evidence needed to advance the item, such as:

- synthetic reproduction steps
- a failing test or fixture
- a public source
- an accessibility review
- a second independent confirmation
- a bounded specialist assessment
- acceptance criteria
- dependency resolution

### 6. Record constitutional and safety boundaries

Identify relevant player rights, refusal behavior, privacy, consent, health-safety, accessibility, security, canon, AI, public-information, or governance constraints.

### 7. Record the next action and owner

Every triage record should state:

- next lifecycle state
- next evidence or decision
- current accountable role
- blocker, if any
- next review point

An unassigned owner must be visible as an ownership gap rather than implied ownership.

## Manual typed-signal record

Typed signals are recorded through a structured maintainer comment using the template in `docs/governance/feedback-record-templates.md`.

The current signal types are:

- affected
- reproduced or confirmed
- priority preference
- can validate
- can contribute
- domain evidence
- dependency

### Signal rules

- Signals are advisory during Phase 0.
- One participant may express more than one signal type when each is true.
- Repeated reactions or comments from the same participant do not multiply the signal.
- GitHub account count is not verified unique-person count.
- No current anti-Sybil claim is made.
- Affectedness may be expressed without health or disability details.
- Domain evidence requires the evidence or bounded review path, not a self-declared title alone.
- Private evidence is summarized only through an approved safe derivative.
- The signal record must state its method and limitations.

Raw reactions may be noted separately as discovery activity but must not be merged into typed-signal totals.

## Manual prioritization record

Until a deterministic priority policy is tested and accepted, maintainers use a structured qualitative record rather than a hidden intuition or false-precision score.

The record must address:

- affectedness and reach
- severity and urgency
- evidence confidence
- mission and connected-loop alignment
- rights, safety, accessibility, and equity
- longitudinal or architectural leverage
- contributor readiness
- effort, dependencies, maintenance cost, and systemic risk
- specialist constraints
- current capacity

The decision must identify one of these outcomes:

- commit
- retain as a candidate
- request evidence
- defer with a review condition
- decline with a reason
- escalate to another authority or private process

The record must identify the decision authority and next review point. A material change from an earlier commitment or ordering must be explained.

## Closure reasons

Every closed item receives one resolution label and a closure record.

### `resolution:completed`

The accepted outcome was delivered and linked to validation or outcome evidence.

### `resolution:duplicate`

Another canonical item tracks the same underlying problem. The duplicate must link to it and preserve the reporter's signal.

### `resolution:declined`

The responsible authority considered the item and chose not to pursue it. The rationale and applicable review condition must be stated.

### `resolution:superseded`

A newer decision, design, or work item replaces this one.

### `resolution:invalid`

The claim or proposal conflicts with verified evidence, accepted constraints, or an authoritative record. Evidence must be cited.

### `resolution:out-of-scope`

The item does not belong in the current project, repository, phase, or public work system. A safe route should be provided when one exists.

### `resolution:unable-to-reproduce`

Reasonable public-safe attempts did not reproduce the issue and no sufficient evidence remains. This does not assert that the reporter acted in bad faith.

### `resolution:withdrawn`

The reporter or proposing authority withdraws the request. Institutional evidence may remain in the public record.

## Reopening and rollback

A closed item may be reopened when:

- the problem persists
- new evidence changes the assessment
- the linked change regresses
- the implementation solves a different problem
- the closure reason was inaccurate
- the governing decision is corrected or superseded
- a safety, rights, or accessibility impact was missed

A released change may require rollback when continued operation creates unacceptable harm, constitutional conflict, or material regression.

Reopening and rollback are correction mechanisms, not failures of loyalty or consensus.

## Safe private routing

The current public repository does not provide general private product support and the product has no production account system.

### Security, privacy incidents, and accidental disclosure

Follow `SECURITY.md`. Do not open a public issue containing vulnerability details, credentials, private records, authorization bypasses, or exposed information.

### Conduct concerns

Follow the private maintainer route in `CODE_OF_CONDUCT.md`. Public issues must not contain complaint evidence, witness statements, or unnecessary identities.

### Person-specific health or account matters

No live account or health-support channel currently exists. Do not submit personal health information, records, symptoms, identity documents, or account details.

A generic public-safe product or accessibility problem may be submitted without personal details. A matter that cannot be separated from protected information must wait for an approved private intake path.

### Legal, partner, personnel, or protected institutional matters

Route privately to the responsible maintainer or authority. Publish only a reviewed, minimized institutional derivative when required for accountability.

### Pre-launch private-intake gate

Before public product use, the project must establish and document private intake for at least:

- account and identity support
- privacy requests and accidental disclosure
- security reports
- conduct concerns
- person-specific health-safety escalation
- correction and rights complaints

Each path must define purpose, access, retention, escalation, response ownership, safe public derivatives, and incident behavior.

## Appeals and correction

A participant may challenge public-safe triage, classification, evidence, priority, closure, or contribution-credit decisions in the issue or linked pull request.

The appeal should state:

- the disputed record
- the new or overlooked evidence
- the requested correction
- any conflict or recusal concern

Protected appeal evidence uses the appropriate private path. The public record should note that an appeal exists, the authority handling it, and the safe outcome when possible.

No maintainer is exempt from correction, recusal, or review.

## Contribution credit

Triage participation may qualify for scoped Fellowship credit only after validation under the incentive model.

Potential contributions include:

- a distinct public-safe report
- reproduction or disproof
- duplicate consolidation
- problem-statement or acceptance-criteria improvement
- accessible design
- bounded specialist review
- implementation, testing, documentation, or outcome measurement
- correction of a mistaken decision

The issue history or contribution record must identify the evidence and validating authority.

The following do not independently qualify:

- issue count
- comment count
- reaction count
- repeated preference signals
- unsupported urgency
- unnecessary disclosure
- donation, wealth, or social reach
- avoidable work created by the claimant

## Minimum viable audit

A backlog audit should be able to answer:

- Which items have not completed triage?
- Which items contain unresolved public-information risk?
- Which items lack a decision class?
- Which validated items lack a prioritization rationale?
- Which committed items lack an owner or implementation link?
- Which released items lack outcome review?
- Which closed items lack a resolution label and closure record?
- Which items require a private or specialist path?
- Which decisions changed without an explanation?
- Which contributors received credit without validation evidence?
- Which areas, participants, or minority harms are systematically missing?

## Change control

Routine clarifications to examples, label descriptions, and templates may be made through pull-request review.

Material changes require a decision record when they alter:

- decision classes or authority
- the public/private information boundary
- safety or constitutional precedence
- binding participation or voting
- contribution-credit rights
- appeal, removal, or rollback protections
- the progressive authority-transfer path

## Success condition

The manual protocol is working when a public-safe issue can be traced from submission through classification, evidence, accountable decision, implementation, validation, outcome, closure, correction, or reopening without exposing protected information or pretending that popularity is governance.
