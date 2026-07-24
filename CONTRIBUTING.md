# Contributing to Calypso’s Promise

Thank you for helping build Calypso’s Promise.

## Before contributing

Read these first:

- `docs/frozen/product-constitution.md`
- `docs/frozen/architecture-foundation.md`
- `docs/frozen/world-lore-canon.md`
- `docs/frozen/gameplay-foundation.md`
- `SECURITY.md`

Frozen components may only change through an accepted decision record.

## Core contributor rule

> Use synthetic data only.

Never place real health information, credentials, access tokens, private exports, medical documents, screenshots containing personal information, or production payloads in issues, pull requests, fixtures, logs, tests, or examples.

## Development setup

Requirements:

- Node.js 24+
- pnpm 10+

```bash
pnpm install
pnpm check
```

The repository will gain runnable applications incrementally. Until those applications exist, `pnpm check` validates formatting, repository policy, types, and available tests.

## Workflow

1. Open or select an issue.
2. Create a focused branch.
3. Make the smallest coherent change.
4. Add or update tests and documentation.
5. Run `pnpm check`.
6. Open a pull request using the template.

## Pull-request expectations

A pull request should state:

- The problem being solved
- The user or contributor value
- Frozen or baseline components touched
- Security, privacy, health-safety, accessibility, and lore implications
- Evidence used to validate the change
- Remaining uncertainty

## Decision records

Create a decision record when a change materially affects:

- Product promises or player rights
- Canon or terminology
- Application boundaries
- Data, consent, security, AI, MCP, or research architecture
- Open-source governance
- Hosted-service economics

Use `docs/decisions/TEMPLATE.md`.

## Commit and review policy

- Prefer conventional commit prefixes such as `feat:`, `fix:`, `docs:`, `test:`, `build:`, and `chore:`.
- At least one maintainer approval is required before merge.
- Security-sensitive changes require a security reviewer.
- Canon changes require a canon decision record.
- Squash merge is the default.

## AI-assisted contributions

AI-assisted work is welcome, but the contributor remains responsible for correctness, licensing, tests, source attribution, security, and adherence to frozen foundations. Do not provide private health data or repository secrets to an AI system.
