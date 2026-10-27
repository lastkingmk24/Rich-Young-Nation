import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Marquee({
  children,
  className,
  speed = 'normal',
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: 'normal' | 'slow';
  reverse?: boolean;
}) {
  return (
    <div className={cn('group/marquee relative flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max shrink-0 items-center',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
          'group-hover/marquee:[animation-play-state:paused]',
        )}
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
