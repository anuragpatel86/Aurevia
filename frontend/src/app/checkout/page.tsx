'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const { items } = useCartStore();
  const [step, setStep] = useState(1);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-12">CHECKOUT</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          
          {/* Progress Indicator */}
          <div className="flex items-center space-x-4 mb-12 text-xs uppercase tracking-widest font-semibold">
            <span className={step >= 1 ? 'text-gold' : 'text-gray-600'}>1. Shipping</span>
            <span className="w-8 h-[1px] bg-white/20"></span>
            <span className={step >= 2 ? 'text-gold' : 'text-gray-600'}>2. Payment</span>
            <span className="w-8 h-[1px] bg-white/20"></span>
            <span className={step >= 3 ? 'text-gold' : 'text-gray-600'}>3. Review</span>
          </div>

          {step === 1 && (
            <div className="bg-[#111] p-8 border border-white/5">
              <h2 className="text-xl font-serif mb-8">Shipping Information</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-gray-500">First Name</label>
                    <input type="text" required className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Last Name</label>
                    <input type="text" required className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Email Address</label>
                  <input type="email" required className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Street Address</label>
                  <input type="text" required className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-gray-500">City</label>
                    <input type="text" required className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Postal Code</label>
                    <input type="text" required className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                  </div>
                </div>

                <div className="pt-8">
                  <button type="submit" className="px-8 py-4 bg-white text-dark uppercase tracking-widest text-sm font-semibold hover:bg-gold transition-colors duration-300">
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-[#111] p-8 border border-white/5">
              <h2 className="text-xl font-serif mb-8">Payment Method</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 p-4 border border-white/20 cursor-pointer hover:border-gold transition-colors">
                    <input type="radio" name="payment" value="card" className="form-radio text-gold focus:ring-gold" defaultChecked />
                    <span className="text-sm">Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border border-white/20 cursor-pointer hover:border-gold transition-colors">
                    <input type="radio" name="payment" value="cod" className="form-radio text-gold focus:ring-gold" />
                    <span className="text-sm">Cash on Delivery</span>
                  </label>
                </div>
                
                <div className="pt-8 flex space-x-4">
                  <button type="button" onClick={() => setStep(1)} className="px-8 py-4 border border-white/20 text-white uppercase tracking-widest text-sm font-semibold hover:border-white transition-colors duration-300">
                    Back
                  </button>
                  <button type="submit" className="px-8 py-4 bg-white text-dark uppercase tracking-widest text-sm font-semibold hover:bg-gold transition-colors duration-300">
                    Review Order
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="bg-[#111] p-8 border border-white/5">
              <h2 className="text-xl font-serif mb-8">Review Order</h2>
              <p className="text-gray-400 mb-8">Please review your items and details before placing the order.</p>
              
              <div className="pt-8 flex space-x-4">
                <button type="button" onClick={() => setStep(2)} className="px-8 py-4 border border-white/20 text-white uppercase tracking-widest text-sm font-semibold hover:border-white transition-colors duration-300">
                  Back
                </button>
                <button type="button" onClick={() => alert('Order Placed!')} className="px-8 py-4 bg-gold text-dark uppercase tracking-widest text-sm font-semibold hover:bg-white transition-colors duration-300">
                  Place Order
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-[#111] p-8 border border-white/5 sticky top-32">
            <h2 className="font-serif text-2xl mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.quantity}x {item.name}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm mb-8 pt-4 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4 font-serif text-xl flex justify-between">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
