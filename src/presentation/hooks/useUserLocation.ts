import { useState, useEffect, useRef } from 'react';
import { UserLocation } from '../../domain/entities/UserLocation';
import { IUserLocationRepository } from '../../domain/repositories/UserLocationRepository';
import { GetUserLocationUseCase } from '../../domain/usecases/GetUserLocationUseCase';

interface UseUserLocationReturn {
  location: UserLocation | null;
  isLoading: boolean;
  error: string | null;
}

export const useUserLocation = (
  repository: IUserLocationRepository
): UseUserLocationReturn => {
  const useCaseRef = useRef(new GetUserLocationUseCase(repository));
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await useCaseRef.current.execute();
        if (!cancelled) setLocation(result);
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to get location');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => { cancelled = true; };
  }, []);

  return { location, isLoading, error };
};
