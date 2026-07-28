"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <article className="reading-panel">
      <p className="eyebrow">Unexpected error</p>
      <h1>The public gateway could not render this route.</h1>
      <p>
        No private health data is processed by this website foundation. You can
        retry the route or inspect the public repository.
      </p>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </article>
  );
}
