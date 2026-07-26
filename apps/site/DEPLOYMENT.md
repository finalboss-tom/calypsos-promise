# Site Deployment Policy

The public site uses **manual-only Vercel deployment**.

`apps/site/vercel.json` disables automatic Git-triggered deployments for every branch. Repository commits, pull-request updates, and merges must not create Vercel preview or production builds automatically.

Deploy only when a reviewed site release needs an explicit preview or production publication. Before triggering a deployment, confirm:

- the intended commit or branch;
- whether the target is preview or production;
- repository CI status;
- required environment configuration;
- current capability and privacy claims; and
- who is responsible for verifying and, if needed, rolling back the release.

Documentation-only, governance, security, economics, and other non-site changes do not justify a deployment.
