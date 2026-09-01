import React from 'react';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import { PortfolioProfile } from '../../../domain/entities/PortfolioContract';

interface PortfolioPreviewProps {
  profile: PortfolioProfile;
}

const initials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ profile }) => {
  const { t } = useTranslation();
  const accent = profile.accentColor || '#6366F1';
  const themeBg = themeBackground(profile.theme);

  const skillsByCategory: Record<string, string[]> = {};
  profile.skills.forEach((s) => {
    (skillsByCategory[s.category || 'Skills'] = skillsByCategory[s.category || 'Skills'] || []).push(s.name);
  });

  const stats = [
    { label: 'Repos', value: profile.stats.totalRepos },
    { label: 'Stars', value: profile.stats.totalStars },
    { label: 'Followers', value: profile.stats.followers },
    { label: 'Contrib.', value: profile.stats.contributionsLastYear },
    { label: 'Coding hrs', value: Math.round(profile.stats.codingHours) },
  ].filter((s) => s.value > 0);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl transition-colors"
      style={{ background: themeBg }}
    >
      {/* Nav */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-white/10 backdrop-blur sticky top-0" style={{ background: 'rgba(9,10,15,0.75)' }}>
        <span className="font-extrabold text-white text-sm">{profile.fullName || 'Your Name'}</span>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
          <span>About</span>
          <span>Skills</span>
          <span>Projects</span>
          <span className="hidden sm:inline">Contact</span>
          <span className="w-7 h-7 rounded-lg border border-white/15 inline-flex items-center justify-center">☀</span>
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 py-10 sm:px-10" style={{ background: themeHero(accent, themeBg) }}>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
              Hello, I'm
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              {profile.fullName || 'Your Name'}
            </h1>
            <p className="mt-1 text-slate-300 font-medium">{profile.headline || 'Software Developer'}</p>
            {profile.bio && <p className="mt-3 text-sm text-slate-400 max-w-md">{profile.bio}</p>}
          </div>
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-4xl font-extrabold text-white shrink-0"
            style={{ background: `linear-gradient(135deg, ${accent}, ${lighten(accent)})`, boxShadow: '0 18px 40px -12px rgba(0,0,0,0.5)' }}
          >
            {initials(profile.fullName)}
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="border-t border-b border-white/10 px-6 py-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-extrabold text-white">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wide text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {(profile.summary || profile.bio) && (
        <Section label="About">
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">{profile.summary || profile.bio}</p>
        </Section>
      )}

      {/* Skills */}
      {Object.keys(skillsByCategory).length > 0 && (
        <Section label="Skills">
          <div className="flex flex-col gap-4">
            {Object.entries(skillsByCategory).map(([category, names]) => (
              <div key={category}>
                <h4 className="text-[11px] uppercase tracking-wider text-slate-400 mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {names.map((n) => (
                    <span key={n} className="text-xs font-semibold px-3 py-1.5 rounded-full border" style={{ color: accent, borderColor: accent, background: `${accent}14` }}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <Section label="Experience">
          <div className="flex flex-col gap-5 border-l-2 border-white/10 pl-5 ml-1">
            {profile.experience.map((e, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full" style={{ background: accent, boxShadow: `0 0 0 4px ${accent}33` }} />
                <h3 className="text-white font-bold text-sm">{e.role}</h3>
                <div className="text-xs mt-0.5">
                  <span style={{ color: accent }} className="font-semibold">{e.company}</span>
                  <span className="text-slate-400"> · {e.startDate} - {e.endDate || t('portfolio.present')}</span>
                </div>
                {e.description && <p className="text-sm text-slate-300 mt-1.5">{e.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {profile.projects.length > 0 && (
        <Section label="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.projects.map((p, i) => (
              <div key={i} className="rounded-2xl p-5 border border-white/10 bg-white/[0.04] flex flex-col gap-2 hover:-translate-y-0.5 transition-transform">
                {p.language && <div className="text-xs font-bold" style={{ color: accent }}>{p.language}</div>}
                <h3 className="text-white font-bold text-sm">{p.name}</h3>
                {p.description && <p className="text-xs text-slate-400 flex-1">{p.description}</p>}
                {p.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.techStack.slice(0, 6).map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 text-[11px] text-slate-400 mt-1">
                  {p.stars > 0 && <span>⭐ {p.stars}</span>}
                  {p.forks > 0 && <span>⑂ {p.forks}</span>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <Section label="Education">
          {profile.education.map((e, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-white font-bold text-sm">{e.degree}</h3>
              <div className="text-xs text-slate-400">{e.institution} · {e.startDate} - {e.endDate || t('portfolio.present')}</div>
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {profile.certifications.length > 0 && (
        <Section label="Certifications">
          {profile.certifications.map((c, i) => (
            <div key={i} className="mb-3">
              <h3 className="text-white font-bold text-sm">{c.name}</h3>
              <div className="text-xs text-slate-400">{[c.issuer, c.year].filter(Boolean).join(' · ')}</div>
            </div>
          ))}
        </Section>
      )}

      {/* Footer */}
      <div className="px-6 py-8 text-center border-t border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <h3 className="text-white font-bold text-base mb-1">Let's connect</h3>
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {profile.socials.length > 0 ? (
            profile.socials.map((s, i) => (
              <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300">
                {s.platform}
              </span>
            ))
          ) : profile.email ? (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300">{profile.email}</span>
          ) : null}
        </div>
        <div className="text-[11px] text-slate-500 mt-4">© {profile.fullName || 'Your Name'} · Built with Maya</div>
      </div>
    </div>
  );
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-6 py-7 sm:px-10 border-b border-white/10">
      <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{label}</div>
      {children}
    </div>
  );
}

function themeBackground(theme: string): string {
  const backgrounds: Record<string, string> = {
    aurora: '#090a0f',
    midnight: '#0b1220',
    sunset: '#170b09',
    forest: '#08140d',
  };
  return backgrounds[theme] || backgrounds.aurora;
}

function themeHero(accent: string, bg: string): string {
  return `radial-gradient(1200px 400px at 80% -10%, ${accent}30, transparent 60%), radial-gradient(900px 400px at 0% 20%, ${lighten(accent)}22, transparent 55%), ${bg}`;
}

function lighten(hex: string): string {
  try {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    const mix = (c: number) => Math.min(255, Math.round(c + (255 - c) * 0.35));
    return `#${mix(r).toString(16).padStart(2, '0')}${mix(g).toString(16).padStart(2, '0')}${mix(b).toString(16).padStart(2, '0')}`;
  } catch {
    return '#A78BFA';
  }
}
