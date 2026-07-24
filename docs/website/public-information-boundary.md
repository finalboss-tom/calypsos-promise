# Public Information Boundary Website and Ledger Controls — BASELINE

**Purpose:** Translate Decision 0005 and the publication and confidentiality policy into public website, campaign-ledger, form, API, and administrative controls.

This document supplements:

- `information-architecture.md`
- `campaign-entry-points.md`
- `open-campaign-transparency.md`
- `../policies/publication-and-confidentiality.md`

## Public route

Add:

- `/voyage/disclosure` — plain-language public-information and principled-confidentiality policy

The route should answer:

- What does the project publish?
- What never enters the public ledger?
- Why are some details aggregated or withheld?
- Who reviews high-risk publication?
- How can accidental disclosure be reported?
- How are confidential records reviewed or declassified?
- How can a person request a correction or removal review?

## Public statement

Display prominently:

> We publish the institution’s reasoning and material exercise of power. We do not publish the protected source material of people and systems.

Supporting explanation:

> Public campaign records are reviewed, minimized institutional derivatives. Raw signups, contact lists, private messages, health information, conduct evidence, credentials, security reports, and confidential source material remain outside the public system.

## Information-class display

The public page should describe the five classes without exposing private examples:

- **PUBLIC** — approved for unrestricted publication
- **REVIEW** — possible future publication, not yet approved
- **RESTRICTED** — limited operational access
- **PROTECTED PERSONAL** — identifiable or re-identifiable personal information
- **SECRET OR SECURITY-SENSITIVE** — access, vulnerability, privileged, or harm-enabling information

Only PUBLIC records may be rendered by public routes or APIs.

## Architecture boundary

### Separate systems

Public campaign content and private source records must use separate storage and access paths.

The public website must not query private contact, form, moderation, incident, security, legal, or relationship tables directly.

The publishing flow should be:

1. private source is collected for a defined purpose
2. source remains in the approved private system
3. a publication candidate is drafted in a private review environment
4. the candidate is classified, minimized, and approved
5. an allowlisted PUBLIC record is created
6. the public site renders only the PUBLIC record

No “hide from UI” field is sufficient protection when the underlying record is returned to the browser, API, page source, static build, log, or analytics system.

### One-way publication

The public renderer should consume a publication-specific schema rather than the private operational schema.

A public record must not contain hidden private fields that are merely omitted by a component.

Preferred design:

- create a separate PUBLIC object
- copy only allowlisted fields
- assign a non-identifying public ID
- include review and version metadata
- publish through an explicit action

Avoid:

- serializing a private object and deleting fields at the presentation layer
- sending private fields to a browser and hiding them with CSS
- making private API fields undocumented rather than unavailable
- exposing internal IDs that join to private systems
- rendering raw Markdown submitted through forms

## Public campaign-record schema

Every public campaign, outreach, experiment, report, cost, incident, or correction record should contain only relevant allowlisted fields.

Common fields:

- public record ID
- record type
- schema version
- title
- public status
- evidence state
- public owner role
- created, reviewed, and updated dates
- public purpose
- safe summary
- aggregate cost where applicable
- public sources
- decision or outcome
- correction state
- next review date
- repository source path

Publication-control fields:

- source classes reviewed
- minimization completed
- metadata reviewed
- re-identification review status
- required specialist reviews
- publication approvers
- public version
- superseded version, when applicable

The public record must not contain the private source-system ID when that ID can reveal or join to protected information.

## Fields prohibited from public schemas

Do not include:

- email addresses, phone numbers, physical addresses, or private handles
- names of private outreach targets or nonrespondents
- health, medical, account, consent, or device information
- IP addresses, precise location, device fingerprints, or advertising identifiers
- private message bodies or attachments
- credentials, tokens, keys, recovery codes, or signatures
- private contract text
- bank, tax, payroll, or payment details
- complaint, witness, or moderation evidence
- private vulnerability reproduction or exploit paths
- private source identity
- unpublished legal advice
- internal access-control identifiers
- raw analytics events
- arbitrary notes fields

## Forms

### Public forms must be purpose-specific

Each form should state:

- why the information is requested
- which fields are required
- who receives it
- whether it will be made public
- retention or follow-up expectation
- how to request deletion or correction
- a warning not to submit health, security, or other protected information when the form is not designed for it

### No automatic publication

No public form submission may publish directly to:

- the campaign log
- a testimonial page
- a public issue
- a public comment stream
- structured data
- a partner directory
- an analytics dashboard

Submission and publication are separate consent and review events.

### Free-text risk

Avoid free-text fields where structured choices satisfy the purpose.

Where free text is necessary:

- display a protected-information warning
- limit length
- strip active content
- do not reflect content in the URL
- do not include it in analytics
- route it to a private review queue
- prevent search indexing

## Administrative publishing controls

### Drafting

Publication candidates must be stored in an authenticated private workspace.

Preview URLs must:

- require authentication
- avoid public indexing
- use non-guessable identifiers
- not embed private source data in page source or client bundles
- expire or be revoked after review

`noindex` alone does not make a preview private.

### Approval

The publishing interface should show:

- information class
- source purpose
- public purpose
- redaction and minimization confirmation
- metadata check
- re-identification review
- required specialist approvals
- final public preview
- explicit publish action

High-risk records require two distinct approvers.

The interface should prevent a conflicted subject from being the sole approver of a record about their own conduct, compensation, conflict, or authority.

### Publishing

Publication should create:

- immutable public version identifier
- timestamp
- approver record
- source policy version
- correction and supersession path

Do not overwrite material historical records without retaining the public change history.

### Unpublishing

Authorized incident responders must be able to remove or restrict a public record rapidly when continued exposure creates harm.

Unpublishing should not erase the internal incident trail.

When safe, publish a replacement notice stating:

- record category
- why it was removed or corrected
- whether protected information was involved
- current status
- next update or final resolution

## Analytics boundary

Analytics on transparency and campaign surfaces must not collect or infer:

- health conditions
- medical interests at person level
- private outreach identity
- correction-submitter identity
- security reporter identity
- complaint or conduct status
- sensitive partner or donor identity
- cross-site advertising profiles

Do not place protected values in:

- event names
- properties
- URLs
- referrers
- page titles
- DOM attributes
- data layers
- error messages
- session-replay systems

Session replay should not be used on forms, trust, privacy, security, correction, or disclosure pages.

## Aggregate and small-group controls

Before publishing counts or segments:

- apply the policy’s initial minimum group threshold
- suppress or combine small groups
- review unique combinations across reports
- avoid precise timestamps where they identify a participant
- avoid publishing a total and all but one component
- do not expose filters that allow a visitor to derive suppressed values

Public dashboards must not permit repeated queries that reconstruct person-level data.

## File and media controls

Before publishing a file:

- confirm rights and public classification
- remove EXIF and document metadata
- flatten tracked changes and comments
- inspect hidden sheets, cells, layers, and attachments
- confirm thumbnails do not retain previous content
- replace local usernames and file paths
- verify links and query parameters
- scan for credentials and protected information

Do not provide raw downloads of private-source exports.

Publish purpose-built public files.

## Search and indexing

Search indexes must contain only PUBLIC fields.

Do not index:

- publication candidates
- private form submissions
- private contact records
- private correction correspondence
- incident evidence
- moderation evidence
- confidential-source material

Removal from a search UI is not sufficient when the search backend retains or returns the record.

## Caching and delivery

Classified private content must not pass through public CDNs, static-site generation, public object storage, public error tracking, or browser caches.

When a public record is removed for privacy or security reasons:

- invalidate project-controlled caches
- remove downloadable artifacts
- revoke preview links
- request third-party cache removal where available
- assume copies may remain outside project control

## Machine-readable records

Public APIs and feeds should expose an allowlist, not the internal database shape.

Each endpoint should have:

- documented public fields
- schema validation
- no arbitrary expansion of related private entities
- no internal identifiers that enable joins
- rate limits appropriate to reconstruction risk
- cache and deletion behavior
- tests that assert prohibited fields are absent

## Corrections, removals, and rights requests

The public disclosure route should link to private processes for:

- reporting accidental exposure
- requesting correction
- requesting a publication or removal review
- reporting unauthorized use of a private message, image, or story
- challenging re-identification risk
- reporting a security concern

Do not require a person to restate protected information in a public issue.

## Transparency about withholding

When details are withheld, a public record may state:

- information class
- institutional subject
- responsible reviewing role
- reason category
- review date
- safe public summary
- whether affected people were notified

Do not state enough detail to defeat the protection.

## Acceptance criteria

The public-information boundary is operationally ready when:

- the disclosure policy is publicly readable
- only explicit PUBLIC schemas feed public campaign routes
- private source systems are separated from public rendering
- forms cannot publish directly
- preview environments require authentication
- high-risk publication requires two approvers
- protected fields are absent from page source, APIs, logs, analytics, and structured metadata
- aggregate reporting includes re-identification controls
- file and image metadata are inspected
- incident responders can unpublish quickly
- corrections and removals have private intake
- every public record has a version, owner, review date, and correction path
- tests verify prohibited fields cannot appear in public API output
- accessibility review covers classification and withholding explanations
