# Calypso’s Promise

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform that helps people build, understand, and control a longitudinal record of their lives. The playable world of Ogygia turns brief health actions, data capture, learning, and reflection into quests—while keeping private health data separate from the open-source codebase.

## Project status

The frozen product, architecture, gameplay, and lore foundations are committed. The repository is now in the first implementation sprint: establishing a safe, reproducible open-source operating model and runnable monorepo.

**Frozen foundations**

- Product thesis and player promise
- First player: people—any human may begin, with adaptive paths rather than a narrow persona gate
- Ogygia world, central mythology, Seven Laws, zones, principal cast, Seven Tides, and Fourteen Lanterns
- Illustrated, map-based narrative play rather than a conventional 3D game
- Open code and synthetic fixtures; private production health data
- AI proposes, the player confirms, and deterministic domain services store
- Structured records remain authoritative
- MCP exposes selected domain capabilities to authorized agents; it is not the product’s database or core application protocol

**Still to be validated or selected**

- Clinical, regulatory, privacy, and research-governance implementation details
- Infrastructure and AI vendors
- Final open-source license adoption and trademark policy
- Hosted-service economics
- Connector rollout order
- Research and compensated-opportunity gates

## Quick start

Requirements:

- Node.js 24+
- pnpm 10.13.1

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm --filter @calypsos-promise/site dev
```

Open `http://localhost:3000` to confirm the Sprint 1 site workspace is running.

The current application is intentionally minimal. It proves the repository can be installed, validated, and run without credentials, production services, or real health data.

## Repository surfaces

- `apps/site` — public website and playable prologue
- `apps/game` — planned universal Expo game for web, iOS, and Android
- `apps/api` — planned modular TypeScript domain application
- `apps/mcp-chronicle` — planned private, policy-controlled agent tools
- `apps/mcp-forge` — planned contributor and documentation tools using synthetic data
- `packages/domain` — shared domain invariants and contracts
- `content` — planned versioned canon, quests, dialogue, education, and safety content
- `docs` — frozen foundations, architecture decisions, website briefs, and sprint plans

## Core rule

> The software is open. The person’s health data is private.

No contributor workflow, public demo, test environment, or open-source agent may require production health data. Synthetic fixtures are the default development material.

## Contributing and security

Read `CONTRIBUTING.md`, `GOVERNANCE.md`, and `SECURITY.md` before opening a pull request. Material changes to frozen components require an accepted decision record.
