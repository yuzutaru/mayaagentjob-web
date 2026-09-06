import React, { useRef, useState } from 'react';
import {
  Check,
  ChevronLeft,
  Download,
  FileDown,
  Loader2,
  Palette,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useTranslation } from '../../core/i18n/TranslationContext';
import { HomeNavbar } from '../components/home/HomeNavbar';
import { HomeFooter } from '../components/home/HomeFooter';
import { SourcePicker } from '../components/portfolio/SourcePicker';
import { ProviderImportForm } from '../components/portfolio/ProviderImportForm';
import { PortfolioEditor } from '../components/portfolio/PortfolioEditor';
import { usePortfolioBuilder } from '../hooks/usePortfolioBuilder';
import { ApiPortfolioRepository } from '../../data/repositories/ApiPortfolioRepository';
import { samplePortfolio } from '../../data/mock/portfolioMockData';
import { cvTemplatesMockData } from '../../data/mock/cvTemplatesMockData';
import { PortfolioProvider } from '../../domain/entities/PortfolioContract';
import { CvTemplateContract } from '../../domain/entities/CvTemplateContract';

export const CvExportPage: React.FC = () => {
  const { t } = useTranslation();
  const repoRef = useRef(new ApiPortfolioRepository());
  const builder = usePortfolioBuilder(repoRef.current);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<PortfolioProvider | null>(null);

  const selectedTemplate = cvTemplatesMockData.find((tmpl) => tmpl.id === selectedTemplateId) ?? null;
  const atsTemplates = cvTemplatesMockData.filter((tmpl) => tmpl.category === 'ats');
  const modernTemplates = cvTemplatesMockData.filter((tmpl) => tmpl.category === 'modern');

  const handleChooseTemplate = (template: CvTemplateContract) => {
    setSelectedTemplateId(template.id);
    setActiveSource(null);
  };

  const handleChangeTemplate = () => {
    setSelectedTemplateId(null);
    setActiveSource(null);
  };

  const handleStartEmpty = () => {
    builder.resetProfile();
    setActiveSource(null);
  };

  const handleLoadSample = () => {
    builder.setProfile(samplePortfolio);
    setActiveSource(null);
  };

  const handleDownloadCv = () => {
    if (selectedTemplateId) void builder.exportPdf(selectedTemplateId);
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

          {/* Step indicator */}
          <ol className="flex items-center gap-2 text-sm font-semibold mb-8 text-slate-500 dark:text-slate-400 flex-wrap">
            <li className={selectedTemplate ? 'text-emerald-600 dark:text-emerald-400' : ''}>
              {t('cvExport.chooseTemplate')}
            </li>
            {selectedTemplate && (
              <>
                <li className="text-slate-300 dark:text-slate-600">›</li>
                <li className="text-emerald-600 dark:text-emerald-400">{t('cvExport.buildStep')}</li>
              </>
            )}
          </ol>

          {!selectedTemplate ? (
            /* ── Step 1: template gallery ── */
            <div className="flex flex-col gap-10">
              <TemplateGroup
                title={t('cvExport.atsSection')}
                description={t('cvExport.atsSectionDesc')}
                icon={<ShieldCheck className="w-5 h-5" />}
                templates={atsTemplates}
                badge={t('cvExport.atsBadge')}
                onSelect={handleChooseTemplate}
              />
              <TemplateGroup
                title={t('cvExport.modernSection')}
                description={t('cvExport.modernSectionDesc')}
                icon={<Palette className="w-5 h-5" />}
                templates={modernTemplates}
                onSelect={handleChooseTemplate}
              />
            </div>
          ) : (
            /* ── Step 2: build CV with selected template ── */
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <TemplateThumb template={selectedTemplate} className="w-12 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {t('cvExport.selectedTemplate')}
                    </p>
                    <p className="font-bold truncate">{selectedTemplate.name}</p>
                  </div>
                </div>
                <button
                  onClick={handleChangeTemplate}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t('cvExport.changeTemplate')}
                </button>
              </div>

              {/* Status alerts */}
              {builder.error && (
                <div className="flex items-start justify-between gap-3 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  <span>{builder.error}</span>
                  <button
                    onClick={() => builder.setProfile(builder.profile)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {builder.notice && (
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                  {builder.notice}
                </div>
              )}
              {builder.isLoading && (
                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('portfolio.importing')}
                </div>
              )}

              <section className="mb-2">
                <h2 className="text-xl font-bold mb-1">{t('portfolio.sourceHeading')}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {t('portfolio.sourceSub')}
                </p>
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
                    onSelectProvider={setActiveSource}
                    onStartEmpty={handleStartEmpty}
                    onLoadSample={handleLoadSample}
                  />
                )}
              </section>

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
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 lg:sticky lg:top-24">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                        {t('cvExport.selectedTemplate')}
                      </p>
                      <TemplateThumb template={selectedTemplate} className="w-full max-w-[180px] mx-auto" />
                      <h3 className="text-center font-bold mt-4">{selectedTemplate.name}</h3>
                      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {selectedTemplate.description}
                      </p>
                      <button
                        onClick={handleDownloadCv}
                        disabled={builder.isExporting || !builder.profile.fullName}
                        className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-emerald-500/25 transition-colors"
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
          )}
        </div>
      </main>

      <HomeFooter columns={[]} />
    </div>
  );
};

export default CvExportPage;

/* ── Template group ── */

interface TemplateGroupProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  templates: readonly CvTemplateContract[];
  badge?: string;
  onSelect: (template: CvTemplateContract) => void;
}

const TemplateGroup: React.FC<TemplateGroupProps> = ({
  title,
  description,
  icon,
  templates,
  badge,
  onSelect,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-1">
      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
        {icon}
      </span>
      <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
    </div>
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">{description}</p>
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template)}
          className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all text-left"
          aria-label={`Select ${template.name}`}
        >
          {badge && (
            <span className="absolute top-4 right-4 z-10 inline-flex items-center rounded-full bg-slate-900 dark:bg-emerald-500/15 text-white dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5">
              {badge}
            </span>
          )}
          <TemplateThumb template={template} className="w-full" />
          <div className="flex items-center justify-between gap-2 mt-3 px-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{template.name}</h3>
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white items-center justify-center hidden group-hover:flex">
              <Check className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-1 leading-relaxed">
            {template.description}
          </p>
        </button>
      ))}
    </div>
  </div>
);

/* ── Mini template thumbnail (skeleton CV sheet) ── */

interface TemplateThumbProps {
  template: CvTemplateContract;
  className?: string;
}

const TemplateThumb: React.FC<TemplateThumbProps> = ({ template, className = '' }) => {
  const accent = template.accentColor || '#334155';
  const isAts = template.isAts;
  const isBanner = template.id === 'modern-banner';

  return (
    <div
      className={`aspect-[210/297] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white shadow-sm ${className}`}
      aria-hidden
    >
      {isBanner ? (
        <div className="h-full w-full flex flex-col" style={{ background: accent }}>
          <div className="flex items-center gap-1.5 px-2 pt-2">
            <div className="h-4 w-4 rounded-full bg-white/90" />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-2/3 rounded bg-white/90" />
              <div className="h-1 w-1/2 rounded bg-white/60" />
            </div>
          </div>
          <div className="mt-auto space-y-1 p-2 bg-white">
            <div className="h-1 w-3/4 rounded bg-slate-300" />
            <div className="h-1 w-5/6 rounded bg-slate-200" />
            <div className="h-1 w-2/3 rounded bg-slate-200" />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col p-2">
          <div
            className="h-1 w-full rounded-full mb-2"
            style={{ background: isAts ? '#94A3B8' : accent }}
          />
          <div className="flex items-center gap-1.5">
            <div
              className="h-4 w-4 shrink-0 rounded-full"
              style={{ background: isAts ? '#CBD5E1' : `${accent}33`, border: isAts ? 'none' : `1px solid ${accent}` }}
            />
            <div className="space-y-1 flex-1">
              <div className="h-1.5 w-2/3 rounded" style={{ background: isAts ? '#334155' : accent }} />
              <div className="h-1 w-1/2 rounded bg-slate-200" />
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-1 rounded bg-slate-200 dark:bg-slate-200"
                style={{ width: `${[90, 100, 80, 70][i]}%` }}
              />
            ))}
          </div>
          <div className="mt-2 space-y-1 border-t border-slate-100 pt-1.5">
            {[0, 1].map((i) => (
              <div key={i} className="h-1 w-full rounded bg-slate-100 dark:bg-slate-100" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
