'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { FiChevronDown } from 'react-icons/fi';
import MagneticButton from '@/components/ui/MagneticButton';
import TextReveal from '@/components/ui/TextReveal';

const HeroCanvas = dynamic(() => import('@/components/canvas/HeroCanvas'), {
  ssr: false,
});

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.7'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.5'
      );
      
      gsap.to(scrollRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-dark/40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-16">
        <div ref={labelRef} className="mb-6 tracking-[0.3em] text-sm md:text-base text-gold font-medium uppercase">
          Autumn / Winter 2025
        </div>
        
        <div className="mb-4">
          <TextReveal 
            text="LUXE THREADS" 
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-wider leading-none"
          />
        </div>
        
        <div ref={subtitleRef} className="mt-4 mb-12 text-lg md:text-2xl text-gray-300 font-light max-w-2xl">
          Redefining Modern Luxury Fashion
        </div>
        
        <div ref={ctaRef}>
          <MagneticButton>
            <a href="/shop" className="inline-block px-10 py-4 border-2 border-gold text-white hover:text-dark transition-colors duration-300 tracking-widest text-sm uppercase relative overflow-hidden group">
              <span className="relative z-10 font-semibold">Explore Collection</span>
              <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
            </a>
          </MagneticButton>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/50">
        <span className="text-xs uppercase tracking-widest mb-2 font-light">Scroll Discover</span>
        <FiChevronDown className="text-2xl" />
      </div>
    </section>
  );
}
