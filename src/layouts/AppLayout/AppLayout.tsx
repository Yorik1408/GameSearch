import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';
import { ThemeToggle } from '~/components/ThemeToggle';
import { Typography } from '~/components/Typography';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex h-full flex-col gap-4">
    <header className="border-b bg-background ">
      <div className="flex h-16 items-center px-8 py-4 max-sm:px-2">
        <div className="flex w-full items-center gap-6 max-sm:gap-4">
          <Link href="/" className="flex gap-2">
            <Gamepad2 />
            <Typography as="span" className="font-bold">
              Game search
            </Typography>
          </Link>
          <nav className="flex gap-4">
            <Link
              href="/games"
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Games
            </Link>
          </nav>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
    <main className="mx-auto w-full flex-1 px-8 max-sm:px-2">
      {children}
    </main>
  </div>
);
