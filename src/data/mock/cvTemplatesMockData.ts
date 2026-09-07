import { CvTemplateContract } from '../../domain/entities/CvTemplateContract';

export const cvTemplatesMockData: readonly CvTemplateContract[] = [
  {
    id: 'ats-minimal',
    name: 'ATS Minimal',
    category: 'ats',
    isAts: true,
    description: 'Clean single-column layout with standard fonts — parses reliably in every ATS.',
    accentColor: '#1F2937',
  },
  {
    id: 'ats-classic',
    name: 'ATS Classic',
    category: 'ats',
    isAts: true,
    description: 'Monochrome serif classic CV with simple section rules. Recruiter & machine friendly.',
    accentColor: '#111827',
  },
  {
    id: 'apollo',
    name: 'Apollo',
    category: 'modern',
    isAts: false,
    description: 'A polished single-column layout with an indigo accent that still scans well.',
    accentColor: '#4F46E5',
  },
  {
    id: 'terra',
    name: 'Terra',
    category: 'modern',
    isAts: false,
    description: 'Two-column layout with a teal sidebar for contact and skills.',
    accentColor: '#0F766E',
  },
  {
    id: 'tempe',
    name: 'Tempe',
    category: 'modern',
    isAts: false,
    description: 'Centered header and amber accents for a distinctive, recruiter-ready look.',
    accentColor: '#B45309',
  },
];
