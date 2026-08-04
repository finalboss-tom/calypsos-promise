# Sprint 9.9 — Publication, Hosted Evidence, and Rollback Record

[Current status](current-status.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Sprint 9.8 validation](sprint-9-workstream-9-8-validation-record.md) · [Site deployment policy](../../apps/site/DEPLOYMENT.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68)

- **Status:** IMPLEMENTED — restored-control aggregate validation pending
- **Workstream:** 9.9 — publication, rollback, hosted evidence, and public-status reconciliation
- **Hosted evidence class:** protected branch preview
- **Production impact:** none
- **Public linking:** none
- **Search indexing:** disabled
- **Canonical production domain:** unchanged
- **Certification boundary:** maintainer release and implementation evidence only

## Decision

The founding steward directed workstream 9.9 to proceed after accepting the 9.8 evidence package. The least-authority release action was selected: create one protected branch preview, verify its exact provenance and runtime state, then restore the repository-wide Git deployment lock.

This action did **not** authorize:

- merge of PR #68;
- a link from the production website;
- sitemap inclusion;
- search indexing;
- production-domain aliasing;
- a production deployment;
- account, identity, private Chronicle, model-provider, analytics, payment, or health-data operation; or
- workstream 9.10 before the restored-control candidate passes its full aggregate.

## Exact provenance

### Accepted playable evidence baseline

- Commit: `b1fdba193e1ebaa8096695192ddd5f6965255529`
- CI: 1280 — success
- DCO: 1365 — success
- Purpose: accepted 9.8 rendered-browser, accessibility, storage, network, duration, interaction, and performance evidence

The prologue page uses a commit-pinned link to the accepted public-synthetic boundary at this revision. It no longer depends on the continued existence of the Sprint 9 branch.

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

## Release-control procedure

The preview trigger temporarily changed `apps/site/vercel.json` from global `deploymentEnabled: false` to an exact branch map:

- `agent/sprint-9-public-synthetic-prologue`: `true`
- `*`: `false`

Vercel deploys when at least one matching rule is true. The exact branch therefore produced a preview while `main` and every other branch remained disabled.

After the preview reached `READY`, the repository control was restored to:

```json
"deploymentEnabled": false
```

The trigger commit is operational evidence, not the accepted permanent repository baseline. The commit containing this record must pass the complete CI and DCO aggregate with the global lock restored.

## Hosted verification

### Build and route verification

Vercel build output confirmed:

- the monorepo resolved `@calypsos-promise/site`;
- the production Next.js build compiled successfully;
- TypeScript completed successfully;
- all 18 static pages were generated;
- `/prologue` was present as a static route;
- `/api/join` remained the only dynamic route; and
- deployment output completed successfully.

The known Turbopack NFT trace warning for funding-transparency source loading remained a warning, not a build or runtime failure. This workstream does not silently close that inherited optimization opportunity.

### Protection and indexing state

The preview is protected by Vercel authentication. An unauthenticated request to `/prologue` returned a Vercel SSO redirect and included:

- `x-robots-tag: noindex`;
- `x-frame-options: DENY`;
- `strict-transport-security`; and
- `cache-control: no-store, max-age=0` on the protection response.

Because the preview is protected, it is hosted evidence for maintainers rather than a public gameplay release. No expiring share URL is stored in the repository.

### Runtime review

Vercel reported no runtime error clusters for `/prologue` during the verification window. The exact candidate also passed the permanent isolated-preview and rendered-browser job, including full manual/text and Aster/voice completion, all visible controls, storage and network denial, accessibility modes, and generated-state cleanup.

The temporary trigger candidate's CI was intentionally not accepted as a repository baseline because permanent tests correctly objected to the temporary deployment exception and newly advanced status wording. All substantive application jobs passed, including:

- formatting;
- production build and static preview;
- rendered prologue journeys;
- typecheck;
- repository policy;
- content and economics validation; and
- documentation links.

The restored-control candidate is the acceptance gate.

## Production isolation

The production deployment remains:

- Deployment: `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`
- Source commit: `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`
- Production domain: `https://www.calypsospromise.org`
- State: `READY`

No production alias was moved. No production environment variable was changed. No newsletter provider configuration was exposed or modified. The canonical domain continues to serve the accepted Sprint 8 and newsletter release.

## Capability labels

The hosted preview must be described as:

- public and explicitly synthetic content;
- no account required;
- deterministic and memory-only;
- no arbitrary personal input;
- no microphone, model provider, analytics, payment, or durable state;
- Chronicle- and receipt-shaped explanations only;
- no production permission, record, health, or gameplay authority;
- protected preview evidence; and
- not a production capability.

It must not be described as a production game, live account flow, health-data product, clinical tool, production Aster, House of Keys permission flow, private Chronicle, or independently certified accessibility experience.

## Rollback and correction ownership

### Hosted preview rollback

The primary rollback has already been applied: restore `git.deploymentEnabled` to `false`. That prevents subsequent branch pushes from creating additional deployments.

If the protected preview itself must be withdrawn, the founding steward or an authorized Vercel project owner may remove its alias or deployment through the Vercel control plane. The production domain does not need rollback because it was never changed.

### Repository rollback

Before merge, rollback may move the Sprint 9 branch back to the accepted 9.8 commit or revert the 9.9 release-control and record commits. After an eventual squash merge, rollback may revert the squash commit and remove any separately authorized production entry point.

No data migration or deletion procedure is required because the prologue stores no user state.

### Correction ownership

- **Founding steward:** authorizes preview, production, linking, merge, and rollback decisions.
- **Repository maintainers:** correct source, tests, capability claims, stable links, and release records through ordinary review.
- **Vercel project owners:** execute deployment, alias, and platform rollback actions after authorization.
- **Specialist reviewers:** remain required for independent accessibility, security, privacy, legal, communications, and affected-user claims not established here.

## Open holdpoints

This workstream does not close:

- independent accessibility certification;
- named screen-reader and assistive-technology testing;
- affected-user, cognitive-load, browser, device, and field-performance evidence;
- public production linking or indexing;
- production monitoring and incident operations;
- production identity, recovery, private Chronicle, real voice, or model-provider architecture;
- legal or communications approval of future production permission presentation;
- final Sprint 9 cross-contract reconciliation; or
- founding-steward-directed squash merge.

## Acceptance gate

Workstream 9.9 may be accepted when the exact restored-control candidate passes:

- formatting;
- build and isolated-preview evidence;
- rendered browser validation;
- typecheck and lint;
- tests;
- repository policy;
- content, economics, and documentation validation;
- DCO; and
- confirmation that `apps/site/vercel.json` again disables all Git-triggered deployments.

Only after that gate may workstream 9.10 begin.
