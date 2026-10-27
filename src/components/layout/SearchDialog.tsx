import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, formatPrice } from '@/data/catalog';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/useReveal';
import { Close, Search as SearchIcon } from '@/components/ui/Icons';

const TRENDING = ['Nation Hoodie', 'Baggy denim', 'Cargo', 'Bone'];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useScrollLock(open);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(t);
    }
    setQuery('');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) =>
        [p.name, p.subtitle, p.category, ...p.tags, ...p.colors.map((c) => c.name)]
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 6);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[8vh] sm:pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-md"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="relative w-full max-w-2xl animate-scale-in border border-ink/10 bg-paper shadow-[0_40px_120px_-24px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
          <SearchIcon width={18} height={18} className="shrink-0 text-smoke" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && results[0]) {
                navigate(`/product/${results[0].slug}`);
                onClose();
              }
            }}
            placeholder="Search the collection…"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-smoke/70"
            aria-label="Search input"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-ink/5"
            aria-label="Close search"
          >
            <Close width={16} height={16} />
          </button>
        </div>

        <div className="max-h-[58vh] overflow-y-auto p-2">
          {!query && (
            <div className="p-4">
              <p className="eyebrow mb-3 text-smoke">Trending searches</p>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setQuery(t)}
                    className="border border-ink/15 px-3 py-1.5 text-xs transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-smoke">
                No matches for “{query}”. Try “hoodie”, “denim” or “cargo”.
              </p>
            </div>
          )}

          {results.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                navigate(`/product/${p.slug}`);
                onClose();
              }}
              className="flex w-full items-center gap-4 px-3 py-2.5 text-left transition-colors hover:bg-ink/5"
            >
              <img
                src={p.colors[0].images[0]}
                alt=""
                className="h-16 w-13 shrink-0 object-cover"
                style={{ width: 52 }}
                loading="lazy"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-medium">{p.name}</span>
                <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-smoke">
                  {p.category} · {p.colors[0].name}
                </span>
              </span>
              <span className={cn('shrink-0 text-[13px] tabular-nums')}>
                {formatPrice(p.price)}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink/10 px-5 py-2.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-smoke">
            Press Enter to open the top result
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-smoke">
            ⌘K to toggle
          </p>
        </div>
      </div>
    </div>
  );
}
