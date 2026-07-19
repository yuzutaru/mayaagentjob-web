import { HomePortalContract } from '../../domain/entities/HomePortalContract';

export const homePortalMockData: HomePortalContract = {
  brandName: 'Maya',
  brandSubtitle: 'Asisten cari kerja Kamu',
  heroHeadline: 'Find Your Dream Job',
  heroHighlightWord: 'Job',
  heroQuote: '"Building Connections, Bridging Opportunities – Your Future Starts Here."',
  heroQuoteHighlightWord: 'Here."',
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
      title: 'Create account',
      description: 'Whatever whatever whatever whatever whatever whatever',
      iconName: 'user-plus',
    },
    {
      stepNumber: 2,
      title: 'Upload CV/Resume',
      description: 'Whatever whatever whatever whatever whatever whatever',
      iconName: 'upload',
      isActive: true,
    },
    {
      stepNumber: 3,
      title: 'Find suitable job',
      description: 'Whatever whatever whatever whatever whatever whatever',
      iconName: 'search',
    },
    {
      stepNumber: 4,
      title: 'Apply job',
      description: 'Whatever whatever whatever whatever whatever whatever',
      iconName: 'check-circle',
    },
  ],
  ctaBanners: [
    {
      id: 'cta-candidate',
      type: 'candidate',
      title: 'Become a Candidate',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.',
      buttonText: 'Register Now',
      buttonActionUrl: '/register/candidate',
    },
    {
      id: 'cta-employer',
      type: 'employer',
      title: 'Become a Employers',
      description:
        'Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pellentesque augue risus, aligu.',
      buttonText: 'Register Now',
      buttonActionUrl: '/register/employer',
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
