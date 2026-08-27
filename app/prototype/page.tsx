import Link from "next/link";
import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

export const metadata = createPageMetadata({
  title: "Status archive",
  description: "Archived status material for Axodus.",
  pathname: "/prototype/",
  index: false,
});

export default function Prototype() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Archive</Eyebrow>
          <h1>Status material is now covered by the public explanation.</h1>
          <p>
            Use <Link href="/what-is-axodus">What is Axodus?</Link> and{" "}
            <Link href="/research">Research</Link> for the current record.
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
          title="The public explanation now carries the status statement."
        />
        <div className="prose-large">
          <p>The older maturity framing is no longer the primary public surface.</p>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
