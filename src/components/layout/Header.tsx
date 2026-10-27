import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/store/CartContext';
import { useStore } from '@/store/StoreContext';
import { useMediaQuery } from '@/hooks/useReveal';
import { Bag, Close, Heart, Menu, Search } from '@/components/ui/Icons';
import { SearchDialog } from './SearchDialog';
import { MobileMenu } from './MobileMenu';

const NAV = [
  { label: 'New In', to: '/shop?sort=newest' },
  { label: 'Shop All', to: '/shop' },
  { label: 'Hoodies', to: '/shop?category=Hoodies' },
  { label: 'Denim', to: '/shop?category=Denim' },
  { label: 'Collections', to: '/collections' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'Journal', to: '/journal' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { wishlist } = useStore();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-500 ease-[var(--ease-luxe)]',
          scrolled
            ? 'border-b border-ink/10 bg-paper/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-paper',
        )}
      >
        <div className="container-x">
          <div className="flex h-[62px] items-center justify-between gap-4 md:h-[72px]">
            {/* left: mobile menu + desktop nav */}
            <div className="flex flex-1 items-center gap-7">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="-ml-1 grid h-9 w-9 place-items-center lg:hidden"
                aria-label="Open menu"
              >
                <Menu width={19} height={19} />
              </button>

              <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
                {NAV.slice(0, 4).map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'link-underline font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors',
                        (isActive && !item.to.includes('?')) || location.search === item.to.split('?')[1]
                          ? 'text-ink'
                          : 'text-ink/75 hover:text-ink',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* center wordmark */}
            <Link
              to="/"
              className="group/logo absolute left-1/2 -translate-x-1/2 select-none"
              aria-label="RYN home"
            >
              <span className="relative block">
                <span className="block font-display text-[26px] leading-none tracking-[0.02em] md:text-[30px]">
                  RYN
                </span>
                <span className="absolute -right-2.5 top-0 hidden h-1 w-1 rounded-full bg-acid transition-transform duration-500 group-hover/logo:scale-150 md:block" />
              </span>
              <span className="mt-0.5 hidden font-mono text-[6.5px] uppercase tracking-[0.34em] text-smoke md:block">
                Rich Young Nation
              </span>
            </Link>

            {/* right */}
            <div className="flex flex-1 items-center justify-end gap-0.5 md:gap-1">
              <nav className="mr-3 hidden items-center gap-7 lg:flex" aria-label="Secondary">
                {NAV.slice(4).map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className="link-underline font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/75 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5"
              >
                <Search width={18} height={18} />
              </button>

              <Link
                to="/wishlist"
                aria-label={`Wishlist${wishlist.length ? `, ${wishlist.length} items` : ''}`}
                className="relative hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5 sm:grid"
              >
                <Heart width={18} height={18} />
                {wishlist.length > 0 && (
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-berry" />
                )}
              </Link>

              <button
                type="button"
                onClick={openCart}
                aria-label={`Open bag${count ? `, ${count} items` : ''}`}
                className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5"
              >
                <Bag width={18} height={18} />
                {count > 0 && (
                  <span className="absolute right-0.5 top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-ink px-1 font-mono text-[9px] leading-none text-paper">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>

              {isDesktop && (
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  className="ml-2 border border-ink px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
                >
                  Menu
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="container-x">
          <div className="-mx-5 flex gap-5 overflow-x-auto px-5 pb-3.5 pt-0.5 no-scrollbar sm:-mx-8 sm:px-8 lg:hidden">
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'shrink-0 whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.13em]',
                    isActive ? 'text-ink' : 'text-smoke',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="relative z-40 bg-ink text-paper">
      <div className="container-x relative flex h-9 items-center justify-center gap-6 text-center">
        <p className="max-w-[calc(100%-2.5rem)] font-mono text-[8.5px] uppercase leading-none tracking-[0.12em] text-paper/85 sm:text-[9.5px] sm:tracking-[0.16em] md:text-[10px]">
          <span className="text-acid">Free express shipping</span>
          <span className="mx-1.5 text-paper/30 sm:mx-2">/</span>
          Orders over $150
          <span className="mx-2 hidden text-paper/30 sm:inline">/</span>
          <span className="hidden sm:inline">30-day returns</span>
        </p>
        <button
          type="button"
          onClick={() => setHidden(true)}
          aria-label="Dismiss announcement"
          className="absolute right-0 grid h-6 w-6 place-items-center text-paper/50 transition-colors hover:text-paper sm:right-1"
        >
          <Close width={13} height={13} />
        </button>
      </div>
    </div>
  );
}
