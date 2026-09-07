import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TranslationProvider } from '../../core/i18n/TranslationContext';
import { ThemeProvider } from '../hooks/useTheme';
import { AuthProvider } from '../hooks/useAuth';
import { CvExportPage } from './CvExportPage';

const renderPage = () =>
  render(
    <TranslationProvider>
      <ThemeProvider>
        <AuthProvider>
          <MemoryRouter>
            <CvExportPage />
          </MemoryRouter>
        </AuthProvider>
      </ThemeProvider>
    </TranslationProvider>
  );

describe('CvExportPage', () => {
  it('renders the page title and subtitle', () => {
    renderPage();
    expect(screen.getByText('Export Your CV')).toBeTruthy();
    expect(screen.getByText(/Pick an ATS-friendly or modern template/)).toBeTruthy();
  });

  it('groups templates into ATS-friendly and modern sections', () => {
    renderPage();
    expect(screen.getByText('ATS-Friendly CV')).toBeTruthy();
    expect(screen.getByText('Modern / Creative')).toBeTruthy();
    expect(screen.getByText('ATS Minimal')).toBeTruthy();
    expect(screen.getByText('ATS Classic')).toBeTruthy();
    expect(screen.getByText('Apollo')).toBeTruthy();
    expect(screen.getByText('Terra')).toBeTruthy();
    expect(screen.getByText('Tempe')).toBeTruthy();
  });

  it('flags ATS templates with a badge', () => {
    renderPage();
    expect(screen.getAllByText('ATS')).toHaveLength(2);
  });

  it('moves to the build step after selecting a template', () => {
    renderPage();
    fireEvent.click(screen.getByText('ATS Classic'));
    expect(screen.getByText(/2\. Build your CV/)).toBeTruthy();
    expect(screen.getAllByText('Selected template').length).toBeGreaterThan(0);
    expect(screen.queryByText('Modern / Creative')).toBeNull();
    expect(screen.getByText(/Change template/)).toBeTruthy();
  });

  it('returns to the gallery when changing template', () => {
    renderPage();
    fireEvent.click(screen.getByText('Tempe'));
    expect(screen.getByText(/Change template/)).toBeTruthy();
    fireEvent.click(screen.getByText(/Change template/));
    expect(screen.getByText('ATS-Friendly CV')).toBeTruthy();
    expect(screen.getByText('Modern / Creative')).toBeTruthy();
  });

  it('renders a live paper preview after selecting a template', () => {
    renderPage();
    fireEvent.click(screen.getByText('Apollo'));
    expect(screen.getAllByTestId('resume-preview-apollo').length).toBeGreaterThan(0);
  });
});
