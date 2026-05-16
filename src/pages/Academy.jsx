import React from 'react';
import { BadgeCheck, BookOpen, GraduationCap, PlayCircle, Trophy } from 'lucide-react';
import { academyMock } from '../mock/devEcosystemData';

export default function Academy() {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Academy</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-on-surface">Learning Tracks</h1>
          <p className="mt-2 max-w-3xl text-sm text-outline">Mock training data for the learning nucleus in development.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-3 text-sm text-outline">
          Certifications and progress are synthetic.
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {academyMock.stats.map((stat) => (
          <article key={stat.label} className="rounded-xl border border-white/10 bg-surface-container-low p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-outline">{stat.label}</p>
            <p className="mt-3 text-3xl font-extrabold text-on-surface">{stat.value}</p>
            <p className="mt-2 text-sm text-outline">{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Continue learning</h2>
              <p className="mt-1 text-sm text-outline">Dev courses exposed as read-only training data.</p>
            </div>
            <BookOpen className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {academyMock.courses.map((course) => (
              <div key={course.title} className="rounded-lg border border-white/10 bg-surface-container p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{course.level}</p>
                    <h3 className="mt-2 text-lg font-bold text-on-surface">{course.title}</h3>
                  </div>
                  <PlayCircle className="h-5 w-5 text-outline" aria-hidden="true" />
                </div>
                <p className="mt-4 text-sm text-outline">Instructor: {course.instructor}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{course.progress}</span>
                  <BadgeCheck className="h-4 w-4 text-secondary" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="xl:col-span-4 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Subscriptions</h2>
              <p className="mt-1 text-sm text-outline">Mock access plans for dev.</p>
            </div>
            <GraduationCap className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {academyMock.subscriptions.map((subscription) => (
              <div key={subscription.title} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <p className="font-semibold text-on-surface">{subscription.title}</p>
                <p className="mt-1 text-sm text-outline">{subscription.detail}</p>
                <p className="mt-3 text-sm font-bold text-secondary">{subscription.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-surface-container p-4">
            <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
        </aside>
      </section>
    </main>
  );
}
