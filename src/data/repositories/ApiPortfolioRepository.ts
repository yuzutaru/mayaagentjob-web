import { IPortfolioRepository } from '../../domain/repositories/IPortfolioRepository';
import { PortfolioProfile } from '../../domain/entities/PortfolioContract';
import {
  PortfolioProfileDto,
  mapPortfolioDtoToDomain,
  mapPortfolioToDto,
} from '../dtos/PortfolioDto';

const API_BASE =
  (import.meta.env?.VITE_API_URL as string | undefined) || 'http://localhost:8000/api/v1';

/**
 * Real REST implementation of IPortfolioRepository backed by the Python
 * FastAPI backend (mayaagentjob-backend-python).
 */
export class ApiPortfolioRepository implements IPortfolioRepository {
  private readonly base = API_BASE.replace(/\/$/, '');

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.base}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
    if (!res.ok) {
      let detail = `Request failed (${res.status})`;
      try {
        const body = await res.json();
        if (body?.detail) detail = typeof body.detail === 'string' ? body.detail : JSON.stringify(body.detail);
      } catch {
        /* ignore */
      }
      throw new Error(detail);
    }
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }

  async importFromProvider(provider: string, username: string, apiKey?: string): Promise<PortfolioProfile> {
    const dto = await this.request<PortfolioProfileDto>(`/portfolio/import/${encodeURIComponent(provider)}`, {
      method: 'POST',
      body: JSON.stringify({ username, api_key: apiKey || null }),
    });
    return mapPortfolioDtoToDomain(dto);
  }

  async importLinkedInPdf(file: File): Promise<PortfolioProfile> {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${this.base}/portfolio/import/linkedin-pdf`, { method: 'POST', body: form });
    if (!res.ok) {
      throw new Error(`Import failed (${res.status})`);
    }
    const dto = (await res.json()) as PortfolioProfileDto;
    return mapPortfolioDtoToDomain(dto);
  }

  async save(profile: PortfolioProfile): Promise<PortfolioProfile> {
    const dto = await this.request<PortfolioProfileDto>('/portfolio/profiles', {
      method: 'POST',
      body: JSON.stringify(mapPortfolioToDto(profile)),
    });
    return mapPortfolioDtoToDomain(dto);
  }

  async listByUser(userId = 'temp-user-1'): Promise<PortfolioProfile[]> {
    const dtos = await this.request<PortfolioProfileDto[]>(`/portfolio/profiles?user_id=${encodeURIComponent(userId)}`);
    return dtos.map(mapPortfolioDtoToDomain);
  }

  async getById(id: string): Promise<PortfolioProfile | null> {
    try {
      const dto = await this.request<PortfolioProfileDto>(`/portfolio/profiles/${encodeURIComponent(id)}`);
      return mapPortfolioDtoToDomain(dto);
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<void> {
    await this.request<void>(`/portfolio/profiles/${encodeURIComponent(id)}`, { method: 'DELETE' });
  }

  async exportPdf(profile: PortfolioProfile): Promise<Blob> {
    const res = await fetch(`${this.base}/portfolio/export/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapPortfolioToDto(profile)),
    });
    if (!res.ok) throw new Error(`PDF export failed (${res.status})`);
    return res.blob();
  }

  async exportHtml(profile: PortfolioProfile): Promise<string> {
    const res = await fetch(`${this.base}/portfolio/export/html`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapPortfolioToDto(profile)),
    });
    if (!res.ok) throw new Error(`HTML export failed (${res.status})`);
    return res.text();
  }
}
