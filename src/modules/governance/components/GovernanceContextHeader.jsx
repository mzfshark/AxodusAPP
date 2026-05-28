import { CardShell } from '@/components/ui';

export default function GovernanceContextHeader({ context }) {
  const walletLabel = context.walletAddress
    ? `${context.walletAddress.slice(0, 6)}...${context.walletAddress.slice(-4)}`
    : 'Wallet disconnected';

  return (
    <CardShell
      title="Governance Console Context"
      subtitle="Current authority, tenant and execution boundary for this governance session."
      scope="tenant"
      maturity="prototype"
      executionMode={context.executionMode}
      status={context.acsState}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Info label="Context" value={context.selectedTenantName} detail={context.tenantType} />
        <Info label="Governance mode" value={context.governanceMode} detail={context.isRootContext ? 'Protocol authority' : 'Tenant-local authority'} />
        <Info label="Constitutional standing" value={context.constitutionalStanding} detail={`Federation: ${context.federationTier}`} />
        <Info label="Local governance" value={context.localGovernanceStatus} detail={context.primaryChain} />
        <Info label="ACS state" value={context.acsState} detail="Review/control only" />
        <Info label="Execution" value={context.executionMode} detail="No on-chain execution from this console" />
        <Info label="Wallet" value={context.walletState} detail={walletLabel} />
        <Info label="App tenant" value={context.appTenantName ?? 'Not selected'} detail="Global tenant runtime" />
      </div>
      <div className="mt-4 rounded-lg border border-amber-300/20 bg-amber-950/20 p-3 text-sm leading-6 text-amber-50/85">
        Governance actions are rendered as read-only, preview or simulation state. This console does not execute proposals,
        transfers, treasury actions or contract calls.
      </div>
    </CardShell>
  );
}

function Info({ label, value, detail }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
      <p className="text-[10px] font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-on-surface">{value}</p>
      {detail ? <p className="mt-1 text-xs text-on-surface-variant">{detail}</p> : null}
    </div>
  );
}
