import React from 'react';
import { ThemeProvider } from './presentation/hooks/useTheme';
import { HomeLandingPage } from './presentation/pages/HomeLandingPage';

export function App() {
  return (
    <ThemeProvider>
      <HomeLandingPage />
    </ThemeProvider>
  );
}

export default App;
