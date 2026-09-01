import React from 'react';
import { LayoutTemplate, FileDown, Sparkles, LucideIcon } from 'lucide-react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import { FeatureContract } from '../../../domain/entities/HomePortalContract';

interface FeaturesSectionProps {
  features: readonly FeatureContract[];
}

const iconMap: Record<string, LucideIcon> = {
  layout: LayoutTemplate,
  'file-down': FileDown,
  sparkles: Sparkles,
};

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t('features.title')}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t('features.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature) => {
          const IconComponent = iconMap[feature.iconName] || Sparkles;

          return (
            <div
              key={feature.id}
              className="group relative bg-white dark:bg-career-cardDark rounded-3xl p-8 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <IconComponent className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {t(`features.${feature.id}.title`) || feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t(`features.${feature.id}.desc`) || feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
