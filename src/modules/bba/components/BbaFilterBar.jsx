export default function BbaFilterBar({ filters, onChange, options = [], searchPlaceholder = 'Search' }) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg border border-white/10 bg-surface-container-low p-4 md:grid-cols-2 xl:grid-cols-5">
      <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-outline">
        Search
        <input
          className="rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm normal-case tracking-normal text-on-surface outline-none focus:border-primary"
          placeholder={searchPlaceholder}
          value={filters.query ?? ''}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
        />
      </label>
      {options.map((option) => (
        <label key={option.key} className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-outline">
          {option.label}
          <select
            className="rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm normal-case tracking-normal text-on-surface outline-none focus:border-primary"
            value={filters[option.key] ?? ''}
            onChange={(event) => onChange({ ...filters, [option.key]: event.target.value })}
          >
            <option value="">All</option>
            {option.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
