import { useId, useState } from 'react';
import { allCategories, allColors, allSizes, formatPrice } from '@/data/catalog';
import { cn } from '@/lib/utils';
import { ChevronDown, Minus, Plus } from '@/components/ui/Icons';

export interface FilterPanelProps {
  categories: string[];
  colors: string[];
  sizes: string[];
  onSaleOnly: boolean;
  inStockOnly: boolean;
  maxPrice: number;
  toggleInList: (key: string, value: string) => void;
  setParam: (key: string, value: string | null) => void;
  clearAll: () => void;
  compact?: boolean;
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-ink/10 py-4 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.16em]">{title}</span>
        <ChevronDown
          width={13}
          height={13}
          className={cn('text-smoke transition-transform duration-300', open && 'rotate-180')}
        />
      </button>
      <div
        id={id}
        className={cn(
          'grid transition-all duration-400 ease-[var(--ease-luxe)]',
          open ? 'mt-3.5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function FilterPanel({
  categories,
  colors,
  sizes,
  onSaleOnly,
  inStockOnly,
  maxPrice,
  toggleInList,
  setParam,
  clearAll,
  compact,
}: FilterPanelProps) {
  const activeTotal =
    categories.length + colors.length + sizes.length + (onSaleOnly ? 1 : 0) + (inStockOnly ? 1 : 0);

  return (
    <div className={cn(!compact && 'border-t border-ink/10 pt-4')}>
      <div className="mb-2 flex items-center justify-between">
        <span className="eyebrow text-smoke">Refine</span>
        {activeTotal > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="font-mono text-[9px] uppercase tracking-[0.12em] text-smoke underline underline-offset-2 hover:text-ink"
          >
            Clear ({activeTotal})
          </button>
        )}
      </div>

      <Section title="Category">
        <ul className="space-y-1.5">
          {allCategories.map((c) => {
            const checked = categories.includes(c);
            return (
              <li key={c}>
                <label className="group flex cursor-pointer items-center gap-2.5 py-0.5">
                  <span
                    className={cn(
                      'grid h-[15px] w-[15px] shrink-0 place-items-center border transition-all duration-200',
                      checked ? 'border-ink bg-ink text-paper' : 'border-ink/25 group-hover:border-ink/60',
                    )}
                  >
                    {checked && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                        <path d="m4.8 12.4 4.6 4.6L19.2 7.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleInList('category', c)}
                    className="sr-only"
                  />
                  <span className="text-[12.5px] text-ink/80 transition-colors group-hover:text-ink">
                    {c}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="Colour">
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => {
            const checked = colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleInList('color', c.name)}
                aria-pressed={checked}
                title={c.name}
                className={cn(
                  'group relative grid h-7 w-7 place-items-center rounded-full border transition-all duration-300',
                  checked
                    ? 'border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper'
                    : 'border-ink/15 hover:border-ink/50',
                )}
              >
                <span
                  className="h-[19px] w-[19px] rounded-full"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="sr-only">{c.name}</span>
              </button>
            );
          })}
        </div>
        {colors.length > 0 && (
          <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke">
            {colors.join(' · ')}
          </p>
        )}
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map((s) => {
            const checked = sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleInList('size', s)}
                aria-pressed={checked}
                className={cn(
                  'min-w-[38px] border px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-200',
                  checked
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/20 text-ink/75 hover:border-ink/60 hover:text-ink',
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Price">
        <div className="px-0.5">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] tabular-nums text-smoke">
            <span>$0</span>
            <span className="text-ink">{formatPrice(maxPrice)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={250}
            step={5}
            value={maxPrice}
            onChange={(e) => {
              const v = Number(e.target.value);
              setParam('max', v >= 250 ? null : String(v));
            }}
            aria-label="Maximum price"
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-ink/15 accent-ink [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-paper"
          />
        </div>
      </Section>

      <Section title="Availability">
        <div className="space-y-2">
          <label className="group flex cursor-pointer items-center gap-2.5">
            <span
              className={cn(
                'grid h-[15px] w-[15px] place-items-center border transition-all duration-200',
                onSaleOnly ? 'border-ink bg-ink text-paper' : 'border-ink/25',
              )}
            >
              {onSaleOnly && (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                  <path d="m4.8 12.4 4.6 4.6L19.2 7.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={onSaleOnly}
              onChange={() => setParam('sale', onSaleOnly ? null : '1')}
              className="sr-only"
            />
            <span className="text-[12.5px] text-ink/80">On sale only</span>
          </label>
          <label className="group flex cursor-pointer items-center gap-2.5">
            <span
              className={cn(
                'grid h-[15px] w-[15px] place-items-center border transition-all duration-200',
                inStockOnly ? 'border-ink bg-ink text-paper' : 'border-ink/25',
              )}
            >
              {inStockOnly && (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                  <path d="m4.8 12.4 4.6 4.6L19.2 7.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setParam('stock', inStockOnly ? null : '1')}
              className="sr-only"
            />
            <span className="text-[12.5px] text-ink/80">In stock only</span>
          </label>
        </div>
      </Section>

      <div className="pt-4">
        <div className="border border-ink/10 bg-bone/40 p-3.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-smoke">Need a hand?</p>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink/70">
            Every piece has a detailed size guide on its page. Still unsure? Email us — we answer in
            under 2 hours.
          </p>
        </div>
      </div>

      <span className="sr-only">
        <Minus /> <Plus />
      </span>
    </div>
  );
}
