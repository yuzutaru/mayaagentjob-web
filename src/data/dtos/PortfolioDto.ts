/**
 * Data Transfer Objects for the Portfolio API.
 * Field names match the backend OpenAPI spec (snake_case).
 * Mappers convert between DTO and pure Domain entities.
 */

import {
  PortfolioProfile,
  PortfolioSkill,
  PortfolioProject,
  PortfolioSocialLink,
  PortfolioStats,
  PortfolioWorkExperience,
  PortfolioEducation,
  PortfolioCertification,
  PortfolioArticle,
  PortfolioSection,
  EMPTY_PORTFOLIO_STATS,
} from '../../domain/entities/PortfolioContract';

export interface PortfolioSocialLinkDto {
  platform: string;
  url: string;
  handle: string;
}

export interface PortfolioWorkExperienceDto {
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  location: string;
  description: string;
  highlights: string[];
}

export interface PortfolioEducationDto {
  institution: string;
  degree: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export interface PortfolioProjectDto {
  name: string;
  description: string;
  url: string;
  source_url: string;
  tech_stack: string[];
  stars: number;
  forks: number;
  language: string;
  is_featured: boolean;
}

export interface PortfolioSkillDto {
  name: string;
  category: string;
  level: string;
}

export interface PortfolioCertificationDto {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export interface PortfolioArticleDto {
  title: string;
  url: string;
  description: string;
  published_at: string;
  tags: string[];
}

export interface PortfolioStatsDto {
  total_repos: number;
  total_stars: number;
  total_forks: number;
  followers: number;
  following: number;
  contributions_last_year: number;
  coding_hours: number;
  reputation: number;
  articles_published: number;
}

export interface PortfolioSectionDto {
  key: string;
  title: string;
  visible: boolean;
  order: number;
}

export interface PortfolioProfileDto {
  full_name: string;
  headline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  avatar_url: string;
  socials: PortfolioSocialLinkDto[];
  summary: string;
  skills: PortfolioSkillDto[];
  experience: PortfolioWorkExperienceDto[];
  education: PortfolioEducationDto[];
  projects: PortfolioProjectDto[];
  certifications: PortfolioCertificationDto[];
  articles: PortfolioArticleDto[];
  stats: PortfolioStatsDto;
  sections: PortfolioSectionDto[];
  theme: string;
  accent_color: string;
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const num = (v: unknown): number => (typeof v === 'number' ? v : Number(v) || 0);

const mapStats = (dto?: PortfolioStatsDto | null): PortfolioStats => {
  if (!dto) return EMPTY_PORTFOLIO_STATS;
  return {
    totalRepos: num(dto.total_repos),
    totalStars: num(dto.total_stars),
    totalForks: num(dto.total_forks),
    followers: num(dto.followers),
    following: num(dto.following),
    contributionsLastYear: num(dto.contributions_last_year),
    codingHours: num(dto.coding_hours),
    reputation: num(dto.reputation),
    articlesPublished: num(dto.articles_published),
  };
};

export const mapPortfolioDtoToDomain = (dto: PortfolioProfileDto): PortfolioProfile => ({
  fullName: dto.full_name || '',
  headline: dto.headline || '',
  bio: dto.bio || '',
  email: dto.email || '',
  phone: dto.phone || '',
  location: dto.location || '',
  website: dto.website || '',
  avatarUrl: dto.avatar_url || '',
  socials: (dto.socials || []).map((s): PortfolioSocialLink => ({ platform: s.platform, url: s.url, handle: s.handle })),
  summary: dto.summary || '',
  skills: (dto.skills || []).map((s): PortfolioSkill => ({ name: s.name, category: s.category, level: s.level })),
  experience: (dto.experience || []).map((e): PortfolioWorkExperience => ({
    company: e.company,
    role: e.role,
    startDate: e.start_date || '',
    endDate: e.end_date ?? null,
    location: e.location || '',
    description: e.description || '',
    highlights: e.highlights || [],
  })),
  education: (dto.education || []).map((e): PortfolioEducation => ({
    institution: e.institution,
    degree: e.degree,
    startDate: e.start_date || '',
    endDate: e.end_date ?? null,
    description: e.description || '',
  })),
  projects: (dto.projects || []).map((p): PortfolioProject => ({
    name: p.name,
    description: p.description || '',
    url: p.url || '',
    sourceUrl: p.source_url || '',
    techStack: p.tech_stack || [],
    stars: num(p.stars),
    forks: num(p.forks),
    language: p.language || '',
    isFeatured: Boolean(p.is_featured),
  })),
  certifications: (dto.certifications || []).map((c): PortfolioCertification => ({
    name: c.name,
    issuer: c.issuer || '',
    year: c.year || '',
    url: c.url || '',
  })),
  articles: (dto.articles || []).map((a): PortfolioArticle => ({
    title: a.title,
    url: a.url || '',
    description: a.description || '',
    publishedAt: a.published_at || '',
    tags: a.tags || [],
  })),
  stats: mapStats(dto.stats),
  sections: (dto.sections || []).map((s): PortfolioSection => ({
    key: s.key,
    title: s.title || '',
    visible: s.visible !== false,
    order: num(s.order),
  })),
  theme: dto.theme || 'aurora',
  accentColor: dto.accent_color || '#6366F1',
  id: dto.id || '',
  userId: dto.user_id || '',
  createdAt: dto.created_at || '',
  updatedAt: dto.updated_at || '',
});

export const mapPortfolioToDto = (profile: PortfolioProfile): PortfolioProfileDto => ({
  full_name: profile.fullName,
  headline: profile.headline,
  bio: profile.bio,
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
  website: profile.website,
  avatar_url: profile.avatarUrl,
  socials: profile.socials.map((s) => ({ platform: s.platform, url: s.url, handle: s.handle })),
  summary: profile.summary,
  skills: profile.skills.map((s) => ({ name: s.name, category: s.category, level: s.level || '' })),
  experience: profile.experience.map((e) => ({
    company: e.company,
    role: e.role,
    start_date: e.startDate,
    end_date: e.endDate,
    location: e.location,
    description: e.description,
    highlights: [...e.highlights],
  })),
  education: profile.education.map((e) => ({
    institution: e.institution,
    degree: e.degree,
    start_date: e.startDate,
    end_date: e.endDate,
    description: e.description,
  })),
  projects: profile.projects.map((p) => ({
    name: p.name,
    description: p.description,
    url: p.url,
    source_url: p.sourceUrl,
    tech_stack: [...p.techStack],
    stars: p.stars,
    forks: p.forks,
    language: p.language,
    is_featured: p.isFeatured,
  })),
  certifications: profile.certifications.map((c) => ({
    name: c.name,
    issuer: c.issuer,
    year: c.year,
    url: c.url,
  })),
  articles: profile.articles.map((a) => ({
    title: a.title,
    url: a.url,
    description: a.description,
    published_at: a.publishedAt,
    tags: [...a.tags],
  })),
  stats: {
    total_repos: profile.stats.totalRepos,
    total_stars: profile.stats.totalStars,
    total_forks: profile.stats.totalForks,
    followers: profile.stats.followers,
    following: profile.stats.following,
    contributions_last_year: profile.stats.contributionsLastYear,
    coding_hours: profile.stats.codingHours,
    reputation: profile.stats.reputation,
    articles_published: profile.stats.articlesPublished,
  },
  sections: profile.sections.map((s) => ({ key: s.key, title: s.title, visible: s.visible, order: s.order })),
  theme: profile.theme,
  accent_color: profile.accentColor,
  id: profile.id,
  user_id: profile.userId,
  created_at: profile.createdAt,
  updated_at: profile.updatedAt,
});
