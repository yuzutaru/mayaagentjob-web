import React from 'react';
import { MapPin, Briefcase, Building2, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import { JobListing } from '../../../domain/entities/JobListing';

interface JobListingSectionProps {
  jobs: readonly JobListing[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const matchScoreColor = (score: number): string => {
  if (score >= 90) return 'text-emerald-500';
  if (score >= 75) return 'text-blue-500';
  if (score >= 60) return 'text-amber-500';
  return 'text-slate-400';
};

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | 'ellipsis')[] = [1];
  if (current > 3) pages.push('ellipsis');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

export const JobListingSection: React.FC<JobListingSectionProps> = ({
  jobs, isLoading, page, totalPages, totalCount, onPageChange,
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t('jobListings.sectionTitle')}
        </h2>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {totalCount} {t('jobListings.found')}
        </span>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16">
          <Briefcase className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
            {t('jobListings.emptyState')}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.jobId}
                className="group relative bg-white dark:bg-career-cardDark rounded-2xl border border-slate-200/70 dark:border-slate-800/80 p-6 hover:shadow-lg hover:border-emerald-500/40 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center gap-1.5 text-sm font-bold ${matchScoreColor(job.matchScore)}`}>
                    <Sparkles className="w-4 h-4" />
                    {job.matchScore}% {t('jobListings.matchScore')}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {job.arrangement}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {job.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span className="font-medium">{job.company}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{job.location}</span>
                </div>

                {job.aiSummaryBullets.length > 0 && (
                  <ul className="mb-5 flex-1 space-y-1.5">
                    {job.aiSummaryBullets.map((bullet, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={`#vacancy/${job.jobId}`}
                  className="inline-flex items-center justify-center gap-2 w-full mt-auto py-2.5 px-4 rounded-xl text-sm font-semibold bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-200 group/link"
                >
                  {t('jobListings.applyNow')}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-10">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              {getPageNumbers(page, totalPages).map((p, idx) =>
                p === 'ellipsis' ? (
                  <span key={`e-${idx}`} className="px-2 py-1 text-sm text-slate-400 select-none">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onPageChange(p)}
                    className={`min-w-[36px] h-9 rounded-lg text-sm font-semibold transition-colors ${
                      p === page
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
