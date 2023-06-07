import Image from 'next/image';
import type { ComponentProps, FC } from 'react';
import React, { useState, useMemo, memo } from 'react';
import { cn } from '~/utils/cn';

export const POSTER_RATIO = 2 / 3;

type ImageProps = ComponentProps<typeof Image>;

type Props =
  & ImageProps
  & {

    /** Image height, if width isn't provided will use aspect ratio. */
    readonly height?: number;

    /** Image height, if height isn't provided will use aspect ratio. */
    readonly width?: number;

    /** Whether image should be blurred or not. */
    readonly isBlurred?: boolean;

  };

/**
 * Image poster.
 */
const PosterComponent: FC<Props> = ({ className, height, width, isBlurred = false, ...props }) => {
  const style = useMemo(() => {
    if (width == null && height == null) {
      return {};
    }
    return {
      height: height ?? (width ?? 0) / POSTER_RATIO,
      width: width ?? (height ?? 0) * POSTER_RATIO,
    };
  }, [width, height]);

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  /** Handle image loading complete. */
  const handleLoadingComplete = (): void => setIsLoadingComplete(true);

  return (
    <div
      className={cn('relative aspect-[2/3] overflow-hidden rounded transition-colors duration-300', className, {
        'bg-gray-200': !isLoadingComplete,
        'bg-gray-100': isLoadingComplete,
      })}
      style={style}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        className={cn(
          'rounded object-cover opacity-0 mix-blend-multiply transition-all duration-300', {
            'opacity-100': isLoadingComplete,
            'blur': isBlurred,
          },
        )}
        {...props}

        sizes={`${style.width ?? 256}px`}
        fill
        onLoadingComplete={handleLoadingComplete}
      />
    </div>
  );
};

export const Poster = memo(PosterComponent);
