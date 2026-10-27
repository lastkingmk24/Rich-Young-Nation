import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from '@/store/CartContext';
import { StoreProvider } from '@/store/StoreContext';
import { CheckoutProvider } from '@/store/CheckoutContext';
import { Header, AnnouncementBar } from '@/components/layout/Header';
import { Seo } from '@/components/layout/Seo';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Toaster } from '@/components/ui/Toaster';
import Home from '@/pages/Home';

const Shop = lazy(() => import('@/pages/Shop'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const OrderConfirmed = lazy(() => import('@/pages/OrderConfirmed'));
const Collections = lazy(() => import('@/pages/Collections'));
const Lookbook = lazy(() => import('@/pages/Lookbook'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const Journal = lazy(() => import('@/pages/Journal'));
const About = lazy(() => import('@/pages/About'));
const Help = lazy(() => import('@/pages/Help'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search]);
  return null;
}

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="h-6 w-6 animate-spin rounded-full border border-ink/20 border-t-ink" />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <CheckoutProvider>
          <ScrollToTop />
          <Seo />
          <div className="grain-layer" aria-hidden="true" />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2.5 focus:font-mono focus:text-[10px] focus:uppercase focus:tracking-[0.14em] focus:text-paper"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <Routes>
              <Route path="/checkout" element={<CheckoutOnly />} />
              <Route path="*" element={<StoreShell />} />
            </Routes>
          </div>
          <CartDrawer />
          <Toaster />
        </CheckoutProvider>
      </CartProvider>
    </StoreProvider>
  );
}

function CheckoutOnly() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Checkout />
    </Suspense>
  );
}

function StoreShell() {
  const { pathname } = useLocation();
  const isOrderConfirmed = pathname === '/order-confirmed';

  return (
    <>
      {!isOrderConfirmed && <AnnouncementBar />}
      <Header />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:slug" element={<Collections />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
