import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,168,83,0.15)] hover:border-[#d4a853]/30',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
