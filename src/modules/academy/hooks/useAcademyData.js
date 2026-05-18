import { useMemo } from 'react';
import {
  getAcademyCourse,
  getAcademyData,
  getAcademyLessons,
  getAcademyPath,
  getAcademyRewards,
  getAcademyTutor,
} from '../services/academyService';

export function useAcademyData() {
  return getAcademyData();
}

export function useAcademyCourse(slug) {
  return useMemo(() => {
    const course = getAcademyCourse(slug);
    if (!course) return null;
    return {
      course,
      tutor: getAcademyTutor(course.tutorId),
      lessons: getAcademyLessons(course.id),
      rewards: getAcademyRewards(course.id),
    };
  }, [slug]);
}

export function useAcademyPath(pathId) {
  return useMemo(() => {
    const path = getAcademyPath(pathId);
    if (!path) return null;
    return {
      path,
      courses: path.courseIds
        .map((courseId) => getAcademyData().courses.find((course) => course.id === courseId))
        .filter(Boolean),
    };
  }, [pathId]);
}
