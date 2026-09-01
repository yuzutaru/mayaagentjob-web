import { PortfolioProfile } from '../entities/PortfolioContract';
import { IPortfolioRepository } from '../repositories/IPortfolioRepository';

export class ImportPortfolioUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  execute(provider: string, username: string, apiKey?: string): Promise<PortfolioProfile> {
    return this.repository.importFromProvider(provider, username, apiKey);
  }

  executeLinkedInPdf(file: File): Promise<PortfolioProfile> {
    return this.repository.importLinkedInPdf(file);
  }
}
