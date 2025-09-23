'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
  return (
    <section
      id="hero"
      className={`relative flex min-h-screen items-center justify-center overflow-hidden pt-24 ${className}`}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Evolution Stables"
          fill
          priority
          className="object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/95" />
        )}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-8 pb-16 md:px-12">
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

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="max-w-lg text-sm font-medium uppercase tracking-[0.45em] text-gray-300"
        >
          Ownership re-imagined for a new generation of race-goers.
        </motion.p>
      </div>
    </section>
  );
}
