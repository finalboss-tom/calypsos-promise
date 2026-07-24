# Security Policy

Calypso’s Promise handles exceptionally sensitive subject matter. Security and privacy reports must be handled privately and respectfully.

The detailed public-information boundary is defined in `docs/policies/publication-and-confidentiality.md`.

## Reporting a vulnerability or accidental disclosure

Do not open a public issue for:

- a suspected vulnerability
- a leaked secret or credential
- exposed personal or health information
- a private document placed in a public surface
- an authorization bypass
- cross-user access
- a prompt-injection path
- unsafe MCP tool behavior
- a data-deletion failure
- security or moderation details that would enable evasion

Until a dedicated disclosure address is published, contact the repository owner privately through GitHub. Include:

- A concise description
- Affected component, page, file, version, or commit
- Reproduction steps using synthetic data only
- Potential impact
- Whether the information is still publicly accessible
- Suggested mitigation, when available

Do not access, download, alter, retain, or disclose real user information while investigating.

Do not paste exposed material into a new report. Identify its location without reproducing it.

## Immediate containment

When a credential or protected record has entered a public system:

1. stop further publication and sharing
2. rotate or revoke exposed credentials before relying on deletion
3. remove or restrict the public material where possible
4. request removal of public artifacts, previews, caches, or attachments where available
5. preserve only the minimum necessary evidence in a private incident record
6. identify affected people, systems, and downstream copies
7. assess notification and remediation needs
8. publish a safe incident summary when appropriate

A deleted file or rewritten Git history must not be treated as proof that exposure has been reversed. Public systems may have clones, caches, notifications, screenshots, and archives.

## Scope priorities

High-priority classes include:

- Cross-user or unauthorized Chronicle access
- Consent or authorization bypass
- MCP client or tool privilege escalation
- Prompt injection that can invoke protected actions
- Secret or key exposure
- Protected information committed to a public repository or campaign ledger
- Connector impersonation
- Export or deletion failures
- Unsafe handling of uploaded documents
- Supply-chain compromise

## Safe-harbor intent

Good-faith research that follows this policy, minimizes impact, avoids privacy violations, and allows reasonable remediation time will be treated as authorized security research to the extent the project can reasonably do so. This statement is not legal advice or a promise beyond the project’s authority.

Good-faith private reporting of an accidental disclosure will not be treated as misconduct merely because the report is inconvenient or embarrassing.

## Supported releases

The project is pre-release. Security updates apply to the default branch and any explicitly supported release branches listed here in the future.

## Production-data boundary

No production health data, credentials, private exports, raw campaign submissions, contact lists, private correspondence, conduct evidence, or security reports belong in the open-source repository, public issue tracker, public branch, contributor environment, CI logs, action artifacts, previews, or synthetic fixtures.

Only information classified as PUBLIC belongs in public project systems.
