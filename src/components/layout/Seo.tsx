import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getProductBySlug, collections } from '@/data/catalog';

const BASE_TITLE = 'RYN — Rich Young Nation';
const BASE_DESCRIPTION =
  'Rich Young Nation (RYN) — heavyweight hoodies, baggy denim, statement outerwear and the pieces Gen-Z is actually wearing. Free shipping over $150. 30-day returns.';

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets document title / description / OG tags per route so every page is
 * individually shareable and indexable.
 */
export function Seo() {
  const { pathname } = useLocation();
  const { slug } = useParams();

  useEffect(() => {
    let title = BASE_TITLE;
    let description = BASE_DESCRIPTION;

    if (pathname.startsWith('/product/')) {
      const p = slug ? getProductBySlug(slug) : undefined;
      if (p) {
        title = `${p.name} — ${p.subtitle} | RYN`;
        description = `${p.description.slice(0, 155)}…`;
      } else {
        title = `Piece not found | RYN`;
      }
    } else if (pathname.startsWith('/shop')) {
      title = `Shop all — Hoodies, Denim & Outerwear | RYN`;
      description =
        'Shop the full RYN collection: 480gsm hoodies, 14oz baggy denim, cargo trousers and stone-washed overshirts. Free express shipping over $150.';
    } else if (pathname.startsWith('/collections/')) {
      const c = collections.find((x) => x.slug === slug);
      title = c ? `${c.name} — ${c.tagline} | RYN` : 'Collections | RYN';
      description = c?.description ?? description;
    } else if (pathname === '/collections') {
      title = 'Collections — New Drop, Core Essentials, Everyday Uniform | RYN';
    } else if (pathname === '/lookbook') {
      title = 'Lookbook — Concrete Season, FW26 | RYN';
    } else if (pathname === '/checkout') {
      title = 'Secure checkout | RYN';
      description = 'Complete your RYN order — encrypted checkout, free returns.';
    } else if (pathname === '/order-confirmed') {
      title = 'Order confirmed | RYN';
    } else if (pathname === '/wishlist') {
      title = 'Your wishlist | RYN';
    } else if (pathname === '/journal') {
      title = 'The Journal — Notes from the studio | RYN';
    } else if (pathname === '/about') {
      title = 'Our story — Built heavy, cut oversized | RYN';
    } else if (pathname === '/help') {
      title = 'Help centre — Shipping, returns & sizing | RYN';
    }

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', pathname.startsWith('/product/') ? 'product' : 'website', 'property');
    setMeta('twitter:card', 'summary_large_image');
  }, [pathname, slug]);

  return null;
}
