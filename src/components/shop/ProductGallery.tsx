import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/useReveal';
import { ArrowLeft, ArrowRight, Close, Plus } from '@/components/ui/Icons';

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const prevImages = useRef(images);
  useScrollLock(lightbox);

  // reset when colourway changes
  useEffect(() => {
    if (prevImages.current !== images) {
      setActive(0);
      prevImages.current = images;
    }
  }, [images]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox, images.length]);

  return (
    <div className="lg:sticky lg:top-[88px]">
      <div className="flex flex-col-reverse gap-3 md:flex-row">
        {/* thumbs */}
        <div className="flex gap-2.5 overflow-x-auto md:w-[76px] md:shrink-0 md:flex-col md:overflow-visible">
          {images.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                'relative aspect-[4/5] w-[62px] shrink-0 overflow-hidden bg-bone transition-all duration-300 md:w-full',
                i === active ? 'ring-1 ring-ink ring-offset-2 ring-offset-paper' : 'opacity-65 hover:opacity-100',
              )}
            >
              <img
                src={img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </button>
          ))}
        </div>

        {/* main */}
        <div className="relative min-w-0 flex-1">
          <div
            className="group relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-bone"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setOrigin({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              });
            }}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
            onClick={() => setLightbox(true)}
          >
            {images.map((img, i) => (
              <img
                key={`${img}-main-${i}`}
                src={img}
                alt={`${alt} — view ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                className={cn(
                  'absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ease-[var(--ease-luxe)]',
                  i === active ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
                style={
                  i === active && zoomed
                    ? {
                        transform: 'scale(1.75)',
                        transformOrigin: `${origin.x}% ${origin.y}%`,
                        transitionDuration: '180ms',
                      }
                    : undefined
                }
              />
            ))}

            <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 bg-paper/85 px-2.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] backdrop-blur-sm">
              <Plus width={10} height={10} /> Zoom
            </span>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((i) => (i - 1 + images.length) % images.length);
                  }}
                  aria-label="Previous image"
                  className="absolute left-2.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-paper/85 opacity-100 backdrop-blur-sm transition-all duration-300 hover:bg-paper md:opacity-0 md:group-hover:opacity-100"
                >
                  <ArrowLeft width={15} height={15} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((i) => (i + 1) % images.length);
                  }}
                  aria-label="Next image"
                  className="absolute right-2.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-paper/85 opacity-100 backdrop-blur-sm transition-all duration-300 hover:bg-paper md:opacity-0 md:group-hover:opacity-100"
                >
                  <ArrowRight width={15} height={15} />
                </button>
              </>
            )}
          </div>

          <div className="mt-2.5 flex items-center justify-between md:hidden">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-smoke">
              {active + 1} / {images.length}
            </p>
            <div className="flex items-center gap-0.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === active}
                  className="grid h-7 place-items-center px-1"
                >
                  <span
                    className={cn(
                      'block h-1 rounded-full transition-all duration-300',
                      i === active ? 'w-5 bg-ink' : 'w-1.5 bg-ink/25',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[85] flex flex-col bg-ink/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 text-paper">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60">
              {alt} · {active + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close gallery"
              className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 transition-colors hover:bg-paper hover:text-ink"
            >
              <Close width={18} height={18} />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 pb-6">
            <img
              src={images[active]}
              alt={`${alt} — enlarged view`}
              className="max-h-full max-w-full animate-scale-in object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink md:left-8"
                >
                  <ArrowLeft width={18} height={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setActive((i) => (i + 1) % images.length)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink md:right-8"
                >
                  <ArrowRight width={18} height={18} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
