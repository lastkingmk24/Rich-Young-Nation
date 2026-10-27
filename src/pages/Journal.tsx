import { Link } from 'react-router-dom';
import edConcrete from '@/assets/ed-concrete.jpg';
import hero from '@/assets/hero.jpg';
import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight, ArrowUpRight } from '@/components/ui/Icons';
import hoodie from '@/assets/p-hoodie-nation.jpg';
import jean from '@/assets/p-jean-baggy.jpg';

const POSTS = [
  {
    id: 'j1',
    title: 'Why 480gsm is the only number that matters',
    excerpt:
      'The fashion industry averages 280gsm fleece. We use 480. Here is exactly what that difference feels like after a year of wear.',
    category: 'Fabric',
    read: '6 min',
    date: 'Oct 18, 2026',
    image: hoodie,
    featured: true,
  },
  {
    id: 'j2',
    title: 'How to break in rigid denim without ruining it',
    excerpt:
      'A no-nonsense guide to washing, wearing and stacking 14oz selvedge — from the people who wear it 300 days a year.',
    category: 'Care',
    read: '5 min',
    date: 'Oct 06, 2026',
    image: jean,
    featured: false,
  },
  {
    id: 'j3',
    title: 'Inside Volume 04: two mornings in Long Island City',
    excerpt:
      'We shot the entire season in one Brutalist gallery with one lens. A look behind the campaign with our creative director.',
    category: 'Studio',
    read: '4 min',
    date: 'Sep 28, 2026',
    image: edConcrete,
    featured: false,
  },
  {
    id: 'j4',
    title: 'The oversized fit, decoded',
    excerpt:
      'Dropped shoulder, boxy body, long hem. Three proportions that make the difference between relaxed and sloppy.',
    category: 'Style',
    read: '7 min',
    date: 'Sep 14, 2026',
    image: hero,
    featured: false,
  },
];

export default function Journal() {
  useReveal([]);

  return (
    <div>
      <section className="border-b border-ink/10 bg-bone/30">
        <div className="container-x py-12 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-smoke">The Journal</p>
              <h1 className="display-lg mt-3">Notes from the studio</h1>
              <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-smoke">
                Fabric deep-dives, care guides and the occasional rant about the trend cycle.
              </p>
            </div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-smoke">
              Volume 04 · 2026
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        {/* featured */}
        <Reveal>
          <article className="group grid gap-5 border border-ink/10 md:grid-cols-[minmax(0,1.15fr)_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden bg-bone md:aspect-auto md:h-full md:min-h-[320px]">
              <img
                src={POSTS[0].image}
                alt={POSTS[0].title}
                className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-5 md:p-9">
              <div className="flex items-center gap-2.5">
                <span className="bg-ink px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-paper">
                  Featured
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-smoke">
                  {POSTS[0].category} · {POSTS[0].read}
                </span>
              </div>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.05]">
                {POSTS[0].title}
              </h2>
              <p className="mt-3 max-w-[48ch] text-[13px] leading-relaxed text-ink/65">
                {POSTS[0].excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em]">
                  Read the story
                  <ArrowRight width={13} height={13} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-smoke/50">·</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-smoke">
                  {POSTS[0].date}
                </span>
              </div>
            </div>
          </article>
        </Reveal>

        {/* grid */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {POSTS.slice(1).map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <article className="group flex h-full flex-col border border-ink/10">
                <div className="relative aspect-[4/3] overflow-hidden bg-bone">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-smoke">
                    {p.category} · {p.read}
                  </p>
                  <h3 className="mt-2 font-display text-[24px] leading-[1.08]">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[12px] leading-relaxed text-ink/60">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-smoke">
                      {p.date}
                    </span>
                    <ArrowUpRight width={14} height={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 border border-ink/10 bg-ink px-6 py-12 text-center text-paper md:px-16">
          <p className="eyebrow text-acid">Restocks</p>
          <h2 className="display-md mx-auto mt-3 max-w-[22ch]">
            New drops land every Thursday at 10am ET.
          </h2>
          <Link
            to="/shop?sort=newest"
            className="mt-6 inline-flex items-center gap-2 border border-paper/30 px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:bg-paper hover:text-ink"
          >
            See what&apos;s new <ArrowRight width={13} height={13} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
