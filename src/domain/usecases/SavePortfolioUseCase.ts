import { PortfolioProfile } from '../entities/PortfolioContract';
import { IPortfolioRepository } from '../repositories/IPortfolioRepository';

export class SavePortfolioUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  execute(profile: PortfolioProfile): Promise<PortfolioProfile> {
    return this.repository.save(profile);
  }
}
