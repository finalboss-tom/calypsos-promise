# Incident Response and Protected Audit Retention Plan

[Security architecture](README.md) · [Security policy](../../SECURITY.md) · [Publication and confidentiality](../policies/publication-and-confidentiality.md) · [Availability and restore model](availability-backup-and-restore-model.md) · [House of Keys enforcement](house-of-keys-enforcement-security-model.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent specialist review pending  
**Workstream:** 5.8  
**Revision:** 1  
**Information class:** PUBLIC institutional process; real incident evidence remains protected  
**Production boundary:** policy and evidence requirements only; no production monitoring, paging, audit store, incident platform, responder roster, notification provider, legal workflow, or operational service level is selected, authorized, or represented as deployed

## Purpose

This plan defines how Calypso's Promise detects, triages, contains, investigates, corrects, restores, communicates, and learns from security, privacy, integrity, availability, authority, deletion, receipt, and institutional incidents.

It also defines how protected operational audit evidence is minimized, accessed, corrected, retained, held, exported, deleted, and prevented from becoming a shadow Chronicle, shadow permission system, surveillance platform, or unrestricted analytics store.

The plan exists to ensure that incident response does not:

- prioritize reputation over affected people;
- hide material uncertainty;
- preserve excessive personal content for convenience;
- use audit possession as permission authority;
- erase original evidence through in-place correction;
- treat a missing receipt as proof that no operation occurred;
- treat deletion of a public item as reversal of exposure;
- restore compromised credentials, permissions, or data state;
- convert emergency access into ordinary operator access; or
- close an incident without recording unresolved harm and revalidation work.

## Governing principle

> Incident response protects people and restores trustworthy bounded function. It does not manufacture certainty, erase history, or expand authority.

A response may temporarily suspend services, credentials, connectors, releases, queues, agents, or administrative capabilities. It may not silently create Chronicle truth, permission, permanent governance authority, or new retention purposes.

## Incident scope

An incident may affect one or more of the following dimensions:

- confidentiality;
- integrity;
- availability;
- identity and account control;
- Chronicle or source truth;
- House of Keys authority and revocation;
- execution, release, and recipient boundaries;
- receipt completeness or correctness;
- deletion, retention, and restoration;
- key, secret, certificate, or service identity;
- environment, provider, network, or supply chain;
- AI, retrieval, connector, MCP, or agent behavior;
- research or analytics scope;
- accessibility and meaningful control;
- public-site claims or signup data; and
- institutional authority, succession, or public disclosure.

The plan primarily refines `THR-008`, `THR-009`, `THR-016`, `THR-021`, `THR-022`, `THR-025`, `THR-028` through `THR-035`, `THR-039`, `THR-040`, `THR-042`, `THR-043`, `THR-045`, and `THR-046` without replacing the integrated threat and residual-risk records.

## Incident record

Every material incident requires a stable incident identity and a protected record containing:

- incident class and current state;
- detection time, reported time, and known event window;
- reporter and intake channel;
- affected environments, services, domains, assets, and trust boundaries;
- affected or potentially affected people and recipient classes;
- confidentiality, integrity, availability, authority, deletion, and accessibility effects;
- known and suspected entry points;
- current uncertainty and evidence quality;
- containment actions and their authority basis;
- credentials, keys, sessions, services, queues, releases, connectors, and providers affected;
- Chronicle, source, permission, receipt, audit, export, deletion, and backup effects;
- decision log with accountable actors and times;
- communication and notification decisions;
- correction, restoration, and challenge paths;
- residual harm and unresolved dependencies;
- follow-up owners and deadlines; and
- public-summary status where applicable.

The incident record must not become a raw copy of every affected Chronicle, document, prompt, export, log, or correspondence. Evidence references and minimized snapshots are preferred where they preserve investigative meaning.

## Incident classifications

### `incident.confidentiality`

Protected information, credentials, secrets, keys, private endpoints, or identity relationships may have been disclosed to an unauthorized actor or system.

### `incident.integrity`

Chronicle records, sources, provenance, grants, decisions, execution state, receipts, audit evidence, code, artifacts, backups, or public statements may have been altered, substituted, corrupted, or fabricated.

### `incident.availability`

A rights-critical or core-value capability is unavailable, degraded, unsafe to use, or unable to provide truthful durability or completion state.

### `incident.authority`

Identity, delegation, recovery, permission, recipient, execution, operator, agent, or emergency authority may have been expanded, reused, or applied incorrectly.

### `incident.lifecycle`

Revocation, correction, deletion, retention expiry, receipt correction, queue cancellation, or restoration propagation may have failed or become ambiguous.

### `incident.external`

A provider, connector, recipient, processor, model provider, dependency, build system, or other external actor may have exceeded or lost control of the accepted boundary.

### `incident.institutional`

Governance, founder dependence, public claims, confidentiality, conflicts, succession, or disclosure processes may have failed in a way that affects security or person rights.

One incident may carry multiple classifications. Classification does not replace investigation of actual effects.

## Consequence dimensions

Prioritization uses transparent qualitative dimensions rather than one false-precision score:

- number and vulnerability of potentially affected people;
- sensitivity and re-identifiability of information;
- authority or control lost;
- whether an irreversible release occurred;
- integrity of Chronicle, permission, deletion, or receipt truth;
- availability of rights-critical paths;
- duration and persistence;
- external recipients and uncontrolled copies;
- exploitability and repeatability;
- evidence quality and uncertainty;
- ability to contain and restore;
- minority or concentrated harm;
- legal, ethical, clinical, or research implications;
- public trust and institutional mission effects; and
- probability of continuing or recurring harm.

The absence of confirmed exploitation does not make an exposed credential, cross-user path, false receipt, or deletion failure harmless.

## Incident states

- `reported`
- `acknowledged`
- `triage-active`
- `containment-active`
- `contained-bounded`
- `investigation-active`
- `eradication-active`
- `restoration-active`
- `notification-review`
- `correction-active`
- `monitoring-active`
- `post-incident-review`
- `closed-without-known-residual-harm`
- `closed-with-residual-risk`
- `reopened`

An incident does not close because the visible symptom disappeared, a provider dashboard returned green, a secret was deleted from one location, or no new report arrived.

## Detection and reporting

Detection sources may include:

- private vulnerability reports;
- person challenges or support reports;
- receipt and operation reconciliation;
- cross-tenant or resource-context invariant failures;
- key, secret, or certificate exposure findings;
- unauthorized access or operator-capability evidence;
- deletion-verification failures;
- backup or restore validation failures;
- connector, provider, dependency, or build advisories;
- availability and integrity monitoring;
- unexpected data movement or egress;
- public-repository or preview scanning;
- audit consistency checks;
- synthetic exercises; and
- internal factual or governance review.

Public issues, pull requests, discussions, logs, or campaign ledgers must not contain protected incident evidence. `SECURITY.md` remains the public reporting boundary.

## Intake rules

At intake:

1. create a stable incident record in an approved protected system;
2. preserve the reporter's original claim without forcing unnecessary disclosure;
3. classify the highest-risk information before sharing;
4. identify immediate containment needs;
5. prevent further public reproduction of exposed material;
6. assign an accountable incident lead and bounded responders;
7. record known uncertainty rather than demand premature certainty; and
8. avoid accessing additional real personal information merely to verify the report.

Good-faith reporters must not be pressured to publish or retain protected evidence.

## Containment

Containment may include:

- revoking or rotating credentials, sessions, keys, certificates, tokens, connector grants, or workload identities;
- suspending a compromised service, environment, dependency, artifact, deployment, recipient, agent, or operator capability;
- blocking data release, connector synchronization, queue execution, exports, deletion completion claims, or external calls;
- isolating affected accounts, Chronicles, sources, tenants, indexes, queues, or backups;
- disabling vulnerable paths while preserving safe manual alternatives;
- preserving minimal protected evidence;
- preventing public access to exposed content, artifacts, previews, caches, or attachments;
- placing a bounded retention hold on necessary evidence;
- notifying provider security contacts through approved private channels; and
- initiating recovery or clean rebuild.

Deletion alone is not sufficient containment for exposed credentials or public information. Rotation or revocation occurs before relying on removal.

Containment authority must be named, narrow, time-bound, attributable, reviewable, and unable to rewrite Chronicle or House of Keys truth.

## Investigation

Investigation seeks to establish:

- what happened and what remains uncertain;
- affected systems, domains, identities, people, records, and recipients;
- earliest and latest plausible event times;
- whether data was viewed, altered, released, copied, retained, or deleted;
- whether permission, session, capacity, recipient, or execution boundaries failed;
- whether receipts are missing, false, delayed, duplicated, or incomplete;
- whether logs or audit evidence are themselves compromised;
- whether backups or replicas contain affected state;
- whether an external provider or recipient has uncontrolled copies;
- whether corrections, revocations, deletions, or tombstones failed to propagate;
- which credentials, keys, secrets, artifacts, or environments remain trustworthy;
- whether other people or systems share the same vulnerable condition; and
- what containment and restoration actions could create additional harm.

Investigators receive least-capability access. Broad browsing, unrestricted SQL, arbitrary object access, silent impersonation, or export of entire Chronicles is prohibited as a default investigative method.

## Eradication and correction

Eradication removes or neutralizes the causal condition through actions such as:

- patching or removing vulnerable code and dependencies;
- rebuilding from reviewed artifacts;
- rotating or replacing keys, secrets, identities, and credentials;
- correcting mappings, policies, lifecycle projections, queues, or configuration;
- deleting malicious or unauthorized persistence;
- reprocessing sources through corrected methods;
- invalidating poisoned indexes or model context;
- replacing compromised providers or integrations;
- removing excessive operator or service capabilities; and
- correcting institutional policy or public claims.

Correction is relationship-first and append-only where the domain requires history. It may require:

- Chronicle correction, retraction, conflict, or invalidation;
- source custody or provenance correction;
- House of Keys lifecycle or decision correction;
- execution and release reconciliation;
- receipt correction or missing-receipt issuance;
- audit annotation or invalidation;
- deletion-evidence correction;
- public capability-status correction; and
- safe incident-summary correction.

No response may silently edit historical evidence to make the system appear consistently authorized or successful.

## Restoration

Restoration follows the [Availability, Backup, Restore, and Continuity Model](availability-backup-and-restore-model.md).

It requires:

- clean environment, credential, key, and artifact boundaries;
- authoritative current-state reconciliation;
- replay of revocations, corrections, deletions, and tombstones;
- queue and idempotency reconciliation;
- validation of receipts and protected audit evidence;
- bounded activation and rollback;
- person-visible status where material; and
- monitoring for recurrence or resurrected state.

Restoration is not complete while affected people lack a meaningful challenge, correction, recovery, or deletion path.

## Notification and communication

Notification decisions consider:

- affectedness and vulnerability;
- sensitivity and likely harm;
- whether an irreversible release or account displacement occurred;
- whether a person must act to protect themselves;
- current containment and uncertainty;
- applicable legal, contractual, ethical, clinical, research, or accessibility requirements;
- risk that disclosure would expose more personal information or enable recurrence; and
- the person's need to understand and challenge the event.

Person-facing communication should state, in direct language:

- what is known;
- what remains uncertain;
- what information, account, permission, receipt, or service may be affected;
- material times and boundaries;
- actions already taken;
- actions the person may choose to take;
- whether external copies or recipient behavior remain unresolved;
- correction, recovery, deletion, and support paths; and
- when another update is expected, if applicable.

Communication must not:

- imply universal deletion when only bounded removal is known;
- claim no access occurred merely because a receipt or log is missing;
- blame the affected person for exercising refusal, correction, or deletion rights;
- use inaccessible narrative as the only explanation;
- minimize concentrated harm because the total count is small; or
- demand additional health disclosure as a condition of assistance.

## Public incident summaries

When a public summary is appropriate, it should disclose:

- incident category and material institutional effect;
- safe scope and timeline;
- current status;
- containment and correction actions;
- public capability or policy changes;
- lessons and follow-up commitments;
- responsible authority; and
- known residual risk at an appropriately minimized level.

It must not publish:

- personal or health information;
- credentials, keys, tokens, private endpoints, or account identifiers;
- exploit-enabling reproduction details;
- private correspondence or reporter identity;
- provider account paths;
- protected detection thresholds; or
- raw audit or incident evidence.

Confidentiality cannot be used to hide the existence of a material incident, mission failure, authority misuse, or correction forever. Safe disclosure timing and content remain reviewable.

## Protected audit boundary

Protected operational audit evidence supports:

- security detection and investigation;
- integrity and consistency checks;
- incident response;
- bounded administrative accountability;
- deletion and restoration verification;
- credential, key, and environment lifecycle evidence; and
- evidence of material releases, failures, and corrections.

It does not become:

- Chronicle truth;
- source truth;
- House of Keys permission;
- proof that an unlogged event did not occur;
- a global identity graph;
- an unrestricted analytics warehouse;
- employee surveillance;
- a health-risk or trust score;
- a reward or progression input; or
- permanent raw retention by default.

## Audit event requirements

A protected audit event should contain only the allowlisted fields needed for its declared purpose, such as:

- stable event and correlation identities;
- event class;
- environment, service, deployment, and contract revisions;
- pseudonymous resource or domain references;
- actor or service-identity reference;
- action and outcome class;
- policy, execution, receipt, deletion, key, or incident references;
- relevant times and ordering uncertainty;
- control result and evidence reference;
- minimum network or transport metadata needed for investigation;
- data classification;
- retention class;
- integrity and correction references; and
- access or disclosure restrictions.

Raw Chronicle values, documents, prompts, model responses, credentials, secrets, tokens, and broad free text are excluded unless a narrowly approved incident purpose requires a minimized protected snapshot.

## Audit access

Audit access requires:

- a named purpose;
- least-capability role or case-specific authorization;
- separate identity and session controls;
- step-up for high-consequence searches or exports;
- query and export restrictions;
- attributable access evidence;
- expiry or case closure behavior;
- no silent impersonation or unrestricted browsing; and
- independent review proportionate to impact.

Possession of audit access does not grant Chronicle, permission, support, research, or recipient authority.

## Audit retention classes

### `audit.operational-short`

Short-lived technical evidence used for reliability and routine control validation. It excludes broad personal content and expires automatically.

### `audit.security-standard`

Minimized security evidence needed for investigation, access review, and control verification under a declared schedule.

### `audit.high-consequence`

Evidence of material release, account takeover, authority misuse, key compromise, deletion failure, or destructive action. It receives stronger access controls and explicit review.

### `audit.incident-hold`

A temporary, case-linked exception preserving minimum necessary evidence while an incident, legal, regulatory, insurance, or specialist process remains active.

### `audit.public-derivative`

A reviewed, minimized public institutional record that contains no protected evidence and remains subject to correction.

Exact durations are not set by this architecture document. They require provider, jurisdiction, risk, privacy, legal, security, records-governance, and operational review before production.

## Audit retention rules

1. Every event receives one declared retention class and owner.
2. Retention begins from a defined event or case boundary and does not reset silently through migration or copying.
3. Expiry is enforced across active stores, indexes, exports, caches, replicas, and backups according to their lifecycle contracts.
4. Incident holds are narrow, evidence-based, time-bound, reviewed, and appealable where applicable.
5. Raw personal content is not retained merely because it may be useful someday.
6. Correction creates linked evidence rather than overwriting prior claims.
7. Invalid or forged audit events remain visible as invalidated evidence when required for accountability.
8. Deletion may remove content while retaining a minimized tombstone or institutional fact only under an explicit policy.
9. Audit export is a high-consequence operation with its own authority, scope, receipt, and retention.
10. Public summaries never substitute for protected evidence, and protected evidence does not justify hiding safe institutional facts.

## Audit lifecycle states

- `recorded`
- `integrity-unverified`
- `integrity-verified`
- `restricted`
- `correction-linked`
- `invalidated`
- `retention-scheduled`
- `incident-hold-active`
- `hold-review-due`
- `hold-released`
- `expiry-due`
- `deletion-processing`
- `deleted-bounded`
- `minimized-derivative-retained`
- `unavailable`
- `conflicting`

## Missing, delayed, or conflicting evidence

The architecture must detect and respond to:

- an expected audit event missing;
- a receipt without supporting execution evidence;
- execution evidence without a required receipt;
- duplicate or conflicting release claims;
- events with impossible ordering;
- an audit record referencing the wrong resource, tenant, recipient, or environment;
- missing key, deployment, policy, or artifact revisions;
- corrupted integrity evidence;
- retention or deletion state that cannot be reconciled; and
- audit access outside an active purpose.

Missing evidence produces uncertainty and investigation. It does not manufacture a denial, allow, successful deletion, or claim that no event occurred.

## Incident closure

Closure requires:

- containment and eradication evidence;
- restoration or an explicit decision not to restore;
- affectedness analysis;
- correction and receipt reconciliation;
- deletion and retention review;
- notification and public-summary decisions;
- invalidated credentials, keys, artifacts, sessions, queues, or providers addressed;
- follow-up controls with owners and deadlines;
- residual harm and uncertainty recorded;
- review and appeal paths preserved; and
- revalidation triggers identified.

An incident may close with residual risk when external recipients, public copies, inaccessible systems, provider limitations, or incomplete evidence prevent complete reversal. That status must be explicit.

## Current evidence and non-scope

Current evidence consists of:

- the public security disclosure policy;
- publication and confidentiality rules;
- architecture-level authority separation;
- receipt, audit, deletion, recovery, key, and environment models;
- repository validation and synthetic-only development; and
- this internal response and retention plan.

The project does not currently have:

- production monitoring, alerting, or paging;
- a named incident response team or on-call rotation;
- production audit storage or retention automation;
- production notification or support services;
- forensic tooling;
- legal or regulatory notification determinations;
- protected incident exercises; or
- independent security, privacy, accessibility, legal, clinical, research, or records-governance approval.

## Review and revalidation triggers

Revalidate this plan when:

- a pilot or production system is proposed;
- monitoring, audit, support, incident, notification, or forensic providers are selected;
- a new high-consequence operation or recipient is introduced;
- an incident, vulnerability, disclosure, deletion failure, false receipt, or restore failure occurs;
- audit fields, access, retention, export, or deletion behavior changes;
- legal, contractual, insurance, clinical, research, or records requirements change;
- staffing, founder, provider, or institutional authority changes; or
- specialist review changes the accepted boundary.
