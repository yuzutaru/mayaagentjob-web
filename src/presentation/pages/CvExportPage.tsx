import React, { useRef } from 'react';
import { Download, FileDown, Loader2, X } from 'lucide-react';
import { useTranslation } from '../../core/i18n/TranslationContext';
import { HomeNavbar } from '../components/home/HomeNavbar';
import { HomeFooter } from '../components/home/HomeFooter';
import { PortfolioEditor } from '../components/portfolio/PortfolioEditor';
import { usePortfolioBuilder } from '../hooks/usePortfolioBuilder';
import { ApiPortfolioRepository } from '../../data/repositories/ApiPortfolioRepository';
import { cvTemplatesMockData } from '../../data/mock/cvTemplatesMockData';
import { ResumePreview } from '../components/cv/ResumePreview';

const DEFAULT_TEMPLATE_ID = 'ats-minimal';

export const CvExportPage: React.FC = () => {
  const { t } = useTranslation();
  const repoRef = useRef(new ApiPortfolioRepository());
  const builder = usePortfolioBuilder(repoRef.current);

  const selectedTemplate = cvTemplatesMockData.find((tmpl) => tmpl.id === DEFAULT_TEMPLATE_ID) ?? null;

  const handleDownloadCv = () => {
    if (selectedTemplate) void builder.exportPdf(selectedTemplate.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-career-dark text-slate-900 dark:text-white transition-colors duration-300">
      <HomeNavbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <FileDown className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">{t('cvExport.title')}</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{t('cvExport.subtitle')}</p>
            </div>
          </div>

          {/* Status alerts */}
          {builder.error && (
            <div className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              <span>{builder.error}</span>
              <button onClick={() => builder.setProfile(builder.profile)} className="text-red-500 hover:text-red-700" aria-label="dismiss">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {builder.notice && (
            <div className="mb-6 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
              {builder.notice}
            </div>
          )}
          {builder.isLoading && (
            <div className="mb-6 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('portfolio.importing')}
            </div>
          )}

          {/* Editor + Preview */}
          <section>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2 xl:w-3/5">
                <h2 className="text-xl font-bold mb-1">{t('portfolio.editorHeading')}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  {t('portfolio.editorSub')}
                </p>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                  <PortfolioEditor profile={builder.profile} updateProfile={builder.updateProfile} />
                </div>
              </div>

              <div className="lg:w-1/2 xl:w-2/5">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 lg:sticky lg:top-24">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {t('cvExport.selectedTemplate')}
                      </p>
                      <h3 className="font-bold">{selectedTemplate?.name}</h3>
                    </div>
                    {selectedTemplate?.category === 'ats' && (
                      <span className="inline-flex items-center rounded-full bg-slate-900 dark:bg-emerald-500/15 text-white dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5">
                        {t('cvExport.atsBadge')}
                      </span>
                    )}
                  </div>
                  <div className="max-h-[62vh] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700">
                    <ResumePreview
                      templateId={DEFAULT_TEMPLATE_ID}
                      profile={builder.profile}
                      className="bg-white"
                    />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 text-center">
                    {selectedTemplate?.description}
                  </p>
                  <button
                    onClick={handleDownloadCv}
                    disabled={builder.isExporting || !builder.profile.fullName}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-emerald-500/25 transition-colors"
                  >
                    {builder.isExporting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    {builder.isExporting ? t('cvExport.exporting') : t('cvExport.downloadCv')}
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

export default CvExportPage;
