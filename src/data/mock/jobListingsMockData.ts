import { JobListing } from '../../domain/entities/JobListing';

export const jobListingsMockData: JobListing[] = [
  // cat-1: Programming and Tech
  {
    jobId: 'job-1', title: 'Frontend Developer', company: 'TechCorp',
    arrangement: 'Remote', location: 'Jakarta', categoryId: 'cat-1',
    matchScore: 95,
    aiSummaryBullets: ['React 5yr+', 'TypeScript expert', 'Led 3 major frontend migrations'],
  },
  {
    jobId: 'job-2', title: 'Backend Engineer', company: 'DataFlow Inc',
    arrangement: 'Hybrid', location: 'Bandung', categoryId: 'cat-1',
    matchScore: 88,
    aiSummaryBullets: ['Node.js & Go', 'PostgreSQL optimization', 'Microservices architecture'],
  },
  {
    jobId: 'job-3', title: 'Fullstack Developer', company: 'StartupXYZ',
    arrangement: 'Remote', location: 'Singapore', categoryId: 'cat-1',
    matchScore: 91,
    aiSummaryBullets: ['React + Node.js', 'AWS certified', 'CI/CD pipeline expertise'],
  },

  // cat-2: Graphics and Design
  {
    jobId: 'job-4', title: 'UI/UX Designer', company: 'DesignStudio',
    arrangement: 'Remote', location: 'Jakarta', categoryId: 'cat-2',
    matchScore: 82,
    aiSummaryBullets: ['Figma expert', 'Design system creation', 'User research experience'],
  },
  {
    jobId: 'job-5', title: 'Graphic Designer', company: 'CreativeAgency',
    arrangement: 'On-site', location: 'Yogyakarta', categoryId: 'cat-2',
    matchScore: 76,
    aiSummaryBullets: ['Adobe Suite mastery', 'Brand identity design', 'Print & digital media'],
  },
  {
    jobId: 'job-6', title: 'Product Designer', company: 'FinTechCo',
    arrangement: 'Hybrid', location: 'Jakarta', categoryId: 'cat-2',
    matchScore: 90,
    aiSummaryBullets: ['End-to-end product design', 'Prototyping with Figma', 'Design thinking certified'],
  },

  // cat-3: Digital Marketing
  {
    jobId: 'job-7', title: 'SEO Specialist', company: 'GrowthMakers',
    arrangement: 'Remote', location: 'Jakarta', categoryId: 'cat-3',
    matchScore: 73,
    aiSummaryBullets: ['Technical SEO audits', 'Content strategy', 'Google Analytics certified'],
  },
  {
    jobId: 'job-8', title: 'Social Media Manager', company: 'BrandBoost',
    arrangement: 'Remote', location: 'Bali', categoryId: 'cat-3',
    matchScore: 79,
    aiSummaryBullets: ['Multi-platform management', 'Viral campaign strategy', 'Analytics reporting'],
  },

  // cat-4: Video and Animation
  {
    jobId: 'job-9', title: 'Motion Graphics Artist', company: 'PixelWorks',
    arrangement: 'Hybrid', location: 'Jakarta', categoryId: 'cat-4',
    matchScore: 71,
    aiSummaryBullets: ['After Effects expert', '2D/3D animation', 'Explainer video production'],
  },
  {
    jobId: 'job-10', title: 'Video Editor', company: 'ContentHouse',
    arrangement: 'Remote', location: 'Bandung', categoryId: 'cat-4',
    matchScore: 68,
    aiSummaryBullets: ['Premiere Pro & DaVinci', 'Color grading', 'Short-form content expertise'],
  },

  // cat-5: Business
  {
    jobId: 'job-11', title: 'Business Analyst', company: 'ConsultPro',
    arrangement: 'Hybrid', location: 'Jakarta', categoryId: 'cat-5',
    matchScore: 84,
    aiSummaryBullets: ['Requirements gathering', 'Process optimization', 'Stakeholder management'],
  },
  {
    jobId: 'job-12', title: 'Financial Manager', company: 'FinanceGroup',
    arrangement: 'On-site', location: 'Jakarta', categoryId: 'cat-5',
    matchScore: 80,
    aiSummaryBullets: ['Financial modeling', 'Team leadership', 'Risk assessment expertise'],
  },

  // cat-6: Writing and Translation
  {
    jobId: 'job-13', title: 'Technical Writer', company: 'DocuTech',
    arrangement: 'Remote', location: 'Singapore', categoryId: 'cat-6',
    matchScore: 86,
    aiSummaryBullets: ['API documentation', 'Technical manuals', 'Developer guides expertise'],
  },
  {
    jobId: 'job-14', title: 'Content Strategist', company: 'MediaHub',
    arrangement: 'Remote', location: 'Jakarta', categoryId: 'cat-6',
    matchScore: 77,
    aiSummaryBullets: ['Content planning', 'SEO-driven writing', 'Editorial calendar management'],
  },
];
