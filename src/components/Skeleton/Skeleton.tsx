import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '~/utils/cn';

const Skeleton: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('animate-pulse rounded-md bg-muted', className)}
    {...props}
  />
);

export { Skeleton };
