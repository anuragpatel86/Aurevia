'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { Button } from './Button';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    comparePrice?: number;
    image1: string;
    image2?: string;
    category: string;
    colors: string[];
  };
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, [index]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image1,
      size: 'M', // default size
      color: product.colors[0] || 'Default',
      quantity: 1,
    });
  };

  return (
    <Link href={`/product/${product.id}`} className="block group" ref={cardRef}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111] rounded-sm mb-4">
        <Image
          src={product.image1}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
            product.image2 ? 'group-hover:opacity-0' : ''
          }`}
        />
        {product.image2 && (
          <Image
            src={product.image2}
            alt={`${product.name} alternate view`}
            fill
            className="object-cover absolute inset-0 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700"
          />
        )}
        
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 bg-gradient-to-t from-black/80 to-transparent">
          <Button 
            className="w-full text-xs py-3" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider">{product.category}</p>
        <h3 className="text-sm font-medium hover:text-[#d4a853] transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm">{formatPrice(product.price)}</p>
          {product.comparePrice && (
            <p className="text-xs text-gray-500 line-through">{formatPrice(product.comparePrice)}</p>
          )}
        </div>
        
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1 mt-2">
            {product.colors.map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-gray-600"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
