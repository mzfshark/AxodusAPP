import Link from "next/link";
import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

export const metadata = createPageMetadata({
  title: "Staging archive",
  description: "Archived staging material for Axodus.",
  pathname: "/evolution/",
  index: false,
});

export default function Evolution() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Archive</Eyebrow>
          <h1>Staging material has moved to the canonical pages.</h1>
          <p>
            Use <Link href="/governance">Governance</Link> and{" "}
            <Link href="/research">Research</Link> for the current public
            record.
          </p>
        </div>
        <aside>
          <StatusBadge>Noindex</StatusBadge>
          <p className="aside-note">This route is retained only for reference.</p>
        </aside>
      </section>

      <section className="section shell">
        <SectionIntro
          index="01"
          label="Canonical path"
          title="The current site structure is now centered on public explanation."
        />
        <div className="prose-large">
          <p>Refer to the governance and research pages for the live framing.</p>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
