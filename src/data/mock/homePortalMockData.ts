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
      roleTitle: 'Anesthesiologists',
      openPositionsCount: 45904,
    },
    {
      id: 'vac-2',
      roleTitle: 'Surgeons',
      openPositionsCount: 50364,
    },
    {
      id: 'vac-3',
      roleTitle: 'Obstetricians-Gynecologists',
      openPositionsCount: 4339,
    },
    {
      id: 'vac-4',
      roleTitle: 'Orthodontists',
      openPositionsCount: 20079,
    },
    {
      id: 'vac-5',
      roleTitle: 'Maxillofacial Surgeons',
      openPositionsCount: 74875,
    },
    {
      id: 'vac-6',
      roleTitle: 'Software Developer',
      openPositionsCount: 43359,
    },
    {
      id: 'vac-7',
      roleTitle: 'Psychiatrists',
      openPositionsCount: 18599,
    },
    {
      id: 'vac-8',
      roleTitle: 'Data Scientist',
      openPositionsCount: 28200,
      isHighlighted: true,
    },
    {
      id: 'vac-9',
      roleTitle: 'Financial Manager',
      openPositionsCount: 61391,
    },
    {
      id: 'vac-10',
      roleTitle: 'Management Analysis',
      openPositionsCount: 93046,
    },
    {
      id: 'vac-11',
      roleTitle: 'IT Manager',
      openPositionsCount: 50963,
    },
    {
      id: 'vac-12',
      roleTitle: 'Operations Research Analysis',
      openPositionsCount: 16627,
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
