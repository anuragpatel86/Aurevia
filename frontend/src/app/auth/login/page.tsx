'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md bg-[#111] p-8 md:p-12 relative overflow-hidden">
        
        {/* Decorative line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold mb-2">WELCOME BACK</h1>
          <p className="text-gray-400 text-sm">Sign in to access your account</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>

          <div className="space-y-1 relative">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-widest text-gray-500">Password</label>
              <Link href="#" className="text-xs text-gray-500 hover:text-gold transition-colors">Forgot?</Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-white text-dark uppercase tracking-widest text-sm font-semibold hover:bg-gold transition-colors duration-300 mt-8"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-white hover:text-gold transition-colors border-b border-white/30 hover:border-gold pb-1">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
