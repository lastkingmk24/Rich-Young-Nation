import { useStore } from '@/store/StoreContext';
import { cn } from '@/lib/utils';
import { Check, Close, Info } from './Icons';

export function Toaster() {
  const { toasts, dismissToast } = useStore();

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-4 left-1/2 z-[90] flex w-full max-w-[380px] -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto flex animate-fade-up items-start gap-3 border px-4 py-3 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md',
            t.variant === 'error'
              ? 'border-berry/30 bg-berry text-paper'
              : 'border-paper/20 bg-ink/95 text-paper',
          )}
        >
          <span
            className={cn(
              'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full',
              t.variant === 'success' ? 'bg-acid text-ink' : 'bg-paper/15 text-paper',
            )}
          >
            {t.variant === 'success' ? (
              <Check width={11} height={11} />
            ) : (
              <Info width={11} height={11} />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-medium leading-tight">{t.title}</p>
            {t.description && (
              <p className="mt-1 text-[11px] leading-snug text-paper/60">{t.description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss notification"
            className="-mr-1 -mt-0.5 grid h-6 w-6 shrink-0 place-items-center text-paper/40 transition-colors hover:text-paper"
          >
            <Close width={12} height={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
