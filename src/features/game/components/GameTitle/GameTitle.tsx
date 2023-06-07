import type { FC } from 'react';
import { memo } from 'react';
import type { proto } from 'ts-igdb-client/proto/compiled';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/HoverCard';
import { Typography } from '~/components/Typography';

interface Props {
  readonly game: proto.IGame;
}

const GameTitleComponent: FC<Props> = ({ game }) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Typography
        className="w-fit cursor-pointer underline-offset-4 selection:bg-primary hover:underline"
        as="h1"
        variant="h2"
      >
        {game?.name}
      </Typography>
    </HoverCardTrigger>
    <HoverCardContent className="w-fit" align="start">
      <div className="flex flex-col gap-2">
        {game.alternative_names?.map(altName => (
          <div key={altName.id}>
            <Typography variant="muted">{altName.comment}</Typography>
            <Typography>{altName.name}</Typography>
          </div>
        ))}
      </div>
    </HoverCardContent>
  </HoverCard>
);

export const GameTitle = memo(GameTitleComponent);
