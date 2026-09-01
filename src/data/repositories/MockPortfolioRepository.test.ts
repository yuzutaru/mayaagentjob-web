import { describe, it, expect } from 'vitest';
import { MockPortfolioRepository } from './MockPortfolioRepository';
import { createEmptyPortfolio } from '../../domain/entities/PortfolioContract';

describe('MockPortfolioRepository', () => {
  const repo = new MockPortfolioRepository();

  it('imports a provider profile', async () => {
    const profile = await repo.importFromProvider('github', 'alex');
    expect(profile.fullName).toBe('Alex');
    expect(profile.socials[0].platform).toBe('github');
    expect(profile.projects.length).toBeGreaterThan(0);
  });

  it('imports a linkedin pdf name', async () => {
    const profile = await repo.importLinkedInPdf({ name: 'Ada-Lovelace.pdf' } as File);
    expect(profile.fullName).toBe('Ada Lovelace');
  });

  it('saves, lists, gets, deletes', async () => {
    const profile = createEmptyPortfolio('Ada');
    const saved = await repo.save(profile);
    expect(saved.id).toBeTruthy();

    const listed = await repo.listByUser();
    expect(listed.some((p) => p.id === saved.id)).toBe(true);

    const fetched = await repo.getById(saved.id);
    expect(fetched?.fullName).toBe('Ada');

    await repo.delete(saved.id);
    expect(await repo.getById(saved.id)).toBeNull();
  });

  it('exports pdf as blob and html as string', async () => {
    const profile = createEmptyPortfolio('Ada');
    const blob = await repo.exportPdf(profile);
    expect(blob.type).toBe('application/pdf');

    const html = await repo.exportHtml(profile);
    expect(html).toContain('Ada');
  });
});
