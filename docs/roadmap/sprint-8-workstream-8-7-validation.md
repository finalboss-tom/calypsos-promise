# Sprint 8.7 Validation — Roadmap, Support, and Funding Transparency

- **Focused implementation candidate:** `f39176f5f3a842e89ff4681f1d9810a9f2f305cf`
- **Reconciled parent head:** `329cf2d73df1914719d9b3c2bbd96bb4cc083fad`
- **Validation state:** final repository-wide CI and DCO pending on this user-authored marker
- **Branch:** `agent/sprint-8-public-website-foundation`
- **Draft pull request:** #61

## Focused evidence

The self-removing Sprint 8.7 workflow passed:

- canonical formatting;
- the Next.js production build;
- deterministic site validation and lint;
- TypeScript checking;
- focused site tests;
- generated TypeScript build-state cleanup;
- final formatting; and
- temporary workflow self-removal.

The production build initially exposed a Turbopack incompatibility at the canonical funding-register file boundary. The build-time reader was corrected to search upward from the build working directory for two fixed public repository paths using string filesystem paths.

## Reconciliation evidence

A fail-closed reconciliation updated and formatted:

- `README.md`;
- `apps/site/README.md`;
- `docs/README.md`;
- `docs/architecture/README.md`;
- `docs/roadmap/README.md`;
- `docs/roadmap/current-status.md`; and
- `docs/roadmap/sprint-8-execution-plan.md`.

The temporary reconciliation workflow and script removed themselves before the reconciled commit.

## Exact-head gate

The final candidate must pass the ordinary repository checks for formatting, documentation links, repository policy, economics records, content validation, lint, typecheck, and tests, plus DCO attestation.

Passing this gate proves repository implementation and deterministic evidence only. It does not prove preview or production deployment, independent review, final signup disposition, financial operation, payment capability, private support, provider capability, or Sprint 9 gameplay.
