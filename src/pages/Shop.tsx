import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SortKey } from '@/types';
import { products } from '@/data/catalog';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/shop/ProductCard';
import { FilterPanel } from '@/components/shop/FilterPanel';
import { ActiveFilters } from '@/components/shop/ActiveFilters';
import { ArrowRight, ChevronDown, Close, Filter, Search } from '@/components/ui/Icons';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'newest', label: 'Newest' },
  { key: 'best-selling', label: 'Best selling' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
  { key: 'rating', label: 'Top rated' },
];

const PRICE_MAX = 250;

function parseList(value: string | null) {
  return value ? value.split(',').filter(Boolean) : [];
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const categories = parseList(params.get('category'));
  const colors = parseList(params.get('color'));
  const sizes = parseList(params.get('size'));
  const onSaleOnly = params.get('sale') === '1';
  const inStockOnly = params.get('stock') === '1';
  const sort = (params.get('sort') as SortKey) || 'featured';
  const maxPrice = Number(params.get('max')) || PRICE_MAX;
  const query = params.get('q') ?? '';

  useReveal([params.toString(), visibleCount]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === '') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const toggleInList = (key: string, value: string) => {
    const current = parseList(params.get(key));
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setParam(key, next.length ? next.join(',') : null);
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (categories.length && !categories.includes(p.category)) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s.label) && s.inStock)) return false;
      if (onSaleOnly && !p.compareAt) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (p.price > maxPrice) return false;
      if (q) {
        const haystack = [p.name, p.subtitle, p.category, ...p.tags].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case 'newest':
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.rating - a.rating);
        break;
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'best-selling':
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.featured) - Number(a.featured) || b.reviewCount - a.reviewCount,
        );
    }
    return list;
  }, [categories, colors, sizes, onSaleOnly, inStockOnly, maxPrice, query, sort]);

  const activeCount =
    categories.length + colors.length + sizes.length + (onSaleOnly ? 1 : 0) + (inStockOnly ? 1 : 0) + (maxPrice < PRICE_MAX ? 1 : 0) + (query ? 1 : 0);

  const filterProps = {
    categories,
    colors,
    sizes,
    onSaleOnly,
    inStockOnly,
    maxPrice,
    toggleInList,
    setParam,
    clearAll,
  };

  return (
    <div>
      {/* header */}
      <section className="border-b border-ink/10 bg-bone/30">
        <div className="container-x pb-8 pt-10 md:pb-11 md:pt-14">
          <nav className="mb-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-smoke">
            <a href="/" className="transition-colors hover:text-ink">
              Home
            </a>
            <span>/</span>
            <span className="text-ink">Shop all</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="display-lg">Shop all</h1>
              <p className="mt-2.5 max-w-[46ch] text-[13px] leading-relaxed text-smoke">
                {products.length} pieces in the current collection. Heavyweight fleece, rigid denim
                and the layers in between.
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            </p>
          </div>
        </div>
      </section>

      <div className="container-x py-8 md:py-12">
        <div className="flex gap-10">
          {/* sidebar (desktop) */}
          <aside className="hidden w-[220px] shrink-0 lg:block xl:w-[240px]">
            <div className="sticky top-[88px] max-h-[calc(100svh-110px)] overflow-y-auto pb-6 pr-2 no-scrollbar">
              <FilterPanel {...filterProps} />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {/* toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 border border-ink/20 px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] transition-colors hover:border-ink lg:hidden"
              >
                <Filter width={13} height={13} />
                Filters
                {activeCount > 0 && (
                  <span className="grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[8px] text-paper">
                    {activeCount}
                  </span>
                )}
              </button>

              <div className="hidden items-center gap-2 lg:flex">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-smoke">
                  Sort
                </span>
              </div>

              <div className="relative ml-auto" ref={sortRef}>
                <button
                  type="button"
                  onClick={() => setSortOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                  className="inline-flex items-center gap-2.5 border border-ink/20 px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] transition-colors hover:border-ink"
                >
                  {SORT_OPTIONS.find((o) => o.key === sort)?.label ?? 'Featured'}
                  <ChevronDown
                    width={12}
                    height={12}
                    className={cn('transition-transform duration-300', sortOpen && 'rotate-180')}
                  />
                </button>
                {sortOpen && (
                  <ul
                    role="listbox"
                    className="absolute right-0 top-[calc(100%+6px)] z-30 w-[210px] animate-scale-in border border-ink/10 bg-paper py-1 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.28)]"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <li key={o.key}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={sort === o.key}
                          onClick={() => {
                            setParam('sort', o.key === 'featured' ? null : o.key);
                            setSortOpen(false);
                          }}
                          className={cn(
                            'block w-full px-4 py-2.5 text-left text-[12px] transition-colors hover:bg-ink/5',
                            sort === o.key && 'bg-ink/[0.04] font-medium',
                          )}
                        >
                          {o.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* active filters */}
            <ActiveFilters
              categories={categories}
              colors={colors}
              sizes={sizes}
              onSaleOnly={onSaleOnly}
              inStockOnly={inStockOnly}
              maxPrice={maxPrice}
              query={query}
              maxPriceLimit={PRICE_MAX}
              toggleInList={toggleInList}
              setParam={setParam}
              clearAll={clearAll}
            />

            {/* grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-ink/15">
                  <Search width={20} height={20} className="text-ink/50" />
                </div>
                <h2 className="display-md">Nothing matches that</h2>
                <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-smoke">
                  Try removing a filter or two — the full collection is only {products.length}{' '}
                  pieces.
                </p>
                <Button onClick={clearAll} variant="primary" size="md" className="mt-6">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-3.5 gap-y-9 md:gap-x-5 lg:grid-cols-3 lg:gap-x-5 xl:gap-x-6">
                  {filtered.slice(0, visibleCount).map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} priority={i < 3} />
                  ))}
                </div>

                {visibleCount < filtered.length && (
                  <div className="mt-12 flex flex-col items-center gap-3">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-smoke">
                      Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
                    </p>
                    <div className="h-[2px] w-40 overflow-hidden bg-ink/10">
                      <div
                        className="h-full bg-ink transition-all duration-500"
                        style={{ width: `${(Math.min(visibleCount, filtered.length) / filtered.length) * 100}%` }}
                      />
                    </div>
                    <Button
                      onClick={() => setVisibleCount((c) => c + 12)}
                      variant="outline"
                      size="lg"
                      className="mt-2"
                      icon={<ArrowRight width={14} height={14} className="rotate-90" />}
                    >
                      Load more
                    </Button>
                  </div>
                )}

                {visibleCount >= filtered.length && filtered.length > 3 && (
                  <Reveal className="mt-14 border-t border-ink/10 pt-10 text-center">
                    <p className="display-md text-[22px] text-smoke">
                      You&apos;ve seen the whole collection.
                    </p>
                    <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-smoke/70">
                      Restocks drop every Thursday at 10am ET
                    </p>
                  </Reveal>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* mobile filter sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[75] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex max-h-[100dvh] w-full max-w-[340px] animate-[slideInLeft_0.4s_var(--ease-luxe)_both] flex-col bg-paper">
            <style>{`@keyframes slideInLeft{from{transform:translate3d(-100%,0,0)}to{transform:translate3d(0,0,0)}}`}</style>
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <h2 className="font-display text-[24px] leading-none">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
              >
                <Close width={16} height={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <FilterPanel {...filterProps} compact />
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-ink/10 p-4">
              <Button variant="outline" size="md" onClick={clearAll}>
                Clear
              </Button>
              <Button variant="primary" size="md" onClick={() => setMobileFiltersOpen(false)}>
                Show {filtered.length}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

