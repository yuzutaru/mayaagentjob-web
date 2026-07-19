import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TranslationProvider } from '../../../core/i18n/TranslationContext';
import { HeroSearchSection } from './HeroSearchSection';
import * as useUserLocationModule from '../../hooks/useUserLocation';

const DEFAULT_PROPS = {
  headline: 'Find Your Dream Job with',
  highlightWord: 'MAYA',
  quote: 'Connecting talent with opportunity across',
  quoteHighlightWord: 'opportunity',
};

vi.mock('../../hooks/useUserLocation', () => ({
  useUserLocation: vi.fn(),
}));

const mockUseUserLocation = vi.mocked(useUserLocationModule.useUserLocation);

const renderComponent = () =>
  render(
    <TranslationProvider>
      <HeroSearchSection {...DEFAULT_PROPS} />
    </TranslationProvider>
  );

describe('HeroSearchSection', () => {
  it('renders the headline and quote', () => {
    mockUseUserLocation.mockReturnValue({
      location: null,
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('Find Your Dream Job with')).toBeTruthy();
    expect(screen.getAllByText('MAYA').length).toBe(2);
    expect(screen.getByText(/Connecting talent/)).toBeTruthy();
    expect(screen.getByText('opportunity')).toBeTruthy();
  });

  it('displays the location from the hook', () => {
    mockUseUserLocation.mockReturnValue({
      location: {
        city: 'Bandung',
        state: 'West Java',
        displayName: 'Bandung, West Java',
      },
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('Bandung, West Java')).toBeTruthy();
  });

  it('displays fallback when location is null', () => {
    mockUseUserLocation.mockReturnValue({
      location: null,
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('Jakarta, Indonesia')).toBeTruthy();
  });
});
