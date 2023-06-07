import type { Tab } from '~/components/Tab';
import { GameOverview } from './GameOverview';
import { GameSimilar } from './GameSimiliar';
import { GameStoreLinks } from './GameStoreLinks';
import type { GameContentProps } from './props';
import { GameDevelopers } from './GameDevelopers';
import { GameExpansions } from './GameExpansions';
import { GameScreenshots } from './GameScreenshots';

export const gameContent = [
  {
    label: 'Overview',
    component: GameOverview,
    value: 'overview',
  },
  {
    label: 'Developers',
    component: GameDevelopers,
    value: 'developers',
    isDisabled: true,
  },
  {
    label: 'Expansions',
    component: GameExpansions,
    value: 'expansions',
  },
  {
    label: 'Screenshots',
    component: GameScreenshots,
    value: 'screenshots',
  },
  {
    label: 'Similar',
    component: GameSimilar,
    value: 'similar',
  },
  {
    label: 'Store links',
    component: GameStoreLinks,
    value: 'store-links',
  },
] satisfies Tab<GameContentProps>[];
