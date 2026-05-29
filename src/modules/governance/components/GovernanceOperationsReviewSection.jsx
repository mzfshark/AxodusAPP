import { ContentGrid, SectionShell } from '@/components/layout';
import GovernanceAcsReviewPanel from './GovernanceAcsReviewPanel';
import GovernanceReadinessPanel from './GovernanceReadinessPanel';

export default function GovernanceOperationsReviewSection({ readiness, acsReview }) {
  return (
    <SectionShell
      scope="operator"
      title="Governance Operations / ACS Review"
      description="Operational review state, blockers and ACS checks before any future execution surface can be considered."
    >
      <ContentGrid columns="two">
        <GovernanceReadinessPanel readiness={readiness} />
        <GovernanceAcsReviewPanel review={acsReview} />
      </ContentGrid>
    </SectionShell>
  );
}
