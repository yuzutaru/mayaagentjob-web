import React, { useState, useCallback } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import { PortfolioProvider } from '../../../domain/entities/PortfolioContract';

interface ProviderImportFormProps {
  provider: PortfolioProvider;
  isLoading: boolean;
  onImport: (provider: PortfolioProvider, username: string, apiKey?: string) => Promise<void>;
  onImportPdf: (file: File) => Promise<void>;
}

export const ProviderImportForm: React.FC<ProviderImportFormProps> = ({
  provider,
  isLoading,
  onImport,
  onImportPdf,
}) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const needsApiKey = provider === 'wakatime';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || isLoading) return;
    onImport(provider, username.trim(), needsApiKey ? apiKey.trim() || undefined : undefined);
  };

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (file && !isLoading) onImportPdf(file);
    },
    [isLoading, onImportPdf],
  );

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
      {provider === 'linkedin-pdf' ? (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex flex-col items-center justify-center gap-3 p-10 rounded-xl border-2 border-dashed cursor-pointer text-center transition-colors ${
            dragActive
              ? 'border-emerald-500 bg-emerald-500/5'
              : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500/50'
          }`}
        >
          <UploadCloud className="w-10 h-10 text-emerald-500" />
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">{t('portfolio.dropTitle')}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('portfolio.dropSub')}</p>
          </div>
          <input
            type="file"
            accept=".pdf,.txt,application/pdf,text/plain"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('portfolio.usernameLabel')}
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('portfolio.usernamePlaceholder')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {needsApiKey && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('portfolio.apiKeyLabel')}
              </label>
              <input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="password"
                placeholder={t('portfolio.apiKeyPlaceholder')}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!username.trim() || isLoading}
            className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('portfolio.importing')}
              </>
            ) : (
              t('portfolio.importBtn')
            )}
          </button>
        </form>
      )}
    </div>
  );
};
