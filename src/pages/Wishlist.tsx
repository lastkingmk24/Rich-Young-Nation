import { Link } from 'react-router-dom';
import { products } from '@/data/catalog';
import { useStore } from '@/store/StoreContext';
import { useCart } from '@/store/CartContext';
import { useReveal } from '@/hooks/useReveal';
import { formatPrice } from '@/data/catalog';
import { ButtonLink } from '@/components/ui/Button';
import { Heart, Lock, Return, Truck } from '@/components/ui/Icons';
import { ProductCard } from '@/components/shop/ProductCard';
import { Rating } from '@/components/ui/Rating';
import { cn } from '@/lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, toast } = useStore();
  const { addItem } = useCart();
  const saved = products.filter((p) => wishlist.includes(p.id));
  useReveal([wishlist.length]);

  return (
    <div>
      <section className="border-b border-ink/10 bg-bone/30">
        <div className="container-x py-12 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-smoke">Saved</p>
              <h1 className="display-lg mt-3">Your wishlist</h1>
              <p className="mt-3 text-[13px] text-smoke">
                {saved.length} {saved.length === 1 ? 'piece' : 'pieces'} saved
              </p>
            </div>
            {saved.length > 0 && (
              <ButtonLink
                to="/shop"
                variant="outline"
                size="md"
                className="w-fit"
                onClick={() => {}}
              >
                Keep browsing
              </ButtonLink>
            )}
          </div>
        </div>
      </section>

      <div className="container-x py-10 md:py-14">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-5 grid h-16 w-16 place-items-center rounded-full border border-ink/15">
              <Heart width={24} height={24} className="text-ink/50" />
            </div>
            <h2 className="display-md">Nothing saved yet</h2>
            <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-smoke">
              Tap the heart on anything you like and it&apos;ll live here. We&apos;ll warn you if it
              is running low.
            </p>
            <ButtonLink to="/shop" className="mt-6">
              Browse the collection
            </ButtonLink>
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-6">
              {[
                { icon: <Truck width={14} height={14} />, text: 'Free shipping over $150' },
                { icon: <Return width={14} height={14} />, text: '30-day returns' },
                { icon: <Lock width={14} height={14} />, text: 'Secure checkout' },
              ].map((p) => (
                <li key={p.text} className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke">
                  {p.icon} {p.text}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-3.5 gap-y-9 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {saved.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>

            <div className="mt-14 border border-ink/10 bg-bone/25 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-smoke">
                    Quick add all
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-ink/70">
                    Add every saved piece to your bag in the default size.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    saved.forEach((p) => {
                      const size = p.sizes.find((s) => s.inStock);
                      if (size) addItem(p, { color: p.colors[0].name, size: size.label });
                    });
                    toast({
                      title: 'Added to bag',
                      description: `${saved.length} saved ${saved.length === 1 ? 'piece' : 'pieces'} added.`,
                      variant: 'success',
                    });
                  }}
                  className="border border-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
                >
                  Add all to bag
                </button>
              </div>
            </div>
          </>
        )}

        {saved.length > 0 && (
          <div className="mt-14">
            <p className="eyebrow mb-4 text-smoke">Saved in detail</p>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {saved.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center gap-4 py-4">
                  <Link to={`/product/${p.slug}`} className="h-16 w-12 shrink-0 overflow-hidden bg-bone">
                    <img src={p.colors[0].images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover object-top" />
                  </Link>
                  <div className="min-w-[140px] flex-1">
                    <Link to={`/product/${p.slug}`} className="text-[13px] font-medium hover:text-smoke">
                      {p.name}
                    </Link>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-smoke">
                      {p.colors[0].name} · {p.sizes.filter((s) => s.inStock).length} sizes available
                    </p>
                  </div>
                  <Rating value={p.rating} size={10} />
                  <p className="w-16 text-right text-[13px] tabular-nums">{formatPrice(p.price)}</p>
                  <button
                    type="button"
                    onClick={() => {
                      toggleWishlist(p.id);
                      toast({ title: 'Removed from wishlist', description: p.name });
                    }}
                    className={cn(
                      'grid h-8 w-8 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink',
                    )}
                    aria-label={`Remove ${p.name} from wishlist`}
                  >
                    <Heart width={13} height={13} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
