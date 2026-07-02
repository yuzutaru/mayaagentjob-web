// 6. src/presentation/hooks/useUserProfile.ts
import { useState, useCallback } from "react";
import { User } from "../../domain/entities/User";
import { GetUserProfileUseCase } from "../../domain/usecases/GetUserProfileUseCase";

interface UseUserProfileReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  loadUser: (id: string) => Promise<void>;
}

export const useUserProfile = (
  getUserProfileUseCase: GetUserProfileUseCase
): UseUserProfileReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getUserProfileUseCase.execute(id);
      setUser(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [getUserProfileUseCase]);

  return { user, isLoading, error, loadUser };
};
