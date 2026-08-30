import Link from "next/link";
import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

export const metadata = createPageMetadata({
  title: "Concept archive",
  description: "Archived concept material for Axodus.",
  pathname: "/concept/",
  index: false,
});

export default function Concept() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Archive</Eyebrow>
          <h1>Concept material moved to the canonical pages.</h1>
          <p>
            Use <Link href="/what-is-axodus">What is Axodus?</Link> for the
            public explanation and <Link href="/architecture">Architecture</Link>{" "}
            for the structural overview.
          </p>
        </div>
        <aside>
          <StatusBadge>Noindex</StatusBadge>
          <p className="aside-note">This route is retained only for reference.</p>
        </aside>
      </section>

      <section className="section shell">
        <SectionIntro
          index=">_"
          label="Canonical path"
          title="The live public explanation lives elsewhere."
        />
        <div className="prose-large">
          <p>
            This route is intentionally quiet. The site should point readers to
            the canonical explanation instead of duplicating it here.
          </p>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
