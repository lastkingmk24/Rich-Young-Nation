import { type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
  variant = 'up',
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  variant?: 'up' | 'mask';
}) {
  return (
    <Tag
      className={cn(variant === 'mask' ? 'reveal-mask' : 'reveal', className)}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
