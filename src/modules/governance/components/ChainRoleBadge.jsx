const roleStyles = {
  execution: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-200',
  voting: 'border-indigo-300/30 bg-indigo-300/10 text-indigo-200',
  spoke: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
};

export default function ChainRoleBadge({ role }) {
  return (
    <span className={`rounded-md border px-2 py-1 text-[11px] font-bold uppercase ${roleStyles[role] ?? roleStyles.spoke}`}>
      {role}
    </span>
  );
}
