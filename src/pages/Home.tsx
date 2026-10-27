import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import hero from '@/assets/hero.jpg';
import heroMobile from '@/assets/hero-mobile.jpg';
import edConcrete from '@/assets/ed-concrete.jpg';
import { collections, lookbook, products } from '@/data/catalog';
import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import { ProductCard } from '@/components/shop/ProductCard';
import { ArrowRight, ArrowUpRight, Bolt, Play, Quote, Return, Truck } from '@/components/ui/Icons';
import { Rating } from '@/components/ui/Rating';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/StoreContext';

const TABS = ['Bestsellers', 'New in', 'Under $150'] as const;

export default function Home() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Bestsellers');
  useReveal([]);
  const { toast } = useStore();

  const gridProducts = useMemo(() => {
    if (tab === 'New in') return products.filter((p) => p.isNew).slice(0, 8);
    if (tab === 'Under $150') return products.filter((p) => p.price < 150).slice(0, 8);
    return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
  }, [tab]);

  return (
    <div className="overflow-hidden">
      {/* ---------------------------------------------------------------- HERO */}
      <h1 className="sr-only">
        RYN — Rich Young Nation: heavyweight streetwear for Gen-Z
      </h1>

      <section className="relative">
        {/* ---------- mobile: stacked editorial ---------- */}
        <div className="bg-ink md:hidden">
          <div className="px-5 pb-7 pt-9">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-acid" />
              <p className="eyebrow text-acid">Volume 04 · FW26</p>
            </div>
            <h2 className="display-xl mt-4 text-[clamp(3.2rem,17vw,5rem)] text-paper">
              Rich
              <br />
              Young
              <br />
              <span className="italic text-acid">Nation.</span>
            </h2>
            <p className="mt-4 max-w-[34ch] text-[13px] leading-relaxed text-paper/65">
              Heavyweight fleece. Rigid denim. Cut oversized, built to be worn into the ground.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <ButtonLink to="/shop" variant="acid" size="lg" fullWidth icon={<ArrowRight width={15} height={15} />}>
                Shop the drop
              </ButtonLink>
              <ButtonLink
                to="/lookbook"
                size="lg"
                fullWidth
                className="border-paper/25 bg-transparent text-paper hover:bg-paper hover:text-ink"
              >
                View lookbook
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroMobile}
              alt="Two models wearing the RYN Fall/Winter 26 collection in a concrete gallery"
              className="aspect-[3/4] w-full object-cover object-top"
              {...({ fetchpriority: 'high' } as Record<string, string>)}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
            <Link
              to="/product/nation-hoodie"
              className="absolute bottom-3 left-3 flex items-center gap-2 border border-paper/25 bg-ink/50 px-2.5 py-2 backdrop-blur-md"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-acid">
                Worn here
              </span>
              <span className="text-[11px] text-paper">Nation Hoodie · $148</span>
              <ArrowUpRight width={11} height={11} className="text-paper/70" />
            </Link>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-paper/10 px-5 py-3">
            <div className="flex items-center gap-1.5">
              <Rating value={4.9} size={11} className="text-acid" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-paper/60">
                4.9 · 1,284
              </span>
            </div>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-paper/60">
              40k+ in the Nation
            </span>
          </div>
        </div>

        {/* ---------- desktop: full-bleed ---------- */}
        <div className="relative hidden min-h-[calc(100svh-72px)] w-full overflow-hidden bg-ink md:block">
          <img
            src={hero}
            alt="Two models wearing the RYN Fall/Winter 26 collection in a concrete gallery"
            className="absolute inset-0 h-full w-full object-cover object-center"
            {...({ fetchpriority: 'high' } as Record<string, string>)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-ink/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />

          <div className="container-x relative flex min-h-[calc(100svh-72px)] flex-col justify-center pb-20 pt-24">
            <div className="max-w-2xl">
              <div className="flex animate-fade-up items-center gap-3">
                <span className="h-px w-8 bg-acid" />
                <p className="eyebrow text-acid">Volume 04 · Fall / Winter 26</p>
              </div>

              <h1 className="display-xl mt-5 animate-fade-up text-paper [animation-delay:100ms]">
                Rich
                <br />
                Young
                <br />
                <span className="italic text-acid">Nation.</span>
              </h1>

              <p className="mt-6 max-w-[38ch] animate-fade-up text-[15px] leading-relaxed text-paper/70 [animation-delay:220ms]">
                Heavyweight fleece. Rigid denim. Cut oversized, built to be worn into the ground.
                Streetwear for the ones who move different.
              </p>

              <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:320ms]">
                <ButtonLink to="/shop" variant="acid" size="lg" icon={<ArrowRight width={15} height={15} />}>
                  Shop the drop
                </ButtonLink>
                <ButtonLink
                  to="/lookbook"
                  size="lg"
                  className="border-paper/25 bg-transparent text-paper hover:bg-paper hover:text-ink"
                >
                  View lookbook
                </ButtonLink>
              </div>

              <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-7 gap-y-3 [animation-delay:420ms]">
                <div className="flex items-center gap-2">
                  <Rating value={4.9} size={12} className="text-acid" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60">
                    4.9 / 1,284 reviews
                  </span>
                </div>
                <span className="h-3 w-px bg-paper/25" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60">
                  40k+ in the Nation
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/product/nation-hoodie"
            className="group absolute bottom-8 right-10 block w-[220px] animate-fade-up border border-paper/20 bg-ink/40 p-3 backdrop-blur-md transition-colors hover:border-acid/60"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-acid">
                Worn above
              </span>
              <ArrowUpRight
                width={12}
                height={12}
                className="text-acid transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p className="mt-2 text-[13px] font-medium text-paper">Nation Hoodie</p>
            <p className="font-mono text-[10px] text-paper/50">480gsm · $148</p>
          </Link>

          <div className="absolute bottom-4 left-0 hidden w-full justify-center md:flex">
            <span className="animate-bounce font-mono text-[8px] uppercase tracking-[0.3em] text-paper/35">
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- VALUE STRIP */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="container-x grid grid-cols-2 divide-x divide-ink/10 lg:grid-cols-4">
          {[
            { icon: <Truck width={17} height={17} />, title: 'Free express shipping', copy: 'On all orders over $150' },
            { icon: <Return width={17} height={17} />, title: '30-day returns', copy: 'No questions, no restocking fee' },
            { icon: <Bolt width={17} height={17} />, title: 'Ships in 24h', copy: 'From our New York studio' },
            { icon: <Quote width={17} height={17} />, title: 'Made to last', copy: '480gsm fleece · 14oz denim' },
          ].map((v, i) => (
            <div
              key={v.title}
              className={cn(
                'flex items-start gap-3 px-4 py-5 lg:px-7 lg:py-6',
                i < 2 && 'border-b border-ink/10 lg:border-b-0',
              )}
            >
              <span className="mt-0.5 shrink-0 text-ink/70">{v.icon}</span>
              <div>
                <p className="text-[11.5px] font-medium leading-tight">{v.title}</p>
                <p className="mt-0.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.08em] text-smoke">
                  {v.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ MARQUEE */}
      <div className="border-b border-ink/10 bg-ink py-3.5 text-paper">
        <Marquee>
          {['Worn by the Nation', 'FW26 · Volume 04', 'Heavyweight only', 'New York', 'Made to outlast the trend cycle', 'Ships worldwide'].map(
            (t, i) => (
              <span key={i} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/70">
                  {t}
                </span>
                <span className="text-acid">✦</span>
              </span>
            ),
          )}
        </Marquee>
      </div>

      {/* ------------------------------------------------------- COLLECTIONS */}
      <section className="container-x py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="eyebrow text-smoke">The edits</p>
            <h2 className="display-lg mt-3 max-w-[16ch]">Featured collections</h2>
          </Reveal>
          <Reveal delay={100}>
            <Link
              to="/collections"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.16em]"
            >
              All collections
              <ArrowRight width={13} height={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={i * 110}>
              <Link
                to={`/collections/${c.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-bone"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1300ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-acid">
                    {c.tagline}
                  </p>
                  <h3 className="mt-2 font-display text-[30px] leading-none text-paper md:text-[32px]">
                    {c.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-paper/70">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em]">
                      Shop edit
                    </span>
                    <ArrowRight
                      width={13}
                      height={13}
                      className="transition-transform duration-500 group-hover:translate-x-1.5"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- PRODUCT GRID */}
      <section className="border-t border-ink/10 bg-paper">
        <div className="container-x py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow text-smoke">Shop</p>
              <h2 className="display-lg mt-3">The pieces</h2>
            </Reveal>

            <div className="flex flex-wrap items-center gap-1.5">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  aria-pressed={tab === t}
                  className={cn(
                    'border px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] transition-all duration-300',
                    tab === t
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/15 text-ink/65 hover:border-ink/50 hover:text-ink',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-x-3.5 gap-y-9 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {gridProducts.map((p, i) => (
              <ProductCard key={`${tab}-${p.id}`} product={p} index={i} priority={i < 4} />
            ))}
          </div>

          <Reveal className="mt-12 flex justify-center">
            <ButtonLink to="/shop" variant="outline" size="lg" icon={<ArrowRight width={15} height={15} />}>
              Shop all {products.length} pieces
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- EDITORIAL */}
      <section className="relative bg-ink text-paper">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[50vh] overflow-hidden lg:min-h-[640px]">
            <img
              src={edConcrete}
              alt="RYN campaign — concrete gallery"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/20" />
            <button
              type="button"
              onClick={() =>
                toast({
                  title: 'Campaign film coming soon',
                  description: 'Volume 04 film premieres November 4.',
                })
              }
              className="group absolute bottom-6 left-6 flex items-center gap-3 text-paper"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-paper/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
                <Play width={15} height={15} />
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em]">
                Watch the campaign film
              </span>
            </button>
          </div>

          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 md:px-14 lg:py-20 xl:px-20">
            <Reveal>
              <p className="eyebrow text-acid">The philosophy</p>
              <h2 className="display-lg mt-4 max-w-[15ch]">
                Fewer pieces. <span className="italic text-paper/50">Heavier</span> fabric.
              </h2>
              <p className="mt-6 max-w-[45ch] text-[13.5px] leading-relaxed text-paper/60">
                We started RYN in a Brooklyn apartment in 2021 with one rule: nothing leaves the
                studio unless it outlasts three trend cycles. That means 480gsm fleece when the
                industry averages 280. It means 14oz Japanese denim. It means making eleven pieces
                instead of ninety.
              </p>
              <p className="mt-4 max-w-[45ch] text-[13.5px] leading-relaxed text-paper/60">
                We sell direct, we restock the same core pieces forever, and we price like a
                studio rather than a department store.
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-paper/15 pt-7">
                {[
                  { k: '480', l: 'gsm fleece' },
                  { k: '14oz', l: 'selvedge denim' },
                  { k: '40k', l: 'in the Nation' },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="font-display text-[30px] leading-none text-acid md:text-[38px]">
                      {s.k}
                    </dt>
                    <dd className="mt-1.5 font-mono text-[8.5px] uppercase leading-tight tracking-[0.14em] text-paper/40">
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>

              <ButtonLink
                to="/about"
                variant="light"
                size="md"
                className="mt-9 w-fit border-paper/30 bg-transparent text-paper hover:bg-paper hover:text-ink"
                icon={<ArrowRight width={14} height={14} />}
              >
                Read our story
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- LOOKBOOK */}
      <section className="container-x py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="eyebrow text-smoke">Lookbook</p>
            <h2 className="display-lg mt-3 max-w-[14ch]">Worn by the Nation</h2>
          </Reveal>
          <Reveal delay={80}>
            <Link
              to="/lookbook"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.16em]"
            >
              Full lookbook
              <ArrowRight width={13} height={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {lookbook.map((l, i) => (
            <Reveal key={l.id} delay={i * 80} className={cn(i % 2 === 1 && 'lg:mt-12')}>
              <Link to={`/product/${l.productSlug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                  <img
                    src={l.image}
                    alt={l.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                  <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-paper/90 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                    <ArrowUpRight width={14} height={14} />
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[20px] leading-none">{l.title}</h3>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke">
                  {l.caption}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- REVIEWS */}
      <section className="border-y border-ink/10 bg-bone/40">
        <div className="container-x py-16 md:py-24">
          <Reveal className="text-center">
            <p className="eyebrow text-smoke">Reviews</p>
            <h2 className="display-lg mt-3">Loved by the Nation</h2>
            <div className="mt-4 flex items-center justify-center gap-2.5">
              <Rating value={4.9} size={15} />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
                4.9 average · 1,284 verified reviews
              </span>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                quote:
                  'The heaviest hoodie I own, in the best way. Washed it six times and it still holds its structure — no pilling, no shrinking.',
                name: 'Maya R.',
                place: 'Brooklyn, NY',
                product: 'Nation Hoodie',
              },
              {
                quote:
                  'Most baggy cargos look like a parachute designed by someone who has never worn trousers. These have real drape.',
                name: 'Priya S.',
                place: 'London, UK',
                product: 'Drift Cargo Pant',
              },
              {
                quote:
                  'Rigid, no stretch, and that is exactly why it hangs correctly. 14oz denim for this money is not normal.',
                name: 'Owen C.',
                place: 'Portland, OR',
                product: 'Atelier Baggy Jean',
              },
            ].map((r, i) => (
              <Reveal key={r.name} delay={i * 100}>
                <figure className="flex h-full flex-col border border-ink/10 bg-paper p-6">
                  <Rating value={5} size={11} />
                  <blockquote className="mt-4 flex-1 font-display text-[21px] leading-[1.28] tracking-[-0.01em]">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-ink/10 pt-4">
                    <p className="text-[12px] font-medium">{r.name}</p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke">
                      {r.place} · {r.product}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- CTA */}
      <section className="container-x py-16 md:py-24">
        <Reveal className="relative overflow-hidden bg-ink px-6 py-14 text-center md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 12px, #f4f1ea 12px, #f4f1ea 13px)',
            }}
          />
          <div className="relative">
            <p className="eyebrow text-acid">Join 40,000+</p>
            <h2 className="display-lg mx-auto mt-4 max-w-[18ch] text-paper">
              Ready to move <span className="italic text-acid">different?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-[13.5px] leading-relaxed text-paper/55">
              Free express shipping over $150, 30-day returns and a restock promise on every core
              piece.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink to="/shop" variant="acid" size="lg" icon={<ArrowRight width={15} height={15} />}>
                Shop the collection
              </ButtonLink>
              <ButtonLink
                to="/help#sizing"
                size="lg"
                className="border-paper/25 bg-transparent text-paper hover:bg-paper hover:text-ink"
              >
                Size guide
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
