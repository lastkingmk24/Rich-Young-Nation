import { allColors, formatPrice } from '@/data/catalog';
import { Close } from '@/components/ui/Icons';

interface Props {
  categories: string[];
  colors: string[];
  sizes: string[];
  onSaleOnly: boolean;
  inStockOnly: boolean;
  maxPrice: number;
  query: string;
  maxPriceLimit: number;
  toggleInList: (key: string, value: string) => void;
  setParam: (key: string, value: string | null) => void;
  clearAll: () => void;
}

export function ActiveFilters({
  categories,
  colors,
  sizes,
  onSaleOnly,
  inStockOnly,
  maxPrice,
  query,
  maxPriceLimit,
  toggleInList,
  setParam,
  clearAll,
}: Props) {
  const chips: { label: string; onRemove: () => void; swatch?: string }[] = [
    ...categories.map((c) => ({
      label: c,
      onRemove: () => toggleInList('category', c),
    })),
    ...colors.map((c) => ({
      label: c,
      swatch: allColors.find((x) => x.name === c)?.hex,
      onRemove: () => toggleInList('color', c),
    })),
    ...sizes.map((s) => ({ label: `Size ${s}`, onRemove: () => toggleInList('size', s) })),
    ...(onSaleOnly ? [{ label: 'On sale', onRemove: () => setParam('sale', null) }] : []),
    ...(inStockOnly ? [{ label: 'In stock', onRemove: () => setParam('stock', null) }] : []),
    ...(maxPrice < maxPriceLimit
      ? [
          {
            label: `Under ${formatPrice(maxPrice)}`,
            onRemove: () => setParam('max', null),
          },
        ]
      : []),
    ...(query ? [{ label: `“${query}”`, onRemove: () => setParam('q', null) }] : []),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-1.5">
      {chips.map((c) => (
        <button
          key={c.label}
          type="button"
          onClick={c.onRemove}
          className="inline-flex items-center gap-1.5 border border-ink/20 bg-paper px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          {c.swatch && (
            <span
              className="h-2.5 w-2.5 rounded-full border border-ink/20"
              style={{ backgroundColor: c.swatch }}
            />
          )}
          {c.label}
          <Close width={9} height={9} />
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="ml-1 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke underline underline-offset-2 transition-colors hover:text-ink"
      >
        Clear all
      </button>
    </div>
  );
}
