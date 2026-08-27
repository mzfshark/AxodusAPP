import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

export const metadata = createPageMetadata({
  title: "Public inquiry archive",
  description: "Archived public inquiry information for Axodus.",
  pathname: "/contact/",
  index: false,
});

export default function Contact() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Archive</Eyebrow>
          <h1>Public inquiry content has moved to documentation.</h1>
          <p>
            Use <a href="https://docs.axodus.country/">the documentation site</a>{" "}
            and the public explanation pages for the current record.
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
          title="The current site does not present contact routing as a primary surface."
        />
        <div className="prose-large">
          <p>Readers should rely on the documentation and public pages instead.</p>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
