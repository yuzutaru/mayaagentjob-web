import { JobListing } from '../entities/JobListing';

export interface IJobListingRepository {
  getFilteredListings(categoryId?: string, keyword?: string, country?: string): Promise<JobListing[]>;
}
