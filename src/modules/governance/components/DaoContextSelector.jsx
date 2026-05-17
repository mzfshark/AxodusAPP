function roleLabel(role) {
  return role === 'federal' ? 'Federal DAO' : 'Sub-DAO';
}

export default function DaoContextSelector({ daos, selectedDaoId, onSelect, selectedChain, status }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">DAO Context</h2>
          <p className="mt-1 text-xs text-on-surface-variant">
            Axodus operates as a federal governance system. Sub-DAOs keep local autonomy while remaining bound to central Axodus governance.
          </p>
        </div>
        <label className="flex min-w-[280px] flex-col gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          Active DAO
          <select
            className="rounded-lg border border-white/10 bg-surface-container-high px-3 py-3 text-sm font-bold normal-case tracking-normal text-on-surface outline-none"
            value={selectedDaoId}
            onChange={(event) => onSelect(event.target.value)}
          >
            {daos.map((dao) => (
              <option key={dao.id} value={dao.id}>
                {dao.name} · {roleLabel(dao.federationRole)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-xs text-slate-500">Registry state</div>
          <div className="mt-1 font-bold text-on-surface">{status}</div>
        </div>
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-xs text-slate-500">Selected chain</div>
          <div className="mt-1 font-bold text-on-surface">{selectedChain?.name ?? 'Pending deployment'}</div>
        </div>
        <div className="rounded-md bg-surface-container-high p-3">
          <div className="text-xs text-slate-500">Governance authority</div>
          <div className="mt-1 font-bold text-on-surface">Axodus Federal</div>
        </div>
      </div>
    </section>
  );
}
