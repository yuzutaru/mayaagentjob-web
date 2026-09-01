import { IPortfolioRepository } from '../../domain/repositories/IPortfolioRepository';
import { PortfolioProfile, createEmptyPortfolio } from '../../domain/entities/PortfolioContract';
import { samplePortfolio } from '../mock/portfolioMockData';

const SIMULATED_DELAY_MS = 600;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function mergeInto(base: PortfolioProfile, partial: Partial<PortfolioProfile>): PortfolioProfile {
  return {
    ...base,
    ...partial,
    stats: { ...base.stats, ...(partial.stats || {}) },
    socials: [...(partial.socials ?? base.socials)],
    skills: [...(partial.skills ?? base.skills)],
    projects: [...(partial.projects ?? base.projects)],
    experience: [...(partial.experience ?? base.experience)],
    education: [...(partial.education ?? base.education)],
    certifications: [...(partial.certifications ?? base.certifications)],
    articles: [...(partial.articles ?? base.articles)],
  };
}

/**
 * Offline demo repository. Behaves like the backend API but resolves
 * from local mock data with a simulated network delay.
 */
export class MockPortfolioRepository implements IPortfolioRepository {
  private readonly saved = new Map<string, PortfolioProfile>();
  private nextId = 100;

  async importFromProvider(provider: string, username: string, apiKey?: string): Promise<PortfolioProfile> {
    await wait(SIMULATED_DELAY_MS);
    return mergeInto(createEmptyPortfolio(), {
      fullName: username
        .split(/[-_.]/)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' '),
      headline: 'Software Developer',
      summary: `Portfolio imported from ${provider} for @${username}. Edit this summary to tell your story.`,
      avatarUrl: '',
      socials: [{ platform: provider, url: `https://${provider}.com/${username}`, handle: username }],
      stats: {
        totalRepos: 24,
        totalStars: 156,
        totalForks: 33,
        followers: 120,
        following: 80,
        contributionsLastYear: 412,
        codingHours: 0,
        reputation: 0,
        articlesPublished: 0,
      },
      skills: [
        { name: 'TypeScript', category: 'Language' },
        { name: 'Python', category: 'Language' },
        { name: 'JavaScript', category: 'Language' },
        { name: 'React', category: 'Framework' },
        { name: 'Node.js', category: 'Framework' },
        { name: 'Docker', category: 'Tooling' },
      ],
      projects: [
        {
          name: 'awesome-project',
          description: `A showcase project from @${username} — edit me with a real description.`,
          url: '',
          sourceUrl: `https://${provider}.com/${username}/awesome-project`,
          techStack: ['TypeScript', 'React'],
          stars: 42,
          forks: 7,
          language: 'TypeScript',
          isFeatured: true,
        },
      ],
    });
  }

  async importLinkedInPdf(file: File): Promise<PortfolioProfile> {
    await wait(SIMULATED_DELAY_MS);
    const nameFromFile = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    return mergeInto(createEmptyPortfolio(), {
      fullName: nameFromFile || 'Candidate Name',
      headline: 'Software Engineer',
      summary: 'Imported from your LinkedIn PDF export. Review and refine the extracted details below.',
      skills: [
        { name: 'JavaScript', category: 'Language' },
        { name: 'React', category: 'Framework' },
        { name: 'SQL', category: 'Data' },
        { name: 'AWS', category: 'Cloud' },
      ],
    });
  }

  async save(profile: PortfolioProfile): Promise<PortfolioProfile> {
    await wait(SIMULATED_DELAY_MS);
    const id = profile.id || `mock-portfolio-${this.nextId++}`;
    const saved: PortfolioProfile = {
      ...profile,
      id,
      userId: profile.userId || 'temp-user-1',
      createdAt: profile.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saved.set(id, saved);
    return saved;
  }

  async listByUser(userId?: string): Promise<PortfolioProfile[]> {
    await wait(SIMULATED_DELAY_MS);
    return [...this.saved.values()].filter((p) => !userId || p.userId === userId);
  }

  async getById(id: string): Promise<PortfolioProfile | null> {
    await wait(100);
    return this.saved.get(id) ?? null;
  }

  async delete(id: string): Promise<void> {
    await wait(100);
    this.saved.delete(id);
  }

  async exportPdf(profile: PortfolioProfile): Promise<Blob> {
    await wait(300);
    return new Blob(['%PDF-1.4 mock portfolio export'], { type: 'application/pdf' });
  }

  async exportHtml(profile: PortfolioProfile): Promise<string> {
    await wait(300);
    return `<!DOCTYPE html><html><head><title>${profile.fullName}</title></head><body><h1>${profile.fullName}</h1><p>${profile.summary}</p></body></html>`;
  }
}

export const createSampleMockRepository = (): MockPortfolioRepository => {
  const repo = new MockPortfolioRepository();
  repo.save(samplePortfolio).catch(() => undefined);
  return repo;
};
