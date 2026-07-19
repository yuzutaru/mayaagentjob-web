import { IUserLocationRepository } from '../repositories/UserLocationRepository';
import { UserLocation } from '../entities/UserLocation';

export class GetUserLocationUseCase {
  constructor(private readonly repository: IUserLocationRepository) {}

  async execute(): Promise<UserLocation> {
    return this.repository.getCurrentLocation();
  }
}
