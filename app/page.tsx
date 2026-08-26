/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Disclaimer, Eyebrow, PublicationCard, SectionIntro, StatusBadge } from "./ui";

export default function Home() {
  return (
    <>
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <Eyebrow>Governed prototype · Research initiative</Eyebrow>
            <h1>A governed prototype for a new <em>ecosystem direction.</em></h1>
            <p className="hero-deck">Research-driven, documentation-first and built through staged execution.</p>
            <div className="actions">
              <Link className="button primary" href="/concept">Explore the concept <span>↗</span></Link>
              <Link className="button secondary" href="/publications">Read publications</Link>
            </div>
          </div>
          <aside className="hero-status" aria-label="Project status">
            <div className="status-top"><StatusBadge>Prototype stage</StatusBadge><span>AXD / 001</span></div>
            <div className="brand-signal" aria-hidden="true"><img src="/axodus-a.png" width="1024" height="985" alt=""/><div className="signal-lines"><span/><span/><span/></div><i>GOVERNED<br/>FOUNDATION</i></div>
            <p>Building the governed foundation—not presenting a finished platform.</p>
            <dl>
              <div><dt>Method</dt><dd>Staged execution</dd></div>
              <div><dt>Foundation</dt><dd>Research + governance</dd></div>
              <div><dt>Current state</dt><dd>Early prototype</dd></div>
            </dl>
            <div className="prototype-link"><span>Public prototype access is under review.</span><b>INTERNAL REVIEW</b></div>
          </aside>
        </section>

        <section className="ticker" aria-label="Project principles"><div className="shell">Research driven <i/> Governed <i/> Documentation first <i/> Long-term <i/> Auditable</div></section>

        <section className="section shell split-section">
          <SectionIntro index="01" label="What Axodus is" title="A disciplined path from thesis to evidence." />
          <div className="prose-large">
            <p>Axodus is a prototype-stage initiative building a governed foundation for a new ecosystem direction.</p>
            <p>It combines research, documentation, governance and staged execution to transform a long-term vision into an auditable and progressively developed project.</p>
            <Link className="text-link" href="/concept">Read the project thesis <span>→</span></Link>
          </div>
        </section>

        <section className="section dark-panel">
          <div className="shell">
            <SectionIntro index="02" label="Why it exists" title="Complex systems need stronger foundations." light />
            <div className="three-grid">
              <article><span>01</span><h3>Governance before scale</h3><p>Decision structures and accountability should develop before operational complexity accelerates.</p></article>
              <article><span>02</span><h3>Evidence before claims</h3><p>Public documentation should distinguish demonstrated work from direction, intent and hypothesis.</p></article>
              <article><span>03</span><h3>Progress before promotion</h3><p>Development proceeds through bounded stages that can be reviewed, challenged and refined.</p></article>
            </div>
          </div>
        </section>

        <section className="section shell">
          <SectionIntro index="03" label="Current position" title="Ambitious in direction. Precise about maturity." />
          <div className="evidence-grid">
            <div className="evidence-card exists"><span className="mini-label">Exists today</span><h3>Foundation work</h3><ul><li>Structured documentation</li><li>Research materials</li><li>Conceptual architecture</li><li>Governance models</li><li>Prototype work</li></ul></div>
            <div className="evidence-card future"><span className="mini-label">Not yet operational</span><h3>Future maturity</h3><ul><li>Full production platform</li><li>Mature operating ecosystem</li><li>Validated market implementation</li><li>Final legal structure</li><li>Production infrastructure</li></ul></div>
          </div>
          <div className="stage-note"><StatusBadge>Prototype stage</StatusBadge><p>Documentation maturity does not mean product maturity. Research maturity does not mean production readiness.</p><Link href="/prototype">View status in detail →</Link></div>
        </section>

        <section className="section shell vision-band">
          <Eyebrow>Long-term direction</Eyebrow>
          <blockquote>Build an ecosystem that can grow without losing the discipline that made it <em>credible.</em></blockquote>
          <div><p>The ambition is long-term: a progressively validated ecosystem supported by transparent governance, clear documentation and responsible execution.</p><Link className="button secondary" href="/evolution">View project evolution</Link></div>
        </section>

        <section className="section publications shell">
          <SectionIntro index="04" label="Publications" title="The public record of the project." />
          <div className="publication-grid">
            <PublicationCard title="Axodus: Project Thesis" type="Research paper" status="Planned public release" audience="General / Research" date="2026" summary="The foundational thesis, problem space and proposed direction for the Axodus ecosystem." />
            <PublicationCard title="Governance Foundation" type="Institutional note" status="Planned public release" audience="Partners / Technical" date="2026" summary="Early principles for decision-making, documentation discipline and accountable project evolution." />
            <PublicationCard title="Staged Execution Framework" type="Working paper" status="Planned" audience="Investors / Partners" date="—" summary="A framework for moving from concept to validated components through bounded development phases." />
          </div>
          <Link className="text-link" href="/publications">Browse all public materials <span>→</span></Link>
        </section>

        <section className="section partner-block">
          <div className="shell partner-inner">
            <div><Eyebrow>For investors & partners</Eyebrow><h2>Follow the discipline,<br/>not a promise.</h2></div>
            <div><p>Axodus may be relevant to people and institutions interested in governable, research-based approaches to complex ecosystem development.</p><p>This is not an investment solicitation. No returns, timelines or outcomes are promised.</p><Link className="button light" href="/investor-orientation">Investor orientation <span>↗</span></Link></div>
          </div>
        </section>

        <section className="section shell final-cta"><Eyebrow>Follow the work</Eyebrow><h2>Read the evidence.<br/>Understand the direction.</h2><div className="actions"><Link className="button primary" href="/publications">Read publications</Link><Link className="button secondary" href="/contact">Contact Axodus</Link></div></section>
        <div className="shell"><Disclaimer /></div>
      </main>
    </>
  );
}
