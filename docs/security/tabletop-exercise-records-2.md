# Synthetic Tabletop Exercise Records — `TTX-009` through `TTX-015`

[Security architecture](README.md) · [Exercise method](synthetic-abuse-case-and-tabletop-method.md) · [Abuse-case register](synthetic-abuse-case-register.md) · [Records 1–8](tabletop-exercise-records-1.md) · [Follow-up register](synthetic-evidence-gap-and-follow-up-register.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — founding-steward design tabletops complete; multi-party, independent, implementation, and operational exercises pending  
**Workstream:** 5.9  
**Exercise date:** 2026-07-26  
**Information class:** PUBLIC synthetic-only evidence  
**Actual participant:** founding steward  
**Simulated roles:** future domain, security, privacy, reliability, accessibility, legal, records-governance, research, communications, support, provider, and incident owners as named per record

## `TTX-009` — Secret exposure in CI or preview logs

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-009`.
- **Assumptions:** the repository, CI, preview, cache, and artifact paths contain only invented values; no production secret exists.
- **Opening condition:** a pull-request preview builds successfully.
- **Inject 1 — T+0:** a synthetic production-like token and private endpoint appear in a public build log.
- **Decision:** treat exposure as irreversible and potentially copied; revoke or rotate before relying on log deletion.
- **Inject 2 — T+5:** the same value appears in a retained artifact and transformed form that redaction did not match.
- **Decision:** inventory direct and indirect copies, remove or restrict artifacts where possible, invalidate caches, and preserve only minimized private incident evidence.
- **Inject 3 — T+10:** no access to the represented service is visible.
- **Decision:** absence of observed access is not proof of nonuse; inspect bounded evidence and maintain uncertainty.
- **Inject 4 — T+15:** a maintainer proposes rewriting Git history and declaring containment complete.
- **Decision:** reject the claim; clones, caches, notifications, screenshots, and archives may persist.
- **Inject 5 — T+20:** the token is shared across multiple synthetic services and environments.
- **Decision:** rotate all dependent credentials, suspend affected workloads, and record the secret-uniqueness and environment-separation failure.
- **Architecture evidence consulted:** `CTL-KSE-025` through `CTL-KSE-031`, `CTL-KSE-035`, `CTL-KSE-049`, `CTL-UT-032` through `CTL-UT-035`, `SECURITY.md` containment rules.
- **Expected containment:** revoke, rotate, stop publication, remove artifacts, invalidate caches and sessions, restrict previews, and inspect downstream copies.
- **Expected restoration:** rebuild with unique clean credentials, verify synthetic-only preview isolation, correct public claims, and publish a safe advisory when material.
- **Person-facing behavior:** notify affected people if protected data access becomes confirmed or reasonably suspected; never reproduce the secret in notices.
- **Gaps found:** `GAP-TTX-009-A` production secret inventory and revocation evidence absent; `GAP-TTX-009-B` artifact, cache, and history scanning not fully evidenced; `GAP-TTX-009-C` indirect-value redaction testing absent.
- **Residual harm:** public copies may persist indefinitely; the exposure window may remain uncertain.
- **Follow-up owner:** future repository, CI, deployment, secret-management, security, privacy, and incident owners.
- **Revalidation trigger:** every CI, preview, artifact, cache, logging, deployment, or secret-delivery change.
- **Conclusion:** containment ordering is explicit, but production secret lifecycle and scanning effectiveness are unproven.

## `TTX-010` — Dependency, build, or release compromise

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `PILOT-BLOCKING`.
- **Paired scenario:** `SYN-010`.
- **Assumptions:** all packages, actions, scripts, artifacts, and outputs are synthetic or public; no production deployment exists.
- **Opening condition:** a dependency update passes ordinary tests.
- **Inject 1 — T+0:** the dependency name resembles the intended package but resolves to a different namespace and executes an install script.
- **Decision:** block release, inspect source and namespace, reject unreviewed lifecycle scripts, and invalidate the dependency cache.
- **Inject 2 — T+5:** generated code includes an obfuscated network call absent from reviewed source.
- **Decision:** generated code is reviewable supply-chain input; quarantine the artifact and compare generated outputs from a clean build.
- **Inject 3 — T+10:** the workflow action uses a mutable tag and had broader repository permissions than needed.
- **Decision:** revoke affected workflow identities, pin reviewed action revisions, reduce permissions, and inspect all artifacts built during the exposure window.
- **Inject 4 — T+15:** the artifact signature is valid because the compromised build identity signed it.
- **Decision:** signature proves possession of the signing identity, not trustworthy source or review; require source, build, and attestation chain.
- **Inject 5 — T+20:** one public artifact may already have been downloaded.
- **Decision:** publish a safe advisory, withdraw affected artifacts where possible, provide corrected artifacts and hashes, and retain residual downstream risk.
- **Architecture evidence consulted:** `CTL-TM-019`, `CTL-UT-029` through `CTL-UT-035`, `CTL-KSE-039`, `CTL-KSE-049`, repository policy, least-permission CI.
- **Expected containment:** freeze release, revoke build and deployment identities, quarantine caches and artifacts, and suspend affected previews.
- **Expected restoration:** clean rebuild from reviewed source, reproduce artifacts, compare provenance, rotate signing identities where needed, and restore release narrowly.
- **Person-facing behavior:** correct download or capability guidance and issue a safe advisory without publishing exploit-enabling details.
- **Gaps found:** `GAP-TTX-010-A` complete dependency provenance and action-pinning evidence absent; `GAP-TTX-010-B` reproducible build and artifact attestation absent; `GAP-TTX-010-C` downstream artifact-notification process absent.
- **Residual harm:** downloaded or mirrored artifacts may remain in use; trusted upstreams may fail again.
- **Follow-up owner:** future repository, dependency, build, release, deployment, security, and communications owners.
- **Revalidation trigger:** every dependency, package manager, action, build script, generated-code path, cache, signing, or release change.
- **Conclusion:** the architecture rejects signature-only trust and supports clean rebuild, but supply-chain evidence remains incomplete.

## `TTX-011` — Ransomware and backup restoration

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-011`.
- **Assumptions:** synthetic live state, backups, keys, queues, receipts, deletions, and tombstones are modeled; no actual backup system exists.
- **Opening condition:** normal private service is available.
- **Inject 1 — T+0:** a destructive operator encrypts live data and disables ordinary administrative access.
- **Decision:** isolate the environment, revoke operator and workload identities, stop replication into protected recovery copies, and invoke private incident handling.
- **Inject 2 — T+10:** recent backups are also corrupted because live and backup credentials shared a trust boundary.
- **Decision:** quarantine affected copies, record a shared-failure-domain design breach, and select the newest independently validated copy rather than the newest nominal copy.
- **Inject 3 — T+20:** the intact backup predates withdrawals, corrections, deletion completions, key revocations, and compromised sessions.
- **Decision:** restore only into an isolated recovery environment; replay and reconcile all post-snapshot authority, lifecycle, deletion, tombstone, incident, and key events before activation.
- **Inject 4 — T+30:** queues contain old exports and connector jobs.
- **Decision:** keep workers stopped; reconcile idempotency, capacity, cancellation, decision freshness, recipient state, and receipts before resuming.
- **Inject 5 — T+40:** product pressure requests immediate full activation.
- **Decision:** reject convenience-first activation; use staged, multi-party, bounded activation with rollback and monitoring.
- **Inject 6 — T+50:** some post-recovery-point records are unavailable.
- **Decision:** state loss honestly, preserve sources and correction paths where possible, notify affected people, and record residual harm.
- **Architecture evidence consulted:** `CTL-RID-006` through `CTL-RID-020`, `CTL-KSE-008`, `CTL-KSE-020`, `CTL-LC-026`, `CTL-TM-020`, `CTL-TM-021`.
- **Expected containment:** environment isolation, identity and key revocation, replication stop, evidence preservation, and recovery-copy quarantine.
- **Expected restoration:** clean identities and artifacts, isolated restore, post-snapshot reconciliation, queue review, staged activation, correction, notification, and monitoring.
- **Person-facing behavior:** truthful service state, accessible non-AI fallback, durable rights-request acknowledgment, restoration and correction receipts, and incident notice when material.
- **Gaps found:** `GAP-TTX-011-A` isolated immutable backup evidence absent; `GAP-TTX-011-B` post-snapshot reconciliation implementation absent; `GAP-TTX-011-C` multi-party recovery activation and founder-independent continuity unproven.
- **Residual harm:** data after the recovery point may be lost; attackers may retain copies; downtime and delayed rights may continue.
- **Follow-up owner:** future reliability, security, key, Chronicle, House of Keys, deletion, receipt, accessibility, and incident owners.
- **Revalidation trigger:** every backup, key, recovery, queue, provider, region, persistence, or authority-event implementation.
- **Conclusion:** recovery ordering preserves rights in design; no backup integrity, restore-time, or reconciliation effectiveness is proven.

## `TTX-012` — Deletion verification with backups and external recipients

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `SPECIALIST-HOLDPOINT`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-012`.
- **Assumptions:** a synthetic person has canonical records, sources, derivatives, one export, one external recipient, receipts, audit, queues, and backups.
- **Opening condition:** the person submits an exact verified deletion request.
- **Inject 1 — T+0:** the dependency graph omits one retrieval index and one queued regeneration job.
- **Decision:** deletion cannot complete; prevent regeneration, expand the target graph, quarantine the queue, and preserve a pending status.
- **Inject 2 — T+10:** controlled primary and source copies are deleted, but an immutable backup will not expire for thirty synthetic days.
- **Decision:** mark backup-pending with exact expiry and restore-block obligations; do not claim full completion.
- **Inject 3 — T+20:** an external recipient attests that it deleted the release, but no independent verification is possible.
- **Decision:** record recipient-attested, not independently verified; preserve onward-use residual risk.
- **Inject 4 — T+30:** a provider reports “deletion requested” but not “deleted.”
- **Decision:** preserve provider-pending or ambiguous state and escalation owner; do not translate request acceptance into completion.
- **Inject 5 — T+40:** a narrow security retention exception applies to a minimized incident record.
- **Decision:** record exact fields, purpose, owner, expiry, access boundary, and challenge path; prohibit the exception from becoming a retained Chronicle copy.
- **Inject 6 — T+50:** a later restore test would resurrect the record without a tombstone.
- **Decision:** block activation, require non-sensitive tombstone and post-snapshot deletion replay, and correct prior completion evidence if necessary.
- **Architecture evidence consulted:** `CTL-LC-021` through `CTL-LC-026`, `CTL-RID-035` through `CTL-RID-045`, `CTL-KSE-021`, `CTL-HK-027`, `CTL-HK-035`.
- **Expected containment:** prevent regeneration and release, quarantine queues and derivatives, notify providers and recipients, and maintain exact pending states.
- **Expected restoration:** correction of dependency graph and receipts, backup expiry handling, tombstone verification, challenge response, and deletion-aware restore testing.
- **Person-facing behavior:** accessible bounded completion record listing completed, pending, exception-retained, provider-ambiguous, recipient-attested, external-unverified, and residual states.
- **Gaps found:** `GAP-TTX-012-A` complete automated dependency graph absent; `GAP-TTX-012-B` provider and recipient deletion evidence contracts absent; `GAP-TTX-012-C` legal and records-governance exception review pending; `GAP-TTX-012-D` deletion-aware restore evidence absent.
- **Residual harm:** external copies, provider snapshots, publications, and human memory may persist; universal erasure is not provable.
- **Follow-up owner:** future deletion, Chronicle, source, AI, analytics, backup, recipient, privacy, legal, records-governance, and support owners.
- **Revalidation trigger:** every persistent derivative, backup, provider, recipient, retention exception, restore, or deletion-target change.
- **Conclusion:** the design produces honest bounded evidence, but end-to-end deletion verification is not implemented or independently reviewed.

## `TTX-013` — Provider outage and regional failure

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-013`.
- **Assumptions:** identity, database, queue, policy, receipt, AI, connector, and recovery dependencies are modeled across synthetic providers and regions.
- **Opening condition:** ordinary private services are healthy.
- **Inject 1 — T+0:** the primary database and queue region fail while identity remains available.
- **Decision:** preserve authenticated read-only state only when source and freshness are trustworthy; disable consequential writes and releases.
- **Inject 2 — T+5:** AI remains available and proposes continuing capture and permission changes in memory.
- **Decision:** AI unavailability or availability cannot control rights-critical actions; offer manual capture draft only if durable acknowledgment and later confirmation semantics are explicit; deny permission changes without authoritative persistence.
- **Inject 3 — T+10:** a person submits revocation and deletion requests, but durable rights-request storage is unavailable.
- **Decision:** explicitly state non-acceptance or use an independently durable rights-request channel; never display accepted or completed without evidence.
- **Inject 4 — T+20:** a secondary replica is available but has unknown post-snapshot corrections and revocations.
- **Decision:** keep in validation hold, reconcile authority and deletion state before any activation, and do not fail over because the endpoint is reachable.
- **Inject 5 — T+30:** the outage expands to a shared provider control plane.
- **Decision:** invoke provider-exit and manual continuity assumptions, preserve private evidence, and communicate uncertainty rather than claiming multi-region resilience.
- **Architecture evidence consulted:** `CTL-RID-001` through `CTL-RID-005`, `CTL-RID-014` through `CTL-RID-020`, `CTL-KSE-032` through `CTL-KSE-041`, `CTL-HK-009` through `CTL-HK-014`, `CTL-TM-021`.
- **Expected containment:** fail closed for authority, pause queues and releases, keep replicas quarantined, and restrict provider access.
- **Expected restoration:** validate replica or backup integrity, reconcile post-boundary events, stage activation, correct delayed states, and monitor.
- **Person-facing behavior:** accessible status, manual or non-AI fallback, exact request acceptance state, no shame or lost rights from outage, and correction after recovery.
- **Gaps found:** `GAP-TTX-013-A` service objectives and dependency failure budgets absent; `GAP-TTX-013-B` independent durable rights-request channel absent; `GAP-TTX-013-C` regional and provider-exit tests absent.
- **Residual harm:** downtime, delayed rights, unavailable records, and recovery-point loss may occur; shared provider dependencies can defeat redundancy.
- **Follow-up owner:** future reliability, identity, House of Keys, receipt, provider, accessibility, security, and communications owners.
- **Revalidation trigger:** every provider, region, failover, rights-request, queue, persistence, or identity architecture change.
- **Conclusion:** the design supports truthful degradation and reconciliation, but availability and failover performance are unproven.

## `TTX-014` — Public-site signup disclosure or retention incident

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `CURRENT-BOUNDED-FLOW`; `REVALIDATION-REQUIRED`.
- **Paired scenario:** `SYN-014`.
- **Assumptions:** the current public site forwards minimal synthetic signup records to a bounded private processor. No health, account, wallet, research, or product authority exists.
- **Opening condition:** the signup notice states one project-update purpose.
- **Inject 1 — T+0:** request-body logging begins capturing full synthetic email and metadata on the public adapter.
- **Decision:** stop or minimize logging, restrict access, rotate affected credentials if needed, inventory public and private copies, and open an incident review.
- **Inject 2 — T+10:** the private processor retains records beyond the stated or intended period because no owner or schedule exists.
- **Decision:** establish accountable ownership and retention disposition; do not infer indefinite retention from operational convenience.
- **Inject 3 — T+20:** a preview deployment exposes a small synthetic signup export.
- **Decision:** treat preview as public, remove the export, rotate credentials, inspect caches and artifacts, and preserve uncertainty about copies.
- **Inject 4 — T+30:** a person requests unsubscribe and deletion, but no tested path exists.
- **Decision:** acknowledge only if the request is durably captured; provide manual resolution, verify exact copies, and issue bounded completion evidence.
- **Inject 5 — T+40:** communications proposes reusing the list for fundraising and research recruitment.
- **Decision:** reject purpose expansion; require separate notice and authority, and preserve the original refusal or unsubscribe state.
- **Architecture evidence consulted:** publication and confidentiality policy, `SECURITY.md`, `CTL-TM-018`, `CTL-TM-026`, `CTL-TM-027`, `CTL-KSE-025` through `CTL-KSE-031`, `CTL-RID-021` through `CTL-RID-045`.
- **Expected containment:** stop uncertain collection, restrict logs and previews, rotate credentials, inventory copies, and prevent purpose reuse.
- **Expected restoration:** implement accountable lifecycle ownership, unsubscribe and deletion paths, corrected notices, minimized logs, and safe public incident summary when material.
- **Person-facing behavior:** accessible unsubscribe, correction, deletion, and incident notice; no false universal deletion claim.
- **Gaps found:** `GAP-TTX-014-A` named private-list owner absent; `GAP-TTX-014-B` retention, unsubscribe, correction, and deletion workflow incomplete; `GAP-TTX-014-C` preview and logging evidence limited; `GAP-TTX-014-D` incident route and notification process incomplete.
- **Residual harm:** public caches, notifications, exports, and private operator copies may persist.
- **Follow-up owner:** current founding maintainer until named website, signup, privacy, records-governance, and incident owners exist.
- **Revalidation trigger:** every signup field, processor, notice, campaign, retention, logging, preview, or communications-purpose change.
- **Conclusion:** current flow remains narrowly bounded, but lifecycle ownership and evidence gaps require remediation and continuous monitoring.

## `TTX-015` — Research actor attempting scope expansion

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `INSTITUTIONAL-HOLDPOINT`; `SPECIALIST-HOLDPOINT`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-015`.
- **Assumptions:** a wholly synthetic study has an approved protocol for one variable, one purpose, one organization, one retention period, and reviewed aggregate outputs. No real research runtime or enrollment exists.
- **Opening condition:** the study operates within its synthetic approved scope.
- **Inject 1 — T+0:** the researcher requests additional variables and identity linkage because they may improve the analysis.
- **Decision:** scientific interest does not create authority; block scope expansion and require a new protocol, governance review, person request, explanation, and exact grant.
- **Inject 2 — T+10:** the researcher asks to retain data beyond the approved period for future unspecified studies.
- **Decision:** deny unspecified future use; retention must remain study-specific, time-bounded, and reviewable.
- **Inject 3 — T+20:** the researcher proposes contacting participants directly using platform identity mappings.
- **Decision:** prohibit global identity graph reuse and direct contact absent separate authority and safe communication design.
- **Inject 4 — T+30:** one small subgroup result is scientifically interesting but re-identifiable.
- **Decision:** withhold, combine, generalize, or reject the output pending disclosure and re-identification review.
- **Inject 5 — T+40:** a participant withdraws after a person-level extract was delivered externally.
- **Decision:** stop future use where controlled, notify the recipient, update dataset and receipt state, state publication or external-copy limits honestly, and preserve residual risk.
- **Inject 6 — T+50:** product proposes progression rewards for enrollment.
- **Decision:** reject coercive or unequal incentives; research participation cannot create superior core rights, rewards, eligibility, or governance weight.
- **Architecture evidence consulted:** `CTL-TM-008`, `CTL-TM-022` through `CTL-TM-025`, `CTL-HK-004` through `CTL-HK-010`, `CTL-HK-027`, `CTL-RID-040` through `CTL-RID-045`, publication and confidentiality policy.
- **Expected containment:** block expanded extract and output, suspend affected dataset, review prior use, notify recipients and participants where required, and prevent identity linkage.
- **Expected restoration:** corrected protocol and dataset, exact new authority where appropriate, withdrawal processing, receipt correction, disclosure review, and public correction when necessary.
- **Person-facing behavior:** direct explanation, meaningful refusal and withdrawal, no product penalty, accessible challenge, and honest limits after external release or publication.
- **Gaps found:** `GAP-TTX-015-A` research governance and ethics structure absent; `GAP-TTX-015-B` study-specific House of Keys and dataset isolation unimplemented; `GAP-TTX-015-C` output disclosure and re-identification review absent; `GAP-TTX-015-D` external withdrawal and deletion evidence unresolved.
- **Residual harm:** released datasets, inferences, and publications may not be retractable; aggregate outputs can re-identify people.
- **Follow-up owner:** future research governance, House of Keys, privacy, security, legal, data, publication, accessibility, and participant-support owners.
- **Revalidation trigger:** every protocol, variable, recipient, dataset, linkage, output, retention, incentive, withdrawal, or research-governance change.
- **Conclusion:** the architecture rejects research exceptionalism and scope laundering; institutional and specialist gates remain fully blocking.

## Part-two result

The remaining seven required scenario classes have accountable founding-steward design-tabletop records. Every record preserves implementation, evidence, multi-party participation, and specialist-review gaps.

Across all fifteen exercises, no scenario produced a valid production-readiness conclusion.
