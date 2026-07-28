# Forge MCP Source Catalogue and Provenance

[Architecture index](README.md) · [Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Local transport](forge-mcp-local-stdio-transport.md) · [Sprint 7 plan](../roadmap/sprint-7-execution-plan.md) · [Current status](../roadmap/current-status.md)

- **Status:** IMPLEMENTED ON SPRINT 7 BRANCH — exact-head validation pending
- **Workstream:** Sprint 7.3 — Source Catalogue and Provenance
- **Application:** `apps/mcp-forge`
- **Catalogue revision:** `1`
- **Provenance revision:** `1`
- **Authority boundary:** source evidence only; no truth, permission, canon, mapping, gameplay, clinical, provider, repository, or institutional authority

## Purpose

Sprint 7.3 gives Forge a deterministic, server-owned way to locate and inspect explicitly public repository material and synthetic evidence without turning MCP into an arbitrary filesystem reader.

The source layer remains internal to the application. Every accepted tool is still `planned` and `not-exposed`, and `tools/list` remains empty. Later workstreams may call this deterministic source core only through their accepted tool contracts and risk boundaries.

## Server-owned repository identity

Production-style local operation discovers the repository from the process working directory by walking upward until both of these markers agree:

- root `package.json` declares `calypsos-promise`; and
- `pnpm-workspace.yaml` is a regular, non-symlink file.

The caller cannot submit or replace the repository root. Synthetic tests may inject a temporary root through an explicitly test-only constructor, but that does not alter the production root contract or MCP surface.

No absolute repository path is returned in public results, provenance, errors, receipts, diagnostics, or tool contracts.

## Initial source catalogue

The revision-1 catalogue defines nine server-owned root identities:

| Source root | Repository-relative root | Information classes | Availability |
| --- | --- | --- | --- |
| `forge.root-documents` | repository root | canonical public entry documents | required |
| `forge.docs` | `docs` | public documentation and public standards references | required |
| `forge.content` | `content` | public content and synthetic content fixtures | required |
| `forge.content-schema` | `packages/content-schema` | public schemas, generated artifacts, and synthetic fixtures | required |
| `forge.health-schema` | `packages/health-schema` | public schemas and synthetic fixtures | required |
| `forge.house-of-keys` | `packages/house-of-keys` | public schemas and synthetic fixtures | required |
| `forge.aster` | `packages/aster` | public schemas and synthetic fixtures | required |
| `forge.public-standards` | bounded paths under `docs` | explicitly public standards references | optional and reserved |
| `forge.synthetic-connectors` | `fixtures/connectors` | synthetic connector fixtures | optional and reserved |

Each entry fixes:

- its repository-relative root;
- information classes;
- exact-file or recursive-tree access mode;
- allowed file names, prefixes, and extensions;
- excluded prefixes;
- file, result, and output limits;
- required or optional availability;
- symlink rejection;
- locale-independent Unicode code-point ordering; and
- `not-exposed` tool state.

A local checkout being public does not automatically place every file in this catalogue.

## Prohibited source classes

The source policy rejects hidden path segments and named protected classes, including credentials, private or protected records, provider negotiations and contracts, provider evaluations, proprietary mappings, protected interoperability findings, incident or conduct evidence, protected financial records, build output, dependency stores, and repository metadata.

It also rejects credential-like files and suffixes such as `.env`, `.npmrc`, private keys, certificates, credential records, and secret records even if they appear beneath an otherwise allowlisted root.

These checks are defense in depth. Protected material must remain outside public contributor workflows rather than relying solely on filename filtering.

## Path-normalization pipeline

Every requested source-relative path passes the same fail-closed pipeline:

1. bounded string length;
2. Unicode normalization;
3. repeated percent-decoding to expose double encoding;
4. slash normalization;
5. control-character and null-byte rejection;
6. POSIX, Windows-drive, UNC, and URI-like absolute-path rejection;
7. empty, dot, dot-dot, repeated-separator, and non-canonical segment rejection;
8. source-entry allowlist and exclusion checks;
9. prohibited source-class checks;
10. component-by-component `lstat` checks;
11. symbolic-link rejection; and
12. resolved-path containment beneath both the repository and named source root.

Plain traversal, encoded traversal, double-encoded traversal, and backslash traversal fail closed with stable public error identifiers.

## Symlink boundary

Forge does not follow symbolic links for source roots, intermediate directories, or files.

An explicit read that encounters a symlink fails. Recursive listing skips symlink entries and records `symlink-skipped` as partial evidence. Realpath containment is still checked after component inspection so an operating-system or filesystem edge case cannot silently escape the named root.

## Provenance contract

A successful read returns:

- source-root identity and information classes;
- repository-relative path only;
- full-file SHA-256 content digest;
- byte length and line count;
- whole-file locator;
- complete, partial, or truncated result state;
- explicit partial reasons; and
- literal false authority flags.

Line-range and object-identity locators are derived from the same provenance record and remain bound to its repository-relative path. They are locators, not claims that a cited statement is true, canonical, accepted, clinically complete, or semantically equivalent.

## Deterministic listing and limits

Recursive listing:

- sorts directory entries and final results by Unicode code point rather than locale;
- follows no symlinks;
- returns only allowlisted UTF-8 regular files;
- computes a full SHA-256 digest and line count for each returned file;
- enforces entry-specific file and output limits; and
- records file-limit, output-limit, symlink, oversized-file, non-UTF-8, and optional-root conditions explicitly.

Timeout and cancellation remain transport concerns until source operations are connected to accepted tool handlers in later workstreams.

## Public-safe errors

Source failures use stable `forge.source.*` identifiers. Public messages and details contain source-root identities and public limits where useful, but never absolute host paths, environment values, stack traces, credentials, file contents, or protected path names discovered outside the catalogue.

## Tested evidence

Public synthetic tests cover:

- catalogue completeness and non-exposure;
- nested process-root discovery;
- exact-file allowlists;
- stable SHA-256 provenance;
- plain, encoded, double-encoded, backslash, absolute, and URI-like traversal;
- prohibited files beneath an allowlisted root;
- symlink files and symlink directories;
- public-safe error leakage boundaries;
- deterministic ordering;
- read and list truncation;
- optional reserved roots; and
- line and object locators.

## Explicit non-scope

Sprint 7.3 does not:

- expose any MCP tool;
- make `tools/list` non-empty;
- permit callers to choose a repository root;
- provide arbitrary filesystem browsing;
- search content semantically or lexically;
- execute content validators;
- generate records or mappings;
- create tool receipts;
- use the network, providers, credentials, databases, queues, or remote services; or
- create canonical, permission, gameplay, clinical, connector, provider, repository, or institutional authority.

Tool-specific search, validation, generation, scopes, receipts, compatibility, and adversarial evidence remain later Sprint 7 workstreams.
