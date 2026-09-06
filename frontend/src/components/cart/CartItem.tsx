import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { type CartItem as CartItemType } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-white/10">
      <div className="relative w-20 h-24 bg-gray-900 rounded overflow-hidden flex-shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium">{item.name}</h4>
            <button
              onClick={() => removeItem(item.id, item.size, item.color)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Size: {item.size} | Color: {item.color}</p>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex items-center border border-white/20 rounded">
            <button
              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
              className="px-2 py-1 text-gray-400 hover:text-white"
            >
              -
            </button>
            <span className="px-2 text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
              className="px-2 py-1 text-gray-400 hover:text-white"
            >
              +
            </button>
          </div>
          <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
