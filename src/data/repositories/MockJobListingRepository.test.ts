import { describe, it, expect } from 'vitest';
import { MockJobListingRepository } from './MockJobListingRepository';

describe('MockJobListingRepository', () => {
  it('returns all listings when no filters are provided', async () => {
    const repo = new MockJobListingRepository();
    const results = await repo.getFilteredListings();
    expect(results.length).toBeGreaterThanOrEqual(14);
  });

  it('filters by categoryId', async () => {
    const repo = new MockJobListingRepository();
    const results = await repo.getFilteredListings('cat-1');
    expect(results.every((j) => j.categoryId === 'cat-1')).toBe(true);
    expect(results.length).toBe(3);
  });

  it('filters by keyword in title (case-insensitive)', async () => {
    const repo = new MockJobListingRepository();
    const results = await repo.getFilteredListings(undefined, 'designer');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.every((j) => /designer/i.test(j.title))).toBe(true);
  });

  it('filters by keyword in company name', async () => {
    const repo = new MockJobListingRepository();
    const results = await repo.getFilteredListings(undefined, 'techcorp');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.every((j) => /techcorp/i.test(j.company))).toBe(true);
  });

  it('combines category and keyword filters', async () => {
    const repo = new MockJobListingRepository();
    const results = await repo.getFilteredListings('cat-1', 'frontend');
    expect(results.every((j) => j.categoryId === 'cat-1')).toBe(true);
    expect(results.every((j) => /frontend/i.test(j.title))).toBe(true);
  });

  it('returns empty array when no matches found', async () => {
    const repo = new MockJobListingRepository();
    const results = await repo.getFilteredListings(undefined, 'zzzznotexist');
    expect(results).toHaveLength(0);
  });

  it('handles empty keyword gracefully', async () => {
    const repo = new MockJobListingRepository();
    const results = await repo.getFilteredListings(undefined, '');
    expect(results.length).toBeGreaterThanOrEqual(14);
  });
});
