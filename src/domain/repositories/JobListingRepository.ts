import { JobListing } from '../entities/JobListing';

export interface IJobListingRepository {
  getFilteredListings(categoryId?: string, keyword?: string): Promise<JobListing[]>;
}
