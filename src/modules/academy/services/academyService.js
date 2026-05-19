import { academyMock } from '@/data/mock';

export function getAcademyData() {
  return academyMock;
}

export function getAcademyCourse(slug) {
  return academyMock.courses.find((course) => course.slug === slug);
}

export function getAcademyTutor(tutorId) {
  return academyMock.tutors.find((tutor) => tutor.id === tutorId);
}

export function getAcademyLessons(courseId) {
  return academyMock.lessons
    .filter((lesson) => lesson.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}

export function getAcademyRewards(courseId) {
  return academyMock.rewards.filter((reward) => reward.courseId === courseId);
}

export function getAcademyCourseTitle(courseId) {
  return academyMock.courses.find((course) => course.id === courseId)?.title || courseId;
}

export function getAcademyPath(pathId) {
  return academyMock.learningPaths.find((path) => path.id === pathId);
}

export function formatNeurons(amount) {
  return `${Number(amount || 0).toLocaleString('en-US')} $NEURONS`;
}

export function academyStatusClass(status = '') {
  if (['approved', 'compliant', 'verified', 'mock-verified'].includes(status)) {
    return 'border-emerald-400/25 bg-emerald-500/10 text-emerald-200';
  }
  if (['under-review', 'probation', 'queued-mock', 'active-mock', 'draft-preview'].includes(status)) {
    return 'border-amber-400/25 bg-amber-500/10 text-amber-200';
  }
  if (['restricted', 'deprecated', 'sanctioned', 'suspended'].includes(status)) {
    return 'border-rose-400/25 bg-rose-500/10 text-rose-200';
  }
  return 'border-white/10 bg-surface-container-low text-outline';
}
