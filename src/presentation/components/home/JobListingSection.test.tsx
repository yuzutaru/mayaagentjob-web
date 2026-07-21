import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TranslationProvider } from '../../../core/i18n/TranslationContext';
import { JobListingSection } from './JobListingSection';
import { JobListing } from '../../../domain/entities/JobListing';

const makeJob = (id: string): JobListing => ({
  jobId: id, title: `Job ${id}`, company: 'Co',
  arrangement: 'Remote', location: 'Jakarta', categoryId: 'cat-1',
  matchScore: 80, aiSummaryBullets: ['Skill'],
});

const twoJobs: JobListing[] = [makeJob('j1'), makeJob('j2')];
const manyJobs: JobListing[] = Array.from({ length: 20 }, (_, i) => makeJob(`j${i + 1}`));

const defaultPagination = {
  page: 1, totalPages: 1, totalCount: 2, onPageChange: vi.fn(),
};

const renderComponent = (
  jobs: readonly JobListing[],
  isLoading = false,
  pagination = defaultPagination,
) =>
  render(
    <TranslationProvider>
      <JobListingSection
        jobs={jobs}
        isLoading={isLoading}
        {...pagination}
      />
    </TranslationProvider>
  );

describe('JobListingSection', () => {
  it('renders a loading spinner while isLoading is true', () => {
    renderComponent([], true, { page: 1, totalPages: 1, totalCount: 0, onPageChange: vi.fn() });
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeTruthy();
  });

  it('renders job cards for each listing', () => {
    renderComponent(twoJobs);
    expect(screen.getByText('Job j1')).toBeTruthy();
    expect(screen.getByText('Job j2')).toBeTruthy();
  });

  it('renders empty state when jobs array is empty', () => {
    renderComponent([], false, { page: 1, totalPages: 1, totalCount: 0, onPageChange: vi.fn() });
    expect(screen.getByText(/no jobs match your filters/i)).toBeTruthy();
  });

  it('shows totalCount in the header', () => {
    renderComponent(twoJobs, false, { page: 1, totalPages: 1, totalCount: 14, onPageChange: vi.fn() });
    expect(screen.getByText(/14/)).toBeTruthy();
  });

  describe('pagination bar', () => {
    it('does not render pagination when totalPages is 1', () => {
      renderComponent(twoJobs);
      expect(screen.queryByText('Prev')).toBeNull();
      expect(screen.queryByText('Next')).toBeNull();
    });

    it('renders page numbers and nav buttons when totalPages > 1', () => {
      renderComponent(manyJobs, false, {
        page: 1, totalPages: 3, totalCount: 20, onPageChange: vi.fn(),
      });
      expect(screen.getByText('Prev')).toBeTruthy();
      expect(screen.getByText('Next')).toBeTruthy();
      expect(screen.getByText('1')).toBeTruthy();
      expect(screen.getByText('2')).toBeTruthy();
      expect(screen.getByText('3')).toBeTruthy();
    });

    it('disables Prev on page 1', () => {
      renderComponent(manyJobs, false, {
        page: 1, totalPages: 3, totalCount: 20, onPageChange: vi.fn(),
      });
      const prev = screen.getByText('Prev').closest('button');
      expect(prev?.disabled).toBe(true);
    });

    it('disables Next on last page', () => {
      renderComponent(manyJobs, false, {
        page: 3, totalPages: 3, totalCount: 20, onPageChange: vi.fn(),
      });
      const next = screen.getByText('Next').closest('button');
      expect(next?.disabled).toBe(true);
    });

    it('calls onPageChange when a page number is clicked', () => {
      const onPageChange = vi.fn();
      renderComponent(manyJobs, false, {
        page: 1, totalPages: 3, totalCount: 20, onPageChange,
      });
      fireEvent.click(screen.getByText('2'));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when Next is clicked', () => {
      const onPageChange = vi.fn();
      renderComponent(manyJobs, false, {
        page: 1, totalPages: 3, totalCount: 20, onPageChange,
      });
      fireEvent.click(screen.getByText('Next'));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when Prev is clicked', () => {
      const onPageChange = vi.fn();
      renderComponent(manyJobs, false, {
        page: 2, totalPages: 3, totalCount: 20, onPageChange,
      });
      fireEvent.click(screen.getByText('Prev'));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });
  });
});
