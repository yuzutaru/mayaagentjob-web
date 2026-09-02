import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TranslationProvider } from '../../../core/i18n/TranslationContext';
import { FeaturesSection } from './FeaturesSection';
import { FeatureContract } from '../../../domain/entities/HomePortalContract';

const features: readonly FeatureContract[] = [
  {
    id: 'feature-portfolio',
    title: 'Portfolio Web Builder',
    description: 'Design a beautiful portfolio website.',
    iconName: 'layout',
    actionUrl: '/portfolio',
  },
  {
    id: 'feature-pdf',
    title: 'PDF & CV Export',
    description: 'Export a polished PDF CV.',
    iconName: 'file-down',
    actionUrl: '/portfolio',
  },
  {
    id: 'feature-jobs',
    title: 'AI Job Matching',
    description: 'Get roles matched to your stack.',
    iconName: 'sparkles',
    actionUrl: '/jobs',
  },
];

const renderComponent = () =>
  render(
    <MemoryRouter>
      <TranslationProvider>
        <FeaturesSection features={features} />
      </TranslationProvider>
    </MemoryRouter>
  );

describe('FeaturesSection', () => {
  it('renders the section title', () => {
    renderComponent();
    expect(screen.getByText('One Platform, Everything You Need')).toBeTruthy();
  });

  it('renders all three feature titles', () => {
    renderComponent();
    expect(screen.getByText('Portfolio Web Builder')).toBeTruthy();
    expect(screen.getByText('PDF & CV Export')).toBeTruthy();
    expect(screen.getByText('AI Job Matching')).toBeTruthy();
  });

  it('renders each feature card as a link to its actionUrl', () => {
    renderComponent();
    const cards = screen.getAllByRole('link');
    expect(cards).toHaveLength(3);
    expect(cards[0].getAttribute('href')).toBe('/portfolio');
    expect(cards[1].getAttribute('href')).toBe('/portfolio');
    expect(cards[2].getAttribute('href')).toBe('/jobs');
  });

  it('renders nothing broken when given an empty feature list', () => {
    render(
      <MemoryRouter>
        <TranslationProvider>
          <FeaturesSection features={[]} />
        </TranslationProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('One Platform, Everything You Need')).toBeTruthy();
  });
});
