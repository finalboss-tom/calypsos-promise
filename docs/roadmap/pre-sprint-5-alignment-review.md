# Pre-Sprint 5 Repository Alignment Review

[Current status](current-status.md) · [Sprint 4 completion](sprint-4-completion-record.md) · [Sprint 5 plan](sprint-5-plan.md) · [Security architecture](../security/README.md)

- **Status:** COMPLETE AND MERGED — accepted through PR #34 and present on `main`
- **Date:** 2026-07-26
- **Pull request:** [#34](https://github.com/finalboss-tom/calypsos-promise/pull/34)
- **Squash commit:** `d135b2fdf79a3c2cca9bf7cad275fc454d22fa6d`
- **Reviewed baseline:** Sprint 4 squash commit `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`
- **Scope:** mission, vision, incentives, architecture, governance, repository structure, House of Keys, Living Chronicle, current implementation, and Sprint 5 handoff
- **Certification boundary:** internal repository consistency review; not independent security, privacy, clinical, accessibility, legal, interoperability, or production-readiness certification

## Decision summary

The repository was internally aligned and ready to begin Sprint 5 without changing the accepted Sprint 5 goal, deliverables, acceptance criteria, or numbered sequence.

The review found no contradiction requiring a change to the Product Constitution, Vision, frozen Architecture Foundation, Gameplay Foundation, World and Lore Canon, deterministic Incentive Model, progressive-decentralization mandate, Institutional Immune System, Living Chronicle baseline, or House of Keys baseline.

The review recommended preserving the exact Sprint 5 goal:

> Define defenses before connecting real health data or agents.

The accepted merge authorized only the Sprint 5 design, threat, policy, procedure, synthetic-evidence, and completion-record work. It did not authorize production health-data processing, production accounts, connectors, agents, research, clinical use, or a claim of security certification.

## Review authority and precedence

The review used this order:

1. frozen product, architecture, gameplay, lore, and institutional commitments;
2. accepted decisions, including progressive decentralization and the Institutional Immune System;
3. Governance, Public Institutional Roadmap, Security, publication, contribution, development, and validation policies;
4. controlled vocabulary and deterministic incentive model;
5. Living Chronicle and House of Keys architecture, contracts, validation, fixtures, tests, and completion evidence;
6. the accepted Sprint 5 roadmap scope; and
7. this review.

A lower layer may implement or explain a higher-authority requirement. It may not weaken it.

## Mission and incentive findings

The repository consistently preserved:

- personal value before research, commerce, funding, or governance benefit;
- meaningful refusal and non-punitive return;
- no reward for broader permission or unnecessary intimate disclosure;
- deterministic domain authority for Chronicle storage, permission, quest completion, rewards, and safety;
- AI as a proposal and explanation layer rather than canonical authority;
- public code and synthetic fixtures separate from private health data;
- source provenance, correction, conflict, export, deletion, and visible uncertainty;
- purpose-specific authority and fail-closed policy evaluation;
- provider and infrastructure replaceability; and
- progressive transfer of institutional authority only through evidence and safeguards.

Security was explicitly prohibited from becoming a reason to pressure people into broader collection, wider access, longer retention, optional analytics, model training, research participation, public visibility, or surrender of correction, export, deletion, accessibility, refusal, or non-AI fallback.

## Architecture findings

### Living Chronicle and House of Keys

The separation was coherent:

- Chronicle truth remains in `@calypsos-promise/health-schema`;
- permission truth remains in `@calypsos-promise/house-of-keys`;
- grants, decisions, execution, receipts, protected audit, Chronicle records, quest state, AI memory, provider logs, and application state remain distinct claims; and
- public synthetic evidence does not imply production persistence, identity, enforcement, or legal validity.

### Modular monolith and package boundaries

The repository remained appropriately small and modular. It did not need premature services, provider SDKs, connector runtimes, queues, or cloud-only development to begin Sprint 5.

The review identified `packages/health-schema/src/types.ts` and `packages/health-schema/src/validate.ts` as future cohesion-review candidates before materially extending Chronicle scope. That was not a blocker for Sprint 5.

### House of Keys security handoff

Sprint 5 was required to address, at design level:

- authentication and identity proofing;
- controlling-person and representative authority;
- account recovery and emergency access;
- tenant and subject isolation;
- grant lifecycle freshness and distributed revocation;
- execution-time authorization;
- receipt integrity and protected audit;
- untrusted input, prompt injection, retrieval, AI, MCP, connector, and upload isolation;
- encryption, keys, secrets, environments, and private origins;
- backups, restoration, deletion verification, incident response, and residual risk; and
- specialist holdpoints and evidence-status truth.

## Open-source operating findings

The repository had a credible Phase 0 baseline:

- public contribution guidance;
- synthetic-only development;
- DCO certification;
- pull-request review and squash-merge policy;
- public issue intake with private security and conduct routes;
- pinned Node and pnpm expectations and a committed lockfile;
- one full validation command;
- independent CI jobs for formatting, documentation links, repository policy, content, lint, type checking, and tests; and
- no production credentials or health data required for ordinary contribution.

The review did not claim mature multi-maintainer operations, branch-protection evidence, commit-level DCO enforcement, signed releases, clean-machine evidence, second-operator evidence, or independent specialist review.

## Sprint 5 entry requirements

The accepted handoff required Sprint 5 to:

1. preserve frozen product and incentive boundaries;
2. treat the House of Keys and Chronicle contracts as pre-stable inputs rather than production controls;
3. use public or synthetic information only;
4. map threats to explicit controls and residual risks;
5. distinguish required, designed, synthetically evidenced, independently reviewed, implemented, deployed, and operationally verified control states;
6. publish provider-independent architecture and procedures before selecting providers;
7. preserve manual and non-AI paths;
8. keep public and private information boundaries explicit;
9. define specialist holdpoints; and
10. close with cross-contract reconciliation and a truthful completion record.

## Deferred and unresolved work

The review left unresolved:

- production identity and account systems;
- provider and connector selection;
- production data storage, queues, private origins, keys, secrets, backups, observability, and incident operation;
- clinical, privacy, security, accessibility, legal, research, interoperability, and regulatory specialist approval;
- entity, funding, payment, accounting, tax, treasury, compensation, and financial controls;
- governance identity, voting, tokens, blockchain, treasury, and broad delegated authority;
- branch protection, commit-level DCO, release signing, second-operator evidence, and founder succession; and
- the institutional Phase 0 exit review.

## Merge result

The review merged through PR #34 before Sprint 5 began. Sprint 5 subsequently merged through PR #36. This historical handoff record does not supersede the [current status](current-status.md), [Sprint 5 completion record](sprint-5-completion-record.md), or [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md).
