# Sprint 9.9 — Publication, Hosted Evidence, and Rollback Record

[Current status](current-status.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Sprint 9.8 validation](sprint-9-workstream-9-8-validation-record.md) · [Site deployment policy](../../apps/site/DEPLOYMENT.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68)

- **Status:** ACCEPTED
- **Accepted technical candidate:** `0ac02609dc18ab7ff1f2b4f55ba058b6536f505c`
- **Validation:** CI 1284 / DCO 1369
- **Hosted evidence class:** protected branch preview
- **Production impact:** none
- **Public linking:** none
- **Search indexing:** disabled
- **Canonical production domain:** unchanged
- **Certification boundary:** maintainer release and implementation evidence only

## Decision

The founding steward directed workstream 9.9 to proceed after accepting the 9.8 evidence package. The least-authority release action was selected: create one protected branch preview, verify exact provenance and runtime state, then restore the repository-wide Git deployment lock.

This action did not authorize merge of PR #68, a production-site link, sitemap inclusion, search indexing, production-domain aliasing, a production deployment, account or identity operation, private Chronicle storage, a model provider, analytics, payment, health-data operation, or workstream 9.10 before the restored-control aggregate passed.

## Exact provenance

### Accepted playable evidence baseline

- Commit: `b1fdba193e1ebaa8096695192ddd5f6965255529`
- CI: 1280 — success
- DCO: 1365 — success
- Purpose: accepted 9.8 rendered-browser, accessibility, storage, network, duration, interaction, and performance evidence

The prologue page uses a commit-pinned link to the accepted public-synthetic boundary at this revision. It does not depend on the continued existence of the Sprint 9 branch.

### Hosted preview candidate

- Commit: `66979c71732f0bc343000fe143485d06e0bc7fec`
- Vercel deployment: `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M`
- Immutable deployment hostname: `calypsos-promise-site-grwntscje-tvarney-7968s-projects.vercel.app`
- Branch alias: `calypsos-promise-site-git-agent-s-9461ab-tvarney-7968s-projects.vercel.app`
- Source branch: `agent/sprint-9-public-synthetic-prologue`
- Deployment target: preview, not production
- Deployment state: `READY`
- Region: `iad1`

Vercel metadata binds the deployment to the exact Git commit and PR #68. The build produced all expected routes, including `/prologue`, and completed successfully under Next.js 16.2.12.

### Restored-control acceptance candidate

- Commit: `0ac02609dc18ab7ff1f2b4f55ba058b6536f505c`
- CI: 1284 — success
- DCO: 1369 — success

This candidate contains the hosted evidence record, truthful status contract, bounded-preview procedure, exact formatter output, and permanent `git.deploymentEnabled: false` state.

## Release-control procedure

The preview trigger temporarily changed `apps/site/vercel.json` from global `deploymentEnabled: false` to an exact branch map:

- `agent/sprint-9-public-synthetic-prologue`: `true`
- `*`: `false`

Vercel deploys when at least one matching rule is true. The exact branch therefore produced a preview while `main` and every other branch remained disabled.

After the preview reached `READY`, the repository control was restored to:

```json
"deploymentEnabled": false
```

The trigger commit is operational evidence, not the permanent repository baseline. The restored control passed the complete repository aggregate.

## Hosted verification

### Build and route evidence

Vercel build output confirmed:

- the monorepo resolved `@calypsos-promise/site`;
- the production Next.js build compiled successfully;
- TypeScript completed successfully;
- all 18 static pages were generated;
- `/prologue` was present as a static route;
- `/api/join` remained the only dynamic route; and
- deployment output completed successfully.

The known Turbopack NFT trace warning for funding-transparency source loading remained a warning, not a build or runtime failure. This workstream does not silently close that inherited optimization opportunity.

### Protection and indexing evidence

The preview is protected by Vercel authentication. An unauthenticated request to `/prologue` returned a Vercel SSO redirect and included `x-robots-tag: noindex`, `x-frame-options: DENY`, strict transport security, and a no-store cache policy on the protection response.

Because the preview is protected, it is hosted evidence for maintainers rather than a public gameplay release. No expiring share URL is stored in the repository.

### Runtime and application evidence

Vercel reported no runtime error cluster for `/prologue` during the verification window.

The exact restored-control candidate passed:

- formatting;
- production build and isolated local preview;
- rendered manual/text and Aster/voice journeys;
- native keyboard evidence;
- accessibility and fallback modes;
- storage and network denial;
- Sprint 8 performance ceilings;
- typecheck and lint;
- tests;
- repository policy;
- content and economics validation;
- documentation links;
- DCO; and
- generated-state cleanup.

## Production isolation

The production deployment remains:

- Deployment: `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`
- Source commit: `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`
- Production domain: `https://www.calypsospromise.org`
- State: `READY`

No production alias was moved. No production environment variable was changed. No newsletter provider configuration was exposed or modified. The canonical domain continues to serve the accepted Sprint 8 and newsletter release.

## Capability labels

The hosted preview is:

- public and explicitly synthetic in content;
- no-account and deterministic;
- memory-only;
- free of arbitrary personal input, microphone, model provider, analytics, payment, and durable state;
- Chronicle- and receipt-shaped explanation only;
- without production permission, record, health, or gameplay authority;
- protected preview evidence; and
- not a production capability.

It must not be described as a production game, live account flow, health-data product, clinical tool, production Aster, House of Keys permission flow, private Chronicle, or independently certified accessibility experience.

## Rollback and correction ownership

The primary release rollback is complete: `git.deploymentEnabled` is restored to `false`, preventing later branch pushes from creating additional deployments.

If the protected preview must be withdrawn, the founding steward or an authorized Vercel project owner may remove its alias or deployment through the Vercel control plane. The production domain does not need rollback because it never changed.

Before merge, repository rollback may move the Sprint 9 branch back to the accepted 9.8 commit or revert the 9.9 release-control and record commits. After an eventual squash merge, rollback may revert the squash commit and remove any separately authorized production entry point. No data migration or deletion procedure is required because the prologue stores no user state.

Ownership remains:

- **Founding steward:** preview, production, linking, merge, and rollback authorization.
- **Repository maintainers:** source, tests, capability claims, stable links, and release-record corrections through ordinary review.
- **Vercel project owners:** deployment, alias, and platform rollback actions after authorization.
- **Specialist reviewers:** independent accessibility, security, privacy, legal, communications, and affected-user claims not established here.

## Open holdpoints

9.9 does not close independent accessibility certification, named screen-reader testing, affected-user and cognitive-load research, device/browser field performance, public production linking or indexing, production monitoring, production identity and recovery, private Chronicle storage, real voice, model-provider architecture, legal approval of production permission presentation, final Sprint 9 cross-contract reconciliation, or the founding-steward-directed squash merge.

## Disposition

Workstream 9.9 is accepted. Workstream 9.10 may begin the final cross-contract reconciliation and completion package. The protected preview remains evidence only; production, public linking, indexing, merge, and Phase 0 completion remain separately gated.
