'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      
      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80"
          alt="About Luxe Threads"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-dark/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">OUR STORY</h1>
          <p className="text-gold uppercase tracking-[0.3em] text-sm">Crafting Elegance Since 2008</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
          LUXE THREADS was born from a desire to redefine modern luxury. We believe that true elegance lies in simplicity, quality materials, and meticulous craftsmanship.
        </p>
      </div>

    </div>
  );
}
