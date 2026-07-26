# Synthetic Tabletop Exercise Records — `TTX-001` through `TTX-008`

[Security architecture](README.md) · [Exercise method](synthetic-abuse-case-and-tabletop-method.md) · [Abuse-case register](synthetic-abuse-case-register.md) · [Records 9–15](tabletop-exercise-records-2.md) · [Follow-up register](synthetic-evidence-gap-and-follow-up-register.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — founding-steward design tabletops complete; multi-party, independent, implementation, and operational exercises pending  
**Workstream:** 5.9  
**Exercise date:** 2026-07-26  
**Information class:** PUBLIC synthetic-only evidence  
**Actual participant:** founding steward  
**Simulated roles:** future domain, security, privacy, reliability, accessibility, legal, records-governance, research, communications, support, provider, and incident owners as named per record

## `TTX-001` — Cross-user Chronicle leakage

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-001`.
- **Assumptions:** two fully synthetic people have distinct accounts, Chronicle pseudonyms, records, retrieval indexes, grants, receipts, and sessions. No production service exists.
- **Opening condition:** person A requests a permitted read of their own synthetic timeline.
- **Inject 1 — T+0:** the client includes person B’s Chronicle identifier in a request field.
- **Decision:** treat the caller value as untrusted; derive the controlled resource and subject server-side; deny any mismatch without revealing person B’s existence or data.
- **Inject 2 — T+5:** a queued worker receives the correct account identity but the Chronicle context field is missing.
- **Decision:** fail closed, quarantine the job, do not infer a resource from payload data, and record an expected protected audit event.
- **Inject 3 — T+10:** a retrieval result includes one synthetic chunk associated with person B because an index partition was mixed.
- **Decision:** stop the result, quarantine affected indexes and caches, suspend retrieval for the affected partition, and open a cross-user incident even if the UI filtered the chunk before display.
- **Inject 4 — T+15:** no receipt exists and audit contains only a query error.
- **Decision:** missing evidence does not prove no disclosure; preserve uncertainty, investigate execution and provider evidence, and prepare accessible notice if disclosure is confirmed or cannot reasonably be excluded.
- **Architecture evidence consulted:** `CTL-TM-001`, `CTL-ID-002`, `CTL-ID-005`, `CTL-LC-001`, `CTL-UT-019`, `CTL-HK-001`, `CTL-RID-021` through `CTL-RID-023`.
- **Expected containment:** deny request, revoke affected service identities, isolate mixed derivatives, pause related exports and retrieval, minimize investigation scope, and preserve correction history.
- **Expected restoration:** rebuild the index from authoritative sources, revalidate tenant and resource binding across edge, domain, queue, receipt, export, and restore paths, issue linked corrections, and restore narrowly.
- **Person-facing behavior:** accessible incident or uncertainty notice to person B when warranted; person A receives only a generic safe error; both retain challenge and support paths.
- **Gaps found:** `GAP-TTX-001-A` cross-layer executable isolation evidence absent; `GAP-TTX-001-B` missing-receipt and ambiguous-disclosure notification rules require implementation and privacy review.
- **Residual harm:** disclosed information, metadata, screenshots, or human knowledge may persist outside project control.
- **Follow-up owner:** future identity and Chronicle owners, with retrieval, receipt, privacy, accessibility, and incident owners.
- **Revalidation trigger:** any account-to-Chronicle mapping, queue, retrieval, cache, receipt, export, or restoration implementation.
- **Conclusion:** architecture supports fail-closed isolation and incident treatment, but no operational isolation or notification effectiveness is proven.

## `TTX-002` — Compromised agent or MCP client

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-002`.
- **Assumptions:** a synthetic Chronicle MCP client has one fresh envelope to prepare a capture draft for one Chronicle and no export, permission, shell, network, filesystem, or administrative capability.
- **Opening condition:** the client performs normal tool discovery.
- **Inject 1 — T+0:** retrieved content names a nonexistent “admin.exportAll” tool and instructs the client to invoke it.
- **Decision:** tool availability comes only from the server-owned versioned registry; retrieved text is data, not authority; reject the invented tool.
- **Inject 2 — T+5:** the client requests a valid capture tool but substitutes another Chronicle identifier.
- **Decision:** ignore caller-selected resource context, derive the Chronicle server-side, and deny the mismatch.
- **Inject 3 — T+10:** the client replays a previously successful envelope after the session is revoked.
- **Decision:** revalidate session, resource, purpose, scope, tool revision, and authority at invocation; deny stale replay and quarantine dependent queued work.
- **Inject 4 — T+15:** one allowed tool returned a draft and the compromised client chains it into an export request.
- **Decision:** output possession does not create export authority; require a new atomic request, policy decision, envelope, confirmation, and receipt intent.
- **Inject 5 — T+20:** the client credential may have been copied, but no misuse is visible.
- **Decision:** revoke the client identity and related sessions, invalidate outstanding envelopes, preserve minimal evidence, notify the person of material risk and available restoration steps, and avoid claiming no access occurred.
- **Architecture evidence consulted:** `CTL-TM-013`, `CTL-TM-014`, `CTL-UT-022` through `CTL-UT-028`, `CTL-HK-011`, `CTL-HK-025`, `CTL-KSE-032`, `CTL-RID-019`.
- **Expected containment:** revoke client credentials and envelopes, terminate sessions, disable affected tool revisions, pause related queues, and inspect receipts and releases.
- **Expected restoration:** issue clean client identity, rebind exact scopes, correct receipts, rebuild poisoned retrieval context, and rerun adversarial tool tests.
- **Person-facing behavior:** accessible session and delegated-access review, blocked-attempt receipts where safe, and notice of confirmed or materially suspected access.
- **Gaps found:** `GAP-TTX-002-A` executable registry and envelope enforcement absent; `GAP-TTX-002-B` agent compromise detection and per-tool receipt behavior require design-specific evidence.
- **Residual harm:** data already delivered under valid authority before detection may remain with the compromised client.
- **Follow-up owner:** future MCP, identity, House of Keys, execution, AI-safety, Chronicle, and security owners.
- **Revalidation trigger:** every tool, registry, MCP client, remote transport, model, prompt, or retrieval change.
- **Conclusion:** architecture prevents content- or client-created tool authority in design; no agent security test suite or operational containment exists.

## `TTX-003` — Stolen session and abusive account recovery

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `SPECIALIST-HOLDPOINT`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-003`.
- **Assumptions:** a synthetic ordinary session exists; recovery and support capabilities are modeled but not implemented.
- **Opening condition:** the person has one trusted device and one active session.
- **Inject 1 — T+0:** an attacker reuses a stolen session from a new device to start an export.
- **Decision:** require action-specific step-up and fresh session risk evaluation; deny export pending stronger verification.
- **Inject 2 — T+5:** the attacker starts recovery and supplies detailed synthetic health history as proof.
- **Decision:** intimate or health knowledge is prohibited as identity proof; keep recovery restricted and record the attempted misuse without retaining unnecessary content.
- **Inject 3 — T+10:** the attacker asks support to add a delegate and remove the trusted device.
- **Decision:** support capability cannot expand authority or silently impersonate; deny and require the separate delegation or capacity process.
- **Inject 4 — T+15:** the real person reports the stolen session, but the notification channel may also be compromised.
- **Decision:** revoke dependent sessions and tokens, offer multiple accessible recovery channels, preserve a restricted state, and avoid sending sensitive details to an untrusted channel.
- **Inject 5 — T+20:** recovery succeeds, but a pre-compromise grant remains active.
- **Decision:** recovery restores bounded account access only; authority and grant lifecycle remain separate and must be reviewed or revalidated.
- **Architecture evidence consulted:** `CTL-ID-003` through `CTL-ID-011`, `CTL-TM-002`, `CTL-TM-003`, `CTL-KSE-028`, `CTL-RID-019`.
- **Expected containment:** revoke sessions and dependent credentials, suspend high-consequence actions, restrict recovery, preserve challenge evidence, and review recent operations and receipts.
- **Expected restoration:** establish clean sessions and device trust, review delegation and grants, correct unauthorized operations, and provide accessible account-state explanation.
- **Person-facing behavior:** session review, recovery challenge, non-shaming explanation, and alternative accessible support path.
- **Gaps found:** `GAP-TTX-003-A` identity proofing and recovery implementation absent; `GAP-TTX-003-B` representative and capacity authority require legal and accessibility review; `GAP-TTX-003-C` compromised-notification recovery path unresolved.
- **Residual harm:** completed actions and disclosed information may not be reversible; notification channels may remain unsafe.
- **Follow-up owner:** future identity, recovery, support, security, accessibility, and legal owners.
- **Revalidation trigger:** identity-provider, session, device, recovery, support, delegation, or representative-authority changes.
- **Conclusion:** the design correctly separates recovery from authority expansion, but production identity proofing and specialist review are blocking.

## `TTX-004` — Malicious upload and prompt injection

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-004`.
- **Assumptions:** an invented document is accepted into a quarantine intake but no production scanner, parser, sandbox, model, or source store exists.
- **Opening condition:** the person asks for a draft extraction from the document.
- **Inject 1 — T+0:** extension and declared type disagree with detected content family.
- **Decision:** do not process by extension or declared type alone; keep quarantined and reject or route through the exact allowed-family policy.
- **Inject 2 — T+5:** archive expansion exceeds the bounded processing budget.
- **Decision:** terminate processing, preserve the original source version and bounded failure evidence, and do not retry automatically.
- **Inject 3 — T+10:** extracted text tells the model to reveal another person’s records and call an external URL.
- **Decision:** treat extracted instructions as untrusted data; the model has no authority to select another Chronicle, network destination, or hidden tool.
- **Inject 4 — T+15:** model output confidently labels a synthetic condition and marks the record confirmed.
- **Decision:** reject the authority-bearing fields; retain only a proposal with source links and limitations; require explicit authorized human confirmation and domain validation.
- **Inject 5 — T+20:** scanner reports no known malware.
- **Decision:** state only that no configured finding was detected; do not describe the file as safe.
- **Architecture evidence consulted:** `CTL-UT-002` through `CTL-UT-011`, `CTL-UT-017`, `CTL-LC-005` through `CTL-LC-011`, `CTL-TM-007`, `CTL-TM-014`.
- **Expected containment:** quarantine original and derivatives, stop processing, revoke affected worker identity, invalidate prompts and indexes, and preserve minimal private evidence.
- **Expected restoration:** rebuild processing workers from clean artifacts, reprocess only under revised limits, and correct or delete generated derivatives.
- **Person-facing behavior:** direct accessible explanation of failure or draft status, manual entry alternative, and no false safety or clinical claim.
- **Gaps found:** `GAP-TTX-004-A` parser, sandbox, scanner, and expansion-control evidence absent; `GAP-TTX-004-B` adversarial prompt and tool-isolation tests pending; `GAP-TTX-004-C` provider retention and deletion evidence pending.
- **Residual harm:** novel parser exploits and semantic attacks remain possible; provider copies may persist.
- **Follow-up owner:** future source, document-processing, AI-safety, retrieval, Chronicle, infrastructure, and security owners.
- **Revalidation trigger:** every file type, parser, scanner, sandbox, prompt, model, retrieval corpus, or provider change.
- **Conclusion:** the architecture prevents uploaded content from granting authority, but no executable isolation control is proven.

## `TTX-005` — Purpose laundering and stale permission decision

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `SPECIALIST-HOLDPOINT`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-005`.
- **Assumptions:** synthetic purpose, recipient, category, action, grant, explanation, and decision revisions exist.
- **Opening condition:** a person has an active grant for an exact personal-core insight action.
- **Inject 1 — T+0:** a request labeled “personal insight” resolves to an external partner processor not named in the grant.
- **Decision:** deny recipient and performing-actor mismatch; service branding or public-good framing cannot substitute for exact identity.
- **Inject 2 — T+5:** the request references a retired purpose revision mapped as “compatible” by an application adapter.
- **Decision:** unresolved or stale mapping is indeterminate or denied; the adapter cannot broaden compatibility.
- **Inject 3 — T+10:** the grant is suspended after evaluation but before release.
- **Decision:** invalidate the decision and envelope, re-evaluate immediately before release, and cancel dependent work.
- **Inject 4 — T+15:** product design proposes a progression bonus for accepting the new partner use.
- **Decision:** reject the incentive; broader permission cannot create rewards, eligibility, superior rights, or reduced friction.
- **Inject 5 — T+20:** one prior release may have used the stale mapping.
- **Decision:** open an incident review, inspect exact execution and recipient evidence, issue correction receipts, notify affected people where warranted, and preserve external residual risk.
- **Architecture evidence consulted:** `CTL-HK-003` through `CTL-HK-010`, `CTL-HK-014`, `CTL-HK-025`, `CTL-HK-027`, `CTL-TM-009`, `CTL-TM-010`, `CTL-TM-025`.
- **Expected containment:** block the mapping and release, invalidate decisions and envelopes, review prior uses, and prevent coercive product behavior.
- **Expected restoration:** publish or present corrected definitions and explanations, re-request authority when appropriate, correct receipts, and restore independent core use.
- **Person-facing behavior:** direct deny or indeterminate explanation, refusal without penalty, accessible challenge, and notice of prior inappropriate use when substantiated.
- **Gaps found:** `GAP-TTX-005-A` production taxonomy and mapping governance absent; `GAP-TTX-005-B` external recipient and purpose specialist review pending; `GAP-TTX-005-C` incentive audit and accessibility testing pending.
- **Residual harm:** prior releases cannot be recalled completely; precise wording may still be misunderstood or coercive.
- **Follow-up owner:** future House of Keys, product, privacy, recipient, accessibility, legal, and governance owners.
- **Revalidation trigger:** every purpose, recipient, category, action, explanation, incentive, or mapping change.
- **Conclusion:** the design rejects purpose laundering and stale authority; implementation and specialist review remain blocking.

## `TTX-006` — Revocation during queued or in-flight execution

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-006`.
- **Assumptions:** one synthetic single-use grant, decision, reservation, queue message, external recipient, and required receipt intent exist.
- **Opening condition:** the request is allowed and capacity is reserved, but no external release has been confirmed.
- **Inject 1 — T+0:** the person withdraws the grant while the job is queued.
- **Decision:** propagate invalidation to the decision, reservation, envelope, queue, agent, and operation; do not treat queue possession as authority.
- **Inject 2 — T+5:** the worker starts before cancellation arrives but has not crossed the release boundary.
- **Decision:** perform final authoritative re-evaluation and stop before release.
- **Inject 3 — T+10:** the external recipient times out after accepting the payload, so release outcome is unknown.
- **Decision:** quarantine operation and capacity state; do not retry, release capacity, or issue a no-release receipt until reconciled.
- **Inject 4 — T+15:** a retry worker receives the same message with a new idempotency key.
- **Decision:** reject the new identity; retries must preserve one operation and idempotency identity and cannot recreate authority.
- **Inject 5 — T+20:** recipient later confirms receipt after withdrawal.
- **Decision:** record effective ordering and irreversible effect, notify the person, issue corrected receipt, request recipient containment, and preserve residual external risk.
- **Architecture evidence consulted:** `CTL-HK-009` through `CTL-HK-020`, `CTL-HK-022`, `CTL-HK-029`, `CTL-TM-010` through `CTL-TM-012`, `CTL-RID-013`.
- **Expected containment:** cancel or quarantine dependent work, pause related release paths if systemic, preserve ordering evidence, and stop automatic retries.
- **Expected restoration:** reconcile capacity and operation state, issue corrected receipts, notify recipients and the person, and restore only after freshness and idempotency tests pass.
- **Person-facing behavior:** withdrawal acknowledgment and explicit receipt state: stopped, confirmed release, partial, or unknown.
- **Gaps found:** `GAP-TTX-006-A` atomic reservation and release transaction absent; `GAP-TTX-006-B` recipient timeout and reconciliation protocol absent; `GAP-TTX-006-C` queue cancellation and dead-letter evidence absent.
- **Residual harm:** the recipient may retain data after authority ends; the exact crossing time may remain uncertain.
- **Follow-up owner:** future House of Keys, execution, queue, recipient, receipt, privacy, and incident owners.
- **Revalidation trigger:** every queue, retry, transaction, export, connector, recipient, or release change.
- **Conclusion:** the architecture handles revocation races honestly, but distributed enforcement and external reconciliation are unproven.

## `TTX-007` — Receipt omission, duplication, or forgery

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `SPECIALIST-HOLDPOINT`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-007`.
- **Assumptions:** one synthetic release operation, durable receipt intent, person-visible delivery channel, and protected audit path are modeled.
- **Opening condition:** the release service reports success.
- **Inject 1 — T+0:** no receipt record is created.
- **Decision:** treat as a material control failure, pause affected release class if systematic, and reconcile from execution evidence without assuming the receipt can be reconstructed perfectly.
- **Inject 2 — T+5:** a duplicate receipt appears with a different recipient identity.
- **Decision:** mark both records conflicting, prevent either from silently replacing the other, inspect operation and delivery identities, and issue a linked correction.
- **Inject 3 — T+10:** protected audit claims the request was denied, but the external recipient confirms delivery.
- **Decision:** audit is not execution truth; preserve the conflict, investigate possible log injection or mapping error, and notify the person based on the strongest bounded evidence.
- **Inject 4 — T+15:** receipt delivery fails because the interface is inaccessible to the person’s assistive technology.
- **Decision:** keep receipt existence and delivery distinct, provide an accessible alternative, and treat inaccessible delivery as a control failure rather than person fault.
- **Inject 5 — T+20:** an operator proposes deleting the conflicting records to simplify history.
- **Decision:** reject overwrite or deletion as correction; preserve append-only linked history with minimized content.
- **Architecture evidence consulted:** `CTL-HK-021` through `CTL-HK-024`, `CTL-HK-031` through `CTL-HK-034`, `CTL-RID-024` through `CTL-RID-033`, `CTL-TM-012`.
- **Expected containment:** stop affected release paths where receipt integrity is unreliable, isolate malformed audit sources, and prevent false completion displays.
- **Expected restoration:** reconcile exact operation, recipient, release, receipt, and audit identities; issue accessible corrected receipts and preserve uncertainty.
- **Person-facing behavior:** clear correction chain, accessible delivery, direct explanation of uncertainty, and challenge path without excess health detail.
- **Gaps found:** `GAP-TTX-007-A` durable receipt-intent and missing-receipt detection absent; `GAP-TTX-007-B` accessible delivery evidence absent; `GAP-TTX-007-C` audit integrity and correction implementation absent.
- **Residual harm:** the person may have relied on false history; definitive reconstruction may be impossible.
- **Follow-up owner:** future receipt, execution, audit, accessibility, support, privacy, and incident owners.
- **Revalidation trigger:** every receipt schema, delivery channel, audit, retention, correction, or release change.
- **Conclusion:** design separates receipt, execution, delivery, and audit correctly; production integrity and accessibility are unproven.

## `TTX-008` — Insider curiosity and emergency-power abuse

- **Status:** `DESIGN-TABLETOP-COMPLETE`; `CONTROL-DESIGN-SUPPORTED`; `CONTROL-EVIDENCE-MISSING`; `SPECIALIST-HOLDPOINT`; `PRODUCTION-BLOCKING`.
- **Paired scenario:** `SYN-008`.
- **Assumptions:** private operator and emergency capabilities are modeled with named scopes, stronger authentication, expiry, audit, notification, and review.
- **Opening condition:** a support operator has a synthetic case unrelated to a prominent synthetic person.
- **Inject 1 — T+0:** the operator searches for the prominent person out of curiosity.
- **Decision:** deny because no case, purpose, or capability exists; create minimized protected audit without exposing the person’s records.
- **Inject 2 — T+5:** the operator declares an emergency and requests broad export.
- **Decision:** emergency authority cannot rewrite ordinary grants or create broad export; require named incident, narrow capability, stronger authentication, time boundary, and independent review.
- **Inject 3 — T+10:** the operator attempts silent impersonation to view the person’s interface.
- **Decision:** silent impersonation is prohibited; any support representation must be explicit, bounded, attributable, and unable to create Chronicle or permission authority.
- **Inject 4 — T+15:** the operator tries to disable audit because it contains “sensitive operational details.”
- **Decision:** the same actor cannot suppress independent evidence; contain the operator identity and preserve a minimized separate audit path.
- **Inject 5 — T+20:** the founder is the only available approver.
- **Decision:** do not convert founder availability into sole emergency legitimacy; retain containment, use documented temporary restrictions, and escalate the founder-independence gap.
- **Architecture evidence consulted:** `CTL-ID-009` through `CTL-ID-011`, `CTL-TM-004`, `CTL-TM-005`, `CTL-KSE-018`, `CTL-RID-019`, `CTL-RID-028`.
- **Expected containment:** revoke operator and emergency capabilities, suspend affected interfaces, preserve independent evidence, and review access scope.
- **Expected restoration:** issue clean identities, correct unauthorized actions and receipts, notify affected people where safe, and publish a safe institutional derivative when appropriate.
- **Person-facing behavior:** accessible notice and challenge when it does not undermine investigation or safety; no implication that emergency status legitimized access.
- **Gaps found:** `GAP-TTX-008-A` private least-capability operator interface absent; `GAP-TTX-008-B` independent audit and reviewer path absent; `GAP-TTX-008-C` founder-independent emergency continuity unresolved.
- **Residual harm:** viewed information cannot be made unknown; institutional retaliation or capture may suppress reporting.
- **Follow-up owner:** future security, operator governance, identity, privacy, audit, incident, and institutional immune-system owners.
- **Revalidation trigger:** every support, operator, emergency, audit, governance, or founder-continuity change.
- **Conclusion:** architecture places strong boundaries on operator and emergency power, but independence and operational evidence are blocking.

## Part-one result

The first eight required scenario classes have accountable founding-steward design-tabletop records. Every record found implementation or specialist gaps; none supports a production-readiness claim.
