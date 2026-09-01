import { describe, it, expect } from 'vitest';
import {
  mapPortfolioDtoToDomain,
  mapPortfolioToDto,
  PortfolioProfileDto,
} from './PortfolioDto';
import { createEmptyPortfolio } from '../../domain/entities/PortfolioContract';

const sampleDto: PortfolioProfileDto = {
  full_name: 'Ada Lovelace',
  headline: 'Engineer',
  bio: 'Bio text',
  email: 'ada@example.com',
  phone: '',
  location: 'London',
  website: 'https://ada.dev',
  avatar_url: '',
  socials: [{ platform: 'github', url: 'https://github.com/ada', handle: 'ada' }],
  summary: 'Summary',
  skills: [{ name: 'Python', category: 'Language', level: '' }],
  experience: [
    {
      company: 'Analytical Engines',
      role: 'Lead',
      start_date: '1843',
      end_date: null,
      location: '',
      description: 'Note G',
      highlights: ['Wrote Note G'],
    },
  ],
  education: [{ institution: 'UoL', degree: 'Maths', start_date: '1830', end_date: '1835', description: '' }],
  projects: [
    {
      name: 'Engine',
      description: 'A machine',
      url: '',
      source_url: 'https://github.com/ada/engine',
      tech_stack: ['math'],
      stars: 42,
      forks: 7,
      language: 'Python',
      is_featured: true,
    },
  ],
  certifications: [{ name: 'Cert', issuer: 'Royal', year: '1844', url: '' }],
  articles: [{ title: 'Note G', url: 'https://dev.to/ada/note-g', description: 'A post', published_at: '2024', tags: ['math'] }],
  stats: {
    total_repos: 10,
    total_stars: 42,
    total_forks: 7,
    followers: 100,
    following: 3,
    contributions_last_year: 365,
    coding_hours: 12.5,
    reputation: 0,
    articles_published: 1,
  },
  sections: [],
  theme: 'aurora',
  accent_color: '#8B5CF6',
  id: 'p1',
  user_id: 'temp-user-1',
  created_at: '2026-01-01T00:00:00',
  updated_at: '2026-01-01T00:00:00',
};

describe('PortfolioDto', () => {
  it('maps DTO to domain (snake_case → camelCase)', () => {
    const domain = mapPortfolioDtoToDomain(sampleDto);
    expect(domain.fullName).toBe('Ada Lovelace');
    expect(domain.socials[0].handle).toBe('ada');
    expect(domain.skills[0].category).toBe('Language');
    expect(domain.projects[0].stars).toBe(42);
    expect(domain.projects[0].techStack).toEqual(['math']);
    expect(domain.experience[0].endDate).toBeNull();
    expect(domain.stats.codingHours).toBe(12.5);
    expect(domain.articles[0].publishedAt).toBe('2024');
    expect(domain.accentColor).toBe('#8B5CF6');
  });

  it('maps domain back to DTO (round trip)', () => {
    const domain = mapPortfolioDtoToDomain(sampleDto);
    const dto = mapPortfolioToDto(domain);
    expect(dto.full_name).toBe('Ada Lovelace');
    expect(dto.skills[0].name).toBe('Python');
    expect(dto.projects[0].stars).toBe(42);
    expect(dto.stats.total_repos).toBe(10);
  });

  it('handles missing optional fields with defaults', () => {
    const minimal = { ...sampleDto, socials: [], skills: [], experience: [], stats: undefined as never };
    const domain = mapPortfolioDtoToDomain(minimal);
    expect(domain.socials).toEqual([]);
    expect(domain.skills).toEqual([]);
    expect(domain.stats.totalRepos).toBe(0);
  });

  it('handles empty portfolio', () => {
    const empty = createEmptyPortfolio('Nobody');
    const dto = mapPortfolioToDto(empty);
    expect(dto.full_name).toBe('Nobody');
    const back = mapPortfolioDtoToDomain(dto);
    expect(back.fullName).toBe('Nobody');
    expect(back.stats.totalRepos).toBe(0);
  });
});
