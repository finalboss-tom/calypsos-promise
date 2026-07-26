# Environment Isolation and Private-Origin Design

[Security architecture](README.md) · [Asset and trust-boundary map](asset-and-trust-boundary-map.md) · [Secret-management policy](secret-management-policy.md) · [Encryption and key-management baseline](encryption-and-key-management-baseline.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, infrastructure, accessibility, legal, and records-governance review pending  
**Workstream:** 5.7  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** environment and trust requirements only; no production cloud account, network, private origin, database, queue, object store, cache, analytics service, research environment, administrative service, backup system, deployment pipeline, or protected-data runtime is selected, authorized, or represented as deployed

## Purpose

This design defines how Calypso’s Promise must separate public, contributor, development, preview, test, staging, production, analytics, research, administrative, security, and recovery environments.

It exists to prevent convenience, shared provider ownership, deployment automation, preview URLs, environment variables, network location, or technical possession from collapsing trust boundaries.

It refines `THR-028`, `THR-029`, `THR-030`, `THR-031`, `THR-033`, `THR-035`, and `THR-046`, while preserving the trust zones and crossings defined in workstream 5.1.

## Governing invariants

1. **Environment identity is trusted configuration, not caller input.** A request, URL parameter, header, model output, tool argument, or queue payload cannot select the environment that grants access.
2. **Code may promote; protected data, secrets, sessions, and authority do not.** Promotion moves reviewed immutable artifacts and versioned configuration contracts, not databases, object stores, queues, credentials, cookies, or user state.
3. **Non-production is synthetic-only by default.** Local, contributor, CI, preview, development, test, and staging environments must not receive production personal or health information.
4. **Public origins remain public only.** A public website may call a bounded private adapter, but databases, object stores, queues, analytics, research, administrative, recovery, and internal provider services do not need public exposure.
5. **No shared root of trust.** Environments use separate accounts or equivalent administrative boundaries, service identities, secrets, keys, data stores, queues, caches, logs, and deployment permissions appropriate to consequence.
6. **Network location is not authorization.** Private networking reduces exposure but does not create Chronicle, House of Keys, operator, recipient, or research authority.
7. **Preview is hostile by default.** Preview code and untrusted pull-request code cannot receive production secrets, protected data, production cookies, or private production origins.
8. **Lower-trust environments cannot control higher-trust environments.** Development, preview, CI, test, analytics, or research identities cannot deploy, administer, rotate, delete, or recover production resources.
9. **Telemetry follows the environment.** Logs, traces, metrics, error systems, and provider dashboards remain separated and may not become a cross-environment personal-data warehouse.
10. **Designed is not deployed.** This document defines future controls and current public-development constraints only.

## Environment classes

### Local contributor environment

Purpose:

- source editing;
- documentation;
- local validation;
- synthetic fixtures;
- isolated emulators; and
- contributor learning.

Allowed information:

- PUBLIC information;
- synthetic information; and
- developer-local non-production credentials.

Prohibited information and access:

- production personal or health data;
- production secrets, keys, cookies, sessions, exports, logs, backups, and support records;
- production private origins;
- production connector or provider accounts;
- unrestricted administrative access; and
- shared founder or team master credentials.

Local environment loss, compromise, or debugging must not expose another environment.

### Public repository and CI environment

This environment corresponds primarily to `TZ-P0` and includes the repository, pull requests, public Actions logs, artifacts, caches, and contributor-visible validation.

Allowed information:

- PUBLIC code and documentation;
- public or synthetic fixtures;
- bounded non-secret build metadata; and
- reviewed public institutional evidence.

Prohibited information:

- protected personal data;
- production or private credentials;
- private endpoints or access maps;
- security reports and incident evidence;
- raw signup records;
- private exports or logs; and
- unreviewed REVIEW, RESTRICTED, or SECRET material.

Default workflow permissions remain least privilege. Untrusted pull requests do not receive privileged credentials.

### Public preview environment

A preview is a lower-trust public deployment for reviewing public code and synthetic behavior.

It must use:

- preview-specific domains;
- preview-specific cookies and storage;
- preview-specific non-production service identities;
- public or synthetic data only;
- restricted egress;
- no production private origins; and
- automatic or governed teardown.

A preview must not become an unofficial staging or production surface merely because it resembles the final interface.

### Shared development environment

A shared development environment supports integration among approved developers and services.

It remains synthetic-only and must have resources, identities, secrets, keys, logs, queues, storage, and external providers separated from production.

Shared development may not import production databases, object stores, backups, exports, connector payloads, or user logs for convenience.

### Test environment

A test environment supports deterministic, integration, performance, accessibility, security, and failure-path testing.

It must use:

- public or synthetic data;
- purpose-built test accounts and identities;
- non-production external providers or mocks;
- constrained test secrets;
- explicit reset and teardown;
- no route to production private data; and
- no capability to execute production releases or administrative actions.

Load or security tests must not target production unless a separately reviewed test plan explicitly authorizes a bounded production-safe action.

### Staging environment

Staging supports production-like validation without production personal data.

Baseline staging rules:

- synthetic-only data;
- production-like topology where useful;
- separate accounts, keys, secrets, identities, domains, stores, queues, caches, logs, and providers;
- no production cookies or sessions;
- no production connector credentials;
- no direct production database or object access;
- no restore from a production backup; and
- separate deployment approval and administrative access.

Any future proposal to use protected production-derived information in staging requires a new reviewed exception, minimization, explicit authority, a time limit, environment isolation, deletion verification, and applicable specialist approval. No such exception is authorized by this baseline.

### Production environment

Production is the future environment authorized to process real account and personal data after later implementation, specialist, institutional, and launch gates.

It requires:

- isolated account or equivalent administrative boundary;
- production-only keys, secrets, service identities, data stores, queues, caches, logs, domains, and providers;
- private internal origins;
- explicit House of Keys and domain authorization;
- least-capability administration;
- reviewed deployment and rollback;
- bounded observability;
- backup and incident procedures;
- deletion and restoration evidence; and
- no dependency on contributor or preview systems for continued operation.

This document does not authorize production or claim that it exists.

### Personal analytics environment

Personal analytics must remain isolated from ordinary production queries and must not become a raw unrestricted replica.

It requires:

- exact personal-core or separately authorized purpose;
- minimized structured inputs;
- environment and tenant isolation;
- no production administrative credentials;
- disposable working state;
- source-linked correction and deletion propagation;
- reviewed output release; and
- no shadow Chronicle, permission system, or identity graph.

### Research environment

Research remains deferred and separately governed.

A future research environment requires:

- one approved study and purpose;
- one named recipient and processor set;
- isolated account, project, network, keys, secrets, storage, analytics, and logs;
- no direct unrestricted production query path;
- study-specific extract and output review;
- re-identification and linkage controls;
- withdrawal, retention, deletion, incident, and publication behavior; and
- independent legal, ethics, privacy, security, and research review.

Personal-core use does not grant research-environment access.

### Administrative and security environment

Administration and protected security operations correspond to bounded `TZ-S7` functions.

They require:

- separate operator identities and sessions;
- a private origin or approved restricted access path;
- stronger authentication and consequence-aware step-up;
- least-capability tools rather than arbitrary database, object-store, shell, or impersonation access;
- minimized protected audit;
- no shared administrator accounts;
- no ordinary user session reuse;
- no public preview access;
- no founder-only root control; and
- explicit break-glass boundaries.

Administrative access does not create Chronicle, permission, confirmation, recipient, or research authority.

### Recovery environment

Recovery and restoration correspond to bounded `TZ-S9` and the isolated reconciliation crossing.

They require:

- separation from the primary failure domain;
- isolated keys and credentials;
- restricted responder roles;
- no ordinary browsing or reuse of restored data;
- correction-, withdrawal-, revocation-, and deletion-aware reconciliation;
- protected evidence;
- time-bounded activation; and
- retirement after the recovery objective is complete.

Recovery access does not create ordinary operator or domain authority.

## Environment identity and binding

Every protected service, job, queue, database, object store, key, secret, receipt, audit event, and deployment must be bound to a trusted environment identity.

The identity must be supplied by approved infrastructure or deployment configuration rather than a caller-controlled field.

The design must fail closed when:

- environment identity is absent;
- two sources disagree about the environment;
- a service identity is valid only in another environment;
- a key or secret belongs to another environment;
- a request targets an origin, resource, queue, or data store in another environment;
- a cookie or session is presented to the wrong environment; or
- a build artifact lacks an approved environment-independent provenance record.

Environment identity does not replace tenant, resource, subject, purpose, recipient, action, or policy authorization.

## Administrative and provider-account isolation

Material environments should use separate provider accounts, projects, subscriptions, organizations, or equivalent administrative boundaries when a shared account would permit silent cross-environment access.

At minimum, the design must separate:

- billing and ownership metadata where useful for accountability;
- key and secret administration;
- service identities;
- deployment identities;
- databases;
- object stores;
- queues and schedulers;
- caches and search indexes;
- AI and document-processing providers;
- analytics and research systems;
- logs and traces;
- domains and certificates;
- backups and recovery;
- administrative interfaces; and
- incident and audit evidence.

Provider ownership does not justify one root account with unrestricted access across every environment.

## Resource-separation matrix

### Secrets and keys

Each environment has distinct secrets, keys, certificates, and workload identities.

A secret or key valid in one environment must fail in another. Test values must not be accepted by production services.

### Databases and structured stores

Each environment uses a separate database or equivalent logical and administrative isolation with no lower-trust credential capable of production access.

Production data is never copied downward as a standard development or staging workflow.

### Object storage and raw sources

Buckets, containers, namespaces, access policies, encryption keys, object identities, and lifecycle rules remain environment-specific.

Public website assets remain separate from private source storage.

### Queues, workers, schedulers, and dead letters

Queues and worker identities remain environment-specific. A message cannot route to another environment by carrying an environment field.

Dead-letter replay requires current environment and authority validation.

### Caches, search, and retrieval

Cache namespaces, indexes, embeddings, search corpora, and invalidation systems remain environment- and tenant-isolated.

A shared cache or index may not mix synthetic and production content or make preview content retrievable in production.

### Logs, traces, metrics, and error systems

Each environment uses separate sinks or equivalent access and query isolation.

Telemetry must include trustworthy environment metadata while excluding raw health values, secret values, and unnecessary identity linkage.

### External providers and connectors

Provider accounts, OAuth clients, callback URLs, connector credentials, webhooks, model projects, document processors, analytics workspaces, and notification systems remain environment-specific.

An external provider’s sandbox and production modes are separate trust boundaries, even when the provider presents them in one console.

### Backups and replicas

Backups remain environment-specific. Lower-trust environments cannot restore or decrypt production backups.

Production restoration occurs only through the recovery design and does not populate staging, preview, local, CI, or contributor systems.

## Public and private origins

### Public website origin

The public website may expose only public content and bounded public operations such as the current purpose-limited signup adapter.

A public route must not reveal:

- a database origin;
- an object-store origin;
- a queue or worker origin;
- an administrative origin;
- a key or secret service;
- an analytics or research origin;
- a private AI or document-processing origin;
- an internal service topology; or
- a production recovery path.

### Private product origins

Private API, domain, worker, source, execution, receipt, and internal service origins require authentication, authorization, environment binding, service identity, and network controls appropriate to consequence.

They must not rely on secrecy of the URL as the primary control.

### Administrative origin

Administrative and security interfaces require a distinct private or restricted origin, separate identity and session, stronger authentication, narrow tools, and protected audit.

They must not be mounted under the ordinary public website merely behind a hidden path.

### Database, object, queue, and provider origins

Databases, object stores, queues, caches, key stores, secret stores, analytical stores, and provider administration do not require direct public access.

Where a provider endpoint is internet-addressable by design, access remains restricted through strong service identity, network policy, encryption, least privilege, and environment binding.

## Network and service trust

The network design must use explicit ingress and egress policy.

Requirements include:

- deny-by-default access for private services where feasible;
- approved ingress paths;
- service-to-service authentication;
- environment-bound workload identities;
- egress allowlists or equivalent restrictions for high-consequence services;
- no unrestricted proxy capability in AI, MCP, parser, connector, or administrative tools;
- DNS and certificate separation;
- request and response size and timeout boundaries;
- no assumption that internal addresses are trustworthy; and
- protected evidence for material cross-boundary calls.

A private network does not authorize access to every service inside it.

## Domains, cookies, sessions, callbacks, and browser policy

Environment-specific web surfaces require distinct domains or equivalent strong separation.

The design must address:

- cookie names and domain scope;
- secure, same-site, expiry, and path behavior;
- cross-origin resource policy;
- content security policy;
- callback and redirect allowlists;
- OAuth application separation;
- service-worker and browser-cache isolation;
- local storage and client database separation;
- session invalidation after environment or origin changes; and
- rejection of production cookies or tokens in preview and non-production environments.

Wildcard origins, broad callbacks, and shared session cookies require explicit security review and are not baseline defaults.

## CI and preview isolation

CI and preview environments must remain safe for public and untrusted code review.

Controls include:

- read-only default workflow permissions;
- no production credentials for untrusted pull requests;
- protected privileged jobs separated from untrusted code;
- ephemeral runners or equivalent cleanup;
- synthetic-only fixtures;
- no production service access;
- restricted artifact and cache retention;
- no secret or protected-data echoing;
- preview-specific domains and credentials;
- no production deploy authority; and
- teardown after the branch or preview expires.

A branch in a public repository is not a private REVIEW environment.

## Build, artifact, and deployment promotion

The preferred promotion model is:

1. build a reviewed artifact from an accepted source revision;
2. validate and identify the artifact;
3. record provenance and dependency inputs;
4. promote the same immutable artifact through approved environments;
5. inject environment-specific configuration, identities, keys, and secrets at deployment or runtime;
6. require environment-specific approval for high-consequence promotion;
7. verify deployment identity and target environment; and
8. preserve rollback and revocation behavior.

Production must not rebuild arbitrary source with production secrets when an immutable reviewed artifact can be promoted instead.

Artifact promotion does not promote:

- data;
- database state;
- object contents;
- queues;
- caches;
- sessions;
- cookies;
- secrets;
- keys;
- provider credentials;
- access grants; or
- administrative authority.

## Configuration management

Configuration must be classified as:

- public configuration;
- environment-specific non-secret configuration;
- restricted operational configuration; or
- secret or cryptographic material.

Requirements include:

- versioned schemas;
- environment binding;
- validation before activation;
- no caller-selected environment;
- safe defaults that fail closed;
- no secret values in public configuration;
- no production configuration in previews or public artifacts;
- change review and rollback;
- protected evidence for high-consequence changes; and
- provider replacement without rewriting domain records.

## Cross-environment operations

The baseline denies direct cross-environment data operations by default.

Allowed categories may include:

- publishing a reviewed public artifact;
- promoting an immutable code artifact;
- copying public schema or synthetic fixtures;
- consuming public package registries through the supply-chain controls; and
- publishing minimized safe institutional evidence.

Prohibited default categories include:

- production-to-staging personal-data copies;
- production backups restored into development;
- preview access to production APIs;
- shared production and test credentials;
- lower-trust deployment of production resources;
- cross-environment queue routing;
- shared personal analytics or research working stores;
- production logs copied into public issue systems; and
- shared administrator sessions.

A temporary exception requires exact scope, authority, owner, time limit, minimization, controls, evidence, cleanup, specialist review, and revalidation. No exception is implied by this design.

## Environment lifecycle

### `planned`

Purpose, data class, trust assumptions, owner, resources, and exit criteria are documented.

### `provisioning`

Resources are being created but are not accepted for protected operation.

### `active-synthetic`

The environment may process only public or synthetic data for its approved purpose.

### `restricted-review`

Use is paused or narrowed while isolation, ownership, configuration, or security evidence is incomplete.

### `active-protected`

The environment is authorized for defined protected information after applicable implementation, specialist, institutional, and launch gates. No current environment is represented in this state by this document.

### `frozen`

Changes and new work are blocked while an incident, migration, audit, or recovery process preserves state.

### `draining`

New work is blocked while active jobs, sessions, queues, exports, and dependencies are reconciled before retirement.

### `decommissioning`

Data, resources, secrets, keys, identities, domains, callbacks, logs, caches, queues, and provider bindings are being removed or retired.

### `decommissioned`

The bounded teardown procedure completed with evidence and residual-risk recording.

### `compromised`

Environment integrity or confidentiality is suspected or confirmed to be lost. Trust is not restored merely by restarting services.

## Environment compromise

A compromised environment requires:

- containment of ingress, egress, deployments, sessions, services, queues, and administrative access;
- revocation or rotation of environment secrets, keys, certificates, and service identities;
- identification of affected data, services, recipients, builds, logs, backups, and connected providers;
- review of cross-environment paths;
- preservation of minimized protected evidence;
- clean rebuild or restoration from accepted evidence;
- validation that compromise did not propagate through artifacts, caches, dependencies, or credentials;
- person notification, correction, and restoration where required; and
- explicit residual harm.

Recreating an environment with the same compromised credentials, artifact, configuration, or provider trust is not recovery.

## Environment teardown

Decommissioning requires explicit handling of:

- databases and structured stores;
- object stores and source representations;
- queues, schedulers, and dead letters;
- caches, indexes, and embeddings;
- logs, traces, metrics, and error systems;
- backups and snapshots;
- secrets, keys, certificates, and service identities;
- domains, certificates, cookies, callbacks, and redirects;
- provider accounts and integrations;
- deployment identities and artifacts;
- administrative and support access;
- retained evidence and exceptions; and
- residual uncontrolled copies.

Deleting the primary compute service alone is not environment teardown.

## Founder and provider independence

Environment continuity must not depend solely on one founder, one provider console, one undocumented account, one personal email, one device, one private memory, or one root credential.

The design requires:

- named owner and successor roles;
- institutional accounts where appropriate;
- documented environment inventory;
- independent recovery paths;
- least-capability role transfer;
- provider export and migration procedures;
- separation of domain identities from provider identities;
- periodic founder-absence testing; and
- revocation of predecessor access after transition.

## Evidence required before an environment control is called deployed

A deployed claim requires reviewed evidence for the exact environment and scope, including:

- environment inventory and owner roles;
- provider account or equivalent administrative separation;
- trusted environment identity;
- key, secret, certificate, and workload-identity separation;
- database, object, queue, cache, search, analytics, log, and backup separation;
- public and private origin review;
- ingress and egress policy;
- domain, cookie, session, callback, and browser-policy tests;
- CI and preview secret-isolation tests;
- synthetic-only non-production tests;
- immutable artifact and deployment-target verification;
- cross-environment denial tests;
- administrative-origin and operator-access tests;
- environment compromise and credential-rotation exercise;
- teardown exercise;
- provider-replacement and founder-absence evidence;
- independent review appropriate to consequence; and
- residual-risk ownership.

A provider project name, a separate URL, a dashboard screenshot, or a configuration diagram alone is insufficient.

## Current control status

At this revision:

- environment-isolation controls are **required and designed**;
- public repository, CI, local contributor, and preview boundaries remain public or synthetic-only;
- the current public website and bounded signup adapter do not require public databases, queues, object stores, analytics, or administrative services;
- no production protected-data environment is represented as active;
- no private product origin, administrative service, or production provider is selected;
- no control is independently reviewed; and
- production-facing residual risks remain production-blocking.

## Revalidation triggers

Revalidate this design when:

- an environment or provider account is created, removed, combined, migrated, restored, or compromised;
- production, staging, preview, analytics, research, administrative, or recovery topology changes;
- a new database, object store, queue, cache, index, model, connector, log sink, analytics service, backup, or administrative tool is introduced;
- a public or private origin, domain, cookie, session, callback, certificate, or network path changes;
- CI permissions, workflows, runners, artifacts, or deployment behavior change;
- a protected-data exception for non-production is proposed;
- provider ownership or founder access changes; or
- an incident or independent review identifies a cross-environment path.

## Public-information boundary

This public design contains safe environment classes and control objectives only.

Do not publish:

- private origins, internal hostnames, IP ranges, network maps, provider account identifiers, or administrative paths;
- production configuration, firewall rules, access maps, or recovery instructions;
- secrets, keys, certificates, tokens, or private service identities;
- unredacted environment inventories, logs, screenshots, or incident evidence;
- precise detection thresholds or bypass details; or
- information that materially enables cross-environment access.

Protected evidence belongs in an authorized private system. Public artifacts may contain reviewed, minimized institutional derivatives.
