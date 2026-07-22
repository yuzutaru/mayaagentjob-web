import React from 'react';
import { Briefcase, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../../core/i18n/TranslationContext';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">
          {t('dashboard.welcome')}, {user?.name || t('dashboard.candidate')}!
        </h1>
        <p className="text-blue-100 text-sm mt-1">{t('dashboard.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-career-cardDark rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('dashboard.matchCount')}</p>
        </div>
        <div className="bg-white dark:bg-career-cardDark rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">85%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('dashboard.profileScore')}</p>
        </div>
        <div className="bg-white dark:bg-career-cardDark rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
            <Briefcase className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">3</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('dashboard.applications')}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-career-cardDark rounded-xl p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('dashboard.recommendations')}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard.recommendationsDesc')}</p>
      </div>
    </div>
  );
};
