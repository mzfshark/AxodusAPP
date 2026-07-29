import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PageHero, SectionIntro, StatusBadge } from "../ui";
export const metadata: Metadata = { title: "Concept", description: "The central thesis, problem space and long-term ecosystem direction behind Axodus." };
export default function Concept() {
  return (
    <main>
      <PageHero
        eyebrow="01 · Project concept"
        title={
          <>
            A foundation for <em>responsible complexity.</em>
          </>
        }
        dek="Axodus explores how ambitious ecosystems can develop through governance, evidence and staged execution—not momentum alone."
        aside={
          <>
            <StatusBadge>Conceptual direction</StatusBadge>
            <p className="aside-note">
              Accessible thesis overview.
              <br />
              Architecture details remain in research materials.
            </p>
          </>
        }
      />
      <section className="section shell split-section">
        <SectionIntro
          index="01"
          label="Central idea"
          title="Turn long-term ambition into reviewable progress."
        />
        <div className="prose-large">
          <p>
            Complex ecosystems rarely fail for lack of ambition. They fail when
            growth outruns governance, documentation and evidence.
          </p>
          <p>
            Axodus investigates a different starting point: establish the
            intellectual and institutional foundation first, then develop
            through defined stages that preserve clarity as complexity grows.
          </p>
        </div>
      </section>
      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index="02"
            label="The thesis"
            title="Four disciplines, one evolving foundation."
            light
          />
          <div className="four-grid">
            <article>
              <b>Research</b>
              <h3>Question the premise</h3>
              <p>
                Investigate the problem space before treating a hypothesis as a
                product.
              </p>
            </article>
            <article>
              <b>Documentation</b>
              <h3>Make work legible</h3>
              <p>
                Create an accessible record of assumptions, decisions and
                current evidence.
              </p>
            </article>
            <article>
              <b>Governance</b>
              <h3>Structure accountability</h3>
              <p>
                Define how decisions, responsibilities and changes may be
                handled.
              </p>
            </article>
            <article>
              <b>Execution</b>
              <h3>Advance by stages</h3>
              <p>
                Move from thesis to prototype and experiments through bounded
                phases.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section shell">
        <SectionIntro
          index="03"
          label="Ecosystem direction"
          title="A long-term system, developed without pretending the future already exists."
        />
        <div className="editorial-columns">
          <p>
            Axodus is oriented toward an ecosystem in which governance,
            technical components, knowledge and institutional participation can
            develop together.
          </p>
          <p>
            The exact operational form is not finalized. The current work
            focuses on the foundations required to explore that direction
            responsibly: research, models, documentation and prototype activity.
          </p>
          <p>
            This separation matters. Vision explains where the project may go.
            Evidence explains where it actually is. Axodus intends to keep both
            visible.
          </p>
        </div>
        <div className="boundary">
          <div>
            <span>Current evidence</span>
            <strong>Research · Documentation · Models · Prototype work</strong>
          </div>
          <i>≠</i>
          <div>
            <span>Long-term direction</span>
            <strong>
              Validated components · Operational maturity · Ecosystem scale
            </strong>
          </div>
        </div>
      </section>
      <section className="section shell next-step">
        <div>
          <span>Continue reading</span>
          <h2>See how the direction is divided into stages.</h2>
        </div>
        <Link className="button primary" href="/evolution">
          View project evolution ↗
        </Link>
      </section>
      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
