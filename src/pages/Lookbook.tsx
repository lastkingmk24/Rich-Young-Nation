import { Link } from 'react-router-dom';
import { lookbook, products } from '@/data/catalog';
import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowUpRight, ArrowRight } from '@/components/ui/Icons';
import { ButtonLink } from '@/components/ui/Button';
import hero from '@/assets/hero.jpg';

export default function Lookbook() {
  useReveal([]);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <img
          src={hero}
          alt="RYN Fall/Winter 26 lookbook"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-[60%_center] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="container-x relative flex min-h-[62vh] flex-col justify-end py-14 text-paper md:min-h-[70vh] md:py-20">
          <p className="eyebrow text-acid">Lookbook · FW26</p>
          <h1 className="display-xl mt-4 max-w-[14ch] text-[clamp(2.8rem,9vw,7.5rem)]">
            Concrete <span className="italic text-acid">Season.</span>
          </h1>
          <p className="mt-5 max-w-[46ch] text-[13.5px] leading-relaxed text-paper/65">
            Shot over two mornings in a Brutalist gallery in Long Island City. One capsule, one
            palette, no styling tricks — everything you see is in the collection.
          </p>
          <div className="mt-8">
            <ButtonLink to="/shop" variant="acid" icon={<ArrowRight width={14} height={14} />}>
              Shop the looks
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {lookbook.map((l, i) => (
            <Reveal key={l.id} delay={i * 80} className={i % 2 === 1 ? 'lg:mt-16' : ''}>
              <Link to={`/product/${l.productSlug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                  <img
                    src={l.image}
                    alt={l.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-[1300ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                  <span className="absolute bottom-3 left-3 bg-paper/90 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                    Shop this look
                  </span>
                </div>
                <h2 className="mt-3 font-display text-[22px] leading-none">{l.title}</h2>
                <p className="mt-1.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-smoke">
                  {l.caption}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 border-y border-ink/10 py-12 text-center">
          <p className="display-md mx-auto max-w-[24ch]">
            “Built heavy, cut oversized, and made to be worn into the ground.”
          </p>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-smoke">
            — The RYN design studio
          </p>
        </Reveal>

        <div className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <p className="eyebrow text-smoke">Shop the season</p>
              <h2 className="display-md mt-2">Every piece in the book</h2>
            </Reveal>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.14em]"
            >
              Shop all
              <ArrowRight width={13} height={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
            {products.slice(0, 8).map((p) => (
              <li key={p.id}>
                <Link
                  to={`/product/${p.slug}`}
                  className="group flex items-center gap-4 py-3.5"
                >
                  <span className="h-14 w-11 shrink-0 overflow-hidden bg-bone">
                    <img
                      src={p.colors[0].images[0]}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium">{p.name}</span>
                    <span className="block truncate font-mono text-[9px] uppercase tracking-[0.08em] text-smoke">
                      {p.category} · {p.colors.map((c) => c.name).join(' / ')}
                    </span>
                  </span>
                  <span className="shrink-0 text-[13px] tabular-nums">${p.price}</span>
                  <ArrowUpRight
                    width={14}
                    height={14}
                    className="shrink-0 text-smoke transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
