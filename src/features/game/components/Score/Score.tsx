import { Angry, Annoyed, Frown, HelpCircle, Laugh, Smile } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';
import { Typography } from '~/components/Typography';

interface Props {
  readonly score: number | undefined | null;
}

const ICON_MAP = {
  veryBad: Angry,
  bad: Frown,
  ok: Annoyed,
  good: Smile,
  veryGood: Laugh,
  unknown: HelpCircle,
};

const getIcon = (score: number | undefined | null) => {
  if (score == null) {
    return ICON_MAP.unknown;
  }
  if (score <= 39) {
    return ICON_MAP.veryBad;
  }
  if (score <= 49) {
    return ICON_MAP.bad;
  }
  if (score <= 70) {
    return ICON_MAP.ok;
  }
  if (score <= 85) {
    return ICON_MAP.good;
  }
  return ICON_MAP.veryGood;
};

const ScoreComponent: FC<Props> = ({ score }) => {
  const Icon = getIcon(score);
  return (
    <div className="flex gap-1">
      <Icon />
      {score != null && <Typography as="span">{score.toFixed()}</Typography>}
    </div>
  );
};

export const Score = memo(ScoreComponent);
