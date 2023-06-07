import type { PropsWithChildren } from 'react';

/** Generic to provide `className` to props. */
export type PropsWithClass<T = unknown> = T & {
  readonly className?: string;
};

export type PropsWithChildrenAndClass<T = unknown> = PropsWithChildren<PropsWithClass<T>>;
