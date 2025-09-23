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
  backgroundImage = "/images/content/Horse-Double-Black.png",
  overlay = true,
  className = ""
}: HeroSectionProps) {
  return (
    <section id="hero" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Evolution Stables"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black/80 to-black/40" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto flex items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-brand-gold leading-tight">
                EVOLUTION<br />STABLES
              </h1>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}