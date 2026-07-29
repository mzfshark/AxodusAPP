/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Eyebrow({children}:{children:React.ReactNode}) { return <p className="eyebrow"><span/> {children}</p>; }
export function StatusBadge({children}:{children:React.ReactNode}) { return <span className="status-badge"><i/> {children}</span>; }
export function SectionIntro({index,label,title,light=false}:{index:string,label:string,title:string,light?:boolean}) { return <div className={`section-intro ${light?"light":""}`}><p><span>{index}</span>{label}</p><h2>{title}</h2></div>; }

export function PublicationCard({title,type,status,audience,date,summary}:{title:string,type:string,status:string,audience:string,date:string,summary:string}) {
  return <article className="publication-card"><div className="pub-meta"><span>{type}</span><StatusBadge>{status}</StatusBadge></div><h3>{title}</h3><p>{summary}</p><dl><div><dt>Audience</dt><dd>{audience}</dd></div><div><dt>Date</dt><dd>{date}</dd></div></dl><span className="pub-link">Document overview <b>↗</b></span></article>;
}

export function Disclaimer() { return <aside className="disclaimer"><div><StatusBadge>Important notice</StatusBadge><h2>Prototype-stage initiative</h2></div><p><strong>Axodus is currently in prototype stage.</strong> Public materials are informational and directional. They do not represent a production-ready platform, operational guarantee, investment solicitation, legal offer or promise of financial performance.</p></aside>; }

const nav = [["Concept","/concept"],["Evolution","/evolution"],["Publications","/publications"],["Prototype","/prototype"],["Investor orientation","/investor-orientation"]];
function Brand({footer=false}:{footer?:boolean}){return <Link className={`brand ${footer?"footer-brand":""}`} href="/" aria-label="Axodus home"><img src="/axodus-mark.svg" width="50" height="39" alt=""/><span className="brand-copy"><span className="wordmark-label">Axodus</span><span className="brand-subline">Prototype initiative</span></span></Link>}
export function Header(){return <header className="site-header"><div className="shell nav-wrap"><Brand/><div className="nav-actions"><nav aria-label="Primary navigation">{nav.map(([n,h])=><Link key={h} href={h}>{n}</Link>)}<Link className="nav-contact" href="/contact">Contact ↗</Link></nav><ThemeToggle/><details className="mobile-nav"><summary aria-label="Open navigation"><span/><span/></summary><div>{nav.map(([n,h])=><Link key={h} href={h}>{n}</Link>)}<Link href="/contact">Contact ↗</Link></div></details></div></div></header>}
export function Footer(){return <footer><div className="shell footer-main"><div><Brand footer/><p>A governed prototype for a new ecosystem direction.</p><a className="dev-link" href="https://dev.axodus.country/" target="_blank" rel="noreferrer">Development prototype ↗</a></div><div><h3>Explore</h3>{nav.slice(0,3).map(([n,h])=><Link key={h} href={h}>{n}</Link>)}</div><div><h3>Project</h3>{nav.slice(3).map(([n,h])=><Link key={h} href={h}>{n}</Link>)}<Link href="/contact">Contact</Link></div></div><div className="shell footer-disclaimer"><p>Axodus is currently in prototype stage. Public materials are informational and directional; they do not represent a production-ready platform, operational guarantee, investment solicitation, legal offer or promise of financial performance.</p><span>© 2026 Axodus · Institutional website</span></div></footer>}

export function PageHero({eyebrow,title,dek,aside}:{eyebrow:string,title:React.ReactNode,dek:string,aside?:React.ReactNode}){return <section className="page-hero shell"><div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{dek}</p></div>{aside&&<aside>{aside}</aside>}</section>}
