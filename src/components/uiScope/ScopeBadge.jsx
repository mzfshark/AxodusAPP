import { scopeClasses, scopeLabels } from './scopeMetadata';

export default function ScopeBadge({ scope }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em] ${scopeClasses[scope] ?? scopeClasses.protocol}`}>
      {scopeLabels[scope] ?? scope}
    </span>
  );
}
