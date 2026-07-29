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
    email: "Channel in preparation",
  },
  {
    type: "Publication inquiry",
    desc: "Questions about public papers, references and research materials.",
    email: "Channel in preparation",
  },
  {
    type: "Partnership inquiry",
    desc: "Exploratory conversations about research or strategic alignment.",
    email: "Channel in preparation",
  },
  {
    type: "Investor orientation",
    desc: "Institutional context for those following the project’s development.",
    email: "Channel in preparation",
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
        aside={<StatusBadge>Contact routing in progress</StatusBadge>}
      />
      <section className="section shell">
        <div className="contact-grid">
          {inquiries.map((x) => (
            <article key={x.type}>
              <Eyebrow>{x.type}</Eyebrow>
              <p>{x.desc}</p>
              <span className="contact-channel">
                {x.email}
                <span>↗</span>
              </span>
            </article>
          ))}
        </div>
        <p className="contact-note">
          Contact channels are being prepared for public routing. Until
          verified public addresses are enabled, this page should be treated as
          an inquiry index only. Messages do not create an investment
          relationship, commitment or offer.
        </p>
      </section>
      <div className="shell">
        <Disclaimer />
      </div>
    </main>
  );
}
