import type { GetServerSideProps, NextPage } from 'next';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';
import { api } from '~/utils/api';
import { ItemCard, ItemCardSkeleton } from '~/components/ItemCard';
import { buildImageLink } from '~/utils/imageLinkBuilder';
import { useForm } from 'react-hook-form';
import type { GameSearchFormValues } from '~/features/game/components/GameSearchForm/formValues';
import { DEFAULT_FORM_VALUES } from '~/features/game/components/GameSearchForm/formValues';
import { GameSearchForm } from '~/features/game/components/GameSearchForm/GameSearchForm';
import { useState } from 'react';
import { Button } from '~/components/Button';
import { ArrowBigLeftIcon, ArrowBigRightIcon } from 'lucide-react';

export const getServerSideProps: GetServerSideProps = async() => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  await helpers.game.getGames.prefetch({ page: 1, ...DEFAULT_FORM_VALUES });
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

const GameSearchPage: NextPage = () => {
  const formMethods = useForm<GameSearchFormValues>({ defaultValues: DEFAULT_FORM_VALUES });
  const [page, setPage] = useState(1);
  const [formState, setFormState] = useState<GameSearchFormValues>(DEFAULT_FORM_VALUES);
  const { data } = api.game
    .getGames.useQuery({ page, ...formState });

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <GameSearchForm
          formMethods={formMethods}
          onSubmit={d => {
            setPage(1);
            setFormState(d);
          }}
        />
      </div>
      <div className="grid w-full grid-cols-6 gap-4">
        {data != null ? data.results.map(game => (
          <ItemCard
            key={game.slug}
            path={`/games/${game.slug}`}
            title={game?.name ?? ''}
            imageUrl={buildImageLink(game.cover?.image_id ?? '', 'cover_big')}
          />
        )) : Array.from({ length: 18 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ItemCardSkeleton key={index} />
        ))}
      </div>
      <div className="flex w-full justify-center gap-4 py-4">
        <Button
          onClick={() => setPage(p => p - 1)}
          type="button"
          disabled={page === 1}
        >
          <ArrowBigLeftIcon />
        </Button>
        <Button
          type="button"
          onClick={() => setPage(p => p + 1)}
          disabled={!data?.hasNextPage}
        >
          <ArrowBigRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default GameSearchPage;
