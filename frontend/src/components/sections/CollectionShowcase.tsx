'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const COLLECTIONS = [
  { id: '1', name: 'MIDNIGHT', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80' },
  { id: '2', name: 'GOLDEN HOUR', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80' },
  { id: '3', name: 'URBAN EDGE', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80' },
  { id: '4', name: 'ETHEREAL', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format&fit=crop&q=80' },
];

export default function CollectionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll effect for rows
      gsap.to(row1Ref.current, {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to(row2Ref.current, {
        xPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#111] overflow-hidden">
      <div className="flex flex-col space-y-8 md:space-y-16">
        
        {/* Row 1 - Scrolling Left */}
        <div ref={row1Ref} className="flex space-x-6 md:space-x-12 w-[150vw] md:w-[120vw] -ml-[10vw]">
          {[...COLLECTIONS, ...COLLECTIONS].map((item, i) => (
            <div key={`${item.id}-${i}-1`} className="relative flex-none w-[60vw] md:w-[30vw] aspect-[2/3] group cursor-pointer overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl md:text-5xl font-serif font-bold tracking-widest opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - Scrolling Right */}
        <div ref={row2Ref} className="flex space-x-6 md:space-x-12 w-[150vw] md:w-[120vw] -ml-[30vw]">
          {[...COLLECTIONS].reverse().concat([...COLLECTIONS].reverse()).map((item, i) => (
            <div key={`${item.id}-${i}-2`} className="relative flex-none w-[60vw] md:w-[30vw] aspect-[2/3] group cursor-pointer overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl md:text-5xl font-serif font-bold tracking-widest opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
