# Sprint 1 Completion Record

**Sprint:** Repository and open-source operating model  
**Status:** BASELINE complete  
**Branch:** `sprint/1-repository-operating-model`

## Completed outputs

- pnpm and Turborepo monorepo root
- Reproducible `pnpm-lock.yaml`
- Node 24 and pnpm 10.13.1 toolchain baseline
- Minimal runnable `apps/site` workspace
- Initial `packages/domain` workspace
- Formatting, repository-policy, lint, typecheck, and test commands
- GitHub Actions CI with frozen-lockfile installation
- Contributor guide
- Community Code of Conduct
- Security disclosure policy
- Maintainer-led governance baseline
- DCO-over-CLA baseline with automated transitional attestation
- Synthetic-data-only contributor boundary
- Secret and sensitive-key repository scanning
- Branch, review, release, dependency, and AI-contribution policy
- Pull-request and feature-issue templates
- Dependabot configuration
- Trademark and official-deployment policy proposal
- AGPL-3.0-or-later license direction decision record

## Evidence

GitHub Actions run `30056598841` completed successfully for the final Sprint 1 head at the time of this record. It verified:

- Frozen dependency installation
- Formatting
- Repository policy checks
- Linting
- Type checking
- Tests

DCO attestation run `30056598886` also completed successfully.

## Local run contract

A clean contributor environment needs only Node.js 24+, Corepack, and the repository:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm --filter @calypsos-promise/site dev
```

The site then listens on `http://localhost:3000` without credentials, cloud services, or real health data.

## Deferred and proposed matters

- The repository contains an AGPL-3.0-or-later direction ADR, but the canonical license file remains deferred until the exact standard text and legal boundary review are approved.
- The trademark and official-deployment policy remains PROPOSED pending qualified legal review.
- The transitional DCO workflow must be replaced by a commit-level DCO application or equivalent before accepting external contributions at scale.
- Branch protection settings must be configured in GitHub repository administration once required-check names are stable.

## Sprint exit decision

The repository now satisfies the Sprint 1 engineering acceptance criteria:

- A new contributor can install, validate, and run the empty system.
- No production secret or health-data dependency exists.
- Pull requests execute formatting, policy, lint, type, test, and DCO checks.

Sprint 2 may begin after this branch is merged.
