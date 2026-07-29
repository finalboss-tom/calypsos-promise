import Link from "next/link";

export default function NotFound() {
  return (
    <article className="reading-panel">
      <p className="eyebrow">Route not found</p>
      <h1>This path is not part of Ogygia yet.</h1>
      <p>
        The public website is being migrated route by route. No missing page
        implies that a planned product capability is live.
      </p>
      <Link href="/">Return home</Link>
    </article>
  );
}
