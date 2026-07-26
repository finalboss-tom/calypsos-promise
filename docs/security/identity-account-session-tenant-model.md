# Identity, Account, Session, Tenant, and Authority Model

[Security architecture](README.md) · [Identity and authority register](identity-and-authority-register.md) · [Recovery and emergency access](account-recovery-and-emergency-access-model.md) · [Asset and authority register](asset-authority-register.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, and legal review pending  
**Workstream:** 5.2  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** provider-independent design only; no production authentication, identity proofing, account, session, delegation, recovery, operator, or emergency-access runtime is authorized or represented as deployed

## Purpose

This model defines how a future Calypso’s Promise implementation establishes who or what is acting, which controlled resource the action concerns, what authority is applicable, and how that context remains isolated through sessions, services, queues, storage, operators, recovery, and emergency response.

The model prevents five failures:

1. treating an authenticated account as proof of authority over any Chronicle;
2. letting callers choose another person, tenant, subject, or Chronicle through supplied identifiers;
3. treating a session, device, operator role, or network location as permanent trust;
4. allowing recovery or emergency access to silently expand Chronicle or House of Keys authority; and
5. making a founder, vendor, identity provider, or support actor an irreplaceable root of personal-data control.

## Decision summary

Identity is a collection of bounded domains, not one universal identifier.

A compliant future system must preserve these distinctions:

- a **person** is the human whose rights are protected;
- an **account identity** authenticates access to product capabilities;
- an **account-access link** relates an authenticated account boundary to a controlled resource under an explicit authority profile;
- a **Chronicle identity** is a stable pseudonymous resource identity independent from login providers;
- a **subject identity** identifies who or what a record concerns but does not grant control;
- an **actor identity** records who or what performed an action but does not grant authority merely by being named;
- a **session identity** represents one time-bounded authenticated interaction context;
- a **service identity** authenticates one bounded machine capability;
- a **recipient identity** identifies an authorized recipient without becoming an account, Chronicle, or operator identity;
- a **delegation or capacity record** supplies bounded authority facts but does not itself create a House of Keys grant; and
- a **recovery or emergency record** documents a constrained procedure and cannot become a permanent alternate identity path.

Authentication establishes actor context. It does not create Chronicle truth, permission truth, research authority, legal authority, product rewards, or governance power.

## Protected properties

The model protects:

- account and Chronicle-provider replaceability;
- stable pseudonymous Chronicle identity;
- cross-user, cross-subject, and cross-resource isolation;
- exact and reviewable authority;
- meaningful refusal and withdrawal;
- non-punitive recovery and loss of access;
- correction, export, and deletion rights;
- no health attributes or intimate knowledge as identity proof;
- no founder-only recovery path;
- least privilege and separation of duties;
- time-bounded sessions and elevated authority;
- person-visible evidence for consequential authority changes where safe;
- protected operational evidence without public disclosure; and
- truthful distinction between design, implementation, deployment, and verification.

## Identity domains

### Person identity

The canonical protected person does not require a legal name, email address, phone number, government identifier, provider subject, device account, wallet, public profile, research participant ID, diagnosis, or other health attribute.

A future implementation may need direct identifiers for a bounded purpose such as account communication or legally required verification. Those identifiers remain inside their bounded account or legal process and do not become portable Chronicle IDs or universal cross-domain identifiers.

### Account identity

Account identity belongs to authentication, account lifecycle, sessions, recovery, and verified delegation.

An account may have zero or more account-access links. An authenticated account with no applicable active link has no Chronicle access merely because authentication succeeded.

Provider subjects remain protected inside the account boundary. Replacing an authentication provider must not require rewriting Chronicle identity, subject identity, record history, provenance, permissions, receipts, export history, or deletion history.

### Chronicle identity

A Chronicle identity is a stable, opaque, pseudonymous resource identifier.

It must be:

- independent from direct identifiers and provider subjects;
- non-public by default;
- stable across credential, provider, operator, and infrastructure changes;
- separate from account, subject, source, permission, story, research, and governance identities; and
- portable without disclosing login credentials or provider-specific identifiers.

Pseudonymous does not mean anonymous. Public claims must not imply re-identification is impossible.

### Subject identity

Subject identity identifies who, what, or which context an assertion concerns. Subject identity cannot be used as an account credential, tenant selector, or authority proof.

The account actor, controlling person, Chronicle, subject, author, source, recipient, and confirmer may differ. Future caregiver, dependent, estate, or shared-data scenarios must preserve those distinctions.

### Actor identity

Actor identity records which human, service, connector, AI tool, import process, operator, migration process, or other bounded actor performed an action.

Actor identity must be paired with:

- actor class;
- authenticated or verified context where applicable;
- authority basis;
- action;
- controlled resource and subject scope;
- time;
- environment;
- reason or purpose when required; and
- related confirmation, decision, execution, receipt, or audit evidence.

Naming an actor is not authorizing an actor.

### Session identity

A session identity represents one bounded interaction context. It is not a person, account, Chronicle, or permission grant.

A session must be bound to:

- one account actor or explicit unauthenticated public context;
- issuing environment and service audience;
- authentication event and assurance evidence;
- issue, idle-expiry, absolute-expiry, and revocation times;
- authority-profile references rather than copied unlimited rights;
- the exact resource contexts resolved by server-side authority checks;
- step-up state where applicable;
- recovery or emergency restrictions where applicable; and
- session lifecycle and rotation evidence.

### Service identity

Every internal service, worker, queue consumer, deployment actor, receipt issuer, policy evaluator, export service, deletion service, AI gateway, and administrative tool requires its own bounded service identity.

A service identity authenticates a capability. It does not grant discretionary data authority. The service must still satisfy domain policy, purpose, resource, recipient, performing-actor, environment, and freshness requirements.

### Device and client identity

A device or client identifier may support risk assessment, credential binding, notification, or revocation. It does not establish person identity, Chronicle control, or permission by itself.

Device trust must expire, be revocable, and avoid creating a permanent hidden identity graph. A “trusted device” remains a risk input and possession factor, not an unlimited authority source.

## Account-access links and authority profiles

An account-access link relates an authenticated account actor to a controlled resource under an explicit authority profile.

Each link must record:

- stable link identity and revision;
- protected account-boundary reference;
- Chronicle or other controlled-resource reference;
- subject scope where applicable;
- authority-profile reference;
- authority basis and evidence references;
- lifecycle state;
- start, expiration, review, suspension, and removal times;
- creation, modification, and removal actors;
- prohibited actions;
- step-up and confirmation requirements;
- appeal and challenge state where applicable; and
- correction or supersession history.

An account-access link must not copy provider credentials into Chronicle records.

Changing credentials or authentication providers must not mutate resource identity or silently reactivate a suspended or removed link.

### Initial self-control profile

The initial architecture recognizes one controlling person for one Chronicle. A valid self-control profile may route that authenticated person to their controlled Chronicle.

The self-control profile does not make every session eligible for every action. Sensitive operations may require fresh policy evaluation, step-up authentication, confirmation, cooling periods, or other later controls.

### Delegated and representative profiles

Future delegated, caregiver, dependent, guardian, estate, successor, or representative profiles require separate evidence and authority gates.

They may never be inferred from:

- account sharing;
- family or household relationship;
- payment;
- contribution;
- device possession;
- contact-list membership;
- prior support interaction;
- source authorship;
- model prediction;
- operator preference; or
- governance status.

The architecture can represent those profiles without claiming they are legally sufficient in every jurisdiction.

## Authentication boundary

Authentication proves only the bounded facts supported by the chosen method and current evidence.

The design requires:

- provider-independent account and session contracts;
- authentication events with method and assurance references;
- anti-enumeration behavior;
- replay-resistant and phishing-resistant methods appropriate to consequence;
- rate limits and abuse controls;
- secure credential replacement and revocation;
- environment and audience binding;
- step-up authentication for consequential actions;
- no secrets or authenticators in public logs, URLs, analytics, or error messages; and
- no health, clinical, family, or intimate-history questions as authentication or recovery secrets.

No identity provider, credential format, passkey vendor, email provider, SMS provider, or government-proofing service is selected by Sprint 5.

## Session lifecycle

A session may use these states:

- **establishing** — authentication is incomplete;
- **active** — ordinary bounded actions may be evaluated;
- **step-up-required** — the requested consequence requires stronger or fresher authentication;
- **elevated** — one narrow high-consequence action or short window is authorized for evaluation;
- **restricted-recovery** — access exists only for recovery review and safe low-risk functions;
- **restricted-operator** — an operator can use only named administrative capabilities;
- **emergency-containment** — a break-glass capability is active under an expiring emergency record;
- **suspended** — activity is temporarily blocked pending review;
- **revoked** — the session must no longer be accepted;
- **expired** — time bounds ended; or
- **compromised** — evidence indicates possible unauthorized control and containment is required.

State changes are explicit and attributable. A client cannot self-assert a session state or elevation.

### Session creation

Session creation must:

1. validate the authentication event;
2. create or rotate the session identifier;
3. bind issuer, audience, environment, and account actor;
4. resolve no Chronicle or tenant authority from caller input;
5. load applicable account-access links through a bounded server-side authority service;
6. establish idle and absolute expiry;
7. record method and assurance evidence without copying secrets;
8. apply recovery, operator, or emergency restrictions; and
9. emit protected lifecycle evidence.

### Session rotation

Rotation is required after:

- successful authentication;
- step-up authentication;
- credential or recovery-method change;
- privilege or authority-profile change;
- account-access-link change;
- recovery completion;
- operator elevation;
- emergency-access activation or closure;
- detected fixation or replay risk; or
- material security-policy change.

### Session revocation

Revocation must propagate to:

- public or private edge validation;
- domain-service caches;
- active clients;
- queued work that depends on the session;
- MCP or API credentials derived from the session;
- recovery or operator workflows; and
- other identified environments where the session can be used.

Revoking an account session does not delete the Chronicle. Deleting an account does not imply Chronicle deletion. Chronicle deletion does not prove every account or operational record may be immediately erased.

## Step-up authentication

Step-up authentication adds fresh bounded assurance. It does not create new underlying authority.

Later threat and control work should treat at least these actions as candidates for step-up or an equivalent high-consequence control:

- changing credentials or recovery methods;
- creating, expanding, or removing an account-access link;
- granting, withdrawing, or changing sensitive permission;
- export preparation or delivery;
- deletion initiation or cancellation;
- connector authorization;
- creating remote agent or MCP credentials;
- adding a delegate or representative;
- changing high-risk notification destinations;
- accessing security-sensitive operational functions; and
- activating emergency or break-glass capability.

The exact methods and thresholds remain implementation and specialist-review decisions.

## Tenant and resource isolation

“Tenant” is an implementation isolation context, not a canonical person or authority identity.

A future implementation may partition by account, Chronicle, controlled resource, organization, environment, or another bounded key. Whatever partitioning is selected, the security invariant is that a caller cannot select or broaden its partition through a supplied identifier.

### Server-derived resource context

For every private request:

1. authenticate the actor and session;
2. resolve active account-access links server-side;
3. derive the allowed controlled-resource and subject contexts;
4. validate action-specific authority and policy;
5. construct bounded repository, object, cache, queue, AI, export, receipt, and audit contexts; and
6. reject missing, ambiguous, conflicting, or stale context.

A request body, URL, tool argument, model output, connector payload, queue message, or client state may reference a resource for comparison, but it cannot make the resource authoritative.

### Isolation layers

Isolation is required across:

- edge routing;
- domain-service commands and queries;
- structured repositories and database access;
- raw object storage and signed access;
- queues and worker claims;
- caches and rate-limit keys;
- search, embeddings, indexes, and retrieval;
- AI and document-processing contexts;
- exports and temporary artifacts;
- receipts and person-visible history;
- logs, traces, metrics, and protected audit evidence;
- administrative capabilities;
- backups, replicas, and restoration; and
- analytics and research environments.

No direct client, AI model, MCP client, analytics worker, or operator receives an arbitrary query interface over multiple private partitions.

### Isolation failure behavior

When resource context is missing, ambiguous, conflicting, or inconsistent across layers:

- the operation is denied or held as indeterminate;
- no fallback chooses the first or default tenant;
- queued or cached work is not executed under a broader context;
- no partial data is returned;
- protected evidence is recorded;
- affected sessions or services may be contained; and
- revalidation is required before resuming the operation.

## Delegation and capacity

Delegation identifies a human or accountable service permitted to act for a bounded purpose. Capacity identifies whether an authority basis is currently valid and sufficient for the requested action.

Delegation and capacity remain separate from House of Keys grants:

- identity and capacity determine whether an actor can represent a granting authority or perform an action;
- House of Keys determines whether the bounded purpose, recipient, scope, action, conditions, and duration are permitted; and
- execution records what actually happened.

A valid delegation record requires:

- delegator or legal authority basis;
- delegate identity and actor class;
- controlled resource and subject scope;
- allowed and prohibited actions;
- purpose and recipient limitations;
- start, expiration, review, and removal conditions;
- confirmation and comprehension requirements where applicable;
- evidence provenance and confidence or dispute state;
- capacity status;
- conflict and precedence rules;
- person-visible explanation and challenge path where safe;
- responsible reviewer or role;
- correction and supersession history; and
- explicit downstream effects on sessions and account-access links.

Delegates cannot:

- change their own authority basis;
- expand their resource or subject scope;
- create broader secondary-use permission;
- convert delegated capture into control over correction, export, deletion, or research;
- suppress the controlling person’s receipts or challenge path;
- retain authority after expiration, withdrawal, conflict, or loss of capacity; or
- transfer authority onward unless the exact authority basis explicitly permits it.

Missing, contested, expired, conflicting, or unverifiable capacity fails closed. A high-confidence model prediction does not resolve capacity.

## Operator and administrative authority

Operators act through explicit administrative capabilities, not unrestricted database access.

Every administrative capability must define:

- stable capability identity and revision;
- responsible role;
- permitted action and purpose;
- affected service, environment, resource, and data fields;
- prohibited actions;
- approval, step-up, or break-glass requirements;
- start and expiration;
- person-visible evidence where safe;
- protected audit fields;
- monitoring and anomaly review;
- revocation and containment;
- appeal, correction, and restoration; and
- revalidation trigger.

Operator, maintainer, founder, vendor, security responder, support, database administrator, or cloud-account ownership does not create ordinary Chronicle truth or House of Keys authority.

### Administrative interfaces

Administrative services:

- remain on private origins;
- require separate operator identity and sessions;
- use least-capability actions rather than arbitrary SQL or object browsing;
- do not expose full personal records where a minimized reference is sufficient;
- separate deployment, security, support, audit, and key-management duties where capacity allows;
- prohibit shared operator accounts;
- prohibit silent impersonation of a person;
- clearly label any authorized support-view or simulation mode;
- require short-lived elevation for sensitive actions; and
- produce attributable protected evidence.

Phase 0 may not support full separation of duties. That limitation must be recorded as key-person and independence risk rather than hidden.

## Recovery boundary

Recovery restores bounded access after loss or compromise. It does not prove or expand Chronicle control.

The detailed [Account Recovery and Emergency Access Model](account-recovery-and-emergency-access-model.md) defines recovery classes and procedure.

Core recovery invariants are:

1. account recovery, Chronicle-control recovery, permission recovery, key recovery, operator recovery, and institutional continuity are separate processes;
2. recovery never accepts knowledge of health history or intimate data as a secret;
3. recovery does not reactivate removed account-access links or withdrawn grants by default;
4. recovery invalidates or contains old sessions and credentials;
5. high-consequence actions remain restricted until required review and cooling conditions are met;
6. recovery changes are notified through safe independent channels where possible;
7. contested recovery fails closed and preserves appeal and restoration;
8. recovery preserves correction, receipt, permission, export, and deletion history; and
9. legitimate recovery must not depend solely on founder knowledge, founder credentials, or one vendor.

## Emergency and break-glass authority

Emergency authority is a narrow containment mechanism, not a general override.

A break-glass action must:

- address an active or imminent security, availability, integrity, or safety condition;
- use the narrowest capability capable of containment;
- state purpose, scope, environment, affected resources, and prohibited actions;
- require an identified accountable actor;
- require stronger authentication and an explicit emergency declaration;
- expire automatically;
- produce protected evidence before or immediately after activation;
- preserve person-visible evidence where safe and lawful;
- trigger independent or later-adversarial review;
- prohibit permanent policy, permission, or truth changes;
- prohibit research, commercial use, unrelated browsing, or convenience access;
- include restoration and residual-harm review; and
- be revoked when the emergency condition ends.

Emergency authority may suspend an operation, isolate a service, revoke sessions, disable a connector, block release, quarantine an upload, rotate a secret, or preserve bounded incident evidence.

It may not silently confirm Chronicle records, create or broaden grants, export personal data for convenience, suppress receipts, erase correction history, or redesign permanent policy.

## Cross-system propagation

Identity and authority changes must propagate to dependent systems.

At minimum, a future implementation must identify the effects of:

- account suspension or deletion;
- credential and recovery-method rotation;
- session revocation;
- account-access-link change;
- delegation activation, suspension, expiration, or removal;
- capacity conflict;
- operator-role change;
- emergency-access activation or expiration;
- Chronicle control transfer;
- permission withdrawal or invalidation; and
- detected account or service compromise.

Dependent caches, queues, API or MCP credentials, connector workers, export jobs, AI contexts, administrative sessions, and notification paths must not continue using stale authority.

## Audit and person-visible evidence

Identity, session, authority, recovery, operator, and emergency events require protected evidence. Person-visible evidence is also required when it improves control and does not expose security-sensitive details.

Records should distinguish:

- authentication event;
- session creation, rotation, elevation, restriction, revocation, and expiration;
- account-access-link creation, change, suspension, and removal;
- delegation and capacity change;
- credential and recovery-method change;
- recovery attempt, result, rollback, and closure;
- operator capability use;
- emergency declaration, action, expiration, and review;
- affected policy or execution invalidation; and
- notification, challenge, restoration, and residual harm.

Protected audit cannot become a shadow identity graph, Chronicle, or unrestricted operator-search surface.

## Privacy and anti-correlation

The implementation must:

- keep direct identifiers out of Chronicle, subject, permission, receipt, and public IDs;
- keep provider subjects and credential identifiers inside protected mappings;
- avoid one public identifier across product, research, governance, payment, and support domains;
- minimize device, network, risk, and behavioral metadata;
- define retention and deletion for identity and security metadata;
- prevent health attributes from becoming identity proof or fraud scoring;
- avoid identity assurance or risk scores becoming product progression or governance weight;
- prevent operators and analytics from constructing an unrestricted global identity graph; and
- preserve enough protected mapping evidence for legitimate correction, export, deletion, recovery, and incident response.

## Founder and provider independence

A compliant future implementation can replace:

- authentication provider;
- communication provider;
- session store;
- hosting and deployment operator;
- storage provider;
- AI provider;
- connector provider;
- security responder;
- maintainer; and
- founding steward

without rewriting Chronicle identity, changing the meaning of subject identity, losing authority history, or requiring founder intervention for legitimate recovery.

Before founder independence can be claimed, the project must complete founder-absence and leadership-transition exercises and verify legitimate continuity of critical credentials, releases, infrastructure, archives, and emergency authority.

## Required control baseline

The detailed register assigns stable IDs. At minimum, 5.2 requires controls for:

- provider-independent account links;
- server-derived controlled-resource context;
- session issue, rotation, expiry, and revocation;
- action-specific step-up authentication;
- layered tenant and resource isolation;
- explicit delegation and capacity evidence;
- recovery separated from permission and Chronicle control;
- restricted post-recovery access;
- least-capability operator interfaces;
- short-lived emergency authority;
- no shared or founder-only administrative identity;
- safe notification, appeal, and restoration; and
- authority propagation to caches, queues, agents, connectors, and exports.

## Explicit non-scope and specialist gates

This model does not select or certify:

- authentication or identity provider;
- password, passkey, token, MFA, biometrics, government-ID, or proofing implementation;
- legal capacity, guardian, caregiver, dependent, estate, minor, or emergency authority by jurisdiction;
- account, session, tenant, or authorization storage technology;
- anti-Sybil or governance identity;
- fraud, risk-scoring, device-fingerprinting, or behavioral-biometrics systems;
- production operator, support, security-operations, or incident tooling;
- live break-glass or impersonation behavior;
- service-level commitments;
- legal ownership of health records or source documents; or
- production readiness.

Privacy, security, legal, accessibility, clinical, minor/caregiver, and jurisdiction-specific review remain required before applicable implementation.

## Completion evidence

Workstream 5.2 is complete at the internal architecture level when:

- identity domains and their non-authority boundaries are explicit;
- account-access links and authority profiles are defined;
- sessions have explicit lifecycle, expiry, step-up, and revocation behavior;
- controlled-resource context is derived server-side rather than supplied by callers;
- isolation obligations cover every trust layer in 5.1;
- delegation and capacity remain separate from permission and execution;
- operator capabilities are bounded and attributable;
- recovery does not expand Chronicle or House of Keys authority;
- emergency access is narrow, expiring, reviewable, and restorative;
- founder and provider replacement remain possible;
- stable identity, session, isolation, authority-profile, recovery, operator, emergency, and control IDs exist;
- public artifacts contain only PUBLIC architecture and synthetic-only material; and
- independent specialist review remains explicitly pending.
