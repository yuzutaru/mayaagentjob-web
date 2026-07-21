import { useState, useEffect, useRef, useMemo } from 'react';
import { JobListing } from '../../domain/entities/JobListing';
import { IJobListingRepository } from '../../domain/repositories/JobListingRepository';
import { FilterJobListingsUseCase } from '../../domain/usecases/FilterJobListingsUseCase';

interface UseJobListingsReturn {
  jobs: JobListing[];
  isLoading: boolean;
  error: string | null;
  categoryId: string | undefined;
  keyword: string | undefined;
  setCategoryId: (id?: string) => void;
  setKeyword: (kw?: string) => void;
  page: number;
  totalPages: number;
  totalCount: number;
  setPage: (page: number) => void;
}

const PAGE_SIZE = 9;

export const useJobListings = (
  repository: IJobListingRepository,
  initialCategoryId?: string,
  initialKeyword?: string,
): UseJobListingsReturn => {
  const useCaseRef = useRef(new FilterJobListingsUseCase(repository));
  const [categoryId, setCategoryIdState] = useState<string | undefined>(initialCategoryId);
  const [keyword, setKeywordState] = useState<string | undefined>(initialKeyword);
  const [allJobs, setAllJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const setCategoryId = (id?: string) => {
    setCategoryIdState(id);
    setPage(1);
  };

  const setKeyword = (kw?: string) => {
    setKeywordState(kw);
    setPage(1);
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await useCaseRef.current.execute(categoryId, keyword);
        if (!cancelled) setAllJobs(result);
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to load job listings');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => { cancelled = true; };
  }, [categoryId, keyword]);

  const paginatedJobs = useMemo(
    () => allJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [allJobs, page],
  );

  const totalPages = Math.max(1, Math.ceil(allJobs.length / PAGE_SIZE));
  const totalCount = allJobs.length;

  return {
    jobs: paginatedJobs,
    isLoading,
    error,
    categoryId,
    keyword,
    setCategoryId,
    setKeyword,
    page,
    totalPages,
    totalCount,
    setPage,
  };
};
