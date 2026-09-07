'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const router = useRouter();
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card'|'upi'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: '', upiId: ''
  });

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    
    // Auto-format card number
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
    }
    // Auto-format expiry
    if (name === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    // Limit CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const processPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Secure Payment Gateway Processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    clearCart();
    router.push('/checkout/success');
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="pt-32 pb-24 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-serif mb-4">Your bag is empty</h1>
        <button onClick={() => router.push('/shop')} className="text-gold hover:text-white underline tracking-widest uppercase text-sm">
          Return to Shop
        </button>
      </div>
    );
  }

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
            <span className={step >= 2 ? 'text-gold' : 'text-gray-600'}>2. Secure Payment</span>
          </div>

          {step === 1 && (
            <div className="bg-[#111] p-8 border border-white/5">
              <h2 className="text-xl font-serif mb-8">Shipping Information</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-gray-500">First Name</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Last Name</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Shipping Address</label>
                  <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-gray-500">City</label>
                    <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Postal Code</label>
                    <input type="text" name="zip" required value={formData.zip} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-white text-dark py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold transition-colors mt-8">
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-[#111] p-8 border border-white/5 relative overflow-hidden">
              {isProcessing && (
                <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gold uppercase tracking-widest text-sm">Processing Secure Payment...</p>
                </div>
              )}

              <h2 className="text-xl font-serif mb-8 flex items-center gap-3">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Secure Payment
              </h2>

              <div className="flex gap-4 mb-8">
                <button type="button" onClick={() => setPaymentMethod('card')} className={`flex-1 py-3 border text-sm uppercase tracking-widest transition-colors ${paymentMethod === 'card' ? 'border-gold text-gold bg-gold/5' : 'border-white/20 text-gray-400'}`}>Credit / Debit</button>
                <button type="button" onClick={() => setPaymentMethod('upi')} className={`flex-1 py-3 border text-sm uppercase tracking-widest transition-colors ${paymentMethod === 'upi' ? 'border-gold text-gold bg-gold/5' : 'border-white/20 text-gray-400'}`}>UPI</button>
              </div>

              <form className="space-y-6" onSubmit={processPayment}>
                {paymentMethod === 'card' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Card Number</label>
                      <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" required value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-gray-500">Expiry (MM/YY)</label>
                        <input type="text" name="expiry" placeholder="MM/YY" required value={formData.expiry} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold font-mono" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-gray-500">CVV</label>
                        <input type="password" name="cvv" placeholder="•••" required value={formData.cvv} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold font-mono" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-gray-500">UPI ID</label>
                    <input type="text" name="upiId" placeholder="username@upi" required value={formData.upiId} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold" />
                  </div>
                )}
                
                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-4 border border-white/20 text-white uppercase tracking-widest text-sm hover:border-white transition-colors">
                    Back
                  </button>
                  <button type="submit" disabled={isProcessing} className="flex-1 bg-gold text-dark py-4 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
                    Pay {formatPrice(total)}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-[#111] p-8 border border-white/5 sticky top-32">
            <h2 className="text-xl font-serif mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-darkLight flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.color} | {item.size}</p>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg font-serif pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
