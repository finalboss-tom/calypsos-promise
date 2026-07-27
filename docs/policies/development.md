# Development and Release Policy — BASELINE

[Policy index](README.md) · [Developer Experience and Operability](developer-experience-and-operability.md) · [Minimum Viable Validation](minimum-viable-validation.md)

## Branches

- `main` is the protected integration branch.
- Work occurs in short-lived branches named `sprint/<number>-<topic>`, `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, or `agent/<topic>` for steward-authorized agent work.
- Direct pushes to `main` are reserved for emergency repository administration.

## Pull requests

Every material change requires a pull request that states:

- Purpose and scope
- Status of decisions changed or introduced
- Tests and evidence
- Privacy, security, safety, lore, and accessibility impact
- Whether AI assisted the contribution
- New provider, service, dependency, workflow, local-environment, build, test, startup, or operability impact where applicable
- Replacement, rollback, or removal path for material operational complexity where applicable

Frozen components require a decision record and explicit owner approval.

A documentation-only or low-impact change may state that runtime and operability dimensions are not applicable rather than inventing implementation evidence.

## Reviews

At least one maintainer review is required before merge. Changes affecting health claims, consent, security, research, accessibility, provider interoperability, workflow authority, or consequential operational boundaries require the corresponding qualified review once those roles exist.

The author, provider, sponsor, funded implementer, or workflow owner cannot be represented as their own independent specialist reviewer.

## Commits and DCO

Contributors certify the Developer Certificate of Origin by adding:

`Signed-off-by: Name <email>`

The repository uses DCO sign-off instead of a copyright-assignment CLA as its baseline.

## Dependencies

New production dependencies require:

- A documented purpose
- Compatible license review
- Maintenance and security assessment
- No hidden telemetry by default
- Local-development and validation behavior
- Build, startup, test, and runtime impact where material
- Provider, sponsorship, concentration, and data-boundary review where applicable
- A replacement or removal path

Lockfiles are committed. Automated dependency updates must pass the same review and test gates as other changes.

Free credits, sponsorship, institutional access, or an enterprise relationship do not remove ordinary dependency review.

## Services and workflow infrastructure

A new deployable service, queue, scheduler, workflow engine, database, cache, hosted emulator, or mandatory local infrastructure dependency requires a current consumer, bounded responsibility, named owner, justified authority and failure boundary, synthetic or local development path, tests or evidence, incident and observability ownership, migration and deletion behavior, and replacement or rollback.

Do not add infrastructure solely to mirror a planned topology. See [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md), [Operational Simplicity and Durable Workflows](../architecture/operational-simplicity-and-durable-workflows.md), and the [Developer Experience and Operability Policy](developer-experience-and-operability.md).

## AI-assisted contributions

AI assistance is allowed, but the human contributor remains responsible for correctness, licensing, security, privacy, and DCO certification. Do not submit generated code or content whose provenance or license cannot be reasonably assessed. Never provide production health data, secrets, security reports, protected operational records, or private user content to an unapproved AI tool.

## Releases

Releases are created from `main`, versioned, accompanied by release notes, and eventually signed. Release notes distinguish live, experimental, planned, and long-horizon capabilities. No release may imply clinical validation, privacy guarantees, commercial functionality, operational maturity, local-first behavior, performance, scalability, or reliability beyond the evidence available.

A release should have an attributable decision, rollback path, and documentation appropriate to its operational consequence. Every repository commit need not automatically deploy to production.

## Emergency changes

Security or privacy fixes may use an embargoed process under `SECURITY.md`. A public retrospective follows when disclosure is safe and lawful.

Emergency complexity or provider exceptions remain scoped, attributable, reviewable, and temporary unless accepted through the ordinary decision process.
