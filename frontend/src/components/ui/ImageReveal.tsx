'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageReveal({ src, alt, className }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !imageRef.current || !overlayRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    tl.to(overlayRef.current, {
      y: '-100%',
      duration: 1.2,
      ease: 'power4.inOut',
    }).fromTo(
      imageRef.current,
      { scale: 1.2 },
      {
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
      },
      '-=1'
    );
  }, []);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden w-full h-full', className)}>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#d4a853] z-10"
        style={{ transformOrigin: 'bottom' }}
      />
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
