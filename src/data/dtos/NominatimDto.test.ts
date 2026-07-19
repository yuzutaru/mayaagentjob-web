import { describe, it, expect } from 'vitest';
import { mapNominatimDtoToDomain, NominatimReverseDto } from './NominatimDto';

describe('mapNominatimDtoToDomain', () => {
  it('returns city and state from a full address', () => {
    const dto: NominatimReverseDto = {
      address: { city: 'Jakarta', state: 'Indonesia' },
    };
    const result = mapNominatimDtoToDomain(dto);
    expect(result).toEqual({
      city: 'Jakarta',
      state: 'Indonesia',
      displayName: 'Jakarta, Indonesia',
    });
  });

  it('falls back to town when city is missing', () => {
    const dto: NominatimReverseDto = {
      address: { town: 'Bandung', state: 'West Java' },
    };
    const result = mapNominatimDtoToDomain(dto);
    expect(result.displayName).toBe('Bandung, West Java');
  });

  it('falls back to village when city and town are missing', () => {
    const dto: NominatimReverseDto = {
      address: { village: 'Ubud', state: 'Bali' },
    };
    const result = mapNominatimDtoToDomain(dto);
    expect(result.displayName).toBe('Ubud, Bali');
  });

  it('falls back to suburb as last resort', () => {
    const dto: NominatimReverseDto = {
      address: { suburb: 'Kebayoran' },
    };
    const result = mapNominatimDtoToDomain(dto);
    expect(result.city).toBe('Kebayoran');
    expect(result.state).toBe('Indonesia');
    expect(result.displayName).toBe('Kebayoran, Indonesia');
  });

  it('defaults to Jakarta, Indonesia when address is undefined', () => {
    const result = mapNominatimDtoToDomain({});
    expect(result).toEqual({
      city: 'Jakarta',
      state: 'Indonesia',
      displayName: 'Jakarta, Indonesia',
    });
  });

  it('defaults to Jakarta, Indonesia when address is empty', () => {
    const result = mapNominatimDtoToDomain({ address: {} });
    expect(result.displayName).toBe('Jakarta, Indonesia');
  });

  it('defaults state to Indonesia when Nominatim returns a city but no state', () => {
    const dto: NominatimReverseDto = {
      address: { city: 'Surabaya' },
    };
    const result = mapNominatimDtoToDomain(dto);
    expect(result.displayName).toBe('Surabaya, Indonesia');
  });
});
