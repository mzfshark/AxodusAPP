import Image from "next/image";
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
            Axodus is a research and design proposal for governed knowledge,
            institutional workflows, and digital services.
          </p>
        </aside>

      </section>



      <section className="section-hero light-panel">
        <div className="inner-hero shell">
          <div> 
            <SectionIntro
              index="01"
              label="The problem space"
              title="Institutional work needs clearer connections between knowledge, decisions, and responsibility."
            />

            <div className="prose-large">
              <p>
                In complex organizations, it can be difficult to understand why a
                decision was made, who is responsible for it, or what evidence
                informed it. Technology, people, and rules can become disconnected.
              </p>
              <p>
                Axodus explores institutional design: how governed knowledge,
                traceable decisions, defined responsibility, and digital services
                might relate within clear boundaries.
              </p>
            </div>
          </div>
          <aside>
            <Image
              src="/ui-pack/hero-wia.svg"
              alt="Orbiting shapes"
              width={660}
              height={528}
            />

          </aside>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index="02"
            label="What the proposed ecosystem explores"
            title="Design and research themes for interoperable institutional capabilities."
            light
          />
          <div className="three-grid">
            <article>
              <span>01</span>
              <h3>Governance and knowledge</h3>
              <p>
                Constitutional constraints, bounded local governance domains,
                provenance, review, and accountability.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Institutional workflows</h3>
              <p>
                Workflows that connect people, documents, evidence, and
                decisions through defined responsibilities.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>AI assistance</h3>
              <p>
                AI assistance for bounded analytical and documentation tasks,
                with human oversight of consequential decisions.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index="03"
          label="Concepts and platform relationships"
          title="A modular ecosystem of proposed foundations and service nuclei."
        />
        <div className="evidence-grid">
          <article className="evidence-card exists">
            <span className="mini-label">Foundation concepts</span>
            <h3>Shared institutional foundations</h3>
            <ul>
              <li>Governed knowledge and institutional records</li>
              <li>Human oversight and bounded local governance</li>
              <li>Interoperable protocols and modular service selection</li>
            </ul>
          </article>
          <article className="evidence-card future">
            <span className="mini-label">Proposed nuclei</span>
            <h3>Independent areas of study</h3>
            <ul>
              <li>Academy, Marketplace, and Business concepts</li>
              <li>Governed AI-assisted and publication-oriented capabilities</li>
              <li>Conceptual relationships subject to research and design</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section shell split-section">
        <SectionIntro
          index="04"
          label="Current stage"
          title="A conceptual, prototype-stage model."
        />
        <div className="prose-large">
          <p>
            Axodus documents proposed architectures, design objectives, and
            research questions. Its taxonomy organizes concepts, roles, and
            relationships for further study.
          </p>
          <p>
            It is not presented as ready-to-use software, a certified platform,
            or an implementation ready for production.
          </p>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index="05"
            label="What Axodus is not"
            title="Clear boundaries for the current public identity."
            light
          />
          <div className="three-grid">
            <article>
              <span>01</span>
              <h3>Not an investment product</h3>
              <p>
                Axodus is not an ETF, investment product, financial service, or
                return-generating scheme.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Not a final platform</h3>
              <p>
                It is not a finished enterprise software suite, certified
                system, or production-ready deployment.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Not a performance promise</h3>
              <p>
                The project does not claim financial returns, commercial
                superiority, security guarantees, or operational outcomes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell final-cta">
        <Eyebrow>Institutional links</Eyebrow>
        <h2>Explore the public record and related institutional context.</h2>
        <div className="actions">
          <Link className="button primary" href="/governance">
            Governance
          </Link>
          <Link className="button secondary" href="/research">
            Research
          </Link>
          <a
            className="button secondary"
            href="https://docs.axodus.country/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            className="button secondary"
            href="https://github.com/Axodus/Institutional"
            target="_blank"
            rel="noopener noreferrer"
          >
            Institutional repository
          </a>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
