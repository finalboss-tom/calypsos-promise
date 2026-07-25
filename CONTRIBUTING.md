# Contributing to Calypso’s Promise

Thank you for helping build Calypso’s Promise.

## Before contributing

Read these first:

- `docs/frozen/product-constitution.md`
- `docs/frozen/architecture.md`
- `docs/frozen/world-and-lore-canon.md`
- `docs/product/gameplay-foundation.md`
- `docs/product/incentive-model.md`
- `docs/governance/feedback-to-governed-work.md`
- `docs/governance/feedback-triage-operating-protocol.md`
- `docs/governance/institutional-immune-system.md`
- `docs/governance/assumption-registry.md`
- `docs/policies/publication-and-confidentiality.md`
- `SECURITY.md`

Frozen components may only change through an accepted decision record.

## Core contributor rule

> Use synthetic or explicitly public information only.

Never place real health information, credentials, access tokens, private exports, medical documents, private correspondence, contact lists, conduct evidence, vulnerability details, screenshots containing personal information, or production payloads in issues, branches, commit messages, pull requests, fixtures, logs, build artifacts, tests, or examples.

A public branch is public even before a pull request is opened. A draft pull request, closed issue, failed build log, and deleted revision may remain copied or cached.

Do not commit an unsafe version and plan to redact it later.

When work depends on protected source material, create a synthetic example or a reviewed, minimized public derivative before it reaches this repository.

## Information handling

Only information classified as **PUBLIC** under `docs/policies/publication-and-confidentiality.md` belongs in this repository.

The other classes remain outside public and ordinary contributor systems:

- REVIEW
- RESTRICTED
- PROTECTED PERSONAL
- SECRET OR SECURITY-SENSITIVE

If you discover protected information in a public project surface:

1. do not quote, repost, download, or include it in a new public issue
2. stop work that may spread it
3. report it privately under `SECURITY.md`
4. rotate or revoke exposed credentials immediately when authorized
5. allow the incident owner to coordinate removal, notification, and a safe public record

## Feedback and issue intake

GitHub issues are the current canonical public ledger for public-safe product, contributor, documentation, accessibility, content, and governance work.

Use the issue template to state the problem, desired outcome, affected area, public-safe evidence, relevant boundaries, and possible acceptance evidence. Separate the problem from a preferred implementation so maintainers and contributors can evaluate alternatives.

Do not open a public issue for:

- person-specific health or clinical information
- account-specific support
- private correspondence or support transcripts
- security vulnerabilities or credentials
- conduct complaints or witness evidence
- production logs, payloads, exports, screenshots, or documents
- another person’s protected information

Those matters require the applicable private support, security, conduct, privacy, or specialist path. When a public record is appropriate, an authorized steward may later publish a reviewed, minimized institutional derivative.

Community reactions, comments, and issue activity are advisory signals during institutional Phase 0. They do not bypass maintainer authority, specialist review, safety controls, or decision records. Decision 0006 and `docs/governance/feedback-to-governed-work.md` define the path toward typed signals, deterministic priority assessments, bounded delegated pilots, and later community control over eligible roadmap capacity.

The current manual process is defined in `docs/governance/feedback-triage-operating-protocol.md`. It establishes:

- one primary type, lifecycle state, evidence state, and decision class after triage
- one or more affected areas and required review flags
- exact closure reasons
- a maintainer intake and prioritization cadence
- structured public triage, decision, validation, closure, reopening, and contribution-credit records
- private routing for security, privacy incidents, conduct, and other protected matters

The canonical label names and descriptions are in `docs/governance/feedback-label-registry.yml`. Copy-paste records are in `docs/governance/feedback-record-templates.md`.

### Participating in triage

Public-safe triage contributions may include:

- reproducing or disproving an issue with synthetic evidence
- identifying a duplicate or dependency
- clarifying the problem separately from the proposed solution
- improving acceptance evidence
- identifying accessibility, privacy, consent, safety, canon, or governance boundaries
- offering implementation, review, or validation help
- measuring whether a released change solved the stated problem

Do not change labels or summarize signals in a way that implies authority you do not hold. During Phase 0, maintainers own the canonical triage record and decision routing.

### Typed signals

When participating, state the signal you are providing:

- affected
- reproduced or confirmed
- priority preference
- can validate
- can contribute
- domain evidence
- dependency

Do not reveal a diagnosis, disability, account identity, private experience, or unnecessary personal detail to express affectedness. Repeated comments or reactions do not multiply a signal.

A useful contribution may include reporting, reproducing, triaging, specifying, implementing, reviewing, testing, documenting, validating, or measuring an outcome. Credit depends on validated value rather than issue or comment volume.

## Challenges and revalidation

A contributor may use the **System challenge or revalidation request** issue form to challenge a public assumption, outcome metric, incentive, product behavior, architecture, policy, governance decision, authority structure, public claim, emergency action, or the Institutional Immune System itself.

A useful challenge should:

- identify a specific target or claim
- separate observation from interpretation where possible
- include public-safe evidence and relevant uncertainty
- identify affected people, rights, or systems without exposing protected information
- describe a test, review, reproduction, comparison, or invalidation condition that could resolve the dispute
- request containment only when delay could compound harm
- disclose material relationships, expertise, authorship, authority, or conflicts

A complete replacement solution is not required to demonstrate a material defect.

Challenges are evaluated by evidence, affectedness, risk, rights implications, uncertainty, reproducibility, and falsifiability—not by the challenger’s status or reaction volume. Filing a challenge does not itself activate emergency authority, reverse a decision, or create contribution credit.

The immune-system metaphor applies to harmful conditions and mechanisms, not people or groups. Do not characterize critics, users, contributors, minorities, or dissenters as pathogens or threats merely because they disagree.

Protected health, account, security, conduct, legal, personnel, correspondence, or negotiation evidence must use an authorized private route. Public records may include only reviewed, minimized institutional derivatives.

## Development setup

Requirements:

- Node.js 24+
- pnpm 10.13.1

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm --filter @calypsos-promise/site dev
```

The local site listens on `http://localhost:3000`. No account, secret, cloud service, or production data is required.

## Workflow

1. Open or select an issue.
2. Create a focused branch.
3. Make the smallest coherent change.
4. Add or update tests and documentation.
5. Run `pnpm check`.
6. Sign commits with `git commit -s`.
7. Open a pull request using the template.

Before publishing a branch or pull request, inspect:

- filenames and branch names
- commit messages and diffs
- screenshots and document metadata
- logs and test output
- generated files and action artifacts
- links and URL query parameters
- AI prompts, traces, and generated output included in the change

## Pull-request expectations

A pull request should state:

- The problem being solved
- The user or contributor value
- Frozen or baseline components touched
- Security, privacy, health-safety, accessibility, and lore implications
- Information classification and publication review
- Evidence used to validate the change
- Remaining uncertainty
- Material assumptions, guardrails, rollback, restoration, or revalidation implications when applicable

## Decision records

Create a decision record when a change materially affects:

- Product promises or player rights
- Canon or terminology
- Application boundaries
- Data, consent, security, AI, MCP, or research architecture
- Public information or confidentiality boundaries
- Open-source governance
- Hosted-service economics
- Institutional immune-system authority or removal of meaningful challenge, appeal, containment, rollback, restoration, or revalidation

Use `docs/decisions/TEMPLATE.md`.

## Commit and review policy

- Prefer conventional commit prefixes such as `feat:`, `fix:`, `docs:`, `test:`, `build:`, and `chore:`.
- Certify contributions using the Developer Certificate of Origin with a `Signed-off-by` line.
- At least one maintainer approval is required before merge.
- Security-sensitive changes require a security reviewer.
- High-risk publication involving protected source material requires the reviews defined by the publication and confidentiality policy.
- Canon changes require a canon decision record.
- Squash merge is the default.

## AI-assisted contributions

AI-assisted work is welcome, but the contributor remains responsible for correctness, licensing, tests, source attribution, security, and adherence to frozen foundations.

Do not provide private health data, private correspondence, contact lists, contracts, incident evidence, protected repository content, or repository secrets to an AI system unless that exact system and use have been approved for the information class.

An AI-generated summary does not make its private source safe to publish.
