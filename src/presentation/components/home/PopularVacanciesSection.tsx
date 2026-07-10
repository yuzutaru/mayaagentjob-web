import React from 'react';
import { PopularVacancyContract } from '../../../domain/entities/HomePortalContract';

interface PopularVacanciesSectionProps {
  vacancies: readonly PopularVacancyContract[];
}

export const PopularVacanciesSection: React.FC<PopularVacanciesSectionProps> = ({
  vacancies,
}) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Most Popular Vacancies
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {vacancies.map((vacancy) => {
          const isHighlighted = Boolean(vacancy.isHighlighted);

          return (
            <a
              key={vacancy.id}
              href={`#vacancy/${vacancy.id}`}
              className="group flex flex-col p-4 rounded-xl hover:bg-slate-100/70 dark:hover:bg-[#151821] transition-all duration-200"
            >
              <h3
                className={`text-base sm:text-lg font-bold transition-colors ${
                  isHighlighted
                    ? 'text-emerald-500 underline decoration-emerald-500/80 decoration-2 underline-offset-4'
                    : 'text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400'
                }`}
              >
                {vacancy.roleTitle}
              </h3>
              <span className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                {vacancy.openPositionsCount.toLocaleString()} Open Positions
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
};
