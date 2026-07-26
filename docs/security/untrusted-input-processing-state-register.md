# Untrusted Input and External Execution Processing-State Register

[Security architecture](README.md) · [Isolation model](untrusted-input-and-agent-isolation-model.md) · [Control register](untrusted-input-control-register.md) · [Data-flow register](data-flow-boundary-register.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent specialist review pending  
**Workstream:** 5.6  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** vocabulary and transition requirements only; no runtime pipeline, state store, provider, scanner, parser, connector, model, MCP server, build service, or release mechanism is authorized or represented as deployed

## Purpose

This register prevents ambiguous words such as “clean,” “trusted,” “validated,” “processed,” “connected,” “grounded,” “safe,” or “built” from collapsing materially different claims.

Each state describes one bounded fact. No state grants identity, Chronicle truth, House of Keys permission, recipient authority, tool authority, or production approval unless a separate authoritative contract does so explicitly.

## Identifier families

- Intake and artifact states use `UTS-INTAKE-*`.
- Content-inspection states use `UTS-CONTENT-*`.
- Connector states use `UTS-CONNECTOR-*`.
- AI and retrieval states use `UTS-AI-*`.
- MCP and tool states use `UTS-TOOL-*`.
- Supply-chain and build states use `UTS-BUILD-*`.
- Trust claims use `UTC-*`.
- Terminal dispositions use `UTD-*`.

An identifier is a design reference only.

## Intake and artifact states

### `UTS-INTAKE-OFFERED`

Content, a payload, or a reference was offered to an intake boundary.

It has not yet established valid transport, scope, resource context, format, size, or processing authority.

### `UTS-INTAKE-CONTEXT-RESOLVED`

Authenticated actor, environment, purpose, and server-derived resource context were resolved.

This does not prove the supplied content belongs to the resource or subject.

### `UTS-INTAKE-TRANSPORT-ACCEPTED`

The transport and immediate request controls accepted the transfer attempt.

This does not accept the content as safe, structurally valid, or authoritative.

### `UTS-INTAKE-METADATA-SCREENED`

Declared and detected type, size, name, path, count, and basic structure stayed within the selected intake contract.

This does not prove the payload is non-malicious or semantically correct.

### `UTS-INTAKE-QUARANTINED`

The material is isolated from rendering, canonical services, retrieval, model context, and general users pending further processing or review.

### `UTS-INTAKE-REJECTED`

The intake contract rejected the material before domain acceptance.

A rejection record identifies the bounded reason without retaining unnecessary raw content.

### `UTS-INTAKE-EXPIRED`

Quarantined or temporary material reached its retention boundary before acceptance.

Expiry requires deletion or an explicit reviewed hold; it is not silent abandonment.

## Content inspection and transformation states

### `UTS-CONTENT-DECODE-PENDING`

The artifact is awaiting isolated decoding, expansion, or parser selection.

### `UTS-CONTENT-DECODED-ISOLATED`

An isolated processor produced bounded representations or child objects.

Parser success does not establish safety, accuracy, or authority.

### `UTS-CONTENT-DECODE-PARTIAL`

Some content decoded while other content failed, was unsupported, exceeded limits, or remained encrypted or ambiguous.

Partial output cannot be represented as complete.

### `UTS-CONTENT-SCAN-PASSED`

The selected scanner or behavioral control did not identify a prohibited condition under the recorded rule and version.

This means neither “safe” nor “trusted.”

### `UTS-CONTENT-SCAN-FAILED`

A prohibited condition or suspicious behavior was identified.

The content remains quarantined or is rejected, and downstream work is invalidated.

### `UTS-CONTENT-SCAN-UNKNOWN`

Scanning was unavailable, unsupported, incomplete, stale, or conflicting.

Unknown fails closed for privileged use.

### `UTS-CONTENT-STRUCTURE-VALID`

The selected structural contract accepted the decoded representation.

This does not establish semantic correctness, subject identity, permission, or Chronicle truth.

### `UTS-CONTENT-STRUCTURE-INVALID`

The representation failed required schema, bound, discriminator, reference, version, or authority-field rules.

### `UTS-CONTENT-PROPOSAL-CREATED`

A parser, deterministic transformer, model, connector, or person created a provenance-bearing proposal or derived representation.

It is not a confirmed Chronicle record.

### `UTS-CONTENT-SOURCE-ACCEPTED`

The source domain accepted a bounded versioned artifact or payload as source truth under its custody and lifecycle contract.

Source acceptance does not confirm the source claim as Chronicle truth.

### `UTS-CONTENT-DOMAIN-REVIEW-REQUIRED`

The result requires explicit human, policy, specialist, or deterministic-domain review before any further trust transition.

### `UTS-CONTENT-DOMAIN-ACCEPTED`

A named authoritative domain accepted one exact result for one bounded purpose.

The accepting record identifies the authoritative contract and does not broaden other uses.

### `UTS-CONTENT-INVALIDATED`

A later source, method, scanner, correction, deletion, policy, or compatibility event made the prior processing result non-applicable.

Dependents follow the 5.4 lifecycle and 5.5 invalidation rules.

## Connector states

### `UTS-CONNECTOR-PROPOSED`

A connector setup exists as a proposal with provider, scopes, purpose, and source classes.

No provider access or future synchronization authority exists yet.

### `UTS-CONNECTOR-AUTHORIZATION-PENDING`

Provider authorization is incomplete, unresolved, expired, or awaiting valid person action.

### `UTS-CONNECTOR-AUTHORIZED`

The connector holds a current provider authorization for the recorded scopes and account relationship.

This does not confirm Chronicle ownership, subject identity, payload truth, or broad downstream use.

### `UTS-CONNECTOR-SYNC-READY`

The connector instance, provider account, purpose, cursor, mapping, and resource context are applicable for a bounded synchronization attempt.

### `UTS-CONNECTOR-SYNCING`

One synchronization operation is in progress under one operation and idempotency identity.

### `UTS-CONNECTOR-SYNC-PARTIAL`

Some pages, objects, mappings, or lifecycle events completed while others did not.

The gap remains explicit and future retry preserves the original operation semantics.

### `UTS-CONNECTOR-SYNC-COMPLETE`

The connector completed the declared bounded synchronization attempt according to the provider evidence available.

It does not prove provider completeness or Chronicle confirmation.

### `UTS-CONNECTOR-CURSOR-CONFLICT`

Cursor, checkpoint, ordering, provider account, or replay evidence conflicts.

Synchronization stops and enters reconciliation.

### `UTS-CONNECTOR-SUSPENDED`

Future connector activity is paused under a bounded containment or review rule.

### `UTS-CONNECTOR-REVOKED`

Future synchronization authority ended.

Credentials, cursors, queues, and retries must no longer authorize new work.

### `UTS-CONNECTOR-RECONCILING`

The system is resolving duplicates, gaps, cursor conflicts, provider-account mismatch, out-of-order corrections, or unknown external outcomes.

### `UTS-CONNECTOR-CLOSED`

The connector relationship is closed after revocation, expiry, replacement, or person-directed removal.

Historical sources and receipts follow separate lifecycle rules.

## AI and retrieval states

### `UTS-AI-TASK-PROPOSED`

A bounded AI, extraction, explanation, or retrieval task was proposed.

### `UTS-AI-CONTEXT-RESOLVED`

The exact actor, resource, purpose, corpus, information class, provider-egress rule, and output contract were resolved outside the model.

### `UTS-AI-CONTEXT-MINIMIZED`

The provider request contains only the approved minimum fields and source references for the task.

This does not prove provider-side deletion or absence of human access.

### `UTS-AI-PROVIDER-PENDING`

A model or processor call is pending under the selected timeout, cancellation, and fallback contract.

### `UTS-AI-OUTPUT-RECEIVED`

External output was received.

The output remains untrusted.

### `UTS-AI-OUTPUT-SCHEMA-VALID`

The output passed the declared structural schema and bounds.

This does not establish factual accuracy, source support, permission, or clinical correctness.

### `UTS-AI-OUTPUT-REJECTED`

The output contained unsupported fields, prohibited claims, invalid references, undeclared tools, excessive content, or other contract failures.

### `UTS-AI-PROMPT-INJECTION-SUSPECTED`

Input, retrieval, or output contains instructions or patterns that may be attempting to influence policy, tools, authority, or hidden information.

Tools and privileged actions remain blocked or require a non-agent fallback.

### `UTS-AI-PROPOSAL-READY`

A schema-valid, provenance-bearing proposal is ready for human or deterministic-domain review.

### `UTS-AI-HUMAN-CONFIRMATION-REQUIRED`

The proposal cannot proceed without the player or another valid human authority reviewing the material fields.

### `UTS-AI-DOMAIN-VALIDATION-REQUIRED`

The proposal requires deterministic contract validation or domain-specific checks before acceptance.

### `UTS-AI-ACCEPTED-AS-DERIVATIVE`

A bounded domain accepted the output as a disposable derivative, explanation, draft, or retrieval result.

It is not canonical Chronicle truth unless the separate Chronicle confirmation contract also completes.

### `UTS-AI-INVALIDATED`

Source correction, deletion, model withdrawal, prompt-policy change, corpus change, or validation finding made the output non-applicable.

### `UTS-AI-FALLBACK-ACTIVE`

The flow uses a manual, deterministic, or non-AI path because the model is unavailable, unsafe, unsupported, refused, or unnecessary.

## MCP and tool states

### `UTS-TOOL-DISCOVERED`

A client received one server-owned tool definition and version.

Discovery does not grant permission to invoke it.

### `UTS-TOOL-REQUESTED`

A client or agent requested one tool invocation with explicit arguments.

### `UTS-TOOL-SCHEMA-VALID`

The request matches the selected tool schema and bounds.

It may still lack identity, permission, confirmation, freshness, or resource authority.

### `UTS-TOOL-AUTHORITY-PENDING`

The service is resolving authenticated context, House of Keys facts, step-up, confirmation, rate, and execution-envelope requirements.

### `UTS-TOOL-DENIED`

The named invocation is not authorized, structurally valid, applicable, or safe to execute.

### `UTS-TOOL-INDETERMINATE`

Material authority, identity, policy, resource, version, or condition facts are unresolved.

Indeterminate never becomes invocation authority.

### `UTS-TOOL-ENVELOPE-ISSUED`

One fresh, non-transferable 5.5 execution envelope exists for one exact invocation and operation identity.

### `UTS-TOOL-EXECUTING`

The named domain operation is executing within its time, capability, rate, and resource budget.

### `UTS-TOOL-OUTPUT-VALIDATING`

The result is being classified and checked before return to the client or model.

### `UTS-TOOL-COMPLETED`

The tool completed the named operation under the recorded execution state.

Completion does not prove recipient compliance, external deletion, or receipt delivery.

### `UTS-TOOL-PARTIAL`

The operation crossed only some declared boundaries or produced incomplete results.

### `UTS-TOOL-STOPPED`

The operation stopped before completion due to revocation, containment, cancellation, expiry, or control failure.

### `UTS-TOOL-OUTCOME-UNKNOWN`

The system cannot establish whether an irreversible external effect occurred.

Automatic retry and capacity release remain blocked pending reconciliation.

### `UTS-TOOL-COMPROMISED`

The client, agent, tool process, derived credential, or invocation channel is suspected or known compromised.

Sessions, envelopes, queues, and future invocation are contained.

## Supply-chain and build states

### `UTS-BUILD-INPUT-DECLARED`

Source revision, dependency manifests, lockfiles, actions, generated inputs, configuration, and intended environment are identified.

### `UTS-BUILD-DEPENDENCY-RESOLVED`

The selected registry and lock policy resolved exact or accepted dependency versions.

Resolution does not prove package safety.

### `UTS-BUILD-SOURCE-REVIEWED`

Applicable source, scripts, ownership, namespace, and change evidence received the required review level.

### `UTS-BUILD-ISOLATED`

The build executes with the approved token, network, cache, environment, secret, and filesystem capabilities.

### `UTS-BUILD-COMPLETED`

The build produced output and recorded its source and dependency inputs.

Completion does not authorize deployment.

### `UTS-BUILD-TESTS-PASSED`

The selected automated checks passed.

This does not prove supply-chain integrity, secret absence, production suitability, or equivalence to reviewed source.

### `UTS-BUILD-PROVENANCE-RECORDED`

The artifact records source revision, build identity, dependency state, environment, outputs, and available integrity or reproducibility evidence.

### `UTS-BUILD-ARTIFACT-REVIEWED`

A release or deployment boundary reviewed the artifact and its evidence for one named environment and release class.

### `UTS-BUILD-RELEASE-BLOCKED`

Dependency, provenance, secret, review, policy, cache, or artifact evidence is missing, conflicting, or prohibited.

### `UTS-BUILD-RELEASE-APPROVED`

The applicable release authority approved one artifact for one environment and purpose.

This is release authority, not data authority or Chronicle authority.

### `UTS-BUILD-REVOKED`

The artifact, dependency, action, cache, or release approval is no longer applicable due to compromise, correction, rollback, or policy change.

## Trust-claim vocabulary

These claims may be attached to an object or event only with exact evidence and scope.

### `UTC-ORIGIN-DECLARED`

The claimed origin is recorded but not independently verified.

### `UTC-ORIGIN-AUTHENTICATED`

The transport or provider authenticated a bounded source identity under the recorded method.

This is not person or Chronicle identity proof.

### `UTC-INTEGRITY-OBSERVED`

The object matched the recorded digest, signature, length, or transport-integrity evidence.

Integrity does not establish correctness or authorization.

### `UTC-STRUCTURE-CONFORMING`

The object conformed to the selected schema and semantic bounds.

### `UTC-SCANNER-NO-FINDING`

The selected scanner reported no prohibited finding under the recorded version.

### `UTC-PROVENANCE-LINKED`

The result links to its declared inputs, methods, actors, and versions.

### `UTC-SOURCE-ACCEPTED`

The source domain accepted the artifact as a bounded source version.

### `UTC-PROPOSAL-ONLY`

The object is explicitly non-authoritative and awaits review or confirmation.

### `UTC-DOMAIN-ACCEPTED`

One named domain accepted the result for one purpose under one contract revision.

### `UTC-PERMISSION-VERIFIED`

The House of Keys and enforcement boundaries verified authority for one exact request and time.

This claim cannot be produced by content, model output, or transport.

### `UTC-EXECUTION-VERIFIED`

The execution domain reconciled one operation outcome and its irreversible boundaries.

### `UTC-RECEIPT-RECORDED`

A canonical receipt record exists for the referenced event.

It does not prove delivery or downstream compliance.

### `UTC-REVIEW-PENDING`

The required human, security, privacy, accessibility, clinical, legal, or supply-chain review has not completed.

### `UTC-INVALIDATED`

A later event made the prior trust claim non-applicable.

## Terminal dispositions

### `UTD-REJECTED-DELETE`

Reject the material or result and delete temporary copies according to the bounded procedure.

### `UTD-QUARANTINE-REVIEW`

Retain only in quarantine for named review and expiry.

### `UTD-ACCEPT-SOURCE-ONLY`

Accept as source truth without Chronicle confirmation.

### `UTD-ACCEPT-PROPOSAL-ONLY`

Accept as a draft or derivative awaiting domain action.

### `UTD-ACCEPT-BOUNDED-DOMAIN`

Accept for one named domain purpose with no implied cross-domain authority.

### `UTD-BLOCK-AND-CONTAIN`

Block further use, revoke derived authority, and begin containment.

### `UTD-RECONCILE-UNKNOWN-OUTCOME`

Preserve evidence, block retry or capacity reuse, and reconcile whether an irreversible effect occurred.

### `UTD-EXPIRE-AND-DELETE`

Expire temporary material and complete its deletion procedure unless a reviewed hold applies.

### `UTD-RETAIN-UNDER-EXCEPTION`

Retain the minimum identified fields under an explicit authority, policy, owner, review time, and appeal or challenge boundary.

## Transition invariants

A compliant future system preserves these invariants:

1. No intake state bypasses server-derived resource context.
2. Quarantined content cannot become model context, retrieval content, a rendered preview, or a canonical source without an explicit transition.
3. A scan or schema result never creates domain authority.
4. Source acceptance and Chronicle confirmation remain separate.
5. Connector authorization and synchronization completion remain separate from Chronicle truth.
6. Model output reception and schema validity remain separate from factual acceptance.
7. Tool discovery, schema validity, policy allowance, execution, external effect, and receipt remain separate.
8. Build completion, tests, provenance, review, release approval, and deployment remain separate.
9. Unknown or conflicting external outcomes block unsafe retry and bounded-capacity reuse.
10. Revocation, correction, deletion, provider change, model change, dependency compromise, or source invalidation propagates to dependents.
11. Terminal states preserve enough minimized evidence for correction, incident response, and truthful claims without retaining unnecessary source content.
12. No state or claim is upgraded merely because a vendor, model, scanner, or package labels it “trusted,” “safe,” or “verified.”

## Review and revalidation triggers

Review affected states and transitions when:

- a content family, parser, scanner, sandbox, or conversion tool changes;
- a connector provider, scope, mapping, cursor, or synchronization rule changes;
- a model, endpoint, prompt policy, output schema, provider contract, or region changes;
- a retrieval corpus, embedding, splitter, ranking, cache, or index lifecycle changes;
- an MCP tool, schema, risk class, transport, or invocation pattern changes;
- a dependency, package registry, action, runner, cache, build, artifact, or release process changes;
- a secret, environment, key, or provider boundary changes under 5.7;
- an incident, compromise, stale result, false receipt, or unknown external outcome occurs; or
- independent review identifies a missing or misleading state.

## Review result

The register makes untrusted processing transitions inspectable without implying that technical success equals trust or authority.

No state in this register is represented as implemented, deployed, operationally verified, or independently reviewed.
