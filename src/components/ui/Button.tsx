import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost' | 'acid' | 'light';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:bg-ink-soft border border-ink disabled:hover:bg-ink',
  acid: 'bg-acid text-ink border border-acid hover:bg-acid-deep hover:border-acid-deep',
  outline:
    'bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink hover:text-paper',
  ghost: 'bg-transparent text-ink border border-transparent hover:bg-ink/5',
  light: 'bg-paper text-ink border border-paper/30 hover:bg-bone',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[11px] tracking-[0.14em]',
  md: 'h-12 px-7 text-[11.5px] tracking-[0.16em]',
  lg: 'h-14 px-9 text-xs tracking-[0.18em]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const shell =
  'group/btn relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden font-mono font-medium uppercase transition-all duration-500 ease-[var(--ease-luxe)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.985]';

export const Button = forwardRef<
  HTMLButtonElement,
  CommonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(
  { variant = 'primary', size = 'md', fullWidth, icon, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(shell, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon}
      </span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-[var(--ease-luxe)] group-hover/btn:translate-x-full" />
    </button>
  );
});

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  fullWidth,
  icon,
  className,
  children,
  onClick,
}: CommonProps & { to: string; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(shell, variants[variant], sizes[size], fullWidth && 'w-full', className)}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon}
      </span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-[var(--ease-luxe)] group-hover/btn:translate-x-full" />
    </Link>
  );
}
