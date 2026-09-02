import { HomePortalContract } from '../../domain/entities/HomePortalContract';

export const homePortalMockData: HomePortalContract = {
  brandName: 'Maya',
  brandSubtitle: 'Portfolio Builder & Career Assistant',
  heroHeadline: 'Build a Portfolio Website & PDF CV',
  heroHighlightWord: 'PDF CV',
  heroQuote: '"Maya turns your skills into a stunning portfolio website and a shareable PDF CV — then finds the job that matches."',
  heroQuoteHighlightWord: 'portfolio website',
  features: [
    {
      id: 'feature-portfolio',
      title: 'Portfolio Web Builder',
      description:
        'Design a beautiful, responsive portfolio website from your real GitHub, GitLab or LinkedIn profiles.',
      iconName: 'layout',
      actionUrl: '/portfolio',
    },
    {
      id: 'feature-pdf',
      title: 'PDF & CV Export',
      description:
        'Export a polished PDF CV and a shareable HTML site in one click — recruiter-ready in minutes.',
      iconName: 'file-down',
      actionUrl: '/portfolio',
    },
    {
      id: 'feature-jobs',
      title: 'AI Job Matching',
      description:
        'One of Maya\'s features: get roles matched to your technical stack and preferences.',
      iconName: 'sparkles',
      actionUrl: '/jobs',
    },
  ],
  categories: [
    {
      id: 'cat-1',
      label: 'Programming and Tech',
      iconName: 'code',
      isActive: true,
    },
    {
      id: 'cat-2',
      label: 'Graphics and Design',
      iconName: 'palette',
    },
    {
      id: 'cat-3',
      label: 'Digital Marketing',
      iconName: 'megaphone',
    },
    {
      id: 'cat-4',
      label: 'Video and animation',
      iconName: 'video',
    },
    {
      id: 'cat-5',
      label: 'Business',
      iconName: 'building',
    },
    {
      id: 'cat-6',
      label: 'Writing And Translation',
      iconName: 'file-text',
    },
  ],
  popularVacancies: [
    {
      id: 'vac-1',
      roleTitle: 'Frontend Developer',
      openPositionsCount: 12400,
      categoryId: 'cat-1',
    },
    {
      id: 'vac-2',
      roleTitle: 'Backend Engineer',
      openPositionsCount: 15600,
      categoryId: 'cat-1',
    },
    {
      id: 'vac-3',
      roleTitle: 'Fullstack Developer',
      openPositionsCount: 8900,
      categoryId: 'cat-1',
      isHighlighted: true,
    },
    {
      id: 'vac-4',
      roleTitle: 'UI/UX Designer',
      openPositionsCount: 5400,
      categoryId: 'cat-2',
    },
    {
      id: 'vac-5',
      roleTitle: 'Graphic Designer',
      openPositionsCount: 3200,
      categoryId: 'cat-2',
    },
    {
      id: 'vac-6',
      roleTitle: 'SEO Specialist',
      openPositionsCount: 4100,
      categoryId: 'cat-3',
    },
    {
      id: 'vac-7',
      roleTitle: 'Social Media Manager',
      openPositionsCount: 6700,
      categoryId: 'cat-3',
    },
    {
      id: 'vac-8',
      roleTitle: 'Motion Graphics Artist',
      openPositionsCount: 1200,
      categoryId: 'cat-4',
    },
    {
      id: 'vac-9',
      roleTitle: 'Video Editor',
      openPositionsCount: 2800,
      categoryId: 'cat-4',
    },
    {
      id: 'vac-10',
      roleTitle: 'Business Analyst',
      openPositionsCount: 9300,
      categoryId: 'cat-5',
    },
    {
      id: 'vac-11',
      roleTitle: 'Financial Manager',
      openPositionsCount: 4500,
      categoryId: 'cat-5',
    },
    {
      id: 'vac-12',
      roleTitle: 'Technical Writer',
      openPositionsCount: 1600,
      categoryId: 'cat-6',
    },
    {
      id: 'vac-13',
      roleTitle: 'Content Strategist',
      openPositionsCount: 3400,
      categoryId: 'cat-6',
    },
  ],
  workSteps: [
    {
      stepNumber: 1,
      title: 'Import your profiles',
      description: 'Connect GitHub, GitLab, Bitbucket or a LinkedIn PDF export to pull your work history.',
      iconName: 'import',
    },
    {
      stepNumber: 2,
      title: 'Build & customize',
      description: 'Design your portfolio website with a live preview as you edit.',
      iconName: 'layout',
      isActive: true,
    },
    {
      stepNumber: 3,
      title: 'Export PDF & site',
      description: 'Download a polished PDF CV and your portfolio website in one click.',
      iconName: 'file-down',
    },
    {
      stepNumber: 4,
      title: 'Get AI matches',
      description: 'Receive jobs matched to your portfolio and preferences.',
      iconName: 'sparkles',
    },
  ],
  ctaBanners: [
    {
      id: 'cta-candidate',
      type: 'candidate',
      title: 'Build Your Portfolio',
      description:
        'Import your GitHub, GitLab or Bitbucket profile and generate a stunning portfolio & CV in one click.',
      buttonText: 'Open Builder',
      buttonActionUrl: '/portfolio',
    },
    {
      id: 'cta-jobs',
      type: 'jobs',
      title: 'Find Your Dream Job',
      description:
        'Explore jobs matched to your technical stack and apply in seconds with Maya job search.',
      buttonText: 'Find Jobs',
      buttonActionUrl: '/jobs',
    },
  ],
  footerColumns: [
    {
      title: 'Quick Link',
      links: [
        { label: 'About', href: '/about' },
        { label: '→ Contact', href: '/contact', isHighlighted: true },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Candidate',
      links: [
        { label: 'Browse Jobs', href: '/jobs' },
        { label: 'Browse Employers', href: '/employers' },
        { label: 'Candidate Dashboard', href: '/candidate/dashboard' },
        { label: 'Saved Jobs', href: '/candidate/saved' },
      ],
    },
    {
      title: 'Employers',
      links: [
        { label: 'Post a Job', href: '/employer/post-job' },
        { label: 'Browse Candidates', href: '/employer/candidates' },
        { label: 'Employers Dashboard', href: '/employer/dashboard' },
        { label: 'Applications', href: '/employer/applications' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Faqs', href: '/faqs' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
      ],
    },
  ],
};
