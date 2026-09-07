import { PortfolioProfile } from '../../../domain/entities/PortfolioContract';
import { loadCvTemplateSkeleton } from './resumeTemplates';

/**
 * TypeScript twin of the backend `resume_template_renderer.py`.
 * Both produce byte-identical HTML fragments for the same profile data so the
 * browser preview matches the WeasyPrint PDF. Locked together by golden tests
 * (`__fixtures__/*.golden.html`).
 */

export const EMPTY_FRAGMENT = '';

function esc(value: string | null | undefined): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function contact(profile: PortfolioProfile): string {
  const pieces = [profile.email, profile.phone, profile.location, profile.website].filter(Boolean);
  if (!pieces.length) return EMPTY_FRAGMENT;
  return `<p class="contact">${pieces.map((p) => esc(p)).join(' | ')}</p>`;
}

function summary(profile: PortfolioProfile): string {
  const text = profile.summary || profile.bio;
  if (!text) return EMPTY_FRAGMENT;
  return (
    '<section class="summary">' +
    '<h2 class="block-title">Profile</h2>' +
    `<p>${esc(text)}</p>` +
    '</section>'
  );
}

function skills(profile: PortfolioProfile): string {
  if (!profile.skills.length) return EMPTY_FRAGMENT;
  const groups = new Map<string, string[]>();
  for (const skill of profile.skills) {
    const key = skill.category || 'Skills';
    const list = groups.get(key) ?? [];
    list.push(skill.name);
    groups.set(key, list);
  }
  let body = '';
  for (const [category, names] of groups) {
    body +=
      '<div class="skill-group">' +
      `<h3 class="skill-cat">${esc(category)}</h3>` +
      `<p class="skill-list">${names.map((n) => esc(n)).join(', ')}</p>` +
      '</div>';
  }
  return '<section class="skills"><h2 class="block-title">Skills</h2>' + body + '</section>';
}

function experience(profile: PortfolioProfile): string {
  if (!profile.experience.length) return EMPTY_FRAGMENT;
  let items = '';
  for (const exp of profile.experience) {
    const end = exp.endDate || 'Present';
    const date = `<span class="exp-date">${esc(exp.startDate)} - ${esc(end)}</span>`;
    const head =
      '<div class="exp-head">' +
      `<h3 class="exp-role">${esc(exp.role)}</h3>` +
      date +
      '</div>';
    let company = `<p class="exp-company">${esc(exp.company)}`;
    if (exp.location) company += ` | ${esc(exp.location)}`;
    company += '</p>';
    const desc = exp.description ? `<p class="exp-desc">${esc(exp.description)}</p>` : '';
    const bullets = exp.highlights.length
      ? `<ul class="exp-bullets">${exp.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>`
      : '';
    items += `<article class="exp-item">${head}${company}${desc}${bullets}</article>`;
  }
  return '<section class="experience"><h2 class="block-title">Experience</h2>' + items + '</section>';
}

function education(profile: PortfolioProfile): string {
  if (!profile.education.length) return EMPTY_FRAGMENT;
  let items = '';
  for (const edu of profile.education) {
    let meta = `<p class="edu-meta">${esc(edu.institution)}`;
    if (edu.startDate || edu.endDate) {
      const end = edu.endDate || 'Present';
      meta += ` | ${esc(edu.startDate)} - ${esc(end)}`;
    }
    meta += '</p>';
    const desc = edu.description ? `<p class="edu-desc">${esc(edu.description)}</p>` : '';
    items +=
      '<article class="edu-item">' +
      `<h3 class="edu-degree">${esc(edu.degree)}</h3>` +
      meta +
      desc +
      '</article>';
  }
  return '<section class="education"><h2 class="block-title">Education</h2>' + items + '</section>';
}

function certifications(profile: PortfolioProfile): string {
  if (!profile.certifications.length) return EMPTY_FRAGMENT;
  let lis = '';
  for (const cert of profile.certifications) {
    let label = esc(cert.name);
    const suffix = [esc(cert.issuer), esc(cert.year)].filter(Boolean).join(', ');
    if (suffix) label += ` (${suffix})`;
    lis += `<li>${label}</li>`;
  }
  return (
    '<section class="certifications">' +
    '<h2 class="block-title">Certifications</h2>' +
    `<ul class="cert-list">${lis}</ul>` +
    '</section>'
  );
}

export function buildResumeFragments(profile: PortfolioProfile): Record<string, string> {
  return {
    name: esc(profile.fullName) || 'Your Name',
    headline: esc(profile.headline),
    contact: contact(profile),
    summary: summary(profile),
    skills: skills(profile),
    experience: experience(profile),
    education: education(profile),
    certifications: certifications(profile),
  };
}

export function renderResumeHtml(templateId: string, profile: PortfolioProfile): string {
  const skeleton = loadCvTemplateSkeleton(templateId);
  const fragments = buildResumeFragments(profile);
  let out = skeleton;
  for (const [key, value] of Object.entries(fragments)) {
    out = out.split(`{{${key}}}`).join(value);
  }
  return out;
}
