import React from 'react';
import { Laptop, Sparkles } from 'lucide-react';

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

        {/* Hero Graphic & Quote Banner */}
        <div className="relative mt-32 pt-6 pb-4 flex flex-col items-center">
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
