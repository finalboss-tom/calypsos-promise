# House of Keys Permission Explanation and Comprehension Model

**Status:** PROPOSED Sprint 4 conceptual baseline  
**Workstream:** 4.7 — Permission explanations and comprehension evidence  
**Tracking issue:** #32

## Purpose

This model defines how a House of Keys permission proposal is explained, how comprehension evidence is collected without coercion, and how narrative and direct presentation remain semantically equivalent.

A person must be able to understand who is asking, who would receive or perform the operation, why it is requested, what information and actions are involved, how long authority lasts, how refusal and revocation work, what consequences follow, and what remains uncertain before confirming a grant.

Explanation and comprehension evidence do not create permission by themselves. Explicit granting-authority confirmation, an applicable grant, and a later deterministic policy decision remain separate requirements.

## Governing rules

This model implements and may not weaken:

- the frozen Product Constitution
- the frozen Architecture Foundation
- the controlled vocabulary and deterministic incentive contract
- the Sprint 3 separation among Chronicle, source, derived, interpretive, permission, product-state, and AI-memory truth
- the House of Keys ontology
- the purpose and data-category taxonomies
- the grant, recipient, action, scope, and duration model
- the revocation and lifecycle model
- the access receipt and audit boundary
- the Institutional Immune System
- the repository and module-boundary rules

The direct explanation is authoritative for meaning. Narrative may make a Key memorable, but it may not hide, soften, combine, omit, or broaden the real permission request.

## Explanation truth

Explanation truth answers:

> What exact meaning, choices, exclusions, consequences, and uncertainties were presented for a defined permission proposal under a stated content revision and presentation context?

Explanation truth does not answer:

- whether the person understood every consequence
- whether the person confirmed the grant
- whether the grant is legally valid
- whether an operation was later allowed or performed
- whether a recipient complied
- whether a Chronicle assertion is true
- whether the explanation is universally accessible or understandable

Those claims belong to separate comprehension, confirmation, policy, execution, receipt, Chronicle, accessibility-review, and specialist-review records.

## Explanation snapshot

Every grant proposal that may be confirmed should reference an immutable explanation snapshot.

The snapshot should contain:

- stable namespaced explanation identity
- independent House of Keys contract version and explanation revision
- grant proposal identity and revision
- purpose identity, revision, public name, intended outcome, and excluded uses
- primary recipient identity, revision, direct name, and relevant exclusions
- requester and performing-actor description where materially different from the recipient
- selected data-category identities, revisions, included content, and material exclusions
- summarized narrowing selectors and exact-resource references
- selected action identities, revisions, and plain-language effects
- duration shape, start, expiry, review, use-count, or session boundary
- conditions and safeguards
- whether the use is essential, optional, secondary public-good, compensated, commercial, or an unresolved hold point
- the direct consequence of confirming
- the direct consequence of refusing, deferring, or revoking
- whether information may be transmitted or leave the personal boundary
- known downstream, retention, deletion, propagation, or recipient-acknowledgment limits
- uncertainty, unresolved facts, and specialist hold points
- AI, automation, or MCP role and its authority limits
- confirmation and revocation paths
- challenge, correction, appeal, and support paths
- direct-language content
- optional narrative content
- locale and translation revision
- presentation-order contract
- accessibility variants and non-AI fallback references
- author, reviewing authority, evidence, effective time, and review time

The snapshot must remain JSON-serializable and independent of a UI framework, provider SDK, database object, authenticated session, or model response.

## Layered explanation contract

A presentation may use layers, but layering must never make material facts harder to find.

### Layer 1 — Decision summary

The first layer states, in direct language:

- what is being requested
- who would receive or perform it
- why it is requested
- whether it is optional
- what happens if the person declines
- when the authority ends or must be reviewed
- how to inspect or revoke it

No confirmation control should appear before this summary is available.

### Layer 2 — Scope and safeguards

The second layer states:

- every selected data category
- exact resource, subject, variable, document, source, or time narrowing where applicable
- every selected action
- conditions and prohibited uses
- whether raw source content, derived calculations, associations, inferences, permission records, or external transmission are included
- recipient, processor, and downstream boundaries
- material retention and deletion limits

### Layer 3 — Evidence and history

The third layer provides:

- purpose, category, recipient, action, grant, and policy revisions
- explanation authorship and review information
- unresolved questions and uncertainty
- compatibility or migration evidence
- related prior grants, refusals, withdrawals, or successor proposals where relevant
- the future receipt and challenge path

Layer 3 may be more technical, but it cannot contradict or materially qualify facts omitted from Layers 1 and 2.

## Direct and narrative parity

Narrative and direct modes are two presentations of one permission proposal.

Parity requires:

1. Both modes reference the same explanation snapshot and grant proposal revision.
2. Both name the same purpose, recipient, categories, actions, duration, conditions, optionality, consequences, and exclusions.
3. Narrative terminology has an immediately available direct translation.
4. A narrative metaphor cannot imply broader trust, permanence, safety, destiny, loyalty, or obligation than the direct contract.
5. A person may switch to direct mode without losing context or progress.
6. Direct mode must not be hidden behind story completion, progression, payment, AI interaction, or repeated prompts.
7. A material mismatch blocks confirmation until corrected and re-presented.

Examples of invalid narrative substitution include:

- presenting a broad external recipient as a trusted island ally
- describing indefinite access as carrying a Key until the journey ends
- representing research participation as helping restore Ogygia without naming the study-specific purpose and recipient
- implying that refusal harms Aster, the community, the island, progression, or personal health
- presenting a commercial request as a gift, quest, oath, or destiny without direct disclosure

## Explanation quality requirements

Every explanation must:

- use concrete verbs and bounded nouns
- distinguish requester, recipient, performing actor, processor, and receipt issuer where relevant
- distinguish structured Chronicle records from raw sources, derived calculations, associations, inferences, and AI memory
- state every selected action rather than use “access” as an undefined umbrella
- state the grant duration separately from the time represented by the selected data
- state whether information leaves the personal boundary
- state materially different excluded uses
- state what refusal, deferral, expiry, and revocation do
- state what revocation does not do, including the limits of retroactive erasure and downstream deletion
- preserve uncertainty and unresolved propagation or retention facts
- avoid guaranteed-benefit, legal-validity, clinical-safety, anonymity, deletion, or recipient-compliance claims not supported by evidence

An explanation must not:

- use “agree,” “continue,” “accept all,” or account creation as a substitute for an explicit grant confirmation
- use preselected optional secondary-use choices
- combine essential personal use with optional research, commerce, compensation, advertising, training, or public visibility
- use shame, fear, fake urgency, scarcity, streak loss, social pressure, or loyalty framing
- imply that broader or longer permission improves rewards, progression, service quality, trust, status, or governance standing
- hide a material exclusion, uncertainty, recipient class, downstream party, retention limit, or AI role in an expandable section while presenting a simplified contrary summary
- infer comprehension from scrolling, dwell time, continued use, a click, account age, payment, prior disclosure, or repeated engagement

## Accessibility and assistance boundary

Permission explanation must support direct participation across physical ability, health status, wealth, language, literacy, cognition, and technical sophistication.

The baseline requires:

- semantic structure suitable for assistive technology
- keyboard and non-pointer operation
- text alternatives for non-text content
- readable zoom and reflow
- reduced-motion and non-animated presentation
- no time-limited confirmation without a separately justified safety need and an accessible extension path
- plain-language mode
- non-narrative direct mode
- non-AI explanation fallback
- repeat, pause, defer, and return behavior without punishment
- support for human assistance without transferring granting authority
- versioned translation with the same material meaning
- a way to report that the explanation is inaccessible or unclear

Assistance may include a screen reader, translation, caregiver reading support, a qualified human explainer, or an AI-generated explanation. Assistance does not transfer authority. The canonical explanation snapshot remains authoritative over summaries or paraphrases.

The model does not claim conformance to a specific accessibility standard. Specialist accessibility review and measurable implementation testing remain explicit hold points.

## Comprehension evidence

Comprehension evidence records what the system asked, how the person responded, what assistance was used, and whether the accepted evidence rule was satisfied for the proposal.

It is not:

- an intelligence, literacy, health, loyalty, risk, or engagement score
- proof of perfect understanding
- proof of legal consent
- a reason to deny unrelated core rights
- a source of progression, compensation, governance weight, or recipient trust
- permission to retain free-text answers indefinitely

### Required comprehension-evidence record

A comprehension-evidence record should contain:

- stable namespaced evidence identity
- House of Keys contract version and evidence revision
- grant proposal and explanation snapshot identities and revisions
- granting-authority identity
- evidence-rule identity and revision
- required concept identifiers
- prompt identities and revisions
- response kinds and normalized outcomes
- assistance and accessibility modes used, with minimization
- started, completed, deferred, and recorded times
- evidence status
- concepts understood, misunderstood, unanswered, disputed, or not assessable
- re-explanation references
- confirmation eligibility result
- uncertainty and unresolved accessibility or translation concerns
- supersession and invalidation references
- retention and minimization classification
- challenge, correction, and support path

Free-text responses are optional and should not be required when structured or assisted alternatives can provide sufficient evidence. The record should preserve only what is necessary to explain the evidence result.

### Evidence statuses

The initial statuses are:

- `not-started` — no evidence attempt exists
- `in-progress` — the person is reviewing or responding
- `satisfied` — the accepted rule was met for the referenced explanation and proposal revisions
- `not-satisfied` — one or more required concepts remain materially misunderstood or unanswered
- `deferred` — the person chose to decide later
- `declined` — the person declined the permission proposal
- `inaccessible` — the available presentation or response mode was not usable
- `indeterminate` — evidence is missing, conflicting, stale, unsupported, or cannot be evaluated safely
- `invalidated` — the evidence relied on an incorrect, misleading, mismatched, or superseded explanation or rule

Only current `satisfied` evidence may satisfy a policy requirement for comprehension. It still does not activate a grant without explicit confirmation.

## Required concepts

A comprehension rule selects concepts in proportion to the request’s consequence. The baseline concept catalogue includes:

- `concept.purpose` — why the operation is requested
- `concept.recipient` — who receives or primarily benefits from the information
- `concept.performing-actor` — who performs the operation when different
- `concept.data-scope` — what information is included and excluded
- `concept.actions` — what operations are allowed
- `concept.duration` — when and how often authority may be used
- `concept.optional` — whether refusal affects core rights or service
- `concept.revocation` — how future authority may be withdrawn
- `concept.revocation-limits` — what revocation does not erase or guarantee
- `concept.transmission` — whether information leaves the personal boundary
- `concept.secondary-use` — whether the use is research, compensated, or commercial
- `concept.downstream` — known or unresolved onward-use boundaries
- `concept.retention-deletion` — known retention and deletion behavior
- `concept.uncertainty` — material facts that remain unknown or unresolved
- `concept.ai-role` — what AI or automation may and may not do

A rule cannot replace these bounded concepts with one vague “Do you understand?” confirmation.

## Evidence methods

Comprehension evidence may use one or more accessible methods:

### Structured recognition

The person identifies the correct purpose, recipient, scope, action, duration, or refusal consequence from a small set of direct alternatives.

Alternatives must not use trick wording, double negatives, intentionally similar distractors, or pressure to guess.

### Teach-back selection

The person selects the statement that best describes the proposal in their own preferred mode. A structured option is preferred over collecting unnecessary free text.

### Person-directed recap

The person reviews a generated recap and marks specific facts as correct, unclear, or incorrect. Silence or a single undifferentiated “looks good” action is insufficient when material facts are required.

### Assisted explanation

A human or automated assistant explains the canonical snapshot. The evidence record identifies assistance without treating the assistant as granting authority or authoritative evaluator.

### Accessible alternative

The person uses a supported non-visual, non-auditory, non-pointer, translated, simplified, or extended-time method that tests the same concepts.

No evidence method may require unnecessary health disclosure, medical knowledge, memory of unrelated details, narrative knowledge, payment, progression, or agreement with the project’s goals.

## Evidence rule and proportionality

The evidence rule must be versioned and proportionate to consequence.

A low-consequence personal self-use request may require direct review and structured confirmation of purpose, scope, action, and duration.

A request involving external transmission, raw source content, inferences, a recipient class, longer duration, secondary use, compensation, commerce, model training, downstream use, or unresolved retention should require stronger evidence across the relevant concepts.

Proportionality must not become discriminatory complexity. Higher consequence justifies clearer evidence, not inaccessible tests, excessive burden, repeated harassment, or exclusion of people who need assistance.

## Failure, re-explanation, and retry behavior

When evidence is `not-satisfied`, `inaccessible`, or `indeterminate`:

- the grant remains non-applicable or pending confirmation
- the system identifies the specific unclear or mismatched concepts
- the person receives a direct re-explanation or accessible alternative
- prior answers are not presented as failure, low ability, or untrustworthiness
- retry is available without punishment or artificial scarcity
- the person may defer or decline at any time
- core rights and unrelated personal use remain available
- repeated prompts must stop after a meaningful decline or deferral until a legitimate new request context exists

A system must not reduce the number of required concepts merely to increase acceptance rates.

## Staleness and re-presentation

Comprehension evidence is bound to exact proposal, explanation, taxonomy, recipient, and rule revisions.

Fresh explanation and evidence are required after a material change to:

- purpose or intended outcome
- recipient, recipient class, processor, or downstream party
- included category or exact-resource scope
- action set
- duration, renewal, or use count
- conditions or safeguards
- optionality or refusal consequence
- transmission, retention, deletion, or downstream behavior
- compensation, research, commercial, advertising, profiling, or model-training involvement
- direct or narrative wording that changes material meaning
- translation or accessibility variant when equivalence is uncertain
- relevant uncertainty or specialist hold point

A later clarification may reuse evidence only when semantic equivalence is explicitly recorded and the evidence rule permits it. Broader authority always requires fresh explanation, evidence, and confirmation.

## Confirmation separation

The system must preserve separate records for:

1. grant proposal
2. explanation snapshot
3. presentation event
4. comprehension prompts and responses
5. comprehension-evidence result
6. granting-authority confirmation or decline
7. resulting lifecycle event
8. later policy request and decision
9. operation and receipt

Comprehension evidence cannot substitute for confirmation. Confirmation cannot retroactively repair missing or invalid comprehension evidence where the policy requires it.

The confirmation control must name the concrete action, such as “Confirm this Key” or “Allow this request,” rather than using ambiguous language such as “Continue” or “Done.” Decline, defer, direct-mode, and review-later controls must remain available with comparable prominence.

## Synthetic comprehension prototype

The initial prototype is a set of public, synthetic review scenarios rather than a production user interface.

### Prototype A — Personal export to self

The proposal requests preparation and delivery of selected Chronicle records to `recipient.person.self` for `purpose.personal.chronicle-portability` during one bounded export operation.

Required concepts:

- the exact categories and records selected
- export preparation versus delivery actions
- the delivery recipient
- single-use or fixed duration
- export does not authorize secondary use
- refusal leaves other core Chronicle rights intact

Expected result: confirmation eligibility only after the person correctly identifies the selected scope, recipient, actions, and duration.

### Prototype B — Optional public-good study

The proposal uses a synthetic named study purpose and recipient, selected leaf categories, a fixed duration, explicit transmission, no compensation, and no unrelated product effect.

Required concepts:

- study-specific purpose and recipient
- optional secondary use
- selected categories and exclusions
- transmission and known downstream limits
- duration and revocation behavior
- refusal does not affect personal utility, progression, dignity, or service quality

Expected result: a vague “help research” explanation, family-node purpose, broad recipient, or missing refusal consequence invalidates the evidence path.

### Prototype C — Overbroad commercial request

The proposal uses “improve our services,” “partners,” “all health data,” broad actions, and an indefinite duration.

Expected result: the explanation and grant are structurally invalid. Comprehension evidence cannot cure an invalid purpose, recipient, category, action, or duration.

### Prototype D — Narrative mismatch

The narrative calls the recipient a trusted ally and describes the duration as lasting through the journey, while the direct proposal names an external recipient and a one-year duration.

Expected result: parity failure blocks confirmation, invalidates any evidence collected from the misleading presentation, and requires correction and re-presentation.

### Prototype E — Accessible alternative

A person cannot use the default visual interaction and completes the same concept checks through a screen-reader-compatible, keyboard-only, extended-time direct mode.

Expected result: equivalent evidence is accepted without marking the person as lower confidence, higher risk, or less capable.

### Prototype F — Material change after evidence

After evidence is satisfied, the recipient, category set, duration, or downstream-use statement changes.

Expected result: prior evidence becomes stale for the changed proposal. New explanation, evidence, and confirmation are required.

### Prototype G — AI summary conflict

An AI summary claims that revocation deletes all copies, while the canonical explanation states that revocation blocks future authority but cannot guarantee downstream deletion.

Expected result: the canonical explanation controls, the AI summary is rejected or corrected, and no confirmation may rely on the conflicting summary.

These prototypes become structured fixtures and deterministic tests in workstreams 4.8 and 4.9.

## Inspectability, export, and deletion boundary

A person should be able to inspect:

- which explanation snapshot was presented
- which material concepts were required
- which evidence method and accessibility mode were used
- whether the result was satisfied, deferred, declined, inaccessible, indeterminate, or invalidated
- which concepts remained unclear or disputed
- whether later changes made the evidence stale
- which confirmation and grant revision followed
- how to challenge or correct the record

Comprehension evidence should be included in a usable permission-history export with minimization and omission reasons.

Deletion and retention of responses require explicit policy. The system should prefer structured outcomes and minimal references over retaining sensitive free text. Deleting or minimizing a response must not silently rewrite the historical fact that a particular evidence result was relied upon.

## AI and automated-system boundary

AI may:

- explain the canonical snapshot in a selected style or language
- identify terms that may be unclear
- propose accessible alternatives
- summarize the person’s permission history
- draft a challenge or correction request

AI may not:

- create or expand a grant
- decide that a person understood based on tone, behavior, demographics, health data, or model confidence
- infer confirmation from conversation
- lower or waive required concepts to increase acceptance
- hide uncertainty, exclusions, downstream limits, or refusal consequences
- claim legal validity
- score intelligence, literacy, trust, loyalty, health, or governance fitness
- become the sole explanation path

Deterministic evidence rules and the canonical structured records remain authoritative over model-generated summaries.

## Non-punitive comprehension behavior

The system must not:

- reward passing comprehension checks with progression, compensation, governance weight, or superior core service
- punish misunderstanding, accessibility needs, deferral, decline, or request for human help
- make harder evidence paths a prerequisite for unrelated core Chronicle rights
- use repeated failure as a health, risk, loyalty, fraud, or engagement signal
- expose individual responses to recipients without separate authority
- compare people publicly or rank them by comprehension evidence
- use evidence volume or success rate as a persuasive metric in the permission flow

Comprehension evidence exists to protect meaningful choice, not to optimize acceptance.

## Adversarial review cases

This model must support deterministic or reviewable evidence for:

- confirmation shown before the direct summary
- purpose, recipient, category, action, duration, or consequence omitted from the explanation
- material facts hidden behind narrative or progressive disclosure
- direct and narrative modes describing different authority
- optional secondary use framed as essential
- coercive, shaming, urgent, scarce, or progression-linked language
- acceptance inferred from clicks, dwell time, scrolling, account use, or prior disclosure
- one vague “Do you understand?” check
- trick questions or inaccessible response methods
- free-text health disclosure collected unnecessarily
- AI or human assistance treated as transferred authority
- comprehension scored from demographics, behavior, tone, or model confidence
- stale evidence reused after a material proposal change
- evidence marked satisfied despite a misunderstood required concept
- inaccessible presentation treated as decline or low ability
- repeated prompts defeating refusal or deferral
- confirmation treated as proof of comprehension
- comprehension evidence treated as legal-validity proof
- evidence success used for rewards, progression, compensation, or governance weight

These become contract fixtures and deterministic tests in workstreams 4.8 and 4.9.

## Initial unresolved register

- specialist accessibility and plain-language review
- localization governance and semantic-equivalence review
- exact evidence-rule catalogue by purpose, category, action, recipient, and consequence
- measurable thresholds for satisfactory evidence without creating discriminatory tests
- human-assistance identity, training, conflicts, and privacy
- production UI patterns and assistive-technology testing
- age, guardianship, supported decision-making, caregiver, dependent, and delegated-authority scenarios
- cognitive impairment, crisis, emergency, fatigue, and fluctuating-capacity behavior
- jurisdiction-specific consent and disclosure requirements
- exact retention and deletion rules for responses and assistance metadata
- notification and service-level expectations for invalid or inaccessible explanations
- independent usability testing with representative participants
- privacy, legal, accessibility, security, clinical, and research specialist approval

These are explicit hold points, not authority granted by omission.

## Success condition

The explanation and comprehension boundary is sound when a person can learn the exact permission meaning in direct and accessible language, use narrative only as an equivalent optional layer, demonstrate the required bounded concepts without coercion or unnecessary disclosure, defer or decline without punishment, receive re-explanation without stigma, and confirm only the proposal actually explained—while the system never treats comprehension evidence as permission, legal proof, intelligence, trust, or a reward mechanism.
