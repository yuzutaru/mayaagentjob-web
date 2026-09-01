import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TranslationProvider } from '../../core/i18n/TranslationContext';
import { ThemeProvider } from '../hooks/useTheme';
import { AuthProvider } from '../hooks/useAuth';
import { FindJobsPage } from './FindJobsPage';

const renderPage = () =>
  render(
    <TranslationProvider>
      <ThemeProvider>
        <AuthProvider>
          <MemoryRouter>
            <FindJobsPage />
          </MemoryRouter>
        </AuthProvider>
      </ThemeProvider>
    </TranslationProvider>
  );

describe('FindJobsPage', () => {
  it('renders the page title and subtitle', () => {
    renderPage();
    expect(screen.getByText('Find Your Dream Job')).toBeTruthy();
    expect(screen.getByText(/Browse roles matched to your portfolio/)).toBeTruthy();
  });

  it('renders job category filters', () => {
    renderPage();
    expect(screen.getByText('Programming and Tech')).toBeTruthy();
    expect(screen.getByText('Graphics and Design')).toBeTruthy();
  });

  it('renders the search bar with keyword placeholder', () => {
    renderPage();
    expect(screen.getByPlaceholderText(/job title or keyword/i)).toBeTruthy();
  });
});
