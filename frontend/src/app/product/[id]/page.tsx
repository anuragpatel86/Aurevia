'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/productStore';
import { formatPrice } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { products } = useProductStore();

  const product = products.find(p => p.id === params.id) || products[0];

  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      // Set to hex value or first color name
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image1,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    openCart();
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 uppercase tracking-widest mb-10">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Dresses</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left: Images */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="relative aspect-[3/4] w-full bg-darkLight">
            <Image
              src={product.image1}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-darkLight">
              <Image
                src={product.image2}
                alt={`${product.name} detail`}
                fill
                className="object-cover"
              />
            </div>
             <div className="relative aspect-[3/4] bg-darkLight flex items-center justify-center border border-white/10 cursor-pointer hover:border-gold transition-colors group">
               <span className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-gold">View in 3D</span>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-1/2 flex flex-col pt-4">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{product.name}</h1>
          <p className="text-xl text-gold mb-8">{formatPrice(product.price)}</p>
          
          <div className="mb-10 text-gray-400 font-light leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Color */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <span className="text-sm uppercase tracking-widest">Color</span>
              <span className="text-sm text-gray-400">{selectedColor}</span>
            </div>
            <div className="flex space-x-4">
              {['Black', 'Navy', 'Emerald'].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-gold p-1' : 'border-transparent'}`}
                >
                  <div className={`w-full h-full rounded-full ${color === 'Black' ? 'bg-black' : color === 'Navy' ? 'bg-blue-900' : 'bg-emerald-900'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-10">
            <div className="flex justify-between mb-4">
              <span className="text-sm uppercase tracking-widest">Size</span>
              <button className="text-xs text-gray-500 uppercase tracking-widest hover:text-white underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border text-sm transition-colors ${
                    selectedSize === size 
                      ? 'border-gold text-gold bg-gold/5' 
                      : 'border-white/20 text-white hover:border-white/50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mb-12">
            <div className="flex items-center border border-white/20">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white"
              >
                -
              </button>
              <span className="w-12 text-center text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white text-dark uppercase tracking-widest text-sm font-semibold hover:bg-gold transition-colors duration-300"
            >
              Add to Bag
            </button>
          </div>

          {/* Accordion/Tabs for Details */}
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-sm uppercase tracking-widest font-semibold mb-4">Product Details</h3>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-2 font-light">
              {PRODUCT.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
