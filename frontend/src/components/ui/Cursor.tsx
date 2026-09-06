'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Cursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const xToDot = gsap.quickTo(cursorDot.current, 'x', { duration: 0.1, ease: 'power3' });
    const yToDot = gsap.quickTo(cursorDot.current, 'y', { duration: 0.1, ease: 'power3' });
    
    const xToRing = gsap.quickTo(cursorRing.current, 'x', { duration: 0.5, ease: 'power3' });
    const yToRing = gsap.quickTo(cursorRing.current, 'y', { duration: 0.5, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if interactive element
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
        setHoverText('');
      } else if (target.closest('img')) {
        setIsHovering(true);
        setHoverText('VIEW');
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-2 h-2 bg-[#d4a853] rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={cursorRing}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-[#d4a853] flex items-center justify-center transition-all duration-300 -translate-x-1/2 -translate-y-1/2 mix-blend-difference
          ${isHovering ? 'w-16 h-16 bg-[#d4a853]/20' : 'w-8 h-8'}`}
      >
        {hoverText && (
          <span className="text-[8px] tracking-widest text-white uppercase font-bold">{hoverText}</span>
        )}
      </div>
    </>
  );
}
