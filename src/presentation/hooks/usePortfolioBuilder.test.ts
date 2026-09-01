import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { usePortfolioBuilder } from './usePortfolioBuilder';
import { MockPortfolioRepository } from '../../data/repositories/MockPortfolioRepository';
import { IPortfolioRepository } from '../../domain/repositories/IPortfolioRepository';

describe('usePortfolioBuilder', () => {
  let repository: IPortfolioRepository;

  beforeEach(() => {
    repository = new MockPortfolioRepository();
  });

  it('starts with an empty portfolio', () => {
    const { result } = renderHook(() => usePortfolioBuilder(repository));
    expect(result.current.profile.fullName).toBe('');
    expect(result.current.profile.stats.totalRepos).toBe(0);
  });

  it('updates the profile', async () => {
    const { result } = renderHook(() => usePortfolioBuilder(repository));
    act(() => result.current.updateProfile({ fullName: 'Ada' }));
    expect(result.current.profile.fullName).toBe('Ada');
  });

  it('imports from a provider and clears loading', async () => {
    const { result } = renderHook(() => usePortfolioBuilder(repository));

    act(() => {
      result.current.importFromProvider('github', 'alex');
    });
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.profile.fullName).toBe('Alex');
    expect(result.current.notice).toContain('alex');
  });

  it('records an error on failure', async () => {
    const failingRepo: IPortfolioRepository = {
      ...repository,
      importFromProvider: async () => {
        throw new Error('Network down');
      },
    } as IPortfolioRepository;

    const { result } = renderHook(() => usePortfolioBuilder(failingRepo));
    act(() => {
      result.current.importFromProvider('github', 'x');
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBe('Network down');
  });

  it('saves the profile', async () => {
    const { result } = renderHook(() => usePortfolioBuilder(repository));
    act(() => result.current.updateProfile({ fullName: 'Ada' }));
    act(() => {
      result.current.saveProfile();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.profile.id).toBeTruthy();
    expect(result.current.notice).toBe('Portfolio saved.');
  });
});
