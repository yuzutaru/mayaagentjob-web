import { IJobListingRepository } from '../../domain/repositories/JobListingRepository';
import { JobListing } from '../../domain/entities/JobListing';
import { jobListingsMockData } from '../mock/jobListingsMockData';

export class MockJobListingRepository implements IJobListingRepository {
  async getFilteredListings(categoryId?: string, keyword?: string, country?: string): Promise<JobListing[]> {
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

    if (country && country.trim()) {
      const lower = country.toLowerCase();
      results = results.filter((job) => job.location.toLowerCase().includes(lower));
    }

    return results;
  }
}
