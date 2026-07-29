from pathlib import Path

path = Path("apps/site/src/validate-preview.mjs")
text = path.read_text(encoding="utf-8")

replacements = [
    (
        '    attributes.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? "");',
        '''    const value = (match[2] ?? match[3] ?? match[4] ?? "")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '\"')
      .replaceAll("&#39;", "'")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">");
    attributes.set(match[1].toLowerCase(), value);''',
    ),
    (
        '''  const ids = extractTags(html, "[A-Za-z][A-Za-z0-9:-]*")
    .flatMap(() => [])
    .concat(
      [...html.matchAll(/\\bid="([^"]+)"/gi)].map((match) => match[1]),
    );''',
        '''  const ids = [...html.matchAll(/\\bid="([^"]+)"/gi)].map(
    (match) => match[1],
  );''',
    ),
    (
        '''  const expectedCanonical = new URL(route, siteOrigin).toString();
  if (canonical !== expectedCanonical) {
    fail(`${route}: canonical ${canonical ?? "missing"} does not match ${expectedCanonical}`);
  }''',
        '''  const normalizeCanonical = (value) => {
    const url = new URL(value, siteOrigin);
    return url.pathname === "/"
      ? url.origin
      : `${url.origin}${url.pathname.replace(/\\/$/, "")}`;
  };
  const expectedCanonical = new URL(route, siteOrigin).toString();
  if (
    !canonical ||
    normalizeCanonical(canonical) !== normalizeCanonical(expectedCanonical)
  ) {
    fail(
      `${route}: canonical ${canonical ?? "missing"} does not match ${expectedCanonical}`,
    );
  }''',
    ),
]

for old, new in replacements:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"expected one preview-validator match, found {count}: {old[:80]!r}")
    text = text.replace(old, new, 1)

path.write_text(text, encoding="utf-8")
