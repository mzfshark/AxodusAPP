import Link from "next/link";
import { createPageMetadata, structuredData, SITE_DESCRIPTION } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

export const metadata = createPageMetadata({
  title: "What is Axodus?",
  description: SITE_DESCRIPTION,
  pathname: "/what-is-axodus/",
});

export default function WhatIsAxodus() {
  return (
    <main>
      {structuredData("What is Axodus?", "/what-is-axodus/")}
      <section className="page-hero shell">
        <div>
          <Eyebrow>Axodus</Eyebrow>
          <h1>What is Axodus?</h1>
          <p>{SITE_DESCRIPTION}</p>
        </div>
        <aside>
          <StatusBadge>Conceptual, prototype-stage model</StatusBadge>
          <p className="aside-note">
            Public explanation only. No claim of production readiness,
            adoption, or external validation.
          </p>
        </aside>
      </section>

      <section className="section shell split-section">
        <SectionIntro
          index="01"
          label="Public definition"
          title="The canonical statement used across the site."
        />
        <div className="prose-large">
          <p>{SITE_DESCRIPTION}</p>
          <p>
            Axodus should be read as a research program and institutional
            concept, not as a finished operating system or commercial platform.
          </p>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index="02"
            label="Current status"
            title="What the site says clearly."
            light
          />
          <div className="three-grid">
            <article>
              <span>01</span>
              <h3>Human oversight</h3>
              <p>Decision-making remains bounded and reviewable.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Bounded domains</h3>
              <p>Bounded local governance domains keep decision-making scoped to specific institutional domains.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Prototype stage</h3>
              <p>The model is conceptual and not presented as production-ready.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index="03"
          label="What is being explored"
          title="The ecosystem concepts that sit inside the proposal."
        />
        <div className="evidence-grid">
          <div className="evidence-card exists">
            <span className="mini-label">Included</span>
            <h3>Core concepts</h3>
            <ul>
              <li>Governed knowledge</li>
              <li>Institutional workflows</li>
              <li>Interoperable organizational platforms</li>
            </ul>
          </div>
          <div className="evidence-card future">
            <span className="mini-label">Not asserted</span>
            <h3>External outcomes</h3>
            <ul>
              <li>Adoption or user counts</li>
              <li>Security or performance guarantees</li>
              <li>Market or revenue claims tied to external relationships</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section shell final-cta">
        <Eyebrow>Next steps</Eyebrow>
        <h2>Read the governance and research pages for the supporting record.</h2>
        <div className="actions">
          <Link className="button primary" href="/governance">
            Governance
          </Link>
          <Link className="button secondary" href="/research">
            Research
          </Link>
          <a className="button secondary" href="https://docs.axodus.country/">
            Documentation
          </a>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
