import { useState, useEffect, RefObject } from 'react';

export function useScrollProgress(ref?: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      if (ref && ref.current) {
        const element = ref.current;
        const totalHeight = element.scrollHeight - element.clientHeight;
        const currentScroll = element.scrollTop;
        if (totalHeight > 0) {
          setProgress(Math.min(1, Math.max(0, currentScroll / totalHeight)));
        } else {
          setProgress(0);
        }
      } else {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        if (totalHeight > 0) {
          setProgress(Math.min(1, Math.max(0, currentScroll / totalHeight)));
        } else {
          setProgress(0);
        }
      }
    };

    const target = ref?.current || window;
    target.addEventListener('scroll', updateScroll);
    updateScroll();

    return () => target.removeEventListener('scroll', updateScroll);
  }, [ref]);

  return progress;
}
