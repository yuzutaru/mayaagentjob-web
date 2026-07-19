import { UserLocation } from '../entities/UserLocation';

export interface IUserLocationRepository {
  getCurrentLocation(): Promise<UserLocation>;
}
