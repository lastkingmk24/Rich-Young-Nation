export function cn(...classes: Array<string | number | false | null | undefined>): string {
  return classes.filter((c) => typeof c === 'string' && c.length > 0).join(' ');
}

export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export const uid = (prefix = 'id') =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const pluralize = (n: number, singular: string, plural?: string) =>
  n === 1 ? singular : plural ?? `${singular}s`;

/** Simple, accessible focus trap helper for dialogs. */
export function trapFocus(container: HTMLElement) {
  const selector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const nodes = Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.offsetParent !== null,
  );
  if (!nodes.length) return () => {};
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const handler = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  container.addEventListener('keydown', handler);
  return () => container.removeEventListener('keydown', handler);
}
