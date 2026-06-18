import PageHeader from './PageHeader';

export default function PageShell({
  title,
  subtitle,
  module,
  scope = 'protocol',
  maturity = 'prototype',
  executionMode = 'read-only',
  actions = null,
  secondaryActions = null,
  alert = null,
  children,
  className = '',
}) {
  return (
    <main className={`ax-page-shell ${className}`}>
      <PageHeader
        title={title}
        subtitle={subtitle}
        module={module}
        scope={scope}
        maturity={maturity}
        executionMode={executionMode}
        actions={actions}
        secondaryActions={secondaryActions}
      />
      {alert ? <div className="ax-page-alert">{alert}</div> : null}
      <div className="ax-page-content">
        {children}
      </div>
    </main>
  );
}
