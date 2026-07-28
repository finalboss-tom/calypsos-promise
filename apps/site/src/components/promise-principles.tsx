import { promisePrinciples } from "@/lib/promise";

export function PromisePrinciples() {
  return (
    <div className="principle-grid">
      {promisePrinciples.map((principle) => (
        <article className="principle-card" key={principle.id}>
          <span className="principle-mark" aria-hidden="true">
            {principle.id === "private-by-default" ? "⚿" : null}
            {principle.id === "meaningful-refusal" ? "✓" : null}
            {principle.id === "player-confirmation" ? "◇" : null}
            {principle.id === "correction-and-exit" ? "↺" : null}
          </span>
          <h3>{principle.title}</h3>
          <p>{principle.summary}</p>
        </article>
      ))}
    </div>
  );
}
