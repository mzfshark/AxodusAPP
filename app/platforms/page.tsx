import Link from "next/link";
import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

const description =
  "The proposed Axodus platforms are interoperable organizational nuclei for governed knowledge and institutional workflows.";

export const metadata = createPageMetadata({
  title: "Platforms",
  description,
  pathname: "/platforms/",
});

export default function Platforms() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Platforms</Eyebrow>
          <h1>Proposed platform nuclei.</h1>
          <p>{description}</p>
        </div>
        <aside>
          <StatusBadge>Proposed only</StatusBadge>
          <p className="aside-note">
            Names here describe intended roles, not deployment status.
          </p>
        </aside>
      </section>

      <section className="section shell split-section">
        <SectionIntro
          index="01"
          label="Intended nuclei"
          title="Modules stay conceptual until the public record says otherwise."
        />
        <div className="prose-large">
          <p>
            The platform idea is a set of interoperable surfaces that support
            governed knowledge, institutional workflows, and publication
            records.
          </p>
          <p>
            The site should describe these as proposals, not as live production
            systems.
          </p>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index="02"
            label="Examples"
            title="A few intended roles, kept deliberately narrow."
            light
          />
          <div className="three-grid">
            <article>
              <span>01</span>
              <h3>Knowledge surface</h3>
              <p>Stores governed records and structured institutional context.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Workflow surface</h3>
              <p>Organizes bounded institutional steps and review paths.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Publication surface</h3>
              <p>Publishes approved public materials with clear status labels.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index="03"
          label="Supporting pages"
          title="Read the explanation and governance pages together."
        />
        <div className="actions">
          <Link className="button primary" href="/what-is-axodus">
            What is Axodus?
          </Link>
          <Link className="button secondary" href="/governance">
            Governance
          </Link>
          <Link className="button secondary" href="/research">
            Research
          </Link>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
