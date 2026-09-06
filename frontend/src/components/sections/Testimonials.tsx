'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'Fashion Editor, Paris',
    quote: 'LUXE THREADS consistently delivers garments that are not just clothing, but wearable art. The attention to detail is simply unmatched in modern fashion.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Architect, New York',
    quote: 'As someone who appreciates structure and form, the tailoring here speaks to my soul. Every piece feels custom-made for my lifestyle.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    role: 'Entrepreneur, London',
    quote: 'The sustainable approach without compromising on absolute luxury is why my entire wardrobe is slowly becoming exclusively LUXE THREADS.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Marco Rossi',
    role: 'Creative Director, Milan',
    quote: 'A brilliant fusion of classic Italian sensibilities with avant-garde aesthetics. Their winter collection is a masterpiece.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Aisha Patel',
    role: 'Philanthropist, Dubai',
    quote: 'Elegance personified. Whether it is an evening gala or a casual brunch, I always find exactly what I need to make a quiet yet powerful statement.',
    rating: 5,
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 bg-darkLight overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center">
        
        <h2 className="text-sm text-gold uppercase tracking-[0.3em] font-semibold mb-16">
          What They Say
        </h2>

        <div className="relative h-[300px] md:h-[250px] flex items-center justify-center">
          {/* Decorative Quote Mark */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] font-serif text-white/5 select-none leading-none -mt-8">
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center w-full px-4"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-white/90 leading-relaxed mb-8">
                &ldquo;{TESTIMONIALS[currentIndex].quote}&rdquo;
              </p>
              
              <div className="flex text-gold mb-4 text-sm">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              
              <div className="uppercase tracking-widest text-sm font-semibold">
                {TESTIMONIALS[currentIndex].name}
              </div>
              <div className="text-gray-500 text-xs mt-1 uppercase tracking-wider">
                {TESTIMONIALS[currentIndex].role}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-12">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-gold w-8' : 'bg-white/20 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
