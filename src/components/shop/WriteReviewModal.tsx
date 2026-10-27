import { useEffect, useState } from 'react';
import type { Review } from '@/types';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/useReveal';
import { Button } from '@/components/ui/Button';
import { Check, Close, Star } from '@/components/ui/Icons';

const FITS = ['Runs small', 'True to size', 'Runs large'] as const;

export function WriteReviewModal({
  open,
  onClose,
  productName,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  productName: string;
  onSubmit: (review: Review) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('M');
  const [fit, setFit] = useState<string>('True to size');
  const [errors, setErrors] = useState<Record<string, string>>({});
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!rating) next.rating = 'Add a star rating';
    if (title.trim().length < 3) next.title = 'Give your review a headline';
    if (body.trim().length < 20) next.body = 'Tell us a little more (20+ characters)';
    if (author.trim().length < 2) next.author = 'Add a display name';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSubmit({
      id: `user_${Date.now()}`,
      productId: '',
      author: author.trim(),
      location: location.trim() || 'Verified buyer',
      rating,
      title: title.trim(),
      body: body.trim(),
      date: new Date().toISOString().slice(0, 10),
      verified: true,
      size,
      fit,
      helpful: 0,
    });
    setRating(0);
    setTitle('');
    setBody('');
    setAuthor('');
    setLocation('');
    setErrors({});
  };

  const inputCls =
    'h-11 w-full border border-ink/15 bg-transparent px-3 text-[13px] outline-none transition-colors focus:border-ink';

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close review form"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink/50 backdrop-blur-sm"
      />
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-label={`Write a review for ${productName}`}
        className="relative max-h-[92vh] w-full animate-fade-up overflow-y-auto bg-paper p-5 sm:max-w-[560px] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-smoke">Reviews</p>
            <h2 className="display-md mt-2 text-[26px]">Write a review</h2>
            <p className="mt-1.5 text-[12px] text-smoke">{productName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper"
          >
            <Close width={16} height={16} />
          </button>
        </div>

        <div className="mt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em]">Your rating</p>
          <div className="mt-2 flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
                className="p-0.5 transition-transform hover:scale-115"
              >
                <Star
                  width={24}
                  height={24}
                  filled={(hover || rating) >= n}
                  className={cn(
                    'transition-colors',
                    (hover || rating) >= n ? 'text-ink' : 'text-ink/20',
                  )}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-1 font-mono text-[9.5px] uppercase tracking-wider text-smoke">
                {['', 'Poor', 'Fair', 'Good', 'Great', 'Exceptional'][rating]}
              </span>
            )}
          </div>
          {errors.rating && (
            <p className="mt-1 font-mono text-[9px] uppercase text-berry">{errors.rating}</p>
          )}
        </div>

        <div className="mt-5">
          <label htmlFor="rv-title" className="font-mono text-[9px] uppercase tracking-[0.14em]">
            Headline
          </label>
          <input
            id="rv-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sum it up in a few words"
            className={cn(inputCls, 'mt-1.5')}
          />
          {errors.title && (
            <p className="mt-1 font-mono text-[9px] uppercase text-berry">{errors.title}</p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="rv-body" className="font-mono text-[9px] uppercase tracking-[0.14em]">
            Your review
          </label>
          <textarea
            id="rv-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="How is the fit, fabric and quality?"
            className="mt-1.5 w-full resize-none border border-ink/15 bg-transparent p-3 text-[13px] outline-none transition-colors focus:border-ink"
          />
          {errors.body && (
            <p className="mt-1 font-mono text-[9px] uppercase text-berry">{errors.body}</p>
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="rv-author" className="font-mono text-[9px] uppercase tracking-[0.14em]">
              Display name
            </label>
            <input
              id="rv-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Alex M."
              className={cn(inputCls, 'mt-1.5')}
            />
            {errors.author && (
              <p className="mt-1 font-mono text-[9px] uppercase text-berry">{errors.author}</p>
            )}
          </div>
          <div>
            <label htmlFor="rv-loc" className="font-mono text-[9px] uppercase tracking-[0.14em]">
              Location <span className="text-smoke">(optional)</span>
            </label>
            <input
              id="rv-loc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              className={cn(inputCls, 'mt-1.5')}
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="rv-size" className="font-mono text-[9px] uppercase tracking-[0.14em]">
              Size purchased
            </label>
            <select
              id="rv-size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={cn(inputCls, 'mt-1.5 cursor-pointer')}
            >
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', '26', '28', '30', '32', '34', '36'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em]">Fit</span>
            <div className="mt-1.5 grid grid-cols-3 border border-ink/15">
              {FITS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFit(f)}
                  className={cn(
                    'py-3 font-mono text-[8.5px] uppercase leading-tight tracking-[0.04em] transition-colors',
                    fit === f ? 'bg-ink text-paper' : 'text-ink/60 hover:bg-ink/5',
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-2.5">
          <span className="mt-0.5 grid h-[15px] w-[15px] shrink-0 place-items-center border border-ink bg-ink text-paper">
            <Check width={9} height={9} />
          </span>
          <span className="text-[11px] leading-relaxed text-ink/60">
            I confirm I purchased this item and my review is honest.
          </span>
        </label>

        <Button type="submit" fullWidth size="lg" className="mt-5">
          Publish review
        </Button>
      </form>
    </div>
  );
}
