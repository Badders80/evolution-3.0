'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

interface HeroSectionProps {
  backgroundImage?: string;
  overlay?: boolean;
  className?: string;
}

export function HeroSection({
  backgroundImage = '/images/Horse-Double-Black.png',
  overlay = true,
  className = '',
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  const [shouldFixBackground, setShouldFixBackground] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Fix background when user scrolls past initial hero height
      if (scrollPosition > windowHeight * 0.3) {
        setShouldFixBackground(true);
      } else {
        setShouldFixBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className={`relative flex min-h-screen items-center justify-center overflow-hidden pt-24 ${className}`}
    >
      {/* Fixed Background Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: shouldFixBackground ? 0 : backgroundY,
          position: shouldFixBackground ? 'fixed' : 'absolute',
          top: shouldFixBackground ? 0 : undefined,
          zIndex: shouldFixBackground ? -1 : undefined,
        }}
      >
        <ParallaxImage
          src={backgroundImage}
          alt="Evolution Stables"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0"
          intensity={shouldFixBackground ? 0 : 30}
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/95" />
        )}
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start gap-4 px-8 pb-16 md:px-12">
        {/* Scrolling Logo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-[720px]"
        >
          <Image
            src="/images/Evolution-Stables-Logo.png"
            alt="Evolution Stables"
            width={1200}
            height={400}
            priority
            className="h-auto w-full"
          />
        </motion.div>

        {/* Scrolling Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="w-full max-w-[720px] mt-8 text-sm font-medium uppercase tracking-[0.35em] text-gray-300"
        >
          Ownership re-imagined for a new generation<br />
          of race-goers.
        </motion.p>
      </div>
    </section>
  );
}
