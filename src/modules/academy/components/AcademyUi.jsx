import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { academyStatusClass, formatNeurons, getAcademyTutor } from '../services/academyService';

export function AcademyBadge({ value }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${academyStatusClass(value)}`}>
      {value}
    </span>
  );
}

export function AcademyPanel({ title, description, action, children }) {
  return (
    <section className="rounded-lg border border-white/10 bg-surface-container-low p-5 shadow-[0_18px_60px_rgba(0,0,0,.16)]">
      {(title || description || action) && (
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            {title && <h2 className="text-xl font-black text-on-surface">{title}</h2>}
            {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-outline">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function AcademyStatePanel({ title, message, state = 'info', action }) {
  const stateClass = {
    empty: 'border-white/15 bg-surface-container-low text-outline',
    loading: 'border-sky-400/20 bg-sky-500/10 text-sky-100',
    error: 'border-rose-400/25 bg-rose-500/10 text-rose-100',
    info: 'border-white/10 bg-surface-container-low text-outline',
  }[state] || 'border-white/10 bg-surface-container-low text-outline';

  return (
    <section className={`rounded-lg border p-5 ${stateClass}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-black text-on-surface">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6">{message}</p>
        </div>
        {action}
      </div>
    </section>
  );
}

export function AcademyMetricCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-container-low p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-outline">{label}</p>
          <p className="mt-2 text-2xl font-black text-on-surface">{value}</p>
        </div>
        {Icon && <Icon className="h-5 w-5 text-primary" aria-hidden="true" />}
      </div>
      {detail && <p className="mt-3 text-sm leading-5 text-outline">{detail}</p>}
    </article>
  );
}

export function AcademyProgressBar({ value, label }) {
  const safeValue = Math.max(0, Math.min(100, Number(value || 0)));
  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="font-bold text-on-surface">{label}</span>
          <span className="text-outline">{safeValue}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-primary" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}

export function AcademyHeader({ title, description }) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Axodus Academy</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-4xl text-sm leading-6 text-outline">{description}</p>}
        </div>
        <div className="flex max-w-xl items-start gap-3 rounded-lg border border-sky-400/20 bg-sky-500/10 px-4 py-3 text-sm leading-6 text-sky-100">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Academy is mock-only inside AxodusAPP. No minting, transfer, wallet reward distribution, or certification contract write is executed.</span>
        </div>
      </div>
    </header>
  );
}

export function AcademyCourseCard({ course }) {
  const tutor = getAcademyTutor(course.tutorId);
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-surface-container-low transition hover:border-primary/40">
      <img className="h-40 w-full object-cover" src={course.thumbnail} alt="" />
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          <AcademyBadge value={course.constitutionalStanding} />
          <AcademyBadge value={course.accessType === 'free' ? 'Free Course' : 'Paid Course'} />
        </div>
        <div>
          <Link to={`/academy/courses/${course.slug}`} className="text-lg font-black text-on-surface hover:text-primary">{course.title}</Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-outline">{course.shortDescription}</p>
        </div>
        <div className="grid gap-1 text-sm text-outline">
          <span>{course.category} / {course.level}</span>
          <span>{course.estimatedDuration} / {course.certificationOutcome}</span>
          <span>{tutor?.name || 'Academy tutor'}</span>
          <span className="font-bold text-on-surface">{formatNeurons(course.rewardAmount)} as {course.rewardType}</span>
          <span>{course.daoRecognition}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(course.governanceUnlocks || []).slice(0, 2).map((unlock) => <AcademyBadge key={unlock} value={unlock} />)}
        </div>
        <AcademyProgressBar value={course.progress} label="Progress" />
      </div>
    </article>
  );
}
