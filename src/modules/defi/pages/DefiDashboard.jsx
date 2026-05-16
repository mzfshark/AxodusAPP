import { AlertTriangle, Banknote, BarChart3, Layers, ShieldCheck, WalletCards } from 'lucide-react';

const treasuryMetrics = [
  { label: 'Treasury visibility', value: '$0.00', detail: 'Awaiting indexed treasury source', icon: Banknote },
  { label: 'Active allocations', value: '0', detail: 'No live allocation adapter connected', icon: Layers },
  { label: 'Vault exposure', value: 'Read-only', detail: 'Execution disabled until governance guards are live', icon: WalletCards },
  { label: 'Risk posture', value: 'Pending', detail: 'Risk registry not connected yet', icon: ShieldCheck },
];

const vaults = [
  {
    name: 'Treasury Reserve',
    status: 'Not connected',
    network: 'Governance selected chain',
    exposure: '0%',
  },
  {
    name: 'Protocol Liquidity',
    status: 'Not connected',
    network: 'Governance selected chain',
    exposure: '0%',
  },
];

export default function DefiDashboard() {
  return (
    <main className="app-view-shell space-y-8">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase">Defi</span>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tighter">Treasury & Defi Overview</h1>
            <p className="mt-2 max-w-3xl text-sm text-outline">
              Read-only treasury visibility for the Axodus MVP. Financial execution stays disabled until DAO context,
              chain guards, and governance approvals are connected.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
            <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Mock-free execution mode
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {treasuryMetrics.map((metric) => (
          <article key={metric.label} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <metric.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="rounded-full bg-surface-container px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-outline">
                Read-only
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-outline">{metric.label}</p>
            <p className="mt-2 text-2xl font-bold text-on-surface">{metric.value}</p>
            <p className="mt-2 text-sm text-outline">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-surface-container-low p-6 xl:col-span-2">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Vaults</h2>
              <p className="mt-1 text-sm text-outline">Prepared surfaces for treasury adapters. No deposit or withdraw actions are exposed.</p>
            </div>
            <BarChart3 className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container text-xs uppercase tracking-wider text-outline">
                <tr>
                  <th className="px-4 py-3">Vault</th>
                  <th className="px-4 py-3">Network</th>
                  <th className="px-4 py-3">Exposure</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {vaults.map((vault) => (
                  <tr key={vault.name}>
                    <td className="px-4 py-4 font-semibold text-on-surface">{vault.name}</td>
                    <td className="px-4 py-4 text-outline">{vault.network}</td>
                    <td className="px-4 py-4 text-outline">{vault.exposure}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-surface-container px-2 py-1 text-xs font-semibold text-outline">
                        {vault.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-lg border border-white/10 bg-surface-container-low p-6">
          <h2 className="text-xl font-bold text-on-surface">Risk Notes</h2>
          <div className="mt-5 space-y-4 text-sm text-outline">
            <p>No APY, yield, or treasury value is displayed until sourced from a verified Defi adapter.</p>
            <p>Execution controls remain intentionally absent in this phase.</p>
            <p>Governance approval and wallet chain validation are required before any future write flow.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
