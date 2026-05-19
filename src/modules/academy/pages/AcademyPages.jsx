import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Award, BookOpenCheck, Brain, Coins, Gauge, ShieldCheck, Store, UserCheck } from 'lucide-react';
import {
  AcademyBadge,
  AcademyCourseCard,
  AcademyHeader,
  AcademyMetricCard,
  AcademyPanel,
  AcademyProgressBar,
} from '../components/AcademyUi';
import { useAcademyCourse, useAcademyData, useAcademyPath } from '../hooks/useAcademyData';
import { formatNeurons, getAcademyCourseTitle, getAcademyTutor } from '../services/academyService';

const selectClass = 'rounded-lg border border-white/10 bg-surface-container-low px-3 py-2 text-sm text-on-surface';

export function AcademyHome() {
  const academy = useAcademyData();
  const metrics = [
    { icon: Coins, label: 'Locked $NEURONS', value: formatNeurons(academy.student.lockedNeurons), detail: 'Internal balance only: no withdrawal, transfer, or swap.' },
    { icon: Coins, label: 'Unlocked $NEURONS', value: formatNeurons(academy.student.unlockedNeurons), detail: 'Future wallet-compatible rewards after governance and treasury approval.' },
    { icon: Gauge, label: 'Trust score', value: academy.student.trustScore, detail: academy.student.constitutionalStanding },
    { icon: Brain, label: 'PoK readiness', value: `${academy.student.pokReadiness}%`, detail: 'Mock validation score.' },
  ];

  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader
        title="PoK-Based $NEURONS Qualification Nucleus"
        description="Academy is integrated into AxodusAPP as the constitutional education, progression, Proof of Knowledge, and treasury-controlled reward surface."
      />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_.7fr]">
        <AcademyPanel>
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <AcademyBadge value="mock-only" />
              <AcademyBadge value="governance-controlled" />
              <AcademyBadge value="PoK-ready" />
            </div>
            <div>
              <h2 className="max-w-4xl text-4xl font-black tracking-tight text-on-surface">Constitutional learning before live token execution.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-outline">
                The Academy module validates navigation, reward classes, trust signals, constitutional review, ACS review, marketplace eligibility, and Progress Engine flows before contracts are enabled.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/academy/courses" className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary">Explore courses</Link>
              <Link to="/academy/progress" className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface">Open Progress Engine</Link>
            </div>
          </div>
        </AcademyPanel>
        <AcademyPanel title="Reward doctrine" description="The MVP explicitly separates free-course internal utility from paid-course future wallet-compatible distribution.">
          <div className="space-y-4 text-sm leading-6 text-outline">
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <h3 className="font-black text-on-surface">Free Course to Locked $NEURONS</h3>
              <p className="mt-2">Internal balance only for vouchers, NFTs, marketplace purchases, internal services, licenses, benefits, and voting utilities.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <h3 className="font-black text-on-surface">Paid Course to Unlocked $NEURONS</h3>
              <p className="mt-2">Higher reward potential with future direct wallet distribution after progress, PoK, governance, and treasury approval.</p>
            </div>
          </div>
        </AcademyPanel>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => <AcademyMetricCard key={metric.label} {...metric} />)}
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
        <AcademyPanel title="Featured courses">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {academy.courses.slice(0, 2).map((course) => <AcademyCourseCard key={course.id} course={course} />)}
          </div>
        </AcademyPanel>
        <AcademyPanel title="Future contract compatibility" description="Read-model metadata only. No contract writes are enabled.">
          <div className="space-y-3">
            {academy.futureContracts.map((contract) => (
              <article key={contract.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-black text-on-surface">{contract.name}</h3>
                  <AcademyBadge value={contract.status} />
                </div>
                <p className="mt-2 text-sm leading-6 text-outline">{contract.role}</p>
              </article>
            ))}
          </div>
        </AcademyPanel>
      </section>
    </main>
  );
}

export function AcademyCourses() {
  const academy = useAcademyData();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') ?? '';
  const level = searchParams.get('level') ?? '';
  const rewardType = searchParams.get('rewardType') ?? '';
  const accessType = searchParams.get('accessType') ?? '';
  const language = searchParams.get('language') ?? '';
  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const filteredCourses = useMemo(() => academy.courses.filter((course) => {
    if (category && course.category !== category) return false;
    if (level && course.level !== level) return false;
    if (rewardType && course.rewardType !== rewardType) return false;
    if (accessType && course.accessType !== accessType) return false;
    if (language && course.language !== language) return false;
    return true;
  }), [academy.courses, accessType, category, language, level, rewardType]);

  const unique = (items) => [...new Set(items)].sort();

  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title="Course Explorer" description="Discover courses by governance standing, access type, PoK requirement, reward class, language, and level." />
      <AcademyPanel title="Discovery filters" description="All data is mock-driven from the Academy module data layer.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
          <Select label="Category" value={category} onChange={(value) => setFilter('category', value)} options={unique(academy.courses.map((course) => course.category))} />
          <Select label="Level" value={level} onChange={(value) => setFilter('level', value)} options={unique(academy.courses.map((course) => course.level))} />
          <Select label="Reward" value={rewardType} onChange={(value) => setFilter('rewardType', value)} options={unique(academy.courses.map((course) => course.rewardType))} />
          <Select label="Access" value={accessType} onChange={(value) => setFilter('accessType', value)} options={unique(academy.courses.map((course) => course.accessType))} />
          <Select label="Language" value={language} onChange={(value) => setFilter('language', value)} options={unique(academy.courses.map((course) => course.language))} />
        </div>
      </AcademyPanel>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => <AcademyCourseCard key={course.id} course={course} />)}
      </section>
    </main>
  );
}

export function AcademyCourseDetails() {
  const { courseSlug } = useParams();
  const details = useAcademyCourse(courseSlug);

  if (!details) {
    return <AcademyEmpty title="Course not found" message="This course is not present in the Academy mock registry." />;
  }

  const { course, tutor, lessons, rewards } = details;

  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title={course.title} description={course.description} />
      <section className="overflow-hidden rounded-lg border border-white/10 bg-surface-container-low">
        <img className="h-64 w-full object-cover" src={course.banner} alt="" />
        <div className="space-y-5 p-5">
          <div className="flex flex-wrap gap-2">
            <AcademyBadge value={course.constitutionalStanding} />
            <AcademyBadge value={course.governanceStatus} />
            <AcademyBadge value={course.rewardType} />
            <AcademyBadge value={course.proofOfKnowledgeRequired ? 'PoK required' : 'PoK optional'} />
          </div>
          <AcademyProgressBar value={course.progress} label="Course progress" />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AcademyMetricCard icon={UserCheck} label="Tutor" value={tutor?.name || 'Academy tutor'} detail={tutor?.description} />
        <AcademyMetricCard icon={Coins} label="Reward" value={formatNeurons(course.rewardAmount)} detail={`${course.rewardSource} / ${course.transferabilityStatus}`} />
        <AcademyMetricCard icon={Award} label="Certificate" value={course.certificateEnabled ? 'Preview enabled' : 'No certificate'} detail={`PoK: ${course.proofOfKnowledgeRequired ? 'required' : 'not required'}`} />
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_.75fr]">
        <AcademyPanel title="Lessons">
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <article key={lesson.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-black text-on-surface">{lesson.order}. {lesson.title}</h3>
                  <AcademyBadge value={lesson.status} />
                </div>
                <p className="mt-2 text-sm text-outline">{lesson.type} / {lesson.duration} / {lesson.quizRequired ? 'quiz required' : 'no quiz'}</p>
              </article>
            ))}
          </div>
        </AcademyPanel>
        <AcademyPanel title="Reward and prerequisites">
          <dl className="space-y-4 text-sm leading-6 text-outline">
            <Info label="Reward utility" value={course.rewardUtility.join(', ')} />
            <Info label="Supported chains" value={course.supportedChains.join(', ')} />
            <Info label="Prerequisites" value={course.prerequisites.length ? course.prerequisites.map(getAcademyCourseTitle).join(', ') : 'None'} />
            <Info label="Reward records" value={rewards.length ? rewards.map((reward) => reward.unlockConditions.join(', ')).join(' / ') : 'No issued reward yet'} />
          </dl>
        </AcademyPanel>
      </section>
    </main>
  );
}

export function AcademyDashboard() {
  const academy = useAcademyData();
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title="Learning Dashboard" description="Student progress, course completion, certifications, rewards, governance alerts, and tutor metrics." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <AcademyMetricCard icon={BookOpenCheck} label="Completed courses" value={academy.student.completedCourses} detail={`${academy.student.activeCourses} active courses`} />
        <AcademyMetricCard icon={Award} label="Certifications" value={academy.student.certifications} detail="Mock verified credentials" />
        <AcademyMetricCard icon={Coins} label="Locked $NEURONS" value={formatNeurons(academy.student.lockedNeurons)} detail="Internal balance only" />
        <AcademyMetricCard icon={Coins} label="Unlocked $NEURONS" value={formatNeurons(academy.student.unlockedNeurons)} detail="Future wallet-compatible" />
      </section>
      <AcademyPanel title="Active learning telemetry">
        <div className="space-y-3">
          {academy.courses.map((course) => (
            <article key={course.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <Link to={`/academy/courses/${course.slug}`} className="font-black text-on-surface hover:text-primary">{course.title}</Link>
                <AcademyBadge value={course.constitutionalStanding} />
              </div>
              <AcademyProgressBar value={course.progress} label={`${course.rewardType} / ${course.rewardSource}`} />
            </article>
          ))}
        </div>
      </AcademyPanel>
    </main>
  );
}

export function AcademyProgressEngine() {
  const academy = useAcademyData();
  const { student, progressEngine } = academy;
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title="Progress Engine" description="Capability, trust, unlocks, PoK readiness, ACS eligibility, and marketplace eligibility." />
      <AcademyPanel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-on-surface">{student.level}</h2>
            <p className="mt-2 text-sm leading-6 text-outline">Central progression surface before real PoK, reward contracts, or wallet distribution are enabled.</p>
          </div>
          <AcademyBadge value={student.constitutionalStanding} />
        </div>
        <div className="mt-5">
          <AcademyProgressBar value={student.pokReadiness} label="PoK readiness" />
        </div>
      </AcademyPanel>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <AcademyMetricCard icon={Gauge} label="Trust score" value={student.trustScore} detail="Mock anti-abuse signal" />
        <AcademyMetricCard icon={Coins} label="Locked rewards" value={formatNeurons(student.lockedNeurons)} detail="No withdrawal, transfer, or swap" />
        <AcademyMetricCard icon={Coins} label="Unlocked rewards" value={formatNeurons(student.unlockedNeurons)} detail="Future wallet distribution model" />
        <AcademyMetricCard icon={Store} label="Marketplace eligibility" value={student.marketplaceEligibility} detail={student.acsEligibility} />
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_.85fr]">
        <AcademyPanel title="Next unlocks">
          <div className="space-y-3">
            {progressEngine.nextUnlocks.map((unlock) => (
              <article key={unlock.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <h3 className="font-black text-on-surface">{unlock.label}</h3>
                <p className="mt-1 text-sm font-bold text-primary">{unlock.reward}</p>
                <p className="mt-2 text-sm leading-6 text-outline">{unlock.requirement}</p>
              </article>
            ))}
          </div>
        </AcademyPanel>
        <AcademyPanel title="Progression analytics">
          <div className="space-y-5">
            {progressEngine.analytics.map((item) => <AcademyProgressBar key={item.label} value={item.value} label={item.label} />)}
          </div>
        </AcademyPanel>
      </section>
    </main>
  );
}

export function AcademyRewards() {
  const academy = useAcademyData();
  const lockedRewards = academy.rewards.filter((reward) => reward.rewardType === 'Locked $NEURONS');
  const unlockedRewards = academy.rewards.filter((reward) => reward.rewardType === 'Unlocked $NEURONS');
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title="Reward Classes" description="Explicit Locked $NEURONS and Unlocked $NEURONS accounting with treasury/governance control visibility." />
      <RewardClass title="Locked Rewards" description="Free Course to Locked $NEURONS. Internal ecosystem utility only." rewards={lockedRewards} />
      <RewardClass title="Unlocked Rewards" description="Paid Course to Unlocked $NEURONS. Future wallet-compatible distribution after approvals." rewards={unlockedRewards} />
    </main>
  );
}

export function AcademyCertifications() {
  const academy = useAcademyData();
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title="Certification Viewer" description="Mock credentials with PoK proof hash and governance validation visibility. No NFT credential is issued." />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {academy.certificates.map((certificate) => (
          <AcademyPanel key={certificate.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-outline">{certificate.certificationLevel}</span>
                <h2 className="mt-2 text-xl font-black text-on-surface">{getAcademyCourseTitle(certificate.courseId)}</h2>
              </div>
              <AcademyBadge value={certificate.verificationStatus} />
            </div>
            <dl className="mt-5 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <Info label="Issue date" value={certificate.issueDate} />
              <Info label="Expiration" value={certificate.expiration} />
              <Info label="Governance validated" value={certificate.governanceValidated ? 'yes' : 'no'} />
              <Info label="NFT compatible" value={certificate.nftCompatible ? 'future-compatible' : 'no'} />
              <Info label="Proof hash" value={certificate.proofHash} />
            </dl>
          </AcademyPanel>
        ))}
      </section>
    </main>
  );
}

export function AcademyTutorProfile() {
  const { tutorId } = useParams();
  const academy = useAcademyData();
  const tutor = getAcademyTutor(tutorId);
  if (!tutor) return <AcademyEmpty title="Tutor not found" message="This tutor is not present in the Academy mock registry." />;
  const courses = academy.courses.filter((course) => course.tutorId === tutor.id);
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title={tutor.name} description={tutor.description} />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <AcademyMetricCard icon={UserCheck} label="Reputation" value={tutor.reputation} />
        <AcademyMetricCard icon={BookOpenCheck} label="Courses" value={tutor.coursesPublished} />
        <AcademyMetricCard icon={Award} label="Certificates" value={tutor.certificatesIssued} />
        <AcademyMetricCard icon={ShieldCheck} label="Tier" value={tutor.educationalTier} />
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {courses.map((course) => <AcademyCourseCard key={course.id} course={course} />)}
      </section>
    </main>
  );
}

export function AcademyGovernanceReview() {
  const academy = useAcademyData();
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title="Academy Governance Review" description="Constitutional, treasury, reward, certification, and ACS review visibility. This is observability, not direct user governance validation." />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {academy.governanceReviews.map((review) => (
          <AcademyPanel key={review.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-xl font-black text-on-surface">{review.area}</h2>
              <AcademyBadge value={review.status} />
            </div>
            <p className="mt-3 text-sm leading-6 text-outline">{review.notes}</p>
            <dl className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <Info label="Reviewer" value={review.reviewer} />
              <Info label="Risk" value={review.risk} />
            </dl>
          </AcademyPanel>
        ))}
      </section>
      <AcademyPanel title="ACS workflows">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {academy.acsWorkflows.map((workflow) => (
            <article key={workflow.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-black text-on-surface">{workflow.name}</h3>
                <AcademyBadge value={workflow.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-outline">{workflow.escalation}</p>
            </article>
          ))}
        </div>
      </AcademyPanel>
    </main>
  );
}

export function AcademyPathViewer() {
  const { pathId } = useParams();
  const details = useAcademyPath(pathId);
  const academy = useAcademyData();
  if (!details) return <AcademyEmpty title="Learning path not found" message="This learning path is not present in the Academy mock registry." />;
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title={details.path.title} description={details.path.description} />
      <AcademyPanel>
        <div className="flex flex-wrap gap-2">
          <AcademyBadge value={details.path.standing} />
          <AcademyBadge value="Learning Path Viewer" />
        </div>
        <div className="mt-5">
          <AcademyProgressBar value={details.path.progress} label="Path progress" />
        </div>
      </AcademyPanel>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {details.courses.map((course) => <AcademyCourseCard key={course.id} course={course} />)}
      </section>
      <AcademyPanel title="Available paths">
        <div className="flex flex-wrap gap-2">
          {academy.learningPaths.map((path) => <Link key={path.id} to={`/academy/paths/${path.id}`} className="rounded-full border border-white/10 bg-surface-container px-3 py-2 text-sm font-bold text-outline hover:text-on-surface">{path.title}</Link>)}
        </div>
      </AcademyPanel>
    </main>
  );
}

function RewardClass({ title, description, rewards }) {
  const total = rewards.reduce((sum, reward) => sum + reward.amount, 0);
  return (
    <AcademyPanel title={title} description={description} action={<div className="rounded-lg bg-surface-container px-4 py-3 text-right"><p className="text-xs font-bold uppercase tracking-[0.18em] text-outline">Mock balance</p><p className="text-lg font-black text-on-surface">{formatNeurons(total)}</p></div>}>
      <div className="space-y-3">
        {rewards.map((reward) => (
          <article key={reward.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-on-surface">{formatNeurons(reward.amount)}</h3>
                <p className="mt-1 text-sm text-outline">{reward.rewardSource}</p>
              </div>
              <AcademyBadge value={reward.governanceControlled ? 'governance-controlled' : 'local-only'} />
            </div>
            <dl className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
              <Info label="Reward Source" value={reward.rewardSource} />
              <Info label="Reward Utility" value={reward.utility.join(', ')} />
              <Info label="Transferability Status" value={reward.transferabilityStatus} />
            </dl>
          </article>
        ))}
      </div>
    </AcademyPanel>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-bold text-on-surface">{label}</span>
      <select className={selectClass} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-outline">{label}</dt>
      <dd className="mt-1 text-on-surface">{value}</dd>
    </div>
  );
}

function AcademyEmpty({ title, message }) {
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title={title} description={message} />
      <Link to="/academy" className="inline-flex w-fit rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary">Back to Academy</Link>
    </main>
  );
}
