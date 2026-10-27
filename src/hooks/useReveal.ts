import { useEffect, useState } from 'react';

/**
 * Adds `.is-visible` to `.reveal` / `.reveal-mask` nodes as they enter the
 * viewport. Re-scans whenever `deps` change. A short fallback timer guarantees
 * nothing stays permanently hidden, and everything above the fold is revealed
 * immediately on mount so first paint is never blank.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const select = '.reveal:not(.is-visible), .reveal-mask:not(.is-visible)';
    const nodes = () => Array.from(document.querySelectorAll<HTMLElement>(select));

    const revealAboveFold = () => {
      const vh = window.innerHeight || 800;
      nodes().forEach((n) => {
        const top = n.getBoundingClientRect().top;
        if (top < vh * 0.95) n.classList.add('is-visible');
      });
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const all = nodes();

    if (reduce || !('IntersectionObserver' in window)) {
      all.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    revealAboveFold();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '300px 0px 300px 0px', threshold: 0.01 },
    );

    nodes().forEach((n) => io.observe(n));

    // Late safety net: only reveals what is already in view (e.g. if the
    // observer never fired for a reason we did not anticipate).
    const fallback = window.setTimeout(revealAboveFold, 1400);

    const onResize = () => revealAboveFold();
    window.addEventListener('resize', onResize);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

/** Locks scroll and closes on Escape for modals / drawers. */
export function useDialog(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);
}
