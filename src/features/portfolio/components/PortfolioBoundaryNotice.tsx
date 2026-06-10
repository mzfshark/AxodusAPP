import { CardShell } from '@/components/ui';

export default function PortfolioBoundaryNotice() {
  return (
    <CardShell
      title="Portfolio Boundary Notice"
      subtitle="Current dashboard authority"
      scope="protocol"
      maturity="L4 Readiness"
      executionMode="read-only"
      status="execution disabled"
    >
      <div className="space-y-2 text-sm leading-6 text-outline">
        <p>This dashboard is read-only.</p>
        <p>No execution authority is granted.</p>
        <p>No production readiness is claimed.</p>
        <p>No treasury, wallet, trading, settlement, payout, DEX execution or on-chain actions are enabled.</p>
      </div>
    </CardShell>
  );
}
