# House of Keys Purpose Taxonomy

**Status:** PROPOSED Sprint 4 conceptual baseline  
**Workstream:** 4.2 — Purpose taxonomy  
**Tracking issue:** #32

## Purpose

The purpose taxonomy defines why an actor requests authority over a bounded data scope or operation.

A purpose is a stable, versioned semantic object. It is not a recipient, action, data category, legal conclusion, product feature, marketing label, organization mission, or blanket statement of trust.

A purpose definition does not create authority by itself. It becomes one input to a later grant and deterministic policy decision.

## Governing rules

This taxonomy implements and may not weaken:

- the frozen Product Constitution
- the frozen Architecture Foundation
- the controlled vocabulary and deterministic incentive contract
- the Sprint 3 separation of permission truth from Chronicle truth
- the House of Keys authority boundary
- the Institutional Immune System
- the repository and module-boundary rules

Every purpose must have a direct explanation available without narrative traversal. Narrative may make a purpose memorable, but it may not conceal, merge, soften, or broaden the real use.

## Purpose semantics

A purpose answers:

> Why is this exact operation requested, and what bounded outcome is it intended to produce?

A purpose does not answer:

- who receives or performs the operation
- which data categories or records are involved
- which actions are allowed
- how long authority lasts
- whether the action is legal, safe, clinically appropriate, or beneficial
- whether the action actually occurred
- whether the person understood or accepted the request

Those facts belong to separate recipient, category, action, duration, grant, comprehension, decision, and receipt contracts.

## Required purpose record

A purpose definition should contain:

- stable namespaced purpose identity
- revision
- lifecycle status
- family identity
- whether the record is a grantable leaf or a non-grantable grouping node
- concise public name
- direct plain-language explanation
- intended outcome
- immediate or expected value to the person
- requesting-party benefit, when applicable
- explicitly excluded uses
- essential-use or optional-use classification
- secondary-use classification
- compatibility policy
- supersession and replacement references
- review domains
- effective and review timing
- uncertainty and unresolved constraints

A purpose identifier must not contain an email address, provider subject, organization-specific database key, URL, wallet address, or other replaceability-breaking value.

## Taxonomy structure

The taxonomy is hierarchical for navigation and review, but grants bind only to explicit grantable leaf purposes.

A family or grouping node:

- organizes related purposes
- cannot be selected as authority
- cannot imply compatibility among its descendants
- cannot be used as a shortcut for “all current and future uses”

A grantable leaf:

- names one bounded intended outcome
- has explicit exclusions
- can be paired with recipient, category, action, condition, and duration facts
- cannot silently inherit broader authority from its parent family

The default compatibility rule is **exact purpose only**.

## Initial purpose families

### Personal core use

Purposes whose primary intended outcome is maintaining the person’s useful Living Chronicle and exercising the non-negotiable rights attached to it.

These purposes are not secondary use and cannot be conditioned on research, commerce, contribution, payment, or public visibility.

Initial grantable leaves:

#### `purpose.personal.chronicle-capture`

**Direct explanation:** Use selected information to create or confirm a person-controlled Chronicle record.

**Intended outcome:** A reviewable proposed or confirmed Chronicle entry with provenance.

**Excluded uses:** Research, advertising, sale, unrelated analytics, generalized product training, or recipient access beyond the operation explicitly requested.

#### `purpose.personal.chronicle-maintenance`

**Direct explanation:** Use selected Chronicle information so the person can inspect, organize, correct, annotate, or maintain their own record.

**Intended outcome:** A more accurate, understandable, or usable Chronicle under the person’s control.

**Excluded uses:** Secondary analysis, research, commercial profiling, or authority over unrelated records.

#### `purpose.personal.chronicle-portability`

**Direct explanation:** Prepare or deliver a person-requested export or transfer of selected Chronicle information.

**Intended outcome:** A usable, inspectable copy or transfer package requested by the person.

**Excluded uses:** Secondary use of exported information, recipient reuse beyond the separate grant, or treating export as research or commercial permission.

#### `purpose.personal.chronicle-deletion`

**Direct explanation:** Evaluate and carry out a person-requested deletion operation within the accepted deletion and retention boundaries.

**Intended outcome:** Future use and retained state are reduced according to the accepted deletion lifecycle, with explicit evidence and exceptions.

**Excluded uses:** Retention for convenience, continued secondary use, or pretending that prior access never occurred.

### Optional personal enhancement

Purposes that may create additional personal value but are not required to preserve the core Chronicle rights.

Refusal must not reduce essential service quality, core progression, governance standing, or the ability to return.

Initial grantable leaves:

#### `purpose.personal.descriptive-understanding`

**Direct explanation:** Use selected Chronicle information to calculate or present descriptive personal patterns with sources and limitations.

**Intended outcome:** Understandable personal feedback that remains distinct from diagnosis, treatment, or proven causality.

**Excluded uses:** Research enrollment, external recipient access, commercial profiling, or unsupported clinical conclusions.

#### `purpose.personal.quest-evidence`

**Direct explanation:** Use selected Chronicle facts to evaluate a deterministic quest or learning requirement chosen by the person.

**Intended outcome:** An inspectable determination of whether the declared requirement was met.

**Excluded uses:** AI-decided completion, unrelated progression, broader consent, public disclosure, or health-status scoring.

### Service stewardship

Purposes required to operate, protect, recover, or support a bounded service surface.

This family does not create a blanket “operate the service” authority. Every leaf must name the specific operational outcome and remain separate from product improvement, research, advertising, and commercial reuse.

Initial grantable leaves:

#### `purpose.service.security-protection`

**Direct explanation:** Use the minimum necessary information to prevent, detect, contain, or investigate a defined security or abuse condition.

**Intended outcome:** Protect the person, system, or other affected parties from a bounded threat.

**Excluded uses:** General behavioral profiling, unrelated product analytics, indefinite retention, or publishing protected evidence.

**Hold point:** Production security authority, retention, emergency access, incident handling, and specialist approval remain later work.

#### `purpose.service.reliability-recovery`

**Direct explanation:** Use the minimum necessary information to diagnose, recover, or verify a defined service failure.

**Intended outcome:** Restore or verify a bounded operation without broadening data use.

**Excluded uses:** Feature experimentation, advertising, research, employee curiosity, or unrelated monitoring.

#### `purpose.service.requested-support`

**Direct explanation:** Use information the person intentionally supplies to address a specific support or correction request.

**Intended outcome:** Resolve or route the stated request while minimizing unnecessary disclosure.

**Excluded uses:** Training, marketing, public issue publication, unrelated account review, or reuse after the request is resolved unless separately authorized.

**Hold point:** The public repository is not a private account or health-support system. Production intake and protected evidence routes remain later work.

### Public-good research

A secondary-use family for separately governed, study-specific public-good research.

The family node is non-grantable. Every real study requires a distinct leaf purpose with its own identity, explanation, protocol reference, recipient, categories, actions, duration, withdrawal behavior, and governance evidence.

Template identity:

- `purpose.research.study-specific` — non-grantable template only

A production or study-specific leaf might later use a stable form such as `purpose.research.<study-identifier>`, but Sprint 4 does not select real studies or authorize research access.

Research purpose records must never rely on labels such as “advance science,” “public benefit,” or “improve health” without a bounded study outcome and explicit exclusions.

### Compensated opportunity

A secondary-use family for one separately described compensated offer.

The family node is non-grantable. Every opportunity requires a distinct leaf purpose and remains separate from quests, Laurels, ordinary progression, research consent, and general commercial access.

Template identity:

- `purpose.opportunity.offer-specific` — non-grantable template only

A compensated purpose cannot imply that data has a guaranteed value, cannot disguise payment as game currency, and cannot make refusal punitive.

### Optional commercial use

A secondary-use family for one separately described optional commercial service or access arrangement.

The family node is non-grantable. Broad purposes such as “business purposes,” “trusted partners,” “personalization,” “improve our services,” or “future products” are invalid because they do not identify a bounded outcome.

Template identity:

- `purpose.commercial.use-specific` — non-grantable template only

Sprint 4 does not authorize a marketplace, sale, advertising system, commercial recipient, or compensation mechanism.

### Mandatory or externally compelled processing

A hold-point family for future situations where an asserted legal, safety, or emergency duty may not depend on ordinary person-granted consent.

Template identity:

- `purpose.mandatory.unresolved` — non-grantable and non-allowing in Sprint 4

The presence of this family does not establish any legal duty or emergency power. Until a separately reviewed policy supplies authority, scope, evidence, review, notice, appeal, retention, and sunset behavior, evaluation must return `deny` or `indeterminate` rather than infer permission.

### Unknown, legacy, or unmapped purpose

Identifiers or labels that cannot be resolved to an active, versioned purpose definition.

Unknown or legacy purposes are never grantable and never compatible by default. They require migration, replacement, or explicit review before future access can be allowed.

## Essential-use and secondary-use classification

Each purpose must declare one of:

- `personal-core` — necessary to provide or preserve the person-controlled core rights
- `personal-optional` — additional personal value that may be refused without loss of core rights
- `service-stewardship` — bounded operation, protection, support, or recovery purpose
- `secondary-public-good` — separately authorized public-good use
- `secondary-compensated` — separately authorized compensated opportunity
- `secondary-commercial` — separately authorized optional commercial use
- `mandatory-holdpoint` — unresolved externally compelled or emergency purpose requiring later authority

Classification supports review and explanation. It does not replace a leaf purpose or create authority.

A product flow may not relabel a secondary use as `personal-core` merely because the project benefits indirectly or believes the use will improve the product.

## Lifecycle states

Purpose definitions use explicit lifecycle states:

- `proposed` — under design; not grantable
- `active` — accepted for use under its current revision and review gates
- `deprecated` — no new grants; existing references require review and an explicit compatibility decision
- `superseded` — replaced by another definition; prior grants do not transfer automatically
- `retired` — unavailable for future authorization
- `invalidated` — determined unsafe, misleading, contradictory, or otherwise unusable; future evaluation must not allow

Lifecycle changes do not rewrite prior grants, decisions, or receipts.

Deprecation, supersession, retirement, or invalidation must identify:

- reason
- responsible authority
- effective time
- affected grant and policy references
- replacement or migration path, when any
- review and appeal path
- whether immediate containment is required

## Versioning and semantic change

A purpose revision must preserve an inspectable history.

The following require at least a new revision:

- explanation clarification
- exclusion clarification
- lifecycle or review metadata change
- translation correction
- additional non-authorizing examples

The following require a new purpose identity and new authority rather than automatic migration:

- broader intended outcome
- additional recipient benefit
- additional data use
- additional action class
- expanded population or context
- research, commercial, advertising, training, or external reuse added to a personal purpose
- merging two previously distinct purposes
- converting an optional purpose into an essential one

A narrower successor still does not silently inherit grants. Migration behavior must be explicit and testable.

## Compatibility rules

Purpose compatibility is conservative and versioned.

1. Exact identity and accepted revision are the default requirement.
2. Shared family membership does not imply compatibility.
3. Similar wording, branding, organization mission, technical implementation, or recipient identity does not imply compatibility.
4. A policy may recognize a later clarification revision only when semantic equivalence is recorded and the grant’s compatibility behavior permits it.
5. A broader purpose is never compatible with a narrower grant.
6. A split, merge, rename with changed meaning, or cross-family move requires explicit review and usually new authority.
7. An AI system may suggest a mapping but cannot authoritatively declare compatibility.
8. Unknown, retired, invalidated, or unresolved mandatory purposes cannot produce implicit allow.

Compatibility evidence must name the compared identities and revisions, the reviewing authority, the reason, uncertainty, and rollback condition.

## Purpose-substitution prohibitions

The following are invalid substitutions:

- “improve the product” for a named personal, service, research, or commercial outcome
- “research” without a specific study purpose
- “partners” or “community benefit” without a bounded recipient and purpose
- “personalization” when the actual outcome includes advertising, external profiling, or model training
- “security” when the actual operation is general analytics or employee access
- “support” when the actual operation extends beyond the person’s stated request
- “legal requirement” without a reviewed authority and scope
- “de-identified” as a substitute for a purpose
- “AI assistance” as a purpose broad enough to authorize unrelated retrieval or retention
- an organization’s nonprofit, public-benefit, clinical, research, or open-source mission as authority for a specific use

A purpose label cannot cure an overbroad recipient, category, action, condition, or duration.

## Direct explanation requirements

Every grantable purpose must support a direct explanation that states:

- what outcome is intended
- who primarily benefits
- whether the use is essential or optional
- whether it is secondary use
- what materially different uses are excluded
- what happens when the person refuses
- where later recipient, category, action, duration, and revocation details will appear

The direct explanation must not:

- use narrative as the only description
- rely on euphemism or undefined institutional language
- imply guaranteed benefit
- imply diagnosis, treatment, legality, safety, or research approval
- hide secondary use inside core-service wording
- imply that refusal reduces dignity, worth, core progression, or basic rights

Full explanation templates and comprehension evidence remain workstream 4.7.

## Adversarial review cases

The purpose taxonomy must support deterministic or reviewable evidence for:

- purpose laundering through vague labels
- bundling personal use with research or commerce
- treating family membership as compatibility
- relabeling optional secondary use as essential
- AI-generated purpose substitution
- recipient or processor changing the stated purpose after grant
- using security or support language to justify unrelated access
- reusing a deprecated or superseded purpose without migration evidence
- allowing an unknown legacy purpose
- treating public-good mission or nonprofit status as authority
- adding model training or product analytics to an existing personal purpose
- broadening a purpose through translation or explanation drift

## Relationship to later workstreams

### Data categories

Workstream 4.3 will define what data scope is affected. A purpose cannot absorb category semantics or authorize all data merely because the outcome is legitimate.

### Grants, recipients, actions, and duration

Workstream 4.4 will bind one grantable purpose revision to explicit authority, recipient, categories, actions, conditions, and time. A valid purpose does not compensate for missing grant facts.

### Revocation

Workstream 4.5 will define how future authority ends. Purpose lifecycle and grant lifecycle remain separate.

### Receipts

Workstream 4.6 will record which purpose identity and revision were evaluated and used. A receipt cannot repair a mismatched or laundered purpose.

### Explanations and comprehension

Workstream 4.7 will turn purpose facts into accessible direct and narrative-parity explanations and comprehension evidence.

### Policy evaluation

Workstream 4.8 will require explicit purpose identity and revision. Missing, incompatible, inactive, or mismatched purpose facts produce `deny` or `indeterminate`, never implicit allow.

## Unresolved register

- the final production registry and registration authority
- specialist privacy, legal, accessibility, security, clinical, and research review
- jurisdiction-specific legal bases and mandatory processing
- exact handling of purpose translation revisions
- study, offer, and commercial-use naming conventions
- downstream-recipient purpose control and federation
- retention and deletion duties attached to specific purposes
- migration of legacy or externally defined purposes
- emergency-purpose authorization, review, notice, appeal, and sunset
- whether certain service-stewardship purposes require direct instruction, standing grant, or another later authority channel

These are explicit hold points, not authority granted by omission.

## Success condition

The purpose taxonomy is sound when a person and policy evaluator can distinguish one bounded intended outcome from another, identify materially excluded uses, detect broadening or substitution, and reject unknown or incompatible purposes without turning a family name, public-benefit claim, technical capability, or organizational mission into permission.
