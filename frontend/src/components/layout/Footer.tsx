'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#d4a853]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl tracking-widest">LUXE THREADS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevating everyday fashion with premium materials and timeless designs. Discover your signature style with our exclusive collections.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Social Icons */}
              {['instagram', 'twitter', 'facebook', 'pinterest'].map((social) => (
                <a key={social} href={`#${social}`} className="text-gray-400 hover:text-[#d4a853] transition-colors">
                  <div className="w-8 h-8 border border-gray-800 rounded-full flex items-center justify-center hover:border-[#d4a853]">
                    <span className="text-xs uppercase">{social[0]}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium tracking-wider mb-4 text-[#d4a853]">QUICK LINKS</h4>
            <ul className="space-y-3">
              {['Home', 'Shop', 'Collections', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-medium tracking-wider mb-4 text-[#d4a853]">CUSTOMER CARE</h4>
            <ul className="space-y-3">
              {['FAQ', 'Shipping & Returns', 'Size Guide', 'Track Order', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium tracking-wider mb-4 text-[#d4a853]">NEWSLETTER</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border border-gray-800 px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853] transition-colors w-full"
              />
              <Button type="submit" variant="primary" size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LUXE THREADS. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Payment Methods placeholders */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-[8px] text-gray-500">PAY</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
