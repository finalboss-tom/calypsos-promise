# Health Data Legacy and Succession Architecture

[Architecture documentation](README.md) · [Decision 0009](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) · [Living Chronicle identity and authority](living-chronicle-identity-authority.md) · [House of Keys ontology](house-of-keys-ontology.md) · [Recovery and emergency access](../security/account-recovery-and-emergency-access-model.md)

- **Status:** PROPOSED ARCHITECTURE BASELINE
- **Decision basis:** [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
- **Tracking issue:** [#39](https://github.com/finalboss-tom/calypsos-promise/issues/39)
- **Information class:** PUBLIC architecture and synthetic-only design
- **Production boundary:** No production incapacity, death, estate, fiduciary, succession, archive, research-release, or legacy-directive runtime is authorized or represented as deployed

## Purpose

This architecture defines the future domain boundaries required to preserve a person’s control over a Living Chronicle during incapacity and after death.

It turns the long-horizon intent in the Vision into explicit system responsibilities without claiming that software can determine legal authority by itself. It must make it possible to preserve valuable longitudinal evidence while preventing death, incapacity, family status, technical custody, or research interest from becoming blanket access.

The architecture answers four separate questions:

1. What did the person direct while alive and capable?
2. What event is claimed to have occurred?
3. Which actor, if any, has authority for one requested action?
4. What operation was actually attempted or completed?

No single record answers all four.

## Scope

This baseline covers:

- versioned Legacy Directives;
- ordinary delegation, incapacity stewardship, and post-mortem stewardship as separate authority conditions;
- event and claimant evidence;
- representative, fiduciary, steward, verifier, reviewer, recipient, and challenger roles;
- contested authority and protective holds;
- House of Keys integration;
- preservation, export, family-health derivative, research, archive, and deletion pathways;
- third-party and relational privacy;
- receipts, protected audit, correction, restoration, and revalidation;
- platform migration, shutdown, and successor-institution continuity; and
- synthetic and specialist-review gates.

It does not select a jurisdiction, provider, court interface, estate-document form, identity-proofing method, death-verification service, incapacity standard, archive, research repository, key-custody implementation, or production operating procedure.

## Governing invariants

1. Death, incapacity, inactivity, abandonment, account loss, and institutional transition are distinct conditions.
2. Event verification does not establish claimant authority.
3. Claimant identity does not establish role, scope, purpose, or permission.
4. A Legacy Directive expresses person intent but is not universal legal authority.
5. Legal or fiduciary authority does not create Chronicle truth.
6. Permission remains purpose-, recipient-, data-, action-, condition-, and time-specific.
7. A completed operation requires its own execution evidence and receipt.
8. Technical custody, key possession, account access, family relationship, source authorship, research value, payment, and governance status create no independent succession authority.
9. Inactivity alone never activates incapacity or death handling.
10. Contested or incomplete high-consequence authority fails closed.
11. A successor cannot impersonate the person or become the original confirmer of prior Chronicle assertions.
12. Preservation does not imply disclosure, research, commercialization, public release, or indefinite retention.
13. Deletion remains a legitimate directive outcome where legally and technically possible.
14. The rights and safety of living third parties remain reviewable after the person’s death.
15. No production claim is valid until implementation, operational evidence, and required independent review are recorded separately.

## Domain separation

| Domain                      | Authoritative claim                                                                                                   | Must not silently become                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Living Chronicle            | Health and lived-experience assertions, sources, provenance, correction, conflict, export, and deletion state         | Permission, legal authority, estate record, or succession case             |
| Legacy Directive            | The person’s versioned platform instructions and known restrictions                                                   | A universal will, court order, or automatic grant                          |
| External authority evidence | A protected reference to a court, estate, incapacity, fiduciary, or other authority record                            | Chronicle truth or public repository content                               |
| Event evidence              | Evidence relevant to a claimed incapacity, death, restoration, or abandonment condition                               | Proof of claimant authority                                                |
| Succession case             | Review and lifecycle state for one event, claimant, controlled scope, and requested outcome                           | A bearer credential or blanket control                                     |
| House of Keys               | Purpose-specific permission and deterministic evaluation                                                              | Legal conclusion, Chronicle truth, or execution proof                      |
| Policy decision             | `allow`, `deny`, `indeterminate`, or protective-hold result over explicit facts                                       | Proof that an operation occurred                                           |
| Execution state             | Whether an authorized operation was queued, attempted, completed, failed, reversed, or left uncertain                 | Permission or legal sufficiency                                            |
| Legacy receipt              | Person-, steward-, or fiduciary-visible claim about the decision and operation                                        | Mutable case notes or unrestricted audit evidence                          |
| Protected operational audit | Minimized evidence for security, dispute, compliance, restoration, and accountability                                 | Public history or general analytics                                        |
| Source restrictions         | Rights, licenses, duties, or limitations attached to imported or third-party materials                                | Ownership of the entire Chronicle                                          |
| Third-party subject rights  | Constraints protecting identifiable or inferable living people                                                        | A veto over every accurate record or a license for unrestricted disclosure |
| Research governance         | Study-specific approval, participant or representative authority, security, retention, publication, and outcome rules | General legacy authority                                                   |
| Archive governance          | Identifiability, embargo, access, publication, living-person protection, and preservation terms                       | Automatic public release                                                   |

Composition may present these domains together. It may not merge their authority.

## Roles

### Controlling person

The person whose Living Chronicle is protected and whose direct authority controls the ordinary living state.

The person may create, inspect, export, revoke, replace, or supersede a Legacy Directive while capable and in control. The system must preserve direct, accessible language and cannot make broader legacy permission a condition of core product use, progression, research opportunity, payment, or governance standing.

### Designated Legacy Steward

A person or bounded institutional role nominated in a Legacy Directive to request or perform specified future stewardship actions.

Nomination is evidence of intent. It is not self-executing legal authority and does not create blanket access. A steward remains subject to identity, event, role, scope, conflict, purpose, and action review.

### Contingent Legacy Steward

A replacement nominee considered only when the primary steward is unavailable, disqualified, declines, lacks authority, or cannot safely act under the accepted process.

Contingent order must not bypass a current valid primary authority or unresolved dispute.

### Personal representative or fiduciary claimant

An executor, administrator, guardian, conservator, trustee, agent, or other actor claiming authority under applicable law or an external legal record.

The title alone is insufficient. The system must review the exact role, affected person, jurisdiction, effective period, powers, restrictions, court or document status, and requested action.

### Event verifier

An accountable role or service that assesses evidence of death, incapacity, restored capacity, or another triggering condition.

The verifier does not select the successor, grant Chronicle access, approve research, or execute data operations.

### Authority reviewer

An accountable human or later approved review body that evaluates claimant identity, role, directive revision, external evidence, conflicts, restrictions, and the requested operation.

Where capacity allows, the reviewer should be independent from the claimant, recipient, economic beneficiary, research team, archive, and execution operator.

### Custodian

The provider or institutional boundary that stores bytes or operates the service.

Custody creates duties and technical capability, not discretionary authority to preserve, disclose, delete, research, monetize, or publish.

### Performing actor or processor

The bounded component or person executing an approved operation. It may not broaden the purpose, recipient, categories, selectors, action, timing, or conditions.

### Recipient

The bounded party allowed to receive a particular representation for a particular purpose. A steward, executor, family member, research repository, archive, and successor institution are different recipient classes.

### Challenger

A person or accountable body permitted to contest event evidence, claimant authority, directive interpretation, third-party exposure, coercion, fraud, conflict, deletion, or release.

A challenge creates review duties. It does not automatically prove the challenger’s claim or grant the challenger access.

### Institutional successor

A replacement operator or institution responsible for service continuity, migration, protected custody, or orderly shutdown.

Institutional succession does not transfer the person’s data authority to the successor. Existing directives, grants, restrictions, receipts, and deletion states must migrate or close through a reviewed process.

## Core records

### Legacy Directive

A versioned, person-confirmed record of future instructions.

Minimum conceptual fields:

```text
legacyDirectiveId
revision
status
chronicleId
subjectIds
controllingPersonAuthorityRef
confirmationEvidenceRef
createdAt
reviewedAt
supersedes
incapacityInstructions
postMortemInstructions
primaryStewardRef
contingentStewardRefs
externalPlanReferences
permittedPurposeRefs
prohibitedPurposeRefs
recipientConstraints
categoryAndSelectorRules
actionRules
preservationRules
exportRules
familyDerivativeRules
researchRules
archiveRules
deletionRules
embargoAndSunsetRules
sensitiveCategoryRestrictions
notificationRules
challengeAndAppealRules
jurisdictionAssumptions
accessibilityEvidenceRef
specialistReviewStatus
unresolvedQuestions
```

Protected identifiers and external documents belong in authorized private systems. Public fixtures use fictional, synthetic values only.

### Event Evidence Record

A protected record describing evidence relevant to a claimed triggering event.

It should preserve evidence class, source, collector, time, jurisdiction context, verification method, uncertainty, conflicts, expiry or recheck rule, and protected storage reference.

It does not contain a permission decision.

### Legacy Authority Claim

A claimant’s assertion that they may perform or request a bounded action.

It binds:

- claimant identity and role;
- controlled person and Chronicle;
- event basis;
- directive and external-authority references;
- exact requested purpose, recipient, categories, selectors, action, timing, and conditions;
- conflicts and economic interests;
- evidence and uncertainty; and
- review state.

### Succession Case

The review container for one reported condition and one or more authority claims.

A case may include multiple claimants, conflicting directives, court records, challenges, protective restrictions, approved operations, receipts, correction, and restoration. It is not a login account and cannot be presented to downstream services as a bearer token.

### Authority Hold

A time-bounded protective state preventing one or more difficult-to-reverse actions while authority is unresolved.

A hold identifies:

- exact affected resources and actions;
- reason and evidence basis;
- declaring and reviewing authority;
- start, review, and expiration conditions;
- permitted safe operations;
- notice and challenge behavior; and
- restoration obligations.

A hold must not become indefinite silent retention or a way to deny legitimate direct person control after restored capacity.

### Legacy Operation Authorization

A short-lived, single-purpose authority envelope derived from a reviewed case and a current House of Keys decision.

It contains no more authority than the approved operation and cannot be reused for another recipient, purpose, scope, or action.

### Legacy Receipt

An append-only, inspectable record describing an important decision, attempt, release, denial, correction, reversal, or closure.

A receipt should identify:

- case and operation references;
- controlling Chronicle and affected subjects;
- claimant role and reviewed authority basis in minimized form;
- purpose, recipient, categories, selectors, action, and time;
- decision outcome and reasons;
- operation outcome and known downstream obligations;
- correction or supersession references;
- challenge route; and
- unresolved uncertainty.

### External Record Reference

A protected locator, digest, status, and review summary for a will, trust, power of attorney, court order, death record, incapacity record, fiduciary appointment, or other external evidence.

The architecture should avoid copying complete protected documents into every domain record. A reference must not imply legal validity merely because a file exists or a signature verifies technically.

### Downstream Obligation Record

A record of retention, deletion, return, notification, embargo, publication, access, or closure duties attached to an approved recipient or released representation.

The platform must distinguish obligations it can enforce directly from obligations it can only record, notify, contractually require, or report as uncertain.

## Directive lifecycle

A Legacy Directive may use these states:

- **draft** — not authoritative and not eligible for activation;
- **confirmation-pending** — direct explanation and execution evidence are incomplete;
- **active** — current person-confirmed platform instruction;
- **review-due** — still current but requires person review because time, jurisdiction, role, or scope assumptions changed;
- **suspended** — temporarily ineligible for activation because compromise, coercion, incapacity, conflict, or integrity concerns require review;
- **revoked** — prospectively withdrawn by the capable controlling person or other valid authority under a later reviewed rule;
- **superseded** — replaced by a newer confirmed revision;
- **invalidated** — determined unusable for a stated reason without erasing history;
- **activated-restricted** — referenced by an approved bounded succession case;
- **closure-pending** — all permitted operations ended but obligations remain; and
- **closed** — no further authority remains under the directive, with history preserved.

A state transition records actor, authority basis, time, reason, prior state, new state, affected scope, evidence references, notice, challenge, and next review.

Revoking or superseding a directive must propagate prospectively to unresolved cases and new operations. It cannot pretend completed disclosures did not occur.

## Succession case lifecycle

A case may use these states:

1. **reported** — an event or claim was submitted; nothing is presumed true.
2. **classified** — ordinary delegation, incapacity, death, abandonment, recovery, or institutional continuity is distinguished.
3. **protective-hold** — exact high-consequence actions are restricted where takeover, destruction, or release risk is material.
4. **evidence-collecting** — event, claimant, directive, legal, source, and conflict evidence are gathered separately.
5. **event-reviewed** — the event is supported, unsupported, or unresolved; authority is still undecided.
6. **authority-review** — claimant role, scope, restrictions, and operation request are evaluated.
7. **contested** — material claims or evidence conflict.
8. **approved-restricted** — one or more bounded operations may proceed under exact conditions.
9. **denied** — event, authority, purpose, scope, or safeguards do not support the request.
10. **active** — approved operations or stewardship duties are in progress.
11. **restoration-pending** — incorrect restrictions, access, records, permissions, or disclosures require correction or remediation.
12. **closure-pending** — downstream obligations, challenge periods, deletion verification, or reporting remain.
13. **closed** — authority ended and outcome, limitations, residual harm, and revalidation are recorded.
14. **invalidated** — the case or a material basis was found fraudulent, erroneous, or legally ineffective.

Every state must be observable through an authorized interface. The system must not hide a protective hold, denial, restriction, or unresolved conflict behind generic account errors.

## Incapacity lifecycle

Incapacity is not a permanent binary person attribute.

A future incapacity pathway must model:

- the exact functional or legal authority at issue;
- temporary, partial, episodic, continuing, or disputed status;
- the source and limits of the determination;
- supported decision-making and accessible participation;
- the person’s current expressed choices where safe and legally relevant;
- review, expiry, and restoration triggers; and
- the return of direct control when the basis ends.

A diagnosis, disability, age, cognitive score, hospitalization, crisis, or model inference cannot alone create incapacity authority.

An incapacity steward cannot use post-mortem permissions, convert temporary authority into permanent control, or suppress restoration because a research, family, financial, or institutional interest prefers continued access.

## Death and post-mortem lifecycle

A death pathway must separate:

- report intake;
- event verification;
- authority verification;
- notice and challenge;
- protective custody;
- operation-by-operation approval;
- downstream obligations; and
- final closure.

The system should preserve a protected custody state before it releases or destroys data. Protective custody is not permission for the custodian to inspect or use the Chronicle beyond what is required for security, integrity, migration, and lawful administration.

A verified death never reclassifies the Chronicle as public, ownerless, abandoned, research-ready, or institution-owned.

## Authority reconciliation

There is no universal repository-level rule stating that the Legacy Directive, executor, family member, account terms, or first court document always controls.

A future reconciliation engine should accept explicit facts and produce one of:

- **allow** — the exact operation is supported by current reviewed authority and safeguards;
- **deny** — the operation conflicts with authority, restrictions, law, scope, or policy;
- **indeterminate** — required material facts are missing or cannot be reconciled; or
- **protective-hold** — difficult-to-reverse action must pause while an active conflict or high-risk uncertainty is reviewed.

The output must expose stable reasons and source references. A language model may summarize the result but cannot select the controlling authority or convert uncertainty into permission.

Relevant facts may include:

- directive revision and status;
- person confirmation and revocation evidence;
- event status;
- claimant identity, role, jurisdiction, and term;
- court, estate, fiduciary, or incapacity authority;
- source and provider restrictions;
- House of Keys purpose, recipient, category, selector, action, duration, and condition revisions;
- third-party subject risk;
- research or archive governance approval;
- conflicts, compensation, or self-dealing;
- active holds, challenges, appeals, or investigations;
- platform and custodian duties; and
- technical feasibility, deletion state, and downstream uncertainty.

Missing or stale material facts never default to allow.

## Capability matrix

| Capability                       | Ordinary delegate                       | Incapacity steward                                | Post-mortem steward or fiduciary                  | Custodian/operator        | Researcher or archive                |
| -------------------------------- | --------------------------------------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------- | ------------------------------------ |
| Inspect directive                | Only if explicitly delegated            | Bounded administrative view                       | Bounded administrative view                       | Operational metadata only | No, unless required approved summary |
| Inspect complete Chronicle       | Only by explicit active grant           | Only if necessary and approved                    | Only if necessary and approved                    | No discretionary access   | Only approved representation         |
| Preserve protected custody       | No                                      | May request                                       | May request                                       | May execute               | No                                   |
| Export full Chronicle            | Explicit grant and confirmation         | High-consequence reviewed operation               | High-consequence reviewed operation               | Execute only              | Receive only if named and approved   |
| Receive family-health derivative | Only if named recipient                 | May request for approved purpose                  | May request for approved purpose                  | Execute only              | Not implied                          |
| Correct a record                 | Submit attributed request where allowed | Submit attributed representative request          | Submit attributed representative request          | Repair mechanics only     | Submit source-linked challenge only  |
| Become original confirmer        | Never                                   | Never                                             | Never                                             | Never                     | Never                                |
| Delete Chronicle                 | Explicit current authority              | Only within exact lawful scope and review         | Only within exact lawful scope and review         | Execute only              | No                                   |
| Authorize research               | No unless explicitly granted            | Only if directive and applicable authority permit | Only if directive and applicable authority permit | No                        | Cannot self-authorize                |
| Authorize public archive         | No unless explicitly granted            | Presumptively blocked pending exact review        | Only with explicit conditions and exact authority | No                        | Cannot self-authorize                |
| Create AI impersonation          | Never                                   | Never                                             | Never                                             | Never                     | Never                                |
| Broaden own authority            | Never                                   | Never                                             | Never                                             | Never                     | Never                                |

This matrix is a default architecture boundary, not a jurisdiction-specific legal conclusion.

## Preservation pathway

Preservation keeps data in protected custody without creating new substantive use.

A preservation operation must define:

- exact Chronicle and representations;
- reason and authority;
- encryption and custody boundary;
- retention or review period;
- key, format, provider, and migration plan;
- prohibited inspection and secondary use;
- deletion and shutdown behavior;
- notice and receipts; and
- cost, dependency, and institutional continuity risk.

The project must not retain indefinitely merely because future value is imaginable. Review-due, sunset, transfer, export, and deletion outcomes remain required.

## Fiduciary administration pathway

A fiduciary administration interface should reveal only the information necessary to understand the case, directive, available choices, obligations, deadlines, and challenge path.

It should not default to a complete Chronicle view. Administrative metadata and substantive health content remain separated.

The interface must make clear:

- which role the system currently recognizes;
- which authority remains unverified or contested;
- which actions are available, blocked, or pending;
- which data each action would expose;
- whether another person’s information is implicated;
- whether legal or specialist review is required; and
- what the system cannot determine.

## Complete export pathway

A complete export is high consequence because it is difficult to revoke after delivery.

Before release, the system must evaluate:

- exact recipient and delivery boundary;
- directive and external authority;
- third-party and family content;
- source-document restrictions;
- encryption and recipient authentication;
- integrity and provenance manifests;
- omitted, redacted, retained, disputed, and deleted content;
- downstream retention, deletion, and redistribution obligations;
- challenge or waiting period; and
- receipt and delivery confirmation.

Possession of an export does not authorize later research, publication, sale, model training, or redistribution.

## Family-health derivative pathway

A family-health derivative is not a complete Chronicle export with names removed. It is a purpose-built, minimized representation designed to communicate relevant family-history information without exposing unnecessary personal narrative or third-party detail.

A future contract should preserve:

- intended relatives or recipient class;
- medical or informational purpose without claiming diagnosis;
- source and confidence references;
- included and omitted categories;
- genetic and familial inference risk;
- living-person rights and notification where appropriate;
- correction and limitation language;
- no automatic onward disclosure; and
- review by appropriate privacy, clinical, genetic, and legal specialists.

The project must not promise that a derivative is clinically complete or that family risk can be inferred reliably from one person’s Chronicle.

## Research contribution pathway

Post-mortem research use requires a separately governed research record and House of Keys authority. The Legacy Directive may express an affirmative, negative, or conditional preference; it does not replace research review.

A research contribution must define:

- exact study or governed recipient;
- purpose and scientific question;
- data scope, identifiability, selectors, and transformations;
- participant or representative authority basis;
- privacy, security, access, analysis, and publication controls;
- duration, withdrawal or closure behavior, and downstream copies;
- return of results or public-benefit reporting;
- compensation, benefit sharing, and conflicts where applicable;
- re-identification and familial risk; and
- challenge, pause, termination, and incident behavior.

“Research,” “science,” “public good,” or “future studies” is not a sufficiently specific purpose.

## Historical archive pathway

A historical archive may be private, restricted, embargoed, limited-access, de-identified, pseudonymous, identifiable, or public. These states are not interchangeable.

Archive review must consider:

- explicit person instructions;
- rights and safety of living people;
- sensitive categories and correspondence;
- copyright, source, publicity, confidentiality, and contractual restrictions;
- access-control and researcher qualification;
- publication and quotation conditions;
- embargo start, review, release, and extension rules;
- correction, contextualization, and dispute behavior;
- institution or archive shutdown; and
- whether public release is proportionate to the claimed historical value.

An embargo does not guarantee future public release. Conditions must be revalidated before release.

## Deletion pathway

A legacy directive may request deletion where legally and technically possible. A successor or fiduciary may also request deletion within a reviewed authority scope.

Deletion handling must preserve:

- distinction between account deletion, Chronicle deletion, source deletion, representation deletion, recipient deletion, backup expiry, and audit minimization;
- active holds and lawful retention exceptions;
- directive and authority basis;
- exact scope and excluded material;
- downstream recipient notices and uncertainty;
- protected evidence that deletion was requested and evaluated;
- tombstone or minimal non-content evidence where justified;
- verification results and residual copies; and
- correction and restoration if deletion was unauthorized or applied to the wrong scope.

A deletion race among claimants must trigger a protective hold rather than reward the first actor.

## Third-party and relational privacy

The Chronicle may contain facts about or inferable from people other than the controlling person.

A future implementation must represent:

- primary and secondary subjects;
- source authors and correspondents;
- relatives and genetic relationships;
- caregivers, dependents, minors, partners, and household members;
- clinicians and organizations;
- jointly created documents or messages; and
- claims whose disclosure could expose abuse, reproductive choices, psychiatric history, substance use, paternity, adoption, identity, location, or other sensitive circumstances.

Controls may include redaction, omission, segmentation, derivative generation, embargo, notice, independent review, restricted access, or denial. The exact response depends on law, safety, source rights, person intent, public interest, and the requested action.

Third-party protection cannot be implemented by silently falsifying the deceased person’s Chronicle. Corrections and restrictions remain attributed and domain-specific.

## Security threat model inheritance

The capability inherits the entire Sprint 5 security baseline and requires additional explicit threats:

- false death or incapacity report during account takeover;
- forged, altered, revoked, expired, or wrong-jurisdiction documents;
- claimant identity theft;
- coercion or undue influence during directive creation or revision;
- malicious steward nomination;
- first-claimant advantage;
- family, fiduciary, archive, research, provider, or operator conflict;
- insider curiosity disguised as estate administration;
- destructive deletion before challenge;
- bulk export to an unsafe endpoint;
- stale directive or authority cache;
- restored backup resurrecting revoked directives or completed deletions;
- key loss or provider shutdown before activation;
- research or archive scope expansion;
- public release exposing living people;
- AI impersonation or synthetic continuation of the deceased;
- receipt omission, forgery, or suppression;
- indefinite protective hold or retention;
- successor institution treating migration as ownership transfer; and
- legal, regional, or provider change invalidating prior assumptions.

Required control families include independent evidence channels, separation of event and authority review, high-consequence holds, anti-self-dealing review, short-lived operation envelopes, exact recipient verification, safe notification, immutable version history, revocation propagation, protected audit, receipt integrity, third-party review, downstream obligation tracking, provider migration, deletion verification, and periodic revalidation.

## Fraud, coercion, and abuse safeguards

A directive or authority claim must support confidential challenge when:

- the person may have been pressured, isolated, deceived, or exploited;
- a steward, caregiver, family member, researcher, archive, provider, or beneficiary has a material interest;
- document execution or revision timing is suspicious;
- the person’s accessible communication needs were not met;
- a prior directive or known refusal conflicts;
- a vulnerable or dependent person is implicated; or
- activation could expose abuse survivors, estranged relatives, or protected locations.

The public repository must not receive case evidence. Protected cases belong in authorized private systems with minimized public institutional derivatives only when required and safe.

## Accessibility and supported decision-making

Legacy planning must not be available only to people who can read complex legal language, use one device, speak, see, hear, remember credentials, or afford counsel.

A future design must provide:

- direct language in addition to narrative presentation;
- screen-reader, keyboard, nonvoice, nonvisual, low-bandwidth, and non-AI paths;
- accessible review of the exact directive and consequences;
- trusted-helper participation without silently transferring authority;
- supported decision-making where lawful and appropriate;
- explicit separation between assistance and confirmation;
- alternatives to smartphone-, email-, or memory-only execution;
- safe correction and revocation; and
- a way to export instructions for review outside the platform.

Accessibility cannot justify weaker authority, hidden broadening, or greater disclosure. It requires equivalent safe paths.

## Receipts, audit, and transparency

Person-visible and successor-visible receipts remain separate from protected audit.

Receipts should explain consequential events in direct language, including:

- a directive was created, changed, reviewed, suspended, revoked, superseded, or activated;
- an event or authority claim was reported;
- a protective hold was applied or lifted;
- a claimant was approved, denied, or restricted;
- an export, derivative, research contribution, archive transfer, deletion, or migration was attempted or completed;
- a challenge, correction, reversal, or restoration occurred; and
- downstream copies or deletion remain uncertain.

Protected audit may include document-verification details, reviewer identities, anti-fraud signals, security evidence, legal advice, internal communications, and operational metadata. It must be minimized, access-controlled, retained under reviewed rules, and excluded from public or general analytics surfaces.

## AI and agent boundary

AI may:

- explain options in direct or narrative language;
- help draft a non-authoritative directive proposal;
- identify missing fields or conflicts;
- summarize source-linked case facts for a human reviewer;
- generate a family-health derivative draft from approved records; or
- assist with migration and format validation using bounded tools.

AI may not:

- determine death or incapacity;
- establish claimant identity or legal authority;
- choose which record controls a dispute;
- create, confirm, revoke, or broaden a directive or grant;
- impersonate the person;
- continue making choices in the person’s name;
- infer permission from sentiment, behavior, or historical preferences;
- approve research or archive use;
- suppress conflicts or uncertainty; or
- execute an irreversible operation without deterministic policy, required human authority, and step-up confirmation or review.

## Platform shutdown and institutional succession

A legacy capability is incomplete unless it accounts for Calypso’s Promise ceasing operation or changing operator before a directive activates.

A future shutdown and migration plan must define:

- advance notice where feasible;
- complete person-controlled export;
- directive export and external reference format;
- key, schema, provenance, receipt, and deletion-state migration;
- transfer to a reviewed successor custodian only under applicable authority;
- rejection or deletion options;
- treatment of unreachable or already deceased people;
- abandoned-account and protected-custody limits;
- successor-institution restrictions and audit;
- public institutional record of the transition without personal data; and
- final deletion, archive, or residual-copy evidence.

An operator, buyer, receiver, fork, foundation, trustee, or successor institution does not acquire personal authority by taking over infrastructure.

## Contract and module boundary

This capability should not be implemented inside `packages/health-schema` or as an extension of account authentication.

A later code package must be created only when there is a current implementation consumer, accepted contracts, dependency direction, owner, deterministic validation, synthetic fixtures, tests, and specialist-reviewed entry gate.

Expected dependency direction:

```text
identity and protected evidence adapters
             ↓ explicit facts
legacy and succession domain
             ↓ authority basis and bounded request
House of Keys policy domain
             ↓ allow / deny / indeterminate / protective-hold
execution adapters
             ↓ result evidence
receipts and protected audit
```

The Living Chronicle exposes stable resource, subject, source, category, export, and deletion references. It does not depend on legacy or permission state to define Chronicle truth.

## Synthetic fixtures and exercises

Public development must use fictional or synthetic people, Chronicles, directives, documents, claims, family relationships, recipients, and outcomes.

Minimum synthetic scenarios:

1. person names a steward, later revokes and replaces them;
2. temporary incapacity activates a narrow stewardship action, then direct control is restored;
3. false death report during account takeover;
4. forged death or fiduciary document;
5. verified death with no claimant authority;
6. named steward and executor conflict;
7. two competing court or estate records;
8. family requests a minimized derivative while a full export is prohibited;
9. complete export would expose a living relative;
10. research contribution is narrow but a recipient requests expansion;
11. archive embargo reaches review date with new living-person risk;
12. claimant requests deletion while another challenges;
13. restored backup contains a revoked directive;
14. provider shutdown occurs before activation;
15. successor institution attempts to treat migration as ownership;
16. person directed deletion but a lawful retention exception applies;
17. third-party correspondence has separate source restrictions;
18. an AI system attempts to create a deceased-person persona; and
19. no qualified reviewer is available for an urgent high-consequence request.

Each exercise must preserve assumptions, roles, ordered events, decisions, notices, receipts, containment, correction, restoration, residual harm, evidence status, and revalidation triggers.

## Specialist holdpoints

No production path may activate until the applicable holdpoints are satisfied or a separately reviewed, time-bounded exception is accepted:

- estate, probate, fiduciary, incapacity, digital-assets, contract, and electronic-signature law;
- actual HIPAA and health-privacy applicability;
- cross-border and conflicts-of-law analysis;
- identity, death, incapacity, document, and authority verification;
- fraud, abuse, coercion, and undue-influence safeguards;
- security architecture and operational readiness;
- accessibility and supported decision-making;
- genetic, family, minor, caregiver, and third-party privacy;
- clinical review for family-health derivatives;
- research ethics and governance;
- archive ethics and living-person protection;
- encryption, key recovery, long-term preservation, provider replacement, and shutdown;
- deletion, retention, backup, recipient, and residual-copy behavior;
- insurance, staffing, dispute, support, and incident operations; and
- named accountable owners with separation of duties.

Repository consistency, founding-steward acceptance, synthetic fixtures, or a vendor feature cannot satisfy independent specialist review by themselves.

## Initial validation invariants

Future contracts and validators should enforce at least:

- one stable directive identity with immutable revisions;
- no active revision can silently overwrite another;
- event evidence and claimant authority are separate references;
- a claimant cannot review or approve their own high-consequence claim without an explicit independence limitation and later review;
- no case can reach approved-restricted without an exact operation request;
- no operation authorization can omit purpose, recipient, categories, selectors, action, expiry, or authority basis;
- inactive, revoked, superseded, invalidated, stale, or contested authority cannot allow new operations;
- a protective hold identifies scope and review or expiry conditions;
- complete export, public archive, research release, and deletion require elevated review states;
- a successor cannot be represented as the original person or confirmer;
- House of Keys decision and execution evidence remain distinct;
- receipts reference decisions and operations without containing unrestricted protected evidence;
- third-party review status is explicit for complete exports, family derivatives, research, and archives;
- public fixtures contain no real person, health, family, legal, or estate information; and
- no status claims implementation, deployment, legal sufficiency, or independent approval without evidence.

## Unresolved design questions

- jurisdiction profile and conflict-of-law representation;
- supported estate and incapacity record types;
- identity and document proofing methods;
- authority precedence and human-review procedures;
- waiting periods, urgent exceptions, and service levels;
- long-term encryption, escrow, recovery, and format migration;
- retention, cost, subsidy, and abandoned-account rules;
- family-health derivative schema and clinical review;
- third-party notification, objection, and correction;
- research withdrawal after death and downstream-copy treatment;
- archive embargo, publication, quotation, and living-person rules;
- compensation, proceeds, benefit sharing, inheritance, property, and tax treatment;
- operator, verifier, reviewer, dispute, and appeal staffing;
- provider and successor-institution contracts;
- public transparency thresholds; and
- product language and lore integration.

These are explicit gates, not authority granted by omission.

## Success condition

The architecture is ready for implementation planning only when a person can understand and control what the platform records as their legacy instructions; a claimant can prove a bounded role without receiving automatic access; conflicting authority can be contained without premature disclosure or deletion; each operation can be evaluated through the House of Keys and recorded through receipts; living third parties remain protected; and the platform can preserve, migrate, close, export, or delete the Chronicle without claiming that death transfers ownership to the institution.
