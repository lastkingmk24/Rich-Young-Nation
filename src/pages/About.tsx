import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/Icons';
import edConcrete from '@/assets/ed-concrete.jpg';
import hero from '@/assets/hero.jpg';

const VALUES = [
  {
    n: '01',
    title: 'Weight over volume',
    body: 'We would rather make a handful of pieces at 480gsm than ninety at 280. Everything is sampled on-body at least six times before it goes to production.',
  },
  {
    n: '02',
    title: 'Direct, always',
    body: 'No wholesale markup, no department-store margin. You pay for the garment, the fabric and the studio that designed it — nothing else.',
  },
  {
    n: '03',
    title: 'Restock the core',
    body: 'Trend pieces come and go. Our core essentials restock forever in the same fit — so when you find your size, it stays your size.',
  },
  {
    n: '04',
    title: 'Make it last',
    body: 'Repairs are free for life. Send any RYN piece back for mending and we will fix it, or replace it if it cannot be saved.',
  },
];

export default function About() {
  useReveal([]);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-paper">
        <img src={edConcrete} alt="" className="absolute inset-0 h-full w-full object-cover object-top opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="container-x relative py-16 md:py-24">
          <p className="eyebrow text-acid">Our story</p>
          <h1 className="display-lg mt-4 max-w-[20ch]">
            Started in a Brooklyn apartment in <span className="italic text-acid">2021.</span>
          </h1>
          <p className="mt-5 max-w-[54ch] text-[13.5px] leading-relaxed text-paper/65">
            Two friends, one screen printer and a rule that we still keep: nothing leaves the studio
            unless it outlasts three trend cycles.
          </p>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="eyebrow text-smoke">The beginning</p>
            <h2 className="display-md mt-3">A hoodie that would not quit.</h2>
            <div className="mt-5 space-y-4 text-[13px] leading-relaxed text-ink/70">
              <p>
                The first Nation Hoodie was a sample run of 40, made with a mill in Portugal that
                usually supplies workwear brands. We wanted the weight of a rugby jumper with the
                drape of a hoodie — 480gsm loopback, garment-dyed, enzyme-washed twice.
              </p>
              <p>
                It sold out in nine days off a single Instagram post. We had no website, so people
                DM&apos;d us their addresses and paid by transfer. That is where the Nation started —
                not a marketing plan, just a fabric people could feel through a screen.
              </p>
              <p>
                Five years later we still produce in the same two factories in Portugal and Los
                Angeles, with the same rule: if we would not wear it for three years, we do not make
                it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/5] overflow-hidden bg-bone">
              <img src={hero} alt="RYN campaign" loading="lazy" className="h-full w-full object-cover object-top" />
            </div>
            <p className="mt-2.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-smoke">
              Volume 04 campaign · Long Island City, 2026
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-bone/30">
        <div className="container-x py-14 md:py-20">
          <Reveal>
            <p className="eyebrow text-smoke">What we stand on</p>
            <h2 className="display-md mt-3">Four rules, no exceptions.</h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 80}>
                <div className="h-full bg-paper p-6">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-smoke">{v.n}</p>
                  <h3 className="mt-3 font-display text-[24px] leading-tight">{v.title}</h3>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-ink/60">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20" id="careers">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { k: '40,000+', l: 'in the Nation' },
            { k: '2', l: 'family-run factories' },
            { k: '0', l: 'seasonal markdowns' },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 80}>
              <div className="border-t border-ink/20 pt-5">
                <p className="font-display text-[44px] leading-none">{s.k}</p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-smoke">
                  {s.l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-5 border border-ink/10 bg-paper p-8">
          <div>
            <p className="eyebrow text-smoke">Careers</p>
            <h2 className="display-md mt-2">We&apos;re hiring in Brooklyn.</h2>
            <p className="mt-2 max-w-[44ch] text-[12.5px] leading-relaxed text-ink/60">
              Open roles in production, design and community. If you care about fabric more than
              followers, we want to talk.
            </p>
          </div>
          <ButtonLink to="/help#contact" icon={<ArrowRight width={14} height={14} />}>
            Get in touch
          </ButtonLink>
        </Reveal>
      </section>
    </div>
  );
}
