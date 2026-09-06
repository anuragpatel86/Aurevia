'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import CollectionShowcase from '@/components/sections/CollectionShowcase';
import BrandStory from '@/components/sections/BrandStory';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';
import Loader from '@/components/ui/Loader';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="flex flex-col w-full">
          <ScrollReveal>
            <HeroSection />
          </ScrollReveal>
          
          <ScrollReveal>
            <FeaturedProducts />
          </ScrollReveal>
          
          <ScrollReveal>
            <CollectionShowcase />
          </ScrollReveal>
          
          <ScrollReveal>
            <BrandStory />
          </ScrollReveal>
          
          <ScrollReveal>
            <Testimonials />
          </ScrollReveal>
          
          <ScrollReveal>
            <Newsletter />
          </ScrollReveal>
        </div>
      )}
    </>
  );
}
