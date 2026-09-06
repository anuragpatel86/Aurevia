'use client';

import React, { useState } from 'react';
import gsap from 'gsap';

export interface FilterState {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
}

interface SidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ filters, onChange, isOpen, onClose }: SidebarProps) {
  const categories = ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Navy', hex: '#000080' },
  ];

  const handleCategoryChange = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories: updated });
  };

  const handleSizeChange = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes: updated });
  };

  const handleColorChange = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors: updated });
  };

  const clearAll = () => {
    onChange({
      categories: [],
      minPrice: 0,
      maxPrice: 10000,
      sizes: [],
      colors: [],
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 w-[280px] bg-[#111] md:bg-transparent z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h2 className="text-xl tracking-widest uppercase">Filters</h2>
          <button onClick={onClose} className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex justify-between items-center mb-6">
          <h2 className="text-lg tracking-widest uppercase border-b border-[#d4a853] pb-1">Filters</h2>
          <button onClick={clearAll} className="text-xs text-gray-500 hover:text-white transition-colors">
            Clear All
          </button>
        </div>

        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-gray-400">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${filters.categories.includes(cat) ? 'border-[#d4a853] bg-[#d4a853]' : 'border-gray-600 group-hover:border-[#d4a853]'}`}>
                    {filters.categories.includes(cat) && <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-gray-400">Price Range</h3>
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                value={filters.minPrice}
                onChange={(e) => onChange({...filters, minPrice: Number(e.target.value)})}
                className="w-full bg-transparent border border-gray-700 p-2 text-sm focus:border-[#d4a853] outline-none"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input 
                type="number" 
                value={filters.maxPrice}
                onChange={(e) => onChange({...filters, maxPrice: Number(e.target.value)})}
                className="w-full bg-transparent border border-gray-700 p-2 text-sm focus:border-[#d4a853] outline-none"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-gray-400">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`w-10 h-10 border text-xs flex items-center justify-center transition-all ${
                    filters.sizes.includes(size)
                      ? 'border-[#d4a853] bg-[#d4a853] text-black'
                      : 'border-gray-700 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-gray-400">Color</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color.name)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    filters.colors.includes(color.name)
                      ? 'border-[#d4a853] scale-110'
                      : 'border-transparent hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Mobile Clear All */}
          <div className="md:hidden pt-4 border-t border-gray-800">
             <button onClick={clearAll} className="w-full py-3 border border-gray-700 text-sm uppercase tracking-widest hover:bg-white/5 transition-colors">
              Clear All Filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
