import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './presentation/hooks/useTheme';
import { TranslationProvider } from './core/i18n/TranslationContext';
import { AuthProvider } from './presentation/hooks/useAuth';
import { HomeLandingPage } from './presentation/pages/HomeLandingPage';
import { FindJobsPage } from './presentation/pages/FindJobsPage';
import { HomePage } from './presentation/pages/HomePage';
import { SavedJobsPage } from './presentation/pages/SavedJobsPage';
import { ProfilePage } from './presentation/pages/ProfilePage';
import { PortfolioBuilderPage } from './presentation/pages/PortfolioBuilderPage';
import { CvExportPage } from './presentation/pages/CvExportPage';
import { AuthLayout } from './presentation/components/layout/AuthLayout';
import { LocaleLayout, LangFallback, RootRedirect } from './core/i18n/LocaleLayout';

export function App() {
  return (
    <TranslationProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/:lang" element={<LocaleLayout />}>
                <Route index element={<HomeLandingPage />} />
                <Route path="jobs" element={<FindJobsPage />} />
                <Route path="portfolio" element={<PortfolioBuilderPage />} />
                <Route path="cv-export" element={<CvExportPage />} />
                <Route
                  path="home"
                  element={
                    <AuthLayout>
                      <HomePage />
                    </AuthLayout>
                  }
                />
                <Route
                  path="saved"
                  element={
                    <AuthLayout>
                      <SavedJobsPage />
                    </AuthLayout>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <AuthLayout>
                      <ProfilePage />
                    </AuthLayout>
                  }
                />
                <Route path="*" element={<LangFallback />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TranslationProvider>
  );
}

export default App;
