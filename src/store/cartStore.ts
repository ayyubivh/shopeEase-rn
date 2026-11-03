import { create } from "zustand";
import type { Product } from "../api/types";

export type CartItem = { product: Product; quantity: number };

type CartState = {
    items: CartItem[];
    add: (product: Product) => void;
    setQuantity: (id: number, quantity: number) => void;
    remove: (id: number) => void;
    clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
    items: [],
    add: (product) =>
        set((s) => {
            const existing = s.items.find((i) => i.product.id === product.id);
            if (existing) {
                return {
                    items: s.items.map((i) =>
                        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
                    ),
                };
            }
            return { items: [...s.items, { product, quantity: 1 }] };
        }),
    setQuantity: (id, quantity) =>
        set((s) => ({
            items:
                quantity <= 0
                    ? s.items.filter((i) => i.product.id !== id)
                    : s.items.map((i) => (i.product.id === id ? { ...i, quantity } : i)),
        })),
    remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
    clear: () => set({ items: [] }),
}));

export const selectCartCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0);
