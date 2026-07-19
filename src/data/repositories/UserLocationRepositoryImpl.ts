import { IUserLocationRepository } from '../../domain/repositories/UserLocationRepository';
import { UserLocation } from '../../domain/entities/UserLocation';
import { NominatimReverseDto, mapNominatimDtoToDomain } from '../dtos/NominatimDto';

const DEFAULT_LOCATION: UserLocation = {
  city: 'Jakarta',
  state: 'Indonesia',
  displayName: 'Jakarta, Indonesia',
};

export class UserLocationRepositoryImpl implements IUserLocationRepository {
  private readonly nominatimBaseUrl = 'https://nominatim.openstreetmap.org';

  async getCurrentLocation(): Promise<UserLocation> {
    if (!navigator.geolocation) {
      return DEFAULT_LOCATION;
    }

    let coords: GeolocationCoordinates;
    try {
      coords = await new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          () => reject(new Error('Geolocation denied')),
          { timeout: 5000 }
        );
      });
    } catch {
      return DEFAULT_LOCATION;
    }

    try {
      const res = await fetch(
        `${this.nominatimBaseUrl}/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&accept-language=en`,
        { headers: { 'User-Agent': 'mayaagentjob-web/1.0' } }
      );
      if (!res.ok) return DEFAULT_LOCATION;
      const dto: NominatimReverseDto = await res.json();
      return mapNominatimDtoToDomain(dto);
    } catch {
      return DEFAULT_LOCATION;
    }
  }
}
