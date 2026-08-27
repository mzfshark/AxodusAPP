import { createPageMetadata } from "../site";
import { Disclaimer, Eyebrow, PublicationCard, SectionIntro, StatusBadge } from "../ui";

const description =
  "Publications collect the reviewed institutional record for Axodus.";

export const metadata = createPageMetadata({
  title: "Publications",
  description,
  pathname: "/publications/",
});

export default function Publications() {
  return (
    <main>
      <section className="page-hero shell">
        <div>
          <Eyebrow>Publications</Eyebrow>
          <h1>The public record.</h1>
          <p>{description}</p>
        </div>
        <aside>
          <StatusBadge>Reviewed materials</StatusBadge>
          <p className="aside-note">
            Public listings should stay separate from draft or preview content.
          </p>
        </aside>
      </section>

      <section className="section shell">
        <SectionIntro
          index="01"
          label="Current listings"
          title="Approved public materials and planned references."
        />
        <div className="publication-grid large">
          <PublicationCard
            title="Axodus: Project Thesis"
            type="Research paper"
            status="Planned public release"
            audience="General / Research"
            date="2026"
            summary="The foundational thesis, problem space, and proposed direction for Axodus."
          />
          <PublicationCard
            title="Governance Foundation"
            type="Institutional note"
            status="Planned public release"
            audience="Research / Institutional"
            date="2026"
            summary="The decision model, review practices, and bounded governance language."
          />
          <PublicationCard
            title="Staged Execution Framework"
            type="Working paper"
            status="Planned"
            audience="Research / Technical"
            date="—"
            summary="A framework for moving from concept to validated components through bounded stages."
          />
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index="02"
          label="Editorial rule"
          title="Only approved public destinations belong here."
        />
        <div className="prose-large">
          <p>
            Listings move into this page only after the material is public and
            its status is clear.
          </p>
        </div>
      </section>

      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
