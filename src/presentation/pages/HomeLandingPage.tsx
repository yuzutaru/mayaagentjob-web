import React, { useState, useCallback, useRef } from 'react';
import { homePortalMockData } from '../../data/mock/homePortalMockData';
import { MockJobListingRepository } from '../../data/repositories/MockJobListingRepository';
import { HomeNavbar } from '../components/home/HomeNavbar';
import { HeroSearchSection } from '../components/home/HeroSearchSection';
import { JobCategoriesBar } from '../components/home/JobCategoriesBar';
import { JobListingSection } from '../components/home/JobListingSection';
import { PopularVacanciesSection } from '../components/home/PopularVacanciesSection';
import { HowWeWorkSection } from '../components/home/HowWeWorkSection';
import { DualCtaBannersSection } from '../components/home/DualCtaBannersSection';
import { HomeFooter } from '../components/home/HomeFooter';
import { useJobListings } from '../hooks/useJobListings';

export const HomeLandingPage: React.FC = () => {
  const data = homePortalMockData;
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const repoRef = useRef(new MockJobListingRepository());

  const {
    jobs,
    isLoading,
    setCategoryId,
    setKeyword,
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

  const handleSearchSubmit = useCallback(() => {
    setKeyword(searchQuery.trim() || undefined);
  }, [searchQuery, setKeyword]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-career-dark text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <HomeNavbar />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSearchSection
          headline={data.heroHeadline}
          highlightWord={data.heroHighlightWord}
          quote={data.heroQuote}
          quoteHighlightWord={data.heroQuoteHighlightWord}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          onSearchSubmit={handleSearchSubmit}
        />

        <JobCategoriesBar
          categories={data.categories}
          activeCategoryId={selectedCategoryId}
          onCategorySelect={handleCategorySelect}
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

        <HowWeWorkSection steps={data.workSteps} />

        <DualCtaBannersSection banners={data.ctaBanners} />
      </main>

      {/* Footer */}
      <HomeFooter columns={data.footerColumns} />
    </div>
  );
};

export default HomeLandingPage;
