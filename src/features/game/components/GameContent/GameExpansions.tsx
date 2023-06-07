/* eslint-disable react/no-array-index-key */
import type { FC } from 'react';
import { memo } from 'react';
import { api } from '~/utils/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/Card';
import { Poster } from '~/components/Poster';
import { buildImageLink } from '~/utils/imageLinkBuilder';
import { Typography } from '~/components/Typography';
import { Badge } from '~/components/Badge';
import { Skeleton } from '~/components/Skeleton';
import { EmptyPlaceholder } from '~/components/EmptyPlaceholder';
import type { GameContentProps } from './props';

const formatReleaseDate = (timestamp: number | null | undefined) => {
  if (timestamp == null) {
    return 'TBA';
  }

  return Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(timestamp * 1000);
};

const GameExpansionsComponent: FC<GameContentProps> = ({ game }) => {
  const { data, isLoading } = api.game.getGameExpansions
    .useQuery({ slug: game.slug as string }, { enabled: game.slug != null });

  if (isLoading || data == null) {
    return (
      <div className="flex gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-[18px] w-2/3" />
              <Skeleton className="mt-1.5 h-[16px] w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((__, j) => (
                  <div key={j} className="flex gap-4">
                    <Skeleton className="aspect-[2/3] h-[80px]" />
                    <div className="flex h-full flex-col gap-2">
                      <Skeleton className="h-[18px] w-[200px]" />
                      <Skeleton className="h-[16px] w-[150px]" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (data.expansions.length === 0 && data.standalone_expansions.length === 0) {
    return (
      <EmptyPlaceholder />
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {data.expansions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Expansions</CardTitle>
            <CardDescription>DLC and other content</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {data.expansions.map(g => (
              <div key={g.slug} className="flex gap-4">
                <Poster
                  className="h-[80px]"
                  alt={g.name ?? ''}
                  src={buildImageLink(g.cover?.image_id ?? '', 'thumb')}
                />
                <div className="flex h-full flex-col gap-2">
                  <Typography>{g.name}</Typography>
                  <Badge className="w-fit">{formatReleaseDate(g.first_release_date)}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {data.standalone_expansions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Standalone expansions</CardTitle>
            <CardDescription>Expansions that exists as a standalone game</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {data.standalone_expansions.map(g => (
              <div key={g.slug} className="flex gap-4">
                <Poster
                  className="h-[80px]"
                  alt={g.name ?? ''}
                  src={buildImageLink(g.cover?.image_id ?? '', 'thumb')}
                />
                <div className="flex h-full flex-col gap-2">
                  <Typography>{g.name}</Typography>
                  <Badge className="w-fit">{formatReleaseDate(g.first_release_date)}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const GameExpansions = memo(GameExpansionsComponent);
