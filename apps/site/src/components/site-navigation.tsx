import Link from "next/link";
import {
  directNavigation,
  narrativeNavigation,
  type NavigationItem,
} from "@/lib/navigation";

function NavigationLink({ item }: { item: NavigationItem }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer">
        <span>{item.label}</span>
        <small>{item.description}</small>
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={item.href}>
      <span>{item.label}</span>
      <small>{item.description}</small>
    </Link>
  );
}

export function SiteNavigation() {
  return (
    <div className="navigation-shell">
      <nav id="primary-navigation" className="direct-navigation" aria-label="Primary navigation">
        <ul>
          {directNavigation.map((item) => (
            <li key={item.href}>
              <NavigationLink item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <details className="narrative-navigation">
        <summary>Take the Ogygia path</summary>
        <nav aria-label="Narrative journey">
          <ol>
            {narrativeNavigation.map((item) => (
              <li key={item.href}>
                <NavigationLink item={item} />
              </li>
            ))}
          </ol>
        </nav>
        <p className="navigation-note">
          This optional path reaches the same essential information as direct
          navigation. No story traversal is required.
        </p>
      </details>
    </div>
  );
}
