// src/domain/entities/CandidateOnboardingContract.ts

export type OnboardingStep = 'AUTH_SELECTION' | 'RESUME_INGESTION' | 'PROFILE_CALIBRATION' | 'COMPLETED';

export interface ParsedResumeProfile {
  readonly fullName: string;
  readonly email: string;
  readonly targetDomains: string[];
  readonly technicalStack: string[];
  readonly arrangements: string[];
  readonly targetRegions: string[];
  readonly aiSummary: string;
}

export interface ICandidateOnboardingRepository {
  /**
   * Parses a resume/CV file (or simulated file) and extracts profile features using AI.
   */
  parseResume(file: File | { name: string; size: number }): Promise<ParsedResumeProfile>;

  /**
   * Registers/submits the finalized profile preferences to the backend.
   */
  submitProfile(profile: ParsedResumeProfile): Promise<void>;
}
