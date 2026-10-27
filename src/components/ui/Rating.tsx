import { Star, StarHalf } from './Icons';
import { cn } from '@/lib/utils';

export function Rating({
  value,
  size = 13,
  className,
  showValue = false,
  count,
}: {
  value: number;
  size?: number;
  className?: string;
  showValue?: boolean;
  count?: number;
}) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.35;

  return (
    <div className={cn('flex items-center gap-1.5', className)} aria-label={`${value} out of 5 stars`}>
      <div className="flex items-center gap-[1px] text-ink">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) return <Star key={i} width={size} height={size} />;
          if (i === full && hasHalf)
            return <StarHalf key={i} width={size} height={size} />;
          return <Star key={i} filled={false} width={size} height={size} className="opacity-30" />;
        })}
      </div>
      {showValue && (
        <span className="font-mono text-[11px] tracking-wider text-smoke">
          {value.toFixed(1)}
          {typeof count === 'number' && <span className="text-smoke/70"> ({count})</span>}
        </span>
      )}
    </div>
  );
}
