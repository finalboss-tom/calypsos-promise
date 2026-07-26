# Secret-Management Policy

[Security architecture](README.md) · [Encryption and key-management baseline](encryption-and-key-management-baseline.md) · [Security policy](../../SECURITY.md) · [Publication and confidentiality](../policies/publication-and-confidentiality.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, legal, and operational review pending  
**Workstream:** 5.7  
**Revision:** 1  
**Information class:** PUBLIC policy and synthetic-only scope  
**Production boundary:** policy requirements only; no production secret manager, workload-identity provider, connector credential, database credential, deployment credential, recovery secret, or production service is selected, authorized, or represented as deployed

## Purpose

This policy defines how Calypso’s Promise must create, classify, store, distribute, use, rotate, revoke, recover, retire, scan for, and respond to application and operational secrets.

It implements the public-information boundary that credentials, keys, tokens, recovery material, private certificates, and production access never belong in public repositories, branches, issues, pull requests, logs, previews, fixtures, or ordinary contributor systems.

It refines `THR-028`, `THR-029`, `THR-030`, and `THR-046`, with particular protection for `AST-004`, `AST-005`, `AST-018`, `AST-020`, `AST-021`, and `AST-022`.

## Governing rules

1. **A secret is a capability, not authority.** Possessing a secret may allow a technical operation. It does not create Chronicle control, permission, recipient authority, confirmation authority, or institutional legitimacy.
2. **Secrets are private by construction.** A value must not be placed in a public system with the expectation that it can be removed later.
3. **Short-lived and workload-bound is preferred.** Reusable human-distributed credentials are a last resort, not a default.
4. **One secret has one bounded purpose.** A secret may not silently span environments, providers, services, roles, or unrelated operations.
5. **Clients are untrusted for secret custody.** Browser, mobile, downloadable, public JavaScript, and public repository code cannot safely hold a confidential service secret.
6. **Environment variables are a delivery mechanism, not a complete secret-management system.** Storage, issuance, access, rotation, revocation, logging, and evidence remain separate requirements.
7. **Masking is not containment.** Redaction and log masking reduce exposure but do not make a broadly distributed or long-lived secret acceptable.
8. **Deletion is not revocation.** Removing a leaked file, log line, deployment, or commit does not invalidate the exposed capability.
9. **The secret value is never an audit field.** Inventory and evidence use metadata and references, not raw values.
10. **Designed is not deployed.** This document does not claim that a production secret lifecycle exists.

## What is a secret

Secret or security-sensitive capabilities include:

- passwords and passphrases used by services or operators;
- API keys and service tokens;
- OAuth client secrets, access tokens, refresh tokens, and connector credentials;
- database, cache, queue, object-store, analytics, and administrative credentials;
- webhook verification secrets;
- session-signing and cookie-signing secrets;
- private certificates and private signing material;
- deployment and release credentials;
- CI and automation credentials;
- recovery codes, break-glass credentials, and emergency tokens;
- export-delivery or password-reset capabilities;
- private endpoint credentials and origin-authentication tokens;
- encryption keys governed by the key-management baseline; and
- any value whose possession enables unauthorized access, impersonation, decryption, signing, publication, deletion, or administrative action.

## What is not automatically a secret

Some values may be public identifiers rather than secrets, including:

- public keys and public certificates;
- non-sensitive provider project names;
- public website origins;
- schema and contract versions;
- public package names;
- stable project-defined resource identifiers; and
- API identifiers explicitly designed for public clients.

A value is not safe merely because a provider calls it a “public key” or “client key.” Its effective capability, allowed origins, quotas, scopes, abuse impact, and billing exposure must be reviewed.

## Secret inventory record

Every managed secret requires a non-secret metadata record containing:

- stable project secret identity;
- secret class;
- exact purpose;
- environment;
- owning service or role;
- accountable human owner and backup owner role;
- issuing system or provider class;
- allowed consumers;
- allowed operations and scopes;
- creation or issuance time;
- activation and expiry times;
- rotation expectation and next review;
- revocation and incident references;
- storage and delivery mechanism class;
- dependent services, deployments, jobs, callbacks, and integrations;
- evidence status;
- lifecycle state; and
- revalidation trigger.

The inventory must not contain:

- raw secret values;
- reversible encodings of secret values;
- unredacted screenshots;
- private recovery material;
- plaintext environment files;
- copied provider configuration; or
- examples that are valid in any real environment.

## Secret lifecycle

### `requested`

A bounded need is documented with purpose, owner, environment, scope, consumers, lifetime, rotation, revocation, and recovery behavior.

### `approved`

The need and handling design are accepted. No secret value is represented as generated.

### `generated`

The secret exists through an approved private mechanism and has not yet been issued to consumers.

### `stored`

The value is held in an approved secret-storage boundary with access and lifecycle metadata.

### `issued`

A bounded consumer or workload received a usable capability through an approved delivery mechanism.

### `active`

The secret may be used only for its approved purpose, environment, consumers, and lifetime.

### `rotation-due`

The planned or consequence-triggered rotation point has been reached. Continued use requires an explicit transition plan.

### `rotating`

Predecessor and successor coexist during a bounded migration. The state must identify which consumers have moved and when predecessor use stops.

### `revoked`

The issuer or enforcing system no longer accepts the secret. Removing stored copies remains separate cleanup work.

### `compromised`

Exposure or unauthorized use is suspected or confirmed. The secret is unsafe even if the provider still reports it as active.

### `expired`

The accepted lifetime ended. Expiry must be enforced by the validating system rather than inferred from documentation alone.

### `retired`

No approved consumer depends on the secret, and its provider or service binding has been removed.

### `destroyed`

All identified controlled stored copies in scope have been removed after revocation and retirement. This does not prove that no copied value exists elsewhere.

### `unknown`

Inventory, provider, consumer, or usage state cannot be resolved. Unknown does not default to active or safe.

## Creation and generation

Secrets must be generated through an approved mechanism appropriate to the capability and consequence.

Requirements include:

- sufficient unpredictability for the capability class;
- unique value per environment and purpose;
- no reuse between development, test, preview, staging, production, analytics, research, administration, or recovery;
- no reuse between unrelated services or providers;
- no values derived from project names, public identifiers, health facts, or personal knowledge;
- no human-created production service credentials where an automated mechanism is available;
- no copying from examples, documentation, previous incidents, or another project;
- immediate inventory and owner assignment; and
- explicit expiry or review when the issuer supports it.

## Approved storage

Production and other protected-environment secrets must be held in an approved private secret-management boundary or a narrowly reviewed equivalent.

They must not be stored in:

- source code;
- Git history;
- public or private repository files used as ordinary source artifacts;
- issues, pull requests, comments, discussions, wikis, or project boards;
- documentation or examples;
- public campaign or governance ledgers;
- committed `.env` files;
- application databases as unprotected ordinary configuration;
- shared spreadsheets or note systems;
- chat, email, or ticket bodies;
- screenshots or screen recordings;
- build outputs, public artifacts, previews, or downloadable clients;
- AI prompts, retained conversations, model memory, or retrieval corpora;
- ordinary logs, traces, metrics, receipts, or audit event fields; or
- browser storage, mobile bundles, or public JavaScript.

The repository already ignores `.env`, `.env.*`, common private-key extensions, and logs. Ignore rules reduce accidental commits; they are not the full control and do not protect values already copied elsewhere.

## Distribution and runtime delivery

Preferred distribution uses short-lived workload identity or an equivalent mechanism that avoids reusable secret delivery.

Where a stored secret remains necessary:

- consumers receive only the value required for their exact environment and purpose;
- access is attributable to a service or person identity;
- values are retrieved at runtime or injected through an approved path;
- plaintext exposure in process arguments, shell history, debug output, crash dumps, and filesystem snapshots is minimized;
- consumers cannot enumerate unrelated secrets;
- the delivery path has revocation and rotation behavior;
- the value is not returned to callers or clients;
- the service does not echo it in error messages; and
- access evidence records metadata, not secret values.

## Browser and mobile boundary

A browser, mobile client, public JavaScript bundle, static site, or downloadable application must not contain a confidential service secret.

A client-visible value must be treated as public and constrained accordingly through:

- server-side authorization;
- origin and application restrictions where useful;
- quotas and abuse controls;
- non-sensitive scopes;
- no direct database, object-store, queue, key-store, administrative, or unrestricted provider access; and
- revocation without requiring a client update where feasible.

Client code may carry a short-lived, user-bound capability only when a separately accepted authentication and authorization design permits it. That capability remains revocable and cannot create broader authority.

## Local development

Local development must use public or synthetic data and non-production credentials.

Rules:

- `.env` and `.env.*` remain ignored except for a non-secret `.env.example`;
- example files contain placeholders and descriptions, never usable values;
- local secrets are unique to the developer or ephemeral environment;
- production secrets and protected data must not be copied to local machines;
- local services use emulators, local-only credentials, synthetic providers, or isolated test accounts;
- shell history, terminal recording, screenshots, and shared debugging sessions are treated as exposure paths;
- developer offboarding or device loss triggers revocation of applicable credentials; and
- local convenience cannot justify a shared team password or founder-held master secret.

## CI and pull-request workflows

Untrusted pull-request code must not receive privileged secrets.

CI requirements include:

- default read-only repository permissions;
- no production, deployment, provider, signing, or private-origin credentials for forked or otherwise untrusted pull requests;
- privileged workflows separated from untrusted code execution;
- short-lived federated identity preferred over stored long-lived cloud credentials;
- protected environment approval for high-consequence deployment or release operations;
- action, dependency, and script review before secret-bearing jobs;
- no interpolation that exposes secrets through command tracing or process output;
- artifact and cache review for indirect secret retention;
- immediate job failure and containment when a secret scan identifies a credible exposure; and
- explicit revalidation when workflow permissions, triggers, actions, runners, or deployment targets change.

Secret masking by the CI provider is a defense-in-depth control. It cannot make arbitrary third-party code safe to run with privileged secrets.

## Preview deployments

Preview environments are public or lower-trust surfaces and remain synthetic-only.

They must not receive:

- production secrets;
- production data;
- production cookies or sessions;
- production connector credentials;
- production database, object-store, queue, cache, search, analytics, AI, or administrative access;
- private production origins; or
- a credential that can deploy, rotate, delete, or administer production systems.

Preview-specific credentials must be restricted to preview resources and revoked when the preview is removed.

## Prompts, AI systems, retrieval, and provider dashboards

Secrets must not be included in:

- model prompts or system messages;
- retrieved context;
- model outputs;
- tool-result prose;
- retained AI memory;
- provider traces, evaluation datasets, or dashboards;
- embeddings or indexes;
- prompt templates committed to the repository; or
- examples used for AI testing.

Systems must minimize context before model egress and detect or redact likely secret material before logging or provider transmission.

A model must never be asked to recover, infer, transform, summarize, validate, rotate, or store a raw production secret.

## Logs, traces, metrics, errors, receipts, and support

Secret values are prohibited in ordinary operational evidence.

Controls must address:

- request and response logging;
- URL query strings and headers;
- exception messages and stack traces;
- command output;
- environment dumps;
- health checks;
- tracing attributes;
- metrics labels;
- person-visible receipts;
- protected audit records;
- support tickets and chat;
- screenshots and recordings;
- crash and memory dumps;
- provider consoles; and
- exported diagnostic bundles.

Redaction rules must be tested against known secret classes and must not copy the raw value into the redaction event.

## Secret scanning

The project requires layered scanning appropriate to the active repository and provider boundary.

Candidate layers include:

- editor or local pre-commit checks;
- repository push protection;
- pull-request and default-branch scanning;
- Git history scanning;
- build artifact and container scanning;
- log and preview inspection;
- package, release, and generated-code inspection; and
- provider-native exposure alerts.

A scanning result is evidence, not proof that no secret exists. Unsupported formats, encoded values, split values, derived credentials, and novel tokens remain residual risk.

False positives must be resolved without weakening rules globally or publishing candidate secret material.

## Human access and sharing

Human secret access must be individual, attributable, least-capability, and time-bounded where possible.

The project prohibits:

- shared administrator passwords;
- shared personal accounts;
- one secret distributed to an indefinite group;
- sending production values through chat or email;
- founder-only custody;
- undocumented vendor or contractor access;
- secret access derived from contributor status, donor status, governance weight, employment title, or technical ownership alone; and
- informal possession becoming permanent authority.

Temporary access must expire or be revoked when the task, role, contract, or incident ends.

## Rotation

Secrets rotate:

- at a planned interval appropriate to the capability;
- before or at expiry;
- after personnel or role changes;
- after provider, environment, domain, scope, callback, or consumer changes;
- after exposure or suspected compromise;
- when a broader-than-required scope is discovered;
- when migration or algorithm policy requires it; and
- when evidence shows the value may have entered logs, builds, previews, prompts, support, or public systems.

A rotation plan identifies predecessor and successor, consumer rollout, activation, cutoff, rollback limits, stale consumer rejection, and completion evidence.

Creating a successor without revoking predecessor use is not completed rotation.

## Revocation and decommissioning

Revocation is the first containment action for a suspected exposed capability when it can be performed safely.

Decommissioning requires:

- revocation at the issuer or enforcing system;
- removal of service bindings and access policy;
- confirmation that active consumers have stopped using the value;
- cleanup of controlled files, configuration, caches, artifacts, and support copies;
- retirement of related callbacks, endpoints, sessions, or service identities where applicable;
- inventory update;
- evidence and residual-risk recording; and
- revalidation that the revoked capability cannot be silently recreated by restore or rollback.

## Exposure and incident response

When a secret may have been exposed:

1. stop further publication, logging, transmission, and use where safe;
2. revoke or suspend the exposed capability before relying on content deletion;
3. issue a scoped successor only after the exposure path is contained;
4. identify services, environments, people, data, operations, artifacts, logs, caches, previews, clones, providers, and downstream copies affected;
5. remove or restrict exposed material where possible without overclaiming recovery;
6. invalidate dependent sessions, tokens, builds, deployments, queues, callbacks, and signing trust where required;
7. preserve minimized evidence in an authorized private incident record;
8. assess unauthorized use, person impact, notification, correction, restoration, and residual harm;
9. review why scanning, access, isolation, or rotation controls failed; and
10. publish a safe institutional derivative when appropriate.

Never paste a leaked value into a new issue, incident message, test, scan exception, or public advisory.

## Emergency and break-glass secrets

Emergency credentials are permitted only through a separately accepted break-glass process.

They must be:

- issued to a named actor or workload;
- restricted to an exact emergency capability;
- stronger-authenticated;
- automatically or procedurally short-lived;
- unavailable for ordinary work;
- protected from shared access;
- recorded through minimized protected audit;
- reviewed after use;
- revoked when the trigger ends; and
- unable to create ordinary Chronicle or House of Keys authority.

An emergency credential may contain or stop a technical incident. It cannot rewrite historical truth, approve research, suppress person-visible receipts, or permanently redesign policy.

## Current bounded public-site adapter

The current public website includes a purpose-limited signup forwarding boundary. Any credential used by that adapter must remain:

- server-side only;
- environment-local;
- absent from public code and client bundles;
- scoped only to the bounded private signup purpose;
- excluded from logs and public previews;
- rotatable and revocable independently from the website source tree; and
- incapable of granting access to health, account, research, administrative, or unrelated project systems.

The adapter’s private storage owner, retention, unsubscribe, correction, deletion, and incident processes remain separate unresolved obligations. This policy does not represent them as complete.

## Evidence required before a secret control is called deployed

A deployed claim requires reviewed evidence appropriate to the exact scope, including:

- complete inventory and ownership;
- storage and delivery configuration captured without exposing values;
- least-privilege consumer access;
- environment and purpose separation;
- no-client-secret test;
- pull-request, fork, CI, and preview isolation tests;
- redaction and logging tests;
- repository, history, artifact, and provider scanning results;
- rotation and predecessor-revocation test;
- personnel and contractor removal test;
- exposure-response exercise;
- emergency credential expiry and review evidence where applicable;
- decommissioning evidence;
- independent security review appropriate to consequence; and
- residual-risk ownership and revalidation triggers.

A provider secret-manager setting, a masked log, an ignored `.env` file, or the absence of a known leak is not sufficient by itself.

## Current control status

At this revision:

- secret-management controls are **required and designed**;
- the repository ignore baseline and public disclosure policy provide current preventive evidence for public development;
- the current bounded signup adapter remains purpose-limited but its full private lifecycle is incomplete;
- no production secret store or workload-identity system is represented as deployed;
- no control is independently reviewed; and
- production-facing residual risks remain production-blocking.

## Revalidation triggers

Revalidate this policy when:

- a new environment, provider, service, connector, model, MCP server, database, queue, object store, analytics system, research system, administrative service, or deployment path is added;
- CI permissions, workflow triggers, runners, actions, packages, build scripts, or preview behavior changes;
- a secret is issued, rotated, revoked, exposed, recovered, migrated, or decommissioned;
- a value becomes client-visible;
- a provider changes scope, retention, logging, dashboard, or credential behavior;
- a new secret class is introduced;
- founder, maintainer, employee, contractor, or vendor access changes; or
- an incident or review identifies an indirect exposure path.

## Public-information boundary

This public policy defines safe control objectives only.

Do not publish:

- real secret names when they reveal private architecture;
- secret values or reversible encodings;
- provider credential identifiers;
- private endpoints or callback secrets;
- production access maps;
- emergency or recovery material;
- unredacted inventory, scan results, logs, or incident evidence; or
- detailed bypass information.

Protected evidence belongs in an authorized private system. Public records may contain reviewed, minimized institutional derivatives.
