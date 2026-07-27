# Public Funding Ledger Policy

[Economics home](README.md) · [Operating baseline](funding-and-sponsorship-baseline.md) · [Public records](funding-records.yml) · [Funding opportunities](funding-opportunities.yml)

- **Status:** ACCEPTED PHASE 0 BASELINE
- **Revision:** 1
- **Current implementation:** public YAML register, Markdown doctrine, and synthetic examples only

## Purpose

The public funding ledger makes material financial relationships, restrictions, benefits, dependencies, work, outcomes, conflicts, corrections, and institutional effects inspectable.

It is not the project’s bank ledger, tax ledger, payment processor, donor CRM, contract archive, payroll system, accounting journal, sanctions system, or private source store.

The governing rule is:

> Publish the reviewed institutional relationship and effect. Protect the raw financial and personal source record.

## Public record classes

### Funding relationship record

One record per material donation, grant, sponsorship, underwriting relationship, in-kind contribution, provider credit, affiliate arrangement, investment, compensation program, research-funding relationship, or related-party economic relationship.

A record may be created in proposed state before acceptance when publishing the opportunity or relationship is appropriate.

### Funding opportunity record

One record per bounded public-good need open to support.

An opportunity is not a promise that the project will accept every offer or complete the work if partially funded.

### Aggregate funding report

A period report may summarize:

- individual donations;
- organizational support;
- restricted and unrestricted value;
- in-kind support;
- concentration;
- founder subsidy;
- receipts, refunds, unspent restrictions, and consumed credits;
- expenditures and funded work;
- completed, delayed, canceled, and failed outcomes; and
- conflicts, corrections, suspensions, and terminations.

Aggregate reporting must preserve privacy and avoid false anonymity.

## Stable identifiers

Use stable public identifiers:

- funding relationships: `FND-YYYY-NNNN`;
- funding opportunities: `OPP-YYYY-NNNN`;
- funding reviews or exceptions when separate: `FREV-YYYY-NNNN`; and
- funding incidents or material corrections when separately tracked: `FINC-YYYY-NNNN`.

Identifiers never encode names, email addresses, account IDs, health information, payment references, bank details, or private source identifiers.

A private system may map a public ID to source records. That mapping never enters the public repository.

## Relationship record fields

Every material record should preserve the following fields as applicable.

### Identity and classification

- stable ID;
- schema version;
- record revision;
- synthetic flag;
- public counterparty name or reviewed withholding label;
- relationship class;
- source category;
- related-party category;
- public-information classification; and
- canonical record path.

### Status and timing

- proposed date;
- review date;
- acceptance or decline date;
- start date;
- expected end date;
- actual end date;
- current status;
- status reason;
- last reviewed date;
- next review date or trigger; and
- supersession links.

### Value

- value form: cash, credit, service, equipment, labor, discount, matching, reimbursement, or mixed;
- currency when cash or priced value applies;
- exact public amount or approved public amount band;
- private exact amount held outside the repository when a public band is used;
- in-kind valuation method;
- valuation confidence and limitations;
- pledged, contracted, received, available, consumed, refunded, expired, and remaining states; and
- restricted versus unrestricted treatment.

### Purpose and restrictions

- public purpose;
- intended outcome;
- funded population or affected groups;
- restrictions;
- explicitly rejected restrictions;
- reporting requirements;
- publication rights;
- data or access implications;
- sponsor-requested benefits;
- approved benefits; and
- prohibited benefits confirmed.

### Authority and conflicts

- responsible steward;
- acceptance authority;
- reviewers;
- reviewer independence limitations;
- conflicts;
- recusals;
- related parties;
- specialist holdpoints;
- legal, accounting, tax, privacy, security, accessibility, clinical, research, or governance review status; and
- exception or decision links.

### Work and outcome linkage

- linked issue, pull request, report, release, fellowship, dataset, audit, contract deliverable, or external artifact;
- work owner;
- planned deliverables;
- delivery status;
- acceptance evidence;
- use or adoption evidence;
- intended outcome;
- observed outcome;
- guardrail outcomes;
- limitations and missing evidence;
- variance;
- residual obligations; and
- correction, restoration, rollback, or replacement work.

### Dependency and continuity

- services, credentials, infrastructure, accounts, data flows, or roles created;
- critical-function status;
- concentration state;
- portability and export;
- replacement options;
- migration owner;
- estimated exit cost or difficulty without false precision;
- expiration behavior;
- teardown requirements;
- termination rights; and
- continuity plan.

### Challenge and correction

- public challenge path;
- private challenge path when protected evidence is required;
- disputes;
- corrections;
- pauses;
- termination reason;
- public notifications; and
- unresolved residual harm.

## Opportunity record fields

A public opportunity should preserve:

- stable ID and revision;
- title and plain-language need;
- status;
- constitutional or institutional purpose;
- intended outcome;
- affected groups;
- requested support class;
- target amount or amount band when appropriate;
- currency;
- whether partial support is useful;
- minimum viable support when applicable;
- in-kind alternatives;
- restrictions the project can accept;
- restrictions the project cannot accept;
- planned work and evidence;
- responsible steward;
- reviewer and independence needs;
- dependency and replacement implications;
- expected duration;
- expiration and review trigger;
- linked issue or roadmap item;
- risks and uncertainty;
- what support does not purchase; and
- public outcome-reporting commitment.

## Amount disclosure

### Exact amounts

Prefer exact public amounts for organizational, restricted, related-party, public-grant, and institutional sponsorship relationships when lawful, practical, and not misleading.

### Amount bands

A reviewed public amount band may be used when exact publication would:

- expose an individual donor;
- violate a legitimate contractual or legal limitation;
- create a re-identification or safety risk;
- reveal protected commercial detail without corresponding public value; or
- create false precision for in-kind valuation.

The approved initial bands are:

- under $1,000;
- $1,000–$4,999;
- $5,000–$24,999;
- $25,000–$99,999;
- $100,000–$499,999; and
- $500,000 or more.

A band is a public-reporting tool, not a substitute for exact private accounting.

### In-kind valuation

Record:

- nominal provider list value;
- expected fair replacement cost where reasonably estimable;
- actual amount consumed;
- expiration and restrictions;
- whether the project would have purchased the service absent the support; and
- valuation uncertainty.

Do not treat unused headline credits as realized cash or public benefit.

## Individual donor privacy

Default treatment:

- aggregate ordinary individual donations;
- publish counts and totals only after re-identification review;
- name a person only with documented permission or a specific reviewed accountability requirement;
- do not expose donation status, amount, contact information, location, message, employer, health interest, or repeat-giving behavior;
- do not rank, badge, profile, or target people by donation; and
- do not link donation to product identity, health account, Fellowship, governance, or permission state.

A donor’s request for anonymity does not permit institutional support, related-party funding, or material influence to become invisible. Use a reviewed withholding label and disclose category, value or band, purpose, conflicts, authority, and material effect when the name cannot safely or lawfully be published.

## Private source system boundary

The public repository must never contain:

- bank, card, wallet, payment, tax, payroll, or accounting account details;
- donor or partner contact lists;
- personal addresses, phone numbers, emails, tax identifiers, or identity documents;
- raw invoices, receipts, statements, reconciliations, or journal entries;
- chargeback, fraud, sanctions, or identity-verification records;
- contracts or grant agreements containing protected or confidential terms;
- raw negotiations or correspondence;
- private compensation records;
- confidential legal, accounting, tax, insurance, or employment advice;
- access credentials, discount codes intended to remain private, service tokens, or private account URLs;
- private due-diligence or vendor-evaluation records; or
- records that reveal personal health, participation, research, account, or permission information.

## Publication review

Before publishing or updating a relationship record:

1. classify the source information;
2. minimize the public derivative;
3. verify factual claims;
4. review conflicts and related parties;
5. review re-identification risk;
6. remove metadata and private URLs;
7. distinguish exact fact, estimate, amount band, in-kind valuation, plan, outcome, and unresolved question;
8. identify the responsible authority and independence limitation;
9. link the correct work and outcome evidence; and
10. set the next review or expiration trigger.

## Correction and supersession

Public records are append-only in institutional meaning even when the current file is updated.

A correction must preserve:

- prior public identifier;
- correction date;
- what was inaccurate or incomplete;
- corrected value or statement;
- responsible authority;
- reason and evidence;
- affected reports or claims;
- whether notification or restoration is required; and
- supersession links when a new record replaces the old relationship.

Do not rewrite history to make a failed, disputed, terminated, or refunded relationship appear clean.

## Reporting cadence

Before actual funding volume exists, update records on material events.

Once operating funding exists, publish at least an annual report and consider quarterly reporting when material volume, restrictions, expenditure, concentration, or public interest warrants it.

A reporting period should reconcile opening state, receipts, value consumed, refunds, expirations, closing state, funded work, outcomes, concentration, conflicts, corrections, and residual obligations.

## Ledger integrity

The public ledger is trustworthy when:

- stable identifiers do not collide;
- status and value states do not collapse;
- a pledge is not counted as received;
- a received restriction is not counted as unrestricted;
- an unconsumed credit is not counted as cash;
- a merged artifact is not counted as proven benefit;
- refunds and expirations reduce available value;
- related-party and conflict records remain visible;
- historical termination and correction remain inspectable;
- private source details do not leak; and
- website or campaign renderers consume only approved PUBLIC fields.
