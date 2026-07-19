import React from 'react';
import {
  Code2,
  Palette,
  Megaphone,
  Video,
  Building2,
  FileText,
  LucideIcon,
} from 'lucide-react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import { JobCategoryCardContract } from '../../../domain/entities/HomePortalContract';

interface JobCategoriesBarProps {
  categories: readonly JobCategoryCardContract[];
  activeCategoryId?: string;
  onCategorySelect?: (id: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  megaphone: Megaphone,
  video: Video,
  building: Building2,
  'file-text': FileText,
};

export const JobCategoriesBar: React.FC<JobCategoriesBarProps> = ({
  categories,
  activeCategoryId,
  onCategorySelect,
}) => {
  const { t } = useTranslation();

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 border-y border-slate-200/50 dark:border-slate-800/80 bg-slate-100/60 dark:bg-career-cardDark/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Code2;
            const isActive = activeCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategorySelect?.(cat.id)}
                className={`group relative flex flex-col items-start justify-between p-4 sm:p-5 rounded-2xl transition-all duration-300 text-left cursor-pointer shadow-sm ${
                  isActive
                    ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-emerald-500/25 shadow-lg scale-[1.02]'
                    : 'bg-white dark:bg-career-cardDark hover:bg-slate-50 dark:hover:bg-career-cardDarkHover text-slate-800 dark:text-slate-200 border border-slate-200/70 dark:border-slate-800/80 hover:border-emerald-500/40 hover:-translate-y-0.5'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl mb-4 transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                <span className="text-xs sm:text-sm font-bold tracking-tight leading-snug">
                  {t(`categories.${cat.id}`) || cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
