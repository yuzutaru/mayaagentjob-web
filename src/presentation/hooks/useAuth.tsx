import React, { createContext, useContext, useState } from 'react';
import { User } from '../../domain/entities/User';

interface AuthContextValue {
  readonly user: User | null;
  readonly isLoggedIn: boolean;
  readonly isLoading: boolean;
  readonly login: (provider: string, email?: string, name?: string) => Promise<void>;
  readonly logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (provider: string, email?: string, name?: string) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const mockUser: User = {
        id: 'mock-user-1',
        name: name || 'Pro Candidate',
        email: email || 'candidate@maya.ai',
      };
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: user !== null, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
