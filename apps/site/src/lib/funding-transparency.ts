import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

export type PublicFundingRelationship = {
  readonly id: string;
  readonly status: string;
  readonly relationshipClass: string;
  readonly publicCounterparty: string;
  readonly purpose: string;
  readonly publicAmount: string | null;
};

export type PublicFundingOpportunity = {
  readonly id: string;
  readonly status: string;
  readonly title: string;
};

export type PublicRegistryState<T> = {
  readonly schemaVersion: string;
  readonly registryRevision: number;
  readonly status: string;
  readonly informationClass: string;
  readonly lastReviewed: string;
  readonly operationalNotice: string;
  readonly entries: readonly T[];
};

function findRepositoryFile(relativePath: string): string {
  let current = process.cwd();

  while (true) {
    const candidate = join(current, relativePath);
    if (existsSync(candidate)) {
      return candidate;
    }

    const parent = dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }

  throw new Error(`Unable to locate canonical repository file: ${relativePath}`);
}

const fundingRecordsPath = findRepositoryFile(
  "docs/economics/funding-records.yml",
);
const fundingOpportunitiesPath = findRepositoryFile(
  "docs/economics/funding-opportunities.yml",
);

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function scalar(content: string, key: string, indent = 0): string {
  const match = content.match(
    new RegExp(`^${" ".repeat(indent)}${key}:\\s*(.+)$`, "m"),
  );
  if (!match) {
    throw new Error(`Canonical funding registry is missing ${key}`);
  }
  return unquote(match[1]);
}

function optionalScalar(
  content: string,
  key: string,
  indent = 0,
): string | null {
  const match = content.match(
    new RegExp(`^${" ".repeat(indent)}${key}:\\s*(.+)$`, "m"),
  );
  return match ? unquote(match[1]) : null;
}

function foldedBlock(content: string, key: string): string {
  const match = content.match(
    new RegExp(`^${key}: >-\\n((?:  .*(?:\\n|$))+)`, "m"),
  );
  if (!match) {
    throw new Error(`Canonical funding registry is missing ${key}`);
  }
  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function recordBlocks(
  content: string,
  listKey: "records" | "opportunities",
  prefix: "FND" | "OPP",
): readonly { id: string; body: string }[] {
  if (content.includes(`${listKey}: []`)) {
    return [];
  }

  const pattern = new RegExp(`^  - id: (${prefix}-\\d{4}-\\d{4})$`, "gm");
  const matches = [...content.matchAll(pattern)];
  if (matches.length === 0) {
    throw new Error(
      `Canonical ${listKey} registry is neither explicitly empty nor parseable`,
    );
  }

  return matches.map((match, index) => {
    const bodyStart = (match.index ?? 0) + match[0].length + 1;
    const bodyEnd = matches[index + 1]?.index ?? content.length;
    return {
      id: match[1],
      body: content.slice(bodyStart, bodyEnd),
    };
  });
}

function registryMetadata(content: string) {
  const revision = Number(scalar(content, "registry_revision"));
  if (!Number.isInteger(revision) || revision < 1) {
    throw new Error("Canonical funding registry has an invalid revision");
  }

  return {
    schemaVersion: scalar(content, "schema_version"),
    registryRevision: revision,
    status: scalar(content, "status"),
    informationClass: scalar(content, "information_class"),
    lastReviewed: scalar(content, "last_reviewed"),
    operationalNotice: foldedBlock(content, "operational_notice"),
  };
}

const fundingRecordsSource = readFileSync(fundingRecordsPath, "utf8");
const fundingOpportunitiesSource = readFileSync(
  fundingOpportunitiesPath,
  "utf8",
);

export const fundingRelationships: PublicRegistryState<PublicFundingRelationship> = {
  ...registryMetadata(fundingRecordsSource),
  entries: recordBlocks(fundingRecordsSource, "records", "FND").map(
    ({ id, body }) => ({
      id,
      status: scalar(body, "status", 4),
      relationshipClass: scalar(body, "relationship_class", 4),
      publicCounterparty: scalar(body, "public_counterparty", 4),
      purpose: scalar(body, "summary", 6),
      publicAmount:
        optionalScalar(body, "public_amount_band", 6) ??
        optionalScalar(body, "public_amount", 6),
    }),
  ),
};

export const fundingOpportunities: PublicRegistryState<PublicFundingOpportunity> = {
  ...registryMetadata(fundingOpportunitiesSource),
  entries: recordBlocks(fundingOpportunitiesSource, "opportunities", "OPP").map(
    ({ id, body }) => ({
      id,
      status: scalar(body, "status", 4),
      title: scalar(body, "title", 4),
    }),
  ),
};

export const permittedFundingRecognition: readonly string[] = [
  "Truthful public acknowledgment of a reviewed relationship, classification, dates, support provided, and canonical funding record.",
  "Factual attribution on funded public artifacts and outcome reports, including limitations, failures, corrections, suspension, or termination.",
  "Public briefings available on comparable terms without private product, health, user, or decision access.",
  "Narrow factual review of names, dates, support amounts or bands, supplied services, restrictions, and rights-cleared marks.",
];

export const prohibitedFundingBenefits: readonly string[] = [
  "Personal or private information, health-interest profiling, donor or user lists, or access to protected correspondence and evidence.",
  "Health recommendations, preferred providers, connector ranking, hidden defaults, clinical placement, or weakened evidence and safety language.",
  "Guaranteed roadmap priority, release dates, merge authority, issue closure, exclusivity, or veto over correction, rollback, migration, or termination.",
  "Governance seats, votes, emergency power, reputation, progression, findings, certification, or exemption from conflicts and ordinary review.",
];

export const concentrationReviewTriggers: readonly {
  readonly threshold: string;
  readonly response: string;
}[] = [
  {
    threshold: "10% or more",
    response:
      "Publish a concentration watch and review restrictions, influence, dependency, and replacement.",
  },
  {
    threshold: "20% or more",
    response:
      "Require a written diversification, mitigation, replacement, and continuity plan.",
  },
  {
    threshold: "33% or more",
    response:
      "Presumptively pause additional dependency unless an independently reviewed narrow, time-bounded exception is accepted.",
  },
];

export const fundingTransactionBoundary: readonly string[] = [
  "No approved legal recipient, payment processor, bank, accounting platform, or custody route is published.",
  "No donation, sponsorship, affiliate, grant-intake, provider-intake, checkout, payment, refund, or tax-receipt surface is operating.",
  "No nonprofit, charitable, tax-deductible, public-benefit, investment, ownership, or treasury claim is established by these records.",
  "Funding records disclose reviewed institutional relationships and effects; raw donor, contract, banking, tax, negotiation, payroll, and personal source records remain private.",
];
