// src/presentation/hooks/useCandidateOnboardingViewModel.ts
import { useState, useCallback } from 'react';
import { OnboardingStep, ParsedResumeProfile, ICandidateOnboardingRepository } from '../../domain/entities/CandidateOnboardingContract';

export interface UseCandidateOnboardingViewModelReturn {
  currentStep: OnboardingStep;
  fileName: string | null;
  isParsing: boolean;
  isSubmitting: boolean;
  error: string | null;
  profile: ParsedResumeProfile | null;
  selectAuthMethod: (method: string) => void;
  uploadResume: (file: { name: string; size: number }) => Promise<void>;
  skipResume: () => void;
  updateProfileField: <K extends keyof ParsedResumeProfile>(field: K, value: ParsedResumeProfile[K]) => void;
  submitProfile: () => Promise<void>;
  reset: () => void;
}

export const useCandidateOnboardingViewModel = (
  repository: ICandidateOnboardingRepository,
  onComplete: (profile: ParsedResumeProfile) => void
): UseCandidateOnboardingViewModelReturn => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('AUTH_SELECTION');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ParsedResumeProfile | null>(null);

  const selectAuthMethod = useCallback((method: string) => {
    // Authenticated successfully in simulation, move to resume ingestion
    setCurrentStep('RESUME_INGESTION');
  }, []);

  const uploadResume = useCallback(async (file: { name: string; size: number }) => {
    setFileName(file.name);
    setIsParsing(true);
    setError(null);
    try {
      const parsed = await repository.parseResume(file);
      setProfile(parsed);
      setCurrentStep('PROFILE_CALIBRATION');
    } catch (err: any) {
      setError(err.message || 'Failed to parse resume');
    } finally {
      setIsParsing(false);
    }
  }, [repository]);

  const skipResume = useCallback(() => {
    // Fill in default blank/basic details for manual input
    setProfile({
      fullName: 'New Candidate',
      email: 'candidate@example.com',
      targetDomains: [],
      technicalStack: [],
      arrangements: [],
      targetRegions: [],
      aiSummary: 'Manual profile setup.',
    });
    setFileName(null);
    setCurrentStep('PROFILE_CALIBRATION');
  }, []);

  const updateProfileField = useCallback(<K extends keyof ParsedResumeProfile>(
    field: K,
    value: ParsedResumeProfile[K]
  ) => {
    setProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  }, []);

  const submitProfile = useCallback(async () => {
    if (!profile) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await repository.submitProfile(profile);
      setCurrentStep('COMPLETED');
      onComplete(profile);
    } catch (err: any) {
      setError(err.message || 'Failed to submit profile');
    } finally {
      setIsSubmitting(false);
    }
  }, [profile, repository, onComplete]);

  const reset = useCallback(() => {
    setCurrentStep('AUTH_SELECTION');
    setFileName(null);
    setIsParsing(false);
    setIsSubmitting(false);
    setError(null);
    setProfile(null);
  }, []);

  return {
    currentStep,
    fileName,
    isParsing,
    isSubmitting,
    error,
    profile,
    selectAuthMethod,
    uploadResume,
    skipResume,
    updateProfileField,
    submitProfile,
    reset,
  };
};
