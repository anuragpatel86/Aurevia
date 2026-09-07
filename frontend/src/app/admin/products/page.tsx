'use client';

import { useState } from 'react';
import { useProductStore } from '@/store/productStore';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

export default function AdminProductsPage() {
  const { products, addProduct, deleteProduct } = useProductStore();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '', price: '', comparePrice: '', category: 'Dresses', image1: '', image2: '', description: '', colors: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (products.length + Math.floor(Math.random() * 1000)).toString();
    
    addProduct({
      id: newId,
      name: formData.name,
      price: Number(formData.price),
      comparePrice: formData.comparePrice ? Number(formData.comparePrice) : undefined,
      category: formData.category,
      image1: formData.image1 || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      image2: formData.image2 || undefined,
      description: formData.description,
      colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean)
    });
    
    setIsAdding(false);
    setFormData({ name: '', price: '', comparePrice: '', category: 'Dresses', image1: '', image2: '', description: '', colors: '' });
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-white">Product Management</h1>
        <div className="flex gap-4">
          <Link href="/shop" className="px-6 py-2 border border-white/20 text-sm uppercase tracking-widest hover:border-white transition-colors">
            View Shop
          </Link>
          <button 
            onClick={() => setIsAdding(!isAdding)} 
            className="px-6 py-2 bg-gold text-dark text-sm uppercase tracking-widest font-semibold hover:bg-white transition-colors"
          >
            {isAdding ? 'Cancel' : '+ Add Product'}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-[#111] p-8 border border-white/10 mb-12 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-serif mb-6 text-gold">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-gray-500">Product Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-white/20 px-0 py-2 focus:border-gold outline-none text-white" placeholder="e.g. Silk Dress" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-gray-500">Category *</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-transparent border-b border-white/20 px-0 py-2 focus:border-gold outline-none text-white">
                  <option className="bg-dark text-white" value="Dresses">Dresses</option>
                  <option className="bg-dark text-white" value="Outerwear">Outerwear</option>
                  <option className="bg-dark text-white" value="Bottoms">Bottoms</option>
                  <option className="bg-dark text-white" value="Tops">Tops</option>
                  <option className="bg-dark text-white" value="Accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-gray-500">Price (₹) *</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-transparent border-b border-white/20 px-0 py-2 focus:border-gold outline-none text-white" placeholder="25000" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-gray-500">Compare at Price (₹)</label>
                <input type="number" value={formData.comparePrice} onChange={e => setFormData({...formData, comparePrice: e.target.value})} className="w-full bg-transparent border-b border-white/20 px-0 py-2 focus:border-gold outline-none text-white" placeholder="30000" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-gray-500">Image URL 1 *</label>
                <input required type="text" value={formData.image1} onChange={e => setFormData({...formData, image1: e.target.value})} className="w-full bg-transparent border-b border-white/20 px-0 py-2 focus:border-gold outline-none text-white" placeholder="https://unsplash.com/..." />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-gray-500">Image URL 2</label>
                <input type="text" value={formData.image2} onChange={e => setFormData({...formData, image2: e.target.value})} className="w-full bg-transparent border-b border-white/20 px-0 py-2 focus:border-gold outline-none text-white" placeholder="https://unsplash.com/..." />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-500">Colors (comma separated hex codes)</label>
              <input type="text" value={formData.colors} onChange={e => setFormData({...formData, colors: e.target.value})} className="w-full bg-transparent border-b border-white/20 px-0 py-2 focus:border-gold outline-none text-white" placeholder="#000000, #FFFFFF, #D4A853" />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-500">Description</label>
              <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border-b border-white/20 px-0 py-2 focus:border-gold outline-none text-white resize-none" placeholder="Product details..."></textarea>
            </div>

            <button type="submit" className="w-full bg-gold text-dark py-3 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors">
              Save Product
            </button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-gray-500">
              <th className="py-4 px-4">Product</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Price</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-16 bg-darkLight flex-shrink-0">
                      <Image src={p.image1} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-gray-500">ID: {p.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm">{p.category}</td>
                <td className="py-4 px-4 text-sm text-gold">{formatPrice(p.price)}</td>
                <td className="py-4 px-4 text-right">
                  <button onClick={() => deleteProduct(p.id)} className="text-xs text-red-400 hover:text-red-300 uppercase tracking-widest">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">No products found. Add one above.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
