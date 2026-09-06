'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation for numbers
      numbersRef.current.forEach((el) => {
        if (!el) return;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              innerHTML: target,
              duration: 2,
              snap: { innerHTML: 1 },
              ease: 'power2.out',
              onUpdate: function() {
                // Add back any suffixes like '+' or 'K+'
                const suffix = el.getAttribute('data-suffix') || '';
                el.innerHTML = Math.round(Number(this.targets()[0].innerHTML)) + suffix;
              }
            });
          }
        });
      });

      // Parallax for images
      imageRefs.current.forEach((el) => {
        if (!el) return;
        const image = el.querySelector('img');
        if (image) {
          gsap.to(image, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Row 1 */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-32">
        <div 
          ref={el => { imageRefs.current[0] = el; }}
          className="w-full lg:w-1/2 relative aspect-[4/5] overflow-hidden"
        >
          <div className="absolute inset-0 bg-dark z-10 animate-[slideRight_1.5s_ease-out_forwards]" style={{ transformOrigin: 'right' }} />
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80"
            alt="Craftsmanship"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover scale-110"
          />
        </div>
        
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <TextReveal 
            text="OUR STORY" 
            className="text-gold text-sm tracking-[0.3em] uppercase font-semibold"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
            A Legacy of <br/>
            <span className="italic text-gray-400">Timeless Elegance</span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            Founded on the principles of exceptional craftsmanship and avant-garde design, LUXE THREADS has redefined modern luxury. Every piece is a testament to our dedication to quality, blending classic silhouettes with contemporary sensibilities.
          </p>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            We source only the finest sustainable materials, ensuring that our creations not only elevate your wardrobe but also respect our planet. Welcome to a world where fashion is an art form.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 py-12 border-y border-white/10">
        {[
          { label: 'Years of Excellence', value: '15', suffix: '+' },
          { label: 'Happy Clients', value: '50', suffix: 'K+' },
          { label: 'Original Designs', value: '200', suffix: '+' },
          { label: 'Countries Served', value: '30', suffix: '+' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-2">
            <span 
              ref={el => { numbersRef.current[i] = el; }}
              data-target={stat.value}
              data-suffix={stat.suffix}
              className="text-4xl md:text-5xl font-serif text-gold font-bold"
            >
              0{stat.suffix}
            </span>
            <span className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Row 2 (Reversed) */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <TextReveal 
            text="THE ATELIER" 
            className="text-gold text-sm tracking-[0.3em] uppercase font-semibold"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
            Where Magic <br/>
            <span className="italic text-gray-400">Takes Shape</span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            Inside our Parisian atelier, master artisans meticulously craft each garment. The process is unhurried, allowing for precision in every stitch, fold, and seam.
          </p>
          <div className="mt-8">
            <a href="/about" className="inline-block pb-1 border-b border-white hover:border-gold hover:text-gold transition-colors uppercase tracking-widest text-sm">
              Discover Our Process
            </a>
          </div>
        </div>

        <div 
          ref={el => { imageRefs.current[1] = el; }}
          className="w-full lg:w-1/2 relative aspect-[4/5] overflow-hidden"
        >
          <div className="absolute inset-0 bg-dark z-10 animate-[slideLeft_1.5s_ease-out_forwards]" style={{ transformOrigin: 'left' }} />
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80"
            alt="Atelier"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover scale-110"
          />
        </div>
      </div>

    </section>
  );
}
