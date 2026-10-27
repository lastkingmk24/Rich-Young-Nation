import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { formatPrice } from '@/data/catalog';
import { cn } from '@/lib/utils';
import { useCart } from '@/store/CartContext';
import { useStore } from '@/store/StoreContext';
import { Rating } from '@/components/ui/Rating';
import { Heart, HeartFilled, Plus } from '@/components/ui/Icons';

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  const [activeColor, setActiveColor] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isWished, toast } = useStore();

  const color = product.colors[activeColor];
  const wished = isWished(product.id);
  const primary = color.images[0];
  const secondary = color.images[1] ?? product.images[1] ?? primary;
  const onSale = typeof product.compareAt === 'number';
  const discount = onSale
    ? Math.round(((product.compareAt! - product.price) / product.compareAt!) * 100)
    : 0;

  const handleQuickAdd = (sizeLabel: string) => {
    addItem(product, { color: color.name, size: sizeLabel, quantity: 1 });
    setQuickAddOpen(false);
    toast({
      title: 'Added to bag',
      description: `${product.name} · ${color.name} · ${sizeLabel}`,
      variant: 'success',
    });
  };

  return (
    <article
      className="group/card relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setQuickAddOpen(false);
      }}
      style={{ '--card-delay': `${Math.min(index, 8) * 55}ms` } as React.CSSProperties}
    >
      <div className="relative overflow-hidden bg-bone">
        <Link
          to={`/product/${product.slug}`}
          className="block focus-visible:outline-offset-[-4px]"
          aria-label={`${product.name} — ${formatPrice(product.price)}`}
        >
          <div className="relative aspect-[4/5] w-full">
            <img
              src={primary}
              alt={`${product.name} in ${color.name}`}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className={cn(
                'absolute inset-0 h-full w-full object-cover object-top transition-all duration-[1100ms] ease-[var(--ease-luxe)]',
                hovered ? 'scale-[1.035] opacity-0' : 'scale-100 opacity-100',
              )}
            />
            <img
              src={secondary}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className={cn(
                'absolute inset-0 h-full w-full object-cover object-center transition-all duration-[1100ms] ease-[var(--ease-luxe)]',
                hovered ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0',
              )}
            />
          </div>
        </Link>

        {/* badges */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-col items-start gap-1">
            {product.badge && (
              <span className="bg-ink/90 px-2 py-[5px] font-mono text-[9px] uppercase tracking-[0.16em] text-paper backdrop-blur-sm">
                {product.badge}
              </span>
            )}
            {onSale && (
              <span className="bg-acid px-2 py-[5px] font-mono text-[9px] uppercase tracking-[0.16em] text-ink">
                −{discount}%
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              const added = toggleWishlist(product.id);
              toast({
                title: added ? 'Saved to wishlist' : 'Removed from wishlist',
                description: product.name,
              });
            }}
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            aria-pressed={wished}
            className={cn(
              'pointer-events-auto grid h-9 w-9 place-items-center rounded-full border transition-all duration-300',
              wished
                ? 'border-ink bg-ink text-acid'
                : 'border-ink/10 bg-paper/80 text-ink backdrop-blur-md hover:border-ink/40 hover:bg-paper',
            )}
          >
            {wished ? (
              <HeartFilled width={15} height={15} />
            ) : (
              <Heart width={15} height={15} />
            )}
          </button>
        </div>

        {/* quick add — reveals on hover/focus on pointer devices; always tappable affordance below on touch */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-500 ease-[var(--ease-luxe)] group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          {!quickAddOpen ? (
            <button
              type="button"
              onClick={() => setQuickAddOpen(true)}
              className="flex w-full items-center justify-center gap-2 bg-ink/92 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper backdrop-blur-md transition-colors hover:bg-ink"
            >
              <Plus width={13} height={13} />
              Quick add
            </button>
          ) : (
            <div className="bg-ink/95 p-2.5 backdrop-blur-md">
              <p className="mb-2 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-paper/60">
                Select size
              </p>
              <div className="flex flex-wrap justify-center gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    disabled={!s.inStock}
                    onClick={() => handleQuickAdd(s.label)}
                    className="min-w-9 border border-paper/25 px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-paper transition-colors hover:border-acid hover:bg-acid hover:text-ink disabled:cursor-not-allowed disabled:border-paper/10 disabled:text-paper/25 disabled:line-through disabled:hover:bg-transparent"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* meta */}
      <div className="pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[13.5px] font-medium tracking-[-0.01em]">
              <Link
                to={`/product/${product.slug}`}
                className="transition-colors hover:text-smoke"
              >
                {product.name}
              </Link>
            </h3>
            <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.1em] text-smoke">
              {color.name}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className={cn('text-[13.5px] tabular-nums', onSale && 'text-berry')}>
              {formatPrice(product.price)}
            </span>
            {onSale && (
              <span className="ml-1.5 text-[11.5px] text-smoke line-through tabular-nums">
                {formatPrice(product.compareAt!)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onMouseEnter={() => setActiveColor(i)}
                onFocus={() => setActiveColor(i)}
                onClick={() => setActiveColor(i)}
                aria-label={`View ${c.name}`}
                aria-pressed={i === activeColor}
                className="group/sw -m-1.5 grid h-7 w-7 place-items-center rounded-full"
              >
                <span
                  className={cn(
                    'h-3 w-3 rounded-full border transition-all duration-300',
                    i === activeColor
                      ? 'border-ink ring-1 ring-ink ring-offset-1 ring-offset-paper'
                      : 'border-ink/15 group-hover/sw:border-ink/50',
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              </button>
            ))}
            {product.colors.length > 1 && (
              <span className="ml-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-smoke">
                +{product.colors.length - 1}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Rating value={product.rating} size={10} />
            <span className="font-mono text-[9.5px] text-smoke">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] w-full bg-bone" />
      <div className="mt-3.5 h-3 w-2/3 bg-bone" />
      <div className="mt-2 h-2.5 w-1/3 bg-bone" />
    </div>
  );
}
