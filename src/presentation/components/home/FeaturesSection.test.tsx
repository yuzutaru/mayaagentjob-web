import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TranslationProvider } from '../../../core/i18n/TranslationContext';
import { FeaturesSection } from './FeaturesSection';
import { FeatureContract } from '../../../domain/entities/HomePortalContract';

const features: readonly FeatureContract[] = [
  {
    id: 'feature-portfolio',
    title: 'Portfolio Web Builder',
    description: 'Design a beautiful portfolio website.',
    iconName: 'layout',
  },
  {
    id: 'feature-pdf',
    title: 'PDF & CV Export',
    description: 'Export a polished PDF CV.',
    iconName: 'file-down',
  },
  {
    id: 'feature-jobs',
    title: 'AI Job Matching',
    description: 'Get roles matched to your stack.',
    iconName: 'sparkles',
  },
];

const renderComponent = () =>
  render(
    <TranslationProvider>
      <FeaturesSection features={features} />
    </TranslationProvider>
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

  it('renders nothing broken when given an empty feature list', () => {
    render(
      <TranslationProvider>
        <FeaturesSection features={[]} />
      </TranslationProvider>
    );
    expect(screen.getByText('One Platform, Everything You Need')).toBeTruthy();
  });
});
