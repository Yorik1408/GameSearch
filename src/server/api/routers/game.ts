import { z } from 'zod';
import { WhereFlags, and, fields, limit, offset, sort, where } from 'ts-igdb-client';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

import type { proto } from 'ts-igdb-client/proto/compiled';
import { igdbClient } from '../igdbClient';

export const gameRouter = createTRPCRouter({
  getGameBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async({ input }) => {
    const client = await igdbClient();
    const { data } = await client.request('games').pipe(
      fields([
        '*',
        'cover.*',
        'alternative_names.*',
        'genres.*',
        'game_engines.*',
        'platforms.*',
        'external_games.*',
        'game_modes.*',
        'involved_companies.*',
        'involved_companies.company.*',
        'keywords.*',
      ]),
      where('slug', '=', input.slug),
      limit(1),
    )
      .execute();

    const game = data[0];

    return game;
  }),
  getGameScreenshots: publicProcedure.input(
    z.object({ id: z.number() }),
  ).query(async({ input }) => {
    const client = await igdbClient();
    const { data } = await client.request('screenshots').pipe(
      fields(['*']),
      where('game', '=', input.id),
    )
      .execute();
    return data;
  }),
  getGameExpansions: publicProcedure.input(
    z.object({ slug: z.string() }),
  ).query(async({ input }) => {
    const client = await igdbClient();
    const { data } = await client.request('games').pipe(
      fields([
        'expansions.name',
        'expansions.slug',
        'expansions.id',
        'expansions.first_release_date',
        'expansions.cover.*',
        'standalone_expansions.name',
        'standalone_expansions.slug',
        'standalone_expansions.id',
        'standalone_expansions.first_release_date',
        'standalone_expansions.cover.*',
      ]),
      where('slug', '=', input.slug),
      limit(1),
    )
      .execute();
    const game = data[0];
    return {
      expansions: game?.expansions ?? [],
      standalone_expansions: game?.standalone_expansions ?? [],
    };
  }),
  getSimilarGames: publicProcedure.input(
    z.object({ slug: z.string() }),
  ).query(async({ input }) => {
    const client = await igdbClient();
    const { data } = await client.request('games').pipe(
      fields([
        'similar_games.name',
        'similar_games.slug',
        'similar_games.id',
        'similar_games.cover.*',
        'similar_games.summary',
        'similar_games.genres.*',
      ]),
      where('slug', '=', input.slug),
      limit(1),
    )
      .execute();
    const game = data[0];
    return game?.similar_games ?? [];
  }),
  getGames: publicProcedure.input(z.object({
    page: z.number(),
    name: z.string(),
    releaseYear: z.tuple([z.number(), z.number()]),
    sortBy: z.string(),
    sortDirection: z.string(),
  })).query(async({ input }) => {
    const PAGE_SIZE = 19;
    const client = await igdbClient();
    const { data } = await client.request('games').pipe(
      fields(['name', 'cover.*', 'slug', 'id']),
      and(
        where('name', '~', input.name, WhereFlags.CONTAINS),
        where('first_release_date', '<', new Date(`${input.releaseYear[1]}-12-31`).getTime() / 1000),
        where('first_release_date', '>', new Date(`${input.releaseYear[0]}-01-01`).getTime() / 1000),
        where('aggregated_rating', '!=', null),
        where('aggregated_rating_count', '>=', 10),
      ),
      sort(input.sortBy as keyof proto.IGame, input.sortDirection as 'asc' | 'desc'),
      offset(input.page === 1 ? 0 : input.page * PAGE_SIZE),
      limit(PAGE_SIZE),
    )
      .execute();

    const hasNextPage = data[18] != null;
    return { results: data.slice(0, 18), hasNextPage };
  }),
});
