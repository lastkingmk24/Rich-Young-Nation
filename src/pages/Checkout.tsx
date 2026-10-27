import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/store/CartContext';
import {
  PICKUP_LOCATIONS,
  SHIPPING_OPTIONS,
  useCheckout,
  type CheckoutData,
} from '@/store/CheckoutContext';
import { formatPrice } from '@/data/catalog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Info,
  Lock,
  Minus,
  Plus,
  Return,
  Store,
  Truck,
} from '@/components/ui/Icons';

type Step = 'contact' | 'delivery' | 'payment';

const STEPS: { key: Step; label: string; short: string }[] = [
  { key: 'contact', label: 'Contact & shipping', short: 'Contact' },
  { key: 'delivery', label: 'Delivery', short: 'Delivery' },
  { key: 'payment', label: 'Payment', short: 'Payment' },
];

function validateStep(step: Step, data: CheckoutData): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 'contact') {
    if (!data.firstName.trim()) e.firstName = 'Required';
    if (!data.lastName.trim()) e.lastName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) e.email = 'Enter a valid email';
    if (data.fulfilment === 'ship') {
      if (!data.address1.trim()) e.address1 = 'Required';
      if (!data.city.trim()) e.city = 'Required';
      if (!data.region.trim()) e.region = 'Required';
      if (!/^[A-Za-z0-9 -]{3,10}$/.test(data.postal.trim())) e.postal = 'Enter a valid ZIP';
    }
  }
  if (step === 'payment') {
    if (data.payment === 'card') {
      const digits = data.cardNumber.replace(/\s/g, '');
      if (digits.length < 15) e.cardNumber = 'Enter a valid card number';
      if (!data.cardName.trim()) e.cardName = 'Required';
      if (!/^\d{2}\s?\/\s?\d{2}$/.test(data.cardExpiry)) e.cardExpiry = 'MM/YY';
      if (!/^\d{3,4}$/.test(data.cardCvc)) e.cardCvc = '3–4 digits';
    }
  }
  return e;
}

function formatCard(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function Checkout() {
  const { lines, subtotal, discount, promo, promoLabel, applyPromo, removePromo, count, clearCart, setQuantity, removeItem } = useCart();
  const { data, update, orderNumber, setOrderNumber } = useCheckout();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('contact');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [step]);

  useEffect(() => {
    if (lines.length === 0 && !orderNumber) navigate('/shop', { replace: true });
  }, [lines.length, orderNumber, navigate]);

  const shippingCost =
    data.fulfilment === 'pickup'
      ? 0
      : SHIPPING_OPTIONS[data.shippingMethod].cost;
  const freeShip = subtotal - discount >= 150;
  const effectiveShipping = freeShip ? 0 : shippingCost;
  const tax = (subtotal - discount) * 0.0825;
  const total = Math.max(0, subtotal - discount + effectiveShipping + tax);

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const next = () => {
    const e = validateStep(step, data);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1].key);
    else placeOrder();
  };

  const placeOrder = () => {
    setPlacing(true);
    window.setTimeout(() => {
      const num = `RYN-${Math.floor(100000 + Math.random() * 899999)}`;
      setOrderNumber(num);
      setPlacing(false);
      clearCart();
      navigate('/order-confirmed');
    }, 1500);
  };

  const field = (
    key: keyof CheckoutData,
    label: string,
    opts: {
      type?: string;
      placeholder?: string;
      autoComplete?: string;
      className?: string;
      inputMode?: 'text' | 'numeric' | 'email' | 'tel';
    } = {},
  ) => {
    const value = String(data[key] ?? '');
    return (
      <div className={opts.className}>
        <label htmlFor={key} className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smoke">
          {label}
        </label>
        <input
          id={key}
          name={key}
          type={opts.type ?? 'text'}
          inputMode={opts.inputMode}
          autoComplete={opts.autoComplete}
          placeholder={opts.placeholder}
          value={value}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-err` : undefined}
          onChange={(e) => {
            update(key, e.target.value as never);
            if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
          }}
          className={cn(
            'mt-1.5 h-11 w-full border bg-transparent px-3 text-[13px] outline-none transition-colors placeholder:text-smoke/50',
            errors[key] ? 'border-berry' : 'border-ink/15 focus:border-ink',
          )}
        />
        {errors[key] && (
          <p id={`${key}-err`} className="mt-1 font-mono text-[8.5px] uppercase tracking-wider text-berry">
            {errors[key]}
          </p>
        )}
      </div>
    );
  };

  const summaryBody = useMemo(
    () => (
      <>
        <ul className="divide-y divide-ink/8">
          {lines.map((l) => (
            <li key={l.key} className="flex gap-3 py-3 first:pt-0">
              <div className="relative h-[78px] w-[62px] shrink-0 overflow-hidden bg-bone">
                <img src={l.image} alt={l.name} className="h-full w-full object-cover object-top" />
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 font-mono text-[8px] text-paper">
                  {l.quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium leading-tight">{l.name}</p>
                <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-smoke">
                  {l.color} · {l.size}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(l.key, l.quantity - 1)}
                    className="grid h-5 w-5 place-items-center border border-ink/15 hover:bg-ink/5"
                  >
                    <Minus width={9} height={9} />
                  </button>
                  <span className="font-mono text-[9px] tabular-nums">{l.quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(l.key, l.quantity + 1)}
                    className="grid h-5 w-5 place-items-center border border-ink/15 hover:bg-ink/5"
                  >
                    <Plus width={9} height={9} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(l.key)}
                    className="ml-1 font-mono text-[8px] uppercase tracking-[0.08em] text-smoke underline underline-offset-2 hover:text-berry"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="shrink-0 text-[12px] tabular-nums">{formatPrice(l.price * l.quantity)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-ink/10 pt-4">
          {promo ? (
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5">
                <Check width={11} height={11} /> {promo} · {promoLabel}
              </span>
              <button
                type="button"
                onClick={() => {
                  removePromo();
                  setPromoMsg(null);
                }}
                className="font-mono text-[8.5px] uppercase underline underline-offset-2 hover:text-berry"
              >
                Remove
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const res = applyPromo(promoInput);
                setPromoMsg({ ok: res.ok, text: res.ok ? res.message : res.message });
                if (res.ok) setPromoInput('');
              }}
              className="flex gap-1.5"
            >
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Gift card or discount code"
                aria-label="Discount code"
                className="h-9 min-w-0 flex-1 border border-ink/15 px-2.5 text-[11px] outline-none placeholder:text-smoke/60 focus:border-ink"
              />
              <button
                type="submit"
                className="h-9 shrink-0 border border-ink/15 px-3 font-mono text-[8.5px] uppercase tracking-[0.1em] hover:bg-ink hover:text-paper"
              >
                Apply
              </button>
            </form>
          )}
          {promoMsg && !promo && (
            <p
              className={cn(
                'mt-1 font-mono text-[8.5px] uppercase tracking-wider',
                promoMsg.ok ? 'text-ink' : 'text-berry',
              )}
            >
              {promoMsg.text}
            </p>
          )}
        </div>

        <dl className="mt-4 space-y-1.5 border-t border-ink/10 pt-4 text-[12px]">
          <div className="flex justify-between">
            <dt className="text-smoke">Subtotal · {count} items</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-berry">
              <dt>Discount</dt>
              <dd className="tabular-nums">−{formatPrice(discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-smoke">
              {data.fulfilment === 'pickup' ? 'Pickup' : SHIPPING_OPTIONS[data.shippingMethod].label + ' shipping'}
            </dt>
            <dd className="tabular-nums">
              {effectiveShipping === 0 ? 'Free' : formatPrice(effectiveShipping)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-smoke">Est. tax</dt>
            <dd className="tabular-nums">{formatPrice(tax)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-ink/10 pt-2.5">
            <dt className="font-display text-[20px] leading-none">Total</dt>
            <dd className="flex items-baseline gap-1.5">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-smoke">USD</span>
              <span className="font-display text-[20px] leading-none tabular-nums">
                {formatPrice(total)}
              </span>
            </dd>
          </div>
        </dl>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lines, subtotal, discount, promo, promoLabel, effectiveShipping, tax, total, count, data.fulfilment, data.shippingMethod, promoMsg],
  );

  if (orderNumber) return null;

  return (
    <div ref={topRef} className="min-h-screen bg-paper">
      {/* checkout header */}
      <div className="border-b border-ink/10 bg-paper/90 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-[24px] leading-none tracking-wide">RYN</span>
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.28em] text-smoke sm:block">
              Secure checkout
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-smoke">
            <Lock width={11} height={11} />
            <span className="font-mono text-[8.5px] uppercase tracking-[0.12em]">
              Encrypted · SSL
            </span>
          </div>
        </div>
      </div>

      {/* steps */}
      <div className="border-b border-ink/10 bg-bone/25">
        <div className="container-x">
          <ol className="flex items-center gap-1 py-3.5 sm:gap-4">
            {STEPS.map((s, i) => {
              const isDone = i < stepIndex;
              const isCurrent = i === stepIndex;
              return (
                <li key={s.key} className="flex flex-1 items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (i < stepIndex) setStep(s.key);
                    }}
                    disabled={i > stepIndex}
                    className={cn(
                      'flex items-center gap-2 whitespace-nowrap',
                      i < stepIndex && 'cursor-pointer',
                      i > stepIndex && 'cursor-default opacity-45',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-6 w-6 shrink-0 place-items-center border font-mono text-[9px] transition-colors',
                        isCurrent && 'border-ink bg-ink text-paper',
                        isDone && 'border-ink bg-ink text-paper',
                        !isCurrent && !isDone && 'border-ink/25 text-ink/50',
                      )}
                    >
                      {isDone ? <Check width={11} height={11} /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-[9px] uppercase tracking-[0.12em]',
                        isCurrent ? 'text-ink' : 'text-smoke',
                      )}
                    >
                      <span className="hidden sm:inline">{s.label}</span>
                      <span className="sm:hidden">{s.short}</span>
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span className="ml-auto hidden h-px flex-1 bg-ink/15 sm:block" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="container-x py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          {/* ------------------------------------------------------- main */}
          <div>
            {/* mobile summary toggle */}
            <div className="mb-6 lg:hidden">
              <button
                type="button"
                onClick={() => setSummaryOpen((v) => !v)}
                className="flex w-full items-center justify-between border border-ink/15 px-4 py-3"
              >
                <span className="font-mono text-[9.5px] uppercase tracking-[0.12em]">
                  {summaryOpen ? 'Hide' : 'Show'} order summary
                </span>
                <span className="font-mono text-[11px] tabular-nums">{formatPrice(total)}</span>
              </button>
              {summaryOpen && <div className="animate-fade-in border border-t-0 border-ink/15 p-4">{summaryBody}</div>}
            </div>

            {/* step panes */}
            {step === 'contact' && (
              <section className="animate-fade-up">
                <div className="flex items-baseline justify-between">
                  <h1 className="display-md">Contact & shipping</h1>
                  <Link
                    to="/shop"
                    className="font-mono text-[9px] uppercase tracking-[0.1em] text-smoke underline underline-offset-4 hover:text-ink"
                  >
                    Return to shop
                  </Link>
                </div>
                <p className="mt-1.5 text-[12.5px] text-smoke">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="underline underline-offset-2 hover:text-ink"
                    onClick={() => update('email', 'maya.rivera@gmail.com')}
                  >
                    Sign in
                  </button>
                </p>

                <div className="mt-6 space-y-4">
                  {field('email', 'Email address', {
                    type: 'email',
                    autoComplete: 'email',
                    placeholder: 'you@email.com',
                    inputMode: 'email',
                  })}

                  <div className="flex flex-col gap-3 border border-ink/15 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-2.5">
                      <Check width={13} height={13} className="mt-0.5 shrink-0 text-ink" />
                      <p className="text-[11.5px] leading-relaxed text-ink/70">
                        Email me with news and offers (10% off your first order)
                      </p>
                    </div>
                    <Toggle checked={data.marketing} onChange={(v) => update('marketing', v)} label="Marketing emails" />
                  </div>

                  {/* fulfilment */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'ship' as const, icon: <Truck width={15} height={15} />, label: 'Ship to me' },
                      { key: 'pickup' as const, icon: <Store width={15} height={15} />, label: 'Store pickup' },
                    ].map((o) => (
                      <button
                        key={o.key}
                        type="button"
                        onClick={() => update('fulfilment', o.key)}
                        className={cn(
                          'flex items-center gap-2.5 border px-3.5 py-3 text-left transition-colors',
                          data.fulfilment === o.key
                            ? 'border-ink bg-ink/[0.03]'
                            : 'border-ink/15 hover:border-ink/40',
                        )}
                      >
                        <span className={cn(data.fulfilment === o.key ? 'text-ink' : 'text-smoke')}>
                          {o.icon}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.1em]">
                          {o.label}
                        </span>
                        {data.fulfilment === o.key && <Check width={12} height={12} className="ml-auto" />}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {field('firstName', 'First name', { autoComplete: 'given-name' })}
                    {field('lastName', 'Last name', { autoComplete: 'family-name' })}
                  </div>

                  {data.fulfilment === 'ship' ? (
                    <>
                      {field('address1', 'Address', {
                        autoComplete: 'address-line1',
                        placeholder: 'Street address',
                      })}
                      {field('address2', 'Apartment, suite (optional)', {
                        autoComplete: 'address-line2',
                        placeholder: 'Apt, suite, unit',
                      })}
                      <div className="grid gap-3 sm:grid-cols-3">
                        {field('city', 'City', { autoComplete: 'address-level2' })}
                        {field('region', 'State', { autoComplete: 'address-level1' })}
                        {field('postal', 'ZIP code', { autoComplete: 'postal-code', inputMode: 'numeric' })}
                      </div>
                      <div>
                        <label htmlFor="country" className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smoke">
                          Country
                        </label>
                        <select
                          id="country"
                          value={data.country}
                          onChange={(e) => update('country', e.target.value)}
                          className="mt-1.5 h-11 w-full border border-ink/15 bg-transparent px-3 text-[13px] outline-none focus:border-ink"
                        >
                          {['United States', 'Canada', 'United Kingdom', 'India', 'Germany', 'France', 'Australia', 'Japan'].map(
                            (c) => (
                              <option key={c}>{c}</option>
                            ),
                          )}
                        </select>
                      </div>
                      {field('phone', 'Phone (for delivery updates)', {
                        type: 'tel',
                        autoComplete: 'tel',
                        placeholder: '+1 555 000 0000',
                        inputMode: 'tel',
                      })}
                    </>
                  ) : (
                    <div className="space-y-2.5">
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smoke">
                        Choose a store
                      </p>
                      {PICKUP_LOCATIONS.map((loc) => (
                        <label
                          key={loc}
                          className={cn(
                            'flex cursor-pointer items-start gap-3 border p-3.5 transition-colors',
                            data.pickupLocation === loc
                              ? 'border-ink bg-ink/[0.03]'
                              : 'border-ink/15 hover:border-ink/40',
                          )}
                        >
                          <span
                            className={cn(
                              'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border',
                              data.pickupLocation === loc ? 'border-ink' : 'border-ink/25',
                            )}
                          >
                            {data.pickupLocation === loc && <span className="h-2 w-2 rounded-full bg-ink" />}
                          </span>
                          <input
                            type="radio"
                            name="pickup"
                            checked={data.pickupLocation === loc}
                            onChange={() => update('pickupLocation', loc)}
                            className="sr-only"
                          />
                          <span>
                            <span className="block text-[12px] font-medium">{loc.split(' — ')[0]}</span>
                            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.06em] text-smoke">
                              {loc.split(' — ')[1]} · Ready in 2 hours
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {step === 'delivery' && (
              <section className="animate-fade-up">
                <h1 className="display-md">Delivery method</h1>
                <p className="mt-1.5 text-[12.5px] text-smoke">
                  {data.fulfilment === 'pickup'
                    ? 'Your order will be ready for collection at the store below.'
                    : 'Shipping to ' +
                      [data.address1, data.city, data.region].filter(Boolean).join(', ')}
                </p>

                <div className="mt-6 space-y-2.5">
                  {data.fulfilment === 'pickup' ? (
                    <div className="flex items-start gap-3 border border-ink bg-ink/[0.03] p-4">
                      <Store width={17} height={17} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[12.5px] font-medium">Free in-store pickup</p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-smoke">
                          {data.pickupLocation}
                        </p>
                        <p className="mt-1.5 text-[11.5px] text-ink/60">
                          Ready within 2 hours · Hold for 5 days · Bring your order confirmation
                        </p>
                      </div>
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-wider">Free</span>
                    </div>
                  ) : (
                    (Object.keys(SHIPPING_OPTIONS) as Array<keyof typeof SHIPPING_OPTIONS>).map((key) => {
                      const opt = SHIPPING_OPTIONS[key];
                      const selected = data.shippingMethod === key;
                      const cost = freeShip ? 0 : opt.cost;
                      return (
                        <label
                          key={key}
                          className={cn(
                            'flex cursor-pointer items-start gap-3 border p-4 transition-colors',
                            selected ? 'border-ink bg-ink/[0.03]' : 'border-ink/15 hover:border-ink/40',
                          )}
                        >
                          <span
                            className={cn(
                              'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border',
                              selected ? 'border-ink' : 'border-ink/25',
                            )}
                          >
                            {selected && <span className="h-2 w-2 rounded-full bg-ink" />}
                          </span>
                          <input
                            type="radio"
                            name="shipping"
                            checked={selected}
                            onChange={() => update('shippingMethod', key)}
                            className="sr-only"
                          />
                          <span className="flex-1">
                            <span className="block text-[12.5px] font-medium">{opt.label} shipping</span>
                            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.06em] text-smoke">
                              {opt.eta}
                            </span>
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wider">
                            {cost === 0 ? 'Free' : formatPrice(cost)}
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>

                {freeShip && data.fulfilment === 'ship' && (
                  <p className="mt-3 flex items-center gap-2 border border-acid-deep/40 bg-acid/15 px-3.5 py-2.5 text-[11.5px]">
                    <Check width={12} height={12} className="shrink-0" />
                    Free express shipping unlocked on this order.
                  </p>
                )}

                <div className="mt-6">
                  <label htmlFor="note" className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smoke">
                    Order note (optional)
                  </label>
                  <textarea
                    id="note"
                    rows={3}
                    value={data.note}
                    onChange={(e) => update('note', e.target.value)}
                    placeholder="Delivery instructions, gift message…"
                    className="mt-1.5 w-full resize-none border border-ink/15 bg-transparent p-3 text-[13px] outline-none transition-colors focus:border-ink"
                  />
                </div>

                <div className="mt-6 border border-ink/10 bg-bone/30 p-4">
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smoke">
                    Shipping to
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed">
                    {data.firstName} {data.lastName}
                    <br />
                    {data.fulfilment === 'pickup' ? data.pickupLocation : (
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
                  <button
                    type="button"
                    onClick={() => setStep('contact')}
                    className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.1em] underline underline-offset-2"
                  >
                    Edit
                  </button>
                </div>
              </section>
            )}

            {step === 'payment' && (
              <section className="animate-fade-up">
                <div className="flex items-baseline justify-between">
                  <h1 className="display-md">Payment</h1>
                  <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-smoke">
                    <Lock width={10} height={10} /> Encrypted
                  </span>
                </div>
                <p className="mt-1.5 text-[12.5px] text-smoke">
                  All transactions are secure and encrypted. This is a demo — no real charge is made.
                </p>

                <div className="mt-6 space-y-2">
                  {[
                    { key: 'card' as const, label: 'Credit / debit card', note: 'Visa, Mastercard, Amex' },
                    { key: 'apple' as const, label: 'Apple Pay', note: 'One-tap checkout' },
                    { key: 'klarna' as const, label: 'Klarna', note: 'Pay in 4 · 0% interest' },
                    { key: 'paypal' as const, label: 'PayPal', note: 'Redirects to PayPal' },
                  ].map((m) => {
                    const selected = data.payment === m.key;
                    return (
                      <div key={m.key}>
                        <label
                          className={cn(
                            'flex cursor-pointer items-center gap-3 border p-3.5 transition-colors',
                            selected ? 'border-ink bg-ink/[0.03]' : 'border-ink/15 hover:border-ink/40',
                          )}
                        >
                          <span
                            className={cn(
                              'grid h-4 w-4 shrink-0 place-items-center rounded-full border',
                              selected ? 'border-ink' : 'border-ink/25',
                            )}
                          >
                            {selected && <span className="h-2 w-2 rounded-full bg-ink" />}
                          </span>
                          <input
                            type="radio"
                            name="payment"
                            checked={selected}
                            onChange={() => update('payment', m.key)}
                            className="sr-only"
                          />
                          <span className="flex flex-1 items-center gap-2.5">
                            {m.key === 'card' ? (
                              <CreditCard width={16} height={16} className="text-ink/60" />
                            ) : null}
                            <span>
                              <span className="block text-[12.5px] font-medium">{m.label}</span>
                              <span className="mt-0.5 block font-mono text-[8.5px] uppercase tracking-[0.06em] text-smoke">
                                {m.note}
                              </span>
                            </span>
                          </span>
                        </label>

                        {selected && m.key === 'card' && (
                          <div className="animate-fade-in space-y-3 border border-t-0 border-ink/15 bg-bone/20 p-4">
                            <div>
                              <label htmlFor="cardNumber" className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smoke">
                                Card number
                              </label>
                              <div className="relative">
                                <input
                                  id="cardNumber"
                                  value={data.cardNumber}
                                  onChange={(e) => {
                                    update('cardNumber', formatCard(e.target.value));
                                    if (errors.cardNumber) setErrors((p) => ({ ...p, cardNumber: '' }));
                                  }}
                                  inputMode="numeric"
                                  autoComplete="cc-number"
                                  placeholder="4242 4242 4242 4242"
                                  aria-invalid={!!errors.cardNumber}
                                  className={cn(
                                    'mt-1.5 h-11 w-full border bg-transparent px-3 pr-16 text-[13px] tabular-nums outline-none transition-colors',
                                    errors.cardNumber ? 'border-berry' : 'border-ink/15 focus:border-ink',
                                  )}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[8.5px] uppercase tracking-[0.1em] text-smoke">
                                  {data.cardNumber.startsWith('4')
                                    ? 'VISA'
                                    : data.cardNumber.startsWith('5')
                                      ? 'MC'
                                      : 'CARD'}
                                </span>
                              </div>
                              {errors.cardNumber && (
                                <p className="mt-1 font-mono text-[8.5px] uppercase text-berry">{errors.cardNumber}</p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="cardName" className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smoke">
                                Name on card
                              </label>
                              <input
                                id="cardName"
                                value={data.cardName}
                                onChange={(e) => update('cardName', e.target.value)}
                                autoComplete="cc-name"
                                aria-invalid={!!errors.cardName}
                                className={cn(
                                  'mt-1.5 h-11 w-full border bg-transparent px-3 text-[13px] outline-none transition-colors',
                                  errors.cardName ? 'border-berry' : 'border-ink/15 focus:border-ink',
                                )}
                              />
                              {errors.cardName && (
                                <p className="mt-1 font-mono text-[8.5px] uppercase text-berry">{errors.cardName}</p>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label htmlFor="cardExpiry" className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smoke">
                                  Expiry
                                </label>
                                <input
                                  id="cardExpiry"
                                  value={data.cardExpiry}
                                  onChange={(e) => update('cardExpiry', formatExpiry(e.target.value))}
                                  inputMode="numeric"
                                  autoComplete="cc-exp"
                                  placeholder="MM/YY"
                                  aria-invalid={!!errors.cardExpiry}
                                  className={cn(
                                    'mt-1.5 h-11 w-full border bg-transparent px-3 text-[13px] tabular-nums outline-none transition-colors',
                                    errors.cardExpiry ? 'border-berry' : 'border-ink/15 focus:border-ink',
                                  )}
                                />
                                {errors.cardExpiry && (
                                  <p className="mt-1 font-mono text-[8.5px] uppercase text-berry">{errors.cardExpiry}</p>
                                )}
                              </div>
                              <div>
                                <label htmlFor="cardCvc" className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smoke">
                                  CVC
                                </label>
                                <input
                                  id="cardCvc"
                                  value={data.cardCvc}
                                  onChange={(e) => update('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                                  inputMode="numeric"
                                  autoComplete="cc-csc"
                                  placeholder="123"
                                  aria-invalid={!!errors.cardCvc}
                                  className={cn(
                                    'mt-1.5 h-11 w-full border bg-transparent px-3 text-[13px] tabular-nums outline-none transition-colors',
                                    errors.cardCvc ? 'border-berry' : 'border-ink/15 focus:border-ink',
                                  )}
                                />
                                {errors.cardCvc && (
                                  <p className="mt-1 font-mono text-[8.5px] uppercase text-berry">{errors.cardCvc}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-start gap-2.5 border border-ink/10 bg-bone/30 p-3.5">
                  <Info width={13} height={13} className="mt-0.5 shrink-0 text-ink/50" />
                  <p className="text-[11px] leading-relaxed text-ink/60">
                    This is a portfolio demo. Use any test details — no payment will be processed and
                    no data leaves your browser.
                  </p>
                </div>
              </section>
            )}

            {/* nav buttons */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink/10 pt-6">
              {stepIndex === 0 ? (
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-smoke transition-colors hover:text-ink"
                >
                  <ArrowLeft width={12} height={12} /> Back to shop
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(STEPS[stepIndex - 1].key)}
                  className="inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-smoke transition-colors hover:text-ink"
                >
                  <ArrowLeft width={12} height={12} /> Back
                </button>
              )}

              <Button
                onClick={next}
                size="lg"
                disabled={placing}
                icon={placing ? undefined : <ArrowRight width={15} height={15} />}
              >
                {placing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border border-paper/40 border-t-paper" />
                    Placing order…
                  </span>
                ) : step === 'payment' ? (
                  `Pay ${formatPrice(total)}`
                ) : (
                  'Continue'
                )}
              </Button>
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.12em] text-smoke">
              <Lock width={9} height={9} /> 256-bit SSL · PCI-DSS compliant · No card data stored
            </p>
          </div>

          {/* ------------------------------------------------------ summary */}
          <aside className="hidden lg:block">
            <div className="sticky top-[88px]">
              <div className="border border-ink/10 bg-bone/25 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-mono text-[9.5px] uppercase tracking-[0.14em]">
                    Order summary
                  </h2>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-smoke">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </div>
                {summaryBody}
              </div>

              <ul className="mt-4 space-y-2 px-1">
                {[
                  { icon: <Return width={12} height={12} />, text: 'Free 30-day returns on everything' },
                  { icon: <Truck width={12} height={12} />, text: 'Carbon-neutral delivery' },
                  { icon: <Lock width={12} height={12} />, text: 'Secure checkout, no data stored' },
                ].map((p) => (
                  <li key={p.text} className="flex items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.08em] text-smoke">
                    <span className="text-ink/40">{p.icon}</span>
                    {p.text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-5 w-9 shrink-0 rounded-full border transition-colors',
        checked ? 'border-ink bg-ink' : 'border-ink/25 bg-transparent',
      )}
    >
      <span
        className={cn(
          'absolute top-[3px] h-3 w-3 rounded-full transition-all duration-300',
          checked ? 'left-[19px] bg-paper' : 'left-[3px] bg-ink/40',
        )}
      />
    </button>
  );
}
