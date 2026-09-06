'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRODUCTS = [
  { id: '1', name: 'Silk Evening Dress', price: '₹24,999', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80' },
  { id: '2', name: 'Cashmere Overcoat', price: '₹29,999', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80' },
  { id: '3', name: 'Leather Biker Jacket', price: '₹18,500', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80' },
  { id: '4', name: 'Linen Summer Suit', price: '₹22,000', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80' },
  { id: '5', name: 'Velvet Blazer', price: '₹15,999', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80' },
  { id: '6', name: 'Wool Turtleneck', price: '₹8,999', image: 'https://images.unsplash.com/photo-1628520118772-74892c55497f?w=600&auto=format&fit=crop&q=80' },
  { id: '7', name: 'Satin Blouse', price: '₹6,499', image: 'https://images.unsplash.com/photo-1564257631407-4ebd1f9ea44f?w=600&auto=format&fit=crop&q=80' },
  { id: '8', name: 'Denim Jacket', price: '₹9,999', image: 'https://images.unsplash.com/photo-1601333144130-8c1f12369685?w=600&auto=format&fit=crop&q=80' },
];

export default function FeaturedProducts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for product cards
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col items-center mb-16 text-center">
        <TextReveal 
          text="CURATED FOR YOU" 
          className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
        />
        <p className="text-gray-400 font-light tracking-wide">
          Handpicked pieces from our latest collection
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16">
        {PRODUCTS.map((product, index) => (
          <Link 
            key={product.id} 
            href={`/product/${product.id}`}
            ref={el => {
              cardsRef.current[index] = el;
            }}
            className="group block relative overflow-hidden"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-darkLight mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="flex flex-col space-y-1">
              <h3 className="text-white font-medium text-sm md:text-base font-serif group-hover:text-gold transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center">
        <Link 
          href="/shop"
          className="group flex items-center space-x-2 text-white hover:text-gold transition-colors pb-1 border-b border-white/30 hover:border-gold"
        >
          <span className="uppercase tracking-widest text-sm font-medium">View All</span>
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
