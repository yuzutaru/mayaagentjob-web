import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { UserLocationRepositoryImpl } from './UserLocationRepositoryImpl';

const DEFAULT_LOCATION = {
  city: 'Jakarta',
  state: 'Indonesia',
  displayName: 'Jakarta, Indonesia',
};

const MOCK_COORDS = { latitude: -6.2088, longitude: 106.8456 } as GeolocationCoordinates;

let mockGetCurrentPosition: ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockGetCurrentPosition = vi.fn();
  Object.defineProperty(globalThis.navigator, 'geolocation', {
    value: { getCurrentPosition: mockGetCurrentPosition },
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('UserLocationRepositoryImpl', () => {
  it('returns default location when geolocation is not available', async () => {
    Object.defineProperty(globalThis.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    const repo = new UserLocationRepositoryImpl();
    const result = await repo.getCurrentLocation();

    expect(result).toEqual(DEFAULT_LOCATION);
  });

  it('returns default location when user denies geolocation', async () => {
    mockGetCurrentPosition.mockImplementation(
      (_success: any, error: (err: any) => void) => {
        error(new Error('Permission denied'));
      }
    );

    const repo = new UserLocationRepositoryImpl();
    const result = await repo.getCurrentLocation();

    expect(result).toEqual(DEFAULT_LOCATION);
  });

  it('returns default location when fetch fails (network error)', async () => {
    mockGetCurrentPosition.mockImplementation(
      (success: (pos: any) => void) => {
        success({ coords: MOCK_COORDS });
      }
    );
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const repo = new UserLocationRepositoryImpl();
    const result = await repo.getCurrentLocation();

    expect(result).toEqual(DEFAULT_LOCATION);
  });

  it('returns default location when fetch returns non-ok status', async () => {
    mockGetCurrentPosition.mockImplementation(
      (success: (pos: any) => void) => {
        success({ coords: MOCK_COORDS });
      }
    );
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 429,
    } as Response);

    const repo = new UserLocationRepositoryImpl();
    const result = await repo.getCurrentLocation();

    expect(result).toEqual(DEFAULT_LOCATION);
  });

  it('returns mapped location when geolocation and fetch succeed', async () => {
    mockGetCurrentPosition.mockImplementation(
      (success: (pos: any) => void) => {
        success({ coords: MOCK_COORDS });
      }
    );
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          address: { city: 'Jakarta', state: 'Indonesia' },
        }),
    } as Response);

    const repo = new UserLocationRepositoryImpl();
    const result = await repo.getCurrentLocation();

    expect(result).toEqual({
      city: 'Jakarta',
      state: 'Indonesia',
      displayName: 'Jakarta, Indonesia',
    });
  });
});
