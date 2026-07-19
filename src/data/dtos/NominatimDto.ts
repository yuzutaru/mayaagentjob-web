import { UserLocation } from '../../domain/entities/UserLocation';

export interface NominatimAddressDto {
  readonly city?: string;
  readonly town?: string;
  readonly village?: string;
  readonly suburb?: string;
  readonly state?: string;
}

export interface NominatimReverseDto {
  readonly address?: NominatimAddressDto;
}

export const mapNominatimDtoToDomain = (dto: NominatimReverseDto): UserLocation => {
  const address = dto.address;
  const city =
    address?.city ||
    address?.town ||
    address?.village ||
    address?.suburb ||
    'Jakarta';
  const state = address?.state ?? 'Indonesia';
  return {
    city,
    state,
    displayName: state ? `${city}, ${state}` : city,
  };
};
