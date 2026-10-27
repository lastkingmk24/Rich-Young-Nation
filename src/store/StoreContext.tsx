import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const WISHLIST_KEY = 'ryn.wishlist.v1';
const RECENT_KEY = 'ryn.recent.v1';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
}

interface StoreContextValue {
  wishlist: string[];
  toggleWishlist: (id: string) => boolean;
  isWished: (id: string) => boolean;
  recent: string[];
  pushRecent: (id: string) => void;
  toasts: Toast[];
  toast: (t: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function readArray(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => readArray(WISHLIST_KEY));
  const [recent, setRecent] = useState<string[]>(() => readArray(RECENT_KEY));
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* noop */
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    } catch {
      /* noop */
    }
  }, [recent]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback<StoreContextValue['toast']>((t) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 4200);
  }, []);

  const toggleWishlist = useCallback(
    (id: string) => {
      let added = false;
      setWishlist((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        added = true;
        return [...prev, id];
      });
      return added;
    },
    [],
  );

  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const pushRecent = useCallback((id: string) => {
    setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      toggleWishlist,
      isWished,
      recent,
      pushRecent,
      toasts,
      toast,
      dismissToast,
    }),
    [wishlist, toggleWishlist, isWished, recent, pushRecent, toasts, toast, dismissToast],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
