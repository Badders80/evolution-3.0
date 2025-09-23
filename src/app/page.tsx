'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/site/HeroSection';
import ImageBand from '@/components/media/ImageBand';
import MissionCombo from '@/components/site/MissionCombo';
import SectionShell from '@/components/layout/SectionShell';
import { Footer } from '@/components/site/Footer';

export default function Home() {
  return (
    <main className="bg-brand-black text-white">
      <NavBar />
      
      <HeroSection 
        title="EVOLUTION STABLES"
        subtitle="Ownership Re-Imagined"
        ctaText="Join the Revolution"
        secondaryCtaText="Genuinely accessible, fully transparent, uniquely liquid"
        className="text-brand-gold bg-brand-black"
      />

      <SectionShell className="py-16 bg-brand-black">
        <ImageBand src="/images/content/Hooves-on-grass.png" alt="Evolution Stables" className="h-[50vh]" />
      </SectionShell>

      <SectionShell className="py-24 bg-gray-900">
        <MissionCombo className="text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4 text-brand-gold">Ownership Re-Imagined</h2>
            <h3 className="text-2xl mb-6 text-gray-300">The Future of Equestrian Investment</h3>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Traditional racehorse ownership—expensive, restrictive, and opaque—has historically excluded those who dream of experiencing the thrill firsthand.
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              We deliver ownership that&apos;s genuinely accessible, fully transparent, and uniquely liquid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brand-gold text-brand-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Explore Opportunities
              </button>
              <button className="border border-brand-gold text-brand-gold px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold hover:text-brand-black transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </MissionCombo>
      </SectionShell>

      <Footer />
    </main>
  );
}