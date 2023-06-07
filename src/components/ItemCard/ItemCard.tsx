import type { FC } from 'react';
import { memo } from 'react';
import Link from 'next/link';
import { Poster } from '../Poster/Poster';

interface Props {

  /** Card image url. */
  readonly imageUrl?: string;

  /** Title. */
  readonly title: string;

  /** Path to entity. */
  readonly path: string;
}

/** Card component. */
const ItemCardComponent: FC<Props> = ({ title, imageUrl = '', path }) => (
  <Link href={path}>
    <div className="flex flex-col gap-1">
      <Poster
        alt={title}
        src={imageUrl}
      />
      <div className="line-clamp-2 whitespace-normal">{title}</div>
    </div>
  </Link>
);

export const ItemCard = memo(ItemCardComponent);
