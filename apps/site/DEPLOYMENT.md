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

## Bounded branch-preview exception

A founding-steward-authorized hosted preview may temporarily replace the global `false` value with a branch map that enables one exact branch and disables `*`. The exception must:

1. name the one authorized branch;
2. keep `*` set to `false` so no other branch deploys;
3. remain preview-only unless production publication is separately directed;
4. retain noindex and truthful capability labels where the route is not public;
5. record the exact Git commit, Vercel deployment ID, protected or public access state, runtime review, and rollback target; and
6. restore `git.deploymentEnabled` to `false` immediately after hosted evidence is established.

The temporary trigger commit is release-operation evidence, not an accepted repository baseline. The restored control state must pass the complete repository CI and DCO aggregate before the workstream is accepted.

Documentation-only, governance, security, economics, roadmap, and other non-site changes do not justify a deployment. A funding-policy or sprint-backlog update never authorizes a site build by itself.
