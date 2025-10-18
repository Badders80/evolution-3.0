'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StepItem {
  label: string;
  heading: string;
  description: string;
}

interface StickyScrollSectionProps {
  id?: string;
  sectionLabel: string;
  sectionHeading: string;
  sectionDescription: string;
  steps: StepItem[];
}

export const StickyScrollSection: React.FC<StickyScrollSectionProps> = ({
  id,
  sectionLabel,
  sectionHeading,
  sectionDescription,
  steps,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the section
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height - windowHeight)));

      // Section becomes sticky when it reaches the top
      setIsSticky(rect.top <= 0 && rect.bottom > windowHeight);

      // Calculate which step should be active based on scroll progress
      // Divide the scroll range into segments for each step
      if (scrollProgress < 0.3) {
        setActiveStep(0);
      } else if (scrollProgress < 0.55) {
        setActiveStep(1);
      } else if (scrollProgress < 0.8) {
        setActiveStep(2);
      } else {
        setActiveStep(3); // All steps visible
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative bg-background text-foreground"
      style={{ minHeight: '300vh' }} // Extra height for scroll-triggered animation
    >
      <div className="sticky top-0 py-56 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* LEFT COLUMN - Sticky Header */}
            <div className="space-y-8">
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-gray-400">
                {sectionLabel}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
                {sectionHeading}
              </h2>
              <p className="text-xl md:text-xl font-extralight leading-relaxed text-gray-300">
                {sectionDescription}
              </p>
            </div>

            {/* RIGHT COLUMN - Scrolling Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`group rounded-lg p-6 transition-all duration-500 ease-out ${
                    activeStep > index
                      ? 'opacity-100 translate-y-0'
                      : activeStep === index
                      ? 'opacity-100 translate-y-0 scale-[1.02] shadow-xl ring-2 ring-[#d4a964]/20'
                      : 'opacity-30 translate-y-12 blur-sm'
                  }`}
                  style={{
                    pointerEvents: activeStep >= index ? 'auto' : 'none'
                  }}
                >
                  <div className="flex flex-col gap-8 sm:flex-row sm:items-baseline">
                    <div className="flex flex-shrink-0 items-baseline sm:w-56 sm:justify-end">
                      <span
                        className={`text-xl font-extralight uppercase tracking-[0.4em] transition-all duration-500 text-left sm:text-right ${
                          activeStep === index
                            ? 'scale-110 text-[#d4a964] drop-shadow-[0_0_8px_rgba(212,169,100,0.5)]'
                            : 'text-gray-300 group-hover:scale-105 group-hover:text-[#d4a964]'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-3 text-2xl font-semibold uppercase transition-colors duration-300">
                        {step.heading}
                      </h3>
                      <p className="max-w-md leading-relaxed text-base font-extralight text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
