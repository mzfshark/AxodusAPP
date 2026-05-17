import CapabilityPill from './CapabilityPill';
import ChainRoleBadge from './ChainRoleBadge';
import { GovernanceStandingSummary, GovernanceStatusBadge } from './GovernanceStanding';

function shortAddress(address) {
  if (!address) return 'Pending deployment';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function daoTypeLabel(dao) {
  return dao.federationRole === 'federal' ? 'Federal authority' : 'Investment agency sub-DAO';
}

function daoStatusLabel(dao, selectedDao, plugins, proposals) {
  if (dao.isVirtual) return 'Bootstrap authority';
  if (dao.id !== selectedDao?.id) return dao.status ?? 'Indexed';
  if (!plugins.length) return 'Awaiting plugin index';
  if (!proposals.length) return 'Ready, no proposals';
  return 'Active governance';
}

function getDaoChain(dao, chains) {
  return chains.find((chain) => chain.network === dao.network || chain.slug === dao.network);
}

function DaoExplorerRow({ dao, chain, selected, onSelect, selectedDao, plugins, proposals }) {
  const activePlugins = selected ? plugins : [];
  const proposalCount = selected ? proposals.length : null;

  return (
    <article
      className={`rounded-lg border p-4 transition ${
        selected ? 'border-cyan-300/30 bg-cyan-300/10' : 'border-white/5 bg-surface-container-highest hover:border-white/10'
      }`}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-300">
              {daoTypeLabel(dao)}
            </span>
            <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
              {daoStatusLabel(dao, selectedDao, activePlugins, proposals)}
            </span>
            <GovernanceStatusBadge status={dao.governanceStatus ?? chain?.governanceStatus} />
          </div>
          <h3 className="mt-3 truncate text-base font-black text-on-surface">{dao.name}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
            {dao.description ??
              'Sub-DAO operating inside the Axodus federation. Local execution remains autonomous while constitutional standing remains observable.'}
          </p>
          <div className="mt-3 font-mono text-[11px] text-slate-500">
            {dao.network ?? 'network-pending'} · {shortAddress(dao.address)}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect(dao.id)}
          disabled={selected}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-black text-on-surface disabled:cursor-default disabled:border-cyan-300/30 disabled:text-cyan-200"
        >
          <span className="material-symbols-outlined text-[17px]">{selected ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
          {selected ? 'Selected' : 'Inspect'}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-xs text-slate-500">Chain role</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(chain?.roles ?? [dao.chainRole ?? 'pending']).map((role) => (
              <ChainRoleBadge key={role} role={role} />
            ))}
          </div>
        </div>
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-xs text-slate-500">Capabilities</div>
          <div className="mt-2 flex flex-wrap gap-2">
            <CapabilityPill enabled={chain?.capabilities?.governance} label="Governance" />
            <CapabilityPill enabled={chain?.capabilities?.treasury} label="Treasury" />
            <CapabilityPill enabled={chain?.capabilities?.constitutionalConditions} label="Conditions" />
          </div>
        </div>
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-xs text-slate-500">Federation standing</div>
          <div className="mt-2">
            <GovernanceStandingSummary
              chain={{
                ...chain,
                governanceStatus: dao.governanceStatus ?? chain?.governanceStatus,
                federationMember: dao.federationMember ?? chain?.federationMember,
                federationTier: dao.federationTier ?? chain?.federationTier,
                constitutionalStanding: dao.constitutionalStanding ?? chain?.constitutionalStanding,
              }}
              compact
            />
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-md bg-surface-container-high p-3">
        <div className="text-xs text-slate-500">Indexed state</div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
          <span className="rounded-md border border-white/10 px-2 py-1 text-slate-300">
            Plugins: {selected ? activePlugins.length : 'select'}
          </span>
          <span className="rounded-md border border-white/10 px-2 py-1 text-slate-300">
            Proposals: {proposalCount ?? 'select'}
          </span>
          <span className="rounded-md border border-white/10 px-2 py-1 text-slate-300">
            Federation: {dao.federationMember === false ? 'no' : 'yes'}
          </span>
          <span className="rounded-md border border-white/10 px-2 py-1 text-slate-300">
            Tier: {dao.federationTier ?? chain?.federationTier ?? 'pending'}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function SubDaoExplorer({ daos, chains, selectedDao, selectedDaoId, onSelect, plugins, proposals, status, error }) {
  const federalDao = daos.find((dao) => dao.federationRole === 'federal');
  const subDaos = daos.filter((dao) => dao.federationRole !== 'federal');

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-high/60 p-5">
      <div className="flex flex-col gap-3 border-b border-white/5 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Sub-DAO Explorer</h2>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-on-surface-variant">
            Federation view of Axodus operating DAOs. Each local governance context keeps scoped autonomy while its standing remains observable through Constitutional Guardrails.
          </p>
        </div>
        <span className="rounded-md border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">
          {subDaos.length} sub-DAOs indexed
        </span>
      </div>

      {status === 'error' ? (
        <div className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
          DAO index is not reachable yet. Registry data remains available.
          {error?.message ? <span className="ml-2 font-mono text-xs text-amber-200/80">{error.message}</span> : null}
        </div>
      ) : null}

      <div className="mt-5 grid grid-cols-1 gap-4">
        {federalDao ? (
          <DaoExplorerRow
            dao={federalDao}
            chain={getDaoChain(federalDao, chains)}
            selected={selectedDaoId === federalDao.id}
            onSelect={onSelect}
            selectedDao={selectedDao}
            plugins={plugins}
            proposals={proposals}
          />
        ) : null}

        {subDaos.length > 0 ? (
          subDaos.map((dao) => (
            <DaoExplorerRow
              key={dao.id}
              dao={dao}
              chain={getDaoChain(dao, chains)}
              selected={selectedDaoId === dao.id}
              onSelect={onSelect}
              selectedDao={selectedDao}
              plugins={plugins}
              proposals={proposals}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-white/10 bg-surface-container-highest px-5 py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-surface-container-high text-cyan-200">
              <span className="material-symbols-outlined">account_tree</span>
            </div>
            <h3 className="mt-4 text-base font-bold text-on-surface">No indexed sub-DAOs yet</h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
              Sub-DAOs will appear here after the governance backend indexes DAO records. The federal authority remains available as the root context.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
