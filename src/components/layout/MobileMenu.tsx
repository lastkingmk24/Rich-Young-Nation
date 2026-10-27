import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollLock } from '@/hooks/useReveal';
import { collections } from '@/data/catalog';
import { ArrowUpRight, Close } from '@/components/ui/Icons';
import { useCart } from '@/store/CartContext';

const LINKS = [
  { label: 'New In', to: '/shop?sort=newest', note: 'Vol. 04' },
  { label: 'Shop All', to: '/shop', note: '24 pieces' },
  { label: 'Collections', to: '/collections', note: '3 edits' },
  { label: 'Lookbook', to: '/lookbook', note: 'FW26' },
  { label: 'Journal', to: '/journal', note: 'Read' },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { count, openCart } = useCart();
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink/40 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="absolute inset-y-0 left-0 flex w-full max-w-[420px] animate-[slide-in-right_0.45s_var(--ease-luxe)_both] flex-col bg-ink text-paper"
        style={{ animationName: 'slideInLeft' }}
      >
        <style>{`@keyframes slideInLeft{from{transform:translate3d(-100%,0,0)}to{transform:translate3d(0,0,0)}}`}</style>

        <div className="flex items-center justify-between border-b border-paper/12 px-6 py-5">
          <span className="font-display text-2xl tracking-wide">RYN</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 transition-colors hover:bg-paper hover:text-ink"
          >
            <Close width={16} height={16} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul>
            {LINKS.map((l, i) => (
              <li key={l.label} style={{ animationDelay: `${100 + i * 45}ms` }} className="animate-fade-up">
                <Link
                  to={l.to}
                  onClick={onClose}
                  className="group flex items-baseline justify-between border-b border-paper/10 py-4"
                >
                  <span className="font-display text-[34px] leading-none transition-colors group-hover:text-acid">
                    {l.label}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/40">
                    {l.note}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-9 mb-3 text-paper/40">Collections</p>
          <ul className="space-y-2">
            {collections.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/collections/${c.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between text-sm text-paper/75 transition-colors hover:text-acid"
                >
                  {c.name}
                  <ArrowUpRight width={14} height={14} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-paper/12 px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/wishlist"
              onClick={onClose}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-paper"
            >
              Wishlist
            </Link>
            <button
              type="button"
              onClick={() => {
                onClose();
                openCart();
              }}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-paper"
            >
              Bag ({count})
            </button>
          </div>
          <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-paper/35">
            Free shipping over $150 · 30-day returns
            <br />
            hello@richyoungnation.com
          </p>
        </div>
      </div>
    </div>
  );
}
