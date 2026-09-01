import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import {
  PortfolioProfile,
  PortfolioSkill,
  PortfolioWorkExperience,
  PortfolioProject,
  PortfolioEducation,
  PortfolioCertification,
  PortfolioSocialLink,
} from '../../../domain/entities/PortfolioContract';

interface PortfolioEditorProps {
  profile: PortfolioProfile;
  updateProfile: (patch: Partial<PortfolioProfile>) => void;
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50';
const labelCls = 'text-sm font-medium text-slate-700 dark:text-slate-300';
const sectionTitleCls =
  'text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-4';

function ListHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h4>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-sm font-semibold transition-colors"
      >
        <Plus className="w-4 h-4" />
        {title}
      </button>
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
      aria-label="remove"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

export const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ profile, updateProfile }) => {
  const { t } = useTranslation();

  const set = (key: keyof PortfolioProfile, value: unknown) =>
    updateProfile({ [key]: value } as Partial<PortfolioProfile>);

  // ── Skills ──
  const addSkill = () =>
    set('skills', [...profile.skills, { name: '', category: 'Skills', level: '' }]);
  const updateSkill = (i: number, patch: Partial<PortfolioSkill>) =>
    set('skills', profile.skills.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const removeSkill = (i: number) => set('skills', profile.skills.filter((_, idx) => idx !== i));

  // ── Experience ──
  const addExperience = () =>
    set('experience', [
      ...profile.experience,
      { company: '', role: '', startDate: '', endDate: null, location: '', description: '', highlights: [] },
    ]);
  const updateExperience = (i: number, patch: Partial<PortfolioWorkExperience>) =>
    set('experience', profile.experience.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));
  const removeExperience = (i: number) =>
    set('experience', profile.experience.filter((_, idx) => idx !== i));

  // ── Projects ──
  const addProject = () =>
    set('projects', [
      ...profile.projects,
      { name: '', description: '', url: '', sourceUrl: '', techStack: [], stars: 0, forks: 0, language: '', isFeatured: false },
    ]);
  const updateProject = (i: number, patch: Partial<PortfolioProject>) =>
    set('projects', profile.projects.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  const removeProject = (i: number) => set('projects', profile.projects.filter((_, idx) => idx !== i));

  // ── Education ──
  const addEducation = () =>
    set('education', [...profile.education, { institution: '', degree: '', startDate: '', endDate: null, description: '' }]);
  const updateEducation = (i: number, patch: Partial<PortfolioEducation>) =>
    set('education', profile.education.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));
  const removeEducation = (i: number) => set('education', profile.education.filter((_, idx) => idx !== i));

  // ── Certifications ──
  const addCertification = () =>
    set('certifications', [...profile.certifications, { name: '', issuer: '', year: '', url: '' }]);
  const updateCertification = (i: number, patch: Partial<PortfolioCertification>) =>
    set('certifications', profile.certifications.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  const removeCertification = (i: number) =>
    set('certifications', profile.certifications.filter((_, idx) => idx !== i));

  // ── Socials ──
  const addSocial = () => set('socials', [...profile.socials, { platform: '', url: '', handle: '' }]);
  const updateSocial = (i: number, patch: Partial<PortfolioSocialLink>) =>
    set('socials', profile.socials.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const removeSocial = (i: number) => set('socials', profile.socials.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-8">
      {/* Basic info */}
      <section>
        <h3 className={sectionTitleCls}>{t('portfolio.basicInfo')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t('portfolio.fullName')}>
            <input className={inputCls} value={profile.fullName} onChange={(e) => set('fullName', e.target.value)} />
          </Field>
          <Field label={t('portfolio.headline')}>
            <input className={inputCls} value={profile.headline} onChange={(e) => set('headline', e.target.value)} />
          </Field>
          <Field label={t('portfolio.email')} span={false}>
            <input className={inputCls} value={profile.email} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label={t('portfolio.phone')}>
            <input className={inputCls} value={profile.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label={t('portfolio.location')}>
            <input className={inputCls} value={profile.location} onChange={(e) => set('location', e.target.value)} />
          </Field>
          <Field label={t('portfolio.website')}>
            <input className={inputCls} value={profile.website} onChange={(e) => set('website', e.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t('portfolio.bio')}>
              <textarea className={`${inputCls} min-h-[80px]`} value={profile.bio} onChange={(e) => set('bio', e.target.value)} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label={t('portfolio.summary')}>
              <textarea className={`${inputCls} min-h-[120px]`} value={profile.summary} onChange={(e) => set('summary', e.target.value)} />
            </Field>
          </div>
        </div>
      </section>

      {/* Socials */}
      <section>
        <h3 className={sectionTitleCls}>{t('portfolio.socials')}</h3>
        <ListHeader title={t('portfolio.addSocial')} onAdd={addSocial} />
        <div className="flex flex-col gap-3">
          {profile.socials.length === 0 && (
            <EmptyHint text={t('portfolio.emptyHint')} />
          )}
          {profile.socials.map((s, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr_auto] gap-2 items-center">
              <input className={inputCls} placeholder={t('portfolio.socialPlatform')} value={s.platform} onChange={(e) => updateSocial(i, { platform: e.target.value })} />
              <input className={inputCls} placeholder={t('portfolio.socialUrl')} value={s.url} onChange={(e) => updateSocial(i, { url: e.target.value })} />
              <input className={inputCls} placeholder={t('portfolio.socialHandle')} value={s.handle} onChange={(e) => updateSocial(i, { handle: e.target.value })} />
              <RemoveButton onClick={() => removeSocial(i)} />
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className={sectionTitleCls}>{t('portfolio.skills')}</h3>
        <ListHeader title={t('portfolio.addSkill')} onAdd={addSkill} />
        <div className="flex flex-col gap-3">
          {profile.skills.length === 0 && <EmptyHint text={t('portfolio.emptyHint')} />}
          {profile.skills.map((s, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 items-center">
              <input className={inputCls} placeholder={t('portfolio.skillName')} value={s.name} onChange={(e) => updateSkill(i, { name: e.target.value })} />
              <input className={inputCls} placeholder={t('portfolio.skillCategory')} value={s.category} onChange={(e) => updateSkill(i, { category: e.target.value })} />
              <RemoveButton onClick={() => removeSkill(i)} />
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section>
        <h3 className={sectionTitleCls}>{t('portfolio.experience')}</h3>
        <ListHeader title={t('portfolio.addExperience')} onAdd={addExperience} />
        <div className="flex flex-col gap-5">
          {profile.experience.length === 0 && <EmptyHint text={t('portfolio.emptyHint')} />}
          {profile.experience.map((e, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 flex flex-col gap-3">
              <div className="flex justify-end">
                <RemoveButton onClick={() => removeExperience(i)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label={t('portfolio.role')}>
                  <input className={inputCls} value={e.role} onChange={(ev) => updateExperience(i, { role: ev.target.value })} />
                </Field>
                <Field label={t('portfolio.company')}>
                  <input className={inputCls} value={e.company} onChange={(ev) => updateExperience(i, { company: ev.target.value })} />
                </Field>
                <Field label={t('portfolio.startDate')}>
                  <input className={inputCls} value={e.startDate} onChange={(ev) => updateExperience(i, { startDate: ev.target.value })} />
                </Field>
                <Field label={t('portfolio.endDate')}>
                  <input
                    className={inputCls}
                    placeholder={t('portfolio.present')}
                    value={e.endDate ?? ''}
                    onChange={(ev) => updateExperience(i, { endDate: ev.target.value || null })}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label={t('portfolio.description')}>
                    <textarea className={`${inputCls} min-h-[70px]`} value={e.description} onChange={(ev) => updateExperience(i, { description: ev.target.value })} />
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h3 className={sectionTitleCls}>{t('portfolio.projects')}</h3>
        <ListHeader title={t('portfolio.addProject')} onAdd={addProject} />
        <div className="flex flex-col gap-5">
          {profile.projects.length === 0 && <EmptyHint text={t('portfolio.emptyHint')} />}
          {profile.projects.map((p, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 flex flex-col gap-3">
              <div className="flex justify-end">
                <RemoveButton onClick={() => removeProject(i)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label={t('portfolio.projectName')}>
                  <input className={inputCls} value={p.name} onChange={(ev) => updateProject(i, { name: ev.target.value })} />
                </Field>
                <Field label={t('portfolio.language')}>
                  <input className={inputCls} value={p.language} onChange={(ev) => updateProject(i, { language: ev.target.value })} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label={t('portfolio.description')}>
                    <textarea className={`${inputCls} min-h-[60px]`} value={p.description} onChange={(ev) => updateProject(i, { description: ev.target.value })} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label={t('portfolio.techStack')}>
                    <input
                      className={inputCls}
                      value={p.techStack.join(', ')}
                      onChange={(ev) =>
                        updateProject(i, { techStack: ev.target.value.split(',').map((x) => x.trim()).filter(Boolean) })
                      }
                    />
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 className={sectionTitleCls}>{t('portfolio.education')}</h3>
        <ListHeader title={t('portfolio.addEducation')} onAdd={addEducation} />
        <div className="flex flex-col gap-3">
          {profile.education.length === 0 && <EmptyHint text={t('portfolio.emptyHint')} />}
          {profile.education.map((e, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
              <input className={inputCls} placeholder={t('portfolio.institution')} value={e.institution} onChange={(ev) => updateEducation(i, { institution: ev.target.value })} />
              <input className={inputCls} placeholder={t('portfolio.degree')} value={e.degree} onChange={(ev) => updateEducation(i, { degree: ev.target.value })} />
              <input className={inputCls} placeholder="2019 - 2024" value={e.startDate && e.endDate ? `${e.startDate} - ${e.endDate}` : e.startDate} onChange={(ev) => {
                const parts = ev.target.value.split('-').map((x) => x.trim());
                updateEducation(i, { startDate: parts[0] || '', endDate: parts[1] || null });
              }} />
              <RemoveButton onClick={() => removeEducation(i)} />
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h3 className={sectionTitleCls}>{t('portfolio.certifications')}</h3>
        <ListHeader title={t('portfolio.addCertification')} onAdd={addCertification} />
        <div className="flex flex-col gap-3">
          {profile.certifications.length === 0 && <EmptyHint text={t('portfolio.emptyHint')} />}
          {profile.certifications.map((c, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto] gap-2 items-center">
              <input className={inputCls} placeholder={t('portfolio.certName')} value={c.name} onChange={(ev) => updateCertification(i, { name: ev.target.value })} />
              <input className={inputCls} placeholder={t('portfolio.issuer')} value={c.issuer} onChange={(ev) => updateCertification(i, { issuer: ev.target.value })} />
              <input className={inputCls} placeholder={t('portfolio.year')} value={c.year} onChange={(ev) => updateCertification(i, { year: ev.target.value })} />
              <RemoveButton onClick={() => removeCertification(i)} />
            </div>
          ))}
        </div>
      </section>

      {/* Theme */}
      <section>
        <h3 className={sectionTitleCls}>{t('portfolio.theme')}</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex gap-3">
            {['aurora', 'midnight', 'sunset', 'forest'].map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => set('theme', theme)}
                className={`w-10 h-10 rounded-full border-2 transition-transform ${
                  profile.theme === theme
                    ? 'border-emerald-500 scale-110 shadow-md'
                    : 'border-slate-300 dark:border-slate-700 hover:scale-105'
                }`}
                style={{ background: themeGradient(theme) }}
                aria-label={theme}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className={labelCls}>{t('portfolio.accentColor')}</label>
            <input
              type="color"
              value={profile.accentColor}
              onChange={(e) => set('accentColor', e.target.value)}
              className="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer bg-transparent"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

function Field({ label, children, span }: { label: string; children: React.ReactNode; span?: boolean }) {
  return (
    <label className={span ? 'sm:col-span-2 flex flex-col gap-1' : 'flex flex-col gap-1'}>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <p className="text-sm text-slate-400 dark:text-slate-500 italic px-1">{text}</p>
  );
}

function themeGradient(theme: string): string {
  const gradients: Record<string, string> = {
    aurora: 'linear-gradient(135deg, #6366F1, #22C55E)',
    midnight: 'linear-gradient(135deg, #0F172A, #334155)',
    sunset: 'linear-gradient(135deg, #F97316, #EF4444)',
    forest: 'linear-gradient(135deg, #16A34A, #84CC16)',
  };
  return gradients[theme] || gradients.aurora;
}
