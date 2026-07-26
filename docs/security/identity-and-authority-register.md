# Identity, Session, Isolation, and Authority Register

[Security architecture](README.md) · [Identity and account model](identity-account-session-tenant-model.md) · [Recovery and emergency access](account-recovery-and-emergency-access-model.md) · [Asset and authority register](asset-authority-register.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, and legal review pending  
**Workstream:** 5.2  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** design register only; IDs and control records do not authorize or represent production identity, session, operator, recovery, or emergency capabilities

## Purpose

This register assigns stable identities to the identity domains, account-authority profiles, session classes, isolation layers, recovery classes, operator capabilities, emergency capabilities, and required controls defined by workstream 5.2.

Later threat, control, tabletop, implementation, exception, and completion records should reference these IDs where applicable.

## Identifier families

- Identity domains use `IDN-*`.
- Account-authority profile classes use `IAP-*`.
- Session classes use `SES-*`.
- Isolation layers use `ISO-*`.
- Recovery classes use `RCV-*`.
- Operator capability classes use `OPR-*`.
- Emergency capability classes use `EMG-*`.
- Required controls use `CTL-ID-*`.

An ID is a design reference. It does not establish identity, authority, control, implementation, or deployment.

## Identity domains

| ID | Identity domain | Authority boundary |
| --- | --- | --- |
| `IDN-PERSON` | Protected human person | Rights-bearing human; not required to equal a legal name, provider subject, wallet, or public identity |
| `IDN-ACCOUNT` | Authentication account | Authenticates an account actor; does not own Chronicle truth or permission |
| `IDN-ACCOUNT-LINK` | Account-access link | Relates an account actor to a controlled resource under one explicit authority profile |
| `IDN-CHRONICLE` | Chronicle pseudonym | Stable controlled-resource identity independent from login providers and direct identifiers |
| `IDN-SUBJECT` | Chronicle subject | Identifies who or what an assertion concerns; does not grant control |
| `IDN-ACTOR` | Human or system actor | Attributes an action; naming does not authorize |
| `IDN-SESSION` | Session context | Time-bounded authenticated context; not a person, Chronicle, or grant |
| `IDN-SERVICE` | Internal service identity | Authenticates one bounded machine capability; no discretionary data authority |
| `IDN-DEVICE` | Device or client reference | Risk, possession, notification, or revocation input; not person or Chronicle proof |
| `IDN-RECIPIENT` | Recipient identity | Identifies a bounded recipient; does not become account or operator identity |
| `IDN-OPERATOR` | Operator identity | Authenticates a bounded administrative actor; no ordinary personal-data authority |
| `IDN-ORGANIZATION` | External or institutional organization | Bounded organization reference; no inherent data, research, or governance authority |
| `IDN-RECOVERY-CASE` | Recovery case identity | Tracks one constrained recovery procedure; cannot become permanent identity |
| `IDN-EMERGENCY` | Emergency declaration identity | Tracks one expiring containment authority; cannot become permanent policy |

## Account-authority profile classes

These profiles describe the kind of account-access relationship that later evidence may authorize. They are not automatically active and do not replace House of Keys grants.

| ID | Profile | Permitted boundary | Explicit prohibitions |
| --- | --- | --- | --- |
| `IAP-SELF-CONTROL` | Initial controlling-person access | Route a verified controlling person to one controlled Chronicle | No blanket permission; high-consequence actions still require exact policy and step-up controls |
| `IAP-DELEGATED-CAPTURE` | Bounded human capture assistance | Propose or record draft information for defined subjects and duration | No confirmation, correction, export, deletion, permission, or onward delegation unless separately authorized |
| `IAP-DELEGATED-REVIEW` | Bounded review assistance | Inspect or comment on a defined record set for one purpose | No canonical write, permission change, or unrelated browsing |
| `IAP-REPRESENTATIVE-CONTROL` | Future guardian, caregiver, dependent, estate, or legal representative | Only actions supported by explicit evidence, capacity, scope, and jurisdictional review | No universal or perpetual control; no inference from relationship alone |
| `IAP-RECOVERY-RESTRICTED` | Temporary post-recovery access | Safe low-risk account and recovery review functions | No export, deletion, connector, external sharing, new delegates, permission expansion, or new agent credentials until release conditions are met |
| `IAP-SUPPORT-LIMITED` | Bounded support capability | Diagnose or correct named account or system state through minimized interfaces | No silent impersonation, raw database browsing, Chronicle truth change, or permission change |
| `IAP-SECURITY-CONTAINMENT` | Security-response capability | Revoke sessions, isolate services, disable flows, quarantine uploads, preserve bounded evidence | No unrelated personal-data use or permanent policy change |
| `IAP-MIGRATION-REPAIR` | Bounded deterministic repair or migration | Perform a versioned, reversible, reviewed repair over a defined scope | No discretionary record meaning change, permission expansion, or operator browsing |
| `IAP-RECEIPT-ISSUER` | Receipt issuance service | Record exact person-visible claims for one decision or execution event | Cannot create permission or rewrite operational history |
| `IAP-NONE` | Authenticated without controlled-resource authority | Public or account-only functions | No private Chronicle, source, permission, export, or deletion access |

## Session classes

| ID | Session class | Purpose | Restrictions |
| --- | --- | --- | --- |
| `SES-PUBLIC` | Unauthenticated public context | Public website and public documentation | PUBLIC information only |
| `SES-ORDINARY` | Ordinary authenticated session | Evaluate low- and medium-consequence account and product actions | No authority beyond active server-resolved profiles and policy |
| `SES-STEP-UP` | Fresh elevated session | One high-consequence action or narrow time window | Action, audience, environment, resource, and expiry bound |
| `SES-RECOVERY` | Restricted recovery session | Review and complete bounded recovery | High-consequence actions blocked until release conditions |
| `SES-DELEGATE` | Delegated actor session | Exercise one active delegation profile | Cannot expand delegation or impersonate controlling person |
| `SES-OPERATOR` | Restricted operator session | Use named administrative capabilities | Separate operator identity, private origin, short expiry, protected audit |
| `SES-EMERGENCY` | Emergency containment session | Use one active break-glass capability | Narrow purpose, automatic expiry, post-action review, no permanent authority |
| `SES-SERVICE` | Service-to-service session | Invoke one bounded internal capability | Audience, environment, method, and capability bound; no user-selected tenant |
| `SES-SUSPENDED` | Suspended context | Preserve state while blocking operation | No private actions |
| `SES-COMPROMISED` | Known or suspected compromised context | Containment and investigation only | Rejected for ordinary operation and dependent credentials invalidated |

## Isolation layers

| ID | Layer | Required invariant |
| --- | --- | --- |
| `ISO-EDGE` | Edge and request routing | Authenticated context and environment are derived before private routing; no caller-selected tenant authority |
| `ISO-DOMAIN` | Domain commands and queries | Every action receives exact controlled resource, subject, actor, purpose, and authority context |
| `ISO-STRUCTURED` | Structured repositories and database access | Repository methods are partition-scoped; no arbitrary cross-tenant query interfaces |
| `ISO-OBJECT` | Raw source and object access | Object references are resource-bound, short-lived, purpose-specific, and non-enumerable |
| `ISO-QUEUE` | Queues and workers | Jobs carry immutable authority references, freshness, cancellation, idempotency, and resource scope |
| `ISO-CACHE` | Cache and rate-limit state | Keys include environment and controlled-resource context; invalidation follows authority change |
| `ISO-RETRIEVAL` | Search, embeddings, and indexes | Tenant isolation, source references, disposable derivatives, deletion and rebuild behavior |
| `ISO-AI` | AI, parsing, and document processing | Minimized authorized context; outputs untrusted; no model-selected resource or tool authority |
| `ISO-EXPORT` | Exports and temporary artifacts | Exact snapshot, delivery identity, short retention, integrity, and deletion of temporary copies |
| `ISO-RECEIPT` | Person-visible receipts | Person and resource partitioning, exact references, minimized content, correction chain |
| `ISO-AUDIT` | Protected logs, traces, and audit | Field allowlists, restricted search, retention, integrity, no shadow Chronicle or identity graph |
| `ISO-ADMIN` | Administrative capability | Private origin, separate identity, least-capability interface, no arbitrary SQL or impersonation |
| `ISO-BACKUP` | Backup and restoration | Same or stricter partitioning, deletion-aware restoration, no cross-environment contamination |
| `ISO-ANALYTICS` | Analytics and research | Isolated purpose-specific datasets, output review, no alternate permission system or full raw replica |

## Recovery classes

| ID | Recovery class | Restores | Does not restore or create |
| --- | --- | --- | --- |
| `RCV-CREDENTIAL` | Credential replacement | Ability to authenticate an existing account after verified recovery | Chronicle control, removed account links, withdrawn permission |
| `RCV-ACCOUNT` | Account access recovery | Bounded account access and recovery review | Automatic high-consequence access or secondary-use authority |
| `RCV-CONTROL` | Contested Chronicle-control recovery | A reviewed controlling-authority relationship when evidence supports it | Universal legal authority or silent override of another claimant |
| `RCV-DELEGATE` | Delegate access recovery | One active delegation profile | Expanded scope or renewed expired delegation |
| `RCV-OPERATOR` | Operator access recovery | Bounded operator role after organizational verification | Personal-data access outside named capabilities |
| `RCV-SERVICE` | Service identity recovery | One service capability after key or credential replacement | Cross-service or cross-environment authority |
| `RCV-KEY` | Cryptographic key recovery | Authorized decryption or signing capability under the later key hierarchy | Data authority, permission, or operator discretion |
| `RCV-INSTITUTION` | Institutional continuity | Legitimate continuity of releases, infrastructure, archives, and governance operations | Founder permanence or personal Chronicle authority |

## Operator capability classes

| ID | Capability | Allowed actions | Prohibited actions |
| --- | --- | --- | --- |
| `OPR-DEPLOY` | Deployment operator | Deploy, roll back, inspect safe deployment health | No personal-record browsing or permission change |
| `OPR-SUPPORT` | Support operator | Use minimized account and workflow diagnostics | No silent impersonation, raw Chronicle access, or unrelated search |
| `OPR-SECURITY` | Security responder | Contain incidents, revoke sessions, isolate services, preserve bounded evidence | No unrelated use, permanent policy change, or suppression of person rights |
| `OPR-AUDIT` | Audit reviewer | Review allowlisted evidence for an approved purpose | No shadow analytics or raw data exploration |
| `OPR-DATA-REPAIR` | Deterministic repair operator | Execute an approved repair or migration plan | No discretionary clinical, historical, or permission edits |
| `OPR-KEY` | Key-management operator | Perform bounded key lifecycle actions under separation-of-duty rules | No application-data use or sole irreversible authority |
| `OPR-RECOVERY` | Recovery reviewer | Review recovery evidence and issue bounded outcomes | No self-approval, permanent authority, or health-history proofing |
| `OPR-INCIDENT-COMMS` | Incident communications | Notify affected parties and publish safe derivatives | No access to more personal or security detail than necessary |

## Emergency capability classes

| ID | Emergency capability | Permitted containment | Prohibited expansion |
| --- | --- | --- | --- |
| `EMG-SESSION-REVOKE` | Revoke active sessions and derived credentials | Suspected takeover or session compromise | No new account or Chronicle authority |
| `EMG-FLOW-STOP` | Stop or pause a service, queue, connector, export, or release flow | Active leakage, stale authority, or integrity failure | No permanent policy redesign |
| `EMG-SERVICE-ISOLATE` | Remove a service or environment from traffic | Compromise, corruption, unsafe dependency | No unrelated data inspection |
| `EMG-UPLOAD-QUARANTINE` | Quarantine an upload, document, or source artifact | Malware or parser risk | No automatic Chronicle confirmation or indefinite retention |
| `EMG-SECRET-ROTATE` | Rotate or revoke a secret, key, or certificate | Exposure or suspected compromise | No discretionary data access |
| `EMG-READ-ONLY` | Place a bounded domain into read-only mode | Integrity or destructive-action risk | No silent denial of export or correction beyond the expiring containment window |
| `EMG-EVIDENCE-HOLD` | Preserve minimized incident evidence | Active investigation or legal holdpoint | No broad surveillance or indefinite retention without review |
| `EMG-RECOVERY-FREEZE` | Freeze high-consequence actions during contested recovery | Account takeover or authority dispute | No permanent deprivation or unreviewable founder control |

## Required control register

### `CTL-ID-001` — Provider-independent account-access links

- **Status:** required and designed
- **Classes:** preventive, limiting, recovery
- **Protects:** `IDN-CHRONICLE`, `IDN-ACCOUNT-LINK`, provider replaceability
- **Requirement:** account-provider identity remains inside a protected mapping; Chronicle identity and history survive provider rotation
- **Evidence:** identity model and prior Living Chronicle identity baseline
- **Residual risk:** exact provider, mapping storage, migration, and operational validation remain unresolved
- **Owner:** future identity owner
- **Revalidation:** provider or account-model selection

### `CTL-ID-002` — Server-derived controlled-resource context

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** cross-user and cross-subject isolation
- **Requirement:** private resource and subject scope derives from authenticated context and active authority profiles, never caller-supplied ownership
- **Evidence:** identity model and `ISO-EDGE` through `ISO-DOMAIN`
- **Residual risk:** implementation and adversarial validation pending
- **Owner:** future identity and domain owners
- **Revalidation:** first private API or agent interface

### `CTL-ID-003` — Session lifecycle, rotation, expiry, and revocation

- **Status:** required and designed
- **Classes:** preventive, limiting, containment
- **Protects:** account, session, and dependent credentials
- **Requirement:** explicit session states, idle and absolute expiry, rotation after authority change, revocation propagation
- **Evidence:** session model and classes
- **Residual risk:** store, transport, browser, mobile, API, and MCP details unresolved
- **Owner:** future identity owner
- **Revalidation:** authentication implementation

### `CTL-ID-004` — Action-specific step-up authentication

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** credentials, permission changes, exports, deletion, connectors, delegates, agents, and emergency actions
- **Requirement:** fresh bounded assurance for high-consequence actions; step-up does not create underlying authority
- **Evidence:** identity model
- **Residual risk:** methods, thresholds, accessibility, and fallback require specialist review
- **Owner:** future identity and accessibility owners
- **Revalidation:** high-consequence action implementation

### `CTL-ID-005` — Layered tenant and resource isolation

- **Status:** required and designed
- **Classes:** preventive, detective, containment
- **Protects:** all PROTECTED PERSONAL assets
- **Requirement:** isolation across `ISO-EDGE` through `ISO-ANALYTICS`; no default tenant, arbitrary query, or cross-layer context loss
- **Evidence:** isolation register and 5.1 trust zones
- **Residual risk:** implementation and synthetic leakage tests pending
- **Owner:** future domain and infrastructure owners
- **Revalidation:** persistence, queue, AI, analytics, or backup design

### `CTL-ID-006` — Explicit delegation and capacity evidence

- **Status:** required and designed
- **Classes:** preventive, limiting, informational
- **Protects:** controlling-person rights, dependents, delegates, permissions
- **Requirement:** delegation and capacity are versioned, scoped, expiring, challengeable, and separate from permission and execution
- **Evidence:** identity model and House of Keys capacity contract
- **Residual risk:** jurisdiction, caregiver, minor, estate, and incapacity rules unresolved
- **Owner:** future identity, House of Keys, legal, and privacy owners
- **Revalidation:** any representative-control workflow

### `CTL-ID-007` — Recovery separated from authority expansion

- **Status:** required and designed
- **Classes:** preventive, limiting, recovery, restorative
- **Protects:** accounts, Chronicle control, permissions, deleted or withdrawn state
- **Requirement:** recovery restores bounded access, revokes old credentials, does not reactivate removed links or grants, and restricts high-consequence actions until release conditions
- **Evidence:** recovery model and `SES-RECOVERY`
- **Residual risk:** evidence methods, communications, service levels, and jurisdictional proofing unresolved
- **Owner:** future identity and recovery owners
- **Revalidation:** account recovery implementation

### `CTL-ID-008` — No health or intimate knowledge as identity proof

- **Status:** required and designed
- **Classes:** preventive, informational
- **Protects:** privacy, dignity, non-coercion, anti-correlation
- **Requirement:** diagnosis, medications, dates, family details, Chronicle contents, or other intimate knowledge cannot serve as password, security question, or sufficient recovery evidence
- **Evidence:** identity and recovery models
- **Residual risk:** support training and implementation controls pending
- **Owner:** future identity, privacy, and support owners
- **Revalidation:** proofing or support workflow selection

### `CTL-ID-009` — Least-capability private operator interfaces

- **Status:** required and designed
- **Classes:** preventive, limiting, detective
- **Protects:** personal records, permission, audit integrity
- **Requirement:** separate operator identity and sessions, private origins, named capabilities, no arbitrary SQL, object browsing, shared accounts, or silent impersonation
- **Evidence:** operator model and classes
- **Residual risk:** tooling, role staffing, and separation-of-duty capacity unresolved
- **Owner:** future operations and security owners
- **Revalidation:** first administrative service

### `CTL-ID-010` — Expiring break-glass authority

- **Status:** required and designed
- **Classes:** containment, limiting, recovery
- **Protects:** availability, integrity, and person rights during emergencies
- **Requirement:** named emergency record, narrow purpose, stronger authentication, automatic expiry, protected evidence, post-review, restoration, no permanent policy or permission change
- **Evidence:** emergency model and `EMG-*` classes
- **Residual risk:** approvers, service levels, notification rules, and independent review unresolved
- **Owner:** future security and incident owners
- **Revalidation:** emergency-access implementation or tabletop

### `CTL-ID-011` — Safe notification, challenge, and restoration

- **Status:** required and designed
- **Classes:** detective, restorative, informational
- **Protects:** affected people after identity, recovery, operator, or emergency changes
- **Requirement:** independent-channel notification where safe, challenge and rollback paths, downstream correction, residual-harm record
- **Evidence:** identity model and Institutional Immune System
- **Residual risk:** communication provider, accessibility, and support ownership unresolved
- **Owner:** future support, security, privacy, and accessibility owners
- **Revalidation:** notification and support implementation

### `CTL-ID-012` — Authority-change propagation

- **Status:** required and designed
- **Classes:** preventive, containment, corrective
- **Protects:** sessions, caches, queues, connectors, exports, AI, MCP, and operator contexts
- **Requirement:** account-link, delegation, capacity, session, recovery, operator, emergency, and permission changes invalidate dependent authority promptly
- **Evidence:** identity model and 5.1 boundary map
- **Residual risk:** ordering, cache, queue, distributed-system, and atomic-consumption details pending 5.3–5.8
- **Owner:** future domain and infrastructure owners
- **Revalidation:** any asynchronous or cached private operation

### `CTL-ID-013` — Founder- and vendor-independent continuity

- **Status:** required and designed at architecture level
- **Classes:** recovery, limiting, corrective
- **Protects:** institutional continuity and person access
- **Requirement:** legitimate successors can operate and recover critical systems without founder knowledge or one vendor; Chronicle identity and authority history remain stable through replacement
- **Evidence:** identity model and Decision 0003
- **Residual risk:** Phase 0 key-person, succession, credential, legal, and founder-absence evidence pending
- **Owner:** founding steward and future institutional governance
- **Revalidation:** Phase 0 exit and founder-absence exercise

### `CTL-ID-014` — Protected identity evidence without global identity graph

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** privacy, recovery, correction, export, deletion, and anti-correlation
- **Requirement:** preserve sufficient protected mappings and event evidence while preventing unrestricted cross-domain linkage and operator search
- **Evidence:** identity model and `ISO-AUDIT`
- **Residual risk:** fields, retention, query controls, and deletion boundaries pending 5.3 and 5.8
- **Owner:** future identity, privacy, and audit owners
- **Revalidation:** identity persistence and audit design

## Review result

The register does not authorize any delegated, caregiver, minor, estate, operator, recovery, or emergency flow. It defines the minimum architecture required before those flows can be implemented or represented as safe.

No control in this register is implemented, deployed, operationally verified, or independently reviewed merely because it is documented here.
