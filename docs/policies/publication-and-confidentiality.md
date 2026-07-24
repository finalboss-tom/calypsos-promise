# Public Information Boundary and Principled Confidentiality Policy — BASELINE

**Constitutional basis:** Decision 0005  
**Applies to:** repositories, issues, pull requests, discussions, websites, campaign ledgers, reports, media activity, analytics, forms, community operations, AI-assisted work, and any system used to prepare material for public release

## Purpose

Calypso’s Promise publishes its institutional reasoning so people can inspect how attention, authority, money, evidence, and public claims are handled.

That commitment does not make raw source material public.

The governing rule is:

> Publish reviewed, minimized, derived institutional records. Protect raw personal, security, legal, and operational source material.

The project practices **radical legibility with principled confidentiality**.

- **Legibility** means decisions, material relationships, costs, claims, conflicts, corrections, and outcomes can be understood and challenged.
- **Confidentiality** means people, systems, credentials, sources, vulnerabilities, negotiations, and due-process records are not exposed merely to make the project appear transparent.

Transparency is accountable disclosure. It is not indiscriminate disclosure.

## Core assumptions

### Public systems are effectively irreversible

Anything placed in a public repository, branch, commit, issue, pull request, comment, review thread, build log, artifact, preview deployment, paste, social post, or public website must be treated as permanently copied.

Deleting a page or rewriting Git history may reduce exposure. It cannot guarantee recovery of every copy, notification, cache, clone, archive, screenshot, or downstream dataset.

No protected information may enter a public system with the expectation that it can be removed later.

### Raw sources are private by default

The following remain private unless a specific policy and review authorize a minimized public derivative:

- form submissions
- mailing lists and contact lists
- private correspondence
- interview notes
- unpublished pitches and responses
- contracts and negotiations
- moderation evidence
- incident evidence
- security reports
- conduct complaints
- identity and account records
- analytics at person-level granularity
- internal factual-review notes

The public campaign ledger records the institutional fact and outcome. It does not mirror the private source archive.

### Public-by-default begins after classification

“Default to publication” applies after information has been:

1. classified
2. minimized
3. verified
4. reviewed for rights and risk
5. converted into an approved public record

It does not mean that every draft, message, database row, meeting note, screenshot, or working theory starts public.

### The highest-risk element controls the whole record

A record containing information from multiple classes inherits the highest applicable classification until the protected portion is removed and the remainder is independently reviewed.

Removing a name is not enough when timing, role, location, quotation, rare characteristics, or linked public facts can still identify a person.

### Privacy does not imply secrecy about power

Confidentiality may not be used to conceal:

- mission drift
- material conflicts of interest
- related-party relationships
- paid endorsements or sponsorship
- material institutional spending
- the existence and category of a serious incident
- a material correction
- the current holder and scope of authority
- the fact that a decision was made under temporary confidentiality
- a pattern of institutional failure

When underlying details must remain protected, the project should publish a safe summary, responsible authority, reason for withholding, review date, and outcome when possible.

## Information classes

Every nontrivial record should be understood as one of the following classes before it is stored or shared.

### PUBLIC

Information intentionally approved for unrestricted publication.

Examples:

- accepted repository documents and decisions
- public source code and synthetic fixtures
- approved website copy
- published campaign hypotheses and results
- aggregate campaign spending
- public correction records
- public statements and interviews
- final, rights-cleared media assets
- information already lawfully public and accurately attributed

PUBLIC does not mean accurate forever. Public records remain subject to correction, supersession, and status labels.

### REVIEW

Information being prepared for possible publication but not yet approved.

Examples:

- draft essays, posts, pitches, and press materials
- unverified factual claims
- draft aggregate reports
- redacted incident summaries awaiting approval
- pre-release product descriptions
- partner announcements before mutual approval
- unpublished campaign experiments

REVIEW material belongs in an approved private drafting environment. A branch in a public repository is not a private drafting environment.

### RESTRICTED

Nonpublic operational information shared only with people who need it for a defined purpose.

Examples:

- journalist, creator, donor, partner, or specialist contact lists
- private outreach history
- nonpublic meeting notes
- legitimate temporary negotiations
- internal budgets before approved reporting
- embargoed materials accepted under explicit terms
- moderation methods whose publication would enable evasion
- unpublished editorial calendars where release would create material risk
- internal access and responsibility maps
- vendor evaluation records

A public derivative may describe categories, aggregate outcomes, and material relationships without exposing the source record.

### PROTECTED PERSONAL

Information about an identifiable or reasonably re-identifiable person that requires heightened protection.

Examples:

- health and medical information
- account and consent records
- personal contact information
- precise location or routine
- identity documents
- financial, tax, payment, or banking information
- employment and personnel records
- conduct complaints and witness statements
- private correspondence
- information about minors
- biometric information
- confidential source identity
- combinations of otherwise ordinary facts that identify a person

PROTECTED PERSONAL information is never eligible for raw publication through project systems.

A public derivative requires a legitimate purpose, data minimization, applicable permission or authority, re-identification review, and any required specialist approval.

### SECRET OR SECURITY-SENSITIVE

Information whose disclosure could enable unauthorized access, exploitation, evasion, or material harm.

Examples:

- passwords, tokens, API keys, signing keys, recovery codes, and private certificates
- production credentials and infrastructure access
- private vulnerability reports and unreleased exploit details
- authentication or authorization bypass details before remediation
- incident-response access paths
- security architecture details whose publication materially increases risk
- precise anti-abuse thresholds or detection logic that enable evasion
- confidential legal strategy or privileged advice
- source-protection mechanisms

SECRET OR SECURITY-SENSITIVE information may not be placed in public or ordinary contributor systems.

No public derivative may be published until the relevant owner and specialist determine that the risk has been removed or acceptably reduced.

## Publication eligibility matrix

| Information | Public treatment |
| --- | --- |
| Approved strategy, decision, current status, and public claim | Publish directly with version and date |
| Draft or unverified claim | Keep in REVIEW until approved |
| Campaign performance | Publish aggregate, contextualized results |
| Outreach activity | Publish categories and aggregate outcomes, not private target lists or correspondence |
| Paid relationship | Publish the relationship, purpose, and material terms; protect unnecessary personal or contractual detail |
| Partner negotiation | Keep private temporarily; publish the resulting relationship and material conflicts when approved |
| Individual compensation | Aggregate by default; publish person-level amounts only with a legitimate requirement and review |
| Form or signup data | Never publish raw; publish aggregate participation only after re-identification review |
| Health or account information | Never publish raw; do not use in campaign ledgers |
| Private message or quotation | Publish only with permission or exceptional reviewed public-interest justification |
| Security vulnerability | Keep private through remediation; publish a safe advisory when appropriate |
| Conduct complaint | Keep evidence private; publish process and outcome only when lawful, fair, and safe |
| Incident | Publish scope, impact, response, and lessons without exposing affected people or enabling recurrence |
| Legal advice or strategy | Keep confidential; publish the resulting policy or decision when possible |
| Contract | Publish the relationship and material institutional effect; publish full text only when rights and purpose support it |
| Small or unique group result | Withhold, combine, or generalize until individuals cannot reasonably be identified |

## Prohibited public content

The following must not be placed in public project systems, even temporarily:

- real health records or medical documents
- production user records or exports
- credentials, secrets, private keys, recovery codes, or authentication artifacts
- private mailing, donor, partner, media, contributor, or participant lists
- raw form submissions
- identity documents
- private bank, tax, payroll, or payment records
- unpublished vulnerability reproduction using production information
- private complaint, witness, or moderation evidence
- confidential source identity
- privileged legal communications
- private correspondence without approval
- unredacted contracts containing protected information
- screenshots containing protected information
- files whose metadata exposes protected information
- private AI prompts or outputs containing protected information
- production logs containing identifiers or sensitive payloads

This prohibition covers filenames, paths, branch names, commit messages, comments, image metadata, document properties, URL query parameters, analytics payloads, build artifacts, and deleted revisions—not only visible document bodies.

## Safe public derivatives

A public record derived from private source material must satisfy all of the following.

### Purpose limitation

The record has a stated accountability, governance, educational, safety, correction, or institutional-memory purpose.

Curiosity, spectacle, retaliation, embarrassment, or “total transparency” are not sufficient purposes.

### Minimum necessary detail

Publish only what is needed to understand the institutional fact, decision, risk, cost, relationship, correction, or outcome.

Prefer:

- categories over names
- ranges or aggregates over person-level amounts
- month or quarter over precise timestamps
- role over identity
- paraphrase over private quotation
- outcome over raw allegation
- safe technical impact over exploit steps
- public source link over copied private material

### Re-identification review

Before publishing aggregate or redacted information, review whether a person could be identified through:

- small group size
- unusual role or event
- exact timing
- precise geography
- unique quotation
- linked public records
- repeated disclosures across reports
- combinations of demographic or behavioral facts

As an initial campaign default, do not publish a person-level segment containing fewer than 10 people unless a privacy reviewer documents why publication is safe and necessary.

The threshold is a floor, not proof of anonymity.

### Rights and permission

Do not publish private messages, interviews, testimonials, photographs, recordings, case studies, or attributed experiences without documented permission and an opportunity for the represented person to review the intended use.

Permission for one use does not imply permission for every future use.

### Metadata removal

Before publication, inspect and remove unnecessary:

- EXIF location and device data
- document authors and revision history
- comments and tracked changes
- hidden spreadsheet cells and formulas
- embedded files
- private URLs and query strings
- file paths and usernames
- image thumbnails and alternate streams

### Status and uncertainty

Public derivatives must distinguish:

- verified fact
- first-person memory
- inference
- allegation
- estimate
- aggregate
- planned action
- unresolved question
- corrected or superseded information

## Public repository rules

### Only PUBLIC material enters the repository

The public repository may contain:

- approved public documentation
- source code intended for publication
- synthetic fixtures
- public or rights-cleared assets
- reviewed aggregate records
- public references

REVIEW, RESTRICTED, PROTECTED PERSONAL, and SECRET OR SECURITY-SENSITIVE material must be prepared elsewhere.

### All repository surfaces are public

The restriction applies to:

- default and feature branches
- commit history
- pull-request titles and bodies
- issue forms and comments
- code-review comments
- discussions
- action logs
- action artifacts
- dependency and build output
- preview deployments
- bot messages
- deleted or closed items

A draft pull request is public. A branch without a pull request is public. A failed CI artifact may be public.

### Use synthetic and public examples

Examples, screenshots, logs, payloads, transcripts, analytics, and test cases must use fictional, synthetic, or explicitly public information.

Do not “anonymize” a real record and commit it as a fixture. Create a new synthetic record that cannot be traced to a real person.

### Stop before sanitizing in public

When protected information is discovered locally or in a private workspace, sanitize it before creating any public commit.

Do not commit the unsafe version and then add a second “redaction” commit. Both versions remain in history.

## Private source systems

### Separate source and publication systems

The system that stores private outreach, form, incident, conduct, partner, or analytics records must be separate from the public ledger.

The public ledger may contain a stable public record ID. Any mapping to a private source must remain in the approved private system.

Public IDs must not encode email addresses, names, account IDs, health information, or other identifying values.

### Least privilege

Access to nonpublic information must be limited by purpose and role.

Access does not arise merely from being:

- a contributor
- a donor
- a maintainer in an unrelated area
- a community moderator
- a governance participant
- a founder-created office

Access should be reviewed when responsibilities change and removed promptly when no longer needed.

### Collection minimization

Do not collect information merely because it may become useful later.

Every private collection should define:

- purpose
- owner
- fields collected
- access roles
- storage location
- retention period
- deletion method
- public aggregate, if any
- incident contact

### Retention

Private records must not be retained indefinitely by default.

Initial operational defaults:

- unsuccessful prospect and outreach records: review for deletion 12 months after the last meaningful interaction
- raw campaign-form submissions: delete or minimize within 90 days after routing unless the person consented to an ongoing relationship
- superseded working drafts containing nonpublic information: delete when no longer needed for review, legal, or incident purposes
- incident, conduct, legal, financial, and security records: retain under a documented case-specific schedule

A longer period requires a recorded purpose. A shorter period should be used where possible.

Backups and exports must follow the same classification and deletion rules as the primary system.

## AI and automation boundary

Do not provide REVIEW, RESTRICTED, PROTECTED PERSONAL, or SECRET OR SECURITY-SENSITIVE information to an AI model, agent, transcription service, analytics system, or automation unless that exact use and provider have been approved for the classification.

For ordinary public-project AI assistance:

- use public or synthetic inputs
- replace names and identifiers with non-meaningful placeholders
- omit private correspondence
- do not upload contact lists, contracts, incident evidence, health records, credentials, or private repository content
- review generated output for reconstruction of protected facts
- do not allow an agent to publish directly without human review
- treat prompts, traces, tool calls, and generated files as records subject to this policy

An AI-generated summary does not declassify its source.

## Publication review

### Standard review

Before material publication:

1. identify the responsible publisher
2. classify the source material
3. confirm the public purpose
4. verify facts and source rights
5. minimize and redact
6. inspect metadata and linked files
7. confirm status and uncertainty language
8. obtain required approvals
9. preview in a nonpublic environment
10. publish and record the version
11. monitor for correction or harm

### Two-person review

At least two qualified people must approve a public derivative involving:

- health or personal information
- security incidents or vulnerabilities
- legal disputes or privileged-source boundaries
- allegations, complaints, conduct, or personnel matters
- minors or vulnerable people
- individual compensation or financial hardship
- private partner or donor information
- confidential sources
- a founder conflict of interest or founder-conduct response
- information whose publication could plausibly enable harassment or retaliation

The subject of a conflict may provide facts but may not be the sole approver of the public record.

### Specialist review

Relevant specialist review is required for claims or disclosures involving:

- privacy
- security
- clinical or health matters
- legal rights or obligations
- research participants
- accessibility
- financial or tax status
- safety

A communications approval cannot substitute for specialist review.

### Emergency communication

Urgency may shorten wording and approval time. It does not remove privacy, security, accuracy, or due-process boundaries.

An emergency update should publish the minimum verified information necessary to protect people and systems, name uncertainty, and identify the next review point.

## Media, creator, and partner records

### Outreach

Public reporting may include:

- number of contacts by category
- subject area
- public pitch version
- aggregate response status
- resulting public coverage
- material paid or related-party relationship
- lessons and decision

Do not publish:

- private contact details
- a list of people who did not respond
- private replies
- inferred attitudes
- unpublished source conversations
- personal ranking by favorability
- correspondence used to mobilize pressure

### Embargoes and background

The private record should capture agreed terms. The public record may state that information was shared under an embargo or background agreement after doing so no longer undermines the agreement.

Do not publish private terms merely to prove transparency.

### Partners and sponsors

Disclose the existence, purpose, material conflict, and institutional effect of a relationship.

Do not publish protected employee information, bank details, signatures, private addresses, or unrelated contract clauses.

## Conduct, complaints, and due process

Open institutional governance requires visible processes. It does not require public trials by raw document dump.

Complaint and conduct source records remain private to the authorized process.

A public outcome may state:

- the policy involved
- the responsible process
- whether the matter was substantiated, unsubstantiated, unresolved, or closed for another stated reason
- the institutional action
- appeal or review status
- changes made to prevent recurrence

Do not publish allegations as established fact.

Protect complainants, witnesses, respondents, and reviewers from unnecessary exposure and retaliation.

## Security and accidental disclosure

Any protected information entering a public system is a privacy or security incident.

### Immediate response

1. stop further publication and sharing
2. preserve only the minimum evidence needed in a private incident record
3. remove or restrict the public material where possible
4. rotate or revoke exposed credentials before relying on deletion
5. request cache, artifact, preview, or host removal where available
6. identify affected people, systems, and downstream copies
7. notify the responsible privacy, security, legal, or governance role
8. assess notification obligations and direct harm
9. publish a safe incident statement when appropriate
10. update the control that failed

Do not paste the exposed material into a new public issue to report it.

Do not ask a contributor to prove exposure by reposting the information.

### Public incident record

When safe, publish:

- incident category
- date range
- affected public surface
- high-level information class
- impact
- containment and remediation
- whether affected people were contacted
- known limitations
- process change

Do not publish the protected content itself or details that create a second exposure.

### No retaliation

Good-faith private reporting of accidental exposure must not be punished merely because the report is inconvenient or embarrassing.

## Confidentiality register and declassification

Material nonpublic institutional decisions should have a private confidentiality record containing:

- record ID
- category
- owner
- reason
- people or roles with access
- creation date
- review date
- declassification condition
- safe public summary, when possible

Confidentiality must be reviewed. It may not remain indefinite by inertia.

Possible outcomes are:

- remain restricted with a new review date
- publish a minimized derivative
- declassify the source
- delete the source under its retention rule
- transfer it to a more appropriate protected system

## Authority

During the current phase:

- the founding steward is accountable for publication decisions and implementation of this policy
- maintainers review repository, status, governance, and technical disclosures
- privacy and security reviewers may block publication that creates material risk
- specialist reviewers control claims within their professional scope
- incident responders may temporarily remove public material to contain harm
- no role, including the founder, may override the prohibition on exposing protected information through ordinary communications approval

Later governance should separate publication, privacy, security, legal, financial, conduct, and constitutional review authority.

## Enforcement and safeguards

### Current repository controls

The repository policy check blocks:

- common private-key content
- selected credential patterns
- key-file extensions
- committed environment files

Public campaign documents should remain reviewed Markdown or explicitly approved structured public records. Raw exports, archives, databases, and contact-list files do not belong under the public communication paths.

### Required operational controls before launch

- private intake channels for security, privacy, corrections, conduct, media, and partner communication
- documented access roles
- a private publication-candidate workspace
- metadata removal for published assets
- two-person review for high-risk disclosure
- retention and deletion records
- a public correction route
- an accidental-disclosure response owner
- a public status label for confidentiality-related incidents when safe

### Violations

The project may remove public content, close access, pause publication, rotate credentials, suspend a workflow, or begin a conduct or incident process when this policy is violated.

The response should focus on containment, correction, proportional accountability, and prevention—not public humiliation.

## Review checklist

Before publishing, confirm:

- [ ] The information has a public purpose.
- [ ] Every source has been classified.
- [ ] Only the minimum necessary detail remains.
- [ ] No health, account, contact, identity, payment, complaint, or source information is exposed.
- [ ] No credential, key, vulnerability, access path, or evasion detail is exposed.
- [ ] Names, quotations, images, and stories have the necessary permission.
- [ ] Aggregates were reviewed for re-identification and small groups.
- [ ] Files, images, links, and metadata were inspected.
- [ ] Facts, memory, inference, estimate, and allegation are distinguished.
- [ ] Material relationships and conflicts are disclosed safely.
- [ ] Required maintainer and specialist reviews are complete.
- [ ] The record has a version, owner, date, and correction path.
- [ ] The source material remains in an appropriate protected system or has been deleted under policy.

## Policy test

Before publishing any disputed information, ask:

> Can the public understand the institutional fact, power, risk, relationship, cost, decision, or outcome without exposing the person or enabling harm?

When the answer is yes, publish the minimized institutional record.

When the answer is no, protect the source and publish only the safe category, reason, and review state that accountability requires.
