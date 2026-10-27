import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { Accordion } from '@/components/shop/Accordion';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/StoreContext';
import { Check, Globe, Lock, Return, Truck } from '@/components/ui/Icons';

const SECTIONS = [
  {
    id: 'shipping',
    title: 'Shipping',
    items: [
      {
        q: 'How much is shipping?',
        a: 'Express shipping is free on all orders over $150. Below that it is a flat $9. We ship worldwide from New York; international rates are calculated at checkout.',
      },
      {
        q: 'How fast will my order arrive?',
        a: 'Orders placed before 2pm ET ship the same business day. Standard delivery is 4–6 business days and express is 1–2. You will receive a tracking link by email the moment your parcel leaves the studio.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes — we ship to over 60 countries. Duties and taxes are calculated at checkout so there is nothing to pay on delivery.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & exchanges',
    items: [
      {
        q: 'What is your return policy?',
        a: '30 days from delivery, no questions asked. Items must be unworn with tags attached. Return shipping is free within the US and $12 for international orders.',
      },
      {
        q: 'Can I exchange for a different size?',
        a: 'Yes. Denim and fleece exchanges are always free. Start an exchange from your order confirmation email and we will reserve your new size while the return is in transit.',
      },
      {
        q: 'Are limited pieces returnable?',
        a: 'Numbered limited releases are final sale. Everything else follows the standard 30-day policy.',
      },
    ],
  },
  {
    id: 'sizing',
    title: 'Sizing',
    items: [
      {
        q: 'Do the pieces run big?',
        a: 'Our tops are intentionally oversized and boxy. If you want a regular fit, size down one. Denim is rigid and true to size — it relaxes about half a size with wear.',
      },
      {
        q: 'Where are the measurements?',
        a: 'Every product page has a size guide with flat-lay measurements in inches and centimetres, plus a note from the model about what size they are wearing.',
      },
      {
        q: 'What if I am between sizes?',
        a: 'Email fit@richyoungnation.com with your height, weight and usual size and we will tell you exactly which to take. We answer in under two hours.',
      },
    ],
  },
  {
    id: 'tracking',
    title: 'Tracking your order',
    items: [
      {
        q: 'Where is my tracking number?',
        a: 'It is emailed to you as soon as your label is generated. Check your spam folder first — our emails occasionally land there.',
      },
      {
        q: 'My tracking has not updated.',
        a: 'Carriers can take up to 48 hours to scan a parcel. If there is still no movement after three business days, email orders@richyoungnation.com and we will investigate or reship.',
      },
    ],
  },
];

export default function Help() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const { toast } = useStore();
  useReveal([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.trim().length < 10) {
      toast({
        title: 'Almost there',
        description: 'Add a valid email and a message of at least 10 characters.',
        variant: 'error',
      });
      return;
    }
    setSent(true);
    toast({ title: 'Message sent', description: 'We reply in under 2 hours.', variant: 'success' });
  };

  return (
    <div>
      <section className="border-b border-ink/10 bg-bone/30">
        <div className="container-x py-12 md:py-16">
          <p className="eyebrow text-smoke">Help centre</p>
          <h1 className="display-lg mt-3">We&apos;ve got you.</h1>
          <p className="mt-3 max-w-[50ch] text-[13px] leading-relaxed text-smoke">
            Fast answers on shipping, returns, sizing and tracking. Still stuck? Our team replies in
            under two hours, seven days a week.
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: <Truck width={14} height={14} />, text: 'Free express over $150' },
              { icon: <Return width={14} height={14} />, text: '30-day free returns' },
              { icon: <Globe width={14} height={14} />, text: 'Ships to 60+ countries' },
              { icon: <Lock width={14} height={14} />, text: 'Secure checkout' },
            ].map((p) => (
              <li key={p.text} className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke">
                {p.icon} {p.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-x py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="display-md text-[26px]">{s.title}</h2>
                <div className="mt-4">
                  <Accordion
                    items={s.items.map((i) => ({ title: i.q, content: <p>{i.a}</p> }))}
                    defaultOpen={0}
                  />
                </div>
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" id="contact">
            <div className="border border-ink/10 bg-bone/25 p-5">
              <h2 className="font-mono text-[9.5px] uppercase tracking-[0.14em]">Contact us</h2>
              {sent ? (
                <div className="mt-4 flex items-start gap-2.5">
                  <Check width={16} height={16} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[13px] font-medium">Message received.</p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-ink/60">
                      We&apos;ll reply to {email} within two hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-3 space-y-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    aria-label="Your email"
                    className="h-11 w-full border border-ink/15 bg-transparent px-3 text-[12.5px] outline-none focus:border-ink"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="How can we help?"
                    aria-label="Message"
                    className="w-full resize-none border border-ink/15 bg-transparent p-3 text-[12.5px] outline-none focus:border-ink"
                  />
                  <Button type="submit" fullWidth size="md">
                    Send message
                  </Button>
                </form>
              )}
              <div className="mt-4 space-y-1.5 border-t border-ink/10 pt-3.5 font-mono text-[9px] uppercase tracking-[0.08em] text-smoke">
                <p>hello@richyoungnation.com</p>
                <p>Mon–Sun · 9am–7pm ET</p>
                <p>+1 (212) 555-0148</p>
              </div>
            </div>

            <div className="mt-4 border border-ink/10 p-5">
              <h2 className="font-mono text-[9.5px] uppercase tracking-[0.14em]">Visit the studio</h2>
              <p className="mt-3 text-[12px] leading-relaxed text-ink/70">
                RYN SoHo
                <br />
                112 Greene St, New York, NY 10012
                <br />
                <span className="text-smoke">Mon–Sat, 11am–7pm · Sun, 12–6pm</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
