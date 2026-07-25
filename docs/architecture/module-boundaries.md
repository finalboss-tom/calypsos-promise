# Repository and Module Boundaries

[Architecture index](README.md) · [Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Current status](../roadmap/current-status.md)

**Status:** BASELINE repository architecture guidance  
**Authority:** Implements the frozen Architecture Foundation without changing its selected stack or domain boundaries

## Purpose

Calypso’s Promise is intended to begin as a modular monolith with explicit domain contracts, replaceable adapters, deterministic authority, and isolated production-data boundaries. Modularity is a means of preserving the Promise—not a reason to create empty packages, distributed systems, or abstraction layers before they have a real owner and use.

This document defines how applications, packages, services, content, fixtures, and tools should relate as the repository expands.

## Dependency direction

Dependencies point inward toward stable contracts and domain rules:

```text
user and agent surfaces
        ↓
applications and orchestration
        ↓
domain capabilities and policy-enforced use cases
        ↓
pure schemas, values, invariants, and deterministic rules

infrastructure and provider adapters ──implement──> inward-facing ports
```

The inner layer must not import the outer layer.

- Applications may compose packages and adapters.
- Domain packages may depend on narrower value or schema packages when the dependency is part of the domain contract.
- Infrastructure adapters may depend on domain ports and contracts.
- Domain contracts must not depend on databases, queues, cloud SDKs, analytics vendors, AI providers, HTTP frameworks, or UI libraries.
- One application must not import another application’s internal source.
- Packages must not import another package through its private `src` path. Use the declared public export surface.
- Circular package dependencies are prohibited.

## Repository surface responsibilities

### `apps/`

Deployable or directly runnable composition roots.

An application may own:

- request, route, screen, command, or transport composition
- dependency construction
- authentication context handoff
- use-case orchestration
- presentation-specific mapping
- application-level error translation

An application must not become the canonical home for reusable domain rules, schemas, or provider-independent policy.

### `packages/`

Versioned, testable capabilities and contracts shared by one or more applications or services.

A package should have one primary reason to change and a narrow public API. It should expose only the contracts or functions that downstream consumers are expected to use.

Current packages:

- [`domain`](../../packages/domain) — repository-wide public and synthetic contributor invariants; keep this small and do not turn it into a miscellaneous utilities package
- [`content-schema`](../../packages/content-schema) — story and product-content contracts, deterministic validation, and graph contracts
- [`health-schema`](../../packages/health-schema) — Living Chronicle contracts, versioning, deterministic validation, and synthetic fixtures

### `services/`

Independently operated capabilities should be introduced only when they require a distinct runtime, scaling profile, security boundary, language, failure domain, or release cadence. A planned service is not evidence that a separate deployment is currently justified.

### `content/`

Versioned public or synthetic product content governed by content contracts and specialist review. Content must not contain executable authority, credentials, production payloads, or hidden provider configuration.

### `fixtures/` and package fixtures

Synthetic or explicitly public evidence used to validate contracts and end-to-end behavior. Fixtures are not seed copies of production data and must remain safe to publish permanently.

### `tools/`

Repository policy, validation, migration, generation, and contributor tooling. Tools may inspect repository files but must not quietly become production-domain services.

## Domain ownership rules

### Living Chronicle

The Chronicle owns longitudinal records, values, temporal assertions, provenance, correction, conflict, source artifacts, export, and deletion contracts.

It does **not** own:

- account authentication or identity proofing
- purpose-specific consent grants
- access-policy decisions
- research enrollment
- compensation or marketplace behavior
- quest progression
- narrative state
- AI-provider behavior

Those domains may reference Chronicle identifiers through explicit contracts; they must not be folded into the Chronicle aggregate merely because they interact with health records.

### House of Keys consent

Sprint 4 should introduce purpose, grant, recipient, duration, revocation, access-receipt, comprehension, and policy-evaluation contracts as a separate bounded capability. Consent may authorize an operation over Chronicle data; it does not become Chronicle truth.

A consent package must not import application, database, provider, or UI implementation details. Its deterministic policy evaluator should accept explicit facts and return an inspectable decision with reasons.

### Content and story

Content contracts own versioned narrative and educational records. The story engine may compile and evaluate allowed content relationships, but it must not infer health truth, grant permissions, or complete quests without domain evidence.

### AI and MCP

AI and MCP components are adapters and interaction layers.

- AI may create drafts, explanations, retrieval requests, and structured proposals.
- MCP may expose explicitly authorized domain capabilities.
- Neither may write directly to canonical records, change permissions, bypass confirmation, or access a database outside domain and policy enforcement.

The frozen transaction rule remains:

> AI proposes. The player confirms. The domain service validates and stores.

## Public API rules

Every package should:

- declare a deliberate export surface
- avoid exposing private file layout as a contract
- use stable domain language rather than provider terminology
- return structured errors or validation issues rather than relying on log text
- version externally meaningful serialized contracts independently from package versions when needed
- keep schema versioning, compatibility, and migration behavior explicit
- include tests for public exports rather than only private helpers

When a type or function is intended for package consumers, export it from the package entry point. When it is not, keep it internal and avoid downstream deep imports.

## Module creation gate

Create a package or deployable service only when all of the following are true:

1. A bounded responsibility and owner can be named.
2. The public contract can be described without referencing private implementation files.
3. The dependency direction is clear.
4. At least one real consumer or current sprint deliverable exists.
5. Synthetic fixtures or tests can validate the boundary.
6. Security, privacy, consent, accessibility, and rollback implications are recorded.
7. The module does not duplicate an existing package or prematurely implement a deferred provider choice.

Do not create placeholder packages solely to make the repository resemble the frozen target topology.

## Decomposition triggers

Split a file or internal module when one or more of these conditions appear:

- it contains multiple independent validation or policy domains
- unrelated teams or sprints repeatedly edit the same file
- a change requires loading fixtures from unrelated domains
- one type union begins absorbing concepts owned by another bounded context
- a provider-specific concern leaks into a provider-independent contract
- tests cannot isolate failures to one responsibility
- the public entry point becomes a large undifferentiated export barrel
- a module has more than one primary reason to change

Line count alone is not the rule, but very large contract and validator files are a signal to inspect cohesion before adding another domain.

## Current reconciliation assessment

The current implementation has a sound package-level baseline:

- content and Living Chronicle contracts are separate
- deterministic validators are separate from application composition
- tests use public synthetic fixtures
- the site is a minimal runnable surface rather than a premature production application
- provider and production-data choices remain deferred

The next cleanup boundary is internal decomposition of [`packages/health-schema/src/types.ts`](../../packages/health-schema/src/types.ts) and [`packages/health-schema/src/validate.ts`](../../packages/health-schema/src/validate.ts). They are cohesive enough for the merged Sprint 3 baseline, but already span identity, time, values, provenance, correction, custody, export, deletion, and aggregate validation. Before materially extending those files, split them into internal modules by Chronicle concern while preserving the package’s single public entry point and contract version.

Sprint 4 consent work must not be added to those files. It should arrive through a separate package and explicit integration contract.

The content package should expose its intended graph contracts through its public entry point and keep graph compilation or runtime evaluation separate from record validation.

## Pull-request review checklist

A material implementation PR should answer:

- Which bounded capability owns this behavior?
- Is the dependency direction inward?
- Does the change use only public package exports?
- Is a new module justified by a current consumer and testable contract?
- Could this logic remain deterministic and provider-independent?
- Does AI, MCP, content, or infrastructure gain authority it should not have?
- Are consent, access, audit, correction, export, deletion, and rollback effects explicit?
- Does the change preserve synthetic-data-only public development?
- What would cause the module to be split, replaced, or rolled back?
