import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  formatPrice,
  getProductBySlug,
  products,
  getRelatedProducts,
  getReviewsForProduct,
  reviews as allReviews,
} from '@/data/catalog';
import { cn } from '@/lib/utils';
import { useReveal } from '@/hooks/useReveal';
import { useCart } from '@/store/CartContext';
import { useStore } from '@/store/StoreContext';
import { ProductGallery } from '@/components/shop/ProductGallery';
import { Accordion } from '@/components/shop/Accordion';
import { ReviewSection } from '@/components/shop/ReviewSection';
import { ProductCard } from '@/components/shop/ProductCard';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import {
  ArrowLeft,
  ArrowRight,
  Bolt,
  Check,
  Heart,
  HeartFilled,
  Info,
  Lock,
  Return,
  Ruler,
  Truck,
} from '@/components/ui/Icons';
import { SizeGuideModal } from '@/components/shop/SizeGuideModal';
import { WriteReviewModal } from '@/components/shop/WriteReviewModal';

export default function ProductDetail() {
  const { slug = '' } = useParams();
  const product = getProductBySlug(slug);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleWishlist, isWished, pushRecent, toast, recent } = useStore();

  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [extraReviews, setExtraReviews] = useState<typeof allReviews>([]);

  useReveal([slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setColorIndex(0);
    setSize(null);
    setQty(1);
    setExtraReviews([]);
  }, [slug]);

  useEffect(() => {
    if (product) pushRecent(product.id);
  }, [product, pushRecent]);

  // Declared unconditionally (above the not-found guard) so the hook order is
  // stable when navigating between a valid and an unknown product slug.
  const reviews = useMemo(
    () => (product ? [...extraReviews, ...getReviewsForProduct(product.id)] : extraReviews),
    [product, extraReviews],
  );

  const recentProducts = recent
    .filter((id) => id !== product?.id)
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (!product) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="eyebrow text-smoke">404</p>
        <h1 className="display-lg mt-3">Piece not found</h1>
        <p className="mt-3 max-w-[36ch] text-[13px] text-smoke">
          This product may have sold out or been archived. The full collection is still waiting.
        </p>
        <Button className="mt-6" onClick={() => navigate('/shop')}>
          Back to shop
        </Button>
      </div>
    );
  }

  const color = product.colors[colorIndex];
  const wished = isWished(product.id);
  const onSale = typeof product.compareAt === 'number';
  const discount = onSale
    ? Math.round(((product.compareAt! - product.price) / product.compareAt!) * 100)
    : 0;
  const related = getRelatedProducts(product, 4);
  const lowStock = product.stock <= 10;

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      toast({
        title: 'Pick a size first',
        description: 'Select your size to add this piece to the bag.',
        variant: 'error',
      });
      return;
    }
    addItem(product, { color: color.name, size, quantity: qty });
    toast({
      title: 'Added to bag',
      description: `${product.name} · ${color.name} · ${size}`,
      variant: 'success',
    });
  };

  const galleryImages = color.images.length ? color.images : product.images;

  return (
    <div>
      {/* breadcrumb */}
      <div className="container-x flex items-center gap-2 py-4 font-mono text-[9px] uppercase tracking-[0.12em] text-smoke">
        <Link to="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="transition-colors hover:text-ink">
          Shop
        </Link>
        <span>/</span>
        <Link
          to={`/shop?category=${encodeURIComponent(product.category)}`}
          className="transition-colors hover:text-ink"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="truncate text-ink">{product.name}</span>
      </div>

      <div className="container-x pb-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,460px)] lg:gap-12 xl:gap-16">
          <ProductGallery images={galleryImages} alt={product.name} />

          {/* -------------------------------------------------------- info */}
          <div className="lg:pt-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {product.badge && (
                    <span className="bg-ink px-2 py-[5px] font-mono text-[8.5px] uppercase tracking-[0.14em] text-paper">
                      {product.badge}
                    </span>
                  )}
                  {onSale && (
                    <span className="bg-acid px-2 py-[5px] font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink">
                      Save {discount}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="border border-ink/20 px-2 py-[5px] font-mono text-[8.5px] uppercase tracking-[0.14em]">
                      New in
                    </span>
                  )}
                </div>
                <h1 className="mt-3 display-lg text-[clamp(2rem,4.6vw,3.1rem)]">{product.name}</h1>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-smoke">
                  {product.subtitle}
                </p>
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
                aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-pressed={wished}
                className={cn(
                  'mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300',
                  wished
                    ? 'border-ink bg-ink text-acid'
                    : 'border-ink/20 hover:border-ink',
                )}
              >
                {wished ? <HeartFilled width={17} height={17} /> : <Heart width={17} height={17} />}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-baseline gap-2.5">
                <span className={cn('text-[22px] tabular-nums', onSale && 'text-berry')}>
                  {formatPrice(product.price)}
                </span>
                {onSale && (
                  <span className="text-[14px] text-smoke line-through tabular-nums">
                    {formatPrice(product.compareAt!)}
                  </span>
                )}
              </div>
              <span className="h-3 w-px bg-ink/15" />
              <a href="#reviews" className="flex items-center gap-1.5">
                <Rating value={product.rating} size={12} />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-smoke underline-offset-4 hover:underline">
                  {product.reviewCount} reviews
                </span>
              </a>
            </div>

            <p className="mt-5 max-w-[52ch] text-[13px] leading-relaxed text-ink/70">
              {product.description}
            </p>

            {/* colour */}
            <div className="mt-7">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.14em]">
                  Colour — <span className="text-smoke">{color.name}</span>
                </p>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColorIndex(i)}
                    aria-pressed={i === colorIndex}
                    aria-label={c.name}
                    className={cn(
                      'relative grid h-9 w-9 place-items-center rounded-full border transition-all duration-300',
                      i === colorIndex
                        ? 'border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper'
                        : 'border-ink/15 hover:border-ink/50',
                    )}
                  >
                    <span
                      className="h-[26px] w-[26px] rounded-full"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* size */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.14em]">
                  Size {size && <span className="text-smoke">— {size}</span>}
                </p>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke underline underline-offset-4 transition-colors hover:text-ink"
                >
                  <Ruler width={11} height={11} /> Size guide
                </button>
              </div>
              <div className="mt-2.5 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    disabled={!s.inStock}
                    onClick={() => {
                      setSize(s.label);
                      setSizeError(false);
                    }}
                    aria-pressed={size === s.label}
                    className={cn(
                      'relative h-11 border font-mono text-[10.5px] uppercase tracking-wider transition-all duration-200',
                      size === s.label
                        ? 'border-ink bg-ink text-paper'
                        : 'border-ink/20 text-ink/80 hover:border-ink',
                      !s.inStock &&
                        'cursor-not-allowed border-ink/10 text-ink/25 hover:border-ink/10',
                    )}
                  >
                    {s.label}
                    {!s.inStock && (
                      <span className="absolute inset-x-1.5 top-1/2 h-px -rotate-[24deg] bg-ink/20" />
                    )}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-berry">
                  <Info width={10} height={10} /> Please select a size
                </p>
              )}
              <p className="mt-3 text-[11.5px] leading-relaxed text-ink/55">{product.fit}</p>
            </div>

            {/* qty + add */}
            <div className="mt-6 flex items-stretch gap-2">
              <div className="flex items-center border border-ink/20">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-full w-10 place-items-center text-ink/70 transition-colors hover:bg-ink/5"
                >
                  −
                </button>
                <span className="w-8 text-center font-mono text-[11px] tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="grid h-full w-10 place-items-center text-ink/70 transition-colors hover:bg-ink/5"
                >
                  +
                </button>
              </div>
              <Button onClick={handleAdd} size="lg" fullWidth className="h-[52px]">
                Add to bag — {formatPrice(product.price * qty)}
              </Button>
            </div>

            <div className="mt-2.5 flex items-center gap-2">
              {lowStock ? (
                <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-berry">
                  <Bolt width={10} height={10} /> Only {product.stock} left in stock
                </p>
              ) : (
                <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-ink/60">
                  <Check width={10} height={10} /> In stock · ships within 24 hours
                </p>
              )}
            </div>

            {/* perks */}
            <ul className="mt-6 grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10">
              {[
                { icon: <Truck width={14} height={14} />, label: 'Free express\nover $150' },
                { icon: <Return width={14} height={14} />, label: '30-day\nreturns' },
                { icon: <Lock width={14} height={14} />, label: 'Secure\ncheckout' },
              ].map((p, i) => (
                <li key={i} className="flex flex-col items-center gap-1.5 px-2 py-4 text-center">
                  <span className="text-ink/70">{p.icon}</span>
                  <span className="whitespace-pre-line font-mono text-[8.5px] uppercase leading-[1.5] tracking-[0.08em] text-smoke">
                    {p.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* accordions */}
            <div className="mt-6">
              <Accordion
                items={[
                  {
                    title: 'Details & fabric',
                    content: (
                      <ul className="space-y-1.5">
                        {product.details.map((d) => (
                          <li key={d} className="flex gap-2">
                            <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-ink/40" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: 'Fit & model',
                    content: (
                      <div className="space-y-2">
                        <p>{product.fit}</p>
                        <p className="text-smoke">{product.modelNote}</p>
                        <button
                          type="button"
                          onClick={() => setSizeGuideOpen(true)}
                          className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] underline underline-offset-4"
                        >
                          Open size guide <ArrowRight width={10} height={10} />
                        </button>
                      </div>
                    ),
                  },
                  {
                    title: 'Shipping & returns',
                    content: <p>{product.shipping}</p>,
                  },
                  {
                    title: 'Care',
                    content: (
                      <p>
                        Machine wash cold, inside out, with like colours. Do not tumble dry — hang
                        to dry in shade to preserve the handfeel and the print. Warm iron inside
                        out if needed.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- reviews */}
        <div className="mt-16 md:mt-24">
          <ReviewSection
            reviews={reviews}
            productName={product.name}
            rating={product.rating}
            reviewCount={product.reviewCount}
            onWriteReview={() => setReviewOpen(true)}
          />
        </div>

        {/* ----------------------------------------------------------- related */}
        <section className="mt-16 md:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <p className="eyebrow text-smoke">Styled with</p>
              <h2 className="display-md mt-3">Complete the fit</h2>
            </Reveal>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.14em]"
            >
              Shop all
              <ArrowRight width={13} height={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-3.5 gap-y-8 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {recentProducts.length > 0 && (
          <section className="mt-16 border-t border-ink/10 pt-10 md:mt-20">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow text-smoke">Pick up where you left off</p>
                <h2 className="display-md mt-2 text-[26px]">Recently viewed</h2>
              </div>
              <Link
                to="/shop"
                className="font-mono text-[9.5px] uppercase tracking-[0.12em] underline underline-offset-4"
              >
                Shop all
              </Link>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-x-3.5 gap-y-8 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {recentProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-smoke transition-colors hover:text-ink"
          >
            <ArrowLeft width={12} height={12} className="rotate-90" /> Back to top
          </button>
        </div>
      </div>

      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />
      <WriteReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        productName={product.name}
        onSubmit={(r) => {
          setExtraReviews((prev) => [r, ...prev]);
          setReviewOpen(false);
          toast({
            title: 'Review published',
            description: 'Thanks for helping the Nation shop smarter.',
            variant: 'success',
          });
        }}
      />
    </div>
  );
}
