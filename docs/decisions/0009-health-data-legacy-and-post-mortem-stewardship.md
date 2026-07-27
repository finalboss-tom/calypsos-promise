# Decision 0009 — Health Data Legacy and Post-Mortem Stewardship

- **Status:** PROPOSED BASELINE
- **Date:** 2026-07-27
- **Decision class:** Product, data, privacy, succession, governance, and institutional resilience
- **Authority:** Founding steward under the Phase 0 governance baseline
- **Tracking issue:** [#39](https://github.com/finalboss-tom/calypsos-promise/issues/39)
- **Entry baseline:** Phase 0 Funding and Sponsorship Baseline squash commit `32ac27bfb35ed64f34c64108a5d54c375d429593`
- **Independent review:** Not yet obtained; estate, probate, digital-assets, health-privacy, contract, electronic-signature, security, accessibility, research-governance, and jurisdiction-specific review remain pending

## Context

Calypso’s Promise helps a person construct a high-quality longitudinal Living Chronicle under that person’s control. The Chronicle may contain observations, documents, provenance, corrections, relationships, uncertainty, and derived knowledge that remain useful after the person dies.

That continuing value may be:

- **personal and memorial** — preserving an intelligible account of a life and health journey;
- **familial** — helping descendants or relatives understand relevant family-health history;
- **scientific** — supporting carefully governed longitudinal research, hypothesis testing, or rare-condition evidence;
- **historical** — preserving a provenance-rich record for later scholarship or archives; or
- **institutional** — demonstrating how a person’s instructions, rights, and contribution remain respected across time.

Continuing value does not make post-mortem information abandoned, automatically public, automatically research-ready, automatically inheritable, or platform property. It strengthens the need to let the person determine what should happen while they are alive and capable.

The frozen Vision already requires care for abandoned accounts, delegated stewardship, legacy wishes, intergenerational succession, durable archives, and a hundred-year institution. The Living Chronicle, House of Keys, and Sprint 5 security baselines deliberately defer estate, incapacity, caregiver, and successor authority until a separate architecture defines the boundaries.

Without an explicit decision, implementation convenience could cause one of two failures:

1. valuable longitudinal records are destroyed or abandoned because the platform has no legitimate succession path; or
2. family, executors, researchers, operators, or the platform receive broad access merely because the person died.

Both outcomes would violate the Promise.

## Source basis

### Internal sources

- [Product Constitution](../frozen/product-constitution.md)
- [Vision and Institutional Mandate](../../VISION.md)
- [Architecture Foundation](../frozen/architecture.md)
- [Living Chronicle Identity and Authority Boundary](../architecture/living-chronicle-identity-authority.md)
- [House of Keys Ontology and Authority Boundary](../architecture/house-of-keys-ontology.md)
- [Account Recovery and Emergency Access Model](../security/account-recovery-and-emergency-access-model.md)
- [Institutional Immune System](../governance/institutional-immune-system.md)
- [Public Institutional Roadmap](../../ROADMAP.md)

### External legal reference points

These are examples that shape the architecture. They are not a universal legal conclusion or a representation that every rule applies to Calypso’s Promise in every operating model or jurisdiction.

- [HHS guidance on health information of deceased individuals](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/health-information-of-deceased-individuals/index.html) states that HIPAA protects a decedent’s identifiable health information for 50 years and recognizes the legally authorized personal representative during that period. This applies to HIPAA-regulated protected health information, not automatically to every Calypso’s Promise record, and it is not a 50-year retention mandate.
- [HHS guidance on personal representatives](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/personal-representatives/index.html) explains that authority for a deceased person commonly derives from applicable law and may include an executor, administrator, or another legally authorized person.
- [15 U.S.C. § 7003](https://www.law.cornell.edu/uscode/text/15/7003) excludes records governed by laws concerning wills, codicils, and testamentary trusts from the federal E-SIGN Act’s general rule. An in-product directive must therefore not be represented as a universally valid electronic will.
- The Uniform Law Commission’s [Revised Uniform Fiduciary Access to Digital Assets Act](https://www.uniformlaws.org/viewdocument/final-act-with-comments-40?CommunityKey=f7237fc4-74c2-4728-81c6-b39a91ecdf22) illustrates how digital-asset access can depend on state enactment, fiduciary role, user consent, estate documents, and the type of digital asset. The project must verify the law actually applicable to a person, account, custodian, and requested action.

## Decision

Calypso’s Promise accepts **Health Data Legacy and Post-Mortem Stewardship** as a first-class future product and institutional capability.

A future implementation must let a person create, inspect, export, revoke, and supersede a versioned **Legacy Directive** that expresses what should happen to the person’s Living Chronicle during incapacity and after death.

The Legacy Directive is a platform-recognized instruction and evidence artifact. It is not, by itself, represented as:

- a universally enforceable will, codicil, testamentary trust, advance directive, health-care proxy, power of attorney, beneficiary designation, or court order;
- proof that the person legally owns every source document or data element;
- proof that a named steward has legal authority;
- permission to bypass an executor, administrator, personal representative, guardian, conservator, court, source-system restriction, or applicable law; or
- a permanent grant to research, commercial, public, or institutional actors.

The intended product model is an in-platform directive that can be referenced by, exported for, and reconciled with a valid estate, incapacity, or digital-asset plan where the applicable jurisdiction permits.

## Core interpretation

The enduring asset is not merely a collection of bytes. It is the person’s continuing authority to determine the Chronicle’s future within the limits of applicable law, the rights of other people, source restrictions, technical feasibility, and legitimate fiduciary duties.

The platform must preserve these choices:

- retain the Chronicle under protected custody;
- transfer bounded stewardship or administrative access;
- provide a complete or limited export;
- disclose a minimized family-health derivative;
- authorize a separately governed research contribution;
- authorize a private or public historical archive under explicit conditions;
- delay or embargo a permitted disclosure;
- direct deletion where legally and technically possible;
- prohibit named uses, recipients, categories, or disclosures; or
- make no post-mortem contribution at all.

None is the default merely because it may create social value.

## Distinct authority conditions

The architecture must not collapse these conditions:

1. **ordinary living control** — the capable person directly controls the Chronicle;
2. **ordinary delegation** — the person creates a revocable, limited delegation while retaining control;
3. **incapacity stewardship** — a temporary or continuing authority is asserted because the person cannot currently exercise direct control;
4. **post-mortem stewardship** — authority is asserted after verified death;
5. **account recovery** — access credentials or account links are restored without creating new representative authority;
6. **abandoned-account administration** — inactivity or failed contact triggers preservation and notice rules but never proves incapacity or death; and
7. **institutional continuity** — a successor operator or institution preserves custody and service continuity without acquiring personal authority.

Evidence sufficient for one condition is not automatically sufficient for another.

## Authority and conflict rule

A named Legacy Steward does not receive authority merely because the person selected them in the product. A claimant does not receive authority merely because they are family, possess credentials, know private facts, hold an export, paid for service, control infrastructure, or report a death.

A future system must identify and reconcile, as applicable:

- the person’s latest valid platform directive;
- the person’s known prior expressed restrictions;
- a court order or legally recognized fiduciary authority;
- a will, trust, power of attorney, advance directive, digital-asset instruction, or other relevant external record;
- the custodian’s lawful account terms and obligations;
- the rights and restrictions attached to third-party source records;
- the rights and safety of other identifiable or inferable people; and
- conflicting claims, revocations, superseding records, or evidence of coercion, fraud, abuse, neglect, or endangerment.

The platform must not publish one universal precedence rule. Applicable law and the exact role, record, asset, and action determine authority.

When material authority conflicts, the system must fail closed for irreversible or high-consequence actions, place the affected scope under a legal or authority hold, preserve evidence, and route the matter to a qualified review process.

## Legacy Directive requirements

A Legacy Directive should eventually preserve:

- stable directive identity, revision, status, and supersession history;
- the controlled Chronicle and affected subjects;
- the person’s confirmation and execution evidence;
- the jurisdiction or legal-context assumptions used at creation;
- separate incapacity and death instructions;
- primary and contingent Legacy Stewards;
- references to relevant external estate or authority records without publishing protected documents;
- permitted purposes, recipients, data categories, selectors, actions, and durations;
- prohibited purposes, recipients, categories, actions, and public uses;
- preservation, export, deletion, embargo, archival, and sunset instructions;
- family-health derivative instructions;
- research-contribution instructions and withdrawal or closure behavior where possible;
- treatment of economic proceeds or compensation only when separately authorized by applicable law and project economics policy;
- special restrictions for genetic, reproductive, psychiatric, substance-use, abuse-related, minor, caregiver, and other sensitive information;
- notification, challenge, appeal, and contest routes;
- review and revalidation timing;
- accessibility and direct-language evidence; and
- unresolved uncertainty and specialist-review status.

The directive must remain editable, exportable, and revocable while the person retains capacity and control. Each material change creates a new revision rather than silently rewriting prior instructions.

## Activation boundary

Inactivity, missed gameplay, an unpaid account, a bounced email, a long period without data, an AI prediction, family assertion, or operator belief must never activate incapacity or post-mortem authority.

A future activation flow must include, in proportion to consequence:

1. a reported event creates a case without assuming it is true;
2. high-consequence exports, deletion, permission expansion, and external transmission may be temporarily restricted when takeover or destruction risk is material;
3. incapacity or death evidence is independently verified through approved, minimized channels;
4. claimant identity, role, scope, and legal authority are reviewed separately from event verification;
5. named stewards, contingent stewards, known representatives, and other required parties receive safe notice where lawful and appropriate;
6. a challenge or waiting period applies before difficult-to-reverse release unless a reviewed lawful exception exists;
7. conflicting claims create a contested hold;
8. the exact directive revision, external authority, data scope, purpose, recipient, action, and duration are evaluated;
9. the House of Keys creates or evaluates only the bounded authority required for the approved action;
10. the system produces person-, steward-, or fiduciary-visible receipts and protected operational audit evidence;
11. downstream obligations, deletion limits, and unresolved copies remain visible; and
12. the case closes only after correction, restoration, residual harm, and revalidation duties are recorded.

Death verification and authority verification are separate. Verification that a person died does not determine who may act or what they may do.

## Incapacity boundary

Incapacity may be temporary, partial, contested, or reversible. Incapacity stewardship must therefore:

- define the exact decision or action scope;
- preserve the person’s participation to the greatest safe and lawful extent;
- avoid treating diagnosis or disability as automatic incapacity;
- preserve supported decision-making and accessible alternatives;
- expire or revalidate;
- restore direct control promptly when the authority basis ends; and
- retain challenge and restoration paths for incorrect activation.

A post-mortem workflow cannot be reused as an incapacity shortcut.

## Post-mortem data classes

The system must distinguish at least:

- **protected custody archive** — retained privately without authorizing new use;
- **fiduciary administration view** — minimized information required to administer the directive or estate-related task;
- **complete Chronicle export** — a portable representation with provenance and limitations;
- **family-health derivative** — a purpose-limited, minimized summary relevant to relatives rather than a default full record;
- **research contribution** — separately authorized data released under an approved research-governance, security, retention, withdrawal, publication, and result-return framework;
- **historical archive** — private, embargoed, restricted, de-identified, or identifiable archival use under explicit conditions; and
- **deletion outcome** — verified deletion, retained exception, tombstone, downstream uncertainty, and residual-copy status.

Permission for one class does not imply another.

## Family and third-party privacy

A Living Chronicle may contain or reveal information about relatives, partners, caregivers, children, clinicians, correspondents, genetic relatives, and other third parties.

The person’s directive cannot automatically waive another person’s rights or convert relational information into unrestricted inheritance. A future implementation must support:

- subject-aware and relationship-aware minimization;
- redaction or omission of third-party identifiers where required;
- separate handling for family-health summaries and complete exports;
- protection against genetic or familial inference beyond the intended purpose;
- heightened review for minors, dependents, abuse, reproductive information, and contested family relationships;
- restrictions on public archives that could expose living people; and
- correction paths for demonstrably inaccurate relational claims without letting a successor rewrite the deceased person’s record as though they were the original confirmer.

## Chronicle and House of Keys separation

Legacy and succession state is not Living Chronicle truth.

The Living Chronicle records the person’s health and lived-experience assertions, sources, provenance, corrections, and lifecycle. A successor may administer access, request an export, submit a representative correction request, or add a clearly attributed external statement where a future contract permits. The successor may not impersonate the person, retroactively become the person’s confirmer, or silently rewrite the Chronicle.

The Legacy Directive and verified representative authority may supply an authority basis to the House of Keys. They do not become blanket permission. Every operation remains purpose-, recipient-, category-, selector-, action-, condition-, and time-specific, with deterministic evaluation and receipts.

## Prohibited outcomes

Calypso’s Promise must not:

- treat death, incapacity, or inactivity as platform ownership;
- activate a directive from inactivity alone;
- grant broad family access by default;
- let a named steward self-certify death, incapacity, identity, and authority;
- allow the first claimant to export or delete before conflicting claims can be considered;
- represent a platform directive as a universally valid will or estate plan;
- claim universal legal ownership of every health-data element;
- make post-mortem research, commercialization, model training, public release, or archive participation automatic;
- permit an executor, steward, operator, researcher, funder, or institution to broaden authority for convenience;
- create an AI persona that impersonates the deceased or continues making authoritative choices in their name;
- reward a person during life for broader post-mortem permission;
- sell post-mortem access or prioritize a claimant, researcher, or archive because they can pay;
- suppress the person’s known restrictions to maximize scientific or historical value;
- use a successor’s permission to erase access receipts, correction history, disputes, or prior disclosures; or
- claim that de-identification eliminates all re-identification or familial inference risk.

## Research and historical-use boundary

A longitudinal Chronicle may be unusually valuable for research or history, but usefulness is an empirical and context-specific claim. Quality, completeness, bias, provenance, representativeness, consent, identifiability, and lawful authority determine what it can support.

A research or archival release requires its own approved purpose, recipient, data scope, safeguards, retention, publication, withdrawal or closure behavior, benefit-sharing or compensation treatment where applicable, conflicts, and outcome reporting. A general statement such as “for science,” “for family,” or “for history” is not sufficient authority.

Public-domain project code and documentation do not place personal health data, post-mortem records, source documents, images, correspondence, or identifiable archives into the public domain.

## Economic boundary

The project does not claim that a Chronicle has a guaranteed fixed monetary value or that it is universally transferable property.

Any future payment, licensing, benefit-sharing, inheritance, archive fee, research compensation, or proceeds arrangement must be separately authorized under applicable law, the person’s directive, the House of Keys, research governance, and the project’s economics and conflict rules.

A fiduciary, platform operator, researcher, archive, funder, or related party may not approve their own self-dealing access or assign value in a way that creates authority.

## Consequences

### Benefits

- the person’s control extends into a long-horizon design rather than ending at account inactivity;
- valuable longitudinal evidence can be preserved without making preservation equivalent to disclosure;
- descendants may receive minimized, relevant family-health information when the person and applicable law permit;
- research and history can receive carefully governed contributions rather than opportunistic post-mortem access;
- executors, administrators, personal representatives, stewards, operators, and researchers receive distinct roles instead of one ambiguous successor account;
- false-death, account-takeover, family-conflict, coercion, and deletion-race risks become explicit before implementation; and
- the hundred-year mandate gains a person-level counterpart to institutional succession.

### Costs and risks

- jurisdiction-specific law may produce different authority and precedence outcomes;
- verifying death, incapacity, identity, documents, and fiduciary status creates high-consequence security and accessibility burdens;
- family, executor, steward, provider, and court instructions may conflict;
- complete exports can expose living relatives and third parties;
- deletion and long-term preservation can be technically or legally incompatible in some scopes;
- research and historical value can create pressure to override privacy or minimize uncertainty;
- the platform may cease operating before a directive activates;
- long-term key, format, provider, and institutional migration are difficult;
- a founder-led design lacks independent legitimacy; and
- no documentation can guarantee that a directive will be recognized by a court, provider, custodian, or jurisdiction.

## Alternatives considered

### Delete every Chronicle automatically at death

Rejected as the universal rule. It would destroy person-directed familial, scientific, historical, and memorial value and could conflict with the person’s wishes or legal duties. Deletion remains an available directive outcome.

### Transfer the complete Chronicle automatically to next of kin

Rejected. Kinship does not prove legal authority, safety, intended purpose, or permission to expose third parties.

### Give the named Legacy Steward unrestricted control

Rejected. A platform nomination is evidence of intent, not universal legal authority or blanket permission.

### Let the executor always override every platform instruction

Rejected as a universal architecture rule. Applicable law, role scope, court authority, source restrictions, prior instructions, and the exact requested action must be evaluated. The platform must defer legal conclusions to qualified jurisdiction-specific review.

### Treat the Legacy Directive as an electronic will

Rejected. Execution and recognition of wills and similar records are jurisdiction-specific, and federal E-SIGN law contains an express exception for wills, codicils, and testamentary trusts.

### Defer all documentation until implementation

Rejected. Death and incapacity create irreversible disclosure and deletion risks. The rights and authority boundaries must exist before account, identity, custody, research, or agent implementation makes accidental policy.

## Validation and review required

Before any production activation, the project must obtain and record appropriate review for:

- estate, probate, fiduciary, incapacity, digital-assets, contract, and electronic-signature law;
- health privacy and the project’s actual HIPAA or other regulatory status;
- cross-border and conflict-of-laws behavior;
- identity, death, incapacity, document, representative, and court-order verification;
- security, fraud, coercion, abuse, insider, and account-takeover threats;
- accessibility, supported decision-making, cognitive accessibility, and non-digital alternatives;
- genetic, family, minor, caregiver, and third-party privacy;
- research ethics, participant representation, withdrawal, publication, and result return;
- archival ethics, embargoes, rights of living people, and historical release;
- encryption, key recovery, provider migration, continuity, and platform shutdown; and
- deletion, retention exceptions, backups, recipients, and residual copies.

Required synthetic and tabletop scenarios include:

- a false death report during an account takeover;
- a forged death certificate or fiduciary document;
- conflicting executor and named-steward instructions;
- a directive that conflicts with a court order or later estate record;
- temporary incapacity followed by restored capacity;
- abusive or estranged family seeking access;
- one claimant attempting deletion while another challenges;
- research pressure to broaden a narrow legacy contribution;
- a family-health request that would expose a living relative;
- a complete export containing third-party correspondence;
- death across multiple jurisdictions;
- a minor or dependent subject;
- provider shutdown or key loss before activation;
- migration to a successor institution; and
- an attempt to generate or operate an AI impersonation of the deceased.

## Migration and rollback

This decision creates a design baseline, not a production data migration.

Implementation details, directive fields, status names, evidence methods, legal profiles, waiting periods, and service procedures may be superseded through a later decision with migration, notice, compatibility, and rollback evidence.

A deployed capability must support:

- revocation and supersession while the person is alive and capable;
- suspension of new activations;
- read-only or protective custody modes;
- rollback of incorrectly granted access where technically possible;
- correction and notification after mistaken activation;
- preserved audit and receipt history;
- provider and institutional migration; and
- legitimate shutdown, export, transfer, deletion, or archive handling if Calypso’s Promise ceases operation.

Disclosure cannot always be undone. Residual harm and downstream uncertainty must remain explicit.

## Unresolved gates

This decision does not select or approve:

- a legal entity, custodian, trustee, executor service, archive, research repository, or verification provider;
- a jurisdiction or legal-document form;
- electronic signature, notarization, witnessing, identity-proofing, or document-verification methods;
- a universal authority-precedence algorithm;
- incapacity standards or clinical determination;
- data retention periods;
- encryption, escrow, recovery, or long-term key-custody implementation;
- public, private, identifiable, limited, de-identified, or anonymous archive rules;
- compensation, inheritance, licensing, property, tax, or proceeds treatment;
- service levels, staffing, fees, insurance, indemnity, or dispute forum;
- research or historical archive activation; or
- production readiness.

## Revalidation triggers

Revalidate this decision:

- before a Legacy Directive is represented as more than a design prototype;
- before any incapacity, death, fiduciary, estate, or successor workflow becomes LIVE;
- when a legal entity, custodian, identity provider, archive, research repository, or verification provider is selected;
- when the project enters a jurisdiction with materially different estate, privacy, digital-assets, or health-data law;
- after the first contested authority case, false activation, mistaken release, or failed deletion;
- before any identifiable research or public historical release;
- before an AI system may represent a deceased person in any form;
- during each institutional phase-exit review that relies on the capability; and
- when evidence weakens the assumption that retaining a Chronicle creates enough legitimate value to justify its continuing risk and cost.

## Freeze impact

This decision **clarifies and implements** existing frozen commitments. It does not amend the Product Constitution, Vision, or Architecture Foundation.

It gives concrete meaning to the Vision’s requirements for legacy wishes, abandoned-account stewardship, intergenerational succession, durable archives, and a founder-independent hundred-year institution while preserving the frozen Promise:

> Build your Living Chronicle. Improve your health. Keep the key.

Keeping the key includes the right to decide, within lawful and technically honest limits, what the Chronicle becomes when the person can no longer turn it themselves.
