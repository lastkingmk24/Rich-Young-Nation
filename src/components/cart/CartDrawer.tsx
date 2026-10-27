import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/store/CartContext';
import { formatPrice, products, FREE_SHIPPING_THRESHOLD } from '@/data/catalog';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/useReveal';
import { Button } from '@/components/ui/Button';
import {
  Bag,
  Check,
  Close,
  Lock,
  Minus,
  Plus,
  Sparkle,
  Trash,
  Truck,
} from '@/components/ui/Icons';

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    count,
    subtotal,
    total,
    discount,
    shipping,
    tax,
    promo,
    promoLabel,
    applyPromo,
    removePromo,
    setQuantity,
    removeItem,
    freeShippingRemaining,
    justAdded,
  } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 120);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [isOpen, closeCart]);

  // Recommended products not already in the bag
  const recommendations = useMemo(() => {
    const inBag = new Set(lines.map((l) => l.productId));
    return products.filter((p) => !inBag.has(p.id) && p.featured).slice(0, 3);
  }, [lines]);

  const handlePromo = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyPromo(promoInput);
    if (res.ok) {
      setPromoError(null);
      setPromoSuccess(res.message);
      setPromoInput('');
    } else {
      setPromoError(res.message);
      setPromoSuccess(null);
    }
  };

  const shippingProgress = Math.min(
    100,
    ((FREE_SHIPPING_THRESHOLD - freeShippingRemaining) / FREE_SHIPPING_THRESHOLD) * 100,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="presentation">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-[3px]"
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className="absolute inset-y-0 right-0 flex w-full animate-slide-in-right flex-col bg-paper shadow-[-30px_0_80px_-30px_rgba(0,0,0,0.4)] sm:max-w-[460px]"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-6">
          <div className="flex items-baseline gap-2.5">
            <h2 className="font-display text-[26px] leading-none">Your Bag</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-smoke">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-ink/5"
          >
            <Close width={18} height={18} />
          </button>
        </div>

        {/* free shipping meter */}
        {lines.length > 0 && (
          <div className="border-b border-ink/10 bg-bone/40 px-5 py-3 sm:px-6">
            <div className="mb-2 flex items-center gap-2">
              <Truck width={14} height={14} className="shrink-0" />
              <p className="text-[11.5px] leading-tight">
                {freeShippingRemaining > 0 ? (
                  <>
                    You&apos;re{' '}
                    <span className="font-semibold">{formatPrice(freeShippingRemaining)}</span> away
                    from free express shipping
                  </>
                ) : (
                  <span className="font-semibold">Free express shipping unlocked</span>
                )}
              </p>
            </div>
            <div className="h-[3px] w-full overflow-hidden bg-ink/10">
              <div
                className="h-full bg-ink transition-all duration-700 ease-[var(--ease-luxe)]"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <div className="mb-5 grid h-16 w-16 place-items-center rounded-full border border-ink/15">
                <Bag width={24} height={24} className="text-ink/60" />
              </div>
              <h3 className="display-md text-[28px]">Your bag is empty</h3>
              <p className="mt-2 max-w-[28ch] text-[13px] leading-relaxed text-smoke">
                Nothing in here yet. Start with the pieces everyone is asking about.
              </p>
              <Button
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
                size="md"
                className="mt-6"
              >
                Shop the collection
              </Button>
              <div className="mt-8 w-full">
                <p className="eyebrow mb-3 text-smoke">Recommended</p>
                <div className="grid grid-cols-2 gap-3">
                  {recommendations.slice(0, 2).map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      onClick={closeCart}
                      className="group text-left"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-bone">
                        <img
                          src={p.colors[0].images[0]}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-2 truncate text-[11.5px] font-medium">{p.name}</p>
                      <p className="font-mono text-[10px] text-smoke">{formatPrice(p.price)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-ink/8">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className={cn(
                    'flex gap-3.5 px-5 py-4 transition-colors sm:px-6',
                    justAdded === line.key && 'bg-acid/12',
                  )}
                >
                  <Link
                    to={`/product/${line.slug}`}
                    onClick={closeCart}
                    className="relative h-[104px] w-[82px] shrink-0 overflow-hidden bg-bone"
                  >
                    <img
                      src={line.image}
                      alt={line.name}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${line.slug}`}
                          onClick={closeCart}
                          className="block truncate text-[13.5px] font-medium leading-snug hover:text-smoke"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.08em] text-smoke">
                          {line.color} · {line.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.key)}
                        aria-label={`Remove ${line.name} from bag`}
                        className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center text-smoke transition-colors hover:text-berry"
                      >
                        <Trash width={14} height={14} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="flex items-center border border-ink/15">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.key, line.quantity - 1)}
                          aria-label={`Decrease quantity of ${line.name}`}
                          className="grid h-8 w-8 place-items-center text-ink/70 transition-colors hover:bg-ink hover:text-paper disabled:opacity-30"
                        >
                          <Minus width={12} height={12} />
                        </button>
                        <span className="w-8 text-center font-mono text-[11px] tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={line.quantity >= line.maxQuantity}
                          onClick={() => setQuantity(line.key, line.quantity + 1)}
                          aria-label={`Increase quantity of ${line.name}`}
                          className="grid h-8 w-8 place-items-center text-ink/70 transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink/70"
                        >
                          <Plus width={12} height={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] tabular-nums">
                          {formatPrice(line.price * line.quantity)}
                        </p>
                        {line.compareAt && (
                          <p className="font-mono text-[9.5px] text-smoke line-through tabular-nums">
                            {formatPrice(line.compareAt * line.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 && recommendations.length > 0 && (
            <div className="border-t border-ink/10 px-5 py-5 sm:px-6">
              <p className="eyebrow mb-3 text-smoke">Complete the fit</p>
              <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                {recommendations.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    onClick={closeCart}
                    className="group w-[92px] shrink-0"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-bone">
                      <img
                        src={p.colors[0].images[0]}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-1.5 truncate text-[10.5px] font-medium">{p.name}</p>
                    <p className="font-mono text-[9.5px] text-smoke">{formatPrice(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        {lines.length > 0 && (
          <div className="border-t border-ink/10 bg-paper px-5 pb-5 pt-4 sm:px-6">
            {/* promo */}
            {promo ? (
              <div className="mb-3 flex items-center justify-between border border-acid-deep/50 bg-acid/20 px-3 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <Check width={13} height={13} className="shrink-0" />
                  <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.1em]">
                    {promo} — {promoLabel}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removePromo();
                    setPromoSuccess(null);
                  }}
                  className="ml-2 shrink-0 font-mono text-[9px] uppercase tracking-wider underline underline-offset-2 hover:text-berry"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handlePromo} className="mb-3">
                <div className="flex">
                  <input
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError(null);
                    }}
                    placeholder="Promo code"
                    aria-label="Promo code"
                    className="h-9 min-w-0 flex-1 border border-ink/15 bg-transparent px-3 font-mono text-[10.5px] uppercase tracking-[0.1em] outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-smoke/70 focus:border-ink"
                  />
                  <button
                    type="submit"
                    className="h-9 shrink-0 border border-l-0 border-ink/15 px-4 font-mono text-[9.5px] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-wider text-berry">
                    {promoError}
                  </p>
                )}
                {!promoError && !promoSuccess && (
                  <p className="mt-1.5 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke">
                    <Sparkle width={10} height={10} /> Try RYN10 for 10% off
                  </p>
                )}
                {promoSuccess && (
                  <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-wider text-ink">
                    ✓ {promoSuccess}
                  </p>
                )}
              </form>
            )}

            <dl className="space-y-1.5 text-[12.5px]">
              <div className="flex justify-between">
                <dt className="text-smoke">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-berry">
                  <dt>Discount</dt>
                  <dd className="tabular-nums">−{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-smoke">Shipping</dt>
                <dd className="tabular-nums">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-smoke">Est. tax</dt>
                <dd className="tabular-nums">{formatPrice(tax)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-ink/10 pt-2.5">
                <dt className="font-display text-[19px] leading-none">Total</dt>
                <dd className="font-display text-[19px] leading-none tabular-nums">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <Button
              fullWidth
              size="lg"
              className="mt-3.5"
              onClick={() => {
                closeCart();
                navigate('/checkout');
              }}
              icon={<Lock width={13} height={13} />}
            >
              Checkout — {formatPrice(total)}
            </Button>

            <div className="mt-2.5 flex items-center justify-center gap-1.5 text-smoke">
              <Lock width={11} height={11} />
              <p className="font-mono text-[8.5px] uppercase tracking-[0.14em]">
                Secure checkout · Klarna & Apple Pay available
              </p>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="mt-2 w-full py-1 text-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-smoke underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
