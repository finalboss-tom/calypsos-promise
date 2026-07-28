# Sprint 8.1 Record — Website Application Boundary and Migration Contract

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Site README](../../apps/site/README.md) · [Issue #60](https://github.com/finalboss-tom/calypsos-promise/issues/60) · [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

- **Status:** IMPLEMENTED — exact-head validation pending
- **Entry baseline:** `main` at pre-Sprint 8 reconciliation squash commit `9da8034220954a1ca50420e71fd94e7795232a35`
- **Application owner:** `apps/site`
- **Scope:** website ownership, routes, content authority, rendering, design tokens, security, secrets, cache, assets, signup gate, deployment, rollback, accessibility, performance, metadata, validation, and non-scope only
- **Framework state:** no Next.js or React dependency or implementation added

## Result

Workstream 8.1 establishes a sufficient application and migration boundary for workstream 8.2.

The repository now records:

- one public website owner at `apps/site`;
- one in-place migration of Website Track 0A;
- explicit preserve, redirect, or retire rules for `/`, `/privacy`, `/joined`, and `/api/join`;
- repository-owned content authority and canonical source-link requirements;
- a validated site-local presentation index that cannot become product truth;
- build-time canonical economics views or honest empty states;
- server-rendered essential information with optional client enhancement;
- design-token ownership inside the site application;
- no premature shared package, CMS, database, remote content service, or duplicate site;
- security-header, server-only secret, cache, and asset rules;
- a preserve-or-retire signup decision gate;
- preview, official release, cutover, rollback, and status-evidence distinctions;
- accessibility and performance evidence requirements;
- route, metadata, status, funding, signup, security, secret, cache, authority, and full-validation requirements; and
- explicit permanent non-scope.

## Exit-criterion assessment

### Single owner

Met. `apps/site` remains the only public website application and deployment owner.

### No duplicate infrastructure

Met. No duplicate website, shared website package, CMS, database, runtime GitHub content fetch, account system, provider runtime, financial runtime, or Sprint 9 game surface is selected.

### Current routes have migration rules

Met. Every existing public route has a preserve, redirect, or retire rule. Silent route loss is prohibited.

### Canonical authority remains upstream

Met. Website status and funding views are read-only derivatives with canonical source links. A page, preview, sponsor request, provider relationship, or deployment cannot change upstream authority.

### Security, cache, deployment, signup, accessibility, performance, and rollback are testable

Met at contract level. The accepted validation categories and required evidence are explicit. Environment-specific implementation and release evidence remain later workstreams.

### No framework implementation

Met. Workstream 8.1 adds no Next.js or React dependency, App Router code, new runtime package, or website product route.

### Repository tracking agrees

Met in the candidate. The repository home, documentation home, roadmap, architecture index, site README, current status, persistent roadmap issue #2, issue #60, and PR #61 identify Sprint 8 and the 8.1 boundary consistently.

## Evidence limits

This workstream is architecture, planning, ownership, and migration-contract evidence.

It does not establish:

- a Next.js shell;
- a preview or official release;
- deployed security-header behavior;
- accessibility conformance or affected-user validation;
- performance compliance;
- production signup privacy or abuse protection;
- independent security, privacy, legal, clinical, provider, financial, or operational review; or
- any private or consequential product capability.

Every inherited production, specialist, institutional, signup, accessibility, deployment, release, and measurement holdpoint remains open.

## Next gate

After this candidate passes formatting, documentation links, repository policy, economics validation, content validation, lint, typecheck, tests, and DCO attestation, issue #60 and PR #61 may mark 8.1 complete and identify 8.2 as next.

Workstream 8.2 will select and pin the current framework and React dependencies from official primary sources, then implement the bounded shell, design tokens, security headers, metadata, route compatibility, and asset strategy without weakening this record.
