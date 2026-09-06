'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }
    });

    // Animate letters
    if (textRef.current) {
      const letters = textRef.current.children;
      tl.fromTo(
        letters,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
      );
    }

    // Animate progress bar and counter
    tl.to(
      progressRef.current,
      {
        width: '100%',
        duration: 2,
        ease: 'power1.inOut',
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        }
      },
      '-=0.5'
    );

    // Slide up out of view
    tl.to(
      containerRef.current,
      {
        y: '-100%',
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.2
      }
    );

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const text = 'LUXE THREADS';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-md px-6">
        <div ref={textRef} className="flex font-serif text-3xl md:text-5xl tracking-[0.2em] overflow-hidden">
          {text.split('').map((char, i) => (
            <span key={i} className={char === ' ' ? 'w-4' : ''}>
              {char}
            </span>
          ))}
        </div>
        
        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-500 mb-2 font-mono">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
          <div className="h-[2px] w-full bg-gray-900 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-[#d4a853] w-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
