import React from 'react';
import { CvTemplateContract } from '../../../domain/entities/CvTemplateContract';
import { PortfolioProfile, createEmptyPortfolio } from '../../../domain/entities/PortfolioContract';
import { ResumePreview } from '../cv/ResumePreview';

interface TemplateThumbProps {
  template: CvTemplateContract;
  className?: string;
}

const SAMPLE_RESUME: PortfolioProfile = {
  ...createEmptyPortfolio(),
  fullName: 'Alex Rivera',
  headline: 'Frontend Engineer',
  email: 'alex@example.com',
  phone: '(555) 010-2233',
  location: 'Austin, TX',
  summary:
    'Product-minded engineer with 6+ years building accessible web applications at scale.',
  skills: [
    { name: 'TypeScript', category: 'Languages' },
    { name: 'React', category: 'Frameworks' },
    { name: 'Node.js', category: 'Frameworks' },
    { name: 'Figma', category: 'Tools' },
  ],
  experience: [
    {
      company: 'Nimbus Labs',
      role: 'Senior Frontend Engineer',
      startDate: '2021',
      endDate: null,
      location: 'Remote',
      description: 'Led the design-system team and cut page load time by 40%.',
      highlights: [],
    },
    {
      company: 'PixelForge',
      role: 'Frontend Engineer',
      startDate: '2018',
      endDate: '2021',
      location: 'Austin, TX',
      description: 'Shipped customer-facing features in a fast-moving startup.',
      highlights: [],
    },
  ],
  education: [
    { institution: 'UT Austin', degree: 'B.S. Computer Science', startDate: '2014', endDate: '2018', description: '' },
  ],
  certifications: [],
};

/** Realistic miniature resume rendered from the shared HTML template. */
export const TemplateThumb: React.FC<TemplateThumbProps> = ({ template, className = '' }) => {
  return (
    <div
      className={`pointer-events-none relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm bg-white ${className}`}
      aria-hidden
    >
      <ResumePreview templateId={template.id} profile={SAMPLE_RESUME} iframeTitle="" />
    </div>
  );
};
