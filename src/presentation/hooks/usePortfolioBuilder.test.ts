import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { usePortfolioBuilder, DEFAULT_DRAFT_KEY } from './usePortfolioBuilder';
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

  it('persists edits as a draft and restores them on remount', () => {
    const first = renderHook(() => usePortfolioBuilder(repository));
    act(() => first.result.current.updateProfile({ fullName: 'Ada', headline: 'Engineer' }));
    expect(JSON.parse(localStorage.getItem(DEFAULT_DRAFT_KEY) ?? '{}').fullName).toBe('Ada');
    first.unmount();

    const second = renderHook(() => usePortfolioBuilder(repository));
    expect(second.result.current.profile.fullName).toBe('Ada');
    expect(second.result.current.profile.headline).toBe('Engineer');
    expect(second.result.current.draftRestored).toBe(true);
  });

  it('starts empty and not restored when no draft exists', () => {
    const { result } = renderHook(() => usePortfolioBuilder(repository));
    expect(result.current.profile.fullName).toBe('');
    expect(result.current.draftRestored).toBe(false);
  });

  it('falls back to an empty profile when the stored draft is invalid JSON', () => {
    localStorage.setItem(DEFAULT_DRAFT_KEY, '{not valid json');
    const { result } = renderHook(() => usePortfolioBuilder(repository));
    expect(result.current.profile.fullName).toBe('');
    expect(result.current.draftRestored).toBe(false);
  });

  it('ignores an empty stored draft so no restore notice is shown', () => {
    localStorage.setItem(DEFAULT_DRAFT_KEY, JSON.stringify({ fullName: '' }));
    const { result } = renderHook(() => usePortfolioBuilder(repository));
    expect(result.current.draftRestored).toBe(false);
  });

  it('clears the stored draft on reset', () => {
    const { result } = renderHook(() => usePortfolioBuilder(repository));
    act(() => result.current.updateProfile({ fullName: 'Ada' }));
    expect(localStorage.getItem(DEFAULT_DRAFT_KEY)).toBeTruthy();
    act(() => result.current.resetProfile());
    expect(localStorage.getItem(DEFAULT_DRAFT_KEY)).toBeNull();
    expect(result.current.profile.fullName).toBe('');
  });

  it('clears the unsaved-changes flag after a successful save', async () => {
    const { result } = renderHook(() => usePortfolioBuilder(repository));
    act(() => result.current.updateProfile({ fullName: 'Ada' }));
    expect(result.current.hasUnsavedChanges).toBe(true);
    act(() => {
      result.current.saveProfile();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.hasUnsavedChanges).toBe(false);
  });
});
