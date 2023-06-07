import type { FC } from 'react';
import { memo } from 'react';
import type { GameContentProps } from './props';

const GameDevelopersComponent: FC<GameContentProps> = ({ game }) => {
  const a = 'test';
  return (
    <div>{game.summary}</div>
  );
};

export const GameDevelopers = memo(GameDevelopersComponent);
