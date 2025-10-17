'use client';

import React from 'react';
import Image from 'next/image';
import { FixedBg } from '@/components/ui/FixedBg';
import { GrassBg } from '@/components/ui/GrassBg';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { Button } from '@/components/ui/Button';
import { HeroSection } from '@/components/site/HeroSection';
import { SectionTemplate } from '@/components/sections/SectionTemplate';

const faqItems = [
  {
    question: 'What do investors or racing fans get out of it?',
    answer: 'The thrill of ownership without long-term commitments. Transparent costs, flexible stakes, and real participation.'
  },
  {
    question: "What's in it for owners, syndicators, or breeders?",
    answer:
      'Access to new investors while keeping full control. You set the terms - length, price, and structure.',
  },
  {
    question: 'How does this benefit clubs, organisations, and governing bodies?',
    answer:
      'New revenue streams and engagement. Digital-syndication attracts fresh participants and helps futureproof racing.',
  },
  {
    question: 'Is this regulated?',
    answer:
      'Yes. Evolution Stables operates under NZTR rules and global digital-asset frameworks, with Tokinvest providing the compliant infrastructure.',
  },
  {
    question: 'Why is the model different?',
    answer: 'No heavy commitments. Ownership is flexible, transparent, and open to all.',
  },
  {
    question: 'How is Evolution Stables different?',
    answer:
      "We're the home of digital-syndication - combining industry knowledge with a financial-grade platform to lower barriers and grow racing for the next generation.",
  },
];

const Home = () => {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <main className="text-foreground">
        <div className="w-full bg-background px-0 shadow-[0_0_80px_RGBA(0,0,0,0.35)] m-0 p-0 border-none max-w-none">
          <HeroSection />
        </div>
        
        <section id="about" className="py-64 bg-background text-foreground">
          <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20">
            {/* Section Label */}
            <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-16 text-white/30">
              ABOUT
            </p>

            {/* Headline */}
            <h2 className="text-h1-mobile md:text-h1 mb-14 text-white font-light tracking-tight">
              Own the Experience
            </h2>

            {/* Lead Paragraph */}
            <p className="text-[18px] leading-[1.85] font-light max-w-3xl mb-20 text-white/65">
              Racehorse ownership can be complex and inaccessible. Evolution Stables is here to change that. Removing barriers - delivering opportunities to first-time fans and seasoned owners alike to not just participate, but own the thrill of thoroughbred horse racing.
            </p>

            {/* CTA Button */}
            <div className="relative group inline-block">
              {/* Subtle breathing glow on hover */}
              <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              {/* Gold accent on hover - bottom highlight */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-[2px] group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out" />
              <button
                onClick={() => scrollToId('get-started')}
                className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3.5 text-[11px] font-light tracking-wider uppercase text-white/70 transition-all duration-300 hover:text-white hover:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden"
              >
                {/* Gentle shimmer animation - avoids center for text clarity */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer opacity-50" />
                <span className="relative z-10 inline-block transition-all duration-300 group-hover:scale-110">JOIN THE REVOLUTION</span>
              </button>
            </div>
          </div>
        </section>
        
        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Background-hooves-back-and-white.jpg" height="h-[50vh]" />
        </section>

        <SectionTemplate
          id="mission"
          label="OUR MISSION"
          heading="How It Works"
          description={<>Empowering every role in racing with<br />transparent, flexible paths forward.</>}
        >
          {/* Steps List */}
          <div className="mt-16 space-y-6">
              {/* Step One */}
              <div className="group rounded-2xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08]">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                    <span className="text-[16px] font-light text-white/40 group-hover:text-primary transition-all duration-500">
                      1
                    </span>
                  </div>
                  <div className="flex-1 space-y-3 pt-1">
                    <h4 className="text-[14px] font-[300] tracking-[0.15em] uppercase text-white/50 group-hover:text-white/90 transition-colors duration-500">For Investors & Fans</h4>
                    <p className="text-[16px] leading-[1.7] font-light text-white/40 group-hover:text-white/65 transition-colors duration-500 max-w-xl">
                      Step into ownership without long-term commitments. Transparent costs,
                      fractional stakes, and the genuine thrill of racing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step Two */}
              <div className="group rounded-2xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08]">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                    <span className="text-[16px] font-light text-white/40 group-hover:text-primary transition-all duration-500">
                      2
                    </span>
                  </div>
                  <div className="flex-1 space-y-3 pt-1">
                    <h4 className="text-[14px] font-[300] tracking-[0.15em] uppercase text-white/50 group-hover:text-white/90 transition-colors duration-500">For Breeders & Syndicators</h4>
                    <p className="text-[16px] leading-[1.7] font-light text-white/40 group-hover:text-white/65 transition-colors duration-500 max-w-xl">
                      Unlock new income streams on your terms while retaining control. Access a fresh market of
                      passionate investors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step Three */}
              <div className="group rounded-2xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08]">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                    <span className="text-[16px] font-light text-white/40 group-hover:text-primary transition-all duration-500">
                      3
                    </span>
                  </div>
                  <div className="flex-1 space-y-3 pt-1">
                    <h4 className="text-[14px] font-[300] tracking-[0.15em] uppercase text-white/50 group-hover:text-white/90 transition-colors duration-500">For Clubs & Organizations</h4>
                    <p className="text-[16px] leading-[1.7] font-light text-white/40 group-hover:text-white/65 transition-colors duration-500 max-w-xl">
                      Future-proof racing by welcoming broader audiences, fostering participation, and unlocking
                      sustainable revenue pathways.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </SectionTemplate>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Landscape-digitaloverlay.jpg" height="h-[50vh]" />
        </section>

        <section id="digital-syndication" className="py-56 bg-background text-foreground">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section Label */}
            <p className="text-label uppercase mb-12 text-muted">
              OUR MODEL
            </p>

            {/* Two Column Layout */}
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

              {/* LEFT COLUMN */}
              <div className="space-y-8">
                {/* Headline */}
                <h2 className="text-h1-mobile md:text-h1 text-white">
                  Digital Syndication
                </h2>

                {/* Lead Paragraph */}
                <p className="text-body-lg text-secondary">
                  Forged by tradition, transformed with innovation. Syndication has stood the test of time: shared ownership, shared risk, shared passion. Our digital-syndication model isn&apos;t here to replace it - but to evolve it.
                </p>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-8">
                {/* Features List */}
                <div className="space-y-4">
                  {/* Increased Access Section */}
                  <div className="group p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Image 
                          src="/images/Increased Access.svg" 
                          alt="INCREASED ACCESS"
                          width={48}
                          height={48}
                          className="w-10 h-10 transition-all duration-300 icon-gold-hover"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(80%)'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-h4 text-white mb-2 group-hover:text-primary transition-colors duration-300">
                          INCREASED ACCESS
                        </h4>
                        <p className="text-body text-secondary">
                          A digital platform that lowers barriers and opens ownership to everyone.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Greater Transparency Section */}
                  <div className="group p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Image 
                          src="/images/greater-than-equal-icon-original.svg" 
                          alt="GREATER TRANSPARENCY"
                          width={48}
                          height={48}
                          className="w-10 h-10 transition-all duration-300 group-hover:[filter:brightness(0)_saturate(100%)_invert(76%)_sepia(31%)_saturate(706%)_hue-rotate(356deg)_brightness(91%)_contrast(87%)]"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(80%)'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-h4 text-white mb-2 group-hover:text-primary transition-colors duration-300">
                          GREATER TRANSPARENCY
                        </h4>
                        <p className="text-body text-secondary">
                          Real-time performance, clear costs, and open communication.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Borderless Flexibility Section */}
                  <div className="group p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Image 
                          src="/images/Untitled design (36).svg" 
                          alt="BORDERLESS FLEXIBILITY"
                          width={48}
                          height={48}
                          className="w-10 h-10 transition-all duration-300 group-hover:[filter:brightness(0)_saturate(100%)_invert(76%)_sepia(31%)_saturate(706%)_hue-rotate(356deg)_brightness(91%)_contrast(87%)]"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(80%)'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-h4 text-white mb-2 group-hover:text-primary transition-colors duration-300">
                          BORDERLESS FLEXIBILITY
                        </h4>
                        <p className="text-body text-secondary">
                          Fractional shares and short-term commitments for modern investors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Horse-and-foal.jpg" height="h-[50vh]" />
        </section>

        <SectionTemplate
          id="innovation"
          label="REGULATED MARKETPLACE"
          heading={<>Transformation Powered<br />by <a href="https://tokinvest.capital/" target="_blank" rel="noopener noreferrer" className="text-[#d4a964] hover:text-[#d4a964]/80 transition-colors">Tokinvest</a></>}
          description="The Evolution Stables Marketplace is where digital-syndication comes alive - a seamless platform powered by Tokinvest's secure, compliant, and globally scalable infrastructure."
        >
          {/* Features */}
          <div className="mt-32 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Card 1 */}
              <div className="group flex flex-col gap-6 relative px-8 py-12 md:px-10 md:py-16 border-l border-white/[0.08] first:border-l-0 transition-all duration-500">
                {/* Vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.08]" />
                <div className="space-y-12">
                  <div>
                    <svg className="h-8 w-8 text-white/60 transition-colors duration-500 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[18px] font-light text-white leading-tight transition-colors duration-500 group-hover:text-white">Discover Opportunities</h4>
                    <p className="text-[15px] leading-[1.7] font-light text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      Browse available syndications and short-term leases, all clearly structured and fully transparent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group flex flex-col gap-6 relative px-8 py-12 md:px-10 md:py-16 border-l border-white/[0.08] transition-all duration-500">
                {/* Vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.08]" />
                <div className="space-y-12">
                  <div>
                    <svg className="h-8 w-8 text-white/60 transition-colors duration-500 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[18px] font-light text-white leading-tight transition-colors duration-500 group-hover:text-white">Trade with Confidence</h4>
                    <p className="text-[15px] leading-[1.7] font-light text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      Tokinvest&apos;s regulated platform ensures secure transactions, clear ownership records, and smooth settlements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group flex flex-col gap-6 relative px-8 py-12 md:px-10 md:py-16 border-l border-white/[0.08] transition-all duration-500">
                {/* Vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.08]" />
                <div className="space-y-12">
                  <div>
                    <svg className="h-8 w-8 text-white/60 transition-colors duration-500 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[18px] font-light text-white leading-tight transition-colors duration-500 group-hover:text-white">Stay Connected</h4>
                    <p className="text-[15px] leading-[1.7] font-light text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      Follow your horses, track performance, and manage your positions in real time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-32">
              <div className="relative group inline-block">
                {/* Subtle breathing glow on hover */}
                <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                {/* Gold accent on hover - bottom highlight */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-[2px] group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out" />
                <a
                  href="https://tokinvest.capital/report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3.5 text-[11px] font-light tracking-wider uppercase text-white/70 transition-all duration-300 hover:text-white hover:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden"
                >
                  {/* Gentle shimmer animation - avoids center for text clarity */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer opacity-50" />
                  <span className="relative z-10 inline-block transition-all duration-300 group-hover:scale-110">Learn More About Tokinvest</span>
                </a>
              </div>
            </div>
          </div>
        </SectionTemplate>

        <section id="get-started" className="bg-background">
          <GrassBg src="/images/Hooves-on-grass.png" />
        </section>


        <SectionTemplate
          id="faq"
          label="FAQ"
          heading="Frequently Asked Questions"
          description="Got questions about digital racehorse ownership? We've got answers. Our comprehensive FAQ covers everything from getting started to managing your stable."
        >
          {/* FAQ Component */}
          <div className="mt-24">
            <SplitFaq items={faqItems} className="mx-auto max-w-3xl" />
          </div>
        </SectionTemplate>
        
        <Footer />
      </main>
    </div>
  );
};

export default Home;


