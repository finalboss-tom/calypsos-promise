# ADR-0002 — Software License Baseline

**Status:** SUPERSEDED by `docs/decisions/0004-public-domain-commons.md`

## Historical context

This decision originally proposed GNU Affero General Public License v3.0 or later (`AGPL-3.0-or-later`) as the software-license direction.

The proposal attempted to protect the public-good project from hosted derivatives that kept server-side modifications private. AGPL reciprocity was considered preferable to a permissive license because it could require operators of modified network services to provide corresponding source to their users.

## Why the proposal was superseded

The founding steward clarified that Calypso’s Promise is intended to be a public-domain project, not merely an open-source project with reciprocal copyright conditions.

AGPL depends on copyright restrictions to require source disclosure. That conflicts with the accepted direction that original project materials should be usable, modifiable, hosted, sold, combined, and redistributed without seeking permission or accepting copyright-based reciprocity obligations.

Decision 0004 therefore retires this baseline.

## Historical boundaries that remain valid

The following cautions remain applicable during the public-domain migration:

- Personal health data and user content are not licensed or dedicated merely because project materials are open.
- Third-party materials retain their actual terms.
- The project cannot dedicate rights it does not own.
- Contributor submissions require explicit and valid rights certification.
- A public-domain software instrument must be reviewed for copyright fallback, warranty, and patent implications.
- Canonical provenance and truthful review claims remain necessary even when forks require no permission.

## Replacement direction

See:

- `PUBLIC_DOMAIN.md`
- `docs/decisions/0004-public-domain-commons.md`

The replacement direction evaluates a public-domain dedication with a legally effective fallback for software and a CC0-style dedication for original non-software materials, subject to qualified legal review, authorship audit, third-party notices, and contributor-workflow migration.

## Record preservation

This file remains in the repository because the AGPL proposal is part of the project’s institutional history. Superseding a decision does not erase why it was initially reasonable or which risks it attempted to address.
