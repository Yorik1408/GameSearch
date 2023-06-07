import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ElementRef, ComponentPropsWithoutRef, FC } from 'react';
import { forwardRef } from 'react';
import { cn } from '~/utils/cn';

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva('items-center justify-center rounded-md p-1 text-muted-foreground', {
  variants: {
    variant: {
      vertical: '<py-2></py-2> flex w-full flex-col justify-start gap-2',
      horizontal: 'inline-flex h-10 bg-muted',
    },
  },
  defaultVariants: {
    variant: 'horizontal',
  },
});

type TabsListProps = typeof TabsPrimitive.List;

const TabsList = forwardRef<
  ElementRef<TabsListProps>,
  ComponentPropsWithoutRef<TabsListProps> & VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(className, tabsListVariants({ variant }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}

    // TODO: Add horizontal theming
    className={cn(
      'inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-muted data-[state=active]:text-foreground',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

interface Tab<P> {
  readonly label: string;
  readonly value: string;
  readonly component: FC<P>;
  readonly isDisabled?: boolean;
}

export { Tabs, TabsList, TabsTrigger, TabsContent, type Tab };
