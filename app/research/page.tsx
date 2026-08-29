import Link from "next/link";
import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

const description =
  "Research in Axodus focuses on governed knowledge, institutional workflows, and proposal-level validation.";

export const metadata = createPageMetadata({
  title: "Research",
  description,
  pathname: "/research/",
});

export default function Research() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Research</Eyebrow>
          <h1>Research over promotion.</h1>
          <p>{description}</p>
        </div>
        <aside>
          <StatusBadge>Evidence centered</StatusBadge>
          <p className="aside-note">
            The public record should separate hypotheses, documentation, and
            verified claims.
          </p>
        </aside>
      </section>

      <section className="section shell split-section">
        <SectionIntro
          index=">_"
          label="Inquiry areas"
          title="The project is framed as a research program."
        />
        <div className="prose-large">
          <p>
            Axodus explores how an institutional system can keep knowledge
            governed while still allowing modules, workflows, and records to
            interoperate.
          </p>
          <p>
            The research page is where the site should point readers who want
            assumptions, limits, and the current evidence boundary.
          </p>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index=">_"
            label="Evidence boundary"
            title="Observations are not guarantees."
            light
          />
          <div className="three-grid">
            <article>
              
              <h3>Documented</h3>
              <p>Public notes, route copy, and technical descriptions.</p>
            </article>
            <article>
              
              <h3>Proposed</h3>
              <p>Architectural concepts and institutional patterns.</p>
            </article>
            <article>
              
              <h3>Not claimed</h3>
              <p>Adoption, user growth, external relationship claims, or performance gains.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index=">_"
          label="Further reading"
          title="Use publications and governance together."
        />
        <div className="actions">
          <Link className="button primary" href="/publications">
            Publications
          </Link>
          <Link className="button secondary" href="/governance">
            Governance
          </Link>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
