import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, Product } from '@/types';

const STORAGE_KEY = 'ryn.cart.v1';

interface CartState {
  lines: CartLine[];
  promo: string | null;
}

type CartAction =
  | { type: 'ADD'; line: CartLine }
  | { type: 'REMOVE'; key: string }
  | { type: 'SET_QTY'; key: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'APPLY_PROMO'; promo: string | null }
  | { type: 'HYDRATE'; state: CartState };

const PROMOS: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
  RYN10: { type: 'percent', value: 10, label: '10% off your order' },
  GENZ15: { type: 'percent', value: 15, label: '15% off — student code' },
  FREESHIP: { type: 'fixed', value: 0, label: 'Free express shipping' },
};

export const PROMO_CODES = PROMOS;

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.lines.find((l) => l.key === action.line.key);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.key === action.line.key
              ? {
                  ...l,
                  quantity: Math.min(l.maxQuantity, l.quantity + action.line.quantity),
                }
              : l,
          ),
        };
      }
      return { ...state, lines: [...state.lines, action.line] };
    }
    case 'REMOVE':
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
    case 'SET_QTY':
      return {
        ...state,
        lines: state.lines
          .map((l) =>
            l.key === action.key
              ? { ...l, quantity: Math.max(0, Math.min(l.maxQuantity, action.quantity)) }
              : l,
          )
          .filter((l) => l.quantity > 0),
      };
    case 'CLEAR':
      return { ...state, lines: [], promo: null };
    case 'APPLY_PROMO':
      return { ...state, promo: action.promo };
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

const initialState: CartState = { lines: [], promo: null };

function loadInitial(): CartState {
  if (typeof window === 'undefined') return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<CartState>;
    if (!Array.isArray(parsed.lines)) return initialState;
    const lines = parsed.lines.filter(
      (l): l is CartLine =>
        !!l &&
        typeof l.key === 'string' &&
        typeof l.price === 'number' &&
        typeof l.quantity === 'number' &&
        l.quantity > 0,
    );
    return { lines, promo: typeof parsed.promo === 'string' ? parsed.promo : null };
  } catch {
    return initialState;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  savings: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promo: string | null;
  promoLabel: string | null;
  freeShippingRemaining: number;
  isEmpty: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, opts: { color: string; size: string; quantity?: number }) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => { ok: boolean; message: string };
  removePromo: () => void;
  justAdded: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

const TAX_RATE = 0.0825;
const FREE_SHIPPING = 150;
const SHIPPING_FLAT = 9;

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  // persist
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable in private mode */
    }
  }, [state]);

  // sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue) as CartState;
        if (Array.isArray(parsed.lines)) dispatch({ type: 'HYDRATE', state: parsed });
      } catch {
        /* ignore */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // lock body scroll when drawer open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const addItem = useCallback<CartContextValue['addItem']>((product, opts) => {
    const color = product.colors.find((c) => c.name === opts.color) ?? product.colors[0];
    const sizeObj = product.sizes.find((s) => s.label === opts.size);
    const key = `${product.id}::${color.name}::${opts.size}`;
    dispatch({
      type: 'ADD',
      line: {
        key,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        compareAt: product.compareAt,
        image: color.images[0],
        color: color.name,
        size: opts.size,
        quantity: opts.quantity ?? 1,
        maxQuantity: Math.max(1, Math.min(10, sizeObj?.inStock ? product.stock : 1)),
      },
    });
    setJustAdded(key);
    setIsOpen(true);
    window.setTimeout(() => setJustAdded(null), 2600);
  }, []);

  const removeItem = useCallback((key: string) => dispatch({ type: 'REMOVE', key }), []);
  const setQuantity = useCallback(
    (key: string, quantity: number) => dispatch({ type: 'SET_QTY', key, quantity }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return { ok: false, message: 'Enter a code first.' };
    if (!PROMOS[normalized]) return { ok: false, message: 'That code is not valid.' };
    dispatch({ type: 'APPLY_PROMO', promo: normalized });
    return { ok: true, message: PROMOS[normalized].label };
  }, []);

  const removePromo = useCallback(() => dispatch({ type: 'APPLY_PROMO', promo: null }), []);

  const totals = useMemo(() => {
    const subtotal = state.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    const savings = state.lines.reduce(
      (sum, l) => sum + (l.compareAt ? (l.compareAt - l.price) * l.quantity : 0),
      0,
    );
    const count = state.lines.reduce((sum, l) => sum + l.quantity, 0);

    let discount = 0;
    const promo = state.promo ? PROMOS[state.promo] : null;
    if (promo?.type === 'percent') discount = (subtotal * promo.value) / 100;

    const afterDiscount = Math.max(0, subtotal - discount);
    const shipping =
      state.lines.length === 0 || afterDiscount >= FREE_SHIPPING || state.promo === 'FREESHIP'
        ? 0
        : SHIPPING_FLAT;
    const tax = afterDiscount * TAX_RATE;

    return {
      subtotal,
      savings,
      count,
      discount,
      shipping,
      tax,
      total: afterDiscount + shipping + tax,
      freeShippingRemaining: Math.max(0, FREE_SHIPPING - afterDiscount),
    };
  }, [state.lines, state.promo]);

  const value: CartContextValue = {
    lines: state.lines,
    ...totals,
    promo: state.promo,
    promoLabel: state.promo ? PROMOS[state.promo]?.label ?? null : null,
    isEmpty: state.lines.length === 0,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    applyPromo,
    removePromo,
    justAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
