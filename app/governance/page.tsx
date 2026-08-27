import Link from "next/link";
import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

const description =
  "Axodus governance is framed as constitutional, bounded, and human-reviewed.";

export const metadata = createPageMetadata({
  title: "Governance",
  description,
  pathname: "/governance/",
});

export default function Governance() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Governance</Eyebrow>
          <h1>Constitutional governance.</h1>
          <p>{description}</p>
        </div>
        <aside>
          <StatusBadge>Bounded local domains</StatusBadge>
          <p className="aside-note">
            Human oversight stays explicit; the site does not present automatic
            governance as a substitute for review.
          </p>
        </aside>
      </section>

      <section className="section shell split-section">
        <SectionIntro
          index="01"
          label="Governance model"
          title="Decision-making is scoped to specific institutional domains."
        />
        <div className="prose-large">
          <p>
            Axodus describes governance as constitutional: a small set of
            durable rules define how specific domains may be reviewed,
            amended, and observed.
          </p>
          <p>
            That structure is intentionally local. It limits claims, keeps
            responsibilities visible, and separates concept from operation.
          </p>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index="02"
            label="Oversight"
            title="Human review remains the governing constraint."
            light
          />
          <div className="three-grid">
            <article>
              <span>01</span>
              <h3>Bounded scope</h3>
              <p>Each domain should stay narrow enough to audit.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Human oversight</h3>
              <p>Review stays visible rather than implied.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Claims discipline</h3>
              <p>The site avoids unsupported statements about readiness or adoption.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index="03"
          label="Reference material"
          title="The governance pages should be read with the public record."
        />
        <div className="actions">
          <Link className="button primary" href="/publications">
            Publications
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
