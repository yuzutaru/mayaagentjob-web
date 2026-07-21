import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useJobListings } from './useJobListings';
import { IJobListingRepository } from '../../domain/repositories/JobListingRepository';
import { JobListing } from '../../domain/entities/JobListing';

const makeJob = (id: string): JobListing => ({
  jobId: id, title: `Job ${id}`, company: 'Co',
  arrangement: 'Remote', location: 'Jakarta', categoryId: 'cat-1',
  matchScore: 80, aiSummaryBullets: [],
});

const mockJobs: JobListing[] = Array.from({ length: 20 }, (_, i) => makeJob(`j${i + 1}`));

const mockRepo: IJobListingRepository = {
  getFilteredListings: vi.fn().mockResolvedValue(mockJobs),
};

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useJobListings', () => {
  it('loads jobs on mount', async () => {
    const { result } = renderHook(() => useJobListings(mockRepo));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.totalCount).toBe(20);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.page).toBe(1);
    expect(result.current.jobs).toHaveLength(9);
    expect(result.current.error).toBeNull();
  });

  it('returns correct slice for page 1', async () => {
    const { result } = renderHook(() => useJobListings(mockRepo));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.jobs[0].jobId).toBe('j1');
    expect(result.current.jobs[8].jobId).toBe('j9');
  });

  it('returns correct slice after setPage(2)', async () => {
    const { result } = renderHook(() => useJobListings(mockRepo));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => { result.current.setPage(2); });

    expect(result.current.page).toBe(2);
    expect(result.current.jobs).toHaveLength(9);
    expect(result.current.jobs[0].jobId).toBe('j10');
    expect(result.current.jobs[8].jobId).toBe('j18');
  });

  it('returns correct slice for last page (page 3)', async () => {
    const { result } = renderHook(() => useJobListings(mockRepo));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => { result.current.setPage(3); });

    expect(result.current.page).toBe(3);
    expect(result.current.jobs).toHaveLength(2);
    expect(result.current.jobs[0].jobId).toBe('j19');
    expect(result.current.jobs[1].jobId).toBe('j20');
  });

  it('resets page to 1 when categoryId changes', async () => {
    const { result } = renderHook(() => useJobListings(mockRepo));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => { result.current.setPage(2); });

    expect(result.current.page).toBe(2);

    act(() => { result.current.setCategoryId('cat-2'); });

    expect(result.current.page).toBe(1);
  });

  it('resets page to 1 when keyword changes', async () => {
    const { result } = renderHook(() => useJobListings(mockRepo));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => { result.current.setPage(2); });

    expect(result.current.page).toBe(2);

    act(() => { result.current.setKeyword('designer'); });

    expect(result.current.page).toBe(1);
  });

  it('refetches when categoryId changes', async () => {
    const repo: IJobListingRepository = {
      getFilteredListings: vi.fn().mockResolvedValue(mockJobs),
    };

    const { result } = renderHook(() => useJobListings(repo));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => { result.current.setCategoryId('cat-2'); });

    await waitFor(() => {
      expect(repo.getFilteredListings).toHaveBeenCalledWith('cat-2', undefined);
    });
  });

  it('refetches when keyword changes', async () => {
    const repo: IJobListingRepository = {
      getFilteredListings: vi.fn().mockResolvedValue(mockJobs),
    };

    const { result } = renderHook(() => useJobListings(repo));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => { result.current.setKeyword('designer'); });

    await waitFor(() => {
      expect(repo.getFilteredListings).toHaveBeenCalledWith(undefined, 'designer');
    });
  });

  it('sets error when repository fails', async () => {
    const failingRepo: IJobListingRepository = {
      getFilteredListings: vi.fn().mockRejectedValue(new Error('Network error')),
    };

    const { result } = renderHook(() => useJobListings(failingRepo));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Network error');
    expect(result.current.jobs).toHaveLength(0);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.totalPages).toBe(1);
  });
});
