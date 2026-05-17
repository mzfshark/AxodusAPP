export const academyMock = {
  summary: { totalCourses: 6, activeStudents: 1240, completedLessons: 8420, issuedCertificates: 318, lockedRewardsIssued: '42,000 $Neurons mock', paidRewardsIssued: '0 $Neurons mock', tutorsPendingValidation: 3 },
  courses: [
    { id: 'academy-course-001', title: 'Governance Fundamentals', category: 'Governance', level: 'Beginner', status: 'published', accessType: 'Free', price: '0', rewardType: 'Locked $Neurons', rewardAmount: '25 mock', rewardLocked: true, tutorId: 'academy-tutor-001', lessonsCount: 8, estimatedDuration: '3h', certificateEnabled: true, proofOfKnowledgeRequired: true, description: 'Introduction to Axodus constitutional governance.' },
    { id: 'academy-course-002', title: 'DAO Treasury Risk', category: 'Risk', level: 'Intermediate', status: 'draft', accessType: 'Governance-gated', price: '0', rewardType: 'No reward', rewardAmount: '0', rewardLocked: false, tutorId: 'academy-tutor-002', lessonsCount: 12, estimatedDuration: '5h', certificateEnabled: true, proofOfKnowledgeRequired: true, description: 'Risk vocabulary for treasury operators.' },
    { id: 'academy-course-003', title: 'Marketplace Seller Onboarding', category: 'Marketplace', level: 'Beginner', status: 'published', accessType: 'Paid', price: '15 USDC mock', rewardType: 'No reward', rewardAmount: '0', rewardLocked: false, tutorId: 'academy-tutor-003', lessonsCount: 6, estimatedDuration: '2h', certificateEnabled: false, proofOfKnowledgeRequired: false, description: 'Product listing and governance validation basics.' },
    { id: 'academy-course-004', title: 'NFT License Operations', category: 'Licensing', level: 'Advanced', status: 'planned', accessType: 'NFT License-gated', price: 'license required', rewardType: 'Locked $Neurons', rewardAmount: '50 mock', rewardLocked: true, tutorId: 'academy-tutor-001', lessonsCount: 10, estimatedDuration: '4h', certificateEnabled: true, proofOfKnowledgeRequired: true, description: 'License-gated workflows for Academy and Marketplace.' },
  ],
  tutors: [
    { id: 'academy-tutor-001', name: 'Axodus Research Desk', type: 'Internal', validationStatus: 'approved', coursesPublished: 2, rating: 4.8, governanceApproved: true, description: 'Internal education and governance research team.' },
    { id: 'academy-tutor-002', name: 'Treasury Risk Guild', type: 'Partner', validationStatus: 'pending', coursesPublished: 1, rating: 4.6, governanceApproved: false, description: 'Risk education partner awaiting validation.' },
    { id: 'academy-tutor-003', name: 'Marketplace Ops', type: 'Internal', validationStatus: 'approved', coursesPublished: 1, rating: 4.7, governanceApproved: true, description: 'Commerce operations training group.' },
  ],
  learningProgress: [
    { userId: 'mock-user-001', courseId: 'academy-course-001', progress: 72, completedLessons: 6, pendingLessons: 2, certificateStatus: 'pending', rewardStatus: 'locked-pending-completion' },
    { userId: 'mock-user-001', courseId: 'academy-course-003', progress: 100, completedLessons: 6, pendingLessons: 0, certificateStatus: 'not-enabled', rewardStatus: 'no-reward' },
  ],
};
