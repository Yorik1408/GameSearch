import { twitchAccessToken, igdb } from 'ts-igdb-client';
import { env } from '~/env.mjs';

export async function igdbClient() {
  const token = await twitchAccessToken({
    client_id: env.TWITCH_CLIENT_ID,
    client_secret: env.TWITCH_CLIENT_SECRET,
  });
  return igdb(env.TWITCH_CLIENT_ID, token);
}
