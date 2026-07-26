# Security Control Status and Risk Vocabulary

**Status:** PROPOSED SPRINT 5 BASELINE  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)  
**Scope:** truthful control status, evidence, residual risk, review, and public claims

## Purpose

Security language can create false confidence before a system exists. This vocabulary prevents a requirement, diagram, vendor feature, synthetic test, or internal approval from being represented as a deployed and independently reviewed control.

It is used by Sprint 5 asset maps, threat records, control registers, procedures, tabletop exercises, completion evidence, public status pages, and later implementation reviews.

## Control identity

A material control record should have:

- stable control ID
- revision
- name and direct explanation
- protected asset, right, or invariant
- threat or failure modes addressed
- control class
- responsible role
- dependencies
- environment applicability
- status
- evidence references
- limitations and bypass assumptions
- residual risk
- review state and reviewer identity when applicable
- last reviewed date
- expiration or revalidation trigger
- correction or supersession reference

A control name is not evidence. A control record may reference implementation evidence without publishing protected operational details.

## Control classes

A control may use one or more classes:

- **preventive** — reduces the probability that a threat succeeds
- **detective** — identifies attempted or completed failure
- **limiting** — bounds scope, duration, blast radius, or consequence
- **containment** — stops or isolates an active incident
- **recovery** — restores an authorized and validated operating state
- **restorative** — repairs affected person, data, permission, or institutional state where possible
- **corrective** — fixes the control or system defect
- **deterrent** — increases accountability without substituting for prevention
- **informational** — improves comprehension or decision quality without being treated as enforcement

Policies, notices, training, and warnings are not technical enforcement merely because they are controls of another class.

## Control status

### Required

A higher-authority rule, accepted sprint, policy, contract, threat finding, or later production gate requires the control.

Required means the system must eventually satisfy the control or explicitly accept a bounded exception. It does not mean a design or implementation exists.

Required evidence:

- authority source
- applicable scope
- accountable role
- entry or completion gate

### Designed

The control behavior, boundaries, dependencies, failure handling, and evidence expectations are documented.

Designed does not mean implemented, tested, independently reviewed, or deployed.

Required evidence:

- versioned design artifact
- assets and threats covered
- assumptions and non-scope
- expected implementation and validation evidence
- residual risk

### Synthetically tested

Public synthetic scenarios exercise the documented behavior or procedure.

Synthetic testing may validate logic, completeness, or coordination. It does not prove production configuration, operational effectiveness, provider behavior, or resistance to unknown attacks.

Required evidence:

- scenario or fixture version
- expected result
- observed result
- limitations
- reproducible validation path

### Independently reviewed

A named qualified reviewer outside the control’s proposing and implementing authority has reviewed the bounded control.

Internal founding-steward approval, AI review, automated validation, community reactions, or an unnamed claim of expert input do not satisfy this status.

Required evidence:

- reviewer identity or approved accountable role
- review scope
- review date
- findings and disposition
- conflicts or independence limitations
- revalidation condition

### Implemented

The control exists in code, configuration, procedure, or organizational operation in an identified environment.

Implemented is intentionally distinct from deployed because implementation may exist only in a branch, test environment, disabled configuration, or unapproved operating process.

Required evidence:

- implementation reference
- environment
- owner
- version or commit
- configuration boundary
- validation status

### Deployed

The control is active in an identified operating environment and has current evidence of correct configuration and operation.

Deployment claims must name the environment and evidence boundary. Deployment in development or staging does not imply production deployment.

Required evidence:

- environment and service boundary
- deployment or configuration identity
- activation date
- operational owner
- validation and monitoring evidence
- rollback path
- last verification date

### Operationally verified

The deployed control has current evidence from safe testing, monitoring, audit, exercise, incident learning, or another approved operational method.

Operational verification is time-bounded and does not mean the control cannot fail.

Required evidence:

- verification method and date
- bounded result
- reviewer or responsible role
- known blind spots
- expiration or next review

### Deferred

The control is intentionally postponed.

Deferred controls require a reason and may not disappear from the register.

Required evidence:

- reason
- current exposure and residual risk
- accountable owner
- compensating controls
- entry condition
- target phase or trigger
- expiration or review date

### Not applicable

A reviewed explanation shows the control does not apply to the bounded asset, environment, flow, or threat.

Not applicable is not a shortcut for unknown, inconvenient, or unimplemented.

Required evidence:

- bounded scope
- rationale
- reviewer or responsible role
- assumptions
- revalidation trigger

### Rejected

A reviewed decision concludes that the proposed control should not be used because it is ineffective, disproportionate, harmful, misleading, or conflicts with higher-authority requirements.

Required evidence:

- decision authority
- reason
- alternatives considered
- residual risk disposition
- superseding control or accepted exception

### Retired

A previously implemented or deployed control is no longer active or authoritative.

Retirement must preserve history and identify replacement, migration, rollback, evidence retention, and residual exposure.

## Status relationships

Statuses are not automatically cumulative.

Examples:

- A control may be required and designed but not implemented.
- A design may be synthetically tested without independent review.
- A vendor may provide an implemented capability that is not deployed in Calypso’s Promise.
- A deployed control may not be operationally verified recently enough to support a current claim.
- An independently reviewed design may still be undeployed.
- A deployed control may later become deferred, retired, or rejected for a different environment.

Control records should store applicable statuses and evidence explicitly rather than computing a misleading single maturity score.

## Review state

Control status and review state are separate.

Review state may be:

- **draft** — incomplete working record
- **internal-review** — under accountable project review
- **specialist-review** — awaiting or undergoing bounded qualified review
- **accepted-baseline** — accepted for the stated design scope
- **approved-for-environment** — approved for an identified implementation or operating environment
- **superseded** — replaced prospectively by another revision or control
- **retired** — preserved for history but no longer active

An accepted baseline is not automatically approved for deployment.

## Evidence quality

Evidence may be classified as:

- **asserted** — stated without supporting evidence
- **documented** — supported by a versioned design or procedure
- **synthetic** — supported by public synthetic validation or tabletop evidence
- **implementation** — supported by code or configuration evidence
- **operational** — supported by current environment evidence
- **independent-review** — supported by named independent review
- **incident-derived** — supported by reviewed incident or near-miss learning
- **unknown** — evidence is missing or cannot be established

Evidence classes describe the source, not absolute truth. Conflicting or stale evidence must remain visible.

## Risk record

A risk record should identify:

- stable risk ID and revision
- affected asset, person, right, and domain
- threat, failure, or abuse case
- actor and capability
- preconditions and trust boundary
- likelihood evidence without false precision
- impact, affectedness, concentration, duration, and reversibility
- preventive, detective, limiting, containment, recovery, restorative, and corrective controls
- control status and evidence
- residual risk
- uncertainty and conflicting evidence
- owner
- accepted, mitigated, transferred, avoided, deferred, or unresolved disposition
- expiration and revalidation trigger
- linked incidents, challenges, assumptions, decisions, or table tops

## Risk disposition

### Unresolved

Material uncertainty or exposure remains without an accepted disposition.

### Mitigation required

A required control or design change must occur before the named gate.

### Accepted for bounded design work

The risk is accepted only for architecture, documentation, or public synthetic work. This does not authorize production data or users.

### Accepted for identified environment

An accountable authority accepts the residual risk for a named environment, duration, scope, and conditions.

This status requires explicit evidence and does not transfer automatically across environments.

### Deferred with compensating controls

The preferred control is postponed while named compensating controls and restrictions remain active.

### Avoided

The risky capability, flow, or dependency will not be introduced within the bounded scope.

### Transferred or shared

Another accountable party bears part of the risk through a defined relationship. Transfer does not eliminate Calypso’s Promise’s duties or constitutional constraints.

### Closed by correction

Evidence shows the risk condition was corrected for the bounded scope. Revalidation may still be required.

### Superseded

A newer risk revision replaces the prior assessment while preserving history.

## Qualitative assessment dimensions

Sprint 5 may assess risks using explicit qualitative dimensions rather than a false-precision aggregate score:

- affected rights and invariants
- number and vulnerability of affected people
- concentration of harm
- confidentiality, integrity, availability, and authority impact
- exploit or failure preconditions
- attacker capability or failure frequency evidence
- detectability
- duration and persistence
- reversibility and restoration feasibility
- downstream propagation
- uncertainty and evidence quality
- control maturity and independence
- institutional capture or insider potential

High aggregate benefit cannot hide concentrated severe harm to a minority or individual.

## Residual risk language

Residual risk statements should say:

- what can still go wrong
- who or what remains exposed
- why the risk remains
- which evidence is missing
- which control or gate would reduce it
- who owns follow-up
- when the conclusion expires

Avoid unsupported labels such as “secure,” “zero trust,” “military grade,” “fully encrypted,” “anonymous,” “deleted everywhere,” or “production ready.”

## Exceptions

A control exception must record:

- requesting authority
- affected control and requirement
- exact scope and environment
- justification
- affected rights and risks
- compensating controls
- prohibited expansion
- approval authority
- start and expiration
- monitoring and review
- rollback or termination condition
- public derivative when required and safe

An exception cannot waive the Product Constitution, public/private boundary, meaningful refusal, correction, export, deletion, or honest control status.

## Corrections and history

Control and risk records are corrected through new revisions or linked correction records rather than silent overwrite.

A correction should identify:

- prior claim
- corrected claim
- reason
- affected evidence, decisions, public statements, and downstream artifacts
- effective time
- responsible reviewer

## Public claims

Public claims should use the narrowest supported statement.

Examples:

- “Required by the Sprint 5 baseline”
- “Designed in the security architecture”
- “Exercised with public synthetic scenarios”
- “Internally reviewed; independent review pending”
- “Implemented in the staging environment”
- “Deployed and verified in the named environment on the stated date”

Do not shorten these to “secure” or “audited” when the evidence supports only a narrower claim.

## Current project boundary

At Sprint 5 entry:

- the Living Chronicle and House of Keys contracts are merged, pre-stable, and synthetic-only
- no production health-data or account runtime exists
- no production encryption, key custody, monitoring, deletion verification, or security operations are deployed
- no named independent security reviewer is recorded
- Sprint 5 may create designs, procedures, public synthetic evidence, and tabletop records
- later implementation and production claims require separate gates and evidence
