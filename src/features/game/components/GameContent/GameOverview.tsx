import type { FC } from 'react';
import { useMemo, memo } from 'react';
import { Typography } from '~/components/Typography';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/Card';
import { Badge, BadgeList } from '~/components/Badge';
import type { proto } from 'ts-igdb-client/proto/compiled';
import type { GameContentProps } from './props';
import { Score } from '../Score';

const GameOverviewComponent: FC<GameContentProps> = ({ game }) => {
  const releaseDate = useMemo(() => {
    if (game.first_release_date == null) {
      return 'TBA';
    }

    return Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(game.first_release_date * 1000);
  }, [game.first_release_date]);

  return (
    <div className="flex flex-wrap gap-4">
      {game.storyline && (
        <Card>
          <CardHeader>
            <CardTitle>
              Storyline
            </CardTitle>
            <CardDescription>
              Base story description
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Typography as="p" variant="p">{game.storyline}</Typography>
          </CardContent>
        </Card>
      )}

      {releaseDate && (
        <Card>
          <CardHeader>
            <CardTitle>
              Release date
            </CardTitle>
            <CardDescription>
              First release date (like first platform release)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge>{releaseDate}</Badge>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            Score
          </CardTitle>
          <CardDescription>
            Based on multiple reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Typography variant="muted">
                Critics score (based on
                {' '}
                <b>{game.aggregated_rating_count}</b>
                {' '}
                reviews)
              </Typography>
              <Score score={game.aggregated_rating} />
            </div>
            <div className="flex flex-col gap-1">
              <Typography variant="muted">
                User score (based on
                {' '}
                <b>{game.rating_count}</b>
                {' '}
                reviews)
              </Typography>
              <Score score={game.rating} />
            </div>
          </div>
        </CardContent>
      </Card>

      {game.involved_companies && (
        <Card>
          <CardHeader>
            <CardTitle>Publishers</CardTitle>
            <CardDescription>Companies that published the game</CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeList
              options={game.involved_companies
                .filter(c => c.publisher && c.company).map(c => c.company as proto.ICompany)}
            />
          </CardContent>
        </Card>
      )}

      {game.involved_companies && (
        <Card>
          <CardHeader>
            <CardTitle>Developers</CardTitle>
            <CardDescription>Companies that took part in development</CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeList
              options={game.involved_companies
                .filter(c => (c.developer || c.supporting || c.porting) && c.company)
                .map(c => c.company as proto.ICompany)}
            />
          </CardContent>
        </Card>
      )}

      {game.genres && (
        <Card>
          <CardHeader>
            <CardTitle>Genres</CardTitle>
            <CardDescription>Game genres</CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeList options={game.genres} />
          </CardContent>
        </Card>
      )}

      {game.platforms && (
        <Card>
          <CardHeader>
            <CardTitle>Platforms</CardTitle>
            <CardDescription>List of platforms the game was released</CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeList options={game.platforms} />
          </CardContent>
        </Card>
      )}

      {game.game_engines && (
        <Card>
          <CardHeader>
            <CardTitle>Game Engines</CardTitle>
            <CardDescription>List of game engines the game was developed</CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeList options={game.game_engines} />
          </CardContent>
        </Card>
      )}

      {game.game_modes && (
        <Card>
          <CardHeader>
            <CardTitle>Available game modes</CardTitle>
            <CardDescription>Game modes that are presented in the game</CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeList options={game.game_modes} />
          </CardContent>
        </Card>
      )}

      {game.keywords && (
        <Card>
          <CardHeader>
            <CardTitle>Keywords</CardTitle>
            <CardDescription>List of keywords that can describe the game</CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeList options={game.keywords} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const GameOverview = memo(GameOverviewComponent);
