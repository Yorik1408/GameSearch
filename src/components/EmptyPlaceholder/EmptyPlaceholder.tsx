import type { FC } from 'react';
import { Scroll } from 'lucide-react';
import { Typography } from '../Typography';

export const EmptyPlaceholder: FC = () => (
  <div className="flex h-full flex-col items-center justify-center gap-4">
    <Typography as="h2" variant="h2">
      There is nothing to show here (except this cool scroll)
    </Typography>
    <Scroll size={60} />
  </div>
);
