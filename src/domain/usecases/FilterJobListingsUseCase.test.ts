import { describe, it, expect, vi } from 'vitest';
import { FilterJobListingsUseCase } from './FilterJobListingsUseCase';
import { IJobListingRepository } from '../repositories/JobListingRepository';
import { JobListing } from '../entities/JobListing';

const mockJob1: JobListing = {
  jobId: 'j1', title: 'Frontend Developer', company: 'TechCo',
  arrangement: 'Remote', location: 'Jakarta', categoryId: 'cat-1',
  matchScore: 92, aiSummaryBullets: [],
};
const mockJob2: JobListing = {
  jobId: 'j2', title: 'UX Designer', company: 'DesignLab',
  arrangement: 'Hybrid', location: 'Bandung', categoryId: 'cat-2',
  matchScore: 85, aiSummaryBullets: [],
};
const mockJob3: JobListing = {
  jobId: 'j3', title: 'Backend Engineer', company: 'TechCo',
  arrangement: 'Remote', location: 'Jakarta', categoryId: 'cat-1',
  matchScore: 78, aiSummaryBullets: [],
};

describe('FilterJobListingsUseCase', () => {
  it('returns all listings when no filters provided', async () => {
    const mockRepo: IJobListingRepository = {
      getFilteredListings: vi.fn().mockResolvedValue([mockJob1, mockJob2, mockJob3]),
    };
    const useCase = new FilterJobListingsUseCase(mockRepo);
    const result = await useCase.execute();
    expect(result).toHaveLength(3);
    expect(mockRepo.getFilteredListings).toHaveBeenCalledWith(undefined, undefined);
  });

  it('filters by categoryId', async () => {
    const mockRepo: IJobListingRepository = {
      getFilteredListings: vi.fn().mockResolvedValue([mockJob1, mockJob3]),
    };
    const useCase = new FilterJobListingsUseCase(mockRepo);
    const result = await useCase.execute('cat-1');
    expect(result).toHaveLength(2);
    expect(mockRepo.getFilteredListings).toHaveBeenCalledWith('cat-1', undefined);
  });

  it('filters by keyword', async () => {
    const mockRepo: IJobListingRepository = {
      getFilteredListings: vi.fn().mockResolvedValue([mockJob2]),
    };
    const useCase = new FilterJobListingsUseCase(mockRepo);
    const result = await useCase.execute(undefined, 'designer');
    expect(result).toHaveLength(1);
    expect(mockRepo.getFilteredListings).toHaveBeenCalledWith(undefined, 'designer');
  });

  it('combines category and keyword filters', async () => {
    const mockRepo: IJobListingRepository = {
      getFilteredListings: vi.fn().mockResolvedValue([mockJob1]),
    };
    const useCase = new FilterJobListingsUseCase(mockRepo);
    const result = await useCase.execute('cat-1', 'frontend');
    expect(result).toHaveLength(1);
    expect(mockRepo.getFilteredListings).toHaveBeenCalledWith('cat-1', 'frontend');
  });

  it('propagates repository errors', async () => {
    const mockRepo: IJobListingRepository = {
      getFilteredListings: vi.fn().mockRejectedValue(new Error('Network error')),
    };
    const useCase = new FilterJobListingsUseCase(mockRepo);
    await expect(useCase.execute()).rejects.toThrow('Network error');
  });
});
