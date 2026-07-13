// src/data/repositories/MockCandidateOnboardingRepository.ts
import { ICandidateOnboardingRepository, ParsedResumeProfile } from '../../domain/entities/CandidateOnboardingContract';

export class MockCandidateOnboardingRepository implements ICandidateOnboardingRepository {
  async parseResume(file: File | { name: string; size: number }): Promise<ParsedResumeProfile> {
    // Simulate network and AI extraction latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const isLinkedIn = file.name.toLowerCase().includes('linkedin') || file.name.toLowerCase().includes('profile');

    if (isLinkedIn) {
      return {
        fullName: 'Alex Morgan (LinkedIn Import)',
        email: 'alex.morgan@linkedin-user.com',
        targetDomains: ['Product Management', 'Technical Program Management'],
        technicalStack: ['Agile Roadmap', 'Jira', 'Product Strategy', 'SQL', 'A/B Testing', 'React (Basic)'],
        arrangements: ['Remote', 'Hybrid'],
        targetRegions: ['Singapore', 'US-Remote', 'Jakarta'],
        aiSummary: 'Product Manager with 5 years of experience leading cross-functional engineering teams and scaling analytics-driven features.',
      };
    }

    // Default mock resume parsing (Software Developer / Tech)
    return {
      fullName: 'Jane Doe',
      email: 'jane.doe@example.com',
      targetDomains: ['Programming and Tech', 'Software Engineering'],
      technicalStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Git'],
      arrangements: ['Remote'],
      targetRegions: ['Jakarta', 'Singapore'],
      aiSummary: 'Detail-oriented Frontend Engineer specializing in building responsive React applications with modern design systems and clean state management.',
    };
  }

  async submitProfile(profile: ParsedResumeProfile): Promise<void> {
    // Simulate submitting the profile to Supabase database profiles table
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Successfully saved user profile to Supabase:', profile);
  }
}
