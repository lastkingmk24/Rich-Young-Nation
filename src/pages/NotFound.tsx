import { Link } from 'react-router-dom';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/Icons';

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[72vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">Error 404</p>
      <h1 className="display-xl mt-4 text-[clamp(4rem,16vw,10rem)] leading-[0.8]">Lost.</h1>
      <p className="mt-5 max-w-[40ch] text-[13.5px] leading-relaxed text-smoke">
        That page has moved on — like every good drop. Let&apos;s get you back to the pieces that are
        actually here.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink to="/shop" icon={<ArrowRight width={14} height={14} />}>
          Shop the collection
        </ButtonLink>
        <Link
          to="/"
          className="border border-ink/20 px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:border-ink"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
