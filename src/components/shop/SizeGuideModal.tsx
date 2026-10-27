import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/useReveal';
import { Close } from '@/components/ui/Icons';

const TOPS = [
  { size: 'XS', chest: '32–34', length: '26', shoulder: '19.5', sleeve: '23' },
  { size: 'S', chest: '35–37', length: '27', shoulder: '20.5', sleeve: '23.5' },
  { size: 'M', chest: '38–40', length: '28', shoulder: '21.5', sleeve: '24' },
  { size: 'L', chest: '41–43', length: '29', shoulder: '22.5', sleeve: '24.5' },
  { size: 'XL', chest: '44–46', length: '30', shoulder: '23.5', sleeve: '25' },
  { size: 'XXL', chest: '47–49', length: '31', shoulder: '24.5', sleeve: '25.5' },
];

const BOTTOMS = [
  { size: '26', waist: '26–27', hip: '36', inseam: '32' },
  { size: '28', waist: '28–29', hip: '38', inseam: '32' },
  { size: '30', waist: '30–31', hip: '40', inseam: '32' },
  { size: '32', waist: '32–33', hip: '42', inseam: '32' },
  { size: '34', waist: '34–35', hip: '44', inseam: '32' },
  { size: '36', waist: '36–37', hip: '46', inseam: '32' },
];

export function SizeGuideModal({
  open,
  onClose,
  category,
}: {
  open: boolean;
  onClose: () => void;
  category: string;
}) {
  const isBottom = ['Denim', 'Trousers'].includes(category);
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const rows = isBottom ? BOTTOMS : TOPS;
  const cols = isBottom
    ? [
        { key: 'size', label: 'Size' },
        { key: 'waist', label: 'Waist' },
        { key: 'hip', label: 'Hip' },
        { key: 'inseam', label: 'Inseam' },
      ]
    : [
        { key: 'size', label: 'Size' },
        { key: 'chest', label: 'Chest' },
        { key: 'length', label: 'Body length' },
        { key: 'shoulder', label: 'Shoulder' },
        { key: 'sleeve', label: 'Sleeve' },
      ];

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close size guide"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink/50 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
        className="relative max-h-[88vh] w-full animate-fade-up overflow-y-auto bg-paper p-5 sm:max-w-[620px] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-smoke">Fit</p>
            <h2 className="display-md mt-2 text-[26px]">Size guide</h2>
            <p className="mt-1.5 text-[12px] text-smoke">
              Measurements in {unit === 'in' ? 'inches' : 'centimetres'} — garment flat lay.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper"
          >
            <Close width={16} height={16} />
          </button>
        </div>

        <div className="mt-4 inline-flex border border-ink/15">
          {(['in', 'cm'] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={cn(
                'px-4 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors',
                unit === u ? 'bg-ink text-paper' : 'text-ink/60 hover:text-ink',
              )}
            >
              {u}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/15">
                {cols.map((c) => (
                  <th
                    key={c.key}
                    className="py-2 pr-3 font-mono text-[8.5px] uppercase tracking-[0.12em] text-smoke last:pr-0"
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.size} className="border-b border-ink/8 transition-colors hover:bg-bone/50">
                  {cols.map((c) => (
                    <td key={c.key} className="py-2.5 pr-3 text-[12px] tabular-nums last:pr-0">
                      {c.key === 'size' ? (
                        <span className="font-medium">{r.size}</span>
                      ) : unit === 'in' ? (
                        String((r as Record<string, string>)[c.key])
                      ) : (
                        Math.round(Number((r as Record<string, string>)[c.key]) * 2.54)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 space-y-2.5 border-t border-ink/10 pt-4">
          <p className="text-[11.5px] leading-relaxed text-ink/65">
            <strong className="font-medium">Between sizes?</strong>{' '}
            {isBottom
              ? 'Our denim is rigid — size down for a closer fit, take your usual size for the intended baggy drape.'
              : 'Our tops are cut oversized. Size down for a regular fit, or stay true to size for the boxy silhouette.'}
          </p>
          <p className="text-[11.5px] leading-relaxed text-ink/65">
            <strong className="font-medium">Still unsure?</strong> Email{' '}
            <a href="mailto:fit@richyoungnation.com" className="underline underline-offset-2">
              fit@richyoungnation.com
            </a>{' '}
            with your height and usual size — we reply in under 2 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
