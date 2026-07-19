import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useUserLocation } from './useUserLocation';
import { IUserLocationRepository } from '../../domain/repositories/UserLocationRepository';
import { UserLocation } from '../../domain/entities/UserLocation';

const MOCK_LOCATION: UserLocation = {
  city: 'Jakarta',
  state: 'Indonesia',
  displayName: 'Jakarta, Indonesia',
};

describe('useUserLocation', () => {
  it('sets isLoading to true on mount', () => {
    const mockRepo: IUserLocationRepository = {
      getCurrentLocation: vi.fn().mockImplementation(() => new Promise(() => {})),
    };

    const { result } = renderHook(() => useUserLocation(mockRepo));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.location).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('sets location on successful resolution', async () => {
    const mockRepo: IUserLocationRepository = {
      getCurrentLocation: vi.fn().mockResolvedValue(MOCK_LOCATION),
    };

    const { result } = renderHook(() => useUserLocation(mockRepo));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.location).toEqual(MOCK_LOCATION);
    expect(result.current.error).toBeNull();
  });

  it('sets error on repository rejection', async () => {
    const mockRepo: IUserLocationRepository = {
      getCurrentLocation: vi.fn().mockRejectedValue(new Error('Geolocation denied')),
    };

    const { result } = renderHook(() => useUserLocation(mockRepo));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.location).toBeNull();
    expect(result.current.error).toBe('Geolocation denied');
  });

  it('does not update state after unmount', async () => {
    const mockRepo: IUserLocationRepository = {
      getCurrentLocation: vi.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(MOCK_LOCATION), 100))
      ),
    };

    const { result, unmount } = renderHook(() => useUserLocation(mockRepo));

    unmount();

    await new Promise((r) => setTimeout(r, 150));

    expect(result.current.location).toBeNull();
    expect(result.current.isLoading).toBe(true);
  });
});
