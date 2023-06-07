/* eslint-disable react/no-array-index-key */
import type { FC } from 'react';
import { memo } from 'react';
import { api } from '~/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/Card';
import { Poster } from '~/components/Poster';
import { buildImageLink } from '~/utils/imageLinkBuilder';
import { BadgeList } from '~/components/Badge';
import { Typography } from '~/components/Typography';
import { Spoiler } from '~/components/Spoiler/Spoiler';
import { Skeleton } from '~/components/Skeleton';
import type { GameContentProps } from './props';

const GameSimilarComponent: FC<GameContentProps> = ({ game }) => {
  const { data, isLoading } = api
    .game.getSimilarGames.useQuery({ slug: game.slug as string }, { enabled: game.slug != null });

  if (isLoading || data == null) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-[18px] w-2/3" />
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-[_128px_1fr] gap-4">
              <Skeleton className="aspect-[2/3]" />
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  {Array.from({ length: 5 }).map((__, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
                <div className="flex gap-4">
                  {Array.from({ length: 5 }).map((__, j) => (
                    <Skeleton key={j} className="h-4 w-16" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map(g => (
        <Card key={g.id}>
          <CardHeader>
            <CardTitle>{g.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-[_128px_1fr] gap-4">
            <Poster
              src={buildImageLink(g.cover?.image_id ?? '', 'cover_big')}
              alt={g.name ?? ''}
            />
            <div className="flex flex-col gap-2">
              <Spoiler maxHeight={76} hideLabel="Hide" showLabel="Show">
                <Typography>{g.summary}</Typography>
              </Spoiler>
              <BadgeList options={g.genres ?? []} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const GameSimilar = memo(GameSimilarComponent);
