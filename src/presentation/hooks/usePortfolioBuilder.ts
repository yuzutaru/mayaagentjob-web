import { useCallback, useEffect, useRef, useState } from 'react';
import { PortfolioProfile, createEmptyPortfolio } from '../../domain/entities/PortfolioContract';
import { IPortfolioRepository } from '../../domain/repositories/IPortfolioRepository';
import { ImportPortfolioUseCase } from '../../domain/usecases/ImportPortfolioUseCase';
import { SavePortfolioUseCase } from '../../domain/usecases/SavePortfolioUseCase';
import { ExportPortfolioUseCase } from '../../domain/usecases/ExportPortfolioUseCase';

export const DEFAULT_DRAFT_KEY = 'cv-portfolio-draft';

const hasProfileContent = (profile: PortfolioProfile): boolean => {
  const textFields = ['fullName', 'headline', 'bio', 'summary', 'email', 'phone', 'location', 'website', 'avatarUrl'] as const;
  for (const field of textFields) {
    if (profile[field]) return true;
  }
  const listFields = ['socials', 'skills', 'experience', 'education', 'projects', 'certifications', 'articles'] as const;
  for (const field of listFields) {
    if (profile[field].length > 0) return true;
  }
  const empty = createEmptyPortfolio();
  if (profile.theme !== empty.theme || profile.accentColor !== empty.accentColor) return true;
  return false;
};

const loadDraft = (storageKey: string): PortfolioProfile | null => {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PortfolioProfile;
    return typeof parsed === 'object' && parsed !== null && hasProfileContent(parsed)
      ? parsed
      : null;
  } catch {
    return null;
  }
};

const clearDraft = (storageKey: string) => {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // ignore storage failures
  }
};

export interface UsePortfolioBuilderReturn {
  profile: PortfolioProfile;
  isLoading: boolean;
  isExporting: boolean;
  error: string | null;
  notice: string | null;
  draftRestored: boolean;
  hasUnsavedChanges: boolean;
  setProfile: (profile: PortfolioProfile) => void;
  updateProfile: (patch: Partial<PortfolioProfile>) => void;
  resetProfile: () => void;
  importFromProvider: (provider: string, username: string, apiKey?: string) => Promise<void>;
  importLinkedInPdf: (file: File) => Promise<void>;
  saveProfile: () => Promise<PortfolioProfile>;
  exportPdf: (templateId?: string) => Promise<void>;
  exportHtml: () => Promise<void>;
}

export const usePortfolioBuilder = (
  repository: IPortfolioRepository,
  initialProfile?: PortfolioProfile,
  storageKey: string = DEFAULT_DRAFT_KEY,
): UsePortfolioBuilderReturn => {
  const importUseCaseRef = useRef(new ImportPortfolioUseCase(repository));
  const saveUseCaseRef = useRef(new SavePortfolioUseCase(repository));
  const exportUseCaseRef = useRef(new ExportPortfolioUseCase(repository));

  const [draftRestored] = useState<boolean>(() =>
    initialProfile ? false : loadDraft(storageKey) !== null,
  );
  const [profile, setProfile] = useState<PortfolioProfile>(() => {
    if (initialProfile) return initialProfile;
    return loadDraft(storageKey) ?? createEmptyPortfolio();
  });
  const [dirty, setDirty] = useState<boolean>(() =>
    initialProfile ? false : draftRestored,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (initialProfile || typeof localStorage === 'undefined') return;
    if (!hasProfileContent(profile)) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(profile));
    } catch {
      // ignore quota / storage failures
    }
  }, [profile, storageKey, initialProfile]);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  const updateProfile = useCallback((patch: Partial<PortfolioProfile>) => {
    setDirty(true);
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetProfile = useCallback(() => {
    clearDraft(storageKey);
    setDirty(false);
    setProfile(createEmptyPortfolio());
    setError(null);
    setNotice(null);
  }, [storageKey]);

  const runImport = useCallback(
    async (task: () => Promise<PortfolioProfile>, successMessage?: string) => {
      setIsLoading(true);
      setError(null);
      setNotice(null);
      try {
        const result = await task();
        setDirty(true);
        setProfile(result);
        if (successMessage) setNotice(successMessage);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Import failed');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const importFromProvider = useCallback(
    (provider: string, username: string, apiKey?: string) =>
      runImport(
        () => importUseCaseRef.current.execute(provider, username, apiKey),
        `Imported @${username} from ${provider}. Review the details and customize.`,
      ),
    [runImport],
  );

  const importLinkedInPdf = useCallback(
    (file: File) =>
      runImport(
        () => importUseCaseRef.current.executeLinkedInPdf(file),
        `Parsed ${file.name}. Review the extracted details below.`,
      ),
    [runImport],
  );

  const saveProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setNotice(null);
    try {
      const saved = await saveUseCaseRef.current.execute(profile);
      setDirty(false);
      setProfile(saved);
      setNotice('Portfolio saved.');
      return saved;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [profile]);

  const exportPdf = useCallback(
    async (templateId?: string) => {
      setIsExporting(true);
      setError(null);
      try {
        const blob = await exportUseCaseRef.current.exportPdf(profile, templateId);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${profile.fullName.replace(/\s+/g, '_') || 'portfolio'}_CV.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setNotice('PDF downloaded.');
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'PDF export failed');
      } finally {
        setIsExporting(false);
      }
    },
    [profile],
  );

  const exportHtml = useCallback(async () => {
    setIsExporting(true);
    setError(null);
    try {
      const html = await exportUseCaseRef.current.exportHtml(profile);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${profile.fullName.replace(/\s+/g, '_') || 'portfolio'}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setNotice('Self-contained HTML downloaded — host it anywhere.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'HTML export failed');
    } finally {
      setIsExporting(false);
    }
  }, [profile]);

  return {
    profile,
    isLoading,
    isExporting,
    error,
    notice,
    draftRestored,
    hasUnsavedChanges: dirty,
    setProfile,
    updateProfile,
    resetProfile,
    importFromProvider,
    importLinkedInPdf,
    saveProfile,
    exportPdf,
    exportHtml,
  };
};
