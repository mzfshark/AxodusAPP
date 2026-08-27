/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import Link from "next/link";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow ax-eyebrow">
      <span />
      {children}
    </p>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="status-badge ax-badge">
      <i />
      {children}
    </span>
  );
}

export function SectionIntro({
  index,
  label,
  title,
  light = false,
}: {
  index: string;
  label: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className={"section-intro ax-section-header" + (light ? " light" : "")}>
      <p>
        <span>{index}</span>
        {label}
      </p>
      <h2>{title}</h2>
    </div>
  );
}

export function PublicationCard({
  title,
  type,
  status,
  audience,
  date,
  summary,
  href,
}: {
  title: string;
  type: string;
  status: string;
  audience: string;
  date: string;
  summary: string;
  href?: string;
}) {
  return (
    <article className="publication-card ax-card">
      <div className="pub-meta">
        <span>{type}</span>
        <StatusBadge>{status}</StatusBadge>
      </div>
      <h3>{title}</h3>
      <p>{summary}</p>
      <dl>
        <div>
          <dt>Audience</dt>
          <dd>{audience}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{date}</dd>
        </div>
      </dl>
      {href ? (
        <a
          className="pub-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open document
        </a>
      ) : (
        <span className="pub-link muted">Publication in preparation</span>
      )}
    </article>
  );
}

export function Disclaimer() {
  return (
    <aside className="disclaimer">
      <div>
        <StatusBadge>Important notice</StatusBadge>
        <h2>Conceptual, prototype-stage model</h2>
      </div>
      <p>
        <strong>Axodus is presented here as a research-driven initiative.</strong>{" "}
        Public materials are informational and directional. They do not claim
        production readiness, adoption, revenue, security, or financial
        performance.
      </p>
    </aside>
  );
}

const nav = [
  ["What is Axodus?", "/what-is-axodus"],
  ["Governance", "/governance"],
  ["Research", "/research"],
  ["Publications", "/publications"],
  ["Platforms", "/platforms"],
] as const;

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      className={"brand" + (footer ? " footer-brand" : "")}
      href="/"
      aria-label="Axodus home"
    >
      <img src="/axodus-mark.svg" width="50" height="39" alt="" />
      <span className="brand-copy">
        <span className="wordmark-label">Axodus</span>
        <span className="brand-subline">Institutional site</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="shell ax-container nav-wrap ax-nav">
        <Brand />
        <div className="nav-actions">
          <nav aria-label="Primary navigation">
            {nav.map(([name, href]) => (
              <Link key={href} href={href}>
                {name}
              </Link>
            ))}
            <a
              className="nav-contact ax-button ax-button--secondary"
              href="https://docs.axodus.country/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Open navigation">
              <span />
              <span />
            </summary>
            <div>
              {nav.map(([name, href]) => (
                <Link key={href} href={href}>
                  {name}
                </Link>
              ))}
              <a
                href="https://docs.axodus.country/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="ax-footer">
      <div className="shell footer-main">
        <div>
          <Brand footer />
          <p>Research-driven institutional pages with bounded public claims.</p>
        </div>
        <div>
          <h3>Explore</h3>
          {nav.slice(0, 3).map(([name, href]) => (
            <Link key={href} href={href}>
              {name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Records</h3>
          {nav.slice(3).map(([name, href]) => (
            <Link key={href} href={href}>
              {name}
            </Link>
          ))}
          <a
            href="https://docs.axodus.country/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            href="https://github.com/Axodus/Institutional"
            target="_blank"
            rel="noopener noreferrer"
          >
            Institutional repository
          </a>
        </div>
      </div>
      <div className="shell footer-disclaimer">
        <p>
          Axodus is presented as a conceptual, prototype-stage model. Public
          materials are informational only and do not claim production
          readiness, adoption, revenue, security, or financial performance.
        </p>
        <span>© 2026 Axodus · Institutional website</span>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  dek,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  dek: string;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero shell">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{dek}</p>
      </div>
      {aside && <aside>{aside}</aside>}
    </section>
  );
}
