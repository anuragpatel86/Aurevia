'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useCart } from '@/hooks/useCart';
import { CartItem } from './CartItem';
import { Button } from '../ui/Button';
import { formatPrice } from '@/lib/utils';

export function CartSidebar() {
  const { isCartOpen, closeCart, items, totalPrice } = useCart();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none' });
      gsap.to(sidebarRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [isCartOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden opacity-0"
        onClick={closeCart}
      />
      
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] z-[51] translate-x-full border-l border-white/10 flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-serif tracking-widest uppercase">Your Cart</h2>
          <button onClick={closeCart} className="p-2 hover:rotate-90 transition-transform duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-lg mb-4">Your cart is empty</p>
              <Button variant="secondary" onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-lg font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6">Taxes and shipping calculated at checkout.</p>
            <div className="space-y-3">
              <Link href="/checkout" passHref legacyBehavior>
                <a onClick={closeCart}>
                  <Button className="w-full">Checkout</Button>
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
