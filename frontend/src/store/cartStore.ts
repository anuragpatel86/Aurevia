import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (newItem) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
        );

        if (existingItemIndex >= 0) {
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += newItem.quantity;
          return { items: newItems };
        }

        return { items: [...state.items, newItem] };
      }),

      removeItem: (id, size, color) => set((state) => ({
        items: state.items.filter(
          (item) => !(item.id === id && item.size === size && item.color === color)
        )
      })),

      updateQuantity: (id, size, color, quantity) => set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id && item.size === size && item.color === color) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        })
      })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'luxe-cart-storage',
    }
  )
);
