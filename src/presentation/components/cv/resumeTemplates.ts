import apolloHtml from '../../../data/cvTemplates/apollo.html?raw';
import atsClassicHtml from '../../../data/cvTemplates/ats-classic.html?raw';
import atsMinimalHtml from '../../../data/cvTemplates/ats-minimal.html?raw';
import tempeHtml from '../../../data/cvTemplates/tempe.html?raw';
import terraHtml from '../../../data/cvTemplates/terra.html?raw';

/**
 * CV template skeletons shared with the backend (copied via `npm run sync-api`).
 * The identical files drive the WeasyPrint PDF on the backend.
 */
const SKELETONS: Record<string, string> = {
  'ats-minimal': atsMinimalHtml,
  'ats-classic': atsClassicHtml,
  apollo: apolloHtml,
  terra: terraHtml,
  tempe: tempeHtml,
};

const FALLBACK = 'apollo';

export const CV_TEMPLATE_IDS: readonly string[] = Object.keys(SKELETONS);

export function loadCvTemplateSkeleton(templateId: string): string {
  return SKELETONS[templateId] ?? SKELETONS[FALLBACK];
}
