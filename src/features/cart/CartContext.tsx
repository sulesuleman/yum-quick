import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { Product, Topping } from '@services/types';

export type CartItem = {
  cartItemId: string;
  productId: string;
  name: string;
  imageKey: string;
  unitPrice: number;
  quantity: number;
  toppings: Topping[];
  addedAt: string;
};

type CartState = {
  items: CartItem[];
  subtotal: number;
  addItem: (product: Product, quantity: number, toppings: Topping[]) => void;
  incrementItem: (cartItemId: string) => void;
  decrementItem: (cartItemId: string) => void;
  removeItem: (cartItemId: string) => void;
  clear: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartState | null>(null);

function buildCartItemId(productId: string, toppings: Topping[]): string {
  const toppingKey = toppings
    .map((t) => t.id)
    .sort()
    .join(',');
  return `${productId}::${toppingKey}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback((product: Product, quantity: number, toppings: Topping[]) => {
    const cartItemId = buildCartItemId(product.id, toppings);
    const toppingsTotal = toppings.reduce((sum, t) => sum + t.price, 0);
    const unitPrice = product.price + toppingsTotal;

    setItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          imageKey: product.imageKey,
          unitPrice,
          quantity,
          toppings,
          addedAt: new Date().toISOString()
        }
      ];
    });
  }, []);

  const incrementItem = useCallback((cartItemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decrementItem = useCallback((cartItemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartState>(
    () => ({
      items,
      subtotal,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clear,
      isDrawerOpen,
      openDrawer,
      closeDrawer
    }),
    [
      items,
      subtotal,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clear,
      isDrawerOpen,
      openDrawer,
      closeDrawer
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}
