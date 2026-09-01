import { useCallback, useRef, useState } from 'react';
import { PortfolioProfile, createEmptyPortfolio } from '../../domain/entities/PortfolioContract';
import { IPortfolioRepository } from '../../domain/repositories/IPortfolioRepository';
import { ImportPortfolioUseCase } from '../../domain/usecases/ImportPortfolioUseCase';
import { SavePortfolioUseCase } from '../../domain/usecases/SavePortfolioUseCase';
import { ExportPortfolioUseCase } from '../../domain/usecases/ExportPortfolioUseCase';

export interface UsePortfolioBuilderReturn {
  profile: PortfolioProfile;
  isLoading: boolean;
  isExporting: boolean;
  error: string | null;
  notice: string | null;
  setProfile: (profile: PortfolioProfile) => void;
  updateProfile: (patch: Partial<PortfolioProfile>) => void;
  resetProfile: () => void;
  importFromProvider: (provider: string, username: string, apiKey?: string) => Promise<void>;
  importLinkedInPdf: (file: File) => Promise<void>;
  saveProfile: () => Promise<PortfolioProfile>;
  exportPdf: () => Promise<void>;
  exportHtml: () => Promise<void>;
}

export const usePortfolioBuilder = (
  repository: IPortfolioRepository,
  initialProfile?: PortfolioProfile,
): UsePortfolioBuilderReturn => {
  const importUseCaseRef = useRef(new ImportPortfolioUseCase(repository));
  const saveUseCaseRef = useRef(new SavePortfolioUseCase(repository));
  const exportUseCaseRef = useRef(new ExportPortfolioUseCase(repository));

  const [profile, setProfile] = useState<PortfolioProfile>(initialProfile ?? createEmptyPortfolio());
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const updateProfile = useCallback((patch: Partial<PortfolioProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(createEmptyPortfolio());
    setError(null);
    setNotice(null);
  }, []);

  const runImport = useCallback(
    async (task: () => Promise<PortfolioProfile>, successMessage?: string) => {
      setIsLoading(true);
      setError(null);
      setNotice(null);
      try {
        const result = await task();
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

  const exportPdf = useCallback(async () => {
    setIsExporting(true);
    setError(null);
    try {
      const blob = await exportUseCaseRef.current.exportPdf(profile);
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
  }, [profile]);

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
