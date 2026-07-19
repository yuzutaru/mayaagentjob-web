import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, ChevronDown, Laptop, Sparkles } from 'lucide-react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import { useUserLocation } from '../../hooks/useUserLocation';
import { UserLocationRepositoryImpl } from '../../../data/repositories/UserLocationRepositoryImpl';

interface HeroSearchSectionProps {
  headline: string;
  highlightWord: string;
  quote: string;
  quoteHighlightWord: string;
}

export const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({
  headline,
  highlightWord,
  quote,
  quoteHighlightWord,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const { location } = useUserLocation(new UserLocationRepositoryImpl());

  // Split headline to highlight the specific word
  const renderHeadline = () => {
    const parts = headline.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-emerald-500 font-extrabold">{highlightWord}</span>
        {parts[1] || ''}
      </>
    );
  };

  // Split quote to highlight the specific word
  const renderQuote = () => {
    const idx = quote.indexOf(quoteHighlightWord);
    if (idx === -1) return quote;
    const before = quote.substring(0, idx);
    const after = quote.substring(idx + quoteHighlightWord.length);
    return (
      <>
        {before}
        <span className="text-emerald-500 font-bold">{quoteHighlightWord}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8">
          {renderHeadline()}
        </h1>

        {/* Floating Search Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-full p-2 sm:p-2.5 shadow-2xl shadow-emerald-500/10 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 max-w-3xl mx-auto mb-14">
          {/* Keyword Input */}
          <div className="flex items-center gap-3 flex-1 px-4 py-2 sm:py-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('hero.placeholderKeyword')}
              className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Vertical Divider for desktop */}
          <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-800" />

          {/* Location Dropdown */}
          <div className="flex items-center justify-between gap-3 px-4 py-2 sm:py-3 sm:w-60 text-left border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-sm font-medium truncate">{location?.displayName ?? 'Jakarta, Indonesia'}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Graphic & Quote Banner */}
        <div className="relative mt-8 pt-6 pb-4 flex flex-col items-center">
          {/* Decorative Vector Desk Illustration Mockup */}
          <div className="w-full max-w-2xl mx-auto flex items-end justify-center gap-4 sm:gap-12 mb-8 select-none">
            {/* Left Character working on Laptop */}
            <div className="flex items-end gap-3">
              <div className="relative flex flex-col items-center">
                {/* Character silhouette */}
                <div className="w-16 sm:w-24 h-24 sm:h-36 relative flex flex-col items-center justify-end">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-emerald-500/90 rounded-t-2xl relative flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  {/* Chair */}
                  <div className="w-14 sm:w-20 h-4 bg-slate-300 dark:bg-slate-700 rounded-full mt-1" />
                </div>
              </div>

              {/* Desk with Laptop */}
              <div className="flex flex-col items-center">
                <div className="w-24 sm:w-36 h-14 sm:h-20 bg-slate-800 dark:bg-slate-800/90 rounded-lg border-2 border-slate-700 flex flex-col items-center justify-center relative shadow-xl">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs sm:text-sm tracking-widest">
                    <Laptop className="w-4 h-4" />
                    MAYA
                  </div>
                </div>
                {/* Desk Base */}
                <div className="w-32 sm:w-48 h-12 sm:h-16 bg-slate-700 dark:bg-slate-800 rounded-b-md border-t-4 border-slate-600 flex justify-end p-2">
                  <div className="w-10 sm:w-14 h-full bg-slate-800 rounded flex flex-col justify-around px-1.5">
                    <div className="h-1.5 w-full bg-slate-600 rounded" />
                    <div className="h-1.5 w-full bg-slate-600 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Plant Illustration */}
            <div className="flex flex-col items-center pb-1">
              <div className="w-6 sm:w-8 h-20 sm:h-32 flex flex-col items-center justify-end">
                <div className="w-6 sm:w-8 h-16 sm:h-28 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-full shadow-inner" />
              </div>
              <div className="w-8 sm:w-10 h-6 sm:h-8 bg-slate-700 dark:bg-slate-800 rounded-b-lg border-t-2 border-slate-600" />
            </div>
          </div>

          {/* Quote Subtitle */}
          <p className="text-base sm:text-lg md:text-xl font-medium text-slate-700 dark:text-slate-200 max-w-2xl leading-relaxed">
            {renderQuote()}
          </p>
        </div>
      </div>
    </section>
  );
};
