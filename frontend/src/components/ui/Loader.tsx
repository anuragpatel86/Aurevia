'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete
          });
        }
      });

      tl.to(textRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(progressRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.inOut'
      })
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in'
      }, '+=0.5');

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loader-container">
      <div ref={textRef} className="loader-text mb-8 text-white">
        LUXE
      </div>
      <div className="w-48 h-[2px] bg-white/20 overflow-hidden relative">
        <div 
          ref={progressRef} 
          className="absolute top-0 left-0 h-full w-full bg-gold transform scale-x-0 origin-left" 
        />
      </div>
    </div>
  );
}
