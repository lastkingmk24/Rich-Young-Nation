import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Fulfilment = 'ship' | 'pickup';

export interface CheckoutData {
  email: string;
  marketing: boolean;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  postal: string;
  country: string;
  phone: string;
  fulfilment: Fulfilment;
  pickupLocation: string;
  shippingMethod: 'standard' | 'express';
  payment: 'card' | 'apple' | 'klarna' | 'paypal';
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
  note: string;
}

export const emptyCheckout: CheckoutData = {
  email: '',
  marketing: true,
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  region: '',
  postal: '',
  country: 'United States',
  phone: '',
  fulfilment: 'ship',
  pickupLocation: 'RYN SoHo — 112 Greene St, New York',
  shippingMethod: 'standard',
  payment: 'card',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvc: '',
  note: '',
};

interface CheckoutContextValue {
  data: CheckoutData;
  update: <K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) => void;
  reset: () => void;
  orderNumber: string | null;
  setOrderNumber: (n: string | null) => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CheckoutData>(emptyCheckout);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const update = useCallback<CheckoutContextValue['update']>((key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setData(emptyCheckout);
    setOrderNumber(null);
  }, []);

  const value = useMemo(
    () => ({ data, update, reset, orderNumber, setOrderNumber }),
    [data, update, reset, orderNumber],
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used inside <CheckoutProvider>');
  return ctx;
}

export const SHIPPING_OPTIONS = {
  standard: { label: 'Standard', eta: '4–6 business days', cost: 0 },
  express: { label: 'Express', eta: '1–2 business days', cost: 14 },
} as const;

export const PICKUP_LOCATIONS = [
  'RYN SoHo — 112 Greene St, New York',
  'RYN Silver Lake — 3821 Sunset Blvd, Los Angeles',
  'RYN Shoreditch — 28 Rivington St, London',
] as const;
