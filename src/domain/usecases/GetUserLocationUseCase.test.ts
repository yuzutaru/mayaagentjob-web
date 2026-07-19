import { describe, it, expect, vi } from 'vitest';
import { GetUserLocationUseCase } from './GetUserLocationUseCase';
import { IUserLocationRepository } from '../repositories/UserLocationRepository';
import { UserLocation } from '../entities/UserLocation';

describe('GetUserLocationUseCase', () => {
  it('returns the location from the repository', async () => {
    const expected: UserLocation = {
      city: 'Jakarta',
      state: 'Indonesia',
      displayName: 'Jakarta, Indonesia',
    };

    const mockRepo: IUserLocationRepository = {
      getCurrentLocation: vi.fn().mockResolvedValue(expected),
    };

    const useCase = new GetUserLocationUseCase(mockRepo);
    const result = await useCase.execute();

    expect(result).toBe(expected);
    expect(mockRepo.getCurrentLocation).toHaveBeenCalledOnce();
  });

  it('propagates repository errors', async () => {
    const mockRepo: IUserLocationRepository = {
      getCurrentLocation: vi.fn().mockRejectedValue(new Error('Geolocation denied')),
    };

    const useCase = new GetUserLocationUseCase(mockRepo);

    await expect(useCase.execute()).rejects.toThrow('Geolocation denied');
  });
});
