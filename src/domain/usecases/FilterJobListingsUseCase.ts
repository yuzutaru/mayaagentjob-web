import { IJobListingRepository } from '../repositories/JobListingRepository';
import { JobListing } from '../entities/JobListing';

export class FilterJobListingsUseCase {
  constructor(private readonly repository: IJobListingRepository) {}

  async execute(categoryId?: string, keyword?: string): Promise<JobListing[]> {
    return this.repository.getFilteredListings(categoryId, keyword);
  }
}
