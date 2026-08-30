import Link from "next/link";
import {
  createPageMetadata,
  SITE_DESCRIPTION,
  structuredData,
} from "../site";
import { Disclaimer, Eyebrow, SectionIntro, StatusBadge } from "../ui";

const description =
  "Explore the proposed Axodus ecosystem of interoperable, AI-native organizational platforms and bounded conceptual domains.";

const externalPlatforms = [
  {
    name: "Academy",
    description: "Proposed educational and certification platform.",
    role: "Learning and credentialing context",
    href: "https://academy.country/",
    status: "Separate prototype",
  },
  {
    name: "Marketplace",
    description:
      "Proposed platform for configurable exchange of assets, products, and services.",
    role: "Configurable exchange context",
    href: "https://marketplace.country/",
    status: "Separate prototype",
  },
  {
    name: "BBA",
    description:
      "Proposed institutional publishing and creative-workflow platform.",
    role: "Publishing and creative workflows",
    href: "https://bba.country/",
    status: "Separate prototype",
  },
  {
    name: "ACS",
    description:
      "Proposed governed AI-agent and AI-assisted solution layer.",
    role: "Governed AI-assisted workflows",
    href: "https://acs.axodus.country/",
    status: "Separate prototype",
  },
  {
    name: "Governance",
    description:
      "Proposed constitutional and ecosystem-governance platform for a standalone Harmony-oriented context.",
    role: "Constitutional governance context",
    href: "https://governance.country/",
    status: "Separate evaluation",
    boundary:
      "This concept is subject to its own review. No acceptance, adoption, partnership, or domain migration is asserted.",
  },
] as const;

const conceptualDomains = [
  {
    name: "DeFi",
    description:
      "Proposed decentralized-finance domain requiring separate legal and regulatory review.",
  },
  {
    name: "Mining",
    description:
      "Proposed tokenized-mining domain with no yield, asset, or operational claim.",
  },
  {
    name: "Lotto",
    description:
      "Proposed cryptoasset lottery domain in planning context only and subject to legal review.",
  },
] as const;

export const metadata = createPageMetadata({
  title: "Axodus Platforms — Proposed organizational ecosystem",
  description: SITE_DESCRIPTION,
  pathname: "/platforms/",
});

export default function Platforms() {
  return (
    <main>
      {structuredData("Axodus platforms", "/platforms/")}
      <section className="page-hero shell">
        <div>
          <Eyebrow>Platforms</Eyebrow>
          <h1>Proposed platforms and conceptual domains.</h1>
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
          index=">_"
          label="Intended nuclei"
          title="Modules stay conceptual until the public record says otherwise."
        />
        <div className="prose-large">
          <p>{SITE_DESCRIPTION}</p>
          <p>
            Platform names describe intended institutional roles. They do not
            establish implementation, availability, adoption, or production
            status.
          </p>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell">
          <SectionIntro
            index=">_"
            label="External destinations"
            title="Proposed platforms with separate public destinations."
            light
          />
          <p className="external-note">
            Each destination is a separate page or prototype. A link does not
            establish implementation, adoption, partnership, readiness, or
            editorial equivalence with the Axodus institutional record.
          </p>
          <div className="platform-grid">
            {externalPlatforms.map((platform, index) => (
              <article
                className="platform-card external ax-card"
                key={platform.name}
              >
                <div className="platform-card__top">
                  <span className="platform-card__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <StatusBadge>{platform.status}</StatusBadge>
                </div>
                <h3>{platform.name}</h3>
                <p>{platform.description}</p>
                <p className="platform-card__function">{platform.role}</p>
                {"boundary" in platform ? (
                  <p className="platform-card__boundary">{platform.boundary}</p>
                ) : null}
                <div className="platform-card__footer">
                  <span>Separate page or prototype</span>
                  <a
                    className="platform-link"
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${platform.name} external destination in a new tab`}
                  >
                    Open destination
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionIntro
          index=">_"
          label="No external destination"
          title="Conceptual domains remain unlinked and explicitly bounded."
        />
        <div className="platform-boundary-note">
          <h3>Status boundary</h3>
          <p>
            These entries do not represent an operation, available product,
            financial return, yield, or regulated service. No future URL or
            launch status is implied.
          </p>
        </div>
        <div className="platform-grid conceptual-grid">
          {conceptualDomains.map((domain, index) => (
            <article
              className="platform-card conceptual ax-card"
              key={domain.name}
            >
              <div className="platform-card__top">
                <span className="platform-card__index">
                  {String(index + 6).padStart(2, "0")}
                </span>
                <StatusBadge>Conceptual domain</StatusBadge>
              </div>
              <h3>{domain.name}</h3>
              <p>{domain.description}</p>
              <div className="platform-card__footer">
                <span className="platform-no-link">No official destination</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell final-cta">
        <Eyebrow>Institutional context</Eyebrow>
        <h2>Read platform names together with their status and boundaries.</h2>
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
