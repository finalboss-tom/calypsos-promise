# Untrusted Input, Connector, AI, MCP, and Supply-Chain Isolation Model

[Security architecture](README.md) · [Control register](untrusted-input-control-register.md) · [Processing-state register](untrusted-input-processing-state-register.md) · [Integrated threat model](integrated-threat-model.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, AI-safety, accessibility, and supply-chain review pending  
**Workstream:** 5.6  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** provider-independent design only; no production upload, connector, document processor, retrieval service, model, MCP server, agent, dependency pipeline, sandbox, or private-data runtime is authorized or represented as deployed

## Purpose

This model defines how Calypso’s Promise must receive, inspect, transform, retrieve, generate from, or execute around information and software that originate outside the authoritative domain boundary.

It covers:

- files, archives, documents, images, audio, video, structured payloads, and attachments;
- connector credentials, scopes, cursors, synchronization events, and provider payloads;
- parsers, extractors, converters, classifiers, malware scanners, and document processors;
- prompts, retrieved context, model output, tool results, and provider responses;
- MCP clients, remote agents, tool registries, invocation envelopes, and tool outputs;
- packages, dependencies, build actions, registries, caches, artifacts, and deployment inputs; and
- logs, traces, previews, support surfaces, errors, and other secondary paths through which content or secrets can escape.

The model prevents external content or external execution from becoming a hidden authority plane.

## Governing rule

> Imported content and external output remain untrusted after successful transport, parsing, scanning, extraction, retrieval, generation, or execution.

A process may establish bounded claims such as:

- the bytes matched a recorded digest;
- the file stayed within an allowed size;
- a parser produced a structurally valid result;
- a connector authenticated to a named provider account;
- a cursor advanced according to the connector contract;
- a model returned a schema-valid proposal;
- a tool completed one bounded invocation; or
- a dependency artifact matched a recorded provenance statement.

Those claims do not establish:

- person identity;
- Chronicle or subject ownership;
- House of Keys permission;
- Chronicle truth or clinical truth;
- recipient or performing-actor authority;
- safe onward use;
- production integrity;
- deletion completion; or
- permission to invoke another tool.

## Authority preservation

This workstream preserves the existing authority separation:

- `AUTH-ACCOUNT` establishes bounded authenticated actor context;
- `AUTH-SOURCE` owns source identity, versions, custody, and availability;
- `AUTH-CHRONICLE` owns confirmed Chronicle records and provenance-bearing relationships;
- `AUTH-KEYS` owns purpose-specific permission and policy decisions;
- `AUTH-EXECUTION` owns attempts, releases, retries, cancellation, and outcomes;
- `AUTH-AI` owns disposable prompts, drafts, retrieval derivatives, and model outputs only;
- `AUTH-AUDIT` owns minimized protected operational evidence; and
- `AUTH-INSTITUTION` owns public policies, decisions, and challenge records.

An upload, connector, parser, model, MCP client, package, registry, or provider cannot cross these authority boundaries by embedding instructions, identifiers, metadata, confidence, signatures, or technical capabilities in its output.

## Scope and threat linkage

This model refines, without replacing:

- `THR-015` / `RSK-015` — malicious uploads, parsers, archives, images, and decompression;
- `THR-023` / `RSK-023` — compromised agents and MCP clients;
- `THR-024` / `RSK-024` — prompt injection and indirect instructions;
- `THR-025` / `RSK-025` — model and processing-provider egress or retention drift;
- `THR-026` / `RSK-026` — retrieval poisoning, cross-tenant retrieval, and stale indexes;
- `THR-027` / `RSK-027` — connector theft, scope expansion, cursor corruption, replay, and post-revocation synchronization;
- `THR-028` / `RSK-028` — secret and service-identity exposure;
- `THR-029` / `RSK-029` — environment crossover and preview leakage;
- `THR-030` / `RSK-030` — dependency, package, action, build, artifact, and CI compromise; and
- `THR-031` / `RSK-031` where untrusted work enters queues, retries, or dead-letter handling.

The existing residual risks remain production-blocking or pilot-blocking. This design does not accept them.

## Universal untrusted-input pipeline

Every future private ingestion or processing flow must preserve these stages as separate evidence claims.

### 1. Intake declaration

The intake boundary records:

- stable intake identity;
- authenticated actor or separately identified external source;
- server-derived Chronicle, subject, and controlled-resource context where applicable;
- declared content class and claimed media type;
- declared purpose and requested processing operation;
- expected size, format, and source relationship;
- House of Keys decision or other exact authority reference where required;
- environment and service audience;
- request time and freshness boundary; and
- whether the flow is public, synthetic, private, or prohibited.

Caller-supplied Chronicle, tenant, subject, owner, recipient, provider-account, or destination identifiers are comparison inputs only. They never establish authority.

### 2. Metadata and transport screening

Before general processing, the intake boundary enforces:

- authenticated and authorized transport where applicable;
- byte and object-count limits;
- declared and detected media-type comparison;
- extension, content-signature, and format-family checks;
- filename and path normalization;
- rejection of traversal, device, reserved, or executable path semantics;
- archive member-count, nesting-depth, expansion-ratio, and aggregate-size limits;
- rate, concurrency, and account or resource quotas;
- timeout and cancellation behavior;
- incomplete-transfer detection; and
- protected evidence that excludes raw content and secrets.

A matching extension or media type is not proof that content is safe.

### 3. Quarantine

Untrusted bytes or payloads enter a quarantine boundary before parser, model, user, retrieval, or canonical access.

Quarantine requires:

- non-public storage or isolated in-memory handling;
- no direct application rendering;
- no automatic indexing, embedding, or model context inclusion;
- no active content execution;
- no network callbacks initiated by the artifact;
- no shared filesystem path with authoritative services;
- explicit lifecycle and expiry;
- bounded reviewer or processor access; and
- fail-closed handling when state is unknown or scanning cannot complete.

Quarantine does not mean permanent retention. Rejected or abandoned material requires an explicit deletion path.

### 4. Isolated decoding and inspection

Parsers, converters, thumbnailers, OCR, transcription, archive expansion, and metadata extraction run in least-capability isolation.

The isolation boundary requires:

- ephemeral execution context;
- no reusable person, service, connector, model, or operator credentials;
- no direct canonical database access;
- no arbitrary internal network access;
- read-only inputs and separately written outputs;
- CPU, memory, storage, process, recursion, and wall-clock limits;
- syscall, library, codec, and child-process restrictions appropriate to the processor;
- bounded network egress only when separately required and authorized;
- deterministic or versioned tool identity;
- cancellation and termination behavior;
- output-size and output-count limits; and
- destruction or reset of the execution context after completion.

Parser success does not move content into the trusted domain automatically.

### 5. Malware and exploit evaluation

Where appropriate to the content family, the pipeline records:

- scanner, signature, rule, or sandbox identity and version;
- scan time;
- result and uncertainty;
- unsupported or encrypted-content state;
- archive and child-object coverage;
- suspicious behavior or exploit indicators;
- required containment or specialist review; and
- whether later rescanning is required after rule updates.

A clean scan means only that the selected controls did not identify a prohibited condition. It is not proof of safety.

### 6. Structural validation

Structured payloads and processor outputs require safe decoding from `unknown`, schema validation, semantic bounds, cross-reference checks, and explicit unsupported-version behavior before domain use.

Validation must reject or quarantine:

- unknown authority-bearing fields;
- duplicate or conflicting identities;
- unsupported discriminators or contract versions;
- unexpected executable or callback content;
- hidden broad selectors, wildcards, or implicit defaults;
- oversized arrays, strings, graphs, or recursion;
- ambiguous timestamps, units, encodings, or locales where they affect meaning;
- dangling or cross-resource references; and
- fields that attempt to assign permission, Chronicle confirmation, tool authority, recipient identity, or operator capability.

Unknown fields are not silently promoted into future authority.

### 7. Transformation and proposal creation

Extraction, normalization, classification, summarization, retrieval, or generation produces a proposal or derived representation with:

- exact input references;
- source versions and locators where available;
- method, parser, model, prompt-policy, retrieval, or tool version;
- transformation parameters;
- assumptions and limitations;
- warnings and unresolved fields;
- confidence or uncertainty as evidence only;
- output schema and validation result;
- actor and environment identity; and
- retention and deletion class.

The result remains proposal-only unless a deterministic domain contract and valid human authority perform the separate acceptance or confirmation action.

### 8. Domain acceptance

Domain acceptance is an explicit transition, not a side effect of processing.

Examples:

- a source service may accept bytes as a versioned source artifact;
- a Chronicle workflow may accept an extraction as a draft;
- the player may confirm or correct a draft through the Chronicle contract;
- a retrieval service may accept a disposable index entry linked to authoritative sources;
- a build pipeline may accept a reviewed artifact for a named environment; or
- an MCP service may accept a validated invocation request for policy evaluation.

Acceptance does not broaden the original purpose, recipient, environment, retention, or authority.

## File, document, image, audio, video, and archive controls

A future implementation must define an allowlist for each supported content family rather than accepting arbitrary files.

Each content-family contract records:

- supported media signatures and versions;
- maximum original and expanded size;
- maximum page, frame, stream, member, object, and recursion counts;
- encrypted, password-protected, malformed, truncated, polyglot, or unsupported handling;
- parser and converter versions;
- active-content and macro behavior;
- external-resource and embedded-link behavior;
- metadata extraction and minimization;
- thumbnail, preview, and derived-copy handling;
- accessibility-preserving alternatives where available;
- quarantine and rejection reasons; and
- deletion behavior for originals and derivatives.

Content must not be rendered through a privileged browser, office suite, image library, media stack, or document engine before the applicable isolation and policy checks.

## Archive and decompression boundaries

Archive handling must prevent:

- decompression bombs;
- recursive archives;
- path traversal;
- absolute or device paths;
- symlink and hard-link escape;
- duplicate-name ambiguity;
- case-folding collisions;
- hidden executable content;
- member-count exhaustion;
- unbounded temporary storage; and
- automatic processing of every child object without separate limits.

Each expanded child retains provenance to the exact parent version and archive member locator.

## Connector security boundary

A connector is an untrusted external adapter with separate authority from both the provider and the Chronicle.

### Connector identity and authorization

Each connector instance requires:

- stable internal connector identity;
- provider class and adapter version;
- server-derived account, Chronicle, and subject relationship;
- exact provider account or resource relationship stored in the connector boundary;
- least provider scopes;
- explicit synchronization purpose;
- token and credential references protected under 5.7;
- start, review, expiry, suspension, and revocation state;
- allowed source types and mapping versions; and
- person-visible setup, synchronization, failure, and revocation evidence where required.

Provider authentication proves access to a provider account under the returned scopes. It does not prove Chronicle ownership, subject identity, data correctness, or permission for every provider resource.

### Cursor, pagination, and synchronization integrity

A synchronization contract records:

- cursor or checkpoint identity and opaque provider value;
- provider account and connector instance;
- source stream or resource class;
- observed provider revision or time boundary where available;
- page, batch, and object identities;
- monotonicity or other provider-specific ordering rule;
- replay and duplicate behavior;
- partial, failed, throttled, or inconsistent synchronization state;
- next allowed retry; and
- source and Chronicle effects produced.

A cursor is synchronization state, not identity or authority.

### Replay and substitution controls

Connector processing must detect or contain:

- replayed pages or events;
- cursor rollback;
- reused external object identities with changed content;
- provider-account substitution;
- subject or source-stream mismatch;
- payloads belonging to another person or account;
- mapping revision changes;
- deletion or correction events arriving out of order;
- provider-side gaps or undocumented truncation; and
- duplicate delivery after timeout or retry.

Imported facts remain source truth until Chronicle confirmation or a separately accepted deterministic derivation.

### Connector revocation

Effective connector revocation must:

- stop future synchronization;
- invalidate queued and derived connector work;
- revoke or rotate provider credentials where supported;
- mark cursors and checkpoints non-applicable;
- prevent automatic reconnection through stale sessions or retries;
- preserve prior source, transformation, and receipt history;
- expose unresolved provider-side access or retained copies honestly; and
- use separate deletion or retention procedures for already imported data.

Revocation does not erase historical imports or prove provider-side deletion.

## Prompt-injection and instruction-separation boundary

Prompt injection is treated as an authority-confusion problem, not merely a text-filtering problem.

The system must preserve these distinctions:

- system and policy instructions;
- tool and capability definitions;
- authenticated actor and resource context;
- House of Keys and execution envelopes;
- developer-authored task instructions;
- user requests;
- uploaded or retrieved content;
- connector and tool output;
- model-generated intermediate reasoning or proposals; and
- canonical domain records.

Uploaded, retrieved, quoted, transformed, or tool-returned content is data. It cannot:

- change the tool registry;
- create a new tool name or endpoint;
- widen a tool schema;
- supply authoritative tenant, Chronicle, subject, recipient, or owner context;
- instruct the system to ignore policy;
- create a House of Keys grant or policy decision;
- authorize release, export, deletion, connector setup, or account change;
- request secrets or hidden instructions;
- turn citations into permission;
- self-confirm a Chronicle proposal; or
- convert model output into clinical truth.

Delimiters, warnings, prompt text, or model training are defense-in-depth only. Authority remains enforced outside the model.

## Model and provider boundary

Every future model or processing-provider use must have a provider-egress record covering:

- provider, model, endpoint, region, and contract version;
- exact task class;
- allowed information classes;
- purpose and recipient;
- minimum context fields;
- prohibited fields and source classes;
- training, improvement, abuse-monitoring, and human-review behavior;
- retention and deletion commitments;
- subprocessors and jurisdictional boundaries;
- request and response logging behavior;
- encryption and transport expectations;
- output filtering and validation;
- service failure and fallback; and
- provider replacement and revalidation triggers.

No provider is selected by Sprint 5.

Provider promises, account settings, or “zero retention” labels are evidence inputs rather than proof of complete downstream erasure or absence of human access.

## Model-output boundary

Model output remains untrusted and proposal-only.

Before domain use, output requires:

- strict output-schema validation;
- rejection of undeclared fields and tools;
- source and retrieval-reference validation;
- resource and subject consistency checks;
- allowed taxonomy and identifier checks;
- uncertainty and limitation preservation;
- prohibited clinical, permission, recipient, or authority claim checks;
- maximum size and recursion limits;
- correction and challenge path; and
- human confirmation or deterministic validation where required.

A generated explanation may render canonical permission or receipt data. It cannot alter that data or become the authoritative record.

## Retrieval isolation and poisoning controls

Semantic retrieval is a disposable derivative layer.

A retrieval task requires:

- server-derived Chronicle or public corpus context;
- exact authorized corpus and purpose;
- source-linked chunks or records;
- environment and tenant partitioning;
- index, embedding, splitter, parser, and ranking versions;
- source correction and deletion propagation;
- freshness and rebuild behavior;
- poisoning, duplicate, and adversarial-content handling;
- maximum context and result count;
- source-reference validation; and
- explicit no-result or unresolved-source behavior.

Retrieval results, rankings, similarity, citation formatting, or frequency do not establish truth or authority.

Untrusted citations must not:

- authorize a tool;
- validate a recipient;
- confirm a Chronicle record;
- prove clinical correctness;
- override structured values; or
- hide that the supporting source is deleted, unavailable, disputed, or outside the authorized corpus.

## MCP client and agent boundary

An MCP client or agent is an untrusted requester even when it is operated by the person.

### Server-owned tool registry

The service owns the tool registry, schemas, risk classes, purpose mappings, confirmation requirements, rate limits, and enabled environments.

A client, model, retrieved document, package, or tool output cannot add or modify tools dynamically outside a separately reviewed deployment process.

Each tool definition requires:

- stable tool identity and version;
- owning domain service;
- exact purpose and action class;
- input and output schema;
- allowed information classes;
- resource and subject binding rules;
- risk class;
- confirmation or step-up requirement;
- House of Keys and execution requirements;
- idempotency and retry behavior;
- receipt and audit behavior;
- rate and resource limits;
- error and uncertainty format;
- non-AI fallback where applicable; and
- disablement, replacement, and compatibility behavior.

### Tool invocation

A private invocation requires:

- authenticated client or service identity;
- server-derived account, Chronicle, subject, and resource context;
- exact tool identity and version;
- complete schema-valid arguments;
- applicable purpose and House of Keys facts;
- fresh non-transferable execution envelope from the 5.5 boundary;
- one operation and idempotency identity;
- bounded time, rate, and resource budget;
- explicit confirmation when required; and
- linked receipt and protected audit intent.

The tool performs one named domain operation. It does not expose arbitrary SQL, filesystem, shell, network, object-store, queue, model-provider, or administrative access.

### Tool output

Tool output is validated and classified before returning to an agent or model.

The output must distinguish:

- canonical domain result;
- person-visible explanation;
- proposal or draft;
- receipt reference;
- protected error derivative;
- retryable operational failure;
- policy denial;
- indeterminate authority; and
- unresolved or partial execution.

A tool error or output must not leak secrets, private endpoints, stack traces, unrelated records, hidden policy instructions, or cross-tenant identifiers.

### Compromise and stale reuse

Suspected client or agent compromise requires:

- session and derived credential revocation;
- invalidation of pending envelopes and queued work;
- stopping future tool invocation;
- containment of in-flight work where safe;
- review of releases and receipts;
- correction and person notification where required;
- provider or token rotation under 5.7; and
- residual-harm recording when effects cannot be reversed.

Stale tool schemas, cached grants, remembered resource identifiers, prior results, or earlier `allow` decisions cannot authorize a later call.

## Sandbox and least-capability execution

Every untrusted processor, model tool, connector job, dependency build, or agent task receives only the capabilities necessary for one bounded task.

Possible capabilities are separately granted and default absent:

- read one quarantined input;
- write one isolated output area;
- call one named provider endpoint;
- call one named domain-service method;
- read one versioned public or synthetic corpus;
- emit one bounded result or receipt proposal; and
- publish one reviewed build artifact.

Not granted by default:

- canonical database access;
- raw object-store browsing;
- unrestricted internal network access;
- production secrets;
- arbitrary shell execution;
- package installation during runtime;
- tool discovery beyond the approved registry;
- cross-tenant retrieval;
- persistent credentials;
- long-lived writable storage; or
- administrative capabilities.

## Dependency, package, build, and CI boundary

Source code, dependency manifests, lockfiles, packages, registries, build actions, caches, generated code, and artifacts are untrusted supply-chain inputs until reviewed and verified for their intended environment.

The baseline requires:

- declared package source and namespace;
- lockfile and dependency graph review;
- exact or bounded versions under accepted update policy;
- prevention of dependency-confusion and namespace substitution;
- lifecycle and ownership review for new dependencies;
- known install, prepare, postinstall, and build-script behavior;
- build isolation and least permissions;
- no production secrets for untrusted pull-request, fork, preview, or dependency code;
- restricted CI token and repository permissions;
- protected cache keys and cache-provenance boundaries;
- generated-code and artifact review;
- build input and output identity;
- reproducibility or explainable non-reproducibility;
- provenance and integrity evidence appropriate to the release class;
- vulnerability and malicious-package response;
- rollback and dependency removal; and
- revalidation after package, action, registry, build, or release changes.

A passing build or test suite is not proof that an artifact is safe, authorized for production, free of secrets, or equivalent to the reviewed source.

## CI, preview, and contributor boundary

Public contribution and preview flows remain PUBLIC or synthetic-only.

They must not receive:

- private health information;
- account or connector credentials;
- production provider keys;
- private endpoints;
- production exports or logs;
- administrative tokens;
- production database or object-store access; or
- unrestricted deployment credentials.

Untrusted fork or pull-request code must not execute with write-capable repository or infrastructure credentials unless a separately reviewed mechanism prevents access to attacker-controlled code.

Preview environments must remain isolated from production data, secrets, origins, cookies, queues, storage, analytics, and administrative services.

## Secret-exposure paths

Secret and protected-data controls must include indirect paths, not only source files.

At minimum, review:

- prompts and model context;
- model and tool responses;
- parser errors;
- stack traces;
- HTTP errors and redirects;
- logs, traces, metrics, and crash reports;
- CI output and artifacts;
- source maps and build metadata;
- preview URLs and screenshots;
- cache keys and cache values;
- queue payloads and dead letters;
- test snapshots;
- support tools and copied diagnostics;
- issue, pull-request, and review comments; and
- dependency or provider dashboards.

Secrets are never used as ordinary identifiers, labels, filenames, URLs, query parameters, model instructions, or person-visible receipt fields.

Detailed secret lifecycle, key hierarchy, and environment separation remain 5.7.

## Logging and evidence minimization

Untrusted-input and agent processing evidence records only what is necessary to:

- prove intake and state transitions;
- identify responsible services and versions;
- detect abuse or failure;
- link source, proposal, decision, execution, receipt, and incident records;
- reproduce a synthetic or permitted diagnostic; and
- support containment, correction, deletion, and restoration.

Logs must not become:

- a copy of raw uploads;
- a prompt archive;
- a connector payload warehouse;
- a tool-output database;
- a shadow Chronicle;
- a shadow permission system; or
- an unrestricted cross-tenant search surface.

## Failure behavior

The default behavior is fail closed for authority and fail safe for evidence preservation.

Examples:

- unknown media type → reject or quarantine;
- scanner unavailable → quarantine or reject, not accept;
- parser timeout → terminate and record partial state;
- unsupported schema → reject or hold for explicit migration;
- connector cursor conflict → stop synchronization and reconcile;
- model output schema failure → discard or preserve as non-authoritative diagnostic;
- prompt-injection suspicion → block tools or fall back to non-agent behavior;
- tool schema or version mismatch → deny invocation;
- stale execution envelope → re-evaluate, never reuse;
- retrieval source unavailable → omit or mark unresolved, never fabricate support;
- package or artifact provenance conflict → block release;
- possible secret exposure → contain, rotate under 5.7, investigate, and correct.

## Accessibility and non-AI fallback

Security controls must not force a person to use AI, voice, inaccessible document review, or a single sensory or cognitive mode.

The future product must support:

- direct manual capture;
- direct structured review;
- plain-language source and proposal comparison;
- keyboard and assistive-technology operation;
- accessible warning and quarantine explanations;
- human or non-AI correction paths;
- export and deletion without model assistance; and
- refusal or cancellation without punitive progression.

Accessibility assistance does not transfer authority to the assistant, model, operator, or tool.

## Public and synthetic development boundary

Public fixtures and exercises may include malicious-looking but harmless synthetic content.

They must not include:

- real malware;
- weaponized exploit payloads;
- live credentials or tokens;
- private provider identifiers;
- real health or account information;
- exploitable production endpoints; or
- detailed operational weaknesses that materially increase attack capability.

Public scenarios should describe control expectations and sanitized outcomes rather than publish dangerous reproduction instructions.

## Required evidence before implementation or pilot

Before a private upload, connector, model, retrieval, MCP, or agent flow can be represented as implemented, its owner must produce:

- exact architecture and data-flow mapping;
- threat and control mapping;
- supported content, provider, model, tool, or dependency inventory;
- implementation evidence for applicable `CTL-UT-*`, `CTL-ID-*`, `CTL-LC-*`, `CTL-HK-*`, and `CTL-TM-*` controls;
- adversarial synthetic tests;
- cross-user and cross-resource isolation tests;
- resource-exhaustion and failure tests;
- prompt-injection and tool-confusion tests where applicable;
- connector replay and revocation tests where applicable;
- provider-egress and retention review where applicable;
- secret and environment review under 5.7;
- incident and recovery review under 5.8;
- accessible manual fallback evidence;
- residual-risk owner and review trigger; and
- independent specialist review or an explicit approved exception.

## Explicit non-scope

Workstream 5.6 does not:

- select an upload, malware, sandbox, document, OCR, speech, model, retrieval, connector, MCP, package, registry, build, or CI provider;
- implement production ingestion, connectors, Aster, retrieval, agents, MCP, sandboxes, or release pipelines;
- process real personal or health information;
- create clinical decision support or model-derived clinical truth;
- authorize arbitrary external tools or plugins;
- define production encryption, secret custody, or key hierarchy;
- claim that scanning, model policy, sandboxing, or package provenance eliminates risk; or
- certify production security, privacy, accessibility, legal, clinical, or supply-chain readiness.

## Review result

The internal 5.6 baseline is complete when the model, control register, and processing-state register:

- preserve all 5.1–5.5 authority and lifecycle boundaries;
- cover every accepted 5.6 threat family;
- assign stable controls, states, owners, and revalidation triggers;
- keep all production-facing residual risks blocking;
- avoid provider and implementation selection;
- record independent review as pending; and
- pass repository validation.
