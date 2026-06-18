import { CardShell } from '@/components/ui';

type PortfolioMetricCardProps = {
  title: string;
  value: string | number;
  detail: string;
  status?: string;
};

export default function PortfolioMetricCard({
  title,
  value,
  detail,
  status = 'read-only',
}: PortfolioMetricCardProps) {
  return (
    <CardShell
      title={title}
      subtitle=""
      scope="protocol"
      maturity="D3"
      executionMode="read-only"
      status={status}
    >
      <p className="text-2xl font-black text-on-surface">{value}</p>
      <p className="mt-2 text-sm leading-6 text-outline">{detail}</p>
    </CardShell>
  );
}
