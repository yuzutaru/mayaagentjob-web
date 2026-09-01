/**
 * Pure TypeScript domain contract for Portfolio generation.
 * Mirrors the backend PortfolioProfile dataclass (mayaagentjob-backend-python).
 * Zero framework dependencies.
 */

export interface PortfolioSocialLink {
  readonly platform: string;
  readonly url: string;
  readonly handle: string;
}

export interface PortfolioWorkExperience {
  readonly company: string;
  readonly role: string;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly location: string;
  readonly description: string;
  readonly highlights: readonly string[];
}

export interface PortfolioEducation {
  readonly institution: string;
  readonly degree: string;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly description: string;
}

export interface PortfolioProject {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly sourceUrl: string;
  readonly techStack: readonly string[];
  readonly stars: number;
  readonly forks: number;
  readonly language: string;
  readonly isFeatured: boolean;
}

export interface PortfolioSkill {
  readonly name: string;
  readonly category: string;
  readonly level?: string;
}

export interface PortfolioCertification {
  readonly name: string;
  readonly issuer: string;
  readonly year: string;
  readonly url: string;
}

export interface PortfolioArticle {
  readonly title: string;
  readonly url: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly tags: readonly string[];
}

export interface PortfolioStats {
  readonly totalRepos: number;
  readonly totalStars: number;
  readonly totalForks: number;
  readonly followers: number;
  readonly following: number;
  readonly contributionsLastYear: number;
  readonly codingHours: number;
  readonly reputation: number;
  readonly articlesPublished: number;
}

export interface PortfolioSection {
  readonly key: string;
  readonly title: string;
  readonly visible: boolean;
  readonly order: number;
}

export interface PortfolioProfile {
  readonly fullName: string;
  readonly headline: string;
  readonly bio: string;
  readonly email: string;
  readonly phone: string;
  readonly location: string;
  readonly website: string;
  readonly avatarUrl: string;
  readonly socials: readonly PortfolioSocialLink[];
  readonly summary: string;
  readonly skills: readonly PortfolioSkill[];
  readonly experience: readonly PortfolioWorkExperience[];
  readonly education: readonly PortfolioEducation[];
  readonly projects: readonly PortfolioProject[];
  readonly certifications: readonly PortfolioCertification[];
  readonly articles: readonly PortfolioArticle[];
  readonly stats: PortfolioStats;
  readonly sections: readonly PortfolioSection[];
  readonly theme: string;
  readonly accentColor: string;
  readonly id: string;
  readonly userId: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export const EMPTY_PORTFOLIO_STATS: PortfolioStats = {
  totalRepos: 0,
  totalStars: 0,
  totalForks: 0,
  followers: 0,
  following: 0,
  contributionsLastYear: 0,
  codingHours: 0,
  reputation: 0,
  articlesPublished: 0,
};

export const createEmptyPortfolio = (fullName = ''): PortfolioProfile => ({
  fullName,
  headline: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  avatarUrl: '',
  socials: [],
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  articles: [],
  stats: EMPTY_PORTFOLIO_STATS,
  sections: [],
  theme: 'aurora',
  accentColor: '#6366F1',
  id: '',
  userId: 'temp-user-1',
  createdAt: '',
  updatedAt: '',
});

export const PORTFOLIO_PROVIDERS = [
  'github',
  'gitlab',
  'bitbucket',
  'devto',
  'stackoverflow',
  'wakatime',
  'linkedin-pdf',
] as const;

export type PortfolioProvider = (typeof PORTFOLIO_PROVIDERS)[number];
