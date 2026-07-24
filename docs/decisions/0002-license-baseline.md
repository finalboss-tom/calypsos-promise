# ADR-0002 — Software License Baseline

**Status:** PROPOSED pending legal review

## Context

Calypso’s Promise is intended to remain open even when modified and offered as a network service. A permissive license would allow a hosted derivative to keep server-side modifications private, weakening the project’s public-good and reciprocal-development goals.

## Decision

Use **GNU Affero General Public License v3.0 or later (`AGPL-3.0-or-later`)** as the baseline software-license direction.

The AGPL is specifically designed for network software and requires operators of modified publicly accessible versions to make the corresponding modified source available to users of that service.

## Boundaries

- This decision applies to software unless a subdirectory states another approved license.
- Health data, user content, trademarks, character art, narrative assets, and third-party materials are not automatically licensed merely because software is.
- The Calypso’s Promise name, logos, official characters, and official-deployment claims require a separate trademark policy.
- No contributor agreement may silently change the license of accepted contributions.
- The repository will use DCO sign-off rather than a copyright-assignment CLA unless a later ADR changes that policy.

## Consequences

- Hosted modifications must preserve source availability obligations under the license.
- Some organizations avoid AGPL dependencies; that is accepted in exchange for stronger reciprocity.
- Final adoption and the canonical `LICENSE` file require legal review of the complete repository structure and content licensing.

## Evidence

The official AGPL text describes it as a copyleft license designed to ensure cooperation for network server software and requires modified server source to be made available to users interacting with it.
