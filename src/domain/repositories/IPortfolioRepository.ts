import { PortfolioProfile } from '../entities/PortfolioContract';

export interface IPortfolioRepository {
  importFromProvider(provider: string, username: string, apiKey?: string): Promise<PortfolioProfile>;

  importLinkedInPdf(file: File): Promise<PortfolioProfile>;

  save(profile: PortfolioProfile): Promise<PortfolioProfile>;

  listByUser(userId?: string): Promise<PortfolioProfile[]>;

  getById(id: string): Promise<PortfolioProfile | null>;

  delete(id: string): Promise<void>;

  exportPdf(profile: PortfolioProfile): Promise<Blob>;

  exportHtml(profile: PortfolioProfile): Promise<string>;
}
