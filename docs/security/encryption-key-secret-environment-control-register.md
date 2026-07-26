# Encryption, Key, Secret, and Environment Control Register

[Security architecture](README.md) · [Encryption and key-management baseline](encryption-and-key-management-baseline.md) · [Secret-management policy](secret-management-policy.md) · [Environment isolation design](environment-isolation-and-private-origin-design.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent specialist review pending  
**Workstream:** 5.7  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** control objectives and evidence expectations only; no production cryptographic, secret, environment, network, storage, deployment, or administrative control is represented as deployed

## Purpose

This register assigns stable `CTL-KSE-*` identities to the encryption, key-management, secret-management, and environment-isolation requirements defined in workstream 5.7.

The controls refine `THR-012`, `THR-016`, and `THR-028` through `THR-035` without replacing the integrated `THR-*` or `RSK-*` identities.

Every record preserves:

- control class;
- current status;
- protected assets and properties;
- required behavior;
- evidence needed before a deployed claim;
- owner or future owner role;
- residual risk; and
- revalidation trigger.

Unless stated otherwise, every control is **required and designed**, not implemented, independently reviewed, deployed, or operationally verified.

## Encryption and cryptographic-boundary controls

### `CTL-KSE-001` — Minimize and classify before encryption

- **Class:** preventive and limiting
- **Protects:** all protected and restricted assets; confidentiality, purpose limitation, deletion, and portability
- **Requirement:** classify the information, authority, purpose, recipient, lifecycle, and required representations before selecting encryption. Remove unnecessary fields before encryption or retention.
- **Evidence before deployed:** field and flow inventory, minimization review, storage and logging allowlists, deletion mapping.
- **Owner:** future privacy, domain, and security owners.
- **Residual risk:** encrypted overcollection remains overcollection and may still be exposed to authorized services.
- **Revalidate:** every new field, asset, flow, log, export, backup, or provider.

### `CTL-KSE-002` — Authenticated protection in transit

- **Class:** preventive and detective
- **Protects:** private client, service, provider, administrative, connector, and recovery traffic
- **Requirement:** use an approved authenticated secure channel, reject downgrade and invalid service identity, and preserve authorization outside the transport layer.
- **Evidence before deployed:** transport configuration, certificate or workload-identity tests, downgrade rejection, rotation and expiry tests.
- **Owner:** future infrastructure and security owners.
- **Residual risk:** protected transport does not prevent misuse by an authorized or compromised endpoint.
- **Revalidate:** protocol, certificate, domain, proxy, provider, or service-identity change.

### `CTL-KSE-003` — Service-to-service identity independent from network location

- **Class:** preventive
- **Protects:** private origins, domain services, queues, workers, key and secret services
- **Requirement:** authenticate each workload or service explicitly. Internal addresses, provider projects, and private networks do not grant service trust or domain authority.
- **Evidence before deployed:** service-identity inventory, denied unauthenticated and wrong-environment calls, identity rotation tests.
- **Owner:** future infrastructure, identity, and service owners.
- **Residual risk:** compromised service identity may still act within its allowed capability.
- **Revalidate:** new service, network, workload platform, or trust path.

### `CTL-KSE-004` — Structured-store encryption boundary

- **Class:** preventive and limiting
- **Protects:** `AST-005` through `AST-014`, `AST-017`, `AST-019`, and `AST-023`
- **Requirement:** encrypt protected structured stores while preserving tenant isolation, domain authorization, correction, export, deletion, and provider replacement.
- **Evidence before deployed:** storage configuration, key boundary, plaintext-path review, backup and replica coverage, access tests.
- **Owner:** future database, domain, and security owners.
- **Residual risk:** database encryption may not protect against broad application, operator, snapshot, or query access.
- **Revalidate:** database, replica, migration, field-level protection, or provider change.

### `CTL-KSE-005` — Source and object encryption boundary

- **Class:** preventive and limiting
- **Protects:** `AST-008`, `AST-009`, `AST-015`, `AST-016`, and source-derived artifacts
- **Requirement:** encrypt raw sources, immutable versions, stored representations, attachments, processing outputs, and derivatives separately from public assets and ordinary build systems.
- **Evidence before deployed:** object and representation inventory, key separation, access tests, migration and deletion behavior.
- **Owner:** future source, custody, AI, retrieval, and security owners.
- **Residual risk:** metadata, locators, previews, or provider administration may remain revealing.
- **Revalidate:** object store, media type, processor, derivative, or custody change.

### `CTL-KSE-006` — Queue, cache, temporary, and processing-state protection

- **Class:** preventive, limiting, and corrective
- **Protects:** `AST-012`, `AST-015`, `AST-016`, `AST-018`, temporary processing state
- **Requirement:** minimize and isolate queue payloads, caches, temporary files, workspaces, crash artifacts, and intermediates; encrypt where protected material remains necessary; expire and clean them safely.
- **Evidence before deployed:** payload schemas, retention and cleanup tests, environment and tenant isolation, plaintext spill review, replay denial.
- **Owner:** future infrastructure, execution, connector, AI, and security owners.
- **Residual risk:** runtime memory and provider diagnostics may still expose plaintext.
- **Revalidate:** queue, cache, parser, worker, scheduler, or runtime change.

### `CTL-KSE-007` — Protected evidence minimization before encryption

- **Class:** preventive and limiting
- **Protects:** `AST-013`, `AST-014`, logs, traces, metrics, errors, and diagnostics
- **Requirement:** use separate field allowlists and minimize receipts, audit, logs, traces, metrics, and errors before encryption. Do not create a shadow Chronicle, permission system, identity graph, or unrestricted warehouse.
- **Evidence before deployed:** schema allowlists, sample event review using synthetic data, query and access controls, correction and deletion behavior.
- **Owner:** future receipt, audit, observability, privacy, and security owners.
- **Residual risk:** minimized metadata can still reveal identity, timing, or sensitive relationships.
- **Revalidate:** event schema, query capability, retention, or audience change.

### `CTL-KSE-008` — Export-artifact protection and expiry

- **Class:** preventive, limiting, and corrective
- **Protects:** `AST-007` through `AST-013`, export packages and delivery capabilities
- **Requirement:** protect each export artifact with a scoped, independent, expiring delivery boundary; never embed reusable canonical-store keys or secrets in clients, links, receipts, or logs.
- **Evidence before deployed:** export-key and token design, delivery tests, expiry and revocation tests, artifact deletion evidence.
- **Owner:** future export, House of Keys, identity, and security owners.
- **Residual risk:** a recipient may copy plaintext after valid delivery.
- **Revalidate:** export format, delivery channel, recipient, or retention change.

### `CTL-KSE-009` — Backup, replica, snapshot, and archive encryption

- **Class:** preventive and recovery
- **Protects:** `AST-022` and every backed-up protected asset
- **Requirement:** encrypt backups and replicas with a key and credential boundary separated from ordinary live-service access and appropriate to the recovery failure domain.
- **Evidence before deployed:** backup inventory, key separation, access tests, restoration test, retention and retirement evidence.
- **Owner:** future reliability, recovery, key, and security owners.
- **Residual risk:** backup keys or provider administration can become concentrated high-value targets.
- **Revalidate:** backup scope, provider, region, key, retention, or restore process.

## Key hierarchy and custody controls

### `CTL-KSE-010` — Envelope key hierarchy

- **Class:** preventive and limiting
- **Protects:** all encrypted protected assets
- **Requirement:** separate institutional trust roots, environment key-encryption boundaries, domain or purpose keys, data-encryption keys, signing keys, transport identities, export keys, and backup or recovery keys.
- **Evidence before deployed:** versioned hierarchy, key-class inventory, denied cross-class use, provider mapping.
- **Owner:** future key-management and security owners.
- **Residual risk:** hierarchy errors can create large blast radius or unrecoverable loss.
- **Revalidate:** new key class, provider, data class, or cryptographic purpose.

### `CTL-KSE-011` — Environment key separation

- **Class:** preventive
- **Protects:** `THR-029`; production and every lower-trust environment
- **Requirement:** a key valid in local, CI, preview, development, test, staging, analytics, research, administration, or recovery must not decrypt or sign for production, and vice versa.
- **Evidence before deployed:** cross-environment denial tests, separate inventories and access policies, trusted environment binding.
- **Owner:** future key, infrastructure, and security owners.
- **Residual risk:** provider super-administration may still span environments unless separately controlled.
- **Revalidate:** environment, provider account, hierarchy, or administrative role change.

### `CTL-KSE-012` — Domain and purpose key separation

- **Class:** preventive and limiting
- **Protects:** identity, Chronicle, source, House of Keys, receipt, audit, connector, export, analytics, research, and backup boundaries
- **Requirement:** use separate key-encryption boundaries where consequence, access concentration, deletion, recovery, or provider exposure requires it. No provider default may silently establish the final boundary.
- **Evidence before deployed:** blast-radius analysis, domain mapping, denied cross-purpose use, recovery and portability review.
- **Owner:** future domain, privacy, key, and security owners.
- **Residual risk:** excessive granularity can harm availability and migration; insufficient granularity amplifies compromise.
- **Revalidate:** domain, purpose, recipient, retention, or access-pattern change.

### `CTL-KSE-013` — Data-key context binding

- **Class:** preventive and detective
- **Protects:** ciphertext substitution, cross-tenant and cross-resource misuse
- **Requirement:** bind each data-encryption operation to environment, purpose or asset class, key version, and authenticated resource context sufficient to reject incompatible substitution.
- **Evidence before deployed:** positive and negative cryptographic-operation tests, tenant and resource substitution tests.
- **Owner:** future cryptographic-service and domain owners.
- **Residual risk:** incorrect contextual metadata may consistently bind data to the wrong resource.
- **Revalidate:** serialization, resource identity, tenant, or operation-contract change.

### `CTL-KSE-014` — Separation of encryption, signing, integrity, transport, and authentication keys

- **Class:** preventive
- **Protects:** keys, receipts, releases, transport, service identity, and evidence semantics
- **Requirement:** one key class may not be silently reused for incompatible encryption, signing, key wrapping, service authentication, transport, or token functions.
- **Evidence before deployed:** key-purpose policy, denied incompatible operations, signature and verification contract review.
- **Owner:** future key, release, receipt, infrastructure, and security owners.
- **Residual risk:** provider abstractions may hide key reuse or shared root trust.
- **Revalidate:** signing, certificate, token, receipt, or release change.

### `CTL-KSE-015` — Approved key generation and provisioning

- **Class:** preventive
- **Protects:** key unpredictability, custody, and environment separation
- **Requirement:** generate key material through an approved cryptographic mechanism; prohibit human-selected private material, copied examples, public generation paths, and undocumented provider defaults.
- **Evidence before deployed:** provisioning records without key values, policy review, environment and purpose metadata.
- **Owner:** future key-management owner.
- **Residual risk:** compromised provider or provisioning identity may create weak or attacker-controlled keys.
- **Revalidate:** provider, generation mechanism, role, or key-class change.

### `CTL-KSE-016` — No plaintext private-key export or informal distribution

- **Class:** preventive
- **Protects:** `AST-020`, high-consequence key material
- **Requirement:** application and human workflows invoke bounded cryptographic operations rather than retrieve reusable raw private keys where feasible; prohibit copy-and-paste, email, chat, issue, and file-based distribution.
- **Evidence before deployed:** export policy, denied retrieval tests, access review, incident path.
- **Owner:** future key, security, and operations owners.
- **Residual risk:** some migration or recovery classes may require exceptional handling and specialist review.
- **Revalidate:** migration, recovery, provider export, or new consumer requirement.

### `CTL-KSE-017` — Workload-mediated cryptographic operations

- **Class:** preventive and detective
- **Protects:** cryptographic service use and plaintext release
- **Requirement:** bind cryptographic operation requests to service identity, environment, key identity and version, operation type, asset or purpose class, resource context, correlation identity, and safe failure.
- **Evidence before deployed:** policy and operation logs without key material, wrong-service and wrong-environment denial tests.
- **Owner:** future cryptographic-service, identity, and domain owners.
- **Residual risk:** an authorized compromised service may misuse permitted operations.
- **Revalidate:** service identity, operation class, resource context, or key policy change.

### `CTL-KSE-018` — Key inventory, version, state, and dependency register

- **Class:** detective and governance
- **Protects:** rotation, revocation, recovery, destruction, portability, and accountability
- **Requirement:** maintain non-secret metadata for key identity, class, purpose, environment, provider reference, version, state, owner, consumers, dependencies, recovery class, and review trigger.
- **Evidence before deployed:** complete reconciled inventory, orphan and unknown-state detection.
- **Owner:** future key-management and security owners.
- **Residual risk:** inventory can become stale or reveal sensitive architecture if overexposed.
- **Revalidate:** every key lifecycle event and dependent-service change.

### `CTL-KSE-019` — Least privilege and separation of key duties

- **Class:** preventive and deterrent
- **Protects:** key administration, use, recovery, migration, audit, and destruction
- **Requirement:** distinguish policy administration, operation invocation, deployment, audit, recovery, incident containment, migration, and destruction. Ordinary deployment access must not automatically include key export or destruction.
- **Evidence before deployed:** role matrix, access tests, review of shared and inherited privileges.
- **Owner:** future security, key, operations, and governance owners.
- **Residual risk:** provider root roles and organizational owners may retain broad latent power.
- **Revalidate:** personnel, role, provider, account, or incident change.

### `CTL-KSE-020` — Multi-party control for high-consequence key actions

- **Class:** preventive and deterrent
- **Protects:** institutional roots, recovery, provider migration, and destructive actions
- **Requirement:** high-consequence key export, recovery, trust-root change, broad disablement, or destruction requires multi-party or independently reviewable control and cannot depend solely on one founder.
- **Evidence before deployed:** approval workflow, founder-absence exercise, emergency and succession test.
- **Owner:** future institutional governance and security owners.
- **Residual risk:** collusion, unavailable approvers, or captured governance may still fail.
- **Revalidate:** leadership, provider, recovery, or emergency-process change.

### `CTL-KSE-021` — Key rotation and predecessor retirement

- **Class:** preventive and corrective
- **Protects:** aging, migrated, exposed, or superseded keys
- **Requirement:** define predecessor and successor versions, activation, cutoff, rewrap or re-encryption, service rollout, stale-consumer rejection, rollback limits, old-key dependencies, and completion evidence.
- **Evidence before deployed:** scheduled and triggered rotation tests, decrypt-only predecessor behavior, dependency reconciliation.
- **Owner:** future key, infrastructure, and domain owners.
- **Residual risk:** long-lived backups, exports, clients, or jobs may retain predecessor dependence.
- **Revalidate:** every rotation, migration, compromise, or algorithm-policy change.

### `CTL-KSE-022` — Key compromise containment and revocation

- **Class:** containment, corrective, and restorative
- **Protects:** data confidentiality, service identity, signing trust, deployments, receipts, and backups
- **Requirement:** suspend or revoke compromised keys, stop new operations, rotate dependent credentials, identify affected data and artifacts, rewrap or re-encrypt where useful, invalidate stale systems, preserve evidence, and record residual harm.
- **Evidence before deployed:** compromise exercise, dependency inventory, alerting, post-containment validation.
- **Owner:** future security, incident, key, infrastructure, and domain owners.
- **Residual risk:** prior plaintext, signatures, recipient copies, or provider logs may remain.
- **Revalidate:** every exposure, anomaly, unauthorized use, or provider compromise.

### `CTL-KSE-023` — Key backup and recovery separation

- **Class:** recovery and preventive
- **Protects:** availability without exposing live keys
- **Requirement:** separate recovery material from ordinary service operation and the primary failure domain; use least-capability and multi-party controls; test authorized recovery with synthetic evidence.
- **Evidence before deployed:** recovery inventory, failure-domain review, restore test, founder and provider replacement test.
- **Owner:** future recovery, key, reliability, and security owners.
- **Residual risk:** recovery material can become a concentrated compromise target or remain unavailable during an incident.
- **Revalidate:** recovery objective, provider, region, key hierarchy, or ownership change.

### `CTL-KSE-024` — Key destruction and bounded cryptographic-erasure claims

- **Class:** corrective and governance
- **Protects:** deletion rights, retention truth, availability, and records obligations
- **Requirement:** resolve dependencies, backups, recovery copies, exports, holds, portability, and mistaken-destruction risk before key destruction. Limit claims to identified controlled ciphertext and key copies.
- **Evidence before deployed:** destruction authorization, inventory reconciliation, completion record, residual-copy and residual-harm statement.
- **Owner:** future key, privacy, legal, records, recovery, and domain owners.
- **Residual risk:** uncontrolled plaintext, exports, screenshots, recipients, or provider copies may persist.
- **Revalidate:** every destruction, deletion mechanism, legal hold, or recovery change.

### `CTL-KSE-025` — Cryptographic agility and provider replacement

- **Class:** preventive, corrective, and institutional
- **Protects:** long-term confidentiality, portability, continuity, and provider independence
- **Requirement:** version cryptographic suites and provider mappings, reject unsupported or downgraded versions, support bounded predecessor-successor migration, preserve export and restore compatibility, and separate project identity from provider identity.
- **Evidence before deployed:** migration and rollback exercise, provider-exit plan, unsupported-version tests.
- **Owner:** future key, architecture, infrastructure, and institutional owners.
- **Residual risk:** legacy ciphertext, provider features, or unavailable migration tooling may create lock-in.
- **Revalidate:** provider, algorithm, protocol, region, API, or contract change.

## Secret-management controls

### `CTL-KSE-026` — Secret inventory and ownership

- **Class:** detective and governance
- **Protects:** all service, connector, deployment, administrative, and recovery credentials
- **Requirement:** maintain non-secret metadata for identity, class, purpose, environment, owner, consumers, issuer, scope, lifecycle, rotation, dependencies, and evidence.
- **Evidence before deployed:** reconciled inventory, orphan detection, owner and backup-owner review.
- **Owner:** future security and service owners.
- **Residual risk:** unknown secrets and undocumented provider credentials may remain outside inventory.
- **Revalidate:** every issuance, access, rotation, provider, service, or personnel change.

### `CTL-KSE-027` — Unique, approved secret generation

- **Class:** preventive
- **Protects:** secret unpredictability and blast radius
- **Requirement:** generate unique secrets per environment and purpose through an approved mechanism; prohibit project-name, personal-knowledge, copied, reused, or human-selected production service values.
- **Evidence before deployed:** issuer configuration, uniqueness and scope review without values.
- **Owner:** future security and service owners.
- **Residual risk:** compromised issuer or low-entropy provider formats may weaken secrets.
- **Revalidate:** secret class, issuer, provider, or generation method change.

### `CTL-KSE-028` — Approved private secret storage

- **Class:** preventive
- **Protects:** `THR-028`, public systems, code, logs, prompts, support, and clients
- **Requirement:** store protected secrets in an approved private secret-management boundary; prohibit source code, Git history, issues, docs, ordinary databases, spreadsheets, chat, screenshots, AI context, logs, artifacts, and client bundles.
- **Evidence before deployed:** storage configuration without values, repository and artifact scans, access tests.
- **Owner:** future security, infrastructure, and service owners.
- **Residual risk:** provider administration and runtime retrieval remain exposure paths.
- **Revalidate:** storage provider, secret class, access policy, or runtime change.

### `CTL-KSE-029` — Short-lived, scoped workload issuance

- **Class:** preventive and limiting
- **Protects:** service and automation credentials
- **Requirement:** prefer short-lived workload identity; otherwise issue the minimum secret to the exact service, environment, scope, and lifetime through an attributable delivery path.
- **Evidence before deployed:** token lifetime and scope tests, wrong-service and wrong-environment denial, revocation test.
- **Owner:** future identity, infrastructure, and service owners.
- **Residual risk:** stolen short-lived credentials may still be abused before expiry.
- **Revalidate:** consumer, issuer, scope, lifetime, or workload platform change.

### `CTL-KSE-030` — No confidential secret in public or downloadable clients

- **Class:** preventive
- **Protects:** public website, browser, mobile, static assets, and client bundles
- **Requirement:** treat every client-visible value as public; do not embed service secrets, database credentials, signing material, or unrestricted provider capabilities in browser or mobile code.
- **Evidence before deployed:** built-artifact inspection, client network and capability tests, secret scans.
- **Owner:** future client, website, security, and service owners.
- **Residual risk:** public identifiers may still enable quota, billing, or abuse impact if poorly restricted.
- **Revalidate:** client build, provider SDK, public API, or configuration change.

### `CTL-KSE-031` — Synthetic-only local secret boundary

- **Class:** preventive
- **Protects:** production secrets and data from developer machines
- **Requirement:** use ignored local environment files only for non-production credentials, placeholders, emulators, or isolated test accounts; prohibit production credentials and protected data on contributor machines.
- **Evidence before deployed:** `.gitignore` and example review, local setup documentation, device and offboarding procedures.
- **Owner:** repository and future developer-experience owners.
- **Residual risk:** shell history, screenshots, backups, and developer tools may still capture local credentials.
- **Revalidate:** local tooling, onboarding, provider, or developer-access change.

### `CTL-KSE-032` — CI, fork, and preview secret isolation

- **Class:** preventive and limiting
- **Protects:** `AST-021`, production credentials, providers, and private origins
- **Requirement:** untrusted pull-request and preview code receives no production or privileged secrets; separate privileged jobs, use least permissions and short-lived identity, and keep previews synthetic-only.
- **Evidence before deployed:** fork and branch tests, workflow permission review, preview build and environment inspection.
- **Owner:** repository, release, infrastructure, and security owners.
- **Residual risk:** workflow, action, cache, or dependency compromise may target privileged post-merge jobs.
- **Revalidate:** workflow, action, runner, trigger, permission, or preview change.

### `CTL-KSE-033` — Secret redaction and indirect exposure-path controls

- **Class:** preventive and detective
- **Protects:** prompts, responses, logs, traces, errors, CI, previews, caches, queues, snapshots, support, and provider dashboards
- **Requirement:** prohibit raw secret values, test redaction, minimize diagnostic output, and inspect indirect paths without copying candidate values into evidence.
- **Evidence before deployed:** synthetic redaction tests, field review, provider logging and retention configuration.
- **Owner:** future observability, AI, CI, support, security, and service owners.
- **Residual risk:** novel, encoded, split, derived, or transformed secrets may evade detection.
- **Revalidate:** secret format, logging, error, AI, provider, or support change.

### `CTL-KSE-034` — Layered secret scanning and push prevention

- **Class:** preventive and detective
- **Protects:** repository, history, artifacts, containers, previews, logs, and releases
- **Requirement:** use layered local, repository, CI, history, artifact, and provider scanning appropriate to active systems; resolve false positives without weakening global protections or publishing candidate material.
- **Evidence before deployed:** scan coverage, test fixtures using invalid synthetic values, response procedure, exception register.
- **Owner:** repository and security owners.
- **Residual risk:** unsupported and novel secrets remain possible; scanners can create false assurance.
- **Revalidate:** scanner, repository, artifact, provider, secret class, or workflow change.

### `CTL-KSE-035` — Secret rotation, revocation, and decommissioning

- **Class:** preventive, corrective, and restorative
- **Protects:** aging, exposed, over-scoped, or unused secrets
- **Requirement:** rotate on schedule and consequence triggers, revoke predecessors, remove service bindings, validate consumer migration, clean controlled copies, and prevent restoration or rollback from silently recreating the secret.
- **Evidence before deployed:** rotation and revocation tests, predecessor-denial test, decommission record.
- **Owner:** future service, provider, infrastructure, and security owners.
- **Residual risk:** uncontrolled copies and historic logs may persist after revocation.
- **Revalidate:** every rotation, exposure, scope, personnel, provider, or consumer change.

### `CTL-KSE-036` — Individual, attributable human secret access

- **Class:** preventive and deterrent
- **Protects:** administrative, deployment, provider, recovery, and connector credentials
- **Requirement:** prohibit shared accounts and indefinitely shared secrets; grant individual least-capability, time-bounded access; revoke access when task, role, contract, or relationship ends.
- **Evidence before deployed:** access roster, shared-account check, offboarding and contractor-removal test.
- **Owner:** future security, operations, governance, and provider owners.
- **Residual risk:** authorized insiders and provider support may still misuse access.
- **Revalidate:** every personnel, contractor, provider, or role change.

### `CTL-KSE-037` — Emergency and break-glass secret control

- **Class:** containment, deterrent, and governance
- **Protects:** emergency capabilities without ordinary authority expansion
- **Requirement:** issue named, stronger-authenticated, narrowly scoped, short-lived emergency credentials with protected audit, automatic or procedural expiry, post-use review, and revocation.
- **Evidence before deployed:** exercise, expiry test, scope test, post-use review, founder-absence behavior.
- **Owner:** future incident, security, governance, and service owners.
- **Residual risk:** emergency credentials concentrate power and may be unavailable or abused under stress.
- **Revalidate:** emergency capability, approver, provider, or incident-process change.

## Environment-isolation controls

### `CTL-KSE-038` — Trusted environment identity and fail-closed binding

- **Class:** preventive
- **Protects:** every environment, service, data store, key, secret, queue, session, and deployment
- **Requirement:** derive environment identity from trusted infrastructure or deployment configuration; reject absent, conflicting, caller-selected, wrong-environment, or unsupported identity.
- **Evidence before deployed:** cross-environment negative tests, service and resource binding tests.
- **Owner:** future infrastructure, deployment, identity, and security owners.
- **Residual risk:** misconfigured trusted infrastructure may consistently assert the wrong environment.
- **Revalidate:** environment, deployment platform, configuration, or service-identity change.

### `CTL-KSE-039` — Provider-account and administrative-resource separation

- **Class:** preventive and limiting
- **Protects:** `THR-029`; keys, secrets, data, deployment, administration, billing, and recovery
- **Requirement:** use separate provider accounts, projects, subscriptions, organizations, or equivalent controls where shared administration would permit silent cross-environment access.
- **Evidence before deployed:** account and role inventory, inherited-access review, cross-environment denial tests.
- **Owner:** future infrastructure, security, finance, and institutional owners.
- **Residual risk:** provider organization owners and support may retain broad access.
- **Revalidate:** provider, ownership, billing, project, or administrative-role change.

### `CTL-KSE-040` — Synthetic-only non-production default

- **Class:** preventive and constitutional
- **Protects:** production personal data, contributors, previews, CI, development, test, and staging
- **Requirement:** local, contributor, CI, preview, development, test, and staging environments use PUBLIC or synthetic information only. No production-derived protected-data exception is currently authorized.
- **Evidence before deployed:** fixture and data-source review, production-access denial, environment scans, teardown tests.
- **Owner:** repository, privacy, infrastructure, and environment owners.
- **Residual risk:** manual exports, screenshots, support data, and provider copies can bypass standard pipelines.
- **Revalidate:** any non-production data-source or exception proposal.

### `CTL-KSE-041` — Private origin and administrative-surface isolation

- **Class:** preventive and limiting
- **Protects:** `TZ-S0` through `TZ-S9`, databases, object stores, queues, keys, secrets, analytics, research, administration, and recovery
- **Requirement:** public origins expose only public or bounded public operations; private APIs require authentication and policy; administrative and recovery interfaces use distinct restricted origins and identities; databases and internal services are not directly public.
- **Evidence before deployed:** origin inventory, exposure scan, authentication and authorization tests, hidden-path prohibition review.
- **Owner:** future infrastructure, application, security, and administration owners.
- **Residual risk:** internet-addressable provider endpoints and misconfiguration may remain exposed.
- **Revalidate:** route, domain, provider, origin, network, or administrative-tool change.

### `CTL-KSE-042` — Network egress, ingress, and service-trust restrictions

- **Class:** preventive and limiting
- **Protects:** private services, AI, MCP, parsers, connectors, keys, secrets, and administration
- **Requirement:** use approved ingress, service identity, deny-by-default or equivalent private access, and constrained egress for high-consequence services; prohibit unrestricted proxy capabilities.
- **Evidence before deployed:** network and service-call inventory, denied unauthorized ingress and egress tests, provider endpoint review.
- **Owner:** future network, infrastructure, AI, connector, and security owners.
- **Residual risk:** allowed external destinations and provider control planes may still be compromised.
- **Revalidate:** network, provider, egress destination, service, or tool change.

### `CTL-KSE-043` — Environment-specific domains, cookies, sessions, and callbacks

- **Class:** preventive
- **Protects:** browser and mobile sessions, OAuth, previews, public and private origins
- **Requirement:** separate domains or equivalent boundaries, cookies, sessions, storage, callbacks, redirects, OAuth clients, certificates, and browser policy by environment; reject production credentials in non-production.
- **Evidence before deployed:** origin, cookie, callback, redirect, CORS, CSP, and session negative tests.
- **Owner:** future client, identity, application, infrastructure, and security owners.
- **Residual risk:** browser extensions, compromised clients, and broad third-party SDKs may still cross boundaries.
- **Revalidate:** domain, cookie, client, OAuth, callback, or browser-policy change.

### `CTL-KSE-044` — Immutable artifact promotion and environment-specific configuration

- **Class:** preventive and detective
- **Protects:** release integrity, production secrets, build provenance, and rollback
- **Requirement:** build and identify reviewed immutable artifacts, promote the same artifact, inject environment-specific configuration and secrets separately, verify target and deploy identity, and preserve rollback and revocation.
- **Evidence before deployed:** artifact identity and provenance, promotion test, target-environment verification, rollback exercise.
- **Owner:** repository, release, infrastructure, and security owners.
- **Residual risk:** artifact, registry, deployment identity, or environment configuration may still be compromised.
- **Revalidate:** build, registry, deployment, configuration, or release-process change.

### `CTL-KSE-045` — Environment-specific data, queue, cache, log, and provider resources

- **Class:** preventive and limiting
- **Protects:** databases, objects, queues, caches, indexes, analytics, logs, connectors, models, notifications, and backups
- **Requirement:** separate resources and credentials by environment; prohibit lower-trust access to production resources and direct production-data promotion downward.
- **Evidence before deployed:** resource inventory, cross-environment denial tests, data-source and backup review.
- **Owner:** future infrastructure, domain, observability, AI, connector, and recovery owners.
- **Residual risk:** provider super-administration, misrouting, and shared external systems may still connect environments.
- **Revalidate:** resource, provider, credential, route, or topology change.

### `CTL-KSE-046` — Isolated analytics, research, administration, and recovery environments

- **Class:** preventive and governance
- **Protects:** personal data from shadow stores, unrestricted queries, and exceptional access
- **Requirement:** personal analytics, research, administration, security, and recovery use separate purpose, identity, resources, keys, secrets, access, logs, retention, and exit behavior; no direct unrestricted production query path.
- **Evidence before deployed:** environment and purpose inventory, access and query tests, retention and teardown plan, specialist review.
- **Owner:** future analytics, research, security, recovery, privacy, and governance owners.
- **Residual risk:** extracts and outputs can remain identifying or escape correction and deletion controls.
- **Revalidate:** analytical purpose, study, operator tool, recovery activation, or data-product change.

### `CTL-KSE-047` — Environment compromise, clean rebuild, and teardown

- **Class:** containment, corrective, recovery, and restorative
- **Protects:** every environment and connected dependency
- **Requirement:** contain compromised services and access, rotate environment credentials, review cross-environment paths, rebuild or restore from accepted evidence, validate artifacts and configuration, and fully decommission data, resources, identities, domains, and providers when retired.
- **Evidence before deployed:** compromise and rebuild exercise, teardown checklist, post-clean validation, residual-copy register.
- **Owner:** future incident, infrastructure, security, recovery, and environment owners.
- **Residual risk:** persistent provider, dependency, endpoint, or credential compromise may survive reconstruction.
- **Revalidate:** every compromise, major migration, teardown, or recovery.

### `CTL-KSE-048` — Founder- and provider-independent continuity

- **Class:** institutional and recovery
- **Protects:** keys, secrets, environments, releases, DNS, backups, administration, and incident response
- **Requirement:** use named owner and successor roles, institutional access where appropriate, documented inventories, independent recovery paths, provider export and migration, founder-absence tests, and predecessor revocation after transition.
- **Evidence before deployed:** succession and provider-exit records, founder-absence exercise, role-transfer and revocation test.
- **Owner:** founding steward and future institutional governance, security, and infrastructure owners.
- **Residual risk:** early-phase key-person, legal-entity, billing, and provider ownership gaps remain unresolved institutional gates.
- **Revalidate:** ownership, leadership, entity, provider, billing, or recovery change.

### `CTL-KSE-049` — Truthful deployed-control evidence gate

- **Class:** governance and detective
- **Protects:** public trust, release decisions, risk acceptance, and control-status truth
- **Requirement:** do not call encryption, key, secret, environment, network, private-origin, or deployment controls deployed without scope-specific implementation evidence, tests, owner, review, monitoring, incident behavior, and residual-risk disposition.
- **Evidence before deployed:** complete control-evidence package and applicable independent review.
- **Owner:** future security owner, control owner, release owner, and accountable governance reviewer.
- **Residual risk:** evidence can be incomplete, stale, selectively interpreted, or invalidated by provider and implementation changes.
- **Revalidate:** every release, material configuration change, incident, review finding, or public capability claim.

## Control-to-threat mapping

Primary mappings:

- `THR-012`: `CTL-KSE-005`, `CTL-KSE-013`, `CTL-KSE-014`, `CTL-KSE-017`, `CTL-KSE-025`;
- `THR-016`: `CTL-KSE-006` through `CTL-KSE-009`, `CTL-KSE-023`, `CTL-KSE-024`, `CTL-KSE-045`, `CTL-KSE-047`;
- `THR-028`: `CTL-KSE-010` through `CTL-KSE-037`;
- `THR-029`: `CTL-KSE-011`, `CTL-KSE-032`, and `CTL-KSE-038` through `CTL-KSE-047`;
- `THR-030`: `CTL-KSE-032`, `CTL-KSE-034`, `CTL-KSE-044`, `CTL-KSE-045`, `CTL-KSE-049` plus workstream 5.6 supply-chain controls;
- `THR-031`: `CTL-KSE-003`, `CTL-KSE-006`, `CTL-KSE-038`, `CTL-KSE-042`, `CTL-KSE-045` plus workstream 5.5 queue controls;
- `THR-032`: `CTL-KSE-019` through `CTL-KSE-025`, `CTL-KSE-036`, `CTL-KSE-037`, `CTL-KSE-042`, `CTL-KSE-047`;
- `THR-033`: `CTL-KSE-009`, `CTL-KSE-011`, `CTL-KSE-023`, `CTL-KSE-045`, `CTL-KSE-046`; and
- `THR-035`: `CTL-KSE-023`, `CTL-KSE-025`, `CTL-KSE-044`, `CTL-KSE-047`, `CTL-KSE-048` plus workstream 5.8 availability controls.

## Current disposition

All `CTL-KSE-*` controls are required and designed at the internal architecture level.

No production-facing risk is accepted by this register. In particular:

- `RSK-028` remains **MITIGATION REQUIRED — PRODUCTION-BLOCKING**;
- `RSK-029` remains **MITIGATION REQUIRED — PRODUCTION-BLOCKING**;
- `RSK-030` remains **MITIGATION REQUIRED — PILOT-BLOCKING**;
- backup, recovery, destructive compromise, and availability risks remain open for workstream 5.8;
- independent specialist review is absent; and
- current public repository and website operation remains bounded to public or synthetic development plus the purpose-limited signup adapter.

## Public-information boundary

This public register contains safe control objectives, owners, evidence classes, and residual-risk statements only.

Do not publish raw keys, secrets, provider identifiers, private origins, network maps, production configuration, access lists, recovery material, unredacted evidence, or operational bypass details.
