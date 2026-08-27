import Link from "next/link";
import {
  Disclaimer,
  Eyebrow,
  SectionIntro,
  StatusBadge,
} from "./ui";
import {
  SITE_DESCRIPTION,
  createPageMetadata,
  structuredData,
} from "./site";

export const metadata = createPageMetadata({
  title: "Axodus — Research-driven AI-native organizational platforms",
  description: SITE_DESCRIPTION,
  pathname: "/",
});

export default function Home() {
  return (
    <main>
      {structuredData("Axodus", "/")}
      <section className="hero shell">
        <div className="hero-copy">
          <Eyebrow>01 · What is Axodus?</Eyebrow>
          <h1>Axodus is a research-driven initiative.</h1>
          <p className="hero-deck">{SITE_DESCRIPTION}</p>
          <div className="actions">
            <Link className="button primary" href="/what-is-axodus">
              Read the public explanation <span>↗</span>
            </Link>
            <a className="button secondary" href="https://docs.axodus.country/">
              Documentation
            </a>
          </div>
        </div>
        <aside className="hero-status" aria-label="Project status">
          <div className="status-top">
            <StatusBadge>Conceptual model</StatusBadge>
            <span>Prototype stage</span>
          </div>
          <p>
            Axodus is presented as a conceptual, prototype-stage model with
            human oversight and bounded local governance domains.
          </p>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>Conceptual, prototype-stage model</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Governed knowledge and institutional workflows</dd>
            </div>
            <div>
              <dt>Surface</dt>
              <dd>Interoperable organizational platforms</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="section shell split-section">
        <SectionIntro
          index="02"
          label="Canonical description"
          title="A concise public statement for visitors and systems."
        />
        <div className="prose-large">
          <p>{SITE_DESCRIPTION}</p>
          <p>
            The homepage makes the current status explicit: Axodus is a
            conceptual model in prototype stage, not a production platform.
          </p>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index="03"
            label="Current boundaries"
            title="What is included, and what is not."
            light
          />
          <div className="three-grid">
            <article>
              <span>01</span>
              <h3>Included</h3>
              <p>Governed knowledge, institutional workflows, and interoperable platforms.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Governance</h3>
              <p>Constitutional governance with bounded local domains and human oversight.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Not asserted</h3>
              <p>No adoption, revenue, security, production readiness, or external recognition claims.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index="04"
          label="What it is not"
          title="Terms and claims the site should not use."
        />
        <div className="evidence-grid">
          <div className="evidence-card exists">
            <span className="mini-label">Avoid</span>
            <h3>Legacy marketing terms</h3>
            <ul>
              <li>Legacy product-framing terms</li>
              <li>Commercial-led positioning</li>
              <li>Unsubstantiated superlatives</li>
            </ul>
          </div>
          <div className="evidence-card future">
            <span className="mini-label">Do not claim</span>
            <h3>Unsupported outcomes</h3>
            <ul>
              <li>Adoption, users, or external relationships</li>
              <li>Revenue, security, or performance</li>
              <li>Production readiness or market validation</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index="05"
          label="Public routes"
          title="Where readers should go next."
        />
        <div className="three-grid">
          <article>
            <h3>What is Axodus?</h3>
            <p>Primary public explanation of the project.</p>
            <Link href="/what-is-axodus">Open page →</Link>
          </article>
          <article>
            <h3>Governance</h3>
            <p>Constitutional governance, bounded domains, and oversight.</p>
            <Link href="/governance">Open page →</Link>
          </article>
          <article>
            <h3>Research and publications</h3>
            <p>Evidence, records, and public materials.</p>
            <Link href="/research">Open page →</Link>
          </article>
        </div>
      </section>

      <section className="section shell final-cta">
        <Eyebrow>Documentation</Eyebrow>
        <h2>Use the institutional record, not assumptions.</h2>
        <div className="actions">
          <Link className="button primary" href="/publications">
            Read publications
          </Link>
          <a className="button secondary" href="https://docs.axodus.country/">
            Open documentation
          </a>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
