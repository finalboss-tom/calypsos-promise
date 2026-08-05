# Site Deployment Policy

The public site uses **manual-only Vercel deployment**.

`apps/site/vercel.json` normally sets `git.deploymentEnabled` to `false`. Repository commits, pull-request updates, and merges must not create Vercel preview or production builds automatically.

Deploy only when a reviewed site release needs an explicit preview or production publication. Before triggering a deployment, confirm:

- the exact commit and branch;
- whether the target is preview or production;
- repository CI and DCO status;
- required environment configuration;
- current capability and privacy claims;
- stable source links and candidate provenance;
- who owns hosted verification, correction, and rollback; and
- the deployment that would be restored if rollback became necessary.

## Current production state

- **Project:** `calypsos-promise-site`
- **Project ID:** `prj_AsQkFCwkuhiPj3xJPfpsgXdijfJI`
- **Team ID:** `team_GAvB4u2CsScZ7MJvtZH2JTKR`
- **Canonical production deployment:** `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`
- **Production source:** one-shot `main` trigger `0100bbe08e0ddb3acddc5a3a926c1972b59b517d`
- **Accepted Sprint 9 squash commit in ancestry:** `b22c32ad8f40610dc95a5b49a745da5adb9c1341`
- **Rollback candidate:** prior production deployment `dpl_vs7uNzDD17XAycNEyBezULwcJVfE`, then `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp` if a pre-Sprint 9 state is required
- **Current release control:** `git.deploymentEnabled: false` for every branch

The canonical aliases include:

- `www.calypsospromise.org`;
- `calypsospromise.org`;
- `calypsos-promise-site.vercel.app`;
- the project production alias; and
- the `main` branch alias.

Production `/prologue` verification established HTTP 200, `noindex, nofollow`, expected public security headers, absence from navigation and sitemap, accepted deployment-status copy, and no runtime error cluster during the release window.

## One-shot production exception

A founding-steward-authorized production release may temporarily replace the global `false` value with an exact branch map:

- `main`: `true`;
- `*`: `false`.

The exception must:

1. follow explicit release authorization;
2. identify the accepted source revision or accepted revision in the trigger commit’s ancestry;
3. keep every non-`main` branch disabled;
4. create exactly the intended production deployment;
5. verify build output, canonical aliases, route behavior, headers, indexing, runtime errors, and public claims;
6. record rollback candidates and correction ownership; and
7. restore `git.deploymentEnabled` to `false` immediately after verification.

The temporary trigger commit is release-operation evidence, not the permanent repository baseline.

## Bounded branch-preview exception

A founding-steward-authorized hosted preview may temporarily replace the global `false` value with a branch map that enables one exact branch and disables `*`.

The exception must:

1. name the one authorized branch;
2. keep `*` set to `false` so no other branch deploys;
3. remain preview-only unless production publication is separately directed;
4. retain noindex and truthful capability labels where the route is not public;
5. record the exact Git commit, Vercel deployment ID, protected or public access state, runtime review, and rollback target; and
6. restore `git.deploymentEnabled` to `false` immediately after hosted evidence is established.

Protected Sprint 9 preview `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M` is retained as access-controlled historical evidence. It is not an active release channel or production alias.

## Rollback

For a production regression:

1. identify whether the problem is source, build, environment, alias, cache, newsletter, or platform behavior;
2. preserve public-safe evidence and privately route protected incident material;
3. repoint the production aliases to the last accepted deployment when immediate rollback is safer than fix-forward;
4. verify canonical domains, TLS, routes, headers, metadata, assets, cache behavior, newsletter state, and `/prologue` boundaries after rollback;
5. publish a correction when visitors were materially affected; and
6. record residual obligations and the next revalidation trigger.

Sprint 9 creates no private user record or data migration, so prologue rollback has no private-state restoration step.

## Non-release changes

Documentation-only, governance, security, economics, roadmap, and other non-site changes do not justify deployment. A funding-policy, sprint-backlog, issue, or pull-request update never authorizes a site build by itself.
