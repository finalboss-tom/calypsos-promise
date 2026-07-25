# Calypso’s Promise public site

`apps/site` currently implements **Website Track 0A — Repository Gateway**: an honest, accessible public front door for the open-source project and the planned Calypso’s Promise game.

## What is implemented

- cinematic Ogygia landing page using repository-owned concept-art crops
- live HTML for the game loop, Aster contract, canonical zones, Promise, and capability status
- prominent repository and current-status paths
- purpose-limited Founding Expedition email form
- private, provider-agnostic signup webhook adapter
- privacy notice, confirmation page, responsive layout, reduced-motion behavior, and security headers

The images are presentation assets. All essential copy, links, controls, status labels, and form behavior remain semantic HTML rather than being embedded in one flattened screenshot.

## What is not implemented

- accounts or authentication
- real health-data capture
- private Living Chronicles
- production Aster interaction
- research enrollment, compensated opportunities, governance voting, or donations
- the Sprint 8 Next.js foundation or Sprint 9 fictional prologue

## Run locally

```bash
pnpm --filter @calypsos-promise/site dev
```

Open `http://localhost:3000`.

## Configure private signup delivery

The server never writes email addresses to the repository, public filesystem, logs, GitHub, or a public campaign ledger. Configure an approved private HTTPS endpoint:

```bash
SIGNUP_WEBHOOK_URL=https://example.org/private-signup-webhook
SIGNUP_WEBHOOK_TOKEN=replace-me
```

The endpoint receives:

```json
{
  "email": "seeker@example.com",
  "consent": true,
  "policyVersion": "2026-07-25",
  "purpose": "Calypso's Promise public project updates",
  "source": "founding-expedition-website",
  "receivedAt": "2026-07-25T00:00:00.000Z"
}
```

Production signup must remain disabled until the provider, retention period, unsubscribe behavior, and private correction/deletion route are published and approved.

## Validate

```bash
pnpm --filter @calypsos-promise/site build
pnpm --filter @calypsos-promise/site lint
pnpm --filter @calypsos-promise/site typecheck
pnpm --filter @calypsos-promise/site test
```
