import React from 'react';
import { Button } from '@/components/ui/Button';

interface SectionTemplateProps {
  id?: string;
  label: string;
  heading: React.ReactNode;
  description: string;
  className?: string;
  children?: React.ReactNode;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  maxWidth?: 'default' | 'wide'; // default = 5xl, wide = 6xl
}

export const SectionTemplate: React.FC<SectionTemplateProps> = ({
  id,
  label,
  heading,
  description,
  className = '',
  children,
  showButton = false,
  buttonText = 'JOIN THE REVOLUTION',
  onButtonClick,
  maxWidth = 'default',
}) => {
  const containerClass = maxWidth === 'wide' ? 'max-w-6xl' : 'max-w-5xl';

  return (
    <section id={id} className={`py-48 bg-background text-foreground overflow-hidden ${className}`}>
      <div className={`${containerClass} mx-auto px-6 w-full`}>
        {/* Section Label */}
        <p className="text-sm font-medium tracking-[0.3em] uppercase mb-8 text-gray-400">
          {label}
        </p>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 tracking-tight break-words">
          {heading}
        </h2>

        {/* Lead Paragraph */}
        <p className="text-xl md:text-xl font-extralight leading-relaxed max-w-4xl mb-12 text-gray-300">
          {description}
        </p>

        {/* CTA Button (optional) */}
        {showButton && (
          <div className="mb-12">
            <Button
              variant="outline"
              size="lg"
              className="gap-3 uppercase tracking-[0.2em] border-[#d4a964] text-[#d4a964] hover:bg-[#d4a964] hover:text-black"
              onClick={onButtonClick}
            >
              {buttonText}
              <span aria-hidden className="text-base">
                &rsaquo;
              </span>
            </Button>
          </div>
        )}

        {/* Additional Content */}
        {children}
      </div>
    </section>
  );
};
