import React, { useState, useCallback, useRef } from 'react';
import { homePortalMockData } from '../../data/mock/homePortalMockData';
import { MockJobListingRepository } from '../../data/repositories/MockJobListingRepository';
import { HomeNavbar } from '../components/home/HomeNavbar';
import { FloatingSearchBar } from '../components/home/FloatingSearchBar';
import { JobCategoriesBar } from '../components/home/JobCategoriesBar';
import { JobListingSection } from '../components/home/JobListingSection';
import { PopularVacanciesSection } from '../components/home/PopularVacanciesSection';
import { HomeFooter } from '../components/home/HomeFooter';
import { useJobListings } from '../hooks/useJobListings';
import { useTranslation } from '../../core/i18n/TranslationContext';

export const FindJobsPage: React.FC = () => {
  const data = homePortalMockData;
  const { t } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryQuery, setCountryQuery] = useState('');
  const repoRef = useRef(new MockJobListingRepository());

  const {
    jobs,
    isLoading,
    setCategoryId,
    setKeyword,
    setCountry,
    page,
    totalPages,
    totalCount,
    setPage,
  } = useJobListings(repoRef.current);

  const handleCategorySelect = useCallback((id: string) => {
    const next = id === selectedCategoryId ? undefined : id;
    setSelectedCategoryId(next);
    setCategoryId(next);
  }, [selectedCategoryId, setCategoryId]);

  const handleSearchQueryChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleCountryQueryChange = useCallback((value: string) => {
    setCountryQuery(value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    setKeyword(searchQuery.trim() || undefined);
    setCountry(countryQuery.trim() || undefined);
  }, [searchQuery, countryQuery, setKeyword, setCountry]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-career-dark text-slate-900 dark:text-white transition-colors duration-300">
      <HomeNavbar />

      <main className="flex-1">
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('jobs.title')}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {t('jobs.subtitle')}
          </p>
        </section>

        <JobCategoriesBar
          categories={data.categories}
          activeCategoryId={selectedCategoryId}
          onCategorySelect={handleCategorySelect}
        />

        <FloatingSearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          onSearchSubmit={handleSearchSubmit}
          countryQuery={countryQuery}
          onCountryQueryChange={handleCountryQueryChange}
        />

        <JobListingSection
          jobs={jobs}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={setPage}
        />

        <PopularVacanciesSection vacancies={data.popularVacancies} />
      </main>

      <HomeFooter columns={data.footerColumns} />
    </div>
  );
};

export default FindJobsPage;
