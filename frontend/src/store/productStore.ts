import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SAMPLE_PRODUCTS } from '@/data/products';

export interface ProductData {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  category: string;
  image1: string;
  image2?: string;
  colors?: string[];
  description?: string;
}

interface ProductState {
  products: ProductData[];
  addProduct: (product: ProductData) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: SAMPLE_PRODUCTS,
      addProduct: (newProduct) => set((state) => ({ 
        products: [newProduct, ...state.products] 
      })),
      deleteProduct: (id) => set((state) => ({ 
        products: state.products.filter(p => p.id !== id) 
      })),
    }),
    {
      name: 'luxe-products-storage',
    }
  )
);
