import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Award, BookOpenCheck, Brain, CheckCircle2, Coins, Gauge, Landmark, ShieldCheck, Store, UserCheck } from 'lucide-react';
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
              <Link to="/academy/workspace/constitutional-onboarding" className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface">Open workspace</Link>
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
  const category = searchParams.getAll('category');
  const level = searchParams.getAll('level');
  const rewardType = searchParams.getAll('rewardType');
  const accessType = searchParams.getAll('accessType');
  const language = searchParams.getAll('language');
  const governanceStatus = searchParams.getAll('governanceStatus');
  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    next.delete(key);
    if (value) next.set(key, value);
    setSearchParams(next);
  };

  const filteredCourses = useMemo(() => academy.courses.filter((course) => {
    if (category.length && !category.includes(course.category)) return false;
    if (level.length && !level.includes(course.level)) return false;
    if (rewardType.length && !rewardType.includes(course.rewardType)) return false;
    if (accessType.length && !accessType.includes(course.accessType)) return false;
    if (language.length && !language.includes(course.language)) return false;
    if (governanceStatus.length && !governanceStatus.includes(course.governanceStatus)) return false;
    return true;
  }), [academy.courses, accessType, category, governanceStatus, language, level, rewardType]);

  const totals = filteredCourses.reduce((acc, course) => {
    if (course.rewardType === 'Locked $NEURONS') acc.locked += course.rewardAmount;
    if (course.rewardType === 'Unlocked $NEURONS') acc.unlocked += course.rewardAmount;
    if (course.certificateEnabled) acc.certificates += 1;
    return acc;
  }, { locked: 0, unlocked: 0, certificates: 0 });

  const unique = (items) => [...new Set(items)].sort();

  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title="Course Explorer" description="Discover courses by governance standing, access type, PoK requirement, reward class, language, and level." />
      <AcademyPanel
        title="Discovery filters"
        description={`${filteredCourses.length} courses match the current URL-addressable filters. Sidebar filter groups can combine multiple values.`}
        action={<Link to="/academy/courses" className="rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm font-bold text-outline hover:text-on-surface">Clear filters</Link>}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <Select label="Category" value={category[0] || ''} onChange={(value) => setFilter('category', value)} options={unique(academy.courses.map((course) => course.category))} />
          <Select label="Level" value={level[0] || ''} onChange={(value) => setFilter('level', value)} options={unique(academy.courses.map((course) => course.level))} />
          <Select label="Reward" value={rewardType[0] || ''} onChange={(value) => setFilter('rewardType', value)} options={unique(academy.courses.map((course) => course.rewardType))} />
          <Select label="Access" value={accessType[0] || ''} onChange={(value) => setFilter('accessType', value)} options={unique(academy.courses.map((course) => course.accessType))} />
          <Select label="Language" value={language[0] || ''} onChange={(value) => setFilter('language', value)} options={unique(academy.courses.map((course) => course.language))} />
          <Select label="Governance" value={governanceStatus[0] || ''} onChange={(value) => setFilter('governanceStatus', value)} options={unique(academy.courses.map((course) => course.governanceStatus))} />
        </div>
      </AcademyPanel>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <AcademyMetricCard icon={BookOpenCheck} label="Matched courses" value={filteredCourses.length} detail="URL-addressable discovery state" />
        <AcademyMetricCard icon={Award} label="Certificates" value={totals.certificates} detail="Certification-enabled results" />
        <AcademyMetricCard icon={Coins} label="Locked potential" value={formatNeurons(totals.locked)} detail="Internal utility only" />
        <AcademyMetricCard icon={Coins} label="Unlocked potential" value={formatNeurons(totals.unlocked)} detail="Future wallet-compatible model" />
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => <AcademyCourseCard key={course.id} course={course} />)}
      </section>
      {!filteredCourses.length && <AcademyEmptyState message="No Academy courses match the active filters. Clear filters or use the contextual sidebar to broaden discovery." />}
    </main>
  );
}

export function AcademyCourseDetails() {
  const { courseSlug } = useParams();
  const details = useAcademyCourse(courseSlug);
  const academy = useAcademyData();

  if (!details) {
    return <AcademyEmpty title="Course not found" message="This course is not present in the Academy mock registry." />;
  }

  const { course, tutor, lessons, rewards } = details;
  const executionEvents = academy.learningExecution.filter((item) => item.courseId === course.id);
  const milestones = academy.milestoneUnlocks.filter((item) => item.courseId === course.id);

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
      <AcademyPanel title="Operational course profile" description="Course details prioritize governance impact, certification outcome, DAO recognition, and treasury-backed reward context.">
        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <Info label="Operational value" value={course.operationalValue} />
          <Info label="Certification outcome" value={course.certificationOutcome} />
          <Info label="DAO recognition" value={course.daoRecognition} />
          <Info label="Estimated completion" value={course.estimatedDuration} />
          <Info label="Governance unlocks" value={course.governanceUnlocks.join(', ')} />
          <Info label="Treasury sponsor" value={course.treasurySponsor} />
        </dl>
      </AcademyPanel>
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
            <Info label="Treasury source" value={rewards[0]?.treasurySource || course.treasurySponsor} />
            <Info label="Vesting schedule" value={rewards[0]?.vestingSchedule || 'mock schedule pending'} />
          </dl>
          <Link to={`/academy/workspace/${course.slug}`} className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary">Open learning workspace</Link>
        </AcademyPanel>
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AcademyPanel title="PoK and review checkpoints">
          <div className="space-y-3">
            {executionEvents.map((event) => (
              <article key={event.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-black text-on-surface">{event.checkpoint}</h3>
                  <AcademyBadge value={event.status} />
                </div>
                <dl className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <Info label="Evidence" value={event.evidence} />
                  <Info label="Reviewer" value={event.reviewer} />
                  <Info label="Proof reference" value={event.proofReference} mono />
                </dl>
              </article>
            ))}
          </div>
        </AcademyPanel>
        <AcademyPanel title="Milestone impact">
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <article key={milestone.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-black text-on-surface">{milestone.label}</h3>
                  <AcademyBadge value={milestone.status} />
                </div>
                <p className="mt-2 text-sm font-bold text-primary">{milestone.rewardClass}</p>
                <p className="mt-2 text-sm leading-6 text-outline">{milestone.dependency}</p>
              </article>
            ))}
          </div>
        </AcademyPanel>
      </section>
    </main>
  );
}

export function AcademyLearningWorkspace() {
  const { courseSlug } = useParams();
  const details = useAcademyCourse(courseSlug);
  const academy = useAcademyData();

  if (!details) {
    return <AcademyEmpty title="Learning workspace not found" message="This course workspace is not present in the Academy mock registry." />;
  }

  const { course, tutor, lessons, rewards } = details;
  const currentLesson = lessons.find((lesson) => lesson.status === 'available') || lessons[0];
  const certificate = academy.certificates.find((item) => item.courseId === course.id);
  const pendingReward = rewards[0] || academy.rewards.find((reward) => reward.courseId === course.id);
  const executionEvents = academy.learningExecution.filter((item) => item.courseId === course.id);
  const milestoneUnlocks = academy.milestoneUnlocks.filter((item) => item.courseId === course.id);

  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader
        title="Learning Workspace"
        description="Structured lesson execution with Proof-of-Knowledge checkpoints, certification state, reward milestones, and governance accountability."
      />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <AcademyPanel>
          <div className="flex flex-wrap gap-2">
            <AcademyBadge value={course.constitutionalStanding} />
            <AcademyBadge value={course.proofOfKnowledgeRequired ? 'PoK required' : 'PoK optional'} />
            <AcademyBadge value={course.rewardType} />
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-surface-container p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-outline">Current lesson</p>
            <h2 className="mt-2 text-2xl font-black text-on-surface">{currentLesson?.title}</h2>
            <p className="mt-3 text-sm leading-6 text-outline">
              {currentLesson?.type} / {currentLesson?.duration} / {currentLesson?.quizRequired ? 'PoK quiz checkpoint required' : 'No quiz checkpoint'}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
              <AcademyMetricCard icon={BookOpenCheck} label="Lesson media" value={currentLesson?.media || 'lesson'} detail={(currentLesson?.resources || []).join(', ') || 'No resources'} />
              <AcademyMetricCard icon={CheckCircle2} label="Completion required" value={currentLesson?.completionRequired ? 'Required' : 'Optional'} detail={currentLesson?.status} />
              <AcademyMetricCard icon={Brain} label="PoK state" value={course.proofOfKnowledgeRequired ? 'Pending review' : 'Optional'} detail="Mock validation only" />
            </div>
          </div>
          <div className="mt-5">
            <AcademyProgressBar value={course.progress} label={`${course.title} progress`} />
          </div>
        </AcademyPanel>

        <aside className="space-y-4">
          <AcademyPanel title="Operational context">
            <dl className="space-y-4 text-sm leading-6 text-outline">
              <Info label="Tutor" value={tutor?.name || 'Academy tutor'} />
              <Info label="Access model" value={`${course.type} / ${course.price}`} />
              <Info label="Governance standing" value={course.governanceStatus} />
              <Info label="Supported chains" value={course.supportedChains.join(', ')} />
            </dl>
          </AcademyPanel>
          <AcademyPanel title="Certification state">
            <dl className="space-y-4 text-sm leading-6 text-outline">
              <Info label="Status" value={certificate?.verificationStatus || 'pending-validation'} />
              <Info label="Proof reference" value={certificate?.proofHash || 'mock-pok-pending'} mono />
              <Info label="NFT compatible" value={certificate?.nftCompatible ? 'future-compatible' : 'pending'} />
            </dl>
          </AcademyPanel>
          <AcademyPanel title="Reward milestone">
            <dl className="space-y-4 text-sm leading-6 text-outline">
              <Info label="Reward class" value={course.rewardType} />
              <Info label="Amount" value={formatNeurons(course.rewardAmount)} />
              <Info label="Unlock conditions" value={(pendingReward?.unlockConditions || []).join(', ') || 'No reward record'} />
              <Info label="Treasury source" value={pendingReward?.treasurySource || 'TreasuryEmissionBudget pending'} />
            </dl>
          </AcademyPanel>
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_.85fr]">
        <AcademyPanel title="PoK validation rail" description="Every learning execution state remains observable before any credential, reward, or governance permission becomes live.">
          <div className="space-y-3">
            {executionEvents.map((event) => (
              <article key={event.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-on-surface">{event.checkpoint}</h3>
                    <p className="mt-2 text-sm leading-6 text-outline">{event.evidence}</p>
                  </div>
                  <AcademyBadge value={event.status} />
                </div>
                <dl className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <Info label="Reviewer" value={event.reviewer} />
                  <Info label="Proof reference" value={event.proofReference} mono />
                </dl>
              </article>
            ))}
          </div>
        </AcademyPanel>
        <AcademyPanel title="Milestone unlocks" description="Reward and eligibility milestones are represented as mock read models only.">
          <div className="space-y-3">
            {milestoneUnlocks.map((milestone) => (
              <article key={milestone.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-black text-on-surface">{milestone.label}</h3>
                  <AcademyBadge value={milestone.status} />
                </div>
                <p className="mt-2 text-sm font-bold text-primary">{milestone.rewardClass}</p>
                <p className="mt-2 text-sm leading-6 text-outline">{milestone.dependency}</p>
              </article>
            ))}
          </div>
        </AcademyPanel>
      </section>

      <AcademyPanel title="Lesson sequence" description="The workspace keeps learning structured, auditable, and free of distraction-heavy course mechanics.">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {lessons.map((lesson) => (
            <article key={lesson.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-black text-on-surface">{lesson.order}. {lesson.title}</h3>
                <AcademyBadge value={lesson.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-outline">{lesson.type} / {lesson.duration} / {lesson.quizRequired ? 'quiz required' : 'no quiz'}</p>
            </article>
          ))}
        </div>
      </AcademyPanel>
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
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_.85fr]">
        <AcademyPanel title="Governance alerts" description="Operational review items that affect Academy qualification, rewards, or credentials.">
          <div className="space-y-3">
            {academy.governanceReviewQueue.map((item) => (
              <article key={item.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-on-surface">{item.item}</h3>
                    <p className="mt-2 text-sm leading-6 text-outline">{item.type} / {item.blocker}</p>
                  </div>
                  <AcademyBadge value={item.status} />
                </div>
              </article>
            ))}
          </div>
        </AcademyPanel>
        <AcademyPanel title="Tutor accountability">
          <div className="space-y-3">
            {academy.tutors.map((tutor) => (
              <article key={tutor.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <Link to={`/academy/tutors/${tutor.id}`} className="font-black text-on-surface hover:text-primary">{tutor.name}</Link>
                  <AcademyBadge value={tutor.governanceStanding} />
                </div>
                <p className="mt-2 text-sm leading-6 text-outline">{tutor.type} / reputation {tutor.reputation} / {tutor.educationalTier}</p>
              </article>
            ))}
          </div>
        </AcademyPanel>
      </section>
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
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_.85fr]">
        <AcademyPanel title="Learn-to-Win competency hierarchy" description={academy.learnToWin.doctrine}>
          <div className="space-y-3">
            {academy.learnToWin.achievementHierarchy.map((achievement) => (
              <article key={achievement.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-on-surface">{achievement.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-outline">{achievement.competency}</p>
                  </div>
                  <AcademyBadge value={achievement.status} />
                </div>
                <dl className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <Info label="Reward class" value={achievement.rewardClass} />
                  <Info label="Governance readiness" value={achievement.governanceReadiness} />
                </dl>
              </article>
            ))}
          </div>
        </AcademyPanel>
        <AcademyPanel title="Competency signals">
          <div className="space-y-5">
            {academy.learnToWin.competencySignals.map((signal) => <AcademyProgressBar key={signal.label} value={signal.value} label={signal.label} />)}
          </div>
        </AcademyPanel>
      </section>
    </main>
  );
}

export function AcademyGovernanceEligibility() {
  const academy = useAcademyData();
  const { student } = academy;
  const eligibilityRows = [
    { label: 'Governance level', value: student.level, detail: 'Progression-derived constitutional literacy tier.' },
    { label: 'DAO eligibility', value: student.constitutionalStanding, detail: 'Mock DAO access standing from Academy progression.' },
    { label: 'Proposal permissions', value: student.trustScore >= 75 ? 'eligible-for-review' : 'not-ready', detail: 'Requires sustained trust score and PoK evidence.' },
    { label: 'Validator eligibility', value: student.pokReadiness >= 80 ? 'ready' : 'under-formation', detail: 'Advanced PoK threshold is not yet complete.' },
    { label: 'Committee eligibility', value: student.acsEligibility, detail: 'ACS may escalate candidates for governance review.' },
    { label: 'Marketplace eligibility', value: student.marketplaceEligibility, detail: 'Locked $NEURONS utility can unlock marketplace vouchers and licenses.' },
  ];

  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader
        title="Governance Eligibility"
        description="Education-driven governance access, contributor standing, operational reputation, proposal readiness, validator readiness, and committee eligibility."
      />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <AcademyMetricCard icon={Landmark} label="Governance level" value={student.level} detail={`Level index ${student.levelIndex}`} />
        <AcademyMetricCard icon={Gauge} label="Trust score" value={student.trustScore} detail="Mock operational reputation" />
        <AcademyMetricCard icon={Brain} label="PoK readiness" value={`${student.pokReadiness}%`} detail="Capability validation signal" />
        <AcademyMetricCard icon={ShieldCheck} label="Standing" value={student.constitutionalStanding} detail="Constitutional access state" />
      </section>
      <AcademyPanel title="DAO-aware learning identity" description="Academy qualification is federation-aware and remains read-only in this MVP.">
        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <Info label="DAO affiliation" value={student.daoAffiliation} />
          <Info label="Organization hierarchy" value={student.organizationHierarchy} />
          <Info label="Federation status" value={student.federationStatus} />
        </dl>
      </AcademyPanel>
      <AcademyPanel title="Eligibility matrix" description="These are read-only mock states. Academy does not directly execute governance permission changes in this phase.">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-[0.16em] text-outline">
                <th className="px-3 py-3">Capability</th>
                <th className="px-3 py-3">State</th>
                <th className="px-3 py-3">Operational meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {eligibilityRows.map((row) => (
                <tr key={row.label}>
                  <td className="px-3 py-4 font-bold text-on-surface">{row.label}</td>
                  <td className="px-3 py-4"><AcademyBadge value={row.value} /></td>
                  <td className="px-3 py-4 text-outline">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AcademyPanel>
      <AcademyPanel title="Governance review dependencies">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {academy.governanceReviews.map((review) => (
            <article key={review.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-black text-on-surface">{review.area}</h3>
                <AcademyBadge value={review.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-outline">{review.notes}</p>
            </article>
          ))}
        </div>
      </AcademyPanel>
    </main>
  );
}

export function AcademyRewards() {
  const academy = useAcademyData();
  const lockedRewards = academy.rewards.filter((reward) => reward.rewardType === 'Locked $NEURONS');
  const unlockedRewards = academy.rewards.filter((reward) => reward.rewardType === 'Unlocked $NEURONS');
  const pendingMilestones = academy.milestoneUnlocks.filter((milestone) => !['verified', 'claimable-mock'].includes(milestone.status));
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title="Reward Classes" description="Explicit Locked $NEURONS and Unlocked $NEURONS accounting with treasury/governance control visibility." />
      <AcademyPanel title="Reward & Treasury Panel" description="Rewards are presented as educational grants, contributor incentives, and governance-backed issuance, not speculative payouts.">
        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <Info label="Reward pool" value={academy.rewardTreasury.rewardPool} />
          <Info label="Emission budget" value={academy.rewardTreasury.emissionBudget} />
          <Info label="DAO sponsorship" value={academy.rewardTreasury.daoSponsorship} />
          <Info label="Educational grants" value={academy.rewardTreasury.educationalGrants} />
          <Info label="Contributor allocation" value={academy.rewardTreasury.contributorAllocation} />
          <Info label="Treasury-backed incentives" value={academy.rewardTreasury.treasuryBackedIncentives} />
        </dl>
      </AcademyPanel>
      <RewardClass title="Locked Rewards" description="Free Course to Locked $NEURONS. Internal ecosystem utility only." rewards={lockedRewards} />
      <RewardClass title="Unlocked Rewards" description="Paid Course to Unlocked $NEURONS. Future wallet-compatible distribution after approvals." rewards={unlockedRewards} />
      <AcademyPanel title="Pending milestones" description="Pending reward milestones remain blocked until progress, PoK, ACS, treasury, or governance conditions are satisfied.">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {pendingMilestones.map((milestone) => (
            <article key={milestone.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-black text-on-surface">{milestone.label}</h3>
                <AcademyBadge value={milestone.status} />
              </div>
              <p className="mt-2 text-sm font-bold text-primary">{milestone.rewardClass}</p>
              <p className="mt-2 text-sm leading-6 text-outline">{milestone.dependency}</p>
            </article>
          ))}
        </div>
      </AcademyPanel>
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
              <Info label="Credential status" value={certificate.credentialStatus} />
              <Info label="Issuer" value={certificate.issuer} />
              <Info label="Governance validated" value={certificate.governanceValidated ? 'yes' : 'no'} />
              <Info label="DAO recognized" value={certificate.daoRecognized ? 'yes' : 'pending'} />
              <Info label="DAO verification" value={certificate.daoVerificationStatus} />
              <Info label="Governance eligibility" value={certificate.governanceEligibility} />
              <Info label="NFT compatible" value={certificate.nftCompatible ? 'future-compatible' : 'no'} />
              <Info label="Public verification" value={certificate.publicVerificationPath} mono />
              <Info label="Proof hash" value={certificate.proofHash} mono />
            </dl>
            <div className="mt-5 rounded-lg border border-white/10 bg-surface-container p-4">
              <h3 className="text-sm font-black text-on-surface">Operational permissions</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {certificate.operationalPermissions.map((permission) => <AcademyBadge key={permission} value={permission} />)}
              </div>
              <p className="mt-4 text-sm leading-6 text-outline">{certificate.eligibilityImpact}</p>
            </div>
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
      <AcademyPanel title="Instructor governance profile" description="Tutor authority, monetization, and moderation stay visible before any production revenue or credential issuance is enabled.">
        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <Info label="Verification" value={tutor.verificationStatus} />
          <Info label="Governance standing" value={tutor.governanceStanding} />
          <Info label="Constitutional bound" value={tutor.constitutionalBound ? 'yes' : 'no'} />
          <Info label="Reward eligible" value={tutor.rewardEligible ? 'yes' : 'no'} />
          <Info label="Royalty model" value="mock marketplace revenue share" />
          <Info label="Moderation status" value={tutor.governanceStanding === 'verified' ? 'clear' : 'requires review'} />
        </dl>
      </AcademyPanel>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {courses.map((course) => <AcademyCourseCard key={course.id} course={course} />)}
      </section>
    </main>
  );
}

export function AcademyGovernanceReview() {
  const academy = useAcademyData();
  const approvedCount = academy.governanceReviews.filter((review) => review.status === 'approved').length;
  const underReviewCount = academy.governanceReviews.filter((review) => review.status === 'under-review').length;
  return (
    <main className="app-view-shell space-y-8">
      <AcademyHeader title="Academy Governance Review" description="Constitutional, treasury, reward, certification, and ACS review visibility. This is observability, not direct user governance validation." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <AcademyMetricCard icon={ShieldCheck} label="Approved reviews" value={approvedCount} detail="Mock constitutional approvals" />
        <AcademyMetricCard icon={Gauge} label="Under review" value={underReviewCount} detail="Treasury or ACS dependencies" />
        <AcademyMetricCard icon={Brain} label="ACS workflows" value={academy.acsWorkflows.length} detail="Moderation and PoK queues" />
        <AcademyMetricCard icon={Coins} label="Future contracts" value={academy.futureContracts.length} detail="Read-model compatibility" />
      </section>
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
              <Info label="Scope" value={review.scope} />
              <Info label="Dependency" value={review.dependency} />
              <Info label="Contract reference" value={review.contractReference} mono />
            </dl>
          </AcademyPanel>
        ))}
      </section>
      <AcademyPanel title="Review queue" description="Pending educational, treasury, tutor, and certification review items before live execution is possible.">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-[0.16em] text-outline">
                <th className="px-3 py-3">Item</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Priority</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Blocker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {academy.governanceReviewQueue.map((item) => (
                <tr key={item.id}>
                  <td className="px-3 py-4 font-bold text-on-surface">{item.item}</td>
                  <td className="px-3 py-4 text-outline">{item.type}</td>
                  <td className="px-3 py-4"><AcademyBadge value={item.priority} /></td>
                  <td className="px-3 py-4"><AcademyBadge value={item.status} /></td>
                  <td className="px-3 py-4 text-outline">{item.blocker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AcademyPanel>
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
        <dl className="mt-5 grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <Info label="Certification issuer" value={details.path.issuer} />
          <Info label="Governance compatibility" value={details.path.governanceCompatibility} />
          <Info label="Federation status" value={details.path.federationStatus} />
        </dl>
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
              <Info label="Treasury Source" value={reward.treasurySource} />
              <Info label="Vesting Schedule" value={reward.vestingSchedule} />
              <Info label="Claimable" value={reward.claimable ? 'claimable mock' : 'pending mock'} />
            </dl>
          </article>
        ))}
      </div>
    </AcademyPanel>
  );
}

function AcademyEmptyState({ message }) {
  return (
    <section className="rounded-lg border border-dashed border-white/15 bg-surface-container-low p-6 text-sm leading-6 text-outline">
      {message}
    </section>
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

function Info({ label, value, mono = false }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-outline">{label}</dt>
      <dd className={`mt-1 text-on-surface ${mono ? 'font-mono text-xs' : ''}`}>{value}</dd>
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
