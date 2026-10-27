import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Globe } from '@/components/ui/Icons';
import { useStore } from '@/store/StoreContext';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'New In', to: '/shop?sort=newest' },
      { label: 'Shop All', to: '/shop' },
      { label: 'Hoodies', to: '/shop?category=Hoodies' },
      { label: 'Denim', to: '/shop?category=Denim' },
      { label: 'Outerwear', to: '/shop?category=Outerwear' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping', to: '/help#shipping' },
      { label: 'Returns & Exchanges', to: '/help#returns' },
      { label: 'Size Guide', to: '/help#sizing' },
      { label: 'Track Order', to: '/help#tracking' },
      { label: 'Contact', to: '/help#contact' },
    ],
  },
  {
    title: 'Nation',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'Journal', to: '/journal' },
      { label: 'Lookbook', to: '/lookbook' },
      { label: 'Collections', to: '/collections' },
      { label: 'Careers', to: '/about#careers' },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useStore();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: 'Check that email', description: 'That address doesn’t look right.', variant: 'error' });
      return;
    }
    setSubscribed(true);
    setEmail('');
    toast({
      title: 'You’re on the list',
      description: 'Welcome to the Nation. Check your inbox for 10% off.',
      variant: 'success',
    });
  };

  return (
    <footer className="mt-24 bg-ink text-paper">
      {/* newsletter */}
      <div className="border-b border-paper/10">
        <div className="container-x grid gap-10 py-14 md:grid-cols-2 md:items-end md:gap-16 md:py-20">
          <div>
            <p className="eyebrow mb-4 text-acid">The list</p>
            <h2 className="display-lg max-w-[16ch] text-paper">
              Get first access to every drop.
            </h2>
            <p className="mt-4 max-w-[42ch] text-[13.5px] leading-relaxed text-paper/55">
              Early access, restock alerts and the occasional 10% code. No noise — we send maybe
              twice a month.
            </p>
          </div>

          <div className="md:pb-2">
            {subscribed ? (
              <div className="flex items-start gap-3 border border-acid/40 bg-acid/10 px-5 py-6">
                <Check width={18} height={18} className="mt-0.5 shrink-0 text-acid" />
                <div>
                  <p className="text-[14px] font-medium text-paper">You&apos;re in.</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-paper/55">
                    Check your inbox — your 10% welcome code is on the way.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="group flex items-center border-b border-paper/30 pb-2 transition-colors focus-within:border-acid">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-transparent text-[15px] outline-none placeholder:text-paper/30"
                    autoComplete="email"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="ml-4 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-acid text-ink transition-transform duration-300 hover:scale-110"
                  >
                    <ArrowRight width={16} height={16} />
                  </button>
                </div>
                <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-paper/35">
                  By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* links */}
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
        <div>
          <Link to="/" className="inline-block">
            <span className="block font-display text-[36px] leading-none tracking-[0.02em]">RYN</span>
            <span className="mt-1 block font-mono text-[7.5px] uppercase tracking-[0.36em] text-paper/40">
              Rich Young Nation
            </span>
          </Link>
          <p className="mt-6 max-w-[30ch] text-[12.5px] leading-relaxed text-paper/45">
            Independent streetwear designed in New York. Built heavy, cut oversized, made to
            outlast the trend cycle.
          </p>
          <div className="mt-6 flex items-center gap-2 text-paper/45">
            <Globe width={13} height={13} />
            <span className="font-mono text-[9px] uppercase tracking-[0.14em]">
              Ships worldwide · USD $
            </span>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/40">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[12.5px] text-paper/70 transition-colors hover:text-acid"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* bottom */}
      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/35">
            © {new Date().getFullYear()} Rich Young Nation. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map((t) => (
              <Link
                key={t}
                to="/help"
                className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/35 transition-colors hover:text-paper"
              >
                {t}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {['VISA', 'MC', 'AMEX', 'APPLE PAY', 'KLARNA'].map((m) => (
              <span
                key={m}
                className="border border-paper/15 px-1.5 py-[3px] font-mono text-[7.5px] uppercase tracking-[0.08em] text-paper/40"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
