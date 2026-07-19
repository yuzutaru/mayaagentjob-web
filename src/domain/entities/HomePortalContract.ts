/**
 * Pure TypeScript Domain Contract for Home Portal Landing Screen.
 * Synchronized across `mayaagentjob-web` and `mayaagentjob-mobile` for 100% contract alignment.
 * Zero framework dependencies to ensure instantaneous <5ms unit testing.
 */

export interface JobCategoryCardContract {
  readonly id: string;
  readonly label: string;
  readonly iconName: string; // e.g., 'code', 'design', 'marketing', 'video', 'business', 'writing'
  readonly isActive?: boolean;
}

export interface PopularVacancyContract {
  readonly id: string;
  readonly roleTitle: string;
  readonly openPositionsCount: number;
  readonly categoryId: string;
  readonly isHighlighted?: boolean; // Highlighted in emerald green (e.g. Data Scientist)
}

export interface HowWeWorkStepContract {
  readonly stepNumber: number;
  readonly title: string;
  readonly description: string;
  readonly iconName: string; // e.g., 'user-plus', 'upload', 'search', 'check-circle'
  readonly isActive?: boolean;
}

export interface CtaBannerContract {
  readonly id: string;
  readonly type: 'candidate' | 'employer';
  readonly title: string;
  readonly description: string;
  readonly buttonText: string;
  readonly buttonActionUrl: string;
}

export interface QuickLinkItemContract {
  readonly label: string;
  readonly href: string;
  readonly isHighlighted?: boolean;
}

export interface FooterColumnContract {
  readonly title: string;
  readonly links: readonly QuickLinkItemContract[];
}

export interface HomePortalContract {
  readonly brandName: string;
  readonly brandSubtitle: string;
  readonly heroHeadline: string;
  readonly heroHighlightWord: string;
  readonly heroQuote: string;
  readonly heroQuoteHighlightWord: string;
  readonly categories: readonly JobCategoryCardContract[];
  readonly popularVacancies: readonly PopularVacancyContract[];
  readonly workSteps: readonly HowWeWorkStepContract[];
  readonly ctaBanners: readonly CtaBannerContract[];
  readonly footerColumns: readonly FooterColumnContract[];
}
