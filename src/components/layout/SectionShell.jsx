import ScopeBadge from '../uiScope/ScopeBadge';

export default function SectionShell({
  title,
  description,
  scope,
  actions = null,
  children,
  className = '',
}) {
  return (
    <section className={`ax-section-shell ${className}`}>
      <div className="ax-section-header">
        <div>
          <div className="ax-section-meta">
            {scope ? <ScopeBadge scope={scope} /> : null}
          </div>
          <h2 className="ax-section-title">{title}</h2>
          {description ? <p className="ax-section-description">{description}</p> : null}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
