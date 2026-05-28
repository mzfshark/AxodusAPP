import ScopeBadge from '../uiScope/ScopeBadge';

export default function CardShell({
  title,
  subtitle,
  scope,
  maturity,
  executionMode,
  status,
  actions = null,
  footer = null,
  children,
  className = '',
}) {
  return (
    <article className={`ax-card-shell ${className}`}>
      <div className="ax-card-header">
        <div>
          <div className="ax-card-meta">
            {scope ? <ScopeBadge scope={scope} /> : null}
            {maturity ? <span className="ax-meta-chip">{maturity}</span> : null}
            {executionMode ? <span className="ax-meta-chip">{executionMode}</span> : null}
            {status ? <span className="ax-meta-chip">{status}</span> : null}
          </div>
          {title ? <h3 className="ax-card-title">{title}</h3> : null}
          {subtitle ? <p className="ax-card-subtitle">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
      <div className="ax-card-body">{children}</div>
      {footer ? <div className="ax-card-footer">{footer}</div> : null}
    </article>
  );
}
