import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup status",
  description: "Founding Expedition signup migration status.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function JoinedPage() {
  return (
    <article className="reading-panel">
      <p className="eyebrow">Signup status</p>
      <h1>No signup was recorded.</h1>
      <p>
        Signup is paused while its provider, retention, unsubscribe, correction,
        deletion, abuse-control, incident, and rollback requirements are
        reviewed.
      </p>
      <Link href="/">Return home</Link>
    </article>
  );
}
