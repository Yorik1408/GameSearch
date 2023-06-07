import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';
import { api } from '~/utils/api';
import { Poster } from '~/components/Poster';
import { Typography } from '~/components/Typography';
import { buildImageLink } from '~/utils/imageLinkBuilder';
import { GameTitle } from '~/features/game';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/Tab';
import { gameContent } from '~/features/game/components/GameContent';
import { Spoiler } from '~/components/Spoiler/Spoiler';

export const getServerSideProps: GetServerSideProps = async context => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const slug = context.params?.slug as string;
  await helpers.game.getGameBySlug.prefetch({ slug });
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

const tabs = gameContent.map(g => (
  <TabsTrigger
    disabled={g.isDisabled}
    key={g.value}
    value={g.value}
  >
    {g.label}
  </TabsTrigger>
));

const GamePage: NextPage = () => {
  const { query } = useRouter();
  const { data: game } = api.game
    .getGameBySlug.useQuery({ slug: query.slug as string });

  if (game == null) {
    return null;
  }

  const tabsContent = gameContent.map(g => {
    const Component = g.component;
    return (
      <TabsContent value={g.value} key={g.value}>
        <Component game={game} />
      </TabsContent>
    );
  });

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="grid grid-cols-[_200px_6fr] gap-4 max-sm:grid-cols-[_100px_1fr] max-sm:gap-2">
        {game.cover && (
          <Poster
            alt={game?.name ?? ''}
            className="w-full justify-self-center"
            src={buildImageLink(game.cover.image_id ?? '', 'cover_big')}
          />
        )}
        <div className="flex flex-col gap-2">
          <GameTitle game={game} />
          <Spoiler hideLabel="Hide" showLabel="Show" maxHeight={226}>
            <Typography as="p" variant="p">
              {game?.summary}
            </Typography>
          </Spoiler>
        </div>
      </div>
      <Tabs defaultValue="overview" className="grid grid-cols-[1fr_6fr] gap-4 max-sm:grid-cols-[_100px_6fr] max-sm:gap-2">
        <TabsList variant="vertical">
          {tabs}
        </TabsList>
        {tabsContent}
      </Tabs>

    </div>
  );
};

export default GamePage;
