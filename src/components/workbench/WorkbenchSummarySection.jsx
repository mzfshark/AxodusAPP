import { ContentGrid, SectionShell } from '@/components/layout';
import { CardShell } from '@/components/ui';

export default function WorkbenchSummarySection({
  scope,
  title,
  description,
  cards = [],
  maturity = 'prototype',
  executionMode = 'read-only',
  columns = 'auto',
}) {
  if (!cards.length) return null;

  return (
    <SectionShell scope={scope} title={title} description={description}>
      <ContentGrid columns={columns}>
        {cards.map((card) => (
          <CardShell
            key={card.id}
            title={card.title}
            subtitle={card.subtitle}
            scope={scope}
            maturity={card.maturity ?? maturity}
            executionMode={card.executionMode ?? executionMode}
            status={card.status}
          >
            <p className="text-2xl font-black text-on-surface">{card.value}</p>
            {card.detail ? <p className="mt-2 text-sm leading-6 text-outline">{card.detail}</p> : null}
          </CardShell>
        ))}
      </ContentGrid>
    </SectionShell>
  );
}
