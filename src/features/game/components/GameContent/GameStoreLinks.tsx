import type { FC } from 'react';
import { memo } from 'react';
import Link from 'next/link';
import { LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/Card';
import type { GameContentProps } from './props';

const GameStoreLinksComponent: FC<GameContentProps> = ({ game }) => {
  const shopLinks = game.external_games?.filter(g => g.name && g.url).map(g => (
    <Link
      key={g.id}
      className="flex items-center gap-1 text-primary underline-offset-4 hover:underline"
      href={g.url ?? '#'}
    >
      {g.name}
      <LinkIcon height={16} />
    </Link>
  ));

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>
          List of shops, where you can buy
          {' '}
          <em>{game.name}</em>
        </CardTitle>
        <CardDescription>
          Verified list of links to all major marketplaces
        </CardDescription>
      </CardHeader>
      <CardContent>
        {shopLinks}
      </CardContent>
    </Card>
  );
};

export const GameStoreLinks = memo(GameStoreLinksComponent);
