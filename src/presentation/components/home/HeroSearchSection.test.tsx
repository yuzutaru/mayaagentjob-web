import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TranslationProvider } from '../../../core/i18n/TranslationContext';
import { HeroSearchSection } from './HeroSearchSection';

const DEFAULT_PROPS = {
  headline: 'Find Your Dream Job with',
  highlightWord: 'MAYA',
  quote: 'Connecting talent with opportunity across',
  quoteHighlightWord: 'opportunity',
};

const renderComponent = (props = {}) =>
  render(
    <TranslationProvider>
      <HeroSearchSection {...DEFAULT_PROPS} {...props} />
    </TranslationProvider>
  );

describe('HeroSearchSection', () => {
  it('renders the headline and quote', () => {
    renderComponent();

    expect(screen.getByText('Find Your Dream Job with')).toBeTruthy();
    expect(screen.getAllByText('MAYA').length).toBe(2);
    expect(screen.getByText(/Connecting talent/)).toBeTruthy();
    expect(screen.getByText('opportunity')).toBeTruthy();
  });

  it('renders the headline when the highlight word is not present', () => {
    renderComponent({ highlightWord: 'MissingWord' });

    expect(screen.getByText('Find Your Dream Job with')).toBeTruthy();
  });

  it('renders the quote unhighlighted when the highlight word is not present', () => {
    renderComponent({ quoteHighlightWord: 'MissingWord' });

    expect(screen.getByText(/Connecting talent/)).toBeTruthy();
  });
});
