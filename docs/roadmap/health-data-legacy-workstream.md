# Future Institutional Workstream — Health Data Legacy and Post-Mortem Stewardship

[Roadmap documentation](README.md) · [Decision 0009](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) · [Legacy and succession architecture](../architecture/health-data-legacy-and-succession.md) · [Current status](current-status.md)

- **Status:** PROPOSED FUTURE INSTITUTIONAL WORKSTREAM
- **Tracking issue:** [#39](https://github.com/finalboss-tom/calypsos-promise/issues/39)
- **Sequence boundary:** This workstream does not renumber or delay the accepted numbered sprint sequence. Sprint 6 — Aster contracts and AI governance remains next.
- **Entry condition:** Begin implementation planning before any Legacy Directive, incapacity, death, estate, fiduciary, successor, archive, or post-mortem research workflow is represented as LIVE or legally operative.
- **Production boundary:** Documentation and future planning only; no production capability is authorized

## Goal

Make a person’s long-horizon authority over the Living Chronicle implementable without treating death, incapacity, inactivity, family relationship, legal title, technical custody, or research value as automatic access.

The completed workstream must let a person create a revocable, versioned Legacy Directive; let legitimate claimants request bounded actions through a reviewable succession process; preserve conflicts and third-party rights; and route every approved operation through the House of Keys, execution evidence, receipts, protected audit, correction, and restoration.

## Why this is a separate institutional workstream

The capability crosses product, data, consent, identity, security, legal, estate, governance, research, archive, accessibility, and institutional-continuity boundaries. It should not be smuggled into account recovery, a caregiver feature, a research form, or a single sprint implementation detail.

The current repository already preserves the necessary foundations:

- the Product Constitution’s private-by-default, refusal, export, deletion, and purpose-specific permission rights;
- the Vision’s legacy wishes, abandoned-account stewardship, intergenerational succession, durable archives, and hundred-year mandate;
- the Living Chronicle’s separation of person control, custody, source, confirmation, and legal ownership language;
- the House of Keys’ deterministic, purpose-specific authority model;
- the Sprint 5 security baseline’s contested control, restricted recovery, protected audit, deletion, restoration, and specialist holdpoints; and
- the institutional roadmap’s Phase 8 legacy and abandoned-account stewardship target.

This workstream integrates those commitments. It does not reopen the historical scope of completed Sprints 3–5.

## Inherited decisions and baselines

Implementation must inherit and may not weaken:

1. [Product Constitution](../frozen/product-constitution.md)
2. [Vision and Institutional Mandate](../../VISION.md)
3. [Architecture Foundation](../frozen/architecture.md)
4. [Decision 0003 — Progressive Decentralization](../decisions/0003-progressive-decentralization.md)
5. [Decision 0005 — Principled Confidentiality](../decisions/0005-principled-confidentiality.md)
6. [Decision 0007 — Institutional Immune System](../decisions/0007-institutional-immune-system.md)
7. [Decision 0008 — Funding and Sponsorship Baseline](../decisions/0008-funding-and-sponsorship-baseline.md)
8. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
9. [Living Chronicle Architecture](../architecture/README.md#living-chronicle-architecture)
10. [House of Keys Architecture](../architecture/README.md#house-of-keys-architecture)
11. [Security Architecture](../security/README.md)
12. [Health Data Legacy and Succession Architecture](../architecture/health-data-legacy-and-succession.md)

## Workstreams

### HDLS.1 — scope, terminology, rights, and public claims

Deliverables:

- controlled vocabulary for Legacy Directive, Legacy Steward, fiduciary claimant, succession case, authority hold, family-health derivative, protected custody, historical archive, and related terms;
- prohibited and retired shorthand such as “data inheritance” where it implies universal property or blanket transfer;
- direct-language and narrative-language parity;
- public capability-status rules; and
- exact non-scope and unresolved legal claims.

Acceptance:

- no public language represents the feature as a universal will, guaranteed asset transfer, executor replacement, automatic inheritance, legal service, or production capability;
- death does not reclassify the Chronicle as public, abandoned, research-ready, or platform-owned; and
- the person’s deletion and no-contribution choices remain legitimate.

### HDLS.2 — Legacy Directive contract and lifecycle

Deliverables:

- versioned directive schema;
- person confirmation and comprehension evidence;
- incapacity and post-mortem instructions kept distinct;
- steward and contingent-steward nomination;
- allowed and prohibited purposes, recipients, categories, selectors, actions, duration, preservation, export, family, research, archive, and deletion rules;
- revocation, suspension, supersession, invalidation, review-due, activation, and closure lifecycle; and
- exportable human- and machine-readable representations.

Acceptance:

- a person can inspect, export, revise, revoke, and supersede the directive while capable and in control;
- old revisions remain immutable and traceable;
- broader legacy permission receives no product, reward, payment, research, governance, or service advantage; and
- a draft or stale directive cannot activate.

### HDLS.3 — event, identity, claimant, and authority evidence

Deliverables:

- separate event-evidence and authority-claim contracts;
- approved evidence classes and minimization rules;
- identity, role, jurisdiction, term, scope, and conflict review;
- protected external-record references;
- event verifier and authority reviewer responsibilities;
- anti-forgery, revocation, expiry, wrong-person, wrong-jurisdiction, and document-status behavior; and
- private case-management boundary.

Acceptance:

- verifying death or incapacity does not establish claimant authority;
- family relationship, credentials, an export, payment, source authorship, operator status, or intimate knowledge is insufficient;
- a claimant cannot self-certify every material fact; and
- public repository systems contain no real estate, health, identity, family, or authority documents.

### HDLS.4 — succession case, contested authority, and protective holds

Deliverables:

- succession-case lifecycle;
- claimant and challenge intake;
- exact-scope protective holds;
- notice, waiting, challenge, appeal, expiry, and restoration rules;
- conflict and legal-hold representation;
- emergency and urgent lawful exception boundaries; and
- denied, indeterminate, invalidated, and closure behavior.

Acceptance:

- inactivity alone cannot create a case outcome;
- high-consequence disputed export, deletion, research, archive, or external transmission fails closed;
- the first claimant gains no automatic advantage;
- a hold cannot silently become indefinite retention or denial after restored capacity; and
- every hold has scope, reason, authority, review, and expiration behavior.

### HDLS.5 — House of Keys, execution, receipts, and audit integration

Deliverables:

- legacy authority-basis contracts for House of Keys requests;
- deterministic `allow`, `deny`, `indeterminate`, and protective-hold policy behavior;
- short-lived, single-purpose operation envelopes;
- exact recipient and delivery verification;
- execution lifecycle and retry behavior;
- person-, steward-, and fiduciary-visible receipts;
- protected operational audit; and
- correction, reversal, notification, and restoration links.

Acceptance:

- a Legacy Directive, court record, or fiduciary role never becomes blanket permission;
- policy decision, execution, receipt, and audit remain distinct;
- stale, revoked, superseded, contested, or incomplete authority cannot authorize a new operation;
- every completed high-consequence operation has inspectable decision and execution evidence; and
- AI cannot convert uncertainty into permission.

### HDLS.6 — preservation, export, family-health, research, archive, and deletion pathways

Deliverables:

- protected-custody preservation contract;
- fiduciary administration view;
- complete export workflow;
- family-health derivative schema and review process;
- post-mortem research contribution boundary;
- historical archive, embargo, access, and publication boundary;
- deletion and residual-copy lifecycle; and
- downstream-obligation records.

Acceptance:

- preservation does not imply inspection or secondary use;
- a family-health derivative is minimized and distinguishable from a complete export;
- research and archives require separately approved, specific purposes and recipients;
- public release is never the default end of an embargo;
- possession of an export creates no onward authority; and
- deletion races trigger review rather than rewarding the first claimant.

### HDLS.7 — family, genetic, minor, caregiver, and third-party protections

Deliverables:

- multi-subject and relational-risk model;
- redaction, omission, segmentation, embargo, restriction, and denial rules;
- living-relative and correspondent protection;
- genetic and familial inference review;
- minor, dependent, caregiver, abuse, estrangement, reproductive, psychiatric, substance-use, and protected-location safeguards;
- attributed correction and challenge pathways; and
- specialist review criteria.

Acceptance:

- a person’s directive cannot automatically waive another living person’s rights;
- a successor cannot silently rewrite the deceased person’s Chronicle;
- full exports and public archives receive heightened third-party review; and
- family-health usefulness is not represented as clinical completeness or deterministic inherited risk.

### HDLS.8 — security, fraud, coercion, accessibility, and abuse prevention

Deliverables:

- integrated threat and residual-risk expansion;
- false-death, forged-document, claimant-takeover, coercion, undue-influence, insider, deletion, export, archive, research, AI-impersonation, provider-shutdown, and stale-cache scenarios;
- separation-of-duty and independence rules;
- accessible execution, revision, challenge, and restoration flows;
- supported decision-making boundary;
- non-AI and non-smartphone alternatives; and
- incident and abuse response.

Acceptance:

- diagnoses, health facts, family knowledge, and behavioral predictions are not sufficient identity or authority proof;
- directive assistance cannot silently become confirmation;
- accessibility provides equivalent safe paths rather than weaker authority;
- no AI persona may impersonate the deceased or make authoritative choices in their name; and
- production-facing residual risks remain blocking until accepted controls and evidence exist.

### HDLS.9 — continuity, provider migration, shutdown, and abandoned accounts

Deliverables:

- long-term format, schema, provenance, directive, receipt, and deletion-state portability;
- key, encryption, escrow, and recovery decision;
- provider and custodian replacement plan;
- institutional-successor contract;
- shutdown notice, export, transfer, rejection, deletion, and residual-copy rules;
- unreachable, abandoned, already deceased, and disputed account handling; and
- cost, subsidy, retention, and sunset policy.

Acceptance:

- no founder, operator, provider, archive, buyer, receiver, fork, or successor institution acquires personal authority through infrastructure control;
- a person can export the directive in a usable form before shutdown;
- migration preserves restrictions, revocations, receipts, conflicts, and deletion state;
- abandoned does not mean deceased or ownerless; and
- indefinite retention requires an explicit reviewed basis rather than speculative future value.

### HDLS.10 — legal profiles, specialist holdpoints, synthetic evidence, and release gate

Deliverables:

- jurisdiction-profile architecture without false universal precedence;
- estate, probate, fiduciary, incapacity, digital-assets, health-privacy, electronic-signature, research, archive, and conflict-of-laws review records;
- named production owners and separation of duties;
- synthetic fixtures and deterministic validators;
- executable tests where applicable;
- multi-party tabletop exercises;
- independent specialist findings and unresolved limitations;
- cross-contract reconciliation; and
- implementation and production-release decision records.

Acceptance:

- documentation, founding-steward review, vendor features, or synthetic tabletops are not represented as legal sufficiency or deployment;
- required specialists are named or the missing review remains explicit;
- every scenario maps to controls, residual risk, owner, evidence status, and revalidation trigger;
- public examples remain fictional or synthetic; and
- a separate release gate determines whether any bounded capability may become LIVE.

## Minimum synthetic scenario set

The workstream must exercise at least:

1. directive creation, review, revocation, and replacement;
2. temporary incapacity followed by restored capacity;
3. false death report during account takeover;
4. forged or revoked event or fiduciary record;
5. verified death with no valid claimant;
6. named steward and executor conflict;
7. multiple competing legal records;
8. abusive or estranged family access request;
9. claimant deletion request during an active challenge;
10. full export exposing living relatives or correspondence;
11. minimized family-health derivative;
12. genetic inference beyond intended scope;
13. narrow research contribution followed by scope-expansion pressure;
14. archive embargo review with changed living-person risk;
15. a lawful retention exception conflicting with a deletion directive;
16. recipient unable or unwilling to honor deletion;
17. restored backup resurrecting revoked or deleted state;
18. provider shutdown or key loss before activation;
19. successor institution migration;
20. AI impersonation attempt; and
21. no qualified reviewer available for an urgent request.

## Evidence and review ladder

The workstream must preserve distinct statuses for:

- requirement identified;
- architecture designed;
- contract implemented;
- deterministic validation passed;
- synthetic scenario passed;
- executable isolated test passed;
- founding-steward design tabletop completed;
- multi-party operational tabletop completed;
- independent specialist review completed;
- deployed in a bounded environment;
- operationally verified; and
- approved LIVE for one jurisdiction, role, action, and scope.

These statuses do not collapse into one score. Success in one jurisdiction or pathway does not approve every other pathway.

## Phase and sprint inheritance

This is a cross-phase capability:

- **Phase 0:** intent, decision, architecture, assumptions, and explicit future gates;
- **Phase 1:** private product preserves export, deletion, account separation, and accessible direct person control but need not activate succession;
- **Phase 2:** identity, security, privacy, recovery, audit, incident, and evidence systems mature enough to support bounded prototypes;
- **Phase 3:** operator, provider, key, archive, and institutional succession become credible and tested;
- **Phase 4:** any post-mortem research contribution inherits full Research Commons governance;
- **Phase 5:** any costs, compensation, proceeds, inheritance, benefit sharing, or archive fees inherit sustainable-economics and conflict controls;
- **Phase 6:** constitutional authority defines who may adopt, amend, suspend, or retire the capability without weakening person rights;
- **Phase 7:** founder absence and institutional succession must preserve every active directive and restriction; and
- **Phase 8:** legacy, delegated, abandoned-account, archive, migration, sunset, and intergenerational stewardship operate as continuing practices rather than a one-time launch.

The exact implementation sequence remains gate-based and should be scheduled only when upstream identity, security, legal, research, archive, accessibility, and operational dependencies make bounded work responsible.

## Explicit non-scope

This proposed workstream does not:

- create a production Legacy Directive or estate-planning service;
- provide legal advice or legal-document execution;
- classify every health-data element as property;
- guarantee executor, court, provider, custodian, or jurisdiction recognition;
- authorize death, incapacity, identity, document, or authority verification vendors;
- authorize research, public archives, commercialization, compensation, inheritance, licensing, or data sale;
- create key escrow, long-term custody, or retention operations;
- reopen completed Sprint 3, Sprint 4, or Sprint 5 acceptance;
- change Sprint 6 scope or order; or
- represent Phase 0 or any production gate as complete.

## Exit condition

The workstream is complete only when the accepted decision and architecture have been converted into versioned contracts, deterministic policy, accessible user and fiduciary experiences, protected evidence systems, synthetic and executable tests, multi-party exercises, named owners, independent specialist review, jurisdiction-bounded legal conclusions, provider and institutional continuity, and a separate release decision that states exactly which capability is allowed to operate and which remain prohibited or unresolved.
