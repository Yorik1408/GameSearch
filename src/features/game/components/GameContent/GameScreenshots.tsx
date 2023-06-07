import type { FC } from 'react';
import { memo } from 'react';
import { api } from '~/utils/api';
import Image from 'next/image';
import { buildImageLink } from '~/utils/imageLinkBuilder';
import { Skeleton } from '~/components/Skeleton';
import type { GameContentProps } from './props';

const GameScreenshotsComponent: FC<GameContentProps> = ({ game }) => {
  const { data: screenshots, isLoading } = api.game.getGameScreenshots
    .useQuery({ id: game.id as number }, { enabled: game.id != null });

  if (isLoading || screenshots == null) {
    return (
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={i} className="aspect-video h-[200px] overflow-hidden rounded-md max-sm:h-fit max-sm:w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {screenshots.map(s => (
        <div key={s.image_id} className="relative aspect-video h-[200px] overflow-hidden rounded-md max-sm:h-fit max-sm:w-full">
          <Image
            alt={game.name ?? 'screenshot'}
            src={buildImageLink(s.image_id ?? '', 'screenshot_med')}
            fill
          />
        </div>
      ))}
    </div>
  );
};

export const GameScreenshots = memo(GameScreenshotsComponent);
