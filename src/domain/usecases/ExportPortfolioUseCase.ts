import { PortfolioProfile } from '../entities/PortfolioContract';
import { IPortfolioRepository } from '../repositories/IPortfolioRepository';

export class ExportPortfolioUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  exportPdf(profile: PortfolioProfile): Promise<Blob> {
    return this.repository.exportPdf(profile);
  }

  exportHtml(profile: PortfolioProfile): Promise<string> {
    return this.repository.exportHtml(profile);
  }
}
