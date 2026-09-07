'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';

import { useProductStore } from '@/store/productStore';
import { formatPrice } from '@/lib/utils';

export default function ShopPage() {
  const { products } = useProductStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [viewMode]);

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="mb-12">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Shop</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">SHOP ALL</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-y border-white/10">
          <button 
            className="flex items-center space-x-2 text-sm uppercase tracking-widest hover:text-gold transition-colors md:hidden mb-4 md:mb-0"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FiFilter />
            <span>Filter</span>
          </button>
          
          <div className="hidden md:flex space-x-6 text-sm uppercase tracking-widest text-gray-400">
            <span>24 Products</span>
          </div>

          <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-gray-400">Sort By:</span>
              <select className="bg-transparent border-none text-white text-sm uppercase tracking-widest focus:ring-0 cursor-pointer">
                <option value="newest" className="bg-dark">Newest</option>
                <option value="price-asc" className="bg-dark">Price: Low to High</option>
                <option value="price-desc" className="bg-dark">Price: High to Low</option>
              </select>
            </div>
            
            <div className="hidden md:flex space-x-2">
              <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'text-gold' : 'text-gray-500 hover:text-white'}>
                <FiGrid size={20} />
              </button>
              <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'text-gold' : 'text-gray-500 hover:text-white'}>
                <FiList size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="space-y-8 sticky top-32">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Category</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><button className="hover:text-gold transition-colors">All Clothing</button></li>
                <li><button className="hover:text-gold transition-colors">Dresses</button></li>
                <li><button className="hover:text-gold transition-colors">Outerwear</button></li>
                <li><button className="hover:text-gold transition-colors">Suits & Tailoring</button></li>
                <li><button className="hover:text-gold transition-colors">Tops & Shirts</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Price</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><button className="hover:text-gold transition-colors">Under ₹10,000</button></li>
                <li><button className="hover:text-gold transition-colors">₹10,000 - ₹20,000</button></li>
                <li><button className="hover:text-gold transition-colors">Over ₹20,000</button></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div 
          ref={gridRef}
          className={`flex-1 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8' 
              : 'flex flex-col space-y-8'
          }`}
        >
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className={`group block relative ${viewMode === 'list' ? 'flex flex-row space-x-6' : ''}`}
            >
              <div className={`relative overflow-hidden bg-darkLight ${viewMode === 'list' ? 'w-48 aspect-[3/4] flex-shrink-0' : 'aspect-[3/4] w-full mb-4'}`}>
                <Image
                  src={product.image1}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className={`flex flex-col justify-center ${viewMode === 'list' ? 'flex-1' : 'space-y-1'}`}>
                <h3 className="text-white font-medium text-sm md:text-base font-serif group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{formatPrice(product.price)}</p>
                {viewMode === 'list' && (
                  <p className="text-gray-500 text-sm font-light max-w-md hidden md:block">
                    A beautiful piece crafted from the finest materials, designed to offer both elegance and comfort for any occasion.
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
      
      {/* Pagination */}
      <div className="mt-20 flex justify-center space-x-2">
        <button className="w-10 h-10 border border-white/20 flex items-center justify-center text-white bg-white/10">1</button>
        <button className="w-10 h-10 border border-transparent hover:border-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all">2</button>
        <button className="w-10 h-10 border border-transparent hover:border-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all">3</button>
      </div>

    </div>
  );
}
