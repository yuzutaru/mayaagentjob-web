// src/presentation/components/auth/CandidateOnboardingModal.tsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Upload, 
  Linkedin, 
  Github, 
  Chrome, 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  Loader2, 
  Plus, 
  Info,
  ChevronRight
} from 'lucide-react';
import { useCandidateOnboardingViewModel } from '../../hooks/useCandidateOnboardingViewModel';
import { MockCandidateOnboardingRepository } from '../../../data/repositories/MockCandidateOnboardingRepository';
import { ParsedResumeProfile } from '../../../domain/entities/CandidateOnboardingContract';

interface CandidateOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: ParsedResumeProfile) => void;
}

export const CandidateOnboardingModal: React.FC<CandidateOnboardingModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [tagInputs, setTagInputs] = useState({
    domain: '',
    tech: '',
    region: '',
  });

  const repository = new MockCandidateOnboardingRepository();
  const viewModel = useCandidateOnboardingViewModel(repository, onSuccess);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      viewModel.uploadResume({ name: file.name, size: file.size });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      viewModel.uploadResume({ name: file.name, size: file.size });
    }
  };

  const triggerMockUpload = (fileName: string) => {
    viewModel.uploadResume({ name: fileName, size: 1024 * 50 });
  };

  const handleAddTag = (field: 'targetDomains' | 'technicalStack' | 'targetRegions', type: 'domain' | 'tech' | 'region') => {
    const text = tagInputs[type].trim();
    if (text && viewModel.profile) {
      const currentList = viewModel.profile[field] as string[];
      if (!currentList.includes(text)) {
        viewModel.updateProfileField(field, [...currentList, text]);
      }
      setTagInputs({ ...tagInputs, [type]: '' });
    }
  };

  const handleRemoveTag = (field: 'targetDomains' | 'technicalStack' | 'targetRegions', tagToRemove: string) => {
    if (viewModel.profile) {
      const currentList = viewModel.profile[field] as string[];
      viewModel.updateProfileField(field, currentList.filter(tag => tag !== tagToRemove));
    }
  };

  const toggleArrangement = (arrangement: string) => {
    if (viewModel.profile) {
      const currentArrangements = viewModel.profile.arrangements;
      if (currentArrangements.includes(arrangement)) {
        viewModel.updateProfileField(
          'arrangements',
          currentArrangements.filter((a) => a !== arrangement)
        );
      } else {
        viewModel.updateProfileField('arrangements', [...currentArrangements, arrangement]);
      }
    }
  };

  const renderStepsIndicator = () => {
    const steps = [
      { id: 'AUTH_SELECTION', label: 'Auth' },
      { id: 'RESUME_INGESTION', label: 'CV Parse' },
      { id: 'PROFILE_CALIBRATION', label: 'Calibrate' },
    ];

    const currentStepIndex = steps.findIndex(s => s.id === viewModel.currentStep);

    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            {idx > 0 && (
              <ChevronRight className={`w-4 h-4 ${idx <= currentStepIndex ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'}`} />
            )}
            <div className="flex items-center gap-1.5">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                idx < currentStepIndex
                  ? 'bg-emerald-500 text-white'
                  : idx === currentStepIndex
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {idx + 1}
              </span>
              <span className={`text-xs font-medium ${
                idx <= currentStepIndex ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'
              }`}>
                {step.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 max-h-[85vh] overflow-y-auto">
          
          {/* Header */}
          {viewModel.currentStep !== 'COMPLETED' && (
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Join Maya</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Accelerate your job matching journey with AI</p>
            </div>
          )}

          {/* Steps Breadcrumbs */}
          {viewModel.currentStep !== 'COMPLETED' && renderStepsIndicator()}

          {/* Step Content */}
          {viewModel.currentStep === 'AUTH_SELECTION' && (
            <div className="space-y-4">
              <button
                onClick={() => viewModel.selectAuthMethod('github')}
                className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 flex items-center justify-center gap-3 font-semibold text-slate-800 dark:text-slate-100 transition-all duration-200 active:scale-[0.99]"
              >
                <Github className="w-5 h-5 text-slate-900 dark:text-white" />
                <span>Continue with GitHub</span>
              </button>

              <button
                onClick={() => viewModel.selectAuthMethod('linkedin')}
                className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 flex items-center justify-center gap-3 font-semibold text-slate-800 dark:text-slate-100 transition-all duration-200 active:scale-[0.99]"
              >
                <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Continue with LinkedIn</span>
              </button>

              <button
                onClick={() => viewModel.selectAuthMethod('google')}
                className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 flex items-center justify-center gap-3 font-semibold text-slate-800 dark:text-slate-100 transition-all duration-200 active:scale-[0.99]"
              >
                <Chrome className="w-5 h-5 text-red-500" />
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              </div>

              <button
                onClick={() => viewModel.selectAuthMethod('email')}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-3 font-semibold shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.99]"
              >
                <Mail className="w-5 h-5" />
                <span>Sign Up with Email</span>
              </button>
            </div>
          )}

          {viewModel.currentStep === 'RESUME_INGESTION' && (
            <div className="space-y-6">
              {viewModel.isParsing ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-emerald-500">AI</div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Parsing Profile Details...</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs text-center">
                    Maya is reading & Converting {viewModel.fileName} to match domain structures.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/20 cursor-pointer transition-all duration-200"
                  >
                    <input
                      type="file"
                      id="resume-file"
                      className="hidden"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="resume-file" className="cursor-pointer flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                        Drag & drop CV / Resume or LinkedIn PDF Export
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                        Supports PDF, DOCX up to 10MB
                      </p>
                    </label>
                  </div>

                  <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-xl p-4 flex gap-3 text-sm text-blue-700 dark:text-blue-300">
                    <Info className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">LinkedIn Tip:</span> Export your profile page to PDF using LinkedIn's "More → Save to PDF" feature, and drag it here for instant import.
                    </div>
                  </div>

                  {/* Simulator Shortcuts */}
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Simulator Quick-Picks:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button
                        onClick={() => triggerMockUpload('cv_software_engineer.pdf')}
                        className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 font-medium transition-all"
                      >
                        📄 Software Engineer CV
                      </button>
                      <button
                        onClick={() => triggerMockUpload('linkedin_product_manager_export.pdf')}
                        className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 font-medium transition-all"
                      >
                        🔵 LinkedIn PDF (Product Mgr)
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={viewModel.skipResume}
                      className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    >
                      Skip and Fill Manually
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {viewModel.currentStep === 'PROFILE_CALIBRATION' && viewModel.profile && (
            <div className="space-y-6">
              <div className="bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 p-4 rounded-xl flex gap-3 text-sm">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">AI Profile Parsed successfully!</span> Review and refine your details below to ensure precise matching.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={viewModel.profile.fullName}
                    onChange={(e) => viewModel.updateProfileField('fullName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={viewModel.profile.email}
                    onChange={(e) => viewModel.updateProfileField('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Target Domains (Roles) */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Target Roles</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {viewModel.profile.targetDomains.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700">
                      {tag}
                      <button onClick={() => handleRemoveTag('targetDomains', tag)} className="hover:text-red-500 font-bold ml-0.5">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add target role (e.g., Frontend Developer)"
                    value={tagInputs.domain}
                    onChange={(e) => setTagInputs({ ...tagInputs, domain: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag('targetDomains', 'domain')}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                  <button
                    onClick={() => handleAddTag('targetDomains', 'domain')}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Technical Stack / Skills */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Technical Stack & Skills</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {viewModel.profile.technicalStack.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
                      {tag}
                      <button onClick={() => handleRemoveTag('technicalStack', tag)} className="hover:text-red-500 font-bold ml-0.5">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add technology or skill (e.g., React)"
                    value={tagInputs.tech}
                    onChange={(e) => setTagInputs({ ...tagInputs, tech: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag('technicalStack', 'tech')}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                  <button
                    onClick={() => handleAddTag('technicalStack', 'tech')}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Work Arrangement Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Work Arrangements</label>
                <div className="flex gap-2">
                  {['Remote', 'Hybrid', 'On-site'].map((opt) => {
                    const active = viewModel.profile?.arrangements.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleArrangement(opt)}
                        className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                          active
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target Regions / Cities */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Target Locations / Regions</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {viewModel.profile.targetRegions.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700">
                      {tag}
                      <button onClick={() => handleRemoveTag('targetRegions', tag)} className="hover:text-red-500 font-bold ml-0.5">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add location (e.g., Singapore)"
                    value={tagInputs.region}
                    onChange={(e) => setTagInputs({ ...tagInputs, region: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag('targetRegions', 'region')}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                  <button
                    onClick={() => handleAddTag('targetRegions', 'region')}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* AI profile summary */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">AI Profile Summary</label>
                <textarea
                  value={viewModel.profile.aiSummary}
                  onChange={(e) => viewModel.updateProfileField('aiSummary', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => viewModel.reset()}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold text-slate-600 dark:text-slate-300 transition-all text-sm"
                >
                  Start Over
                </button>
                <button
                  onClick={viewModel.submitProfile}
                  disabled={viewModel.isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all text-sm disabled:opacity-50"
                >
                  {viewModel.isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Save & Complete Onboarding</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {viewModel.currentStep === 'COMPLETED' && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/15">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">All Set! Onboarding Complete</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
                  We've successfully updated your candidate profile preferences. Redirecting you to your curated AI job matching feed...
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
              >
                Let's Find Jobs!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};
