'use client';

import MagneticButton from '@/components/ui/MagneticButton';

export default function Newsletter() {
  return (
    <section className="py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-[#151515] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto text-center">
        
        {/* Decorative element */}
        <div className="flex items-center justify-center space-x-4 mb-8 opacity-50">
          <div className="h-[1px] w-12 bg-gold"></div>
          <div className="w-2 h-2 rounded-full bg-gold"></div>
          <div className="h-[1px] w-12 bg-gold"></div>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-wide">
          JOIN THE LUXE CIRCLE
        </h2>
        
        <p className="text-gray-400 font-light mb-12 text-lg">
          Subscribe to receive exclusive access to early drops, private events, and our editorial newsletter.
        </p>

        <form className="flex flex-col md:flex-row items-center justify-center max-w-xl mx-auto gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="w-full relative">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0 flex-shrink-0">
            <MagneticButton>
              <button type="submit" className="w-full md:w-auto px-8 py-3 bg-white text-dark hover:bg-gold transition-colors duration-300 uppercase tracking-widest text-sm font-semibold">
                Subscribe
              </button>
            </MagneticButton>
          </div>
        </form>
        
        <p className="text-[#666] text-xs mt-6 tracking-wide">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
