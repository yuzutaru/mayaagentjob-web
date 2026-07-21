export interface JobListing {
  readonly jobId: string;
  readonly title: string;
  readonly company: string;
  readonly arrangement: string;
  readonly location: string;
  readonly categoryId: string;
  readonly matchScore: number;
  readonly aiSummaryBullets: readonly string[];
}
