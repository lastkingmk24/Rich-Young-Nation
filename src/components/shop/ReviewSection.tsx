import { useMemo, useState } from 'react';
import type { Review } from '@/types';
import { cn, formatDate } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { Check, ChevronDown, Star } from '@/components/ui/Icons';
import { useStore } from '@/store/StoreContext';

type Sort = 'recent' | 'helpful' | 'highest' | 'lowest';

const SORTS: { key: Sort; label: string }[] = [
  { key: 'helpful', label: 'Most helpful' },
  { key: 'recent', label: 'Most recent' },
  { key: 'highest', label: 'Highest rated' },
  { key: 'lowest', label: 'Lowest rated' },
];

const HIDE_BELOW = 3;

export function ReviewSection({
  reviews,
  productName,
  rating,
  reviewCount,
  onWriteReview,
}: {
  reviews: Review[];
  productName: string;
  rating: number;
  reviewCount: number;
  onWriteReview: () => void;
}) {
  const [sort, setSort] = useState<Sort>('helpful');
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [withPhotos, setWithPhotos] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});
  const { toast } = useStore();

  const distribution = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => Math.round(r.rating) === star).length,
    }));
    const total = reviews.length || 1;
    return counts.map((c) => ({ ...c, pct: (c.count / total) * 100 }));
  }, [reviews]);

  const filtered = useMemo(() => {
    let list = reviews.filter((r) => (starFilter ? Math.round(r.rating) === starFilter : true));
    if (withPhotos) list = list.filter((r) => r.verified);
    switch (sort) {
      case 'recent':
        list = [...list].sort((a, b) => +new Date(b.date) - +new Date(a.date));
        break;
      case 'highest':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        list = [...list].sort((a, b) => a.rating - b.rating);
        break;
      default:
        list = [...list].sort((a, b) => b.helpful - a.helpful);
    }
    return list;
  }, [reviews, sort, starFilter, withPhotos]);

  const visible = expanded ? filtered : filtered.slice(0, HIDE_BELOW);

  return (
    <section id="reviews" className="border-t border-ink/10 pt-14 md:pt-20">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow text-smoke">Reviews</p>
          <h2 className="display-md mt-3">What the Nation says</h2>
        </div>
        <Button variant="outline" size="md" onClick={onWriteReview}>
          Write a review
        </Button>
      </div>

      <div className="mt-8 grid gap-8 border-b border-ink/10 pb-8 md:grid-cols-[minmax(0,260px)_1fr] md:gap-12">
        {/* summary */}
        <div>
          <div className="flex items-end gap-3">
            <span className="font-display text-[64px] leading-[0.8]">{rating.toFixed(1)}</span>
            <div className="pb-1">
              <Rating value={rating} size={14} />
              <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-smoke">
                {reviewCount} reviews
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-1.5">
            {distribution.map((d) => {
              const isActive = starFilter === d.star;
              return (
                <li key={d.star}>
                  <button
                    type="button"
                    onClick={() => setStarFilter(isActive ? null : d.star)}
                    className={cn(
                      'group flex w-full items-center gap-2.5 rounded-sm py-0.5 transition-opacity',
                      starFilter && !isActive && 'opacity-45 hover:opacity-100',
                    )}
                    aria-pressed={isActive}
                  >
                    <span className="flex w-7 items-center gap-0.5 font-mono text-[9.5px] text-smoke">
                      {d.star}
                      <Star width={8} height={8} />
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden bg-ink/10">
                      <span
                        className={cn(
                          'block h-full transition-all duration-700',
                          isActive ? 'bg-ink' : 'bg-ink/60 group-hover:bg-ink',
                        )}
                        style={{ width: `${d.pct}%` }}
                      />
                    </span>
                    <span className="w-5 text-right font-mono text-[9px] tabular-nums text-smoke">
                      {d.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 space-y-2 border-t border-ink/10 pt-4">
            <label className="flex cursor-pointer items-center gap-2.5">
              <span
                className={cn(
                  'grid h-[14px] w-[14px] place-items-center border transition-colors',
                  withPhotos ? 'border-ink bg-ink text-paper' : 'border-ink/25',
                )}
              >
                {withPhotos && <Check width={8} height={8} />}
              </span>
              <input
                type="checkbox"
                checked={withPhotos}
                onChange={(e) => setWithPhotos(e.target.checked)}
                className="sr-only"
              />
              <span className="text-[11.5px] text-ink/75">Verified purchases only</span>
            </label>
            {(starFilter || withPhotos) && (
              <button
                type="button"
                onClick={() => {
                  setStarFilter(null);
                  setWithPhotos(false);
                }}
                className="font-mono text-[9px] uppercase tracking-[0.1em] text-smoke underline underline-offset-2 hover:text-ink"
              >
                Reset review filters
              </button>
            )}
          </div>
        </div>

        {/* highights */}
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-ink/10 bg-bone/30 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-smoke">
                Sizing consensus
              </p>
              <p className="mt-2 font-display text-[24px] leading-none">True to size</p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-ink/65">
                {Math.round(
                  (reviews.filter((r) => r.fit === 'True to size').length / (reviews.length || 1)) *
                    100,
                )}
                % of reviewers say this fits as expected.
              </p>
            </div>
            <div className="border border-ink/10 bg-bone/30 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-smoke">
                Would recommend
              </p>
              <p className="mt-2 font-display text-[24px] leading-none">
                {Math.round((reviews.filter((r) => r.rating >= 4).length / (reviews.length || 1)) * 100)}%
              </p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-ink/65">
                Based on {reviews.length} reviews for the {productName}.
              </p>
            </div>
          </div>

          <div className="mt-4 border border-ink/10 p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-smoke">
              Fits in the Nation
            </p>
            <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full">
              <span className="bg-ink/25" style={{ width: '22%' }} title="Runs small" />
              <span className="bg-ink" style={{ width: '61%' }} title="True to size" />
              <span className="bg-ink/45" style={{ width: '17%' }} title="Runs large" />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[8.5px] uppercase tracking-[0.08em] text-smoke">
              <span>Runs small</span>
              <span>True</span>
              <span>Runs large</span>
            </div>
          </div>
        </div>
      </div>

      {/* sort controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 py-4">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-smoke">
          {filtered.length} {filtered.length === 1 ? 'review' : 'reviews'}
          {starFilter ? ` · ${starFilter} star` : ''}
        </p>
        <div className="relative flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-smoke">Sort</span>
          <div className="flex flex-wrap gap-1">
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSort(s.key)}
                className={cn(
                  'px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors',
                  sort === s.key
                    ? 'bg-ink text-paper'
                    : 'text-ink/60 hover:bg-ink/5 hover:text-ink',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* list */}
      <ul className="divide-y divide-ink/10">
        {visible.map((r) => {
          const voted = helpfulVotes[r.id];
          return (
            <li key={r.id} className="py-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-bone-deep font-mono text-[10px] uppercase">
                    {r.author.slice(0, 1)}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[12.5px] font-medium">{r.author}</p>
                      {r.verified && (
                        <span className="inline-flex items-center gap-1 border border-ink/15 px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/60">
                          <Check width={7} height={7} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-smoke">
                      {r.location} · {formatDate(r.date)}
                    </p>
                  </div>
                </div>
                <Rating value={r.rating} size={11} />
              </div>

              <h4 className="mt-3 font-display text-[20px] leading-tight">{r.title}</h4>
              <p className="mt-2 max-w-[68ch] text-[12.5px] leading-relaxed text-ink/70">{r.body}</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-smoke">
                  Size {r.size} · {r.fit}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setHelpfulVotes((prev) => ({ ...prev, [r.id]: !prev[r.id] }));
                    if (!voted)
                      toast({ title: 'Thanks for the feedback', description: 'Marked as helpful.' });
                  }}
                  className={cn(
                    'ml-auto inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.1em] transition-colors',
                    voted
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/15 text-ink/55 hover:border-ink/40 hover:text-ink',
                  )}
                >
                  Helpful ({r.helpful + (voted ? 1 : 0)})
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-[12.5px] text-smoke">
          No reviews match those filters yet.
        </p>
      )}

      {filtered.length > HIDE_BELOW && (
        <div className="flex justify-center border-t border-ink/10 pt-7">
          <Button variant="outline" size="md" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Show fewer reviews' : `Show all ${filtered.length} reviews`}
            <ChevronDown
              width={13}
              height={13}
              className={cn('transition-transform duration-300', expanded && 'rotate-180')}
            />
          </Button>
        </div>
      )}
    </section>
  );
}
