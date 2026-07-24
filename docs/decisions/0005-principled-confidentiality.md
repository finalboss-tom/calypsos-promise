# Decision 0005 — Radical Legibility with Principled Confidentiality

- **Status:** Accepted
- **Date:** 2026-07-24
- **Owners:** Founding steward
- **Affected frozen components:** open code and private health data; player sovereignty; progressive decentralization; public-domain commons; public institutional memory
- **Related issues or pull requests:** PR #15

## Context

Calypso’s Promise is publishing its marketing and public-relations strategy, campaign hypotheses, costs, corrections, failures, and decisions as part of the project’s open institutional record.

This creates a deliberate tension.

The project must make power, reasoning, money, claims, conflicts, and outcomes inspectable. It must also protect personal information, health information, credentials, vulnerabilities, sources, due-process records, private correspondence, legitimate negotiations, and operational details whose release would enable harm.

An undefined “radical transparency” norm would be unsafe. It could encourage contributors or future stewards to place raw source material into public repositories or ledgers merely because public documentation is culturally rewarded.

A private-by-default communications system would avoid some disclosure risk but would contradict the public-domain, provenance, correction, and founder-independence objectives.

The institution therefore needs a constitutional distinction between:

- public institutional facts that should be legible
- private source material that must remain protected
- safe public derivatives that preserve accountability without exposing people or systems

## Source basis

This decision builds on:

- the Product Constitution’s private-by-default and meaningful-refusal requirements
- the frozen rule that open software does not mean open personal health data
- the Seven Laws, especially the Sanctity of the Hearth, Law of the True Chronicle, Right of Return, and Covenant of the Commons
- Decision 0003’s requirements for public institutional memory, transparent authority, conflicts, succession, and founder independence
- Decision 0004’s public-domain commons direction and explicit exclusion of personal information and third-party material
- `SECURITY.md` and its prohibition on public vulnerability, secret, and production-data reporting
- the open marketing and public-relations strategy established in PR #15

## Decision

Calypso’s Promise adopts **radical legibility with principled confidentiality** as a frozen institutional boundary.

### Public record rule

The project publishes reviewed, minimized, derived institutional records.

It does not publish raw personal, health, security, legal, conduct, correspondence, negotiation, or operational source material merely to demonstrate transparency.

### Classification rule

Information must be classified before publication as:

- PUBLIC
- REVIEW
- RESTRICTED
- PROTECTED PERSONAL
- SECRET OR SECURITY-SENSITIVE

Only PUBLIC information may enter public repositories, branches, issues, pull requests, logs, artifacts, websites, APIs, or campaign ledgers.

A record containing multiple classes inherits the highest classification until protected information is removed and the remainder is reviewed.

### Irreversibility rule

Public Git and public communication systems must be treated as effectively irreversible.

Protected information may not be committed with the intention of redacting it in a later commit.

### Derived-record rule

When institutional accountability requires disclosure but the source must remain private, the project should publish the minimum safe derivative that communicates:

- the institutional fact
- responsible authority
- material relationship, cost, conflict, risk, correction, or outcome
- reason for withholding details
- review or declassification state when appropriate

### Protected-source rule

Raw form submissions, contact lists, private correspondence, health and account information, conduct evidence, security reports, credentials, private analytics, contracts, and incident evidence must remain outside public and ordinary contributor systems.

### Review rule

Material publication requires classification, minimization, factual verification, rights review, metadata inspection, and an accountable publisher.

High-risk publication involving personal information, health, security, allegations, legal disputes, vulnerable people, confidential sources, individual compensation, or founder conflicts requires two-person review and the relevant specialist approval.

No founder, maintainer, communications lead, donor, or governance office may unilaterally waive these protections through ordinary communications authority.

### Confidentiality-accountability rule

Confidentiality may not be used to conceal mission drift, material conflicts, paid influence, related-party relationships, material institutional spending, the existence of a serious incident, corrections, or the current scope of authority.

When details cannot safely be published, the category and reason should be disclosed when doing so is safe.

### Incident rule

Protected information entering a public system is a privacy or security incident.

The project must contain exposure, rotate or revoke compromised access, remove public copies where possible, assess affected people and systems, preserve minimal evidence privately, and publish a safe incident record when appropriate.

Deletion or history rewriting is not treated as proof that exposure has been reversed.

### Operational-policy rule

`docs/policies/publication-and-confidentiality.md` is the implementation baseline for this decision.

Its classifications, review workflow, examples, retention defaults, and operational controls may improve through evidence, but ordinary updates may not weaken the frozen principles above.

## Consequences

### Benefits

- The open campaign and institutional ledger can remain genuinely inspectable without becoming a privacy hazard.
- Contributors receive a clear rule for what belongs in public Git.
- Future stewards cannot interpret “build in public” as permission to expose raw records.
- Journalists, creators, partners, complainants, specialists, and community members retain legitimate privacy.
- Material power, spending, conflicts, and corrections remain visible through safe derivatives.
- The communications system becomes transferable without requiring the founder’s private memory or inbox.
- The policy aligns the institution’s own Chronicle with the product’s provenance and agency principles.

### Costs and tradeoffs

- Publication requires classification and review effort.
- Some observers may mistake necessary confidentiality for incomplete transparency.
- Private source systems and access controls must exist alongside the public ledger.
- Aggregate or redacted reporting may be less emotionally compelling than raw disclosure.
- High-risk communication may be slower.
- The institution must maintain declassification, retention, and correction processes.

### Risks

- Overclassification could hide material failures or conflicts.
- Underclassification could expose people or systems.
- Redacted or aggregated records may still permit re-identification.
- The founder or future officials could misuse “temporary confidentiality.”
- A public record could accidentally include protected metadata or linked files.
- Reviewers could become bottlenecks or concentrate excessive power.

These risks are addressed through published categories and reasons, review dates, two-person approval, specialist review, correction records, public safe summaries, and eventual separation of publication and oversight authority.

## Alternatives considered

### Total or radical transparency

Rejected because raw disclosure is incompatible with health privacy, security, source protection, due process, and meaningful consent.

### Private strategy with only polished public outputs

Rejected because it would preserve the conventional opacity around narrative construction, influence, costs, mistakes, and strategic changes.

### Ad hoc judgment without a classification system

Rejected because it would depend excessively on founder intuition and create inconsistent, nontransferable disclosure practices.

### Publish everything after simple redaction

Rejected because names are not the only identifiers, metadata can leak, combinations of facts can re-identify people, and some source material should not be public in any raw form.

### Separate the campaign into a different public repository

Not selected as the primary solution. Repository separation can improve navigation later, but it does not itself establish safe publication rules.

## Validation or review required

Before external campaign launch:

- the publication and confidentiality policy must be linked from contributor and campaign documentation
- the public ledger must be generated only from allowlisted public fields
- private intake channels must exist for security, privacy, corrections, conduct, media, and partners
- high-risk publication must have an identified second reviewer
- repository checks must continue to block obvious credentials and sensitive file types
- campaign forms and analytics must be reviewed for collection minimization and re-identification risk
- accidental-disclosure response ownership must be documented
- qualified legal, privacy, and security review remains required as the real product and organization mature

## Migration and rollback

The migration is additive:

1. add the detailed publication and confidentiality policy
2. link it from frozen foundations, contributor guidance, security, campaign strategy, and website specifications
3. add information-handling confirmation to the pull-request template
4. strengthen repository checks for public communication raw exports and common credentials
5. establish private intake and publication-candidate systems before launch
6. add public safe-summary and confidentiality-review records when operational systems exist

Rollback may tighten publication or temporarily pause a public surface when harm is discovered.

Rollback may not redefine protected information as public merely to simplify operations or preserve a campaign schedule.

## Freeze impact

This decision establishes a new frozen institutional boundary:

> The institution’s reasoning and material exercise of power should be public. The protected source material of people and systems should not be.

Material weakening requires constitutional review and a replacement decision record.
