import ChainRoleBadge from './ChainRoleBadge';
import { GuardrailReasonCode, ReasonSeverityBadge } from './GovernanceStanding';

function titleCase(value) {
  if (!value) return 'Pending';
  return String(value)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function LayerMetric({ label, value }) {
  return (
    <div className="rounded-md bg-surface-container-high p-3">
      <div className="text-xs font-bold uppercase text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-black text-on-surface">{value}</div>
    </div>
  );
}

function LayerList({ title, items, type = 'capability' }) {
  const visibleItems = (items ?? []).slice(0, 6);

  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-black text-on-surface">{title}</h3>
        <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] font-bold uppercase text-slate-400">
          {items?.length ?? 0}
        </span>
      </div>
      <div className="space-y-2">
        {visibleItems.map((item) => (
          <div key={item.key} className="rounded-md bg-surface-container-highest px-3 py-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-on-surface">{item.label ?? titleCase(item.key)}</span>
              <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] font-black uppercase text-slate-300">
                {type === 'condition' ? titleCase(item.status) : item.enabled ? 'Enabled' : 'Inactive'}
              </span>
            </div>
            {item.reasonCodes?.length ? (
              <div className="mt-2">
                {item.reasonCodes.slice(0, 2).map((reasonCode) => (
                  <GuardrailReasonCode key={reasonCode} reasonCode={reasonCode} reasonSeverity={item.reasonSeverity} />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConstitutionalLayerPanel({ chain, compact = false }) {
  const layer = chain?.constitutionalLayer ?? chain?.capabilities?.constitutionalLayer;
  if (!layer) return null;

  const executionModel = layer.executionModel ?? {};
  const federationModel = layer.federationModel ?? {};
  const authorityModel = layer.authorityModel ?? {};

  return (
    <section className={`rounded-lg border border-white/5 bg-surface-container-highest ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Constitutional Layer</h2>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">
            Registry-observed capabilities, conditions, authority, federation and execution state.
          </p>
        </div>
        <span className="rounded-md border border-violet-300/20 bg-violet-950/20 px-3 py-1 text-xs font-black uppercase text-violet-100">
          Render only
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <LayerMetric label="Authority" value={titleCase(executionModel.executionAuthority)} />
        <LayerMetric label="Constitutional asset" value={authorityModel.constitutionalAsset ?? '$Neurons'} />
        <LayerMetric label="Federation tier" value={titleCase(federationModel.federationTier)} />
        <LayerMetric label="Treasury review" value={executionModel.treasuryReviewRequired ? 'Required' : 'Not required'} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(federationModel.federationRoles ?? chain?.roles ?? []).map((role) => (
          <ChainRoleBadge key={role} role={role} />
        ))}
        {executionModel.reasonSeverity ? <ReasonSeverityBadge severity={executionModel.reasonSeverity} /> : null}
      </div>

      {executionModel.reasonCodes?.length ? (
        <div className="mt-4 rounded-lg border border-white/5 bg-surface-container-high p-4">
          <div className="text-xs font-bold uppercase text-slate-500">Execution reason codes</div>
          <div className="mt-2">
            {executionModel.reasonCodes.map((reasonCode) => (
              <GuardrailReasonCode key={reasonCode} reasonCode={reasonCode} reasonSeverity={executionModel.reasonSeverity} />
            ))}
          </div>
        </div>
      ) : null}

      {!compact ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <LayerList title="Capabilities" items={layer.capabilities} />
          <LayerList title="Conditions" items={layer.conditions} type="condition" />
        </div>
      ) : null}
    </section>
  );
}
