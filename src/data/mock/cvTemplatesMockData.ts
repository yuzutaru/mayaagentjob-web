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
    description: 'Monochrome classic CV with simple section rules. Recruiter & machine friendly.',
    accentColor: '#111827',
  },
  {
    id: 'modern-indigo',
    name: 'Modern Indigo',
    category: 'modern',
    isAts: false,
    description: 'A polished modern layout with an indigo accent that still scans well.',
    accentColor: '#6366F1',
  },
  {
    id: 'modern-emerald',
    name: 'Modern Emerald',
    category: 'modern',
    isAts: false,
    description: 'Vibrant emerald accents on a clean one-page structure.',
    accentColor: '#10B981',
  },
  {
    id: 'modern-banner',
    name: 'Banner Bold',
    category: 'modern',
    isAts: false,
    description: 'A full-width colored header band that makes your name stand out.',
    accentColor: '#4F46E5',
  },
];
