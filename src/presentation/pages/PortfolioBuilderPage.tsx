import React, { useRef, useState } from 'react';
import { Loader2, Download, FileCode2, Save, RotateCcw, X } from 'lucide-react';
import { useTranslation } from '../../core/i18n/TranslationContext';
import { HomeNavbar } from '../components/home/HomeNavbar';
import { HomeFooter } from '../components/home/HomeFooter';
import { SourcePicker } from '../components/portfolio/SourcePicker';
import { ProviderImportForm } from '../components/portfolio/ProviderImportForm';
import { PortfolioEditor } from '../components/portfolio/PortfolioEditor';
import { PortfolioPreview } from '../components/portfolio/PortfolioPreview';
import { usePortfolioBuilder } from '../hooks/usePortfolioBuilder';
import { ApiPortfolioRepository } from '../../data/repositories/ApiPortfolioRepository';
import { samplePortfolio } from '../../data/mock/portfolioMockData';
import { PortfolioProvider } from '../../domain/entities/PortfolioContract';

export const PortfolioBuilderPage: React.FC = () => {
  const { t } = useTranslation();
  const repoRef = useRef(new ApiPortfolioRepository());
  const builder = usePortfolioBuilder(repoRef.current);

  const [activeSource, setActiveSource] = useState<PortfolioProvider | null>(null);

  const handleSelectProvider = (provider: PortfolioProvider) => setActiveSource(provider);

  const handleStartEmpty = () => {
    builder.resetProfile();
    setActiveSource(null);
  };

  const handleLoadSample = () => {
    builder.setProfile(samplePortfolio);
    setActiveSource(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-career-dark text-slate-900 dark:text-white transition-colors duration-300">
      <HomeNavbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">{t('portfolio.title')}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{t('portfolio.subtitle')}</p>
          </div>

          {/* Status alerts */}
          {builder.error && (
            <div className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              <span>{builder.error}</span>
              <button onClick={() => builder.setProfile(builder.profile)} className="text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {builder.notice && (
            <div className="mb-6 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
              {builder.notice}
            </div>
          )}

          {/* Import loading overlay state */}
          {builder.isLoading && (
            <div className="mb-6 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('portfolio.importing')}
            </div>
          )}

          {/* Step 1: Source picker */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-1">{t('portfolio.sourceHeading')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('portfolio.sourceSub')}</p>

            {activeSource ? (
              <div className="max-w-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {t(`portfolio.providers.${activeSource}`)}
                  </span>
                  <button
                    onClick={() => setActiveSource(null)}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    <X className="w-4 h-4" />
                    {t('portfolio.back')}
                  </button>
                </div>
                <ProviderImportForm
                  provider={activeSource}
                  isLoading={builder.isLoading}
                  onImport={async (provider, username, apiKey) => {
                    await builder.importFromProvider(provider, username, apiKey);
                    if (!builder.error) setActiveSource(null);
                  }}
                  onImportPdf={async (file) => {
                    await builder.importLinkedInPdf(file);
                    if (!builder.error) setActiveSource(null);
                  }}
                />
              </div>
            ) : (
              <SourcePicker
                onSelectProvider={handleSelectProvider}
                onStartEmpty={handleStartEmpty}
                onLoadSample={handleLoadSample}
              />
            )}
          </section>

          {/* Step 2: Edit + Preview */}
          <section>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Editor */}
              <div className="lg:w-1/2 xl:w-2/5">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-1">{t('portfolio.editorHeading')}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t('portfolio.editorSub')}</p>
                  <PortfolioEditor profile={builder.profile} updateProfile={builder.updateProfile} />
                </div>
              </div>

              {/* Preview */}
              <div className="lg:w-1/2 xl:w-3/5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold">{t('portfolio.previewHeading')}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('portfolio.previewSub')}</p>
                  </div>
                </div>
                <PortfolioPreview profile={builder.profile} />

                {/* Export bar */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => builder.exportPdf()}
                    disabled={builder.isExporting}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-emerald-500/25 transition-colors"
                  >
                    {builder.isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {builder.isExporting ? t('portfolio.exporting') : t('portfolio.exportPdf')}
                  </button>
                  <button
                    onClick={() => builder.exportHtml()}
                    disabled={builder.isExporting}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 transition-colors"
                  >
                    <FileCode2 className="w-4 h-4" />
                    {t('portfolio.exportHtml')}
                  </button>
                  <button
                    onClick={() => builder.saveProfile()}
                    disabled={builder.isLoading}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {t('portfolio.saveProfile')}
                  </button>
                  <button
                    onClick={handleStartEmpty}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-semibold transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t('portfolio.reset')}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <HomeFooter columns={[]} />
    </div>
  );
};

export default PortfolioBuilderPage;
