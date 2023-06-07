import type { FC } from 'react';
import { Skeleton } from '../Skeleton';

/** Skeleton for poster component. */
export const PosterSkeleton: FC = () => (
  <Skeleton className="aspect-[2/3] rounded" />
);
