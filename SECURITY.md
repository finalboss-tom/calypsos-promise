# Security Policy

Calypso’s Promise handles exceptionally sensitive subject matter. Security and privacy reports must be handled privately and respectfully.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability, leaked secret, exposed personal information, authorization bypass, cross-user access, prompt-injection path, unsafe MCP tool behavior, or data-deletion failure.

Until a dedicated disclosure address is published, contact the repository owner privately through GitHub. Include:

- A concise description
- Affected component and version or commit
- Reproduction steps using synthetic data only
- Potential impact
- Suggested mitigation, when available

Do not access, download, alter, retain, or disclose real user information while investigating.

## Scope priorities

High-priority classes include:

- Cross-user or unauthorized Chronicle access
- Consent or authorization bypass
- MCP client or tool privilege escalation
- Prompt injection that can invoke protected actions
- Secret or key exposure
- Connector impersonation
- Export or deletion failures
- Unsafe handling of uploaded documents
- Supply-chain compromise

## Safe-harbor intent

Good-faith research that follows this policy, minimizes impact, avoids privacy violations, and allows reasonable remediation time will be treated as authorized security research to the extent the project can reasonably do so. This statement is not legal advice or a promise beyond the project’s authority.

## Supported releases

The project is pre-release. Security updates apply to the default branch and any explicitly supported release branches listed here in the future.

## Production-data boundary

No production health data, credentials, or private exports belong in the open-source repository, public issue tracker, contributor environment, CI logs, or synthetic fixtures.
