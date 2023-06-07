import type { FC } from 'react';
import { PosterSkeleton } from '../Poster';
import { Skeleton } from '../Skeleton';

/** Skeleton component for card. */
export const ItemCardSkeleton: FC = () => (
  <div className="flex flex-col gap-1">
    <PosterSkeleton />
    <div className="flex flex-col gap-1">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  </div>
);
