import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { academyMock } from '../../src/data/mock';
import {
  AcademyCertifications,
  AcademyCourseDetails,
  AcademyCourses,
  AcademyDashboard,
  AcademyGovernanceEligibility,
  AcademyGovernanceReview,
  AcademyHome,
  AcademyLearningWorkspace,
  AcademyProgressEngine,
  AcademyRewards,
} from '../../src/modules/academy';

function renderWithRoute(initialEntry, route, element) {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path={route} element={element} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Academy module', () => {
  test('keeps free courses mapped to Locked $NEURONS and paid courses mapped to Unlocked $NEURONS', () => {
    const freeCourses = academyMock.courses.filter((course) => course.accessType === 'free');
    const paidCourses = academyMock.courses.filter((course) => course.accessType === 'paid');

    expect(freeCourses.length).toBeGreaterThan(0);
    expect(paidCourses.length).toBeGreaterThan(0);
    expect(academyMock.courses.length).toBeGreaterThanOrEqual(6);
    expect(academyMock.courses.some((course) => course.governanceStatus === 'restricted')).toBe(true);
    expect(freeCourses.every((course) => course.rewardType === 'Locked $NEURONS')).toBe(true);
    expect(paidCourses.every((course) => course.rewardType === 'Unlocked $NEURONS')).toBe(true);
    expect(academyMock.futureContracts.map((contract) => contract.name)).toEqual(
      expect.arrayContaining(['PoKMinter', 'LockedNeuronsVault', 'RewardPolicy', 'TreasuryEmissionBudget']),
    );
  });

  test('filters courses from URL query params including multiple sidebar values', () => {
    renderWithRoute(
      '/academy/courses?category=Governance&category=Treasury&rewardType=Unlocked%20%24NEURONS',
      '/academy/courses',
      <AcademyCourses />,
    );

    expect(screen.getByText(/1 courses match/i)).toBeInTheDocument();
    expect(screen.getByText(/Treasury Risk and Sustainable Emissions/i)).toBeInTheDocument();
    expect(screen.queryByText(/Axodus Constitutional Onboarding/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Marketplace Activation and Tutor Monetization/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Certification-enabled results/i)).toBeInTheDocument();
    expect(screen.getByText(/Future wallet-compatible model/i)).toBeInTheDocument();
  });

  test('renders MVP flow coverage from free course through ACS readiness', () => {
    renderWithRoute('/academy', '/academy', <AcademyHome />);

    expect(screen.getByRole('heading', { name: /MVP flow coverage/i })).toBeInTheDocument();
    expect(screen.getByText(/Free course to Locked \$NEURONS/i)).toBeInTheDocument();
    expect(screen.getByText(/Paid course to Unlocked \$NEURONS/i)).toBeInTheDocument();
    expect(screen.getByText(/Lesson progress to quiz to reward visibility/i)).toBeInTheDocument();
    expect(screen.getByText(/ACS readiness preview/i)).toBeInTheDocument();
    expect(screen.getAllByText(/prototype-covered/i).length).toBeGreaterThanOrEqual(7);
  });

  test('renders course detail operational profile and treasury-backed checkpoints', () => {
    renderWithRoute(
      '/academy/courses/treasury-risk-sustainable-emissions',
      '/academy/courses/:courseSlug',
      <AcademyCourseDetails />,
    );

    expect(screen.getByRole('heading', { name: /Treasury Risk and Sustainable Emissions/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Operational course profile/i })).toBeInTheDocument();
    expect(screen.getByText(/Professional treasury emissions operator/i)).toBeInTheDocument();
    expect(screen.getAllByText(/TreasuryEmissionBudget professional education envelope/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /PoK and review checkpoints/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Milestone impact/i })).toBeInTheDocument();
  });

  test('renders locked and unlocked reward classes with transferability status', () => {
    renderWithRoute('/academy/rewards', '/academy/rewards', <AcademyRewards />);

    expect(screen.getByRole('heading', { name: /Reward Classes/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Reward & Treasury Panel/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Locked Rewards$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Unlocked Rewards$/i })).toBeInTheDocument();
    expect(screen.getByText(/Academy Rewards Vault mock/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Pending milestones/i })).toBeInTheDocument();
    expect(screen.getByText(/No withdrawal, no transfer, no swap/i)).toBeInTheDocument();
    expect(screen.getByText(/Future direct wallet distribution after approval/i)).toBeInTheDocument();
    expect(screen.getByText(/Future wallet distribution blocked by governance status/i)).toBeInTheDocument();
  });

  test('renders reusable mock loading and error states on the dashboard', () => {
    renderWithRoute('/academy/dashboard', '/academy/dashboard', <AcademyDashboard />);

    expect(screen.getByRole('heading', { name: /Mock loading state/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Mock error state/i })).toBeInTheDocument();
    expect(screen.getByText(/No network or contract request is executed/i)).toBeInTheDocument();
    expect(screen.getByText(/failed validation/i)).toBeInTheDocument();
  });

  test('renders the learning workspace with PoK, certification, and reward context', () => {
    renderWithRoute(
      '/academy/workspace/constitutional-onboarding',
      '/academy/workspace/:courseSlug',
      <AcademyLearningWorkspace />,
    );

    expect(screen.getByRole('heading', { name: /Learning Workspace/i })).toBeInTheDocument();
    expect(screen.getByText(/PoK required/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Certification state/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Reward milestone/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /PoK validation rail/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Milestone unlocks/i })).toBeInTheDocument();
    expect(screen.getAllByText(/mock-pok-0x7c9f/i).length).toBeGreaterThan(1);
    expect(screen.getByText(/TreasuryEmissionBudget onboarding envelope/i)).toBeInTheDocument();
  });

  test('renders governance eligibility as read-only Academy observability', () => {
    renderWithRoute('/academy/eligibility', '/academy/eligibility', <AcademyGovernanceEligibility />);

    expect(screen.getByRole('heading', { name: /Governance Eligibility/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /DAO-aware learning identity/i })).toBeInTheDocument();
    expect(screen.getByText(/Axodus Root DAO \/ Academy Contributor Track/i)).toBeInTheDocument();
    expect(screen.getByText(/Proposal permissions/i)).toBeInTheDocument();
    expect(screen.getByText(/Validator eligibility/i)).toBeInTheDocument();
    expect(screen.getByText(/Academy does not directly execute governance permission changes/i)).toBeInTheDocument();
  });

  test('renders Learn-to-Win as competency hierarchy without wallet execution', () => {
    renderWithRoute('/academy/progress', '/academy/progress', <AcademyProgressEngine />);

    expect(screen.getByRole('heading', { name: /Learn-to-Win competency hierarchy/i })).toBeInTheDocument();
    expect(screen.getByText(/Milestone-based competency progression/i)).toBeInTheDocument();
    expect(screen.getByText(/Treasury Emissions Operator/i)).toBeInTheDocument();
    expect(screen.getByText(/Competency signals/i)).toBeInTheDocument();
  });

  test('renders Academy Governance Review queue and future contract references', () => {
    renderWithRoute('/academy/governance-review', '/academy/governance-review', <AcademyGovernanceReview />);

    expect(screen.getByRole('heading', { name: /Academy Governance Review/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Review queue/i })).toBeInTheDocument();
    expect(screen.getAllByText(/emission envelope confirmation/i).length).toBeGreaterThan(1);
    expect(screen.getAllByText(/TreasuryEmissionBudget/i).length).toBeGreaterThan(1);
    expect(screen.getAllByText(/PoKMinter/i).length).toBeGreaterThan(1);
  });

  test('renders certification permissions and public proof references', () => {
    renderWithRoute('/academy/certifications', '/academy/certifications', <AcademyCertifications />);

    expect(screen.getByRole('heading', { name: /Certification Viewer/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Operational permissions/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Axodus Governance Faculty/i)).toBeInTheDocument();
    expect(screen.getAllByText(/introductory governance participation/i).length).toBeGreaterThan(1);
    expect(screen.getByText(/root-dao-recognized/i)).toBeInTheDocument();
    expect(screen.getAllByText(/pending-validation/i).length).toBeGreaterThan(1);
    expect(screen.getByText(/ACS Integrity Desk/i)).toBeInTheDocument();
    expect(screen.getByText(/governance literacy recognized/i)).toBeInTheDocument();
    expect(screen.getByText(/\/academy\/certifications\/cert-constitutional-literacy/i)).toBeInTheDocument();
  });
});
