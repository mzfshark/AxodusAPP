import { NavLink } from 'react-router-dom';
import {
  Archive,
  Boxes,
  CalendarDays,
  ClipboardCheck,
  DatabaseZap,
  GitBranch,
  Landmark,
  ShieldCheck,
  Ticket,
} from 'lucide-react';
import { formatDate, formatSimulatedAmount, titleize } from '../utils/lotteryFormat';

const navItems = [
  { to: '/lottery', label: 'Dashboard', end: true, icon: Boxes },
  { to: '/lottery/draws', label: 'Draws', icon: CalendarDays },
  { to: '/lottery/game-models', label: 'Game models', icon: GitBranch },
  { to: '/lottery/tickets', label: 'Tickets', icon: Ticket },
  { to: '/lottery/prizes', label: 'Prize pools', icon: Landmark },
  { to: '/lottery/governance', label: 'Governance', icon: ClipboardCheck },
  { to: '/lottery/randomness', label: 'Randomness', icon: DatabaseZap },
  { to: '/lottery/history', label: 'History', icon: Archive },
];

const navClass = ({ isActive }) =>
  `inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? 'border-primary/40 bg-primary/15 text-on-surface'
      : 'border-white/10 bg-surface-container-low text-outline hover:border-white/20 hover:text-on-surface'
  }`;

const badgeTones = {
  neutral: 'border-white/10 bg-surface-container-high text-outline',
  success: 'border-secondary/30 bg-secondary/10 text-secondary',
  warning: 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  danger: 'border-error/30 bg-error/10 text-error',
  info: 'border-primary/30 bg-primary/10 text-primary',
  mock: 'border-primary/30 bg-primary/10 text-primary',
};

const lifecycleTones = {
  draft: 'border-white/10 bg-surface-container-high text-outline',
  'governance-review': 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  scheduled: 'border-primary/30 bg-primary/10 text-primary',
  open: 'border-secondary/30 bg-secondary/10 text-secondary',
  cutoff: 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  'randomness-pending': 'border-primary/30 bg-primary/10 text-primary',
  drawn: 'border-secondary/30 bg-secondary/10 text-secondary',
  'claims-open': 'border-secondary/30 bg-secondary/10 text-secondary',
  closed: 'border-white/10 bg-surface-container text-outline',
  archived: 'border-white/10 bg-surface-container text-outline',
};

export function LotterySectionNav() {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Lottery section navigation">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
          <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export function LotteryPageShell({ eyebrow, title, description, children }) {
  return (
    <main className="app-view-shell space-y-8">
      <section className="rounded-lg border border-white/10 bg-surface-container-low p-6 shadow-glass">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">{eyebrow}</p>
            <h1 className="mt-2 max-w-4xl text-3xl font-black tracking-tight text-on-surface md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-outline">{description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            <Badge tone="mock">mock / non-executable</Badge>
          </div>
        </div>
      </section>
      <LotterySectionNav />
      {children}
    </main>
  );
}

export function Badge({ children, tone = 'neutral' }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${badgeTones[tone]}`}>
      {children}
    </span>
  );
}

export function LifecycleBadge({ state }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${
        lifecycleTones[state] ?? lifecycleTones.draft
      }`}
    >
      {titleize(state)}
    </span>
  );
}

export function MetricCard({ label, value, detail, icon: Icon = Boxes }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-outline">{label}</p>
          <p className="mt-2 text-2xl font-black text-on-surface">{value}</p>
          <p className="mt-1 text-sm leading-5 text-outline">{detail}</p>
        </div>
        <div className="rounded-lg border border-primary/20 bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

export function DrawCard({ draw }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="flex flex-wrap gap-2">
        <LifecycleBadge state={draw.lifecycleState} />
        <Badge tone="mock">simulated prize pool</Badge>
      </div>
      <h2 className="mt-4 text-xl font-black text-on-surface">{draw.name}</h2>
      <p className="mt-2 text-sm leading-6 text-outline">{draw.description}</p>
      <dl className="mt-5 grid gap-3 text-sm">
        <InfoRow label="Model" value={titleize(draw.gameType)} />
        <InfoRow label="Chain" value={draw.chain} />
        <InfoRow label="Draw date" value={formatDate(draw.drawDate)} />
        <InfoRow label="Standing" value={titleize(draw.constitutionalStanding)} />
      </dl>
      <div className="mt-5 rounded-lg border border-white/10 bg-surface-container p-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-outline">Simulated accounting</p>
        <p className="mt-1 font-bold text-on-surface">
          {formatSimulatedAmount(draw.prizePool, draw.currency)}
        </p>
      </div>
      <NavLink
        className="mt-5 inline-flex w-full justify-center rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/20"
        to={`/lottery/draws/${draw.slug}`}
      >
        Review draw record
      </NavLink>
    </article>
  );
}

export function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-surface-container p-3">
      <dt className="text-outline">{label}</dt>
      <dd className="text-right font-bold text-on-surface">{value}</dd>
    </div>
  );
}

export function EmptyState({ title, description }) {
  return (
    <div className="rounded-lg border border-dashed border-white/20 bg-surface-container-low p-8 text-center">
      <h2 className="text-lg font-bold text-on-surface">{title}</h2>
      <p className="mt-2 text-sm text-outline">{description}</p>
    </div>
  );
}
