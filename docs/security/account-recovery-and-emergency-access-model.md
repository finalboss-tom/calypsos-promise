# Account Recovery and Emergency Access Model

[Security architecture](README.md) · [Identity and account model](identity-account-session-tenant-model.md) · [Identity and authority register](identity-and-authority-register.md) · [Control status and risk vocabulary](control-status-and-risk-vocabulary.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, accessibility, and legal review pending  
**Workstream:** 5.2  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** procedure and authority design only; no production recovery, support, break-glass, operator, identity-proofing, or emergency-access system is authorized or represented as deployed

## Purpose

This model defines how a future Calypso’s Promise implementation restores access after credential loss, compromise, provider failure, incapacity, authority dispute, operator loss, service-identity failure, or institutional transition without silently granting broader Chronicle or House of Keys authority.

It also defines how narrow emergency capabilities may contain active harm without becoming a permanent administrative backdoor.

## Governing rule

Recovery restores a bounded, reviewed capability. It does not prove identity beyond the evidence collected, does not create Chronicle truth, does not create permission, and does not erase prior security or authority history.

Emergency access contains an active or imminent condition. It does not create routine access, permanent policy, or personal-data discretion.

## Recovery classes remain separate

The following are distinct processes and must not be collapsed into one “account recovery” button:

1. **Credential recovery** — replace or revoke an authenticator for an existing account.
2. **Account-access recovery** — restore bounded access to an existing account after evidence review.
3. **Chronicle-control recovery** — resolve or restore the relationship between a legitimate controlling authority and a Chronicle.
4. **Delegated-access recovery** — restore one existing active delegation without broadening it.
5. **Operator recovery** — restore a named organizational role under institutional authority.
6. **Service-identity recovery** — replace one machine credential or key under a bounded service capability.
7. **Cryptographic-key recovery** — restore an authorized decryption or signing capability under the later key hierarchy.
8. **Institutional-continuity recovery** — preserve releases, infrastructure, archives, governance, and emergency operations through leadership or vendor transition.

Success in one class does not automatically satisfy another.

## Recovery principles

A recovery design must:

- minimize evidence and collection;
- avoid intimate or health information as proof;
- use multiple independent evidence channels for high-consequence recovery;
- preserve uncertainty and dispute;
- separate proposal, review, approval, execution, and closure where capacity allows;
- restrict sensitive actions during and after recovery;
- revoke or contain old credentials and sessions;
- re-evaluate account-access links, delegation, capacity, and permission rather than copying old state blindly;
- notify through safe independent channels where possible;
- provide challenge, rollback, and restoration;
- preserve correction, receipt, permission, export, deletion, and incident history;
- avoid permanent reliance on one founder, operator, vendor, email address, phone number, device, or secret; and
- record truthful control status and unresolved risk.

## Prohibited recovery evidence

The following are prohibited as passwords, security questions, or sufficient recovery proof:

- diagnoses, medications, symptoms, laboratory values, or other Chronicle contents;
- dates or details of health events;
- family, relationship, caregiver, pregnancy, injury, disability, or crisis information;
- financial or donation details unrelated to the account relationship;
- lore, quest, progression, or reward history;
- model-derived behavioral or health predictions;
- social-media familiarity or public identity alone;
- support-agent recognition or founder memory;
- possession of an exported Chronicle artifact alone;
- knowledge of a Chronicle or subject identifier; and
- ability to describe private data that may have been stolen.

Possession of intimate information may indicate compromise rather than legitimacy.

## Recovery evidence classes

A future implementation may evaluate evidence from bounded classes such as:

- active authenticators;
- recovery codes or recovery keys;
- previously registered phishing-resistant device credentials;
- independently verified communication channels;
- provider account recovery under an approved provider relationship;
- protected prior account-link evidence;
- organizational role and succession records;
- separately reviewed legal or representative authority evidence;
- approved in-person or high-assurance verification where proportionate and accessible;
- historical security and account events; and
- bounded manual review by an accountable recovery role.

No single evidence class is universally sufficient. The applicable method depends on consequence, uncertainty, available alternatives, accessibility, jurisdiction, and the risk of takeover.

Evidence must be retained only as long as necessary under the future retention design and must not be copied into Chronicle truth or general analytics.

## Recovery case lifecycle

A recovery case may use these states:

- **initiated** — a recovery request exists but no authority is assumed;
- **classified** — the recovery class and affected assets are identified;
- **contained** — old sessions, credentials, exports, connectors, or sensitive actions are restricted where justified;
- **evidence-collecting** — bounded evidence is collected and conflicts remain visible;
- **pending-review** — evidence is complete enough for accountable review;
- **contested** — conflicting claims or evidence prevent ordinary completion;
- **approved-restricted** — a restricted recovery session may be issued;
- **denied** — the evidence does not support the request;
- **completed** — credentials or bounded links are replaced and required propagation occurred;
- **rolled-back** — a recovery outcome was reversed after challenge or new evidence;
- **restoration-pending** — affected state or people require correction or remediation; and
- **closed** — review, notification, restoration, residual risk, and revalidation are recorded.

Every transition identifies actor, authority basis, time, reason, affected resources, evidence references, and required next action.

## Standard account-recovery flow

A future account-recovery procedure should follow this order:

1. **Initiate** — create a recovery case without confirming legitimacy.
2. **Classify** — distinguish credential, account, Chronicle-control, delegate, operator, service, key, or institutional recovery.
3. **Contain proportionately** — block or restrict sessions, connectors, export, deletion, permission, or other high-consequence actions when takeover risk is material.
4. **Collect minimized evidence** — use approved evidence classes and preserve conflicts.
5. **Review** — apply the authority and assurance appropriate to the recovery class.
6. **Issue restricted access** — when appropriate, issue `SES-RECOVERY` with `IAP-RECOVERY-RESTRICTED` rather than full historical access.
7. **Replace credentials** — rotate or revoke affected authenticators and recovery methods.
8. **Reconcile authority** — re-evaluate active account-access links, delegation, capacity, and controlled-resource context.
9. **Propagate invalidation** — revoke old sessions, API or MCP credentials, connector tokens, queued jobs, caches, exports, and operator contexts that depend on stale authority.
10. **Notify** — send safe notices through independent channels where possible and expose person-visible account-security history.
11. **Apply cooling and release conditions** — retain restrictions on high-consequence actions until required assurance, time, or review conditions are satisfied.
12. **Restore and correct** — reverse unauthorized changes, correct records or permissions through their owning domains, notify downstream recipients where applicable, and record residual harm.
13. **Close and revalidate** — record outcome, limitations, review date, and future trigger.

## Restricted post-recovery session

A restricted recovery session may support:

- reviewing recent account and security events;
- completing credential replacement;
- confirming safe communication channels;
- reviewing active account-access links and sessions;
- revoking unknown sessions or devices;
- challenging unauthorized changes;
- receiving direct explanations and support; and
- accessing public or low-risk product functions.

Until release conditions are satisfied, it must block or require elevated review for:

- Chronicle export or export delivery;
- Chronicle deletion or deletion cancellation;
- adding or expanding account-access links;
- adding delegates or representatives;
- granting or broadening permission;
- connecting external sources;
- creating API, remote-agent, or MCP credentials;
- changing recovery methods again;
- changing security-sensitive notification destinations;
- external transmission or research enrollment;
- payment, compensation, or marketplace actions; and
- administrative or governance authority changes.

Restrictions must be visible and non-punitive. They may not be used to pressure broader disclosure, payment, secondary-use permission, or unnecessary identity proofing.

## Chronicle-control recovery

Restoring account access and restoring Chronicle control are different.

A Chronicle-control recovery must preserve:

- stable Chronicle identity;
- subject distinctions;
- prior account-access links and their lifecycle history;
- correction, export, deletion, permission, and receipt records;
- disputed or competing claims;
- legal and capacity uncertainty;
- challenge and appeal; and
- restoration of direct person control where possible.

No claimant receives control merely because they:

- possess account credentials;
- possess an export;
- are a family member or caregiver;
- paid for services;
- created source documents;
- operate infrastructure;
- have maintainer or founder status;
- are a clinician, researcher, donor, or governance participant; or
- can answer questions about the person.

Caregiver, guardian, minor, dependent, estate, incapacity, and successor authority remain jurisdiction-specific specialist gates. The architecture records their evidence, scope, duration, conflicts, removal, and appeal without declaring universal legal sufficiency.

## Contested recovery

A recovery is contested when:

- multiple actors claim control;
- evidence conflicts;
- the prior account may be compromised;
- a delegate or representative disputes removal;
- the subject and controlling authority may differ;
- legal or capacity evidence is unresolved;
- a prior recovery is challenged; or
- the requested action could cause difficult-to-reverse disclosure or deletion.

Contested recovery must:

- fail closed for high-consequence actions;
- preserve existing safe access where doing so does not compound harm;
- prevent irreversible export, deletion, permission expansion, or external transmission;
- preserve evidence and uncertainty;
- use a named accountable review path;
- avoid unilateral founder or support-agent resolution;
- support independent review when available;
- define temporary containment and expiration;
- notify affected parties when safe; and
- record residual harm if full restoration is impossible.

## Recovery from suspected account takeover

When takeover is suspected, the system should be able to:

- mark affected sessions `SES-COMPROMISED`;
- invoke `EMG-SESSION-REVOKE`;
- freeze high-consequence actions with `EMG-RECOVERY-FREEZE`;
- rotate or revoke credentials and tokens;
- stop queued exports, deletions, transmissions, connectors, or agent actions;
- invalidate stale policy or capacity contexts;
- preserve minimized protected evidence;
- notify through alternate channels;
- compare recent account-link, permission, receipt, and execution changes;
- correct unauthorized changes through owning domains; and
- restore affected person state and record unresolved exposure.

A takeover response must not rewrite history to imply unauthorized access did not occur.

## Operator recovery

Operator recovery restores an organizational role, not personal-data authority.

It requires:

- verified role and institutional authority;
- separate operator identity;
- removal or suspension of former credentials;
- exact `OPR-*` capability assignment;
- private-origin access;
- step-up authentication;
- short-lived sessions;
- no shared accounts;
- protected audit and review; and
- confirmation that recovery does not grant unrelated environments or personal-data access.

A founder, former employee, vendor administrator, or cloud-account owner must be removable without redefining Chronicle identity or losing legitimate institutional continuity.

## Service and key recovery

Service-identity or cryptographic-key recovery must:

- identify the exact service, environment, purpose, and key or credential generation;
- revoke or retire the prior credential where possible;
- prevent cross-environment reuse;
- preserve evidence of issue, activation, rotation, recovery, revocation, and destruction;
- verify dependent services and data remain correctly bound;
- prevent a recovered key from creating application authority;
- define data availability and unrecoverable-loss behavior honestly; and
- require later key-management and incident controls from workstreams 5.7 and 5.8.

No production key-recovery mechanism is selected in 5.2.

## Institutional continuity and founder absence

Institutional recovery must eventually support operation without founder intervention.

Before founder independence can be claimed, the institution must demonstrate continuity for:

- repository and release authority;
- domain and deployment credentials;
- private disclosure and incident response;
- public website and communication channels;
- infrastructure and vendor administration;
- archives and institutional records;
- security and emergency capabilities;
- legal and financial responsibilities where applicable; and
- amendment, removal, transition, and restoration procedures.

The Phase 0 key-person, succession, founder-reserved-power, branch-control, DCO, and exit-review gates remain active. This model does not satisfy them by documentation alone.

## Emergency authority

Emergency authority is allowed only for active or imminent conditions where delay could compound harm.

A valid emergency declaration records:

- stable emergency ID and revision;
- declaring actor and role;
- authority basis;
- active or imminent condition;
- affected assets, services, environments, resources, and people;
- selected `EMG-*` capability;
- exact permitted actions and prohibited expansion;
- start, automatic expiration, and renewal prohibition or rule;
- authentication and approval evidence;
- expected person-visible notice where safe;
- protected audit fields;
- containment, restoration, and rollback plan;
- residual-harm considerations;
- independent or later-adversarial review requirement; and
- closure and revalidation trigger.

### Permitted emergency outcomes

Emergency authority may:

- revoke or suspend sessions and derived credentials;
- stop a release, export, connector, queue, or agent flow;
- isolate a service or environment;
- place a bounded domain into read-only mode;
- quarantine an upload or source;
- rotate or revoke a secret, certificate, or key;
- preserve minimized incident evidence;
- disable an unsafe provider or dependency;
- activate a safe manual or non-AI fallback; or
- issue time-bounded communication needed for containment.

### Prohibited emergency outcomes

Emergency authority may not:

- confirm, correct, or delete Chronicle truth outside the normal domain procedure;
- create, broaden, or permanently override a House of Keys grant;
- convert `deny` or `indeterminate` into allow;
- export or transmit personal data for convenience;
- enroll a person in research;
- create compensation, eligibility, progression, or governance consequences;
- suppress receipts, correction history, challenges, or appeals;
- create a permanent operator or founder backdoor;
- continue after expiration without a new reviewed declaration;
- hide a material incident to protect reputation; or
- redesign permanent security or governance policy during containment.

## Break-glass approval and separation

Where organizational capacity allows, break-glass activation should separate:

- declaration;
- approval;
- execution;
- monitoring;
- review; and
- permanent-policy decision.

Phase 0 may require one accountable actor to hold more than one role. The overlap must be explicit, time-bounded, and recorded as independence risk. Self-review cannot be represented as independent review.

No emergency capability should require direct public exposure of an administrative service.

## Emergency lifecycle

An emergency may use these states:

- **proposed**;
- **declared**;
- **active**;
- **contained**;
- **expired**;
- **revoked**;
- **restoration-pending**;
- **under-review**;
- **closed**; or
- **invalidated**.

Expiration ends authority automatically. Closing an emergency requires restoration, review, residual-harm, learning, and revalidation records where applicable.

## Notification and transparency

Recovery and emergency processes must balance control, safety, privacy, and anti-evasion needs.

Person-visible notice should identify, when safe:

- what category of event occurred;
- which account or controlled resource was affected;
- when it occurred;
- which sessions, links, credentials, or capabilities changed;
- whether data release is known or unresolved;
- available challenge, correction, and support paths;
- restrictions and expected duration;
- restoration status; and
- what cannot yet be concluded.

Operational secrets, exploit details, private endpoints, anti-abuse logic, reviewer personal data, and unnecessary health details remain protected.

Material institutional recovery or emergency use should produce a reviewed, minimized public derivative when required and safe.

## Accessibility and meaningful recovery

Recovery cannot be nominally available only through one inaccessible channel.

Later implementation must evaluate:

- screen-reader and keyboard access;
- plain-language explanations;
- nonvoice and nonvisual alternatives;
- no smartphone-only assumption;
- no permanent dependence on one phone number or email account;
- support for assistive communication;
- safe involvement of an explicitly authorized helper;
- cognitive and language accessibility;
- proportionate delay and friction;
- no shame or punishment for losing access; and
- non-AI fallback.

Accessibility does not justify weakening authority or disclosing more information than necessary. It requires equivalent safe paths.

## Restoration and residual harm

After recovery or emergency action, the accountable process must review:

- unauthorized access or release;
- incorrect record, permission, delegate, operator, or notification changes;
- blocked legitimate access;
- missed or duplicated execution;
- suppressed correction, export, deletion, or receipt behavior;
- downstream recipient effects;
- restored data that should have remained deleted;
- personal, safety, financial, or institutional harm;
- confidence and evidence gaps; and
- changes required to controls, assumptions, documentation, and table tops.

Full restoration may be impossible after disclosure, public publication, external recipient use, or destructive action. Residual harm must be recorded honestly.

## Required synthetic and tabletop follow-up

Workstream 5.9 must exercise at least:

- stolen session with attempted export;
- attacker-initiated account recovery;
- legitimate person with all primary authenticators lost;
- compromised email or phone recovery channel;
- disputed Chronicle control;
- expired delegate attempting recovery;
- operator account loss;
- founder absence during an incident;
- break-glass containment of cross-user leakage;
- emergency read-only mode during integrity failure;
- recovery restoring data that was validly deleted;
- emergency authority exceeding scope; and
- inaccessible recovery method requiring an equivalent alternative.

Synthetic exercises validate the design procedure only. They do not prove production controls exist.

## Control status

The controls defined in the identity register are **required** and **designed** at the architecture level.

They are not, by this document alone:

- implemented;
- synthetically tested;
- independently reviewed;
- deployed;
- operationally verified; or
- sufficient for production data or users.

## Explicit non-scope and unresolved gates

This model does not select:

- identity, authentication, communication, proofing, or support vendors;
- password, passkey, MFA, SMS, email-link, biometric, or government-ID methods;
- legal capacity or representative authority by jurisdiction;
- service-level objectives or staffing model;
- production key escrow or recovery;
- private incident, case-management, or operator tooling;
- exact delay, threshold, risk, or assurance formulas;
- notification retention or identity-metadata retention;
- production emergency approvers;
- public incident reporting thresholds;
- anti-Sybil or governance identity;
- minors, caregiver, estate, or incapacity policy approval; or
- production readiness.

Independent security, privacy, legal, accessibility, and applicable clinical or caregiver review remain required.

## Completion evidence

Workstream 5.2 is complete at the internal architecture level when:

- recovery classes remain separate;
- health and intimate knowledge are prohibited as identity proof;
- evidence classes, lifecycle, containment, restricted access, authority reconciliation, notification, restoration, and closure are defined;
- account recovery does not reactivate removed Chronicle links or permission;
- contested control fails closed for high-consequence actions;
- operator and service recovery remain capability-bounded;
- institutional continuity does not depend on founder intervention;
- emergency authority is narrow, expiring, attributable, reviewable, and restorative;
- emergency powers cannot rewrite Chronicle truth or permission;
- accessible equivalent recovery paths are required;
- synthetic and tabletop follow-up is explicitly registered; and
- independent specialist review remains pending.
