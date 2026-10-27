import { useId, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Minus, Plus } from '@/components/ui/Icons';

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { title: string; content: ReactNode }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                  {item.title}
                </span>
                <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                  {isOpen ? <Minus width={14} height={14} /> : <Plus width={14} height={14} />}
                </span>
              </button>
            </h3>
            <div
              id={`${baseId}-panel-${i}`}
              className={cn(
                'grid transition-all duration-500 ease-[var(--ease-luxe)]',
                isOpen ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className="text-[12.5px] leading-relaxed text-ink/70">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
