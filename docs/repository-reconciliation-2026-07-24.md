# Repository Reconciliation — 2026-07-24

[Documentation home](README.md) · [Current status](roadmap/current-status.md) · [Module boundaries](architecture/module-boundaries.md) · [Vision](../VISION.md)

**Status:** Repository-wide architecture, mission-alignment, modularity, documentation-navigation, and contributor-experience review  
**Scope:** Current `main` baseline through Decision 0007 and merged Sprint 3  
**Certification boundary:** This is an internal repository reconciliation, not clinical, legal, privacy, security, accessibility, or production-readiness certification

## Executive conclusion

The repository is being built in strong alignment with the primary directive, frozen Promise, and long-horizon mission.

Its strongest quality is disciplined sequencing. The project repeatedly preserves personal value before secondary use, person control before institutional benefit, deterministic authority before AI convenience, evidence gates before governance transfer, and explicit deferral before premature provider or token choices.

The principal repository risk was no longer conceptual coherence. It was **orientation debt**: canonical foundations, accepted decisions, governance systems, sprint records, public strategy, and implementation contracts were accumulating faster than a new contributor could determine authority, current status, or the correct place to make a change.

The principal code-architecture risk is **future boundary erosion**, especially if House of Keys consent, identity, authorization, research, AI, or application behavior is added directly to the already broad Living Chronicle contract instead of entering through separate capabilities.

This reconciliation adds navigation, automated relative-link validation, explicit module and dependency rules, and a truthful distinction between implemented and planned repository surfaces.

## Review method

The review reconciled the full repository inventory from the initial commit and merged pull-request history, then examined:

- root mission, governance, roadmap, contribution, security, public-domain, and project-status documents
- frozen product, architecture, lore, and gameplay foundations
- accepted decision records and their current implementation artifacts
- architecture, product, governance, policy, website, public-campaign, and sprint documentation areas
- monorepo, package-manager, Turborepo, CI, DCO, and repository-policy configuration
- the runnable site workspace
- domain, content-schema, and health-schema package boundaries, manifests, public entry points, contracts, validators, tests, and synthetic fixtures
- content records and their validation/governance model
- issue intake, feedback triage, challenge, publication, and institutional correction systems

The review evaluated consistency, discoverability, dependency direction, module cohesion, status honesty, public/private data separation, contributor safety, and traceability to the primary directive.

## Mission traceability

| Directive component                                   | Canonical source                                                                 | Current repository expression                                                       | Reconciliation assessment                                                                |
| ----------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Return meaningful personal value first                | [Product Constitution](frozen/product-constitution.md), [Vision](../VISION.md)   | incentive contract, quests, content validation, Chronicle contracts                 | Strong and consistently protected                                                        |
| Help people build and understand longitudinal records | [Architecture Foundation](frozen/architecture.md), Living Chronicle architecture | `packages/health-schema`, synthetic fixtures, correction/export/deletion models     | Strong pre-stable contract; runtime intentionally absent                                 |
| Preserve individual control                           | Product rights, House of Keys direction, export/deletion architecture            | refusal paths, permission boundaries, confirmation, receipts and revocation planned | Strong constitutional direction; Sprint 4 is the critical implementation gate            |
| Make narrative useful without hiding purpose          | lore, gameplay, content schema, website framework                                | review-gated content, public/in-world distinctions, shame-free choices              | Strong; needs future usability evidence with real participants                           |
| Enable separately authorized collective benefit       | Vision and institutional roadmap                                                 | research and compensated opportunities remain deferred                              | Correctly sequenced and not prematurely implemented                                      |
| Share created value fairly                            | incentive model and roadmap                                                      | deterministic personal progression; contribution credit baseline                    | Strong baseline; economic mechanisms appropriately unresolved                            |
| Progressively transfer stewardship                    | Vision, Governance, Roadmap, Decision 0003                                       | feedback loop, decision classes, authority gates, founder-independence target       | Exceptionally well defined for this stage; operational dependency records remain missing |
| Remain correctable and resistant to capture           | Decision 0007 and Institutional Immune System                                    | assumptions, challenge intake, rollback, appeal, restoration, revalidation          | Strong architecture; implementation must remain independent in practice                  |

## What is working especially well

### Constitutional coherence

The Product Constitution, Vision, Roadmap, Governance Baseline, incentive contract, public-information boundary, feedback loop, and Institutional Immune System reinforce rather than compete with one another.

The project has successfully avoided a common failure mode in ambitious systems: adding incentives, research, governance, AI, or narrative mechanics that quietly weaken the original user promise.

### Honest capability status

The repository clearly distinguishes frozen, baseline, proposed, planned, deferred, specialist-review, and live states. Sprint completion records do not misrepresent design contracts as production capability.

### Correct open-source health-data boundary

Contributor workflows are synthetic or explicitly public. Production health data, private correspondence, credentials, conduct evidence, and other protected information are excluded from public repository surfaces.

### Deterministic authority

The architecture consistently preserves the rule that AI drafts and explains, people confirm, and deterministic domain services validate and store. MCP is treated as an authorized adapter rather than a database bypass.

### Evidence-gated institutional design

Progressive decentralization, public-domain migration, research, economics, and governance are treated as gated institutional systems rather than branding claims.

### Small executable core

The implemented code surface remains intentionally small. The site proves a credential-free contributor workflow; content and Chronicle schemas are separate packages; tests use public synthetic fixtures; provider choices remain unfrozen.

## Reconciled in this change

- added a canonical [Documentation Home](README.md) with role-based reading paths, authority order, implemented-surface map, and maintenance rules
- added architecture, product, governance, roadmap, policy, and decision indexes
- added [Repository and Module Boundaries](architecture/module-boundaries.md)
- distinguished implemented modules from planned topology in the root README
- added automated relative Markdown-link validation to `pnpm check`
- corrected the contributor decision-template path from the nonexistent `docs/decisions/TEMPLATE.md` to `docs/decisions/0000-template.md`
- corrected the integrated status date from July 25 to July 24, 2026
- exposed content graph contracts through the content-schema package entry point
- added explicit contributor rules against empty topology packages, deep imports, and cross-domain dumping grounds

## Areas requiring more definition or effort

### 1. House of Keys consent architecture

**Priority:** Critical next design-to-build boundary

Sprint 4 must define purpose-specific grants, recipients, data categories, duration, revocation, access receipts, comprehension evidence, and deterministic policy evaluation without placing consent inside Chronicle truth.

The consent capability should be a separate package with an inspectable decision contract. It should consume explicit identity, purpose, grant, request, and contextual facts; return allow, deny, or indeterminate decisions with reasons; and remain independent of UI, database, provider, and AI implementation.

### 2. Internal Chronicle decomposition

**Priority:** High before material schema expansion

`packages/health-schema` has a sound package boundary, but its `types.ts` and `validate.ts` files already span identity, time, values, provenance, correction, custody, export, deletion, and whole-bundle validation.

Preserve one public package and schema version while splitting internal files by concern before another sprint adds material Chronicle behavior. Do not solve this by creating many external packages; the goal is internal cohesion and lower change collision.

### 3. Primary-directive traceability

**Priority:** High as implementation accelerates

The mission is strongly expressed in prose but not yet represented as a compact traceability registry connecting:

- constitutional clause
- decision or baseline
- owning module
- validation rule or test
- user-visible behavior
- intended outcome and guardrail
- revalidation trigger

A machine-readable or easily generated registry would make it harder for future modules to satisfy local tests while violating the overarching Promise.

### 4. First-session and recurring user-experience contracts

**Priority:** High before the website or game becomes a real product surface

The repository has rich world, website, content, and gameplay direction, but should define measurable experience contracts for:

- the first 30 seconds
- the first five minutes
- the first confirmed Chronicle entry
- refusal, deferral, correction, export, deletion, and return journeys
- plain-language and non-AI fallbacks
- accessibility variants
- comprehension of what is story, fact, inference, permission, and reward

These should become testable journey fixtures rather than remaining only design prose.

### 5. Cross-contract integration evidence

**Priority:** High before runtime orchestration

Content and Chronicle packages are individually well tested. The next evidence layer should prove cross-contract behavior through synthetic scenarios such as:

- a quest proposes a Chronicle entry but cannot confirm it
- a refused permission does not block personal progression
- a corrected record invalidates derived feedback and quest evidence appropriately
- export includes content-independent Chronicle history and permission receipts
- deletion propagates without erasing required institutional evidence
- AI or MCP proposals cannot bypass deterministic authority

### 6. Threat modeling and abuse cases

**Priority:** Critical before accounts, consent, connectors, documents, or remote MCP

The repository names many security properties but does not yet have one integrated threat model covering assets, actors, trust boundaries, attack paths, abuse cases, mitigations, residual risk, and review cadence.

Sprint 4 should include consent-specific threats such as confused deputy behavior, stale grants, purpose laundering, receipt omission, revocation races, overbroad recipient classes, UI coercion, and AI-generated misrepresentation.

### 7. Phase 0 institutional closure

**Priority:** Required before declaring Phase 0 complete

The current status correctly identifies the missing key-person dependency register, succession and emergency-recovery map, founder-reserved-power inventory, historical governance-source catalogue, branch-protection evidence, DCO transition decision, and explicit exit review.

These are not administrative cleanup. They are direct implementation of founder independence and institutional continuity.

### 8. Public-domain legal migration

**Priority:** Required before broad external contribution or claiming legal completion

The constitutional direction is clear, but a canonical `LICENSE`, file-level notices, machine-readable metadata, contributor dedication, authorship and dependency audit, provenance exceptions, migration report, and qualified review remain incomplete.

The repository should continue saying “public-domain direction accepted; legal implementation pending” until those gates are met.

### 9. Ownership and review routing

**Priority:** Medium before contributor volume grows

The repository would benefit from a public ownership map or `CODEOWNERS` strategy for maintainers and specialist-review domains. Ownership must identify responsibility and required review without granting permanent authority or exposing private personnel data.

### 10. Automated architecture checks

**Priority:** Medium when package count grows

The current package graph is too small to justify heavy dependency tooling. Once multiple applications and domain packages exist, add automated checks for:

- circular dependencies
- cross-application imports
- private deep imports
- forbidden provider dependencies in pure domain packages
- package export completeness
- dependency direction

Do not add a complex architecture framework before there is enough code for it to protect.

## Missed opportunities worth deliberate exploration

### A generated repository atlas

The new indexes are hand-maintained. A later Forge tool could generate a repository atlas from document metadata, package manifests, decisions, and roadmap records while preserving human-written reading paths.

### Machine-readable status and authority metadata

Lightweight frontmatter or companion records could identify owner, status, authority, review domains, supersession, related decisions, and last revalidation date. This would support navigation, stale-record detection, and public dashboards without turning Markdown into an opaque content-management system.

### Decision and assumption linkage

Decision records and Assumption Registry entries should eventually link bidirectionally. A decision should identify which assumptions justify it; invalidating an assumption should surface affected decisions, tests, modules, and public claims.

### Outcome-driven public roadmap views

The roadmap is rich in gates. A future public scorecard could show evidence, uncertainty, owner, blocker, rollback condition, and revalidation date for each gate without reducing the institution to a single progress percentage.

### Synthetic institutional simulations

The repository already uses synthetic product fixtures. The same discipline could test governance capture, priority manipulation, emergency-power abuse, contributor oligarchy, public-information incidents, and founder absence through deterministic scenario fixtures.

## Recommended sequence

1. Merge documentation navigation, link validation, and module-boundary guidance.
2. Define Sprint 4 consent contracts and threat model as a separate bounded capability.
3. Decompose Chronicle internals while preserving its public contract and tests.
4. Add cross-contract synthetic journey tests for consent, Chronicle, quests, correction, export, deletion, AI, and MCP.
5. Complete the Phase 0 dependency, succession, founder-power, branch-control, DCO, and exit-review records.
6. Complete public-domain legal migration before external contribution scale or unqualified legal-status claims.
7. Turn the first-session, refusal, correction, and return journeys into measurable UX contracts.
8. Add automated dependency-boundary enforcement only when the growing package graph makes it valuable.

## Final assessment

Calypso’s Promise is not suffering from lack of ambition or lack of conceptual integration. The architecture, incentives, governance, public strategy, and institutional safeguards are unusually coherent for this stage.

The project’s next challenge is disciplined conversion: turning an extensive constitutional and design system into a smaller executable core without allowing implementation convenience to collapse consent into data, AI into authority, governance into popularity, public-domain ideals into legal overstatement, or modularity into either a monolith or a maze of empty packages.

The repository is ready to continue into Sprint 4 after this navigation and boundary reconciliation, provided the next sprint treats consent isolation, threat modeling, and Chronicle decomposition as first-class constraints.
