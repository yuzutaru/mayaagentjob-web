/**
 * Pure TypeScript domain contract for CV template selection (CV Export flow).
 * Mirrors the template ids supported by the backend PDF renderer.
 * Zero framework dependencies.
 */

export type CvTemplateCategory = 'ats' | 'modern';

export interface CvTemplateContract {
  readonly id: string; // matches backend renderer template key, e.g. 'ats-minimal'
  readonly name: string;
  readonly category: CvTemplateCategory; // 'ats' groups ATS-friendly single-column templates
  readonly isAts: boolean;
  readonly description: string;
  readonly accentColor?: string; // visual hint color for preview swatches
}
