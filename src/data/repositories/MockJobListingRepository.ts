import { IJobListingRepository } from '../../domain/repositories/JobListingRepository';
import { JobListing } from '../../domain/entities/JobListing';
import { jobListingsMockData } from '../mock/jobListingsMockData';

export class MockJobListingRepository implements IJobListingRepository {
  async getFilteredListings(categoryId?: string, keyword?: string): Promise<JobListing[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    let results = [...jobListingsMockData];

    if (categoryId) {
      results = results.filter((job) => job.categoryId === categoryId);
    }

    if (keyword && keyword.trim()) {
      const lower = keyword.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(lower) ||
          job.company.toLowerCase().includes(lower)
      );
    }

    return results;
  }
}
