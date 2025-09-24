import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={clsx(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-brand-gold text-black hover:bg-brand-gold/90 focus-visible:ring-brand-gold': variant === 'primary',
            'bg-surface text-foreground hover:bg-white/5 border border-border focus-visible:ring-brand-gold/40': variant === 'secondary',
            'border border-brand-gold bg-transparent text-brand-gold hover:bg-brand-gold hover:text-black focus-visible:ring-brand-gold/60': variant === 'outline',
            'text-foreground hover:bg-white/5 focus-visible:ring-brand-gold/30': variant === 'ghost',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';