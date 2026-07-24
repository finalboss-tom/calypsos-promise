# Development and Release Policy — BASELINE

## Branches

- `main` is the protected integration branch.
- Work occurs in short-lived branches named `sprint/<number>-<topic>`, `feat/<topic>`, `fix/<topic>`, or `docs/<topic>`.
- Direct pushes to `main` are reserved for emergency repository administration.

## Pull requests

Every material change requires a pull request that states:

- Purpose and scope
- Status of decisions changed or introduced
- Tests and evidence
- Privacy, security, safety, lore, and accessibility impact
- Whether AI assisted the contribution

Frozen components require a decision record and explicit owner approval.

## Reviews

At least one maintainer review is required before merge. Changes affecting health claims, consent, security, research, or accessibility require the corresponding qualified review once those roles exist.

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
- A replacement or removal path

Lockfiles are committed. Automated dependency updates must pass the same review and test gates as other changes.

## AI-assisted contributions

AI assistance is allowed, but the human contributor remains responsible for correctness, licensing, security, privacy, and DCO certification. Do not submit generated code or content whose provenance or license cannot be reasonably assessed. Never provide production health data, secrets, security reports, or private user content to an unapproved AI tool.

## Releases

Releases are created from `main`, versioned, accompanied by release notes, and eventually signed. Release notes distinguish live, experimental, planned, and long-horizon capabilities. No release may imply clinical validation, privacy guarantees, or commercial functionality beyond the evidence available.

## Emergency changes

Security or privacy fixes may use an embargoed process under `SECURITY.md`. A public retrospective follows when disclosure is safe and lawful.
