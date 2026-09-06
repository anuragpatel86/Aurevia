'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { FiTrash2 } from 'react-icons/fi';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + (items.length > 0 ? shipping : 0);

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-12">SHOPPING BAG</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-t border-white/10">
          <p className="text-gray-400 text-lg mb-8">Your bag is currently empty.</p>
          <Link 
            href="/shop"
            className="px-8 py-4 bg-white text-dark uppercase tracking-widest text-sm font-semibold hover:bg-gold transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="hidden md:grid grid-cols-12 gap-4 border-b border-white/20 pb-4 text-xs uppercase tracking-widest text-gray-500 mb-6">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="space-y-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-white/10 pb-8 md:pb-6">
                  
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6 flex gap-6">
                    <div className="relative w-24 aspect-[3/4] bg-darkLight flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link href={`/product/${item.id}`} className="font-serif text-lg hover:text-gold transition-colors mb-2">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-400 mb-1">Size: {item.size}</p>
                      <p className="text-sm text-gray-400 mb-4">Color: {item.color}</p>
                      <p className="text-sm text-white md:hidden">₹{(item.price).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="col-span-1 md:col-span-3 flex justify-between md:justify-center items-center mt-4 md:mt-0">
                    <span className="text-xs text-gray-500 uppercase md:hidden">Quantity</span>
                    <div className="flex items-center border border-white/20">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="col-span-1 md:col-span-3 flex justify-between items-center md:block text-right mt-4 md:mt-0">
                    <span className="text-xs text-gray-500 uppercase md:hidden">Total</span>
                    <div className="flex items-center justify-between md:justify-end md:space-x-4 w-full">
                      <span className="text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                      <button 
                        onClick={() => removeItem(item.id, item.size, item.color)}
                        className="text-gray-500 hover:text-red-500 transition-colors ml-4 md:ml-0"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#111] p-8">
              <h2 className="font-serif text-2xl mb-8">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 mb-8 flex justify-between font-serif text-xl">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <Link 
                href="/checkout"
                className="w-full block text-center px-8 py-4 bg-gold text-dark uppercase tracking-widest text-sm font-semibold hover:bg-white transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
