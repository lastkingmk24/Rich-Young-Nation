import { Link, useParams } from 'react-router-dom';
import { collections, products } from '@/data/catalog';
import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { ProductCard } from '@/components/shop/ProductCard';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/ui/Icons';

export default function Collections() {
  const { slug } = useParams();
  const active = slug ? collections.find((c) => c.slug === slug) : null;
  useReveal([slug]);

  if (slug && !active) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="display-lg">Collection not found</h1>
        <Link to="/collections" className="mt-5 border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.14em]">
          All collections
        </Link>
      </div>
    );
  }

  if (active) {
    const items = products.filter((p) => p.collectionIds.includes(active.id));
    return (
      <div>
        <section className="relative overflow-hidden bg-ink text-paper">
          <img
            src={active.image}
            alt={active.name}
            className="absolute inset-0 h-full w-full object-cover object-top opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
          <div className="container-x relative py-16 md:py-24">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/55 transition-colors hover:text-paper"
            >
              <ArrowLeft width={12} height={12} /> All collections
            </Link>
            <p className="eyebrow mt-6 text-acid">{active.tagline}</p>
            <h1 className="display-lg mt-3 max-w-[18ch]">{active.name}</h1>
            <p className="mt-4 max-w-[52ch] text-[13.5px] leading-relaxed text-paper/65">
              {active.description}
            </p>
            <p className="mt-6 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/45">
              {items.length} pieces
            </p>
          </div>
        </section>

        <section className="container-x py-12 md:py-16">
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-9 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} priority={i < 4} />
            ))}
          </div>
          {items.length === 0 && (
            <p className="py-16 text-center text-[13px] text-smoke">
              This edit is restocking. Check back Thursday.
            </p>
          )}
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-ink/10 bg-bone/30">
        <div className="container-x py-12 md:py-16">
          <p className="eyebrow text-smoke">Edits</p>
          <h1 className="display-lg mt-3">Collections</h1>
          <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-smoke">
            Three ways into the wardrobe: the season&apos;s new drop, the permanent core, and the
            everyday rotation built to be worn five days a week.
          </p>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <div className="space-y-5">
          {collections.map((c, i) => {
            const items = products.filter((p) => p.collectionIds.includes(c.id));
            return (
              <Reveal key={c.id} delay={i * 90}>
                <Link
                  to={`/collections/${c.slug}`}
                  className="group grid overflow-hidden border border-ink/10 bg-paper md:grid-cols-[minmax(0,340px)_1fr]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-bone md:aspect-auto md:h-full md:min-h-[240px]">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-smoke">
                        {c.tagline}
                      </p>
                      <h2 className="mt-2 font-display text-[32px] leading-none md:text-[38px]">
                        {c.name}
                      </h2>
                      <p className="mt-3 max-w-[52ch] text-[12.5px] leading-relaxed text-ink/60">
                        {c.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2.5">
                        {items.slice(0, 4).map((p) => (
                          <span key={p.id} className="h-9 w-9 overflow-hidden rounded-full border-2 border-paper bg-bone">
                            <img src={p.colors[0].images[0]} alt="" className="h-full w-full object-cover object-top" />
                          </span>
                        ))}
                        <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-paper bg-ink font-mono text-[8.5px] text-paper">
                          +{items.length}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em]">
                        Shop edit
                        <ArrowUpRight width={13} height={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-ink px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper"
          >
            Shop everything <ArrowRight width={13} height={13} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
