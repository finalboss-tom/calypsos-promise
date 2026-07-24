# Contributing to Calypso’s Promise

Thank you for helping build Calypso’s Promise.

## Before contributing

Read these first:

- `docs/frozen/product-constitution.md`
- `docs/frozen/architecture-foundation.md`
- `docs/frozen/world-lore-canon.md`
- `docs/frozen/gameplay-foundation.md`
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

## Decision records

Create a decision record when a change materially affects:

- Product promises or player rights
- Canon or terminology
- Application boundaries
- Data, consent, security, AI, MCP, or research architecture
- Public information or confidentiality boundaries
- Open-source governance
- Hosted-service economics

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
