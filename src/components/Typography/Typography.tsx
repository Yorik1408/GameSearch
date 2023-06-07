import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ElementType, ReactElement } from 'react';
import { forwardRef } from 'react';
import { cn } from '~/utils/cn';
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from '~/utils/polymorphicProps';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-lg font-semibold tracking-tight',
      p: 'leading-7',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      muted: 'text-sm text-muted-foreground',
      unset: '',
    },
  },
  defaultVariants: {
    variant: 'unset',
  },
});

type TypographyProps<C extends ElementType> =
  PolymorphicComponentPropWithRef<C, VariantProps<typeof typographyVariants>>;

type TypographyComponent = <C extends ElementType>(props: TypographyProps<C>) =>
  ReactElement | null;

// eslint-disable-next-line react/display-name
export const Typography: TypographyComponent = forwardRef(
  <C extends ElementType>(
    { as, variant, children, className, ...rest }: TypographyProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as ?? 'p';
    return (
      <Component
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
