'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FixedBg } from '@/components/ui/FixedBg';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { Button } from '@/components/ui/Button';
import { SectionCard } from '@/components/SectionCard';
import dynamic from 'next/dynamic';

// Dynamically import HeroSection with SSR disabled
const HeroSection = dynamic(
  () => import('@/components/site/HeroSection').then(mod => mod.HeroSection),
  { ssr: false }
);

const faqItems = [
  {
    question: 'What do investors or racing fans get out of it?',
    answer: 'The thrill of ownership without long-term commitments. Transparent costs, flexible stakes, and real participation.'
  },
  {
    question: "What's in it for owners, syndicators, or breeders?",
    answer: 'Access to new investors while keeping full control. You set the terms — length, price, and structure.',
  },
  {
    question: 'How does this benefit clubs, organisations, and governing bodies?',
    answer: 'New revenue streams and engagement. Digital-syndication attracts fresh participants and helps futureproof racing.',
  },
  {
    question: 'Is this regulated?',
    answer: 'Yes. Evolution Stables operates under NZTR rules and global digital-asset frameworks, with Tokinvest providing the compliant infrastructure.',
  },
  {
    question: 'Why is the model different?',
    answer: 'No heavy commitments. Ownership is flexible, transparent, and open to all.',
  },
  {
    question: 'How is Evolution Stables different?',
    answer: "We're the home of digital-syndication — combining industry knowledge with a financial-grade platform to lower barriers and grow racing for the next generation.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      
      <section id="evolution-way" className="py-48 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section Label */}
          <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">
            ABOUT
          </p>

          {/* Headline */}
          <h2 className="text-4xl font-medium mb-6">
            Our <span className="text-brand-gold">Promise</span>: How It Works
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 max-w-3xl mb-12">
            Empowering every role in racing with transparent, flexible paths forward.
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-5xl mx-auto px-6 mt-20">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Investors & Fans */}
            <SectionCard
              title="Investors & Fans"
              description={
                <>
                  Step into ownership without long-term commitments.<br />
                  <span className="group-hover:text-gray-200 transition-colors duration-300">
                    Transparent costs, fractional stakes, and the genuine thrill of racing.
                  </span>
                </>
              }
              imageSrc="/images/Untitled design (8).svg"
              imageAlt="Investors & Fans"
            />

            {/* Breeders & Syndicators */}
            <SectionCard
              title="Breeders & Syndicators"
              description="Unlock new income streams on your terms—flexible structures while retaining control. Access a fresh market of passionate investors."
              imageSrc="/images/Untitled design (16).svg"
              imageAlt="Breeders & Syndicators"
            />

            {/* Clubs & Organisations */}
            <SectionCard
              title="Clubs & Organisations"
              description="Future-proof racing by welcoming broader audiences, fostering participation, and unlocking sustainable revenue pathways."
              imageSrc="/images/Untitled design (19).svg"
              imageAlt="Clubs & Organisations"
            />
          </div>
        </div>
      </section>

      <section className="px-0 md:px-0 m-0 p-0 border-none">
        <FixedBg src="/images/Landscape-digitaloverlay.jpg" height="h-[50vh]" overlay="from-black/10 to-black/30" />
      </section>

      <section id="digital-syndication" className="py-48 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Two Column Layout */}
          <div className="grid gap-16 lg:grid-cols-[2fr_3fr] lg:gap-24">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Section Label */}
              <p className="text-sm tracking-widest text-gray-400 uppercase">
                OUR MODEL
              </p>

              {/* Headline */}
              <h2 className="text-4xl font-medium">
                Digital <span className="text-brand-gold">Syndication</span>
              </h2>

              {/* Lead Paragraph */}
              <p className="text-lg leading-relaxed text-gray-300">
                Forged by tradition, transformed with innovation. Syndication has stood the test of time: shared ownership, shared risk, shared passion. Our digital-syndication model isn't here to replace it — but to evolve it.
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8 pt-16">
              {/* FAQ Items */}
              <SplitFaq items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
