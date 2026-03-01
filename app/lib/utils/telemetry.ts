import { OptimizationResult } from '@/lib/types/session';

export type Bucket = 'low' | 'medium-low' | 'medium-high' | 'high';

export function bucketNormalized(value: number): Bucket {
  if (value <= 0.25) return 'low';
  if (value <= 0.5) return 'medium-low';
  if (value <= 0.75) return 'medium-high';
  return 'high';
}

export function isOptimizationCompleted(result: OptimizationResult | undefined): boolean {
  return !result?.skipped && (result?.trialsRun ?? 0) > 0;
}
