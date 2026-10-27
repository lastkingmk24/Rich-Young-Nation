import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCheckout, SHIPPING_OPTIONS } from '@/store/CheckoutContext';
import { products, formatPrice } from '@/data/catalog';
import { useCart } from '@/store/CartContext';
import { useReveal } from '@/hooks/useReveal';
import { ButtonLink } from '@/components/ui/Button';
import { ProductCard } from '@/components/shop/ProductCard';
import { ArrowRight, Check, Truck } from '@/components/ui/Icons';

export default function OrderConfirmed() {
  const { data, orderNumber, reset } = useCheckout();
  const { subtotal } = useCart();
  useReveal([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const eta = useMemo(() => {
    const d = new Date();
    const days = data.fulfilment === 'pickup' ? 0 : data.shippingMethod === 'express' ? 2 : 6;
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }, [data.fulfilment, data.shippingMethod]);

  const picks = products.filter((p) => p.featured).slice(0, 3);
  const orderTotal = subtotal > 0 ? subtotal : 0;

  if (!orderNumber) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="display-lg">No order to show</h1>
        <p className="mt-3 text-[13px] text-smoke">
          Once you complete a checkout, your confirmation will appear here.
        </p>
        <ButtonLink to="/shop" className="mt-6">
          Start shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-ink/10 bg-bone/30">
        <div className="container-x py-14 text-center md:py-20">
          <div className="mx-auto grid h-16 w-16 animate-scale-in place-items-center rounded-full bg-ink text-acid">
            <Check width={28} height={28} />
          </div>
          <p className="eyebrow mt-6 text-smoke">Order confirmed</p>
          <h1 className="display-lg mt-3">You&apos;re in the Nation.</h1>
          <p className="mx-auto mt-4 max-w-[48ch] text-[13.5px] leading-relaxed text-smoke">
            Thanks {data.firstName || 'friend'} — we&apos;ve emailed your receipt to{' '}
            <span className="text-ink">{data.email || 'your inbox'}</span>. Your order is being
            packed by hand in our New York studio.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-2 sm:grid-cols-3">
            {[
              { label: 'Order number', value: orderNumber },
              {
                label: data.fulfilment === 'pickup' ? 'Ready for pickup' : 'Estimated arrival',
                value: eta,
              },
              {
                label: 'Method',
                value:
                  data.fulfilment === 'pickup'
                    ? 'Store pickup'
                    : SHIPPING_OPTIONS[data.shippingMethod].label,
              },
            ].map((b) => (
              <div key={b.label} className="border border-ink/10 bg-paper px-3 py-4 text-center">
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-smoke">
                  {b.label}
                </p>
                <p className="mt-1.5 text-[12.5px] font-medium leading-tight">{b.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink to="/shop" icon={<ArrowRight width={14} height={14} />}>
              Continue shopping
            </ButtonLink>
            <Link
              to="/help#tracking"
              className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:border-ink"
            >
              <Truck width={13} height={13} /> Track order
            </Link>
          </div>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="border border-ink/10 p-5">
            <h2 className="font-mono text-[9.5px] uppercase tracking-[0.14em]">Delivering to</h2>
            <p className="mt-3 text-[13px] leading-relaxed">
              {data.firstName} {data.lastName}
              <br />
              {data.fulfilment === 'pickup' ? (
                data.pickupLocation
              ) : (
                <>
                  {data.address1}
                  {data.address2 && <>, {data.address2}</>}
                  <br />
                  {data.city}, {data.region} {data.postal}
                  <br />
                  {data.country}
                </>
              )}
            </p>
          </div>

          <div className="border border-ink/10 p-5">
            <h2 className="font-mono text-[9.5px] uppercase tracking-[0.14em]">What happens next</h2>
            <ol className="mt-3 space-y-2.5">
              {[
                'We pack your order within 24 hours.',
                'You get a tracking link the moment it leaves the studio.',
                data.fulfilment === 'pickup'
                  ? 'Bring your confirmation email to collect in store.'
                  : `Estimated arrival: ${eta}.`,
              ].map((s, i) => (
                <li key={s} className="flex gap-2.5 text-[12px] leading-relaxed text-ink/70">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-ink/25 font-mono text-[8px]">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 border border-ink/10">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3.5">
            <h2 className="font-mono text-[9.5px] uppercase tracking-[0.14em]">Order summary</h2>
            <span className="font-mono text-[10px] tabular-nums">
              {orderTotal > 0 ? formatPrice(orderTotal) : 'Paid'}
            </span>
          </div>
          <p className="px-5 py-6 text-center text-[12px] text-smoke">
            Your receipt is in your inbox. Need a copy? Email{' '}
            <a href="mailto:orders@richyoungnation.com" className="underline underline-offset-2">
              orders@richyoungnation.com
            </a>
            .
          </p>
        </div>

        <div className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow text-smoke">While you wait</p>
              <h2 className="display-md mt-2">Complete the fit</h2>
            </div>
            <Link
              to="/shop"
              className="font-mono text-[9.5px] uppercase tracking-[0.12em] underline underline-offset-4"
            >
              Shop all
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-x-3.5 gap-y-8 md:gap-x-5 lg:grid-cols-3">
            {picks.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={reset}
            className="font-mono text-[9px] uppercase tracking-[0.12em] text-smoke underline underline-offset-4 hover:text-ink"
          >
            Start a new order
          </button>
        </div>
      </section>
    </div>
  );
}
