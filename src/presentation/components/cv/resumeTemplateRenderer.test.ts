import { describe, it, expect } from 'vitest';
import { createEmptyPortfolio, PortfolioProfile } from '../../../domain/entities/PortfolioContract';
import { renderResumeHtml, buildResumeFragments } from './resumeTemplateRenderer';
import { CV_TEMPLATE_IDS } from './resumeTemplates';
import apolloGolden from './__fixtures__/apollo.golden.html?raw';
import atsClassicGolden from './__fixtures__/ats-classic.golden.html?raw';
import atsMinimalGolden from './__fixtures__/ats-minimal.golden.html?raw';
import tempeGolden from './__fixtures__/tempe.golden.html?raw';
import terraGolden from './__fixtures__/terra.golden.html?raw';

const GOLDEN: Record<string, string> = {
  'ats-minimal': atsMinimalGolden,
  'ats-classic': atsClassicGolden,
  apollo: apolloGolden,
  terra: terraGolden,
  tempe: tempeGolden,
};

function goldenSample(): PortfolioProfile {
  return {
    ...createEmptyPortfolio(),
    fullName: 'James Appleseed',
    headline: 'Senior Software Engineer',
    email: 'james@example.com',
    phone: '(555) 555-5555',
    location: 'Jakarta, ID',
    website: 'james.dev',
    summary: 'Experienced engineer passionate about clean architecture and developer tooling.',
    skills: [
      { name: 'TypeScript', category: 'Language' },
      { name: 'Python', category: 'Language' },
      { name: 'React', category: 'Framework' },
    ],
    experience: [
      {
        company: 'Barnes & Noble',
        role: 'Senior Engineer',
        startDate: '04/2016',
        endDate: null,
        location: 'New York',
        description: 'Led checkout systems.',
        highlights: ['Open and close the registers', 'Mentored juniors'],
      },
    ],
    education: [
      { institution: 'MIT', degree: 'BSc', startDate: '2012', endDate: '2016', description: '' },
    ],
    certifications: [{ name: 'AWS SA', issuer: 'Amazon', year: '2021', url: '' }],
  };
}

describe('resumeTemplateRenderer (web twin)', () => {
  it('matches the backend golden files for every template', () => {
    const profile = goldenSample();
    for (const id of CV_TEMPLATE_IDS) {
      expect(renderResumeHtml(id, profile)).toBe(GOLDEN[id]);
    }
  });

  it('emits no unresolved placeholders', () => {
    const html = renderResumeHtml('apollo', goldenSample());
    expect(html).not.toMatch(/\{\{|\}\}/);
  });

  it('escapes user content identically to the backend', () => {
    const profile = {
      ...createEmptyPortfolio(),
      fullName: "<script>alert(1)</script>",
      summary: 'Danger "quoted" & <b>bold</b>',
    };
    const html = renderResumeHtml('ats-minimal', profile);
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&quot;quoted&quot;');
    expect(html).toContain('&amp;');
  });

  it('omits empty sections', () => {
    const profile = { ...createEmptyPortfolio(), fullName: 'Ada Lovelace', headline: 'Engineer' };
    const html = renderResumeHtml('apollo', profile);
    expect(html).toContain('Ada Lovelace');
    for (const heading of ['Experience', 'Skills', 'Certifications']) {
      expect(html).not.toContain(heading);
    }
  });

  it('builds the documented fragment contract', () => {
    const fragments = buildResumeFragments(goldenSample());
    expect(Object.keys(fragments).sort()).toEqual([
      'certifications', 'contact', 'education', 'experience',
      'headline', 'name', 'skills', 'summary',
    ]);
    expect(fragments.contact).toContain('james@example.com');
  });
});
