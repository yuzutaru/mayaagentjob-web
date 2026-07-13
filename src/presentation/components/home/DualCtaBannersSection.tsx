import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import { CtaBannerContract } from '../../../domain/entities/HomePortalContract';

interface DualCtaBannersSectionProps {
  banners: readonly CtaBannerContract[];
}

export const DualCtaBannersSection: React.FC<DualCtaBannersSectionProps> = ({
  banners,
}) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {banners.map((banner) => {
          const isCandidate = banner.type === 'candidate';

          return (
            <div
              key={banner.id}
              className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                isCandidate
                  ? 'bg-gradient-to-br from-career-gradientStart to-career-gradientEnd text-white border border-emerald-500/20 shadow-emerald-950/40'
                  : 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-200 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {/* Decorative background circle */}
              <div
                className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
                  isCandidate ? 'bg-emerald-500/10' : 'bg-white/30'
                }`}
              />

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                  {t(`cta.${banner.type}.title`) || banner.title}
                </h3>
                <p
                  className={`text-sm sm:text-base leading-relaxed mb-8 max-w-md ${
                    isCandidate ? 'text-slate-300' : 'text-slate-900/80 font-medium'
                  }`}
                >
                  {t(`cta.${banner.type}.desc`) || banner.description}
                </p>
              </div>

              <div>
                <a
                  href={banner.buttonActionUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-emerald-600 font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all group"
                >
                  <span>{t(`cta.${banner.type}.btn`) || banner.buttonText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
