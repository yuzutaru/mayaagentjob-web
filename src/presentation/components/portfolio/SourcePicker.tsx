import React from 'react';
import {
  Github,
  Gitlab,
  Linkedin,
  Boxes,
  PenTool,
  MessagesSquare,
  Clock,
  FileUp,
  FilePlus2,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import { PortfolioProvider } from '../../../domain/entities/PortfolioContract';

export interface SourceOption {
  id: PortfolioProvider;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROVIDER_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  gitlab: Gitlab,
  bitbucket: Boxes,
  devto: PenTool,
  stackoverflow: MessagesSquare,
  wakatime: Clock,
  'linkedin-pdf': Linkedin,
};

interface SourcePickerProps {
  onSelectProvider: (provider: PortfolioProvider) => void;
  onStartEmpty: () => void;
  onLoadSample: () => void;
}

export const SourcePicker: React.FC<SourcePickerProps> = ({ onSelectProvider, onStartEmpty, onLoadSample }) => {
  const { t } = useTranslation();

  const options: SourceOption[] = [
    { id: 'github', label: t('portfolio.providers.github'), icon: Github },
    { id: 'gitlab', label: t('portfolio.providers.gitlab'), icon: Gitlab },
    { id: 'bitbucket', label: t('portfolio.providers.bitbucket'), icon: Boxes },
    { id: 'devto', label: t('portfolio.providers.devto'), icon: PenTool },
    { id: 'stackoverflow', label: t('portfolio.providers.stackoverflow'), icon: MessagesSquare },
    { id: 'wakatime', label: t('portfolio.providers.wakatime'), icon: Clock },
    { id: 'linkedin-pdf', label: t('portfolio.providers.linkedin'), icon: Linkedin },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectProvider(opt.id)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <span className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                <Icon className="w-5 h-5" />
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {opt.label}
              </span>
            </button>
          );
        })}

        <button
          onClick={onStartEmpty}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 hover:border-emerald-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all group"
        >
          <span className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
            <FilePlus2 className="w-5 h-5" />
          </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {t('portfolio.startEmpty')}
          </span>
        </button>

        <button
          onClick={onLoadSample}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 hover:border-emerald-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all group"
        >
          <span className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
            <Sparkles className="w-5 h-5" />
          </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {t('portfolio.loadSample')}
          </span>
        </button>
      </div>
    </div>
  );
};

export const PROVIDER_ICON = PROVIDER_ICONS;
