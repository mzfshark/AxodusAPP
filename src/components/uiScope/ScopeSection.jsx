import ScopeBadge from './ScopeBadge';

export default function ScopeSection({ scope, title, description, children, actions = null, className = '' }) {
  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <ScopeBadge scope={scope} />
          <h2 className="mt-3 text-xl font-black tracking-tight text-on-surface">{title}</h2>
          {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-outline">{description}</p> : null}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
