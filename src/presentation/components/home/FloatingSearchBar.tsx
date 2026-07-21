import React from 'react';
import { Search, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import { useUserLocation } from '../../hooks/useUserLocation';
import { UserLocationRepositoryImpl } from '../../../data/repositories/UserLocationRepositoryImpl';

interface FloatingSearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export const FloatingSearchBar: React.FC<FloatingSearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
}) => {
  const { t } = useTranslation();
  const { location } = useUserLocation(new UserLocationRepositoryImpl());

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-full p-2 sm:p-2.5 shadow-2xl shadow-emerald-500/10 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
          <div className="flex items-center gap-3 flex-1 px-4 py-2 sm:py-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder={t('hero.placeholderKeyword')}
              className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-800" />

          <div className="flex items-center justify-between gap-3 px-4 py-2 sm:py-3 sm:w-60 text-left border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-sm font-medium truncate">{location?.displayName ?? 'Jakarta, Indonesia'}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </div>

          <button
            type="button"
            onClick={onSearchSubmit}
            className="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
