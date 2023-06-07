import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { FC, HTMLAttributes } from 'react';
import { cn } from '~/utils/cn';
import { Typography } from '../Typography';

const badgeVariants = cva(
  'inline-flex items-center border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'md',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);

interface BadgeListOption {
  readonly id?: number | null | undefined;
  readonly name?: string | null | undefined;
}

interface BadgeListProps {
  readonly label?: string;
  readonly options: BadgeListOption[];
}

const BadgeList: FC<BadgeListProps> = ({ options, label }) => (
  <>
    {options.length > 0 && (
      <div className="flex flex-col gap-1">
        {label && <Typography as="span" variant="p">{label}</Typography>}
        <div className="flex flex-wrap gap-2">
          {options.map(option => (
            <Badge key={option.id}>
              {option.name}
            </Badge>
          ))}
        </div>
      </div>
    )}
  </>
);

export { Badge, BadgeList, badgeVariants };
