import React from 'react';
import { homePortalMockData } from '../../data/mock/homePortalMockData';
import { HomeNavbar } from '../components/home/HomeNavbar';
import { HeroSearchSection } from '../components/home/HeroSearchSection';
import { JobCategoriesBar } from '../components/home/JobCategoriesBar';
import { PopularVacanciesSection } from '../components/home/PopularVacanciesSection';
import { HowWeWorkSection } from '../components/home/HowWeWorkSection';
import { DualCtaBannersSection } from '../components/home/DualCtaBannersSection';
import { HomeFooter } from '../components/home/HomeFooter';

export const HomeLandingPage: React.FC = () => {
  const data = homePortalMockData;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090A0E] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <HomeNavbar />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSearchSection
          headline={data.heroHeadline}
          highlightWord={data.heroHighlightWord}
          quote={data.heroQuote}
          quoteHighlightWord={data.heroQuoteHighlightWord}
        />

        <JobCategoriesBar categories={data.categories} />

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
