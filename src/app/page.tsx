'use client';
import { motion } from 'framer-motion';
import ImageBand from '@/components/media/ImageBand';
import MissionCombo from '@/components/site/MissionCombo';
import SectionShell from '@/components/layout/SectionShell';

export default function Home() {
  return (
    <SectionShell className="bg-brand-black min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        {/* Hero */}
        <ImageBand src="/images/content/Horse-Double-Black.png" alt="Hero" className="h-[60vh]">
          <motion.div 
            initial={{ y: 20 }} 
            animate={{ y: 0 }} 
            className="absolute inset-0 flex flex-col items-center justify-center text-center text-brand-gold"
          >
            <h1 className="text-6xl font-bold">EVOLUTION</h1>
            <h1 className="text-6xl font-bold">STABLES</h1>
          </motion.div>
        </ImageBand>

        {/* Mission */}
        <MissionCombo className="text-white">
          <h2 className="text-4xl font-bold mb-4 text-brand-gold">OUR MISSION</h2>
          <h3 className="text-2xl mb-6">Ownership Re-Imagined</h3>
          <p className="text-lg mb-6">Traditional racehorse ownership—expensive, restrictive, and opaque—has historically excluded those who dream of experiencing the thrill firsthand.</p>
          <p className="text-lg">We deliver ownership that&apos;s genuinely accessible, fully transparent, and uniquely liquid.</p>
          <button className="mt-6 bg-brand-gold text-brand-black px-6 py-3 rounded hover:bg-yellow-400">Join the Revolution</button>
        </MissionCombo>

        {/* Teaser Image */}
        <ImageBand src="/images/content/Hooves-on-grass.png" alt="Teaser" className="h-[50vh]">
          <motion.div 
            initial={{ y: 20 }} 
            animate={{ y: 0 }} 
            className="absolute inset-0 flex items-end justify-center text-white p-4"
          >
            <h3 className="text-xl">Our Vision</h3>
          </motion.div>
        </ImageBand>
      </motion.div>
    </SectionShell>
  );
}