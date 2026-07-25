# House of Keys Ontology and Authority Boundary

**Status:** PROPOSED Sprint 4 conceptual baseline  
**Workstream:** 4.1 — Authority, identity, and domain boundary  
**Tracking issue:** #32

## Purpose

The House of Keys makes purpose-specific authority a first-class domain. It answers whether a defined actor may perform a defined action over a defined data scope for a defined purpose, recipient, context, and time.

It does not define Chronicle truth, account authentication, legal conclusions, research enrollment, product progression, compensation, or provider implementation.

## Governing rules

This ontology implements and may not weaken:

- the frozen Product Constitution
- the frozen Architecture Foundation
- the controlled vocabulary and deterministic incentive contract
- the Sprint 3 separation of Chronicle truth and permission truth
- the Institutional Immune System
- the repository and module-boundary rules

The direct meaning must always remain available without narrative traversal. A **Key** is a versioned consent or authorization grant. The **House of Keys** is the policy and consent capability. A **Receipt** is an append-only access record.

## Permission truth

Permission truth records what a specific authority currently permits, denies, limits, withdraws, or leaves unresolved.

Permission truth is not:

- Chronicle truth about a person’s health or lived experience
- source truth about what a document, person, device, or service asserted
- proof that an action actually occurred
- proof that an action was safe, legal, clinically appropriate, or beneficial
- account authentication or identity proofing
- research enrollment or a commercial agreement
- product, quest, progression, reward, or governance state
- AI memory or an AI-generated explanation

A system may present these domains together, but composition does not merge their authority.

## Initial authority model

The initial Sprint 4 baseline assumes one controlling person for one Chronicle. Shared control, caregiver authority, dependents, proxies, estates, emergencies, minors, and institutional representatives remain explicit future design work.

### Controlling person

The human whose authority is required for the initial Chronicle permission model.

The controlling person may:

- create a proposed grant through an explicit confirmation action
- inspect active, inactive, expired, withdrawn, and superseded grants
- refuse or defer a request without losing core product rights
- revoke future authority within the accepted revocation model
- inspect access receipts
- challenge an inaccurate grant, decision, explanation, or receipt

The controlling person’s authority is not inferred from engagement, payment, contribution, health detail, research interest, or a model prediction.

### Subject

The person or thing the affected data concerns.

The subject and controlling person are the same in the initial baseline. The distinction remains explicit because later authority models may involve dependents, delegated control, shared data, or records about another subject.

### Account actor

An authenticated actor operating through an account or session.

Authentication may establish who is interacting with the system. It does not by itself establish authority over a Chronicle, grant, purpose, recipient, or action. Provider-specific account identifiers must not become canonical consent identities.

### Requester

The actor asking the policy evaluator for a decision.

A requester may describe a proposed operation, but cannot create authority merely by requesting it. The requester may differ from the recipient, processor, interface, agent, or infrastructure operator.

### Recipient

The bounded party or recipient class authorized to receive, use, or act upon the selected data for the selected purpose.

A recipient identity must be stable enough to inspect and compare. Broad labels such as “partners,” “trusted parties,” or “the community” are not sufficient recipient identities unless a later reviewed taxonomy defines a bounded class and its membership rules.

### Processor or performing actor

The actor that attempts or performs the operation.

A processor may execute an allowed operation but cannot broaden the purpose, recipient, categories, action, duration, or conditions. Infrastructure custody does not create permission authority.

### Granting authority

The human or later-authorized authority whose explicit confirmation creates or changes a grant.

In the initial baseline, only the controlling person can supply this confirmation. AI, connectors, recipients, processors, requesters, operators, maintainers, and governance bodies have no independent granting authority.

### Policy evaluator

A deterministic domain component that evaluates explicit facts and returns an inspectable result.

The evaluator:

- does not authenticate the caller
- does not obtain facts from a database by itself
- does not create or modify grants
- does not perform the requested action
- does not issue legal conclusions
- does not silently infer permission from missing facts
- does not treat model confidence as authority

Its result is one of `allow`, `deny`, or `indeterminate`, with reasons and references to the facts and contract revision used.

### Receipt issuer

The accountable component that records a decision, attempt, access, denial, or failure as defined by the receipt contract.

A receipt issuer records what the system claims happened. It does not create permission, validate Chronicle truth, or prove external legal compliance. Receipt integrity and production audit infrastructure remain later implementation concerns.

## Core permission objects

### Purpose

A stable, versioned statement of why an action is requested.

A purpose must be specific enough to distinguish materially different uses. A broad or compatible-sounding label cannot silently substitute for a narrower accepted purpose.

### Data category

A stable, versioned description of the affected data scope.

Data categories describe permission scope, not clinical validity or source ownership. They may reference Chronicle data through explicit identifiers or selectors without becoming part of the Chronicle aggregate.

### Action

The operation being evaluated, such as view, retrieve, transform, transmit, export, correct, or delete where later contracts permit those actions.

Permission for one action does not imply permission for another.

### Grant

A versioned record binding:

- granting authority
- subject or controlled resource
- purpose
- recipient
- requester or performing-actor constraints where applicable
- data categories or selectors
- allowed actions
- start and end conditions
- lifecycle state
- explanation and comprehension evidence
- revision and supersession history

A grant is not blanket consent, permanent trust, data ownership, research enrollment, or authorization for unspecified future use.

### Policy request

A complete, explicit set of facts submitted for evaluation.

A policy request must not rely on hidden defaults for purpose, recipient, scope, action, or time. Missing facts produce `indeterminate` or `deny` according to the accepted policy revision, never implicit allow.

### Policy decision

A deterministic result with:

- outcome
- reasons
- policy version
- evaluated facts
- matching or conflicting grant references
- relevant lifecycle and revocation facts
- evaluation time
- uncertainty or missing-fact details

A decision does not prove that access occurred.

### Access receipt

An append-only record describing a policy decision, attempted operation, completed access, denial, or failure.

A receipt remains separate from the grant and decision because authorization, attempted execution, and completed execution are different claims.

## Authority invariants

1. No actor is authorized merely because it can be named, authenticated, connected, or operated by the project.
2. A requester cannot grant its own request.
3. A recipient cannot broaden its own purpose, scope, action, or duration.
4. A processor or custodian cannot convert technical access into permission authority.
5. AI may draft or explain but cannot grant, revoke, expand, or authoritatively interpret permission.
6. A policy evaluator cannot create facts, grants, or receipts outside its explicit input and output contract.
7. A receipt cannot retroactively authorize an action.
8. Missing, ambiguous, stale, expired, withdrawn, superseded, invalid, or conflicting authority does not default to allow.
9. A grant for one purpose, recipient, category, action, or period does not imply another.
10. Refusal or withdrawal does not reduce core product rights, progression, service quality, governance standing, or return behavior.
11. Export authority does not authorize secondary use of the exported data.
12. Permission does not establish Chronicle truth, clinical validity, safety, legality, or research approval.

## Lifecycle boundary

Sprint 4 will define proposed, active, suspended, expired, withdrawn, superseded, invalidated, and other necessary states through the grant and revocation workstreams.

At this boundary:

- revocation is prospective and must deny future access under the accepted policy
- revocation does not pretend prior access never occurred
- prior receipts remain inspectable
- retention after revocation is a separate, explicit question rather than silent continued authority
- a new grant does not erase the history of an older grant
- a grant change creates a new revision or successor rather than rewriting the prior record without evidence

## Relationship to other domains

### Living Chronicle

The Chronicle may expose stable record, category, source, or export references for policy evaluation. It does not store or decide consent grants.

### Accounts and identity

Authentication supplies actor facts through a later integration boundary. House of Keys does not select identity providers or proofing methods.

### AI and MCP

AI and MCP may request explanations, draft grant text, or invoke a policy-enforced operation. They cannot bypass deterministic evaluation or user confirmation.

### Content and narrative

Narrative may call a permission a Key and the service the House of Keys. Direct language must disclose the real purpose, recipient, categories, actions, duration, revocation behavior, consequences, and optionality.

### Research and commerce

Research and commercial uses require their own later governance and operational gates. Sprint 4 may represent a purpose category without implementing enrollment, compensation, markets, or real recipient access.

### Audit and security

Receipts provide a domain contract for inspectability. Production log integrity, storage, monitoring, encryption, key management, incident response, and the integrated threat model remain later work.

## Initial unresolved register

- delegated, shared, caregiver, dependent, estate, emergency, and minor authority
- identity proofing and account recovery
- recipient registration, verification, class membership, and replacement
- jurisdiction-specific legal bases and consent requirements
- retention duties after revocation
- emergency or mandatory processing
- cross-organization federation and downstream-recipient control
- cryptographic receipt integrity and audit retention
- concurrent changes and distributed policy caches
- production notification and appeal service levels
- specialist privacy, legal, accessibility, security, clinical, and research approval

These are explicit hold points, not permission granted by omission.

## Success condition

The House of Keys boundary is sound when a person can understand who is asking, who would receive or perform the action, why it is requested, what data and actions are involved, how long authority lasts, how to refuse or revoke, and what the system decided and recorded—without consent becoming Chronicle truth or implementation convenience becoming authority.
