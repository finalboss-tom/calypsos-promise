import { connectedLoops } from "@/lib/promise";

export function ConnectedLoops() {
  return (
    <ol className="loop-grid">
      {connectedLoops.map((loop, index) => (
        <li className="loop-card" key={loop.id}>
          <span className="loop-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{loop.title}</h3>
          <p>{loop.summary}</p>
        </li>
      ))}
    </ol>
  );
}
