export type ForgeTool = {
  readonly id: string;
  readonly purpose: string;
  readonly boundary: string;
};

export type ForgeToolGroup = {
  readonly title: string;
  readonly summary: string;
  readonly tools: readonly ForgeTool[];
};

export const forgeToolGroups: readonly ForgeToolGroup[] = [
  {
    title: "Lore, content, quests, architecture, and decisions",
    summary:
      "Source-linked search and deterministic validation over allowlisted public repository material.",
    tools: [
      {
        id: "forge.search.lore",
        purpose: "Search frozen and governed lore with provenance.",
        boundary: "Cannot accept canon or invent story authority.",
      },
      {
        id: "forge.validate.content",
        purpose: "Validate public content records against accepted schemas.",
        boundary: "A passing result does not approve publication or canon.",
      },
      {
        id: "forge.inspect.quest-schema",
        purpose: "Inspect the public quest contract and its required fields.",
        boundary:
          "Cannot create eligibility, completion, progression, or reward authority.",
      },
      {
        id: "forge.validate.quest",
        purpose:
          "Run deterministic validation over a public or synthetic quest draft.",
        boundary:
          "Cannot complete a quest, grant rewards, or publish gameplay.",
      },
      {
        id: "forge.search.architecture",
        purpose:
          "Search public architecture records with conservative authority labels.",
        boundary:
          "Proposed or historical material cannot be promoted to accepted truth.",
      },
      {
        id: "forge.search.decision",
        purpose:
          "Search accepted, proposed, superseded, and unresolved decisions.",
        boundary: "Cannot close, accept, supersede, or amend a decision.",
      },
    ],
  },
  {
    title: "Standards, mapping drafts, and connector fixtures",
    summary:
      "Provider-neutral public standards evidence and explicitly synthetic connector examples.",
    tools: [
      {
        id: "forge.search.public-standards",
        purpose:
          "Search allowlisted public standards references with provenance.",
        boundary:
          "Cannot prove completeness, certification, semantic equivalence, endorsement, or provider preference.",
      },
      {
        id: "forge.validate.mapping-draft",
        purpose: "Validate a revisioned public or synthetic mapping draft.",
        boundary:
          "Cannot approve a mapping, certify interoperability, select a provider, or prove production readiness.",
      },
      {
        id: "forge.search.synthetic-connector-fixtures",
        purpose:
          "Search explicitly synthetic, credential-free connector fixtures.",
        boundary:
          "Cannot access production endpoints, private negotiations, proprietary mappings, or personal data.",
      },
    ],
  },
  {
    title: "Deterministic synthetic generation",
    summary:
      "Bounded generation for quest and mapping-draft examples using fixed synthetic time and immediate validation.",
    tools: [
      {
        id: "forge.generate.synthetic-data",
        purpose:
          "Generate deterministic public synthetic cases from a hashed seed and validate every artifact.",
        boundary:
          "Does not prove de-identification, representativeness, clinical realism, statistical validity, model-training fitness, or publication fitness.",
      },
    ],
  },
];

export const forgeRuntimeFacts = [
  "One local application at apps/mcp-forge using newline-delimited UTF-8 stdio and MCP protocol revision 2025-11-25.",
  "Exactly ten server-owned tool identities through runtime registry revision 4 and execution contract revision 1.",
  "Nine server-owned source roots with exact allowlists, traversal rejection, symlink isolation, bounded reads, repository-relative locators, and SHA-256 provenance.",
  "One active call per tool identity with bounded input, scans, results, serialized output, timeout, cancellation, and materialization.",
  "No shell, subprocess, network client, socket, VM, worker thread, dynamic import, code evaluation, repository write, provider call, credential path, or private-data path.",
] as const;

export const forgeReceiptFacts = [
  "Every scoped success and stable scoped failure includes forge.invocation-receipt.v1.",
  "Stable public-safe failures use forge.error.v1.",
  "Receipts and errors omit raw input, host paths, environment values, internal traces, credentials, protected source material, and wall-clock timestamps.",
  "Receipts prove only the bounded local invocation and evidence they describe; they do not prove production isolation, safety, approval, or authority.",
] as const;

export const forgeOpenLimits = [
  "No production deployment, remote MCP endpoint, authentication, tenancy, private Chronicle tool, House of Keys tool, provider access, connector runtime, or repository mutation.",
  "No production process isolation, CPU or heap enforcement, distributed quota, rate limiting, monitoring, incident response, backup, recovery, or deletion verification.",
  "No representative security, reliability, performance, cost, accessibility, usability, contributor-benefit, clinical, statistical, or publication evidence.",
  "Nineteen specialist holdpoints and eighteen unresolved-work records remain open; Sprint 7 acceptance closed none of them.",
] as const;

export const ordinaryContributionPaths = [
  {
    title: "Read and improve the public records",
    href: "https://github.com/finalboss-tom/calypsos-promise",
    label: "Browse the repository",
  },
  {
    title: "Report a public-safe problem or propose governed work",
    href: "https://github.com/finalboss-tom/calypsos-promise/issues/new/choose",
    label: "Open an issue",
  },
  {
    title: "Follow the ordinary contribution and review process",
    href: "https://github.com/finalboss-tom/calypsos-promise/blob/main/CONTRIBUTING.md",
    label: "Read the contribution guide",
  },
] as const;
