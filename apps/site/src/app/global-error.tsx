"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="page-shell">
          <article className="reading-panel">
            <title>Unexpected error — Calypso’s Promise</title>
            <p className="eyebrow">Unexpected error</p>
            <h1>The public gateway could not start.</h1>
            <p>
              Retry the page or inspect the public repository. This error does
              not activate or expose private product data.
            </p>
            <button type="button" onClick={() => reset()}>
              Try again
            </button>
          </article>
        </main>
      </body>
    </html>
  );
}
