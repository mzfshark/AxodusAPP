import type { Metadata } from "next";
import { Disclaimer, Eyebrow, PageHero, StatusBadge } from "../ui";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Institutional, publication, partnership and investor-orientation inquiries for Axodus.",
};
const inquiries = [
  {
    type: "Institutional discussion",
    desc: "Questions about Axodus, its positioning and public direction.",
    email: "institutional@axodus.country",
  },
  {
    type: "Publication inquiry",
    desc: "Questions about public papers, references and research materials.",
    email: "press@axodus.country",
  },
  {
    type: "Partnership inquiry",
    desc: "Exploratory conversations about research or strategic alignment.",
    email: "partnerships@axodus.country",
  },
  {
    type: "Investor orientation",
    desc: "Institutional context for those following the project’s development.",
    email: "orientation@axodus.country",
  },
];
export default function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="06 · Contact"
        title={
          <>
            Start an <em>institutional conversation.</em>
          </>
        }
        dek="Axodus welcomes focused inquiries from readers, researchers, potential partners and people following the project’s long-term development."
        aside={<StatusBadge>Email inquiries only</StatusBadge>}
      />
      <section className="section shell">
        <div className="contact-grid">
          {inquiries.map((x) => (
            <article key={x.type}>
              <Eyebrow>{x.type}</Eyebrow>
              <p>{x.desc}</p>
              <a href={`mailto:${x.email}`}>
                {x.email}
                <span>↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="contact-note">
          These addresses are proposal placeholders and should be replaced with
          verified Axodus contact details before public launch. Messages do not
          create an investment relationship, commitment or offer.
        </p>
      </section>
      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
