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

  it('does not show the template gallery or any import source', () => {
    renderPage();
    expect(screen.queryByText('1. Choose a template')).toBeNull();
    expect(screen.queryByText('ATS-Friendly CV')).toBeNull();
    expect(screen.queryByText('Modern / Creative')).toBeNull();
    expect(screen.queryByText('GitHub')).toBeNull();
    expect(screen.queryByText('Start Empty')).toBeNull();
  });

  it('renders the editor and live preview with the default template', () => {
    renderPage();
    expect(screen.getByText(/Customize your portfolio/)).toBeTruthy();
    expect(screen.getByText('Selected template')).toBeTruthy();
    expect(screen.getByText('ATS Minimal')).toBeTruthy();
    expect(screen.getAllByTestId('resume-preview-ats-minimal').length).toBeGreaterThan(0);
  });

  it('renders the download button and disables it until a full name is entered', () => {
    renderPage();
    const download = screen.getByRole('button', { name: /Download CV \(PDF\)/ });
    expect((download as HTMLButtonElement).disabled).toBe(true);

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Ada Lovelace' } });
    expect((screen.getByRole('button', { name: /Download CV \(PDF\)/ }) as HTMLButtonElement).disabled).toBe(false);
  });
});
