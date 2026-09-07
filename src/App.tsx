import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './presentation/hooks/useTheme';
import { TranslationProvider, useTranslation } from './core/i18n/TranslationContext';
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
import { FEATURE_FLAGS } from './core/featureFlags';

const RedirectToCv: React.FC = () => {
  const { locale } = useTranslation();
  return <Navigate to={`/${locale}/cv-export`} replace />;
};

export function App() {
  return (
    <TranslationProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/:lang" element={<LocaleLayout />}>
                <Route
                  index
                  element={FEATURE_FLAGS.landing ? <HomeLandingPage /> : <RedirectToCv />}
                />
                <Route path="jobs" element={FEATURE_FLAGS.jobs ? <FindJobsPage /> : <RedirectToCv />} />
                <Route
                  path="portfolio"
                  element={FEATURE_FLAGS.portfolio ? <PortfolioBuilderPage /> : <RedirectToCv />}
                />
                <Route
                  path="cv-export"
                  element={FEATURE_FLAGS.cvExport ? <CvExportPage /> : <RedirectToCv />}
                />
                <Route
                  path="home"
                  element={
                    FEATURE_FLAGS.dashboard ? (
                      <AuthLayout>
                        <HomePage />
                      </AuthLayout>
                    ) : (
                      <RedirectToCv />
                    )
                  }
                />
                <Route
                  path="saved"
                  element={
                    FEATURE_FLAGS.dashboard ? (
                      <AuthLayout>
                        <SavedJobsPage />
                      </AuthLayout>
                    ) : (
                      <RedirectToCv />
                    )
                  }
                />
                <Route
                  path="profile"
                  element={
                    FEATURE_FLAGS.dashboard ? (
                      <AuthLayout>
                        <ProfilePage />
                      </AuthLayout>
                    ) : (
                      <RedirectToCv />
                    )
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
