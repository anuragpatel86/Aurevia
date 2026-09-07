'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a random luxury-looking order ID
    const randomId = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setOrderId(randomId);
  }, []);

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-3xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-8">
        <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Order Confirmed</h1>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Thank you for your purchase. Your order has been received and is now being processed by our atelier.
      </p>

      <div className="bg-[#111] p-6 w-full border border-white/10 mb-10 flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">Order Reference</span>
        <span className="text-xl font-mono text-gold">{orderId}</span>
      </div>

      <div className="flex gap-4">
        <Link href="/shop" className="bg-white text-dark px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
