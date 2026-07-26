# Synthetic Security Abuse-Case Register

[Security architecture](README.md) · [Exercise method](synthetic-abuse-case-and-tabletop-method.md) · [Threat model](integrated-threat-model.md) · [Control registers](threat-control-objective-register.md) · [Tabletop records 1–8](tabletop-exercise-records-1.md) · [Tabletop records 9–15](tabletop-exercise-records-2.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward design-tabletop review complete; independent specialist, multi-party, and operational exercises pending  
**Workstream:** 5.9  
**Revision:** 1  
**Information class:** PUBLIC synthetic-only evidence  
**Production boundary:** invented scenarios only; no real system, person, health information, credential, provider, recipient, research study, incident, exploit, or private evidence is used

## Register rules

Each record is a reusable synthetic scenario specification, not a claim that the event occurred or that the named controls are implemented.

All identifiers, people, organizations, records, services, timestamps, documents, grants, receipts, logs, and provider states are invented.

## `SYN-001` — Cross-user Chronicle leakage

- **Required class:** cross-user Chronicle leakage.
- **Threats and risks:** `THR-001`, `THR-002`, `THR-011`, `THR-026`, `THR-031`, `THR-044` and paired `RSK-*` records.
- **Assets and boundaries:** `AST-005` through `AST-016`; `BX-004` through `BX-010`; `TZ-S0` through `TZ-S5`.
- **Synthetic setup:** person A and person B have distinct accounts, Chronicle pseudonyms, sources, grants, receipts, and retrieval indexes. A request from person A includes a caller-supplied Chronicle identifier belonging to person B.
- **Abuse path:** an edge, domain, queue, retrieval, or receipt component trusts the caller-supplied owner or resource identifier or loses server-derived context between layers.
- **Expected controls:** `CTL-TM-001`, `CTL-ID-002`, `CTL-ID-005`, `CTL-ID-012`, `CTL-LC-001`, `CTL-UT-001`, `CTL-UT-019`, `CTL-HK-001` through `CTL-HK-004`.
- **Expected person-visible outcome:** person B receives a minimized accessible incident and correction notice when disclosure is confirmed or reasonably suspected; person A is not shown person B’s data in error details.
- **Containment and restoration:** deny the request, suspend affected sessions and service identities, quarantine mixed caches or indexes, reconcile receipts and audit, correct derived state, and restore only after tenant and resource isolation are revalidated.
- **Future evidence required:** integration tests across edge, domain, queue, retrieval, receipt, export, and restore paths; tenant-bound queries; cross-user negative tests; protected audit and notification evidence.
- **Residual harm:** metadata or data may already have been disclosed; external copies or human memory cannot be fully reversed.
- **Owner roles:** identity, Chronicle, retrieval, receipt, security, and incident owners.
- **Holdpoint and trigger:** production-blocking; rerun after any identity, resource-routing, cache, queue, retrieval, export, or restore change.

## `SYN-002` — Compromised agent or MCP client

- **Required class:** compromised agent or MCP client.
- **Threats and risks:** `THR-023`, `THR-024`, `THR-026`, `THR-028`, `THR-031`, `THR-043`.
- **Assets and boundaries:** sessions, execution envelopes, prompts, retrieval, tool registry, queues, receipts, and private service identities across `TZ-S0`, `TZ-S1`, `TZ-S4`, `TZ-S5`, and `TZ-S7`.
- **Synthetic setup:** a Chronicle MCP client authorized only to prepare one capture draft is compromised and requests hidden tools, another Chronicle, arbitrary filesystem access, and export.
- **Abuse path:** the client reuses stale authorization, supplies another owner identifier, injects tool names through retrieved content, or chains allowed tools into a broader effect.
- **Expected controls:** `CTL-TM-001`, `CTL-TM-009`, `CTL-TM-010`, `CTL-TM-013`, `CTL-TM-014`, `CTL-UT-022` through `CTL-UT-028`, `CTL-HK-011`, `CTL-HK-025`, `CTL-KSE-032`.
- **Expected person-visible outcome:** blocked or attempted sensitive operations produce minimized accessible receipts where doing so does not leak defensive details; active sessions and delegated access can be reviewed and revoked.
- **Containment and restoration:** revoke client credentials and envelopes, terminate sessions, disable affected tools, quarantine queued work, revalidate resource context and decisions, correct receipts, and restore through a clean client identity.
- **Future evidence required:** adversarial tool-selection tests, registry-drift tests, stale-envelope tests, confused-deputy tests, per-tool purpose and risk-class checks, and compromise containment exercises.
- **Residual harm:** a compromised client may have received already-authorized data before detection; semantic attack paths cannot be eliminated solely by prompts.
- **Owner roles:** MCP, identity, House of Keys, execution, AI-safety, Chronicle, and security owners.
- **Holdpoint and trigger:** production-blocking; rerun for every tool, registry, client, model, retrieval, or remote-transport change.

## `SYN-003` — Stolen session and abusive account recovery

- **Required class:** stolen session and abusive account recovery.
- **Threats and risks:** `THR-003`, `THR-004`, `THR-005`, `THR-006`, `THR-007`, `THR-010`.
- **Assets and boundaries:** `AST-005`, `AST-006`, House of Keys grants, recovery evidence, sessions, device state, and operator interfaces.
- **Synthetic setup:** an attacker steals an ordinary session, starts a recovery case, and supplies intimate health knowledge as purported proof while attempting to add a delegate and export data.
- **Abuse path:** recovery is treated as authority expansion, existing sessions remain active, health knowledge is accepted as identity proof, or support silently impersonates the person.
- **Expected controls:** `CTL-ID-003`, `CTL-ID-004`, `CTL-ID-006` through `CTL-ID-011`, `CTL-TM-002`, `CTL-TM-003`, `CTL-KSE-028`, `CTL-RID-019`.
- **Expected person-visible outcome:** accessible alerts, session review, recovery challenge, explanation of restricted recovery state, and correction or restoration paths without exposing protected account evidence.
- **Containment and restoration:** revoke dependent sessions and tokens, restrict the recovery case, prevent export and permission changes, preserve challenge evidence, and restore bounded access without restoring removed authority.
- **Future evidence required:** session rotation and revocation tests, recovery-state integration tests, support-capability tests, notification delivery tests, and founder-absence recovery exercise.
- **Residual harm:** stolen-session actions completed before containment may remain irreversible; notification channels may also be compromised.
- **Owner roles:** identity, recovery, support, security, receipt, and accessibility owners.
- **Holdpoint and trigger:** production-blocking and specialist holdpoint for representative or capacity authority; rerun after identity-provider, recovery, device, or delegation changes.

## `SYN-004` — Malicious upload and prompt injection

- **Required class:** malicious upload and prompt injection.
- **Threats and risks:** `THR-015`, `THR-024`, `THR-025`, `THR-026`, `THR-028`.
- **Assets and boundaries:** raw source bytes, parsers, scanners, document processors, prompts, model outputs, retrieval derivatives, and source custody across `TZ-S3` through `TZ-S5`.
- **Synthetic setup:** an invented document contains a decompression bomb, embedded instruction to reveal another person’s records, misleading clinical language, and a hidden link to an external endpoint.
- **Abuse path:** the system trusts extension or MIME label, processes without resource bounds, passes embedded instructions as authoritative prompt text, follows uncontrolled links, or confirms extracted claims automatically.
- **Expected controls:** `CTL-TM-007`, `CTL-TM-014`, `CTL-UT-002` through `CTL-UT-011`, `CTL-UT-017`, `CTL-LC-005` through `CTL-LC-011`, `CTL-KSE-003`.
- **Expected person-visible outcome:** safe explanation that processing failed or produced a draft requiring review; no false claim that the document is safe or clinically valid.
- **Containment and restoration:** quarantine source versions and derivatives, stop processing, revoke affected worker identity, invalidate prompts and indexes, preserve minimal evidence, and rebuild from clean artifacts.
- **Future evidence required:** archive and parser fuzzing, expansion-limit tests, sandbox-escape tests, malware uncertainty handling, prompt-injection adversarial tests, and source-linked invalidation tests.
- **Residual harm:** novel parser and semantic attacks remain possible; provider retention may limit full correction or deletion.
- **Owner roles:** upload, source custody, parser, AI-safety, retrieval, security, and Chronicle owners.
- **Holdpoint and trigger:** production-blocking; rerun for every accepted file type, parser, scanner, model, prompt, retrieval source, or provider.

## `SYN-005` — Purpose laundering and stale permission decision

- **Required class:** purpose laundering and stale permission decision.
- **Threats and risks:** `THR-017`, `THR-018`, `THR-020`, `THR-038`, `THR-043`.
- **Assets and boundaries:** House of Keys definitions, grants, explanations, decisions, capacity, receipts, and release state.
- **Synthetic setup:** a request labeled “personal insight” actually routes data to a partner analysis service. The decision references a retired purpose revision and a grant that was valid at evaluation time but is now suspended.
- **Abuse path:** adjacent language is mapped to a grantable purpose, a stale definition is treated as compatible, or the recipient and performing actor are hidden behind a generic service label.
- **Expected controls:** `CTL-TM-009`, `CTL-TM-010`, `CTL-HK-003` through `CTL-HK-010`, `CTL-HK-014`, `CTL-HK-025`, `CTL-HK-027`, `CTL-ID-012`.
- **Expected person-visible outcome:** deny or indeterminate receipt with direct explanation, no penalty for refusal, and a challenge path when the mapping is disputed.
- **Containment and restoration:** block release, invalidate dependent decisions and envelopes, suspend the mapping, review prior uses, issue corrections, and notify affected people when inappropriate use may have occurred.
- **Future evidence required:** taxonomy revision tests, purpose and recipient mapping review, stale-decision tests, comprehension accessibility testing, and independent privacy or legal review for external purposes.
- **Residual harm:** prior disclosures cannot be recalled completely; ambiguous language can remain coercive even when technically precise.
- **Owner roles:** House of Keys, privacy, product, recipient, accessibility, and legal owners.
- **Holdpoint and trigger:** production-blocking and specialist holdpoint; rerun for every purpose, recipient, action, category, explanation, or mapping revision.

## `SYN-006` — Revocation during queued or in-flight execution

- **Required class:** revocation during queued or in-flight execution.
- **Threats and risks:** `THR-018`, `THR-019`, `THR-020`, `THR-021`, `THR-031`, `THR-045`.
- **Assets and boundaries:** policy decisions, capacity reservations, execution envelopes, queues, releases, recipients, receipts, and audit.
- **Synthetic setup:** a one-time release is allowed and queued. The person withdraws the grant after capacity reservation but before the worker reaches the external release boundary.
- **Abuse path:** the worker treats the queued message or reservation as durable authority, fails to re-evaluate, double-consumes capacity on retry, or records a clean completion despite an ambiguous external response.
- **Expected controls:** `CTL-TM-010` through `CTL-TM-012`, `CTL-HK-009` through `CTL-HK-020`, `CTL-HK-022`, `CTL-HK-029`, `CTL-RID-013`.
- **Expected person-visible outcome:** withdrawal acknowledgment, stopped or corrected receipt, and explicit distinction among no release, confirmed release, partial release, and unknown external outcome.
- **Containment and restoration:** cancel dependent work, quarantine ambiguous operations, preserve ordering evidence, notify recipients where applicable, correct capacity and receipts, and record residual external risk.
- **Future evidence required:** transactional race tests, queue cancellation and dead-letter tests, idempotency tests, recipient timeout tests, and receipt reconciliation tests.
- **Residual harm:** a release may cross the external boundary before revocation propagation; complete downstream containment may be impossible.
- **Owner roles:** House of Keys, execution, queue, recipient, receipt, privacy, and incident owners.
- **Holdpoint and trigger:** production-blocking; rerun for every queue, transaction, retry, recipient, export, or release implementation.

## `SYN-007` — Receipt omission, duplication, or forgery

- **Required class:** receipt omission or forgery.
- **Threats and risks:** `THR-021`, `THR-022`, `THR-043`.
- **Assets and boundaries:** execution evidence, person-visible receipts, protected audit, delivery state, and correction chains.
- **Synthetic setup:** one release succeeds but no receipt is delivered; a duplicate receipt appears with a different recipient; protected audit contains a malformed event claiming the release was denied.
- **Abuse path:** receipt issuance is asynchronous without durable intent, duplicate events create conflicting narratives, or audit data is trusted as the sole authority for person-visible history.
- **Expected controls:** `CTL-TM-012`, `CTL-HK-021` through `CTL-HK-024`, `CTL-HK-031` through `CTL-HK-034`, `CTL-RID-024` through `CTL-RID-033`.
- **Expected person-visible outcome:** corrected receipt chain, accessible delivery retry, explanation of uncertainty, challenge path, and no unnecessary health content in the receipt.
- **Containment and restoration:** stop affected release paths where missing receipts are systematic, reconcile execution, receipt, and audit identities, correct rather than overwrite, and investigate possible undisclosed access.
- **Future evidence required:** durable receipt-intent tests, missing-receipt alerts, duplicate and conflict tests, integrity checks, accessibility tests, and retention or deletion tests.
- **Residual harm:** a person may act on incomplete history; missing evidence may prevent definitive reconstruction.
- **Owner roles:** receipt, execution, audit, accessibility, support, and incident owners.
- **Holdpoint and trigger:** production-blocking and specialist holdpoint; rerun for every receipt schema, delivery channel, audit, or retention change.

## `SYN-008` — Insider curiosity and emergency-power abuse

- **Required class:** insider curiosity and emergency-power abuse.
- **Threats and risks:** `THR-008`, `THR-009`, `THR-022`, `THR-042`, `THR-044`.
- **Assets and boundaries:** operator interfaces, emergency capabilities, identity mappings, audit evidence, Chronicle and source records, and notifications.
- **Synthetic setup:** an operator searches for a well-known synthetic person without a case. After denial, the operator declares an emergency and attempts broad export and log suppression.
- **Abuse path:** operator role or urgency is treated as permission, emergency scope is broad or unbounded, silent impersonation exists, or audit can be disabled by the same actor.
- **Expected controls:** `CTL-ID-009` through `CTL-ID-011`, `CTL-TM-004`, `CTL-TM-005`, `CTL-TM-012`, `CTL-KSE-018`, `CTL-RID-019`, `CTL-RID-028`.
- **Expected person-visible outcome:** notification and challenge where safe, without exposing sensitive investigation details; correction of any unauthorized action and clear status of remaining uncertainty.
- **Containment and restoration:** revoke operator and emergency capabilities, preserve independent evidence, suspend affected interfaces, review scope of access, restore through clean identities, and publish a safe institutional summary when appropriate.
- **Future evidence required:** operator-capability tests, emergency expiry and approval tests, independent audit-path tests, alert tests, and founder-independent response exercise.
- **Residual harm:** viewed information cannot be made unknown; retaliation or institutional capture may suppress reporting without independent governance.
- **Owner roles:** security, operator governance, identity, privacy, audit, incident, and institutional immune-system owners.
- **Holdpoint and trigger:** production-blocking and independent-review holdpoint; rerun for every operator, support, emergency, audit, or governance change.

## `SYN-009` — Secret exposure in CI or preview logs

- **Required class:** secret exposure in CI or preview logs.
- **Threats and risks:** `THR-028`, `THR-029`, `THR-030`, `THR-039`, `THR-046`.
- **Assets and boundaries:** secrets, service identities, CI logs, caches, artifacts, previews, deployment providers, and public repository surfaces.
- **Synthetic setup:** a preview build prints an invented production-like token and private endpoint into a public log and artifact. The same token is present in a cache snapshot.
- **Abuse path:** preview receives protected credentials, redaction misses transformed values, artifact retention preserves the secret, or deletion is mistaken for containment.
- **Expected controls:** `CTL-TM-017` through `CTL-TM-019`, `CTL-KSE-025` through `CTL-KSE-031`, `CTL-KSE-035`, `CTL-KSE-049`, `CTL-UT-032` through `CTL-UT-035`.
- **Expected person-visible outcome:** affected people are notified when access to their information may have occurred; public advisory is safe and does not reproduce the secret.
- **Containment and restoration:** revoke before deletion, invalidate dependent sessions and services, remove public artifacts where possible, rebuild with clean credentials, inspect downstream copies, and preserve minimal private evidence.
- **Future evidence required:** secret scanning across history and artifacts, preview isolation tests, redaction tests, credential revocation timing, cache invalidation, and incident-notification exercise.
- **Residual harm:** clones, caches, notifications, and screenshots may retain the exposed value or related information.
- **Owner roles:** repository, CI, deployment, secret-management, security, and incident owners.
- **Holdpoint and trigger:** production-blocking; rerun for every CI, preview, deployment, logging, or secret-delivery change.

## `SYN-010` — Dependency, build, or release compromise

- **Required class:** dependency or build compromise.
- **Threats and risks:** `THR-030`, `THR-028`, `THR-039`, `THR-043`, `THR-046`.
- **Assets and boundaries:** source, lockfiles, packages, actions, build scripts, caches, generated code, artifacts, attestations, previews, and release identities.
- **Synthetic setup:** a dependency with a familiar name is substituted, executes an install script, modifies generated code, and produces an artifact that passes superficial tests.
- **Abuse path:** namespace confusion, unreviewed scripts, mutable action references, poisoned cache, weak artifact provenance, or the same identity builds and deploys without review.
- **Expected controls:** `CTL-TM-019`, `CTL-UT-029` through `CTL-UT-035`, `CTL-KSE-039`, `CTL-KSE-049`, repository policy and least-permission CI.
- **Expected person-visible outcome:** suspend affected public or private releases, publish a safe advisory when material, and correct capability claims or download guidance.
- **Containment and restoration:** freeze releases, revoke build and deployment identities, invalidate caches, rebuild from reviewed sources in a clean environment, compare artifacts, and rollback safely.
- **Future evidence required:** dependency provenance, lockfile review, action pinning, isolated builds, artifact attestations, reproducibility checks, generated-code review, and release rollback tests.
- **Residual harm:** distributed artifacts and downstream installs may persist beyond project control.
- **Owner roles:** repository, dependency, build, release, deployment, security, and communications owners.
- **Holdpoint and trigger:** pilot-blocking; rerun after every dependency, action, build, cache, generated-code, or release-pipeline change.

## `SYN-011` — Ransomware and backup restoration

- **Required class:** ransomware and backup restoration.
- **Threats and risks:** `THR-032`, `THR-033`, `THR-034`, `THR-035`, `THR-016`, `THR-043`.
- **Assets and boundaries:** canonical data, sources, queues, keys, backups, snapshots, manifests, recovery identities, receipts, deletion state, and tombstones.
- **Synthetic setup:** a destructive operator encrypts or deletes live state and attempts to destroy recent backups. The newest intact backup predates several withdrawals, corrections, and deletions.
- **Abuse path:** backup credentials share the live failure domain, restoration occurs in place, stale authority is activated, queues replay, or responders prioritize availability over deletion and revocation.
- **Expected controls:** `CTL-TM-020`, `CTL-TM-021`, `CTL-LC-026`, `CTL-KSE-008`, `CTL-KSE-020`, `CTL-RID-006` through `CTL-RID-020`.
- **Expected person-visible outcome:** truthful service status, accessible fallback, notice of delayed rights requests, correction and restoration receipts, and notification of material exposure or loss.
- **Containment and restoration:** isolate affected environments, rotate identities and keys, validate backup integrity in a recovery zone, replay post-snapshot authority and deletion events, reconcile queues and receipts, activate narrowly, and monitor.
- **Future evidence required:** immutable or isolated backup controls, clean-room restore tests, post-snapshot reconciliation tests, destructive-operator containment, key recovery, and multi-party activation exercise.
- **Residual harm:** data after the recovery point may be lost; attackers may retain copies; some external effects cannot be reversed.
- **Owner roles:** reliability, security, key, Chronicle, House of Keys, deletion, receipt, and incident owners.
- **Holdpoint and trigger:** production-blocking; rerun for every backup, recovery, queue, key, provider, or regional design change.

## `SYN-012` — Deletion verification with backups and external recipients

- **Required class:** deletion verification with backups and external recipients.
- **Threats and risks:** `THR-016`, `THR-033`, `THR-034`, `THR-045`, `THR-021`, `THR-043`.
- **Assets and boundaries:** canonical and source records, derivatives, exports, indexes, caches, queues, backups, receipts, audit, providers, and external recipients.
- **Synthetic setup:** a person requests deletion after one authorized external release. One backup is immutable until expiry, a provider returns an ambiguous deletion status, and the recipient confirms deletion without independent proof.
- **Abuse path:** the system claims universal erasure, forgets a derivative, permits regeneration from queues, restores from backup without tombstones, or treats recipient attestation as conclusive.
- **Expected controls:** `CTL-LC-021` through `CTL-LC-026`, `CTL-KSE-021`, `CTL-RID-035` through `CTL-RID-045`, `CTL-HK-027`, `CTL-HK-035`.
- **Expected person-visible outcome:** exact completion record listing completed, pending, exception-retained, backup-pending, provider-ambiguous, recipient-attested, and uncontrolled states, plus challenge and correction paths.
- **Containment and restoration:** stop regeneration, quarantine affected queues and derivatives, maintain non-sensitive tombstones, notify recipients, schedule backup expiry handling, and block restore activation until reconciliation.
- **Future evidence required:** complete dependency graph tests, provider deletion integration, backup expiry tests, recipient workflow, tombstone tests, receipt correction, and challenge handling.
- **Residual harm:** uncontrolled recipient copies, provider snapshots, and human memory may persist; universal erasure may be impossible to prove.
- **Owner roles:** deletion, Chronicle, source, AI, analytics, backup, recipient, privacy, legal, and records-governance owners.
- **Holdpoint and trigger:** production-blocking and specialist holdpoint; rerun for every persistent derivative, backup, recipient, provider, retention, or restore change.

## `SYN-013` — Provider outage and regional failure

- **Required class:** provider outage and regional failure.
- **Threats and risks:** `THR-035`, `THR-031`, `THR-025`, `THR-027`, `THR-043`.
- **Assets and boundaries:** identity, policy, database, source storage, queue, receipt, AI, connector, secret, and recovery services across multiple provider dependencies.
- **Synthetic setup:** a region loses database and queue availability while identity remains partially available. The AI provider is healthy, but the policy and receipt services are not.
- **Abuse path:** the system fails open, lets AI or cached decisions continue sensitive actions, accepts rights requests without durable acknowledgment, or shifts traffic to an unreconciled replica.
- **Expected controls:** `CTL-TM-021`, `CTL-HK-009` through `CTL-HK-014`, `CTL-KSE-032` through `CTL-KSE-041`, `CTL-RID-001` through `CTL-RID-005`, `CTL-RID-014` through `CTL-RID-020`.
- **Expected person-visible outcome:** clear availability state, accessible manual or non-AI paths, explicit acceptance or non-acceptance of rights requests, and no false “completed” status.
- **Containment and restoration:** disable consequential actions lacking fresh authority, preserve read-only access where safe, fail over only to validated isolated state, reconcile post-boundary events, and activate in stages.
- **Future evidence required:** dependency maps, failure-domain tests, degraded-mode tests, rights-request durability, regional restore or failover tests, and provider-exit exercises.
- **Residual harm:** temporary unavailability, delayed rights, and loss beyond recovery objectives may occur; shared providers can defeat nominal redundancy.
- **Owner roles:** reliability, identity, House of Keys, receipt, provider, security, and communications owners.
- **Holdpoint and trigger:** production-blocking; rerun after every provider, region, failover, identity, queue, or persistence change.

## `SYN-014` — Public-site signup disclosure or retention incident

- **Required class:** public-site signup disclosure or retention incident.
- **Threats and risks:** `THR-040`, `THR-046`, `THR-028`, `THR-029`, `THR-039`.
- **Assets and boundaries:** `AST-003`, `AST-004`, public adapter, bounded private processor, minimal logs, policy version, email, and unsubscribe or deletion state across `TZ-P2` and `TZ-S8`.
- **Synthetic setup:** the public signup adapter begins logging full request bodies, the private processor retains records beyond the stated period, and a preview exposes a small synthetic contact list.
- **Abuse path:** overcollection, purpose expansion, missing owner, public logging, preview crossover, absent unsubscribe or deletion, or false claim that deleting the sheet removed all copies.
- **Expected controls:** `CTL-TM-018`, `CTL-TM-026`, `CTL-TM-027`, `CTL-KSE-025` through `CTL-KSE-031`, `CTL-RID-021` through `CTL-RID-045`, publication and confidentiality policy.
- **Expected person-visible outcome:** accessible notice, unsubscribe and deletion path, correction of retention claims, and safe public incident summary when material.
- **Containment and restoration:** stop collection if safe handling is uncertain, restrict logs and previews, rotate exposed credentials, inventory copies, execute bounded deletion, and establish accountable lifecycle ownership.
- **Future evidence required:** processor inventory, retention automation, unsubscribe and deletion tests, log minimization, preview isolation, incident route, and independent privacy review.
- **Residual harm:** email addresses or participation facts may remain in public caches, notifications, or uncontrolled exports.
- **Owner roles:** website, signup, privacy, communications, security, records-governance, and incident owners.
- **Holdpoint and trigger:** current bounded flow only; revalidate for every signup, processor, notice, retention, logging, preview, or campaign change.

## `SYN-015` — Research actor attempting scope expansion

- **Required class:** research actor attempting scope expansion.
- **Threats and risks:** `THR-036`, `THR-037`, `THR-038`, `THR-042`, `THR-045`, `THR-014`.
- **Assets and boundaries:** research protocol, enrollment, House of Keys grants, person-level extract, isolated dataset, aggregate output, receipts, withdrawal, and publication review across `TZ-S1`, `TZ-S6`, and `TZ-S8`.
- **Synthetic setup:** a synthetic study approved for one measure and purpose asks to add variables, link identities, retain data longer, contact participants directly, and publish a small subgroup result.
- **Abuse path:** “scientific value” or public-good status is treated as authority, personal-core permission is reused, analytics becomes a shadow permission system, or withdrawal is ignored after export.
- **Expected controls:** `CTL-TM-008`, `CTL-TM-009`, `CTL-TM-022` through `CTL-TM-025`, `CTL-HK-004` through `CTL-HK-010`, `CTL-HK-027`, `CTL-RID-040` through `CTL-RID-045`.
- **Expected person-visible outcome:** deny or new separately reviewed request, direct explanation, no loss of product rights or rewards for refusal, withdrawal status, and accessible challenge path.
- **Containment and restoration:** block scope expansion, suspend affected datasets or outputs, review prior access, notify participants when required, correct receipts, apply withdrawal and deletion limits, and record external residual copies.
- **Future evidence required:** study governance, protocol versioning, dataset isolation, output disclosure review, small-cell and re-identification review, withdrawal tests, recipient contracts, and independent ethics, privacy, legal, and research review.
- **Residual harm:** released research copies and publications may not be fully retractable; aggregate or linkage outputs may re-identify people.
- **Owner roles:** research governance, House of Keys, privacy, security, legal, data, publication, and participant-support owners.
- **Holdpoint and trigger:** institutional and specialist holdpoint; no research runtime authorized; rerun for every protocol, dataset, recipient, output, retention, or governance change.

## Coverage result

The fifteen required Sprint 5 scenario classes are represented by stable synthetic abuse cases. Each case has a paired `TTX-*` design-tabletop record.

The register provides scenario coverage and expected response architecture only. Implementation, independent review, multi-party participation, operational telemetry, actual response time, provider behavior, and control effectiveness remain unproven.
