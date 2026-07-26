# Untrusted Input, Connector, AI, MCP, and Supply-Chain Control Register

[Security architecture](README.md) · [Isolation model](untrusted-input-and-agent-isolation-model.md) · [Processing-state register](untrusted-input-processing-state-register.md) · [Threat control objectives](threat-control-objective-register.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent specialist review pending  
**Workstream:** 5.6  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** design register only; no control is implemented, deployed, operationally verified, or independently reviewed merely because it is recorded here

## Purpose

This register assigns stable `CTL-UT-*` identities to the untrusted-input, connector, AI, MCP, retrieval, sandbox, dependency, build, and evidence controls required by workstream 5.6.

Later implementation, test, tabletop, exception, incident, and completion records should reference these IDs where applicable.

## Control classes

- **Preventive** — blocks a prohibited state or transition.
- **Limiting** — reduces available authority, data, time, or resources.
- **Detective** — identifies misuse, compromise, drift, or failure.
- **Containment** — stops propagation or further use.
- **Corrective** — repairs an authoritative or operational record.
- **Recovery** — restores bounded safe capability.
- **Restorative** — restores person rights or addresses residual harm.
- **Informational** — makes status, uncertainty, or limitations inspectable.

## Intake and content controls

### `CTL-UT-001` — Server-derived intake context

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** cross-user and cross-subject isolation; `THR-015`, `THR-023`, `THR-027`
- **Requirement:** Chronicle, subject, controlled-resource, account, provider-account, recipient, and destination context derives from authenticated server-side authority rather than content or caller-supplied ownership claims
- **Evidence:** 5.2 identity model and 5.6 isolation model
- **Residual risk:** implementation and adversarial cross-resource evidence absent
- **Owner:** future identity, ingestion, connector, and domain owners
- **Revalidation:** first private upload, connector, model, MCP, or retrieval route

### `CTL-UT-002` — Declared content-family allowlist

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** parsers, processors, storage, and clients from arbitrary content
- **Requirement:** every intake declares a supported content family, detected signature, allowed version, intended processor, and explicit unsupported behavior
- **Evidence:** isolation model
- **Residual risk:** actual formats, libraries, and compatibility decisions unresolved
- **Owner:** future source, upload, and document-processing owners
- **Revalidation:** each new file or payload family

### `CTL-UT-003` — Size, count, nesting, and expansion limits

- **Status:** required and designed
- **Classes:** preventive, limiting, containment
- **Protects:** availability and cost boundaries; `THR-015`
- **Requirement:** enforce original size, expanded size, object count, page or frame count, recursion, archive nesting, compression ratio, output count, and processing-time limits
- **Evidence:** isolation model
- **Residual risk:** thresholds and platform-specific behavior unresolved
- **Owner:** future ingestion, infrastructure, and security owners
- **Revalidation:** parser, archive, media, or infrastructure change

### `CTL-UT-004` — Safe path and member normalization

- **Status:** required and designed
- **Classes:** preventive
- **Protects:** storage and sandbox boundaries
- **Requirement:** reject traversal, absolute paths, devices, reserved names, link escape, case collisions, duplicate ambiguity, and unsafe filename semantics before materialization
- **Evidence:** isolation model
- **Residual risk:** filesystem and object-store behavior unresolved
- **Owner:** future ingestion and infrastructure owners
- **Revalidation:** archive or filesystem implementation

### `CTL-UT-005` — Mandatory quarantine before privileged use

- **Status:** required and designed
- **Classes:** preventive, containment
- **Protects:** canonical services, clients, retrieval, AI, and operators
- **Requirement:** untrusted bytes and payloads remain non-public, non-rendered, non-indexed, non-model-visible, and non-canonical until applicable screening and explicit transition complete
- **Evidence:** isolation model and `TZ-S3` through `TZ-S5`
- **Residual risk:** storage, expiry, and reviewer workflow unresolved
- **Owner:** future source, upload, and security owners
- **Revalidation:** first private ingestion implementation

### `CTL-UT-006` — Ephemeral least-capability parser isolation

- **Status:** required and designed
- **Classes:** preventive, limiting, containment
- **Protects:** canonical data, network, credentials, and infrastructure; `THR-015`
- **Requirement:** parsing and conversion run ephemerally with read-only inputs, separated outputs, no reusable credentials, no canonical database access, bounded system calls, resource limits, and restricted network access
- **Evidence:** isolation model
- **Residual risk:** sandbox technology and escape testing unresolved
- **Owner:** future document-processing, infrastructure, and security owners
- **Revalidation:** processor or sandbox selection and every material upgrade

### `CTL-UT-007` — Scanner and exploit-evaluation evidence

- **Status:** required and designed
- **Classes:** detective, containment, informational
- **Protects:** upload and processing boundary
- **Requirement:** record scanner or rule version, coverage, time, result, uncertainty, unsupported state, and required rescan or review; scanner failure fails closed
- **Evidence:** isolation model
- **Residual risk:** detection gaps and false negatives remain inherent
- **Owner:** future security and source owners
- **Revalidation:** scanner, rule, parser, or threat-intelligence change

### `CTL-UT-008` — Safe decoding from `unknown`

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** domain contracts and authority boundaries
- **Requirement:** external structured input is decoded, bounded, version-checked, cross-reference-validated, and rejected or quarantined before typed domain use
- **Evidence:** Sprint 3 and Sprint 4 deferred decoder boundaries plus isolation model
- **Residual risk:** complete schemas and decoders absent
- **Owner:** future contract and ingestion owners
- **Revalidation:** interchange or API implementation

### `CTL-UT-009` — Unknown authority-bearing field rejection

- **Status:** required and designed
- **Classes:** preventive
- **Protects:** identity, permission, Chronicle, tool, and recipient authority
- **Requirement:** unknown or unsupported fields cannot create identity, ownership, subject scope, permission, confirmation, tool authority, destination, or execution behavior
- **Evidence:** isolation model
- **Residual risk:** forward-compatibility policy unresolved
- **Owner:** future domain-contract owners
- **Revalidation:** schema evolution or compatibility design

### `CTL-UT-010` — Proposal-only transformation boundary

- **Status:** required and designed
- **Classes:** preventive, limiting, informational
- **Protects:** Chronicle truth and permission truth
- **Requirement:** parser, connector, retrieval, model, and tool outputs remain source, derivative, or proposal records until separate deterministic validation and valid human or domain authority accept them
- **Evidence:** frozen AI rule, 5.4 Chronicle controls, and isolation model
- **Residual risk:** workflow-specific confirmation implementation absent
- **Owner:** future Chronicle, AI, connector, and domain owners
- **Revalidation:** every automated transformation workflow

## Connector controls

### `CTL-UT-011` — Stable connector instance and provider binding

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** account, provider, Chronicle, and subject relationships; `THR-027`
- **Requirement:** each connector instance binds one internal identity, adapter version, provider account relationship, server-derived Chronicle context, exact purpose, and allowed source classes
- **Evidence:** isolation model and 5.1 asset register
- **Residual risk:** provider-specific identity semantics unresolved
- **Owner:** future connector and identity owners
- **Revalidation:** connector SDK or provider integration

### `CTL-UT-012` — Least provider scope and explicit purpose

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** external accounts and imported data
- **Requirement:** connector authorization requests only named provider scopes required for one stated synchronization purpose; broad convenience scopes are prohibited
- **Evidence:** isolation model and House of Keys boundaries
- **Residual risk:** provider scope granularity and consent UX unresolved
- **Owner:** future connector, privacy, and House of Keys owners
- **Revalidation:** provider authorization design or scope change

### `CTL-UT-013` — Cursor and checkpoint integrity

- **Status:** required and designed
- **Classes:** preventive, detective, corrective
- **Protects:** synchronization ordering and completeness
- **Requirement:** connector cursors are opaque versioned sync state bound to connector instance, provider account, source stream, ordering rule, and observed effects; rollback or conflict stops synchronization
- **Evidence:** isolation model
- **Residual risk:** provider ordering guarantees and storage transactions unresolved
- **Owner:** future connector and infrastructure owners
- **Revalidation:** synchronization implementation or provider API change

### `CTL-UT-014` — Replay, duplicate, and source-substitution containment

- **Status:** required and designed
- **Classes:** preventive, detective, containment, corrective
- **Protects:** source integrity and cross-account isolation; `THR-027`
- **Requirement:** detect replayed pages, reused external IDs with changed content, duplicate delivery, provider-account substitution, subject mismatch, mapping drift, and out-of-order correction or deletion events
- **Evidence:** isolation model and 5.4 source controls
- **Residual risk:** provider-specific idempotency and reconciliation evidence absent
- **Owner:** future connector, source, and Chronicle owners
- **Revalidation:** connector implementation and each provider change

### `CTL-UT-015` — Connector revocation propagation

- **Status:** required and designed
- **Classes:** preventive, containment, corrective
- **Protects:** future synchronization and derived work
- **Requirement:** effective revocation invalidates credentials where supported, cursors, queued jobs, retries, derived sessions, and future sync while preserving historical source and receipt evidence
- **Evidence:** 5.5 propagation model and isolation model
- **Residual risk:** external provider revocation and in-flight behavior partly uncontrollable
- **Owner:** future connector, identity, House of Keys, and infrastructure owners
- **Revalidation:** connector revocation implementation or tabletop

### `CTL-UT-016` — Honest connector partial and gap state

- **Status:** required and designed
- **Classes:** detective, informational, corrective
- **Protects:** provenance, completeness claims, and person understanding
- **Requirement:** throttling, missing pages, provider truncation, partial mappings, unsupported records, and unresolved gaps remain explicit and cannot be rendered as complete synchronization
- **Evidence:** isolation model
- **Residual risk:** provider observability and user explanation unresolved
- **Owner:** future connector, product, and accessibility owners
- **Revalidation:** synchronization UX and provider implementation

## Prompt, model, and retrieval controls

### `CTL-UT-017` — Instruction and data separation

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** policy, tools, identity, and domain authority; `THR-024`
- **Requirement:** uploaded, retrieved, quoted, connector-returned, and tool-returned content is treated as data and cannot modify system policy, tool registry, authority context, or execution envelopes
- **Evidence:** frozen architecture and isolation model
- **Residual risk:** semantic attacks cannot be eliminated by text boundaries alone
- **Owner:** future AI governance, retrieval, connector, and MCP owners
- **Revalidation:** every model, prompt, retrieval, or tool change

### `CTL-UT-018` — Authority enforcement outside the model

- **Status:** required and designed
- **Classes:** preventive
- **Protects:** all private operations and tools
- **Requirement:** identity, resource context, House of Keys evaluation, confirmation, execution, receipt, and rate limits are enforced by deterministic services outside model output
- **Evidence:** frozen AI and MCP rules plus 5.2 and 5.5 controls
- **Residual risk:** integration implementation absent
- **Owner:** future AI gateway, MCP, House of Keys, and domain owners
- **Revalidation:** first model-assisted private operation

### `CTL-UT-019` — Provider-egress minimization record

- **Status:** required and designed
- **Classes:** preventive, limiting, informational
- **Protects:** private data and provider replaceability; `THR-025`
- **Requirement:** every provider use declares task, model, endpoint, region, allowed classes, minimum fields, prohibited fields, retention, training, logging, subprocessors, fallback, and deletion limitations
- **Evidence:** isolation model
- **Residual risk:** no provider selected and provider behavior may remain partly unverifiable
- **Owner:** future AI governance, privacy, security, and vendor owners
- **Revalidation:** provider, model, contract, endpoint, or region change

### `CTL-UT-020` — Strict model-output schema and authority checks

- **Status:** required and designed
- **Classes:** preventive, limiting, corrective
- **Protects:** Chronicle, permission, recipients, tools, and explanations
- **Requirement:** model output must pass strict schema, identifier, taxonomy, source, resource, subject, size, prohibited-claim, and undeclared-tool checks before domain use
- **Evidence:** isolation model
- **Residual risk:** output validators and adversarial evidence absent
- **Owner:** future AI contracts and domain owners
- **Revalidation:** output schema, model, or task change

### `CTL-UT-021` — Generated clinical and permission-claim prohibition

- **Status:** required and designed
- **Classes:** preventive, informational
- **Protects:** person safety, Chronicle truth, and House of Keys authority
- **Requirement:** model output cannot invent clinical conclusions, grant validity, permission, recipient compliance, deletion completion, or authoritative receipt events
- **Evidence:** frozen architecture, House of Keys, and isolation model
- **Residual risk:** clinical and legal specialist review pending
- **Owner:** future AI governance, Chronicle, House of Keys, clinical, and legal owners
- **Revalidation:** any health interpretation or permission explanation feature

### `CTL-UT-022` — Retrieval tenant and corpus isolation

- **Status:** required and designed
- **Classes:** preventive, limiting, detective
- **Protects:** cross-user privacy and authorized corpus boundaries; `THR-026`
- **Requirement:** retrieval context, index, cache, source set, and result set are partitioned by server-derived resource, environment, and purpose with no caller-selected tenant authority
- **Evidence:** 5.2 isolation model and frozen retrieval rules
- **Residual risk:** index implementation and leakage tests absent
- **Owner:** future retrieval, infrastructure, and privacy owners
- **Revalidation:** retrieval or index implementation

### `CTL-UT-023` — Source-grounded retrieval and untrusted citations

- **Status:** required and designed
- **Classes:** preventive, informational, corrective
- **Protects:** source integrity and recall accuracy
- **Requirement:** results preserve resolvable source references, source state, correction and deletion state, and uncertainty; ranking or citation form cannot create truth or authority
- **Evidence:** 5.4 Chronicle controls and frozen retrieval foundation
- **Residual risk:** source-grounding benchmark and UI evidence absent
- **Owner:** future retrieval, Chronicle, and product owners
- **Revalidation:** retrieval feature or source model change

### `CTL-UT-024` — Retrieval poisoning and lifecycle invalidation

- **Status:** required and designed
- **Classes:** preventive, detective, containment, corrective
- **Protects:** AI context and person-visible recall; `THR-026`
- **Requirement:** identify adversarial, duplicate, stale, deleted, disputed, cross-corpus, or source-lost material; invalidate and rebuild derivatives after source lifecycle changes
- **Evidence:** 5.4 dependency register and isolation model
- **Residual risk:** poisoning detection and rebuild implementation absent
- **Owner:** future retrieval, Chronicle, and security owners
- **Revalidation:** source, embedding, splitter, ranking, or index change

## MCP and agent controls

### `CTL-UT-025` — Server-owned versioned tool registry

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** tool scope and hidden-tool expansion; `THR-023`, `THR-024`
- **Requirement:** services own tool identities, versions, schemas, risk classes, purpose mappings, confirmations, rate limits, enabled environments, and compatibility; clients and content cannot add tools dynamically
- **Evidence:** frozen MCP foundation and isolation model
- **Residual risk:** tool registry implementation and governance absent
- **Owner:** future MCP and domain owners
- **Revalidation:** every tool addition, removal, or version change

### `CTL-UT-026` — One bounded invocation envelope

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** private tool execution
- **Requirement:** each invocation binds authenticated client, server-derived resource context, exact tool version, schema-valid arguments, purpose, fresh 5.5 execution envelope, operation identity, confirmation, receipt, and resource budget
- **Evidence:** 5.5 enforcement model and isolation model
- **Residual risk:** remote MCP, token, and execution implementation absent
- **Owner:** future MCP, identity, House of Keys, and execution owners
- **Revalidation:** first private MCP or agent tool

### `CTL-UT-027` — No arbitrary database, filesystem, shell, or network tool

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** canonical stores, infrastructure, and secrets
- **Requirement:** MCP and agent tools expose named domain capabilities only; arbitrary SQL, filesystem browsing, shell execution, network proxying, object-store browsing, and administrative discovery are prohibited
- **Evidence:** frozen architecture and isolation model
- **Residual risk:** tool implementation and code review absent
- **Owner:** future MCP, infrastructure, and security owners
- **Revalidation:** tool registry and implementation review

### `CTL-UT-028` — Tool output classification and validation

- **Status:** required and designed
- **Classes:** preventive, limiting, informational
- **Protects:** agents, models, clients, and receipts
- **Requirement:** output distinguishes canonical result, proposal, explanation, receipt reference, denial, indeterminate authority, partial execution, operational failure, and protected error derivative; secrets and unrelated records are excluded
- **Evidence:** isolation model and 5.5 outcome vocabulary
- **Residual risk:** error schemas and client rendering absent
- **Owner:** future MCP, execution, receipt, and product owners
- **Revalidation:** tool output or error-contract change

### `CTL-UT-029` — Agent compromise containment

- **Status:** required and designed
- **Classes:** detective, containment, corrective, restorative
- **Protects:** sessions, tools, queues, releases, and person rights; `THR-023`
- **Requirement:** suspected compromise revokes sessions and derived credentials, invalidates envelopes and queued work, blocks tools, reviews releases and receipts, rotates credentials under 5.7, and records residual harm
- **Evidence:** 5.2, 5.5, and isolation models
- **Residual risk:** detection, attribution, and irreversible external effects unresolved
- **Owner:** future security, MCP, identity, and incident owners
- **Revalidation:** agent implementation and compromised-agent tabletop

## Supply-chain, CI, and secret-path controls

### `CTL-UT-030` — Dependency source, namespace, and lock integrity

- **Status:** required and designed
- **Classes:** preventive, detective
- **Protects:** source and build integrity; `THR-030`
- **Requirement:** dependencies have declared source, namespace, version policy, lockfile evidence, ownership review, script behavior, and dependency-confusion controls
- **Evidence:** isolation model and repository policy
- **Residual risk:** comprehensive dependency governance and malicious-package detection absent
- **Owner:** repository, dependency, and security owners
- **Revalidation:** dependency addition, update, registry, or namespace change

### `CTL-UT-031` — Least-privilege build and CI execution

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** repository, infrastructure, and deployment credentials
- **Requirement:** builds and actions use minimal token, repository, network, cache, environment, and deployment permissions; untrusted code cannot access privileged secrets
- **Evidence:** isolation model
- **Residual risk:** administrative settings and production pipeline evidence incomplete
- **Owner:** repository, CI, release, and infrastructure owners
- **Revalidation:** workflow, action, runner, or permission change

### `CTL-UT-032` — Fork, pull-request, preview, and synthetic-only boundary

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** private data and environments; `THR-029`, `THR-030`
- **Requirement:** public contribution and preview flows use public or synthetic data only and remain isolated from production data, secrets, origins, cookies, queues, storage, analytics, and administration
- **Evidence:** publication policy and isolation model
- **Residual risk:** preview and production infrastructure not yet implemented
- **Owner:** repository, deployment, privacy, and security owners
- **Revalidation:** preview, fork, or external contribution workflow change

### `CTL-UT-033` — Build artifact provenance and reviewed-source linkage

- **Status:** required and designed
- **Classes:** detective, preventive, informational
- **Protects:** releases and validation claims
- **Requirement:** release-class artifacts identify source revision, build inputs, workflow, dependency state, environment, outputs, review, integrity evidence, and explainable reproducibility status
- **Evidence:** isolation model
- **Residual risk:** signing, attestation, registry, and deployment design deferred to 5.7 and later implementation
- **Owner:** release, repository, and security owners
- **Revalidation:** release-pipeline or artifact-store design

### `CTL-UT-034` — Cache and generated-code poisoning controls

- **Status:** required and designed
- **Classes:** preventive, detective, corrective
- **Protects:** build and runtime artifacts
- **Requirement:** cache keys include trusted provenance inputs; untrusted caches and generated code cannot replace reviewed source or cross environment boundaries; cache invalidation and rollback are explicit
- **Evidence:** isolation model
- **Residual risk:** concrete cache providers and generated-code pipelines unresolved
- **Owner:** CI, release, infrastructure, and dependency owners
- **Revalidation:** cache, code generation, or build optimization change

### `CTL-UT-035` — Indirect secret and protected-data path controls

- **Status:** required and designed
- **Classes:** preventive, detective, containment
- **Protects:** credentials, private endpoints, health data, and operational evidence; `THR-028`
- **Requirement:** prompts, responses, parser errors, traces, metrics, CI output, artifacts, source maps, previews, caches, queue payloads, snapshots, support tools, and provider dashboards are reviewed, minimized, and redacted
- **Evidence:** isolation model
- **Residual risk:** full secret inventory, scanning, rotation, and incident handling deferred to 5.7
- **Owner:** security, infrastructure, AI, connector, CI, and support owners
- **Revalidation:** every new logging, tracing, preview, model, tool, or provider path

### `CTL-UT-036` — Safe failure, fallback, and truthful status

- **Status:** required and designed
- **Classes:** preventive, containment, recovery, informational
- **Protects:** person rights, availability, and control-status truth
- **Requirement:** unknown type, failed scan, parser timeout, schema mismatch, cursor conflict, invalid model output, injection suspicion, stale tool envelope, source loss, provenance conflict, or possible secret exposure fails closed for authority, preserves bounded evidence, and uses accessible non-AI fallback where possible
- **Evidence:** isolation model, Product Constitution, and control-status vocabulary
- **Residual risk:** service-level, interface, and operational procedures unresolved
- **Owner:** future product, accessibility, security, domain, and incident owners
- **Revalidation:** implementation, failure test, or tabletop

## Cross-control requirements

Every future implementation record must map its applicable `CTL-UT-*` controls to:

- assets and authority domains;
- trust zones and crossings;
- `THR-*` and `RSK-*` records;
- `CTL-ID-*`, `CTL-LC-*`, `CTL-HK-*`, and `CTL-TM-*` dependencies;
- implementation and synthetic evidence;
- unresolved risk and affected groups;
- owner and revalidation trigger; and
- independent review status.

A control may not be marked implemented or deployed solely because a selected vendor advertises the feature.

## Review result

The register defines the minimum provider-independent security boundary for later upload, connector, Aster, retrieval, MCP, agent, dependency, build, and CI implementation.

All thirty-six controls are currently **REQUIRED** and **DESIGNED** only. None are represented as implemented, deployed, operationally verified, or independently reviewed.
