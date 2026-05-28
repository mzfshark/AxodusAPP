import ScopeBadge from '../uiScope/ScopeBadge';

export default function PageHeader({
  title,
  subtitle,
  module,
  scope,
  maturity,
  executionMode,
  actions = null,
  secondaryActions = null,
  children,
}) {
  return (
    <header className="ax-page-header">
      <div className="min-w-0">
        <div className="ax-page-header-meta">
          {module ? <span className="ax-meta-chip">{module}</span> : null}
          {scope ? <ScopeBadge scope={scope} /> : null}
          {maturity ? <span className="ax-meta-chip">{maturity}</span> : null}
          {executionMode ? <span className="ax-meta-chip">{executionMode}</span> : null}
        </div>
        <h1 className="ax-page-title">{title}</h1>
        {subtitle ? <p className="ax-page-subtitle">{subtitle}</p> : null}
        {children}
      </div>
      {(actions || secondaryActions) ? (
        <div className="ax-page-header-actions">
          {secondaryActions}
          {actions}
        </div>
      ) : null}
    </header>
  );
}
