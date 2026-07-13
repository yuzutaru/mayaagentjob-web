import React from 'react';
import { ThemeProvider } from './presentation/hooks/useTheme';
import { TranslationProvider } from './core/i18n/TranslationContext';
import { HomeLandingPage } from './presentation/pages/HomeLandingPage';

export function App() {
  return (
    <TranslationProvider>
      <ThemeProvider>
        <HomeLandingPage />
      </ThemeProvider>
    </TranslationProvider>
  );
}

export default App;

