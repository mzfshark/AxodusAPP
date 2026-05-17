import CapabilityPill from './CapabilityPill';
import ChainRoleBadge from './ChainRoleBadge';
import { GovernanceStandingSummary, ReasonSeverityBadge } from './GovernanceStanding';

function formatPlugins(chain) {
  const plugins = chain.capabilities?.supportedPluginTypes ?? [];
  if (!plugins.length) return 'No plugins';
  return plugins.slice(0, 4).join(', ') + (plugins.length > 4 ? ` +${plugins.length - 4}` : '');
}

export default function ChainRegistryTable({ chains }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest/80">
      <div className="flex flex-col gap-2 border-b border-white/5 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Chain Registry</h2>
          <p className="text-xs text-on-surface-variant">Canonical chain roles, adapters and governance capabilities.</p>
        </div>
        <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">
          {chains.length} networks
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1220px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3 font-bold">Network</th>
              <th className="px-5 py-3 font-bold">Roles</th>
              <th className="px-5 py-3 font-bold">Adapter</th>
              <th className="px-5 py-3 font-bold">Finality</th>
              <th className="px-5 py-3 font-bold">Federation Standing</th>
              <th className="px-5 py-3 font-bold">Capabilities</th>
              <th className="px-5 py-3 font-bold">Plugins</th>
              <th className="px-5 py-3 font-bold">Guardrail State</th>
            </tr>
          </thead>
          <tbody>
            {chains.map((chain) => (
              <tr key={chain.slug ?? chain.network} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface-container-high text-xs font-black text-cyan-200">
                      {chain.nativeCurrency?.symbol?.slice(0, 3) ?? 'DAO'}
                    </div>
                    <div>
                      <div className="font-bold text-on-surface">{chain.name}</div>
                      <div className="font-mono text-[11px] text-slate-500">
                        #{chain.chainId} · {chain.network}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {(chain.roles ?? []).map((role) => (
                      <ChainRoleBadge key={role} role={role} />
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-on-surface">{chain.adapter}</div>
                  <div className="text-xs text-slate-500">{chain.legacyHarmonyAdapter ? 'Legacy Harmony' : chain.family}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-mono text-xs text-on-surface">{chain.finality?.confirmationBlocks ?? '-'} blocks</div>
                  <div className="text-xs text-slate-500">window {chain.finality?.reorgWindowBlocks ?? '-'}</div>
                </td>
                <td className="px-5 py-4">
                  <GovernanceStandingSummary chain={chain} compact />
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <CapabilityPill enabled={chain.capabilities?.voting} label="Voting" />
                    <CapabilityPill enabled={chain.capabilities?.treasury} label="Treasury" />
                    <CapabilityPill enabled={chain.capabilities?.remoteExecution} label="Remote exec" />
                    <CapabilityPill enabled={chain.capabilities?.constitutionalConditions} label="Conditions" />
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-on-surface-variant">{formatPlugins(chain)}</td>
                <td className="px-5 py-4">
                  <div className="text-xs text-on-surface-variant">{chain.indexingStatus?.status ?? 'Not indexed'}</div>
                  {chain.indexingStatus?.reasonCode ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase text-slate-400">{chain.indexingStatus.reasonCode}</span>
                      <ReasonSeverityBadge severity={chain.indexingStatus.reasonSeverity} />
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
