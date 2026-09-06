import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useGSAP() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setIsReady(true);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return { gsap, ScrollTrigger, isReady };
}
