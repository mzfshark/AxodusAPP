import { CardShell } from '@/components/ui';

export default function GovernanceUserParticipationPanel({ participation }) {
  const walletLabel = participation.walletAddress
    ? `${participation.walletAddress.slice(0, 6)}...${participation.walletAddress.slice(-4)}`
    : 'Connect wallet to inspect participation';

  return (
    <CardShell
      title="User Participation"
      subtitle="Wallet and user participation are separate from tenant governance identity."
      scope="user"
      maturity="prototype"
      executionMode="read-only"
      status={participation.walletConnected ? 'wallet-connected' : 'wallet-disconnected'}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Info label="Wallet" value={participation.walletConnected ? 'connected' : 'disconnected'} detail={walletLabel} />
        <Info label="Tenant role" value={participation.role} />
        <Info label="Voting eligibility" value={participation.votingEligibility} />
        <Info label="Delegation" value={participation.delegationState} />
        <Info label="Attention items" value={participation.attentionItems} detail="review/voting states" />
      </div>
    </CardShell>
  );
}

function Info({ label, value, detail }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
      <p className="text-[10px] font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-on-surface">{value}</p>
      {detail ? <p className="mt-1 text-xs text-outline">{detail}</p> : null}
    </div>
  );
}
