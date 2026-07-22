import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BottomTabBar } from './BottomTabBar';

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-career-dark pb-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </div>
      <BottomTabBar />
    </div>
  );
};
