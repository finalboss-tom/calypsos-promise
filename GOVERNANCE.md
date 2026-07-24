# Governance Baseline

**Status:** BASELINE

Calypso’s Promise begins with a maintainer-led governance model designed to protect the frozen constitution while making decisions and reasoning public.

## Roles

### Maintainer

Maintainers may merge changes, manage releases, handle conduct and security matters, and steward the roadmap. Maintainers must disclose conflicts of interest and may not silently override frozen foundations.

### Contributor

Contributors propose code, content, documentation, research, design, tests, and review. Contribution does not automatically grant access to production systems or private data.

### Specialist reviewer

Security, clinical, privacy, accessibility, research, and canon changes may require review by a qualified specialist before merge or release.

## Decision authority

- Frozen constitutional and canon changes require a decision record and explicit owner approval.
- Baseline architecture changes require a decision record when they alter trust boundaries, data behavior, or public promises.
- Ordinary implementation details may be decided through pull-request review.
- Security incidents may require temporary private decisions followed by a public post-incident record when safe.

## Merge policy

- Pull requests are the default change mechanism.
- At least one maintainer approval is required.
- Authors should not be the sole approver of material security, consent, clinical, or canon changes.
- Squash merge is the default.

## Contribution certification

The baseline decision is to use the Developer Certificate of Origin rather than a Contributor License Agreement unless later legal review identifies a concrete need for a CLA. Contributors certify their right to submit work by adding a `Signed-off-by` line to commits.

## Succession

The project will document additional maintainers, release authority, and succession rules as the contributor community develops. No individual should remain an irreplaceable operational dependency.
