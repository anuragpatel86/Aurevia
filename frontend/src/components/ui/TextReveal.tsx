'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        {
          y: '100%',
          opacity: 0,
          rotateZ: 5
        },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`flex flex-wrap overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.25em] pb-1">
          <span
            ref={el => { wordsRef.current[i] = el; }}
            className="inline-block transform origin-bottom-left"
          >
            {word}
          </span>
        </div>
      ))}
    </div>
  );
}
