import type { FC, PropsWithChildren, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useElementSize } from '~/hooks/useElementSize';
import { Button } from '../Button';

function createConverter(units: string) {
  return (px: unknown) => {
    if (typeof px === 'number') {
      return `${px / 16}${units}`;
    }

    if (typeof px === 'string') {
      const replaced = px.replace('px', '');
      if (!Number.isNaN(Number(replaced))) {
        return `${Number(replaced) / 16}${units}`;
      }
    }

    return px as string;
  };
}

const rem = createConverter('rem');

interface Props {
  readonly maxHeight: number;
  readonly initialState?: boolean;

  /** Label for close spoiler action */
  readonly hideLabel: ReactNode;

  /** Label for open spoiler action */
  readonly showLabel: ReactNode;
}

export const Spoiler: FC<PropsWithChildren<Props>> = ({
  children,
  maxHeight,
  initialState = false,
  showLabel,
  hideLabel,
}) => {
  const [show, setShowState] = useState(initialState);
  const [spoiler, setSpoilerState] = useState(initialState);
  const { ref: contentRef, height } = useElementSize<HTMLDivElement>();

  const spoilerMoreContent = show ? hideLabel : showLabel;

  useEffect(() => {
    setSpoilerState(maxHeight < height);
  }, [height, maxHeight, children]);

  return (
    <div className="relative">
      <div
        className="flex flex-col overflow-hidden transition-[max-height]"
        style={{
          // eslint-disable-next-line no-nested-ternary
          maxHeight: !show ? rem(maxHeight) : height ? rem(height) : undefined,
        }}
      >
        <div>
          <div ref={contentRef}>{children}</div>
        </div>
      </div>
      {spoiler && (
        <Button className="w-full" variant="link" onClick={() => setShowState(opened => !opened)}>
          {spoilerMoreContent}
        </Button>
      )}
    </div>
  );
};
