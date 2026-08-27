import Link from "next/link";
import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

const description =
  "Axodus architecture is organized around identity, governance, research, records, and proposed platform nuclei.";

export const metadata = createPageMetadata({
  title: "Architecture",
  description,
  pathname: "/architecture/",
});

export default function Architecture() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Architecture</Eyebrow>
          <h1>Institutional structure, not product hype.</h1>
          <p>{description}</p>
        </div>
        <aside>
          <StatusBadge>Conceptual map</StatusBadge>
          <p className="aside-note">
            The architecture page describes the proposal’s internal layout.
          </p>
        </aside>
      </section>

      <section className="section shell split-section">
        <SectionIntro
          index="01"
          label="Proposed layers"
          title="A simple map for the public record."
        />
        <div className="prose-large">
          <p>
            Institutional identity, governance, research, publications, and
            platform nuclei are treated as distinct layers.
          </p>
          <p>
            That separation keeps the site readable and reduces the chance of
            turning a concept into an implementation claim.
          </p>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index="02"
            label="Public surfaces"
            title="Each surface has a narrow role."
            light
          />
          <div className="three-grid">
            <article>
              <span>01</span>
              <h3>Identity</h3>
              <p>Defines the canonical public statement.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Governance</h3>
              <p>Explains the bounded decision model.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Platforms</h3>
              <p>Names proposed nuclei without claiming deployment.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index="03"
          label="Cross-links"
          title="The site should connect the structure visibly."
        />
        <div className="actions">
          <Link className="button primary" href="/what-is-axodus">
            What is Axodus?
          </Link>
          <Link className="button secondary" href="/governance">
            Governance
          </Link>
          <Link className="button secondary" href="/platforms">
            Platforms
          </Link>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
