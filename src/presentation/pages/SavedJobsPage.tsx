import React from 'react';
import { Heart } from 'lucide-react';
import { useTranslation } from '../../core/i18n/TranslationContext';

export const SavedJobsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
        <Heart className="w-10 h-10" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('saved.emptyTitle')}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
        {t('saved.emptySubtitle')}
      </p>
    </div>
  );
};
