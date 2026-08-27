import Link from "next/link";
import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

export const metadata = createPageMetadata({
  title: "Institutional archive",
  description: "Archived institutional orientation material for Axodus.",
  pathname: "/investor-orientation/",
  index: false,
});

export default function InvestorOrientation() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Archive</Eyebrow>
          <h1>Institutional orientation now lives in the canonical pages.</h1>
          <p>
            Use <Link href="/what-is-axodus">What is Axodus?</Link> and{" "}
            <Link href="/publications">Publications</Link> for the current
            public record.
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
          title="The site no longer uses commercial-led positioning."
        />
        <div className="prose-large">
          <p>Use the governance, research, and publications pages instead.</p>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
